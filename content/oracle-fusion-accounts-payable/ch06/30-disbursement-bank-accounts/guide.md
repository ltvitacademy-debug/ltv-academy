# Lesson 30 — Disbursement Bank Accounts

**Chapter 6 · Payments · Lesson 30 of 42**

## What you'll learn

- The Bank / Branch / Account hierarchy behind every disbursement account
- Why disbursement bank accounts are set up in Cash Management, not Payables
- How a disbursement account links to a business unit and a payment process profile
- Why an organization typically has more than one disbursement account

## The hierarchy under every bank account

Every disbursement bank account in Oracle Fusion sits on top of a three-level structure, maintained in **Cash Management** rather than Payables itself:

1. **Bank** — the financial institution (e.g., a specific bank)
2. **Branch** — the specific branch of that bank the account is held at
3. **Account** — the actual account number, currency, and account use

Payables doesn't own this setup — it consumes it. A **disbursement bank account** is simply a Cash Management bank account flagged for the **"Payables Disbursements"** account use, which makes it eligible to be selected as the funding source for a Payment Process Profile.

## Why it's structured this way

Keeping bank account setup in Cash Management (rather than duplicating it inside Payables) means the same bank account record can serve multiple purposes across the organization — disbursements from Payables, receipts in Receivables, reconciliation against bank statements — all pointing at one single source of truth instead of three disconnected copies that could drift out of sync.

## Linking account, business unit, and currency

A disbursement bank account is assigned to one or more **business units**, and it's denominated in a specific **currency**. A Payment Process Profile then references a specific disbursement account, which is how a payment run knows exactly which account funds it.

### Illustrative example

**Solace Robotics** (fictional, reused from Lesson 27) operates two business units: a US division and a European division.

| Business unit | Disbursement account | Currency | Used by PPP |
|---|---|---|---|
| Solace Robotics US | Solace US Operating – Checking | USD | US Domestic ACH |
| Solace Robotics Europe | Solace EU Operating – Current | EUR | International Wire & SEPA |

When the US division runs a payment process request for its domestic suppliers, the PPP routes it to the USD account automatically. There's no manual step where someone chooses a bank account per payment — it's determined by which PPP (and therefore which account) the invoices are grouped into.

## Why most organizations have more than one

A single disbursement account rarely covers everything cleanly: separate currencies need separate accounts, separate business units are often required to keep their disbursements auditable and distinct, and some organizations maintain a dedicated account purely for payroll-adjacent or high-control disbursements, separate from routine trade payables.

## Key terms

| Term | Meaning |
|---|---|
| Bank / Branch / Account | The three-level structure underlying every bank account, maintained in Cash Management |
| Disbursement bank account | A bank account flagged for the "Payables Disbursements" use |
| Account use | The flag determining what a bank account is eligible to be used for |

## Check yourself

You're ready for Lesson 31 when you can answer, without looking: where is a disbursement bank account actually set up, and what flag makes it usable by Payables?
