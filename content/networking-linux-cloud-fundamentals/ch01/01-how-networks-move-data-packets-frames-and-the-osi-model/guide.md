# Lesson 1 — How Networks Move Data: Packets, Frames & the OSI Model

**Chapter 1 · Networking Fundamentals · Lesson 1 of 32**

## What you'll learn

- Why every network conversation gets broken into small pieces instead of sent as one stream
- The difference between a frame, a packet, and a segment
- The OSI model's seven layers, and what job each one actually does
- Why "it's a Layer 3 problem" is a real, useful sentence once you know this model

## Why data gets broken into pieces

When your laptop loads a web page, it doesn't send the whole page as one giant transmission.
It breaks the request and response into small, numbered pieces, sends each one across the
network — possibly over different physical paths — and reassembles them in order on the other
end. This matters for two reasons: a shared network link can only carry one thing at a time, so
small pieces let many conversations interleave fairly, and if one piece gets lost or corrupted,
only that piece needs to be resent, not the entire page.

Each piece picks up a different name depending on which layer of the network is handling it:

```
Data (the actual content, e.g. HTML)
  -> Segment   (Layer 4 — Transport adds port numbers, sequencing)
  -> Packet    (Layer 3 — Network adds source/destination IP addresses)
  -> Frame     (Layer 2 — Data Link adds source/destination MAC addresses)
  -> Bits      (Layer 1 — Physical: electrical signals, light pulses, or radio waves)
```

Each layer wraps the one above it in its own header (and sometimes a trailer) — a process
called **encapsulation**. The receiving device unwraps those headers one layer at a time, in
reverse order, called **de-encapsulation**.

## The OSI model: seven layers, one job each

The OSI (Open Systems Interconnection) model is a reference model — not literal code running on
every device, but a shared vocabulary IT professionals use to describe where a problem lives and
which device is responsible for fixing it.

| # | Layer | Job | Real-world example |
|---|---|---|---|
| 7 | Application | The protocol the end-user application actually speaks | HTTP, DNS, SMTP |
| 6 | Presentation | Formats, encrypts, and compresses data | TLS encryption, character encoding |
| 5 | Session | Opens, manages, and closes a conversation between two hosts | Session tokens, API sessions |
| 4 | Transport | Breaks data into segments, adds port numbers, handles reliability | TCP, UDP |
| 3 | Network | Adds logical addressing (IP) and routes between networks | IP, routers |
| 2 | Data Link | Adds physical addressing (MAC) for the local network segment | Ethernet, switches |
| 1 | Physical | The actual electrical signal, light, or radio wave | Cables, Wi-Fi radios, fiber |

A mnemonic that sticks for most people, top to bottom: **A**ll **P**eople **S**eem **T**o **N**eed
**D**ata **P**rocessing.

## Why this model earns its place in daily troubleshooting

"It's a Layer 1 problem" means a literal physical cable or port issue — nothing above it can
possibly work until that's fixed. "It's a Layer 3 problem" usually means routing or IP addressing
is wrong, even though the physical link and the switch port are both fine. "It's a Layer 7
problem" means the network itself is fine and the application protocol is misbehaving.

This layered thinking is why a network engineer's first troubleshooting move is almost always
**bottom-up**: confirm the cable is plugged in and the link light is on (Layer 1) before chasing
an application error (Layer 7), because nothing above a broken lower layer can work no matter how
correct it is.

```
Troubleshooting order (bottom-up):
1. Physical    — Is the cable/radio link actually up?
2. Data Link   — Is the switch port forwarding frames?
3. Network     — Does the device have a valid, routable IP?
4. Transport   — Is the right port open and reachable?
7. Application — Only now does "the app is broken" mean anything
```

## Key terms

| Term | Meaning |
|---|---|
| Encapsulation | Each layer wrapping the layer above it in its own header as data moves down the stack |
| De-encapsulation | The receiving device unwrapping those headers in reverse order |
| Frame | Layer 2 unit — data plus source/destination MAC addresses |
| Packet | Layer 3 unit — data plus source/destination IP addresses |
| Segment | Layer 4 unit — data plus port numbers and transport-layer control info |
| OSI model | The seven-layer reference model used to describe where a networking job or problem lives |

## Check yourself

A user says "the internet is down." Before touching any application, what's the very first,
lowest-layer thing worth checking — and why does checking it first actually save time?
