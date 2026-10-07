# Permissions & Ownership

Welcome to Chapter 3 of Linux Administration. Northbridge Retail's ops team runs its order-processing and web servers as a shared, multi-user Linux environment — developers, the DBA, and the sysadmins all touch the same filesystem. Every file and directory on that system carries an owner, a group, and a permission string that decides who can read it, write to it, or run it. This lesson teaches you to read that permission string, change it correctly, and understand where the defaults on a brand-new file actually come from.

## What you'll learn

- How to read the ten-character permission string shown by `ls -l`
- How to change permissions with `chmod`, in both symbolic and octal notation
- How to change file and group ownership with `chown` and `chgrp`
- How the `umask` determines the default permissions a new file or directory gets

## Reading permissions with ls -l

Every entry in a long listing starts with a ten-character permission string, followed by owner and group:

```
$ ls -l /srv/northbridge/
total 24
-rw-r--r-- 1 mchen   ops  48213 Oct  2 09:14 orders.csv
-rwxr-x--- 1 mchen   ops   1024 Oct  2 09:20 deploy.sh
drwxr-x--- 2 jramirez ops   4096 Oct  2 08:55 invoices
```

The first character is the file type: `-` for a regular file, `d` for a directory (`l` for a symlink). The next nine characters are three **rwx triplets** — owner, group, then everyone else (often called "other") — where each triplet is read, write, execute in that order, and a dash means that bit is off. `orders.csv` is `rw-r--r--`: the owner (mchen) can read and write it, the `ops` group can only read it, and everyone else can only read it too. `deploy.sh` is `rwxr-x---`: the owner can read, write, and execute it; the group can read and execute it; everyone else gets nothing.

## Changing permissions with chmod

`chmod` sets permissions two ways. **Symbolic mode** adjusts one category at a time using `u` (user/owner), `g` (group), `o` (other), or `a` (all), with `+`, `-`, or `=`:

```
$ chmod u+x deploy.sh
$ chmod g-w orders.csv
$ chmod o= orders.csv
```

**Octal mode** sets all nine bits in one shot. Each triplet is a sum: read = 4, write = 2, execute = 1. `rwx` = 7, `r-x` = 5, `r--` = 4, nothing = 0. So `chmod 750 deploy.sh` means owner = 7 (rwx), group = 5 (r-x), other = 0 (---):

```
$ chmod 750 deploy.sh
$ ls -l deploy.sh
-rwxr-x--- 1 mchen ops 1024 Oct  2 09:20 deploy.sh
```

Add `-R` to apply recursively to a directory and everything inside it: `chmod -R 750 /srv/northbridge/invoices`.

## Changing ownership with chown and chgrp

Permissions decide *what* owner/group/other can do; ownership decides *who* owner and group actually are. `chown` changes the owning user (and optionally the group, with a colon); `chgrp` changes only the group. Both normally require `sudo`, because handing a file to someone else is a privileged action:

```
$ sudo chown jramirez:ops orders.csv
$ sudo chgrp ops invoices
$ ls -l orders.csv
-rw-r----- 1 jramirez ops 48213 Oct  2 09:14 orders.csv
```

`chown -R user:group directory` recurses the same way `chmod -R` does — useful after Northbridge onboards a new team member who needs to inherit an existing project directory.

## The umask and default permissions

New files don't start at `777`. The **umask** is a bitmask that gets subtracted from a starting point: `666` (rw-rw-rw-) for new files, `777` (rwxrwxrwx) for new directories — files never get the execute bit by default, even with a permissive umask. Northbridge's servers use the common default of `022`:

```
$ umask
0022
$ touch newfile.txt && ls -l newfile.txt
-rw-r--r-- 1 mchen ops 0 Oct  2 10:02 newfile.txt
$ mkdir newdir && ls -ld newdir
drwxr-xr-x 2 mchen ops 4096 Oct  2 10:02 newdir
```

`666 - 022 = 644` for the file, `777 - 022 = 755` for the directory. Run `umask 027` to tighten that for the rest of the session, or set it in a shell profile to make it permanent for a user.

## Key terms

- **rwx triplet** — read, write, execute permissions for one category (owner, group, or other)
- **Octal notation** — permissions expressed as three digits, each the sum of read (4), write (2), execute (1)
- **chmod** — changes a file's permission bits
- **chown / chgrp** — change a file's owning user / owning group
- **umask** — the mask subtracted from default permissions (666 for files, 777 for directories) when a new file or directory is created
