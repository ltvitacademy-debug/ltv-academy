# Lesson 31 — Data-Driven Subscriptions

**Chapter 7 · Subscriptions & Delivery · Lesson 31 of 40**

## What you'll learn

- What makes a subscription "data-driven," and why it exists as a
  separate mechanism from a standard subscription
- Where the recipient list, delivery settings, and parameter values
  actually come from at run time
- What the **Dataset** and **Query** sections of the subscription wizard
  ask you to supply, and why
- The two things a query's result set controls: which columns you can
  map to settings, and how many deliveries get generated

## Same report, different recipient every row

A **data-driven subscription** doesn't have one fixed set of delivery
settings the way a standard subscription (Lesson 30) does. Instead, it
queries a subscriber database each time it runs, and uses whatever comes
back to determine the recipients, the delivery settings, and the report
parameter values for that run. It's the mechanism you reach for when the
list of who gets a report — or what parameters they see it with — changes
over time and shouldn't require editing a subscription by hand every time
it does.

This option is only available to users with advanced permissions, and
under default security it can't be used for reports sitting in a personal
My Reports folder.

## You need a query — and a place to run it from

Before a data-driven subscription can do anything, you have to define the
**dataset** it runs against: a data source (shared or custom) plus a
query or command that returns the values the subscription needs.

![Dataset section prompting to create a dataset, with an Edit Dataset button, before a data-driven subscription can be defined.](/courses/ssrs/ch07/31-data-driven-subscriptions/dataset-section.png)
*You can't define a data-driven subscription until you supply a dataset.*

Selecting **Edit Dataset** takes you to the **Query** section, where you
write the actual query or command. The screen lists exactly which fields
you'll need columns for — it varies depending on which delivery method
and report parameters you've chosen elsewhere in the wizard.

![Query section listing the delivery options and report parameters a query's columns need to supply, with a query text box and a query-timeout field.](/courses/ssrs/ch07/31-data-driven-subscriptions/query-section.png)
*Delivery options and report parameters the query's result columns must cover.*

Two facts about that result set matter more than anything else:

- **Columns** determine what you can map to delivery settings and
  parameters — an e-mail data-driven subscription, for instance, needs a
  column of e-mail addresses.
- **Rows** determine how many deliveries get generated. Ten thousand rows
  means ten thousand separate deliveries, one per row.

Microsoft's own advice is worth repeating: run the query in SQL Server
Management Studio first, and check the results look right, before you
ever paste it into the subscription wizard. It's much easier to debug a
query on its own than inside the wizard's query-timeout window.

## After the query: mapping fields

Once the query validates, you assign each required field — recipient
address, file path, a report parameter, whatever the wizard is asking
for — either to a literal value you type in, or to a column from the
dataset you just built. That mapping step is what actually turns raw
query columns into "who gets this report, with what parameters, delivered
how."

## Key terms

| Term | Meaning |
|---|---|
| Data-driven subscription | A subscription that queries a subscriber database at run time to determine recipients, delivery settings, and parameters |
| Dataset (subscription) | The data source + query pair a data-driven subscription runs against |
| Query timeout | How long the subscription's query is allowed to run before it's considered failed |
| Result set columns | What you're allowed to map to delivery settings and report parameters |
| Result set rows | How many separate report deliveries get generated — one per row |

## Lab

1. In SQL Server Management Studio, write and run a query against a
   subscriber-style table (a list of names, e-mail addresses, and any
   report parameter values you want to vary) and confirm the columns and
   row count look right.
2. Start a data-driven subscription for a report whose data source
   supports it, select **Edit Dataset**, and paste in the same query.
3. Validate the query in the wizard, then map each required field —
   recipient e-mail, and any report parameters — to the matching column.
4. Compare the row count from your Management Studio test to the number
   of deliveries you'd expect the subscription to generate.

## Check yourself

You're ready for Lesson 32 when you can explain, without looking: what two
things does a data-driven subscription's query result set actually
control, and why do rows in that result set matter as much as columns do?
