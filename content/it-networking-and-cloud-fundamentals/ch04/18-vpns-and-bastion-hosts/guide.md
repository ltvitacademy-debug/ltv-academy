# VPNs & Bastion Hosts

Load balancers handle traffic coming in from the public internet to services that are meant to be public. This closing lesson of the chapter covers the opposite problem: giving a trusted person private access to internal systems that were never meant to face the internet at all.

## What you'll learn

- What a VPN actually does and the difference between site-to-site and remote-access VPNs
- How a VPN tunnel protects traffic crossing an untrusted network
- What a bastion host is and why it exists as a single, hardened entry point
- Why neither tool replaces the firewall and security-group rules from earlier in the chapter

## What a VPN does

A Virtual Private Network, or VPN, creates an encrypted tunnel across a network that isn't trusted — usually the public internet — so that traffic inside the tunnel behaves as if it were on the private network at the other end. Northbridge Retail's remote support engineers connect to a VPN before they can reach the internal admin tools that manage the checkout service, because those tools were never meant to be exposed directly to the internet.

## Site-to-site vs. remote-access VPNs

There are two common shapes. A site-to-site VPN permanently connects two networks — Northbridge Retail's office network and its cloud VPC, for example — so devices on either side can reach each other as if they shared one network, with no action required from any individual user. A remote-access VPN instead connects one person's laptop to a private network on demand, which is what an individual engineer uses to reach internal tools from home.

| Type | Connects | Typical use |
|---|---|---|
| Site-to-site | Two networks | Office ↔ cloud VPC |
| Remote-access | One device to a network | An engineer working from home |

## Bastion hosts

Even with a VPN, some organizations still want one additional choke point specifically for administrative access to servers. A bastion host — sometimes called a jump box — is a single, deliberately hardened server that is the only machine allowed to initiate SSH or RDP connections into a private subnet. Instead of every database server having its own exposed management port, an engineer connects to the bastion host first, and only from there connects onward to the actual database server, which otherwise accepts administrative connections from nowhere else at all.

## Why this doesn't replace the firewall

A VPN and a bastion host narrow down who can even attempt a connection, but they don't replace the rules from earlier in this chapter. Northbridge Retail's security group on the database server still only allows inbound traffic from the bastion host's own address — so even someone who somehow reaches the VPN still can't reach the database directly without also going through the bastion, and the bastion itself still only accepts connections from the VPN's address range. Each layer narrows the next one down further.

## Key terms

| Term | Meaning |
|---|---|
| VPN | An encrypted tunnel across an untrusted network, making the far side reachable as if private |
| Site-to-site VPN | A permanent VPN connecting two entire networks |
| Remote-access VPN | A VPN connecting one device to a private network on demand |
| Bastion host | A single hardened server that is the only allowed entry point for administrative access |
