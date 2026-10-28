# Lesson 2 — The TCP/IP Model and How It Maps to OSI

**Chapter 1 · Networking Fundamentals I · Lesson 2 of 32**

## What you'll learn

- The four layers of the TCP/IP model — the model real networks actually run
- How TCP/IP's four layers map onto the OSI model's seven
- Why "the internet runs on TCP/IP, not OSI" and what that means in practice
- How to translate between the two vocabularies when reading documentation or job postings

## The model that actually runs the internet

Lesson 1 covered the OSI model — a seven-layer conceptual framework used almost entirely
for its shared vocabulary. The TCP/IP model (also called the Internet Protocol Suite) is
different: it's the model real networks, including the entire public internet, actually
implement. It has four layers instead of seven, and it predates OSI as a formal
standard — OSI was published later as an attempt to standardize something close to what
TCP/IP had already proven worked.

## The four TCP/IP layers

```
Application   HTTP, DNS, SMTP, FTP — the protocols user-facing programs speak
Transport     TCP, UDP — end-to-end delivery between applications, via ports
Internet      IP, ICMP — logical addressing and routing between networks
Network Access Ethernet, Wi-Fi — physical transmission and local addressing
```

## Mapping TCP/IP onto OSI

The two models don't split cleanly, but the mapping used across the industry is:

```
OSI Layer                    TCP/IP Layer
Layer 7 — Application   \
Layer 6 — Presentation   >  Application
Layer 5 — Session       /
Layer 4 — Transport     -->  Transport
Layer 3 — Network       -->  Internet
Layer 2 — Data Link     \
Layer 1 — Physical       >  Network Access
```

TCP/IP's single Application layer absorbs what OSI splits into three (Application,
Presentation, Session) — in practice, a single real-world protocol like HTTP handles
format negotiation and session management itself rather than relying on separate layers
for it. TCP/IP's Network Access layer similarly absorbs OSI's Data Link and Physical —
Ethernet, as a real technology, handles both framing and the physical transmission
together.

## Why both vocabularies still show up

You'll hear both models used interchangeably in real jobs, which is exactly why knowing
the mapping matters. A job posting or a vendor's documentation might say "Layer 3
switch" (OSI vocabulary) one sentence and "the Internet layer" (TCP/IP vocabulary) the
next, and both are describing the same thing: routing based on IP address. A firewall
rule described as operating "at Layer 4" means it filters based on TCP/UDP ports — the
same thing as saying it operates at the TCP/IP Transport layer.

## Encapsulation: how data actually moves down the stack

As data moves from an application down to the wire, each layer wraps ("encapsulates")
the data from the layer above it in its own header:

```
Application data
  -> wrapped in a TCP segment (adds port numbers)
    -> wrapped in an IP packet (adds source/destination IP)
      -> wrapped in an Ethernet frame (adds source/destination MAC)
        -> transmitted as bits
```

At the receiving end, this process runs in reverse — each layer strips its own header
and passes what's left up to the layer above. This is why a packet capture tool like
Wireshark (covered in Lesson 30) shows you nested headers: Ethernet frame, containing an
IP packet, containing a TCP segment, containing the actual application data.

## Key terms

| Term | Meaning |
|---|---|
| TCP/IP model | The four-layer model (Application, Transport, Internet, Network Access) that real networks, including the internet, actually implement |
| Internet layer | TCP/IP's layer for logical addressing and routing — equivalent to OSI's Network layer |
| Encapsulation | Each layer wrapping the data above it in its own header as it moves down the stack toward the wire |
| De-encapsulation | The reverse process at the receiving end — each layer stripping its own header before passing data up |

## Check yourself

A colleague says a new firewall rule "operates at Layer 4." In TCP/IP terms, which layer
is that, and what kind of information does the rule filter on?
