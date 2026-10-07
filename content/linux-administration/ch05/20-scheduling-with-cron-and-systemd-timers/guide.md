# Scheduling With cron & systemd Timers

Plenty of work doesn't need to run continuously as a service — it needs to run at 2 a.m. every night, or every fifteen minutes, then exit. `cron` is the classic Linux scheduler for exactly that, and `systemd` timers do the same job while integrating with everything you just learned about units and logs. Northbridge Retail schedules its nightly inventory export with `cron` on older boxes and is migrating newer ones to `systemd` timers for the better logging.

## What you'll learn

- How to read and write a `cron` schedule expression
- Where crontabs live, and the difference between a user crontab and `/etc/cron.d`
- How to pair a `systemd` timer unit with a service unit to run something on a schedule
- Why `systemd` timers are easier to debug than `cron` jobs

## Reading and writing a crontab

`crontab -e` opens the current user's crontab for editing; `crontab -l` lists it. Each line has five time fields, then the command:

```
# minute  hour  day-of-month  month  day-of-week   command
     0      2        *         *         *         /opt/northbridge/export-inventory.sh
    */15    *        *         *         *         /opt/northbridge/check-queue.sh
     0      9        *         *        1-5        /opt/northbridge/send-daily-report.sh
```

The first line runs at 2:00 a.m. every day. `*/15` in the minute field means "every 15 minutes." `1-5` in the day-of-week field means Monday through Friday (0 and 7 both mean Sunday). A `*` in any field means "every value."

```
$ crontab -l
0 2 * * * /opt/northbridge/export-inventory.sh
```

## System-wide crontabs

A user's own crontab, edited with `crontab -e`, runs as that user. For jobs that need to run as a specific system account without switching users first, `/etc/cron.d/` holds system crontab files with one extra field — the user to run as:

```
$ cat /etc/cron.d/northbridge-exports
0 2 * * * nbapp /opt/northbridge/export-inventory.sh
```

`/etc/crontab` works the same way. Files dropped in `/etc/cron.daily/`, `/etc/cron.weekly/`, etc. are simpler still — just executable scripts, no schedule syntax needed, run by `cron` on that cadence.

## systemd timers

A `systemd` timer is a unit that triggers another unit on a schedule. It needs two files sharing the same name — a `.timer` and a `.service`:

```
# /etc/systemd/system/nb-export.service
[Unit]
Description=Northbridge Retail nightly inventory export

[Service]
Type=oneshot
ExecStart=/opt/northbridge/export-inventory.sh

# /etc/systemd/system/nb-export.timer
[Unit]
Description=Run nb-export.service nightly at 2am

[Timer]
OnCalendar=*-*-* 02:00:00
Persistent=true

[Install]
WantedBy=timers.target
```

`Type=oneshot` tells `systemd` this service is expected to run once and exit, not stay running. `Persistent=true` means if the server was off at 2 a.m., the job runs as soon as it's back up instead of waiting for the next scheduled time.

```
$ sudo systemctl enable --now nb-export.timer
$ systemctl list-timers nb-export.timer
NEXT                         LEFT      LAST  PASSED  UNIT
Tue 2026-10-06 02:00:00 UTC  14h left  n/a   n/a     nb-export.timer
```

## Why timers are easier to debug than cron

A `cron` job's output, unless redirected, gets mailed to the user by default (or silently dropped if mail isn't configured) — there's no built-in history of past runs. A `systemd` timer's service unit runs through the normal `systemd` logging path, so `journalctl -u nb-export.service` shows every past run, its exit status, and anything it printed, without any extra setup.

## Key terms

- **cron** — the classic Linux daemon that runs commands on a recurring schedule
- **Crontab** — the file listing a user's (or system's) scheduled cron jobs
- **`*/15`** — cron syntax for "every 15 units" of that time field
- **`/etc/cron.d/`** — holds system crontabs where you specify which user runs each job
- **systemd timer** — a `.timer` unit that triggers a paired `.service` unit on a schedule
- **`OnCalendar=`** — a timer directive specifying a calendar-based schedule
- **`Persistent=true`** — runs a missed timer job as soon as the system is back up
