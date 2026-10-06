# Revenue Recognition Basics

Lesson 12 established that revenue is recorded when "earned," not when cash is received. This lesson goes one level deeper: what does "earned" actually mean, precisely, and how do modern accounting standards define it?

## What you'll learn

- The core revenue recognition principle
- A simplified look at the five-step model used under current standards (ASC 606 / IFRS 15)
- Why revenue recognition gets genuinely complicated for multi-part deals
- Why this is a heavily automated, carefully governed area inside Oracle Fusion

## The core principle

**Revenue should be recognized when control of a good or service transfers to the customer**, in an amount that reflects what the business expects to be entitled to receive in exchange. "Control transferring" usually lines up with common sense — a retailer recognizes revenue when it hands over the product; a consultant recognizes revenue as services are performed — but real contracts can make this genuinely tricky, which is exactly why formal standards exist.

## A simplified five-step model

Modern accounting standards (ASC 606 in the US, IFRS 15 internationally) define revenue recognition through five steps:

1. **Identify the contract** with a customer.
2. **Identify the separate performance obligations** — the distinct promises within that contract (e.g., a software license *and* a year of support might be two separate obligations, not one).
3. **Determine the transaction price** — the total amount the business expects to receive.
4. **Allocate the price** across each performance obligation, based on their relative standalone value.
5. **Recognize revenue** as (or when) each performance obligation is satisfied.

This matters practically: a single contract isn't necessarily "all revenue, all at once." A $12,000 contract for a product ($9,000 of standalone value) plus a year of support ($3,000 of standalone value) would typically recognize $9,000 at delivery and the remaining $3,000 spread across the support period — not $12,000 the day the contract is signed.

## Worked example

A fictional software company, **Thistledown Systems Inc.**, sells a $12,000 package: a software license delivered immediately, and 12 months of support, together worth $12,000 in standalone value ($9,000 license, $3,000 support).

```
At delivery (license transferred):
  Recognize $9,000 of License Revenue

Each of the next 12 months (support delivered monthly):
  Recognize $250 of Support Revenue per month ($3,000 / 12)
```

The remaining, not-yet-recognized portion sits as **Unearned Revenue** (a liability, see lesson 12) until each month's support is actually delivered.

## Why this gets genuinely complicated in practice

Real-world contracts often bundle hardware, software licenses, support, training, and custom services into a single deal, each with its own delivery timeline and standalone value. Determining fair standalone values, deciding what counts as a separate performance obligation, and tracking recognition schedules across potentially thousands of contracts by hand would be unmanageable — which is exactly the problem revenue management software exists to solve.

## Why this matters for Oracle Fusion

Revenue recognition is one of the most heavily regulated, auditable areas of accounting, because getting it wrong (intentionally or not) directly misstates a company's reported performance. Oracle Fusion Receivables, along with dedicated revenue management functionality in the broader Oracle Fusion ecosystem, exists to apply these exact five-step rules consistently and automatically across large volumes of contracts — turning what would be an error-prone manual process into a governed, auditable one.

## Recap

Revenue is recognized when control of a good or service transfers to the customer, following a five-step model: identify the contract, identify performance obligations, determine the price, allocate it, and recognize revenue as each obligation is satisfied. This is exactly the kind of carefully governed logic Oracle Fusion's revenue tooling automates. Next up, lesson 21: accounting periods and the close cycle.
