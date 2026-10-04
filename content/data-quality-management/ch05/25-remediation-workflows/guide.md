# Lesson 25 — Remediation Workflows

**Chapter 5 · Remediation and Monitoring · Lesson 25 of 30**

## What you'll learn

- Why remediation needs a repeatable workflow, not one-off fixes
- The five stages most remediation workflows share: detect, triage,
  assign, fix, verify
- How to decide between automated and manual remediation
- Why "fix at the source" beats "fix in the warehouse" whenever it's
  possible
- How a remediation workflow connects root cause analysis (Lesson 23)
  to issue tracking (Lesson 28)

## Why remediation needs a workflow

Lessons 23 and 24 gave you two individual skills: finding a root cause,
and cleansing or standardizing a value. A **remediation workflow** is
what turns those individual skills into a process an organization can
run every week without a data engineer personally remembering every
step. Without one, remediation becomes ad hoc — whoever notices a
problem fixes it their own way, nothing is tracked, and the same issue
quietly resurfaces because no one closed the loop with a root cause fix.

## The five stages

Most mature remediation workflows share the same five stages, whether
they're built in a dedicated data quality tool, a ticketing system, or
a well-run spreadsheet:

1. **Detect** — a rule check (Lesson 18) or monitoring alert (Lesson
   26) finds a violation
2. **Triage** — someone decides how severe this is and whether it needs
   immediate action (Lesson 21's thresholds and tolerances feed this
   directly)
3. **Assign** — the issue goes to whoever actually owns the data or the
   system producing it — not automatically to the data team
4. **Fix** — root cause analysis happens, a cleansing operation runs
   if needed, and (ideally) the upstream cause gets corrected
5. **Verify** — the original rule or check is re-run to confirm the
   violation is actually gone, not just assumed fixed

Skipping **verify** is the most common shortcut, and the most expensive
one — an issue marked "fixed" that was never actually re-checked is
worse than an open issue, because it creates false confidence in a
dashboard (Lesson 27).

## Automated vs. manual remediation

Not every fix deserves the same amount of human judgment:

| | Automated remediation | Manual remediation |
|---|---|---|
| Good for | High-volume, well-understood patterns (standardizing a known set of state codes) | Ambiguous cases, judgment calls, anything with real business risk if wrong |
| Risk | A bad automated rule can mass-corrupt data fast | Doesn't scale past a handful of cases per day |
| Example | Nightly job auto-corrects known phone-format variants | An analyst manually reviews and merges two customer records that might be duplicates |

A workflow often uses both: automated remediation handles the
well-understood 90% of cases, and anything the automated rules can't
confidently resolve routes to a manual queue for a person to decide.

## Fix at the source, not just in the warehouse

It's tempting to cleanse data only where you can see it — in the
warehouse, right before a report runs. That's faster to implement, but
it means every downstream copy of that data (another report, an export,
an API) still carries the bad value, and the warehouse fix has to be
re-applied on every single load forever. Fixing the cause at the
*source system* means the data arrives correct everywhere, the first
time. Lesson 23's root cause work exists specifically to make this
option possible — when it isn't possible (a vendor system you don't
control, for instance), a documented, re-run-safe warehouse-level fix
is the fallback, not the default.

## Connecting the pieces

A remediation workflow is the thread that ties this course together so
far:

- **Detect** comes from the rules and monitoring in Chapters 4 and 5
- **Triage** uses the thresholds from Lesson 21
- **Fix** uses the root cause and cleansing skills from Lessons 23–24
- **Verify** re-runs the exact check that triggered detection
- The whole cycle gets logged as a trackable issue — Lesson 28, next

## Key terms

| Term | Meaning |
|---|---|
| Remediation workflow | A repeatable process for detecting, fixing, and verifying data quality issues |
| Triage | Deciding an issue's severity and urgency |
| Automated remediation | A system-applied fix for well-understood, high-volume patterns |
| Fix at the source | Correcting the system that produces bad data, not just a downstream copy |

## Lab

1. Sketch the five-stage workflow (detect, triage, assign, fix, verify)
   for a specific issue: "15% of orders in the `orders` table have a
   `ship_date` earlier than their `order_date`."
2. For the "fix" stage, write one sentence deciding whether this is a
   good candidate for automated or manual remediation, and why.
3. For the "verify" stage, write the one SQL check you'd re-run to
   confirm the fix actually worked.

## Check yourself

Can you list the five stages of a remediation workflow in order,
without looking back? Can you explain, in one or two sentences, why
skipping the "verify" stage is worse than it sounds?
