# Script — Relationships: Lookup and Master-Detail

## Segment 1 (title)

Chapter 2 mentioned relationship fields in passing — Lookup and Master-Detail, grouped together as one family. This lesson gives both their own full treatment: what each one actually does, and when a loose connection is right versus a tight one.

## Segment 2 (screenshot: Lookup)

A Lookup Relationship links two objects so a record on one can reference a record on the other. The classic example is a Contact looking up to an Account — that reference shows up automatically on the Account's Related list. Lookup is deliberately loose: a Contact can exist with no Account at all, and deleting the Account doesn't delete its Contacts.

## Segment 3 (screenshot: Master-Detail)

Master-Detail is a stricter bond. The detail record can't exist without its master — delete the master, and every detail record goes with it. The master also controls the detail's sharing, with no separate sharing rule needed. Schema Builder draws this distinction visually: a Lookup line looks different from a Master-Detail line, and each field is labeled with its relationship type right on the card.

## Segment 4 (screenshot: Lookup Filter)

Both relationship types offer an optional Lookup Filter — a condition that narrows which records a user is even allowed to pick. This example keeps a support rep from linking a Case to a Contact at the wrong company, by comparing the Contact's Account to the Case's own Account.

## Segment 5 (steps: Lookup vs Master-Detail)

Four things separate them: existence — a Lookup child can stand alone, a Master-Detail child can't. Deletion — Master-Detail cascades, Lookup doesn't. Sharing — Master-Detail inherits the parent's, Lookup needs its own rule. And Roll-Up Summary fields — only Master-Detail supports them.

## Segment 6 (outro)

One object can even hold both kinds at once, which is exactly the pattern the next lesson builds into a full many-to-many relationship using a junction object.
