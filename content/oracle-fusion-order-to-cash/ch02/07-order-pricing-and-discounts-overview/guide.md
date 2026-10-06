# Order Pricing and Discounts Overview

When Harborview's order line was entered — 400 units of Model CP-220 — Oracle Fusion didn't ask anyone to type in a price. It calculated one, using a price list and a set of discount rules that were configured long before this order ever existed. This lesson covers how that calculation actually works, so the $55,100.00 net total from lesson 4 isn't a number you just have to take on faith.

## What you'll learn

- What a price list is and how it attaches to an order
- The difference between a price list price and a final, discounted price
- How a volume discount like Harborview's 5% actually gets applied
- Why price overrides typically require approval

## Price lists

A **price list** is a defined set of prices for items, usually organized by currency and sometimes by customer segment. Every order line prices against a specific price list — determined by the customer, the business unit, or sometimes a specific agreement negotiated with that customer. For SO-48217, the Model CP-220 Control Panel's list price on Harborview's applicable price list is $145.00 per unit, which is where the $58,000.00 list total for 400 units comes from.

## From list price to net price

A price list price is a starting point, not necessarily the final price. Oracle Fusion applies **pricing strategies** and **discount modifiers** on top of it:

- **Manual discounts** a salesperson or order administrator applies directly to a line, within whatever limit their role allows.
- **Automatic discounts** that the system applies whenever an order meets a defined condition — for example, "5% off list price when the quantity on a line is 300 units or more." This is exactly the rule that fires for SO-48217: 400 units clears the 300-unit threshold, so the 5% volume discount applies automatically, without anyone requesting it.
- **Negotiated agreements**, where a specific customer has a contract with its own pricing that overrides the standard price list entirely.

For SO-48217, the automatic volume discount is what turns $58,000.00 into $55,100.00: $58,000.00 × 5% = $2,900.00 off, leaving a net $55,100.00.

## Why overrides need approval

A price list and its discount rules exist so pricing is consistent and predictable. When someone wants to go outside those rules — a one-off discount larger than policy allows, or a price below a defined floor — Oracle Fusion typically routes that change through an approval rule (often built in Approval Management, AME) before the order can proceed. This is a different approval than the credit check covered in the next two lessons: a price override approval asks "is this discount allowed," while a credit check asks "can this customer afford this order." SO-48217 doesn't need a price override — its discount is a standard, pre-approved rule — but it will need a credit-related review, which is where we're headed next.

## Recap

An order line prices against a price list, then pricing strategies and discount modifiers adjust that price — manually, automatically by rule, or by a negotiated agreement. SO-48217's 5% volume discount is an automatic rule triggered by quantity, which is why it needed no special approval. Anything outside the standard rules typically does need one. Next up, lesson 8: the credit check and approval process that SO-48217 does have to go through.
