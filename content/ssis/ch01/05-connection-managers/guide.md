# Lesson 5 — Connection Managers

**Chapter 1 · SSIS Fundamentals · Lesson 5 of 49**

## What you'll learn

- What a connection manager actually is: a design-time description of a
  connection, not the connection itself
- The difference between a package-level and a project-level
  connection manager
- The exact steps to add one, and where the built-in types come from
- Why a package can use the same connection manager type more than once

## A connection manager is a description, not a connection

Every task, source, or destination that needs to reach outside a
package — a database, a flat file, an FTP server — does it through a
**connection manager**. A connection manager is a *logical*, design-
time representation: at design time, you set properties like
**ConnectionString**; at run time, Integration Services uses those
properties to create the actual physical connection when the package
executes. A package can hold multiple instances of the same connection
manager type — say, two separate OLE DB connection managers pointed at
two different databases — each configured independently.

## Where you add one: the Connection Managers area

Every package has a **Connection Managers** area docked along the
bottom of the **Control Flow**, **Data Flow**, and **Event Handlers**
tabs in SSIS Designer.

![SSIS Designer's Control Flow tab, with the Toolbox on the left, a package's tasks and a Foreach Loop container on the canvas, and the Connection Managers strip along the bottom.](/courses/ssis/ch01/05-connection-managers/samplecontrolflow.gif)
*The Connection Managers strip at the bottom — right-click there to add one.*

Right-click anywhere in that strip and you can either pick a common
connection manager type directly, or choose **New Connection** to open
the **Add SSIS Connection Manager** dialog box, which lists every
built-in type — OLE DB, ADO.NET, Flat File, Excel, FTP, HTTP, ODBC, and
more. Selecting a type and clicking **Add** (or **OK**) opens that
type's own configuration editor, where you set the actual connection
details.

## Package-level vs. project-level

That's the **package-level** path — the connection manager only exists
inside that one package. But a project using the *project deployment
model* also has a **Connection Managers** node right in **Solution
Explorer**, at the project level. A connection manager created there is
available to *every* package in the project, and shows up in each
package's Connection Managers area with a `(project)` prefix on its
name — a clear visual signal that it isn't owned by that package alone,
and can't be renamed from inside it.

Use project-level connection managers for anything genuinely shared —
the data warehouse every package in your project loads into, for
example — and package-level ones for anything specific to a single
package's job.

## Adding a connection manager, step by step

1. In SSIS Designer, make sure the **Control Flow**, **Data Flow**, or
   **Event Handlers** tab is active — that's what makes the Connection
   Managers area available.
2. Right-click anywhere inside the Connection Managers area.
3. Pick a listed type directly, or choose **New Connection** to open
   the **Add SSIS Connection Manager** dialog box and pick from the
   full list.
4. The type's configuration editor opens — set the server, file path,
   or credentials it needs, and select **OK**.
5. Optionally rename the new connection manager to something
   descriptive — `localhost.AdventureWorksDW`, not
   `OLEDB Connection Manager 1`.

## Key terms

| Term | Meaning |
|---|---|
| Connection manager | A design-time description of a connection; the physical connection is created at run time |
| Connection Managers area | The strip on the Control Flow, Data Flow, and Event Handlers tabs where you add package-level connections |
| Package-level connection manager | Exists only inside the package that created it |
| Project-level connection manager | Created in Solution Explorer; shared by every package in the project, shown with a `(project)` prefix |
| Add SSIS Connection Manager dialog | Lists every built-in connection manager type available to add |

## Lab

1. Open your Lesson 2 project's `Package.dtsx`, right-click in the
   Connection Managers area, and select **New Connection** to see the
   full list of built-in types in the **Add SSIS Connection Manager**
   dialog box.
2. Add an **OLE DB** connection manager pointed at any local SQL Server
   instance you have available, and rename it to describe what it
   connects to.
3. If your project uses the project deployment model, right-click
   **Connection Managers** in Solution Explorer and add a second
   connection manager at the project level — then confirm it appears
   in your package's Connection Managers area with a `(project)`
   prefix.

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: the
difference between a package-level and a project-level connection
manager, and why a connection manager's properties at design time
aren't the same thing as the physical connection at run time.
