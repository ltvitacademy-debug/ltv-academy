# Script — Troubleshooting Pods & Nodes

## Segment 1 (title)

A chart installs cleanly in a demo and then something doesn't come up right in a real cluster — a checkout Pod stuck pending, or crashing in a loop. This lesson is the troubleshooting playbook: which commands to run, in order, and what the common failure states actually mean.

## Segment 2 (steps)

Start with kubectl get pods, dash-o-wide, to see status and which node each Pod landed on. Then kubectl describe pod — the Events section at the bottom is a timestamped log of everything the scheduler and kubelet tried and why it failed. Then kubectl logs, with dash-dash-previous if the container already restarted, to see what the application itself said before it died.

## Segment 3 (code)

Four states mean four different things. Pending means the Pod hasn't been scheduled yet — usually insufficient resources or a taint. ImagePullBackOff means the image can't be pulled. CrashLoopBackOff means the app starts and exits repeatedly, almost always an application-level failure you'll find in the previous logs. OOMKilled means the container hit its memory limit and the kernel killed it.

## Segment 4 (steps)

Node problems show up as describe node's Conditions and Taints, or as Pods quietly rescheduling elsewhere under memory pressure. To take a node down for maintenance safely: cordon it so no new Pods land there, drain it with ignore-daemonsets so existing Pods reschedule elsewhere, do the maintenance, then uncordon it.

## Segment 5 (outro)

That covers reacting to problems after they happen. Next lesson looks at preventing a whole class of them — GitOps, where Git itself becomes the source of truth for what's running.
