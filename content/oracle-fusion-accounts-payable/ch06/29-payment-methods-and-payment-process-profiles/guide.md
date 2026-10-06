# Lesson 29 — Payment Methods and Payment Process Profiles

**Chapter 6 · Payments · Lesson 29 of 42**

## What you'll learn

- The common payment methods available in Oracle Fusion Payables
- What a Payment Process Profile (PPP) actually controls
- How a payment method and a PPP work together
- Why a supplier can be restricted to specific payment methods

## Payment method: how money moves

A **payment method** is simply the mechanism used to pay a supplier:

| Payment method | How it moves |
|---|---|
| **Check** | A printed paper check, mailed or handed to the supplier |
| **Electronic funds transfer (EFT)** | A direct bank-to-bank transfer, e.g. US ACH or SEPA in Europe |
| **Wire** | A same-day or near-same-day bank transfer, usually for urgent or high-value payments |

Each supplier site can be restricted to one or more allowed payment methods — a supplier that's only ever been paid by check won't suddenly get paid by wire unless someone deliberately sets that up, with a verified bank account on file.

## Payment Process Profile: the rulebook behind the method

Choosing *check* vs. *EFT* tells you the mechanism, but not the dozens of operational details that go with it: which bank account disburses the funds, which document gets generated (a printed check layout vs. an electronic file in a specific format), how invoices get grouped together, and what the maximum or minimum payment amount is.

That's what a **Payment Process Profile (PPP)** defines. A PPP ties together:

1. The **payment method** it applies to (e.g., EFT)
2. The **disbursement bank account** funds come from (Chapter 6, Lesson 30)
3. The **document/file format** generated (a check layout, or an electronic payment file format like NACHA)
4. **Grouping rules** — e.g., one payment per supplier per day, or one payment per invoice
5. Processing limits, such as a minimum or maximum payment amount the profile will handle

A single payment method can have multiple PPPs behind it — for example, one EFT-based PPP for domestic suppliers paid through a NACHA file, and a separate EFT-based PPP for international suppliers paid through an ISO 20022 file, because the file formats and bank accounts differ even though the underlying mechanism (EFT) is the same.

## Illustrative example

**Cascade Industrial Parts** (fictional, reused from Lesson 23) is a domestic supplier paid by EFT through a PPP called "US Domestic ACH," which draws from the organization's primary disbursement account and generates a NACHA-formatted file. **BrightPath Consulting Group** (fictional, reused from Lesson 26) is an international supplier paid by EFT through a different PPP, "International Wire & SEPA," which draws from a separate foreign-currency disbursement account and generates an ISO 20022 file.

Same payment method on paper — EFT — but two different profiles, because the mechanics underneath are not interchangeable.

## Why the two layers matter

Keeping payment method and PPP as separate concepts means an organization can run several processing rulebooks under the same broad mechanism, routing payments correctly by currency, geography, or bank account — without that complexity ever showing up on the invoice itself.

## Key terms

| Term | Meaning |
|---|---|
| Payment method | The mechanism used to pay a supplier: check, EFT, or wire |
| Payment Process Profile (PPP) | The rulebook defining bank account, file format, grouping, and limits for a payment method |

## Check yourself

You're ready for Lesson 30 when you can answer, without looking: why might the same payment method need more than one Payment Process Profile?
