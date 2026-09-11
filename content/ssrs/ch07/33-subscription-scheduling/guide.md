# Lesson 33 — Subscription Scheduling

**Chapter 7 · Subscriptions & Delivery · Lesson 33 of 40**

## What you'll learn

- The difference between a **shared schedule** and a **report-specific
  (subscription-specific) schedule**, and why both exist
- Why shared schedules are easier to administer at scale, and what you
  give up by not using one
- What happens to subscriptions when a shared schedule they depend on
  gets paused, or deleted
- The chain of components — SQL Server Agent, the event queue, the
  Scheduling and Delivery Processor — that actually fires a subscription
  on time

## Two ways to tell a subscription when to run

Every subscription needs a schedule, and Reporting Services gives you two
ways to provide one. A **shared schedule** is created once, as its own
item, and then referenced by any number of reports and subscriptions. A
**report-specific schedule** is defined inline, right inside the
subscription (or report execution properties) that uses it — there's no
separate item to manage, just settings baked into that one subscription.
Both express the same underlying recurrence patterns — hourly, daily,
weekly, monthly, or a one-time run — the difference is entirely about
where the schedule information lives and how many things can point at it.

## Why shared schedules win at scale

If ten different subscriptions all need to run at 6 AM after the nightly
data load finishes, a shared schedule means that "6 AM" lives in exactly
one place. Move the data load to 6:30, and you edit one schedule instead
of ten separate subscriptions. Shared schedules can also be **paused and
resumed** — something a report-specific schedule simply can't do — which
makes them the right tool whenever you need to temporarily halt a batch
of scheduled deliveries (during a maintenance window, say) without
touching each subscription individually.

Report-specific schedules still have their place: a one-off subscription
that genuinely doesn't need to share timing with anything else doesn't
need the overhead of a separate shared-schedule item cluttering the list.

## What happens when a shared schedule goes away

Delete a shared schedule that's currently in use, and Reporting Services
doesn't just orphan every subscription pointing at it. Instead, it
creates an individual report-specific schedule for each report and
subscription that used to reference the shared one — copying over the
same date, time, and recurrence pattern first, so nothing silently stops
running. From that point on, though, those schedules are independent
again, and you're back to managing each one by hand.

## The machinery underneath: Agent, queue, processor

A schedule you create doesn't run itself — it's backed by real
infrastructure. Creating a schedule writes its recurrence information to
the report server database and creates a corresponding **SQL Server
Agent** job. When that job fires, it drops an event into a queue the
**Scheduling and Delivery Processor** polls at regular intervals (every
10 seconds, by default). The processor picks the event up, calls the
report processor to run or refresh the report, and hands the result to
whichever delivery extension the subscription specifies. Stop SQL Server
Agent for a stretch of time, and every scheduled operation that should
have fired during that window is simply lost — it isn't queued up to
catch up later.

## Key terms

| Term | Meaning |
|---|---|
| Shared schedule | A schedule created as its own item and referenced by any number of reports/subscriptions |
| Report-specific schedule | A schedule defined inline within one subscription or report's execution properties |
| Pause / resume | An operation only shared schedules support — temporarily halting scheduled runs without deleting the schedule |
| SQL Server Agent | The service that actually fires the job triggering a scheduled event |
| Scheduling and Delivery Processor | The report-server component that polls the event queue and hands work to delivery extensions |

## Lab

1. List every subscription you built in Lessons 30–32. Decide which ones
   genuinely need to share a schedule (because they should always run
   together) versus which are one-offs better served by a report-specific
   schedule.
2. If you have administrator access to a report server, create one
   shared schedule and point two subscriptions at it; confirm changing
   the schedule's time updates both.
3. Practice pausing that shared schedule, and confirm neither subscription
   fires while it's paused.

## Check yourself

You're ready for Lesson 34 when you can explain, without looking: what's
the practical advantage of a shared schedule over a report-specific one,
and what does Reporting Services do to your subscriptions the moment you
delete a shared schedule they were using?
