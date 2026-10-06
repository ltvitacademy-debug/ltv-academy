# Script — Accounting Attribute Assignments

## Segment 1 (title)

Throughout this course, you've assumed SLA always knows things like the accounting date, currency, and amount for a journal entry. This lesson pulls back the curtain: accounting attributes, and the assignments that tell SLA where to get each one.

## Segment 2 (steps)

You learned about sources back in lesson four - transaction data like supplier name or invoice amount a rule can reference. Accounting attributes are related but distinct: specific values SLA itself needs by name to build a journal entry at all, like Accounting Date or Entered Amount. An accounting attribute assignment is the wiring that says which source feeds which required attribute.

## Segment 3 (steps)

Each attribute applies at one of two levels. Header-level attributes, like Accounting Date, apply once per entry - the whole entry has one date. Line-level attributes, like Entered Amount or Distribution Type, apply individually to each line, since different lines can carry different amounts.

## Segment 4 (steps)

Oracle designates certain attributes as required for every event class: Accounting Date, Distribution Type, Entered Amount, Entered Currency Code, First Distribution Identifier among them. Without a valid assignment for each one, SLA simply cannot build a complete journal entry for that event class.

## Segment 5 (code)

Most assignments default at the event class level, from Oracle's seeded configuration, and usually work fine out of the box. But depending on the attribute, that default can be overridden on a journal line type or within a specific AAD, when a particular line or company genuinely needs a different source.

## Segment 6 (outro)

So remember: accounting attributes are what SLA needs to know, sources are what's available to tell it, and assignments wire the two together, at the header or line level, defaulted at the event class but overridable when needed. Up next, lesson twenty-five: subledger accounting troubleshooting practice, applying this whole chapter to a realistic scenario.
