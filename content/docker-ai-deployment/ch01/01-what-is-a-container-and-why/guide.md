# Lesson 1 — What Is a Container, and Why?

**Chapter 1 · Docker Fundamentals · Lesson 1 of 25**

## What you'll learn

- What a container actually is: an isolated process, not a tiny virtual machine
- Why containers share the host's kernel instead of booting their own OS
- The specific pain containers solve for AI projects: "it worked on my
  machine" applied to Python versions, CUDA drivers, and multi-gigabyte
  model weights
- What a real container looks like once it's running, in Docker Desktop

## A process, not a computer

A virtual machine virtualizes hardware: it boots a full guest operating
system, with its own kernel, on top of a hypervisor. That's why a VM takes
minutes to start and gigabytes to store. A **container** virtualizes at a
much lower level — it's an isolated process (or group of processes) that
shares the host machine's kernel, but has its own filesystem, its own view
of running processes, and its own network interface. Starting one is
closer to starting a program than booting a computer, because that's
almost exactly what it is.

```
Virtual machine:                    Container:
Host OS -> Hypervisor               Host OS -> Container runtime
  -> Guest OS (full kernel)           -> Isolated process
    -> App + its dependencies           (shares host kernel)
                                         -> App + its dependencies
Boots in minutes, GBs each          Starts in ~seconds, MBs-GBs
```

## Why this matters specifically for AI work

Every AI project accumulates a pile of environment-specific facts: an
exact Python version, a specific PyTorch build matched to a specific CUDA
version, a stack of pip packages that only resolve cleanly in one order,
and model weight files that are themselves several gigabytes. None of that
travels safely as a README that says "just pip install these." A
container packages the runtime, the libraries, and the startup command
together as one artifact — the same artifact runs identically on your
laptop, a teammate's laptop, and a GPU server in the cloud (Lesson 11
covers the one piece that's genuinely different there: GPU access).

## What this looks like, running

Docker Desktop's **Containers** view is the plainest evidence that a
container is a real, lightweight, listed thing — not an abstraction:

![Docker Desktop's Containers view, listing several running and stopped containers side by side with their image, ports, and CPU usage — real isolated processes, not virtual machines.](/courses/docker-ai-deployment/ch01/01-what-is-a-container-and-why/desktop-containers-view.png)

Every row here is one isolated process sharing this machine's kernel.
Docker Desktop organizes everything you'll touch in this chapter —
containers, the images they're started from, build history — behind a
single left-hand navigation:

![Docker Desktop's left sidebar, listing Containers, Images, Volumes, Dev Environments, and Builds as the core sections of the app, with a Builds view open on the right showing active and completed image builds.](/courses/docker-ai-deployment/ch01/01-what-is-a-container-and-why/desktop-builds-view-sidebar.png)

Lesson 2 draws the line between that **Images** section and the
**Containers** section precisely — an image is the recipe, a container is
the thing actually running.

## Where the isolation comes from

Building a container image happens one instruction at a time, and each
instruction becomes its own layer on disk — visible, in Docker Desktop, as
a real build executing step by step:

![A Docker Desktop build log mid-run, showing individual RUN instructions executing in order — installing packages with apk, fetching dependencies — each one becoming a layer in the final image.](/courses/docker-ai-deployment/ch01/01-what-is-a-container-and-why/desktop-build-log-detail.png)

Lesson 3 is where you write the file that produces exactly this.

## Key terms

| Term | Meaning |
|---|---|
| Container | An isolated process that shares the host's kernel — not a virtual machine |
| Kernel sharing | What makes a container start in seconds and weigh megabytes, not gigabytes |
| Container runtime | The software (Docker Engine) that creates and isolates containers on the host |
| Reproducible environment | The actual problem containers solve for AI work: the same Python/CUDA/package stack, everywhere |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why does
a container start in roughly a second while a comparable virtual machine
takes a minute or more — what, specifically, does the container skip?
