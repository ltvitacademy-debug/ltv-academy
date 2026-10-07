# Script — What a Training Run Actually Costs

## Segment 1 (title)

Lesson two gave you the FLOPs-to-GPU-hours math. This lesson zooms out to everything that shows up on the real cost sheet for a large training run, because raw compute, while the biggest line item, is rarely the only one.

## Segment 2 (code)

Meta's Llama 2 technical report publicly disclosed GPU-hours for each model in the family, which gives us a real anchor instead of a purely theoretical one -- the 70 billion parameter model reportedly used around one point seven million A100 GPU-hours to pretrain. Multiply that by a realistic dollar-per-GPU-hour rate and you get a back-of-envelope compute cost, though real negotiated pricing varies enormously, which is exactly why labs publish GPU-hours rather than a dollar figure.

## Segment 3 (steps)

A FLOPs formula leaves a lot out. Data acquisition and curation, licensing and crawling and the whole pipeline from lesson three, all happen before a single training token is consumed. Failed and restarted runs effectively spend GPU-hours twice on the same stretch of training. Evaluation runs at many checkpoints throughout training, not just once at the end. And none of this counts the engineering headcount or the storage and networking behind the scenes -- checkpoints alone for a large model can run hundreds of gigabytes each, saved repeatedly over the course of a run.

## Segment 4 (steps)

There's a subtle distinction worth holding onto: the GPU-hours in a technical report usually describe only the final successful run, not the much larger research investment, the ablations and experiments, that informed every decision baked into it.

## Segment 5 (outro)

So a published GPU-hour number is a real anchor, but only a fraction of the true cost of reaching that capability. Next up, lesson six: how to actually read a model's technical report to find numbers like these.
