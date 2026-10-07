# Script — sudo & Privilege

## Segment 1 (title)

Northbridge Retail's ops team never logs in as root, and nobody shares the root password — that would make it impossible to know who ran what. This lesson covers sudo: how it's configured, and how it differs from the older su approach.

## Segment 2 (steps)

su starts a full shell as another user, root by default, and it needs that target account's own password. sudo instead runs one command as root, checked against the calling user's own password, and only if they're explicitly permitted. That scoping is why sudo is the everyday tool, while su is reserved for rare cases such as single-user recovery when no other account can log in.

## Segment 3 (code)

/etc/sudoers controls all of this, and you edit it only with visudo, which validates syntax before saving so a typo can't lock out every admin. A rule reads user or group, host, then the run-as user and commands in parentheses. A percent sign marks a group rule, like %ops getting full access, while jramirez is scoped down to just restarting nginx as root. Rules are read top to bottom, and a later, more specific rule can override an earlier broad one.

## Segment 4 (code)

NOPASSWD skips the password prompt for a listed command, which is useful for scripts and automated deploys that can't type a password interactively. Keep it narrow — a real human account with NOPASSWD: ALL erases most of the accountability sudo exists to provide in the first place.

## Segment 5 (code)

sudo -l is the fastest way to check what you're actually allowed to run. It lists every command a sudoers rule grants the current user, which beats guessing whether an edit to the file took effect.

## Segment 6 (outro)

You can now configure and audit sudo access safely. Next up, lesson thirteen: special permissions and ACLs, for the handful of cases regular rwx bits can't express.
