# Lesson 23 — When VPN Is Enough and When You Need a Dedicated Circuit

**Chapter 6 · Private Connectivity: VPN & Dedicated Circuits · Lesson 23 of 32**

## What you'll learn

- How to weigh site-to-site VPN against ExpressRoute/Direct Connect using real decision factors,
  not a vague "dedicated is always better"
- Why cost and setup time are not minor details — they often decide the answer by themselves
- Why the two aren't mutually exclusive, and when a real deployment uses both together
- How to frame this tradeoff the way an architect actually has to justify it

## The real tradeoff, not just "better vs. worse"

Lessons 21 and 22 covered how each connection works. This lesson is about which one you'd actually
choose, because in practice it's rarely obvious. **Site-to-site VPN** is fast to set up — often
hours, sometimes a single afternoon — and cheap, with no physical provisioning involved; it's a
software and configuration task on both ends. **ExpressRoute or Direct Connect** takes real lead
time — often weeks, because a connectivity provider has to physically provision a cross-connect
at an exchange location — and costs meaningfully more, both for the circuit itself and the port
speed you commit to. Neither of those facts makes one option universally "better"; they make the
decision depend entirely on what the workload actually needs.

## The factors that actually drive the decision

```
VPN is usually enough when:              A dedicated circuit is usually needed when:
- moderate, bursty traffic               - sustained high-bandwidth transfer
- latency variability is tolerable       - latency-sensitive workloads (e.g. real-time apps)
- fast setup matters more than cost      - a compliance rule bars public-internet transit
- a backup/DR link, not primary traffic  - primary production traffic at scale
```

A company replicating a few gigabytes of nightly backup data to the cloud, with no hard latency
requirement, is squarely in VPN territory — the public-internet variability doesn't matter much
when the job just needs to finish before morning. A trading platform or a hospital system moving
large, continuous volumes of data with a regulatory requirement that it never cross the public
internet is squarely in dedicated-circuit territory — no amount of VPN tuning changes the fact
that the traffic is still, technically, traversing the internet underneath the encryption.

## They're not mutually exclusive

A common real-world pattern uses **both together**: ExpressRoute or Direct Connect as the primary
path for production traffic, with a site-to-site VPN configured as an **automatic failover** if the
dedicated circuit goes down. This gets the consistent performance of a dedicated circuit day to
day, plus a cheap, fast-to-restore fallback for the rare outage — instead of accepting zero
connectivity while a physical circuit issue gets resolved, which can take far longer to fix than a
VPN tunnel ever takes to reconnect.

## Key terms

| Term | Meaning |
|---|---|
| Setup/provisioning time | VPN: hours. ExpressRoute/Direct Connect: weeks, due to physical cross-connect work |
| Latency consistency | How predictable round-trip time is; dedicated circuits are far more consistent than internet-routed VPN traffic |
| Compliance-driven requirement | A rule that data must never transit the public internet, satisfied only by a dedicated circuit |
| VPN as failover | Using a cheap VPN as backup connectivity if a dedicated circuit experiences an outage |

## Check yourself

A regional clinic chain wants to send nightly, non-urgent backup data to the cloud and has no
compliance rule against the public internet. A payment processor wants a primary, always-on link
carrying continuous transaction volume under PCI requirements. Which gets a VPN, which gets a
dedicated circuit, and why does the compliance detail matter more than the traffic volume itself?
