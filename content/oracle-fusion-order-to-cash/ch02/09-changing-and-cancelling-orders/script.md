# Script — Changing and Cancelling Orders

## Segment 1 (title)

SO-48217's credit hold is released and it's moving forward, but moving forward doesn't mean frozen. Customers change their minds, warehouses find shortages, orders occasionally get cancelled. Let's see what can still change, and what can't.

## Segment 2 (steps)

What's changeable depends on status. Before fulfillment starts, quantity, date, even ship-to can change cleanly - nothing downstream has acted yet. Once a line's been picked or packed, a change still works but costs time. After shipping, the goods are gone - you can't just reduce a shipped quantity, you need a return. After invoicing, the Receivables transaction exists on its own, and fixing it means action in Receivables, usually a credit memo.

## Segment 3 (steps)

There's a difference between a change and a cancellation. A change modifies a line that stays open - different quantity, date, address. A cancellation closes a line before it ever completes. Cancelling an unshipped line is simple. Cancelling a shipped line isn't really possible in the normal sense - the only path left is a return.

## Segment 4 (code)

Here's how that plays out for our order. Say Harborview calls back before picking starts and asks to cut the quantity from four hundred to three hundred fifty units. The order admin just updates the line. Three hundred fifty still clears the volume threshold, so the five percent discount still applies, just against a smaller total.

## Segment 5 (outro)

If that call had come after the shipment already left Savannah, the fix would be a return instead of a simple edit. Chapter two is complete: the order is created, priced, credit-checked, and released. Up next, chapter three, lesson ten: fulfillment and shipping, where the order actually leaves the warehouse.
