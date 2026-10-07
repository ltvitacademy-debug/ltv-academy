# Script — Capstone Kickoff: Design and Troubleshoot a Small Network

## Segment 1 (title)

Every chapter in this course covered one layer of the stack. The capstone puts all of it to work on one project: a small branch office network for Northbridge Retail, which you'll design, partially break, and then diagnose using the same methodology from Chapter 5.

## Segment 2 (steps)

Northbridge Retail is opening a small regional distribution office, and the network needs four things. A local addressing plan for roughly fifty devices, using the subnetting concepts from Chapter 2. DNS and DHCP, so devices get an address automatically and can resolve names, from Chapter 3. A perimeter firewall at the edge of the office, allowing only the traffic that's actually needed, from Chapter 4. And a secure way to reach the company's cloud-hosted checkout and inventory systems without exposing the office directly to the internet.

## Segment 3 (code)

Here's the complication: as the office was being set up, someone made a change to hit a tight deadline, and now something downstream is broken. File shares and printers at the new office work fine, but any attempt to reach the cloud-hosted inventory system times out. A teammate insists the VPN is up, and the inventory system is confirmed healthy from every other office. Something specifically between this office and that system is the problem, and figuring out what is the diagnostic work ahead.

## Segment 4 (steps)

This capstone doesn't introduce anything new — it expects you to combine what's already been taught. Subnetting and DNS from Chapters 2 and 3. Firewalls and VPNs from Chapter 4. The identify-isolate-test-resolve-document methodology from Chapter 5. And from this chapter, knowing where the inventory system actually runs and what's required to reach it securely.

## Segment 5 (outro)

With the brief and the symptom laid out, the next lesson walks through actually building the network and tracking down exactly where that connection is breaking.
