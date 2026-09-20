# Script — Scheduling PowerShell Scripts

## Segment 1 (title)

Every script built so far in this chapter is only automation once something actually triggers it without a person present. SQL Server Agent can technically run a PowerShell step, but it has real permission limitations that push most shops toward Windows Task Scheduler instead.

## Segment 2 (code: Register-ScheduledTask)

Register-ScheduledTask, from the built-in ScheduledTasks module, builds a Task Scheduler entry entirely from a script instead of clicking through the GUI — which matters if you're deploying the same scheduled job across many servers.

## Segment 3 (code: schtasks.exe, the classic equivalent)

Schtasks.exe predates the ScheduledTasks PowerShell module and still works identically. Useful to recognize in older scripts or remote deployment tooling — both ultimately create the exact same underlying Task Scheduler entry.

## Segment 4 (code: why not just SQL Server Agent?)

SQL Server Agent's PowerShell step runs under the Agent service account, not a dedicated account you choose per job. That's either too little access, so the script fails, or the account gets over-provisioned, expanding its blast radius across every job.

## Segment 5 (outro)

Task Scheduler lets you specify exactly which dedicated account each scheduled task runs under, scoped to what it actually needs. Next up: error handling in automation — logging patterns for scripts nobody's watching run in real time.
