# Value Sets and Values

A segment's label tells Oracle Fusion what the segment *means*. A **value set** is what actually tells Oracle Fusion what *values* are allowed in it — the literal list of codes a user can pick from. This lesson covers how value sets work, the different ways they can be validated, and the attributes attached to individual values within them.

## What you'll learn

- What a value set is, and how it attaches to a segment
- The four common validation types: independent, dependent, table-validated, and format-only
- Key value attributes: enabled, summary, and posting allowed
- Why reusing a value set across segments or structures is sometimes useful, and sometimes dangerous

## What a value set is

A **value set** is a named, reusable list of valid values, along with formatting rules (maximum length, numeric vs. alphanumeric, and so on). A chart of accounts segment is assigned exactly one value set, and that value set determines every value a user can enter for that segment, on every transaction, forever (until the value set itself is changed).

## The four common validation types

```
Value Set Validation Types:
  Independent      — a simple, standalone list (e.g. Cost Center: 100, 200, 300)
  Dependent          — valid values depend on a value already chosen elsewhere
  Table-validated    — values are pulled live from an existing application table
  Format Only        — no fixed list; any value matching a format (e.g. 4 digits) is valid
```

Most chart of accounts segments use **independent** value sets — the segment's values stand on their own, validated against nothing else. **Dependent** value sets are less common in a chart of accounts context but matter more elsewhere in Oracle Fusion; they restrict a second segment's valid choices based on what was already picked in a related segment. **Table-validated** value sets pull their list from a live application table rather than a static list — useful when the "list" is really owned by another part of the system. **Format Only** value sets skip a fixed list entirely, validating only that an entered value matches a format pattern, which is rare for core chart of accounts segments but does appear elsewhere.

## Value attributes

Within a value set, each individual value carries its own attributes that affect how it behaves:

- **Enabled**: whether the value can currently be used on new transactions. A value can exist in the list but be disabled, which is how old, retired account codes get phased out without deleting history.
- **Summary**: marks a value as a *parent* or rollup value used for reporting and hierarchies, rather than a value transactions post directly to.
- **Posting allowed**: controls whether a value can actually be posted to directly on a transaction or journal — a summary/parent value typically has posting allowed turned off, since transactions should post to detail values, which then roll up into the summary for reporting.

## Reuse: useful, and risky

The same value set can, in principle, be assigned to more than one segment or structure instance — convenient when two segments genuinely share an identical list of valid codes. But reuse becomes risky when the lists only *look* similar today and are likely to diverge later; sharing a value set couples their maintenance together permanently, so a change intended for one segment silently affects the other too. When in doubt, a dedicated value set per segment is safer than clever reuse.

## Recap

A value set is the reusable list (and format rules) a segment draws its values from, validated as independent, dependent, table-validated, or format-only, with individual values carrying enabled, summary, and posting-allowed attributes. Next up, lesson 23: account hierarchies and trees, which organize these values into the rollup structures reporting depends on.
