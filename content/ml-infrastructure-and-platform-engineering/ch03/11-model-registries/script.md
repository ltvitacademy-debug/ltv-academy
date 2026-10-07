# Script — Model Registries

## Segment 1 (title)

A tracked run with good metrics is still just an experiment. Before anyone deploys it, something has to answer which version this is, whether it's the one currently live, and where it came from. That's the job of a model registry — the layer on top of experiment tracking that turns a run into a named, versioned, deployable model.

## Segment 2 (screenshot)

This is the registry's overview page — every registered model listed with its latest version. It's the catalog a deployment job should actually be reading from, instead of a folder of pickled files on somebody's laptop.

## Segment 3 (code)

Registering a model takes the artifact from a specific run and files it under a name, like fraud-detector. Each call auto-increments the version — version one, two, three — and every version keeps a permanent pointer back to the run that produced it, so it doesn't change even if the original experiment gets deleted later.

## Segment 4 (steps)

Early MLflow gave every version a stage — none, staging, production, or archived. It worked, but stage belongs to the version, which means only one version can hold a given stage across the whole registry at once, and production means something different on every team. MLflow has actually deprecated this workflow for exactly that reason.

## Segment 5 (code)

The current recommendation is aliases. An alias like champion is a mutable, named pointer to a specific version, and a serving job resolves it at load time instead of hardcoding a version number. Promoting a new model means moving the alias — nothing downstream has to change at all.

## Segment 6 (screenshot)

Here's what that looks like in the registry itself — champion assigned to one version. Reassigning it to a newer version is instant, and it never touches the version history sitting underneath it.

## Segment 7 (outro)

A registry gives you a stable name and version on top of a run, and aliases now do the lifecycle job stages used to do badly. Next, lesson twelve: what should actually travel with every version to make it reproducible, not just named.
