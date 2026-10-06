# Lesson 19 — Transform Element and Data Manipulation

**Chapter 3 · Flow Logic · Lesson 19 of 31**

## What you'll learn

- What the Transform element does, and how it differs from a Loop
- Source Data and Target Data — mapping fields with a line, not a loop body
- Formula vs. Value — the two ways to set a target field that isn't a direct mapping
- Why Salesforce now recommends Transform over Loop+Assignment+Update for bulk changes

## Transform reshapes a whole collection at once

The **Transform** element copies the values of one or more components or variables — single or collection — into a new, auto-generated variable, while also letting you change the copy's values along the way. Unlike a Loop, there's no per-item path to build: you configure the mapping once, and it applies to every record.

A Transform element has two sides: **Source Data** (what you're copying from) and **Target Data** (the shape of what you want out — a record, a collection of records, or other resource types, which you configure with a Data Type and, for records, an Object).

## Mapping fields: draw a line, don't write a loop

Once both sides are set, you map individual fields by clicking the connector icon next to a source field, then the matching target field. A line appears connecting them — Salesforce calls this a **mapping**:

![A Transform element's Source Data and Target Data columns, with a mapping line connecting the source's Id field to the target's Id field.](/courses/salesforce-flow-automation/ch03/19-transform-element-and-data-manipulation/transform-mapping-line.png)

Only target fields with a **compatible data type** highlight as mappable when you select a source field — Transform won't let you draw a line between, say, a Date and a Checkbox.

## When a straight mapping isn't enough: Formula or Value

Not every target field has a one-to-one source to map from. For those, click the **fx** icon next to the target field:

![The Target Data column with an fx (Add or edit formula) icon highlighted next to a Status field, pointed at with an arrow.](/courses/salesforce-flow-automation/ch03/19-transform-element-and-data-manipulation/transform-add-formula-panel.png)

That opens a choice between two ways to set the field:

![Two states of the fx menu: choosing Value from the Formula/Value dropdown, then entering a static Value of "Closed" for the Status field and clicking Done.](/courses/salesforce-flow-automation/ch03/19-transform-element-and-data-manipulation/transform-check-syntax.jpg)

**Formula** references another resource in the flow — a screen component's selection, a variable, anything you could use in a flow formula elsewhere. **Value** sets the same static value for every record in the target collection, with no formula involved at all — exactly what you'd use to set every selected record's Status to "Closed" in one step.

## Why Transform, not Loop + Assignment + Update Records

For years, the standard way to bulk-edit a collection was: Loop over it, Assignment to change each item's in-memory values, then one Update Records element after the loop to save them all. That pattern still works, and the lesson on Loops covered exactly it. But Salesforce's own guidance is now explicit: Transform elements run roughly **10 times faster** than loops performing the same task, and they scale better as flows get more complex — which also reduces the chance of hitting the flow execution time limit.

The rule of thumb: **if something can be done with either a Transform or a Loop, use Transform.** Reach for a Loop only when the task genuinely can't be expressed as a Transform — for example, when each iteration needs to call an Action (like sending an email) rather than just reshape data.

## Key terms

| Term | Meaning |
|---|---|
| Source Data / Target Data | The two sides of a Transform element — what you copy from, and the shape you want out |
| Mapping | A line connecting a source field directly to a compatible target field |
| Formula vs. Value | Formula references a flow resource; Value sets the same static value for every record |

## Check yourself

A flow needs to set every selected record's Status field to "Closed" and copy each record's Id unchanged. Which target field gets a mapping line, and which one gets a Value instead — and why wouldn't a Formula be the right choice for the Status field here?
