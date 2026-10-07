# Script — Special Permissions & ACLs

## Segment 1 (title)

Regular rwx permissions cover most of what Northbridge's servers need, but a few situations don't fit "owner, group, other" at all. This lesson covers setuid, setgid, the sticky bit, and ACLs — the tools for those exceptions.

## Segment 2 (code)

setuid makes an executable run with the privileges of its owner, not whoever launched it. That's how an ordinary user can update their own password through passwd, even though the shadow file underneath is root-only. You'll see it as a lowercase s in the owner's execute slot, or set it with chmod 4755.

## Segment 3 (code)

On a directory, setgid does something different and more common: every new file created inside automatically inherits that directory's group, instead of the creating user's own primary group. That's exactly what a shared team folder like Northbridge's invoices directory needs, set with chmod g+s or octal 2770, so files stay consistently owned by the team group no matter who creates them.

## Segment 4 (code)

The sticky bit protects shared, world-writable directories like /tmp. With it set, a file inside can only be deleted or renamed by its own owner, even though everyone can write to the directory itself. You'll see it as a trailing t, set with chmod 1777.

## Segment 5 (code)

Sometimes none of that is enough — you need to grant one extra user access without touching the owner or group at all. Standard permissions only name one owner and one group, with no room for a single exception. That's what an ACL does. setfacl adds an entry for a specific user or group, and getfacl shows every ACL entry a file carries, visible as a plus sign at the end of its ls -l permissions.

## Segment 6 (outro)

Permissions, ownership, users, groups, sudo, special bits, and ACLs — that's the full access-control picture for a Linux server. Next, Chapter 4 moves into process and service management.
