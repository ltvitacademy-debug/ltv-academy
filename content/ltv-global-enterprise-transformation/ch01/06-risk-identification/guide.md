# Lesson 6 — Risk Identification

**Chapter 1 · Scenario and Requirements · Lesson 6 of 33**

## What you'll learn

- Why risks are identified before the detailed design, not discovered by accident during it
- LTV Global's six initial risks, and how each one traces back to a fact already established in this chapter
- The standard shape of a risk register entry: the risk, its impact, its likelihood, and its mitigation
- Why this lesson's risk list is the same one Chapter 5 formalizes and Chapter 6 gets questioned on

## Risks you can already see before designing anything

A Technical Architect doesn't wait for the detailed design to be finished before thinking about risk — many of the most important risks in a project are visible the moment you understand the current state, the stakeholders, and the vision, which is exactly why risk identification closes out this chapter rather than waiting for a later one. Every risk below is a direct consequence of a fact this chapter already established; none of them required new information to see coming.

## LTV Global's initial risk register

| # | Risk | Impact | Likelihood | Mitigation (introduced here, detailed later) |
|---|---|---|---|---|
| 1 | LedgerPoint's batch-only nature could delay financial visibility for sales and service teams expecting current data | Medium | High | Design nonfunctional requirements around an accepted batch tolerance window, not a false real-time promise (Lesson 17) |
| 2 | A single integration user owning all dealer-synced records concentrates ownership and risks data/ownership skew at scale | High | Medium | Queue-based record ownership instead of a single integration-user owner (Lesson 10) |
| 3 | GDPR and EMEA data-residency obligations could be violated by a design that doesn't account for region-specific handling of personal data | High | Medium | Region-aware data design and Salesforce's own data-residency handling (Lesson 11, Lesson 17) |
| 4 | Experience Cloud licensing or performance could fail to scale cleanly to millions of end-customer logins if the wrong license type or sharing model is chosen | High | Medium | Right-sized license type and selective sharing design, not a one-size-fits-all internal-style license (Lesson 16) |
| 5 | Migrating EuroCRM's EMEA field service data could disrupt the Field Service Director's team mid-cutover | High | Medium | Phased migration with a parallel-run period before EuroCRM is retired (Lesson 20) |
| 6 | Four business units building inconsistent customizations independently could produce governance sprawl over time | Medium | High | A Center of Excellence governance model with real standards and a change advisory process (Lesson 22) |

## Reading the register: impact and likelihood aren't the same axis

Notice that risk 6 (governance sprawl) is rated lower impact than several others but higher likelihood — governance problems compound slowly and rarely cause a single dramatic failure, but they are almost certain to happen without deliberate intervention, precisely because four independent business units left alone will diverge. Risk 3 (GDPR) is rated high impact but only medium likelihood — a violation would be serious, but it's avoidable with design discipline, not inevitable. Separating these two axes is what keeps a risk register useful instead of just a list of worries: it tells you where to spend design effort first (high impact, high likelihood risks) versus where a lighter-touch mitigation might be enough.

## Why this list reappears twice more

This chapter's risk register isn't a one-time exercise. Lesson 25, in Chapter 5's deliverables, formalizes this same list — with updated impact/likelihood assessments once the actual design choices are known — into the risk register deliverable a real engagement hands the client. And the Architecture Review Board in Chapter 6 will, almost certainly, ask about at least one of these six risks directly: a board that has seen enough designs knows that an architect who can't speak to their own project's risks in real time is a bigger red flag than any individual risk itself.

## Key terms

| Term | Meaning |
|---|---|
| Risk | A potential problem that hasn't happened yet but could, if not addressed by design |
| Impact | How bad the consequence would be if the risk materialized |
| Likelihood | How probable it is that the risk actually materializes |
| Mitigation | The design or process decision intended to reduce a risk's impact or likelihood |
| Risk register | A structured, living list of risks, their impact/likelihood, and their mitigations |

## Lab

Pick one risk from the register above that you believe is currently under-mitigated — meaning the one-line mitigation given here feels thin relative to the stated impact and likelihood. Write two or three sentences explaining why you think so, and name one additional, concrete action (beyond what's listed) you'd want to see in that risk's mitigation once the relevant later lesson has been covered in full.

## Check yourself

Can you name at least four of LTV Global's six initial risks and the chapter fact each one traces back to? Can you explain, using risk 3 and risk 6 as examples, why impact and likelihood are tracked as two separate axes rather than one combined "how worried should I be" score?
