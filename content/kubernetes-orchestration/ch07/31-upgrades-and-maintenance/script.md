# Script — Upgrades & Maintenance

## Segment 1 (title)

A managed control plane doesn't mean never thinking about upgrades. Kubernetes versions age out, nodes need patched images, and both AKS and EKS put Northbridge in the driver's seat for when an upgrade actually happens — because doing it badly is exactly how you take checkout offline.

## Segment 2 (code)

On AKS, az aks upgrade targets the control plane and then each node pool, replacing nodes one at a time by default. A maintenance configuration lets Northbridge restrict upgrades to a scheduled window — Saturday mornings, say, when traffic is lowest.

## Segment 3 (code)

EKS splits the same way. update-cluster-version upgrades the control plane first, independently of the node groups — it can run one version ahead of its nodes for a while, which is what makes a staged rollout possible instead of an all-at-once cutover. update-nodegroup-version then rolls the nodes forward.

## Segment 4 (steps)

Either platform relies on draining. A drain cordons a node as unschedulable, then evicts its Pods gracefully, giving each one a chance to reschedule elsewhere before the node is actually removed. Skip that step and every Pod on that node dies at once, with no guarantee there's capacity elsewhere to absorb them.

## Segment 5 (code)

A PodDisruptionBudget keeps the upgrade itself honest. With minAvailable set to 2, the rollout won't drain a node if doing so would drop checkout below two running replicas — it slows down exactly where it needs to.

## Segment 6 (outro)

That's the operational side of managed Kubernetes covered. Up next, chapter eight: Helm, for packaging everything built so far into something repeatable.
