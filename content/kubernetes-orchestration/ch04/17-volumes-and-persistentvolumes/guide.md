# Volumes & PersistentVolumes

A container's own filesystem disappears the moment the container is replaced — fine for stateless apps like Northbridge's checkout service, but a problem the moment something needs to keep data around. Northbridge's product-catalog database can't lose its data every time its Pod gets rescheduled to a different node. Kubernetes separates this into two ideas: **volumes**, which give a Pod storage that outlives a single container, and **PersistentVolumes**, which give that storage a life that outlives the Pod itself.

## What you'll learn

- Why a container's own filesystem isn't durable, and what `emptyDir` actually provides
- The difference between a PersistentVolume (PV) and a PersistentVolumeClaim (PVC)
- How a PVC binds to a PV, and how a Pod mounts the result
- What access modes and reclaim policies control

## emptyDir: storage that survives the container, not the Pod

The simplest volume type, `emptyDir`, creates empty storage when a Pod starts and deletes it when the Pod is removed. It's useful for sharing a scratch directory between containers *within* the same Pod, or surviving a single container crash-and-restart inside that Pod — but it provides no durability beyond the Pod's own lifetime.

```yaml
      volumeMounts:
        - name: cache
          mountPath: /tmp/cache
  volumes:
    - name: cache
      emptyDir: {}
```

## PersistentVolume: a piece of real storage

A **PersistentVolume (PV)** represents an actual piece of storage in the cluster — a cloud disk, an NFS share, a local disk — provisioned ahead of time (or dynamically, covered next lesson) and tracked as a cluster-level resource, independent of any particular namespace or Pod:

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: catalog-db-pv
spec:
  capacity:
    storage: 20Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  awsElasticBlockStore:
    volumeID: vol-0abcd1234efgh5678
    fsType: ext4
```

## PersistentVolumeClaim: a request for storage

Pods don't reference a PV directly. Instead, a **PersistentVolumeClaim (PVC)** — a namespaced request for storage matching certain criteria — gets created, and Kubernetes binds it to a PV that satisfies the request:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: catalog-db-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
```

Once bound, the Pod mounts the *claim*, not the volume directly:

```yaml
      volumeMounts:
        - name: db-storage
          mountPath: /var/lib/postgresql/data
  volumes:
    - name: db-storage
      persistentVolumeClaim:
        claimName: catalog-db-pvc
```

This indirection is deliberate — the Pod spec never needs to know or care whether the underlying storage is an AWS EBS volume, an Azure Disk, or on-prem NFS.

## Access modes and reclaim policy

`accessModes` describes how many nodes can mount the volume at once: `ReadWriteOnce` (one node, read-write — the common case for a database), `ReadOnlyMany` (many nodes, read-only), and `ReadWriteMany` (many nodes, read-write — only supported by some storage backends, like NFS).

`persistentVolumeReclaimPolicy` controls what happens to the underlying storage when its PVC is deleted: `Retain` keeps the data and requires manual cleanup, while `Delete` removes the underlying storage automatically — important to get right before Northbridge trusts a database's durability to it.

## Key terms

- **Volume** — storage attached to a Pod, with a lifetime tied to the Pod (or shorter, for `emptyDir`)
- **emptyDir** — a volume type that exists only for the Pod's lifetime, with no external durability
- **PersistentVolume (PV)** — a cluster-level resource representing an actual piece of storage
- **PersistentVolumeClaim (PVC)** — a namespaced request for storage, bound to a matching PV
- **accessModes** — how many nodes/Pods can mount a volume, and in what mode (ReadWriteOnce, ReadOnlyMany, ReadWriteMany)
- **persistentVolumeReclaimPolicy** — `Retain` or `Delete`; what happens to storage when its claim is released
