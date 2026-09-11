# Script — Bridge Tables for Many-to-Many Relationships

## Segment 1 (title)

Every dimension you've built so far relates to its fact table one-to-many. This lesson covers what happens when that's genuinely not true — when the real-world relationship is many-to-many on both sides.

## Segment 2 (steps: when one-to-many isn't the truth)

Take crediting a sale to salespeople. A single sale might legitimately be split across two or three people who worked the deal together, and any one salesperson is naturally credited on plenty of sales. That's a real many-to-many relationship between the fact and a dimension, and no amount of clever fact-table design turns it into a clean one-to-many by itself.

## Segment 3 (real Microsoft Fabric diagram)

Microsoft's Fabric Warehouse guidance shows the fix with a different pair of entities — customers and bank accounts, where a customer can hold multiple accounts and an account can have multiple joint holders. The Account dimension relates to the Transaction fact table directly, but Customer relates to that same fact table only through a Customer Account bridge table, storing one row per customer-account pairing.

## Segment 4 (steps: the resolution)

The pattern is always the same shape: instead of one many-to-many relationship, you get two clean one-to-many relationships. Fact to bridge, one-to-many. Bridge to dimension, one-to-many. And look closely at what the bridge table actually stores — nothing but foreign keys, no measures. That makes it, by definition, a factless fact table: a row records that an association happened, and the only thing you can measure is a count of rows.

## Segment 5 (outro)

Bridge tables resolve many-to-many relationships you can't design around. Next lesson covers a completely different kind of mismatch: a fact that shows up in your warehouse before the dimension row it needs even exists yet.
