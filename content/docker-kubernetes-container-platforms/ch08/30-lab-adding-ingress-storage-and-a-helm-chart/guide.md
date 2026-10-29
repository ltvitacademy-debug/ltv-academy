# Lesson 30 — Lab: Adding Ingress, Storage, and a Helm Chart

**Chapter 8 · Capstone: Running a Real Application on Kubernetes · Lesson 2 of 4**

## What you'll learn

- How to route external traffic into the `order-api` Service with an Ingress object, the way
  Chapter 4 covered
- How to give the `order-worker` a PersistentVolumeClaim so files it writes survive a pod restart,
  using the storage model from Chapter 5
- How to turn both Deployments, the Service, the Ingress, and the PVC into one versioned Helm
  chart instead of four separate YAML files applied by hand
- How a `values.yaml` file lets the same chart deploy differently sized dev and prod releases

## The scenario, continued

Lesson 29 got Harrow Creek Goods' `order-api` and `order-worker` running inside the cluster, but
nothing outside it can reach `order-api` yet, and anything `order-worker` writes to disk vanishes
the moment its pod is rescheduled. This lesson closes both gaps, then collects every object this
app needs into one Helm chart so the whole thing deploys as a single, versioned release.

## Step 1: Ingress for the api service

```yaml
# templates/ingress.yaml (plain form, before templating)
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: order-api
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
    - host: orders.harrowcreek.dev
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: order-api
                port:
                  number: 80
```

The Ingress doesn't replace the `order-api` Service from Lesson 29 — it routes external HTTP
traffic for `orders.harrowcreek.dev` to that same Service, which still handles the actual pod
selection. Nothing about the Service changes.

## Step 2: a PersistentVolumeClaim for the worker

`order-worker` writes temporary export files to `/data` before uploading them. A pod restart
should not silently delete work in progress:

```yaml
# templates/worker-pvc.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: order-worker-data
spec:
  accessModes: ["ReadWriteOnce"]
  storageClassName: standard-rwo
  resources:
    requests:
      storage: 5Gi
```

```yaml
# addition to the worker Deployment's pod spec
      volumes:
        - name: data
          persistentVolumeClaim:
            claimName: order-worker-data
      containers:
        - name: order-worker
          volumeMounts:
            - name: data
              mountPath: /data
```

`storageClassName: standard-rwo` requests dynamic provisioning from the cloud's StorageClass, per
Chapter 5 — nobody pre-creates a PersistentVolume by hand; the cluster provisions one automatically
the moment this claim is applied.

## Step 3: turning it all into a Helm chart

```
helm create order-app
```

creates the standard chart skeleton. The four objects built so far — `order-api` Deployment and
Service, `order-worker` Deployment and PVC, and the new Ingress — move into `order-app/templates/`,
with the hard-coded values replaced by template expressions:

```yaml
# templates/api-deployment.yaml (excerpt, templated)
spec:
  replicas: {{ .Values.api.replicaCount }}
  template:
    spec:
      containers:
        - name: order-api
          image: "{{ .Values.api.image.repository }}:{{ .Values.api.image.tag }}"
```

```yaml
# values.yaml
api:
  replicaCount: 3
  image:
    repository: registry.harrowcreek.dev/order-api
    tag: "1.0.0"
worker:
  replicaCount: 2
  image:
    repository: registry.harrowcreek.dev/order-worker
    tag: "1.0.0"
  storage:
    size: 5Gi
ingress:
  host: orders.harrowcreek.dev
```

This is exactly the templating problem Chapter 6 introduced: one set of manifests, values pulled
out into a single file instead of duplicated across every object that needs them.

## Step 4: install it, then run a differently sized release

```
helm install order-app ./order-app

helm install order-app-staging ./order-app \
  --set api.replicaCount=1 \
  --set worker.replicaCount=1 \
  --values values-staging.yaml
```

The same chart produces a full production-sized release and a smaller staging release, driven
entirely by `--set` flags and a per-environment values file — the same per-environment pattern
Chapter 6's values-files lesson walked through, now applied to this app instead of an example
chart.

## Key terms

| Term | Meaning |
|---|---|
| Ingress | Routes external HTTP(S) traffic to a Service by host/path; doesn't replace the Service, sits in front of it |
| PersistentVolumeClaim | A request for storage that survives a pod restart, fulfilled by dynamic provisioning from a StorageClass |
| Helm chart | A templated, versioned package of Kubernetes manifests, parameterized by `values.yaml` |
| `--set` / `--values` | Two ways to override a chart's defaults per release, without editing the chart's templates |

## Check yourself

You're ready for Lesson 31 when you can explain, without looking: why does adding an Ingress not
remove the need for the `order-api` Service, and what would happen to `order-worker`'s export
files on a pod restart if the PVC from this lesson didn't exist?
