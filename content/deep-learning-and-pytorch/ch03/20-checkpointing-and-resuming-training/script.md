# Script — Checkpointing & Resuming Training

## Segment 1 (title)

Real training runs take hours or days, and something will eventually interrupt one — a crash, a preemption, or just you needing to stop for the night. Checkpointing saves enough state to resume exactly where you left off instead of starting over.

## Segment 2 (code)

If you only save the model's weights, you can reload it for inference, but you can't resume training cleanly. Adam tracks per-parameter running averages, and a scheduler tracks where it is in its decay curve — restart those from scratch and you get a different, usually worse trajectory. So a real checkpoint bundles the model, optimizer, and scheduler state dicts together, plus whatever bookkeeping you want, like the epoch number.

## Segment 3 (code)

Loading it back is mostly symmetric: load each state dict into its matching object, then pick up the epoch counter where it left off. Two details matter — map_location lets a checkpoint saved on one device load cleanly onto another, and weights_only has to be set to False here, since PyTorch's safer default rejects a file that holds more than just tensors.

## Segment 4 (steps)

The short version: weights alone get you inference, but resuming training cleanly needs the optimizer's running averages and the scheduler's position in its curve too. Leave either out and training resumes on a noticeably different path than if it had never stopped.

## Segment 5 (outro)

A common pattern is saving a "latest" checkpoint every epoch and a separate "best" checkpoint whenever validation loss improves. Up next, lesson twenty-one: early stopping and validation strategy — knowing when to stop, not just how to resume.
