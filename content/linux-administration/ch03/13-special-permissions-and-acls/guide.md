# Special Permissions & ACLs

Regular rwx permissions cover most of what Northbridge Retail's servers need, but a few situations don't fit neatly into "owner, group, other." A password-changing utility needs to write to a file it doesn't own. A shared project directory needs new files to automatically inherit the right group. A shared temp directory needs to stop one user from deleting another user's files. And sometimes a single extra user needs access to one file without changing its owner or group at all. This lesson covers the three special permission bits — setuid, setgid, and the sticky bit — plus ACLs, the tool for that last case.

## What you'll learn

- What setuid and setgid do, and why setuid on a directory has no effect
- How the sticky bit protects shared directories like /tmp
- How to set each special bit in both symbolic and octal (4000/2000/1000) notation
- How to grant one extra user or group access with `setfacl` and inspect it with `getfacl`

## setuid: run as the file's owner, not the caller

A setuid executable runs with the privileges of the file's **owner**, not the user who launched it. This is how `passwd` lets an ordinary user update their own password even though `/etc/shadow` is root-only:

```
$ ls -l /usr/bin/passwd
-rwsr-xr-x 1 root root 68208 Mar 10  2024 /usr/bin/passwd
```

The lowercase `s` in the owner's execute slot marks setuid. Setting it: `chmod u+s file` or `chmod 4755 file` — the leading `4` is the setuid bit.

## setgid: inherit the group, not just run as it

On a file, setgid works like setuid but for the group. On a **directory**, it does something more commonly used: every new file or subdirectory created inside automatically inherits the directory's group, instead of the creating user's primary group:

```
$ sudo chmod g+s /srv/northbridge/invoices
$ ls -ld /srv/northbridge/invoices
drwxr-s--- 2 jramirez ops 4096 Oct  2 11:00 invoices
$ touch /srv/northbridge/invoices/newfile && ls -l /srv/northbridge/invoices/newfile
-rw-r----- 1 mchen ops 0 Oct  2 11:05 newfile
```

Even though `mchen`'s primary group might be something else entirely, `newfile` comes out owned by the `ops` group — exactly what a shared team directory needs. Octal form: `chmod 2770 invoices`.

## The sticky bit: protect shared directories

On a directory, the sticky bit restricts deletion: a file inside can only be removed or renamed by its owner (or root), even if other users have write access to the directory itself. `/tmp` is the textbook example:

```
$ ls -ld /tmp
drwxrwxrwt 10 root root 4096 Oct  2 11:10 /tmp
```

The `t` at the end replaces what would otherwise be the "other-execute" slot. Set it with `chmod +t /shared/scratch` or `chmod 1777 /shared/scratch`.

## Combining and reading the bits in octal

The three special bits combine as a leading fourth digit: setuid = 4000, setgid = 2000, sticky = 1000. `chmod 4755` sets setuid plus 755; `chmod 2770` sets setgid plus 770; `chmod 1777` sets sticky plus 777. They can also be summed together, like `chmod 6750` for both setuid and setgid.

## ACLs: permissions for one more user, without changing owner or group

Standard permissions only name one owner and one group. When Northbridge needs to give a single auditor read access to `invoices/` without changing its owner, group, or the rest of the team's access, an ACL (Access Control List) handles it:

```
$ sudo setfacl -m u:auditor:r-x /srv/northbridge/invoices
$ getfacl /srv/northbridge/invoices
# file: invoices
# owner: jramirez
# group: ops
user::rwx
user:auditor:r-x
group::r-x
mask::r-x
other::---
```

`setfacl -m` adds or modifies an entry (`u:auditor:r-x` grants that one user read+execute); `getfacl` displays every ACL entry on a file or directory. A `+` appended to the permission string in `ls -l` is the signal that a file carries ACL entries beyond the normal owner/group/other bits.

## Key terms

- **setuid** — a file runs with the privileges of its owner, not the caller; set with `u+s` or a leading `4`
- **setgid** — on a file, runs with the group's privileges; on a directory, new contents inherit the directory's group; set with `g+s` or a leading `2`
- **Sticky bit** — on a directory, only a file's owner (or root) can delete or rename it; set with `+t` or a leading `1`
- **ACL (Access Control List)** — permission entries for specific extra users or groups beyond the standard owner/group/other
- **setfacl / getfacl** — set and view ACL entries on a file or directory
