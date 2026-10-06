# Script — AutoInvoice Overview

## Segment 1 (title)

Way back in lesson one, we mentioned transactions can arrive manually or through AutoInvoice. Now that you've seen what a complete, well-formed transaction looks like, let's cover how AutoInvoice builds one automatically from raw imported data.

## Segment 2 (steps)

Manual entry doesn't scale. A company shipping thousands of orders a day can't key each one in by hand. AutoInvoice takes data staged in interface tables, populated by order management, project billing, or an outside feed, and turns it into real, validated transactions using an Imported source.

## Segment 3 (steps)

Three phases, every batch. Validation, checking line-level data, valid transaction type, a usable bill-to site, reasonable amounts. Grouping, combining validated lines into transaction headers per a configured grouping rule, and checking header-level consistency. Transfer, creating the real, fully accounted transactions in Receivables, same as if someone had typed them in by hand.

## Segment 4 (outro)

Picture Northwind Fixtures Co's order system staging four hundred lines overnight. The run validates all of them, three hundred ninety-seven pass, group into transactions, and transfer in fully accounted. The remaining three reference a site that got end-dated the day before, so they land in an errors table instead of becoming bad transactions. The next morning, an analyst fixes the site reference and resubmits just those three. Up next, lesson twenty-two: completing and printing transactions, closing out chapter four.
