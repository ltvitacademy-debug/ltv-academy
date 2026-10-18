# Project Wrap-Up & Architecture Review

The capstone is built. This final lesson is the architecture review every production system should get before being signed off — checking the finished system against the course's own standards, not just confirming it runs.

## What you'll learn

- How to run a structured architecture review against this course's five common-mistake checklist
- How to read the finished project's run log and extract the operational story it tells
- How to identify what you'd change about this specific project if given a second pass
- How this capstone's architecture generalizes to other hybrid projects beyond VQE
- What to actually say in a sign-off review versus a "looks good" rubber stamp

## Reviewing the capstone against Lesson 5's five mistakes

| Mistake (Lesson 5) | How this project addressed it |
|---|---|
| 1. No simulator-first development | Lesson 20 verified the full 80-iteration loop and injected-failure handling against a simulator before any real-hardware submission |
| 2. No retry/fallback strategy | Lesson 21 implemented the Lesson 12/13 decision table, with exponential backoff and a flagged simulator fallback after exhausted retries |
| 3. No cost ceiling | Lesson 21's circuit-breaker halts the loop if cumulative cost crosses $1,200 (25% headroom over the $960 plan), checked after every submission |
| 4. Ignoring shot noise | The aggregation logic (Lesson 8, wired in at Lesson 20) always reports a standard error alongside the cost-function value, never a bare number |
| 5. Tight coupling to one provider's SDK | The backend adapter interface (Lesson 10) let Lesson 20 swap between the simulator and Rigetti Ankaa-3 without changing orchestration code |

A project that can show a concrete, specific answer for all five rows — not just "we were careful" — is what a real architecture review is checking for.

## Reading the finished run's operational story

A completed run's ledger (Lesson 21) should tell a coherent story on its own: say it shows 80 successful iterations, 4 iterations with one retried failure each (device-offline, resolved on retry to a different device), total cost $1,008.00 (80 x $12.00 + 4 x $12.00 wasted-retry cost), total wall-clock time around 58 minutes (80 batched iterations at roughly 42-45 seconds each, per Lesson 11's batched-iteration timing model), and a final converged Hamiltonian expectation value reported with its standard error. Every one of those numbers should be traceable to a specific ledger entry or log line — if any of them can only be explained by "that sounds about right," the logging isn't complete enough yet.

## What a second pass would change

Looking back at Lesson 19's original scoping: the brief flagged that running this daily would cost roughly $21,120/month, a number that was never resolved — just flagged. A genuine second-pass review has to revisit that, not let it quietly disappear once the one-run capstone works. Using Lesson 18's resource-management levers: reducing shots from 1,000 to 500 (halving per-shot cost, raising standard error by only `sqrt(2) ≈ 1.41x`) or reducing run frequency from daily to a few times a week are both concrete options a second pass should evaluate against whatever the actual business requirement for freshness turns out to be — the same honest re-scoping conversation Lesson 18 modeled.

## How this generalizes beyond VQE

Swap the ansatz and the cost function (a QAOA cut-value for a combinatorial problem, a loss function for a variational classifier) and every other piece of this architecture — the state machine, the batching strategy, the retry/fallback decision table, the cost ledger and circuit-breaker, the simulator-first testing discipline — carries over unchanged. That transferability is the actual deliverable of this course: not a working VQE demo, but a reusable classical orchestration pattern that works for any Pattern A hybrid workload.

## Signing off like an engineer, not a rubber stamp

A real sign-off names what was checked and what remains open: "Orchestration, error handling, and cost tracking meet the Lesson 5 checklist with evidence in the run log. Open item: the $21,120/month projection from kickoff was never resolved — recommend a follow-up scoping conversation before any daily production rollout." That is a genuinely useful review. "Looks good, ship it" is not — and after this course, you now know specifically what "looks good" has to mean.

## Key terms

| Term | Meaning |
|---|---|
| Architecture review | A structured check of a finished system against a specific standard (here, Lesson 5's five mistakes), with evidence, not a general impression |
| Operational story | The coherent, traceable narrative a run's ledger and logs should tell about cost, timing, and failures without further investigation |
| Open item | A flagged, unresolved question from earlier scoping that a review should surface rather than let quietly disappear |
| Architecture transferability | The property that an orchestration pattern (state machine, retry/fallback, cost ledger) generalizes across different Pattern A algorithms |
| Evidence-based sign-off | A review conclusion that cites specific checklist items and log evidence, rather than a general "looks good" |

## Check yourself

Write a short sign-off review (3-5 sentences) for this capstone project, explicitly referencing at least three of the five Lesson 5 checklist rows with the specific evidence from this project that satisfies each one, and naming the one open item that should not be allowed to quietly disappear.
