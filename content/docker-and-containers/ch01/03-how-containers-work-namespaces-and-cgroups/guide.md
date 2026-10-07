# How Containers Work: Namespaces & cgroups

Lesson 2 established that containers share the host's kernel instead of booting their own. That raises an obvious question: if every container is really just a process running on the same Linux kernel as every other container, what stops them from seeing each other's files, interfering with each other's processes, or starving each other of CPU and memory? The answer is two Linux kernel features Docker builds on top of: **namespaces** and **cgroups**. Neither one is a Docker invention — they're kernel features Docker packages into an easy-to-use tool.

## What you'll learn

- What a Linux namespace isolates, and which ones Docker uses
- What a control group (cgroup) limits, and why that matters for a shared host
- How namespaces and cgroups combine to create what we call "a container"
- Why this matters when Northbridge Retail runs several containers on one server

## Namespaces: what a container can see

A **namespace** is a Linux kernel feature that gives a process its own isolated view of a particular kind of system resource. A process inside a namespace can still see other processes on the host kernel underneath — it just can't see anything outside the slice of the system its namespace exposes to it. Docker uses several namespace types together to build a container's isolation:

| Namespace | What it isolates |
|---|---|
| PID | Process IDs — a container sees only its own processes, starting from PID 1 |
| NET | Network interfaces, IP addresses, routing tables, and ports |
| MNT | Mount points — a container gets its own view of the filesystem |
| UTS | Hostname and domain name |
| IPC | Inter-process communication — message queues, shared memory |
| USER | User and group IDs — a container's "root" can map to an unprivileged host user |

Put together, these namespaces are why a process running inside a container believes it has its own machine: its own process tree, its own network stack, its own filesystem — even though, underneath, it's one more process on the host's single kernel.

```text
$ docker run -it ubuntu bash
root@3f2a9c1d4e5b:/# ps aux
# Only this container's own processes are visible -- PID namespace in action
```

## cgroups: how much a container can use

Namespaces control what a container can *see*. **Control groups**, or **cgroups**, control what it can *use*. A cgroup is a Linux kernel feature that limits and accounts for the CPU, memory, disk I/O, and network bandwidth a group of processes is allowed to consume. Without cgroups, one runaway container could consume all the memory on a host and starve every other container running there.

```bash
# Limit a container to 512 MB of memory and half a CPU core
docker run -d --memory="512m" --cpus="0.5" northbridge/catalog:latest
```

Docker sets sensible cgroup limits automatically, and lets you override them per container with flags like `--memory` and `--cpus`, exactly as shown above.

## Namespaces + cgroups = a container

A **container**, in the strictest technical sense, is nothing more than one or more Linux processes running with namespaces applied (so they have an isolated view of the system) and cgroup limits applied (so they can't overconsume shared resources). Docker's contribution isn't inventing this isolation — it's wrapping it in an image format, a command-line interface, and a daemon that makes setting it all up a one-line `docker run` instead of hand-assembling kernel primitives.

## Why this matters at Northbridge Retail

Northbridge runs its product-catalog and checkout containers on the same set of hosts to keep infrastructure costs down. Namespaces mean a bug in the catalog service's code can't accidentally read checkout's files or kill checkout's processes. cgroups mean a traffic spike that sends catalog's CPU usage through the roof doesn't starve checkout of the CPU it needs to keep processing orders. Both guarantees come from the same two kernel features — not from Docker itself.

## Key terms

- **Namespace** — a Linux kernel feature that gives a process an isolated view of one kind of system resource (processes, network, filesystem, etc.)
- **cgroup (control group)** — a Linux kernel feature that limits and accounts for the resources (CPU, memory, I/O) a group of processes may consume
- **PID namespace** — isolates the process ID space, so a container only sees its own processes
- **Container (technical definition)** — one or more processes running under a combination of namespaces and cgroup limits
