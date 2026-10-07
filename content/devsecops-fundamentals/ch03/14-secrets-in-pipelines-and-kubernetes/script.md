# Script — Secrets in Pipelines & Kubernetes

## Segment 1 (title)

This chapter covered three ways to store a secret properly, and Lesson 10 covered how secrets leak when they aren't. This closing lesson connects the two: how do secrets actually get from a vault into a running pipeline or pod, without recreating those same leak patterns?

## Segment 2 (code)

A Kubernetes Secret object looks more protected than it is. That value is base64-encoded, not encrypted — anyone who can read the Secret through the API can decode it in one command. By default it's also stored unencrypted in etcd unless the cluster configures encryption at rest. Real protection comes from RBAC, not the encoding.

## Segment 3 (code)

Rather than manually copying a value into a Kubernetes Secret, Northbridge Retail uses the External Secrets Operator pattern: a controller watches this resource, fetches the current value from the real vault, and keeps the Kubernetes Secret synced automatically. The vault stays the source of truth — no manual copy step to forget.

## Segment 4 (code)

CI/CD platforms have their own secret stores. In GitHub Actions, a secret is referenced through the secrets context and never written into the workflow file. The platform automatically masks any logged value matching a referenced secret — though that's a safety net, not a guarantee, since a transformed value can still slip past the mask.

## Segment 5 (steps)

Even a correctly sourced secret sitting in an environment variable has its own exposure surface — a crash dump, an overly verbose error handler, another process on a shared host. The protection is the whole chain: vault access control, RBAC on the Secret object, and ordinary care about what gets logged.

## Segment 6 (outro)

That closes Chapter 3. Next up, Chapter 4: the automated scanning that catches whatever still slips through all of this.
