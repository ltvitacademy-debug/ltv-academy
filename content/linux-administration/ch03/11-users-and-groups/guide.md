# Users & Groups

Every owner and group name you saw in the last lesson's `ls -l` output comes from somewhere: three plain-text files that define every account and group on the system. On Northbridge Retail's servers, the ops team manages a growing roster — sysadmins, developers, and a couple of service accounts for backups and monitoring — entirely through those files and a handful of commands. This lesson covers where accounts live, how to create and modify them, and how group membership actually works.

## What you'll learn

- The structure of `/etc/passwd`, `/etc/shadow`, and `/etc/group`
- How to create, modify, and delete user accounts with `useradd`, `usermod`, and `userdel`
- How to create groups and add existing users to them
- How to check a user's identity and group memberships with `id` and `groups`

## /etc/passwd: the account roster

Every user account has one line in `/etc/passwd`, a colon-separated record:

```
$ grep jramirez /etc/passwd
jramirez:x:1002:1002:Julia Ramirez,Ops:/home/jramirez:/bin/bash
```

The fields, in order: username, a placeholder `x` (the real password lives elsewhere), UID (user ID), GID (primary group ID), a comment/full-name field (GECOS), home directory, and login shell. The `x` in the password field is the important detail — actual password hashes are never stored here, because `/etc/passwd` is world-readable.

## /etc/shadow: where the password hash actually lives

```
$ sudo grep jramirez /etc/shadow
jramirez:$6$rounds=656000$abc123...:19650:0:90:7:::
```

`/etc/shadow` holds the salted, hashed password and the aging rules (minimum/maximum days between changes, warning period), and — unlike `/etc/passwd` — it's readable only by root. This split exists so that tools needing account info (like `ls` resolving a UID to a name) don't need access to anything password-related.

## /etc/group: who belongs to which group

```
$ grep ops /etc/group
ops:x:1002:mchen,jramirez,svc-backup
```

Fields: group name, placeholder password field, GID, and a comma-separated list of **supplementary members** — users who belong to this group but don't have it as their primary group. A user's *primary* group is set in `/etc/passwd` instead, not listed here.

## Creating and managing users

```
$ sudo useradd -m -s /bin/bash -G ops newhire
$ sudo passwd newhire
$ sudo usermod -aG monitoring newhire
$ sudo userdel -r former_employee
```

`useradd -m` creates a home directory, `-s` sets the login shell, and `-G` adds supplementary groups at creation time. `passwd` sets the account's password afterward. `usermod -aG` **appends** a user to an additional group — leaving off `-a` would *replace* their supplementary groups entirely, a common mistake. `userdel -r` removes the account and its home directory.

## Creating groups and checking membership

```
$ sudo groupadd monitoring
$ id jramirez
uid=1002(jramirez) gid=1002(ops) groups=1002(ops),1005(monitoring)
$ groups jramirez
jramirez : ops monitoring
```

`groupadd` creates a new group with the next available GID. `id` shows a user's UID, primary GID, and every group they belong to; `groups` gives a shorter version of the same group list.

## Key terms

- **/etc/passwd** — world-readable file listing every account's username, UID, GID, home directory, and shell
- **/etc/shadow** — root-only file holding hashed passwords and password-aging rules
- **/etc/group** — file listing each group's GID and supplementary members
- **UID / GID** — the numeric user ID and group ID that Linux actually checks internally, with names in `/etc/passwd` and `/etc/group` as the human-readable layer on top
- **Primary vs. supplementary group** — a user has exactly one primary group (in `/etc/passwd`) and any number of supplementary groups (in `/etc/group`)
