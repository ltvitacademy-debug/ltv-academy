# Script — Troubleshooting Login, Authentication & Permission Problems

## Segment 1 (title)

Every "I can't do X" report splits into two categories with completely different causes: can the user connect at all, or does the connection work but this specific action is blocked.

## Segment 2 (code: the first branch)

Never start debugging permissions before confirming the connection itself succeeds. A login problem that looks like access denied in an application log wastes hours if you jump straight to checking GRANTs.

## Segment 3 (steps: diagnosing a login problem)

Does the login actually exist? Is it disabled? Is a firewall rule blocking the client before authentication is even attempted? For Entra auth, has the password expired or does conditional access require MFA the client can't complete?

## Segment 4 (code: diagnosing a permission problem)

Once the connection works, check sys.database_principals for the security principal, sys.database_permissions for explicit grants, and then account for every role membership and any DENY that might override all of it.

## Segment 5 (code: the effective-permissions answer)

fn_my_permissions, run after EXECUTE AS USER, already accounts for role membership and any DENY -- it answers what this account can actually do right now, so you don't have to trace every path by hand.

## Segment 6 (outro)

Chapter 4 is done -- authentication, the login/user/role hierarchy, GRANT/DENY/REVOKE, least privilege, and now a real troubleshooting methodology. Chapter 5, Azure SQL Network Security, starts next.
