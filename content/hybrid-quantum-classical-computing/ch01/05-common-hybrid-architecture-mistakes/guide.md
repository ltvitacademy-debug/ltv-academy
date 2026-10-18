# Common Hybrid Architecture Mistakes

Most hybrid quantum-classical projects don't fail because the quantum circuit was wrong. They fail because of classical architecture decisions made in the first week — the ones this lesson walks through so you can recognize them before they cost real money.

## What you'll learn

- Five specific architecture mistakes that recur across hybrid quantum projects
- Why each mistake is attractive in the moment and expensive later
- The concrete fix for each, grounded in the patterns from Lessons 1-4
- How to review a hybrid architecture proposal for these mistakes before implementation starts
- Why most of these mistakes are classical software engineering mistakes, not quantum ones

## Mistake 1: developing directly against real hardware instead of a simulator

**Why it's tempting**: "I want to see it actually run on a real QPU from day one." **Why it's expensive**: as shown in Lesson 2, a single 150-iteration VQE run against real IonQ hardware costs roughly $77,265 — and a typical development cycle involves running a half-finished, buggy version of that loop dozens of times while you fix the cost function, the optimizer config, and the convergence logic. **The fix**: develop and debug the entire classical loop against a classical simulator (free or near-free, no queue wait) until it's verified correct on toy problems, and reserve real hardware for a small number of final validation runs.

## Mistake 2: no retry or fallback strategy for a flaky remote job

**Why it's tempting**: the happy path (submit job, get result) is what gets demoed, and a cloud quantum job "usually" succeeds. **Why it's expensive**: cloud quantum providers have queues, occasional hardware recalibration windows, and transient API failures, same as any remote service — a hybrid loop with no retry logic will crash or silently return bad data the first time a submission times out or returns a partial result, and this is deployed in production where that's a real incident, not a demo hiccup. **The fix**: build retry-with-backoff and a documented fallback path (e.g., falling back to a simulator result with a flag, or queuing for later) as a first-class part of the orchestration layer — covered in depth in Chapter 3.

## Mistake 3: no cost ceiling or circuit-breaker on the optimization loop

**Why it's tempting**: "the loop will converge before it gets expensive." **Why it's expensive**: optimizers sometimes fail to converge — they oscillate, plateau without triggering the tolerance check, or diverge due to a bug — and a loop with a max-iteration cap but no cost ceiling can burn through a full iteration budget at real-hardware prices before anyone notices. **The fix**: track cumulative spend inside the loop itself (not just after the fact in a billing dashboard) and halt with an alert if spend crosses a pre-set ceiling, independent of the iteration-count cap.

## Mistake 4: ignoring shot noise when comparing two circuit results

**Why it's tempting**: a measured expectation value looks like a precise number, so it's tempting to compare two results and conclude one is "better" based on a tiny difference. **Why it's expensive**: as Chapter 4's shot-budget lesson will show in detail, a measurement's standard error scales as `1/sqrt(shots)` — at 1,000 shots that's already a relative standard error around 0.032, meaning two results that differ by less than that are statistically indistinguishable, not evidence of a real difference. Treating noise as signal leads to wrong conclusions about which parameter set or circuit design is actually better. **The fix**: always report and reason about an expectation value together with its standard error, and only treat a difference as meaningful if it clears several standard errors.

## Mistake 5: coupling the classical orchestration code tightly to one provider's SDK

**Why it's tempting**: it's faster to write directly against, say, AWS Braket's SDK calls everywhere in your orchestration code than to build an abstraction layer first. **Why it's expensive**: cloud quantum provider pricing, queue behavior, and even circuit transpilation requirements change between providers and even between devices from the same provider (as the per-shot price table in Chapter 4 will show), and a project tightly coupled to one SDK has to be substantially rewritten to add a second backend, compare providers, or react to a pricing/availability change. **The fix**: define a thin internal interface (submit_circuit, get_result, estimate_cost) that your classical loop calls, with provider-specific adapters behind it — standard dependency-inversion, applied to this domain.

## Why all five of these are classical engineering mistakes

Notice that none of these five mistakes involve the quantum circuit being logically wrong. They are: skipping a test environment, missing retry logic, missing a budget guard, misreading statistical noise, and tight coupling to a vendor SDK. Every one of them is a mistake a backend engineer would recognize instantly in a non-quantum microservice — which is exactly the point of this course: the quantum-specific knowledge is a small, learnable slice; the production engineering discipline around it is the same discipline you already know, applied carefully.

## Key terms

| Term | Meaning |
|---|---|
| Classical simulator (development) | A local or cloud-hosted classical emulation of a quantum circuit, used to debug loop logic without hardware cost or queue wait |
| Circuit breaker (cost) | A runtime check that halts an optimization loop once cumulative spend crosses a pre-set ceiling, independent of iteration count |
| Shot noise | The statistical fluctuation in measurement outcomes due to a finite number of shots; quantified by standard error ~ 1/sqrt(shots) |
| Standard error | A measure of a measurement's statistical uncertainty; used to judge whether a difference between two results is meaningful |
| Provider abstraction layer | A thin internal interface (submit/get-result/estimate-cost) isolating orchestration code from any one provider's SDK |

## Check yourself

Your team's VQE loop has been running for three hours with no convergence and no cost alert. Using Mistakes 1, 3, and 4, write a short post-incident note explaining which of these mistakes most likely contributed, and the specific classical-code fix for each one you identify.
