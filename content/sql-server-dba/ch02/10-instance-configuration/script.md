# Script — Instance Configuration

## Segment 1 (title)

sp_configure is the stored procedure behind most server-level configuration options, and it's worth understanding as a system, not just a list of settings to memorize one at a time.

## Segment 2 (code: The general mechanism)

Run it with no parameters to list current values, or with an option name and value plus RECONFIGURE to change one. show advanced options reveals roughly 70 hidden options that Microsoft keeps out of view by default because most can hurt performance if changed casually.

## Segment 3 (steps: Two commonly-tuned options)

remote query timeout controls how long a linked-server query waits before giving up, defaulting to 600 seconds — some environments shorten it so a flaky dependency fails fast instead of hanging a caller. Fill factor controls how full index pages are packed, and a lower value trades disk space for fewer page splits on write-heavy indexes.

## Segment 4 (outro)

Fill factor is usually better set per-index with FILLFACTOR at rebuild time than changed instance-wide, since only specific indexes tend to suffer from page splits. Next up: server-level settings — the default trace, error log, and more sp_configure territory.
