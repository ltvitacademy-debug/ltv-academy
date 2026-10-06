# Script — Roll-Up Summary Fields

## Segment 1 (title)

A Formula field calculates from fields on its own record. A Roll-Up Summary field is different — it calculates from a whole set of child records at once, totaling, counting, or finding an extreme across everything related to it.

## Segment 2 (screenshot: sum of opportunities)

Roll-up summary fields are built on master-detail relationships — defined on the master object, summarizing records from the detail side. Four aggregate types: COUNT, SUM, MIN, and MAX, each with optional filter criteria.

## Segment 3 (screenshot: product total)

Here's SUM in action: an Opportunity's Total List Price, summed from its related Product line items. Change a line item's price, and this field updates itself — nobody has to remember to recalculate it.

## Segment 4 (screenshot: min price)

And here's the same two Product records, same Opportunity, but a different aggregate type: MIN instead of SUM, answering a completely different question — the cheapest line item instead of the total.

## Segment 5 (outro)

Same child data, different summary type, different answer. Next up: field properties — Required, Unique, and External ID — the checkboxes that shape how a field's data actually behaves.
