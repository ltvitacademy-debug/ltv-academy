# Script — GPU Scheduling in Kubernetes

## Segment 1 (title)

Chapter five ended with "something has to decide which nodes a job runs on." In most production ML infrastructure today, that something is Kubernetes. This lesson covers how Kubernetes, which wasn't built with GPUs in mind, learned to schedule them.

## Segment 2 (steps)

Kubernetes natively understands CPU and memory, but has no built-in concept of a GPU. The NVIDIA device plugin runs on every GPU node, discovers the GPUs present, and advertises them to Kubernetes as a schedulable extended resource called nvidia dot com slash gpu.

## Segment 3 (code)

Requesting a GPU means setting that resource under limits in a pod spec, not requests — a deliberate convention, because a whole GPU can't be subdivided the way CPU time can, so the limit simply is the request.

## Segment 4 (code)

A pod asking for a GPU no node currently has stays pending indefinitely rather than running without one. Kubernetes treats that request as a hard requirement, the same way it treats an unsatisfiable CPU or memory request.

## Segment 5 (outro)

The device plugin and the extended resource model are how Kubernetes learned to treat GPUs seriously. Next up, lesson thirty: MIG and time-slicing — the exception to "a GPU can't be subdivided."
