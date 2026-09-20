# Custom Fields, From an Analyst's Perspective

This chapter has built up the full picture: standard vs. custom objects (Lesson 16), field
types (Lesson 17), Record Types (Lesson 18), and Page Layouts (Lesson 19). This lesson closes
the chapter by pulling that together into practical guidance specifically about **custom
fields** — the single most common source of confusion an analyst hits when moving between
Salesforce orgs.

## What you'll learn

- How to recognize a custom field on sight, in a report, a list view, or SOQL
- Why custom fields vary org to org, and why that means you can never assume one
- A practical checklist for working with an unfamiliar custom field

## Recognizing a custom field

Just like custom objects (Lesson 16), every **custom field** carries the same marker: a
**`__c`** suffix on its API name. A field labeled "Renewal Risk Score" in the Salesforce UI
might have an API name like `Renewal_Risk_Score__c`. That suffix shows up everywhere the
field's real name appears — in the Salesforce Object Reference for that org, in list-view
column settings, and critically, in any SOQL query or report export that shows API names
rather than labels. The moment you see `__c`, you know two things for certain: this field
was built specifically for this org, and its meaning is defined entirely by whatever that
org's admin intended when they created it.

## Why custom fields vary — and why you can't assume one

A standard field like Opportunity Amount means essentially the same thing in every org that
uses it. A custom field has no such guarantee. `Renewal_Risk_Score__c` might be a manually
entered picklist in one org and an automatically calculated formula field in another;
`Customer_Tier__c` might have values like "Gold/Silver/Bronze" in one org and completely
different values in the next. This isn't a flaw in Salesforce — it's the entire point of
custom fields, which exist precisely so each org can model what's unique about its own
business. For an analyst, the practical consequence is simple: never carry an assumption
about a custom field's meaning, values, or even its existence from one org into another,
the way you reasonably could with a standard field like Amount or Close Date.

## A practical checklist

When an analyst encounters an unfamiliar custom field in a report request or a data
export, four questions resolve most of the confusion:

- **What's its field type?** (Lesson 17) — a Picklist behaves very differently from a
  Formula field when you try to filter or group on it.
- **Does its object have Record Types?** (Lesson 18) — the field's relevance, or its valid
  values, may differ by Record Type.
- **Is it on the Page Layout you're comparing against?** (Lesson 19) — if a business user
  doesn't recognize it, that doesn't mean it's wrong.
- **Who defined it, and why?** — for a custom field, there's no universal documentation to
  fall back on; the org's own admin or a report on that object's field history is the
  actual source of truth.

## Key terms

| Term | Meaning |
|---|---|
| Custom field | A field built for a specific org, marked with a `__c` API-name suffix |
| API name | A field's underlying technical name, as used in SOQL and reports — distinct from its display label |
| Field history | An audit trail an org can keep of who created/changed a field or its values |

## Check yourself

You're handed a report request that references `Renewal_Risk_Score__c`, a field you've
never seen before. Walk through the four-question checklist from this lesson — what do you
need to find out before you can build that report correctly?
