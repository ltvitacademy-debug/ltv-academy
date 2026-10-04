# Lesson 22 — Automating Quality Checks · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Every rule, check, and threshold in this chapter is only as good as
how reliably it actually runs. This lesson is about making that
automatic.

## S2 · STEPS — Why automation is the point

A brilliant check that one person remembers to run every couple of
weeks isn't a quality program — it's a habit that will eventually
lapse, usually right before the week something actually breaks.
Automation turns detection from sometimes into always.

## S3 · SCREENSHOT — SQL Server Agent

Right here in Object Explorer — the SQL Server Agent node, where
every scheduled job in this lesson actually gets created and managed.

## S4 · CODE — Scheduling a job

A job built around a quality check is a T-SQL job step whose command
is the check itself, wired to a schedule. Add the job, add the step,
add the schedule, attach it — and this check now runs itself, every
night at two AM, with nobody touching it.

## S5 · STEPS — Making failure loud

Here's the detail that actually matters. A SELECT that just returns
rows doesn't make a job fail — nothing downstream notices. A job step
only shows as Failed when the T-SQL actually raises an error. Pair
that with a notification, and the right person gets an email the
moment a threshold is crossed.

## S6 · SCREENSHOT — Azure Data Factory Validation activity

Sometimes the right tool isn't SQL Server Agent at all. Azure Data
Factory has a dedicated Validation activity that pauses the pipeline
itself until a dataset is confirmed to exist and meet its criteria —
or times out.

## S7 · STEPS — Choosing the right tool

SQL Server Agent fits when everything lives inside one SQL Server
environment. Pipeline-native validation fits when the check needs to
gate whether downstream steps even run. Most real platforms use both,
at different stages of the same pipeline.

## S8 · OUTRO

That's the full rules-and-checks toolkit — write the rule, run the
check, threshold it, automate it. Chapter five picks up from here:
what to actually do once a check fails.
