# Script — Lookup vs. Master-Detail Relationships

## Segment 1 (title)

This distinction is one of the most practically important facts about the Salesforce data model. It determines whether deleting one record silently deletes others, and whether a field can automatically roll up numbers from children to a parent.

## Segment 2 (steps: Lookup)

A Lookup relationship is loose and optional. The child can be saved with the lookup field blank. Delete the parent, and the child isn't deleted by default — the field just clears. And security is independent: access to the child doesn't automatically flow from access to the parent.

## Segment 3 (steps: Master-Detail)

Master-Detail is tight and required. The detail record can't even be saved without a master. Delete the master, and every detail record is cascade-deleted automatically. Security is inherited from the master, and because the relationship is guaranteed to exist, roll-up summary fields become possible.

## Segment 4 (outro)

Neither Lookup nor Master-Detail can represent many-to-many on their own. Next up: junction objects — how Salesforce builds many-to-many out of two Master-Detail relationships.
