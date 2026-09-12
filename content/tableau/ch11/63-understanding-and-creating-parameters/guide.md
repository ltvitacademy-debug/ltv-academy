# Lesson 63 — Understanding & Creating Parameters

**Chapter 11 · Parameters · Lesson 63 of 95**

## What you'll learn

- What a **parameter** is, and how it differs from a filter or a field
  that comes from your data source
- The properties every parameter has: data type, current value,
  allowable values
- How to build a parameter using the real Create Parameter dialog
- Where a parameter shows up once created, and what it can be used for
  (previewed here, built out over the rest of this chapter)

## What a parameter actually is

Every field you've used so far — dimensions, measures, groups, sets,
bins — comes from your connected data source. A **parameter** is
different: it's a single value that *you* define, that lives in the
workbook itself, completely independent of any data source. Think of it
as a workbook-level variable, similar to a variable in any programming
language, except this one has a control in the view that lets someone
change it interactively.

A parameter by itself doesn't do anything — it's just a value sitting
there. Its power comes from *referencing* that value somewhere else: in
a calculated field, in a filter, in a reference line, or in a
title. The rest of this chapter is entirely about those connections;
this lesson is about the parameter itself.

## Creating a parameter

Right-click empty space in the Data pane and choose **Create
Parameter**:

![Data pane context menu with Create Parameter highlighted, alongside Create Calculated Field and group/sort/hide options.](/courses/tableau/ch11/63-understanding-and-creating-parameters/create-parameter-menu.png)
*The real context menu — Create Parameter sits alongside Create Calculated Field.*
Source: [Tableau Help — Create a Parameter](https://help.tableau.com/current/pro/desktop/en-us/parameters_create.htm)

That opens the Create Parameter dialog:

![Create Parameter dialog with fields for Name, Data type (Float), Display format, Current value, Value when workbook opens, and Allowable values with All/List/Range radio buttons.](/courses/tableau/ch11/63-understanding-and-creating-parameters/create-parameter-dialog.png)
*The real Create Parameter dialog — every property a parameter can have, in one place.*
Source: [Tableau Help — Create a Parameter](https://help.tableau.com/current/pro/desktop/en-us/parameters_create.htm)

Every parameter is configured from the same handful of properties:

| Property | What it controls |
|---|---|
| **Name** | How the parameter appears in the Data pane and in calculations |
| **Data type** | Float, Integer, String, Boolean, Date, or Date & Time — just like a field's data type |
| **Current value** | The value the parameter holds right now |
| **Value when workbook opens** | Whether it resets to the current value or remembers the last value someone set |
| **Allowable values** | *All* (any value of that type), *List* (a fixed dropdown of specific values you define), or *Range* (a slider between a min and max, with a step size) |

**Allowable values** is the setting that shapes how the parameter feels
to use. **All** lets someone type anything. **List** gives a clean
dropdown of the exact choices you want available — the right choice
when you're letting someone pick a measure or a region by name. **Range**
gives a slider — the right choice for something like "target profit
margin," where any number between 0% and 100% should be selectable.

## Where the parameter goes once created

A new parameter appears under its own **Parameters** heading near the
bottom of the Data pane. Right-click it and choose **Show Parameter**
to add a control for it directly on your worksheet — a dropdown for a
List parameter, a slider for a Range parameter. On its own, that control
just displays and lets you change the current value. It doesn't affect
anything in your view yet, because nothing else references it — that
connection is what Lessons 64-67 build.

## Key terms

| Term | Meaning |
|---|---|
| Parameter | A single, workbook-level value, independent of any data source |
| Allowable values | Whether a parameter accepts All values, a fixed List, or a Range with a slider |
| Current value | The value a parameter holds right now |
| Show Parameter | The command that adds a visible control for a parameter to the worksheet |

## Lab

1. In Sample Superstore, right-click the Data pane and choose **Create
   Parameter**. Name it "Profit Margin Target," set the data type to
   Float, and set Allowable values to **Range** with a min of 0, a max
   of 1, and a step size of 0.05.
2. Right-click your new parameter in the Data pane and choose **Show
   Parameter**. Drag its slider and confirm the current value updates —
   even though nothing in the view reacts to it yet.
3. Create a second parameter, this time a **List** type, named "Metric
   Selector," with three string values: "Sales," "Profit," "Quantity."
   Show its control too, and compare how a List parameter feels to use
   versus a Range parameter.

## Check yourself

You're ready for Lesson 64 when you can create a parameter with each of
the three allowable-value types (All, List, Range), show its control on
a worksheet, and explain in one sentence why a parameter by itself
doesn't change anything in your view.
