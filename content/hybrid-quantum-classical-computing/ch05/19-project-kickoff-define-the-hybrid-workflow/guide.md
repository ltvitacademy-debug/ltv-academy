# Project Kickoff: Define the Hybrid Workflow

This chapter is one continuous capstone project, built across four lessons: define it here, build the orchestration layer in Lesson 20, add error handling and cost tracking in Lesson 21, and review the finished architecture in Lesson 22. This lesson is the scoping work every real hybrid project needs before any code gets written.

## What you'll learn

- How to scope a hybrid project using the four-question method from Chapter 1's lab
- The specific project this capstone builds, and why its shape is representative of real work
- How to size the project's QPU-call budget before writing any orchestration code
- How to set explicit success criteria that don't depend on quantum advantage being real
- How to write a one-page project brief a reviewer could approve or reject on its own

## The capstone project: a portfolio-risk VQE service

**Problem statement**: "Estimate the ground-state energy of a small molecular system used as one input feature to a larger portfolio-risk scoring model, as a daily batch job." (This mirrors the drug-discovery example from Chapter 1's lab, repurposed here as the consistent thread through the rest of this chapter.)

Applying the four-question method: **(1) loop or one-shot?** A classical optimizer drives an ansatz circuit iteratively (variational loop, Lesson 2) — this is Pattern A. **(2) What's the QPU's job?** Evaluating a Hamiltonian expectation value each iteration — one of the three things QPUs are actually good at (Lesson 1). **(3) How many evaluations?** A 6-parameter ansatz, parameter-shift gradients, targeting 80 iterations: `(6x2+1) x 80 = 13 x 80 = 1,040` circuit evaluations — a project-planning number we'll carry into Lesson 20's orchestration design. **(4) Does the scale exist today?** Yes — a 6-parameter ansatz for a small molecular system fits comfortably within current NISQ device qubit counts.

![Amazon Braket Devices list, including Rigetti](/courses/hybrid-quantum-classical-computing/ch05/19-project-kickoff-define-the-hybrid-workflow/aws-devices-list.webp)
*Rigetti Ankaa-3, live — the real backend this entire capstone is scoped and priced against.*

## Sizing the budget before writing code

At 1,000 shots/evaluation on Rigetti Ankaa-3 ($0.30/task + $0.0009/shot), batched into one program-set submission per iteration (80 submissions total, each covering 13 evaluations):

```
shots per submission = 13 x 1,000 = 13,000
cost per submission   = $0.30 + 13,000 x $0.0009 = $0.30 + $11.70 = $12.00
total for 80 iterations = 80 x $12.00 = $960.00
```

This single daily run costs $960 — comfortably inside a reasonable monthly compute budget if run occasionally, but worth flagging now (not after Lesson 21's cost tracking is built) if the real plan is to run this *every single day*: `$960 x 22 business days ≈ $21,120/month`, which is the kind of number that changes a go/no-go decision before a line of orchestration code is written.

![Amazon Braket Algorithm library](/courses/hybrid-quantum-classical-computing/ch05/19-project-kickoff-define-the-hybrid-workflow/aws-algorithm-library.webp)
*The real catalog this capstone's four-question scoping check was run against, same method as Lesson 4.*

## Setting success criteria that don't require quantum advantage

A common scoping mistake is making a project's success criterion "the quantum result is better than a classical baseline" — which is often not achievable with today's hardware and isn't actually what this capstone is testing. This capstone's success criteria are entirely about the **classical engineering** quality of the system, which is what this course teaches: (1) the orchestration layer correctly handles the full job lifecycle including at least one simulated failure/retry; (2) cost and latency are tracked and logged per iteration; (3) the system produces a result with a correctly-computed and reported standard error; (4) a reviewer can read the operational log after a run and answer "what did this cost, how long did it take, and did anything fail" without re-running anything.

## The one-page project brief

A reviewable brief states: the problem (ground-state energy estimation, daily batch), the pattern (Pattern A, variational loop), the architecture (6-parameter ansatz, parameter-shift gradients, program-set batching, Rigetti Ankaa-3), the budget ($960/run, flagged monthly cost if run daily), and the success criteria (the four engineering criteria above, not a quantum-advantage claim). This is the artifact Lesson 20 builds against, and it's short enough that a reviewer unfamiliar with the project could approve or reject it in one read.

## Key terms

| Term | Meaning |
|---|---|
| Project brief | A one-page scoping document stating problem, pattern, architecture, budget, and success criteria, reviewable before implementation starts |
| Engineering success criteria | Success measures based on system correctness/observability rather than on achieving quantum advantage over a classical baseline |
| Ansatz | The parameterized circuit template whose parameters the classical optimizer tunes to estimate ground-state energy |
| Budget sizing (pre-implementation) | Computing a workload's expected cost before writing orchestration code, to catch an unaffordable plan early |
| Pattern A scoping | Applying the four-question method from Chapter 1 to confirm a project is a coprocessor-pattern, currently-buildable problem |

## Check yourself

Using the four-question method, write a one-paragraph scoping judgment for this alternative ticket: "Run this same molecular ground-state estimation hourly, every hour, 24/7, instead of once daily." What does the $960/run figure tell you about this proposal, and what would you recommend before approving it?
