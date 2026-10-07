# Kubernetes & Terraform Interview Questions

Kubernetes and Terraform questions are where interviewers probe whether you understand the infrastructure layer, not just the pipeline sitting on top of it. This lesson covers real sample questions with model answers, grounded in the AKS clusters and Terraform setup you built for Northbridge Retail — including the state-collision story from Chapter 3.

## What you'll learn

- How a Deployment differs from a StatefulSet, and why that choice matters for a service like `checkout`
- What Terraform state actually is, and why remote state with locking isn't optional at a team's scale
- How the Horizontal Pod Autoscaler actually makes a scaling decision
- How to turn the Terraform state-collision incident into a clean, specific answer

## Sample questions and model answers

**Q: What's the difference between a Deployment and a StatefulSet, and which did you use?**
A Deployment manages a set of interchangeable, stateless pod replicas — any pod can be killed and replaced by an identical one, and pods get random names. A StatefulSet is for workloads that need stable network identity and stable storage per replica — each pod gets a predictable name and its own persistent volume that follows it across restarts, which matters for something like a database replica set. Both `product-catalog` and `checkout` run as Deployments, because they're stateless — all persistent state lives in Azure Database for PostgreSQL Flexible Server, outside the cluster entirely. That's a deliberate choice: it means either service's pods can be freely killed, rescheduled, or scaled without any data-locality concern.

**Q: What is Terraform state, and why does remote state with locking matter?**
Terraform state is the JSON file mapping every resource block in your configuration to the real cloud resource it created — without it, Terraform has no way to know what already exists or detect drift. Local state works fine solo, but breaks down the moment more than one person runs `terraform apply`, because two applies reading and writing the same local file race each other and can corrupt it or silently overwrite each other's changes. Remote state (ours lives in an `azurerm` backend, storage account `sttfstatenorthbridge`, container `tfstate`) centralizes that single source of truth, and locking — via a blob lease on that same storage — prevents two applies from running against it at the same time at all.

**Q: Tell me about a time Terraform state caused a real problem.**
"Two engineers on our team ran `terraform apply` against the dev resource group at almost the same time. Because our state was in a remote `azurerm` backend with blob-lease locking enabled, the second apply didn't corrupt anything — it was blocked outright with a clear 'state is locked' error until the first one finished. It was a good forcing function for the team to actually internalize why remote state and locking matter, instead of just knowing it as a best practice on paper." That answer works because it's specific — a named mechanism, a named outcome, no hand-waving.

**Q: How does a Horizontal Pod Autoscaler decide when to scale?**
The HPA controller polls a metrics source (the metrics-server, reading current CPU/memory utilization per pod) on a fixed interval, compares current utilization against the target you configured, and computes a desired replica count proportionally — roughly `desiredReplicas = currentReplicas × (currentMetric / targetMetric)`, clamped between the configured min and max. `checkout`'s HPA targets 70% CPU with a 3-15 pod range, wide enough to absorb a flash-sale spike; `product-catalog`'s targets a narrower 2-8 pod range because its traffic is steadier and more predictable. The gap between those two ranges is itself a good interview answer to "how do you size an HPA" — it should reflect the actual shape of a service's load, not a copy-pasted default.

## Key terms

| Term | Meaning |
|---|---|
| Deployment | Manages stateless, interchangeable pod replicas |
| StatefulSet | Manages pods needing stable identity and per-replica storage |
| Terraform state | The record mapping config resources to real infrastructure |
| Blob-lease locking | Prevents two concurrent `terraform apply` runs from racing each other |
