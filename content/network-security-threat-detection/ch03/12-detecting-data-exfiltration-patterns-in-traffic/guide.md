# Lesson 12 — Detecting Data Exfiltration Patterns in Traffic

**Chapter 3 · Network Traffic Analysis · Lesson 4 of 4**

## What you'll learn

- What data exfiltration actually looks like in network traffic, beyond just "a big file leaving"
- How **DNS tunneling** hides stolen data inside what looks like routine DNS queries
- What **beaconing** is, and why its regular interval — not its destination — is the real tell
- How flow analysis, DPI, and baselining from this chapter combine to catch a realistic exfiltration case

## The obvious pattern: large, unusual, off-hours transfers

The most straightforward exfiltration pattern is exactly what Lesson 11's baseline deviation was built to catch: an unusually large outbound transfer, to a destination the host has no history with, often at a time the host isn't normally active. Flow data (Lesson 9) is well-suited to spotting this pattern across an entire network, because volume, destination, and timing are exactly the fields a flow record carries.

## DNS tunneling: hiding data where it's always allowed

Almost every firewall permits outbound DNS traffic by default, because normal internet use depends on it. **DNS tunneling** abuses exactly that trust: an attacker encodes stolen data into the subdomain portion of DNS queries — for example, a long string of encoded characters in front of an attacker-controlled domain — and sends a steady stream of those queries out. The attacker's own DNS server on the other end decodes the data from each query, and can even smuggle commands back inside its DNS responses. From a flow perspective this traffic looks like ordinary port-53 DNS; what gives it away under closer inspection is abnormally long query names, an unusually high volume of queries to one obscure domain, and query patterns that don't look like anything a browser or application would normally generate.

## Beaconing: the giveaway isn't the destination, it's the rhythm

**Beaconing** is malware "phoning home" to a command-and-control server at a fixed, regular interval — every 60 seconds, every 5 minutes — to check in for instructions, whether or not any data is being stolen at that exact moment. The destination alone often isn't suspicious on its own; what's suspicious is the rhythm. No ordinary human browsing, streaming, or working produces connections spaced with that kind of mechanical regularity. Reviewing flow data over time — not just a single flow record in isolation — is what surfaces a beacon, because the tell only shows up as a pattern across many flows.

## Putting it together: a realistic exfiltration case

Flow data on a workstation shows no history of a particular external destination — a clear deviation from that host's baseline (Lesson 11). Over the following days, flow records show a small outbound connection to that same destination recurring every 60 seconds like clockwork — beaconing. A quick check of the destination shows it's a domain registered only a few weeks ago, a detail threat intelligence feeds commonly flag as suspicious on its own. Pulling that host's traffic under DPI (Lesson 10) for a closer look shows an abnormal volume of unusually long DNS queries going to that same domain. No single signal proves anything by itself, but a baseline deviation, a beaconing interval, a newly registered destination, and DNS tunneling under DPI together make a strong exfiltration case — exactly the kind of layered reasoning this chapter's tools were built to support.

## Key terms

| Term | Meaning |
|---|---|
| Data exfiltration | Unauthorized transfer of data out of a network to an external destination |
| DNS tunneling | Encoding stolen data inside DNS query/response traffic to evade normal filtering |
| Beaconing | Regular, periodic check-ins from compromised traffic to a command-and-control server |
| Newly registered domain | A destination registered very recently — a common indicator used alongside other signals |

## Check yourself

A workstation's flow data shows small, identically sized outbound connections to the same external IP every 60 seconds for three days straight. No single connection moves much data. Why is this still a strong exfiltration/compromise indicator, and which of this chapter's tools would you reach for next to confirm it?
