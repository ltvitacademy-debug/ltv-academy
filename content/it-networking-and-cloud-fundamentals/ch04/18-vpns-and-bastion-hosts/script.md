# Script — VPNs & Bastion Hosts

## Segment 1 (title)

Load balancers handle public traffic coming in from anywhere. This lesson covers the opposite case: giving a trusted person private access to internal systems that were never meant to face the public internet at all.

## Segment 2 (steps)

A VPN creates an encrypted tunnel across a network that isn't trusted — usually the public internet — so the far side becomes reachable as if it were local and private. It comes in two shapes: a site-to-site VPN permanently links two entire networks, like an office and a cloud VPC, while a remote-access VPN connects one person's laptop to a private network on demand, which is what an individual engineer uses to reach internal tools from home.

## Segment 3 (steps)

Even with a VPN, some teams want one more choke point specifically for administrative access. A bastion host is a single, deliberately hardened server that's the only machine allowed to initiate SSH or RDP connections into a private subnet. An engineer connects to the bastion first, and only from there connects onward to the actual target server, which accepts administrative connections from nowhere else. This way, even if one engineer's laptop is compromised, the blast radius is limited to what the bastion itself allows.

## Segment 4 (code)

The dash-J flag here jumps the SSH connection through the bastion host before it ever reaches the private database server directly — the database itself still has no route in from anywhere else.

## Segment 5 (outro)

Each layer narrows the next one down further, and neither tool replaces the firewall rules from earlier in this chapter. Up next, chapter five begins: troubleshooting, starting with three commands worth knowing cold — ping, traceroute, and dig.
