# Lesson 4 — Data Quality Roles and Responsibilities

**Chapter 1 · Foundations · Lesson 4 of 30**

## What you'll learn

- Why "the DBA owns data quality" is a myth that causes real damage
- The five roles that actually share data quality responsibility
- The difference between a data owner, a data steward, and a data
  custodian
- How RACI thinking applies to a data quality rule failure

## The myth: one person owns data quality

Organizations new to data governance often assign data quality to
whoever is closest to the database — a DBA, a data engineer, a BI
developer. It feels efficient. It also guarantees failure, because the
person closest to the database rarely has the context to know whether
a value is *fit for use* (Lesson 1) — that judgment belongs to the
people who actually use the data for something. Data quality is a
shared responsibility across five distinct roles, not a ticket queue
for one team.

## The five roles

- **Data owner.** A business-side leader — a VP of Sales, a Head of
  Finance — accountable for a specific data domain (customer data,
  financial data). The owner doesn't write the SQL; the owner decides
  what "fit for use" means for their domain and signs off on the rules
  Chapter 4 teaches you to write.
- **Data steward.** The hands-on role that translates the owner's
  intent into concrete rules, definitions, and monitoring. A data
  steward for "customer data" might define exactly what counts as a
  valid email, decide the acceptable NULL rate for a phone field, and
  track the quality scorecard (Lesson 27) over time.
- **Data custodian.** The technical role — often a DBA or data
  engineer — responsible for the systems the data lives in: access
  control, backups, and running the checks the steward designs.
  Custodians implement; they don't decide what "good" means.
- **Data consumer.** Anyone who uses the data to do their job — an
  analyst building a report, a support agent looking up an account.
  Consumers are often the first to notice a quality problem because
  they're the ones acting on bad output, which makes them an essential
  (and frequently ignored) feedback source.
- **Data governance lead / council.** Coordinates across domains when
  quality rules conflict or overlap — for example, when Sales and
  Finance define "active customer" differently and a company-wide
  report needs one consistent answer.

## Owner vs. steward vs. custodian — a memory device

Think of it like a house: the **owner** decides the house needs a
working lock and sets that expectation; the **steward** specifies
exactly which lock, what "working" means, and checks it periodically;
the **custodian** is the locksmith who installs and maintains it. None
of the three roles alone keeps the house secure — all three have to
function together.

## A RACI view of a quality rule failure

When an automated data quality check (Chapter 4) fails — say, a daily
job finds 200 new customer rows with invalid email formats — a
well-run program has a clear answer for each of these:

| Role | RACI | What they actually do when a check fails |
|---|---|---|
| Data owner | Accountable | Decides whether the failure is acceptable or must block downstream use |
| Data steward | Responsible | Investigates the root cause (Lesson 23), updates the rule if it's wrong |
| Data custodian | Consulted | Confirms whether it's a system/pipeline issue vs. a genuine data problem |
| Data consumer | Informed | Told the data is flagged before they build a report on it |

Without this kind of clarity, failed checks either get ignored (nobody's
job) or escalate to whoever's loudest (not necessarily the right
person).

## Why this matters before Chapter 2

Every profiling technique in Chapter 2 and every rule in Chapter 4
produces a finding — a count, a flagged row, a failed check. A finding
without an owner to act on it is just a number nobody looks at. Getting
roles straight now means that by the time you're running real SQL
profiling queries next lesson, you already know who the output is for.

## Key terms

| Term | Meaning |
|---|---|
| Data owner | Business-side leader accountable for a data domain's quality standard |
| Data steward | Hands-on role that defines and monitors concrete quality rules |
| Data custodian | Technical role (often a DBA) that implements and runs the checks |
| Data consumer | Anyone acting on the data — an early, informal quality signal |
| RACI | Responsible, Accountable, Consulted, Informed — a clarity framework for who does what |

## Lab

1. Pick a real or hypothetical data quality failure (e.g., "15% of new
   signups have a malformed email address").
2. Using the RACI table above as a template, write one sentence for
   each of the four roles describing exactly what they would do about
   this specific failure.
3. Identify which role is missing or unclear in your own organization
   (or a place you've worked) — is there an actual data owner for
   customer data, or does that responsibility fall through the cracks?

## Check yourself

Can you explain, without notes, the difference between a data steward
and a data custodian using a concrete example (not the house analogy —
a data example)? If yes, you're ready for Lesson 5's look at how these
roles interact across the full data quality lifecycle.
