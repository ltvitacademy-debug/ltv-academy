# Lesson 3 — Network Topologies and Physical Media

**Chapter 1 · Networking Fundamentals I · Lesson 3 of 32**

## What you'll learn

- The common network topologies: bus, star, ring, mesh, and hybrid
- Why star topology dominates modern wired networks
- The physical media that carry network traffic: twisted-pair copper, fiber, and wireless
- Real-world cabling standards you'll encounter on the job

## Topology: the shape of the network

A network topology is the arrangement of devices and the connections between them —
either physically (how cables actually run) or logically (how traffic actually flows,
which can differ from the physical layout).

**Bus topology** connects every device to a single shared cable, with traffic traveling
the full length of that cable. It's cheap but has a serious weakness: a single break
anywhere on the cable can take the entire network down, and it's essentially obsolete in
modern wired networks.

**Ring topology** connects each device to exactly two neighbors, forming a closed loop,
with traffic traveling around the ring until it reaches its destination. Like bus, a
single break can disrupt the whole ring unless the technology includes a redundant
counter-rotating ring (as some fiber ring designs do).

**Star topology** connects every device individually to a central point — a switch. This
is overwhelmingly what real wired networks look like today. Its key advantage: one
cable failing only takes down the one device on that cable, not the whole network. Its
one real weakness is that the central switch is a single point of failure, which is why
production networks add redundant switches and uplinks.

**Mesh topology** connects devices to multiple other devices directly, with a full mesh
connecting every device to every other device. This provides the most redundancy but
doesn't scale cabling-wise — a full mesh of just 10 devices needs 45 individual
connections. Partial mesh (each device connects to several, not all, others) is common
in wide-area network backbones and some wireless mesh systems.

**Hybrid topology** combines more than one shape — most real enterprise networks are
hybrids: a star topology at the access layer (user devices to switches), connecting up
through a partial mesh at the core layer (switches and routers connecting to each
other for redundancy).

## Physical media: what actually carries the signal

**Twisted-pair copper** is the dominant wired medium for connecting end devices.
Category ratings matter: Cat5e supports up to 1 Gbps, Cat6 supports 1 Gbps reliably and
10 Gbps over shorter distances, and Cat6a reliably supports 10 Gbps over the full 100-meter
run length. The "twisting" in twisted-pair cancels out electromagnetic interference
between the pairs — a key reason it works as well as it does for its cost.

**Fiber optic cable** carries data as pulses of light instead of electrical signals,
which means no electromagnetic interference and vastly longer usable distances —
kilometers instead of the roughly 100-meter limit of copper. Single-mode fiber (one
light path) handles the longest distances; multimode fiber (multiple light paths, using
cheaper optics) is common for shorter runs inside a building or data center.

**Wireless (Wi-Fi)** uses radio waves instead of a physical cable at all. It trades the
reliability and bandwidth ceiling of wired media for mobility — covered in depth in
Lesson 12 alongside Wi-Fi security basics.

## Key terms

| Term | Meaning |
|---|---|
| Star topology | Every device connects individually to a central switch — the dominant modern wired topology |
| Single point of failure | A component whose failure takes down the whole system — the central switch in a star topology |
| Twisted-pair copper | The dominant wired medium for end devices; twisting cancels electromagnetic interference |
| Single-mode / multimode fiber | Fiber variants for long-distance (single-mode) vs. shorter, cheaper runs (multimode) |

## Check yourself

Why does a single cable failure in a star topology only affect one device, while the
same failure in a bus topology can take down the entire network?
