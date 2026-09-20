# Rolling Back a Bad Deployment

Every practice in this chapter is aimed at making deployments safe — but "safe" isn't the same
as "never fails." Eventually a deployment will cause a problem in production, and what a DBA
does in the next ten minutes matters as much as everything that led up to it. This lesson
closes the chapter with what a real rollback looks like.

## What you'll learn

- Why "just restore from backup" is often the wrong first instinct
- What a tested rollback script actually is, and why it has to exist *before* deployment
- When point-in-time restore is genuinely the right tool, as a last resort

## The instinct to avoid: reaching straight for a restore

When a deployment goes wrong, the fastest-sounding fix is often "restore from last night's
backup." It's also, in a lot of cases, the wrong first move. A restore rolls back *everything*
in the database to that point in time — including every legitimate transaction that happened
between the backup and now. If a deployment went out at 2pm and broke something at 2:15, but
the database has been taking real orders since 9am, restoring last night's backup throws away
five-plus hours of real data to fix a fifteen-minute-old problem. Data loss should be the last
resort, not the first reaction.

## The right first move: a tested rollback script

The better answer is one that has to be prepared *before* the deployment happens, not
improvised after: a rollback script that reverses exactly the change the deployment made,
written and tested alongside the deployment script itself. If the deployment added a column,
the rollback drops that column (or at minimum stops the application from writing to it). If it
altered a stored procedure, the rollback restores the previous version of that procedure — which
is exactly why the "version control for database objects" habit from Lesson 49 pays off here: the
previous version is sitting in source control history, not lost.

A rollback script that's only written after something breaks, under pressure, with no testing,
is a second deployment risk stacked on top of the first one. Treating the rollback script as
part of the deployment — reviewed and tested in a lower environment right alongside the forward
change — is what makes "roll back" a fast, boring, reliable option instead of a second gamble.

## When point-in-time restore is actually the right call

None of this means restore is never the answer. If a deployment (or a bug it exposed) actually
corrupted or deleted data — not just broke a procedure's logic, but destroyed rows that need to
come back — a scripted rollback can't recreate lost data; only a restore can. SQL Server's
point-in-time restore, using the transaction log, can bring a database back to a specific moment
just before the damage occurred. This is a real, legitimate tool — it's just the second option,
reached for once you've confirmed a scripted rollback genuinely can't undo the damage, not the
reflexive first response to any bad deployment.

## Key terms

| Term | Meaning |
|---|---|
| Rollback script | A tested script that reverses a specific deployment's changes, prepared before the deployment ships |
| Point-in-time restore | Restoring a database to a specific moment using the transaction log, recovering lost/corrupted data |
| Data loss risk | The cost of a full restore: every legitimate transaction since the restore point is discarded |

## Check yourself

A deployment at 2pm broke a stored procedure's logic, with no data corruption. It's now 2:20pm
and the database has taken real transactions all day. What should happen first — a restore, or
something else — and why?
