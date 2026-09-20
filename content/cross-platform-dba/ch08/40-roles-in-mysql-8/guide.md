# Roles in MySQL 8

SQL Server has had roles since practically its beginning. Oracle has had roles for decades.
MySQL didn't get real, first-class roles until version 8.0, released in 2018 — before that, the
only way to give five accounts the same set of privileges was to run the same `GRANT` statements
five times, once per account, and repeat the process every time the privilege set needed to
change. MySQL 8's roles finally close that gap, and they work by essentially treating a role as a
special kind of account that privileges get granted to, then granted onward to real users.

## What you'll learn

- Why MySQL went so long without roles, and what problem 8.0 roles actually solve
- `CREATE ROLE`, granting privileges to a role, and granting the role to users
- `SET DEFAULT ROLE` and why an active role isn't automatic without it
- How role changes propagate to every account holding that role

## Creating a role and granting privileges to it

A role in MySQL 8 is created almost exactly like a user, because internally it's implemented as
one:

```sql
CREATE ROLE 'app_readonly';
GRANT SELECT ON shop.* TO 'app_readonly';

CREATE ROLE 'app_readwrite';
GRANT SELECT, INSERT, UPDATE, DELETE ON shop.* TO 'app_readwrite';
```

Privileges are granted to the role using the exact same `GRANT` syntax from the last lesson — the
role just sits where a `user@host` account would normally go on the right-hand side of `TO`.

## Granting a role to users

```sql
CREATE USER 'analyst_jane'@'10.0.5.%' IDENTIFIED BY 'a-strong-password';
GRANT 'app_readonly' TO 'analyst_jane'@'10.0.5.%';

CREATE USER 'dev_mark'@'10.0.4.%' IDENTIFIED BY 'another-strong-password';
GRANT 'app_readwrite' TO 'dev_mark'@'10.0.4.%';
```

`analyst_jane` now inherits every privilege granted to `app_readonly`. If the role's privileges
change later — say, adding `SELECT` on a new table — every account holding that role picks up the
change immediately, with zero additional `GRANT` statements against individual users. That's the
entire point: manage the privilege set once, on the role, instead of N times, once per account.

## SET DEFAULT ROLE: making the role actually active

Granting a role to a user doesn't automatically make it *active* the moment they connect — this
trips people up. By default, a granted-but-not-activated role sits available but unused:

```sql
SET DEFAULT ROLE 'app_readonly' TO 'analyst_jane'@'10.0.5.%';
```

`SET DEFAULT ROLE` makes the role active automatically on every future connection for that user.
Without it, the user would need to run `SET ROLE 'app_readonly';` manually in each session before
the role's privileges apply — useful for optional roles a user activates situationally, but not
what you want for a role that should always be in effect. `SHOW GRANTS FOR 'analyst_jane'@'10.0.5.%' USING 'app_readonly';`
shows the effective privileges once a role is active.

## Key terms

| Term | Meaning |
|---|---|
| `CREATE ROLE` | Creates a role, a special account-like object that privileges can be granted to |
| `GRANT role TO user` | Grants a role's entire privilege set to a real `user@host` account |
| `SET DEFAULT ROLE` | Makes a granted role active automatically on every future connection |
| `SET ROLE` | Manually activates a granted role for the current session only |
| Role propagation | Changing a role's privileges instantly changes the effective privileges of every account holding it |

## Check yourself

A team of six analysts all need identical read-only access to the `shop` database, and that
access set will change over time as new reporting tables are added. Why is creating one role and
granting it to all six accounts a better long-term choice than running the same `GRANT` statement
six times?
