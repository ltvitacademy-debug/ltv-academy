# What an Object Is

**Chapter 1 · Objects · Lesson 1 of 23**

Every lesson in this course builds on one idea: the **object**. Get this one concept solid and the
rest of the Salesforce data model — fields, relationships, record types, schema — is just detail
layered on top of it.

## What you'll learn

- What an object is, in plain terms
- The difference between an object, a field, and a record
- Why a spreadsheet is a good starting mental model for an object

## An object is a table

In Salesforce, an **object** is a container for one kind of data — think of it as a table. **Account**
is an object. **Contact** is an object. If your org tracks solar panel installations, you might have
a **Property** object. Each object has its own set of **fields** (the columns) and holds any number
of **records** (the rows).

That's really it:

| Term | What it is | Spreadsheet equivalent |
|---|---|---|
| Object | The table / container for one kind of data | The whole spreadsheet |
| Field | One property every record of that object has | A column header |
| Record | One saved instance of that object | One row |

## A spreadsheet in disguise

Picture a spreadsheet of real estate listings — columns for Price, Bedrooms, Bathrooms, Square
Footage, Listed On. Every row is one property. If you moved that spreadsheet into Salesforce as a
Property object, the columns would become fields and each row would become a record. Salesforce
adds structure around that basic shape — security, relationships, automation, reporting — but the
underlying idea is the same one you already understand from a spreadsheet.

## Every record follows the object's shape

Because all Property records share the same object, they all have the same fields: Price, Bedrooms,
Square Footage, and so on. One record might be "298 Castle St." with a $265,000 price; another might
be "3711 West Elm St." with a different price and no bedroom count filled in yet. Different values,
same shape — that's what it means for records to belong to the same object.

## Key terms

| Term | Meaning |
|---|---|
| Object | A container that defines a type of data (a table) |
| Field | A single property on an object (a column) |
| Record | One saved row of data belonging to an object |

## Recap

- An object defines a shape: a set of fields every record of that type will have.
- A record is one real, saved instance of that shape.
- Standard objects (Account, Contact, Lead...) ship with Salesforce; custom objects are ones an
  admin builds. Lesson 2 starts the standard object tour.

## Check yourself

If two records belong to the same object, what do they always have in common — and what's allowed
to be different between them?
