# Script — kubectl Essentials

## Segment 1 (title)

With a cluster running, kubectl is how you'll spend most of your time talking to it — on this course, and on the job once Northbridge's platform team hands you real access. This lesson covers the commands that cover almost all day-to-day work.

## Segment 2 (code)

get lists objects, one line each. describe dumps everything about one object in depth. apply declaratively creates or updates objects from a YAML file, and is safe to run repeatedly. logs shows what a container has printed, and exec runs a command inside it right now. That's the core toolkit.

## Segment 3 (steps)

When a Pod won't start, describe is almost always the first command, not logs. describe's output ends with an Events section showing what the cluster actually tried recently — image pull failures, scheduling problems, restarts. Only once you know the container is actually running does logs tell you anything useful about what's happening inside it.

## Segment 4 (steps)

Most real services, including Northbridge's, won't live in the default namespace. Every one of these commands accepts a dash-n flag for the namespace. Forgetting it is one of the most common sources of "nothing exists" confusion — the object is there, just somewhere else. Namespaces get their own full lesson in chapter six.

## Segment 5 (outro)

These commands work against any Kubernetes cluster you'll ever touch — local, AKS, or EKS. Next up, lesson five: what's actually inside the YAML files you've been applying this whole time.
