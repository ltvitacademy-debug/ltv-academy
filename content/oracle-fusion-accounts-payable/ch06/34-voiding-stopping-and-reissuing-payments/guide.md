# Lesson 34 — Voiding, Stopping, and Reissuing Payments

**Chapter 6 · Payments · Lesson 34 of 42**

## What you'll learn

- The difference between voiding and stopping a payment
- Why timing — has the payment cleared the bank yet — decides which option applies
- What reissuing a payment actually involves
- What happens to the original invoice in each scenario

## Three different situations, three different actions

Something can go wrong with a payment after it's already been created — a check gets lost in the mail, a wrong supplier gets paid, an EFT is sent with incorrect bank details. Oracle Fusion Payables has three distinct tools, and which one applies depends almost entirely on **timing**.

### Void: before the payment has left the organization's control

**Voiding** a payment cancels it *before* it's been issued, or before it's cleared the bank — most commonly used for a check that was printed incorrectly, or a payment created in error that was never actually sent. Voiding effectively unwinds the payment: the invoice(s) it was applied to go back to an unpaid, payable status, as though the payment had never happened.

### Stop payment: after it's been issued, but before it's cleared

A **stop payment** is used once a check has already been sent (or an EFT has been issued) but hasn't yet cleared the bank. Unlike a void, which is purely an internal Oracle action, a stop payment also requires action **with the bank** — placing a hold on that specific check number or transaction so the bank refuses to honor it if it's presented. This typically involves a bank fee and isn't instantaneous.

### Reissue: creating a replacement

**Reissuing** means creating a new payment to replace one that's been voided or stopped — same invoices, same supplier, usually a new payment date and sometimes a different payment method (switching a lost check to an EFT, for example, to avoid the risk happening twice).

## Illustrative example

**Harbor Point Logistics** (fictional, reused from Lesson 24) was issued a check for $4,200 last week. The supplier calls to say the check never arrived.

| Step | Action |
|---|---|
| 1 | Confirm the check hasn't cleared the organization's bank account |
| 2 | Place a **stop payment** with the bank on that check number |
| 3 | Mark the original payment as stopped in Payables — the invoice becomes unpaid again |
| 4 | **Reissue** a new payment for the same $4,200, this time by EFT |

If, instead, the check had been caught *before* it was ever mailed — say, printed with the wrong address — a **void** would have been the right tool, since nothing had left the organization yet.

## What always happens to the invoice

In every one of these scenarios, the underlying invoice reverts to an unpaid status once the payment is voided or stopped, ready to be picked up again — either by a quick payment or the next Payment Process Request — until the reissued payment is successfully made.

## Key terms

| Term | Meaning |
|---|---|
| Void | Cancelling a payment before it's been issued or cleared |
| Stop payment | A bank-side hold placed on an issued payment that hasn't cleared |
| Reissue | Creating a new, replacement payment for the same invoices |

## Check yourself

You're ready for Lesson 35 when you can answer, without looking: what single factor decides whether you void a payment or place a stop payment on it?
