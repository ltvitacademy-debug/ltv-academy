# Lesson 18 — StorageClasses and Dynamic Provisioning in the Cloud

**Chapter 5 · Kubernetes Storage & Stateful Workloads · Lesson 2 of 4**

## What you'll learn

- Why hand-creating a PersistentVolume for every claim doesn't scale,
  and what **dynamic provisioning** replaces it with
- What a **StorageClass** actually configures: which provisioner
  creates the disk, what kind of disk, and what happens to it when
  the claim is deleted
- How a PVC that names a StorageClass — or names none at all —
  triggers a real Azure Disk or AWS EBS volume to be created on
  demand
- How to find out which StorageClass is the cluster's default, and
  why that matters even when your PVC doesn't mention one

## The problem with PVs you create by hand

Last lesson's PersistentVolume was created manually, pointing at a
disk (`myAKSDisk`) that already existed in Azure. That works for a
lab. It does not work once you have dozens of applications each
claiming their own storage, because it means a human — or a script
standing in for one — has to go provision a real cloud disk through
the Azure or AWS console *before* the PVC can ever bind. Kubernetes'
answer is to let a **provisioner** do that disk-creation step
automatically, triggered by the PVC itself. That's dynamic
provisioning, and the object that configures it is the
**StorageClass**.

## StorageClass: the template a provisioner uses

A StorageClass doesn't represent a piece of storage the way a PV
does. It's closer to a recipe: it names a provisioner plugin and the
parameters that provisioner should use when it's asked to create a
new disk. Here's a real one for Azure Kubernetes Service, backed by
Azure Disk:

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: managed-premium-retain
provisioner: disk.csi.azure.com
reclaimPolicy: Retain
volumeBindingMode: WaitForFirstConsumer
parameters:
  skuName: Premium_LRS
  kind: Managed
```

`provisioner: disk.csi.azure.com` is AKS's CSI (Container Storage
Interface) driver for Azure Disk — the component that actually calls
the Azure API to create a managed disk when it's asked to. The AWS
equivalent would set `provisioner: ebs.csi.aws.com` with parameters
like `type: gp3`. `parameters` are passed straight through to that
provisioner — `skuName: Premium_LRS` tells Azure which disk tier to
create. `reclaimPolicy: Retain` means the underlying disk survives
even after the PVC that triggered its creation is deleted, which
matters a great deal once you're storing anything you can't easily
regenerate.

## Requesting dynamic provisioning from a PVC

A PVC triggers dynamic provisioning simply by naming a StorageClass
instead of expecting an existing PV to match:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-dynamic
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: managed-premium-retain
  resources:
    requests:
      storage: 20Gi
```

The moment this PVC is created (or, with `WaitForFirstConsumer`
binding mode, the moment a Pod that uses it is actually scheduled),
the `disk.csi.azure.com` provisioner creates a new 20Gi Premium_LRS
managed disk in Azure, creates a PersistentVolume object pointing at
it, and binds that new PV to this claim — no human ever touches the
Azure portal. `WaitForFirstConsumer` specifically delays provisioning
until a Pod needs the volume, so the disk gets created in the same
availability zone as the node the Pod actually lands on, instead of
guessing upfront and possibly provisioning it somewhere the Pod can't
reach.

## Default StorageClasses, and why a PVC with no `storageClassName` still gets one

Most managed Kubernetes offerings ship with a default StorageClass
already installed — AKS defaults to a `default` class backed by
standard Azure Disk; EKS similarly ships a `gp2`-backed default on
many versions. Check which one is marked default in your cluster:

```bash
kubectl get storageclass
```

The output marks the default with `(default)` next to its name. If a
PVC omits `storageClassName` entirely, Kubernetes doesn't leave it
unprovisioned — it uses whichever StorageClass carries the
`storageclass.kubernetes.io/is-default-class: "true"` annotation. This
is exactly why a PVC that looks like it's requesting "nothing special"
can still end up dynamically provisioned, and why it's worth running
`kubectl get storageclass` on any new cluster before assuming you know
what kind of disk your Pods are about to get.

## Key terms

| Term | Meaning |
|---|---|
| Dynamic provisioning | A PVC triggering automatic, on-demand creation of the underlying disk and its matching PV, instead of a human pre-creating one |
| StorageClass | The object naming a provisioner and its parameters — the template used to create a disk, not storage itself |
| Provisioner | The CSI driver (e.g. `disk.csi.azure.com`, `ebs.csi.aws.com`) that actually calls the cloud API to create the disk |
| `volumeBindingMode: WaitForFirstConsumer` | Delays disk creation until a Pod using the claim is scheduled, so the disk lands in the right zone |
| Default StorageClass | The class used automatically when a PVC's `storageClassName` is omitted, marked with an `is-default-class` annotation |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: what
does `provisioner: disk.csi.azure.com` actually do when a new PVC
names that StorageClass, and why does a PVC that never mentions a
`storageClassName` still end up with real storage attached?
