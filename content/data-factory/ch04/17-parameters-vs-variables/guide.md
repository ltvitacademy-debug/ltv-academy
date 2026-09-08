# Lesson 17 — Parameters vs. Variables

**Chapter 4 · Control Flow & Orchestration · Lesson 1 of 6**

## What you'll learn

- What a pipeline parameter actually is, and where it comes from
- What a pipeline variable is, and how it changes during a run
- The one-sentence distinction that settles which one you need
- A real scoping gotcha with variables inside a ForEach loop

## Parameters: read-only, set from outside

A **parameter** is defined at the pipeline level and **can't be
modified during a run**. It controls the pipeline's behavior from
outside — connection details, a file path, which environment to
target — supplied when the pipeline starts, either as a default value
or an explicit one passed in.

![Screenshot of the Parameters tab on a pipeline, showing a String parameter named account_name with default value "ab-8762".](/courses/data-factory/ch04/17-parameters-vs-variables/parameter-definition.png)
*Parameters tab → + New. Name it, type it, optionally give it a default.*

Define one on the **Parameters** tab, then reference its value
anywhere in the pipeline with `@pipeline().parameters.<name>`. Types
available: String, Int, Float, Bool, Array, Object, and SecureString
— that last one for values you don't want showing up in logs.

## Variables: mutable, set from inside

A **variable**, by contrast, can be **set and modified while the
pipeline is actually running**, using the Set Variable activity
Lesson 15 already introduced. It's for storing and tracking state as
the pipeline progresses — the result of a computation, a flag an If
Condition checks later, a running list an Append Variable activity
builds up.

![Screenshot of the Variables tab on a pipeline, showing a variable being defined with a name, type, and default value.](/courses/data-factory/ch04/17-parameters-vs-variables/variable-definition.png)
*Variables tab → + New. Fewer types than parameters: String, Bool, or Array only.*

Define one on the **Variables** tab, reference its current value with
`@variables('<name>')`, and change it mid-run with **Set Variable**.

## The distinction, in one sentence

**Parameters are external, set once, from outside a pipeline.
Variables are internal, mutable, changed from inside a pipeline as it
runs.** If a value needs to come in from whoever or whatever starts
the pipeline, that's a parameter. If a value needs to change *while*
the pipeline is running, that's a variable.

## A real scoping gotcha

Variables are scoped to the **entire pipeline**, not to any one
activity or loop — which means they're **not thread-safe**. Setting a
variable inside a **ForEach** activity running in parallel
(`isSequential: false`) can produce unpredictable results, since every
parallel iteration is racing to read and write the exact same
variable at once. If you need per-iteration values inside a parallel
loop, pass them as parameters to an **Execute Pipeline** activity
(Lesson 21) instead — each invocation gets its own scope.

## Key terms

| Term | Meaning |
|---|---|
| Parameter | A read-only value set from outside a pipeline, fixed for the whole run |
| Variable | A mutable value, set and changed from inside a pipeline as it runs |
| `@pipeline().parameters.<name>` | The expression referencing a parameter's value |
| `@variables('<name>')` | The expression referencing a variable's current value |

## Lab

1. On any pipeline, add a String parameter with a default value, and
   reference it in a Wait or Web activity's configuration.
2. Add a Bool variable, and use a Set Variable activity to flip it
   partway through the pipeline.
3. Write one sentence explaining why setting a variable inside a
   parallel ForEach loop is risky.

## Check yourself

You're ready for Lesson 18 when you can explain, without checking
back, which one — a parameter or a variable — you'd use to pass in a
target environment name, and which one you'd use to track whether a
validation step has passed yet.
