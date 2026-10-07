# Script — Kubernetes & Terraform Interview Questions

## Segment 1 (title)

Kubernetes and Terraform questions probe whether you understand the infrastructure layer underneath the pipeline, not just the pipeline itself. These are real sample questions, grounded in the AKS and Terraform setup you built for Northbridge, including the state-collision story.

## Segment 2 (steps)

A Deployment manages interchangeable, stateless replicas — any pod can be killed and replaced by an identical one with a random new name. A StatefulSet is for workloads needing stable network identity and per-replica storage, like a database replica set. Both product-catalog and checkout run as Deployments, because all real state lives outside the cluster entirely, in Postgres Flexible Server — a deliberate choice that means either service's pods can be freely rescheduled without any data-locality concern.

## Segment 3 (code)

For "tell me about a time Terraform state caused a problem," there's a real answer sitting right in the capstone. Two engineers ran terraform apply against the dev resource group at nearly the same time. Because state lived in a remote backend with blob-lease locking, the second apply didn't corrupt anything at all — it was blocked outright with a clear "state is locked" error until the first one finished cleanly.

## Segment 4 (steps)

For the HPA, the controller polls current CPU utilization from the metrics server, compares it against your configured target, and computes a desired replica count proportionally, clamped between a min and max you set. Checkout targets 70% CPU across a 3-to-15 pod range to absorb flash-sale spikes, while product-catalog's narrower 2-to-8 range reflects its steadier, more predictable traffic — that gap between the two ranges is itself a good answer to "how do you size an HPA."

## Segment 5 (outro)

Next up, lesson twenty-four: behavioral and incident interview questions, where the flash-sale incident drill becomes your strongest story of all.
