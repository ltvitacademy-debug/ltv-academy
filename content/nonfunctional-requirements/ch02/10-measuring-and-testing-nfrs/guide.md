# Lesson 10 — Measuring and Testing NFRs

**Chapter 2 · Applying Nonfunctional Requirements · Lesson 10 of 18**

## What you'll learn

- Why an NFR without a measurement plan is just an opinion with a number attached
- How to test each NFR category: load testing, security review, data-volume simulation, failure injection, and audit
- Salesforce-specific testing tools and constraints, including sandbox data-volume limits and governor-limit testing
- Why "we'll find out in production" is not an acceptable NFR test plan

## A number without a measurement plan is not a requirement

Lesson 2 insisted a performance NFR needs a metric, a target, and a condition. This lesson adds the piece that makes it real: **how will anyone actually check whether the target was met?** An NFR that specifies "under 2 seconds for 95% of transactions during a 50,000-case spike" but has no planned test for simulating that spike is a number someone wrote down, not a requirement anyone can be held to. Testing isn't an afterthought bolted on at the end of a project — the test approach should be decided at the same time as the NFR itself, because an NFR that can't be tested with the team's actual available tools and environments needs to be rewritten into something that can.

## Testing approach by category

**Performance and scalability** are tested through **load testing**: simulating the specified condition (concurrent users, transaction volume, data volume) against a realistic copy of the system and measuring the actual metric against the target. On Salesforce, this typically means testing in a sandbox populated with a realistic data volume — which is itself a constraint, since different sandbox types (Developer, Partial Copy, Full) hold different volumes and refresh on different schedules, so the test plan has to account for which environment can actually hold enough data to simulate the real condition. A performance NFR that references a 15-million-record object can't be meaningfully load-tested in a Developer sandbox that only holds a small data sample — the test environment itself is part of the NFR's design, not an afterthought.

**Security** is tested through a combination of **access-control verification** (does a user with a given profile actually see, or not see, what the NFR specifies — tested directly, not assumed from the configuration looking correct) and **review against a known framework** (walking the design against OWASP-style categories, or a platform-specific security review checklist, to catch gaps a feature-by-feature test might miss). Salesforce's own **Security Health Check** tool, available in Setup, scores an org's security settings against a Salesforce-defined baseline and flags specific settings that fall short — a useful first-pass check, though it covers org-wide settings and does not substitute for testing record-level and field-level access against the NFR's specific requirements.

**Reliability** is tested through **failure injection**: deliberately causing the failure condition the NFR describes (disconnecting a callout's target, forcing a timeout, submitting a duplicate payload) and checking that the specified behavior actually happens — the retry, the idempotent write, the flag for manual review — rather than just testing the happy path and assuming the failure path works because nobody has seen it fail yet.

**Maintainability** is harder to test with an automated script, since it's about how easily a human can safely change the system — it's typically assessed through **code and configuration review** against the NFR's stated conventions (one automation tool per trigger context, documented Apex classes, and so on) and sometimes through a **deliberate exercise**: have someone who didn't build the feature attempt a specified change, and measure how long it actually takes versus how long it should take.

**Compliance** is tested through **audit**: a compliance or security reviewer (internal or external) checks the implementation against the specific regulatory requirement, often as a formal, documented sign-off rather than an automated test — because compliance NFRs (Lesson 7) usually need a qualified reviewer's judgment, not just a pass/fail script.

## What "we'll find out in production" actually costs

Skipping NFR testing doesn't make the NFR untrue — it just moves the discovery of whether it's true from a controlled test environment, where a failure costs a bug ticket, to production, where the same failure costs real data, real downtime, or a real compliance violation, discovered by a user or an auditor instead of a tester. The entire argument for NFRs existing in writing collapses if nobody ever checks whether they were met — at that point, the NFR document is theater, not engineering.

## Key terms

| Term | Meaning |
|---|---|
| Load testing | Simulating a specified volume or concurrency condition against a realistic environment to measure an actual metric against a target |
| Failure injection | Deliberately causing a specified failure condition to verify the system's reliability response actually works |
| Security Health Check | A Salesforce Setup tool that scores an org's security settings against a Salesforce-defined baseline |
| Audit (compliance testing) | A qualified reviewer's documented check of an implementation against a specific regulatory requirement |

## Lab

Take the performance NFR you wrote in Lesson 2's lab (case creation under load). Write a concrete test plan for it: what environment you'd test in, how you'd generate the specified load condition, what you'd measure, and what sandbox-type or data-volume constraint might make this NFR difficult to test realistically as currently worded. If you find a constraint, revise the NFR's wording so it's still testable with realistically available tools.

## Check yourself

Can you explain why an NFR without a planned measurement approach isn't really a requirement? Can you name the testing approach this lesson pairs with each of the five NFR categories it covers (performance/scalability, security, reliability, maintainability, compliance)?
