# Lesson 15 — Finding the Actual Gap Between Both Reports

**Chapter 1 · Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident · Lesson 15 of 26**

## What you'll learn

- How Mara confirms, conclusively, *why* the audit's method couldn't have found these 5 accounts
- The exact distinction between a methodology gap and a data error — and why that distinction matters
- Why neither the audit team nor the automation did anything wrong
- The actual conclusion Mara is ready to bring forward

## Confirming it with the audit's own scope, not an assumption

Lesson 14 traced the 5 accounts to a real incident and a real procedural gap. That's the *mechanism*. This lesson confirms the *reason the audit's method specifically couldn't catch it* — not by inferring it, but by checking the audit's own documentation. Mara pulls the compliance team's audit charter and checklist from Lesson 11 and reads exactly what it instructs the auditor to do: export `OT-SCADA-Admins` and `ot-scada-admins` group membership, de-duplicate, count. There is no step anywhere in that checklist instructing the auditor to also query Entra ID directory role assignments or AWS IAM policies attached directly to an account. It was never in scope — not omitted by mistake, simply never written into the method at all.

## Why that distinction matters

This is the difference between two very different findings:

- **A data error** would mean someone pulled the wrong export, missed rows, or miscounted — a mistake within the method the audit was already supposed to follow.
- **A methodology gap** means the method itself, followed perfectly and correctly, is structurally incapable of seeing a category of access that exists. The audit team did exactly what their checklist told them to do, and their checklist simply never asked about direct, individual assignments.

What Mara has found is the second thing, not the first. The compliance team didn't miss a step they were supposed to take — the step didn't exist in the process they were given.

## Why this isn't the automation's success story either

It would be just as wrong to treat this as the automation simply being "better." The automation was built, deliberately, back in Lessons 8 and 9, to check both group membership and direct assignment — that was a design decision Mara made, not a lucky accident. The audit's checklist was written with a narrower scope. Both tools did exactly what they were built to do. The gap isn't a flaw in either tool; it's a gap between what one of Hartwell's two processes was built to check and what the sensitivity of the OT/SCADA segment actually requires.

## The conclusion

Put together, Lessons 11 through 15 establish one clean, defensible conclusion: **the compliance audit's group-membership-only method is structurally unable to detect direct, individually-assigned access, which is exactly how 5 stale break-glass grants from the Substation 12 outage went undercounted for fourteen months.** It is not a tooling bug. It is not a data error. It is not negligence by the audit team. It's a scope gap in Hartwell's compliance process — the single, precise thing Mara now needs to both fix and formally record.

## Key terms

| Term | Meaning |
|---|---|
| Methodology gap | A limitation built into a process's defined scope, that produces an incomplete result even when the process is followed correctly |
| Data error | A mistake made while executing a method, distinct from a limitation in the method's design |
| Audit scope documentation | The written checklist or charter defining exactly what an audit does and does not check |

## Lab

1. Write one sentence distinguishing a methodology gap from a data error, using this lesson's audit as the example of the former.
2. Explain why describing this finding as "the audit team's mistake" would be an inaccurate way to brief Howard Okonjo.

## Check yourself

You're ready for Lesson 16 when you can state the full, precise conclusion from memory — that this is a methodology gap, not a data error or an audit team mistake — and explain exactly why the audit's checklist alone proves it.
