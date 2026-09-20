# Script — Automating Security Audits

## Segment 1 (title)

A security audit is exactly the kind of task that gets skipped when it depends on someone remembering to run several manual checks. dbatools has real cmdlets for the common ones, and chaining them turns audit from an occasional exercise into a scheduled report.

## Segment 2 (code: Get-DbaLogin: what exists)

Get-DbaLogin is the starting point of any audit — you can't evaluate what you don't know exists. It returns every login on the instance, Windows and SQL authentication alike, with whether it's disabled and whether password expiration is even enforced.

## Segment 3 (code: Test-DbaLoginPassword: weak passwords)

Test-DbaLoginPassword checks SQL logins for genuinely weak password patterns — by default, an empty password or one matching the login name — using SQL Server's built-in PWDCOMPARE function. Point it at a custom dictionary to test a longer list.

## Segment 4 (code: Get-DbaDbOrphanUser: no matching login)

An orphaned user is a database user with no matching server login, commonly left behind after a dropped login or a restore to a different server. They can still hold permissions nobody's accountable for — a real security concern, not just clutter.

## Segment 5 (outro)

Run the individual checks, build one structured record, and only surface it loudly when something needs attention — the same pattern as health checks. Next up: scheduling these scripts with Windows Task Scheduler instead of running them by hand.
