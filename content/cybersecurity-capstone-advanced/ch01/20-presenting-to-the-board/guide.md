# Lesson 20 — Presenting to the Board

**Chapter 1 · Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident · Lesson 20 of 26**

## What you'll learn

- How Mara Voss and CISO Howard Okonjo split one board presentation
  into two real roles, instead of one person covering everything
- What actually goes on the board's four slides, chosen from this
  program's results the same way Lesson 17's register and Lesson 19's
  AAR chose what mattered
- How the audit/SIEM discrepancy gets disclosed to the board honestly,
  without either hiding it or burying it in technical detail
- What "the ask" is, and why a board report with no ask at all is just
  a status update

## Two voices, one report

Howard opens and closes the meeting; Mara is in the room to answer
anything the board pushes on. Howard frames the headline and makes the
ask — that's a CISO's job, speaking for the program as a whole to a
body that's evaluating risk, not engineering. Mara stays ready to
defend any specific number if a director asks for it, because she's
the one who actually built the pilot, the automation, and the
reconciliation. Splitting it this way means the board gets both a
clear, non-technical headline and a credible answer if anyone digs in
— which, as Lesson 21 covers, they do.

## What's actually on the four slides

| Slide | Content |
|---|---|
| Headline | Risk posture is improving: the zero-trust pilot is live on the OT/SCADA segment, dual-cloud identity is consolidated for that segment, and a real access-visibility gap was found and closed before it reached this meeting |
| Program results | Zero-trust pilot: standing OT/SCADA admin access cut from 17 untracked accounts to 13 governed ones, with the remaining break-glass pattern now time-boxed and logged. Dual-cloud identity: Azure AD and AWS IAM Identity Center consolidated to one source of truth for the pilot segment, removing shadow local accounts entirely |
| The discrepancy, disclosed | A quarterly audit and Mara's validation automation produced two different admin counts for the same segment. The gap was investigated, the root cause was a methodology gap (not a data error), it's fixed, and it's logged as GRC-RISK-0147 |
| The ask | Approve funding and headcount to extend zero-trust segmentation and the corrected audit methodology to Hartwell's next OT segment, ahead of the maintenance window Lesson 22 scopes |

## Disclosing the discrepancy without flinching

The instinct to soften or skip the discrepancy is understandable — it's
a finding, and findings sound like failures. It's the wrong instinct
here. The honest version is also the stronger version: *"this
quarter, two independent methods checked the same access and
disagreed; we found out why, fixed it, and both methods now agree."*
That sentence demonstrates the program working exactly as designed —
two independent checks existing specifically so a real gap had a
chance to be caught. Hiding it would have meant hiding the clearest
evidence that the zero-trust investment is paying for itself.

## Why the ask matters

A board report that only lists what was accomplished, with no decision
attached, is a status update dressed as governance input. Howard's ask
— fund and staff the next segment's rollout — gives the board something
to actually decide, using everything on the first three slides as the
evidence for why that decision is reasonable. A report that ends
without an ask leaves the board with nothing to do except nod, which
wastes the one thing a board meeting is actually for.

## Key terms

| Term | Meaning |
|---|---|
| Headline risk posture | A short, non-technical statement of whether risk is improving, stable, or worsening, and why |
| The ask | The specific decision or approval a board report requests, separating governance input from a status update |
| Audience-appropriate disclosure | Giving a true account of a problem at the right level of detail for who's receiving it, without hiding or minimizing it |

## Lab

1. Draft the one-sentence headline you'd give this board, covering the
   pilot, the identity consolidation, and the discrepancy together.
2. Write the single sentence Howard would use to disclose the
   discrepancy, and explain why it's honest without being a technical
   deep-dive.

## Check yourself

You're ready for Lesson 21 when you can explain why Howard makes the
ask while Mara defends the detail, and why disclosing the discrepancy
plainly is a stronger move than leaving it off the slides.
