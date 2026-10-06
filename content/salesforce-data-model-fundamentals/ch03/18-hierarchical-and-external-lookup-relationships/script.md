# Script — Hierarchical and External Lookup Relationships

## Segment 1 (title)

Lessons 16 and 17 covered relationships connecting records inside the same org. This lesson covers two narrower variants — one that only exists on a single standard object, and one that reaches past the edge of your org entirely.

## Segment 2 (screenshot: Campaign self-lookup)

A Hierarchical Relationship is a special Lookup available only on the User object — most commonly used to build a management chain, where each user's Manager field points to another user. Other objects model their own version of a hierarchy with an ordinary self-referencing Lookup instead. Campaign's Parent Campaign field is exactly that: a regular Lookup back to Campaign, letting campaigns nest under other campaigns, without needing the User-only Hierarchical type.

## Segment 3 (screenshot: field type wizard)

An External Object represents data that physically lives outside Salesforce, accessed live rather than copied in. To relate it to another object, Salesforce offers a dedicated type — External Lookup Relationship — listed right alongside the familiar Lookup Relationship on Step 1 of the New Custom Field wizard. Unlike a standard Lookup, it matches on an External ID field instead of a Salesforce record ID.

## Segment 4 (screenshot: external object related list)

Once it's working, the result looks almost identical to a normal relationship. An Order's related list of OrderDetails — an External Object pulled live from an outside system — renders with columns for External ID and Display URL, but otherwise behaves like any other related list.

## Segment 5 (steps: when to use which)

Three quick rules: need a manager chain on Users specifically — Hierarchical. Need any other object to reference its own kind — an ordinary self-lookup. Need to relate to data that lives outside Salesforce — External Lookup, matched by External ID.

## Segment 6 (outro)

With five relationship variants now covered — Lookup, Master-Detail, junction objects, Hierarchical, and External Lookup — next up is Record Types, which let one object present itself differently depending on which kind of record it is.
