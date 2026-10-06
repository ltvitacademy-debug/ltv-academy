# Requisition Accounting Distributions

Dana's requisition has a supervisor's approval. Before it can become a purchase order, every line still needs an answer to a question nobody in Self Service Procurement ever asks out loud: which account actually absorbs this cost? This lesson covers the distribution.

## What you'll learn

- What a distribution is and why every requisition line needs one
- Where the default charge account comes from
- How a requisition can be committed as an encumbrance before it is even a purchase order
- Why this setup matters later, when you reconcile the transaction into the General Ledger

## What a distribution is

A **distribution** is the piece of a requisition (and later, a purchase order) line that specifies the accounting: how much of the line's cost goes to which charge account, and in multi-funded cases, split across more than one account or project. For a simple line like Dana's 50 bearings, there is typically a single distribution covering the full line amount. A requisition could also be split across multiple distributions — for example, if two different departments were sharing the cost of a shared purchase — but that is not the case in this transaction.

## Where the charge account comes from

The charge account on a distribution is not typed in by the requester. It defaults based on rules set up during Enterprise Structures and Chart of Accounts configuration — rules that can draw on the **requester's own default expense account**, the **deliver-to location or cost center**, and the **item category**, among other factors. For Dana's bearing purchase, the default charge account resolves to a maintenance expense account tied to her plant's cost center, since Industrial Pump Bearing, Model PB-4400 is categorized as an MRO expense item rather than an inventory asset item. If LTV instead tracked this bearing as a stocked inventory item, the distribution would default to an inventory or material account instead, and the accounting treatment at receipt (covered in lesson 18) would be different as a result.

## Encumbrance: committing funds before the purchase order exists

If LTV Manufacturing Corporation has encumbrance accounting (sometimes called commitment accounting) enabled for procurement, approving Dana's requisition can create a **requisition encumbrance** — a budgetary journal that reserves funds against the maintenance cost center's budget, even though no purchase order or invoice exists yet. This protects against over-committing a budget: if the maintenance cost center's remaining budget cannot absorb the 50-bearing purchase, the requisition can fail budgetary control before it ever reaches a buyer. When the requisition is later converted into a purchase order, the requisition encumbrance reverses and a purchase order encumbrance takes its place, carrying the same reservation forward rather than double-counting it.

## Why this distribution matters downstream

The charge account that defaults here is not cosmetic. It is the account that will ultimately be debited when the bearings are received and the supplier is paid. When you reconcile this transaction into the General Ledger in Chapter 5, you will be looking for this exact account, on this exact cost center, to confirm the accounting followed the transaction correctly from end to end.

## Recap

Every requisition line needs a distribution that specifies its charge account, which defaults from Enterprise Structures setup rather than being typed by the requester. If encumbrance accounting is active, approval can reserve budget through a requisition encumbrance before a purchase order even exists. Next up, lesson 9: processing Dana's approved requisition into Marcus's purchase order.
