# Lesson 11 — The Compliance Audit Finding

**Chapter 1 · Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident · Lesson 11 of 26**

## What you'll learn

- The exact scope and method Hartwell's compliance team used for the audit R-05 scheduled
- The exact number that audit reports for standing admin access to the OT/SCADA segment
- Why a group-membership review is the normal, reasonable default for this kind of audit
- Why this number matters enough to memorize before the next lesson

## The audit R-05 scheduled actually runs

Hartwell's independent compliance function — a second-line team reporting to Howard Okonjo, separate from Mara's engineering work — runs the quarterly access audit R-05 put on the calendar. Its scope, as written in the audit charter: **standing admin access to the OT/SCADA segment**, the same boundary Mara's zero-trust segmentation pilot has been built around since Lesson 5. "Standing" here means access that's active right now, independent of whether anyone is using it this minute — exactly the kind of access a utility handling operational technology has to account for precisely.

## The method: group membership, reviewed directly

The audit's method is specific and documented in its own checklist: pull the membership list of **`OT-SCADA-Admins`**, the Microsoft Entra ID security group that grants administrative rights across the OT/SCADA boundary's Azure-side resources, and its AWS counterpart group, **`ot-scada-admins`**, consolidated under the identity work from Lesson 6. The auditor exports both group rosters, de-duplicates any account that appears in both, and counts the result. That's the entire method — a group membership export, nothing else.

This is a completely normal way to run this kind of audit. Group-based access control is *how Hartwell's own access policy says privileged access to this segment is supposed to be granted* — through group membership, reviewed on a schedule, approved by a resource owner. Auditing against the documented policy, by checking the control that policy actually names, is the standard approach, and it produces a clean, defensible list auditors can sign off on with confidence.

## The number

As of the close of business on October 12 — the audit's stated cutoff date — Hartwell's compliance team reports:

> **14 accounts hold standing admin access to the OT/SCADA segment**, based on membership in `OT-SCADA-Admins` and `ot-scada-admins`.

That number, 14, goes into the formal audit report delivered to Howard Okonjo. It's treated, at this point, as the authoritative count — there's no reason yet for anyone to think otherwise. The audit followed its documented method correctly and produced a clean, countable result.

## Why this number matters going forward

Hold onto two things from this lesson, precisely: the number **14**, and the method — **group membership only**, as of **October 12**. Every lesson from here through Lesson 18 refers back to this exact figure and this exact date. The next lesson introduces a second number, measured against the same access, the same segment, the same day — and it does not match.

## Key terms

| Term | Meaning |
|---|---|
| Standing access | Access that is currently active and usable, regardless of whether it's being used at this moment |
| Audit scope | The specific system, access, or control an audit is defined to examine — here, standing admin access to the OT/SCADA segment |
| Group-based access control | Granting access by adding an account to a group, rather than assigning a permission to that account individually |
| Audit cutoff date | The specific point in time an audit's findings are measured against, so results can be reproduced and compared later |

## Lab

1. Write out, in one sentence, the exact scope and method of Hartwell's audit, as if you were summarizing it for someone who wasn't in the room.
2. Explain why reviewing group membership is a reasonable default method for an access audit, even before you know whether it's complete.

## Check yourself

You're ready for Lesson 12 when you can state, without looking back: the exact number the audit reported (14), the exact method it used (group membership in `OT-SCADA-Admins` and `ot-scada-admins`), and the exact cutoff date (October 12).
