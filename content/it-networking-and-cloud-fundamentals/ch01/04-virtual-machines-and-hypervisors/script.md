# Script — Virtual Machines & Hypervisors

## Segment 1 (title)

Every lesson so far has assumed one operating system per machine. In practice, nearly every server you'll touch, and the entire cloud underneath the marketing language, runs multiple operating systems on one piece of hardware at once. This lesson introduces how.

## Segment 2 (steps)

A virtual machine is software that emulates a complete computer — its own virtual CPU, RAM, storage, and network interface — convincingly enough that a full, separate operating system can run inside it, unaware it isn't on real hardware. The hypervisor is the layer that creates those VMs, hands out slices of the real hardware to each one, and keeps them isolated.

## Segment 3 (steps)

Hypervisors come in two shapes. Type 1, bare metal, runs directly on the hardware with no host operating system underneath — that's the standard in data centers and the cloud. Type 2, hosted, runs as an ordinary application on top of a regular OS, which is common on developer laptops for testing.

## Segment 4 (code)

Virtualization exists to stop paying for idle hardware. If Northbridge Retail once ran its inventory system, reporting system, and internal wiki on three separate physical servers, each mostly idle, one virtualized host can run all three as isolated VMs instead, each sized to what it actually needs.

## Segment 5 (outro)

That's exactly what public cloud providers scaled up: massive data centers running hypervisors, renting out VMs on demand. That closes out chapter one — hardware, operating systems, processes, client-server roles, and virtualization, all working together. Onward to networking next.
