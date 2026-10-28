# Lesson 19 — What Virtualization Actually Is: Type 1 vs. Type 2 Hypervisors

**Chapter 5 · Virtualization Fundamentals · Lesson 19 of 32**

## What you'll learn

- What a hypervisor actually does to physical hardware
- The real difference between a Type 1 (bare-metal) and a Type 2 (hosted) hypervisor
- Real examples of each kind you'll encounter on the job
- Why production datacenters and public clouds run Type 1, almost without exception

## What a hypervisor actually does

A physical server has one CPU (or a fixed set of cores), one pool of RAM, and one set of
physical disks. A **hypervisor** is the software layer that takes those fixed physical
resources and carves them into multiple sets of **virtual** resources — virtual CPUs, virtual
memory, virtual disks — each one handed to a separate **virtual machine (VM)**. Every VM
believes it has its own dedicated hardware; in reality the hypervisor is scheduling, mapping,
and enforcing isolation behind the scenes so several VMs can share one physical box safely.
This single idea — one physical machine, carved into many virtual ones — is the foundation
everything else in this chapter, and the entire cloud computing industry, is built on top of.

## Type 1: bare-metal hypervisors

A **Type 1 hypervisor** installs directly on the physical hardware, with no general-purpose
host operating system underneath it. The hypervisor itself *is* the first thing that boots.
Real examples:

| Hypervisor | Vendor |
|---|---|
| VMware ESXi | VMware (Broadcom) |
| Microsoft Hyper-V (Server role) | Microsoft |
| KVM | Built into the Linux kernel |
| Xen | Open source |

Because there's no host OS competing for CPU cycles, memory, or I/O, a Type 1 hypervisor runs
with near-native performance and is what every production datacenter and every public cloud
provider (AWS, Azure, GCP) runs on their physical servers. You'll see exactly why in Lesson 22.

## Type 2: hosted hypervisors

A **Type 2 hypervisor** is just an application that installs on top of a regular host
operating system — Windows, macOS, or Linux — the same way you'd install any other program.
Real examples: VMware Workstation, VMware Fusion, and Oracle VirtualBox. You open VirtualBox
on your Windows laptop, create a VM, and now you're running a guest OS (say, Ubuntu) inside a
window on your existing Windows desktop.

```
Type 1 (bare-metal)                    Type 2 (hosted)
Hardware                               Hardware
  -> Hypervisor (ESXi/Hyper-V/KVM)       -> Host OS (Windows/macOS/Linux)
     -> VM1 / VM2 / VM3                     -> Hypervisor app (VirtualBox)
                                               -> VM1 / VM2
```

The host OS is still running underneath a Type 2 hypervisor, competing for the same CPU and
memory the VMs need, which is why Type 2 hypervisors are slower than Type 1 and are used for
development, testing, and running a second OS on a personal machine — not production servers.

## Why this distinction matters on the job

When you hear "we're spinning up a new VM on the ESXi cluster," that's Type 1 — a dedicated
physical host whose only job is running VMs. When a developer says "I'm testing this in
VirtualBox on my laptop," that's Type 2 — a convenience layer on a machine that's doing other
things too. Knowing which one you're dealing with tells you immediately what performance and
reliability to expect, and it's the first distinction every virtualization and cloud
conversation assumes you already know.

## Key terms

| Term | Meaning |
|---|---|
| Hypervisor | Software that abstracts physical CPU, memory, storage, and network into virtual resources for VMs |
| Type 1 (bare-metal) hypervisor | Installs directly on hardware with no host OS underneath; e.g. ESXi, Hyper-V, KVM, Xen |
| Type 2 (hosted) hypervisor | Installs as an application on top of a host OS; e.g. VirtualBox, VMware Workstation |
| Guest OS | The operating system running inside a virtual machine |

## Check yourself

Why does every major public cloud provider run Type 1 hypervisors on its physical servers
instead of Type 2?
