# Lesson 2 — Source Analysis

**Chapter 1 · Planning · Lesson 2 of 18**

## What you'll learn

- Why source analysis has to happen before any mapping or tooling decision
- How to identify the system of record when multiple sources disagree
- What to actually document about a source system before relying on it
- Why volume and "known quirks" belong in the source analysis, not discovered later

## You can't migrate what you haven't understood

Before a single field gets mapped or a single tool gets chosen, someone has to go look closely at where the data is actually coming from. **Source analysis** is the work of understanding every system that currently holds data in scope for the migration — not just what tables or objects exist, but how reliable they are, how they relate to each other, and what's genuinely true about the data inside them versus what everyone just assumes is true. Skipping this step doesn't make the source data simpler; it just means the team learns the hard facts about it during the load instead of during planning, which is a much more expensive time to learn them.

Source analysis commonly covers more than one system. A consolidation project — two acquired companies' CRMs merging into one Salesforce org, or a company retiring a legacy on-premise system while keeping a newer cloud tool for certain data — means the architect has to analyze each source independently and then reconcile them against each other, not just analyze whichever one happens to be easiest to access.

## Finding the system of record

When the same conceptual piece of information exists in more than one source — a customer's phone number sitting in both the old CRM and a support ticketing tool, say, and the two don't agree — the project needs a clear answer to "which one wins?" before migration design can proceed. That answer is the **system of record**: the source formally designated as authoritative for a given piece of data, decided deliberately rather than by accident (e.g., "whichever file happened to load last"). The system of record isn't necessarily the same system for every field. It's entirely normal for one source to be authoritative for contact details while another is authoritative for financial history, and the source analysis should document that field-by-field or object-by-object, not assume one system wins across the board.

Determining the system of record is a business decision as much as a technical one — it usually needs input from the people who actually use each source day to day, since they're the ones who know which system gets kept up to date in practice and which one has quietly gone stale.

## What to document about each source

A useful source analysis produces a written artifact the rest of the project can build on, not just tribal knowledge in one person's head. At minimum, that artifact should cover: the source's schema (what tables/objects/sheets exist, and what each field actually represents — not just its column name, which is frequently misleading); the data volume (roughly how many records per entity, since volume drives tooling decisions in Lesson 5); access mechanics (can this system export CSV, does it have an API, is it a spreadsheet someone has to manually clean first); and known quirks — the things a long-time user of the source system already knows are messy, inconsistent, or workaround-driven, which are far cheaper to document now than to discover mid-load. A field called "Region" that one sales rep uses for a US state and another uses for a country is exactly the kind of quirk that belongs in this document, not in a surprised Slack message during the load.

## Volume and access shape everything downstream

Two numbers from source analysis quietly determine a lot of what happens in later chapters: how many records exist per object, and how accessible that data actually is. A source that exports a clean CSV in seconds behaves very differently in planning than one that requires a custom export script, a database admin's help, or manual spreadsheet cleanup before it can even be looked at. Both the tooling choice in Lesson 5 and the scope/strategy decision in Lesson 4 depend directly on what source analysis establishes here — which is exactly why this lesson comes before both of them.

## Key terms

| Term | Meaning |
|---|---|
| Source analysis | The work of understanding every system holding in-scope data before any mapping or tooling decisions are made |
| System of record | The source formally designated as authoritative for a specific piece of data when sources disagree |
| Known quirks | Documented inconsistencies or messiness in a source system that long-time users already know about |
| Access mechanics | How data can actually be extracted from a source — API, CSV export, manual spreadsheet work, and so on |

## Lab

A company is merging two acquired regional businesses' customer data into one Salesforce org. Both legacy CRMs have a "Customer Status" field, but Business A's values are Active/Inactive/Prospect while Business B's are Open/Closed/Lead. Neither system has been updated consistently — some reps in both businesses admit they stopped maintaining the field a year ago. Write the source-analysis notes you'd produce for this one field: which quirks you'd document, what question you'd ask the business to establish a system of record (if any), and whether you'd trust either source's "Customer Status" value as-is.

## Check yourself

Can you explain what a "system of record" decision is for, and why it sometimes needs to be made per-field rather than per-system? Can you list the four things a useful source analysis document should capture about each source system?
