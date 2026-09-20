# MySQL Security Best Practices and Hardening

Lesson 35 ran `mysql_secure_installation` as a step in getting a server up. This lesson goes back
and treats that same script — and the broader hardening checklist around it — as the real subject.
A default, freshly installed MySQL server has several specific weaknesses that an attacker
scanning the internet already knows to check for, and closing every one of them is a concrete,
enumerable checklist, not a vague "make it secure" instruction.

## What you'll learn

- The real, complete `mysql_secure_installation` checklist, item by item
- Why anonymous accounts and the `test` database are specifically dangerous defaults
- Hardening steps beyond the script: network binding, unused accounts, patching
- The principle of least privilege applied concretely to MySQL accounts

## The mysql_secure_installation checklist, in full

Running the script interactively walks through, in order:

1. **Validate password component** — optionally installs a password-strength policy so weak
   passwords get rejected at creation time, not discovered later in a breach.
2. **Set the root password** — either sets it for the first time or lets you change it.
3. **Remove anonymous users** — some MySQL installs historically created an account with an
   empty username that could connect and, on certain installs, even create a database matching
   its own username. This is a real, documented default weakness, not a hypothetical one.
4. **Disallow remote root login** — restricts `root` to connecting only from `localhost`, closing
   off the single highest-value account from network-based attack entirely.
5. **Remove the test database** — a database named `test` that some installs create by default,
   along with privileges that historically let any local user access it.
6. **Reload privilege tables** — flushes the changes so they take effect without a restart.

```bash
sudo mysql_secure_installation
```

## Hardening beyond the script

The script covers the well-known defaults, but a genuinely hardened server goes further.
`bind-address` in `my.cnf` should be set to a specific interface — `127.0.0.1` for local-only
access, or the internal network interface for a server that needs remote connections, never left
wide open unnecessarily:

```ini
[mysqld]
bind-address = 10.0.4.10
skip-networking = 0
```

Unused or default accounts should be audited and removed — `SELECT user, host FROM mysql.user;`
is the query that surfaces every account on the server, and any account nobody can explain should
be investigated. Every account should follow least privilege from the earlier `GRANT`/`REVOKE`
lesson: no account gets `ALL PRIVILEGES ON *.*` unless its job genuinely requires full
administrative access. The server itself should be kept patched — MySQL security releases fix
real, disclosed vulnerabilities, and an unpatched MySQL instance is exposed to publicly known
issues, not theoretical ones.

## Auditing who has what

```sql
SELECT user, host FROM mysql.user;
SHOW GRANTS FOR 'some_account'@'some_host';
```

A periodic pass through every account on the server, cross-checked against `SHOW GRANTS`, is how
privilege creep — the slow accumulation of access nobody remembers granting — gets caught before
it becomes a real exposure.

## Key terms

| Term | Meaning |
|---|---|
| Anonymous account | A MySQL account with an empty username, historically created by some default installs |
| `bind-address` | `my.cnf` setting controlling which network interface(s) MySQL listens on |
| `mysql.user` | System table listing every account (user and host pairs) on the server |
| Least privilege | Granting only the specific access an account's actual job requires, nothing more |
| Privilege creep | Access that accumulates over time and outlives its original justification |

## Check yourself

Why does disabling remote root login matter even if the root password is strong? What attack
does restricting root to `localhost` specifically close off that a strong password alone doesn't?
