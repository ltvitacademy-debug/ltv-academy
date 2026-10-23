# Lesson 23 — Capstone Kickoff: a Realistic Slow-Instance Scenario

**Chapter 7 · Capstone: Diagnose & Fix a Realistic Performance Problem · Lesson 23 of 25**

## What you'll learn

- The full scenario this three-lesson capstone works through, start to finish
- How to read instance-wide growth and a deployment timeline together, not separately
- How to turn three vague symptom reports into a short, testable hypothesis list
- Which earlier chapters each hypothesis actually points back to, and why that matters
- Why a capstone starts with triage, not with a fix

## The scenario: Meridian Retail's Store Opening Checklist app

Meridian Retail is a mid-size grocery chain that built a custom scoped application on
ServiceNow called Store Opening Checklist — a daily workflow store managers use to confirm
that overnight deliveries were logged, refrigeration units were checked, and staffing was
confirmed before doors open. Eighteen months ago it launched with 50 pilot stores. Usage grew
quietly, store by store, until it now runs in 500 stores every single morning. Nobody treated
that growth as a performance event — it just happened, a few stores a month, with no corresponding
review of the app's queries, scripts, or scheduled jobs.

Over the last six months, three symptoms have been reported, each sounding unrelated on its own:

- Store managers say the "My Open Checklist Items" list view has gotten noticeably slower to open.
- A handful of regional managers report flows that feel "stuck" — approvals that used to clear in
  seconds now sometimes sit for a minute or more before moving to the next stage.
- Two weeks ago, the entire instance slowed down platform-wide for about 40 minutes, starting right
  at 7:00 AM — the exact moment stores open and checklist submissions spike all at once.

That last incident is what finally got this escalated to you. Your job across this capstone is to
treat it the way a working performance engineer would: not as one bug, but as a system that has
quietly outgrown the assumptions it was built under.

## Step one: read Instance Health against the growth and deployment timeline

Chapter 4 taught you that Instance Health answers a different question than any single slow
transaction can — "is the whole instance trending slower," not "was this one request slow." That's
exactly the right tool to open first here, because the platform-wide slowdown is an instance-wide
symptom. Pulling up Instance Health for the last six months shows average response time climbing
gradually, with a sharper jump in the last two months — not a single cliff-edge regression, which is
an important clue. A sudden cliff usually means one bad deployment. A gradual climb that steepens as
a number grows usually means something that scales *badly* with volume, not something that broke
outright.

Laying that response-time trend next to two other timelines sharpens the picture further:

```
Month:          1    2    3    4    5    6
Stores live:    50   90   160  260  380  500
Avg list load:  .8s  .9s  1.1s 1.6s 2.4s 3.9s
Deployments:         v1.1      v1.3      v1.5
```

Store count and average list-load time are rising together, and the growth in load time is
accelerating faster than the growth in stores — 50 stores didn't cause a slow list, but 500 stores
expose something that was always a little inefficient and simply didn't matter yet at small scale.
The deployment markers matter too: no single release lines up with the steepest jump, which argues
against "one bad change" and for "a design that doesn't hold up as data and concurrent usage grow."

## Building the hypothesis list — naming the chapters, not guessing blind

A real triage doesn't start with a fix; it starts with a short list of named, testable hypotheses,
each one grounded in a specific diagnostic skill from earlier in this course:

```
Symptom                      Candidate cause                 Chapter to check
Slow "My Open Checklist      List view / related list        Ch 1 — Slow forms & lists
  Items" list view             rendering too much, or a
                                missing index on a filter
Flows feel "stuck" on         A Script Include or business    Ch 2 — Script performance
  approval                     rule doing something            & GlideRecord patterns
                                expensive per-record
Platform-wide slowdown at     Scheduled jobs and the 7 AM      Ch 4 — Instance health,
  7:00 AM exactly               submission spike contending      semaphores & scheduled
                                for the same semaphore pool       job contention
(underlying all three)        A missing or unused index on    Ch 3 — Database & query
                                a frequently-filtered custom      performance
                                field, worse as row count grows
```

Notice that one hypothesis — a missing index on a heavily-filtered custom field — could plausibly
explain *both* the slow list view and part of the approval-flow slowness, since a slow query used by
a list can also be the same query a Script Include re-runs inside a loop. That overlap is exactly why
Lesson 24 won't stop after finding the first real cause: a six-month, 10x-growth slowdown rarely has
one root cause, and confirming only the first hypothesis found risks declaring victory while two more
real problems keep compounding underneath it.

## Why triage comes before any fix

It would be tempting to jump straight to "add an index" or "rewrite that script" right now. Resist
that. Chapter 6's incident-response discipline applies here just as much as it did to a live
incident: gather evidence, form hypotheses, and confirm each one with real diagnostic data *before*
changing anything in production. A fix applied on a guess can make things worse, hide the real
cause, or fix a symptom while leaving the actual root problem untouched — which is precisely the risk
with a scenario like this one, where three symptoms and at least four plausible causes are all
live at once.

## Key terms

| Term | Meaning |
|---|---|
| Growth/deployment timeline | Plotting usage growth and release dates together to tell a gradual-scaling problem apart from a single bad change |
| Hypothesis list | A short, named set of testable candidate causes, each tied to a specific diagnostic tool or chapter |
| Compounding cause | A performance problem made up of multiple real contributing factors, not one single bug |
| Instance-wide vs. per-transaction symptom | Whether a complaint describes the whole platform trending slower, or one specific request being slow |

## Check yourself

Before moving to Lesson 24: looking at the hypothesis table above, which single row, if confirmed,
would you expect to explain the *most* symptoms at once — and why does that make it the first one
worth testing, rather than the last?
