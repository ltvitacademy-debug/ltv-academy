# Lesson 4 — Data Quality Roles and Responsibilities · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Organizations new to governance often hand data quality to whoever's closest to the database. It feels efficient. It also guarantees failure — because that person rarely has the context to know whether a value is actually fit for use.

## S2 · STEPS — Five roles, not one

Data quality is shared across five roles. The data owner — a business leader accountable for a domain — decides what "fit for use" means. The data steward translates that into concrete rules and monitors them. The data custodian, often a DBA, implements the checks and runs the systems. The data consumer uses the data daily and is often first to notice a problem. And a governance lead coordinates when domains conflict.

## S3 · STEPS — Owner, steward, custodian

Think of it like a house: the owner decides the house needs a working lock. The steward specifies exactly which lock and checks it periodically. The custodian is the locksmith who installs and maintains it. None of the three alone keeps the house secure — all three have to function together.

## S4 · STEPS — When a check fails

Here's what that looks like when an automated check fails — say, 200 new customer rows with bad email formats. The owner is accountable for deciding if that's acceptable. The steward is responsible for investigating root cause. The custodian is consulted on whether it's a pipeline issue. And the consumer is informed before they build a report on flagged data. Without that clarity, failed checks get ignored, or escalate to whoever's loudest.

## S5 · OUTRO

Every profiling query and every rule you'll write from here on produces a finding — and a finding without an owner is just a number nobody looks at. Next up: Lesson 5 walks through how these roles interact across the full data quality lifecycle.
