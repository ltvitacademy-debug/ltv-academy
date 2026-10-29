# Lesson 27 — Securing the Kubernetes API Server and etcd

**Chapter 7 · Kubernetes Security & RBAC · Lesson 3 of 4**

## What you'll learn

- The three stages every request passes through at the API server —
  authentication, authorization, admission — and what each one checks
- Which authentication modes the API server actually supports, and why
  `Node,RBAC` is the standard `--authorization-mode` ordering
- What admission controllers do, and which ones matter most in a
  production cluster
- Why audit logging exists and how to turn it on with a real policy file
- Why etcd is the single most sensitive component in the whole cluster,
  and how to encrypt it at rest and restrict who can reach it

## The request pipeline: authn, authz, admission

Every request to the Kubernetes API server — `kubectl`, a controller, a
webhook — passes through three stages in order:

1. **Authentication** — who are you? The API server can be configured
   with several authentication modes at once: client certificates
   (`--client-ca-file`), static or dynamic bearer tokens (including
   ServiceAccount tokens), and OIDC (`--oidc-issuer-url`, for integrating
   with an external identity provider like Azure AD or Okta). A request
   that fails every configured mode gets a `401`.
2. **Authorization** — RBAC, covered in Lesson 25, plus the `Node`
   authorizer, which specifically limits what a kubelet can do (only read
   objects related to its own node, not arbitrary cluster state). The
   standard flag is `--authorization-mode=Node,RBAC` — order matters,
   since each authorizer is checked in sequence and the first explicit
   allow wins.
3. **Admission control** — even an authorized request can still be
   rejected or mutated here. This is where defaults get injected,
   policies get enforced, and some requests get outright blocked.

## Admission controllers that matter in production

Admission controllers run as a chain, each one either mutating,
validating, or both. A few that matter most:

- **NamespaceLifecycle** — prevents creating objects in a namespace that's
  being deleted, and prevents deleting the built-in `default`,
  `kube-system`, and `kube-public` namespaces.
- **LimitRanger** — enforces default and maximum resource requests/limits
  per namespace.
- **ServiceAccount** — auto-mounts a ServiceAccount's token into a Pod
  unless told not to.
- **PodSecurity** — the Pod Security Admission controller from Lesson 26.
- **NodeRestriction** — limits what a kubelet's own credentials can
  modify, so a compromised node can't relabel itself into a more
  privileged pool or edit other nodes' objects.
- **ResourceQuota** — enforces namespace-level aggregate resource caps.

They're enabled with `--enable-admission-plugins=NodeRestriction,...` on
the `kube-apiserver` process (most of the ones above are on by default in
a current release — the flag is for adding to that default set).

## Audit logging: a record of every request

The API server can log every request it receives — who made it, what
they did, to what object, and whether it succeeded — to a file or a
webhook. It's controlled by an **audit policy** that defines, per rule,
how much detail to record:

```yaml
apiVersion: audit.k8s.io/v1
kind: Policy
rules:
  - level: RequestResponse
    resources:
      - group: ""
        resources: ["secrets"]
  - level: Metadata
    resources:
      - group: ""
        resources: ["pods"]
  - level: None
    users: ["system:kube-proxy"]
```

Levels run from `None` (don't log) through `Metadata` (who/what/when, no
body) up to `RequestResponse` (full request and response bodies — use
sparingly, it's expensive and `Secrets` payloads land in the log too).
Wire it up with:

```
--audit-policy-file=/etc/kubernetes/audit-policy.yaml
--audit-log-path=/var/log/kubernetes/audit.log
--audit-log-maxage=30
--audit-log-maxbackup=10
```

Without audit logging, there's no record of who read a Secret, deleted a
Deployment, or escalated their own RBAC — in an incident, that history is
often the only way to reconstruct what happened.

## etcd: the single most sensitive thing you're running

Every object in the cluster — every Secret, every ConfigMap, every
Deployment spec — is stored in **etcd**, the control plane's key-value
store. By default, what's in etcd is just base64-encoded, not encrypted —
`base64` is an encoding, not a cipher, and anyone with raw access to the
etcd data directory or a snapshot can read every Secret in the cluster in
plain text. Two things fix that.

**Encryption at rest.** An `EncryptionConfiguration` resource tells the
API server to encrypt specific resources before writing them to etcd:

```yaml
apiVersion: apiserver.config.k8s.io/v1
kind: EncryptionConfiguration
resources:
  - resources: ["secrets"]
    providers:
      - aescbc:
          keys:
            - name: key1
              secret: <base64-encoded-32-byte-key>
      - identity: {}
```

Wired in via `--encryption-provider-config=/etc/kubernetes/enc.yaml` on
the API server. Resources are encrypted going forward from that point —
existing Secrets need a one-time rewrite (`kubectl get secrets --all-namespaces -o json | kubectl replace -f -`)
to actually get re-saved through the new provider.

**Network and access restriction.** etcd should never be reachable from
outside the control plane network — only `kube-apiserver` talks to it
directly. Its own client-to-server and peer-to-peer traffic should run
over mutual TLS (`--client-cert-auth=true`, `--peer-client-cert-auth=true`
on the etcd process itself), and firewall rules should block its client
port (`2379`) and peer port (`2380`) from anything but the control plane
nodes. Back it up regularly and treat the backup with the same care as
the live store:

```
ETCDCTL_API=3 etcdctl snapshot save backup.db \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key
```

A snapshot of an unencrypted etcd store is just as readable as the live
database — encryption at rest has to be in place *before* the backup
matters.

## Key terms

| Term | Meaning |
|---|---|
| Authentication | Confirms who a request is from — certs, tokens, or OIDC |
| Authorization | Decides if that identity may perform the action — RBAC + Node authorizer |
| Admission controller | Chain of plugins that validate or mutate a request after authz, before it's persisted |
| Audit policy | Config that controls how much detail the API server logs per request |
| EncryptionConfiguration | Resource that tells the API server to encrypt specific object types before writing to etcd |
| etcd | The control plane's key-value store holding every cluster object, including Secrets |

## Check yourself

You're ready for Lesson 28 when you can explain, without looking: why is
base64 in etcd not the same thing as encryption, and what two separate
protections does a hardened etcd deployment need beyond RBAC on the API
server itself?
