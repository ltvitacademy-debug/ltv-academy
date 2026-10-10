# Lesson 8 — Sandbox Refresh Strategy

**Chapter 2 · Managing Environments · Lesson 8 of 14**

## What you'll learn

- What a sandbox refresh actually does, and why it's destructive to anything not yet promoted
- The minimum refresh interval for each sandbox type
- Why refresh cadence is a planning decision, not just "whenever it's allowed"
- Who should own the refresh calendar, and why it needs to be communicated in advance
- How refresh cadence connects back to the promotion path's seasonal release testing

## What a refresh actually does

Refreshing a sandbox replaces its current contents with a fresh copy pulled from production (or, for a sandbox cloned from another sandbox, from that source) as of the moment the refresh runs. That's valuable — it's how a sandbox stays from drifting arbitrarily far from what production actually looks like — but it's also destructive: **anything in that sandbox that hasn't been promoted out of it yet is gone after the refresh**, overwritten by the fresh copy. A half-finished Flow a developer was still building, test data someone set up for a specific scenario, or a configuration change nobody got around to deploying out — a refresh wipes all of it without asking.

This single fact is the reason sandbox refresh strategy is a real planning decision and not just a maintenance chore: timed wrong, a refresh destroys real, unsaved work; timed right, it's how a team keeps its testing and staging environments honest.

## Minimum refresh intervals by type

Salesforce enforces a **minimum** interval between refreshes for each sandbox type — you can always wait longer than the minimum, but you can't refresh more often than it allows:

| Sandbox type | Minimum refresh interval |
|---|---|
| Developer | 1 day |
| Developer Pro | 1 day |
| Partial Copy | 5 days |
| Full | 29 days |

These intervals track roughly with how much the sandbox type actually copies: a metadata-only Developer sandbox is quick to refresh and can be refreshed daily if needed, while a Full sandbox copying all of production's data takes meaningfully longer, so the platform enforces a much longer minimum gap between refreshes.

## Refresh cadence is a design decision, not a default

Just because Developer sandboxes *can* refresh daily doesn't mean every team should refresh every sandbox at the fastest rate the platform allows. The right cadence depends on what the sandbox is for:

- A development sandbox a single person uses for ongoing work usually should **not** be refreshed casually — doing so risks wiping active, unpromoted work for no real benefit, since this tier doesn't depend on data freshness.
- A testing or staging sandbox benefits from being refreshed **close to a release window**, so what's being tested reflects production as it actually is right now, including anything that changed in production since the last refresh.
- A staging sandbox should also be refreshed ahead of each seasonal Salesforce release (Lesson 6) specifically to test the upcoming platform release against current production configuration.

Refreshing too rarely lets a testing or staging environment drift away from reality, quietly undermining the confidence a passed test was supposed to provide. Refreshing too often (or at the wrong time) destroys in-progress work others were relying on.

## Owning and communicating the refresh calendar

Because a refresh is destructive to anyone still using the sandbox, a healthy environment strategy puts one clear owner in charge of the **refresh calendar** — typically the architect or a release manager — and communicates planned refreshes well in advance. The standard discipline is simple but easy to skip under deadline pressure: before refreshing, confirm nothing valuable and unpromoted still lives only in that sandbox, the same discipline Lesson 7 applied to production — nothing important should ever exist in only one place.

## Key terms

| Term | Meaning |
|---|---|
| Sandbox refresh | Replacing a sandbox's current contents with a fresh copy from its source, as of that moment |
| Minimum refresh interval | The shortest gap Salesforce allows between refreshes for a given sandbox type |
| Refresh calendar | A planned, communicated schedule of when each sandbox will be refreshed |

## Lab

A team's Full staging sandbox was last refreshed four months ago. A new seasonal Salesforce release is two weeks away, and the team wants to test against it. Using the minimum refresh interval for a Full sandbox, explain whether timing is a constraint here, and lay out a specific refresh and testing schedule for the two weeks before the release that avoids both of this lesson's failure modes: destroying someone's unpromoted work, and testing against stale, unrepresentative data.

## Check yourself

Can you state the minimum refresh interval for each of the four sandbox types? Can you explain, in your own words, why "refresh as often as the platform allows" is the wrong default, and describe one scenario where refreshing too rarely causes a real problem and one where refreshing too often does?
