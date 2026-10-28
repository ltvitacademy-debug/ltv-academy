# Lesson 22 — Why Cloud Computing Is Built on Virtualization

**Chapter 5 · Virtualization Fundamentals · Lesson 22 of 32**

## What you'll learn

- How a public cloud provider's datacenter is really just a massive fleet of hypervisor hosts
- What AWS Nitro and Azure's Hyper-V-based hosts actually are
- Why "launching a VM" in the cloud takes seconds instead of hours
- How this directly sets up multi-tenancy and the shared responsibility model

## The cloud is hypervisors, at massive scale

Everything you learned in this chapter — hypervisors, vCPUs, virtual memory, virtual disks —
isn't just background theory. It's literally what a public cloud provider's datacenter *is*.
Behind every AWS, Azure, or Google Cloud region are rows of physical servers, each running a
Type 1 hypervisor, each hosting dozens or hundreds of customer virtual machines. When you
"launch an EC2 instance" or "create an Azure VM," you are not getting new physical hardware —
you're getting a VM carved out of a physical server that was already running, by a hypervisor
that was already there.

```
Physical server (one of millions in a region)
  -> Nitro Hypervisor + Nitro Cards (network/storage/security offload)
     -> Customer VM 1 (your EC2 instance)
     -> Customer VM 2 (someone else's EC2 instance)
     -> Customer VM 3 (a third customer's EC2 instance)
```

AWS's own hypervisor platform is called **Nitro** — a lightweight, KVM-based hypervisor
combined with dedicated **Nitro Cards**, custom hardware that offloads networking, storage,
and security functions away from the main CPU, so almost all of the physical server's compute
power goes to customer VMs instead of virtualization overhead. Microsoft Azure runs its compute
fleet on a heavily customized version of **Hyper-V**, the same Type 1 hypervisor from Lesson 19,
scaled and hardened for multi-tenant cloud use.

## Why launching a cloud VM takes seconds, not hours

Provisioning a physical server from scratch — racking it, cabling it, installing an OS — takes
hours or days. Launching a cloud VM doesn't do any of that, because the hypervisor and the
physical capacity are already running, 24/7, across the provider's datacenters. An API call to
"launch an instance" really just tells an already-running hypervisor on an already-running
physical host: start a new VM, from this template image, with this much vCPU and RAM. That's a
software operation the hypervisor can complete in seconds, which is the entire reason cloud
computing feels instant compared to buying and racking physical hardware.

## Multi-tenancy: the other side of the same coin

Running VMs from different customers on the very same physical server is called
**multi-tenancy**, and it only works because the hypervisor enforces strict isolation between
every VM — the same vCPU scheduling, memory mapping, and virtual disk boundaries from Lessons
19 and 20. Your VM cannot see or touch another customer's VM's memory, disk, or network traffic,
even though you might both be running on the exact same piece of physical hardware at the same
moment.

## Setting up the shared responsibility model

This also draws a hard, physical line between what the cloud provider controls and what you
control. The provider owns, patches, and secures the hypervisor and the physical hardware
underneath it — you never touch that layer. You own everything from the guest OS up: patching
your VM, configuring your applications, securing your data. That exact line is the **shared
responsibility model**, and Chapter 6 covers it in full starting in the very next lesson.

## Key terms

| Term | Meaning |
|---|---|
| AWS Nitro | AWS's lightweight hypervisor platform plus dedicated offload hardware (Nitro Cards) for networking/storage/security |
| Multi-tenancy | Multiple customers' VMs running safely on the same shared physical hardware, isolated by the hypervisor |
| Template image | A pre-built VM image (OS + configuration) a cloud provider spins up instantly as a new instance |
| Shared responsibility model | The division of security duties: the provider secures the hypervisor/hardware, the customer secures everything in the guest OS up |

## Check yourself

Why can a cloud provider launch you a new VM in seconds, when provisioning a brand-new physical
server would take hours or days?
