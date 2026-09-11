# Lesson 12 — Precedence Constraints

**Chapter 2 · Control Flow · Lesson 12 of 49**

## What you'll learn

- What a precedence constraint actually links, and the vocabulary
  around precedence and constrained executables
- The three constraint values — Success, Failure, Completion — and
  their colors in SSIS Designer
- How to combine a constraint value with an expression, and what
  Logical AND versus Logical OR changes
- How to read a package with multiple precedence constraints feeding
  into one task

## What a precedence constraint links

A **precedence constraint** links two executables in a control flow:
the **precedence executable**, which runs first, and the **constrained
executable**, which runs after it — and whose ability to run may depend
on how the precedence executable turned out. An executable can be a
task, a For Loop, Foreach Loop, or Sequence container, or even an event
handler.

In a purely linear control flow — no branching — precedence constraints
alone determine the order everything runs in. Once a control flow
branches, the Integration Services run-time engine decides execution
order among whatever follows the branch.

## Three constraint values, three colors

Every precedence constraint carries a **constraint value** that SSIS
Designer displays as a color on the connector line:

- **Success** (green, the default) — the constrained executable runs
  only if the precedence executable completed successfully.
- **Failure** (red) — the constrained executable runs only if the
  precedence executable failed. This is how you build a "do this if
  that broke" branch, like logging an error or sending an alert.
- **Completion** (blue) — the constrained executable runs regardless of
  whether the precedence executable succeeded or failed, as long as it
  finished.

## Adding an expression

A precedence constraint can also use an **expression** — any valid SSIS
expression that evaluates to a Boolean — instead of, or in addition to,
a constraint value. The **Evaluation operation** setting controls how
the two combine:

| Evaluation operation | Constrained executable runs when |
|---|---|
| Constraint | The constraint value's condition is met |
| Expression | The expression evaluates to True |
| Expression and Constraint | Both are true |
| Expression or Constraint | Either one is true |

For example, if Task A connects to Task B with a **Success** constraint
and the expression `@X >= @Z`, using **Expression and Constraint**,
Task B only runs when Task A finishes successfully *and* the value of
variable `X` is at least the value of `Z`.

## When multiple constraints feed one task

A constrained executable can have more than one incoming precedence
constraint — for example, three separate tasks, A, B, and C, all
feeding into task D. The **LogicalAnd** property decides how those
constraints combine:

- **Logical AND** (solid line) — every incoming constraint must
  evaluate to True for the constrained task to run.
- **Logical OR** (dotted line) — at least one incoming constraint must
  evaluate to True.

So if D requires A to succeed, B to fail, and C to succeed, all three
constraints set to Logical AND, then D only runs when all three of
those specific outcomes actually happen.

## Setting the default

New connections default to a **Success** constraint the moment you drag
one task's connector onto another. You can change that default in
**Tools → Options → Business Intelligence Designers → Integration
Services Designers → Control Flow Auto Connect**, choosing Failure or
Completion instead if that fits how you tend to build packages.

## Key terms

| Term | Meaning |
|---|---|
| Precedence executable | The task or container that runs first in a precedence constraint |
| Constrained executable | The task or container whose run depends on the precedence executable |
| Constraint value | Success (green), Failure (red), or Completion (blue) |
| Evaluation operation | Constraint, Expression, Expression and Constraint, or Expression or Constraint |
| LogicalAnd | Whether multiple constraints on one executable require all (AND) or any (OR) to be true |

## Lab

1. Build a package with two Execute SQL Tasks, A and B, connected by a
   precedence constraint. Right-click the connector and set it to
   **Failure** — confirm the line turns red.
2. Double-click the connector to open the **Precedence Constraint
   Editor**. Change **Evaluation operation** to **Expression and
   Constraint**, and enter an expression like `@RetryCount < 3`. Click
   **Test** to validate it.
3. Add a third task, C, also connected to B, with a **Success**
   constraint. Set **Logical OR** on B's incoming constraints, and
   explain out loud what condition now has to be true for B to run.

## Check yourself

You're ready for Lesson 13 when you can explain the difference between
Logical AND and Logical OR on multiple precedence constraints feeding
the same task, and say which color corresponds to which constraint
value without looking.
