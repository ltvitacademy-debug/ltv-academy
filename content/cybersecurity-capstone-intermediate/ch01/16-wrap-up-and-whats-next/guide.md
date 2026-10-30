# Lesson 16 — Wrap-Up: What Changed, and What's Next

**Chapter 1 · Intermediate Capstone: Multi-Source Detection and a Real Misconfiguration · Lesson 16 of 16**

## What you'll learn

- A full recap of this project, stage by stage, from the original ask to the resolved incident
- The real skills this project proved, not just the tools it used
- Why "vendor access rule scoped too broadly" is a common, realistic failure mode, not a contrived one
- What the Advanced tier builds on top of this project's foundation

## The project, start to finish

```text
Multi-source ingestion -> correlation rule -> CA pilot -> IR runbook
   -> 3 AM alert -> traced to a firewall rule -> root cause confirmed
   -> fixed and validated -> runbook + baseline updated -> presented
```

- **Ingestion and detection**: Windows, Linux, and firewall logs feeding Sentinel, tied together
  by a correlation rule joining firewall allow-events with sign-in activity.
- **Identity and process**: a Conditional Access pilot policy, and the first real IR runbook.
- **The real incident**: a correlation alert at 3 AM, traced through `CommonSecurityLog` and a
  firewall rule's hit history to `ALLOW-VENDOR-RDP-SUPPORT`, scoped to `198.51.0.0/16` instead of
  the vendor's actual `198.51.100.16/28` since the rule's creation.
- **Resolution**: the rule narrowed and validated with both a positive and negative test, the
  incident written into the runbook as a worked example, and a two-part standing control — a
  per-change gate and a periodic review — added going forward.

## The real skills this project proved

- Tracing an alert all the way to its actual root cause instead of stopping at the first plausible
  explanation — the sign-in itself was never the real problem, the rule's scope was.
- Reading CIDR notation precisely enough to know that a `/16` silently contains a `/28`, and why
  that containment is exactly what let a mistake hide in plain sight.
- Validating a fix with both a positive and a negative test, not just one.
- Turning a single real incident into a runbook worked example and a specific, two-part standing
  control — not a vague promise to be more careful.
- Presenting a real internal mistake to stakeholders honestly, and answering a hard follow-up
  question with evidence instead of reassurance.

## Why this failure mode is realistic, not contrived

A vendor remote-access rule that gets written wider than intended under deadline pressure, and
then goes unreviewed because no process required a review, is one of the most common real causes
of unintended exposure in actual SOC environments — far more common than a dramatic external
breach. This project's incident is deliberately that ordinary, because that's the kind of problem
a working security analyst actually finds.

## What's next: the Advanced tier

The Advanced tier of this capstone track, built separately, takes this project's same discipline
further and ultimately toward a board-level security review. Everything proven here — tracing
alerts to root cause, validating fixes with controlled tests, and turning real incidents into
specific standing controls — carries forward directly into it.

## Key terms

| Term | Meaning |
|---|---|
| Root cause | The actual underlying issue, as opposed to the first symptom noticed |
| Positive/negative test | Confirming legitimate traffic works and confirming excluded traffic is blocked |
| Standing control | An ongoing process change meant to prevent or surface future instances of a found gap |

## Lab

Write a short, plain-English summary — three to five sentences — of this entire project, as if
explaining it to a new teammate who's never seen it: what was built, what went wrong, and how it
was found, fixed, and prevented going forward.

## Check yourself

Before moving on, you should be able to answer, without looking: what was the actual root cause of
the 3 AM alert, and what two things changed as a result — one about the firewall, one about
process?
