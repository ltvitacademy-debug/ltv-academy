# Config Systems for Experiments

Every experiment is a function of code plus configuration: the model architecture, learning rate, batch size, dataset split, and dozens of other knobs. The question this lesson answers is how research teams manage that configuration so that changing one knob doesn't mean editing Python, and so that every run's exact configuration is recoverable later. The dominant answer in ML research today is Hydra, built on top of OmegaConf, and this lesson covers it in depth alongside the simpler alternatives it replaced.

## What you'll learn

- Why plain argparse breaks down once a project has more than a handful of hyperparameters
- How Hydra's YAML configs and config groups work, and how `@hydra.main` wires them into your script
- How to override any config value from the command line without touching a file
- How to compose configs from multiple groups, and how Hydra multirun sweeps multiple configs in one command

## Why argparse stops scaling

A small script can get away with `argparse`: a flat list of `--lr`, `--batch-size`, `--model-name` flags. This breaks down fast in research code because configs grow nested (optimizer settings, model settings, data settings), configs need to be saved alongside every run for reproducibility, and researchers want to swap an entire group of related settings — "use the ResNet config" — without retyping ten flags. Hydra was built specifically to solve these three problems for research codebases.

## Hydra basics: `@hydra.main` and YAML configs

A minimal Hydra setup looks like this:

```python
# train.py
import hydra
from omegaconf import DictConfig, OmegaConf

@hydra.main(version_base=None, config_path="configs", config_name="config")
def main(cfg: DictConfig) -> None:
    print(OmegaConf.to_yaml(cfg))
    model = build_model(cfg.model)
    train(model, lr=cfg.optimizer.lr, epochs=cfg.train.epochs)

if __name__ == "__main__":
    main()
```

```yaml
# configs/config.yaml
defaults:
  - model: resnet
  - optimizer: sgd
  - _self_

train:
  epochs: 90
  batch_size: 256
seed: 0
```

```yaml
# configs/model/resnet.yaml
name: resnet50
pretrained: false

# configs/optimizer/sgd.yaml
lr: 0.1
momentum: 0.9
```

The `defaults` list is a **config group** composition: Hydra loads `configs/model/resnet.yaml` into `cfg.model` and `configs/optimizer/sgd.yaml` into `cfg.optimizer`, then merges in `config.yaml`'s own top-level keys (`_self_`). The decorated `main` function receives the fully composed config as a `DictConfig`, which behaves like a nested object (`cfg.optimizer.lr`) and like a dict interchangeably.

## Command-line overrides

The payoff is that any value in the composed config can be overridden from the shell, no code changes required:

```bash
python train.py optimizer.lr=0.01 train.batch_size=128
python train.py model=vit                    # swap the whole config group
python train.py model=vit optimizer=adamw     # swap multiple groups at once
python train.py +optimizer.weight_decay=0.01  # add a new key with +
```

Hydra also writes the fully resolved config it actually ran with into a timestamped output directory (`outputs/2026-10-06/14-32-01/.hydra/config.yaml` by default), which is the exact file you want attached to any run's results — it answers "what config produced this number" with no ambiguity.

## Multirun sweeps

Adding `-m` (or `--multirun`) turns one command into a sweep over the Cartesian product of the values given:

```bash
python train.py -m optimizer.lr=0.01,0.1,1.0 seed=0,1,2
```

That single command launches nine runs (three learning rates times three seeds), each in its own output subdirectory under `multirun/`. This is the same mechanism Chapter 4's hyperparameter sweeps build on, just invoked locally instead of across a cluster.

## Hydra vs. argparse vs. plain YAML+OmegaConf

- **argparse** is fine for a two-or-three-flag script. It has no composition, no nested structure, and no automatic run-output logging — you'd hand-roll all of that yourself.
- **Plain YAML + OmegaConf** (`OmegaConf.load("config.yaml")`, `OmegaConf.merge(...)`) gives you structured, mergeable configs without Hydra's CLI override grammar or its automatic output-directory management. It's a reasonable middle ground for small projects that want structured configs but not the full framework.
- **Hydra** is the standard for anything with more than a couple of config groups, because command-line overrides, composition, multirun sweeps, and automatic config logging all come for free.

## Key terms

- **Config group** — a named set of interchangeable YAML files (e.g. `model/resnet.yaml`, `model/vit.yaml`) selected via the `defaults` list or a command-line override
- **`DictConfig`** — the OmegaConf object Hydra passes into your `@hydra.main`-decorated function, usable as both an attribute object and a dict
- **Override syntax** — `key=value` on the command line changes an existing key; `+key=value` adds a new one
- **Multirun (`-m`)** — launches one run per combination of comma-separated override values, used for local sweeps
