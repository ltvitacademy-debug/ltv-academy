# Lesson 25 — Troubleshooting Login, Authentication & Permission Problems

**Chapter 4 · Authentication & Authorization · Lesson 7 of 7 — Chapter Close**

## What you'll learn

- The first diagnostic question: can't authenticate at all, or authenticated but blocked?
- `sys.database_principals` and other system views for checking what actually exists
- Checking *effective* permissions, not just what was explicitly granted
- A real methodology to follow, in order, instead of guessing

## Question 1: is this a login problem or a permission problem?

Every "I can't do X" report splits into exactly two categories, and
they have completely different causes and fixes:

```
"I can't do X in the database"
        |
        v
Can the user connect to the server/database AT ALL?
   |                                    |
  NO                                   YES
   |                                    |
LOGIN / AUTHENTICATION            PERMISSION problem --
problem (Lessons 19-20)           the connection works,
                                   but this specific action
                                   is blocked (Lessons 21-23)
```

Never start debugging permissions before confirming the connection
itself succeeds — a login problem that looks like "access denied" in
an application's error log wastes hours if you jump straight to
checking `GRANT`s.

## Diagnosing a login/authentication problem

- Does the login/user actually **exist**? Check `sys.sql_logins` (SQL
  auth) or confirm the Entra identity is a member of whatever group
  was given `CREATE USER ... FROM EXTERNAL PROVIDER` (Lesson 20).
- Is the login **disabled**? `SELECT is_disabled FROM sys.sql_logins
  WHERE name = 'app_user';`
- Is a **firewall rule** blocking the client's IP before authentication
  is even attempted (Chapter 5's topic, but often the real cause of
  what looks like an auth failure)?
- For Entra auth specifically: has the identity's password expired,
  or does conditional access require MFA the client can't complete?

## Diagnosing a permission problem

Once the connection itself is confirmed working, the question becomes
what this specific user is actually allowed to do — and "allowed" has
to account for every path: direct grants, every role membership, and
any `DENY` that might override all of them (Lesson 23).

```sql
-- Does the user/login even exist as a security principal here?
SELECT name, type_desc, authentication_type_desc
FROM sys.database_principals
WHERE name = 'app_user';

-- What EXPLICIT permissions does this principal have, directly?
SELECT permission_name, state_desc, class_desc
FROM sys.database_permissions AS dp
JOIN sys.database_principals AS pr
  ON dp.grantee_principal_id = pr.principal_id
WHERE pr.name = 'app_user';

-- What can this principal ACTUALLY do right now, combining
-- direct grants, every role it's a member of, AND any DENY?
EXECUTE AS USER = 'app_user';
SELECT * FROM fn_my_permissions('Sales.Orders', 'OBJECT');
REVERT;
```

`fn_my_permissions`, run after `EXECUTE AS USER`, is the answer to
"what can this account *actually* do right now" — it already
accounts for role membership and any `DENY`, so you don't have to
manually trace every path yourself.

## The methodology, in order

1. Confirm the connection itself succeeds — login problem, not
   permission problem, if it doesn't.
2. Confirm the security principal exists where you expect it
   (`sys.database_principals`).
3. Check explicit grants (`sys.database_permissions`).
4. Check role memberships that might grant the same permission a
   different way.
5. Check for a `DENY` anywhere in that chain — remember it always
   wins (Lesson 23).
6. Use `fn_my_permissions` to confirm the *effective* result instead
   of reasoning through steps 3-5 by hand.

## Chapter 4 is done

You now have the full authentication and authorization stack: SQL
vs. Entra authentication (Lesson 19), configuring Entra ID (Lesson
20), the login/user/role hierarchy (Lesson 21), the choice between
built-in roles and object permissions (Lesson 22), the exact
`GRANT`/`DENY`/`REVOKE` precedence rules (Lesson 23), the least
privilege discipline that should guide every one of those decisions
(Lesson 24), and now a real methodology for when something goes
wrong. **Chapter 5, Azure SQL Network Security,** starts next —
firewalls, virtual networks, and private connectivity: the layer that
decides whether a connection attempt even reaches authentication at
all.

## Key terms

| Term | Meaning |
|---|---|
| `sys.database_principals` | System view listing every user/role that exists inside a database |
| `sys.database_permissions` | System view listing every explicit GRANT/DENY on a principal |
| `fn_my_permissions` | Function returning a principal's *effective* permissions, accounting for roles and DENY |

## Check yourself

You're ready for Chapter 5 when you can explain, without looking: what
is the very first diagnostic question to ask when someone reports "I
can't do X," and why does `fn_my_permissions` give you a more reliable
answer than manually adding up grants and role memberships yourself?
