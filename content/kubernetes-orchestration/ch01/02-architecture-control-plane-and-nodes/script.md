# Script — Architecture: Control Plane & Nodes

## Segment 1 (title)

Last lesson described Kubernetes as a continuous reconciliation loop. This lesson names the actual components that run that loop, on the cluster Northbridge Retail's platform team is about to build. Every cluster splits into two kinds of machines: the control plane and the worker nodes.

## Segment 2 (steps)

The control plane makes decisions but never runs your containers itself. The API server is the only front door — everything talks to the cluster through it. etcd stores all cluster state, and losing it without a backup means losing the cluster's state. The scheduler assigns new Pods to nodes, and the controller manager runs the reconciliation loops that actually close gaps between desired and actual state.

## Segment 3 (steps)

Every worker node runs three things. The kubelet is the agent that makes sure the Pods assigned to its node are actually running. The container runtime, usually containerd, pulls images and starts containers. And kube-proxy maintains the network rules that let traffic actually reach the right Pods — that's the piece behind Services, which you'll get to in chapter three.

## Segment 4 (code)

Trace one real command. Someone runs kubectl apply on a checkout deployment. The API server validates it and writes it to etcd. The controller manager notices three Pods are wanted and creates them. The scheduler assigns each one to a node. And the kubelet on that node tells the container runtime to actually start the containers. No component skips a layer.

## Segment 5 (outro)

That predictability is what lets this same architecture scale from a laptop to hundreds of nodes without changing shape. Next up, lesson three: standing up a local cluster so you can watch all of this happen yourself.
