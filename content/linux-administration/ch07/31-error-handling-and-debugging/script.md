# Script — Error Handling & Debugging

## Segment 1 (title)

A script that fails silently is worse than one that doesn't exist — it gives you false confidence that a deploy or a backup actually happened. This lesson closes out Bash Scripting with the habits Northbridge Retail's ops team builds into every script: fail fast, fail loudly, and leave a trail when something does go wrong.

## Segment 2 (steps)

Set -e makes a script exit the moment any command returns a nonzero status, instead of Bash's default of quietly continuing on. Set -u catches a typo'd or missing variable name by erroring instead of silently substituting an empty string, and set -x traces every command, with its values already substituted in, right before it runs.

## Segment 3 (code)

A pipeline normally only reports the exit status of its last command, so if an earlier command in it fails, the overall pipeline can still look successful. Set -o pipefail fixes exactly that, making the pipeline's exit status reflect the first command in it that actually failed.

## Segment 4 (code)

Trap runs a command when a script exits, for any reason, including a normal finish, an error, or being interrupted with Ctrl-C. Northbridge's deploy scripts use trap on EXIT to always delete a temporary file, so a script that fails halfway through never leaves junk behind.

## Segment 5 (code)

When a script misbehaves, bash -x runs it with every command traced as it executes, which is usually the fastest way to see exactly what's happening and where it diverges from what you expected. A targeted echo to standard error, instead of standard out, is the quicker option when you just need to check one specific value.

## Segment 6 (outro)

Set -e, set -u, pipefail, and trap are how a script fails safely instead of quietly doing the wrong thing — and that closes out Bash Scripting. Up next, chapter eight, lesson thirty-two: the capstone kickoff, where you'll set up and harden a real Linux server for Northbridge Retail, putting this entire course to work.
