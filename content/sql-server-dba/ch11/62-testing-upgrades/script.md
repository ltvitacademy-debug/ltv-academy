# Script — Testing Upgrades

## Segment 1 (title)

Lesson 62: testing upgrades. Test cadence and planning only matter if the test itself is real.

## Segment 2 (code: The real test setup)

The only trustworthy upgrade test restores an actual, current production backup onto a staging instance running the target version, then runs the real application workload against it. A handful of made-up sample rows won't surface the data-skew and scale issues that actually break things.

## Segment 3 (steps: Query Store makes it concrete)

Query Store turns a vague complaint into a concrete list. Its Regressed Queries report ranks queries by how much performance changed and shows the old plan next to the new plan. Found a regression? Force the old plan temporarily while you fix the real cause. Passing means measured, not just "it installed without errors."

## Segment 4 (outro)

Testing tells you a problem exists before production does — but you still need a way out if something slips through. Next up: rollback planning, and why a tested backup is the real safety net.
