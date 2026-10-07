# Virtual Machines & Hypervisors

Every lesson so far assumed one operating system per physical machine. In practice, nearly every server you'll touch in a real job — and the entire cloud, underneath the marketing language — runs multiple operating systems on one piece of hardware at the same time. This lesson introduces virtualization, the technique that makes that possible, and closes out Chapter 1 by connecting hardware, OS, processes, and client/server roles into the model you'll build on for the rest of this course.

## What you'll learn

- What a virtual machine (VM) is, and how it differs from a regular process
- What a hypervisor does, and the difference between Type 1 and Type 2 hypervisors
- Why virtualization exists: the business problem it solves
- How this sets up the idea of "the cloud" you'll meet in a later chapter

## What a virtual machine is

A **virtual machine (VM)** is software that emulates a complete computer — its own virtual CPU, virtual RAM, virtual storage, and virtual network interface — convincingly enough that a full, separate operating system can be installed and run inside it, unaware it isn't running on real, dedicated hardware. Where a process is one running program managed by an OS, a VM is an entire OS, with its own processes, managed by something a layer further down.

That "something" is called a **hypervisor**: the software layer responsible for creating virtual machines, allocating slices of the real hardware's CPU, RAM, and storage to each one, and keeping them isolated from each other. From inside a VM, the guest operating system behaves exactly as if it had a real, dedicated machine to itself.

## Type 1 vs. Type 2 hypervisors

Hypervisors come in two shapes:

- **Type 1 (bare-metal)** — runs directly on the physical hardware, with no underlying host operating system. This is how production servers and cloud data centers run virtualization, because it's leaner and faster. Examples include VMware ESXi and Microsoft Hyper-V (server mode).
- **Type 2 (hosted)** — runs as an application on top of a regular host operating system, the way any other program does. This is common for developer laptops and testing. Examples include VMware Workstation and Oracle VirtualBox.

Both do the same job — creating and managing VMs — but Type 1 sits closer to the hardware, which is why it's the standard in data centers and the cloud.

## Why virtualization exists

Before virtualization was common, a business running three different applications typically bought three separate physical servers — one per application — because mixing unrelated workloads on one OS was considered risky and hard to manage. Most of the time, each of those servers sat mostly idle; a typical application rarely needs a whole machine's worth of CPU and RAM.

Virtualization solves that waste. One sufficiently powerful physical server, running a hypervisor, can host many VMs, each with its own OS, each isolated from the others, each sized to what the workload actually needs. If Northbridge Retail previously ran its inventory system, its reporting system, and its internal wiki on three separate physical machines, a single virtualized host could run all three as VMs instead — better hardware utilization, and if one VM needs to be rebuilt or restarted, the other two are unaffected.

## Setting up the cloud

This is the idea that public cloud providers scaled to an enormous size: massive data centers full of physical servers, running hypervisors, renting out individual VMs to customers on demand. When you "spin up a server in the cloud," what you're almost always doing is requesting a new virtual machine from a provider's hypervisor layer — you never see or touch the underlying physical hardware. You'll build directly on this idea starting in the cloud fundamentals chapter later in this course.

## Key terms

| Term | Meaning |
|---|---|
| Virtual machine (VM) | Software that emulates a complete computer, able to run its own full operating system |
| Hypervisor | The software layer that creates, allocates hardware to, and isolates VMs |
| Type 1 hypervisor | Runs directly on hardware, no host OS (production/data center standard) |
| Type 2 hypervisor | Runs as an application on top of a host OS (common for laptops/testing) |
| Host / guest | The hypervisor's underlying machine (host) vs. the OS running inside a VM (guest) |

## Recap

A virtual machine is a complete, isolated computer emulated in software, created and managed by a hypervisor — Type 1 running directly on hardware for production use, Type 2 running as an app on a host OS for development and testing. Virtualization exists to stop paying for idle hardware, and it's the foundation the entire public cloud is built on top of. That closes out Chapter 1 — you now have the full picture of hardware, OS, processes, client/server roles, and virtualization working together.
