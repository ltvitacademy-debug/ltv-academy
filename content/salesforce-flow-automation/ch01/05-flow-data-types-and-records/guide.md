**Chapter 1 · Flow Foundations · Lesson 5 of 31**

# Flow Data Types and Records

Lesson 4 showed you where the Data Type dropdown lives when you create a variable. This lesson
covers what's actually in that dropdown, and the one data type that matters more than any other
for this course: Record. Chapter 2's record-triggered flows depend entirely on understanding how a
flow holds and works with a Salesforce record.

## What you'll learn

- The core data types a variable can hold: Text, Number, Currency, Boolean, Date, Date/Time
- What a Record variable is, and how it differs from the other data types
- Where a flow gets its first record variable from, without you building one
- How a Data element like Create Records sets values onto real Salesforce fields

## The core data types

When you create a variable, the Data Type you pick tells the flow what kind of value it can hold —
just like picking a field type when you create a custom field:

![The New Resource window, with the Data Type field highlighted among Resource Type, API Name, and Description.](/courses/salesforce-flow-automation/ch01/05-flow-data-types-and-records/new-resource-window.png)

- **Text** — a string of letters, numbers, and characters; also what you'd use to hold just a
  Salesforce record ID without the whole record
- **Number, Currency** — numeric values (no currency symbols in the value itself)
- **Boolean** — true or false, using the True/False global constants — not the literal words
  "true"/"false", which Flow Builder reads as plain text
- **Date, Date/Time** — a specific date, or a specific date and time together
- **Record** — all the values from one Salesforce record, stored together in a single variable

## Record: the data type this course leans on most

A **Record** variable is different from the others: it holds every field value from one Salesforce
record at once, each still in its own data type, exactly like the record itself. The flow can read
or update any individual field inside it. This is what makes record-triggered flows (Chapter 2)
work at all — the flow needs somewhere to hold the record that triggered it.

In fact, every record-triggered flow starts with exactly this: a **Start** element where you pick
which object's records the flow should care about.

![The Start element's Configure Start panel, with the Object field for selecting which object's records trigger the flow.](/courses/salesforce-flow-automation/ch01/05-flow-data-types-and-records/start-element-record-trigger.png)

Once that object is selected, Salesforce automatically gives the flow a record variable holding
the triggering record — you don't build this one by hand. Chapter 2 calls this the **Triggering
record**.

## Working with records through a Data element

Data elements (Lesson 3) are how a flow actually reads or writes real Salesforce records. Create
Records, for example, lets you set field values manually or from a record variable:

![The New Create Records screen, with fields for Label, API Name, How Many Records to Create, and How to Set the Record Fields.](/courses/salesforce-flow-automation/ch01/05-flow-data-types-and-records/new-create-records-screen.png)

Notice this screen asks *how* to set the new record's field values — manually, one field at a
time, or by copying values from an existing record variable. Both approaches rely on the data
types lining up: a Text variable can't be dropped into a Date field, for instance.

## Key terms

| Term | Meaning |
|---|---|
| Data Type | What kind of value a variable can hold (Text, Number, Boolean, Date, Record...) |
| Record variable | A variable holding every field value from one Salesforce record |
| Triggering record | The record variable a record-triggered flow is automatically given at Start |
| Boolean | A true/false value, using Flow's True/False global constants |

## Check yourself

Why can't you just store a Salesforce record's Amount, Stage, and CloseDate in three separate Text
variables instead of using one Record variable?
