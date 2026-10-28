# Lesson 1 — Stateful vs. Stateless Firewalls in Depth

**Chapter 1 · Firewall Architecture & Network Segmentation · Lesson 1 of 4**

## What you'll learn

- What a **state table** is, and how a stateful firewall uses it to tell a legitimate reply from an unsolicited packet
- Why a stateless firewall has to evaluate every single packet from scratch, with no memory of what came before
- The real tradeoff between the two: smarter decisions versus lower resource cost
- Why nearly every firewall you'll touch on the job today is stateful, and where stateless filtering still earns its place

## Stateful firewalls: tracking the conversation

A **stateful firewall** doesn't just look at a packet in isolation — it tracks the **state** of every active network connection passing through it in a **state table**: a running record of which connections are currently open, who opened them, and what's expected to come back. When a workstation on the internal network opens a connection out to a web server, the firewall logs that connection in its state table. When the reply packets come back from that web server, the firewall checks them against the table, recognizes them as part of a connection the internal host actually initiated, and lets them through automatically — without needing a separate rule written for the reply traffic at all.

That's the key behavioral shift from basic packet filtering: a stateful firewall reasons about **connections**, not just individual packets. A single rule allowing outbound web traffic implicitly allows the matching inbound replies, because the firewall remembers the connection exists.

**Concrete example:** an employee's laptop opens a connection to `203.0.113.10` on port 443 (HTTPS). The stateful firewall adds that connection to its state table. Thirty seconds later, a reply packet arrives from `203.0.113.10:443` destined for the laptop. The firewall checks the state table, finds a matching established connection, and passes the packet through — no inbound rule needed. If an unrelated packet arrived claiming to be from a totally different address on port 443, with no matching entry in the state table, the firewall would drop it, because nothing on the inside ever asked for it.

## Stateless firewalls: every packet judged alone

A **stateless firewall** (sometimes called a packet-filtering firewall) keeps no memory of past traffic at all. Every packet is evaluated independently against a static set of rules — source address, destination address, port, protocol — with no concept of "this is part of a conversation I already approved." To let reply traffic back in, an administrator has to write an explicit rule permitting it, because the firewall has no other way of knowing that traffic is expected.

This makes stateless rule sets both more tedious to write correctly and more prone to being either too permissive (opening a wide port range just to let replies through) or too restrictive (blocking legitimate replies because the rule writer didn't anticipate every return path).

## The real tradeoff: smarter vs. cheaper

Tracking a state table isn't free — a stateful firewall has to maintain an entry in memory for every active connection, inspect packets against that table, and age out entries once a connection closes. On a device handling a very large number of simultaneous connections, that bookkeeping consumes real CPU and memory. A stateless firewall skips all of that: each packet is judged by itself, in isolation, which makes stateless filtering **cheaper and faster per packet**, at the cost of being far less intelligent about what it's actually letting through.

That's the honest tradeoff: **stateful = smarter, but more resource-intensive. Stateless = cheap and fast, but dumb.** In practice, most modern firewalls — including the perimeter and next-generation firewalls covered later in this chapter — are stateful by default, because the security benefit of understanding connections outweighs the resource cost on nearly all modern hardware. Stateless filtering still shows up on resource-constrained devices, as a first, fast filtering pass before traffic reaches a stateful device, or on router access control lists doing simple traffic shaping where connection awareness isn't the point.

## Key terms

| Term | Meaning |
|---|---|
| Stateful firewall | Tracks active connections in a state table; automatically permits reply traffic that matches an established connection |
| State table | The stateful firewall's running record of currently open/tracked connections |
| Stateless firewall | Evaluates every packet independently against static rules, with no memory of prior traffic |
| Packet filtering | Rule matching based on fields like source/destination address, port, and protocol — the basis of stateless filtering |

## Check yourself

A reply packet arrives at a stateful firewall from an address no internal host ever contacted. Why does the firewall drop it automatically, and what would a stateless firewall need instead to make the same decision correctly?
