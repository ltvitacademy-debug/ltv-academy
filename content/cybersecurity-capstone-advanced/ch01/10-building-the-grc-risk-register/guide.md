# Lesson 10 — Building the GRC Risk Register

**Chapter 1 · Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident · Lesson 10 of 26**

## What you'll learn

- The exact columns a real risk register needs to be useful, not just filled in
- The first five risks Mara Voss logs for Hartwell Regional Utilities' zero-trust and identity program
- Why this register is a *living* artifact — one you'll watch get updated with a real finding starting in Lesson 17
- Why a risk gets logged even when the fix is already "in progress"

## The governance piece the board actually asked for

Howard Okonjo's board mandate was never just "segment the OT network and consolidate identity." It included a standing requirement: every risk this program surfaces has to be tracked somewhere auditable, with an owner and a decision attached — not just fixed quietly and forgotten. That's a **GRC risk register**, and building Hartwell's first real one is this lesson's job, before the program produces its first real finding.

A risk register earns its keep only if every row has the same minimum columns, filled in consistently:

| Column | What it captures |
|---|---|
| Risk ID | A stable identifier (`R-01`, `R-02`...) so the risk can be referenced later without restating it |
| Description | The actual risk, stated specifically enough that someone unfamiliar with the program understands the exposure |
| Likelihood | How probable the risk is to materialize (Low / Medium / High) |
| Impact | How bad it is if it does (Low / Medium / High) |
| Owner | The named person accountable for tracking it to resolution — not a team, a person |
| Treatment | Accept, Mitigate, Transfer, or Avoid |
| Compensating control | What's actually in place *right now*, while the permanent fix is still in progress |
| Status | Open, In Progress, Monitoring, or Mitigated |
| Review date | When this row gets looked at again, regardless of status |

## Hartwell's first five rows

Mara opens the register with five risks the program has already surfaced, before any compliance finding exists:

| ID | Description | Likelihood | Impact | Owner | Treatment | Compensating control | Status |
|---|---|---|---|---|---|---|---|
| R-01 | Flat IT/OT network path still allows lateral movement into the SCADA segment until the zero-trust segmentation pilot reaches full production rollout | Medium | High | Mara Voss | Mitigate | Temporary firewall ACL restricting IT-to-OT traffic to an approved allow-list pending full segmentation | In Progress |
| R-02 | Azure AD and AWS IAM are not yet fully consolidated, so the same person can hold different effective access in each cloud without either admin team seeing the other's grant | Medium | Medium | Mara Voss | Mitigate | Manual cross-cloud access comparison until identity consolidation completes | In Progress |
| R-03 | Hartwell's documented break-glass emergency-access procedure has no automatic expiration — elevated access stays active until someone manually revokes it | Medium | High | Mara Voss | Mitigate | Manual follow-up ticket required within 72 hours of any break-glass grant | Open |
| R-04 | The new Python access-inventory automation is now a single point of failure for access visibility if its scheduled run fails silently | Low | Medium | Mara Voss | Mitigate | Automation failure alert routed to Mara, plus a monthly manual spot-check | Mitigated |
| R-05 | No agreed cadence yet exists for compliance to audit standing access to Critical-tier segments such as OT/SCADA | Medium | Medium | Howard Okonjo | Mitigate | Quarterly compliance audit scheduled starting this quarter | In Progress |

Notice R-03 and R-05 in particular — they're not hypothetical. R-03 names a real structural weakness in the break-glass procedure itself, and R-05 is the reason a compliance audit is about to happen at all. Neither row predicts exactly what that audit will find. Hold onto both anyway.

## Why log a risk you're already fixing

R-04 is marked **Mitigated**, not closed or deleted. A risk register doesn't stop tracking something the moment a control goes in — it keeps the row, with its status updated, so anyone reading the register later can see what was identified, what was done about it, and when it was last confirmed still effective. A register with rows that disappear once "handled" can't answer the question every auditor eventually asks: *how do you know your controls are still working?*

## What this register is really for

This isn't paperwork for its own sake. R-05's compliance audit is scheduled to start almost immediately — Lesson 11 covers what it finds. Lesson 12 covers what Mara's own automation reports for the same access, the same day. By Lesson 17, this exact register gets a sixth row, written with the full, real finding those two lessons produce. Everything in this lesson exists so that update has somewhere real to land.

## Key terms

| Term | Meaning |
|---|---|
| GRC risk register | The tracking artifact listing every identified risk with its likelihood, impact, owner, treatment decision, compensating control, and status |
| Compensating control | A control that reduces a risk's likelihood or impact while the permanent fix is still being implemented |
| Risk owner | The named individual accountable for a risk's status and resolution — never a team or department alone |
| Treatment | The decision of what to do about a risk: accept, mitigate, transfer, or avoid |

## Lab

1. Write one new row for Hartwell's register, in the same format as R-01 through R-05, for a risk not yet listed: *the OT/SCADA segment's firewall rule set has not been reviewed since before this program started.* Assign it a likelihood, impact, owner, treatment, and compensating control.
2. Explain in one sentence why R-04 keeps its row in the register even though it's marked Mitigated.

## Check yourself

You're ready for Lesson 11 when you can name all nine columns of Hartwell's risk register from memory, and explain why R-03 and R-05 are worth remembering specifically as you move into the next lesson.
