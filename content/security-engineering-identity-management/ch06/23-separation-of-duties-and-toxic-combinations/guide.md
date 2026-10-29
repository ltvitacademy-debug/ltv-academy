# Lesson 23 — Separation of Duties and Toxic Combinations

**Chapter 6 · Identity Governance · Lesson 23 of 28**

## What you'll learn

- What separation of duties (SoD) means, and why it's a control against both fraud and honest error
- What a "toxic combination" is, specifically, as distinct from just "too much access"
- A real, classic worked example of a toxic combination and exactly how it enables fraud
- Why SoD has to be checked as a *combination* across systems, not system by system

## Separation of duties: no single person, two incompatible powers

**Separation of duties (SoD)** is the principle that no single person should hold two permissions that, combined, let them carry out a harmful action — fraud, theft, or a serious error — entirely on their own, without anyone else's involvement. The classic formulation is simple: if one person can both **initiate** an action and **approve** that same action, there is no second set of eyes anywhere in the process, and the control that approval is supposed to provide doesn't exist. SoD isn't about distrust of any specific employee; it's a structural control that protects the organization — and, just as importantly, protects honest employees from being wrongly suspected, because no one person was ever in a position to act alone.

## Toxic combinations: naming the specific dangerous pairings

A **toxic combination** is a specific, identifiable pairing of permissions (sometimes across two different systems) that, held together by one person, creates an SoD violation. The reason the word "combination" matters is that neither permission is necessarily a problem *on its own* — the risk only exists in the pairing. Someone who can create vendor records in the ERP isn't inherently risky; someone who can approve payments isn't inherently risky. But **someone who can do both** can create a fake vendor and then approve a payment to it, with no one else ever reviewing the transaction. Identity governance teams maintain a catalog of these known toxic combinations — specific permission-pairs that must never coexist on one identity — and check real access against that catalog, rather than relying on anyone noticing a problem by eye.

## Worked example: create-vendor + approve-payment

This is the textbook toxic combination, and it's worth working through exactly:

1. **Create Vendor** permission in the ERP lets a user add a new vendor record — name, bank account, payment terms
2. **Approve Payment** permission lets a user sign off on a payment running against an existing vendor record

Neither permission alone is dangerous. A clerk who can only create vendor records has to get someone else to approve any payment to them. A manager who can only approve payments can't invent a vendor to pay in the first place. But a single person holding **both** permissions can quietly create a vendor controlled by a shell company or an accomplice, and then approve a payment to it themselves — a complete fraud cycle with zero external review at any step. This exact pairing is one of the most commonly cited toxic combinations in financial-controls literature (it's a standard example in SOX internal-controls guidance) precisely because it's so simple to execute and so easy to prevent, if anyone is actually checking for it.

## Other common toxic combinations

The create-vendor/approve-payment pair is the canonical example, but the same structural problem shows up across other processes:

- **Create purchase order** + **receive goods/confirm delivery** — lets someone order something and falsely confirm it arrived, enabling a fictitious purchase
- **Modify payroll record** + **approve payroll run** — lets someone change their own (or someone else's) pay rate and then approve the run that pays it out
- **Grant system access** + **approve access certification for that same access** — an IT administrator who can both provision access *and* certify that the provisioned access is appropriate removes the independent check a certification campaign (Lesson 22) is supposed to provide

## Why SoD has to be checked across systems, not within one

A permission check that only looks within a single application will miss combinations that span two systems — someone with "approve payment" rights in the ERP and separately a database login that lets them edit the vendor table directly, bypassing the ERP's own create-vendor permission entirely, still has the same toxic combination in effect even though no single system shows it. This is exactly why a real identity governance program evaluates SoD at the level of **the person's total access across every system**, not one application's permission list in isolation — and it's the specific gap that purpose-built identity governance tooling (Lesson 24) is designed to close at scale.

## Key terms

| Term | Meaning |
|---|---|
| Separation of duties (SoD) | The principle that no single person should hold two permissions that combined enable fraud or serious error |
| Toxic combination | A specific, named pairing of permissions that creates an SoD violation when held by one person |
| Create-vendor / approve-payment | The classic worked example of a toxic combination in financial systems |
| Cross-system SoD | Checking for toxic combinations across a person's total access, not within just one application |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: why is "create vendor" + "approve payment" dangerous as a pairing, when neither permission is a problem by itself?
