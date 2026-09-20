# Managing Schema Drift

Every practice this chapter has covered so far — source control, deployment tooling,
documentation — rests on one assumption: that source control actually describes what's running
in production. That assumption breaks more often than teams like to admit, and when it does,
it's called schema drift.

## What you'll learn

- What schema drift is and the ordinary ways it happens
- How to actually detect it before it causes a failed deployment
- Why drift is a process problem, not just a technical one

## What schema drift actually is

**Schema drift** is the gap between what source control (a database project, a set of scripts)
says the schema should be, and what the live database actually looks like. It happens in
completely mundane ways: someone adds an index directly in production during an incident to fix
a slow query and never backports it to the project. A developer adds a column in the dev
environment to test something, and it accidentally makes it to production through a copy but
never gets added to source control. A hotfix gets applied by hand under time pressure, with
every intention of "committing it properly later," and later never comes. None of these are
exotic failures — they're exactly what happens when the process from Lesson 49 has a gap
somewhere.

## Why drift causes deployment failures

Drift is quiet until a deployment surfaces it. If a DACPAC-based deployment (Lesson 50) tries
to publish a schema that assumes a table doesn't have an index it now actually has, or that a
column exists that was removed by hand, the generated diff script can fail outright, or — worse
— it can "succeed" while silently undoing someone's undocumented production fix. This is exactly
why "just deploy the DACPAC" isn't automatically safe: the tool trusts that the live database
matches what it expects walking in, and drift is the thing that breaks that trust.

## Detecting drift before it bites

The real fix is comparing the live database against the source-of-truth on a regular basis, not
waiting to discover drift during a deployment. The practical version of this is a schema-compare
step: generating a DACPAC (or equivalent schema snapshot) from the current source control state
and comparing it against a snapshot of the live database, looking specifically for objects that
exist in one but not the other, or that exist in both but differ. SSDT's schema-compare tooling
does exactly this, and running it as a recurring check — not just before a deployment — turns
drift from a deployment-day surprise into something caught and reconciled while it's still small.

## Drift is a process problem

The comparison step catches drift; it doesn't prevent it. The actual fix is closing the gap that
let the change happen out-of-process in the first place — a rule that no live change ships
without also updating source control, even (especially) an emergency hotfix. A DBA who fixes
something live under pressure and does the follow-up commit the next morning is doing the job
right; a DBA who fixes it live and considers the incident closed is the reason schema-compare
reports keep finding surprises.

## Key terms

| Term | Meaning |
|---|---|
| Schema drift | The gap between what source control says the schema should be and what's actually live |
| Schema compare | Comparing a source-of-truth snapshot (e.g., a DACPAC) against the live database to find differences |
| Out-of-process change | A schema change made directly against a database without going through source control first |

## Check yourself

A DACPAC deployment fails with an error about a column that "already exists," but source
control shows no record of anyone adding it. What's the most likely explanation, and what
would you check first?
