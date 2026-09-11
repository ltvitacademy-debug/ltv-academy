# Lesson 40 — Master/Child Package Patterns

**Chapter 7 · Advanced SSIS Patterns · Lesson 40 of 49**

## What you'll learn

- Why a single massive package is harder to build, test, and maintain
  than several smaller ones working together
- The **master/child pattern** — a parent package that calls other
  packages through the Execute Package Task you learned in Lesson 9
- How values pass between parent and child in both directions
- Sequential vs. parallel child execution, and when each makes sense

## One giant package, or several small ones?

Nothing stops you from building every extract, every transformation, and
every load for an entire warehouse refresh into one package. In practice,
almost nobody does, for the same reason nobody writes an entire
application in a single function: it becomes hard to read, hard to test
in isolation, and a nightmare to hand off to someone else. Chapter 2's
Execute Package Task exists precisely so you don't have to — a package
that runs other packages is called a **parent** (or **master**) package,
and the packages it runs are its **child** packages.

## Why split a workflow this way

- **Readability and maintenance** — a package that only loads
  `DimCustomer` is far easier to understand than one section buried
  inside a 40-task monster package.
- **Reuse** — a child package that extracts and cleans a common source
  can be called from several different master packages instead of
  copy-pasted into each one.
- **Security boundaries** — you can grant a developer access to only the
  child packages relevant to their work, not the entire warehouse load.
- **Independent testing** — you can run and debug a single child package
  on its own, without executing the whole master workflow around it.

## The pattern, end to end

A master package is really just an ordinary package whose Control Flow
is mostly **Execute Package Task** entries, one per child, connected by
the same precedence constraints (Lesson 12) you already use everywhere
else:

1. **Master package starts.** It may first read shared setup values —
   a batch ID, a run date — into package variables.
2. **First Execute Package Task runs a child.** The child package
   executes as if it were run on its own; if `ExecuteOutOfProcess` is
   `False` (the default), it shares the parent's process.
3. **Values pass down, if needed.** The parent can pass parameters (in
   the Project Deployment Model) or expose parent package variables (via
   Package Configurations, Lesson 39) that the child reads.
4. **Control returns to the master** once the child finishes — success
   or failure bubbles back up, and the next precedence constraint decides
   what runs next.
5. **Repeat for each remaining child**, either one after another in
   sequence, or with several Execute Package Task instances running in
   parallel if the children don't depend on each other.

## Sequential vs. parallel children

Connect Execute Package Tasks with ordinary success/failure precedence
constraints when child B genuinely depends on child A finishing first —
loading `DimCustomer` before the fact table that references it, for
example. If two children are truly independent — say, loading
`DimProduct` and `DimGeography` at the same time — leave them
unconnected on the Control Flow so SSIS's engine runs them in parallel
and finishes the whole master package faster.

## Passing values between parent and child

You have two options, both of which you've already learned:

- **Parameters** (Lesson 27) — on the Parameter Bindings page of the
  Execute Package Task Editor, map a parent variable or parameter
  directly to a child package parameter. This only works when both
  packages are in the same project on the Project Deployment Model.
- **Package Configurations** (Lesson 39) — the older mechanism, using
  the **Parent Package Variable** configuration type, which lets a child
  package pull a value straight from a variable defined in its parent.

## Key terms

| Term | Meaning |
|---|---|
| Master package (parent package) | A package whose control flow runs other packages |
| Child package | A package run by another package's Execute Package Task |
| ExecuteOutOfProcess | Execute Package Task property controlling whether a child shares the parent's process or runs in its own |
| Parameter Bindings | The Execute Package Task Editor page that maps parent values to child package parameters |
| Parent Package Variable | The Package Configuration type that lets a child package read a variable from its parent |

## Lab

1. Build two small packages: `ChildLoadDimCustomer.dtsx` (a stub that
   just logs a message) and `MasterOrchestrator.dtsx`.
2. In the master package, add an Execute Package Task referencing the
   child, using **Project Reference**.
3. Add a second child stub package for `DimProduct`, add a second
   Execute Package Task for it, and leave both Execute Package Tasks
   unconnected by any precedence constraint — run the master and confirm
   in the execution results that both children start without waiting on
   each other.

## Check yourself

You're ready for Lesson 41 when you can explain, without looking: why
you'd split a workflow into a master and several child packages instead
of one giant package, and how to make two children run in parallel
instead of one after another.
