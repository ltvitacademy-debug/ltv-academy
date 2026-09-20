# System Databases, Deep Dive

## What you'll learn

- What each of the five system databases actually does, beyond the one-line summary
- Why `resourcedb` is hidden, and what "it's read-only" really means in practice
- How `model`'s settings quietly become every new database's starting point

## The five system databases, briefly

Every SQL Server instance ships with five system databases, visible (mostly) in
`sys.databases`: `master`, `model`, `msdb`, `tempdb`, and the hidden `resourcedb`. Each has a
distinct job, and losing or corrupting the wrong one can take down the whole instance — which
is exactly why this lesson goes past the one-line description.

## master — the instance's own metadata

`master` records the instance-level facts SQL Server needs before it can do anything else:
logins, linked server definitions, endpoints, and — critically — the list of every other
database on the instance and where its files live. If `master` won't come online, the instance
won't start at all, because it doesn't yet know what other databases exist. This is why
`master` backups matter even though it holds no user data: losing it without a backup means
manually rebuilding instance-level configuration from scratch (or worse, being unable to start
the instance at all without a rebuild).

## resourcedb — the one you don't back up

`resourcedb` (physically `mssqlsystemresource.mdf`/`.ldf`) is the odd one out: it's **hidden**
from `sys.databases` entirely, and it's **read-only**. It stores all the system objects that
ship with SQL Server — system stored procedures, system views, and so on — physically separate
from `master`, but logically they appear to live in every database's `sys` schema. The reason
it's structured this way is upgrades: because it's a single, isolated, read-only file, a
version or cumulative update can replace `resourcedb` cleanly without touching user databases
or `master` — instead of the old approach (pre-SQL Server 2005) where system objects lived
inside `master` itself and every service pack had to carefully script changes into it. You
never back it up or restore it independently; it travels with the SQL Server binaries, not
with your data.

## model — the template, taken literally

`model` is the template for every new database — and this is more literal than people expect.
When you run `CREATE DATABASE`, SQL Server doesn't build a blank database from nothing; it
**copies `model`**. Any object you create in `model` — a table, a stored procedure, a default
user — appears automatically in every subsequently created database. Any database-level
setting you change on `model` — recovery model, default collation, autogrowth settings — becomes
the default for every new database from that point forward. Some DBAs deliberately set
`model`'s recovery model to Full (instead of the out-of-box Simple) specifically so nobody
forgets to change it on a new production database. This is a real, live lever, not a historical
curiosity — and it's also a real footgun if someone changes `model` without documenting why.

## msdb — the automation and history database

`msdb` is where SQL Server Agent lives operationally: job definitions, job schedules, job
history, alerts, and operators are all stored here. It also holds backup and restore history
(`msdb.dbo.backupset` and related tables — the source `RESTORE HEADERONLY` and similar commands
read from) and Database Mail configuration. A DBA who's lost `msdb` hasn't lost data, but has
lost every scheduled job and the record of every backup ever taken — which is its own kind of
emergency mid-incident.

## tempdb — recreated every restart, on purpose

`tempdb` is unique among the five: it is **recreated from scratch every time the instance
starts**, always at its configured initial size, never restored from a backup. It holds
user-created temp tables and table variables, work tables the query processor builds for sorts,
hashes, and spools, and the version store used by row versioning features (like snapshot
isolation and triggers). Because it's shared by every database on the instance, tempdb
contention is a common bottleneck — this course covers tempdb file configuration on its own,
later.

## Key terms

| Term | Meaning |
|---|---|
| `master` | Instance-level metadata: logins, linked servers, and the list of every database on the instance |
| `resourcedb` | Hidden, read-only database holding all system objects; enables clean version upgrades |
| `model` | The literal template copied to create every new database — objects and settings both |
| `msdb` | Agent job definitions/history, backup/restore history, Database Mail configuration |
| `tempdb` | Recreated at every instance restart; holds temp objects, work tables, and the version store |

## Check yourself

A new production database was just created, and it inherited a Simple recovery model when the
team expected Full. Where would you go check first, and why would that explain what happened
to every database created since?
