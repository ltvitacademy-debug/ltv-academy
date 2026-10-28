# Lesson 9 — TCP vs. UDP and the Three-Way Handshake

**Chapter 3 · Ports, Protocols & Network Services · Lesson 9 of 32**

## What you'll learn

- What actually happens, packet by packet, when two hosts open a TCP connection
- Why TCP can guarantee delivery and correct ordering, and the mechanism that makes that guarantee possible
- Why UDP deliberately throws that guarantee away, and why that's a feature rather than a flaw
- Which real protocols choose TCP and which choose UDP, and why each choice makes sense for that traffic

## TCP: reliable, but it costs a handshake

Transmission Control Protocol (TCP) is **connection-oriented** — before either side sends a
single byte of real data, both hosts perform a three-way handshake to agree the connection is
open, both ends are listening, and both ends know the other's starting sequence number. That
handshake is overhead, but it's what lets TCP make a promise UDP never makes: every byte you
send will arrive, and it will arrive in the order you sent it, or the connection will tell you
it failed.

## The three-way handshake

```
Client                                Server
  |------------- SYN (seq=100) -------------->|
  |<----- SYN-ACK (seq=300, ack=101) ---------|
  |------------- ACK (ack=301) --------------->|
  |            connection established          |
```

1. **SYN** — the client sends a segment with the SYN flag set and a starting sequence number,
   essentially saying "I'd like to talk, and here's where my byte count starts."
2. **SYN-ACK** — the server replies with its own SYN (its own starting sequence number) and an
   ACK acknowledging the client's SYN, saying "I hear you, I'm listening, and here's where my
   byte count starts."
3. **ACK** — the client acknowledges the server's SYN. Both sides now agree the connection is
   open, and real application data can start flowing.

## How TCP keeps its promise

Every byte TCP sends is tracked by a sequence number. The receiver acknowledges what it got, and
if an acknowledgment doesn't arrive in time, TCP assumes the segment was lost and retransmits it.
If segments arrive out of order — which happens constantly on a real network, since packets can
take different paths — TCP buffers them and reassembles the original order before handing data
to the application. None of this is visible to the application; a browser just sees a clean,
ordered stream of bytes.

## UDP: fast, and honest about what it skips

User Datagram Protocol (UDP) is **connectionless** — no handshake, no sequence numbers, no
retransmission. A host just sends a datagram and moves on; this is often called **fire-and-forget**.
If the packet is lost, UDP itself does nothing about it — some other layer (the application, or
nothing at all) decides whether that matters. The payoff is lower overhead and lower latency,
since there's no handshake delay and no waiting on acknowledgments.

## Picking the right tool: real use cases

TCP is used anywhere a missing or reordered byte would corrupt the result: HTTP/HTTPS web pages,
SMTP email delivery, and FTP file transfers all run over TCP, because a web page with a missing
chunk or a file with a dropped block is simply broken. UDP is used where speed matters more than
perfect delivery, or where the application handles its own retries: a **DNS query** is a single
small UDP packet on port 53 — if it's lost, the resolver just asks again a moment later, which is
cheaper than a full TCP handshake for one short question. Streaming video and VoIP calls also run
over UDP, because a dropped packet becomes a barely noticeable glitch, while waiting for TCP to
retransmit a lost audio packet would create a worse delay than just dropping it and moving on.

## Key terms

| Term | Meaning |
|---|---|
| TCP (Transmission Control Protocol) | Connection-oriented, reliable, ordered delivery via a handshake and acknowledgments |
| UDP (User Datagram Protocol) | Connectionless, "fire-and-forget" delivery with no guarantee and no handshake |
| Three-way handshake | SYN, SYN-ACK, ACK — the exchange that opens a TCP connection before data flows |
| Sequence number | A running byte count TCP uses to detect loss and reorder data correctly |

## Check yourself

A VoIP call drops a handful of packets mid-conversation but keeps going without re-sending them.
Why does VoIP use UDP instead of TCP, even though UDP can lose packets outright?
