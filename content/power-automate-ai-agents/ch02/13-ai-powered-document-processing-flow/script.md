# Script — Building an AI-Powered Document Processing Flow

## Segment 1 (title)

This lesson puts the whole chapter together into one real flow. Castlebridge Logistics' accounts team gets shipment invoices by email all day, and today someone retypes the same handful of facts into a spreadsheet by hand. We're automating that end to end, using exactly the AI Builder pieces from the last six lessons.

## Segment 2 (steps)

Different carriers, different formats, but the same facts needed every time: a shipment ID, an invoice total, a due date, and a line-item table. Right now that's all retyped by hand into Castlebridge's accounting spreadsheet.

## Segment 3 (steps)

The flow has six stages. A trigger and Process documents extract the fields. A confidence-score condition and a JSON-output prompt decide whether to trust the extraction and whether the math actually checks out. And a human-review step, followed by adding the final row, closes it out.

## Segment 4 (screenshot)

This is the Items table Process documents extracts in stage two — Quantity, Description, Total. Stage four's prompt checks whether these rows actually sum to the InvoiceTotal field extracted alongside them, catching an OCR misread a human might not notice at a glance.

## Segment 5 (steps)

Two separate failure modes get their own branch. A low confidence score means the model itself isn't sure, so that invoice goes to manual entry instead. A totals mismatch means the model was confident but something's inconsistent, so that one goes to human review with a reason attached. Test this flow with deliberately messy invoices, not just one clean sample.

## Segment 6 (screenshot)

Whatever makes it through, automatically or after a reviewer approves it, lands here — adding a row to Castlebridge's accounting table, looking exactly like any other Add a row action you've already built.

## Segment 7 (outro)

That's chapter two. Every piece of this flow already existed somewhere in the last six lessons — the real lesson is that AI Builder actions compose with ordinary flow logic, and the most reliable AI flows assume the AI step might be wrong. Chapter three picks this up with Copilot Studio, giving this kind of automation an agent of its own.
