# Lesson 11 — The Linux Filesystem Hierarchy

**Chapter 3 · Linux Fundamentals I — The Shell & Filesystem · Lesson 11 of 32**

## What you'll learn

- The real Filesystem Hierarchy Standard (FHS) that every major Linux distro follows
- What actually lives in `/etc`, `/var`, `/home`, `/usr`, `/bin`, `/opt`, `/tmp`, and `/root`
- Why `/var/log` is usually the first place you look when something breaks
- How to read a top-level directory listing like someone who's done this before

## One tree, no drive letters

Windows gives you drive letters — `C:\`, `D:\`. Linux has no concept of a drive letter: everything,
no matter how many physical disks or network mounts are behind it, hangs off one single tree
starting at `/` (the "root" directory, not to be confused with the root user). A listing of `/` on
nearly any Linux distro looks almost identical, because it follows a shared convention called the
**Filesystem Hierarchy Standard (FHS)**. Once you know the FHS, you can navigate a server you've
never touched before, because the pieces are always roughly in the same place.

```
$ ls -la /
drwxr-xr-x   2 root root  4096 etc
drwxr-xr-x  13 root root  4096 var
drwxr-xr-x   4 root root  4096 home
drwxr-xr-x  10 root root  4096 usr
drwxr-xr-x   2 root root 12288 bin
drwxr-xr-x   2 root root  4096 opt
drwxrwxrwt   9 root root  4096 tmp
drwx------   3 root root  4096 root
```

## The directories worth knowing cold

| Directory | What actually lives there |
|---|---|
| `/etc` | System-wide configuration files — nearly every service on the box reads its settings from somewhere under here |
| `/var` | "Variable" data that changes while the system runs: logs, mail queues, databases, cached package files |
| `/home` | Each regular user's personal directory, e.g. `/home/alice` |
| `/usr` | The bulk of installed software and its supporting files — most of the actual OS lives here, not in `/bin` |
| `/bin` | Essential command binaries needed even in single-user/recovery mode — `ls`, `cp`, `cat`, etc. (on modern distros this is usually a symlink into `/usr/bin`) |
| `/opt` | Optional, self-contained third-party software that doesn't follow the normal package layout |
| `/tmp` | Temporary files any user or process can write to — contents are routinely wiped on reboot |
| `/root` | The root user's own home directory — note this is different from the `/` root directory itself |

## Why /var/log matters most of all

Of everything above, `/var/log` is the one directory you'll open more than any other, because it's
where the system and most services write their log files by default:

```
$ ls /var/log
syslog     auth.log   dpkg.log   nginx/
kern.log   cron.log   apt/       mysql/
```

`/var/log/syslog` (or `/var/log/messages` on RHEL-family systems) is the general system log — the
first thing worth checking when "something broke" and you don't yet know what. Individual
services, like `nginx` or `mysql`, often get their own subdirectory under `/var/log` for their
application-specific logs.

## Why this matters for troubleshooting

Once you know the FHS, a bug report like "the service won't start, check the config" or "find out
why it crashed" immediately tells you where to look — the config is under `/etc`, the evidence is
under `/var/log` — without having to search the whole disk. That's the entire point of a shared
standard: every distro, every cloud VM, every container built on Linux follows the same map.

## Key terms

| Term | Meaning |
|---|---|
| Filesystem Hierarchy Standard (FHS) | The shared convention that defines what each top-level Linux directory is for |
| Root directory (`/`) | The single top of the entire filesystem tree — not the same thing as the root user or `/root` |
| `/etc` | Where system-wide configuration files live |
| `/var/log` | Where the system and most services write their log files |

## Check yourself

A coworker tells you a service crashed overnight and asks you to find out why, without giving you
any other details. Which directory do you check first, and why?
