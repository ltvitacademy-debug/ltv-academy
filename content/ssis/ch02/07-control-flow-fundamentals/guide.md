# Lesson 7 — Control Flow Fundamentals

**Chapter 2 · Control Flow · Lesson 7 of 49**

## What you'll learn

- The three kinds of control flow elements every package is built from:
  containers, tasks, and precedence constraints
- How the Control Flow tab and its Toolbox actually work once a package
  has real content in it
- What a container's job is versus a task's job, and how they nest
- Where this chapter is headed — six lessons, each covering one of the
  control-flow tasks and containers you'll use constantly

## Three elements, one control flow

Lesson 1 introduced the control flow engine as "the thing that decides
what order tasks run in." Now it's time to open that up. Every control
flow in Integration Services — no matter how simple or complex — is
built from exactly three kinds of elements:

- **Containers** — structures that organize a package. The For Loop,
  Foreach Loop, and Sequence containers (Lessons 10 and 11) all live
  here.
- **Tasks** — the actual units of work. Execute SQL Task (Lesson 8),
  Execute Package Task (Lesson 9), Data Flow Task, File System Task, and
  dozens more.
- **Precedence constraints** — the connectors between containers and
  tasks. They decide the order things run in and the conditions under
  which they run (Lesson 12 covers these in depth).

## The Control Flow tab, with real content

Here's what a control flow looks like once it actually has work in it —
not the empty tab from Lesson 1, but a package with tasks, a container,
and the connectors between them.

![SSIS Designer's Control Flow tab showing a package with several tasks, a Foreach Loop container holding three more tasks, and precedence constraint lines connecting them, with the Connection Managers area docked at the bottom.](/courses/ssis/ch02/07-control-flow-fundamentals/control-flow-designer.gif)
*A real control flow: tasks, a Foreach Loop container, and precedence constraints.*

A few things worth noticing in that screenshot:

- The **Toolbox** on the left, under **Containers**, lists exactly the
  three container types this course covers: For Loop Container, Foreach
  Loop Container, and Sequence Container.
- Every task and container on the design surface has connectors coming
  off it — those green lines are precedence constraints, and the arrows
  show the direction execution flows.
- The **Foreach Loop container** on the right holds three tasks of its
  own. Containers can nest other containers and tasks — a control flow
  can go many levels deep.
- Along the bottom, **Connection Managers** — the same strip from
  Lesson 5, now actually in use by the tasks above it.

## Building a control flow

Creating a control flow always comes down to the same three moves, in
whatever order makes sense for your package:

1. **Add containers** that structure the package — a loop, a grouping,
   or nothing at all if the package is simple.
2. **Add tasks** that do the actual work — every package that touches
   data needs at least one Data Flow Task.
3. **Connect everything with precedence constraints** by dragging the
   connector that SSIS Designer automatically attaches to each item you
   drop on the surface.

Nothing runs in isolation. A task with no incoming constraint runs
immediately when the package starts; a task with an incoming constraint
waits for its precedence task to finish (and, depending on the
constraint, to succeed, fail, or just complete).

## Where this chapter goes

The rest of Chapter 2 walks through the specific tasks and containers
you'll reach for constantly:

- **Lesson 8** — Execute SQL Task, for running SQL statements and stored
  procedures straight from the control flow.
- **Lesson 9** — Execute Package Task, for calling one package from
  another.
- **Lesson 10** — For Loop and Foreach Loop containers, for repeating
  work a fixed number of times or once per item in a collection.
- **Lesson 11** — Sequence Containers, for grouping tasks without any
  looping at all.
- **Lesson 12** — Precedence Constraints, covered briefly here, in full
  detail there: Success, Failure, Completion, and expressions.

## Key terms

| Term | Meaning |
|---|---|
| Container | A control flow element that provides structure — For Loop, Foreach Loop, or Sequence |
| Task | A control flow element that performs a unit of work, like Execute SQL or Data Flow |
| Precedence constraint | The connector between two items that sets execution order and run conditions |
| Toolbox | The SSIS Designer panel listing every task and container you can drag onto a control flow |
| Nesting | Containers can hold other containers and tasks, to any depth |

## Lab

1. Open the package you created in Lesson 6. On the **Control Flow**
   tab, drag a **Sequence Container** onto the design surface from the
   Toolbox's **Containers** category.
2. Drag two more tasks of any kind (a **File System Task** is a safe
   choice if you haven't set anything up yet) *inside* the Sequence
   Container, not next to it.
3. Connect the two inner tasks with a precedence constraint by dragging
   from the first task's connector arrow to the second task.
4. Notice that the Sequence Container itself now has a single connector
   coming off it — from the outside, it behaves like one task, even
   though it holds two.

## Check yourself

You're ready for Lesson 8 when you can name the three kinds of control
flow elements without looking, and explain why a task inside a container
still needs its own precedence constraints to connect to other tasks in
that same container.
