# sudo & Privilege

Northbridge Retail's ops team never logs in as root, and nobody shares the root password — that would make it impossible to know who ran what. Instead, specific people are granted specific privileged commands through `sudo`, with every use logged. This lesson covers how `sudo` works, how to configure it safely with `visudo`, and how it differs from the older `su` approach to becoming another user.

## What you'll learn

- The difference between `su` and `sudo`
- How to read and write rules in `/etc/sudoers` using `visudo`
- How to grant a group passwordless access to specific commands
- How to check what a user is allowed to run with `sudo -l`

## su vs. sudo

`su` ("switch user") starts a new shell as another user, and by default that's root — but it requires knowing the *target* account's password:

```
$ su -
Password: ********
#
```

`sudo` ("superuser do") runs a single command as another user (root by default), and it checks the *calling* user's own password, not root's — and only if that user is explicitly permitted:

```
$ sudo systemctl restart nginx
[sudo] password for mchen:
```

Because `sudo` is scoped to one command at a time and tied to the sudoers configuration, it's the standard approach for day-to-day privileged work; `su -` to a full root shell is reserved for rare cases like single-user recovery.

## Editing /etc/sudoers safely with visudo

`/etc/sudoers` controls who can run what, as whom. Never edit it with a plain text editor — a syntax error could lock out every admin, including you. `visudo` edits a temporary copy and validates the syntax before saving:

```
$ sudo visudo
```

A sudoers rule follows this pattern: `user_or_group  host = (runas_user) commands`

```
mchen   ALL=(ALL) ALL
%ops    ALL=(ALL) ALL
jramirez ALL=(root) /usr/bin/systemctl restart nginx, /usr/bin/systemctl status nginx
```

The first line lets `mchen` run anything, as anyone, on any host. The `%ops` line does the same for every member of the `ops` group (the `%` prefix marks a group rule). The `jramirez` line is scoped tightly: she can only restart or check the status of nginx, as root, and nothing else.

## Passwordless sudo for specific commands

Some automated or frequently repeated tasks use `NOPASSWD` so a script or operator isn't prompted every time:

```
svc-deploy ALL=(ALL) NOPASSWD: /usr/bin/systemctl reload nginx
```

This should be scoped as narrowly as possible — `NOPASSWD: ALL` on a real account defeats much of the purpose of logging and accountability that `sudo` exists for.

## Checking your own sudo access

```
$ sudo -l
User jramirez may run the following commands on web01:
    (root) /usr/bin/systemctl restart nginx
    (root) /usr/bin/systemctl status nginx
```

`sudo -l` lists exactly what the current user is permitted to run, which is the fastest way to confirm a sudoers edit took effect — or to diagnose a "permission denied" before assuming the sudoers file is broken.

## Key terms

- **sudo** — runs a single command as another user (root by default), authenticating with the caller's own password
- **su** — starts a full login shell as another user, authenticating with that target account's password
- **/etc/sudoers** — the file defining who can run what command, as whom, on which host
- **visudo** — the only safe way to edit /etc/sudoers; validates syntax before saving
- **NOPASSWD** — a sudoers tag that skips the password prompt for the listed commands
