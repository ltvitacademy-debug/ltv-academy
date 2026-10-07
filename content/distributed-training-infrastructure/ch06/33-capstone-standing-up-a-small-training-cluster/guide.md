# Capstone: Standing Up a Small Training Cluster

Everything so far has described `solara-train` — 64 nodes, 512 H100s, a 70-billion-parameter model. You don't need that cluster to practice the actual infrastructure skills this course has covered. This capstone walks through standing up a small, real, multi-node PyTorch training setup — 2 to 4 nodes, however many GPUs you have access to (or none; it works on CPU with the `gloo` backend) — that exercises the same pieces `solara-train` runs at scale: a `PyTorchJob`, Training-Operator-injected `torchrun` environment variables, checkpointing to S3-compatible storage, and basic monitoring. Build this on a local `kind` or `minikube` cluster, or a handful of small cloud instances — the pattern is identical either way.

## What you'll learn

- How to install the Kubeflow Training Operator and submit a real `PyTorchJob`
- How `torchrun` environment variables get injected automatically, without you setting them
- How to wrap a small model in FSDP and checkpoint it with `torch.distributed.checkpoint`
- How to confirm, end to end, that the job actually ran as a distributed job and not four independent copies

## Step 1 — Install the Kubeflow Training Operator

```bash
kubectl apply -k "github.com/kubeflow/training-operator/manifests/overlays/standalone"
kubectl get pods -n kubeflow
# training-operator-xxxxx   1/1   Running
```

This installs the controller that watches for `PyTorchJob` objects and turns them into the right number of Pods, with the right environment variables, automatically.

## Step 2 — Write a `PyTorchJob` manifest

This defines 1 master and 3 workers — 4 nodes total, matching the "2 to 4 node" scope of this capstone. Drop `nvidia.com/gpu` from `resources` entirely if you're running CPU-only:

```yaml
apiVersion: kubeflow.org/v1
kind: PyTorchJob
metadata:
  name: capstone-run
  namespace: training
spec:
  pytorchReplicaSpecs:
    Master:
      replicas: 1
      restartPolicy: OnFailure
      template:
        spec:
          containers:
            - name: pytorch
              image: your-registry/capstone-train:latest
              command: ["torchrun", "--nnodes=4", "--nproc_per_node=1", "train.py"]
              resources:
                limits:
                  nvidia.com/gpu: 1
    Worker:
      replicas: 3
      restartPolicy: OnFailure
      template:
        spec:
          containers:
            - name: pytorch
              image: your-registry/capstone-train:latest
              command: ["torchrun", "--nnodes=4", "--nproc_per_node=1", "train.py"]
              resources:
                limits:
                  nvidia.com/gpu: 1
```

```bash
kubectl apply -f capstone-pytorchjob.yaml
kubectl get pytorchjobs -n training
```

## Step 3 — Don't set `MASTER_ADDR`, `RANK`, or `WORLD_SIZE` yourself

This is the detail that trips people up coming from single-machine PyTorch: the Training Operator injects `MASTER_ADDR`, `MASTER_PORT`, `RANK`, and `WORLD_SIZE` into every Pod's environment automatically, based on the replica spec above. `train.py` just reads them:

```python
import os, torch.distributed as dist

dist.init_process_group(backend="nccl")  # or "gloo" for CPU-only
rank = dist.get_rank()
world_size = dist.get_world_size()
print(f"rank {rank} of {world_size}, MASTER_ADDR={os.environ['MASTER_ADDR']}")
```

If this prints `world_size` of 4 on every Pod with a distinct `rank` 0–3, the job is genuinely distributed — not four accidental copies of a single-process script.

## Step 4 — Wrap the model in FSDP and checkpoint with DCP

A small model stands in for Solara-70B here — the pattern is identical at any scale:

```python
import torch.distributed.checkpoint as dcp
from torch.distributed.fsdp import FullyShardedDataParallel as FSDP

model = FSDP(model)  # shards parameters across the 4 ranks

# every N steps:
state_dict = {"model": model.state_dict(), "step": step}
dcp.save(state_dict, checkpoint_id="s3://your-bucket/capstone-checkpoints/step-500")

# on resume:
dcp.load(state_dict, checkpoint_id="s3://your-bucket/capstone-checkpoints/step-500")
```

Any S3-compatible endpoint works for this — a real S3 bucket, or a local MinIO instance if you're running entirely on `kind`.

## Step 5 — Basic monitoring, scaled down

You don't need a full Prometheus/Grafana/DCGM stack to practice the habit from Lesson 29 — `kubectl` alone confirms the job is healthy:

```bash
kubectl get pytorchjobs capstone-run -n training
kubectl logs -n training -l training.kubeflow.org/job-name=capstone-run --all-containers --prefix --tail=20
```

If you do have GPU nodes available, installing the DCGM Exporter + Prometheus + Grafana stack from Lesson 29 against this same small cluster is a genuinely useful extension — the manifests are identical regardless of cluster size.

## Key terms

- **`kind` / `minikube`** — tools for running a real, local, multi-node-capable Kubernetes cluster for practice
- **Training-Operator-injected env vars** — `MASTER_ADDR`, `MASTER_PORT`, `RANK`, `WORLD_SIZE`, set automatically per Pod
- **`gloo` backend** — PyTorch's CPU-compatible distributed backend, used when no GPU is available
- **MinIO** — an S3-API-compatible object storage server, usable as a local stand-in for a real S3 bucket

## Recap

Standing up this small cluster exercises the exact same pieces `solara-train` runs at 512-GPU scale: a `PyTorchJob`, automatically-injected `torchrun` environment variables, FSDP plus `torch.distributed.checkpoint` for fault tolerance, and `kubectl`-level monitoring. Next, the final lesson of the course: writing up what you built and reflecting on how it would need to change at 10x or 100x scale.
