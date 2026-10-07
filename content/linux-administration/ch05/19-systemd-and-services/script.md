# Script — systemd & Services

## Segment 1 (title)

Backgrounding a process with nohup works for one terminal session, but it's not how a production server runs its software. systemd is the init system on nearly every modern distribution, starting services at boot, restarting them if they crash, and giving you one command, systemctl, to control all of it.

## Segment 2 (code)

systemctl status shows whether a service is active, how long it's been running, and its main PID, all in one glance. Checking nginx this way tells you immediately whether the service is healthy without needing to grep through a process list by hand.

## Segment 3 (code)

Start, stop, and restart control a service's current running state, and all three require sudo because they affect the whole system. A restart is the standard move after deploying a config change — it stops the old process and starts a fresh one in a single command.

## Segment 4 (steps)

Start runs a service right now and says nothing about the next reboot; enable creates a symlink so systemd starts it automatically at boot, but doesn't touch whether it's running currently. Combining enable with the --now flag does both at once, which is the normal way to bring up a service you want running immediately and after every future restart.

## Segment 5 (code)

Northbridge Retail runs its inventory sync worker as its own systemd unit instead of a background job, specifically for the Restart=on-failure line — if the worker crashes, systemd restarts it automatically, no page to anyone's phone required. After adding or editing a unit file, daemon-reload tells systemd to re-read it from disk before enabling and starting it.

## Segment 6 (outro)

systemd turns a script into a managed service that survives crashes and reboots without anyone babysitting it. Up next, chapter five, lesson twenty: scheduling with cron and systemd timers, for running a job on a schedule instead of just once at boot.
