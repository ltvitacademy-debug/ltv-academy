# Lesson 17 — Data Quality Rules · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter three gave you six questions to ask of data. Chapter four
turns every one of those questions into something a team can actually
run, trust, and act on — starting with what a rule even is.

## S2 · SCREENSHOT — SSMS

Same tool, same query window — but now we're writing something meant
to outlive the moment you wrote it.

## S3 · STEPS — Query vs. rule

Every query so far answered a question once. A rule is the same logic
written down so it can run repeatedly, by anyone, with a known meaning
when it fails. The difference isn't the SQL. It's everything around
the SQL.

## S4 · STEPS — Four parts of a rule

Scope: what table and column does this apply to? Condition: what
makes a row pass or fail? Severity: how bad is a failure? Owner: who
gets notified, and who decides what "fixed" even means? Skip any one
of these and it's back to being a one-off query.

## S5 · STEPS — Dimension maps to rule type

Each of the six dimensions from chapter three is a recognizable type
of rule. Accuracy compares against a reference. Completeness checks
for missing values. Validity checks a rule. Naming the type tells you
immediately what kind of fix is even possible.

## S6 · CODE — A rule as runnable SQL

A rule document should include the actual query, not just a
description. Rule ID, scope, severity, and owner, written directly as
a comment above the query that implements it.

## S7 · OUTRO

Now every rule has a name, an owner, and real SQL behind it. Next up:
writing the SQL data quality checks that back these rules, in depth.
