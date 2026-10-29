# Lesson 17 — PersistentVolumes and PersistentVolumeClaims in Plain Terms

**Chapter 5 · Kubernetes Storage & Stateful Workloads · Lesson 1 of 4**

## What you'll learn

- Why a Pod's local filesystem disappears the moment the Pod does, and
  what that means for anything that needs to keep data
- What a **PersistentVolume (PV)** actually is: a cluster-level object
  representing a real piece of storage, provisioned separately from
  any one workload
- What a **PersistentVolumeClaim (PVC)** is, and how it acts as the
  request that gets matched — "bound" — to a PV
- How a Pod mounts a PVC as a volume, and what `accessModes` and
  `storageClassName` are actually constraining

## The problem: containers are supposed to be disposable

Everything you've built so far in this course — Deployments, rolling
updates, ReplicaSets replacing a crashed Pod with an identical new one
— depends on one assumption: a Pod's own filesystem is throwaway. When
a Pod is rescheduled, Kubernetes doesn't move its local disk anywhere;
it just starts a brand-new container from the image, with a brand-new,
empty writable layer. That's exactly what you want for a stateless web
server. It's exactly wrong for a database, a message queue, or
anything else that needs its data to survive past the life of one
Pod.

Kubernetes solves this with two separate objects that deliberately
don't know about each other at creation time: the **PersistentVolume**
and the **PersistentVolumeClaim**.

## PersistentVolume: a piece of real storage, registered with the cluster

A PersistentVolume is a cluster-scoped API object that represents an
actual piece of storage — an Azure Disk, an AWS EBS volume, an NFS
share, whatever the underlying infrastructure provides. It exists
independently of any Pod and even independently of any namespace.
Here's a PV backed by an already-provisioned Azure Disk:

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-azuredisk-manual
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  azureDisk:
    diskName: myAKSDisk
    diskURI: /subscriptions/xxxx/resourceGroups/xxxx/providers/Microsoft.Compute/disks/myAKSDisk
    kind: Managed
```

Note what's missing: there's no mention of any specific application,
Deployment, or Pod. A cluster administrator (or, as you'll see next
lesson, a StorageClass acting on their behalf) creates this object to
say "this 10Gi disk exists and is available for something in the
cluster to use."

## PersistentVolumeClaim: the request that gets matched to a PV

A workload doesn't reference a PersistentVolume directly. Instead, it
— or more precisely, whoever defines the workload — creates a
PersistentVolumeClaim, which is a *request* for storage with certain
characteristics, not storage itself:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-azuredisk
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
```

Kubernetes' control plane watches for PVCs and PVs and tries to
**bind** them: it looks for a PV whose capacity is at least as large
as the claim's request, whose `accessModes` are compatible, and (once
you add StorageClasses next lesson) whose class matches. When it finds
one, the PVC and PV move into a `Bound` state together, and that
binding is exclusive — one PVC binds to exactly one PV, and that PV is
no longer available to anyone else.

Check the binding state directly:

```bash
kubectl get pv pv-azuredisk-manual
kubectl get pvc pvc-azuredisk
```

A healthy claim shows `STATUS: Bound` and a `VOLUME` column pointing
at the PV it matched. A claim stuck on `Pending` almost always means
no PV satisfied its request — wrong size, incompatible access mode, or
(far more commonly, once you're using dynamic provisioning) no default
StorageClass available to create one automatically.

## accessModes: what kind of attachment the storage allows

`accessModes` describes how many nodes can mount the volume, and in
what mode, at the same time — it is **not** a general-purpose
read/write permission flag:

- `ReadWriteOnce` (RWO) — can be mounted read-write by a single node at
  a time. This is what you get with Azure Disk and AWS EBS; it's a
  property of block storage attached to one VM.
- `ReadOnlyMany` (ROX) — many nodes can mount it read-only
  simultaneously.
- `ReadWriteMany` (RWX) — many nodes can mount it read-write at the
  same time, which requires storage that genuinely supports concurrent
  multi-node writers, such as Azure Files or NFS — not block storage
  like a managed disk.

This distinction matters immediately once you scale a Deployment past
one replica: if every replica's Pod tries to mount the same RWO PVC,
only the Pod scheduled on the node already holding the volume attaches
successfully, and the rest sit stuck in `ContainerCreating`.

## Mounting the PVC in a Pod

Once bound, a Pod references the *claim*, not the PV, inside its
`volumes` block:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app-with-storage
spec:
  containers:
    - name: app
      image: myregistry.azurecr.io/myapp:1.4
      volumeMounts:
        - mountPath: /data
          name: data-volume
  volumes:
    - name: data-volume
      persistentVolumeClaim:
        claimName: pvc-azuredisk
```

This indirection — Pod → PVC → PV — is the whole design. The
application manifest only ever says "I need 10Gi of ReadWriteOnce
storage," never "I need this specific Azure Disk." That's what lets
the same Deployment YAML run unmodified against a different backing
disk in a different cluster, or against dynamically provisioned
storage instead of a hand-created PV, which is exactly where the next
lesson picks up.

## Key terms

| Term | Meaning |
|---|---|
| PersistentVolume (PV) | Cluster-scoped object representing a real piece of provisioned storage (Azure Disk, EBS, NFS, etc.), created independently of any workload |
| PersistentVolumeClaim (PVC) | A namespaced request for storage with a size and access mode; the control plane binds it to a matching PV |
| Bound | The state once a PVC and PV are matched exclusively to each other |
| accessModes | What mounting concurrency the storage supports: ReadWriteOnce, ReadOnlyMany, or ReadWriteMany — not a permission setting |
| persistentVolumeReclaimPolicy | What happens to the underlying storage when its PVC is deleted — `Retain` keeps it, `Delete` removes it |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: why
does a Pod manifest reference a PersistentVolumeClaim instead of a
PersistentVolume directly, and why would a PVC asking for
`ReadWriteMany` fail to bind against a PV backed by an Azure Disk?
