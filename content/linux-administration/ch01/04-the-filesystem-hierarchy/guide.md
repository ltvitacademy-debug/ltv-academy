# The Filesystem Hierarchy

Northbridge Retail's team now has Ubuntu running. Before anyone edits a config file or reads a log, they need to know where things actually live — and Linux organizes that very differently from Windows. There's no `C:\` or `D:\`; there's exactly one tree, starting at `/`, and everything else — other disks included — gets attached somewhere inside it. This lesson is your map of that tree.

## What you'll learn

- Why Linux uses a single-rooted tree instead of drive letters, and what "mounting" means
- What lives in each of the major top-level directories, and why it matters which one you're in
- How to inspect the real filesystem on a running machine with `ls` and `df`
- Why DevOps tooling depends on this layout being predictable across every Linux machine you'll ever touch

## One tree, no drive letters

Every Windows user knows `C:\Users\...` and `D:\Backups\...` as separate drives. Linux has no equivalent concept at the top level. There is one root directory, `/`, and every other storage device — a second disk, a USB drive, a network share — gets **mounted** onto some folder inside that single tree rather than getting its own letter. If a second disk gets mounted at `/mnt/backups`, then `/mnt/backups` behaves exactly like any other folder, even though the files underneath it physically live on a different piece of hardware.

## A tour of the top-level directories

This layout is standardized across virtually every distribution by the **Filesystem Hierarchy Standard (FHS)**, which is exactly why a server built by Northbridge's team looks structurally the same whether it's Ubuntu, Debian, or RHEL:

| Directory | What lives there |
|---|---|
| `/etc` | System-wide configuration files — almost everything you'll edit as an admin |
| `/home` | Personal directories for regular users, e.g. `/home/maria` |
| `/root` | The home directory for the root (superuser) account specifically |
| `/var` | Data that changes while the system runs: logs (`/var/log`), mail, databases |
| `/tmp` | Temporary files, typically cleared on reboot |
| `/usr` | The bulk of installed software and its supporting files |
| `/usr/bin` | Most user-facing commands (modern distros symlink `/bin` here) |
| `/opt` | Self-contained third-party applications installed outside the package manager |
| `/dev` | Device files representing hardware — disks, terminals, etc. |
| `/proc` | A virtual filesystem exposing live kernel and process information |
| `/mnt`, `/media` | Conventional mount points for manually-mounted or removable storage |

## Seeing it live

Theory is fine, but the real tree is one command away:

```
$ ls -la /
drwxr-xr-x  20 root root  4096 Oct  3 09:12 .
lrwxrwxrwx   1 root root     7 Jun 22  2023 bin -> usr/bin
drwxr-xr-x  19 root root  3820 Oct  6 08:00 dev
drwxr-xr-x 140 root root 12288 Oct  6 07:58 etc
drwxr-xr-x   3 root root  4096 Sep 10 14:22 home
drwx------   4 root root  4096 Oct  5 22:14 root
lrwxrwxrwx   1 root root     8 Jun 22  2023 sbin -> usr/sbin
drwxrwxrwt  12 root root  4096 Oct  6 09:03 tmp
drwxr-xr-x  14 root root  4096 Apr 20  2023 usr
drwxr-xr-x  13 root root  4096 Apr 20  2023 var
```

Notice `bin` and `sbin` are symlinks into `/usr` — modern Ubuntu merged those directories years ago, but kept the old paths working as links so nothing breaks. To see what's actually mounted where, and how much space is left:

```
$ df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/root        29G   11G   17G  39% /
tmpfs           987M     0  987M   0% /dev/shm
/dev/sda15      105M  6.1M   99M   6% /boot/efi
```

## Why this layout matters for DevOps work

Automation tooling, deployment scripts, and monitoring agents all assume this layout holds true on every machine:

- Configuration management tools (Ansible, Puppet) deploy files to `/etc` because that's where every distro expects config to live.
- Monitoring agents tail `/var/log` because that's the FHS-mandated home for logs, regardless of which application wrote them.
- A deployment script that installs your company's own application under `/opt/northbridge-app` is following convention — `/opt` exists specifically for software that doesn't come from the distro's package manager.

Memorize this map once, and it transfers to every Linux server you'll ever administer — that consistency is the entire point of the standard.

## Key terms

- **Filesystem Hierarchy Standard (FHS)** — the specification defining what each top-level Linux directory is for, followed by virtually every distribution
- **Root directory (`/`)** — the single top of the entire filesystem tree; everything else is beneath it
- **Mount / mount point** — attaching a storage device's filesystem onto a folder inside the single tree, rather than giving it its own drive letter
- **`/etc`** — system-wide configuration files
- **`/var`** — data that changes at runtime, including logs under `/var/log`
- **`/opt`** — the conventional home for self-contained third-party or in-house applications
