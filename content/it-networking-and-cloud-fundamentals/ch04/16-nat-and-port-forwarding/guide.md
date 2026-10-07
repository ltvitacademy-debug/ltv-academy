# NAT & Port Forwarding

The previous lesson covered firewalls deciding what traffic is allowed through a boundary. This lesson covers something that happens at many of the same boundaries: translating addresses so multiple private devices can share one public IP, and how to deliberately poke a hole through that translation when a service needs to be reachable from outside.

## What you'll learn

- Why NAT exists: the shortage of public IPv4 addresses
- How NAT translates an outbound connection and tracks it to route the reply back
- What port forwarding does and why it's needed for inbound connections
- How NAT inside a cloud VPC differs from a home router's NAT

## Why NAT exists

IPv4 only has about 4.3 billion possible addresses, nowhere near enough for every device in the world to have its own public one. Network Address Translation, or NAT, solves this by letting many devices on a private network share a single public IP address. Every laptop and phone in Northbridge Retail's corporate office has a private address like 10.0.1.15, but as far as the outside internet is concerned, all of that office's traffic appears to come from one public IP.

## How NAT actually translates traffic

When a laptop at 10.0.1.15 opens a connection to a server on the internet, the router performs NAT: it rewrites the packet's source address to its own public IP and picks a unique source port to track that specific connection, then records the mapping in a translation table. When the reply comes back addressed to that public IP and port, the router looks up the table, rewrites the destination back to 10.0.1.15, and delivers it to the right device. This works perfectly for outbound connections initiated from inside the network, because the translation table only gets created once an internal device starts the conversation.

## The problem NAT creates for inbound connections

That same mechanism is exactly why NAT blocks unsolicited inbound connections: there's no existing entry in the translation table for a connection nobody inside the network started, so the router has nothing to map it to and drops it. That's actually a security benefit most of the time — but it becomes a problem the moment Northbridge Retail wants to run a service that needs to be reached from outside, like a VPN gateway sitting on a private address inside the office network.

## Port forwarding

Port forwarding solves that by creating a permanent, manual entry in the translation table instead of a temporary automatic one. An administrator configures the router to say "any inbound connection to the public IP on port 51820 should always be forwarded to 10.0.1.5, port 51820" — so that specific port is deliberately, permanently punched through, while everything else on the public IP still has no mapping and gets dropped.

| Setting | Value |
|---|---|
| External port | 51820 |
| Internal IP | 10.0.1.5 |
| Internal port | 51820 |
| Protocol | UDP |

## NAT in a cloud VPC

A home router and a cloud VPC both perform NAT, but a cloud setup usually separates the roles more explicitly. Instances in a private subnet reach the internet outbound through a managed NAT gateway, which has its own dedicated public IP and performs the same translate-and-track behavior at much larger scale. Inbound access, instead of relying on port forwarding rules on a single device, is usually handled by placing a load balancer or a specific instance with its own public IP in a separate public subnet — which the next lesson covers.

## Key terms

| Term | Meaning |
|---|---|
| NAT | Network Address Translation — letting many private devices share one public IP |
| Translation table | The router's record of which internal address/port maps to which public port |
| Port forwarding | A manual, permanent rule forwarding a specific public port to an internal address |
| NAT gateway | A cloud-managed resource that performs NAT for a private subnet's outbound traffic |
