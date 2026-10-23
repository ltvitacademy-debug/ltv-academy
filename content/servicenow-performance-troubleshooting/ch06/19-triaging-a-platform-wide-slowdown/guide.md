# Lesson 19 — Triaging a Platform-Wide Slowdown

**Chapter 6 · Incident Response for Platform Issues · Lesson 19 of 25**

## What you'll learn

- Why "everything feels slow" from users is not the same claim as "everything is actually slow"
- The three-step triage sequence: confirm scope, check for a recent deployment, check resource exhaustion
- How to use the Instance Health Dashboard (Chapter 4) to separate a genuine instance-wide problem from one loud feature
- Why checking for a correlated deployment (Course 11) comes before touching any configuration
- Why gathering evidence first — before attempting any fix — is the actual discipline this lesson teaches

## "The whole instance is slow" is a claim, not a fact

When several users report that the instance "feels slow," it is tempting to treat that as settled —
something, somewhere, is broken platform-wide, so go fix it. That instinct skips the one step that
actually matters: confirming the claim is true as stated. Users experience ServiceNow through whatever
they personally touch — their incident queue, their catalog item, their dashboard. If the one area
they all happen to use is slow, it feels universal to every one of them, even though nothing else on
the platform is affected at all. A real platform-wide slowdown and a loud, widely-used feature that's
degraded are two different incidents requiring two different responses, and they produce the exact
same first report: "it's slow." The job of triage is telling them apart before you commit to a fix for
either one.

## Step one: confirm scope with the Instance Health Dashboard

Chapter 4 built the Instance Health Dashboard specifically to answer trend-level, instance-wide
questions — not to diagnose one transaction, but to show whether response time, transaction volume,
and error rate are moving together across the whole instance. That's exactly the first question
platform-wide triage needs answered: is this actually everywhere, or is it concentrated in the one
area the reporting users happen to share? If Instance Health shows response times climbing across the
board, the complaint is confirmed as genuinely platform-wide. If it shows normal response times
instance-wide, the real incident is narrower than reported — a single slow feature, not a platform
event — and the response shifts to the Chapter 1–3 tools built for diagnosing one slow thing, not a
platform-wide investigation.

## Step two: check for a recent deployment

If Instance Health confirms the slowdown is real and instance-wide, the next question is timing: what
changed right before it started? A deployment that went out shortly before the first reports — a new
Business Rule, an updated Flow, a bulk data load — is the single most common real cause of a sudden,
platform-wide slowdown, because a change that runs on every transaction (a Business Rule on a
heavily-used table, for instance) degrades performance for everyone at once, not just one workflow.
Checking the deployment timeline takes minutes and directly tests the most likely hypothesis before
any other diagnosis begins. A slowdown that starts the moment a release finishes is a very different
problem — and a much faster one to resolve — than a slowdown with no deployment correlation at all.

## Step three: check semaphore and node usage for resource exhaustion

If there's no correlated deployment, the next real candidate is resource exhaustion — semaphores all
checked out with requests queuing behind them, or nodes running hot, both covered in Chapter 4. A
runaway scheduled job consuming every available semaphore, or genuine infrastructure capacity pressure
during a traffic spike, produces the same instance-wide symptom as a bad deployment but needs a
completely different fix: killing or rescheduling the offending job, not rolling back a release.
Checking semaphore and node usage after the deployment check — not before, and not instead of it — is
what keeps triage from turning into guesswork. Each of these three real causes (a bad deployment, a
runaway job, genuine capacity pressure) looks identical from a user's chair and demands a different
response, which is exactly why the evidence has to come before the fix, every time.

## Key terms

| Term | Meaning |
|---|---|
| Scope confirmation | Verifying with Instance Health whether a slowdown is genuinely instance-wide, not just one loud feature |
| Deployment correlation | Checking whether a recent release's timing lines up with when the slowdown started |
| Semaphore exhaustion | All available semaphores checked out, so new requests queue instead of running |
| Resource exhaustion | Node or semaphore capacity genuinely used up, as opposed to a code-caused slowdown |
| Triage sequence | The ordered evidence-gathering steps (scope, deployment, resources) done before attempting a fix |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: why does checking Instance Health
come before checking for a recent deployment, and why does checking for a deployment come before
checking semaphore and node usage — what does each step rule in or rule out for the next?
