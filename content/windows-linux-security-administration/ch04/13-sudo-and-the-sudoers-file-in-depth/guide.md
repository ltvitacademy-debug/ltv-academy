# Lesson 13 — sudo and the sudoers File in Depth

**Chapter 4 · Linux Administration Deep Dive · Lesson 13 of 32**

## What you'll learn

- Why every sudo privilege on a Linux box traces back to one file, `/etc/sudoers`, and how to read its line syntax
- How to grant a specific user or group rights to run only certain commands as root, instead of full sudo access
- Why you always edit that file with `visudo`, never with a plain text editor
- What `/etc/sudoers.d/` is for, and why most real-world sudo grants live there instead of in the main file

## Reading a sudoers line

```
$ sudo visudo

root    ALL=(ALL:ALL) ALL
%sudo   ALL=(ALL:ALL) ALL
```

Every line in `/etc/sudoers` follows the same shape: **who where=(as whom) what**. `root` and
`%sudo` (a group — the `%` prefix marks it as one, not a user) are the **who**. The first `ALL` is
the **where** — the host this rule applies on, which matters because the same `sudoers` file is
often pushed to many servers at once. `(ALL:ALL)` is **as whom** — which user and group the
command actually runs as, almost always root. The final `ALL` is **what**: every command, with no
restriction. That's full sudo access, and it's rarely what you actually want to hand out.

## Granting one command, not root

```
jsmith    ALL=(root) /usr/bin/systemctl restart nginx
deployer  ALL=(root) NOPASSWD: /usr/bin/systemctl restart nginx
```

The first line gives `jsmith` the right to restart nginx as root — and nothing else. No shell
access, no other service, no file access. That's the principle of least privilege applied to sudo
itself: don't hand out `ALL=(ALL) ALL` when a single command is all the job actually needs. The
second line adds `NOPASSWD:`, which skips sudo's usual password re-prompt for that one rule — used
for automation accounts (a deploy script that calls `sudo systemctl restart nginx` with no human
at the keyboard to type a password), never for a real interactive user, since it removes the one
check that limits what a stolen session can do.

Notice that both command entries are absolute paths (`/usr/bin/systemctl`, not `systemctl`).
That's deliberate: sudo refuses to trust `$PATH` for a privileged command, so an attacker can't
drop a malicious script named `systemctl` earlier in a victim's path and have sudo silently run it
as root instead of the real binary.

## Why visudo, never a plain text editor

```
$ sudo visudo
>>> /etc/sudoers: syntax error near line 14 <<<
What now?
```

`/etc/sudoers` controls every sudo grant on the box, including the ability to fix `/etc/sudoers`
itself. Edit it directly with `nano` or `vim`, save a typo, and sudo can refuse to run for
*anyone* — and since repairing a broken sudoers file normally requires sudo, you can lock yourself
out entirely, down to needing single-user mode or physical console root access to recover.
`visudo` exists specifically to prevent that: it opens the file in your editor as usual, but
**validates the grammar before it allows the save**. A bad edit throws a parse error right there
and refuses to write the broken version to disk, so the live file is never left in a state that
breaks sudo.

## /etc/sudoers.d/: where real-world grants actually live

The default `/etc/sudoers` ends with a line like `#includedir /etc/sudoers.d`, which tells sudo to
also read every file in that directory as sudoers content. In practice, administrators almost
never add new rules to the main file at all — they drop a focused file like
`/etc/sudoers.d/90-deployer` containing just the one grant, and edit it safely with
`sudo visudo -f /etc/sudoers.d/90-deployer`, which syntax-checks that file the same way. Keeping
each grant in its own file makes it trivial to see who has what, and to remove a single grant
later without touching anything else.

## Key terms

| Term | Meaning |
|---|---|
| `/etc/sudoers` | The file that defines every sudo privilege on the system |
| `visudo` | The only safe way to edit sudoers — validates syntax before saving |
| `%group` | A `%`-prefixed name in sudoers referring to a group, not a single user |
| `NOPASSWD:` | A sudoers tag that skips the password re-prompt for that one rule |
| `/etc/sudoers.d/` | Directory of modular, focused sudoers grant files, included automatically |

## Check yourself

Why does sudo insist on absolute paths (`/usr/bin/systemctl`) in a sudoers command list instead
of just the command name, and what specific attack does that prevent?
