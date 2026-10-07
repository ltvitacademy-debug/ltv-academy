# Document Extraction with AI Builder

Castlebridge Logistics gets a delivery confirmation attached to nearly every shipment: a PDF with a shipment ID, a delivery date, a recipient signature line, and a table of line items. Right now someone opens each one and retypes the important fields into a spreadsheet. AI Builder's **document processing** model exists to do exactly that retyping — reading a PDF or image and handing back the specific fields, tables, and checkboxes you tell it matter, as clean text your flow can use immediately.

## What you'll learn

- What a document processing model is, and the three document types it supports
- How to define the fields, tables, and checkboxes you want extracted
- How the trained model becomes an action inside a Power Automate flow
- What each extracted value looks like coming out of the model — value and confidence score

## The three document types

When you create a custom document processing model, the very first choice is what kind of document you're teaching it to read:

- **Fixed template documents** — for a given layout, fields always land in the same place. Ideal for a form that doesn't change shape, like Castlebridge's standard delivery-confirmation template. Trains quickly.
- **General documents** — for anything without a consistent layout, or where the layout is complex. More powerful, but takes longer to train.
- **Invoices** — builds on top of AI Builder's prebuilt invoice model, letting you add extra fields beyond the defaults it already extracts.

![The AI Builder wizard step where you choose a document type: Fixed template documents, General documents, or Invoices.](/courses/power-automate-ai-agents/ch02/08-document-extraction-with-ai-builder/choose-document-type.png)
*Castlebridge's delivery confirmation uses one consistent layout, so Fixed template documents is the right choice — and the fastest to train.*

## Defining what to extract

Once the document type is chosen, you tell the model what you actually want out of it. On the **Choose information to extract** screen, you add:

- **Text fields** — a shipment ID, a driver name, a destination address
- **Number fields** — a weight, a quantity, with the decimal separator you specify
- **Date fields** — a delivery date, with the date format you specify
- **Checkboxes** — "Signature on file," "Damage noted"
- **Tables** — a line-items table, with named columns like Quantity, Description, and Total

For Castlebridge, a sensible first model tags **ShipmentID** (text), **DeliveryDate** (date), **DamageNoted** (checkbox), and an **Items** table with **Quantity**, **Description**, and **Total** columns. You then upload at least five sample delivery confirmations, tag each field on them, and select **Train**.

## Using the trained model in a flow

Once your model is trained and published, it shows up as an action in the flow designer: **Process documents** (this action was previously named **Extract information from documents** before May 2025 — if you see older tutorials or flows using that name, it's the same action). Add it after a trigger that provides a file — for Castlebridge, a flow triggered by a new email attachment or a new file in a SharePoint library works well. Select your model, select the document type, and map the **Form** input to the file content coming from your trigger.

![The 'Process documents' action with File Content from the trigger wired into its Form input field.](/courses/power-automate-ai-agents/ch02/08-document-extraction-with-ai-builder/file-content-in-form-field.png)
*File Content is dynamic content from whatever earlier step produced the PDF — an email attachment, in Castlebridge's case.*

## Reading the output

Every field you tagged becomes two separate pieces of dynamic content in later steps: **`<field> value`** (the extracted text, number, or date) and **`<field> confidence score`** (a number from 0 to 1 — how sure the model is). A `ShipmentID value` of `CBL-88291` with a `confidence score` of `0.97` is safe to trust automatically; a low score is a signal to route that document to a human instead of acting on it blind. Table columns work the same way, but nested one level deeper — `Items Quantity value`, `Items Total value` — and Power Automate automatically wraps the action that uses them in an **Apply to each**, since a table can have any number of rows.

## Key terms

- **Document processing model** — the AI Builder model category that extracts fields, tables, and checkboxes from documents
- **Fixed template / General / Invoices** — the three document types a custom document processing model can be built for
- **Process documents** — the flow action that runs a document processing model against a file (named Extract information from documents before May 2025)
- **Confidence score** — a 0–1 value expressing how sure the model is about an extracted value
