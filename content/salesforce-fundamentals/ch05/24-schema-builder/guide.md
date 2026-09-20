# Schema Builder

You've now learned Lookup, Master-Detail, and junction objects as concepts — field names and
rules you have to hold in your head. Salesforce also gives you a tool that draws the whole
thing as an actual diagram: **Schema Builder**. For an analyst joining an unfamiliar org,
Schema Builder is often the fastest way to get oriented before writing a single query.

## What you'll learn

- What Schema Builder is and where to find it in Setup
- How to read a Schema Builder object card — and how it displays relationship types by name
- Why a quick look at Schema Builder saves an analyst real time before writing SOQL

## What Schema Builder actually is

**Schema Builder** is a visual, drag-and-drop tool inside Salesforce Setup for viewing and
editing an org's object model. Instead of clicking into Object Manager one object at a time
and mentally tracking which fields point where, Schema Builder lays objects out as connected
cards on a canvas, with lines drawn between them representing the actual relationships.
Admins use it to build new objects, fields, and relationships by dragging elements onto the
canvas — but as an analyst, you don't need to build anything in it. You need to be able to
*read* it: pick a handful of objects, see how they connect, and understand the shape of the
data before you query it.

## Reading an object card

Each object appears on the canvas as a card: a header bar with the object's name, and rows
underneath for its fields. Relationship fields are labeled with their relationship type right
in the field-type column — you'll see labels like `Lookup(Account)` or
`Master-Detail(Property)`, naming both the relationship type and the object it points to,
directly in the row. That's the exact same distinction from the last two lessons, made
visible: you can tell at a glance whether a given field is a loose Lookup or a tight,
cascade-deleting Master-Detail, without opening the field's detail page to check.

## Why this matters before you query anything

Joining an unfamiliar Salesforce org and being handed a request like "pull opportunity line
items by product" is a lot easier after two minutes in Schema Builder than after guessing.
Before writing any SOQL, pulling up the relevant objects in Schema Builder answers the
questions you'd otherwise have to discover the hard way through trial and error: which
objects actually connect to which, whether a given link is Lookup or Master-Detail, and
whether there's a junction object sitting between two objects you expected to be directly
related. It's the practical, visual companion to everything this chapter has taught so far.

## Key terms

| Term | Meaning |
|---|---|
| Schema Builder | Salesforce's visual, drag-and-drop tool for viewing/editing an org's object model |
| Object card | Schema Builder's visual representation of one object and its fields |
| Relationship label | The `Lookup(Object)` / `Master-Detail(Object)` text shown on a relationship field's row |

## Check yourself

You're dropped into an unfamiliar org and asked to report on a custom object you've never
seen before. Why would opening Schema Builder be a better first move than guessing at field
names and writing a SOQL query right away?
