# Lesson 15 — Linux File Permissions Beyond the Basics: ACLs and the Sticky Bit

**Chapter 4 · Linux Administration Deep Dive · Lesson 15 of 32**

## What you'll learn

- Why the basic owner/group/other `rwx` model runs out of road the moment you need a second user
  or group with different access
- How to view and set Access Control Lists with `getfacl` and `setfacl`
- What the ACL `mask` entry does, and how the trailing `+` on a permission string tells you a
  file has one
- What the sticky bit actually protects on a shared, world-writable directory like `/tmp`

## Where rwx runs out of road

The owner/group/other model gives you exactly three slots: the owner, one group, and everyone
else. That's enough for most files, but it breaks down the moment a real need shows up — granting
a second specific user read access without adding them to the file's group, or granting a second
group entirely different access, since there's only one group slot on a file. **Access Control
Lists (ACLs)** extend permissions past those three fixed slots.

## Reading and setting an ACL

```
$ getfacl report.csv
# file: report.csv
# owner: jsmith
# group: developers
user::rw-
group::r--
other::---

$ setfacl -m u:auditor:r-- report.csv
$ setfacl -m g:qa:rw- report.csv
$ getfacl report.csv
# file: report.csv
# owner: jsmith
# group: developers
user::rw-
user:auditor:r--
group::r--
group:qa:rw-
mask::rw-
other::---
```

`setfacl -m` modifies a file's ACL. `u:auditor:r--` adds a named-user entry — `auditor` gets
read-only access without joining the file's group at all — and `g:qa:rw-` does the same for a
named group. `getfacl` prints every entry on the file, base permissions and all. The `mask::`
line caps the **maximum effective permission** any named user or group entry can actually use,
even if the entry itself grants more; `setfacl` recalculates it automatically unless you pass
`-n`. `setfacl -x u:auditor report.csv` removes a single named entry, and `setfacl -b report.csv`
strips every ACL entry back to plain `rwx`.

One more tell worth knowing: `ls -l` on a file with an ACL shows a trailing `+` right after the
permission string (`-rw-rw-r--+`) — the signal that there's more to see with `getfacl`.

## The sticky bit: protecting a shared, writable directory

```
$ ls -ld /tmp
drwxrwxrwt 10 root root 4096 Oct 28 09:00 /tmp
```

`/tmp` is deliberately world-writable (`rwxrwxrwx`, or `777`) so any user or process on the
system can drop a temp file there. But plain write permission on a *directory* also means "you
can delete or rename anything inside it" — which, on its own, would let any user delete any other
user's temp files. The **sticky bit** changes that: inside a sticky directory, only a file's
owner (or root) can delete or rename that file, no matter who else has write access to the
directory itself. It shows up as the trailing `t` in `drwxrwxrwt` — lowercase `t` when execute is
also set (as it is here), uppercase `T` if it isn't. Set it with `chmod +t dirname` or
`chmod 1777 dirname` — the leading `1` in a four-digit octal mode is the sticky bit.

## Key terms

| Term | Meaning |
|---|---|
| ACL | Access Control List — permissions for named users/groups beyond owner/group/other |
| `setfacl` | Command that adds, modifies, or removes ACL entries on a file |
| `getfacl` | Command that displays every ACL entry on a file |
| `mask` | The ACL entry that caps the effective permission of named user/group entries |
| Sticky bit | On a shared, writable directory, restricts delete/rename of a file to its owner (or root) |

## Check yourself

`ls -l /tmp` shows `drwxrwxrwt`. Why is `/tmp` world-writable in the first place, and what does
the trailing `t` actually stop that plain `rwx` permissions alone wouldn't?
