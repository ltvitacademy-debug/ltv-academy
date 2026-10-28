# Lesson 30 — Packet Capture Basics: Reading Traffic with Wireshark

**Chapter 8 · Putting It Together: Lab & Capstone · Lesson 30 of 32**

## What you'll learn

- How to capture live traffic in Wireshark and read what you captured
- How the three panes — packet list, packet details, and bytes — show you one packet from three angles
- How to write a basic display filter to cut noise out of a busy capture
- What a normal TCP handshake looks like in a capture, versus what a scan or something suspicious looks like

## Capturing your first packets

**Wireshark** is the tool this course has referenced throughout — a free, open-source packet
analyzer that captures traffic passing through a network interface and lets you inspect every
packet in detail. In your isolated lab from the previous lesson, open Wireshark on your Kali VM,
select the lab's network interface, and click the shark-fin **Start** button. Generate some
traffic — browse to Metasploitable2's web page, or just let normal background chatter happen — and
Wireshark fills with rows almost immediately. Each row is one packet, captured the instant it
crossed that interface.

## Three panes, one packet

Click any single packet in the top **packet list** pane and the other two panes update to show you
that exact packet from different angles:

The **packet details** pane is the one you'll live in. It shows the packet broken out layer by
layer, from the bottom up — exactly the stack from Chapter 1's OSI model and Chapter 3's TCP/UDP
lesson, but now as real data instead of a diagram: a Frame entry, then Ethernet (Layer 2, source
and destination MAC addresses), then Internet Protocol (Layer 3, source and destination IP), then
TCP or UDP (Layer 4, source and destination port), then whatever application-layer protocol sits
on top. Each layer can be expanded to see every field inside it.

The **bytes** pane at the bottom shows the identical data as raw hex and ASCII — useful for
spotting plaintext credentials or other readable content buried inside a packet's payload.

## Cutting the noise: display filters

A busy capture can fill with thousands of packets in seconds, almost all of them irrelevant to
whatever you're actually looking for. A **display filter**, typed into the bar above the packet
list, narrows the view without throwing away anything you've captured. A few you'll use constantly:

```
tcp.port == 80          Only traffic on port 80 (HTTP)
ip.addr == 10.0.2.15    Only traffic involving this one host
http                    Only HTTP-layer traffic
dns                     Only DNS queries and responses
```

`tcp.port == 80` matches traffic to or from port 80 in either direction — the standard HTTP port
this course's protocols lesson already covered. `ip.addr == 10.0.2.15` is useful when you know one
host is involved in something and you want to see everything to or from it, regardless of protocol
or port.

## Normal handshake vs. something suspicious

Lesson 9 described the TCP three-way handshake in theory; in a real capture, it's three packets
you can point to directly: a packet with only the **SYN** flag set, followed by one with
**SYN, ACK** both set from the other host, followed by a plain **ACK** back — and then normal
application data starts flowing. That three-packet pattern, completing cleanly, is what healthy
traffic looks like.

Something suspicious often looks like that pattern breaking in a specific way. A **port scan**
shows up as one source IP sending SYN packets to many different destination ports in rapid
succession, with most of them getting no SYN-ACK back at all — the scanning tool is just checking
which ports respond. Traffic that never completes the handshake, or an unexpected destination IP
that a host keeps reaching out to on a regular interval, is exactly the kind of pattern this
course's next lesson will trace back through a real attack from start to finish.

## Key terms

| Term | Meaning |
|---|---|
| Packet capture (pcap) | A recorded set of network packets Wireshark can analyze and replay |
| Packet details pane | The Wireshark pane showing one packet broken out layer by layer |
| Display filter | An expression (e.g. `tcp.port == 80`) that narrows which captured packets are shown |
| Port scan | One host sending connection attempts to many ports, often visible as SYNs with no SYN-ACK reply |

## Check yourself

In a capture, you see a source IP send SYN packets to twenty different destination ports on the
same target within one second, and almost none of them get a SYN-ACK back. What does that pattern
most likely indicate, and which field in the packet details pane told you?
