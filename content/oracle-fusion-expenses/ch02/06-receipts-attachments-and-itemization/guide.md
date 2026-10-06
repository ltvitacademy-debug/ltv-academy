# Receipts, Attachments and Itemization

An expense amount by itself is just a number. A receipt is the proof behind it, and itemization is how a single receipt that covers several different kinds of spending gets split into the right pieces for policy and accounting. This lesson covers both.

## What you'll learn

- Receipt requirements and how missing receipts are handled
- The difference between an attachment and a required receipt
- Why itemization exists and when it's required
- A worked itemization example: a hotel folio

## Receipt requirements

Castellan's receipt policy, set up as part of expense system options and expense type configuration (lesson 2), requires an original itemized receipt image for:

- Any single expense item over $25
- All hotel expenses regardless of amount, since a folio usually bundles several charge types
- Any expense type flagged as "always requires receipt," such as airfare, regardless of dollar amount

An employee without a receipt is not automatically blocked. Expenses supports a **missing receipt declaration**, a formal statement the employee signs electronically affirming the expense occurred and the amount is accurate. Some companies cap how often an employee can use this declaration before audit rules force manual review every time (lesson 10 covers this audit tie-in). Repeated missing-receipt declarations are themselves a pattern that a well-designed audit rule should catch.

A **payment hold rule** goes a step further: it can place current or future expense reports on hold company-wide if receipts are overdue, until the employee clears the backlog. Castellan uses this for employees with more than three missing-receipt declarations active at once.

## Attachments versus receipts

A **receipt** is the required proof backing a specific dollar amount on a specific expense item. An **attachment** is any supporting document uploaded to the report or an item — a conference agenda showing which sessions justified travel, an email approving an exception to policy, or a photo of a parking sign explaining an unusual parking charge. Attachments are optional unless a specific audit rule or approver requests one; receipts, where required, are not optional.

## Why itemization exists

A single receipt sometimes represents more than one kind of expense. The clearest example is a hotel folio: one receipt, one total dollar amount, but the total typically bundles room charge, taxes, a movie rental, and a $40 breakfast that should really be coded as a meal expense, not lodging. **Itemization** is the process of splitting that one receipt total into multiple expense items, each coded to its correct expense type, so that policy limits and GL accounts apply correctly to each piece.

Oracle Fusion Expenses can require itemization automatically for certain categories (Accommodations is the most common) once the total crosses a threshold, rather than relying on the employee to remember to split it.

## Worked example: a hotel folio

Priya Nandakumar stays three nights at a hotel during the Chicago conference. Her folio totals $963.47:

```
Hotel Folio Total: $963.47
  Room charge (3 nights @ $275)      $825.00
  Hotel tax                           $99.00
  In-room breakfast (1 morning)       $18.47
  Pay-per-view movie                  $21.00  <- flagged non-reimbursable
```

Itemized in Expenses, this becomes four expense items instead of one:

1. **Hotel** — $924.00 (room + tax, within the $275/night policy limit)
2. **Business Meal — Employee Only** — $18.47 (now evaluated against the meals policy, not lodging)
3. **Entertainment — Personal** — $21.00, flagged non-reimbursable and excluded from her reimbursement total

Without itemization, the full $963.47 would have posted as "Hotel," hiding a non-reimbursable charge inside a lodging expense and making the meals category understate how much Priya actually spent on food that trip.

## Recap

Receipts are required proof above set thresholds, with a formal missing-receipt declaration as a fallback and payment hold rules as a backstop against repeated abuse. Attachments are optional supporting documents. Itemization splits a bundled receipt, like a hotel folio, into correctly coded pieces so policy and accounting both work as intended. Next up, lesson 7: mileage and per diem, two expense types that are calculated rather than entered as a flat receipt amount.
