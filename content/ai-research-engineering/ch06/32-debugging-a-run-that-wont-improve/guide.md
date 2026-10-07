# Debugging a Run That Won't Improve

This is the scenario the rest of the chapter has been building toward: nothing crashes, there are no NaNs, the sanity checks from Lesson 31 all pass — and the metric you actually care about just refuses to move past some plateau. This is often the hardest kind of research bug, because there's no exception to point at and no obviously wrong number; there's just a loss curve that's flat when it shouldn't be. This lesson is a systematic process for working through the most common causes, roughly in the order they're cheapest to rule out.

## What you'll learn

- Why "nothing crashed" doesn't mean "nothing is wrong" when a run plateaus
- A systematic order to check causes: learning rate, data, loss/metric mismatch, and capacity
- How to tell a learning-rate problem apart from a genuine capacity or data problem
- When the answer is "the model is fine, the problem is upstream of training entirely"

## Step 1: rule out the learning rate first

An LR that's too small produces exactly this symptom — a loss curve that moves, technically, but so slowly it looks flat on any reasonable timescale. An LR that's too large can produce the same visual symptom from the opposite direction: the loss bounces around a region without making progress. Both are cheap to rule out with a short LR sweep over a few orders of magnitude on a small subset of data, before assuming anything is structurally wrong:

```python
for lr in [1e-5, 1e-4, 1e-3, 1e-2]:
    model = build_model()
    optimizer = torch.optim.Adam(model.parameters(), lr=lr)
    losses = train_n_steps(model, optimizer, small_subset, n=200)
    print(f"lr={lr}: first={losses[0]:.4f} last={losses[-1]:.4f}")
# Look for the LR where loss clearly separates from the starting value
# fastest, without diverging -- that's roughly the right order of magnitude.
```

## Step 2: check the loss is actually measuring what the metric reports

A surprisingly common cause of "training plateaus" is that the loss being optimized and the metric being watched aren't actually well-correlated — for example, optimizing per-token cross-entropy while watching a sequence-level exact-match metric that's dominated by a handful of hard tokens the loss barely weights. Plot the training loss and the tracked metric on the same x-axis; if the loss is visibly decreasing while the metric is flat, the mismatch is between what's being optimized and what's being watched, not a training failure at all.

## Step 3: check the data is actually varied and labeled as expected

A plateau is sometimes a data problem wearing a training-problem costume. Check label distribution for a collapse (every example effectively getting the same label after some preprocessing step), check for accidental deduplication that shrank the effective dataset to a handful of repeated examples, and check that an augmentation or preprocessing step isn't destroying the signal the model needs:

```python
import collections
label_counts = collections.Counter(dataset["label"])
print(label_counts)
# A near-total collapse onto one label, or far fewer unique labels than
# expected, often explains a stubborn plateau better than "wrong architecture."
```

## Step 4: check capacity and representation, not just optimization

If the LR sweep, loss/metric alignment, and data all check out, the remaining candidates shift from "optimization problem" to "representation problem": the model may genuinely lack the capacity to represent the function needed (worth checking by substantially increasing model size on a small subset and seeing whether the plateau moves), or the input features may not contain the signal needed to predict the target at all, which no amount of capacity or training time will fix.

## Putting the order together

The reason to follow roughly this order — LR, then loss/metric mismatch, then data, then capacity — is cost: an LR sweep takes minutes on a small subset, a label-distribution check takes seconds, and both are far cheaper to rule out than redesigning an architecture on the hypothesis that it lacks capacity. Jumping straight to "maybe the architecture is wrong" skips the checks most likely to actually explain a plateau, and is the single most common reason debugging a stuck run takes days instead of hours.

## Key terms

- **Learning-rate sweep** — training briefly at several learning rates spanning orders of magnitude to rule out LR as the cause of a stuck loss
- **Loss/metric mismatch** — a case where the optimized loss is decreasing but the tracked metric isn't, because the two aren't well-correlated for the examples that matter
- **Label collapse** — a data bug where most or all examples end up with the same label after some preprocessing step, often misdiagnosed as a model or optimization failure
- **Representation/capacity problem** — a case where the model architecture or input features genuinely lack the capacity or signal to solve the task, which no amount of further optimization will fix
