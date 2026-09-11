# Lesson 27 — Project & Package Parameters

**Chapter 5 · Variables, Parameters & Expressions · Lesson 27 of 49**

## What you'll learn

- What a **parameter** is, and how it differs from a variable
- The difference between a **project parameter** and a **package
  parameter**, and when to use each
- The three layers a parameter's value can come from — design, server,
  and execution — and which one wins
- Where to create each kind of parameter in SQL Server Data Tools

## Parameters vs. variables

A **variable** holds state a package manages internally while it runs. A
**parameter** is different: it's how you feed a value *into* a package
from the outside, at the moment it executes — without opening the package
and editing it. That's the whole point of parameters: they let you
"modify package execution without having to edit and redeploy the
package," in Microsoft's own words.

Integration Services gives you two parameter scopes:

- **Project parameters** — created at the project level, in the
  **Project.params** file. Any package in the project can use a project
  parameter, which makes it the right choice for a value every package
  needs — a shared source folder path, an environment name.
- **Package parameters** — created at the package level, on that
  package's **Parameters** tab. Only that one package can use it.

## Creating package parameters

Every package has its own **Parameters** tab in SSIS Designer, right next
to Control Flow and Data Flow.

![The Parameters tab in SSIS Designer, showing an empty grid with Name, Data type, and Value columns, and toolbar icons for adding and deleting parameters.](/courses/ssis/ch05/27-project-and-package-parameters/package-parameters-tab.gif)
*The Parameters tab — package-scoped parameters live here, one tab over from Control Flow.*

Click **Add Parameter**, then fill in **Name**, **Data Type**, and
**Value** either directly in the grid or in the Properties window. Two
properties are worth calling out:

- **Sensitive** — encrypts the value in the catalog once deployed; it
  reads back as `NULL` from T-SQL or SSMS. Use this for connection
  passwords or API keys.
- **Required** — forces a real value (not just the design default) to be
  supplied before the package is allowed to execute.

## Creating project parameters

Project parameters live in one shared file per project, **Project.params**,
visible in Solution Explorer.

![Solution Explorer showing the Project.params node highlighted under an Integration Services project, next to the Project.params design window listing Name, Data type, Value, Sensitive, Required, and Description columns.](/courses/ssis/ch05/27-project-and-package-parameters/project-parameters-window.gif)
*Project.params in Solution Explorer — one parameter list every package in the project can read.*

Double-click **Project.params** to open it, then add parameters exactly
the same way as package parameters: **Add Parameter**, then set Name,
Data Type, Value, Sensitive, and Required.

## Three layers of value: design, server, execution

Once a project is deployed to the SSISDB catalog, a parameter can pick up
its final value from three different places, and only one wins per run:

1. **Design Value** — the default set at design time in SSDT. Persists
   with the project.
2. **Server Value** — set after deployment, in SSMS or by
   `catalog.set_object_parameter_value`. Overrides the design default for
   every execution unless something more specific is supplied.
3. **Execution Value** — set for one specific run only (via the Execute
   Package dialog, or `dtexec /Parameter`). Overrides everything else,
   but only for that single execution.

If a parameter is marked **Required**, a server or execution value must
exist — the design default alone won't let the package run once deployed.

## Key terms

| Term | Meaning |
|---|---|
| Parameter | A value supplied to a package at execution time, without editing the package |
| Project parameter | Defined once in Project.params; usable by every package in the project |
| Package parameter | Defined on one package's Parameters tab; usable only by that package |
| Design value | The default value set at design time in SSDT; persists with the project |
| Server value | The value set on the deployed project in the SSISDB catalog; overrides the design value |
| Execution value | The value set for one specific run; overrides both design and server values |

## Lab

Using the `AdventureWorks2012` connection from Lesson 5:

1. Open a package with an Execute SQL Task that runs
   `SELECT * FROM Person.Person WHERE BusinessEntityID = ?`.
2. On the package's **Parameters** tab, add a package parameter named
   `PersonId`, **Data Type** `Int32`, **Value** `1`, **Required** checked.
3. Map `PersonId` to the query's parameter on the Execute SQL Task's
   **Parameter Mapping** page.
4. Open **Project.params** and add a project parameter named
   `SourceFolder`, **Data Type** `String`, with a default value of a real
   folder path on your machine. You won't wire it to anything yet — just
   confirm it appears in Project.params and is visible from more than one
   package if your project has several.

## Check yourself

You're ready for Lesson 28 when you can explain, without looking: what's
the difference between a project parameter and a package parameter, and
which of the three parameter value layers — design, server, execution —
wins when more than one is set?
