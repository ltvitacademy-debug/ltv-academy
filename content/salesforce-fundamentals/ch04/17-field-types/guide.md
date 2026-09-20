# Field Types

Lesson 16 drew the line between standard and custom objects. Every field on either kind of
object also has a **field type** — the kind of data it's allowed to hold — and that type
has direct, practical consequences for how an analyst can filter, group, and aggregate on
it. Getting a field type wrong isn't just a technicality; it's how a report quietly returns
the wrong numbers.

## What you'll learn

- The common Salesforce field types and what each one is built to hold
- Why a Picklist's exact stored values matter more than they look like they should
- The difference between a Lookup field and a Formula field, and why that difference matters for reporting

## The core field types

Salesforce fields come in a fixed set of types, each suited to a different kind of data:

- **Text** — free-form characters, like a Case Subject or a Contact's Title
- **Number** — a plain numeric value, like a quantity
- **Currency** — a monetary amount, stored with a currency code attached (important in
  multi-currency orgs, where the same numeric value can mean very different things)
- **Date / Date-Time** — a calendar date, optionally with a time component
- **Picklist** — a field restricted to a predefined list of values, like Case Status or
  Opportunity Stage
- **Lookup** — a relationship field that points to a record on another object, like a
  Case's lookup to its Contact
- **Formula** — a field whose value is calculated automatically from other fields, and
  can't be edited directly by a user

## Why a Picklist's exact values matter

A **Picklist** looks simple — a dropdown with a fixed set of choices — but its exact
stored values are exactly what an analyst filters and groups by, and those values are
configured per org (a theme that's come up throughout this course). If one org's Case
Status picklist uses "In Progress" and another uses "Working," a report filter or grouping
written for one will silently return nothing, or worse, an incomplete result, in the other.
Before writing any filter or grouping against a picklist field, check the actual configured
values in that org rather than assuming a value from a previous project or from this
course's examples.

## Lookup vs. Formula: where a field's value actually comes from

A **Lookup field** stores a reference to another record — it's how a Case knows which
Contact it belongs to, or an Opportunity knows which Account it's tied to. A **Formula
field**, by contrast, doesn't store a relationship or raw input at all; its value is
computed automatically from other fields (for example, a formula field might calculate
"Days Open" from a Case's Created Date). The distinction matters for an analyst because a
Formula field's value can change on its own as the fields it depends on change, and because
you can't just "add" a value to it the way you could a Text or Number field — its content
is entirely dictated by its formula.

## Key terms

| Term | Meaning |
|---|---|
| Picklist | A field restricted to a predefined, org-configured list of values |
| Lookup field | A field storing a reference to a record on another object |
| Formula field | A field whose value is calculated automatically from other fields |
| Currency field | A monetary field stored with a currency code attached |

## Check yourself

Why is it risky for an analyst to write a report filter against a Picklist value they
remember from a different Salesforce org, without first checking that org's actual
configured values?
