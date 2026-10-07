# Script — Kubernetes Job Scheduling for ML

## Segment 1 (title)

The last chapter covered the InfiniBand fabric and NCCL collectives that let solara-train's five hundred twelve H100s behave like one machine. None of that matters if the Solara ML Platform team can't reliably get a training job's processes started, all pointed at each other, at the same moment. This chapter is about exactly that — how a Solara-70B run gets scheduled and launched on Kubernetes.

## Segment 2 (steps)

A plain Deployment keeps identical, interchangeable replicas running forever — wrong for training, where rank zero writes checkpoints and nothing else does. A Job retries pods to completion, but has no idea that sixty-four pods need to start together and discover each other's addresses. torchrun needs four values before it can even begin — rank, world size, and the master's address and port — and with bare Kubernetes primitives, someone would have to wire all of that by hand.

## Segment 3 (code)

That's what the Kubeflow Training Operator's PyTorchJob custom resource is for. It splits replicas into a Master — rank zero — and Worker groups. Here, one master and sixty-three workers, eight GPUs each, is five hundred twelve GPUs: the entire cluster, dedicated to one run. The operator creates the pods and a headless service behind the scenes.

## Segment 4 (steps)

That service is also how the four required values get set without anyone touching them by hand. The operator derives a predictable DNS name for the master pod and injects master address and port, a rank for every replica, and the total world size as environment variables — automatically, into every pod it creates. torchrun just reads them.

## Segment 5 (outro)

A PyTorchJob's status — created, running, succeeded, or failed — aggregates every pod underneath it, the same kubectl get muscle memory from the Kubernetes Orchestration course, just against a new resource type. Next up, lesson thirteen: Slurm basics for training clusters.
