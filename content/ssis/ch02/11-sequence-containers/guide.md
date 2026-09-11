# Lesson 11 — Sequence Containers

**Chapter 2 · Control Flow · Lesson 11 of 49**

## What you'll learn

- What a Sequence Container actually does — and the one thing it
  deliberately doesn't do (loop)
- The four practical benefits of grouping tasks into one
- Why the Sequence Container has no custom editor, and where you
  configure it instead
- How Sequence Containers interact with variable scope and transactions

## What a Sequence Container is for

The **Sequence container** defines a control flow that's a subset of
the package's overall control flow. Unlike the For Loop and Foreach
Loop containers from Lesson 10, a Sequence Container doesn't repeat
anything — it simply groups one or more tasks and containers together
so you can treat them as a single unit inside the larger package.

Adding tasks to a Sequence Container works exactly like adding them to
a package: drag them onto the container instead of the package's
design surface, and connect them with precedence constraints just as
you would anywhere else.

## Four real benefits

The Sequence Container earns its place in nearly every serious package
for four practical reasons:

- **Focused debugging.** Set a Sequence Container's `Disable` property
  to `True` and every task and container inside it stops running —
  useful for isolating one part of a package while you troubleshoot
  another.
- **Managing properties in one place.** Instead of setting a property
  on ten individual tasks, set it once on the Sequence Container that
  holds them.
- **Scoping variables.** A variable created inside a Sequence Container
  is visible only to the tasks and containers inside that container —
  handy for values that shouldn't leak into the rest of the package.
- **Visual organization.** Collapse and expand the container to hide or
  reveal the tasks inside it, keeping a large control flow readable.

## Sequence Containers and transactions

You can set a **transaction attribute** on a Sequence Container to
define a transaction boundary for just the tasks inside it — a more
granular alternative to setting a transaction on the whole package. For
example, if a Sequence Container holds one task that deletes rows from
a table and another that inserts replacement rows, a transaction on the
container ensures the delete is rolled back if the insert fails,
without affecting anything running outside the container.

## No custom editor — and that's normal

Unlike the Execute SQL Task or the For Loop container, the Sequence
Container has **no custom editor dialog** at all. Double-clicking it in
SSIS Designer doesn't open a task-specific editor, because there's
nothing enumerator- or SQL-statement-shaped to configure. Instead, you
configure it entirely through the **Properties window** in SQL Server
Data Tools, or programmatically through the `Sequence` class. This is
worth remembering, because it's the exception to a pattern you'll see
everywhere else in this chapter: most tasks and containers *do* have a
dedicated editor, and Sequence Containers simply don't need one.

## Key terms

| Term | Meaning |
|---|---|
| Sequence Container | A grouping container that organizes tasks into a subset control flow, without looping |
| Disable property | Set on a Sequence Container to turn off every task and container inside it at once |
| Variable scope | The range of containers a variable is visible to — narrower when defined inside a Sequence Container |
| Transaction attribute | Set on a container to define a commit/rollback boundary for just what's inside it |
| Group box | A design-time-only visual grouping tool, different from a Sequence Container — no run-time behavior |

## Lab

1. In a package with several unrelated tasks, drag a **Sequence
   Container** onto the design surface and move three related tasks
   inside it.
2. Right-click the Sequence Container and set its **Disable** property
   to **True**. Run the package and confirm none of the three tasks
   inside it execute, while tasks outside the container run normally.
3. Set **Disable** back to **False**. Create a new variable scoped to
   the Sequence Container itself (not the package), and confirm — by
   trying to reference it from a task outside the container — that it
   isn't visible there.

## Check yourself

You're ready for Lesson 12 when you can explain why a Sequence
Container has no custom editor dialog, and name at least two of the
four practical reasons to group tasks inside one.
