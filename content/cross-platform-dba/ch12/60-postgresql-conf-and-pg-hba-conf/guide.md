# PostgreSQL Configuration Files: postgresql.conf & pg_hba.conf

Every cluster `initdb` creates comes with two configuration files that matter more than any
others, and they answer two genuinely different questions. `postgresql.conf` answers "how
should the server behave?" `pg_hba.conf` answers "who is allowed to connect, from where, and
proving their identity how?" The second file has no real SQL Server or Oracle equivalent as
a single, dedicated, line-by-line ruleset — it's one of the most distinctive things about
running PostgreSQL, and getting it wrong is the single most common reason a new PostgreSQL
install refuses connections that look, from the client side, like they should just work.

## What you'll learn

- What postgresql.conf controls, and how settings there get applied
- What pg_hba.conf is for, and how its rule format works
- Why these are two separate files instead of one, and what that separation buys you

## postgresql.conf: server behavior

`postgresql.conf` is a plain-text file, one setting per line, living in the cluster's data
directory (the one `initdb` created). It controls server-wide behavior — the memory settings
from the previous lesson live here:

```
shared_buffers = 4GB
work_mem = 64MB
maintenance_work_mem = 512MB
listen_addresses = '*'
port = 5432
max_connections = 100
```

`listen_addresses` controls which network interfaces the postmaster listens on — `'localhost'`
by default in many installs, which is why a default install often can't be reached from
another machine even after the firewall and pg_hba.conf are configured correctly. Most
settings here take effect on a config reload (`SELECT pg_reload_conf();` or `pg_ctl reload`);
a smaller set of settings (like `shared_buffers`, which sizes a shared memory segment
allocated at startup) require a full server restart.

## pg_hba.conf: host-based authentication

`pg_hba.conf` ("host-based authentication") is where PostgreSQL decides, for every incoming
connection attempt, whether to allow it and what authentication method to demand. Each line
is a rule, read top to bottom, with the first matching line winning:

```
# TYPE  DATABASE  USER      ADDRESS          METHOD
local   all       all                        peer
host    all       all       127.0.0.1/32     scram-sha-256
host    all       all       0.0.0.0/0        scram-sha-256
host    myapp_db  app_user  10.0.5.0/24      scram-sha-256
```

Each column matters:

- **TYPE** — `local` (Unix-domain socket connections) or `host` (TCP/IP connections)
- **DATABASE** — which database(s) the rule applies to, or `all`
- **USER** — which role(s) the rule applies to, or `all`
- **ADDRESS** — the client IP range the rule matches (CIDR notation), omitted for `local`
- **METHOD** — the authentication method: `trust` (no password, dangerous outside tightly
  controlled local dev), `peer` (trusts the OS username for local socket connections),
  `md5`/`scram-sha-256` (password-based, `scram-sha-256` is the modern, stronger default),
  and others like `cert` or `gssapi` for more specialized setups

There is nothing quite like this in SQL Server or Oracle: SQL Server authentication mode
(Windows/mixed) is a single server-wide toggle, and Oracle's authentication is mostly
controlled through the listener and user account settings, not a separate per-source-address
rule file you edit line by line. pg_hba.conf's granularity — different databases, users, and
address ranges each getting their own required method — is genuinely distinctive.

## Why two separate files

Splitting server behavior from connection authorization is a deliberate separation of
concerns: a DBA tuning `work_mem` for a reporting workload doesn't need to touch
authentication rules, and a security review of "who can connect from where" doesn't need to
wade through memory and logging settings to find the relevant lines. Both files live in the
data directory and are reloaded (not restarted) for most changes with `pg_ctl reload` or
`SELECT pg_reload_conf();` — pg_hba.conf changes in particular take effect on reload without
dropping existing connections, so a misconfigured rule can be fixed without an outage.

## Key terms

| Term | Meaning |
|---|---|
| postgresql.conf | The file controlling server-wide behavior: memory, connections, logging, and more |
| pg_hba.conf | Host-based authentication rules: who can connect, from where, using what method |
| listen_addresses | postgresql.conf setting controlling which network interfaces accept connections |
| scram-sha-256 | The modern, recommended password-based authentication method in pg_hba.conf |
| peer | pg_hba.conf method that trusts the OS username for local socket connections |

## Check yourself

A new PostgreSQL install rejects a connection attempt from a remote application server even
though the firewall is open. Which two files would you check, and what specifically would
you look for in each?
