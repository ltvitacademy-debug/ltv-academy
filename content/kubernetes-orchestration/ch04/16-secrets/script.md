# Script — Secrets

## Segment 1 (title)

Northbridge's checkout Pod needs a database password and a payment-gateway API key. Those can't sit in a ConfigMap or an image in plain text. A Secret is Kubernetes's dedicated object for this — structurally close to a ConfigMap, but built for credentials.

## Segment 2 (code)

stringData accepts plain text and Kubernetes base64-encodes it automatically for storage; type Opaque is the generic default for arbitrary key-value secrets. It looks almost identical to a ConfigMap on purpose.

## Segment 3 (steps)

Here's the part that matters most: base64 is encoding, not encryption. Anyone with read access can decode it instantly with one command. Kubernetes doesn't encrypt Secrets in etcd by default — that requires the cluster operator to turn on encryption at rest explicitly. Treat Secrets as access-controlled, not automatically safe.

## Segment 4 (code)

Consuming a Secret in a Pod uses the same environment-variable or volume-mount pattern as a ConfigMap, just with secretKeyRef instead of configMapKeyRef. Mounting as a volume is often the safer choice for sensitive values, since environment variables can leak more easily.

## Segment 5 (outro)

Beyond generic Opaque secrets, Kubernetes has dedicated types for TLS certificates and private-registry credentials. Next lesson: giving data an actual, durable home with Volumes and PersistentVolumes.
