# Azure ML Studio vs. SDK

By now you have touched Azure Machine Learning in three ways: clicking through the studio, writing Python with the SDK, and reading a little YAML. These are not three products. They are three front doors to the same workspace, the same jobs, the same data assets and the same compute. Knowing which door to use for which task is a practical skill, and this lesson closes the foundations chapter with it.

Azure examples are illustrative (not run here) and follow Microsoft Learn as of this writing; menu names, preview labels and version support change, so check the current docs.

## What you'll learn

- The interfaces to a workspace: studio, Python SDK v2, CLI v2 with YAML, and others
- What the studio's guided job form can do without code
- What a YAML job definition looks like and why teams keep it in git
- Why you should use v2, not v1, for anything new

## One workspace, several interfaces

Microsoft's workspace documentation lists the ways to interact with a workspace: on the web through the Azure portal, Azure Machine Learning studio and the designer; in any Python environment with the SDK; on the command line with the CLI extension v2; and in the Azure Machine Learning VS Code extension. The REST APIs sit underneath, and you can call them directly for integration work.

Microsoft's guidance on CLI v2 and SDK v2 is that there is no difference in functionality between them, and that the CLI can be more convenient in CI/CD MLOps scenarios while the SDK can be more convenient for development. Both use the same nouns and verbs: jobs, environments, models, compute, and create, list, show, update.

## The studio: see and click

The studio is the best place to look around and to do quick, no-code work. Its home page has a **+ New** menu (in the screenshot: component, compute cluster, compute instance, data asset, datastore, endpoint, environment, model, notebook, pipeline, training job and more). Choosing **Training job** opens a guided form. The docs describe it as a public-preview feature as of this writing, so verify its status. The first step asks how you want to train:

- **Train automatically**: an automated ML job (lesson 8).
- **Run a custom training script**: a command job, like the one from lesson 4.
- **Perform hyperparameter tuning**: a sweep job (lesson 9).

The form then walks through basic settings (job name, experiment, description, timeout, tags), your code and command, compute, environment and a review page. Studio is also where you inspect finished work: metrics charts, logs, the code snapshot, data lineage, and model details.

## The SDK: repeat and compose

The Python SDK v2 (`azure-ai-ml`) is where you build things you will run more than once. Microsoft's docs point out that it lets you start with a single command, add a hyperparameter sweep on top of it, and then chain commands into a pipeline, incrementally. You already know its shape: `MLClient`, `command(...)`, `Input(...)`, `ml_client.jobs.create_or_update(job)`. Because it is Python, you can loop, parameterize and test it like any code.

## The CLI: describe in YAML

The CLI v2 is an extension to the Azure CLI, installed with `az extension add -n ml`. Commands follow the pattern `az ml <noun> <verb> <options>`, and assets and workflows are defined in YAML files. A job might look like this (illustrative; based on the documented command job schema):

```yaml
$schema: https://azuremlschemas.azureedge.net/latest/commandJob.schema.json
code: src
command: >-
  python train.py --data ${{inputs.data}}
  --n_estimators ${{inputs.n_estimators}}
inputs:
  data:
    type: uri_file
    path: azureml:churn-data:1
  n_estimators: 100
environment: azureml://registries/azureml/environments/sklearn-1.5/labels/latest
compute: azureml:cpu-cluster
display_name: churn-gbm
experiment_name: churn
```

and you submit it with `az ml job create --file job.yml`. Notice this is the same information as the SDK call: code, command, inputs, environment, compute.

## Why YAML in git is powerful (this runs locally)

A YAML job is a plain text file, so it can be code-reviewed and versioned. To make that concrete, this script parses the job above with PyYAML, then shows what a pull request would display when someone bumps the tree count and moves to data version 2:

```python
import difflib, yaml
spec = yaml.safe_load(job_yaml)          # job_yaml is the text above
print(sorted(k for k in spec if not k.startswith("$")))
print(spec["inputs"]["data"])
# ...then diff the old text against an edited copy with difflib
```

Real output:

```
['code', 'command', 'compute', 'display_name', 'environment', 'experiment_name', 'inputs']
{'type': 'uri_file', 'path': 'azureml:churn-data:1'}
--- job.yml
+++ job.yml
@@ -9,2 +9,2 @@
-    path: azureml:churn-data:1
-  n_estimators: 100
+    path: azureml:churn-data:2
+  n_estimators: 300
```

Two lines changed, and a reviewer sees exactly what changed about the experiment. That is the seed of MLOps, which we return to in later courses.

## When to use which

- **Studio**: explore the workspace, inspect runs and metrics, try no-code options, one-off tasks.
- **SDK v2**: develop in notebooks and scripts, build reusable Python workflows and pipelines.
- **CLI v2 + YAML**: automation, CI/CD, and configuration you want reviewed in version control.

## Use v2 for new work

Older code and tutorials use SDK v1 (packages like `azureml-core`, with `Workspace`, `Experiment` and `ScriptRunConfig`). Microsoft's docs give September 30, 2025 as the end of support for CLI v1 and June 30, 2026 for SDK v1, and recommend moving to v2 (check the current migration page for the latest status). When you find an old blog post, check which version it uses before copying code.

## Recap

- Studio, SDK, CLI and VS Code are front doors to the same workspace objects.
- Studio for looking and clicking; SDK for building in Python; CLI with YAML for automation and review.
- A job is the same five parts whichever interface creates it.
- Use v2 (`azure-ai-ml`, `az ml`) for anything new.

That completes the foundations. Next chapter: running training jobs properly and tracking every experiment.
