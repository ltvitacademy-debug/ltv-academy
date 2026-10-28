# Lesson 8 — Network-Based vs. Host-Based IDS

**Chapter 2 · Intrusion Detection & Prevention Systems · Lesson 8 of 32**

## What you'll learn

- What a network-based IDS (NIDS) actually watches, and what it structurally cannot see
- What a host-based IDS (HIDS) actually watches, and what it structurally cannot see
- A concrete example of an attack each one would catch that the other would miss entirely
- Why a mature SOC deploys both instead of treating them as interchangeable

## NIDS: watching the wire

A **network-based IDS (NIDS)** — tools like Snort or Suricata, the same engines from Lesson 7 — sits at a SPAN or mirror port, watching a copy of the traffic crossing a network segment, the same deployment model covered back in Lesson 5. Because a NIDS sees traffic from every host on that segment, it can spot patterns no single host would ever reveal on its own: one machine scanning dozens of others, unusual traffic volume between two systems that normally never talk, or a known malicious signature crossing the wire toward any host at all, even one with no security software installed.

What a NIDS **cannot** see is anything that never crosses the network: a file quietly modified on disk, a local privilege escalation, a malicious process launched and run entirely on one machine without ever generating unusual network traffic. Encrypted traffic the sensor can't decrypt is a blind spot too.

## HIDS: watching one system from the inside

A **host-based IDS (HIDS)** — a tool like **OSSEC** — runs as an agent installed directly on one system, watching that system's own logs, file integrity (whether a sensitive file's hash has changed), and process activity from the inside. That gives it visibility a NIDS structurally cannot have: a local privilege escalation, a file that was quietly modified, a suspicious parent-child process relationship, even activity buried inside traffic that's already been decrypted on that host.

The tradeoff is **scope**. A HIDS only ever sees the one system it's installed on — it has zero visibility into anything happening on the rest of the network. And if an attacker achieves a deep enough compromise of that host, they may be able to tamper with or disable the HIDS agent itself.

## One attack, two different outcomes

Consider an attacker who already has a foothold on one internal server and is now quietly escalating privileges and modifying a system file to maintain persistence — all without generating any unusual network traffic. A NIDS watching the wire sees nothing wrong, because nothing about this activity crosses the network. A HIDS agent on that server, watching file integrity and local process activity directly, catches it immediately. Flip the scenario to a host scanning dozens of other machines on the segment, and the NIDS catches the pattern instantly while a HIDS on any one target machine might see only a single, unremarkable connection attempt.

## Why SOCs run both

That's exactly why a mature SOC doesn't choose one over the other — it runs **both**, the same defense-in-depth thinking behind segmenting a network in the first place. A NIDS catches network-wide patterns across every host on a segment, including hosts with no agent installed at all. A HIDS catches host-local activity that never crosses the network and would otherwise be entirely invisible. Together, each tool covers the exact blind spot the other one structurally cannot.

## Key terms

| Term | Meaning |
|---|---|
| NIDS (network-based IDS) | An IDS that watches a copy of network traffic, e.g. Snort or Suricata at a SPAN/mirror port |
| HIDS (host-based IDS) | An IDS that runs as an agent on one system, watching its logs, files, and processes, e.g. OSSEC |
| File integrity monitoring | Detecting unauthorized changes to sensitive files by comparing their hashes over time |
| Defense in depth | Layering multiple, complementary detection methods so each one covers the others' blind spots |

## Check yourself

An attacker escalates privileges and modifies a system file entirely on one already-compromised host, generating no unusual network traffic. Why would a NIDS miss this attack completely while a HIDS on that host would catch it?
