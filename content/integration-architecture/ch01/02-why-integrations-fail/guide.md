# Lesson 2 — Why Integrations Fail

**Chapter 1 · Integration Foundations · Lesson 2 of 28**

## What you'll learn

- The recurring categories of integration failure architects see in practice, independent of which tools are involved
- Why most integration failures are design failures discovered late, not bugs discovered early
- The difference between a failure that's visible immediately and one that silently corrupts data for weeks
- Why "it worked in the demo" is not evidence an integration is production-ready

## Most failures are design failures, not code failures

When an integration breaks in production, the instinct is to treat it as a bug — a missing null check, a bad API call. In practice, a large share of integration failures trace back to a design decision made weeks or months earlier: a pattern chosen for convenience rather than fit, a volume assumption that held true in testing but not at scale, or an interface contract that was never actually agreed on between the two teams building each side. An architect's job is to catch these failure modes at design time, when they're a conversation, rather than at 2 a.m. in production, when they're an incident.

## Recurring failure categories

- **Volume underestimation.** An integration designed and tested against a few hundred sample records breaks when real volume arrives — a REST callout loop that works fine for 50 records times out or hits a limit at 50,000. This is the single most common cause of an integration that "worked in the demo" and fails at go-live.
- **Silent data loss.** The worst integration failures aren't the ones that throw an error — they're the ones that don't. A record that fails validation on the target system, with no retry and no alert, simply never arrives, and nobody notices until a customer or an auditor asks where it went. Chapter 3 covers error handling and idempotency specifically because silent loss is this common and this damaging.
- **Tight coupling to internal implementation details.** An interface built against another system's internal field names or internal ID scheme instead of a stable, documented contract breaks the moment that system's internal structure changes — even when the business meaning of the data hasn't changed at all.
- **No agreed-on error contract.** Two teams build their sides of an integration, each assuming the other will "just figure out" what an error response looks like. When a real error happens, the calling system doesn't know whether to retry, alert a human, or silently drop the record — because nobody specified what the failure cases actually look like.
- **Timing and ordering assumptions that don't hold.** An integration assumes updates always arrive in the order they were made, or that a related record always exists before a dependent record arrives. Asynchronous systems in particular routinely violate both assumptions, and a design that quietly depends on them will eventually break in a way that's hard to reproduce.
- **No owner once it's live.** An integration gets built, ships, and then has no one responsible for it — no one watching for errors, no one who understands it when the systems on either end eventually change. This is a governance failure (Lesson 17) as much as a technical one.

## Why "it worked in the demo" is a red flag, not reassurance

A demo, by design, uses clean data, low volume, and the happy path. None of the failure categories above show up under those conditions — volume underestimation only appears at real volume, silent data loss only appears when real-world dirty data hits a validation rule nobody anticipated, and timing assumptions only break when the systems involved are under real, uneven load. An architect reviewing an integration design should specifically ask what happens *outside* the happy path: what happens at 10x the demo's data volume, what happens when the target system is down for five minutes, what happens when two updates to the same record arrive out of order. If those questions haven't been answered before go-live, the integration isn't done — it's just not failed yet.

## Key terms

| Term | Meaning |
|---|---|
| Volume underestimation | A design tested against low data volume that breaks when real production volume arrives |
| Silent data loss | A failure that produces no error and no alert, so a record simply never arrives without anyone noticing |
| Tight coupling | An interface built against another system's internal implementation details instead of a stable contract |
| Error contract | An explicit, agreed-on definition of what an error response looks like and how the caller should react to it |
| Happy path | The expected, error-free sequence of events an integration follows when everything goes right |

## Lab

A retail company's nightly order-sync integration has run cleanly for six months, moving about 2,000 orders a night from Salesforce to their fulfillment system. Black Friday weekend, volume jumps to 40,000 orders in one night, and finance discovers the next week that roughly 3,000 orders from that weekend never reached fulfillment — no error was logged anywhere. Using the failure categories from this lesson, name the two most likely root causes, and for each one, describe one design change that would have caught it before Black Friday rather than after.

## Check yourself

Can you name at least four of the recurring integration failure categories from this lesson without re-reading the list? Can you explain why a successful demo is not evidence that volume underestimation or silent data loss won't happen in production?
