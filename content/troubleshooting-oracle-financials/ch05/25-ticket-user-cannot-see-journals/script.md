# Script — Ticket: User Cannot See Journals

## Segment 1 (title)

Thornfield Materials Holdings, ticket forty-seven-forty-two. The Fixtures Division controller can see their own division's journals fine, but nothing for the Structural Division — even inside the same ledger. They're asking if that's supposed to happen. Low severity, this is a question, not a break report.

## Segment 2 (steps)

Same method as last lesson, one layer deeper. Beyond which ledger a data role covers, Oracle supports segment value security — restricting access down to specific values of one chart-of-accounts segment, commonly legal entity, company, or division. Full ledger access doesn't guarantee you see every segment value inside it.

## Segment 3 (steps)

First move, same instinct as always: is this one person, or a pattern? Checking other Fixtures Division controllers — identical restriction, every time. Checking the data role itself: it does include the full ledger, both divisions share one ledger here, so this isn't last lesson's kind of gap. Checking segment value security specifically: there's a rule on the Division segment, restricting Fixtures controllers to the Fixtures value only, explicitly excluding Structural.

## Segment 4 (code)

So this isn't a misconfiguration at all — it's deliberate, and the fact that every Fixtures controller shows the exact same restriction confirms that. The resolution here is confirmation, not correction: explain to the controller that this is designed behavior, consistent across the role. If there's a real business need to see Structural Division data too, that's a deliberate access request routed to whoever owns segment value security — not something to quietly override on a ticket.

## Segment 5 (outro)

Resolution note: state plainly that no fix was applied, because nothing was broken — just explain the design and confirm it's consistent. That closes out chapter five. The same question — one person, or a pattern — told apart a genuine gap last lesson from a working-as-designed restriction this time. Up next, chapter six: Data and Integration tickets, starting with a failed FBDI import.
