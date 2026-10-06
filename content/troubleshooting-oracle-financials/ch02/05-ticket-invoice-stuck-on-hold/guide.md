# Ticket: Invoice Stuck on Hold

**Chapter 2 · Payables Tickets · Lesson 2 of 7**

## What you'll learn

- The difference between an invoice that fails validation and one that validates but lands on a hold
- The hold types you'll see most often, and what each one actually means
- Why "manually release the hold" is a decision, not a reflex
- A resolution note for a price variance hold

## The ticket

> **Ticket #40189 — Cascade Outdoor Supply.** AP supervisor reports: "Invoice INV-55032 from Trailhead Gear Co. validated fine but it's sitting there and won't pay. Something about a hold." Severity: Medium.

## Validated, but held

This is a different symptom from Lesson 4. The invoice successfully passed Validate — it's not Incomplete. Instead, it carries one or more **holds**, and Payables will not let a held invoice be paid until every hold on it is released. Holds are visible on the invoice's **Holds** tab (or the Manage Invoices "Holds" filter), and each one is categorized by a specific hold name that tells you exactly what triggered it. A few you'll see constantly on PO-matched invoices:

| Hold | Meaning |
|---|---|
| **Price** | The invoiced price exceeds the purchase order price beyond the allowed tolerance |
| **Qty Ord** | The quantity billed exceeds the quantity ordered beyond tolerance |
| **Qty Rec** | The quantity billed exceeds the quantity received beyond tolerance |
| **Tax Variance** | The invoice's tax amount doesn't match the amount Oracle calculates from the configured tax rate |
| **Account hold** | A distribution references an invalid or disabled account |

## Investigating

1. **Open the Holds tab** on INV-55032. It shows one hold: **Price**.
2. **Compare invoice to PO.** The purchase order unit price for the item is $42.00. The invoice was entered at $46.50 — an increase of about 10.7%, which exceeds the business unit's price tolerance of 5%.
3. **Find out why the price changed.** Checking with the buyer: Trailhead Gear Co. raised prices mid-quarter, and the PO was never updated to reflect the new contract price before this shipment was invoiced.

## Root cause

The invoice price legitimately increased from what the open purchase order specifies, and that increase exceeds the configured price tolerance, so Payables correctly placed a Price hold rather than let the variance pass silently.

## Resolving it — and why the choice matters

There are three ways to clear a Price hold, and they are **not interchangeable**:

- **Correct the PO** to reflect the new, legitimate price, then resubmit Validation — the hold clears because there's no longer a variance.
- **Correct the invoice** if the invoiced price was actually wrong (e.g., a data entry error) and the PO price was correct.
- **Manually release the hold** — available, but it does not fix the underlying variance. The cost difference between PO and invoice price posts to a variance account instead of the expected charge account, and the price difference is effectively unaddressed in the PO for next time.

Here, the PO price genuinely is stale, so the correct fix is to update the purchase order to $46.50 (with the buyer's confirmation), not to manually override the hold. Manually releasing it would clear this one invoice but leave the PO wrong for every future shipment from this supplier.

## Documenting it

> **Ticket #40189 — Cascade Outdoor Supply.** AP supervisor reported invoice INV-55032 (Trailhead Gear Co.) held and unable to pay.
> **Root cause:** Price hold — invoiced unit price ($46.50) exceeded the PO price ($42.00) by more than the 5% tolerance, because the supplier's contract price increase was never reflected on the open PO.
> **Fix:** Updated the purchase order unit price to $46.50 per buyer confirmation; resubmitted invoice Validation.
> **Verified:** Price hold cleared automatically; invoice now eligible for payment.
> **Note:** Recommend buyer review open POs with this supplier for the same stale pricing issue.

## Key terms

| Term | Meaning |
|---|---|
| Hold | A block placed on an invoice during validation that prevents payment until released |
| Tolerance | The allowed variance (percentage or amount) before a mismatch triggers a hold |
| Manual release | Overriding a hold directly, which clears it for that invoice without resolving the underlying variance |

## Check yourself

What's the difference between correcting the cause of a Price hold versus manually releasing it, and why does that distinction matter for every invoice from that supplier going forward?
