# systemd & Services

Backgrounding a process with `nohup` works for one terminal session, but it's not how a production server runs its software. `systemd` is the init system on nearly every modern distribution — it starts services at boot, restarts them if they crash, and gives you one consistent command, `systemctl`, to control all of it. Northbridge Retail runs its API and its sync worker as `systemd` services precisely so a crash at 3 a.m. gets an automatic restart instead of a page to someone's phone.

## What you'll learn

- What a unit file is, and where service units live on disk
- How to start, stop, restart, and check the status of a service with `systemctl`
- The difference between enabling a service and starting it
- How to write a minimal custom unit file for your own application

## Checking and controlling a service

`systemctl status` shows whether a service is running, its recent log lines, and its PID:

```
$ systemctl status nginx
● nginx.service - A high performance web server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
     Active: active (running) since Mon 2026-10-05 09:02:11 UTC; 3h ago
   Main PID: 1012 (nginx)
      Tasks: 3 (limit: 4617)
     Memory: 5.2M
```

`start`, `stop`, and `restart` control the running process; all three require `sudo` since they affect the whole system:

```
$ sudo systemctl restart nginx
$ sudo systemctl stop nginx
$ sudo systemctl start nginx
```

## enable vs. start

`start` runs a service right now; it says nothing about what happens on the next reboot. `enable` creates a symlink that tells `systemd` to start the service automatically at boot, but doesn't touch its current running state:

```
$ sudo systemctl enable nginx
Created symlink /etc/systemd/system/multi-user.target.wants/nginx.service → /lib/systemd/system/nginx.service
```

Running both together is normal for a service you want up now and at every future boot:

```
$ sudo systemctl enable --now nginx
```

`disable` removes the boot-time symlink without stopping the service that's currently running.

## Writing a custom unit file

Northbridge's sync worker runs as its own unit at `/etc/systemd/system/nb-sync.service`:

```
[Unit]
Description=Northbridge Retail inventory sync worker
After=network.target

[Service]
ExecStart=/usr/bin/node /opt/northbridge/sync-worker.js
Restart=on-failure
User=nbapp
WorkingDirectory=/opt/northbridge

[Install]
WantedBy=multi-user.target
```

`After=network.target` delays startup until networking is up. `Restart=on-failure` tells `systemd` to restart the process automatically if it exits with a non-zero status — this is the whole reason to run a worker as a unit instead of a background job. `User` runs it as an unprivileged account rather than root.

After adding or editing a unit file, `systemd` needs to re-read it from disk:

```
$ sudo systemctl daemon-reload
$ sudo systemctl enable --now nb-sync
```

## Key terms

- **systemd** — the init system that boots, supervises, and stops services on most modern Linux distributions
- **Unit file** — a configuration file (`.service`, `.timer`, etc.) describing how systemd should manage something
- **`systemctl`** — the command used to control and inspect systemd units
- **`enable` / `disable`** — controls whether a unit starts automatically at boot
- **`start` / `stop` / `restart`** — controls a unit's current running state
- **`Restart=on-failure`** — a unit directive that automatically restarts a crashed service
- **`daemon-reload`** — tells systemd to re-read unit files after they've changed on disk
