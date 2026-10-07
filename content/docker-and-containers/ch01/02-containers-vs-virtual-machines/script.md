## Segment 1 (title)

Northbridge Retail's infrastructure team already runs virtual machines for several internal systems, so the first question about containers is always the same: aren't these just lightweight VMs? Let's look at the actual architecture difference.

## Segment 2 (screenshot)

A virtual machine runs on a hypervisor, which emulates a complete computer. Each VM gets its own full guest operating system — its own kernel, its own system services — even though the hardware underneath is already running a host OS. That gives very strong isolation, but it's heavy: booting a full OS takes real time, and consumes memory and disk before the application inside ever does any work.

## Segment 3 (screenshot)

A container takes a different approach. Rather than virtualizing an entire computer, it virtualizes at the operating-system level: every container on a host shares that one host kernel, and each container just gets an isolated view of processes, the filesystem, and networking layered on top. No guest kernel means no lengthy boot.

## Segment 4 (steps)

That one architectural difference cascades into everything else. A virtual machine typically takes minutes to start. A container starts in well under a second. A host can usually only run a handful of VMs at once, but can often run dozens, even hundreds, of containers side by side, because each one only costs what its application actually needs.

## Segment 5 (steps)

Containers didn't make VMs obsolete, though — they solve different problems, and production systems often use both together. Northbridge runs its container hosts on top of VMs in the cloud: the VM gives a strong security boundary around the whole machine, and containers inside it give fast, efficient packaging for the catalog and checkout services.

## Segment 6 (outro)

Next, in Lesson Three, we'll open up that shared-kernel idea and look at exactly how Linux makes it work: namespaces and cgroups.
