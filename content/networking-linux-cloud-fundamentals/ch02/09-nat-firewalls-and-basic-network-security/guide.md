# Lesson 9 — NAT, Firewalls & Basic Network Security Concepts

**Chapter 2 · Network Infrastructure & Services · Lesson 9 of 32**

## What you'll learn

- How NAT actually translates between private and public IP addresses, and why IPv4 exhaustion
  made it necessary
- The difference between a stateful and a stateless firewall
- What a basic ACL/firewall rule actually evaluates to make an allow/deny decision
- How to read a real firewall rule the way a network engineer would

## Why NAT exists: IPv4 exhaustion

IPv4 has about 4.3 billion possible addresses. That sounds like a lot, until you remember every
phone, laptop, server, and IoT device on Earth needs one. The internet ran out of room for every
device to have its own public address decades ago, and the fix that actually shipped — long before
IPv6 saw wide adoption — was **NAT (Network Address Translation)**: let an entire private network
share a small number of public IP addresses, often just one.

## How NAT actually translates addresses

Devices inside a home or office network use **private IP addresses** (ranges like
`192.168.0.0/16`, `10.0.0.0/8`, `172.16.0.0/12` — reserved specifically so they're never routed on
the public internet). When one of those devices talks to the internet, the router performs NAT:

```
Inside (private)              NAT table                 Outside (public)
192.168.1.50:51234   <--->   192.168.1.50:51234      <--->   93.184.216.34:443
                              maps to
                              203.0.113.7:40001
```

The router rewrites the packet's source IP (and usually the source port) to its own public
address before sending it out, and keeps a NAT table entry mapping that translation. When the
reply comes back addressed to `203.0.113.7:40001`, the router looks up the NAT table, rewrites the
destination back to `192.168.1.50:51234`, and delivers it to the right internal device. Every
device behind that router shares the one public address, distinguished only by which port got
assigned to which internal connection — this specific variant is called **PAT (Port Address
Translation)**, and it's what nearly every home router actually runs.

## Stateful vs. stateless firewalls

A firewall decides what traffic is allowed through, but "stateful" vs. "stateless" describes how
much it remembers about a connection while deciding.

A **stateless firewall** evaluates every single packet in isolation, against a fixed rule list,
with no memory of what came before. It has to have an explicit rule allowing both the outbound
request *and* the inbound reply, or the reply gets blocked.

A **stateful firewall** tracks active connections. Once it allows an outbound request, it
automatically permits the matching inbound reply, because it remembers that connection was
already approved — you don't write a separate rule for the reply traffic. Nearly every modern
firewall (including a home router's built-in firewall and NAT) is stateful for exactly this
reason: it's both safer (nothing unsolicited gets in by default) and far simpler to manage.

## What a firewall/ACL rule actually evaluates

A basic access control list (ACL) rule — whether on a router, a firewall appliance, or a cloud
security group — is evaluated against the same handful of fields on every packet, in order, until
one rule matches:

```
permit tcp 192.168.1.0/24 any eq 443
deny   tcp any any eq 23
deny   ip any any
```

| Field | What it checks |
|---|---|
| Source | Where the traffic is coming from (an IP or network) |
| Destination | Where the traffic is going (an IP or network, or "any") |
| Protocol | TCP, UDP, ICMP, or "ip" for all of them |
| Port | Which service, e.g. `eq 443` for HTTPS |
| Action | permit (allow) or deny (block) |

Rules are read top to bottom, and the **first match wins** — a packet is evaluated against each
rule in order, and as soon as one matches, that rule's action applies and no further rules are
checked. That's why the example above ends with an explicit `deny ip any any`: most real ACLs end
with an implicit or explicit "deny everything else," so anything not specifically permitted gets
blocked by default.

## Key terms

| Term | Meaning |
|---|---|
| NAT | Network Address Translation — lets a private network share one or few public IP addresses |
| PAT | Port Address Translation — the common NAT variant that distinguishes connections by port number |
| Private IP range | Address ranges (like 192.168.0.0/16) reserved for internal use, never routed on the public internet |
| Stateful firewall | Tracks active connections and automatically allows the matching reply to an approved outbound request |
| Stateless firewall | Evaluates every packet in isolation against a fixed rule list, with no memory of prior traffic |
| ACL | Access control list — an ordered list of permit/deny rules matched by source, destination, protocol, and port |

## Check yourself

Why does a stateful firewall only need one rule to allow an outbound web request, while a
stateless firewall needs two — one for the request and one for the reply?
