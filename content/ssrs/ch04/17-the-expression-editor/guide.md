# Lesson 17 — The Expression Editor

**Chapter 4 · Expressions & Formatting · Lesson 17 of 40**

## What you'll learn

- How to open the **Expression** dialog box on any property that
  accepts one
- The four regions of that dialog, and what each one is for
- What lives under **Category** — Parameters, Fields (Expressions),
  Datasets, Variables, Operators, and the **Common Functions** subtree
- How the built-in Description and Example panel helps you pick the
  right function without leaving the dialog

## Opening the dialog

Almost every property on a report item — a text box's **Value**, its
**Color**, a rectangle's **Fill**, a data region's **BackgroundColor**
— can be set to a literal value or to an expression. Whenever you see
an **fx** button next to a property, or the property is a text box on
the design surface, you can right-click it and choose **Expression**
to open the same dialog box. Anything you build in the Expression
dialog gets saved starting with an equal sign (`=`) and evaluated by
the report processor when the report runs.

## Reading the dialog box

![The Expression dialog box after inserting the Left function — Category tree on the left, Item list in the middle, Description and Example on the right.](/courses/ssrs/ch04/17-the-expression-editor/expression-editor-left-function.png)
*Category, Item, and a live Description/Example — before you've typed a character yourself.*

The dialog is really four regions working together:

1. **The expression text area** at the top, labeled `Set expression
   for: <property name>` — this is the actual text you're building,
   starting with `=`.
2. **Category**, a tree on the left — the built-in collections
   (`Parameters`, `Fields (Expressions)`, `Datasets`, `Variables`,
   `Operators`) and a `Common Functions` node that expands into
   `Text`, `Date & Time`, `Math`, `Inspection`, `Program Flow`,
   `Aggregate`, `Financial`, `Conversion`, and `Miscellaneous`.
3. **Item**, a list in the middle — whatever belongs to the category
   you've selected. Select `Common Functions > Text` and `Item` fills
   with `Left`, `Len`, `LCase`, `InStr`, and the rest of the string
   functions.
4. **Description** and **Example**, on the right — the moment you
   click an item, this panel shows what it does and a real, working
   example expression using it. In the screenshot above, selecting
   `Left` shows "Returns a string containing a specified number of
   characters from the left side of a string" and the example
   `=Left(Fields!Description.Value,4)`.

Double-clicking anything in **Item** inserts it into the expression
text area at the cursor position — you don't type function names from
memory, you pick them.

## Why this matters before you write a single expression

Lessons 18–21 all build expressions inside this same dialog — decision
functions, field and parameter references, conditional colors, number
and date formats. None of that requires memorizing syntax up front:
the Category tree tells you what's available, and the Description
panel tells you how to use it, every single time you open it.

## Key terms

| Term | Meaning |
|---|---|
| Expression dialog | The dialog box, opened via **Expression** or an **fx** button, for building any property's expression |
| Category | The left-hand tree of built-in collections and function groups |
| Common Functions | The Category subtree of function groups: Text, Date & Time, Math, Program Flow, Aggregate, and more |
| Item | The middle list — the actual fields/functions available for the selected Category |
| Description / Example | The right-hand panel showing what a selected item does, with a working example |

## Lab

1. Open Report Builder (or SSDT) with any report that has at least one
   text box, and right-click it to select **Expression**.
2. In **Category**, expand **Common Functions** and select **Text**.
   Click through a few items in the **Item** list and read their
   **Description** and **Example**.
3. Select **Fields (Expressions)** in **Category** and confirm the
   **Item** list now shows your dataset's actual field names instead
   of functions.

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: what
are the four regions of the Expression dialog box, and what does
double-clicking an item in the **Item** list actually do?
