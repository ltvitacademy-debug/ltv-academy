# Lesson 21 — Containers vs. Virtual Machines

**Chapter 5 · Virtualization Fundamentals · Lesson 21 of 32**

## What you'll learn

- The real architectural difference between a container and a virtual machine
- What namespaces and cgroups actually do inside the Linux kernel
- Why containers start in milliseconds while VMs take minutes
- When you'd actually choose a VM over a container, and vice versa

## The architectural difference: who owns the kernel

A virtual machine includes a complete guest operating system — its own kernel, its own drivers,
everything — running on top of the hypervisor's virtual hardware. A **container** skips all of
that: it shares the **host's existing kernel** and only packages the application along with its
own libraries and dependencies. That one difference — a full duplicate OS per VM, versus one
shared kernel for every container — is the entire reason containers and VMs behave so
differently.

```
Virtual Machines                        Containers
Hardware                                Hardware
  -> Hypervisor                           -> Host OS (one kernel)
     -> Guest OS 1 -> App                    -> Container runtime (Docker)
     -> Guest OS 2 -> App                       -> Container 1 (App) / Container 2 (App)
```

## How a shared kernel still isolates workloads

If every container shares the host's kernel, what stops Container 1 from seeing Container 2's
files or processes? Two real Linux kernel features:

- **Namespaces** give each container its own isolated view of PIDs, network interfaces,
  mount points, and hostnames — Container 1 literally cannot see Container 2's processes.
- **cgroups** (control groups) limit how much CPU, memory, and I/O each container is allowed
  to consume, so one container can't starve the others on the same host.

Namespaces + cgroups together are what let Docker (and the dozens of tools built on the same
kernel features) give each container the *feel* of its own isolated machine, without actually
booting a second operating system.

## Why containers start in milliseconds

Starting a VM means booting an entire operating system from scratch — loading a kernel,
starting init/systemd, bringing up services — which realistically takes anywhere from thirty
seconds to a couple of minutes. Starting a container means starting a single process inside
namespaces that already exist on an already-running kernel — no OS boot at all, just a process
launch, which is why containers routinely start in well under a second. The same gap applies to
resource usage: ten VMs mean ten full OS copies in memory; ten containers running the same
image share one kernel and typically only duplicate the application layer itself.

## When to actually choose one over the other

| Choose a VM when... | Choose a container when... |
|---|---|
| You need a different OS/kernel than the host (Windows app on a Linux host) | The app and host can share the same kernel (Linux-on-Linux) |
| You need the strongest possible isolation between tenants | Fast startup and high density matter more than hard isolation |
| You're running a legacy app that assumes a full OS | You're building microservices, CI/CD pipelines, or scaling horizontally |

In practice, most production environments run **both**: containers for the application layer,
orchestrated by something like Kubernetes, running on top of VMs for the underlying
infrastructure — getting the isolation benefits of virtualization with the speed and density of
containers.

## Key terms

| Term | Meaning |
|---|---|
| Container | A packaged application and its dependencies that shares the host OS kernel instead of running a full guest OS |
| Namespace | A Linux kernel feature that gives a container its own isolated view of processes, network, and mounts |
| cgroup | A Linux kernel feature that limits how much CPU/memory/I/O a container can consume |
| Container runtime | The software (e.g. Docker) that creates and manages containers on a host |

## Check yourself

Why does sharing the host's kernel let a container start in milliseconds, when a VM running
the exact same application might take a full minute to be ready?
