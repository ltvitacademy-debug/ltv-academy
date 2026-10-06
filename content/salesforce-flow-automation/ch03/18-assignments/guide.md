# Lesson 18 — Assignments

**Chapter 3 · Flow Logic · Lesson 18 of 31**

## What you'll learn

- What the Assignment element actually changes — and what it doesn't
- The three columns every assignment row has: Variable, Operator, Value
- How the Add operator uses Assignment to build up a collection
- Why Assignment and Update Records are almost always a two-step combination

## Assignment changes a variable's value — nothing more

The **Assignment** element sets the value of a variable. That's the whole job. It does **not** save anything to Salesforce by itself — it only changes what a variable holds in memory, for the rest of the flow's run. Each row in an Assignment element has three parts: a **Variable** to change, an **Operator** that controls how, and a **Value** to use.

## A real one: setting multiple fields, then adding to a collection

Here's an Assignment element named **Set New Opportunity Values**, with five rows:

![The Assignment configuration panel, "Set New Opportunity Values": four rows set NewOpportunity's Account ID, Amount, Description, and Stage fields using the Equals operator, and a fifth row uses the Add operator to add NewOpportunity to the NewOpportunities record collection.](/courses/salesforce-flow-automation/ch03/18-assignments/assignment-example-record-collection.png)

The first four rows all use **Equals** — each one replaces the named field's current value with whatever's on the right. The fifth row is different: **Variable** is `NewOpportunities` (a *collection*), the **Operator** is **Add**, and the **Value** is the single `NewOpportunity` record variable just built by the rows above. That one row appends the record to the collection — this is exactly how a flow builds up a record collection one record at a time, before handing the whole thing to a Create Records element downstream.

## A simpler one: a single text value

Not every Assignment element needs five rows. Here's one with just one, setting an error message that a fault path displays to the user:

![The Assignment configuration panel, "Set Error Message": a single row sets the errorMessage variable Equals "We couldn't find a record with the sp..." (a literal text value).](/courses/salesforce-flow-automation/ch03/18-assignments/assignment-example-literal-string.png)

Same three columns, same Equals operator — just one row, assigning a literal string instead of pulling from another resource.

## Assignment and Update Records: two steps, one outcome

Because Assignment only changes values in memory, it's almost always paired with a data element afterward to actually make the change stick. Here's that pattern in a complete flow: a screen asks the user whether to copy the billing address or enter one manually, a Decision element branches on their choice, and **two separate Assignment elements** — one per branch — set the shipping address fields on the same record variable:

![The Flow Builder canvas: Get Account Data feeds Enter Address (a screen), which feeds a Use Billing Address? Decision element; its Selected path runs a Copy Billing Address Assignment element, its Not Selected path runs a Set Address from Screen Assignment element, and both merge into a single Update Account (Update Records) element before End.](/courses/salesforce-flow-automation/ch03/18-assignments/assignment-flow-canvas.png)

Notice both Assignment elements feed into the **same** Update Account element. Whichever branch ran, the record variable now holds the right shipping address in memory — and the single Update Records element at the end is what actually commits it to the database. Assignment decides *what* the value should be; Update Records (or Create Records) decides *that it gets saved*.

## Key terms

| Term | Meaning |
|---|---|
| Variable / Operator / Value | The three columns of every Assignment row |
| Equals | Replaces the variable's current value with the new one |
| Add | Appends a value (often a record) onto a collection variable |

## Check yourself

An Assignment element sets a record variable's Status field to "Closed," but the flow never includes an Update Records or Create Records element afterward. What actually happens to that record in Salesforce?
