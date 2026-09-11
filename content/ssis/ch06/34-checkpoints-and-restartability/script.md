# Script — Checkpoints & Restartability

## Segment 1 (title)

Picture a package with five long-running loads in sequence, and the fourth
one fails. Without a restart strategy, fixing the problem and rerunning the
package means redoing all three that already succeeded. This lesson is
about not doing that: checkpoints.

## Segment 2 (steps: three properties)

SSIS writes progress to a checkpoint file as a package runs. If the
package fails, that file records exactly how far it got — rerun it, and it
picks up from the point of failure instead of the beginning. Three
properties turn this on, all set on the package itself from Control Flow
properties. SaveCheckpoints is the master switch — set it to True to
actually write the file. CheckpointFileName is just the file path.
CheckpointUsage controls the restart behavior itself: Never ignores the
file, Always requires it to exist and fails if it doesn't, and IfExists —
the one you'll use most — restarts from it if it's there and runs clean
if it's not. One more property matters just as much: FailPackageOnFailure,
set to True on every task you actually want as a restart point.

## Segment 3 (steps: the granularity limit)

Here's the part people get wrong. A package can only restart at the
control flow level — the task host container is the smallest atomic unit
that can be a restart point. You cannot restart partway through a single
Data Flow task; if it fails five minutes into a ten-minute load, the whole
task reruns from its own beginning. If that granularity actually matters,
the fix isn't inside the data flow — it's splitting the work into multiple
smaller Data Flow tasks in Control Flow. And two more limits worth
remembering: For Loop and Foreach Loop containers don't checkpoint their
iterations at all, and variables of type Object never get saved in the
checkpoint file.

## Segment 4 (outro)

One more warning worth taking seriously: checkpoints and transactions
don't mix well in the same container — a restart can end up replaying a
transaction that already committed the first time. Keep them in separate
parts of the package. Next lesson, we zoom out from any single mechanism
to the failure patterns you'll actually run into across a real SSIS
career — and how to recognize each one fast.
