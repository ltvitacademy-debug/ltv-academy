# Script — Script Tasks & Script Components: C# Basics

## Segment 1 (title)

Every task and transformation you've used so far covers a common,
well-defined job. This lesson is about what happens when the job you
need isn't common — and code, not drag-and-drop, is the answer.

## Segment 2 (steps: script task vs script component)

SSIS gives you two places to write real C# or VB code, and they solve
different problems. The Script Task lives on the Control Flow and runs
once per execution, or once per loop iteration if it's inside a For Loop
or Foreach Loop — good for things like checking a file exists, or custom
validation logic. The Script Component lives on the Data Flow and runs
once per row flowing through the pipeline, and it can act as a source, a
transformation, or a destination — good for parsing an unusual file
format or applying row-by-row business logic nothing built-in covers.
Both open into VSTA, the same Visual Studio-based code editor, from an
Edit Script button.

## Segment 3 (screenshot: script-task-editor-scriptlanguage.png)

That choice of language happens right here, on the Script Task Editor's
Script page. The ScriptLanguage dropdown is open — these are the two real
options, Microsoft Visual Basic or Microsoft Visual C#. You pick once per
task, before you ever click Edit Script, and every other property on this
page — EntryPoint, the variables you expose — builds on top of it.

## Segment 4 (screenshot: script-task-editor-edit-script-button.png)

Once the language and variables are set, this is the button that actually
matters: Edit Script. Nothing you've configured on this page runs any
code yet — it's all setup. Click Edit Script, and SSIS launches the real
code editor.

## Segment 5 (screenshot: vsta-code-editor.png)

And here it is — the actual VSTA IDE window. Solution Explorer on the
right, a real class file called ScriptMain.cs open in the main pane. Every
Script Task's code revolves around one object in here — Dts — your
script's connection back to the package around it. Dts.Variables gives you
access to whatever variables you listed as ReadOnlyVariables or
ReadWriteVariables. Dts.Events lets you raise an error back to the
package. And Dts.TaskResult is how your script reports success or failure
to the control flow.

## Segment 6 (code: file-exists script task)

Here's a complete, working example built on exactly those pieces: a
Script Task that checks whether a source file actually exists before the
rest of the package continues. It reads the FilePath variable through
Dts.Variables, checks it with the ordinary .NET File.Exists method, and if
the file's missing, fires an error event and sets TaskResult to Failure so
nothing downstream runs on bad data. If the file's there, it reports
Success and control flow moves on — a few lines of real logic doing a job
no built-in task covers.

## Segment 7 (outro)

Next lesson, we go back to something every package eventually needs in
production: Package Configurations — how a package built on your machine
picks up different connection strings and values once it's deployed
somewhere else entirely.
