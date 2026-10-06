# Troubleshooting Questions

**Chapter 1 · Interview Preparation · Lesson 5 of 15**

If you've worked through the Troubleshooting Oracle Financials course and the capstone's January 31 crisis, you already have real troubleshooting experience — this lesson is about presenting it the way an interviewer expects: a discipline, not a lucky guess.

## What you'll learn

- The four-step troubleshooting discipline this entire path has trained, and how to say it out loud
- Model answers to the troubleshooting questions you're most likely to get
- How to turn a vague problem statement into a specific, provable one before you touch anything

## The discipline, named

Every troubleshooting lesson in this path, and every fix in the capstone, follows the same four steps: **isolate** the problem to something specific and provable, **confirm** it with real evidence (logs, reports, diagnostics — not a hunch), **fix** it narrowly rather than overcorrecting, and **document** what happened and why. Naming this discipline explicitly in an interview signals that you troubleshoot methodically, not by accident.

## Q&A: Troubleshooting

**"A user says a report 'just shows the wrong numbers.' What do you do first?"**
Make the complaint specific before doing anything else. Get the exact figure they expected, the exact figure they saw, and when each report ran. Vague complaints like "the numbers are wrong" usually resolve into something ordinary once you pin down specifics — a timing cutoff, a currency conversion, or a reconciliation break that hasn't been investigated yet.

**"An FBDI load failed partway through. How do you approach it?"**
Check the load's error log first — Oracle's FBDI process reports specific row-level and column-level failures, not just "it failed." Isolate which rows failed and why (a missing reference value, a format mismatch) before deciding whether to fix the source file and reload everything or just reload the failed rows.

**"A batch of subledger transactions shows accounting status Incomplete instead of Final. Where do you look?"**
Start with the Create Accounting error details for one specific transaction — they usually name the missing piece directly, most often a missing account rule mapping for a transaction type. Fix the rule, then rerun Create Accounting for the whole affected batch, and confirm each one now shows Final, not just the one you originally checked.

**"How do you know when to stop investigating and just ask for help?"**
When you've isolated the problem to something specific but it's outside Financials' own configuration — a security role issue, an interface from another system, infrastructure — that's the point to loop in the right team rather than guessing further. Knowing the boundary of what a functional consultant can fix is itself a sign of experience, not a weakness.

**"Tell me about a real problem you've diagnosed and fixed."**
This is where the capstone pays off directly. Pick one of the six January 31 problems — the GRNI accrual, the misapplied receipt, the mis-categorized asset, the duplicate bank transmission, the missing SLA account rule, or the unposted intercompany journal — and walk it using this lesson's four steps: what you isolated, how you confirmed it, what you fixed, and how you verified it. Lesson 9 covers this specific answer in full depth.

## Key terms

| Term | Meaning |
|---|---|
| Isolate | Narrowing a vague complaint to a specific, provable cause |
| Confirm | Verifying the suspected cause with real evidence, not assumption |
| Incomplete (accounting status) | A signal to check Create Accounting's error detail for a transaction, usually a missing account rule |

## Lab

Write out the four-step discipline (isolate, confirm, fix, document) applied to one problem from your own capstone work, in four short sentences — one per step.

## Check yourself

- Why is "the numbers are wrong" not yet a troubleshooting-ready problem statement?
- What's the first thing to check when a batch of transactions comes back Incomplete?
- When should you stop investigating and escalate instead of continuing to dig?
