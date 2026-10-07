# Script — Services & Service Types

## Segment 1 (title)

Every time Kubernetes replaces a crashed or updated checkout Pod, that Pod gets a brand-new IP address. Product-catalog can't hardcode an address that keeps changing. A Service fixes this with one stable address that never moves.

## Segment 2 (steps)

A Service doesn't point at specific Pods by name — it uses a label selector, like "app: checkout," to match whichever Pods currently carry that label. As Pods are created or removed, Kubernetes keeps an Endpoints list of the current, healthy matches, automatically.

## Segment 3 (code)

A ClusterIP Service, the default type, gets one virtual IP reachable only from inside the cluster — exactly what product-catalog needs to reach checkout internally. The port callers use and the targetPort the container listens on don't have to match.

## Segment 4 (steps)

NodePort opens that same Service on a fixed port, in the 30000 to 32767 range, on every node's IP — useful as a building block, but callers still need to know a node's address. LoadBalancer goes further: on a cloud-managed cluster, it asks the provider to stand up a real external load balancer automatically.

## Segment 5 (outro)

None of this requires callers to track individual Pod IPs — kube-proxy on every node quietly routes Service traffic to whichever Pods are currently healthy. Next lesson: how DNS lets services find each other by name instead of by IP at all.
