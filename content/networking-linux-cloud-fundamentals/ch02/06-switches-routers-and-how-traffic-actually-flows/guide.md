# Lesson 6 — Switches, Routers & How Traffic Actually Flows

**Chapter 2 · Network Infrastructure & Services · Lesson 6 of 32**

## What you'll learn

- How a Layer 2 switch learns which MAC address lives behind which port, and builds a MAC address table from that
- How a Layer 3 router makes a forwarding decision using a routing table, instead of a MAC address table
- The difference between a collision domain and a broadcast domain, and why a switch doesn't break up the second one
- The exact, hop-by-hop path a packet takes from one host to another, across a switch and a router

## How a switch learns: the MAC address table

A switch forwards traffic based on Layer 2 MAC addresses, and it builds its forwarding table by
watching traffic go by — not by being configured ahead of time. When a frame arrives on a port, the
switch records that frame's **source** MAC address against the port it arrived on. The first time any
device sends anything, the switch learns exactly which port it's plugged into.

If the switch receives a frame addressed to a MAC address it hasn't learned yet, it doesn't know
which port to use, so it **floods** the frame out every port except the one it arrived on (this is
called unknown unicast flooding). Whichever device actually owns that address responds, and the
switch learns its port from that reply. From then on, frames to that address go out exactly one
port instead of being flooded everywhere.

```
Switch# show mac address-table dynamic

Vlan    Mac Address       Type        Ports
----    -----------       ----        -----
  10    0011.2233.4455    DYNAMIC     Gi0/1
  10    0011.2233.66aa    DYNAMIC     Gi0/3
  10    0011.2233.77bb    DYNAMIC     Gi0/5
```

Each row says "this MAC address lives out this port" — nothing more. A switch never looks at an IP
address to make this decision.

## How a router decides: the routing table

A router works one layer up, at Layer 3, and its core decision doesn't involve MAC addresses at
all — it reads a packet's **destination IP address** and compares it against a routing table full
of network/next-hop pairs.

```
Router# show ip route

C    192.168.10.0/24 is directly connected, GigabitEthernet0/0
C    192.168.20.0/24 is directly connected, GigabitEthernet0/1
S*   0.0.0.0/0 [1/0] via 203.0.113.1
```

For every packet, the router finds the most specific matching entry — the **longest prefix
match** — and forwards out whatever interface that entry names. If nothing specific matches, the
default route (`0.0.0.0/0`, the "gateway of last resort") catches it. Every router hop along a path
repeats this lookup independently; no single router knows or cares about the whole end-to-end path,
only "where does this particular next hop go."

## Collision domains vs. broadcast domains

These two terms get mixed up constantly, and they describe genuinely different things.

A **collision domain** is the set of devices whose transmissions can collide with each other. Every
switch port is its own collision domain — that's specifically why switches replaced old hubs, which
put every device on one shared, collision-prone segment.

A **broadcast domain** is the set of devices that receive a broadcast frame (destination MAC
`FF:FF:FF:FF:FF:FF`). A switch does **not** shrink a broadcast domain — it floods a broadcast out
every port except the one it arrived on, so every device on every switch in a flat network sits in
the same broadcast domain. Only a router (or a VLAN boundary, which is really just a separate
router-facing network) breaks a broadcast domain into smaller pieces, because routers don't forward
broadcasts between networks by default.

## The actual path: Host A to Host B, across a switch and a router

Say Host A (192.168.10.10) wants to reach Host B (192.168.20.20) — a different subnet — through a
switch and a router:

1. Host A checks: is 192.168.20.20 on my own subnet? No — so it sends the frame to its **default
   gateway** instead of trying to reach Host B directly.
2. Host A ARPs for the gateway's MAC address (if it isn't already cached), then builds a frame:
   source MAC = Host A, destination MAC = the gateway (router) — but the IP header inside still
   reads source 192.168.10.10, destination 192.168.20.20.
3. The switch looks up that destination MAC in its table and forwards the frame out the one port
   the router is connected to. It never looks at the IP addresses at all.
4. The router receives the frame, strips the Layer 2 header, reads the destination IP, checks its
   routing table, and finds a connected route out its 192.168.20.0/24 interface. It ARPs for Host B
   (or already has it cached), rebuilds a **new frame** — source MAC = the router's interface,
   destination MAC = Host B — while the IP header's source and destination addresses stay exactly
   the same, and forwards it on to Host B.

That's the fact worth locking in: **MAC addresses change at every hop; IP addresses stay the same
end to end** (barring NAT, which Lesson 9 covers).

## Key terms

| Term | Meaning |
|---|---|
| MAC address table | A switch's learned map of which MAC address lives behind which port |
| Routing table | A router's list of networks and the next hop/interface used to reach each one |
| Longest prefix match | The most specific matching routing table entry wins, when more than one could match |
| Collision domain | The set of devices whose transmissions can collide — one per switch port |
| Broadcast domain | The set of devices that receive a broadcast frame — shrunk only by a router, not a switch |
| Default gateway | The router address a host sends traffic to when the destination is off its own subnet |

## Check yourself

Why does a frame's destination MAC address change at every hop along the path, while the packet's
source and destination IP addresses stay the same all the way from Host A to Host B?
