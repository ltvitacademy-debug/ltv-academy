# Lesson 29 — Dynamic Connection Strings

**Chapter 5 · Variables, Parameters & Expressions · Lesson 29 of 49**

## What you'll learn

- What a **property expression** is, and how it differs from a variable's
  own expression
- The four real dialog boxes involved in building and attaching a
  property expression, and how they connect to each other
- How to set a connection manager's **ConnectionString** property from a
  variable, the pattern behind every Foreach-Loop-over-files package
- When property expressions actually get evaluated relative to package
  configurations

## What a property expression is

A **property expression** is an expression assigned directly to a
read/write property of a task, container, log provider, or connection
manager. When the package runs, that property's value is recalculated
from the expression instead of staying fixed — exactly the mechanism
behind a package that connects to a different file, server, or database
every time it executes.

This is the single most common real-world use of everything Chapter 5
has covered so far: a variable holds the value that changes (Lesson 26),
a parameter can feed that variable from outside the package (Lesson 27),
and a property expression is how that value actually reaches a
connection manager's `ConnectionString` (this lesson), written in the
expression language from Lesson 28.

## The four dialogs that work together

Microsoft's own documentation diagrams exactly how these tools connect:

![A diagram of four real Integration Services dialog boxes and how they connect: the Execute SQL Task Editor's Expressions page opens the Property Expressions Editor, which opens the Expression Builder; the Properties window in Business Intelligence Development Studio opens the same Property Expressions Editor from its Expressions row.](/courses/ssis/ch05/29-dynamic-connection-strings/property-expressions-ui.gif)
*How you actually reach a property expression — through either a task's Expressions page or the Properties window, both leading to the same two dialogs.*

- **The Properties window** (or a task/container's **Expressions** page)
  — where you start. Click the ellipsis next to **Expressions** to open
  the next dialog.
- **The Property Expressions Editor** — maps one property to one
  expression. You can type the expression directly here, or click its
  own ellipsis to open the graphical tool.
- **The Expression Builder** — the same graphical, drag-and-evaluate tool
  from Lesson 28, opened in property-expression context instead of
  variable context.

Connection managers are a special case worth calling out: you can only
reach their property expressions through the **Properties** window (not
an Expressions page), and only after selecting the connection manager in
the Connection Managers area first.

## Setting a ConnectionString by expression

The textbook example — and the one behind every "loop over files in a
folder" pattern in Chapter 2 — is a Flat File connection manager whose
`ConnectionString` is driven by a variable a Foreach Loop container
updates on every iteration:

1. Select the connection manager in the **Connection Managers** area.
2. In the **Properties** window, click the ellipsis next to
   **Expressions**.
3. In the **Property Expressions Editor**, choose **ConnectionString**
   under **Property**.
4. Click the ellipsis in the **Expression** column to open the
   **Expression Builder**, expand **Variables**, and drag in the
   variable — for example `@[User::varFileName]`.
5. Click **OK** on both dialogs, then save the package.

From that point on, every time the Foreach Loop container updates
`varFileName` with the next file's path, the connection manager's
`ConnectionString` updates right along with it, and the data flow
downstream processes a different file on each pass — with zero changes
to the data flow itself.

## Evaluation order matters

Property expressions are evaluated *after* package configurations load,
but *before* validation and execution. That ordering is deliberate: it
means a configuration can update the variable a property expression
depends on, and the expression will still pick up the updated value
before the package actually runs — configurations feed variables, and
variables feed property expressions, in that order, every time.

## Key terms

| Term | Meaning |
|---|---|
| Property expression | An expression assigned to a read/write property, recalculated at run time instead of staying fixed |
| Property Expressions Editor | The dialog that maps one object property to one expression |
| Expressions page | The tab, on some task/container editors, listing that object's property expressions |
| Evaluation order | Configurations load first, then property expressions evaluate, then validation and execution |

## Lab

Rebuild the pattern from Lesson 2's Foreach Loop lab against your own
files:

1. Create a Flat File connection manager pointing at any one text file in
   a folder on your machine.
2. Add a Foreach Loop container using the **Foreach File Enumerator**,
   pointed at that same folder, mapping the enumerated value to a new
   package variable `varFilePath`.
3. Select the Flat File connection manager, open its **Properties**
   window, and set a property expression on **ConnectionString** to
   `@[User::varFilePath]` via the Property Expressions Editor and
   Expression Builder.
4. Put a Data Flow task inside the loop that reads from this connection
   manager, and confirm — via a Data Viewer, from Lesson 18 — that a
   different file's contents flow through on each loop iteration.

## Check yourself

You're ready for Lesson 30 when you can explain, without looking: what
two entry points lead into the Property Expressions Editor, what dialog
it opens in turn, and why must connection manager property expressions be
reached through the Properties window specifically?
