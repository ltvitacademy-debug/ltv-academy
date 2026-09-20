# Script — Authentication Modes

## Segment 1 (title)

SQL Server runs in one of two authentication modes, chosen at install and changeable later. Windows Authentication mode accepts only Windows or Active Directory logins. Mixed Mode adds SQL Server logins on top of that.

## Segment 2 (code: Two modes, chosen at install)

In Windows Authentication mode, no password ever travels to SQL Server — Kerberos or NTLM prove identity, and SQL Server just trusts the token. Mixed Mode is additive: it never removes Windows Authentication, it just also allows SQL Server logins with SQL-managed passwords.

## Segment 3 (steps: Why Windows wins by default)

Windows Authentication is preferred because no password crosses the wire, because disabling an account in Active Directory instantly cuts off every SQL Server login tied to it, and because password policy is enforced automatically. Mixed Mode is only needed for non-domain apps, legacy clients, or cross-platform connections.

## Segment 4 (code: Locking down sa)

Every instance ships with a built-in sa login, a member of sysadmin, and it's a favorite brute-force target because its name is public. Disable it if nothing depends on it, rename it if it must stay enabled, and always set a long, random password.

## Segment 5 (outro)

Next up: server principals and logins — the CREATE LOGIN syntax for both Windows-backed and SQL logins, and where to find them in the system catalog.
