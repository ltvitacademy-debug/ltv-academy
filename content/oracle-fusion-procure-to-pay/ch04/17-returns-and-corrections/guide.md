# Returns and Corrections

LTV Manufacturing Corporation's 50 bearings passed inspection cleanly, so this lesson steps briefly outside the main transaction to cover what Priya would do if they had not. Returns and corrections are common enough in real receiving work that a consultant needs to understand both, even when this course's own transaction does not need either.

## What you'll learn

- What a return to supplier (RTS) is and when it is used
- How a correction differs from a return
- How a return or correction affects the purchase order and downstream accounting
- Why these matter even though LTV's own transaction skips them

## Return to supplier (RTS)

A **return to supplier** reverses a receipt, in whole or in part, sending material back to the supplier — typically because the material failed inspection, arrived damaged, or was simply the wrong item. Creating an RTS in Oracle Fusion Receiving reduces the quantity considered received against the purchase order schedule, which flows through to reduce what can later be matched and invoiced. If LTV had rejected, say, 5 of the 50 bearings during inspection for a cosmetic defect, Priya would process a return to supplier for those 5 units, and the purchase order's received quantity would drop to 45 until (if at all) Meridian shipped replacements.

## Correction

A **correction** adjusts a receipt that was entered with an error, without necessarily involving the supplier at all — for example, Priya receiving 55 units by mistake when only 50 physically arrived, or receiving against the wrong purchase order line. A correction changes the receipt transaction itself (or reverses and re-enters it) to reflect what should have been recorded, and, like a return, it adjusts the quantity available for later matching. The key distinction from a return: a correction fixes a recording mistake on LTV's side, while a return reflects an actual physical decision to send goods back to Meridian.

## Why this affects downstream matching and accounting

Both a return and a correction change the receipt quantity that Chen, the AP processor, will see when Meridian's invoice arrives for three-way matching in Chapter 5. If the received quantity available for matching is lower than the invoiced quantity because of an unprocessed return, the invoice will not match within tolerance and will be placed on hold rather than paid — which is exactly the kind of exception this course works through in Chapter 6. A return or correction also affects the receipt accrual you will learn about in lesson 18, since the accrual is based on what is recorded as received.

## Why LTV's transaction does not need either

In this course's main transaction, all 50 bearings pass inspection with no defects, and Priya enters the receipt correctly the first time, so there is nothing to return and nothing to correct. This lesson exists so that when Chapter 6's exception scenarios introduce a damaged shipment or a data-entry mistake, you already understand the mechanism being exercised rather than encountering it cold.

## Recap

A return to supplier reverses a receipt and sends material back due to a physical problem with the goods; a correction fixes a recording mistake on the receiving side without necessarily involving the supplier. Both reduce the quantity available for invoice matching and affect the receipt accrual. LTV's clean transaction needs neither, but Chapter 6 will. Next up, lesson 18: how the receipt itself generates accounting through receipt accounting and accruals.
