# Script — Project: Connecting MongoDB, Cosmos DB & Neo4j in One Architecture

## Segment 1 (title)

Lesson 77 matched Meridian's three problems to three platforms, one decision at a time. This lesson asks the harder question: what does it look like when MongoDB, Cosmos DB, and Neo4j all run in the same application at once, supporting the same shopper?

## Segment 2 (code: one shopper, three platforms)

Picture a shopper in Melbourne browsing tents. The product page reads straight from MongoDB. Adding to cart writes to Cosmos DB under session consistency, in whichever region is closest. Placing the order hits the order system and publishes an event — nothing queries a fourth system live during checkout.

## Segment 3 (code: the seam between systems)

That event, "customer bought product," is consumed by a separate sync job that writes the relationship into Neo4j. MongoDB doesn't know Neo4j exists, and Cosmos DB doesn't either — these are three independent systems kept in sync by events, not one shared database with three faces.

## Segment 4 (steps: three real costs)

Running three platforms instead of one SQL Server instance is a real operational cost. Three backup strategies to own. Three security surfaces to secure. And a sync job that can fail quietly — checkout keeps working fine while the recommendation graph silently goes stale behind it.

## Segment 5 (outro)

That cost is real, but so is the benefit — each problem solved by the tool actually built for it, instead of one architecture that fails slowly as every problem gets worse at scale. Next up: how to talk through this exact architecture in a real interview.
