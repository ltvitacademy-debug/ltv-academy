# Logs & journalctl

When something goes wrong on a server, the logs are where you find out why. On a `systemd`-based distribution, `journald` collects log messages from every service, the kernel, and boot process into one place, and `journalctl` is how you read it. Northbridge Retail's ops team reaches for `journalctl` first whenever a service won't start — it's almost always faster than hunting through separate log files by hand.

## What you'll learn

- What `journald` collects and where it stores it
- How to filter `journalctl` output by service, time range, and priority
- How to follow logs live, the way you'd use `tail -f`
- Where traditional flat-file logs under `/var/log/` still fit in
- A full worked scenario: a service stuck restart-looping, and the real reason why

## Reading logs for a specific service

`-u` filters to a single unit's log entries — the same unit name you'd use with `systemctl`:

```
$ journalctl -u nginx
Oct 05 09:02:11 web01 systemd[1]: Started A high performance web server.
Oct 05 09:02:11 web01 nginx[1012]: nginx: configuration file /etc/nginx/nginx.conf test is successful
Oct 05 14:18:03 web01 nginx[1012]: 2026/10/05 14:18:03 [error] 1012#0: *88 connect() failed (111: Connection refused)
```

This is the first command Northbridge's ops team runs when `systemctl status nb-sync` shows a service as failed — it shows exactly what the service printed right before it died.

## Filtering by time and following live

`--since` and `--until` narrow the output to a time window:

```
$ journalctl -u nb-sync --since "1 hour ago"
$ journalctl -u nb-sync --since "2026-10-05 09:00:00" --until "2026-10-05 10:00:00"
```

`-f` follows the log in real time, exactly like `tail -f` on a flat file — useful while redeploying a service and watching it come back up:

```
$ journalctl -u nb-sync -f
Oct 05 14:20:01 web01 systemd[1]: Started Northbridge sync worker.
Oct 05 14:20:02 web01 node[2301]: Sync worker connected to inventory DB
```

Press `Ctrl+C` to stop following.

## Filtering by priority and boot

`-p` filters by severity, using the same levels as `syslog` — `err`, `warning`, `info`, `debug`, etc. — and shows that level and everything more severe:

```
$ journalctl -u nginx -p err
Oct 05 14:18:03 web01 nginx[1012]: 2026/10/05 14:18:03 [error] 1012#0: *88 connect() failed (111: Connection refused)
```

`-b` shows logs from the current boot only; `-b -1` shows the previous boot, which matters when diagnosing a crash that happened right before a reboot:

```
$ journalctl -b -1 -u nb-sync
```

## Where /var/log still fits in

Not everything goes through `journald`. Some services, and some distributions' package defaults, still write plain text logs directly under `/var/log/` — nginx's access and error logs are a common example, viewable with the same tools you already know:

```
$ tail -f /var/log/nginx/access.log
$ grep "GET /api/inventory" /var/log/nginx/access.log
```

`journalctl` and flat files under `/var/log/` aren't competitors — check which one a given service actually uses before assuming.

## Troubleshooting scenario: nb-sync stuck restart-looping

**Problem description.** `nb-sync`, Northbridge's inventory sync worker, is alternating between
`activating` and `failed` every few seconds. `systemctl restart nb-sync` appears to work for a
moment, then it fails again.

**Available evidence.**

```
$ systemctl status nb-sync
● nb-sync.service - Northbridge sync worker
     Loaded: loaded (/etc/systemd/system/nb-sync.service; enabled)
     Active: activating (auto-restart) (Result: exit-code) since 14:32:09
    Process: 8891 ExecStart=/usr/bin/node /opt/nb-sync/worker.js (code=exited, status=1)
```

`systemctl status` confirms the service is crashing and auto-restarting, but its own output is
truncated and doesn't say *why* the process exits — that's exactly what `journalctl` is for.

**Diagnostic questions.**

- What does the service itself print right before each exit — not just that it exited?
- Is this the first time it's failed, or did something change recently? `-b -1` and `--since`
  both help answer that.
- Is the failure actually inside `nb-sync`'s own code, or is something it depends on (disk space,
  a mounted volume, a database connection) the real cause?

**Expected investigation sequence.**

```
# Step 1 -- read what the service itself said right before dying
$ journalctl -u nb-sync -p err --since "10 minutes ago"
Oct 05 14:32:07 web01 node[8891]: Error: ENOSPC: no space left on device, write
    '/opt/nb-sync/cache/inventory-snapshot-20261005.json'
Oct 05 14:32:07 web01 systemd[1]: nb-sync.service: Main process exited, code=exited, status=1

# Step 2 -- the error names a specific, checkable condition: is the
# disk actually full?
$ df -h /opt/nb-sync
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda2        40G   40G     0 100% /opt

# Step 3 -- confirm what's actually consuming the space, rather than
# guessing where to clean up
$ du -sh /opt/nb-sync/cache/* | sort -rh | head -5
18G   /opt/nb-sync/cache/inventory-snapshot-20260928.json
17G   /opt/nb-sync/cache/inventory-snapshot-20260921.json
...
```

**Correct resolution.** `nb-sync` writes a daily inventory snapshot into `/opt/nb-sync/cache/`
and nothing ever deletes the old ones — the disk filled up with weeks of accumulated snapshots,
not because of a sudden spike. Clearing the oldest snapshots restores free space immediately
(`systemctl start nb-sync` then succeeds), but the actual fix is adding a retention policy — a
cron job or a small change to `nb-sync` itself — that deletes snapshots older than a few days, so
this doesn't recur on exactly the same schedule next month.

**Why this failure happens, and why `systemctl status` alone wasn't enough.** `systemctl status`
correctly identifies *that* something is wrong and shows the process's exit code, but a generic
`status=1` exit code carries no information about *why* — that detail only exists in what the
process printed to its own logs, which is precisely what `journalctl -u` surfaces. This is also a
case where the failure looks like an application bug (a service crash-looping) but the actual
root cause is entirely external to the application's code — a full disk is an infrastructure
condition, not a logic error, and no amount of reading `worker.js` would have found it.

**Prevention.** A `df`-based monitoring check alerting before a volume hits 90% (not 100%) would
catch this hours or days before it becomes a crash-looping service — the disk filling up was
observable well before `nb-sync` actually failed. This is also why Chapter 5's "Resource
Monitoring" lesson pairs naturally with this one: `df`/`du` and `journalctl` answer different
halves of the same question — current state versus what already happened.

## Key terms

- **journald** — the systemd logging daemon that collects messages from services, the kernel, and boot
- **`journalctl`** — the command-line tool for reading the systemd journal
- **`-u`** — filters journalctl output to a specific unit
- **`-f`** — follows journal output live, like `tail -f`
- **`-p`** — filters journalctl output by minimum severity level
- **`-b`** — filters journalctl output to a specific boot (`-b -1` is the previous boot)
- **`/var/log/`** — the traditional location for flat-file logs some services still write directly
- **`ENOSPC`** — the kernel error meaning "no space left on device" — an infrastructure condition, not an application bug, even though it surfaces as an application crash
