# Script — Value Sets and Values

## Segment 1 (title)

A segment's label tells Oracle Fusion what it means. A value set tells Oracle Fusion what values are allowed in it — the literal list a user can pick from.

## Segment 2 (code)

Four common validation types. Independent: a simple standalone list. Dependent: valid values depend on a choice made elsewhere. Table-validated: values pulled live from an existing application table. Format Only: no fixed list, just a format pattern to match.

## Segment 3 (steps)

Most chart of accounts segments use independent value sets. Dependent and table-validated matter more elsewhere in Oracle Fusion. Format Only is rare for core chart of accounts segments but appears in other contexts.

## Segment 4 (steps)

Each value carries its own attributes. Enabled controls whether it can be used on new transactions. Summary marks a value as a parent rollup. Posting allowed controls whether transactions can post directly to it — summary values usually have posting turned off.

## Segment 5 (outro)

A value set can be reused across segments when lists genuinely match, but reuse couples their maintenance together permanently — risky if the lists are likely to diverge. Next up, lesson twenty-three: account hierarchies and trees.
