# StorageClasses & Dynamic Provisioning

Pre-creating a PersistentVolume by hand for every database Northbridge spins up doesn't scale — someone has to go provision a cloud disk, note its ID, and write a matching PV manifest, every single time. A **StorageClass** automates that: it tells Kubernetes *how* to create storage on demand, so a PersistentVolumeClaim can trigger a brand-new PersistentVolume automatically instead of waiting for one to already exist.

## What you'll learn

- The difference between static provisioning (last lesson) and dynamic provisioning
- What a StorageClass actually configures, field by field
- How a PVC triggers dynamic provisioning just by naming a StorageClass
- What `volumeBindingMode` controls, and why it matters for scheduling
- A full worked scenario: a Pod stuck Pending with its PVC already Bound

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

## Troubleshooting scenario: Pod stuck Pending, PVC already Bound

**Problem description.** Northbridge deploys a new `catalog-db` StatefulSet. The PVC it depends
on shows `Bound` almost immediately — provisioning clearly succeeded — but the Pod itself never
leaves `Pending`, with no application error anywhere, because it never even starts.

**Available evidence.**

```bash
$ kubectl get pvc catalog-db-pvc -n northbridge-retail
NAME             STATUS   VOLUME                                     CAPACITY
catalog-db-pvc   Bound    pvc-7a3f21b0-...                           20Gi

$ kubectl get pod catalog-db-0 -n northbridge-retail
NAME           READY   STATUS    RESTARTS   AGE
catalog-db-0   0/1     Pending   0          6m

$ kubectl describe pod catalog-db-0 -n northbridge-retail
Events:
  Warning  FailedScheduling  3m (x8 over 6m)  default-scheduler
    0/5 nodes are available: 5 node(s) had volume node affinity conflict.
```

**Diagnostic questions.**

- The PVC is already `Bound` — does that mean the underlying disk is necessarily usable by any
  node the scheduler might pick?
- What does "volume node affinity conflict" actually mean, mechanically — what two things are
  conflicting?
- What was this StorageClass's `volumeBindingMode`, and when did provisioning actually happen
  relative to the Pod being scheduled?

**Expected investigation sequence.**

```bash
# Step 1 -- the Events line already names the failure type directly:
# a volume node affinity conflict. Check what zone the PV actually
# landed in
$ kubectl get pv pvc-7a3f21b0-... -o jsonpath='{.spec.nodeAffinity}'
{"required":{"nodeSelectorTerms":[{"matchExpressions":[
  {"key":"topology.kubernetes.io/zone","operator":"In","values":["us-east-1a"]}
]}]}}
# this PV can only attach to a node in us-east-1a

# Step 2 -- check which zones the cluster's nodes are actually in
$ kubectl get nodes -L topology.kubernetes.io/zone
NAME      ZONE
node-01   us-east-1b
node-02   us-east-1b
node-03   us-east-1c
# no node in us-east-1a exists at all

# Step 3 -- confirm the StorageClass's volumeBindingMode, since that's
# what determines when this mismatch could even happen
$ kubectl get storageclass fast-ssd -o jsonpath='{.volumeBindingMode}'
Immediate
```

**Correct resolution.** The StorageClass uses `volumeBindingMode: Immediate`, so the disk was
provisioned the moment the PVC was created — before Kubernetes had any idea which node the
`catalog-db-0` Pod would eventually land on — and it happened to land in `us-east-1a`, a zone
this cluster doesn't actually have any nodes in. No node can ever satisfy the PV's zone
requirement, so the Pod is permanently unschedulable with the current PV. The fix is deleting
the PVC (and the orphaned PV, if the reclaim policy doesn't clean it up automatically) and
switching the StorageClass to `volumeBindingMode: WaitForFirstConsumer`, so a future PVC's
provisioning waits until the consuming Pod is scheduled and creates the disk in whatever zone
that Pod actually lands in.

**Why this failure happens, and why "PVC: Bound" is misleading.** `Bound` only confirms a PV and
PVC are matched to each other — it says nothing about whether any node in the cluster can
actually use that specific PV. This is exactly the gap `WaitForFirstConsumer` closes, explained
earlier in this same lesson: `Immediate` provisioning happens with zero knowledge of where the
Pod will be scheduled, so on a multi-zone cluster it's a coin flip whether the disk ends up
reachable. A `Bound` PVC reads as "storage is ready," which is true in isolation but doesn't mean
"storage is usable by this specific Pod" — that second, stricter condition is what the scheduler
is actually checking when it reports a node affinity conflict.

**Prevention.** Default every StorageClass to `volumeBindingMode: WaitForFirstConsumer` on any
multi-zone cluster, exactly as this lesson recommends — `Immediate` should be a deliberate
exception for genuinely single-zone or zone-agnostic storage, not the default left unexamined.

## Key terms

- **Static provisioning** — a PV is created by hand ahead of time
- **Dynamic provisioning** — a PVC triggers automatic creation of a matching PV via a StorageClass
- **StorageClass** — a named template describing how and where to provision storage
- **provisioner** — the plugin (often a CSI driver) that performs the actual storage creation
- **volumeBindingMode** — `Immediate` or `WaitForFirstConsumer`; when provisioning actually occurs relative to Pod scheduling
- **Volume node affinity conflict** — a scheduling failure where a Pod's only usable PV is zone-locked to a zone none of the cluster's nodes are in
