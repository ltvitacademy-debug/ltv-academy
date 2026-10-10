# Lesson 12 — Big Objects for Archiving

**Chapter 3 · Managing Volume · Lesson 12 of 16**

## What you'll learn

- What a Big Object is, and why it's architecturally different from a standard or custom object
- Why Big Objects are a natural landing zone for archived data specifically
- Real constraints on Big Objects: limited field types, no upsert, limited automation support
- Why query tooling for Big Objects has shifted over time, and why that matters for design decisions today

## A different kind of object, built for a different job

A **Big Object** is a Salesforce object type purpose-built to store and manage massive numbers of records — the kind of volume that would be impractical or prohibitively expensive to keep in a standard or custom object — while still being able to retrieve that data when genuinely needed. Big Objects aren't meant to replace the objects an org actively works in day to day; they're meant to hold data too voluminous to stay there affordably, retrievable later through a query rather than gone for good.

This makes Big Objects a natural fit for the archiving pattern from Lesson 11: once historical records have been extracted, backed up, and checked for relationship impact, moving them into a Big Object (rather than deleting them outright) preserves the ability to retrieve that data later, while getting it out of the actively-queried working set that Chapters 1 and 2's performance techniques are built around.

## Real constraints to design around

Big Objects come with meaningful constraints that distinguish them from the standard and custom objects covered elsewhere in this course:

- **Limited field types.** Big Object fields support a narrower set of data types than a standard or custom object — commonly cited as DateTime, Lookup, Number, Text, and Long Text Area. An architect planning to move data into a Big Object needs to confirm the fields being archived actually fit within these supported types before committing to the design.
- **No upsert.** Big Objects don't support the upsert operation the way standard and custom objects do, which affects how an archiving pipeline has to be built — it needs a clear insert-only or explicitly-sequenced approach rather than relying on upsert semantics.
- **Limited automation.** Triggers and Flow support against Big Objects is much more restricted than against standard or custom objects, which is generally appropriate for their role — Big Objects are meant to hold settled, historical data, not data that needs ongoing business-process automation reacting to it.
- **A capped number per org.** There's a per-org limit on how many Big Objects can be defined, so an architect shouldn't default to "one Big Object per archived object" without first checking whether a shared, well-modeled Big Object could serve multiple archiving use cases.

## Query tooling has evolved — verify before you design

For a period, Salesforce offered **Async SOQL** as a batch-style way to query Big Objects at scale, including joining Big Object data with standard or custom object data in a single query, and it was commonly used for pulling a representative subset of Big Object data into a smaller custom object for reporting. Salesforce's own documentation announced Async SOQL for retirement, which is an important reminder for an architecture course: a specific query mechanism named in a Trailhead module or best-practices guide is not guaranteed to be the current, supported way to query Big Objects by the time you're designing against them. Before committing an archiving design to a specific Big Object query approach, confirm the currently supported querying method in your org's release and in Salesforce's current documentation, rather than assuming a method described in older material is still the one to build against.

## Deciding when a Big Object is the right archive target

Not every archived dataset needs a Big Object. For a moderate volume of historical data that's rarely but occasionally queried, extracting to an external system (a data warehouse, a backup/archival platform) may be simpler and avoid Big Object's field-type and automation constraints entirely. A Big Object earns its place specifically when the volume is too large for a practical external round-trip every time the data might be needed, but the data still needs to stay queryable from inside Salesforce itself — the case Big Objects were built for.

## Key terms

| Term | Meaning |
|---|---|
| Big Object | A Salesforce object type purpose-built for storing massive record volumes cheaply, with data still retrievable by query |
| Supported Big Object field types | A narrower set of data types (commonly DateTime, Lookup, Number, Text, Long Text Area) than standard/custom objects support |
| Async SOQL | A batch-style querying approach Salesforce previously offered for Big Objects, which Salesforce's own documentation announced for retirement — confirm the current supported method before designing around it |

## Lab

An org wants to archive 40 million closed Case records into a Big Object, keeping them queryable for occasional historical lookups by support managers, with no need for any trigger or flow logic to run against the archived data. Identify which two of this lesson's constraints (field types, upsert support, automation support, per-org cap) are least likely to be a problem for this specific use case, and which one deserves the closest review before committing to the design, and why.

## Check yourself

Can you explain, in your own words, what makes a Big Object different from a standard or custom object, and why that makes it a natural archive target? Can you name at least two real constraints on Big Objects an architect has to design around, and explain why you should verify current query tooling rather than assume older documentation still applies?
