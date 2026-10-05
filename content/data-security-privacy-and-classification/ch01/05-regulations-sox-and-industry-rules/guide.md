# Lesson 5 — Regulations: SOX and Industry Rules

**Chapter 1 · Sensitive Data Foundations · Lesson 5 of 30**

> **This lesson is an orientation overview for learning purposes, not legal advice.** It introduces SOX and names several sector-specific rules at the level a data practitioner needs to recognize why certain data demands extra controls. Real compliance decisions require qualified legal counsel, not a training course.

## What you'll learn

- Why SOX matters to data governance even though it's a financial-reporting law, not a privacy law
- What SOX actually requires: officer certification, internal-control assessment, and independent audit oversight
- The role of the PCAOB
- Three other sector-specific rules you'll hear named constantly — PCI DSS, GLBA, and FERPA — and what each one is, in one line

## SOX isn't a privacy law — but it's still a governance law

The **Sarbanes-Oxley Act (SOX)**, enacted in **2002**, was passed after a wave of corporate accounting scandals — **Enron** and **WorldCom** are the two most commonly cited. SOX applies to **publicly traded companies and their auditors**. Unlike GDPR, CCPA, or HIPAA, SOX isn't about protecting personal data from misuse — it's about making sure a public company's financial reports are accurate and that the controls behind them can be trusted. It lands in a data governance course because the way you get there — access controls, segregation of duties, complete audit trails, data integrity — is exactly the infrastructure data governance builds.

## What SOX actually requires

Two sections matter most for how data governance teams end up involved:

- **Section 302** requires corporate officers (typically the CEO and CFO) to **personally certify** the accuracy of the company's financial reports. That certification is only honest if the underlying financial data is actually correct and the officer can trust the systems that produced it.
- **Section 404** requires management to **assess the company's internal controls** over financial reporting, and requires the company's independent auditor to **attest** to that assessment. "Internal controls" in practice means things like: who can change financial data, whether changes are logged, whether duties are properly separated (the person who approves a payment shouldn't also be the person who enters it), and whether those controls can be demonstrated to an outside auditor on demand.

SOX also established the **Public Company Accounting Oversight Board (PCAOB)**, a body created to oversee the audits of public companies — adding independent, external scrutiny on top of a company's own internal controls.

## Why this is a data governance topic at all

SOX doesn't mention "data governance" anywhere in its text. But Section 404's internal-controls requirement is, in practice, a data integrity and access-control requirement: financial data has to be accurate, changes to it have to be tracked, and the people with access to change it have to be limited and auditable. That's precisely the kind of work — access control, audit logging, segregation of duties, classification of what counts as "financial data" in the first place — that a data governance program is built to support.

## Other sector-specific rules you'll hear named

Beyond the big privacy laws and SOX, several other rules apply only within specific industries — but each one creates its own data-governance obligations wherever it applies:

- **PCI DSS** (Payment Card Industry Data Security Standard) — an *industry-mandated*, not government-enacted, standard for any organization that handles payment card data, maintained by the PCI Security Standards Council.
- **GLBA** (Gramm-Leach-Bliley Act) — a US financial-services law requiring institutions to safeguard customers' financial information.
- **FERPA** (Family Educational Rights and Privacy Act) — a US law protecting the privacy of student education records.

You don't need to master any of these in depth here — just recognize the pattern: whenever an organization touches payment cards, financial-services customer data, or student records, there's a named rule governing that specific data category, on top of whatever general privacy law also applies.

## Key terms

| Term | Meaning |
|---|---|
| SOX | Sarbanes-Oxley Act (2002) — governs financial-reporting integrity at public companies |
| Section 302 | Requires officers to personally certify financial-report accuracy |
| Section 404 | Requires management's internal-controls assessment plus auditor attestation |
| PCAOB | Public Company Accounting Oversight Board — oversees audits of public companies |
| PCI DSS / GLBA / FERPA | Sector-specific rules for payment cards, financial-services customer data, and student records, respectively |

## Lab

Pick one of PCI DSS, GLBA, or FERPA. In two or three sentences, name the category of data it protects and one plausible example of an organization that would need to comply with it (a retailer accepting credit cards, a bank, a university registrar). This is a recognition exercise — the goal is connecting the rule's name to the category of data it governs, not citing its specific provisions.

## Check yourself

Can you name the two SOX sections covered in this lesson and what each requires, name the oversight body SOX created, and match PCI DSS, GLBA, and FERPA each to the category of data they protect?
