# Script — Field Types

## Segment 1 (title)

Lesson 16 drew the line between standard and custom objects. Every field on either kind of object also has a type — the kind of data it's allowed to hold — and that type has direct consequences for how an analyst can filter and group on it.

## Segment 2 (code: the core types)

Text, Number, and Currency hold raw values — currency also carries a currency code. Date and Date-Time hold calendar values. Picklist restricts a field to a predefined list. Lookup points to a record on another object. Formula calculates its value automatically from other fields.

## Segment 3 (steps: why this matters practically)

A Picklist's exact stored values are configured per org, so a filter written for one org's "In Progress" can silently miss everything in an org that calls it "Working." A Lookup field stores a relationship, like a Case pointing to its Contact. A Formula field computes its value automatically — you can't just type a new value into it.

## Segment 4 (outro)

Before writing any filter or grouping against a picklist field, always check that org's actual configured values first. Next up: Record Types — how the same object can run two different business processes at once.
