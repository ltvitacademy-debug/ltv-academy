# Script — Junction Objects

## Segment 1 (title)

Salesforce has no native many-to-many relationship field. This lesson shows exactly how Salesforce solves that gap in practice — a pattern you'll see constantly in real orgs.

## Segment 2 (code: one field can't do this)

A single relationship field can only point one direction, at one record. That's fine for one-to-many, but it breaks down for many-to-many — one Contact can be in many Campaigns, and one Campaign has many Contacts. No single field can hold a list of relationships, each with its own extra data.

## Segment 3 (steps: the fix)

The fix is a junction object: a custom object with exactly two Master-Detail relationships, one to each side. It can't exist without both parents, and because it's a real object, it can carry its own fields. Salesforce's own standard example is CampaignMember, linking a Contact to a Campaign with its own Status field.

## Segment 4 (outro)

You've now met all three relationship shapes as concepts. Next up: Schema Builder — seeing these relationships as an actual diagram, not just field names.
