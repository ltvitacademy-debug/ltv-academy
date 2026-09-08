# Lesson 21 — Execute Pipeline Activity

**Chapter 4 · Control Flow & Orchestration · Lesson 5 of 6**

## What you'll learn

- What the Execute Pipeline activity actually does
- The three real problems it solves in this chapter
- `waitOnCompletion`, and what changes when it's false
- Why parameters, not variables, are what you pass into it

## One pipeline, calling another

The **Execute Pipeline** activity lets a pipeline invoke a completely
different pipeline as one of its own activities:

![Screenshot of the Execute Pipeline activity's Settings tab, showing pipeline selection and parameter configuration fields.](/courses/data-factory/ch04/21-execute-pipeline-activity/execute-pipeline-activity.png)

Select an existing pipeline (or create a new one), then supply values
for whatever parameters that pipeline expects — exactly the same
parameter mechanism Lesson 17 already covered, just passed
pipeline-to-pipeline instead of run-to-run.

## Three real problems this activity solves

1. **The ForEach nesting limit** (Lesson 19). A ForEach can't contain
   another ForEach directly — but it *can* contain an Execute
   Pipeline activity whose target pipeline has its own inner ForEach,
   achieving the same nested-loop effect indirectly.
2. **Multiple activities inside one ForEach iteration**. Officially
   recommended: abstract several activities into their own pipeline,
   then call that pipeline once per iteration with Execute Pipeline,
   rather than cramming many activities directly inside the loop.
3. **Genuine reuse.** A "copy one table" pipeline, called by Execute
   Pipeline from three different parent pipelines with three
   different table-name parameters, beats maintaining three
   near-identical copies of the same logic.

## The shape of the call

```
{
  "name": "ExecutePipelineActivity",
  "type": "ExecutePipeline",
  "typeProperties": {
    "pipeline": {
      "referenceName": "InnerCopyPipeline",
      "type": "PipelineReference"
    },
    "parameters": {
      "sourceTableName": {
        "value": "@item().SourceTable",
        "type": "Expression"
      }
    },
    "waitOnCompletion": true
  }
}
```

Notice the parameter value here: `@item().SourceTable` — this is
exactly how a ForEach and an Execute Pipeline combine, passing each
iteration's current item straight into the inner pipeline as a real
parameter.

## `waitOnCompletion`: the one setting that changes everything

- **`true`** (the default) — the outer pipeline waits for the inner
  pipeline to finish before continuing. Its status, and any error,
  flow back up to the outer pipeline directly.
- **`false`** — the outer pipeline fires the inner one and moves on
  immediately, without waiting. Useful for genuinely independent,
  fire-and-forget work, but the outer pipeline won't know whether the
  inner one actually succeeded.

## Why parameters, not variables

Lesson 17 already flagged why: variables are scoped to a single
pipeline and aren't thread-safe across parallel work. **Parameters**
are the mechanism built specifically for passing values *between*
pipelines cleanly — each Execute Pipeline call gets its own
independent parameter values, with no shared state to race against.

## Key terms

| Term | Meaning |
|---|---|
| Execute Pipeline | An activity that invokes a separate pipeline from within the current one |
| waitOnCompletion | Whether the calling pipeline waits for the invoked one to finish |
| Master / inner pipeline | Common naming for the calling pipeline and the one it invokes |

## Lab

1. Build two pipelines: an "inner" one that takes a String parameter
   and just logs it (a Wait or a Set Variable works fine for testing),
   and an "outer" one with an Execute Pipeline activity calling it.
2. Run the outer pipeline in Debug and confirm the inner one actually
   receives the parameter value.
3. Toggle `waitOnCompletion` to false, rerun, and note how the outer
   pipeline's run duration changes.

## Check yourself

You're ready for Lesson 22 when you can explain, in one sentence,
why Execute Pipeline is the standard workaround for ForEach's
no-nesting limitation.
