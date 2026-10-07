# Kubernetes for Research Jobs

Kubernetes wasn't built for research workloads — it was built for long-running services. But it's increasingly common in industry research labs, usually because the company already runs Kubernetes for production infrastructure and research reuses the same cluster rather than standing up a second, Slurm-based one. Using it well means working with its `Job` and `CronJob` primitives rather than fighting the scheduler's service-oriented defaults.

## What you'll learn

- The `Job` resource: Kubernetes' primitive for run-to-completion workloads
- Requesting GPUs and resource limits in a pod spec
- Why Kubernetes vs. Slurm is usually a platform decision, not a research-team one
- Checking job status and logs with `kubectl`

## The Job resource

A Kubernetes `Deployment` is built to run forever and restart on failure — the wrong model for a training run that should execute once and stop. A `Job` is Kubernetes' primitive for exactly that: run-to-completion work.

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: train-sweep-214-trial-07
spec:
  template:
    spec:
      containers:
      - name: train
        image: registry.example.com/research-train:latest
        command: ["python", "train.py", "--config", "configs/trial_07.yaml"]
        resources:
          limits:
            nvidia.com/gpu: 1
            memory: "32Gi"
      restartPolicy: Never
  backoffLimit: 2
```

`restartPolicy: Never` combined with `backoffLimit` controls retry behavior on failure — unlike a `Deployment`, which would restart the container indefinitely, a `Job` gives up after a bounded number of attempts and reports failure, which is what you want for a training run with a real bug rather than a transient issue.

## GPU requests and resource limits

GPU access in Kubernetes goes through the NVIDIA device plugin, requested the same way as CPU or memory — as a resource limit on the container:

```yaml
resources:
  requests:
    memory: "16Gi"
    cpu: "4"
  limits:
    nvidia.com/gpu: 2
    memory: "32Gi"
```

`requests` is what the scheduler guarantees when placing the pod; `limits` is the hard ceiling the container can't exceed. GPUs are only meaningfully specified as a limit (Kubernetes doesn't support fractional or oversubscribed GPU requests the way it does CPU), so a pod requesting `nvidia.com/gpu: 2` gets exactly 2 whole GPUs or stays pending until they're available.

## Kubernetes vs. Slurm: usually not the research team's call

Most research teams don't choose between Kubernetes and Slurm from first principles — they inherit whichever one the organization's infrastructure already runs. Slurm has decades of tuning specifically for HPC/research workloads (job arrays, fair-share scheduling tuned for compute-bound batch jobs); Kubernetes has the advantage of being the same platform the rest of the company's infrastructure runs on, which matters when research code needs to talk to production services or reuse the same CI/CD and observability tooling. Neither is objectively better across the board — the right answer depends on what else is already running on the cluster.

## Checking status and logs

```bash
kubectl get jobs                           # see all jobs and their completion status
kubectl describe job train-sweep-214-trial-07   # detailed status, including failure reasons
kubectl logs job/train-sweep-214-trial-07        # the job's stdout/stderr
```

`kubectl describe` is the first stop when a job fails without an obvious reason in the logs — it surfaces scheduling failures (couldn't find a node with a free GPU) that never reach the container's own output at all.

## Key terms

- **Job (Kubernetes)** — the resource type for run-to-completion workloads, as opposed to `Deployment`'s always-running model
- **`backoffLimit`** — the number of retry attempts Kubernetes allows before marking a `Job` as failed
- **Resource requests vs. limits** — requests are what the scheduler guarantees at placement time; limits are the hard ceiling a container can't exceed
- **NVIDIA device plugin** — the Kubernetes mechanism that exposes GPUs as a schedulable resource (`nvidia.com/gpu`)
