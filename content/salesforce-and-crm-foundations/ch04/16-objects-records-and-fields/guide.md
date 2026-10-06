# Lesson 16 — Objects, Records and Fields

**Chapter 4 · Using Salesforce · Lesson 16 of 20**

## What you'll learn

- The three-level data model every Salesforce user and admin relies on: objects, records, and fields
- The difference between standard objects and custom objects
- How tabs in the Salesforce interface map directly to objects
- How this model connects back to metadata and data from Lesson 13

## Welcome to Chapter 4

Chapter 3 was about how Salesforce works under the hood. Starting here, Chapter 4 is about actually *using* it — the screens, clicks, and everyday vocabulary you'll live in as a student and, soon, as a working admin.

## The three-level data model

Nearly everything you'll ever do in Salesforce comes back to three nested concepts:

- **Object** — a table that defines a *type* of thing your business tracks. Account, Contact, Lead, and Opportunity (which you met back in Lesson 3) are all objects. An object defines the structure: what fields exist, how it relates to other objects, what automation can run against it.
- **Record** — one specific instance of an object. If Account is the object, "Acme Corp" is a record. If Contact is the object, "Maria Gomez" is a record. This is the same idea as "data" from Lesson 13: a record is actual business information.
- **Field** — one piece of information captured on a record. An Account record has fields like Account Name, Industry, Phone, and Billing Address. A field is part of the object's definition (metadata), and every record of that object has its own value stored in that field.

A simple way to anchor this: **object is the spreadsheet, record is the row, field is the column.**

## Standard objects vs. custom objects

Salesforce ships with a set of **standard objects** already built in and ready to use — Account, Contact, Lead, Opportunity, Case, Campaign, and dozens more, each purpose-built for common business needs. You never have to build these from scratch.

When a business has data that doesn't fit any standard object, admins create **custom objects** — for example, a property management company might create a custom "Property" object, or a university might create a custom "Course" object. Custom objects behave exactly like standard objects once created: they get their own fields, their own records, their own tab.

## Tabs are how you reach objects

In the Salesforce interface, each object you have access to typically has a corresponding **tab** — Accounts, Contacts, Opportunities, and so on — that takes you to a list of that object's records. When Setup shows "Navigation Items" for an app (which you'll explore more in the next lesson), it's really choosing which object tabs that app exposes.

![Real screenshot of the Salesforce "New Lightning App" setup wizard's Navigation Items step, showing a Selected Items list of Home, Price Books, Products, Opportunities, Reports, and Dashboards.](/courses/salesforce-and-crm-foundations/ch04/16-objects-records-and-fields/navigation-items-objects.png)
*Each item in this list — Price Books, Products, Opportunities, Reports, Dashboards — is a tab pointing at an object. Choosing an app's navigation items is choosing which objects that app surfaces.*
Source: [Salesforce Ben — How to Create a Custom App in Salesforce](https://www.salesforceben.com/how-to-create-a-custom-app-in-salesforce/)

## Key terms

| Term | Meaning |
|---|---|
| Object | The definition of a type of thing tracked in Salesforce — the "table" |
| Record | One specific instance of an object — a "row" of actual data |
| Field | One piece of information on a record — a "column" |
| Standard object | A pre-built object Salesforce ships with (Account, Contact, Opportunity, etc.) |
| Custom object | An object an admin creates for business needs standard objects don't cover |

## Lab

1. In your org, click the Accounts tab and open any record. Identify three fields on that record.
2. In Setup → Object Manager, scroll the full list and count how many objects have a label ending in "__c" — these are custom objects (the "__c" suffix is Salesforce's standard marker for anything custom).
3. In one sentence, explain the difference between a record and a field to someone who has never used Salesforce.

## Check yourself

You're ready for Lesson 17 when you can define object, record, and field without hesitating, and you can correctly point to a real example of each in a live Salesforce org.
