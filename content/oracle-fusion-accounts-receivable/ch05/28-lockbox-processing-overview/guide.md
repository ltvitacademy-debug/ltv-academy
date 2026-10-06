# Lockbox Processing Overview

Automatic receipts (lesson 27) cover customers who've authorized the company to pull payment directly. But most customers still mail a check to a P.O. box the company's bank manages — a **lockbox**. The bank opens the mail, deposits the checks, and sends the company a data file listing every payment received. Oracle Fusion Receivables has a dedicated process, **AutoLockbox**, to turn that bank file into receipts automatically, without anyone keying in hundreds of individual checks by hand.

## What you'll learn

- What a lockbox is and why companies use one
- The three stages of AutoLockbox: import, validate, post
- Common validation failures and how they're resolved
- Why lockbox is one of the highest-volume receipt entry methods

## Why companies use a lockbox

Picture a company receiving 300 checks a day in the mail. Opening envelopes, depositing checks, and keying each one into Receivables is slow and error-prone. A lockbox outsources the physical handling to the bank: customers mail payments to a special P.O. box address, the bank's lockbox operation opens the envelopes, deposits the funds same-day, and transmits a data file describing every payment — customer reference, check number, amount, and whatever remittance information (like invoice numbers) the customer included on the check stub.

## The three stages of AutoLockbox

1. **Import** — Receivables reads the bank's transmission file and loads it into an interface table (AR_PAYMENTS_INTERFACE_ALL), converting the bank's format into Receivables' internal structure.
2. **Validate** — Receivables checks the imported data for consistency and correctness before trusting it: the transmission record count and total amount must match what the file claims, there must be no duplicate receipts within the batch, the accounting date must fall in an open period, and referenced customers and transactions must actually exist and be valid.
3. **Post** — once validated, Receivables creates the actual receipts and, where the data includes enough remittance information (like an invoice number on the check stub), automatically applies them to the matching open transactions. Anything AutoLockbox can't confidently match is left unapplied for a clerk to resolve manually.

## When validation fails

Lockbox files aren't always perfect. Common validation problems include:

- A customer reference on the check doesn't match any customer in Receivables
- The invoice number referenced doesn't exist, or belongs to a different customer
- The amount to apply doesn't match any open transaction and isn't explained
- The transmission total doesn't reconcile with the sum of individual receipts

When a batch fails validation, Receivables doesn't silently drop the money — it flags the problem receipts for manual review (often through an exceptions or "unidentified receipts" queue) so a clerk can research and correct them, while the rest of the batch that passed validation proceeds normally.

## Why lockbox matters

For a business with a large volume of mailed checks, lockbox dramatically cuts the manual data entry burden and speeds up cash application — money gets deposited and recorded the same day it arrives, instead of sitting in an inbox until someone has time to key it in. It's one of the highest-volume ways receipts enter Receivables in a mid-size to large AR operation, right alongside automatic receipts for direct-debit customers.

## Recap

A lockbox lets a bank handle the physical receipt of mailed checks and transmit the payment data electronically. AutoLockbox imports that file, validates it for consistency, and posts receipts — applying them automatically where possible and flagging exceptions for manual review. Next up, lesson 29: reversing receipts, for when a receipt needs to be undone after the fact.
