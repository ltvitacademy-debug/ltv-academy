# Script — AUTO Settings

## Segment 1 (title)

The query optimizer's decisions are only as good as the statistics it trusts. Three ALTER DATABASE options control whether SQL Server maintains those statistics automatically, and how aggressively.

## Segment 2 (steps: the three settings)

AUTO_CREATE_STATISTICS lets the optimizer create missing single-column statistics on the fly, on by default. AUTO_UPDATE_STATISTICS refreshes existing statistics once enough rows change, also on by default. AUTO_UPDATE_STATISTICS_ASYNC moves that refresh to the background instead of blocking the triggering query — off by default.

## Segment 3 (code: when to change it)

Leave AUTO_CREATE and AUTO_UPDATE on in nearly every environment. Turn AUTO_UPDATE_STATISTICS_ASYNC on specifically for large, high-concurrency OLTP tables where a synchronous stats update causes a visible, unpredictable latency spike.

## Segment 4 (outro)

Stale statistics are one of the most common causes of a bad execution plan — these three settings are the first line of defense. Next up: extended database properties — sys.databases, DATABASEPROPERTYEX, and custom metadata.
