# MySQL Migration & Upgrade Strategies

Every platform in this path eventually needs a version upgrade, and every platform has its
own rules about how far you can jump in one step and what actually happens to the data along
the way. This lesson closes out the MySQL section of the course with the two real upgrade
paths a MySQL DBA actually chooses between, and what to check before either one.

## What you'll learn

- How an in-place MySQL upgrade actually works, and its real limitation
- When a logical dump-and-reload is the right choice instead
- What MySQL Shell's upgrade checker does before you commit to either path

## In-place upgrades: same data directory, new binaries

An **in-place upgrade** replaces the MySQL server binaries while leaving the existing data
directory in place: stop the old `mysqld`, install the new version, point it at the same data
directory, and start it. In current MySQL 8.0+, the server itself checks and upgrades its data
dictionary automatically during startup — there's no longer a separate, manually-run
`mysql_upgrade` step for routine upgrades the way there was in MySQL 5.7 and earlier, where
running `mysql_upgrade` after swapping binaries was a required manual step.

The real limitation isn't the mechanism, it's the distance you're allowed to jump. MySQL only
supports an in-place upgrade from the immediately preceding GA series to the next one — you
cannot, for example, do a single in-place upgrade directly from MySQL 5.7 straight to MySQL
8.4. A multi-version-behind server has to either step through intermediate versions one at a
time, or take the other path entirely: dump and reload.

Before running any in-place upgrade, MySQL Shell provides a dedicated check:
`util.checkForServerUpgrade()`. It connects to the running server and reports deprecated
features in use, removed system variables, reserved keyword collisions, and other
incompatibilities the target version would introduce — surfacing problems before the upgrade,
not after it's already failed halfway through.

## Logical dump and reload: the path for bigger jumps

A **logical dump and reload** exports the database's data and schema as a set of SQL
statements (or an equivalent structured format) and reloads them into a freshly installed
target version. This is the required approach when the version gap is too large for an
in-place upgrade, and it's also the common choice when moving to a fundamentally different
deployment — a different OS, a differently configured file layout, or a managed cloud MySQL
service — since an in-place upgrade assumes the exact same data directory stays in place.

`mysqldump` can do this, the same tool covered in the backup chapters, but for large databases
MySQL Shell's dump and load utilities — `util.dumpInstance()` and `util.loadDump()` — are the
current recommended tool for a migration of any real size. They dump and load in parallel
across multiple threads (dramatically faster than mysqldump's single-threaded output for large
datasets), support compression, and can resume an interrupted load rather than starting over.

The tradeoff against an in-place upgrade is time and downtime: a dump-and-reload rebuilds
every table from scratch on the target version, which takes meaningfully longer for a large
database than swapping binaries in place. For a big production database, that usually means
either accepting a longer maintenance window or building the new version as a replica of the
old one first — using replication itself to catch the new server up before cutting traffic
over, rather than a single big offline dump-and-reload window.

## One more current fact worth knowing: the release model

Since MySQL 8.4, Oracle has run two parallel release tracks: **Innovation releases**, which
ship new features quickly on a faster cadence, and **Long Term Support (LTS) releases**, which
receive extended bug-fix and security support without new features being added mid-stream.
MySQL 8.4 was the first LTS release under this model. A DBA planning an upgrade path now has
to decide not just "what version" but "Innovation or LTS" — production systems generally favor
LTS for the same reason they'd favor a stable channel on any platform: fewer moving parts
between planned upgrade windows.

## Key terms

| Term | Meaning |
|---|---|
| In-place upgrade | Swapping server binaries while keeping the same data directory; automatic dictionary upgrade on startup in 8.0+ |
| `util.checkForServerUpgrade()` | MySQL Shell command that checks a running server for issues before an upgrade |
| Logical dump and reload | Exporting data/schema and reloading it into a freshly installed target version |
| `util.dumpInstance()` / `util.loadDump()` | MySQL Shell's parallel dump and load utilities, the current tool for large migrations |
| Innovation release | Fast-cadence MySQL release track with new features |
| LTS release | Long Term Support MySQL release track (starting with 8.4), stable across an extended support window |

## Check yourself

A production server is running MySQL 5.7 and needs to reach the current MySQL 8.4 LTS
release. Why can't this be done as a single in-place upgrade, and what's the actual path
available instead?

---

This closes out the MySQL section of the course. Every lesson from here forward moves to
PostgreSQL — starting with the architecture question that opens every new platform in this
course: what does the server actually look like once it's running, in terms of its processes
and its memory.
