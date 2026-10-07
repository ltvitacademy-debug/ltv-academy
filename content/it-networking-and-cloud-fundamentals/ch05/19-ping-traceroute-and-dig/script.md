# Script — ping, traceroute & dig

## Segment 1 (title)

Chapter four covered keeping a network secure. This chapter covers what to do when something's not working — starting with three commands that are usually the first thing worth running: ping, traceroute, and dig.

## Segment 2 (steps)

Each of these answers a different question. ping asks whether a host is reachable at all, and how fast. traceroute asks which path a packet actually takes, hop by hop, and where along that path it's slow or broken. dig asks what DNS actually says a name maps to, right now, with no browser caching involved — which is often the fastest way to rule out an entire layer of the stack in seconds.

## Segment 3 (code)

A clean ping like this one proves the network path is up and the host responds to ICMP — three packets out, three back, no loss. What it doesn't prove is that the actual application behind that address is working; a server can ping perfectly while its checkout process is completely broken.

## Segment 4 (code)

traceroute shows every router hop along the way. Here, each hop replies within a few milliseconds all the way to the destination — a healthy path. If hop nine suddenly spiked to hundreds of milliseconds or stopped replying entirely, that hop is exactly where the problem would live.

## Segment 5 (code)

dig queries a DNS server directly and prints exactly what came back: here, a CNAME pointing to the main domain, then an A record with its IP and TTL. That's useful for confirming a DNS change actually took effect, instead of trusting whatever a browser happens to have cached.

## Segment 6 (outro)

Used together — dig first, then ping, then traceroute if needed — these three tools turn a vague "the site is down" into something specific enough to actually act on. Up next, lesson twenty: curl, netstat, and ss, for checking the application layer itself.
