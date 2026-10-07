# Script — Objects, YAML & the Declarative Model

## Segment 1 (title)

Every lesson so far has used YAML without fully explaining what's inside it. This lesson closes that gap: what a Kubernetes object actually is, and the fields every manifest shares.

## Segment 2 (code)

Four top-level fields show up in almost every object's YAML. apiVersion says which version of the Kubernetes API defines this kind of object. kind says what type it is — Deployment, Service, ConfigMap, and dozens more. metadata holds the name, namespace, and labels. And spec is the desired state you're actually declaring — what you want to be true.

## Segment 3 (steps)

apiVersion and kind have to match exactly — kind Deployment only exists under apps slash v1. Get that wrong and the API server rejects the manifest outright, because it doesn't know which schema to validate against or which controller should handle it. kubectl explain lets you ask the cluster itself what fields are valid for any object.

## Segment 4 (steps)

Once an object is running, a fifth field shows up: status. You never write status yourself — spec is what you declared, status is what the cluster actually observes right now. The controller manager's entire job, for every object type, is narrowing the gap between those two until they match. That's the reconciliation loop from lesson one, visible directly in the data.

## Segment 5 (outro)

That's why Northbridge's platform team keeps every manifest in Git and applies it with kubectl apply, instead of running one-off commands with no record of what changed. Chapter two picks this up with the smallest object you can actually deploy: the Pod.
