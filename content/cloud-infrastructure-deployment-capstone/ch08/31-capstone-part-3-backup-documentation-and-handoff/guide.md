# Lesson 31 — Capstone Part 3: Backup, Documentation, and Handoff

**Chapter 8 · Job-Ready Capstone: Full Deployment Project · Lesson 31 of 32**

## What you'll learn

- How to turn a business-stated RTO and RPO into a different backup configuration for each
  resource, instead of one generic "nightly backup" policy applied everywhere
- Why testing an actual restore — not just confirming a backup job completed — is the only way
  to know a backup policy really works
- How to write an architecture diagram, runbook, and handoff checklist for the next engineer,
  not as a formality for yourself after the fact
- How a permission-shaped error that shows up during final testing gets diagnosed systematically,
  the same way Chapter 7 teaches, instead of guessed at

## RTO 4 hours, RPO 1 hour — a business decision, not a technical one

Dana states the numbers plainly: Harrow Peak Outfitters can tolerate the environment being down
for up to 4 hours before it's a real problem (**RTO**), and it can afford to lose at most 1 hour
of order data if something has to be restored from a backup (**RPO**). Chapter 5 is clear that
these numbers come from the business and then drive the backup design — not the other way
around. They land differently on each resource: `harrowpeak-orders-db`'s continuous transaction
log backups give point-in-time restore within minutes, comfortably inside a 1-hour RPO. The app
VM holds mostly stateless configuration, so a daily Azure Backup job is enough for it. The
storage account gets blob soft delete, versioning, and geo-redundant storage, protecting invoices
and product images against accidental deletion as well as a regional outage.

## Testing the restore, not just trusting the job

A backup job that reports "succeeded" every night proves nothing about whether a restore will
actually work — Chapter 5's whole point. So you test three, for real. A test invoice gets
deleted and recovered from blob soft delete. `harrowpeak-orders-db` gets a point-in-time restore
to a scratch database, and the test order row is confirmed intact in it. The app VM gets restored
from a recovery point and confirmed to boot clean. All three pass before this backup policy
counts as done — a restore nobody has tested is a backup policy nobody can actually trust.

## Documentation written for the next engineer

Chapter 6's distinction matters here: this isn't documentation written to remind yourself later,
it's written for whoever inherits this environment and has never seen it. The architecture
diagram gets updated to as-built. The runbook covers restarting the app service, what each of the
four alerts means and what to do about it, and who to call. The handoff checklist confirms every
RBAC assignment is documented, both backups and their restores are tested and dated, monitoring
contacts are correct, and two deferred items — multi-region failover and a second admin contact —
are written down honestly instead of left implied.

## The permission error, found systematically

During the final test pass, a blob upload fails with a 403 — a permission-shaped error, right
when everything was supposed to be done. Chapter 7's method applies exactly: is this connectivity
or identity? A connection test to the storage endpoint succeeds, so it isn't network-down. The
managed identity's `Storage Blob Data Contributor` role assignment is checked and confirmed
correct. The next layer is the storage account's own network rules — and there's the cause:
its firewall is set to allow only selected virtual networks, and `mgmt-subnet` was added to that
list by mistake during buildout instead of `app-subnet`. Adding `app-subnet` to the allowed list
fixes it; the retest returns a clean 200, and only then does the project move to handoff.

## Key terms

| Term | Meaning |
|---|---|
| RTO (Recovery Time Objective) | How long the business can tolerate downtime before it's a real problem — drives restore speed, not backup frequency |
| RPO (Recovery Point Objective) | How much data loss the business can tolerate, measured in time — drives how often backups must run |
| Restore test | Actually recovering data from a backup and verifying it, as opposed to trusting that a backup job reporting success means a restore will work |
| Handoff checklist | A written, honest list confirming access, backups, monitoring, and open items for the next engineer, not a formality for the person who built it |

## Check yourself

Before Lesson 32: the 403 error during final testing looked like a permission problem, but the
actual fix was a network rule. What two things did checking the RBAC role assignment rule out,
and why did that make the network rule the next place to look?
