# Lesson 16 — Active Metadata

**Chapter 3 · Metadata and Catalog Architecture · Lesson 16 of 30**

## What you'll learn

- The difference between passive metadata (described, browsed by a human) and active metadata (metadata that triggers automated action)
- Three concrete examples of active metadata in practice: classification-driven masking, lineage-driven impact alerts, and usage-driven deprecation
- Why active metadata requires the event-driven ("push") architecture from Lesson 12, not just a query-able store
- How this closes Chapter 3 and sets up Chapter 4's security architecture

## Passive vs. active metadata

**Passive metadata** is metadata that sits in a catalog for a human to read when they go looking for it — a description, an owner's name, a sample value. It's useful, but it requires someone to open the catalog and look.

**Active metadata** is metadata that triggers automated behavior elsewhere in the stack the moment it's observed or changed, with no human required for the triggering step itself. The distinction isn't about what the metadata *says* — it's about whether something downstream actually *acts* on it automatically, or whether a person has to read it and decide to act.

## Three concrete examples

- **Classification-driven masking** — a column gets tagged as sensitive (by an automated classifier or a human), and a masking policy already attached to that tag applies automatically to every future query against it. The tag isn't just a label in a catalog entry; it's actively driving real-time enforcement the moment a query runs. This is the same tag-driven masking pattern already covered in this career path's Snowflake governance course.
- **Lineage-driven impact alerts** — a schema change on an upstream table automatically notifies every owner of every downstream asset that lineage data shows depends on it, without anyone manually tracing a lineage diagram first to figure out who to tell.
- **Usage-driven deprecation flags** — a catalog that tracks how often a table is actually queried can automatically flag one that hasn't been touched in a defined window as a deprecation candidate, surfacing that to its owner directly, rather than relying on someone to run a manual audit of what's still in use.

## Why this needs event-driven architecture underneath

Active metadata only works if the architecture underneath can observe a change and emit an event the instant it happens — the "push" half of the harvesting choice from Lesson 12, now a requirement rather than an option. A purely pull/crawl-based architecture can't drive real-time automated action on its own, because it only knows the current state when something asks it, on whatever schedule the crawl runs. If classification-driven masking depended on a nightly crawl to notice a new tag, there would be a window — up to a full day — where a sensitive column sat unmasked simply because the architecture hadn't gotten around to checking yet.

## Closing Chapter 3, opening Chapter 4

Chapter 3 built the metadata and catalog architecture end to end: how metadata gets captured (Lesson 12), how it's searched (Lesson 13), how relationships between assets get tracked (Lesson 14), how multiple platforms' catalogs connect (Lesson 15), and now how that metadata can drive automated action (this lesson). Chapter 4 takes the same active-metadata idea and applies it specifically to security and access: policies that read a tag or classification and enforce access automatically — exactly the mechanism classification-driven masking previewed here, now examined as its own architectural layer.

## Key terms

| Term | Meaning |
|---|---|
| Passive metadata | Metadata a human must read and act on manually |
| Active metadata | Metadata that triggers automated action downstream, without a human in the triggering step |
| Classification-driven masking | A sensitivity tag automatically triggering a masking policy on every future query |
| Lineage-driven impact alert | An automatic notification to downstream owners when an upstream asset changes |
| Usage-driven deprecation | A catalog automatically flagging a rarely-used asset as a deprecation candidate |

## Lab

For one data asset you know well, write down one piece of metadata about it that currently just sits in a catalog or spreadsheet for a human to notice (passive), and one automated action you could realistically wire to it if that metadata became active — a masking policy, an alert, a deprecation flag, or something specific to your own context.

## Check yourself

Can you explain the difference between passive and active metadata in your own words, give one concrete example of each of the three active-metadata patterns this lesson covers, and explain why active metadata requires push-based, event-driven architecture rather than a purely pull-based one?
