# Script — Kubernetes vs. Slurm: When to Use Which

## Segment 1 (title)

The last four lessons covered how Kubernetes and Slurm each handle scheduling, queuing, and gang scheduling for Solara-70B's training runs. Neither one is simply better — they grew out of different worlds and still carry those worlds' assumptions. This lesson pulls that comparison together.

## Segment 2 (steps)

Everything from the Kubernetes Orchestration course is still there and still useful for training, not just services. Solara already runs other infrastructure on Kubernetes, so training shares the same tooling and the same team's operational knowledge, and the Training Operator makes PyTorchJob a first-class object you can kubectl get like anything else. The cost: features training actually needs, like gang scheduling, need an add-on like Volcano rather than coming built in.

## Segment 3 (steps)

Slurm was built for exactly this kind of workload from day one. Gang scheduling, GPU-aware allocation, priority — all native, not bolted on. For a cluster whose only job is running training, that's a simpler operational footprint: one scheduler, a batch-script model researchers from academic HPC backgrounds already know. The cost is a narrower ecosystem — no service discovery, no autoscaling integrations, if the cluster ever needs more than batch jobs.

## Segment 4 (code)

So Solara AI runs both. Kubernetes with the Training Operator and Volcano is the primary path for production runs, because the platform team already operates Kubernetes elsewhere and wants one set of tooling and on-call runbooks. Slurm stays available for the research teams, who are faster writing an sbatch script than a PyTorchJob manifest for a quick experiment.

## Segment 5 (outro)

Running both isn't indecision — it's matching each tool to the team actually using it. Next up, lesson seventeen: autoscaling a training cluster, how either platform decides when to add or remove GPU nodes.
