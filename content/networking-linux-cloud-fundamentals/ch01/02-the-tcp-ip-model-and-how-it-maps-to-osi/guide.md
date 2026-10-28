# Lesson 2 — The TCP/IP Model & How It Maps to OSI

**Chapter 1 · Networking Fundamentals · Lesson 2 of 32**

## What you'll learn

- Why the real internet runs on a four-layer model, not the seven-layer OSI model
- How the TCP/IP model's four layers map onto OSI's seven
- The difference between TCP and UDP, and when each one is the right choice
- Why you'll hear both models used interchangeably in the field

## OSI is the vocabulary; TCP/IP is what actually runs

The OSI model you learned last lesson is a *reference* model — nobody ships a device with
exactly seven distinct protocol layers running on it. The protocol suite that actually powers
the internet, and nearly every private network, is **TCP/IP**, named after its two most
important protocols: Transmission Control Protocol and Internet Protocol. TCP/IP groups the same
ideas into four layers instead of seven.

```
TCP/IP Layer           Roughly equals OSI Layers
--------------------   -------------------------
Application             7, 6, 5 (Application, Presentation, Session)
Transport               4 (Transport)
Internet                3 (Network)
Network Access          2, 1 (Data Link, Physical)
```

TCP/IP's Application layer collapses OSI's top three layers into one, because in practice the
protocol that formats, manages sessions for, and presents data to an application (HTTP, for
example) is usually the same protocol doing all three jobs at once — there's rarely a clean,
separate "session management protocol" running underneath HTTP in real deployments.

## TCP vs. UDP: the two transport-layer workhorses

At the Transport layer, almost everything you'll touch uses one of two protocols, and picking
the right one is a real design decision, not a formality.

| | TCP | UDP |
|---|---|---|
| Connection | Connection-oriented — a handshake happens first | Connectionless — just sends |
| Reliability | Guarantees delivery and order, retransmits lost data | No guarantee; lost data stays lost |
| Speed | Slower, due to handshakes and acknowledgments | Faster, minimal overhead |
| Typical use | Web browsing (HTTP/HTTPS), email, file transfer | DNS lookups, video streaming, VoIP, online gaming |

TCP's three-way handshake — SYN, SYN-ACK, ACK — establishes a connection before any real data
moves, and that connection stays open and tracked for the life of the conversation. UDP skips
all of that: it sends a datagram and moves on, which is exactly why it's the right choice for
things like a live video call, where a dropped frame that arrives late is worse than one that's
simply skipped.

```
TCP three-way handshake:
Client  --- SYN ------->  Server
Client  <-- SYN-ACK ----  Server
Client  --- ACK -------->  Server
         (connection established, data now flows)
```

## Why both models still coexist in real conversations

You'll hear networking professionals casually mix OSI and TCP/IP language in the same sentence —
"that's a Layer 3 routing issue, but the Application-layer protocol itself looks fine." OSI's
seven-layer granularity remains the more precise troubleshooting vocabulary (it's useful to be
able to say "Layer 2" distinctly from "Layer 1"), while TCP/IP's four-layer model is closer to
how the actual software stack on a real device is organized. Knowing both, and knowing how they
map onto each other, is what lets you follow either conversation.

## Key terms

| Term | Meaning |
|---|---|
| TCP/IP model | The four-layer protocol suite (Application, Transport, Internet, Network Access) that actually powers the internet |
| TCP | Connection-oriented transport protocol that guarantees ordered, reliable delivery |
| UDP | Connectionless transport protocol with no delivery guarantee, used where speed matters more than reliability |
| Three-way handshake | TCP's SYN / SYN-ACK / ACK exchange that establishes a connection before data flows |

## Check yourself

A video call drops a few frames but keeps playing smoothly, while a file download that loses a
packet pauses and resends it. Which transport protocol is each one almost certainly using, and
why does that choice make sense for what each application actually needs?
