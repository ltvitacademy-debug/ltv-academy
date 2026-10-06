# Lesson 30 — Disbursement Bank Accounts · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Every Payment Process Profile from the last lesson had to draw funds from somewhere. This lesson is about that somewhere: the disbursement bank account.

## S2 · STEPS

Every bank account sits on a three-level structure maintained in Cash Management, not Payables: the bank itself, the specific branch, and the account. Payables doesn't own this setup, it just consumes it. A disbursement bank account is simply a Cash Management account flagged for the Payables Disbursements use.

## S3 · STEPS

Keeping this in Cash Management means one bank account record can serve multiple purposes across the organization — disbursements, receipts, reconciliation — all pointing at one source of truth instead of several copies that could drift apart.

## S4 · CODE

Here's an illustrative example. Solace Robotics, a fictional company, runs two business units. The US division disburses from a USD checking account tied to its US Domestic ACH profile. The European division disburses from a separate EUR account tied to its International Wire and SEPA profile.

## S5 · STEPS

Nobody picks a bank account manually per payment. The payment process profile the invoices are grouped into determines which account funds the run. And most organizations need more than one account anyway — separate currencies, separate business units, sometimes a dedicated account just for high-control disbursements.

## S6 · OUTRO

Set up in Cash Management, consumed by Payables through the Payables Disbursements flag. Next up, lesson thirty-one: quick payments, for when a single invoice needs to be paid right now.
