# Lesson 13 — Review Board Simulation: Integration Focus

**Chapter 3 · Practice · Lesson 13 of 14**

## What you'll learn

- Why integration-focused questioning targets failure behavior more than the happy path
- The specific integration questions likely for the healthcare scenario's external eligibility API
- How to practice reasoning about synchronous versus asynchronous patterns live, not just name them
- A set of realistic, hard integration objections to rehearse, each with what a strong answer actually needs
- Why "we'll just call the API" is rarely a complete answer on its own

## Why integration gets its own simulation

Like security in Lesson 12, integration is a domain a board can choose to press on at length when a scenario clearly involves it — and the healthcare scenario does, with its external insurance-eligibility API and three previously disconnected internal systems being consolidated. Integration questioning has a distinct character: it's less interested in whether two systems can connect under ideal conditions (that's usually the easy, assumed part) and much more interested in what happens when they can't — timeouts, partial failures, out-of-order data, and conflicting information from two sources that are each individually correct.

## What an integration-focused line of questioning actually probes

Reusing the healthcare scenario, an integration-focused reviewer would likely press on: what happens to a patient intake if the external eligibility-verification API is slow or completely unavailable at the moment of the request; whether the integration is synchronous (the user waits for a live answer) or asynchronous (the system proceeds and reconciles the answer later), and which one the actual workflow requires rather than which one is easier to build; how data from the three consolidating legacy systems gets reconciled when two of them disagree about the same patient's information; and what retry behavior exists, and whether a naive retry could ever submit the same eligibility check twice and cause a downstream problem.

## Reasoning about sync versus async live

A board will sometimes ask you to reason through this distinction live rather than just state which one you picked. The strong move: name the actual business requirement that decides it. If intake staff need an eligibility answer before continuing the patient visit, that's a real-time, user-facing need that pushes toward synchronous — but a synchronous call to an external API you don't control also means your own system's responsiveness is now hostage to that vendor's uptime and latency, which is exactly the kind of tradeoff Lesson 4 said to name proactively. A reasonable answer often lands on a hybrid: attempt synchronously with a short timeout for the common case, and fall back to an asynchronous "we'll notify you" path if the external system doesn't respond quickly — stating that hybrid reasoning out loud is stronger than picking one pattern and defending it as though there were no middle ground.

## Rehearsing hard integration objections

Practice answering each of these, out loud, against the healthcare scenario:

- "The eligibility API times out for one patient in the middle of intake — walk me through exactly what the intake staff member sees, and what happens to that patient's record."
- "Two of your three legacy systems have slightly different addresses on file for the same patient — which one wins in the consolidated system, and who decided that rule?"
- "If your system retries a failed eligibility check automatically, what stops that retry from accidentally submitting a duplicate request the external vendor would bill for or flag as suspicious?"
- "Nine months and two phases is the stated timeline — which of these three legacy systems gets integrated in which phase, and why that order specifically?"

A strong answer to each names a specific mechanism or rule (a defined timeout-and-fallback behavior, an explicit data-reconciliation rule with a named owner, an idempotency key preventing duplicate submission, a phasing rationale tied to risk or dependency) rather than a general assurance that "the integration will be handled."

## Why "we'll just call the API" is rarely complete

Naming that an integration exists is the easy part of integration architecture, and a board already assumes you'd call the API — that's not the part being evaluated. What's being evaluated is everything around the call: what happens when it's slow, what happens when it disagrees with another source, and what happens when it fails outright. An answer that only confirms the integration point exists, without addressing its failure behavior, answers a question a board didn't actually ask.

## Key terms

| Term | Meaning |
|---|---|
| Failure-behavior focus | Integration questioning aimed at what happens when a connection is slow, down, or inconsistent, rather than whether it works under ideal conditions |
| Synchronous vs. asynchronous | Whether a system waits for a live response before proceeding, versus proceeding and reconciling the answer later |
| Idempotency | A property preventing a retried operation from causing a duplicate effect, such as submitting the same request twice |
| Data reconciliation rule | An explicit, owned rule for which source wins when two systems disagree about the same piece of data |

## Lab

Run the healthcare scenario's Q&A segment again, with questioning concentrated entirely on integration using the four rehearsed objections above plus one you write yourself. For the sync-versus-async question specifically, write out your hybrid reasoning (the business requirement that decides it, and the tradeoff of pure synchronous dependency on an external vendor) rather than just stating a single chosen pattern.

## Check yourself

Can you explain why integration-focused questioning targets failure behavior rather than the happy path? Can you reason out loud through the synchronous-versus-asynchronous tradeoff for the eligibility-check scenario, including a plausible hybrid? Can you name what idempotency protects against, and why a naive retry without it is a real risk in this scenario?
