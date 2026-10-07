# Secrets

Northbridge's checkout Pod needs a database password and a payment-gateway API key. Putting either one in a ConfigMap, or worse, baked into the image, means that value is sitting around in plain text in version control and in every manifest anyone can read. A **Secret** is Kubernetes's dedicated object for this kind of sensitive data — structurally almost identical to a ConfigMap, but with handling built for credentials instead of plain settings.

## What you'll learn

- How a Secret differs from a ConfigMap, and the one critical limit on that difference
- The common Secret types: Opaque, TLS, and docker-registry
- How to create a Secret and consume it in a Pod
- Why Secrets need more than just "being a Secret" to be truly protected

## Creating a Secret

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: checkout-db-credentials
type: Opaque
stringData:
  DB_USERNAME: "checkout_svc"
  DB_PASSWORD: "N0rthbr1dge-Pr0d!"
```

`stringData` accepts plain text and Kubernetes base64-encodes it for storage automatically; the equivalent `data` field expects values that are *already* base64-encoded. `type: Opaque` is the generic catch-all for arbitrary key-value secrets — it's the default when `type` is omitted.

Imperatively:

```bash
kubectl create secret generic checkout-db-credentials \
  --from-literal=DB_USERNAME=checkout_svc \
  --from-literal=DB_PASSWORD='N0rthbr1dge-Pr0d!'
```

## The critical limit: base64 is not encryption

Base64 encoding is reversible with a single command — `echo <value> | base64 -d` — anyone with read access to the Secret object can recover the real value instantly. Kubernetes does not encrypt Secrets by default; `etcd` (the cluster's backing datastore) can store them in plain base64 form unless the cluster operator has explicitly configured **encryption at rest**. Treat a Secret as access-controlled, not as "safe because it's a Secret" — tighten RBAC so only the Pods and people that need it can read it, and consider an external secret manager (like Vault or a cloud provider's secret store) for anything genuinely high-value.

## Consuming a Secret in a Pod

The same two patterns as a ConfigMap apply — environment variables or a mounted volume — but with `secretKeyRef`/`secretRef` instead of the ConfigMap equivalents:

```yaml
spec:
  containers:
    - name: checkout
      image: northbridge/checkout:3.1
      env:
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: checkout-db-credentials
              key: DB_PASSWORD
```

Mounting a Secret as a volume is often preferred over environment variables for genuinely sensitive values, since environment variables can leak more easily — through crash dumps, child-process inheritance, or `kubectl describe`-style introspection in some setups.

## Other common Secret types

`kubernetes.io/tls` holds a TLS certificate and private key (the `secretName` referenced by an Ingress's `tls` block is exactly this type). `kubernetes.io/dockerconfigjson` holds credentials for pulling images from a private registry, referenced from a Pod spec's `imagePullSecrets`.

## Key terms

- **Secret** — a Kubernetes object for sensitive data, structurally similar to a ConfigMap
- **Opaque** — the default, generic Secret type for arbitrary key-value data
- **stringData** vs **data** — plain-text input (auto-encoded) vs. already base64-encoded input
- **Encryption at rest** — a cluster-level setting that actually encrypts Secret data in etcd; not on by default
- **imagePullSecrets** — references a `dockerconfigjson` Secret so a Pod can pull from a private registry
