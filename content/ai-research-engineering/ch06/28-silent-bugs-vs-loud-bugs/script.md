# Script — Silent Bugs vs. Loud Bugs

## Segment 1 (title)

Every research engineer learns to fear one category of bug more than the other. A loud bug — an exception, a crash, a shape mismatch — is actually the easy case, because the program refuses to proceed until it's fixed. A silent bug lets training finish, lets the loss curve go down, and produces a number that's simply wrong. This chapter is about turning as many silent bugs as possible into loud ones.

## Segment 2 (steps)

Loud bugs are self-correcting: the job won't run until someone fixes it, so it never makes it into a reported result. Silent bugs have no such mechanism — the job runs, the plot looks reasonable, and the mistake is baked into a number that might get written into a report before anyone notices. The fix isn't writing bug-free code, which isn't achievable; it's building the habit of asserting shapes and modes everywhere a mistake wouldn't otherwise crash.

## Segment 3 (code)

The single most common silent bug is an unintended broadcast. Predictions of shape (B,) compared against targets of shape (B,1) don't raise an error — they broadcast to (B,B), computing something completely different from the elementwise comparison you meant, and the loss still returns a plausible-looking number. The fix costs one line: assert the shapes match exactly before the operation.

## Segment 4 (code)

Two more patterns cost nothing to crash but are often left silent. Forgetting to flip back to train mode after an eval pass leaves dropout and batch norm behaving wrong for every subsequent step. Forgetting to zero gradients between steps lets them silently accumulate, inflating the effective step size in a way that depends on how long the mistake went unnoticed. Neither raises an exception — both just quietly bias everything downstream.

## Segment 5 (outro)

Next lesson digs into a specific, high-stakes category of silent failure: numerical issues in training code — NaNs, Infs, and precision loss that show up in gradients and mixed-precision training, and the specific techniques for catching them before they wreck a run.
