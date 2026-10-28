# Lesson 12 — Virtual Machine Scale Sets Basics

**Chapter 3 · Azure Compute: Virtual Machines · Lesson 12 of 32**

## What you'll learn

- What a **Virtual Machine Scale Set (VMSS)** is: identical VM instances deployed and managed as
  one group
- How **autoscale rules** let that group grow and shrink automatically based on real metrics,
  like CPU percentage
- Why this matters for handling variable, unpredictable load without manual intervention
- How to create a scale set and attach an autoscale rule with the Azure CLI

## A Scale Set: identical VMs, managed as one unit

A **Virtual Machine Scale Set** lets you deploy and manage a group of **identical**, load-balanced
VM instances as a single resource, instead of creating and babysitting VMs one at a time. Every
instance in the set is built from the same image and size, and the set is typically paired with an
Azure Load Balancer or Application Gateway in front of it, which spreads incoming traffic across
whichever instances are currently running. The instance count can be changed manually — or, far
more usefully, automatically through **autoscale**.

```
az vmss create \
  --resource-group rg-web-prod \
  --name vmss-web \
  --image Ubuntu2204 \
  --vm-sku Standard_D2s_v5 \
  --instance-count 2 \
  --upgrade-policy-mode automatic \
  --lb lb-web \
  --admin-username azureuser \
  --generate-ssh-keys
```

## Autoscale: growing and shrinking on real metrics

**Autoscale** rules watch a metric — most commonly CPU percentage, though memory and custom
metrics work too — and change the instance count when that metric crosses a threshold you define.
A typical rule: scale out by one instance when average CPU exceeds 70% for 10 minutes; scale back
in when it drops below 30%. You set a minimum and maximum instance count so the set never scales
below what you need for availability or above a cost ceiling you're comfortable with.

```
az monitor autoscale create \
  --resource-group rg-web-prod \
  --resource vmss-web \
  --resource-type Microsoft.Compute/virtualMachineScaleSets \
  --min-count 2 --max-count 10 --count 2

az monitor autoscale rule create \
  --resource-group rg-web-prod \
  --autoscale-name autoscale-vmss-web \
  --condition "Percentage CPU > 70 avg 10m" \
  --scale out 1
```

## Why this matters for variable load

Traffic to most real applications isn't flat — it spikes during business hours, during a
marketing push, or during an unexpected surge, and drops overnight. Provisioning for peak traffic
all the time wastes money every hour traffic isn't at peak; provisioning for average traffic means
the application falls over during a spike. A Scale Set with autoscale solves both problems at
once: it runs the minimum instance count that keeps the app available during quiet periods, and it
adds instances automatically, within minutes, when load actually increases — then removes them
again once load drops back down. Scale sets can also be spread across Availability Zones for added
resilience, combining the two ideas from this chapter.

## Key terms

| Term | Meaning |
|---|---|
| Virtual Machine Scale Set (VMSS) | A group of identical VM instances deployed and managed as one resource |
| Autoscale | Rules that automatically change a scale set's instance count based on a metric like CPU percentage |
| Scale out / scale in | Adding instances (out) or removing instances (in) in response to an autoscale rule |
| Min / max instance count | The floor and ceiling autoscale will never cross, bounding both availability and cost |

## Check yourself

A web application's traffic triples every weekday afternoon and drops to almost nothing overnight.
Why does a Virtual Machine Scale Set with autoscale handle this better than a fixed number of
always-on VMs sized for the afternoon peak?
