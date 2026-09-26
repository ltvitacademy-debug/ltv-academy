# Compute & Environments

On your laptop, "where does my code run" and "what is installed" are answered by whatever machine and Python you happen to have. In Azure Machine Learning both answers are explicit resources you name, share and version: **compute** is the machine, and an **environment** is the software recipe. Getting comfortable with both is what makes your work reproducible for a teammate, and affordable for your employer.

All Azure code in this lesson is illustrative (not run here, since it needs an Azure subscription) and follows the Microsoft Learn documentation for SDK v2 (`azure-ai-ml`) as of this writing. Names, VM sizes and defaults change, so check the current docs before you rely on them.

## What you'll learn

- The difference between a compute instance, a compute cluster and serverless compute
- How autoscaling and idle shutdown keep costs under control
- What an environment is, and the three ways to define one
- Why pinning package versions matters, shown with real code

## Three kinds of managed compute

Azure Machine Learning has three managed compute options:

- **Compute instance**: a managed cloud workstation for one person. It runs Jupyter, JupyterLab or VS Code and comes preconfigured with ML packages. It has a single owner, and it costs money while it is running.
- **Compute cluster**: a shared pool of one or more nodes that scales up when a job is submitted and can scale down to zero nodes when idle. This is where training jobs normally run.
- **Serverless compute**: you do not create anything. You submit a job without naming a compute and the service provisions capacity for you.

You can also attach other targets, such as Kubernetes clusters or remote VMs, for specific scenarios. The mental model: develop interactively on a compute instance, and run repeatable, bigger work as jobs on a cluster or serverless.

## Creating a compute instance

In the studio you pick a name, whether you want CPU or GPU, and a VM size. The screenshot in this lesson is Microsoft's own, showing sizes annotated with workload types (for example, one size for "classical ML model training on small datasets" and another for "data manipulation and training on medium-sized datasets"). Note the available quota column: your subscription has core limits per region and VM family, and requesting more is a common early hurdle.

From code:

```python
# Illustrative - not run here.
from azure.ai.ml.entities import ComputeInstance

ci = ComputeInstance(
    name="alex-dev-ci",
    size="STANDARD_DS3_v2",
    idle_time_before_shutdown_minutes=30,
)
ml_client.begin_create_or_update(ci).result()
```

The `idle_time_before_shutdown_minutes` argument comes straight from the docs. Idle shutdown is the single most useful cost control for a compute instance: a forgotten running workstation is the classic surprise bill. Per the docs, you can't change the idle time on an existing instance from the SDK, so set it at creation.

## Creating a compute cluster

```python
# Illustrative - not run here.
from azure.ai.ml.entities import AmlCompute

cluster = AmlCompute(
    name="cpu-cluster",
    size="STANDARD_DS3_v2",
    min_instances=0,
    max_instances=2,
    idle_time_before_scale_down=120,
)
ml_client.begin_create_or_update(cluster).result()
```

`min_instances=0` means the cluster costs nothing for compute while no job runs; `max_instances` caps how far it can grow; `idle_time_before_scale_down` is the number of idle seconds before nodes are released. The docs also describe a low-priority tier that is cheaper but can be preempted, which suits restartable work.

## What is an environment?

An Azure ML **environment** specifies the Python packages and software settings your scripts need. The workspace versions it, and the service builds it into a Docker image that is cached and reused. There are three categories:

- **Curated**: prebuilt by Microsoft with popular frameworks; use as is. In code you reference one with a URI such as `azureml://registries/azureml/environments/sklearn-1.5/labels/latest` (check the docs for the current list).
- **System-managed**: you supply a conda specification plus a base Docker image, and conda builds the Python environment on top.
- **User-managed**: you bring the whole container image or a Docker build context.

```python
# Illustrative - not run here.
from azure.ai.ml.entities import Environment

env = Environment(
    name="churn-env",
    image="mcr.microsoft.com/azureml/openmpi4.1.0-ubuntu20.04",
    conda_file="environment/conda.yml",
    description="scikit-learn churn model",
)
ml_client.environments.create_or_update(env)
```

## Why pinning matters (this part runs locally)

Azure ML decides whether it can reuse a cached image by hashing the environment definition (base image, Docker steps, conda dependencies and so on). We can mimic the spirit of that on your own machine. This script writes out a conda spec pinned to the packages actually installed here, and fingerprints it:

```python
import hashlib, platform
import numpy, pandas, sklearn

spec = f"""name: churn-env
dependencies:
  - python={platform.python_version()}
  - pip
  - pip:
      - numpy=={numpy.__version__}
      - pandas=={pandas.__version__}
      - scikit-learn=={sklearn.__version__}
"""
print(spec)
fp = lambda t: hashlib.sha256(t.encode()).hexdigest()[:12]
print("spec hash:", fp(spec))
print("one version changed:",
      fp(spec.replace(sklearn.__version__, "1.5.2")))
```

Real output on the course machine:

```
name: churn-env
dependencies:
  - python=3.9.13
  - pip
  - pip:
      - numpy==1.23.1
      - pandas==1.4.3
      - scikit-learn==1.1.2

spec hash: c27a4b0ae6ef
one version changed: c7f88d27c76a
```

This is only an analogy; Azure's real hashing covers more than this and is computed by the service. The lesson: change one pin and you have a different environment. Unpinned specs are how "it worked on my machine" happens in the cloud.

## Recap

- Compute instance = personal cloud workstation; compute cluster = shared autoscaling pool for jobs; serverless = no compute to manage.
- Control cost with `min_instances=0`, scale-down timers and idle shutdown.
- An environment is a versioned, pinned software recipe that Azure builds into a cached Docker image: curated, system-managed (conda plus base image) or user-managed.
- Pin your versions.

Next up: getting your data to that compute with data assets and datastores.
