# Lesson 16 — Cron, systemd Timers, and Scheduled Task Security

**Chapter 4 · Linux Administration Deep Dive · Lesson 16 of 32**

## What you'll learn

- Real crontab syntax, and the difference between a user's own crontab and system-wide jobs in
  `/etc/cron.d/`
- systemd timer units as the modern alternative to cron, and what they offer that cron doesn't
- The real privilege-escalation risk in a root-run scheduled script that's writable by anyone
- How to check a server's actual scheduled tasks and judge whether they're safe

## crontab: five fields and a command

```
$ crontab -e
# m h  dom mon dow   command
0  2   *   *   *     /opt/scripts/backup.sh
*/15 *  *   *   *    /opt/scripts/healthcheck.sh
```

`crontab -e` edits the current user's own crontab; `crontab -l` lists it. The five fields are
minute, hour, day-of-month, month, and day-of-week, in that order, followed by the command.
`*` means "every unit" in that field, so `0 2 * * *` runs at 2:00 AM every day, and `*/15 * * * *`
runs every 15 minutes. Jobs in a personal crontab always run as that user.

System-wide jobs — `/etc/crontab` and files under `/etc/cron.d/` — carry one extra field: the
user to run the command as. That's because there's no single personal owner the way there is
with `crontab -e`; the file has to say explicitly which account each job runs under.
`/etc/cron.daily`, `cron.weekly`, and `cron.monthly` hold simple scripts run on that cadence via
`run-parts`, with no cron syntax required at all.

## systemd timers: the modern alternative

```
# /etc/systemd/system/backup.timer
[Timer]
OnCalendar=*-*-* 02:00:00
Persistent=true

[Install]
WantedBy=timers.target
```

```
# /etc/systemd/system/backup.service
[Service]
ExecStart=/opt/scripts/backup.sh
```

```
$ sudo systemctl enable --now backup.timer
$ systemctl list-timers
```

A systemd **timer unit** pairs with a same-named **service unit**: the `.timer` file defines when
to run, the `.service` file defines what to run. `OnCalendar=` sets the schedule — the same idea
as cron's five fields, in a more readable form. `Persistent=true` catches up a run that was missed
because the machine was powered off at the scheduled time, something plain cron can't do at all.
`systemctl list-timers` shows every timer on the box and its next and last run in one place, and
timer-driven services log through `journalctl` alongside every other systemd-managed service,
instead of cron's separate mail-based logging.

## The real risk: a writable script run by root

```
$ ls -l /opt/scripts/backup.sh
-rwxrwxrwx 1 root root 912 Oct 28 09:00 backup.sh
```

This script is called from root's crontab (or a root-owned timer) — but it's world-writable. Any
unprivileged user on the box can edit `backup.sh` to run whatever they want, and the next time
cron or the timer fires, root executes it. That's a direct, real privilege-escalation path, not a
theoretical one — it's one of the first things a penetration tester or auditor checks on a Linux
server. The fix: a script invoked by a root-owned scheduled task should be owned by root and not
writable by group or other — `chmod 750` or `chmod 700`, never `777` — and the directory holding
it (`/opt/scripts` here) shouldn't be world-writable either, since a writable directory lets
someone replace the file entirely even if the file itself is locked down.

## Key terms

| Term | Meaning |
|---|---|
| `crontab` | A user's personal table of scheduled jobs, edited with `crontab -e` |
| `/etc/cron.d/` | System-wide cron jobs; each line names the user to run as |
| systemd timer unit | A `.timer` unit paired with a `.service` unit — the modern cron alternative |
| `OnCalendar=` | The systemd timer directive that sets the schedule |
| Writable scheduled script | A root-run script anyone can edit — a direct privilege-escalation path |

## Check yourself

`ls -l /opt/scripts/report.sh` shows `-rwxrwxrwx root root`, and it's called from root's crontab
every night. What's the real risk here, and what `chmod` command actually fixes it?
