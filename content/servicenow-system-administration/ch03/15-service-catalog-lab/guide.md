# Lesson 15 — Service Catalog Lab

**Chapter 3 · Service Catalog Administration · Lesson 15 of 36**

## What you'll learn

- How to work through a full, realistic catalog build from a one-paragraph business request
- How to decide between a standard catalog item and a Record Producer, and defend that decision
- How to design a category placement, a set of variables, a shared Variable Set, and a Catalog UI Policy together
- How the four preceding lessons' concepts combine into one coherent administrator decision

## The scenario

IT Operations comes to you with this request: "Employees keep emailing us asking for new laptops, and we have no record of who requested what or why. Build us a 'New Laptop Request' catalog item. We need to know the laptop model, and if someone picks one of our premium models, we need a written business justification before it goes anywhere — otherwise approvals get rubber-stamped without a real reason. We also want this to show up somewhere sensible, not buried in a flat list with forty other things."

This is a realistic, slightly under-specified request — exactly what a working administrator receives. Walking through it means making the same decisions covered in Lessons 11 through 14, in order.

## Step 1 — Standard catalog item, or Record Producer?

Start with the decision from Lesson 14. A new laptop request needs to be tracked, approved (someone has to sign off on hardware spend), and assigned to a fulfillment task for IT Operations to actually order and image the machine. That's the standard Request/Requested Item lifecycle doing real work — approvals, SLAs, task assignment to a fulfillment group. There's no "different target table" this request needs to become; it needs to *be* a trackable, approvable request. **Decision: build this as a standard catalog item (`sc_cat_item`), not a Record Producer.** A Record Producer would have thrown away the approval chain and fulfillment-task tracking this request actually depends on.

## Step 2 — Category placement

Per Lesson 11, this item belongs inside a sensible category, not dropped at the top level of the catalog. If an "IT Equipment" category already exists (parent category in `sc_category`, used for things like monitors and docking stations), the laptop item belongs there — set the item's Category field to "IT Equipment." If no such category exists yet, this lab is the moment to create it before assigning the item, rather than leaving it uncategorized "for now" and letting it rot in a flat list.

## Step 3 — Designing the variables

Per Lesson 12, the item needs two variables specific to this request, plus whatever's already standardized in a shared set:

- **Laptop Model** — a **Choice** variable, not free text, listing the real approved models (so fulfillment never gets an unmappable answer like "the fast one").
- **Business Justification** — a **Multi Line Text** variable, since a one-line text box isn't enough room for a real justification.

Beyond those two, this item also needs the requester's manager and cost center — fields that aren't unique to laptops at all; Lesson 12's own Requester Info example is exactly this situation. Rather than redefining "Requester's Manager" and "Cost Center" from scratch, attach the organization's existing **"Requester Info" Variable Set** to this item. That's the whole point of a shared set: this item inherits those fields and any future fix to them, instead of becoming a third place to maintain a copy.

## Step 4 — The Catalog UI Policy

IT Operations' real requirement — "if someone picks a premium model, we need a justification, otherwise approvals get rubber-stamped" — is precisely the conditional pattern from Lesson 13. Build a Catalog UI Policy:

- **Condition:** "Laptop Model" is one of the designated premium options
- **Action:** make "Business Justification" Visible = true and Mandatory = true

For every other model, "Business Justification" can stay visible but optional (or hidden, if IT Operations prefers a shorter form for standard requests) — the point is that it becomes *impossible to submit* a premium-model request with no justification, which is the actual business problem IT Operations described, solved with configuration rather than a reminder email nobody reads.

## Step 5 — Reviewing the full build

Putting all four steps together: a standard catalog item named "New Laptop Request," filed under the "IT Equipment" category, carrying a Choice variable for the model, a Multi Line Text variable for justification, the shared "Requester Info" Variable Set for manager and cost center, and a Catalog UI Policy that makes the justification mandatory exactly when it matters. Every piece traces back to a real decision this chapter taught — none of it required a single line of server-side script.

## Key terms

| Term | Meaning |
|---|---|
| Standard catalog item vs. Record Producer | The Lesson 14 decision: does this need the request-fulfillment lifecycle, or a record on a different table? |
| Category placement | Filing a new item under an existing, sensible category rather than leaving it uncategorized |
| Choice variable | Used for "Laptop Model" so fulfillment only ever receives a real, mappable answer |
| Shared Variable Set | Reused fields (manager, cost center) attached rather than redefined per item |
| Catalog UI Policy | The conditional rule making "Business Justification" mandatory only for premium models |

## Check yourself

IT Operations later asks you to add a second premium model to the list and wants "Business Justification" to also become mandatory for a brand-new "Loaner Laptop" catalog item being built next quarter. What do you need to change on the Catalog UI Policy's condition for the first request, and why does the shared "Requester Info" Variable Set mean the second item's manager/cost-center fields need zero additional configuration?
