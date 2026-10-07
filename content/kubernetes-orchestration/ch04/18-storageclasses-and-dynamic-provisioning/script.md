# Script — StorageClasses & Dynamic Provisioning

## Segment 1 (title)

Pre-creating a PersistentVolume by hand for every database Northbridge spins up doesn't scale. A StorageClass automates it — it tells Kubernetes how to create storage on demand instead of waiting for a human to provision it first.

## Segment 2 (steps)

The previous lesson's approach, creating a PV by hand ahead of time, is called static provisioning — it works, but requires a person or separate automation every time. A StorageClass is a template, not actual storage, describing how to create it. Dynamic provisioning means a PVC itself triggers that creation automatically.

## Segment 3 (code)

The provisioner field names the plugin, typically a CSI driver, that actually creates the disk — here, the AWS EBS driver, with parameters controlling disk type and filesystem. reclaimPolicy works the same as on a plain PV, just set as a class-wide default.

## Segment 4 (code)

A PVC just references the StorageClass by name — no PV needs to exist beforehand. Creating this claim triggers the provisioner to build a brand-new, correctly sized disk and bind it automatically. Most clusters also mark one StorageClass as default, applied when a PVC doesn't specify one at all.

## Segment 5 (outro)

volumeBindingMode WaitForFirstConsumer delays provisioning until a Pod is actually scheduled, so the disk lands in the same availability zone as the node that needs it — the safer default on most cloud clusters. That wraps up configuration and storage — next, Chapter 5 covers scaling and reliability.
