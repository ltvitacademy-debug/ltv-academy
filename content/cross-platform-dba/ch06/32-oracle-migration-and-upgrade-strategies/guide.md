# Oracle Migration & Upgrade Strategies

Data Pump: Export & Import introduced `expdp`/`impdp` as Oracle's logical backup and data
movement tool. This lesson, closing out both Chapter Six and the Oracle section of the
course, is about the specific decision every Oracle DBA eventually faces: how do you
actually move a database forward across a major version, or onto different hardware
entirely? Oracle gives you two genuinely different strategies, and picking the right one
depends on what's actually changing.

## What you'll learn

- In-place upgrade with DBUA (and AutoUpgrade, its modern successor)
- Cross-version migration with Data Pump export/import
- Pre-upgrade checks: why you run them before either strategy
- How to decide which strategy fits a given situation

## In-place upgrade: DBUA and AutoUpgrade

The **Database Upgrade Assistant (DBUA)** upgrades an existing database in place to a newer
Oracle version — same data files, same physical database, just a newer Oracle software
version managing it afterward. DBUA runs the catalog upgrade scripts, handles component
upgrades, and can run either interactively (GUI) or silently from the command line for
scripted, repeatable upgrades:

```bash
dbua -silent -sid ORCL -upgradeTimezone true
```

In more recent Oracle releases, Oracle's recommended tool for this has shifted toward
**AutoUpgrade** (`java -jar autoupgrade.jar -config upgrade.cfg -mode deploy`), which
automates the same in-place upgrade path with better batch/fleet-upgrade support and
built-in pre-checks — worth knowing exists even though DBUA remains real, documented, and
still in active use. Either way, in-place upgrade is the right instinct when the hardware
and platform aren't changing and you want the database itself, and everything already
configured around it, to simply keep being that same database on newer software.

## Cross-version and cross-platform migration: Data Pump

When the destination is genuinely different — new hardware, a different operating system,
consolidating several databases into one, or a much larger version jump than an in-place
upgrade path supports — **Data Pump export/import** is the tool: export the data logically
from the source with `expdp`, then import it with `impdp` into a freshly created database
on the target running the new version. This approach is slower for large databases than an
in-place upgrade (data is actually unloaded and reloaded, not just recataloged), but it's
more flexible: it works across a much wider version gap, it works across different
operating systems and even different byte orders (endianness) in combination with
transportable tablespace techniques, and it gives you a clean, freshly built target database
rather than one carrying years of accumulated fragmentation forward.

## Pre-upgrade checks: mandatory, not optional

Before either strategy, Oracle's **Pre-Upgrade Information Tool** (`preupgrade.jar` in
modern releases) should be run against the source database. It flags version-specific
blockers: deprecated or desupported features in use, invalid objects that need fixing
first, initialization parameters that no longer exist or changed defaults, and required
disk space for the upgrade. Skipping this step and discovering a blocker mid-upgrade is a
genuinely avoidable outage — the tool exists specifically to surface these problems while
you can still plan around them.

## Choosing a strategy

Default to **in-place (DBUA/AutoUpgrade)** when the platform is staying the same and the
version jump is one DBUA/AutoUpgrade supports directly — it's faster and simpler for a
large database. Reach for **Data Pump migration** when the platform itself is changing,
when you're consolidating, or when the version gap is too large for a direct in-place path.
Both strategies still depend on the same underlying discipline this whole course keeps
returning to: check first, change deliberately, verify after — an upgrade is not the moment
to skip the pre-upgrade check.

## Key terms

| Term | Meaning |
|---|---|
| DBUA | Database Upgrade Assistant — in-place major-version upgrade tool |
| AutoUpgrade | Oracle's modern, script-driven successor to DBUA for in-place upgrades |
| Data Pump migration | Using expdp/impdp to logically move data into a freshly created database on a new version or platform |
| Pre-Upgrade Information Tool | Checks a source database for upgrade blockers before you begin (preupgrade.jar) |
| Transportable tablespace | A technique for moving tablespaces across platforms, including different endianness |

## Check yourself

A company is moving from an aging on-prem Oracle server to new hardware with a different
operating system, three major versions newer. Which strategy fits better, in-place upgrade
or Data Pump migration, and why?
