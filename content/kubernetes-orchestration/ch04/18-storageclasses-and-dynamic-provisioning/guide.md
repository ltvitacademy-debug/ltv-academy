# StorageClasses & Dynamic Provisioning

Pre-creating a PersistentVolume by hand for every database Northbridge spins up doesn't scale — someone has to go provision a cloud disk, note its ID, and write a matching PV manifest, every single time. A **StorageClass** automates that: it tells Kubernetes *how* to create storage on demand, so a PersistentVolumeClaim can trigger a brand-new PersistentVolume automatically instead of waiting for one to already exist.

## What you'll learn

- The difference between static provisioning (last lesson) and dynamic provisioning
- What a StorageClass actually configures, field by field
- How a PVC triggers dynamic provisioning just by naming a StorageClass
- What `volumeBindingMode` controls, and why it matters for scheduling

## Static provisioning doesn't scale

In the previous lesson, a cluster operator created the PersistentVolume by hand, pointing at a specific, already-existing cloud disk. That's **static provisioning** — it works, but it means a human (or a separate automation) has to pre-create storage before any PVC can bind to it.

## StorageClass: a recipe for creating storage

A StorageClass doesn't represent actual storage — it's a template describing how to create it:

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: ebs.csi.aws.com
parameters:
  type: gp3
  fsType: ext4
reclaimPolicy: Delete
volumeBindingMode: WaitForFirstConsumer
```

`provisioner` names the plugin (typically a CSI driver) responsible for actually creating storage — here, the AWS EBS CSI driver. `parameters` are provisioner-specific knobs, like disk type. `reclaimPolicy` works the same as on a PV, just set at the class level as a default.

## Dynamic provisioning: the PVC does the work

With a StorageClass in place, a PVC just references it by name — no PV needs to exist beforehand:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: catalog-db-pvc
spec:
  storageClassName: fast-ssd
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
```

Creating this PVC triggers the `fast-ssd` provisioner to create a brand-new, 20Gi `gp3` disk and a matching PV automatically, then binds the two together — no manual PV authoring required. Most clusters also designate one StorageClass as the **default**, applied automatically to any PVC that doesn't set `storageClassName` at all.

## volumeBindingMode: when provisioning actually happens

`Immediate` (the historical default) provisions the volume as soon as the PVC is created, before Kubernetes knows which node the consuming Pod will land on. `WaitForFirstConsumer` delays provisioning until a Pod that uses the PVC is actually scheduled, letting the provisioner create the disk in the *same* availability zone as that Pod's node — important on cloud providers where a disk and the node using it must be in the same zone. `WaitForFirstConsumer` is the safer default on most cloud-managed clusters.

## Key terms

- **Static provisioning** — a PV is created by hand ahead of time
- **Dynamic provisioning** — a PVC triggers automatic creation of a matching PV via a StorageClass
- **StorageClass** — a named template describing how and where to provision storage
- **provisioner** — the plugin (often a CSI driver) that performs the actual storage creation
- **volumeBindingMode** — `Immediate` or `WaitForFirstConsumer`; when provisioning actually occurs relative to Pod scheduling
