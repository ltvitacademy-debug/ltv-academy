# Lesson 15 — Processes, Services & systemd

**Chapter 4 · Linux Fundamentals II — Administration · Lesson 15 of 32**

## What you'll learn

- What a process actually is, and how to see every process running on a Linux machine
- How to stop a misbehaving process with signals like `SIGTERM` and `SIGKILL`
- Why Linux distributions moved from older init systems to systemd
- How to start, stop, check, and enable a service with `systemctl`

## Every running program is a process

The moment a program runs on Linux, the kernel gives it a **process** — a running instance of
that program, tracked by a unique number called a **PID** (process ID). A single machine might
have hundreds of processes running at once: the SSH daemon, a web server, a database, and dozens
of background system processes, all with their own PID. The very first process the kernel starts
at boot always gets PID 1, and on a modern Linux system that process is `systemd`.

To see what's running, `ps aux` lists every process on the system:

```
$ ps aux | grep nginx
root      1142  0.0  0.3  12144  3012 ?        Ss   09:02   0:00 nginx: master process
www-data  1143  0.0  0.4  12516  4420 ?        S    09:02   0:00 nginx: worker process
```

That output shows the user running each process, its PID, CPU/memory usage, and the command
itself. For a live, constantly-updating view instead of a single snapshot, `top` (or the
friendlier `htop`, if installed) shows the same kind of data refreshing in real time, sorted by
whatever's using the most CPU or memory right now — the first place to look when a server feels
slow.

## Signals: asking a process to stop vs. forcing it

When a process needs to stop, you don't just delete it — you send it a **signal**, and the
process decides how to react. The two you'll use constantly:

- `SIGTERM` (signal 15) — a polite request to shut down. A well-behaved process catches this,
  closes its open files and network connections cleanly, and exits on its own terms.
- `SIGKILL` (signal 9) — an unconditional kill. The kernel terminates the process immediately,
  with no chance to clean up. This is the last resort, not the first move.

```
$ kill 1142          # sends SIGTERM by default — ask nicely first
$ kill -9 1142        # sends SIGKILL — only if it won't die
```

Always try a plain `kill` (SIGTERM) before reaching for `kill -9`. A database or web server that
gets `SIGKILL`'d mid-write can leave corrupted files behind, where `SIGTERM` gives it a chance to
finish what it's doing first.

## Services and why systemd replaced older init systems

A **service** (also called a daemon) is a process meant to run continuously in the background —
`sshd` for remote access, `nginx` for serving web traffic, `cron` for scheduled jobs. For years,
Linux distributions managed services with an older init system called **SysVinit**, which started
services one at a time, in a fixed order, using shell scripts. That worked, but it was slow (strictly
sequential boot) and inconsistent (every script handled starting, stopping, and status checks
slightly differently).

**systemd** replaced SysVinit on virtually every major distribution (Ubuntu, Debian, RHEL,
CentOS, Fedora) because it starts independent services in parallel instead of one at a time,
tracks dependencies between services explicitly, and gives every service a single, consistent
**unit file** describing how to start it, instead of a bespoke script. Unit files live in
`/etc/systemd/system/` (or `/lib/systemd/system/` for distro-provided services) and end in
`.service`.

## Managing services with systemctl

Whatever the service, the commands are identical — that consistency is the whole point:

```
$ systemctl status sshd
● ssh.service - OpenBSD Secure Shell server
     Loaded: loaded (/lib/systemd/system/ssh.service; enabled)
     Active: active (running) since Tue 2026-10-28 09:02:11 UTC

$ sudo systemctl stop sshd
$ sudo systemctl start sshd
$ sudo systemctl restart sshd
$ sudo systemctl enable sshd     # start automatically on every future boot
$ sudo systemctl disable sshd    # stop starting automatically on boot
```

`status` tells you whether a service is running right now and whether it's set to start on boot;
`start`/`stop`/`restart` control it immediately; `enable`/`disable` control whether it survives a
reboot. You'll use exactly this sequence — `status`, then `start` or `restart` — constantly once
you're administering real servers, including every cloud VM in the chapters ahead.

## Key terms

| Term | Meaning |
|---|---|
| Process | A running instance of a program, tracked by a unique PID |
| PID | Process ID — a unique number identifying a running process; the kernel's first process is PID 1 |
| Signal | A message sent to a process asking it to behave a certain way, e.g. `SIGTERM` or `SIGKILL` |
| systemd | The modern init system (PID 1) that starts, stops, and tracks services via unit files |
| Unit file | A `.service` file describing how systemd should start, stop, and manage a given service |

## Check yourself

Why should you always try `kill` (SIGTERM) on a stuck process before reaching for `kill -9`
(SIGKILL), even though both will eventually make the process go away?
