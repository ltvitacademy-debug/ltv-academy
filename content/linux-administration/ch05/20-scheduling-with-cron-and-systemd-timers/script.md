# Script — Scheduling With cron & systemd Timers

## Segment 1 (title)

Plenty of work doesn't need to run continuously as a service — it needs to run at 2 a.m. every night, or every fifteen minutes, then exit. Cron is the classic Linux scheduler for exactly that, and systemd timers do the same job while integrating with units and logs you already know.

## Segment 2 (code)

A crontab line has five time fields, then the command to run. A slash-15 in the minute field means every fifteen minutes, and a range like one through five in the day-of-week field means Monday through Friday — Northbridge Retail uses lines just like these for its nightly inventory export and weekday reports.

## Segment 3 (code)

A user's own crontab, edited with crontab dash e, runs as that user. For a job that needs to run as a specific system account, /etc/cron.d holds system crontab files with one extra field naming exactly which user the job runs as.

## Segment 4 (steps)

A systemd timer pairs two unit files sharing the same name — a dot-service file, marked Type=oneshot since it's expected to run once and exit, and a dot-timer file carrying the actual schedule under OnCalendar. Enabling the timer with --now activates that schedule without ever starting the service directly.

## Segment 5 (code)

Cron's output, unless you redirect it yourself, gets mailed to the user or silently dropped, with no built-in history of past runs. A systemd timer's service runs through the normal systemd logging path, so journalctl against that service shows every past run and its exit status without any extra setup at all.

## Segment 6 (outro)

Whether it's cron or a systemd timer, scheduled work is how a server does nightly, hourly, or periodic tasks without anyone triggering them by hand. Up next, chapter five, lesson twenty-one: logs and journalctl, for reading exactly what a service did, and when.
