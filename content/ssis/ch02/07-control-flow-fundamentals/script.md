# Script — Control Flow Fundamentals

## Segment 1 (title)

Welcome to Chapter 2 — Control Flow. Lesson 1 told you the control flow
engine decides what order things run in. Now we open that up and look
at exactly what it's built from.

## Segment 2 (screenshot: control-flow-designer)

Every control flow, no matter how complicated, is built from exactly
three kinds of elements: containers, which provide structure; tasks,
which do the actual work; and precedence constraints, the connectors
between them.

Here's what that looks like once a package actually has content in it.
On the left, the Toolbox's Containers category lists the three
container types this course covers — For Loop, Foreach Loop, and
Sequence. On the design surface, you can see tasks connected by green
precedence constraint lines, and a Foreach Loop container holding three
more tasks inside it. Notice that container nesting — Integration
Services lets you nest containers inside containers to any depth. And
down at the bottom, the same Connection Managers strip from Lesson 5,
now actually wired up to the tasks above it.

## Segment 3 (screenshot: toolbox-control-flow.jpg)

Everything you drag onto that surface comes from one place — the
Toolbox. Containers don't get their own special panel; they sit right
in the same list as every task, alphabetically, next to Execute SQL and
File System Task. Right here are the two looping containers, For Loop
and Foreach Loop — Sequence Container is further down the same list.

## Segment 4 (screenshot: task-dropped-canvas.jpg)

And here's step two actually happening — drag any item out of that list
and drop it on the design surface, and SSIS Designer adds it
immediately. No dialog box, no confirmation. This is a Data Flow Task
the instant it lands, still shown selected.

## Segment 5 (steps: three control flow elements)

Building a control flow always comes down to the same three moves.
First, add containers that give the package structure — a loop, a
grouping, or nothing at all if the package is simple. Second, add tasks
that do the real work — every package that touches data needs at least
one Data Flow Task. And third, connect everything with precedence
constraints, which SSIS Designer automatically attaches to anything you
drop on the surface, ready for you to drag into a connection. A task
with no incoming constraint runs the moment the package starts; a task
with one waits for its precedence task to succeed, fail, or just
finish, depending on how that constraint is set.

## Segment 6 (outro)

That's the shape of every control flow you'll ever build. The rest of
this chapter fills in the specifics — Execute SQL Task, Execute Package
Task, the looping containers, Sequence Containers, and precedence
constraints in full depth. Next lesson, we start with the Execute SQL
Task — running real SQL statements straight from your control flow.
