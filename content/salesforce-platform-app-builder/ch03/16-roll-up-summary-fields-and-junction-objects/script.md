# Script — Roll-Up Summary Fields and Junction Objects

## Segment 1 (title)

A roll-up summary field aggregates values from child records onto the master — a count, sum, minimum, or maximum. Unlike a formula field, this value is actually stored. And that's exactly why it needs a master-detail relationship — the one relationship strict enough to guarantee the aggregate stays correct.

## Segment 2 (code: building one)

You build it on the master object as a Roll-Up Summary field: choose the child relationship, then count, sum, min, or max. You can add filter criteria so only matching children count — summing only line items that aren't cancelled, for example. It recalculates automatically the moment a child record is created, updated, deleted, or reparented.

## Segment 3 (steps: why master-detail)

A lookup relationship is loose on purpose — a child can exist with no parent set, and deleting the parent doesn't force the child to go. A roll-up needs a relationship that guarantees the child belongs to exactly one parent and can never be orphaned. That's master-detail. Lookup relationships simply can't host a native roll-up.

## Segment 4 (code: junction objects)

Master-detail is naturally one-to-many. Many requirements are many-to-many — students in courses, contacts across opportunities. The pattern is a junction object: one custom object with two master-detail relationships, one to each side. Enrollment has a master-detail to Student and a second to Course. Now Course can roll up a count of enrollments, and Student can independently roll up a count of its own enrollments, from that same junction object.

## Segment 5 (steps: the one-level limit)

The real limitation: a roll-up only reaches its direct children, one level down. It can't jump straight from a grandparent to a grandchild. The workarounds are a second roll-up one level up the chain, a formula field where the math allows it, Flow once you've covered that lesson, or for real complexity, the Declarative Lookup Rollup Summary package from the AppExchange.

## Segment 6 (outro)

Roll-ups aggregate direct children and require master-detail; junction objects are how you get that aggregation on both sides of a many-to-many. Next: approval processes and Flow — routing and branching logic across steps.
