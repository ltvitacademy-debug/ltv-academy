# Lesson 3 — DMZ Design and Why Public-Facing Servers Live There

**Chapter 1 · Firewall Architecture & Network Segmentation · Lesson 3 of 4**

## What you'll learn

- What a **DMZ (demilitarized zone)** is, and the specific problem it exists to solve
- Why public-facing servers like web and mail servers get placed in a DMZ instead of the internal network
- The difference between a **three-legged DMZ** (one firewall, three interfaces) and a **back-to-back DMZ** (two firewalls)
- Why a breach of a DMZ host doesn't automatically mean a breach of the internal network

## The problem: servers the public has to reach

Some servers, by the nature of their job, have to be reachable from the public internet — a company's website, its public mail server, a customer-facing API. That's a real security problem, because anything reachable from the internet is also reachable by an attacker, and a public-facing server is realistically the most likely thing on the network to eventually get compromised. The question a network architect has to answer isn't *whether* that server might get breached — it's *what happens to the rest of the network if it does.*

If that public-facing web server sat directly on the same internal network as the finance team's workstations and the domain controller, a successful breach of the web server would hand an attacker a foothold with direct network access to everything else. The DMZ exists to prevent exactly that.

## DMZ: a buffer zone, not a workaround

A **DMZ (demilitarized zone)** is a separate network segment that sits between the public internet and the internal network, used specifically to host public-facing servers. It's built so that traffic from the internet can reach the DMZ, and the DMZ can reach specific things on the internal network under tightly controlled conditions — but the internet itself never gets a direct path into the internal network, and a breach of a DMZ host doesn't hand an attacker a direct line into it either.

**Concrete example:** a company's public website runs on a server placed in the DMZ. The internet can reach that web server on port 80/443. If the web server is compromised, the attacker lands inside the DMZ — not inside the internal network where the finance servers and employee workstations live. To get any further, the attacker still has to get past another firewall boundary, which is exactly the delay and detection opportunity the DMZ is designed to create.

## Two ways to build it: three-legged vs. back-to-back

**Three-legged DMZ:** a single firewall with three network interfaces — one facing the internet, one facing the DMZ, and one facing the internal network. The one firewall enforces separate rule sets for each of the three zones. This is simpler to deploy and manage, since there's only one device to configure, but it also means that single firewall is the only thing standing between the internet and the internal network if it's ever misconfigured or compromised.

**Back-to-back DMZ:** two separate firewalls, with the DMZ sitting in the network segment between them. The first firewall sits between the internet and the DMZ; the second sits between the DMZ and the internal network. Traffic headed toward the internal network has to pass through two independent firewalls, often from different vendors, rather than just one. That adds real defense in depth — a flaw or misconfiguration in one firewall doesn't automatically compromise the whole boundary — at the cost of more hardware to buy, configure, and maintain.

## Key terms

| Term | Meaning |
|---|---|
| DMZ (demilitarized zone) | A network segment between the internet and the internal network, used to host public-facing servers |
| Three-legged DMZ | One firewall with three interfaces (internet, DMZ, internal), each with its own rule set |
| Back-to-back DMZ | Two separate firewalls with the DMZ sandwiched between them, requiring two independent hops to reach the internal network |
| Public-facing server | A server, like a web or mail server, that must be reachable from the internet |

## Check yourself

Why does placing a public web server in a DMZ, instead of directly on the internal network, limit the damage if that web server is ever compromised — and what's the tradeoff between a three-legged DMZ and a back-to-back DMZ?
