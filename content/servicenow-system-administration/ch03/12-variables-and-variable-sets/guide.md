# Lesson 12 — Variables & Variable Sets

**Chapter 3 · Service Catalog Administration · Lesson 12 of 36**

## What you'll learn

- What a catalog variable actually is, and where the question and its answer each live
- The real variable types you'll choose among: Single Line Text, Multi Line Text, Choice, Reference, Checkbox, Yes/No, Multiple Choice, Lookup Select Box
- Why Reference variables are more powerful than a plain text box
- What a Variable Set is, and why reusing one beats redefining the same fields on every item
- How to decide when a field belongs on the item directly versus inside a shared set

## Variables: the actual input fields on a request form

Every field a requester fills in on a catalog item's order form — "Which laptop model?", "Business justification," "Preferred start date" — is a **variable**. The question itself (its label, type, help text, and the conditions that control it) is defined on `item_option_new`. When a real requester actually submits the form, their specific answer is captured as a separate record on `sc_item_option`, linked back to the Requested Item it belongs to. This separation matters: `item_option_new` is the *definition* you build once as the administrator, and `sc_item_option` is the *data* created fresh every time someone submits — the same way a form template is different from a filled-out copy of that form.

## The real variable types

ServiceNow ships a fixed set of variable types, each suited to a different kind of answer:

- **Single Line Text** — short free text: a cost center code, a room number.
- **Multi Line Text** — longer free text: a business justification, a description of the problem.
- **Choice** — a dropdown of admin-defined options: a laptop model, a software tier.
- **Reference** — points to a record on another table (a user, a cost center, a location) rather than free text, so the requester searches and selects a real record instead of typing a name that might not match anything.
- **Checkbox** — a true/false toggle: "Needs admin rights?"
- **Yes/No** — a two-option choice rendered as radio buttons rather than a checkbox, useful when the wording reads better as a question.
- **Multiple Choice** — lets the requester select more than one option from a list, unlike Choice which allows exactly one.
- **Lookup Select Box** — a dropdown whose options and, critically, whose other variable values can be auto-populated from a lookup against another table when a selection is made.

Picking the right type isn't cosmetic. A Reference variable pointed at `sys_user` guarantees the "requested for" answer is an actual valid user record your workflows and approvals can act on; a Single Line Text variable for the same purpose would let someone type a typo'd name that no approval or fulfillment step could ever resolve.

## Variable Sets: stop rebuilding the same fields

Picture ten different catalog items — a new laptop, a software install, a conference room booking — that all need to ask "Who is this request really for?" and "What cost center should this be billed to?" Defining those two variables separately on all ten items means ten separate places to fix a typo, add a new cost center choice, or change the help text. A **Variable Set** (`io_set_item`) groups a set of variables together once — commonly something like "Requester Info" — and that one set is then attached to as many catalog items as need it. Change a variable inside the set, and every item using that set picks up the change immediately.

Variable Sets come in two flavors worth knowing: a **one-to-one** set behaves as described above, reused across many items with shared values. A **multi-row** variable set lets the requester add multiple rows of the same group of variables on a single form — useful for something like "add one row per additional attendee" on an event-registration catalog item.

## Deciding where a variable belongs

Not every variable needs to live in a set. A variable that's genuinely unique to one catalog item — "Which specific conference room?" on a room-booking item — belongs directly on that item. A variable that's logically identical across many items — "Requester's manager," "Cost center," "Business justification" — belongs in a shared Variable Set. The test that holds up in practice: if you ever find yourself copying a variable's configuration from one item to another by hand, that variable should have been in a set from the start.

## Key terms

| Term | Meaning |
|---|---|
| `item_option_new` | The table defining a variable — its label, type, and conditions |
| `sc_item_option` | The table capturing one requester's actual answer to a variable |
| Reference variable | A variable type pointing to a real record on another table instead of free text |
| Variable Set | A reusable group of variables (`io_set_item`) attachable to many catalog items at once |
| Multi-row variable set | A variable set letting the requester add repeated rows of the same fields |

## Check yourself

Three catalog items — "New Laptop Request," "Software Install," and "Conference Room Booking" — all need a "Requester's Cost Center" variable. Which variable type should that variable use, and should it be defined on each item separately or inside a shared Variable Set? Explain both choices.
