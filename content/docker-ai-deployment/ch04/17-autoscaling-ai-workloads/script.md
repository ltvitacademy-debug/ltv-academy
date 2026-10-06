# Script — Autoscaling AI Workloads

## Segment 1 (title)

Autoscaling watches a metric and adds or removes instances when it crosses a threshold. The metric you pick matters more than it first seems.

## Segment 2 (code: watching the wrong gauge)

CPU-based scaling is the common default, and it works fine for request-handling web servers. But an inference container's CPU can sit near-idle while its GPU is pegged at 100 percent doing the actual model computation. CPU-based scaling never triggers — even though the service is genuinely saturated.

## Segment 3 (steps: min and max)

Min instances are the floor — never scale below this, even at zero traffic — and that protects against cold starts. Max instances are the ceiling — never scale above this — and that protects your budget and your GPU quota from a runaway traffic spike or a bug.

## Segment 4 (code: slower, coarser scaling)

A typical web service instance starts in seconds. A GPU-backed inference instance starts in minutes — a bigger image, model weights loading into GPU memory, driver initialization. So autoscaling policies for AI workloads usually scale in bigger, less frequent steps, leaning on that min floor to absorb short bursts.

## Segment 5 (outro)

Picking the right signal and sizing the min floor correctly both matter before a single request arrives. Next up: what that min-instances floor is actually protecting against — cold starts.
