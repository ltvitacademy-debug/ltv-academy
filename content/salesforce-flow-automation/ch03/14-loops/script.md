# Script — Loops

## Segment 1 (title)

A Loop element creates a circular path in your flow — it takes every value in a collection and runs it, one at a time, through whatever elements you put on its path. It has exactly one required setting: which collection to loop over.

## Segment 2 (screenshot: loop config)

Here's a real one. OppLoop sits right after a Get Records element that retrieved a batch of closed opportunities, and it splits into two paths — For Each, which runs once per record, and After Last, which runs once the whole collection is done.

## Segment 3 (screenshot: canvas with actions)

Inside the For Each path, two actions run for every opportunity that comes through: Lock Opportunity, then a Chatter post. Both of them reference Current Item from Loop — the special variable that holds whichever record the loop is currently processing.

## Segment 4 (steps: the rule)

Here's the rule that matters most with loops: Get Records, Create Records, Update Records, and Delete Records elements each count against hard limits — 100 SOQL queries, 150 DML operations per flow. Put one of those inside a loop over a large collection, and you can blow through that limit fast. So: Get Records goes before the loop, and Create, Update, and Delete Records go after it.

## Segment 5 (screenshot: real pattern)

Here's that rule built correctly. Get Active Users runs once, before the loop. Inside the loop, a Decision and an Assignment element only change values in memory — no database call. After the loop, a single Update Records element commits every changed user in one operation, instead of one operation per user.

## Segment 6 (outro)

A loop handles the iteration; data elements outside it handle the database. Keep that boundary clean and your flow scales from ten records to ten thousand without changing shape. Next up: Collections — what a collection variable actually is, and how to filter and sort one.
