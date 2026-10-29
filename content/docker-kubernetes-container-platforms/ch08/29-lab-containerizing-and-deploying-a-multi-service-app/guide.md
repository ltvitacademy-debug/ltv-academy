# Lesson 29 — Lab: Containerizing and Deploying a Multi-Service App

**Chapter 8 · Capstone: Running a Real Application on Kubernetes · Lesson 1 of 4**

## What you'll learn

- How to containerize a realistic two-service application — an API and a worker that both read
  the same codebase — using the multi-stage Dockerfile pattern from Chapter 1
- How to push both images to a registry with real tags instead of `latest`, the way Chapter 2
  covered
- How to translate two services into two Kubernetes Deployments and two Services, using the object
  relationships from Chapter 3
- How to verify the whole thing is actually running correctly with `kubectl`, not just "no errors"

## The scenario

A small fictional retailer, Harrow Creek Goods, runs a two-service order-processing app: an `api`
service that accepts HTTP requests and writes jobs to a queue, and a `worker` service that drains
that queue and does the slow work. Both are plain Node.js processes that already run fine on a
developer's laptop. This lab takes that app from "runs on my machine" to "runs on the cluster,"
using nothing but the Docker and Kubernetes fundamentals from Chapters 1–3.

## Step 1: a multi-stage Dockerfile for each service

Both services share one `package.json` and a `src/` tree, so one Dockerfile builds both images,
selected by a build arg:

```dockerfile
# Dockerfile
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY src ./src

FROM gcr.io/distroless/nodejs20-debian12 AS runtime
ARG ENTRYPOINT_FILE
WORKDIR /app
COPY --from=build /app /app
USER nonroot
ENTRYPOINT ["node"]
CMD ["/app/src/placeholder.js"]
```

The build stage installs dependencies once; the runtime stage — distroless, per Chapter 2's base
image lesson — copies only the built `/app` directory across and drops to the non-root `nonroot`
user. Nothing from `npm`, a shell, or a package manager ships in the final image.

## Step 2: build and tag two real images

```
docker build --build-arg ENTRYPOINT_FILE=src/api.js -t registry.harrowcreek.dev/order-api:1.0.0 .
docker build --build-arg ENTRYPOINT_FILE=src/worker.js -t registry.harrowcreek.dev/order-worker:1.0.0 .

docker push registry.harrowcreek.dev/order-api:1.0.0
docker push registry.harrowcreek.dev/order-worker:1.0.0
```

The `1.0.0` tag is deliberate, not cosmetic — Chapter 2 already covered why `latest` makes a
rollback meaningless: if every deploy overwrites the same tag, there is no previous image left to
roll back to.

## Step 3: a Deployment and Service for each

```yaml
# api-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-api
spec:
  replicas: 3
  selector:
    matchLabels: { app: order-api }
  template:
    metadata:
      labels: { app: order-api }
    spec:
      containers:
        - name: order-api
          image: registry.harrowcreek.dev/order-api:1.0.0
          ports:
            - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: order-api
spec:
  selector: { app: order-api }
  ports:
    - port: 80
      targetPort: 8080
```

The `worker` Deployment is nearly identical — same image repository, different tag, no ports, and
no Service at all, because nothing ever calls the worker over the network; it only pulls from the
queue. Not every Deployment needs a Service, and giving one to the worker anyway would just be an
unused object sitting in the cluster.

```yaml
# worker-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-worker
spec:
  replicas: 2
  selector:
    matchLabels: { app: order-worker }
  template:
    metadata:
      labels: { app: order-worker }
    spec:
      containers:
        - name: order-worker
          image: registry.harrowcreek.dev/order-worker:1.0.0
```

## Step 4: apply and verify

```
kubectl apply -f api-deployment.yaml
kubectl apply -f worker-deployment.yaml

kubectl get deployments
kubectl get pods -l app=order-api
kubectl get pods -l app=order-worker
kubectl get svc order-api
```

"No errors" is not the same as "working." The real check is `kubectl get pods` showing every
replica in `Running` with its `READY` column at `1/1`, and `kubectl get svc order-api` showing a
`ClusterIP` with an endpoint for each api pod behind it (`kubectl get endpoints order-api`
confirms the Service actually found the pods its selector was supposed to match).

## Key terms

| Term | Meaning |
|---|---|
| Build arg | A value passed at `docker build` time (`ENTRYPOINT_FILE` here) that lets one Dockerfile produce more than one image |
| Image tag | A version label on an image; `latest` is overwritten on every push, which is why rollbacks need a real version tag |
| Selector / label match | How a Service and a Deployment's own ReplicaSet find the pods they're responsible for |
| `kubectl get endpoints` | Confirms a Service actually matched real, ready pods — not just that the Service object exists |

## Check yourself

You're ready for Lesson 30 when you can explain, without looking: why does the worker Deployment
not have a Service, and what would `kubectl get endpoints order-api` show if the Deployment's pod
labels didn't match the Service's selector?
