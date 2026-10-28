# Lesson 9 — NetFlow and Flow-Based Monitoring

**Chapter 3 · Network Traffic Analysis · Lesson 1 of 4**

## What you'll learn

- What a **flow record** actually contains — and what it deliberately leaves out
- Why NetFlow records metadata about a traffic flow instead of the traffic itself
- How that tradeoff makes flow monitoring cheap enough to run across an entire network, all the time
- What you give up by only ever looking at flow data

## Packet capture doesn't scale to a whole network

Earlier in this path, you opened Wireshark and inspected traffic packet by packet — every header, every byte of payload, for every frame crossing one interface. That level of detail is exactly what makes a packet capture tool so useful for investigating one host or one suspicious conversation. It's also exactly why you can't run it everywhere, all the time: capturing and storing full packets from every link in a real network, continuously, would produce an unmanageable volume of data in hours, let alone the months of history a SOC actually needs for investigations and baselining.

**NetFlow** solves a different problem. Instead of recording everything about every packet, it records a small amount of metadata about every traffic **flow** — a sequence of packets sharing the same source/destination IP, source/destination port, and protocol, moving in one direction between two endpoints.

## What a flow record actually contains

NetFlow originated at Cisco in the mid-1990s and has since become the basis for an open standard, **IPFIX** (IP Flow Information Export), supported by networking equipment from many vendors. A flow record is built around what's commonly called the **5-tuple** — source IP, destination IP, source port, destination port, and protocol — plus the facts a network device can observe about that flow without ever opening the payload: how many packets passed, how many total bytes, and how long the flow lasted.

**Concrete example:** a workstation downloads a file from an internal file server. The resulting flow record might read: source `10.0.4.22`, destination `10.0.1.15:445`, protocol TCP, duration 41 seconds, 3,812 packets, 5.1 MB transferred. That's the entire record — no filename, no file contents, nothing from inside the SMB payload at all.

## Why metadata scales where full capture can't

A flow record is a single compact line of data. A router or switch can export thousands of them per second without meaningfully affecting its own performance, and a flow collector downstream can store months of that metadata in a fraction of the space full packet capture would need for a single busy day. That cost difference is the entire reason flow monitoring exists: it gives a SOC visibility into every conversation happening across an entire network — not just the one link a packet-capture tool happens to be watching — cheaply enough to retain for the long term.

## What you give up for that scale

The tradeoff is direct: NetFlow can tell you *that* 5.1 MB moved from one host to another, but nothing about *what* was inside it. Two completely different conversations — a legitimate backup job and a user quietly exfiltrating a sensitive file — can produce nearly identical flow records if the volume and timing happen to match. Flow data is where broad, network-wide visibility starts; seeing inside a flagged conversation's payload is a job for the packet-level tools covered next.

## Key terms

| Term | Meaning |
|---|---|
| NetFlow | Cisco-originated protocol/format for exporting metadata about network traffic flows |
| Flow | A sequence of packets sharing source/destination IP, source/destination port, and protocol |
| 5-tuple | Source IP, destination IP, source port, destination port, protocol — the fields that define a flow |
| IPFIX | The open standard descended from NetFlow, supported across multiple vendors |

## Check yourself

A flow record shows 50 MB transferred from an internal host to an external IP over 90 seconds. What can you conclude from that record alone, and what would you need to add to find out what was actually inside that traffic?
