# Lesson 13 — Linux Users, Groups & Permissions

**Chapter 3 · Linux Fundamentals I — The Shell & Filesystem · Lesson 13 of 32**

## What you'll learn

- How to create and manage users and groups with `useradd`, `usermod`, and `groupadd`
- The real `rwx` permission model, and how to read it as both letters and octal numbers
- How to change permissions with `chmod` and ownership with `chown`
- What the root user is, and why `sudo` exists instead of just logging in as root

## Creating users and groups

```
$ sudo useradd -m -s /bin/bash jsmith
$ sudo passwd jsmith
$ sudo groupadd developers
$ sudo usermod -aG developers jsmith
$ groups jsmith
jsmith : jsmith developers
```

`useradd` creates a new user account — `-m` creates their home directory (`/home/jsmith`), and `-s
/bin/bash` sets their default shell. `passwd` sets or resets that user's password. `groupadd`
creates a new group, and `usermod -aG groupname username` adds an existing user to an existing
group (`-a` appends, rather than replacing their other group memberships — leaving off `-a` is a
classic mistake that silently removes someone from every other group they were in).

## Reading permissions: rwx and octal

Every file and directory on Linux carries a permission string, visible with `ls -l`:

```
$ ls -l deploy.sh
-rwxr-xr--  1 jsmith developers  812 Oct 28 09:00 deploy.sh
```

That string breaks into four parts: the file type (`-` for a regular file, `d` for a directory),
then three groups of three characters — **owner**, **group**, and **everyone else** — each made of
`r` (read), `w` (write), and `x` (execute). `rwxr-xr--` means the owner can read/write/execute, the
group can read/execute, and everyone else can only read.

Each `rwx` triplet also has a numeric value: `r=4`, `w=2`, `x=1`, added together. So `rwx` = 7,
`r-x` = 5, `r--` = 4. That's where **octal permissions** come from — `chmod 755 file` sets owner=7
(`rwx`), group=5 (`r-x`), other=5 (`r-x`), which is exactly the permission set you'll see on nearly
every executable script and web server file on a real Linux box.

## Changing permissions and ownership

```
$ chmod 755 deploy.sh
$ ls -l deploy.sh
-rwxr-xr-x  1 jsmith developers  812 Oct 28 09:00 deploy.sh

$ sudo chown jsmith:developers deploy.sh
```

`chmod` changes the permission bits, either as octal (`755`) or symbolically (`chmod u+x deploy.sh`
adds execute for the owner). `chown user:group file` changes who owns the file and which group owns
it — both matter, because the owner and group columns in `ls -l` are exactly what the `rwx` triplets
are being checked against.

## Root, and why sudo exists

The **root** user is Linux's superuser — it bypasses every permission check and can do literally
anything on the system, including delete the entire filesystem by accident with one mistyped
command. Working logged in as root all the time is dangerous for exactly that reason. **`sudo`**
("superuser do") lets an authorized regular user run a *single* command with root privileges, after
re-entering their own password, and that action gets logged. That's why production servers almost
never let anyone log in directly as root — everyone uses their own account plus `sudo`, so there's
an audit trail of who ran what.

## Key terms

| Term | Meaning |
|---|---|
| `rwx` | Read, write, execute — the three permission bits, checked separately for owner, group, and everyone else |
| Octal permission | The numeric shorthand for `rwx` (`r`=4, `w`=2, `x`=1), e.g. `chmod 755` |
| `chown` | Changes which user and group own a file |
| `sudo` | Lets an authorized user run one command as root, with the action logged |

## Check yourself

A script shows permissions `rw-r--r--`. Who can actually execute it, and what single `chmod`
command (in octal) would give the owner execute permission too?
