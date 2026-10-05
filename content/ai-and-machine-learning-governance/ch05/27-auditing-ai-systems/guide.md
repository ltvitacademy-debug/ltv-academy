# Lesson 27 — Auditing AI Systems

**Chapter 5 · Responsible AI and Risk · Lesson 27 of 30**

## What you'll learn

- Why an AI audit is different from a financial audit, and what it's actually checking for
- The concrete evidence an auditor should expect to find if governance is real, not aspirational
- A simple structure for running (or preparing for) an AI system audit
- How auditing closes the loop on everything else in this chapter — and this course

## What an AI audit is actually checking

A financial audit checks whether the numbers are accurate and the controls around them were followed. An AI audit asks a related but broader question: **is this system actually operating the way the organization says it operates, and are the governance controls that were supposed to be in place actually in place** — not written down somewhere and then ignored. An audit is where principles (Lesson 23), risk tiers (Lesson 24), and whatever framework or regulation applies (Lessons 25–26) get checked against reality.

## The evidence a real audit looks for

If governance is real, it leaves a paper trail. An AI audit should be able to find, for any system in scope:

- **A model card or equivalent documentation** (Chapter 3) describing what the system does, what data trained it, and its known limitations.
- **A risk tier assignment** (Lesson 24) with a documented justification, not just a label someone assigned once and never revisited.
- **Evidence of bias or fairness testing** appropriate to that risk tier — not necessarily a perfect result, but evidence the test actually happened.
- **An access log** (Chapter 4) showing who can reach the model and its training data, and that access matches the approved list.
- **Monitoring and drift records** (Lessons 20–21) showing the system's performance is actually being watched post-deployment, not just at launch.
- **A record of the approval workflow** (Lesson 16) the system passed through before going live, including who signed off.

If any of these is missing for a high-risk system, that's a finding — the audit's job is to surface the gap, not to assume good intent fills it in.

## A simple audit structure

1. **Scope** — which systems are in this audit, and at what risk tier?
2. **Evidence request** — ask for the six items above, by name, before the audit begins.
3. **Walkthrough** — have the system's owner (Lesson 4's accountable role) walk through how a real decision was made, end to end.
4. **Gap identification** — compare what was promised (the policy, the framework commitment) against what evidence actually shows.
5. **Findings and remediation** — document gaps with an owner and a deadline, the same discipline a financial audit finding would get.

## Internal versus external audits

An internal audit (run by your own governance or compliance function) is about catching problems before anyone outside finds them, and it should happen on a recurring schedule tied to each system's risk tier — high-risk systems audited far more often than low-risk ones. An external audit (run by a regulator, a customer, or an independent third party) is where the paper trail this lesson describes either holds up or doesn't. Organizations that treat internal audits as a real check, not a formality, are the ones that don't get surprised by the external version.

## Why this closes the chapter

Chapter 5 started with principles — ideas about what AI *should* do. It's ending with audits — the mechanism that actually verifies whether those ideas are happening. Everything in between (risk management, frameworks, regulation) is the connective tissue. A principle nobody checks is a slogan. An audited control is governance.

## Key terms

| Term | Meaning |
|---|---|
| AI audit | A structured check of whether an AI system's actual operation and controls match what governance policy says they should be |
| Audit finding | A documented gap between what was promised and what the evidence shows, with an owner and a deadline |
| Internal audit | A governance-function-run check, done proactively, before any external party looks |

## Lab

Pick one AI system (real or plausible) and run the five-step audit structure from this lesson against it on paper. For each of the six evidence items, write whether you believe it currently exists, and if not, what finding you'd write.

## Check yourself

Can you list, from memory, the six pieces of evidence a real AI audit should be able to produce, and explain why their absence — not just a bad test result — is itself a finding?
