# Oracle Implementation Interview Questions

**Chapter 1 · Interview Preparation · Lesson 6 of 15**

Implementation questions test whether you understand the project, not just the product — the phases a real Oracle Fusion engagement moves through, who does what in each one, and how a functional consultant's role actually changes from kickoff to go-live. Your capstone, from Chapter 1's requirements through Chapter 3's close, mirrors this lifecycle directly.

## What you'll learn

- The phases of a typical Oracle Fusion Cloud implementation, in plain language
- What a functional consultant actually does in each phase, versus other roles on the project
- Model answers to common implementation-process questions

## The phases, in practice

Different firms and methodologies label these phases slightly differently — don't recite a single vendor's branded name as if it's universal, since methodology terminology itself is one of the things that drifts between firms and over time. The underlying work, though, is consistent:

1. **Plan** — requirements gathering, scoping, and confirming the enterprise structure design (legal entities, ledgers, business units). This is your capstone's Chapter 1.
2. **Configure and prototype** — building the configuration and validating it with the client in a conference room pilot (CRP), where business users react to a working system rather than a slide deck.
3. **Test** — system integration testing (SIT) across modules and interfaces, then user acceptance testing (UAT) where the client's own people run real transactions.
4. **Cutover and go-live** — migrating opening balances and open transactions, freezing the legacy system, and going live on the new one.
5. **Post-go-live support (hypercare)** — an intensive support period immediately after go-live, when issues surface that testing didn't catch, before settling into steady-state support.

## Q&A: Implementation

**"What's the difference between SIT and UAT, and why do you need both?"**
SIT confirms the system and its integrations work correctly from a technical and process standpoint, usually run by the project team. UAT confirms the actual business users can do their real jobs in the new system, run by the client's own people. Skipping UAT because SIT passed is a common and risky shortcut — SIT can't catch a workflow that's technically correct but practically unusable for the people who'll run it daily.

**"How do you handle a requirement that comes in after configuration is already locked?"**
Don't just quietly squeeze it in. Assess the real impact — does it change the chart of accounts design, a security role, a report everyone already tested against? — and raise it through whatever change control process the project uses, even an informal one, so the client understands the trade-off (timeline, retesting, cost) before it's accepted.

**"What's a conference room pilot, and why does it matter?"**
A CRP is a working session where the client's business users interact with the actual configured system — not a slide deck — well before go-live. It matters because it surfaces gaps between what was documented and what users actually need far earlier, and far more cheaply, than finding the same gap during UAT or after go-live.

**"Describe your role, specifically, during hypercare."**
Hypercare is when the configuration meets real daily volume and real users for the first time without a safety net. A functional consultant's job shifts from building to rapid triage: isolate whether an issue is a configuration gap, a training gap, or a genuine defect, and resolve or escalate it fast, because the client's trust in the new system is most fragile in exactly this window.

## Key terms

| Term | Meaning |
|---|---|
| CRP (conference room pilot) | A working session where users react to a configured, functioning system before go-live |
| SIT / UAT | System integration testing (technical) vs. user acceptance testing (business users, real workflows) |
| Hypercare | The intensive support period immediately following go-live |

## Lab

Map your own capstone's three chapters (design/configuration, transactions, month-end close) onto the five implementation phases above, in one sentence each.

## Check yourself

- Why can SIT pass while UAT still fails?
- Why raise a late requirement through change control instead of just squeezing it in?
- What's different about a consultant's job during hypercare versus during configuration?
