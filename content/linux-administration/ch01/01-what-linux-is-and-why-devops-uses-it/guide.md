# What Linux Is & Why DevOps Uses It

Welcome to Linux Administration, and to the Linux Foundations chapter everything else in this course builds on. If your background is Windows Server, or just a personal laptop, this lesson resets your mental model: "Linux" is not one single operating system you install from a box. It's a kernel — one piece of software — that different companies and communities package into dozens of different, fully usable operating systems called distributions. Throughout this course you'll follow Northbridge Retail, a mid-size e-commerce retailer whose ops team is in the middle of moving dozens of application servers off aging Windows boxes and onto Linux. This lesson is the foundation that move rests on.

## What you'll learn

- What the Linux kernel actually is, and how it's different from a full Linux operating system
- The GNU/Linux lineage, and why Linux is free and open source at any scale
- Two commands that tell you exactly what kernel and distribution a server is running
- Why most of the modern DevOps toolchain — cloud servers, containers, automation — assumes Linux underneath it

## The kernel is not the operating system

The **kernel** is the core program that talks directly to the hardware: it schedules which process gets the CPU next, manages memory, and controls access to disks and network cards. Linus Torvalds released the first version of the Linux kernel in 1991 as a hobby project, and it's been developed collaboratively ever since — thousands of contributors from companies like Intel, Red Hat, Google, and Microsoft now submit changes to it.

A kernel by itself doesn't give you a shell to type commands into, a package manager to install software, or any of the utilities you'd actually sit down and use. That's the job of a **distribution** (or "distro"): a company or community takes the Linux kernel and bundles it with a set of userland tools, a package manager, default configuration, and often a support model. Ubuntu, Red Hat Enterprise Linux, and Debian are all different distributions wrapped around the same underlying kernel family.

## Open source and the GNU/Linux lineage

Most of the command-line tools you'll use day to day — `ls`, `cp`, `grep`, `bash` itself — don't actually come from the Linux kernel project. They come from the **GNU Project**, started by Richard Stallman in 1983 to build a complete, freely licensed Unix-like toolset. When Torvalds' kernel was paired with GNU's existing userland tools in the early 1990s, the combination became what most people just call "Linux" (purists call it "GNU/Linux").

Both the kernel and most GNU tools are released under the **GPL (GNU General Public License)**, an open-source license that guarantees the source code stays free to read, modify, and redistribute. In practice, this is why a company like Northbridge Retail can run Linux on 200 servers without paying a single license fee — a decisive factor compared to per-core Windows Server licensing at that scale.

## Identifying what you're running

Two commands answer "what exactly is this machine" in seconds. First, the kernel version:

```
$ uname -a
Linux web03 5.15.0-91-generic #101-Ubuntu SMP Tue Nov 14 13:30:08 UTC 2023 x86_64 x86_64 x86_64 GNU/Linux
```

That tells you the hostname (`web03`), the kernel version (`5.15.0-91-generic`), and the CPU architecture (`x86_64`). Next, the distribution itself:

```
$ cat /etc/os-release
PRETTY_NAME="Ubuntu 22.04.3 LTS"
NAME="Ubuntu"
VERSION_ID="22.04"
VERSION="22.04.3 LTS (Jammy Jellyfish)"
VERSION_CODENAME=jammy
ID=ubuntu
ID_LIKE=debian
```

`/etc/os-release` is a plain text file maintained by nearly every modern distribution, so `cat`-ing it is the fastest, most portable way to confirm what you're actually logged into before you run a distro-specific command.

## Why DevOps runs on Linux

Four reasons Linux is the default assumption behind almost every DevOps tool:

- **The cloud runs on it.** The large majority of virtual machines running on AWS, Azure, and Google Cloud are Linux instances, because it's free to license and efficient at scale.
- **Containers are a Linux feature.** Docker containers work by using two Linux kernel features — namespaces (process/network isolation) and cgroups (resource limits) — directly. A container doesn't bundle its own kernel; it borrows the host's. That's why "containers" were a Linux-native idea years before Windows containers existed.
- **Automation tooling assumes a Linux shell.** Tools like Ansible connect over SSH and run shell commands; Terraform provisions Linux VMs as a first-class target; Kubernetes nodes are, in the overwhelming majority of real clusters, Linux.
- **Everything is a text file.** Linux configuration lives in plain text files under predictable paths, which is exactly what makes it scriptable — a theme you'll see in every remaining lesson of this course.

## Key terms

- **Kernel** — the core program that manages hardware, memory, and processes; the one piece every Linux distribution shares
- **Distribution (distro)** — a complete, installable operating system built around the Linux kernel plus userland tools and a package manager
- **GNU Project** — the free-software project that supplies most core command-line utilities paired with the Linux kernel
- **GPL** — the open-source license under which the kernel and most GNU tools are released, guaranteeing the source stays free to use and modify
- **`uname -a`** — prints kernel version and architecture
- **`/etc/os-release`** — the standard file that identifies which distribution and version you're running
