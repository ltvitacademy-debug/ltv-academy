# Containers vs. Virtual Machines

Northbridge Retail's infrastructure team already runs virtual machines for several internal systems, so when the subject of containers comes up, the first question is always the same: aren't these just lightweight VMs? They solve a similar problem — isolating applications from each other — but the way they do it, and what that difference costs you, is where this lesson focuses.

## What you'll learn

- The architecture difference between a container and a virtual machine
- Why that difference changes startup time, resource use, and density
- Where each one still earns its place in a real infrastructure
- Why Docker specifically uses containers for application packaging

## Virtual machines: a full OS, every time

A virtual machine runs on top of a **hypervisor**, which emulates a complete computer. Each VM gets its own full guest operating system — its own kernel, its own copy of system services — even though it's sitting on hardware that's already running a host OS underneath it.

![Architectural diagram showing a VM's apps and services running on top of a full guest kernel and OS, which sits on a hypervisor above the hardware.](/courses/docker-and-containers/ch01/02-containers-vs-virtual-machines/virtual-machine-diagram.png)
*Each virtual machine boots its own complete OS — including its own kernel — on top of the hypervisor.*

That gives a VM very strong isolation: a problem in one VM's kernel can't touch another VM's kernel, because they aren't sharing one. The cost is weight. Booting a full OS takes real time — often minutes — and consumes memory and disk just to run the operating system itself, before the application inside it does any work.

## Containers: share the kernel, isolate the rest

A container takes a different approach. Instead of virtualizing an entire computer, it virtualizes at the operating-system level: every container on a host shares that host's single kernel, and each container gets an isolated view of processes, the filesystem, and networking layered on top of it.

![Architectural diagram showing multiple containers, each with its own apps and services, sharing one host OS kernel.](/courses/docker-and-containers/ch01/02-containers-vs-virtual-machines/container-diagram.png)
*Containers skip the guest kernel entirely — they share the host's kernel and package only the app layer.*

Because there's no guest kernel to boot, a container typically starts in well under a second, and it only consumes the memory and disk its application actually needs — not an entire operating system's worth.

## Side by side

| | Virtual machine | Container |
|---|---|---|
| What it virtualizes | A complete computer, via a hypervisor | The operating system, sharing one kernel |
| Startup time | Minutes | Milliseconds to a few seconds |
| Isolation strength | Very strong — separate kernels | Strong, but a shared kernel is a smaller boundary |
| Resource overhead | A full guest OS per instance | Just the app and its dependencies |
| Typical density per host | Low — a handful of VMs | High — dozens to hundreds of containers |

## Where each one still earns its place

Containers didn't make VMs obsolete — they solve different problems, and in production the two are often used together. Northbridge Retail, for example, runs its container hosts *on top of* VMs in its cloud provider: the VM provides a strong security boundary around the whole host, and containers inside that VM give fast, efficient packaging for the catalog and checkout services. A VM is still the right call when you need to run an entirely different guest operating system than the host, or when regulatory requirements demand kernel-level isolation between workloads. A container is the right call for packaging and running an application quickly, consistently, and at high density.

## Key terms

- **Hypervisor** — the software layer that creates and runs virtual machines, emulating hardware for each guest OS
- **Guest OS** — the complete operating system, including its own kernel, that runs inside a virtual machine
- **Shared kernel** — the defining trait of containers: every container on a host uses that host's single OS kernel
- **Density** — how many isolated workloads a single host can run at once; containers achieve far higher density than VMs
