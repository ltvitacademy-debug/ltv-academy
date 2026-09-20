# Script — Instance-Level Settings for Performance

## Segment 1 (title)

Lessons 38 through 40 covered MAXDOP, cost threshold, max server memory, and optimize for ad hoc workloads. This lesson closes out the configuration review — trace flags worth knowing about, and two Windows-level settings that matter just as much.

## Segment 2 (code: trace flags)

Trace flags 1117 and 1118 used to be essential — equal filegroup autogrow and uniform extent allocation. Since SQL Server 2016 both are just default behavior. Flag 4199 is still real, but its effect is now available per database, with no restart, through a scoped configuration setting instead.

## Segment 3 (code: LPIM and IFI)

Lock Pages in Memory and Instant File Initialization aren't sp_configure options at all — they're Windows privileges granted to the SQL Server service account through local security policy. LPIM stops the OS from trimming SQL Server's memory under pressure; IFI skips zero-filling new space in data files, never the log.

## Segment 4 (steps: three layers)

Instance-level settings actually live in three different places now — sp_configure options, per-database scoped configuration that needs no restart, and Windows privileges granted to the service account. Knowing which layer a setting belongs to is half the work of getting it right.

## Segment 5 (outro)

Don't reach for a trace flag from an old blog post without checking whether the version in front of you already does it by default. Next up: the hardware underneath every one of these settings — NUMA, storage latency, and the real cost tradeoff in CPU core count.
