# Capstone Kickoff: Design and Troubleshoot a Small Network

Every chapter in this course has covered one layer of the stack — hardware and VMs, networking fundamentals, core protocols, security services, troubleshooting, and now the cloud. The capstone puts all of it to work on one project: a small branch office network for Northbridge Retail, which you'll design, partially break, and then diagnose using the same methodology from Chapter 5.

## What you'll learn

- The full brief for the capstone project, and what a finished submission needs to include
- The network requirements for Northbridge Retail's new regional distribution office
- A deliberately broken scenario you'll need to diagnose before you can finish the build
- Which tools and concepts from earlier chapters this project expects you to reach for

## The brief

Northbridge Retail is opening a small regional distribution office — a few dozen employees, a handful of servers, and a need to reach the company's cloud-hosted checkout and inventory systems from Chapter 6. Your job across these three lessons is to design the office's network, connect it to the cloud resources it depends on, and resolve a connectivity problem that's blocking the rollout before it can go live.

## Requirements for the office network

The distribution office needs:

- **Local addressing** — a subnet plan for roughly 50 devices (workstations, printers, a couple of local servers), using the CIDR concepts from Chapter 2.
- **DNS and DHCP** — devices need to get an address automatically and resolve both internal and external names, covered in Chapter 3.
- **Perimeter security** — a firewall at the edge of the office network, with rules that allow only the traffic the office actually needs, from Chapter 4.
- **Cloud connectivity** — a secure way to reach Northbridge Retail's cloud-hosted checkout and inventory systems, without exposing the office network directly to the internet, using the VPN concepts from Chapter 4.

## The broken scenario

As the office was being set up, a different team member made a change to get a tight deadline met, and now something downstream is broken. Employees at the new office report that internal file shares and printers work fine, but any attempt to reach the cloud-hosted inventory system times out. A teammate insists "the VPN is up," and the inventory system itself is confirmed healthy from other offices. Something between this office's network and that system is the problem — and finding out what, specifically, is the diagnostic work the next lesson walks through.

## What this project expects from you

This capstone doesn't introduce new material — it expects you to combine what's already been taught. Subnetting from Chapter 2, DNS and DHCP from Chapter 3, firewalls and VPNs from Chapter 4, and the systematic troubleshooting methodology — identify, isolate, test, resolve, document — from Chapter 5 are all fair game, and all expected. The cloud concepts from this chapter round it out: where the inventory system actually runs, and what's required to reach it securely.

## Key terms

| Term | Meaning |
|---|---|
| Capstone | A culminating project that applies everything taught across a course to one scenario |
| Perimeter security | Controls at the edge of a network that restrict what traffic is allowed in or out |
| Site connectivity | The secure link between an office network and cloud-hosted resources it depends on |
| Broken scenario | A deliberately introduced fault the learner must diagnose using a real methodology |
