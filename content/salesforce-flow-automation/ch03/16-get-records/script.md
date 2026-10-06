# Script — Get Records

## Segment 1 (title)

Create, Update, and Delete Records all write to Salesforce. Get Records is the one element that reads — it queries an object, applies your filters, and hands the result to the rest of the flow in a variable.

## Segment 2 (screenshot: panel)

Here's a real example. The flow needs the Decision Maker on a lost opportunity — but that's not stored on the Opportunity itself, it lives on a related Opportunity Contact Role record. So this Get Records element, Get Decision Maker, queries Opportunity Contact Role instead, with its conditions set to All Conditions Are Met.

## Segment 3 (screenshot: second condition)

One condition alone — Opportunity ID equals the triggering opportunity — would return every contact role on that deal. Adding a second condition with AND, Role equals Decision Maker, narrows it down to exactly the record this flow actually needs.

## Segment 4 (screenshot: sort and storage)

But an opportunity can rack up more than one Decision Maker role record over time, so filtering alone isn't quite enough. Sort By CreatedDate, Descending, puts the most recent one first. Then How Many Records to Store — set here to Only the first record — keeps just that one, with every field stored automatically.

## Segment 5 (steps: single vs collection)

That one setting is the real fork in the road. Only the first record, or only the first N, gives you a single-record variable. All records gives you a full collection instead — the exact setting the Collections lesson was built around. Same element, same filters, same sort — just one checkbox away from a completely different shape of data.

## Segment 6 (outro)

Get Records reads; everything downstream decides what to do with what it found. Next up: Create, Update, and Delete Records — the three elements that actually write back.
