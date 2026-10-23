# Lesson 8 — Known Error Database

**Chapter 2 · Implementing Problem Management · Lesson 8 of 32**

## What you'll learn

- What a Known Error actually is, as a real ServiceNow Problem-management state, not just a concept
- The precise condition that triggers the move into Known Error: cause found, permanent fix not yet deployed
- How Known Error records become searchable and why that's the real implementation payoff
- The preview of how Knowledge Management surfaces Known Errors to agents (full depth in Chapter 5)
- Why a workaround documented in a Known Error record is not the same thing as closing the Problem

## The precise condition for Known Error

Course 1 of this path introduced Known Error conceptually, as part of ITIL's Problem Management process. Here's the real mechanics: a Problem moves into a Known Error state the moment its root cause has been identified — `root_cause` and `cause_notes` are populated with a confirmed answer — but a permanent fix has not yet been built, tested, or deployed. `fix_notes` is still empty, or contains only a documented workaround rather than a real resolution.

This is a distinct middle condition, neither "still investigating" nor "actually fixed." Getting that distinction right in your configuration matters because of what happens to an agent working a brand-new Incident in the meantime.

## Why Known Error exists: value to the agent handling the next Incident

Without a Known Error mechanism, every new Incident that matches an already-diagnosed-but-unfixed problem forces the handling agent to either re-investigate from scratch or escalate and wait. Neither is acceptable when the cause and a workaround are already sitting in a Problem record somewhere in the system — the information just isn't surfaced to the person who needs it, at the moment they need it.

Flagging the Problem as a Known Error, and documenting the interim workaround clearly, solves exactly that. The next agent who gets a matching Incident doesn't need to understand the whole investigation — they need the workaround, fast, so they can apply it and get the user back to work while the Problem itself continues toward a permanent fix.

## Searchability: the real implementation detail

A Known Error record only delivers that value if agents can actually find it when a new, similar Incident comes in. That's where this lesson connects forward to Chapter 5: in a mature implementation, Known Error records are surfaced through Knowledge Management, often by generating a knowledge article directly from the Problem record so the workaround appears in ordinary agent search results — the same search an agent already uses to look up any other documented procedure.

Chapter 5 covers that article-generation and search mechanism in full. For now, the implementation point to hold onto is this: a Known Error that only lives inside the Problem table, invisible to search, delivers almost none of its intended value. The whole reason the state exists is to put a workaround in front of the next agent before they start investigating something that's already understood.

## A workaround is not a resolution

It's worth being explicit about a common misunderstanding: moving a Problem to Known Error, and documenting a workaround, does not resolve or close the Problem. The underlying cause is still present in the environment. Known Error is a holding state that keeps new Incidents from becoming redundant investigations while the real fix — the one that eventually gets recorded in `fix_notes` and moves the Problem to Resolved — is still being built. Closing a Problem the moment a workaround exists, instead of once a permanent fix is deployed, is exactly the kind of implementation shortcut that lets the real cause quietly linger for months.

## Key terms

| Term | Meaning |
|---|---|
| Known Error | A Problem whose root cause is identified but whose permanent fix is not yet deployed |
| Workaround | A documented interim measure that mitigates symptoms without resolving the underlying cause |
| Knowledge article (from Problem) | A searchable article generated from a Known Error so agents can find the workaround without re-investigating |
| Holding state | A state that prevents redundant work while a permanent solution is still in progress |

## Check yourself

Three weeks after a Problem is flagged as a Known Error with a documented workaround, a new Incident comes in matching the same symptoms. Explain, step by step, what should happen — and why the Problem itself should still remain open, not Closed, at this point.
