# Script — Scripting Patterns for DBA Work

## Segment 1 (title)

A one-off console command and a script other people or a scheduled task will run unattended are different problems. Three habits separate a script that's safe and reusable from one that's a liability: parameterizing, supporting -WhatIf, and splatting long parameter lists.

## Segment 2 (code: parameterize instead of hardcoding)

A script with a server name typed directly into it only ever runs against that one server. A param block turns the script into a reusable tool with defaults for values that usually don't change, instead of a single-use artifact you copy-paste and hand-edit every time.

## Segment 3 (code: -WhatIf on anything destructive)

Anything that deletes, drops, or overwrites data should support -WhatIf. CmdletBinding SupportsShouldProcess plus a call to PSCmdlet.ShouldProcess around the actual destructive line let a nervous first run preview exactly what the script would do without it happening.

## Segment 4 (code: splatting for readable parameter lists)

Once a command takes five or six parameters, one long line becomes hard to read and easy to typo. Splatting collects parameters into a hashtable and passes them with the at sign — every parameter on its own line, easy to add, remove, or review.

## Segment 5 (outro)

Parameterized, safe, and readable — that's the shape most production-ready DBA scripts should take. Next up: error handling — try, catch, finally, and why it matters more when an unhandled error can strike mid-maintenance-job.
