# Lesson 10 — Why Linux Runs the Cloud

**Chapter 3 · Linux Fundamentals I — The Shell & Filesystem · Lesson 10 of 32**

## What you'll learn

- Why the overwhelming majority of public cloud VM images and container base images run Linux, not Windows
- The real licensing/cost reason enterprises standardized on Linux at cloud scale
- The major Linux distro families you'll actually run into on the job: Debian/Ubuntu, RHEL/CentOS/Fedora, and Amazon Linux
- Why a small, lightweight footprint matters specifically for containers

## No license fee, at any scale

The Linux kernel is open source, released under the GPL, and free to run on as many servers as you
want. That single fact is a big part of why Linux won the cloud: a company running ten thousand
Windows Server VMs pays a licensing fee on every one of them, while the same fleet of Linux VMs
costs nothing in OS licensing. AWS, Microsoft Azure, and Google Cloud all run the bulk of their own
infrastructure on Linux, and when you open any of their VM image catalogs or container registries,
Linux images vastly outnumber Windows ones. That's not an accident of taste — it's economics at
scale.

## The distro families you'll actually meet

"Linux" isn't one thing — it's a kernel that many different **distributions** ("distros") package
differently. Three families matter most in cloud and DevOps work:

| Family | Examples | Package manager |
|---|---|---|
| Debian/Ubuntu | Debian, Ubuntu Server | `apt` / `apt-get` |
| RHEL/CentOS/Fedora | Red Hat Enterprise Linux (RHEL), Fedora, CentOS Stream | `yum` / `dnf` |
| Amazon Linux | Amazon Linux 2, Amazon Linux 2023 | `yum` / `dnf` |

Ubuntu is the single most common default image across AWS, Azure, and GCP's VM catalogs — it's
usually the first option offered when you spin up a new VM in any of them. RHEL and its relatives
dominate traditional enterprise data centers, which is why so many of those workloads carry the
same conventions into the cloud. Amazon Linux is AWS's own RHEL-derived distro, built specifically
to run well on EC2 and often the default AMI (Amazon Machine Image) for new instances there.

## Why containers need Linux to be small

Cloud computing didn't stop at virtual machines — most new workloads now run in **containers**
(Docker, Kubernetes), and containers raise the stakes on footprint even further. A container is
meant to start in milliseconds and ship as a small image, so the operating system layer underneath
it has to be tiny. A minimal Linux base image can be a few megabytes; a full Windows Server Core
container image runs into gigabytes. That size gap is exactly why the entire container ecosystem —
Docker Hub's official images, Kubernetes nodes, serverless container platforms — assumes a Linux
userland by default, even when the developer building the image is sitting at a Windows laptop
(commonly through WSL2, Windows's own Linux subsystem).

## Put together, this is why Linux is the default

Put the pieces together and the pattern across every major cloud provider is the same: free to run
at any scale, backed by distros purpose-built for servers and containers, and light enough to boot
fast and ship small. That's why, from this lesson forward, almost everything in this course — the
shell, the filesystem, the users and permissions, the services — is Linux, not Windows.

## Key terms

| Term | Meaning |
|---|---|
| Kernel | The core of the operating system that talks directly to hardware; "Linux" technically refers to the kernel |
| Distribution (distro) | A complete OS built around the Linux kernel, bundled with a package manager and default software (e.g. Ubuntu, RHEL) |
| Open source | Software whose source code is freely available to run, inspect, and modify, with no per-instance license fee |
| Container base image | The minimal OS layer a container is built on top of — Linux images are typically megabytes; Windows images are typically gigabytes |

## Check yourself

Why does Linux having no per-instance license fee matter far more when you're running ten
thousand cloud VMs than it would for a single server sitting under someone's desk?
