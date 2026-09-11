# Lesson 38 — Script Tasks & Script Components: C# Basics

**Chapter 7 · Advanced SSIS Patterns · Lesson 38 of 49**

## What you'll learn

- When a drag-and-drop task or transformation isn't enough, and custom
  code is the right answer
- The difference between a **Script Task** (control flow) and a
  **Script Component** (data flow) — same language, very different jobs
- The `Dts` object model every Script Task uses to read variables, log,
  raise errors, and report success or failure
- How to read a real, working C# Script Task from top to bottom

## When you need code instead of a task

Every task and transformation you've used so far in this course covers a
common, well-defined job — read SQL, split rows on a condition, look up a
key. Sometimes the job you need isn't common: check whether a file
actually exists before the rest of the package runs, parse a filename to
pull a date out of it, call an API that has no SSIS connector. That's
what **Script Tasks** and **Script Components** are for — a place to
write real C# (or VB) code inside your package when nothing in the
Toolbox does the job.

Both use **VSTA** (Visual Studio Tools for Applications) as their code
editor, and both are edited from a task/component editor dialog with a
**Script** page and an **Edit Script...** button that opens the VSTA IDE.

## Script Task vs. Script Component

They look similar, but they solve different problems:

- **Script Task** lives on the **Control Flow**. It runs *once* per
  execution (or once per loop iteration, if it's inside a For Loop or
  Foreach Loop container) — good for file-system checks, custom
  validation logic, or anything that isn't about transforming rows.
- **Script Component** lives on the **Data Flow**. It runs *once per
  row* flowing through the pipeline, and can act as a source, a
  transformation, or a destination — good for parsing an unusual file
  format, applying custom business logic per row, or generating rows
  from something that isn't a normal source.

## The Dts object model

Every Script Task's code revolves around one object: `Dts`. It's your
script's connection back to the package around it:

| `Dts` member | What it gives you |
|---|---|
| `Dts.Variables` | Read/write access to the package variables you listed as `ReadOnlyVariables`/`ReadWriteVariables` on the Script page |
| `Dts.Connections` | Access to the package's connection managers |
| `Dts.Events` | Raise errors, warnings, and informational messages back to the package |
| `Dts.Log` | Write entries to whatever logging provider the package uses |
| `Dts.TaskResult` | Set to `Success` or `Failure` — this is how your script reports back to the control flow |

## A real Script Task, start to finish

Here's a complete, working Script Task that checks whether a source file
exists before letting the rest of the package continue — the classic
first use case for a Script Task:

```
public void Main()
{
    string sourceFile = (string)Dts.Variables["User::FilePath"].Value;

    if (!File.Exists(sourceFile))
    {
        Dts.Events.FireError(0, "Script Task",
            "File not found: " + sourceFile, "", 0);
        Dts.TaskResult = (int)ScriptResults.Failure;
        return;
    }

    Dts.TaskResult = (int)ScriptResults.Success;
}
```

Walk through it: it reads a package variable named `FilePath` through
`Dts.Variables` (which means `FilePath` has to be listed in that Script
Task's `ReadOnlyVariables` property first), checks it with the ordinary
.NET `File.Exists` method, and — if the file's missing — raises an error
event and sets `TaskResult` to `Failure` so the rest of the package
doesn't proceed on bad data. If the file's there, it reports `Success`
and control flow moves on.

## Key terms

| Term | Meaning |
|---|---|
| Script Task | A control-flow task that runs custom C#/VB code once per execution |
| Script Component | A data-flow component that runs custom C#/VB code once per row, as a source, transform, or destination |
| VSTA | Visual Studio Tools for Applications — the code editor both use |
| `Dts` object | The object every script uses to read variables, log, raise events, and report success/failure |
| `ReadOnlyVariables` / `ReadWriteVariables` | Script Task Editor properties that expose specific package variables to your code |

## Lab

1. In a test package, add a `String` variable named `FilePath` at the
   package scope and set its value to a real file path on your machine.
2. Drag a **Script Task** onto the Control Flow, open its editor, and set
   `ReadOnlyVariables` to `User::FilePath`.
3. Click **Edit Script...**, replace the generated `Main()` method with
   the code above, and run the package once with a real file path and
   once with a made-up path — confirm you get `Success` in the first case
   and a logged error plus `Failure` in the second.

## Check yourself

You're ready for Lesson 39 when you can explain, without looking: the
difference between a Script Task and a Script Component, and what the
`Dts.TaskResult` line at the end of the example actually does.
