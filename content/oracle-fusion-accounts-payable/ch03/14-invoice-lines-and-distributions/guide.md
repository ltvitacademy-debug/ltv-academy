# Invoice Lines and Distributions

Last lesson's header said who the invoice is from and how much it totals. It said nothing about *what* was actually purchased or *which GL account* should absorb the cost. That's the job of invoice **lines** and the **distributions** generated from them — the layer that turns a dollar amount into real accounting.

## What you'll learn

- The three invoice line types, and what each is for
- How freight and miscellaneous charges can be allocated across item lines instead of coded separately
- What a distribution is, and why one line can produce more than one of them
- Why the sum of distributions must always tie back to the invoice amount

## Invoice line types

An invoice can carry one or more lines, each with a type:

- **Item** — the actual goods or services being billed: the core content of the invoice.
- **Freight** — shipping or delivery charges on the invoice.
- **Miscellaneous** — other charges that aren't the item itself or freight, like an installation fee or a service charge.

(Tax and withholding tax lines also exist, generated automatically or entered manually — Chapter 3's tax lesson and later tax-specific lessons go deeper there.)

## Allocating freight and miscellaneous charges

Rather than making someone manually figure out which GL account absorbs a shipping charge, Payables lets freight and miscellaneous lines be **allocated** to the item lines they relate to. Selecting "Allocate All Lines" spreads a freight or miscellaneous charge proportionally across the existing item lines, and new distributions get created automatically using the same account combinations those item lines already use. This means a single shipping charge on an invoice with five different items doesn't require manually deciding how to split it across five expense accounts — the allocation does that based on the item lines' own coding.

## What a distribution actually is

A **distribution** is the line's break-down into actual accounting: the GL account(s) the amount should post to, and how much of the line's amount goes to each. A single invoice line often produces exactly one distribution, but it can produce several — for example, if one item line needs to be split 60/40 between two different departments' expense accounts. Distribution types mirror line types (Item, Freight, Miscellaneous), so a report or screen showing "distribution type: Freight" is really just saying "this piece of accounting came from a Freight line."

## Why the totals have to tie out

The sum of all of an invoice's distributions must equal the invoice's total line amount, which must in turn match the invoice header amount. This isn't a style preference — it's enforced during validation (Chapter 4), and a mismatch between the header amount and the sum of distributions is one of the specific holds validation can raise. If a line gets split into distributions that don't add back up to the line's own amount, the invoice won't validate until it's corrected.

## A worked example

Brightfield's invoice INV-4471 from Vantree Industrial Parts, $4,000.00 total, has one Item line for $3,800.00 (replacement parts, coded to a maintenance expense account) and one Freight line for $200.00. Using "Allocate All Lines," that $200.00 freight charge is automatically allocated to the same maintenance expense account the item line already uses, producing two distributions that sum to the full $4,000.00.

## Recap

Invoice lines come in three main types — Item, Freight, and Miscellaneous — and freight/miscellaneous charges can be allocated across item lines rather than coded by hand. Each line's distributions are its actual GL accounting, and the sum of all distributions must tie back to the invoice total. Next up, lesson 15: distribution sets, which automate this coding for invoices that look the same every time.
