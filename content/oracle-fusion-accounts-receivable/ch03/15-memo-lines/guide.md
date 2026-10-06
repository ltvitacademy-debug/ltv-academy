# Memo Lines

Standard invoices usually bill real catalog items or services that already have their own descriptions and accounting. Debit memos, on-account credits, and chargebacks often don't have that luxury — someone needs to describe "what is this $150 for" on the spot. Memo lines solve that with a reusable, predefined description and default accounting.

## What you'll learn

- What a standard memo line is and where it's used
- What a memo line defaults, beyond just a description
- Why memo lines keep ad hoc charges and credits consistent across the business

## What a memo line is

A **standard memo line** is a predefined line description — think "Restocking Fee," "Freight Correction," "Service Call Charge," or "Volume Rebate" — paired with a default unit price (optional) and default accounting references. When someone enters a debit memo, an on-account credit, a chargeback, or a debit memo reversal, they select a memo line instead of typing a free-text description and manually choosing a GL account every time.

## What a memo line defaults

- **Line description** – the standardized wording that appears on the transaction and any printed/emailed copy the customer receives.
- **Default accounting references** – used the same way a transaction type's accounting references are, to help AutoAccounting derive a GL account, so "Restocking Fee" always posts somewhere consistent no matter who enters it.
- **Tax classification** – whether the charge is taxable, and if so, which tax rate code applies by default.
- **Unit price** – optional; some memo lines represent a fixed fee and can default an amount, while others leave the amount for the person entering the transaction to fill in.

## Where memo lines are used

Memo lines appear specifically on:

- **Debit memos** – additional charges to a customer not captured on the original invoice.
- **On-account credits** – credits issued to a customer that aren't tied to a specific invoice.
- **Chargebacks** – the new debit item created when closing an original invoice for a shortpay (Chapter 4 covers chargebacks in detail).
- **Debit memo reversals** – undoing a debit memo that was issued in error.

Standard transaction lines on an ordinary invoice typically come from a price list or project billing data, not a memo line — memo lines exist specifically for these ad hoc, "something happened and we need to bill or credit for it" scenarios.

## A worked example

A shipment from Northwind Fixtures Co. to Harborline Retail Group arrives damaged, and Harborline is charged a $75 restocking fee for the replacement process. Rather than typing a free-text line and guessing at a GL account, the AR clerk selects the "Restocking Fee" memo line on a debit memo. It fills in the standardized description, defaults the fee's usual GL account through AutoAccounting, and applies the correct tax classification automatically — the same way every restocking fee at Northwind is coded, regardless of who enters it or which customer it's billed to.

## Recap

A standard memo line is a reusable description with default accounting and tax classification, used on debit memos, on-account credits, chargebacks, and debit memo reversals — the ad hoc side of billing that doesn't come from a price list. It keeps charges like restocking fees or freight corrections consistent no matter who enters them. Next up, lesson 16: revenue recognition basics in Receivables.
