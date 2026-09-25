# Script — SOSL vs. SOQL: When to Use Each

## Segment 1 (title)

You have two languages that both return Salesforce records. Pick the wrong one and the task can be awkward or flat-out impossible. Here's the rule for choosing.

## Segment 2 (code: the core difference)

SOQL says: give me records from this object that meet these conditions. You know where to look. SOSL says: where does this text appear? You have a word and no idea which object holds it. One is a structured query, the other is a search.

## Segment 3 (steps: choose SOQL when)

Reach for SOQL when you know the object and fields, when you need exact conditions on numbers, dates, or picklists, when you need counts and grouping, when you need related records, and when you're extracting large volumes of data. SOSL has no aggregates and no relationship queries.

## Segment 4 (steps: choose SOSL when)

Reach for SOSL when you have a piece of text, a name, an email, or a phone number, and don't know where it lives. When you need several objects in one request. And when you want ranked results, the way a search box behaves.

## Segment 5 (outro)

A customer calls from a phone number: SOSL, across Account, Contact and Lead. Total amount by owner: SOQL. Next up, Lesson 18: a full multi-object SOSL search, returning specific fields for each object.
