# Building an AI-Powered Document Processing Flow

This lesson puts the whole chapter together into one real flow. Castlebridge Logistics' accounts team receives shipment-delivery invoices by email all day — different carriers, different formats, always the same handful of facts the team needs: a shipment ID, an invoice total, a due date, and a line-item table. Today, someone opens every attachment and retypes those facts into Castlebridge's accounting spreadsheet by hand. We're going to automate that end to end, using exactly the AI Builder pieces from Lessons 7 through 12 — no new concepts, just all of them wired together.

## What you'll learn

- How to lay out a multi-stage AI flow: trigger, extract, branch on confidence, structure, review, record
- How document processing (Lesson 8) and a JSON-output prompt (Lesson 11) can work together in one flow
- Where a confidence-score Condition and a human-review Approval both belong in the same flow
- How to think about the finished flow as a whole, end to end

## The flow, stage by stage

**Stage 1 — Trigger.** The flow starts with **When a new email arrives (V3)** on the shared accounts inbox, filtered to emails with attachments. This is Chapter 1 material — nothing new here, just the familiar shape of "something happened, now react to it."

**Stage 2 — Extract with document processing.** The attachment feeds into the **Process documents** action from Lesson 8, running a custom document processing model trained on Castlebridge's invoice layout, tagged for **ShipmentID**, **InvoiceTotal**, **DueDate**, and an **Items** table.

**Stage 3 — Branch on confidence.** Immediately after extraction, a **Condition** checks the `ShipmentID confidence score` output. If it's below a threshold like 0.6, the flow can't trust what it extracted, so route that invoice to a shared Teams channel for manual entry instead of continuing. If it's above the threshold, continue.

**Stage 4 — Structure with a JSON-output prompt.** The extracted fields and table rows get passed into a **Run a prompt** action calling a prompt built with Lesson 11's JSON output mode — instructed to double-check the extracted total against the line items (catching, for example, an OCR misread where line items don't sum to the stated total) and return `{"shipmentId", "invoiceTotal", "dueDate", "totalsMatch", "flagReason"}`. This is the extraction from Lesson 8 and the structured reasoning from Lesson 11, each doing the part it's actually good at: document processing finds the data, the prompt reasons about whether the data makes sense.

**Stage 5 — Human review on a mismatch.** A **Condition** on `totalsMatch` routes anything flagged `false` into a **Start and wait for an approval of text** action (Lesson 12), with `flagReason` as the suggested text an accounts reviewer can read, correct, and approve or reject.

**Stage 6 — Record the result.** Whatever made it through — automatically, or after human approval — gets added as a new row in Castlebridge's accounting Excel Online table with **Add a row into a table**, using the final confirmed values.

![A table row being added from the fields an AI Builder document processing model extracted.](/courses/power-automate-ai-agents/ch02/13-ai-powered-document-processing-flow/add-row-into-table.png)
*The last stage looks exactly like any other Add a row action from earlier in the course — everything AI did happened upstream of this step.*

## Why the branches matter as much as the extraction

It's tempting to think the "AI part" of this flow is just the **Process documents** action, and everything else is plumbing. In practice, the two **Condition** branches are doing just as much work: one catches extraction the model wasn't confident about, the other catches extraction that was confident but factually inconsistent (a total that doesn't match its own line items). Neither failure mode shows up if you only test the flow against one clean sample invoice — which is exactly why Castlebridge should test this flow against a deliberately messy batch: a blurry scan, an invoice from a new carrier template, one with a line-item total that's off by a cent.

![A real table extracted by a document processing model, with Quantity, Description, and Total columns.](/courses/power-automate-ai-agents/ch02/13-ai-powered-document-processing-flow/extracted-table-example.png)
*This is the Items table Stage 4's prompt reasons over — checking that these rows actually sum to the InvoiceTotal field extracted alongside them.*

## Putting it together

Every piece of this flow is something you already built in isolation somewhere in this chapter: a trigger and a Condition from Chapter 1's muscle memory, **Process documents** from Lesson 8, a JSON-output **Run a prompt** from Lesson 11, and **Start and wait for an approval of text** from Lesson 12. The lesson here isn't any single action — it's that AI Builder actions compose with ordinary flow logic exactly like any other action does, and that the most reliable AI-powered flows are the ones that assume the AI step might be wrong and build a branch for that, not the ones that trust every output blindly.

## Key terms

- **Confidence-score branch** — a Condition checking a document processing model's confidence score before trusting its extracted value
- **Cross-check prompt** — a JSON-output prompt used to validate extracted data against itself (e.g., line items vs. a stated total)
- **Human-in-the-loop stage** — an Approval action placed wherever an AI step's output needs a person's confirmation before it's recorded
- **End-to-end AI flow** — a flow where AI Builder actions and ordinary flow logic (triggers, conditions, approvals) are combined, not used in isolation
