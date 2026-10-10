# Lesson 14 — NFR Case Study: Regulated Financial Services

**Chapter 3 · Practice · Lesson 14 of 18**

## What you'll learn

- How a regulated industry inverts the NFR priority order from Lesson 13's volume-driven scenario
- How compliance NFRs drive security, reliability, and recoverability design in a financial-services context
- How to handle a compliance requirement an architect isn't personally qualified to interpret
- How the same six-category framework produces a very different design when the dominant pressure changes

## The scenario

A regional wealth-management firm is implementing Financial Services Cloud to manage client portfolios, advisory notes, and account documentation. Advisors handle personally identifiable information, account balances, and investment recommendations subject to recordkeeping and suitability-review obligations under financial-services regulation, along with the firm's own contractual confidentiality commitments to clients. Unlike Lesson 13's retailer, transaction volume here is modest and steady — a few hundred new records a day, no dramatic spikes. The firm's compliance officer, not an executive sponsor, is the most influential stakeholder in this project.

## Applying the elicitation lens, differently

Lesson 8's techniques still apply, but the emphasis shifts: the most productive elicitation source here is Technique 2 — existing SLAs, contracts, and policies — specifically the firm's regulatory obligations and its own data-retention and client-confidentiality commitments, which already exist in writing before this project starts. A scenario walkthrough still matters, but the scenario that surfaces the most important NFRs isn't a volume spike — it's "a regulator requests every record and communication related to a specific client's account for the past five years" and "an advisor's laptop is lost or stolen."

## The dominant NFR categories here

For this firm, **compliance, security, and recoverability** dominate, while performance and scalability (Lessons 2 and 4) are present but genuinely secondary — the data and transaction volumes here never approach the scale where those categories would force a difficult design trade-off. This is the direct contrast with Lesson 13 the chapter is built to teach: the same six-category framework, applied honestly to a different business, produces a completely different priority order, because the framework asks what actually matters for this organization rather than assuming a fixed ranking.

- **Compliance**: recordkeeping obligations likely require specific retention periods for client communications and advisory notes, and the firm's own confidentiality commitments function as compliance-adjacent NFRs even where no regulator directly mandates them.
- **Security**: field-level access to account balances and PII should be scoped tightly by role (Lesson 3), and Shield's Event Monitoring becomes easy to justify here specifically because the compliance officer's stated requirement — detecting and proving who accessed which client's data, and when — is exactly what it's built for.
- **Recoverability**: the lost-laptop scenario isn't really a device problem; it's a test of whether the firm's data-loss-prevention posture and backup/audit trail (Lesson 6) can prove what was and wasn't exposed, and whether client records are still intact and recoverable regardless of what happened to any one advisor's device.

## Where the architect's job stops

When the compliance officer states a specific retention period or a specific recordkeeping rule, the architect's job (per Lesson 7) is to implement that stated requirement faithfully — translating it into field-level, retention, and access-control design — not to independently interpret the underlying regulation from scratch. If the compliance officer's stated requirement seems internally inconsistent, or if a proposed technical design might not actually satisfy what they're asking for, the right move is to raise that specific concern back to the compliance officer and get it resolved by the person with the actual regulatory expertise, the same way an architect would escalate an ambiguous business requirement back to the stakeholder who owns it rather than guessing.

## The design decisions this NFR set should produce

Field-level security and permission sets get scoped so that only advisors with an active client relationship can see that client's account balance and advisory notes — not every advisor in the firm by default. Event Monitoring is enabled specifically on the objects holding account and advisory data, satisfying the compliance officer's stated access-logging requirement. A documented data-retention policy is implemented as an explicit retention and archival design (Lesson 6) on the communications and advisory-note objects, rather than left to whatever Salesforce's defaults happen to do. None of these decisions would be the obvious starting point for Lesson 13's retailer — which is exactly the point of running both case studies.

## Key terms

| Term | Meaning |
|---|---|
| Regulatory recordkeeping | A compliance obligation to retain specific records (communications, advisory notes) for a defined period, verifiable on request |
| NFR priority inversion | The same six-category framework producing a different dominant-category ranking for a different business, based on that business's actual risk profile |
| Escalation to the requirement owner | Raising an ambiguity in a stated compliance requirement back to the compliance stakeholder, rather than the architect independently reinterpreting the regulation |

## Lab

The compliance officer states: "We need to be able to prove, for any client, exactly who viewed their account data and when, going back at least three years." Write this as a specific, testable NFR in this course's format, name which Salesforce feature from Lesson 3 or Lesson 6 would be the primary way to satisfy it, and explain one design choice (such as log retention configuration) that would need to be verified to confirm the three-year requirement is actually met, not just assumed.

## Check yourself

Can you explain why compliance, security, and recoverability dominate this scenario while performance and scalability are secondary, in direct contrast to Lesson 13? Can you describe what an architect should do when a compliance officer's stated requirement seems ambiguous, rather than independently guessing at the regulation's intent?
