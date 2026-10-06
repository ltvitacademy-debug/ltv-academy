# Script — Billing the Customer: The Invoice

## Segment 1 (title)

SO-48217 has shipped and been confirmed. LTV Manufacturing has given up inventory but hasn't been paid for it yet. The document that fixes that is a Receivables invoice. Let's look at what that invoice actually is here.

## Segment 2 (steps)

You already know, from Accounts Receivable, what a transaction is: a formal record a customer owes money, with a type, a bill-to, lines, terms, and a due date. We're not re-teaching that. What's new is where the data comes from - instead of a clerk typing lines by hand, it's generated from data that already lived in Order Management and Shipping.

## Segment 3 (code)

Here's how that maps. Bill-to customer and site come from the order header. Quantity invoiced comes from the confirmed shipped quantity. Unit price comes from the order line's negotiated, discounted price. Payment terms come from the order header - net thirty. None of it gets retyped.

## Segment 4 (steps)

One more distinction worth knowing: invoice date versus GL date. The transaction date usually reflects when the invoicing event happened, often tied to ship date. The GL date determines which accounting period the journal entry lands in. They usually match, but a shipment right at month-end is exactly where they can diverge, and where a consultant has to pay attention.

## Segment 5 (outro)

Up next, lesson fifteen: the actual mechanics of how shipment data gets from Order Management into Receivables in the first place.
