# Lesson 19 — Metadata Management

**Chapter 3 · Ownership and Consistency · Lesson 19 of 26**

## What you'll learn

- The three kinds of metadata an enterprise actually has to manage, and how they differ
- Why Salesforce's own org metadata is not, by itself, a complete data dictionary
- How the Metadata API functions as the architect's extraction mechanism for technical metadata
- What keeps a business glossary useful instead of letting it become an abandoned wiki page
- How metadata management relates to, but is not the same as, the broader data-governance program

## Three kinds of metadata

**Metadata** is data about data — but that definition hides three genuinely different categories that get managed differently and often by different people:

| Kind | What it describes | Example |
|---|---|---|
| Technical metadata | The structural definition of the data itself — field types, object relationships, API names | "Account.AnnualRevenue is a Currency field, not required, related to no other object directly" |
| Business metadata | What the data *means* in business terms — definitions, context, acceptable use | "Annual Revenue means the customer's self-reported yearly revenue at time of last renewal, not an audited figure" |
| Operational metadata | How the data behaves and moves in practice — when it's refreshed, which job populates it, its quality history | "AnnualRevenue is overwritten nightly by an integration from Dun & Bradstreet; manual edits are overwritten within 24 hours" |

A field can have excellent technical metadata (Salesforce's schema always knows its data type) while having no business metadata at all (nobody wrote down what "Annual Revenue" is supposed to represent) and no operational metadata either (nobody documented that an integration silently overwrites manual edits). All three are needed before a new analyst can trust a field without asking around first.

## Why Salesforce's own metadata isn't a full data dictionary

Salesforce's Setup area — Object Manager, Schema Builder — gives you accurate, always-current technical metadata: every field's type, every relationship, every object's structure, generated directly from the org's real configuration rather than someone's notes about it. That's valuable, but it's only one of the three categories above. Object Manager will tell you precisely that AnnualRevenue is a Currency(18,0) field; it will not tell you what the business considers "annual revenue" to mean, or that an external integration overwrites it nightly. Treating Salesforce's own schema views as a complete data dictionary is a common and costly mistake — they're an accurate technical layer that a real data dictionary has to be built on top of, not a substitute for one.

## The Metadata API as the architect's extraction mechanism

For technical metadata specifically, Salesforce's **Metadata API** is the mechanism for programmatically retrieving and managing an org's structural definitions — custom objects, fields, layouts, and dozens of other metadata types — rather than reading them one screen at a time in Setup. It's explicitly a metadata API, not a data API: it manages the definitions and customizations of the org, while actual record data (Accounts, Opportunities, their field values) is handled through the separate REST or SOAP data APIs. In practice, this is what tools like Salesforce CLI and the VS Code extensions are built on top of, and it's the realistic way an architecture team extracts a current, accurate technical-metadata snapshot of a large org — as an input to a data dictionary, a change-impact review, or a sandbox comparison — rather than trying to document every field by hand.

## Keeping a business glossary that isn't a graveyard

Business metadata almost never comes from the platform automatically — someone has to write down what a field means in business terms, and that's where most metadata-management programs quietly die. A **business glossary** built once during a project kickoff and never revisited becomes exactly as unreliable as the stale classification labels from earlier in this course: a field gets repurposed, the glossary entry doesn't, and six months later the glossary is actively misleading rather than simply incomplete. The fix is the same pattern this course keeps returning to — assign an owner (often the data owner from Lesson 14, not a separate metadata team) and a lightweight review cadence tied to actual change events, like a field-level change triggering a glossary-entry review, rather than hoping someone remembers to update documentation as a side effect of unrelated work.

## Metadata management vs. data governance

Metadata management is a *component* of data governance, not a replacement for it. Data governance (the ownership models, the standardization rules, the systems-of-record maps from this chapter) decides *what should be true* about an organization's data. Metadata management is the practice of *recording and keeping current* the documentation that describes what is actually true — the technical shape, the business meaning, and the operational behavior — so that governance decisions have something reliable to act on. A governance program with no metadata management has rules nobody can verify are being followed; a metadata-management program with no governance has accurate documentation of a mess nobody is empowered to fix.

## Key terms

| Term | Meaning |
|---|---|
| Metadata | Data about data: its structure, meaning, or behavior |
| Technical metadata | Structural definitions -- field types, relationships, API names |
| Business metadata | What data means in business terms -- definitions and acceptable use |
| Operational metadata | How data behaves in practice -- refresh timing, owning jobs, quality history |
| Metadata API | Salesforce's API for programmatically managing org customizations and structural metadata, distinct from the data APIs used for record data |
| Business glossary | A maintained reference of business-term definitions for an organization's data |

## Lab

A new business analyst is handed access to a Salesforce org and asked to build a report using the AnnualRevenue field on Account. Object Manager confirms it's a Currency field with no validation rules. Nobody has documented what the field is supposed to represent, and nobody mentioned that a nightly integration from a third-party data provider overwrites any manual edits within 24 hours. Identify which of the three metadata categories (technical, business, operational) was available to the analyst, which were missing, and propose one lightweight process — tied to a specific trigger event, not a calendar reminder nobody will follow — that would have gotten this information to the analyst before they built a report on a field they misunderstood.

## Check yourself

Can you describe the difference between technical, business, and operational metadata using a field other than AnnualRevenue? Can you explain why Salesforce's Object Manager and Schema Builder, despite being accurate and always current, don't amount to a complete data dictionary on their own?
