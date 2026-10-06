# Script — Receipts, Attachments and Itemization

## Segment 1 (title)

An expense amount by itself is just a number. A receipt is the proof behind it, and itemization is how one receipt covering several kinds of spending gets split into the right pieces. This lesson covers both.

## Segment 2 (steps)

Castellan requires an itemized receipt for any item over twenty-five dollars, for all hotel expenses regardless of amount, and for types flagged always-requires-receipt, like airfare. An employee without a receipt isn't automatically blocked - they can sign a missing receipt declaration instead. But repeated declarations are a pattern audit rules should catch, and a payment hold rule can freeze future reports company-wide once someone has too many active.

## Segment 3 (steps)

A receipt is required proof backing a specific dollar amount. An attachment is any other supporting document - a conference agenda, an approval email, a photo explaining an unusual charge. Attachments are optional unless an audit rule or approver asks for one. Receipts, where required, are not optional.

## Segment 4 (steps)

Itemization exists because one receipt sometimes covers more than one kind of expense. The classic case is a hotel folio: one total that bundles room charge, tax, a movie rental, and breakfast that should really be coded as a meal. Oracle can force itemization automatically for categories like Accommodations once the total crosses a threshold.

## Segment 5 (code)

Here's Priya's folio from the Chicago trip: nine sixty-three forty-seven total. Room and tax: nine twenty-four. In-room breakfast: eighteen forty-seven. A pay-per-view movie: twenty-one dollars, flagged non-reimbursable. Itemized, that becomes three separate expense items instead of one lump hotel charge.

## Segment 6 (outro)

Without itemization, the full amount would post as Hotel, hiding a non-reimbursable movie charge inside lodging and understating what she actually spent on meals. Up next, lesson seven: mileage and per diem, two expense types that get calculated rather than typed in as a flat receipt amount.
