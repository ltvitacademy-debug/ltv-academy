# File Growth Strategy

`FILEGROWTH` looks like a small setting, but the difference between a good and a bad
choice compounds over the life of a database. This lesson covers the one real anti-pattern
in file growth, and the one feature that makes growth events fast when configured
correctly.

## What you'll learn

- The difference between fixed-size and percentage-based autogrowth
- Why percentage growth on a large file is a real anti-pattern
- Why Instant File Initialization applies to data files but never to the log

## Fixed-size growth vs. percentage growth

`FILEGROWTH` can be set two ways: a fixed amount (`FILEGROWTH = 512MB`) or a percentage of
the file's current size (`FILEGROWTH = 10%`). Fixed growth is predictable: a 512 MB growth
event is the same size whether the file is 10 GB or 500 GB. Percentage growth compounds —
10% of a 10 GB file is a manageable 1 GB, but 10% of a 500 GB file is 50 GB in a single
growth event. On a large file, that single event can take a long time, and if it's the log
file specifically (which must always be zero-initialized, see below), that pause blocks
every transaction waiting to commit until the growth finishes.

## Why percentage growth is a real anti-pattern

Beyond the size of any one growth event, percentage growth makes growth increments
*unpredictable* — you can't reason about how big the next growth event will be without
knowing the file's exact current size at that moment. Fixed-size growth, sized
deliberately (large enough that growth events are rare, small enough that any one event
finishes quickly), is the standard recommendation. Autogrowth should function as a safety
net, not as your primary sizing strategy — proactively size files for expected growth, and
monitor free space, rather than relying on frequent autogrowth events.

```sql
ALTER DATABASE Sales
MODIFY FILE (NAME = Sales_Data, FILEGROWTH = 512MB, MAXSIZE = 500GB);
```

## Instant File Initialization: data files, never the log

**Instant File Initialization (IFI)** lets SQL Server skip zero-writing newly allocated
disk space when a data file is created or grows, making both operations dramatically
faster. It requires the SQL Server service account to hold the **"Perform volume
maintenance tasks"** Windows privilege. Critically, IFI applies only to **data files** —
the log file must always be zero-initialized on growth, because SQL Server depends on the
log's content being predictable (not containing leftover data from whatever previously
occupied that disk space) for crash recovery to work correctly. This is exactly why
oversized, unpredictable log growth events are worse than the equivalent data file growth
event — there's no IFI shortcut available for the log.

## Key terms

| Term | Meaning |
|---|---|
| Fixed-size growth | FILEGROWTH set to an absolute amount (e.g. 512MB); predictable regardless of file size |
| Percentage growth | FILEGROWTH set as a percent of current size; compounds unpredictably on large files |
| Instant File Initialization (IFI) | Skips zero-writing new space; applies to data file growth only, never the log |
| MAXSIZE | Caps how large autogrowth will let a file get, preventing runaway growth from filling a disk |

## Check yourself

A 400 GB data file is still set to `FILEGROWTH = 10%` from years ago. What size would the
next growth event actually be, and what two changes would you make to fix this properly?
