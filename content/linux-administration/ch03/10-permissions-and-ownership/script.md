# Script — Permissions & Ownership

## Segment 1 (title)

Welcome to Chapter 3 of Linux Administration. Northbridge Retail's ops team runs a multi-user Linux server, and every file on it carries an owner, a group, and a set of permissions. This lesson teaches you to read that permission string and change it correctly.

## Segment 2 (code)

Every line of ls -l output has ten permission characters: a file type, then three rwx triplets for owner, group, and everyone else. Here, orders.csv is readable and writable by owner mchen, but only readable by the ops group and by everyone else. deploy.sh adds execute for owner and group, with nothing for other. A leading d marks a directory instead of a regular file.

## Segment 3 (code)

chmod changes those bits two ways. Symbolic mode adds or removes one permission at a time, like u+x to make a script executable. Octal mode sets all nine bits at once: 750 means the owner gets read, write, and execute, the group gets read and execute, and everyone else gets nothing.

## Segment 4 (code)

Ownership is separate from permissions. chown changes who owns a file, chgrp changes which group owns it, and you normally need sudo to hand a file to someone else. Here, jramirez takes ownership of orders.csv, which stays in the ops group and is now locked down to owner and group only.

## Segment 5 (steps)

New files don't get full permissions by default — the umask subtracts from a starting point. Files start at 666 and directories at 777; with the common umask of 022, new files land at 644 and new directories at 755. Run umask alone to see the current value, or add a umask line to a shell profile to make a stricter default permanent for a user.

## Segment 6 (outro)

You can now read, set, and reason about Linux permissions and ownership. Next up, lesson eleven: users and groups, where those owner and group names actually come from.
