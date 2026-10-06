# Script — Creating Standard Invoices

## Segment 1 (title)

With invoice types established, let's get hands-on with the one you'll create constantly: the standard, non-PO invoice. This lesson is about the header - the fields that identify what the invoice is and who it's from. Lines and distributions come next lesson.

## Segment 2 (steps)

At minimum, a standard invoice header needs a business unit, a supplier and supplier site, the invoice number, the invoice date, and the invoice amount and currency. That business unit determines the ledger and setup behind it; the site brings its own address, terms, and tax setup along with it.

## Segment 3 (steps)

Once you pick a site, payment terms and default addresses fill in automatically from that site's configuration. These are defaults, not locks - if a particular invoice came with a special one-time arrangement, you simply override the field on that invoice, and the override applies only there.

## Segment 4 (code)

The invoice number field matters more than it looks, because it's not a Brightfield sequence number - it's whatever number the supplier printed on their own bill. Payables checks for duplicate invoice numbers per supplier, so entering the real number accurately is what makes that fraud and double-payment control actually work.

## Segment 5 (outro)

Saving the header doesn't mean the invoice is done - it still has to pass validation before moving toward approval and payment, which Chapter 4 covers. Up next, lesson fourteen: invoice lines and distributions, where the invoice says what it's actually for.
