# Script — Config Systems for Experiments

## Segment 1 (title)

Every experiment is code plus configuration — model, learning rate, batch size, dataset split. This lesson is about how research teams manage that configuration so changing one knob never means editing Python, and so every run's exact settings are recoverable later. The standard answer today is Hydra.

## Segment 2 (steps)

Plain argparse works for a two-flag script, but it breaks down fast in research code. Configs grow nested across model, optimizer, and data settings. Every run needs its exact config saved for reproducibility. And researchers want to swap a whole group of related settings at once, like switching to the ResNet config, without retyping ten flags. Hydra was built to solve exactly those three problems.

## Segment 3 (code)

The hydra-dot-main decorator wires a YAML config tree into your script. A defaults list in config-dot-yaml composes config groups — model and optimizer files each get merged into one DictConfig object, accessed like cfg-dot-optimizer-dot-lr. The decorated main function just receives that fully composed config; nothing about the script itself has to change when you add a new config group.

## Segment 4 (code)

The payoff is command-line overrides with zero code changes: optimizer.lr=0.01 changes a value, model=vit swaps the entire group, and a plus sign adds a brand new key. Hydra also writes the fully resolved config into a timestamped output folder on every run, so you always know exactly what produced a given number. Adding -m turns one command into a multirun sweep over every combination of the listed values.

## Segment 5 (outro)

That's the core of it: compose configs from groups, override from the shell, and let Hydra log exactly what ran. Up next, lesson thirteen: research code versus production code trade-offs — when this kind of discipline is worth it, and when it isn't yet.
