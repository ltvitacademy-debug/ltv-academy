# Lesson 23 — Two-Way Matching · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Welcome to Chapter 5, Matching and Special Invoices. We open with the simplest form of matching in Oracle Fusion Payables: two-way matching.

## S2 · STEPS

Matching means comparing an invoice to the purchase order your own organization already created, before Payables lets that invoice through validation. It's one of the core internal controls in procure-to-pay. Two-way matching checks exactly two things: does the invoiced quantity match the ordered quantity, and does the invoiced price match the ordered price? Nothing about whether goods actually arrived — that's not part of this check.

## S3 · CODE

Here's an illustrative example. Cascade Industrial Parts, a fictional supplier, is on a purchase order for one hundred bearing assemblies at twelve dollars fifty cents each. The invoice comes in for the same one hundred units at the same twelve fifty. Quantity matches, price matches, and Payables validates it without a hold.

## S4 · STEPS

Because two-way matching never checks a receipt, it fits purchase orders where a formal receiving step is overkill — services like consulting hours or a maintenance contract, or low-dollar indirect purchases. If you need proof the goods physically showed up before you pay, two-way matching by itself isn't enough.

## S5 · CODE

Real invoices rarely match to the penny. Matching tolerances set how much variance is allowed before a hold appears: a quantity-ordered tolerance as a percent, a price tolerance as a percent, and sometimes a flat dollar ceiling on top of that. Suppose Cascade invoices the same hundred units at twelve ninety-five instead of twelve fifty. With a five percent price tolerance, that passes. Without one, it lands on a price hold until someone resolves it.

## S6 · OUTRO

Two things, quantity and price, no receipt required. Next up, lesson twenty-four: three-way matching, where a receipt finally enters the picture.
