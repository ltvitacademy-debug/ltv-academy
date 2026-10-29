# Lesson 11 — ConfigMaps and Secrets: Getting Configuration Out of the Image

**Chapter 3 · Kubernetes Architecture & Core Objects · Lesson 3 of 4**

## What you'll learn

- Why baking configuration into a container image is the same mistake
  this course already warned against with `.env` files, and what
  Kubernetes gives you instead
- How to create and use a **ConfigMap** for non-sensitive settings, as
  both environment variables and mounted files
- How to create and use a **Secret** for sensitive values, and exactly
  what protection base64 encoding does and doesn't provide
- How `kubectl create configmap --from-file` and `kubectl create secret
  generic` map real files onto a running Pod

## The problem: one image, many environments

A container image for your application should be built exactly once and
promoted unchanged from dev to staging to production — that's the whole
point of the registry/tagging workflow from Chapter 2. But dev, staging,
and production almost always need different database hostnames, different
feature flags, different API keys. If those values are hardcoded into the
image, you're back to rebuilding an image per environment, which defeats
the purpose of having images at all.

Kubernetes solves this the same way a `.env` file solves it for a single
Docker container, but as a first-class cluster object instead of a file
sitting next to your code: **ConfigMaps** for ordinary settings, **Secrets**
for sensitive ones. Both get injected into a Pod at runtime — the image
itself never changes between environments.

## ConfigMaps: externalizing ordinary settings

A **ConfigMap** is just a bucket of key-value pairs, stored in etcd like
any other Kubernetes object, that you can create from literal values or
from a real file:

```
kubectl create configmap web-app-config \
  --from-literal=LOG_LEVEL=info \
  --from-literal=FEATURE_NEW_CHECKOUT=true
```

```
kubectl create configmap web-app-nginx-conf --from-file=nginx.conf
```

Or declared as YAML, which is what you'd actually commit to version
control:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: web-app-config
data:
  LOG_LEVEL: "info"
  FEATURE_NEW_CHECKOUT: "true"
```

A Pod consumes a ConfigMap in one of two ways. As environment variables:

```yaml
spec:
  containers:
    - name: web-app
      image: myregistry.azurecr.io/web-app:1.4.2
      envFrom:
        - configMapRef:
            name: web-app-config
```

Or as a mounted file, which matters for config that an application reads
from disk rather than the environment (an `nginx.conf`, an `appsettings.json`):

```yaml
spec:
  containers:
    - name: web-app
      image: myregistry.azurecr.io/web-app:1.4.2
      volumeMounts:
        - name: config-volume
          mountPath: /etc/nginx/conf.d
  volumes:
    - name: config-volume
      configMap:
        name: web-app-nginx-conf
```

Either way, the same image runs unmodified in every environment — only the
ConfigMap it's pointed at changes.

## Secrets: the same mechanism, flagged as sensitive

A **Secret** has the identical shape and the identical consumption
patterns (`envFrom`/`secretRef`, or a mounted volume) as a ConfigMap — the
only real difference is intent and handling. Secrets are meant for
database passwords, API keys, and TLS certificates, and Kubernetes treats
them a little more carefully: they're not shown in full by `kubectl describe`,
and `kubectl get secret -o yaml` stores values **base64-encoded**, not
plaintext.

```
kubectl create secret generic web-app-db-credentials \
  --from-literal=DB_USER=app_user \
  --from-literal=DB_PASSWORD='Tr0ub4dor&3'
```

Be clear about what base64 actually buys you here: **nothing, from a
security standpoint.** Base64 is an encoding, not encryption — anyone with
`kubectl get secret web-app-db-credentials -o jsonpath='{.data.DB_PASSWORD}'`
and a decoder gets the plaintext password back instantly. It exists purely
so binary values survive YAML. Real protection comes from RBAC restricting
*who* can read Secret objects at all (covered in Chapter 7), and from
encrypting etcd at rest — not from the encoding itself.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: web-app-db-credentials
type: Opaque
stringData:
  DB_USER: app_user
  DB_PASSWORD: Tr0ub4dor&3
```

Using `stringData` instead of `data` in a manifest lets you write the
plaintext value directly in YAML and let Kubernetes base64-encode it on
your behalf — useful for readability, though a Secret manifest with real
credentials in it should never be committed to a public repository either
way.

```yaml
spec:
  containers:
    - name: web-app
      image: myregistry.azurecr.io/web-app:1.4.2
      envFrom:
        - secretRef:
            name: web-app-db-credentials
```

## Checking what's actually there

```
kubectl get configmaps
kubectl get secrets
kubectl describe configmap web-app-config
kubectl get secret web-app-db-credentials -o yaml
```

`describe` on a ConfigMap prints the actual values, since they're not
sensitive. `describe` on a Secret deliberately omits the values (shown as
byte counts instead); `get -o yaml` is where you'd see the base64 string,
which is the point where it's worth re-reading the paragraph above — seeing
base64 instead of plaintext is not the same thing as the value being
protected.

## Key terms

| Term | Meaning |
|---|---|
| ConfigMap | A Kubernetes object holding non-sensitive key-value configuration, consumable as env vars or mounted files |
| Secret | Same shape and consumption pattern as a ConfigMap, intended for sensitive values; stored base64-encoded, not encrypted |
| `envFrom` / `configMapRef` / `secretRef` | Injects every key in a ConfigMap or Secret as environment variables in a container |
| `stringData` | A Secret manifest field for writing plaintext that Kubernetes base64-encodes automatically |
| Base64 encoding | Makes binary-safe text for YAML storage — provides no cryptographic protection on its own |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: what
actually changes between a dev and production deployment of the same
image, why a Secret's base64 encoding is not encryption, and the two
different ways a Pod can consume a ConfigMap or Secret.
