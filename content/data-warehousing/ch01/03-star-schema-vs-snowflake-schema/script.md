# Script — Star Schema vs. Snowflake Schema

## Segment 1 (title)

You know the two building blocks now — facts and dimensions. This lesson is about the actual shape those dimensions take: star schema or snowflake schema, and why you'd pick one over the other.

## Segment 2 (screenshot: star schema)

In a star schema, one fact table sits at the center, and every dimension table connects to it directly, one join away. Each dimension is fully denormalized — a product's category and subcategory live right in the same row as the product, even though that data repeats across many products. Draw it out, and the fact table is the center of a star while its dimensions form the points. That's exactly where the name comes from, and this Microsoft diagram shows it directly: five dimensions, each one hop from the fact table.

## Segment 3 (screenshot: snowflake dimension)

A snowflake schema normalizes one or more of those dimensions into several related tables instead of one flat table. Here, instead of a single Product dimension, the hierarchy is split into Product, Subcategory, and Category, each referencing the level above it. Picture those tables fanning outward from the fact table, and you get the snowflake name — the points of the star sprout their own smaller points. It's still just facts and dimensions underneath; only one dimension changed shape.

## Segment 4 (steps: the tradeoff)

The tradeoff is real. Star schemas need fewer joins and generally perform better, at the cost of storing redundant data. Snowflake schemas save storage and reduce redundancy, at the cost of extra joins on every query. Microsoft's own guidance defaults to denormalized star dimensions — snowflaking is the exception, reserved for very large dimensions, or when you need a key that relates the dimension to a higher-grain fact table.

## Segment 5 (outro)

You can now tell a star from a snowflake, and you know which one to reach for by default. Next lesson tackles the single most important decision in designing any fact table: choosing its grain.
