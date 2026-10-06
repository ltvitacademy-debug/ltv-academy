# Record Types

**Chapter 3 · Relationships and Schema · Lesson 19 of 23**

Every lesson so far has treated an object's fields as fixed — one Account has one set of picklist
values, one page layout. Record Types break that assumption: the same object can present itself
differently depending on which kind of record it is.

## What you'll learn

- What a Record Type actually controls, and what it doesn't
- How picklist values narrow down per Record Type
- How a Record Type ties to a page layout, and why that's a separate step

## One object, multiple "kinds" of record

A **Record Type** lets a single object support more than one business process or more than one
flavor of record, each with its own available picklist values and its own assigned page layout — all
without creating a second object. Account is the textbook example: a "Customer" Account and a
"Partner" Account are still both Accounts, same fields, same object — but a Partner Account might
offer a completely different set of Type values and a page layout built around partner-specific
fields.

## Record Types narrow picklist values

The most visible effect of a Record Type is on picklists. The same Account Type field can expose a
different *subset* of its full value list depending on which Record Type the record was created
under — a Partner-flavored Account might only ever need "Channel Partner / Reseller," "Installation
Partner," "Technology Partner," or "Other."

![A Record Type's picklist values screen for Account Type, with Channel Partner / Reseller, Installation Partner, Technology Partner, and Other selected as the values available to this Record Type.](/courses/salesforce-data-model-fundamentals/ch03/19-record-types/record-type-picklist-accounttype.png)

A different Record Type on the same object can narrow a different picklist just as independently —
here, Industry has several values removed from what's available to this particular Record Type,
leaving a shorter, more relevant list for whoever's creating that kind of record.

![The same kind of picklist values screen, this time for Industry, with Consulting and Education highlighted for removal from this Record Type's available values.](/courses/salesforce-data-model-fundamentals/ch03/19-record-types/record-type-picklist-industry.png)

Nothing here deletes a picklist value globally — the full master list still exists at the field
level. A Record Type only controls which of those master values are *offered* to someone creating a
record under it.

## Record Types tie to page layouts, not the other way around

Picklist values are only half the picture. Creating or editing a Record Type also walks through
assigning it a **page layout** — which fields, sections, and related lists that Record Type's users
actually see on the record detail screen.

![Step 2 of the Record Type wizard, assigning a page layout to a profile for the "How To" Record Type.](/courses/salesforce-data-model-fundamentals/ch03/19-record-types/record-type-page-layout-step.png)

That assignment can even vary by profile — one profile might see a simpler layout for a given Record
Type while another sees a fuller one, all for the exact same underlying record. This is also the
mechanism Lightning Record Pages and Page Layouts build on together: Record Type decides *which*
layout a profile sees, and the layout itself decides what's on it.

## Key terms

| Term | Meaning |
|---|---|
| Record Type | A named subset of an object's picklist values and page layout assignment, letting one object support multiple kinds of record |
| Available picklist values | The subset of a field's full master picklist that a given Record Type actually offers |
| Page layout assignment | The per-profile mapping of which page layout a Record Type's users see |

## Check yourself

Two Account records both use the same Account object and the same Type field. One shows only
partner-related Type values, the other shows the full customer list. What single piece of
configuration explains the difference?
