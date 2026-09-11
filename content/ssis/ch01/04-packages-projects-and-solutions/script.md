# Script — Packages, Projects & Solutions

## Segment 1 (title)

You've created a project and seen its one empty package. Now let's get
precise about what a package actually is, and how packages, projects,
and solutions nest inside each other.

## Segment 2 (screenshot: ssis-package.gif)

A package is more than "control flow and data flow" — it's an
organized collection of tasks and containers connected by precedence
constraints, connection managers, event handlers, variables,
parameters, and logging. This diagram shows the piece that trips people
up: the data flow only exists inside a Data Flow Task. The control flow
here has a Task and a Data Flow Task; that Data Flow Task is what opens
up into its own separate world of source, transformation, and
destination underneath.

## Segment 3 (screenshot: ssis-solution-explorer.png)

Zoom out to the project level, and Solution Explorer shows you the same
folders every time: Connection Managers for anything shared project-
wide, SSIS Packages for every dtsx file you've built, Package Parts for
reusable control-flow fragments, and Miscellaneous for anything that
isn't a package. A project holds one or more packages plus everything
they share.

## Segment 4 (steps: file hierarchy)

And the file extensions map exactly to that nesting. A sln file is the
solution — it lists every project inside it. A dtproj file is the
project — it lists the packages and settings that belong to it. And a
dtsx file is one single package: its control flow, its data flow, its
connections, all in one file. Solution contains projects, projects
contain packages.

## Segment 5 (outro)

Package inside project inside solution — that's the whole hierarchy.
Next lesson, we look at connection managers up close: how a package
actually reaches a database, a file, or an FTP server in the first
place.
