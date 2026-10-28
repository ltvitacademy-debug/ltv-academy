# Lesson 20 — Virtual Machines: CPU, Memory & Storage Virtualization

**Chapter 5 · Virtualization Fundamentals · Lesson 20 of 32**

## What you'll learn

- How a hypervisor actually shares physical CPU cores between multiple VMs
- What hardware-assisted virtualization (Intel VT-x / AMD-V) is and why it exists
- How memory virtualization lets several VMs share one pool of physical RAM
- What a virtual disk (VMDK, VHD/VHDX) actually is on the host filesystem

## CPU virtualization: scheduling, not magic

Every VM is assigned one or more **virtual CPUs (vCPUs)**. A vCPU is not a dedicated physical
core — it's a slice of time on a real physical core that the hypervisor's scheduler hands out,
the same way an operating system schedules processes on a single-core machine. If a host has 8
physical cores and is running 20 VMs with 2 vCPUs each, the hypervisor is constantly switching
which vCPU gets to execute on which physical core, for a few milliseconds at a time.

```
Physical Core 0:  [VM1-vCPU0][VM3-vCPU1][VM1-vCPU0][VM2-vCPU0] ...
Physical Core 1:  [VM2-vCPU1][VM4-vCPU0][VM3-vCPU0][VM1-vCPU1] ...
```

This only works smoothly because of **hardware-assisted virtualization** — Intel VT-x and AMD-V
are CPU extensions built into virtually every modern server and desktop processor specifically
for this job. Before these extensions existed, a hypervisor had to software-emulate privileged
CPU instructions (called binary translation), which was slow. VT-x/AMD-V let the hypervisor trap
and handle those privileged instructions directly in hardware, which is what makes a modern VM
run at close to the speed of the physical machine instead of a noticeably slower emulation.

## Memory virtualization

Just like CPU, a VM's RAM is virtual: the hypervisor maps the guest's view of memory (what the
guest OS thinks is physical RAM) onto the host's actual physical RAM, using hardware features
like Intel's Extended Page Tables (EPT) or AMD's Rapid Virtualization Indexing (RVI) to do that
translation efficiently. Hypervisors can also **overcommit** memory — assigning VMs more total
virtual RAM than the host physically has — because not every VM uses its full allocation at the
same instant, and techniques like memory ballooning let the hypervisor reclaim unused RAM from
one VM and hand it to another that actually needs it.

## Storage virtualization: the virtual disk

A VM's hard drive isn't a separate physical disk — it's a **virtual disk**, which is really just
a single large file sitting on the host's own filesystem. VMware uses the **VMDK** format;
Microsoft Hyper-V uses **VHD** or the newer **VHDX** format. From inside the guest OS, it looks
and behaves exactly like a real hard drive with a drive letter or mount point.

```
Host filesystem:   C:\VMs\Server1.vhdx   (240 GB file on the host's disk)
Guest sees:        C:\  (a 200 GB drive, formatted NTFS)
```

Virtual disks can be **thick-provisioned** (the full size is reserved on the host disk up
front) or **thin-provisioned** (the file only grows as the guest actually writes data), which
is why thin provisioning is the default choice when you want to pack more VMs onto limited
physical storage, at the cost of needing to monitor that the host disk doesn't run out of real
space before every thin-provisioned VM's virtual disk fills up.

## Key terms

| Term | Meaning |
|---|---|
| vCPU | A virtual CPU assigned to a VM — a time-sliced share of a physical core, not a dedicated one |
| Hardware-assisted virtualization | CPU extensions (Intel VT-x, AMD-V) that let the hypervisor handle privileged instructions in hardware instead of slow software emulation |
| Memory overcommit | Assigning VMs more total virtual RAM than the host physically has, relying on not all of it being used at once |
| Virtual disk (VMDK/VHDX) | A single file on the host filesystem that the guest OS sees and uses as its own hard drive |

## Check yourself

Why does hardware-assisted virtualization (VT-x/AMD-V) make a modern VM run close to native
speed, when older software-only virtualization was noticeably slower?
