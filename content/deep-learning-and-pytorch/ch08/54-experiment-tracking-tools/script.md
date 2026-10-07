# Script — Experiment Tracking Tools

## Segment 1 (title)

Printing loss to the terminal works fine for one run. It stops working the moment you're comparing twenty runs with different learning rates, or trying to remember which configuration produced last week's best checkpoint. Experiment tracking tools log your metrics and hyperparameters somewhere you can browse and compare later.

## Segment 2 (code)

SummaryWriter is built right into PyTorch. You log scalars during training, close the writer, and then serve a local dashboard with the tensorboard command — no account, no external service, everything stays on your machine.

## Segment 3 (code)

Weights and Biases is a hosted alternative built specifically for comparing many runs side by side. The logging code looks almost identical — init a run, log scalars in the loop, finish at the end. The real difference is what happens on the other end: the config you pass to init gets attached to that run permanently, searchable and filterable weeks later.

## Segment 4 (steps)

So which one, when: TensorBoard costs nothing to set up and is genuinely enough for solo work. Reach for a hosted tool like Weights and Biases once comparing runs by eye across separate local tabs stops scaling, or once more than one person needs to look at the same results.

## Segment 5 (steps)

Whichever tool you pick, the habit that actually makes any of this useful is logging the hyperparameters alongside the metrics, not metrics alone. A loss curve with no record of its learning rate or batch size is much less useful six runs later.

## Segment 6 (outro)

Next lesson: reproducibility — making sure a run you logged today can actually be reproduced tomorrow.
