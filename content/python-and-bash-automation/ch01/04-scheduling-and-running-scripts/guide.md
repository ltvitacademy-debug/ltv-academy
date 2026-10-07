# Scheduling & Running Scripts

Northbridge Retail's nightly backup script needs to run at 2 AM, every night, without anyone remembering to kick it off by hand. This lesson covers the two ways to schedule that on Linux — cron and systemd timers — plus how to launch a long-running job from an interactive session without it dying the moment you disconnect, and the one habit that keeps every scheduled failure from vanishing into silence: always redirecting output to a log file.

## What you'll learn

- Cron syntax (`minute hour day month weekday`) and editing your crontab with `crontab -e`
- Why cron output should always be redirected to a log file, never left to disappear
- systemd timers as the modern alternative to cron, and why teams are moving toward them
- `nohup` and `disown` for starting a long-running job from an SSH session that will later disconnect

## Cron syntax and `crontab -e`

A cron schedule is five fields: minute, hour, day-of-month, month, day-of-week (`*` means "any"). Run `crontab -e` to open your personal crontab in an editor and add a line like this:

```
# m h dom mon dow   command
0 2 *   *   *       /opt/northbridge/scripts/nightly-backup.sh >> /var/log/northbridge/backup.log 2>&1
```

`0 2 * * *` reads as "minute 0, hour 2, any day of month, any month, any day of week" — every night at 2:00 AM. Two other common patterns:

```
*/15 * * * *   /opt/northbridge/scripts/health-check.sh >> /var/log/northbridge/health.log 2>&1
0 3 * * 0      /opt/northbridge/scripts/weekly-cloud-cleanup.sh >> /var/log/northbridge/cleanup.log 2>&1
```

`*/15 * * * *` means "every 15 minutes." `0 3 * * 0` means "3:00 AM, only on Sunday" (day-of-week 0).

## Never let cron output disappear

Cron normally emails command output to the owning user — but on most servers, nothing is set up to actually deliver that mail, so by default a failing cron job fails **completely silently**. The fix is the `>> logfile 2>&1` at the end of every cron line above:

- `>>` appends standard output to the log file (instead of `>`, which would overwrite it on every run)
- `2>&1` redirects file descriptor 2 (stderr) into wherever file descriptor 1 (stdout) is currently going — the log file

Without `2>&1`, error messages printed to stderr would still vanish even with `>>` in place. Also remember that cron runs with a minimal environment and no login shell — always use absolute paths (`/opt/northbridge/scripts/...`, not `./scripts/...`) inside cron-invoked scripts, since cron doesn't have your interactive `PATH`.

## systemd timers: the modern alternative

systemd timers replace a crontab line with two small unit files, but give you dependency management, better logging (via `journalctl`), and automatic catch-up for missed runs. A service file defines *what* to run:

```ini
# /etc/systemd/system/northbridge-backup.service
[Unit]
Description=Northbridge nightly backup

[Service]
Type=oneshot
ExecStart=/opt/northbridge/scripts/nightly-backup.sh
StandardOutput=append:/var/log/northbridge/backup.log
StandardError=append:/var/log/northbridge/backup.log
```

A timer file defines *when*:

```ini
# /etc/systemd/system/northbridge-backup.timer
[Unit]
Description=Run the Northbridge backup service nightly at 2 AM

[Timer]
OnCalendar=*-*-* 02:00:00
Persistent=true

[Install]
WantedBy=timers.target
```

`Persistent=true` means if the server was off at 2 AM, the job still runs once it's back up, instead of silently skipping that day — something plain cron can't do. Enable it with:

```bash
sudo systemctl enable --now northbridge-backup.timer
systemctl list-timers | grep northbridge
```

## `nohup` and `disown` for long-running jobs

Sometimes you kick off a long job interactively over SSH — say, a one-off cloud-cost cleanup — and you need it to keep running after you disconnect. Normally, closing the SSH session sends `SIGHUP` to every job started in it, killing them:

```bash
nohup /opt/northbridge/scripts/cloud-cost-cleanup.sh > /var/log/northbridge/cleanup.log 2>&1 &
disown
```

`nohup` makes the process ignore `SIGHUP`, so it survives the session closing. The trailing `&` backgrounds it immediately. `disown` then removes the job from the current shell's job table, which on some shells is needed to fully detach it from the terminal. The output redirect matters here too, for the same reason as cron — without it, output has nowhere to go once the terminal that would have displayed it is gone.

## Key terms

- **`crontab -e`** — opens the current user's cron schedule for editing
- **Cron fields** — `minute hour day-of-month month day-of-week`, each `*` meaning "any value"
- **systemd timer** — a `.timer` unit paired with a `.service` unit; the modern alternative to cron, with logging via `journalctl` and `Persistent=true` catch-up
- **`nohup`** — runs a command immune to `SIGHUP`, so it survives the launching session ending
- **`disown`** — removes a background job from the current shell's job table

## Recap

Cron and systemd timers both exist to run a script on a schedule without a human remembering to do it — cron is simpler for a quick line, systemd timers give better logging and catch-up behavior for anything that matters. Either way, always redirect both stdout and stderr to a log file, because unredirected scheduled-job output doesn't get read by anyone — it just disappears. For a one-off long job started by hand, `nohup ... & disown` keeps it alive after you log out. That wraps up Chapter 1 — next, Chapter 2 moves from bash into Python for automation.
