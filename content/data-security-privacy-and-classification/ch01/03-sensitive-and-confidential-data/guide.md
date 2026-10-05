# Lesson 3 — Sensitive and Confidential Data

**Chapter 1 · Sensitive Data Foundations · Lesson 3 of 30**

## What you'll learn

- What "sensitive data" means — data that causes harm to a person if exposed
- What "confidential data" means — data an organization protects for business reasons, independent of personal harm
- Why these categories overlap but aren't identical, with concrete examples of each
- Why this distinction sets up Chapter 2's classification labels (public/internal/confidential/restricted)

## Sensitive data: protect this because of who it's about

**Sensitive data** is data that, if exposed, causes harm to the **person** it describes. The harm is personal: embarrassment, discrimination, financial fraud, even physical danger. The examples from Lesson 2's "special category" preview belong here: **health records**, **biometric data**, **sexual orientation**, **religious beliefs**, and **financial account numbers**. What makes something sensitive isn't who owns the system that holds it — it's the real-world consequence to the individual if the wrong person sees it. A leaked HIV status or a leaked bank account number doesn't hurt the company that stored it nearly as much as it hurts the person it's about.

## Confidential data: protect this because of business risk

**Confidential data** is a different category entirely: information an organization has a **business reason** to protect, regardless of any personal-harm risk. There may be no individual "victim" at all. The classic examples: **trade secrets**, unreleased **M&A (merger and acquisition) plans**, proprietary **source code**, and internal **financial statements** before they're public. If a competitor gets your unreleased product roadmap, nobody's personal privacy was violated — but the business damage can be severe: lost competitive advantage, insider-trading exposure, breached contracts.

## Overlapping, but not identical

These two categories look similar — both get the instinctive reaction "protect this" — but they protect against different risks, for different reasons, often under different rules:

- A person's **health record** is sensitive (harms the person) but usually isn't confidential in the business sense — the company holding it isn't protecting its own trade secret.
- A company's **unreleased merger plan** is confidential (harms the business) but isn't sensitive in the personal sense — no individual's health, biometrics, or orientation is at stake.
- Some data is genuinely **both**: an executive's **salary and health benefits file** is sensitive to that person *and* confidential to the company that doesn't want compensation structures public.

Knowing which category — or both — applies to a given dataset changes who gets a say in protecting it (the individual has rights over sensitive data that they don't have over a company's trade secrets), which regulations apply (privacy law vs. trade-secret and securities law), and what the actual failure mode looks like if it leaks.

## Why this matters for what comes next

Chapter 2 introduces **classification schemes** — labels like public, internal, confidential, and restricted — that organizations apply to every dataset they hold. Those labels have to account for *both* kinds of risk at once: a label scheme that only thinks about business confidentiality will under-protect a customer's health data, and a scheme that only thinks about personal sensitivity will under-protect the company's unreleased financials. The sensitive/confidential distinction from this lesson is exactly the groundwork that classification scheme has to be built on.

## Key terms

| Term | Meaning |
|---|---|
| Sensitive data | Data that causes harm to the individual it describes if exposed (health, biometric, orientation, financial account data) |
| Confidential data | Data an organization protects for business reasons, independent of personal harm (trade secrets, M&A plans, source code, internal financials) |
| Overlap | Some data is both sensitive and confidential (e.g., an executive's compensation and health file); most data is only one or the other |

## Lab

Take four pieces of data: a customer's medical history, a company's unreleased quarterly earnings, an employee's home address, and a proprietary pricing algorithm. For each, decide whether it's sensitive, confidential, both, or neither — and write one sentence explaining the specific harm that would result if each one leaked.

## Check yourself

Can you state the difference between "sensitive" and "confidential" data in your own words, give one real example of each that is NOT the other, and give one example of data that is genuinely both?
