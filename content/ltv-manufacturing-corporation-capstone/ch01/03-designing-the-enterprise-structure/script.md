# Script — Designing the Enterprise Structure

## Segment 1 (title)

Before opening a single configuration screen, you design on paper. This lesson turns LTV's company profile into a concrete enterprise structure: which legal entities exist, which ledger each posts to, and which business unit processes transactions for each.

## Segment 2 (steps)

LTV has exactly two legal entities: the US parent and LTV Manufacturing Canada ULC. Each has its own statutory currency — USD and CAD. Because a primary ledger has exactly one currency, two functional currencies mean two primary ledgers, each tied to its own legal entity and its own business unit.

## Segment 3 (code)

The worked design: LTV US Primary Ledger, USD, under the US legal entity, with the US Manufacturing and Distribution business unit. LTV Canada Primary Ledger, CAD, under the Canadian legal entity, with the Canada Operations business unit. Both ledgers share the same chart of accounts structure and calendar.

## Segment 4 (steps)

A tempting shortcut is one ledger for both entities, converting Canadian transactions to USD on entry. Oracle Fusion allows multiple legal entities under one ledger only when they share a ledger currency — LTV's entities don't, so that shortcut would leave the Canadian subsidiary's statutory books never actually in CAD. Two ledgers is the correct design, not a compromise.

## Segment 5 (outro)

Up next, lesson four: configuring ledger, legal entity, and business units — building this exact design in Oracle Fusion.
