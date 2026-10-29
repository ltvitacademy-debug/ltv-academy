# Lesson 11 — High-Speed Interconnects, and Why Network Topology Matters

**Chapter 3 · Distributed Training Infrastructure · Lesson 3 of 4**

## What you'll learn

- Why the AllReduce step from Lesson 10 turns distributed training
  into a networking problem, not just a compute problem
- The two different interconnects in play — NVLink inside a machine,
  InfiniBand/RDMA between machines — and why they exist separately
- Why network topology, not just raw link speed, decides how well
  a training cluster actually scales
- Why gradient synchronization becomes network-bound as GPU count
  grows, even on fast hardware

## NVLink: GPU-to-GPU inside one machine

A single server packed with 8 GPUs still needs those GPUs talking to
each other constantly — every AllReduce, every tensor-parallel layer
split, depends on it. The standard PCIe bus connecting components
inside a server tops out around 64GB/s, which is nowhere near enough
for the volume of gradient and activation traffic distributed training
generates.

**NVLink** is NVIDIA's answer: a direct, high-bandwidth link between
GPUs on the same host, bypassing the PCIe bus and the CPU entirely.
On modern systems, NVLink combined with an **NVSwitch** (which lets
every GPU in the server talk to every other GPU at full speed, not
just its physical neighbors) delivers bandwidth in the hundreds of
GB/s to nearly 1TB/s per GPU — more than an order of magnitude over
PCIe. This is exactly why tensor parallelism, which needs extremely
fast communication for every layer, is normally confined to GPUs
inside a single NVLink-connected server.

## InfiniBand and RDMA: GPU-to-GPU across machines

Once a job needs more GPUs than one server holds, traffic has to cross
the network between machines — and ordinary Ethernet with a standard
TCP/IP stack adds too much latency and CPU overhead for this workload.
Training clusters instead use **InfiniBand**, a high-bandwidth,
low-latency networking fabric, paired with **RDMA** (Remote Direct
Memory Access) — and specifically **GPUDirect RDMA**, which lets one
machine's GPU write data directly into another machine's GPU memory
without routing through either CPU or main system memory at all. That
removes a major source of latency and CPU overhead from every
cross-machine gradient exchange.

This two-tier structure — NVLink inside the box, InfiniBand/RDMA
between boxes — is why training cluster bandwidth is usually described
in two separate numbers, and why pipeline parallelism (which tolerates
coarser, less frequent communication) is the parallelism strategy most
often stretched across that slower, between-machine link.

## Topology: how the fabric is wired matters as much as its speed

Having fast links isn't enough if they're wired together badly. A
training cluster's network topology — how switches and nodes connect
— determines whether that bandwidth is actually usable at scale.
Two topology ideas matter most in practice:

- **Bisection bandwidth** — if you split the cluster in half, how much
  bandwidth exists between the two halves? A topology with low
  bisection bandwidth creates a bottleneck exactly where large
  collective operations like AllReduce need to move the most data.
- **Fat-tree / rail-optimized topologies** — the common designs used
  in GPU clusters specifically to avoid that bottleneck, adding enough
  switch capacity at every layer that bisection bandwidth stays high
  even as the cluster scales out.

A cluster can have top-of-the-line NICs on every node and still
underperform badly if the switching fabric between them is
oversubscribed — too many nodes sharing too little switch uplink
capacity.

## Why communication becomes the bottleneck, not compute

As a training job adds more GPUs, each GPU's share of the compute per
step shrinks — but the AllReduce step still has to move every
gradient across the fabric on every step. Past a certain cluster size,
the time spent synchronizing gradients can exceed the time spent
computing them, meaning faster GPUs stop helping until the network
problem is solved first. This is exactly why **NCCL** (NVIDIA's
collective communications library) implements AllReduce as a **ring**
or **tree**-structured algorithm rather than a naive "everyone send to
everyone" pattern — these algorithms are specifically designed to use
the available topology efficiently and keep communication from
dominating total training time.

## Key terms

| Term | Meaning |
|---|---|
| NVLink / NVSwitch | High-bandwidth direct GPU-to-GPU link within a single server, bypassing PCIe and the CPU |
| InfiniBand | High-bandwidth, low-latency network fabric used between machines in a training cluster |
| GPUDirect RDMA | Lets one machine's GPU write directly into another's GPU memory, skipping CPU and main memory |
| Bisection bandwidth | The bandwidth available between two halves of a cluster if it were split in two; a key measure of whether a topology will bottleneck at scale |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: why
does a training cluster need two separate high-speed interconnects
(NVLink inside a server, InfiniBand/RDMA between servers) instead of
just one fast network everywhere, and why can adding more GPUs
actually stop helping once communication, not compute, becomes the
bottleneck?
