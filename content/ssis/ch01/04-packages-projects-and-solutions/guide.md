# Lesson 4 — Packages, Projects & Solutions

**Chapter 1 · SSIS Fundamentals · Lesson 4 of 49**

## What you'll learn

- What a package actually contains, beyond just "control flow and data
  flow"
- How packages nest inside projects, and projects nest inside solutions
- The three file extensions — `.dtsx`, `.dtproj`, `.sln` — and what
  each one is responsible for
- What Solution Explorer shows you the moment a new project exists

## A package's real contents

A **package** (`.dtsx`) is more than the control flow and data flow you
met in Lesson 1. Formally, it's an organized collection of:

- **Tasks and containers** (control flow) — connected by precedence
  constraints that decide execution order
- **Sources, transformations, and destinations** (data flow) — but
  only inside a Data Flow Task; a package's control flow must include
  one before it can have a data flow at all
- **Connection managers** — the links between the package and the
  outside data it reads or writes
- **Event handlers, variables, parameters, and logging** — the
  supporting cast that makes a package configurable and observable

![A package containing a control flow with a Data Flow Task, and the data flow of source, transformation, and destination that task runs.](/courses/ssis/ch01/04-packages-projects-and-solutions/ssis-package.gif)
*A package's control flow, with a Data Flow Task's own data flow inside it.*

## Packages live inside projects

A **project** is the container you actually develop in — it's what
holds one or more packages plus everything they share: project-level
connection managers, project parameters, and package parts. When you
created your project in Lesson 2, SSDT gave you a project with exactly
one package inside it; nothing stops you from adding more packages to
that same project as your solution grows.

## Projects live inside solutions

A **solution** is one level up again — a container that groups one or
more *projects*, which is useful the moment your work spans more than
one project type (an Integration Services project alongside a
Reporting Services project, say). SSDT creates a solution for you
automatically the first time you create a project, even though, by
default, the solution itself doesn't show as its own node in Solution
Explorer unless you turn that setting on.

## What Solution Explorer actually shows you

Open **Solution Explorer** on any Integration Services project and
you'll see a consistent set of folders:

![Solution Explorer showing the Project.params file, Connection Managers, SSIS Packages, Package Parts, and Miscellaneous folders inside an Integration Services project.](/courses/ssis/ch01/04-packages-projects-and-solutions/ssis-solution-explorer.png)
*The standard folders inside every Integration Services project.*

- **Connection Managers** — project-level connection managers, shared
  by every package in the project
- **SSIS Packages** — every `.dtsx` package in the project
- **Package Parts** — reusable control-flow fragments you can import
  into multiple packages
- **Miscellaneous** — any other file that isn't a package

## The three file types

| Extension | What it is |
|---|---|
| `.dtsx` | One package — its control flow, data flow, connections, and settings |
| `.dtproj` | The project file — lists the packages and configurations that belong to it |
| `.sln` | The solution file — lists the projects (Integration Services or otherwise) it contains |

## Key terms

| Term | Meaning |
|---|---|
| Package | A `.dtsx` file: control flow, data flow, connection managers, and supporting objects |
| Project | A container for one or more packages, plus shared connection managers and parameters |
| Solution | A container for one or more projects |
| Solution Explorer | The SSDT pane that shows the project/package hierarchy as a tree |

## Lab

1. In your `SSIS Course` project from Lesson 2, right-click **SSIS
   Packages** in Solution Explorer, choose **New SSIS Package**, and
   confirm a second `.dtsx` file now appears alongside `Package.dtsx`.
2. Right-click the project node itself and choose **Properties** — find
   where the `.dtproj` file's configurations live.
3. In Windows Explorer, navigate to your project's folder on disk and
   find the actual `.dtproj` and `.sln` files. Open the `.dtproj` file
   in a text editor and look for the `<Packages>` section listing your
   packages by name.

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: what
the difference is between a package, a project, and a solution, and
which of the three file extensions — `.dtsx`, `.dtproj`, `.sln` —
belongs to each one.
