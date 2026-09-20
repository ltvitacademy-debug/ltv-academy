# Authentication Modes

## What you'll learn

- The two authentication modes SQL Server can run in
- Why Windows Authentication is the generally preferred default
- How Mixed Mode changes the attack surface, and how to manage the `sa` account when you must use it

## The two modes

Every SQL Server instance runs in one of two authentication modes, chosen at install time (and
changeable later in Server Properties or via `sp_configure`):

1. **Windows Authentication mode** — the instance only accepts logins backed by a Windows or
   Active Directory identity. SQL Server never sees a password; it trusts the Windows token the
   client already has from domain logon (Kerberos or NTLM under the hood).
2. **Mixed Mode** (SQL Server and Windows Authentication mode) — the instance accepts both
   Windows-backed logins *and* SQL Server logins, where SQL Server itself stores a password hash
   and validates credentials sent over the wire.

There's no third option, and you can't disable Windows Authentication entirely — Mixed Mode is
additive, not a replacement.

## Why Windows Authentication is preferred

Windows Authentication is the default recommendation for almost every environment, for concrete
reasons, not just convention:

- **No password travels to SQL Server.** Kerberos/NTLM handle the proof of identity; SQL Server
  trusts the OS. A SQL login, by contrast, sends credentials the server must validate.
- **Centralized account management.** Disable a user in Active Directory and every SQL Server
  login tied to that identity (directly or via an AD group) is instantly cut off. With SQL
  logins, you have to remember to disable each one, instance by instance.
- **Password policy enforcement is automatic.** Windows/AD group policy (complexity, expiration,
  lockout) applies without SQL Server doing anything extra.
- **Auditability.** Actions trace back to a real AD identity instead of a shared SQL login that
  three different scripts and two people all use.

Mixed Mode exists because not everything can present a Windows token — a web application
connecting from outside the domain, a legacy app that only knows how to pass a username/password,
a vendor appliance, or cross-platform/Linux clients. In those cases a SQL login is the only
option, and Mixed Mode is required.

## The `sa` account

Every instance ships with a built-in SQL login named `sa` (system administrator), a member of the
`sysadmin` fixed server role. It only matters in Mixed Mode, but it exists regardless of the mode
selected. Because its name is public knowledge, `sa` is a favorite brute-force target. Real
production guidance:

- **Disable it** if nothing depends on it: `ALTER LOGIN sa DISABLE;`
- If it must stay enabled, **rename it** so attackers can't target it by name:
  `ALTER LOGIN sa WITH NAME = <something_else>;`
- **Set a long, random password** regardless — `ALTER LOGIN sa WITH PASSWORD = '<strong password>';`
- Never let application connection strings authenticate as `sa`. Application logins should be
  scoped, least-privilege SQL logins or Windows service accounts — never the built-in admin.

## Key terms

| Term | Meaning |
|---|---|
| Windows Authentication mode | Instance accepts only Windows/AD-backed logins; no password sent to SQL Server |
| Mixed Mode | Instance accepts both Windows-backed logins and SQL Server logins with SQL-managed passwords |
| SQL login | A login whose credentials (password hash) SQL Server itself stores and validates |
| `sa` | The built-in sysadmin SQL login present on every instance; a common attack target when enabled |

## Check yourself

An application team says their web app "can't do Windows Authentication" and needs a SQL login.
What mode must the instance run in, and what would you tell them about how that login should be
scoped — should it be `sa`?
