# TCP vs. UDP

Once a device has an IP address, it needs a way to actually package and move data to another device. That job belongs to the transport layer, and almost everything on the internet uses one of two protocols to do it: TCP or UDP. They solve the same basic problem — getting bytes from one place to another — in two deliberately different ways, and picking the right one is a real design decision, not a formality.

## What you'll learn

- What a transport-layer protocol actually does, and why there are two major ones
- How TCP guarantees delivery and ordering through its three-way handshake and acknowledgments
- Why UDP skips all of that overhead, and what it gains by doing so
- How to decide which protocol fits a given situation, using real Northbridge Retail examples

## What the transport layer actually does

IP is only responsible for addressing and routing a packet toward a destination machine — it has no idea what's inside the packet or whether it ever arrives correctly. The transport layer, sitting right above IP, is what actually manages the conversation between two applications: breaking data into segments, and in TCP's case, keeping track of what has arrived, what hasn't, and what order it belongs in.

## TCP: reliable, ordered, and connection-based

When a shopper's browser loads northbridgeretail.com, it uses TCP. Before any page data moves, the browser and the web server perform a **three-way handshake** — SYN, SYN-ACK, ACK — to establish a connection and agree on starting sequence numbers. From there, every segment is numbered, and the receiving side sends back acknowledgments confirming what it got. If a segment goes missing, TCP notices and retransmits it, and it reassembles everything in the correct order before handing it to the browser. That reliability is exactly why checkout pages, account logins, and anything involving money run on TCP: a dropped or scrambled packet during checkout isn't an acceptable loss, it's a lost order.

## UDP: fast, simple, and connectionless

UDP throws out nearly all of that machinery. There's no handshake, no acknowledgment, no retransmission, and no guaranteed ordering — a UDP packet is sent and the sender moves on, trusting nothing about whether it arrived. That sounds worse, and for a checkout flow it would be. But for Northbridge Retail's live warehouse dashboard, which pushes a fresh inventory-count update to screens on the floor every second, losing one single update out of sixty per minute doesn't matter — the next one is seconds away, and waiting for TCP's handshake and retransmission logic on every update would add far more delay than it's worth. DNS lookups, live video, and voice calls are built on UDP for the same reason: speed matters more than guaranteeing every single packet.

## Choosing between them

The decision comes down to one question: is a dropped or out-of-order packet something the application can shrug off, or something it must prevent at any cost? File transfers, web pages, email, and anything involving a database write need TCP's guarantees. Real-time feeds, status broadcasts, and most DNS traffic are better served by UDP's speed, because the data is either time-sensitive enough that a late retransmit is useless, or frequent enough that an occasional miss doesn't matter.

## Key terms

| Term | Meaning |
|---|---|
| TCP | Transmission Control Protocol — connection-based, reliable, ordered delivery |
| UDP | User Datagram Protocol — connectionless, fast, no delivery guarantee |
| Three-way handshake | SYN, SYN-ACK, ACK — how a TCP connection is established before data flows |
| Acknowledgment (ACK) | A TCP message confirming a segment was received, used to detect and retransmit lost data |
