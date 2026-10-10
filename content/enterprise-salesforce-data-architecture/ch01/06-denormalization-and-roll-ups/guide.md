# Lesson 6 — Denormalization and Roll-Ups

**Chapter 1 · Enterprise Data Modeling · Lesson 6 of 26**

## What you'll learn

- What denormalization means in a Salesforce context, and why it's a deliberate tool, not a mistake
- How roll-up summary fields actually work, and the real constraints on them
- What to do when you need a "roll-up" but the relationship is a lookup, not a master-detail
- How to decide between a native roll-up, a denormalized automation field, and a live calculation

## Denormalization is a choice, not a shortcut

In relational database theory, normalization means organizing data to minimize redundancy — each fact lives in exactly one place. Denormalization means deliberately duplicating or pre-calculating data to make it faster or easier to read, at the cost of having the same fact stored in more than one place. In Salesforce, denormalization shows up constantly, and done deliberately, it's one of the most useful tools an architect has: a Total_Open_Opportunity_Value__c field sitting directly on Account, kept in sync automatically, saves every report and every page layout from having to calculate that value live, every time, by querying every Opportunity underneath it.

The architectural skill isn't avoiding denormalization — it's being explicit about where you've done it, and making sure something reliable is responsible for keeping the duplicated value in sync. An unmanaged duplicate — a field nobody's automation updates anymore — is exactly the kind of classification-drift-style problem that quietly makes a data model untrustworthy over time.

## How roll-up summary fields actually work

Salesforce's native answer to "keep a parent field in sync with its children" is the roll-up summary field, and per Salesforce Help, it has a specific, fairly narrow mechanic:

- It can only be created on the master object of a master-detail relationship — either a custom object on the master side, or a standard object on the master side of a master-detail relationship with a custom object (Salesforce Help specifically names Opportunities-with-products, Accounts-with-Opportunities, and Campaigns-with-members as supported standard-object cases).
- The supported calculations are COUNT, SUM, MIN, and MAX. There is no native AVERAGE.
- The field types available depend on the calculation type: SUM supports number, currency, and percent fields; MIN and MAX additionally support date and date/time fields.
- Certain field types can't be used in a roll-up summary's filter criteria at all — long text areas, multi-select picklists, Description fields, system fields like Last Activity, cross-object formula fields, and lookup fields are all excluded.
- Recalculation isn't always instant: Salesforce Help notes that calculating roll-up summary values "can take up to 30 minutes, depending on the number of records affected and other factors," and once a roll-up summary field exists on an object, that object's master-detail relationship can no longer be converted to a lookup.

That last point connects directly back to Lesson 4: adding a roll-up summary field is one of the ways a relationship-type decision becomes effectively permanent.

## When the relationship is a lookup, not master-detail

Roll-up summary fields are a master-detail-only feature — there's no native equivalent for lookup relationships. When a business needs a roll-up-style aggregate but the relationship is (correctly, for other reasons) a lookup, the standard options are:

- **Declarative automation** (Flow) that recalculates and writes a denormalized value to the parent whenever a relevant child record changes.
- **Apex** (a trigger or trigger-handler framework) doing the same thing, typically chosen when the logic is complex or volume is high enough that declarative automation becomes a performance concern.
- **A live calculation at query or report time** — not stored anywhere, computed fresh each time it's needed, which avoids sync problems entirely but can't be used anywhere a stored field is required (list view filters, certain report types, formula fields that reference it).

Each of these is a form of denormalization you're building and maintaining yourself, rather than Salesforce maintaining it natively — which means the "who keeps this in sync, and what happens if that automation ever fails silently" question becomes your responsibility, not the platform's.

## A decision framework

1. **Is the relationship master-detail, or could it be?** If yes, and the aggregate need is COUNT/SUM/MIN/MAX, a native roll-up summary field is almost always the right default — it's maintained by the platform, not by code someone has to remember to keep working.
2. **Is the relationship correctly a lookup for independence reasons covered in Lesson 4?** Then you need custom automation (Flow or Apex) to denormalize the value, and that automation needs the same reliability scrutiny you'd give any other business-critical process.
3. **Is the aggregate needed rarely, or only in one specific report?** A live, uncalculated-and-unstored report-time aggregate may be simpler and avoid sync risk entirely — don't build and maintain a stored denormalized field you don't actually need broadly.

## Key terms

| Term | Meaning |
|---|---|
| Normalization | Organizing data so each fact is stored in exactly one place |
| Denormalization | Deliberately duplicating or pre-calculating data for speed or convenience, at the cost of having to keep copies in sync |
| Roll-up summary field | A native Salesforce field on the master side of a master-detail relationship that aggregates COUNT, SUM, MIN, or MAX from detail records |
| Declarative automation | Using point-and-click tools like Flow, rather than code, to keep a denormalized value in sync |

## Lab

A distributor's Account object has a related custom object, Purchase_Order__c, connected by a lookup relationship (deliberately chosen because purchase orders need independent ownership and queue-based routing, per Lesson 4's framework). The sales team wants a field on Account showing the total dollar value of all open purchase orders. Using this lesson's decision framework, explain why a native roll-up summary field is not available here, what your two realistic options are, and which one you'd recommend if the company has roughly 50,000 Accounts and purchase order volume that changes dozens of times per minute across the org.

## Check yourself

Can you name the four supported roll-up summary calculation types, and explain why there's no fifth, AVERAGE option? Can you explain why adding a roll-up summary field to a master-detail relationship makes a later relationship-type change harder, connecting it back to what you learned in Lesson 4?
