# Lesson 11 — Baselining Normal Traffic to Spot Anomalies

**Chapter 3 · Network Traffic Analysis · Lesson 3 of 4**

## What you'll learn

- What a **traffic baseline** actually is, and why it's never just a single number
- The three dimensions that matter most when baselining: volume, destinations, and timing
- Why "normal" has to be defined per host or per segment, not applied network-wide
- How baselining is the missing piece that makes Chapter 2's anomaly-based detection actually work

## A baseline is a profile, not a number

Chapter 2 introduced **anomaly-based detection**: instead of matching traffic against known-bad signatures, it flags traffic that deviates from what's "normal." That raises an obvious question — normal according to what? The answer is a **traffic baseline**: a recorded profile of what typical behavior looks like for a given host or network segment, built from flow data (Lesson 9) collected over days or weeks. A baseline isn't one number; it's a profile across several dimensions at once — how much traffic a host typically sends and receives, which destinations it typically talks to, and when it's typically active.

## The three dimensions that matter

**Volume** — how many bytes and packets a host or segment moves in a given window, and how much that normally varies hour to hour. **Destinations** — which IP addresses, ports, and (where visible) geographic regions a host routinely contacts, and which ones it has simply never talked to before. **Timing** — when a host is normally active; a workstation that's idle every night between 11 PM and 6 AM has a timing baseline just as real as its volume baseline.

## Why "normal" is never universal

A baseline only means something relative to the host it describes. A backup server legitimately transferring tens of gigabytes to a storage array at 2 AM is completely normal — for that server. A single user workstation doing the same thing at 2 AM is almost certainly not normal for that workstation. Baselining has to be scoped per host or per segment type — workstations, servers, backup jobs each baselined separately — because a single network-wide average would blur all of those legitimate differences together and miss what actually matters.

## Concrete example: the deviation that gets caught

A finance department workstation has a well-established baseline: it only ever talks to a handful of internal IPs, only during roughly 8 AM to 6 PM, and never moves more than a few hundred megabytes a day. One night at 3 AM, flow data shows that same workstation opening a large outbound connection to an IP address in a country it has never contacted before. No signature matched anything — there's no known-bad pattern here — but it breaks the baseline on all three dimensions at once: wrong time, wrong destination, wrong volume. That combination is exactly what anomaly-based detection is built to catch, and exactly why Chapter 2's detection approach depends entirely on having a solid baseline to compare against in the first place.

## Key terms

| Term | Meaning |
|---|---|
| Traffic baseline | A recorded profile of normal volume, destinations, and timing for a host or segment |
| Volume baseline | Typical bytes/packets moved in a given time window |
| Destination baseline | The set of addresses/ports a host routinely and legitimately contacts |
| Per-host/per-segment baselining | Building separate baselines per host type instead of one network-wide average |

## Check yourself

Why would a single, network-wide "average traffic" baseline fail to catch the 3 AM finance-workstation example above, even though a per-host baseline catches it easily?
