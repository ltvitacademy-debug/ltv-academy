# kubectl Essentials

With a cluster running, `kubectl` is how you'll spend most of your time talking to it for the rest of this course — and on the job once Northbridge's platform team hands you real access. This lesson covers the small set of commands that cover the vast majority of day-to-day work: looking at objects, inspecting them in depth, applying changes, and reading what a container is actually doing.

## What you'll learn

- The core verbs: `get`, `describe`, `apply`, `delete`, `logs`, and `exec`
- How to target a specific namespace instead of always using the default one
- The difference between `describe` (one object, in depth) and `logs` (what the container printed)
- A couple of flags that save real time once you're working against a busy cluster

## Looking at what exists: get

```bash
kubectl get pods                      # Pods in the current namespace
kubectl get pods -o wide               # + node, IP, and more columns
kubectl get deployments,services       # several object types at once
kubectl get pods --watch                # keep streaming changes live
```

`get` is intentionally terse — one line per object. When one line isn't enough, reach for `describe`.

## Looking deeper at one object: describe

```bash
kubectl describe pod checkout-7d9f8c6b5d-x2n4p
```

`describe` dumps everything Kubernetes knows about one object: its spec, current status, resource requests, and — critically — an **Events** section at the bottom showing what the cluster has tried to do with it recently (image pull failures, scheduling problems, restarts). When a Pod won't start, `describe` is almost always the first command to run, before `logs`.

## Applying and removing objects

```bash
kubectl apply -f checkout-deployment.yaml     # create, or update to match the file
kubectl delete -f checkout-deployment.yaml    # remove everything the file defines
kubectl delete pod checkout-7d9f8c6b5d-x2n4p   # remove one specific object by name
```

`apply` is declarative — safe to run repeatedly; it only changes what's different between the file and the cluster's current state. That's the practice this course uses throughout, instead of the older, imperative `kubectl create` and `kubectl run` commands.

## Reading container output: logs and exec

```bash
kubectl logs checkout-7d9f8c6b5d-x2n4p              # what the container has printed
kubectl logs checkout-7d9f8c6b5d-x2n4p -f             # follow it live
kubectl logs checkout-7d9f8c6b5d-x2n4p -c payment-sidecar  # a specific container in a multi-container Pod
kubectl exec -it checkout-7d9f8c6b5d-x2n4p -- /bin/sh   # an interactive shell inside the container
```

`logs` shows what the application already printed to stdout/stderr. `exec` actually runs a new command inside the container right now — useful for poking around, but never a substitute for fixing the image or the manifest.

## Namespaces: the flag you'll use constantly

Most Northbridge services won't live in the `default` namespace. Every command above accepts `-n <namespace>`:

```bash
kubectl get pods -n checkout
kubectl logs checkout-7d9f8c6b5d-x2n4p -n checkout
```

Forgetting `-n` is one of the most common sources of "it says nothing exists" confusion — the object is there, just in a different namespace. Namespaces get a full lesson in Chapter 6.

## Key terms

- **kubectl get** — list objects, one line each
- **kubectl describe** — full detail on one object, including recent Events
- **kubectl apply** — declaratively create or update objects to match a YAML file
- **kubectl logs** — view a container's stdout/stderr output
- **kubectl exec** — run a command inside a running container right now
- **Events** — the section of `describe` output showing what the cluster recently tried to do with an object
