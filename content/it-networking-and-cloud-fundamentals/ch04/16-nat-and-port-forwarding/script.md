# Script — NAT & Port Forwarding

## Segment 1 (title)

Firewalls decide what traffic is allowed through a boundary. NAT solves a different problem at many of those same boundaries: there are only about 4.3 billion IPv4 addresses, nowhere near enough for every device in the world, so NAT lets a whole office full of private devices share one single public IP address.

## Segment 2 (steps)

Here's how NAT actually works for an outbound connection. A laptop on a private address opens a connection to the internet. The router rewrites the packet's source address to its own public IP and picks a unique port to track that specific conversation. It records that mapping in a translation table. When the reply comes back, the router looks up the table and routes it to the right internal device.

## Segment 3 (steps)

That same table is exactly why NAT blocks unsolicited inbound connections by default — there's no entry for a conversation nobody inside the network started, so the router has nothing to map it to and drops it. Port forwarding fixes that on purpose: an administrator creates a permanent, manual entry saying any inbound connection to a specific public port should always forward to one internal address and port, deliberately punching a hole through for just that one service.

## Segment 4 (code)

A real NAT table usually mixes both kinds of entries at once. The dynamic one exists only because a laptop opened a connection and disappears once that connection closes. The static one is the manually configured port-forward — it stays in the table permanently, whether or not anyone is actively using it right now.

## Segment 5 (outro)

Port forwarding works, but it doesn't scale cleanly to a whole fleet of servers. Up next, lesson seventeen covers load balancers and reverse proxies — the tools a cloud setup actually uses to handle inbound traffic to many servers at once.
