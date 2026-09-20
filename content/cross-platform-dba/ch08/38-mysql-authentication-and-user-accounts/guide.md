# MySQL Authentication and User Accounts

A SQL Server login is a name. An Oracle user is a name. A MySQL user is a name *and* a host
pattern, and that pairing is the single most distinctive thing about MySQL's account model. Two
accounts with the identical username can behave completely differently depending on where the
connection comes from, and getting this wrong is one of the most common MySQL security mistakes
a DBA coming from another platform makes.

## What you'll learn

- The `user@host` account format and why the host half is not optional in practice
- Creating accounts with `CREATE USER`, including host wildcards
- How MySQL picks which account matches an incoming connection when several could
- Changing passwords and locking/unlocking accounts

## The user@host format

Every MySQL account is identified by two parts together, written `'username'@'host'`:

```sql
CREATE USER 'app_svc'@'10.0.4.%' IDENTIFIED BY 'a-strong-password';
CREATE USER 'app_svc'@'localhost' IDENTIFIED BY 'a-different-password';
CREATE USER 'reporting'@'%' IDENTIFIED BY 'another-password';
```

These are three genuinely separate accounts, even though two of them share the username
`app_svc`. `'app_svc'@'10.0.4.%'` can only authenticate from a client whose IP falls in the
`10.0.4.0/24` range. `'app_svc'@'localhost'` can only authenticate from the local machine itself
— note that MySQL treats `localhost` specially, routing it through the Unix socket rather than
TCP/IP where the platform supports it, so it isn't just shorthand for `127.0.0.1`.
`'reporting'@'%'` can connect from anywhere, since `%` is a wildcard matching any host. This is
fundamentally different from SQL Server, where a login named `app_svc` is one account regardless
of where the connection originates, and any network-level restriction is handled separately (a
firewall rule, not the login itself).

## Host pattern matching and specificity

When a client connects, MySQL looks for the most specific `user@host` combination that matches,
not just the first one found. A connection from `10.0.4.55` as user `app_svc` matches
`'app_svc'@'10.0.4.%'` in preference to a hypothetical `'app_svc'@'%'`, because the more specific
host pattern wins. This is why creating both a narrow and a broad account for the same username
is a legitimate, common pattern — a tightly scoped service account for the app tier, and a
broader fallback isn't usually the right instinct here; in practice, most DBAs prefer to be
explicit about every host an account is allowed to connect from and avoid `%` for anything beyond
truly public-facing read accounts.

## Creating and managing accounts

```sql
-- Create with a password
CREATE USER 'analyst'@'192.168.1.%' IDENTIFIED BY 'ChangeMe#2024';

-- Change a password later
ALTER USER 'analyst'@'192.168.1.%' IDENTIFIED BY 'NewPassword#2025';

-- Lock an account without deleting it (e.g. an employee on leave)
ALTER USER 'analyst'@'192.168.1.%' ACCOUNT LOCK;
ALTER USER 'analyst'@'192.168.1.%' ACCOUNT UNLOCK;

-- Remove an account entirely
DROP USER 'analyst'@'192.168.1.%';
```

Note that `DROP USER 'analyst'@'192.168.1.%'` removes only that exact `user@host` pair — an
`'analyst'@'10.0.0.%'` account, if one existed, would be untouched. Every one of these statements
must always specify the host half explicitly (or accept MySQL's default of `'%'` if you omit it),
because a bare username like `'analyst'` alone is not a valid, addressable MySQL account.

## Key terms

| Term | Meaning |
|---|---|
| `'user'@'host'` | MySQL's full account identifier — the same username at a different host is a different account |
| Host wildcard (`%`) | Matches any host; `'user'@'%'` can connect from anywhere |
| `CREATE USER` | Statement that creates a new `user@host` account and sets its authentication |
| `ALTER USER ... ACCOUNT LOCK` | Disables an account's ability to authenticate without deleting it |
| Most-specific match | MySQL authenticates a connection against the most specific matching `user@host` pattern available |

## Check yourself

You create `'svc_app'@'10.0.4.%'` and later a connection attempt arrives from `10.0.4.77`. Would
this succeed, and what MySQL concept determines whether a broader `'svc_app'@'%'` account, if one
also existed, would ever get used instead for that same connection?
