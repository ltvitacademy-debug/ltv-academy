# Lesson 26 — Package Variables

**Chapter 5 · Variables, Parameters & Expressions · Lesson 26 of 49**

## What you'll learn

- What a variable is in SSIS, and the two namespaces every package uses:
  **User** and **System**
- How to open the **Variables** window and add a user-defined variable
- What **scope** means for a variable, and why it matters which task or
  container you have selected when you create one
- How a variable can hold a literal value *or* an expression, and where
  variables actually get used in a real package

## What a variable actually is

A **variable** stores a value that a package, and the containers, tasks,
and event handlers inside it, can read or update while the package is
running. That's the whole idea — a variable is a small piece of state a
package carries around at run time, the same way a variable in T-SQL or
any programming language holds a value you can check and change.

SSIS ships with two variable namespaces:

- **User** — the namespace every variable you create lands in by default.
  These are the variables you're building packages around.
- **System** — a fixed set of predefined variables SSIS itself maintains
  (`PackageName`, `StartTime`, `TaskName`, and dozens more). You can't add
  to this namespace or delete from it — the only thing you can change on a
  system variable is whether it raises an event when its value changes.

## Opening the Variables window

Every package you build in this course gets its variables through the
**Variables** window, docked by default below the Connection Managers area
in SSIS Designer. If it isn't visible, open it from the **SSIS** menu →
**Variables**.

## Working with the Variables window

1. Click somewhere on the design surface to set the variable's **scope**
   (more on this in a moment), then open the Variables window.
2. Click **Add Variable**. A new row appears in the grid.
3. Set **Name**, **Data Type**, and **Value** directly in the grid, or in
   the Properties window.
4. Optionally, click the ellipsis next to the **Expression** column to
   assign an expression instead of a literal value — the variable then
   re-evaluates that expression instead of holding a fixed value.
5. Click **Grid Options** to show extra columns (Namespace, Raise Change
   Event, Description) that aren't visible by default, or to toggle
   showing system variables and variables of all scopes.

The Variables window only shows two columns — **Name**, **Scope**, **Data
Type**, and **Value** — by default; everything else is one click away
behind Grid Options.

## Scope: why it matters where you click first

A variable's **scope** is either the whole package, or a specific
container, task, or event handler inside it. Scope controls *visibility* —
a variable scoped to a Foreach Loop container is only visible to tasks
inside that loop, while a variable scoped to the package itself behaves
like a global and is visible everywhere.

This is exactly why step 1 above says to click the design surface (or a
specific task) *before* opening the Variables window: whatever is selected
when you click **Add Variable** becomes that variable's scope. If you need
to move a variable to a different scope later, select it and click **Move
Variable** — you can't just edit the Scope column directly.

## A variable set by an expression

A variable's value doesn't have to be a fixed literal. Set
**EvaluateAsExpression** to `True` in the Properties window (or assign an
expression directly from the Variables window's Expression column) and the
variable recalculates its value from an expression every time it's
evaluated. A classic example: a variable that always holds the current
month, using

```
DATEPART("mm", GETDATE())
```

Chapter 5's next two lessons — Parameters and Expressions — build directly
on this: parameters are how you feed *external* values into a package,
and expressions are the language variables and parameters both speak.

## Key terms

| Term | Meaning |
|---|---|
| Variable | A named value a package, container, task, or event handler can read or update at run time |
| User namespace | The default namespace for every variable you create |
| System namespace | The fixed, predefined set of variables SSIS maintains (`PackageName`, `StartTime`, etc.) |
| Scope | The package, container, task, or event handler a variable is visible within |
| EvaluateAsExpression | The variable property that, set to `True`, makes the variable's value the live result of an expression instead of a fixed literal |

## Lab

Using the T-SQL Development course's `AdventureWorks2012` connection from
Lesson 5:

1. Open (or create) a package with an Execute SQL Task that runs
   `SELECT COUNT(*) FROM Sales.SalesOrderHeader`.
2. Click the Control Flow design surface, open the Variables window, and
   add a package-scoped variable named `varOrderCount` with **Data Type**
   `Int32`.
3. On the Execute SQL Task, set **ResultSet** to **Single row**, and on
   the **Result Set** page, map the query's result column to
   `User::varOrderCount`.
4. Add a second variable, `varRunMonth`, with **EvaluateAsExpression** set
   to `True` and **Expression** set to `DATEPART("mm", GETDATE())`. Run the
   package and confirm both variables pick up real values (right-click the
   task → **Add Watch**, or check the Locals window while debugging).

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: what
determines a variable's scope, and what's different about a variable whose
**EvaluateAsExpression** property is `True`?
