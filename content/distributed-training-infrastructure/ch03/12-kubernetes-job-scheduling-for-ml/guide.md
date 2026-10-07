# Kubernetes Job Scheduling for ML

The last chapter covered the InfiniBand fabric and NCCL collectives that let solara-train's 512 H100s behave like one machine during an AllReduce. None of that matters if the Solara ML Platform team can't reliably get a training job's processes started — one per GPU, 512 of them, all pointed at each other, at the same moment. This chapter is about exactly that: how a Solara-70B training run actually gets scheduled, queued, and launched on top of Kubernetes. This lesson starts with the gap between an ordinary Kubernetes workload and a distributed training job, and how the Kubeflow Training Operator closes it.

## What you'll learn

- Why a plain Kubernetes `Deployment` or `Job` doesn't fit a multi-node PyTorch training run
- What the Kubeflow Training Operator and its `PyTorchJob` custom resource actually do
- How torchrun's required environment variables (`MASTER_ADDR`, `MASTER_PORT`, `RANK`, `WORLD_SIZE`) get set automatically instead of by hand
- How a `PyTorchJob`'s lifecycle maps onto the Pods running underneath it

## Why a Job or Deployment isn't enough

You already know `Deployment` and `Job` from the Kubernetes Orchestration course. A `Deployment` keeps N identical, interchangeable replicas running forever — fine for a stateless API, wrong for training, where replica 0 (rank 0) does things no other replica does, like writing checkpoints and logging aggregate loss. A `Job` runs pods to completion with retry via `backoffLimit` — closer, but it still has no concept of "these 64 pods are one unit that must all start together, discover each other's network addresses, and fail together if any one of them dies mid-collective."

torchrun — the launcher Solara AI uses for every FSDP training run — expects each process to already know its `RANK`, `WORLD_SIZE`, `MASTER_ADDR`, and `MASTER_PORT` before it calls `init_process_group`. With bare Kubernetes primitives, the platform team would have to hand-build a headless `Service`, wait for every pod to become `Ready`, and inject those four values into each of 64 pods individually. That's exactly the kind of coordination problem a purpose-built controller should own instead.

## The Kubeflow Training Operator and PyTorchJob

The **Kubeflow Training Operator** adds a set of custom resources to Kubernetes for running ML training jobs, including `PyTorchJob`. A `PyTorchJob` spec splits replicas into a `Master` (rank 0) and one or more `Worker` groups. The operator watches for these objects and creates the underlying Pods and a headless Service on your behalf:

```yaml
apiVersion: kubeflow.org/v1
kind: PyTorchJob
metadata:
  name: solara-70b-train
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
              image: solara/train:fsdp-2.3
              command: ["torchrun", "train.py"]
              resources:
                limits:
                  nvidia.com/gpu: 8
    Worker:
      replicas: 63
      restartPolicy: OnFailure
      template:
        spec:
          containers:
            - name: pytorch
              image: solara/train:fsdp-2.3
              command: ["torchrun", "train.py"]
              resources:
                limits:
                  nvidia.com/gpu: 8
```

One `Master` plus 63 `Worker` replicas, 8 GPUs each, is 64 × 8 = 512 GPUs — the entire solara-train cluster dedicated to one Solara-70B run.

## How the env vars actually get set

The operator creates a headless `Service` for the job and derives a predictable DNS name for the Master pod (something like `solara-70b-train-master-0`). It then injects `MASTER_ADDR` (that DNS name), `MASTER_PORT`, `RANK` (derived from replica type and index), and `WORLD_SIZE` (total replica count) as environment variables into every Pod it creates — the same four values torchrun needs, now supplied automatically instead of by hand. The training container's entrypoint just runs `torchrun train.py`, and torchrun reads the env vars the operator already set.

## Job lifecycle

A `PyTorchJob` moves through conditions the operator reports on the object itself: `Created` when the Pods are submitted, `Running` once the Master and all Workers are up, and finally `Succeeded` or `Failed`. The operator watches every Pod's phase underneath and aggregates it to the job level — if a Worker's container exits non-zero and its `restartPolicy` is `OnFailure`, the operator restarts just that Pod; if retries exhaust, the whole job is marked `Failed`. You can watch this with `kubectl get pytorchjob solara-70b-train -n training -o wide`, the same `kubectl get` muscle memory from the Kubernetes Orchestration course, just against a different CRD.

## Key terms

| Term | Meaning |
|---|---|
| Kubeflow Training Operator | Kubernetes controller that adds ML-training CRDs, including `PyTorchJob` |
| PyTorchJob | CRD describing a distributed PyTorch job as Master + Worker replica groups |
| Master replica | Rank 0 of the job; one pod, responsible for coordination and checkpoint writes |
| RANK / WORLD_SIZE / MASTER_ADDR / MASTER_PORT | The four values torchrun needs before `init_process_group`; the operator sets them automatically |

## Recap

A plain `Deployment` or `Job` has no idea that 64 pods need to start together, find each other, and share a rank. The Kubeflow Training Operator's `PyTorchJob` CRD fills that gap — splitting Master and Worker replicas, standing up the Service, and injecting the env vars torchrun expects. Next lesson: Slurm Basics for Training Clusters, the alternative scheduler Solara AI is evaluating alongside Kubernetes.
