# Lesson 29 — Capstone Part 1: Planning and Network Deployment

**Chapter 8 · Job-Ready Capstone: Full Deployment Project · Lesson 29 of 32**

## What you'll learn

- How to turn a real stakeholder's requirements into a provider choice, a VM size, and an
  architecture diagram — decisions you can defend, not guesses
- Why the network layer always gets deployed before any compute or storage, and what "deployed
  in order" actually looks like for a VNet, its subnets, and its NSGs
- How to scope an NSG correctly the **first** time — allowing only what a specific subnet
  actually needs, instead of opening it wide and promising to tighten it later
- How this lesson's decisions are the foundation Lessons 30 and 31 build on, the same way
  Chapters 1 and 2 are the foundation this whole course has been building on

## The project: Harrow Peak Outfitters

Harrow Peak Outfitters is a 35-person outdoor-gear retailer based in Bellingham, Washington,
selling through its own site and a small wholesale channel. Its order-processing application and
customer database have run for six years on a single physical server in the back of the
warehouse. That server is out of warranty, has no redundancy, and its only backup is a USB drive
someone remembers to swap on Fridays. Dana Oyelaran, the Operations Manager, has asked for a real
plan to move it to the cloud before it fails during a shipping season. You're the one engineer
who owns this project end to end.

## Requirements first, exactly as Chapter 1 teaches

Before opening a cloud portal, you sit down with Dana and write down what the business actually
needs — Chapter 1's first lesson, applied for real. The order app and its database need to be
reachable from 6 AM to 10 PM Pacific, covering the warehouse floor and a few remote staff;
outside that window, brief maintenance is fine. Customer order data has to stay in the US. The
budget is modest, and there is no 24/7 ops team — just you — so every piece added has to earn its
complexity. None of that is a technical decision yet. It's the business constraint every
technical decision that follows has to satisfy.

## Choosing Azure, and sizing it from real numbers

Harrow Peak already runs Microsoft 365 and Entra ID for staff email and accounts, and you're
already Azure-trained. Running a second cloud for a two-person IT function would add real
overhead for no benefit this project needs — Chapter 1's "Azure, AWS, or both" question, answered
honestly for this workload rather than split down the middle. For sizing, you don't guess: you
pull CPU and memory utilization off the old physical server for the past month and size the
replacement against what it's actually been doing, not against what sounds safe. That lands on a
**Standard_D2s_v5** (2 vCPU, 8 GB RAM) app VM — enough headroom for the real peak, not padded for
an imaginary one.

## The architecture diagram, before anything gets built

One VNet, `harrowpeak-prod-vnet`, address space `10.20.0.0/16`, in West US 2 — close to
Bellingham and to Harrow Peak's existing Azure AD tenant. Three subnets, each with one job:
`app-subnet` (`10.20.1.0/24`) for the order-processing VM, `data-subnet` (`10.20.2.0/24`) for the
database's private endpoint, and `mgmt-subnet` (`10.20.3.0/24`) for administrative access only.
Drawing this before deploying anything means every NSG rule written next has a reason to exist —
you already know what's supposed to talk to what.

## Network first — and NSGs scoped correctly from the start

Chapter 2 is explicit that network infrastructure deploys before compute or storage, and this
project follows that order: VNet, then subnets, then NSGs, then a connectivity check — before a
single VM exists. Each NSG is scoped to exactly what its subnet needs, not "open for now."
`app-subnet-nsg` allows inbound 443 from the internet and nothing else inbound. `mgmt-subnet-nsg`
allows RDP/SSH only from Harrow Peak's one static office IP — not `0.0.0.0/0` with a plan to fix
it later. `data-subnet-nsg` allows inbound 1433 only from `app-subnet`'s address range, with no
direct path to the internet at all. Before moving to compute in Lesson 30, you verify a test host
in `app-subnet` can actually reach the private endpoint in `data-subnet` on 1433 — confirming the
network works before anything depends on it.

## Key terms

| Term | Meaning |
|---|---|
| Requirements gathering | Writing down the business's actual constraints (uptime window, data residency, budget) before any technical decision |
| Right-sizing | Choosing compute size from real observed usage, not a guess or an arbitrarily large default |
| Network-first deployment | Deploying VNet → subnets → NSGs → connectivity check, fully, before any compute or storage exists |
| Least-privilege NSG | A security rule set that allows only the specific traffic a subnet actually needs, scoped correctly on the first pass |

## Check yourself

Before Lesson 30: why does `data-subnet-nsg` allow inbound 1433 only from `app-subnet`'s address
range, instead of allowing it from the whole VNet or from anywhere? What would a looser rule have
cost Harrow Peak if the database were ever reachable directly from the internet?
