# Script — Logs & journalctl

## Segment 1 (title)

When something goes wrong on a server, the logs are where you find out why. On a systemd-based distribution, journald collects log messages from every service, the kernel, and the boot process into one place, and journalctl is how you read it.

## Segment 2 (code)

The -u flag filters journalctl to a single unit's entries, using the same unit name you'd use with systemctl. This is the first command Northbridge Retail's ops team runs whenever systemctl status shows a service as failed, because it shows exactly what that service printed right before it died.

## Segment 3 (code)

The --since and --until flags narrow output to a specific time window, which is useful for tracing back to when a problem actually started. The -f flag follows the journal live, exactly like tail -f on a flat file, which is handy while redeploying a service and watching it come back up.

## Segment 4 (code)

The -p flag filters by minimum severity, using the same levels as syslog, so -p err shows only error-level entries and anything more severe. The -b flag restricts output to a specific boot — -b -1 means the previous boot, which matters when a crash happened right before a reboot wiped the running state.

## Segment 5 (steps)

Not every service logs through journald — some, including nginx by default, still write plain text logs directly under /var/log, readable with tools you already know like tail and grep. journalctl and flat files aren't competitors; the only mistake is assuming one when a service actually uses the other.

## Segment 6 (outro)

Logs tell you what already happened. Up next, chapter five, lesson twenty-two: resource monitoring, for watching CPU, memory, and disk right now, before a problem becomes something you have to read about in a log afterward.
