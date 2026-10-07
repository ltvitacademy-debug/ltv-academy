# ConfigMaps

Northbridge's product-catalog service needs different settings in staging versus production — a different database hostname, a different feature-flag value, a different log level. Baking those values into the container image means rebuilding the image every time a setting changes. A **ConfigMap** externalizes that configuration so the same image can run anywhere, picking up different values at deploy time.

## What you'll learn

- What a ConfigMap is and why it keeps config out of container images
- How to create one from literals or from a file
- The two ways Pods consume ConfigMap data — environment variables and mounted files
- What changes (and doesn't) when a ConfigMap is updated after Pods are already running

## Creating a ConfigMap

A ConfigMap is just a bag of key-value data, created declaratively:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: catalog-config
data:
  LOG_LEVEL: "info"
  FEATURE_RECOMMENDATIONS: "true"
  DB_HOST: "catalog-db.default.svc.cluster.local"
```

Or imperatively, straight from the command line — useful for quick iteration:

```bash
kubectl create configmap catalog-config \
  --from-literal=LOG_LEVEL=info \
  --from-literal=FEATURE_RECOMMENDATIONS=true

kubectl create configmap catalog-nginx-conf --from-file=nginx.conf
```

## Consuming a ConfigMap as environment variables

The most common pattern for simple key-value settings is `envFrom`, which injects every key in the ConfigMap as an environment variable in one line:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: catalog-pod
spec:
  containers:
    - name: catalog
      image: northbridge/product-catalog:2.4
      envFrom:
        - configMapRef:
            name: catalog-config
```

To pull in just one specific key under a custom variable name, use `env` with `valueFrom.configMapKeyRef` instead of `envFrom`.

## Consuming a ConfigMap as a mounted file

For larger configuration — an `nginx.conf`, an `application.yaml` — mounting the ConfigMap as a volume is the better fit; each key becomes a file inside the mount path, named after the key:

```yaml
      volumeMounts:
        - name: nginx-conf
          mountPath: /etc/nginx/conf.d
  volumes:
    - name: nginx-conf
      configMap:
        name: catalog-nginx-conf
```

## What happens when a ConfigMap changes

Updating a ConfigMap's data doesn't restart Pods that are already using it. A mounted ConfigMap volume *will* eventually update its files on disk (the kubelet syncs periodically), but environment variables set via `envFrom`/`env` are captured once at container start and never refresh. If Northbridge needs a config change to actually take effect, the Pods consuming it as env vars need to be restarted — commonly done with a rolling restart of the Deployment.

## Key terms

- **ConfigMap** — a Kubernetes object holding non-sensitive key-value configuration data
- **envFrom** — injects every key in a ConfigMap as an environment variable
- **configMapKeyRef** — pulls one specific ConfigMap key into a named environment variable
- **Volume mount** — exposes each ConfigMap key as a file inside a mounted directory
