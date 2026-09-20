# Script — Graph Data Modeling Fundamentals

## Segment 1 (title)

Chapter One's NoSQL principle was to model from the actual access pattern, not the theoretical structure. Graph modeling follows the same spirit, with its own version of that question: model around the questions you'll actually ask.

## Segment 2 (steps: start from the questions)

Instead of listing every entity in the domain, write down the real questions first — who reports to this manager at any depth, which customers who bought product A also bought product B, is there any path connecting two accounts within four hops. Each question implies which relationships need to exist, in which direction, and which things need their own identity.

## Segment 3 (code: node or property test)

The concrete test: if something is only ever looked up through its parent and never queried or connected to independently, it's a property — an order's date doesn't need to be its own node. If it needs its own relationships, needs to be queried directly, or is shared across multiple parents, it's a node — a product is shared by many orders, so it earns node status.

## Segment 4 (steps: common mistakes)

Making everything a node bloats the graph and makes simple lookups needlessly indirect. Making everything a property loses genuinely shared, relationship-bearing entities. And overly generic relationship types, one RELATED_TO for everything instead of specific types like PURCHASED or MANAGES, make queries harder to write and the model harder to reason about.

## Segment 5 (outro)

These are the fundamentals. Next up: a full worked example, converting a real relational schema — customers, orders, products — into an actual graph model.
