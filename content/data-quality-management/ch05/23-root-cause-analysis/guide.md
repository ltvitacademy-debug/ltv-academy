# Lesson 23 — Root Cause Analysis

**Chapter 5 · Remediation and Monitoring · Lesson 23 of 30**

## What you'll learn

- The difference between a data quality *symptom* and its *root cause*
- Four categories almost every root cause falls into: people, process,
  technology, and source data
- The 5 Whys technique for digging past the first, most obvious explanation
- How to turn profiling and rule-check output from earlier chapters into
  root-cause evidence
- Why fixing the cause matters more than fixing the row

## Symptom vs. root cause

Every data quality program eventually runs into the same trap: a rule
fires, a profiling report flags 4,000 null `customer_email` values, and
the reflex is to go clean up the 4,000 rows. That fixes the *symptom*.
Next week there are another 4,000, because whatever produced the first
batch is still running.

A **symptom** is the thing your rule or profiling check actually
detected — a null, a duplicate, an out-of-range value, a mismatched
total. A **root cause** is the upstream reason that symptom exists at
all: a form field that isn't required, an ETL job that silently drops a
column on error, a merge that never deduplicated two source systems, a
team that was never trained on a required field. Remediation (Lesson
25) without root cause analysis is a treadmill — you clean the same
category of bad data forever instead of shrinking the problem.

## Four categories root causes usually fall into

Most root causes sort into one of four buckets. Thinking through all
four, in order, is a fast way to avoid tunnel vision on the first
explanation that comes to mind.

1. **People** — missing training, unclear ownership of a field, no one
   accountable when a required value is skipped
2. **Process** — no validation step before data is accepted, no
   sign-off before a system change ships, informal or undocumented
   steps that vary by who's doing them
3. **Technology** — a form with no required-field validation, an ETL
   job that swallows errors instead of failing loudly, a schema change
   upstream that silently breaks a downstream mapping
4. **Source data** — a system of record itself was populated poorly
   from the start, or two systems define the same entity differently
   (Lesson 13's consistency dimension)

## The 5 Whys technique

**5 Whys** is a simple, well-known root-cause technique (originating in
Toyota's production system) that just means asking "why" repeatedly
until you stop finding a new, more fundamental answer — usually around
five times, sometimes fewer, occasionally more.

> **Symptom:** 4,000 orders have a null `customer_email`.
> 1. *Why?* The checkout form submitted without an email value.
> 2. *Why?* The email field isn't marked required in the form.
> 3. *Why?* The form was built for a guest-checkout flow that never
>    expected to need email for order fulfillment.
> 4. *Why?* Marketing started requiring email for receipts and
>    promotions after the form shipped, but the form was never updated.
> 5. *Why?* There's no process that re-reviews a form's required fields
>    when a new downstream requirement is added.

The real fix isn't "backfill 4,000 emails" — it's requiring the field
*and* creating a process (bucket 2, above) so the next new requirement
doesn't silently go unenforced.

## Using profiling data as evidence

Chapters 2 and 4 already gave you the tools to gather evidence instead
of guessing. Grouping a rule's failures by a likely driver — source
system, entry channel, date, region — often points straight at the
cause:

```sql
-- Which source system is actually producing the null emails?
SELECT source_system, COUNT(*) AS null_email_orders
FROM orders
WHERE customer_email IS NULL
GROUP BY source_system
ORDER BY null_email_orders DESC;
```

If 3,900 of the 4,000 nulls come from `source_system = 'mobile_app'`
and almost none from the website, you've just narrowed "why are emails
missing" down to one specific intake channel — exactly the kind of lead
a root cause investigation needs before you go talk to that system's
owner.

## From root cause to action

A finished root cause analysis produces three things, not one:

- **The cause**, stated specifically enough that someone could act on
  it ("mobile app checkout form has no required-field validation on
  email")
- **A fix for the cause** — usually a ticket for the owning team, not
  a data team task
- **A decision on the backlog of existing bad rows** — do they get
  cleansed (Lesson 24), or are they left and simply excluded from
  reporting going forward with the reason documented?

That three-part output is what gets logged and tracked in Lesson 28's
issue management process, and it's what keeps a monitoring dashboard
(Lesson 26) from flagging the same root cause month after month.

## Key terms

| Term | Meaning |
|---|---|
| Symptom | The specific bad value a rule or profiling check detected |
| Root cause | The upstream reason the symptom exists |
| 5 Whys | Repeatedly asking "why" to move from symptom to cause |
| People / Process / Technology / Source data | The four common root-cause categories |

## Lab

1. Take a data quality symptom you've already seen in this course —
   for example, Lesson 12's completeness failures or Lesson 19's
   referential integrity violations — and write out a 5 Whys chain for
   it, five numbered questions and answers, ending in a root cause that
   isn't just "someone made a typo."
2. Sort your final root cause into one of the four categories (people,
   process, technology, source data).
3. Write one sentence that states a fix for the cause, separate from
   any sentence about what happens to the existing bad rows.

## Check yourself

Can you explain, without looking back, why cleaning up the bad rows a
rule just flagged is not the same thing as fixing a data quality
problem? Can you name the four root-cause categories and give an
original one-sentence example of each?
