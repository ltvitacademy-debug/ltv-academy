# Script — Firewalls & Security Groups

## Segment 1 (title)

TLS proved a server's identity and encrypted the conversation, but encryption only protects traffic that's already allowed to flow — something still has to decide which connections even get that far. That's a firewall's job, and it's where this new chapter on network security starts.

## Segment 2 (steps)

Every firewall or security group rule is built from the same handful of fields: which direction the traffic is moving, which protocol and port it's using, which source address it's allowed to come from, and whether the final action is allow or block. A rule permitting inbound HTTPS, for instance, specifies TCP, port 443, a source of anywhere, and an action of allow — and nothing outside that description gets through.

## Segment 3 (steps)

Cloud security groups apply the same idea at a tighter scope. Instead of protecting an entire network segment the way a traditional firewall does, a security group attaches directly to one instance. Northbridge Retail's checkout service can allow inbound traffic on port 443 from anywhere, while its database server's security group allows inbound traffic only from the application servers' own security group — nothing else, not even another server sitting on the same private network.

## Segment 4 (code)

This example shows that split in practice: port 443 is open to the whole internet, while port 5432, the database port, is restricted to just the application tier's security group. Everything else on that database server simply has no rule permitting it, which is exactly the point.

## Segment 5 (outro)

That's the default deny posture in action — block everything by default, and open only the specific ports a service actually needs. Up next, lesson sixteen covers NAT and port forwarding: how a whole office shares one public address, and how to deliberately punch a hole through that translation when something needs to be reached from outside.
