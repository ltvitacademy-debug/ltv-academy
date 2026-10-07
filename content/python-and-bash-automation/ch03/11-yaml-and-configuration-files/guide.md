# YAML & Configuration Files

As Northbridge Retail's automation scripts multiplied, so did their config files — and the team standardized on YAML for nearly all of them. YAML is easier for a human to read and edit than JSON, which matters a lot when the people editing deployment configs aren't always the people who wrote the scripts. This lesson covers YAML syntax, reading it safely in Python, and how it stacks up against JSON and INI.

## What you'll learn

- Core YAML syntax: mappings, lists, nesting, and comments
- Reading YAML in Python with PyYAML's `yaml.safe_load`
- Why `safe_load` and not the plain `yaml.load`
- How YAML compares to JSON and INI, and when each format earns its place

## YAML syntax basics

YAML uses indentation instead of braces and brackets. A mapping (like a dict) is just `key: value` pairs; a list uses a leading dash. Here's a real deployment config Northbridge uses for its order-sync service:

```yaml
# order-sync deployment config
service: order-sync
environment: production
replicas: 3
resources:
  cpu: "500m"
  memory: "512Mi"
tags:
  - retail
  - backend
  - tier-1
healthcheck:
  path: /healthz
  interval_seconds: 30
```

Indentation (always spaces, never tabs) defines nesting — `resources` has two child keys, `tags` is a list of three strings. Lines starting with `#` are comments, which is one real advantage over JSON: you can annotate the config in place.

## Reading YAML in Python

PyYAML is the standard library for this (install with `pip install pyyaml`). Reading a file is one call:

```python
import yaml

with open("order-sync.yaml") as f:
    config = yaml.safe_load(f)

print(config["service"])          # order-sync
print(config["resources"]["cpu"]) # 500m
print(config["tags"][0])          # retail
```

Once loaded, a YAML mapping becomes a Python dict and a YAML list becomes a Python list — identical to what you got from `json.load()` in the last lesson. That's the appeal: the same dict/list code you already write works no matter which format the config started as.

## Why `safe_load`, never `load`

PyYAML has two loading functions, and the choice matters:

```python
# Safe: only builds plain Python types (str, int, dict, list, bool, None)
config = yaml.safe_load(f)

# Dangerous: can be made to construct arbitrary Python objects,
# including ones that execute code on load. Never use this on a file
# you didn't write yourself.
config = yaml.load(f)   # AVOID
```

`yaml.load()` without a safe loader can be tricked into instantiating arbitrary Python objects from specially crafted YAML — a real code-execution risk if the file ever comes from outside your own team. `yaml.safe_load()` restricts parsing to plain data types and nothing else. Always use `safe_load`; there is essentially never a good reason to reach for the unsafe version.

## YAML vs. JSON vs. INI

Northbridge's team picked YAML for new configs, but all three formats still show up:

- **JSON** — best for data exchanged between programs (APIs, inventory feeds). No comments, stricter syntax, slightly more painful for humans to hand-edit.
- **YAML** — best for configs humans write and review. Supports comments, less punctuation, but whitespace-sensitive and easy to break with a stray tab.
- **INI** — simplest format (`[section]` headers, `key = value` lines), fine for flat settings but can't represent nested structure well. You'll still see it in legacy tooling.

For anything with nested structure that a person needs to read and edit — deployment configs, CI pipelines, app settings — YAML is usually the right call. For data moving between two programs, JSON stays the default.

## Key terms

- **YAML mapping** — a `key: value` pair, equivalent to a dict entry
- **YAML list** — a sequence of `- item` lines, equivalent to a Python list
- **`yaml.safe_load()`** — parses YAML into plain Python types only
- **`yaml.load()`** — the unsafe loader; can execute arbitrary code from crafted input, avoid it
- **INI format** — flat `[section]` / `key = value` config format with no real nesting support

## Recap

YAML trades JSON's strict punctuation for indentation and comments, which makes it the better choice for configs that humans write and review by hand. PyYAML's `yaml.safe_load()` turns that YAML straight into the same dicts and lists you already know how to work with — just always use `safe_load`, never the plain `load`. Next up: environment variables and secrets, and why none of this config should ever contain an API key.
