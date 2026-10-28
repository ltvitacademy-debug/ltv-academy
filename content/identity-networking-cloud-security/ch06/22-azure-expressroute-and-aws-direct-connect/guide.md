# Lesson 22 — Azure ExpressRoute and AWS Direct Connect

**Chapter 6 · Private Connectivity: VPN & Dedicated Circuits · Lesson 22 of 32**

## What you'll learn

- What Azure ExpressRoute and AWS Direct Connect actually are: dedicated, private physical
  network connections to the cloud that never touch the public internet
- Why that matters for latency, bandwidth, and certain compliance requirements
- The real building blocks on each side — connectivity providers, peering types, circuits
- Why this is a fundamentally different kind of connection than a site-to-site VPN, not just a
  faster version of it

## A dedicated circuit, not an encrypted tunnel

Lesson 21 covered site-to-site VPN: an encrypted tunnel that still crosses the public internet.
**Azure ExpressRoute** and **AWS Direct Connect** solve a different problem — they give you a
**private, dedicated physical connection** between your on-prem network and the cloud provider's
network, through a connectivity provider's facility, that **never touches the public internet at
all**. There's no encryption happening at the IPsec layer because there's no shared public medium
to encrypt against — the traffic simply never enters it. This isn't "VPN but faster"; it's a
different physical path with a different cost and provisioning model entirely.

## How the circuit actually gets built

Neither connection is something you just click a button for. You work with a **connectivity
provider** — a telecom or colocation partner operating in an Azure ExpressRoute location or an AWS
Direct Connect location — who provides the physical cross-connect between your router (or your
on-prem network via a provider's existing backbone) and a port on the cloud provider's edge
router:

```
Your on-prem network
       |
       |  Private physical link, via connectivity provider
       v
ExpressRoute location / Direct Connect location
       |
       |  Dedicated port: 1 Gbps, 10 Gbps, 100 Gbps
       v
Azure (via ExpressRoute circuit)  /  AWS (via Direct Connect connection)
```

Azure calls the logical connection an **ExpressRoute circuit**, with peering types including
**Private Peering** (reaching VNets) and **Microsoft Peering** (reaching Microsoft 365 and other
Microsoft services). AWS calls it a **Direct Connect connection**, provisioned at a specific port
speed, with a **Direct Connect Gateway** used when one connection needs to reach VPCs in multiple
regions.

## Why it's worth the extra setup

Because the traffic rides a dedicated physical path instead of sharing the public internet with
everyone else's traffic, both services deliver **more consistent latency and bandwidth** — no
competing with unrelated internet congestion, no variable routing. That consistency is also why
regulated workloads often specifically require it: a compliance framework that restricts data from
crossing the public internet, even encrypted, is satisfied by ExpressRoute or Direct Connect in a
way a VPN simply cannot satisfy, no matter how strong the encryption is. The tradeoff, covered in
full in Lesson 23, is that this all takes real provisioning time and real recurring cost — it isn't
something you stand up in an afternoon.

## Key terms

| Term | Meaning |
|---|---|
| Azure ExpressRoute | A dedicated private connection from on-prem to Azure that bypasses the public internet |
| AWS Direct Connect | AWS's equivalent dedicated private connection, bypassing the public internet |
| Connectivity provider | The telecom/colocation partner who provisions the physical cross-connect |
| ExpressRoute circuit / Direct Connect connection | The logical dedicated connection each provider creates over that physical link |

## Check yourself

A teammate asks why ExpressRoute needs no IPsec encryption configuration the way a site-to-site VPN
does. What's the real reason, and what kind of workload would make that distinction a hard
requirement rather than a nice-to-have?
