# Script — Building Your First dbt Model

## Segment 1 (title)

You already have the pieces: a declared source, a staging model on top of it, and ref to connect them. Building your first real model is combining them into one new file.

## Segment 2 (steps: the walkthrough)

Write the model file anywhere under models, using ref calls against your staging models to join and aggregate. Save it. That's it — no registration step, no separate command to add it to the project.

## Segment 3 (screenshot: real terminal, model just picked up)

This is a real terminal from exactly that moment: dbt run now finds 3 models instead of 2, because a brand-new customers model was just saved on top of two starter models. It gets picked up and built automatically, in the right position, because of its own ref calls.

## Segment 4 (steps: if it doesn't show up)

If a new model doesn't show up, there are only two things to check: is the file under a path listed in model-paths in dbt_project.yml, and does it have a .sql extension. Those are the only two things that make a file a model to dbt.

## Segment 5 (outro)

Next lesson: Model Materializations — view, table, incremental, and ephemeral, and how to choose the right one for each layer.
