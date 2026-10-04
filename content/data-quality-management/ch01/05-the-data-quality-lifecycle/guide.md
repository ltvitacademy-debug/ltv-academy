# Lesson 5 — The Data Quality Lifecycle

**Chapter 1 · Foundations · Lesson 5 of 30**

## What you'll learn

- The five stages of the data quality lifecycle
- How this lifecycle maps directly onto the rest of this course's
  chapters
- Why skipping the "profile" stage is the most common mistake
- That the lifecycle is a loop, not a one-time project

## A loop, not a checklist you finish once

Everything covered so far — the definition (Lesson 1), the six
dimensions (Lesson 2), the cost of getting it wrong (Lesson 3), and who
is responsible (Lesson 4) — comes together into a repeatable cycle.
Data quality isn't a project with an end date; it's an ongoing loop,
because new data keeps arriving and systems keep changing. This lesson
names the five stages of that loop, and the rest of this course is
organized around teaching you each one in depth.

## The five stages

1. **Profile.** Before you can fix anything, you have to know what's
   actually in the data — row counts, NULL rates, distinct values,
   formats, relationships. This is pure discovery, no judgment yet.
   **Chapter 2, the very next five lessons, is entirely dedicated to
   this stage.**
2. **Define.** Turn what profiling found into explicit rules and
   thresholds: "the email column must match this pattern," "the NULL
   rate on order_total must stay under 1%." This is where the six
   dimensions from Lesson 2 become testable, specific rules.
   **Chapter 4 covers this.**
3. **Measure.** Run the rules from the define stage against real data,
   repeatedly, and track the results over time — not just once. A
   single clean pass means nothing if quality silently degrades over
   the following month.
4. **Remediate.** When measurement finds a problem, fix it — correct
   the bad records, trace back to the root cause so it doesn't keep
   recurring, and clean up what's already in the system.
   **Chapter 5 covers root cause analysis, cleansing, and remediation
   workflows.**
5. **Monitor.** Keep watching, continuously, so the next problem is
   caught at the "measure" stage again instead of becoming a business
   incident (Lesson 3's cost shows up exactly when this stage is
   skipped). **Chapter 5 also covers monitoring and scorecards.**

## Why "profile" gets skipped — and shouldn't

The most common shortcut teams take is jumping straight to "define":
writing quality rules based on assumption or documentation instead of
what the data actually contains. This backfires constantly — a rule
written assuming phone numbers are always 10 digits fails instantly
against real data containing legitimate international numbers, because
nobody profiled the column first to see what was actually there.
Profiling isn't a nice-to-have first step; it's the stage that keeps
every later stage honest.

## The loop closes, it doesn't end

After remediation and monitoring, new data keeps arriving — a new
source system gets integrated, a new field gets added, business rules
change. That new reality needs profiling again, which may surface new
rules to define, which need measuring, and so on. Teams that treat data
quality as a one-time cleanup project are describing a single trip
around this loop; teams that treat it as a discipline are describing
the loop running continuously, often automated (Lesson 22).

## How this maps to the rest of the course

| Lifecycle stage | Where this course teaches it |
|---|---|
| Profile | Chapter 2 (Lessons 6-10) — this entire next chapter |
| Define | Chapter 4 (Lessons 17-18), building on Chapter 3's dimensions |
| Measure | Chapter 4 (Lessons 19-22) — checks, thresholds, automation |
| Remediate | Chapter 5 (Lessons 23-25) — root cause, cleansing, workflows |
| Monitor | Chapter 5 (Lessons 26-28) — monitoring, scorecards, issue management |

## Key terms

| Term | Meaning |
|---|---|
| Data quality lifecycle | The repeatable profile → define → measure → remediate → monitor loop |
| Profiling | Discovering what's actually in the data before judging it |
| Remediation | Fixing bad records and their root cause, not just the symptom |
| Continuous monitoring | Ongoing measurement, as opposed to a one-time quality check |

## Lab

1. Pick a dataset or report you rely on and walk it through all five
   stages in writing: what would profiling it reveal? What rule would
   you define from that? How would you measure it going forward? What
   would remediation look like for a found problem? How would you
   monitor it afterward?
2. Identify which of the five stages, if any, is currently missing
   entirely for that dataset at your organization (or a past one). Most
   teams are missing "monitor" more often than any other stage — note
   whether that's true here too.

## Check yourself

Can you list all five stages of the lifecycle in order, from memory,
and explain in one sentence why "profile" has to come before "define"?
If yes, you're ready to start Chapter 2 and actually run profiling
queries in SSMS.
