# Automating Security Audits

A security audit is exactly the kind of DBA task that gets skipped when it depends on
someone remembering to run several manual checks. dbatools has real cmdlets for the most
common ones — enumerating logins, hunting for weak passwords, finding orphaned users —
and chaining them the same way Lesson 7 chained health checks turns "audit" from an
occasional manual exercise into a scheduled report.

## What you'll learn

- `Get-DbaLogin` for enumerating and inspecting SQL Server logins
- `Test-DbaLoginPassword` for finding logins with weak or default-pattern passwords
- `Get-DbaDbOrphanUser` for finding database users with no matching login
- Combining all three into one audit report, the same pattern as Lesson 7

## Get-DbaLogin: what logins actually exist

```powershell
Get-DbaLogin -SqlInstance SQLPRD01 |
    Select-Object Name, LoginType, IsDisabled, PasswordExpirationEnabled, CreateDate
```

This is the starting point of any audit — you can't evaluate what you don't know exists.
`Get-DbaLogin` returns every login on the instance, Windows and SQL authentication alike,
with the properties that matter for a security review: whether it's disabled, whether
password expiration is even enforced, and when it was created.

## Test-DbaLoginPassword: finding weak passwords

```powershell
Test-DbaLoginPassword -SqlInstance SQLPRD01
```

`Test-DbaLoginPassword` checks SQL Server authentication logins for genuinely weak
password patterns — by default, an empty password or a password that matches the login
name itself — using SQL Server's built-in `PWDCOMPARE()` function against the password
hashes already stored in `sys.sql_logins`. You can also point it at a custom dictionary
of common passwords with `-Dictionary` to test against a longer list than the defaults.

## Get-DbaDbOrphanUser: users with no matching login

```powershell
Get-DbaDbOrphanUser -SqlInstance SQLPRD01
```

An orphaned user is a database user that no longer has a matching server login — commonly
left behind after a login was dropped, or after a database was restored to a different
server than the one its users' logins were created on. Orphaned users are a real security
concern: sometimes they still hold permissions on the database that nobody currently owns
or is accountable for, and dbatools also ships `Repair-DbaDbOrphanUser` to remap them to
an existing login once you've reviewed them.

## Combining them into one audit report

```powershell
$instance = "SQLPRD01"

$audit = [PSCustomObject]@{
    Instance         = $instance
    RunAt            = Get-Date
    DisabledLogins   = (Get-DbaLogin -SqlInstance $instance | Where-Object IsDisabled).Name
    WeakPasswords    = (Test-DbaLoginPassword -SqlInstance $instance).Login
    OrphanedUsers    = (Get-DbaDbOrphanUser -SqlInstance $instance).User
}

if ($audit.WeakPasswords -or $audit.OrphanedUsers) {
    $audit | ConvertTo-Html | Out-File \\reports\security-audit\$instance-$(Get-Date -Format yyyyMMdd).html
    Send-MailMessage -To dba-team@company.com -Subject "Security audit flagged issues on $instance" `
        -Body ($audit | ConvertTo-Html | Out-String) -SmtpServer smtp.company.com
}
```

Exactly Lesson 7's pattern: run the individual checks, build one structured record, and
only surface it loudly when something actually needs attention. A weekly scheduled run
of this script (Lesson 10) catches weak passwords and orphaned accounts that would
otherwise only surface during an actual security incident.

## Key terms

| Term | Meaning |
|---|---|
| `Get-DbaLogin` | Enumerates SQL Server logins and their properties |
| `Test-DbaLoginPassword` | Checks SQL logins for empty, username-matching, or dictionary-matched weak passwords via `PWDCOMPARE()` |
| `Get-DbaDbOrphanUser` | Finds database users with no matching server login |
| `Repair-DbaDbOrphanUser` | Remaps an orphaned user to an existing login |

## Check yourself

Why is an orphaned database user (one with no matching server login) a genuine security
concern rather than just administrative clutter?
