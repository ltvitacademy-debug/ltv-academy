# Firewalls & Security Groups

The previous chapter ended with TLS proving a server's identity and encrypting the conversation. But encryption only protects traffic that's already allowed to flow in the first place — something still has to decide which connections are even permitted. That's the job of a firewall, and it's where this new chapter on network security starts.

## What you'll learn

- What a firewall actually does when it inspects traffic
- The difference between a traditional firewall and a cloud security group
- How a firewall rule is built from source, destination, port, and protocol
- Why "default deny" is the standard starting posture for any new rule set

## What a firewall actually does

A firewall sits at a boundary — between the internet and a private network, or between one server and another — and inspects every packet that tries to cross that boundary against a set of rules. Each rule says, in effect, "traffic matching this description is allowed" or "traffic matching this description is blocked." Everything that doesn't match an explicit "allow" rule is usually dropped, silently, without even telling the sender it was rejected.

## Stateful vs. stateless filtering

Most modern firewalls are stateful: once a rule allows an outbound connection, the firewall automatically allows the matching return traffic without needing a separate rule for it. An older, stateless firewall has to have explicit rules for both directions of every conversation, which is harder to maintain and easier to get wrong. Stateful filtering is why a laptop can browse the web through a firewall with a single "allow outbound HTTPS" rule, instead of also needing a rule for the response traffic coming back.

## Security groups: a firewall for cloud instances

Northbridge Retail doesn't own physical firewall appliances for its cloud servers — it uses security groups instead, a feature of the cloud provider that acts as a virtual firewall attached directly to each instance. Where a traditional firewall protects an entire network segment, a security group is scoped to one resource: the checkout service's security group can allow inbound traffic on port 443 from anywhere, while the database server's security group only allows inbound traffic on port 5432 from the application servers' own security group — nothing else, not even from inside the same network.

## Building a rule

Every firewall or security group rule is built from the same handful of fields:

| Field | Example |
|---|---|
| Direction | Inbound |
| Protocol | TCP |
| Port | 443 |
| Source | 0.0.0.0/0 (anywhere) |
| Action | Allow |

A database rule would look different: direction inbound, protocol TCP, port 5432, source restricted to the application servers' security group, action allow — and nothing else would be permitted to reach that port at all.

## Default deny

The safest starting posture for any firewall or security group is default deny: block everything, then open only the specific ports and sources a service actually needs. Northbridge Retail's database server never needs to accept connections from the public internet, so its security group simply has no rule allowing that — not because someone remembered to block port 5432, but because nothing was ever opened for it in the first place.

## Key terms

| Term | Meaning |
|---|---|
| Firewall | A system that inspects traffic at a boundary and allows or blocks it by rule |
| Stateful filtering | Automatically allowing return traffic for a connection that was already allowed outbound |
| Security group | A cloud provider's virtual firewall, attached directly to one instance or resource |
| Default deny | Blocking all traffic by default and only opening what's explicitly needed |
