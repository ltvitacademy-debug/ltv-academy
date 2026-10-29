# Lesson 12 — Turning Chaos Findings into Real Architecture Changes

**Chapter 3 · Chaos Engineering and Resilience Testing · Lesson 4 of 4**

## What you'll learn

- Why a chaos or game-day finding that gets written up and filed away
  was never actually worth finding
- How a real single point of failure (SPOF) found through failure
  injection should turn into a tracked, owned remediation — not just a
  doc
- Why the fix has to be verified by re-running the same experiment,
  not assumed to be done once code merges
- How this closes the loop back to error budgets and production
  readiness reviews from earlier in this path

## The finding is worthless until something changes

Everything the last three lessons covered — a precise hypothesis, a
safely injected failure, a full game day with a blameless debrief —
produces the same kind of output: a finding. "Checkout success rate
dropped to 94% when we killed a payment-service pod, because all
three pods were actually sharing one underlying database connection
pool we didn't know was shared." That sentence is valuable only if
something happens *because* of it. A finding that lives in a wiki page
or a Slack thread, acknowledged and then never revisited, has exactly
the same practical effect as never having run the experiment at all —
except now the team is sitting on documented proof of a weakness they
knew about and didn't fix, which is a worse position to be in when
that weakness eventually causes a real outage.

## A single point of failure demands a real redundancy fix

When a chaos experiment surfaces a genuine single point of failure —
a shared connection pool, a cache with no replica, a hard dependency
on one availability zone, a payment processor with no fallback — the
correct response is an actual architecture change, not a caveat added
to the runbook. "Note: this fails if the shared connection pool is
exhausted" is not a fix; it's a more detailed description of the same
unfixed risk. The real fix looks like giving each service its own
connection pool, adding a cache replica, spreading the dependency
across availability zones, or building a fallback path to a second
processor. It's slower and more expensive than writing a sentence in
a doc, which is exactly why findings need a path into real
engineering prioritization instead of staying informal.

## Findings need an owner, a ticket, and a deadline

The mechanism that makes this actually happen is mundane and
important: every finding that reveals a real weakness gets filed as a
tracked piece of work — a ticket with a named owner and a target date
— the same way a bug or a postmortem action item would be, not left as
a paragraph in an experiment write-up that nobody is accountable for
closing. Teams that treat chaos findings this way tend to review them
in the same forum that tracks error budget burn and postmortem action
items, so "we have a known SPOF in the payment path" competes for
priority against new feature work the same way any other reliability
risk does — visibly, and on the record — rather than losing by
default because no one owns it.

## Verify the fix by running the experiment again

A remediation isn't actually done when the code merges — it's done
when the *same chaos experiment that found the problem* gets run
again and the steady-state hypothesis holds this time. If the original
finding was "checkout success rate drops to 94% when we kill a
payment-service pod," the fix isn't confirmed until that exact
experiment is re-run and success rate stays at 99.9%. This closes the
loop all the way back to the first lesson in this chapter: chaos
engineering is a hypothesis-testing discipline, and a fix is really
just a new hypothesis — "the shared connection pool is no longer a
single point of failure" — that needs the same evidence-based
confirmation the original finding did. Teams that skip this step and
just trust that the fix "should" work are exactly the teams who
rediscover the same weakness during a real incident instead of a
controlled one.

## Key terms

| Term | Meaning |
|---|---|
| Single point of failure (SPOF) | A component whose failure alone takes down the system, with no redundancy to absorb it |
| Remediation tracking | Treating a chaos or game-day finding as owned, ticketed work with a deadline, not an informal note |
| Verification re-run | Re-running the original experiment after a fix to confirm the steady-state hypothesis now holds |
| Reliability risk review | A shared forum (often tied to error budget and postmortem review) where findings compete for prioritization against feature work |

## Check yourself

You're ready to move on when you can explain, without looking: why is
a documented chaos finding that never gets fixed arguably worse than
never having run the experiment, and how do you actually confirm a
remediation worked?
