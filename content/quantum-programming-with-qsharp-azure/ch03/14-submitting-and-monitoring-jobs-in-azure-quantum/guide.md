# Submitting & Monitoring Jobs in Azure Quantum

Once you have a workspace and know which target you want — simulator, resource estimator, or real hardware — the actual act of running something is the same shape every time: submit a job, poll its status, retrieve its results once it finishes.

## What you'll learn

- The real job lifecycle: Waiting → Executing → Succeeded/Failed
- How to submit and monitor a job from the Azure CLI and from the `azure-quantum` Python SDK
- Why you retrieve results differently for a simulator/hardware run versus a resource-estimator run
- Realistic operational concerns: queueing, cost accrual, and why you dry-run on a simulator first

## The job lifecycle

Every job you submit to Azure Quantum — regardless of target — moves through the same states: **Waiting** (queued, not yet started; this is where real-hardware jobs can sit for a meaningful amount of time behind other customers' jobs), **Executing** (actively running), and finally **Succeeded** or **Failed**. Your code either polls this status in a loop or blocks on a helper that does the polling for you; either way, nothing about submitting a job is synchronous the way calling a local simulator function is — you get a job handle back immediately, and the actual computation happens somewhere else, on its own schedule.

## Submitting and checking a job from the CLI

```bash
az quantum job submit \
  --resource-group rg-quantum-dev \
  --workspace-name qsharp-dev-workspace \
  --target-id ionq.simulator \
  --project path/to/project \
  --job-name my-first-job

az quantum job show \
  --resource-group rg-quantum-dev \
  --workspace-name qsharp-dev-workspace \
  --job-id <job-id>

az quantum job output \
  --resource-group rg-quantum-dev \
  --workspace-name qsharp-dev-workspace \
  --job-id <job-id>
```

`job submit` returns immediately with a job ID once the job is accepted into the queue; `job show` reports its current status; `job output` retrieves the results once status is `Succeeded`. This three-step shape — submit, poll, fetch — is the same regardless of which target string you pass to `--target-id`.

## Submitting and monitoring from Python

The `azure-quantum` SDK wraps the same lifecycle into a few calls against your `Workspace` object:

```python
from azure.quantum import Workspace

workspace = Workspace(
    subscription_id="<subscription-id>",
    resource_group="rg-quantum-dev",
    name="qsharp-dev-workspace",
    location="eastus",
)

job = workspace.submit(program, target="ionq.simulator", shots=1000, job_name="my-first-job")
job.wait_until_completed()   # blocks, polling status internally
results = job.get_results()  # histogram of measurement outcomes, once Succeeded
```

`job.wait_until_completed()` is doing exactly the polling loop you'd otherwise write by hand with repeated `job show` calls — useful in a script, less useful in an interactive notebook session where you might want to check back later instead of blocking.

## Results look different depending on the target

For a simulator or real-hardware job, `get_results()` (or `job output` on the CLI) gives you a histogram: each distinct measured bitstring and how many of your requested shots produced it. For a resource-estimator job, the "result" is the structured hardware-requirements report from the previous lesson — physical qubit counts and runtime, not measurement outcomes — so code that processes results needs to know which kind of target produced the job before it tries to interpret the payload.

## Real operational concerns

Three things matter once you're submitting jobs for real, not just in a tutorial:

- **Queueing.** Real hardware targets share a physical device across many customers' jobs; your `Waiting` state can last anywhere from seconds to a meaningful wait depending on how busy that provider's queue is. Simulator and resource-estimator jobs typically don't share a physical bottleneck in the same way and tend to return far faster.
- **Cost accrual.** Real hardware jobs (and some simulator/provider tiers) accrue cost per job or per shot once they run — submitting the same buggy job five times while debugging is not free the way rerunning a local simulator is.
- **Dry-run on a simulator first.** Given both of the above, the realistic workflow is: validate correctness on a local or cloud simulator (fast, usually free, exact), confirm feasibility with the resource estimator if relevant, and only then submit the validated program to a real-hardware target — not as your first attempt at debugging.

## Key terms

| Term | Meaning |
|---|---|
| Job | A single submitted unit of work against an Azure Quantum target, identified by a job ID |
| Job lifecycle | The Waiting → Executing → Succeeded/Failed states every job moves through |
| `job.wait_until_completed()` | An `azure-quantum` SDK call that blocks, polling job status internally, until the job finishes |
| Histogram | The measurement-outcome result format returned by simulator and real-hardware jobs (not resource-estimator jobs) |

## Check yourself

Why would blocking on `job.wait_until_completed()` be a reasonable choice in an automated script, but a poor choice in an interactive notebook session where you submitted a job to real hardware with a long queue?
