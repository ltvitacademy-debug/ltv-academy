# Lesson 7 — Data Skew: Ownership, Parent and Lookup Skew

**Chapter 2 · Skew and Locking · Lesson 7 of 16**

## What you'll learn

- What data skew is, and why it's a concentration problem rather than a volume problem
- The three named forms: ownership skew, parent (account) skew, and lookup skew
- Why Account and Opportunity are especially exposed to parent skew specifically
- How to detect skew in an existing org before it causes a production incident

## Skew is about concentration, not total size

**Data skew** happens when a disproportionately large number of records are concentrated under a single owner, a single parent record, or a single lookup target — regardless of how large the object is overall. A 200,000-record object can have a serious skew problem if 150,000 of those records point at one account; a 10-million-record object can have none, if ownership and relationships are evenly spread. This is why skew gets its own chapter, separate from the raw record-count concerns of Chapter 1: a perfectly-indexed, perfectly-selective query can still run into trouble if the records it touches are concentrated in a way that trips a different platform behavior — record locking, which Lesson 8 covers in depth.

Salesforce's own Trailhead guidance treats roughly 10,000 as the commonly cited point at which this concentration starts to matter in practice — not a hard platform limit, but a widely used guideline for "this many records under one owner or one parent is where problems tend to start showing up." Treat it as a planning threshold, not a wall the platform enforces.

## Three named forms

- **Ownership skew** happens when one user or one queue owns an unusually large number of records. It commonly happens unintentionally — a "default owner" used for records with no clear assignment, or an integration user that owns every record it creates via API, slowly accumulating ownership of a disproportionate share of an object over time.
- **Parent (account) skew** happens specifically on objects like Account and Opportunity, which have special sharing behavior that maintains access for both the parent and its related child records under certain sharing models. When too many child records (Contacts, Opportunities, Cases, custom child objects) attach to one parent Account, that parent becomes a hotspot: any operation that needs to lock the parent while touching its children starts competing for that lock far more often than it would under an evenly distributed data model.
- **Lookup skew** happens when a very large number of records reference the same target record through an ordinary lookup field — on any object, not just Account or Opportunity. A custom "Status" or "Type" reference object that every record in a 5-million-row object points to is a textbook lookup-skew setup, even though no sharing-specific behavior is involved the way it is with parent skew.

## Why Account and Opportunity are more exposed

Parent skew specifically calls out Account and Opportunity because of how Salesforce's private sharing model is implemented for them: certain operations on a child record require briefly locking the parent record to safely evaluate or update sharing. That's a reasonable, necessary behavior at normal scale — but when tens of thousands of child records sit under one parent, any bulk operation touching a meaningful fraction of those children at once creates heavy contention for that one parent's lock, which is the direct mechanical cause of the record-locking failures covered in the next lesson. Lookup skew doesn't carry this specific sharing-lock mechanism, but it can still create its own bottlenecks around that one heavily-referenced record.

## Detecting skew before it's a production incident

Skew is detectable with ordinary SOQL aggregate queries run proactively, not just diagnosed after an incident. Grouping child records by their parent lookup field (e.g., Contacts grouped by AccountId, sorted by count descending) surfaces parent skew directly. The same pattern — group by OwnerId, sorted by count — surfaces ownership skew, with particular attention to integration users and queue owners, which are the most common unintentional sources. Running this kind of check periodically on an org's largest objects, rather than only after a locking incident forces the question, is the practical discipline this lesson is building toward.

## Key terms

| Term | Meaning |
|---|---|
| Data skew | A disproportionate concentration of records under a single owner, parent, or lookup target, independent of total object size |
| Ownership skew | Too many records owned by one user or queue |
| Parent (account) skew | Too many child records under one parent on an object like Account or Opportunity, which have special parent-child sharing lock behavior |
| Lookup skew | Too many records referencing the same target record via an ordinary lookup field, on any object |

## Lab

An integration user creates every inbound Case from a support ticketing system and is left as the owner unless a human later reassigns it. After two years, 180,000 of the object's 900,000 total Cases are still owned by that integration user. Using this lesson's concepts, name which type of skew this is, explain why it's a problem even though no single parent Account is overloaded, and describe the SOQL aggregate query pattern you'd run to confirm the scale of the problem across the rest of the org's objects.

## Check yourself

Can you define data skew in your own words, and explain why it's a concentration problem rather than a volume problem? Can you name and distinguish ownership skew, parent skew, and lookup skew, and explain why Account/Opportunity specifically are called out for parent skew?
