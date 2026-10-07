# Logs & journalctl

When something goes wrong on a server, the logs are where you find out why. On a `systemd`-based distribution, `journald` collects log messages from every service, the kernel, and boot process into one place, and `journalctl` is how you read it. Northbridge Retail's ops team reaches for `journalctl` first whenever a service won't start — it's almost always faster than hunting through separate log files by hand.

## What you'll learn

- What `journald` collects and where it stores it
- How to filter `journalctl` output by service, time range, and priority
- How to follow logs live, the way you'd use `tail -f`
- Where traditional flat-file logs under `/var/log/` still fit in

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

## Key terms

- **journald** — the systemd logging daemon that collects messages from services, the kernel, and boot
- **`journalctl`** — the command-line tool for reading the systemd journal
- **`-u`** — filters journalctl output to a specific unit
- **`-f`** — follows journal output live, like `tail -f`
- **`-p`** — filters journalctl output by minimum severity level
- **`-b`** — filters journalctl output to a specific boot (`-b -1` is the previous boot)
- **`/var/log/`** — the traditional location for flat-file logs some services still write directly
