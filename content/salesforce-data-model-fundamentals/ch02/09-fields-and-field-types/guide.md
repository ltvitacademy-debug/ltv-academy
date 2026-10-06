# Fields and Field Types

**Chapter 2 · Fields · Lesson 9 of 23**

Chapter 1 covered objects — the tables that hold your company's records. This chapter goes one
level deeper: **fields**, the individual columns inside those tables. Every value you've ever seen
on an Account or a Contact — a name, a phone number, a status — lives in a field. This lesson is
the map of the territory before Lessons 10 through 15 walk through each family of field in detail.

## What you'll learn

- What a field actually is, and how it relates to an object and a record
- The real, three-click path to creating one: Object Manager → an object → Fields & Relationships → New
- The major families of field types Salesforce groups together on that first screen
- Why the data type you pick at Step 1 matters more than almost any other choice you make

## A field is one column, on one object

If an object is a table, a field is one column in that table. The **Account** object has fields
like Account Name, Phone, and Industry. Every **Account record** (one row) has its own value — or
blank — in each of those fields. Fields are where the actual data lives; objects just give that
data a home and a shape.

## Where every field gets created

Every custom field in Salesforce, regardless of type, is created from the same starting point:

1. **Object Manager** — the full list of every object, standard and custom.
2. **The object itself** — click into Account, Contact, or any custom object.
3. **Fields & Relationships** — the left-rail section Lesson 8 already introduced. Click **New**.

![Object Manager's object list, the first stop on the way to any field.](/courses/salesforce-data-model-fundamentals/ch02/09-fields-and-field-types/object-manager-list.png)

That **New** button is the same button for every field type covered in this chapter — a picklist, a
formula, a lookup relationship. What changes is the choice you make on the very next screen.

![The Fields & Relationships list for an object, with the New button that starts every field.](/courses/salesforce-data-model-fundamentals/ch02/09-fields-and-field-types/fields-new-button.png)

## Step 1 is always "choose the data type"

Clicking New opens a screen titled **Step 1. Choose the field type**, grouped into families:

| Family | Examples | Covered in |
|---|---|---|
| Calculated | Formula, Roll-Up Summary | Lessons 12–13 |
| Relationship | Lookup Relationship, External Lookup Relationship, Master-Detail | Lessons 16–18 |
| Simple value | Checkbox, Currency, Date, Date/Time, Number, Text | Lesson 10 |
| Choice | Picklist, Picklist (Multi-Select) | Lesson 11 |

![Step 1 of the New Custom Field wizard, grouping Auto Number, Formula, Roll-Up Summary, the relationship types, Checkbox, Currency, Date, and Date/Time.](/courses/salesforce-data-model-fundamentals/ch02/09-fields-and-field-types/new-field-data-types.png)

Notice that Salesforce doesn't present these alphabetically — it clusters calculated fields
together, then relationship fields, then the simple value types. That grouping is a hint about how
this chapter is organized too.

## Why the Step 1 choice matters so much

Unlike a field's label or its help text, a field's **data type is largely locked in once you save
it**. Salesforce allows some narrow conversions later (Text to Picklist, for instance), but you
can't turn a Number field into a Lookup Relationship after the fact. Picking the right type on Step
1 is the single highest-leverage decision in the whole field-creation flow — get the object right in
Chapter 1, then get the field type right here, and almost everything else (reports, formulas,
automation) falls into place behind it.

## Key terms

| Term | Meaning |
|---|---|
| Field | A single column of data on an object; every record has its own value (or blank) in it |
| Data type | The category of information a field stores, chosen on Step 1 of field creation and rarely changed afterward |
| Fields & Relationships | The Object Manager section listing every field (and relationship) an object has |

## Check yourself

Without opening Salesforce, can you name which family — calculated, relationship, simple value, or
choice — a "Discount Percent" formula field belongs to, and explain why its type can't later become
a Lookup Relationship?
