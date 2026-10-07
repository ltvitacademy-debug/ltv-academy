# Kubernetes vs. Slurm: When to Use Which

Lessons 12 through 15 covered how Kubernetes (with the Training Operator and Volcano) and Slurm each handle scheduling, queuing, and gang scheduling for Solara-70B's training runs. Neither one is simply "better" — they grew out of different worlds and still carry those worlds' assumptions. This lesson pulls the comparison together and explains the actual decision the Solara ML Platform team made: Kubernetes as the primary orchestrator, Slurm kept available for the research teams who already know it.

## What you'll learn

- Where Kubernetes' strengths (the ones from the Kubernetes Orchestration course) actually help with ML training, and where they don't matter
- Where Slurm's HPC heritage gives it an edge for pure batch training workloads
- The operational cost each platform adds — API surface, CRDs, and tooling vs. a separate scheduler to run and secure
- Why some organizations, including Solara AI, end up running both rather than picking one

## Kubernetes' strengths, applied to training

Everything from the Kubernetes Orchestration course — Services, RBAC, ConfigMaps, the whole ecosystem of controllers and `kubectl` tooling — is still there and still useful for training workloads, not just web services. Solara AI already runs other infrastructure on Kubernetes, so training jobs share the same cluster tooling, the same monitoring stack, and the same team's operational knowledge. The CRD model (`PyTorchJob`, `PodGroup`) means training jobs are first-class objects you can `kubectl get`, watch, and build automation around the same way you would any other Kubernetes resource. The cost: Kubernetes' scheduler and object model were built for services first, so features training actually needs — gang scheduling, GPU topology awareness — need an add-on like Volcano rather than coming built in.

## Slurm's strengths, applied to training

Slurm was built for exactly this kind of workload from day one: large, batch, multi-node HPC jobs on dedicated hardware. Gang scheduling, GPU-aware allocation (`--gres=gpu:8`), and priority/QOS are native, not bolted on. For a cluster whose only job is running training and research workloads — no web services, no need for Kubernetes' broader ecosystem — Slurm's operational footprint is simpler: one scheduler, one queue, a batch-script mental model researchers coming from academic HPC clusters already have. The cost: Slurm doesn't give you Kubernetes' service-discovery, autoscaling integrations, or the enormous ecosystem of existing controllers and tooling if the cluster ever needs to run anything beyond batch jobs.

## A side-by-side comparison

| Dimension | Kubernetes + Training Operator + Volcano | Slurm |
|---|---|---|
| Native gang scheduling | No — requires Volcano | Yes, built in |
| GPU-aware scheduling | Via device plugins + Volcano | Native (`--gres=gpu:N`) |
| Ecosystem beyond training | Huge (services, ingress, autoscalers) | Narrow — built for batch HPC |
| Fits a team already on Kubernetes | Yes — shared tooling, one platform | Adds a second platform to operate |
| Fits a dedicated HPC/research cluster | Possible, but extra layers (CRDs, Volcano) | Purpose-built, minimal layers |

## Solara AI's actual decision

Solara AI runs Kubernetes with the Training Operator and Volcano as the primary path for production Solara-70B runs, because the platform team already operates Kubernetes for other services and wants one set of tooling, monitoring, and on-call runbooks. Slurm stays available specifically for the research teams — several came from academic HPC backgrounds and are faster writing an `sbatch` script than a `PyTorchJob` manifest for quick experiments. Running both isn't indecision; it's matching each tool to the team actually using it, which is a completely reasonable outcome once you've seen what each platform is genuinely good at.

## Key terms

| Term | Meaning |
|---|---|
| CRD (Custom Resource Definition) | How Kubernetes extends its API with new object types like PyTorchJob |
| Native vs. bolted-on | Whether a capability (e.g. gang scheduling) ships with the platform or needs an add-on |
| Operational footprint | The total tooling, monitoring, and expertise a platform requires to run safely |

## Recap

Kubernetes brings a shared platform and a huge ecosystem at the cost of needing add-ons like Volcano for training-specific features; Slurm brings those features natively at the cost of being a second, separate system to operate. Solara AI runs both, matched to the teams using them. Next lesson: Autoscaling a Training Cluster — how either platform decides when to add or remove GPU nodes.
