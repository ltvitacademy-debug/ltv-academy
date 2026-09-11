# Lesson 34 — Checkpoints & Restartability

**Chapter 6 · Error Handling & Logging · Lesson 34 of 49**

## What you'll learn

- Why re-running an entire failed package from scratch is often the wrong
  answer for long-running ETL
- The three package properties that turn on checkpoint-based restart
- What actually gets restarted — and the hard limit on how granular that
  restart point can be
- Why checkpoints and transactions can actively fight each other in the
  same package

## Why you don't want to start over

Imagine a package with five Bulk Insert tasks, each loading a different
dimension table, run one after another. The fourth one fails halfway
through the run because of a bad connection. Without any restart strategy,
fixing the connection and re-running the package means reloading dimensions
one, two, and three all over again — wasted time, and if any of those
inserts aren't safely repeatable, wasted risk too.

**Checkpoints** solve exactly this. SSIS writes progress information to a
checkpoint file as the package runs. If the package fails, that file
records exactly how far it got. Rerun the package, and it picks up from
the point of failure instead of the beginning — reload only the fourth
dimension table, not all five.

## Three properties turn it on

You set these on the package itself, from **Control Flow** → right-click
the background → **Properties**:

- **SaveCheckpoints** — set to `True` to actually write the checkpoint
  file as the package runs. This is the master switch.
- **CheckpointFileName** — a valid file path where the checkpoint data
  gets written.
- **CheckpointUsage** — controls whether SSIS actually restarts from that
  file. It has three settings: `Never` (ignore the file, always start from
  the beginning), `Always` (always restart from the checkpoint — and fail
  outright if the file doesn't exist), and `IfExists` (restart from the
  checkpoint if the file is there, otherwise start clean — the setting
  you'll use most often).

One more property matters just as much: **FailPackageOnFailure**, set to
`True` on every task or container you actually want to serve as a restart
point. Without it, that container's failure won't register correctly for
checkpoint purposes.

## The restart granularity you actually get

This is the part people get wrong: **a package can only restart at the
control flow level.** The task host container — the wrapper around a
single task — is the smallest atomic unit that can be a restart point. You
cannot restart partway through a single Data Flow task; if that task fails
five minutes into a ten-minute load, the whole Data Flow task reruns from
its own beginning.

If restarting in the middle of a data flow actually matters to you, the
answer isn't inside the data flow — it's to split the work into multiple
Data Flow tasks in Control Flow, each one small enough that rerunning it
entirely from scratch is cheap.

Two more real limitations worth knowing before you rely on this:

- **For Loop and Foreach Loop containers don't checkpoint their
  iterations.** If a Foreach Loop fails on file 40 of 100, restarting the
  package reruns the entire loop from file 1 — even the 39 that already
  succeeded.
- **Variables of type Object aren't saved** in the checkpoint file, even
  though other variable values are.

## Checkpoints and transactions don't mix well

If a container both uses a transaction and is inside a checkpoint's reach,
you can end up with a package that, on restart, replays a transaction that
already committed successfully the first time. Microsoft's own guidance is
blunt about this: using checkpoints and transactions together in the same
package "could cause unexpected results." If you need both, keep them in
separate parts of the package rather than layering one directly on top of
the other.

## Key terms

| Term | Meaning |
|---|---|
| Checkpoint file | The file SSIS writes progress, variable values, and configuration to as a package runs |
| SaveCheckpoints | Package property — master switch for writing the checkpoint file |
| CheckpointFileName | Package property — the file path checkpoint data is written to |
| CheckpointUsage | Package property — Never / Always / IfExists restart behavior |
| FailPackageOnFailure | Container/task property — must be True for that container to register as a restart point |
| Task host container | The smallest atomic unit a package can restart at — you cannot restart mid-data-flow |

## Lab

1. Build (or reuse) a package with three Execute SQL tasks in sequence.
2. On the Control Flow background, open **Properties**, set
   **SaveCheckpoints** to `True`, set **CheckpointFileName** to a path in
   your project folder, and set **CheckpointUsage** to `IfExists`.
3. Set **FailPackageOnFailure** to `True` on all three tasks.
4. Temporarily set the second task's **ForceExecutionResult** to
   `Failure` to simulate a real-time failure, then run the package —
   confirm task one succeeds, task two "fails," and the checkpoint file
   appears in your project folder.
5. Set **ForceExecutionResult** back to `None`, then rerun the package and
   confirm in the Progress tab that task one is skipped and the package
   picks up at task two.

## Check yourself

You're ready for Lesson 35 when you can explain: why can't a package
restart in the middle of a single Data Flow task, and what's the practical
workaround if that granularity matters to you?
