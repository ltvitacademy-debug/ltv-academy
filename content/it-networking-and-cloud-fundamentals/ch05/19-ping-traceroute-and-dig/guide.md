# ping, traceroute & dig

Chapter 4 covered keeping a network secure. This chapter covers what to do when something's not working — and these three commands are usually the first thing worth running when "the site is down" is all anyone knows so far.

## What you'll learn

- What ping actually tests, and what it can't tell you
- How traceroute reveals the path a packet takes, hop by hop
- How dig queries DNS directly and what its answer actually means
- Reading these three tools together to narrow down where a problem lives

## ping: is anything even there?

ping sends a small ICMP echo request to a target and waits for an echo reply, reporting whether a reply came back and how long it took. It answers one narrow question — is this address reachable at all, and roughly how fast — and nothing more. A successful ping to checkout.northbridgeretail.com proves the network path is up and that specific host responds to ICMP, but it says nothing about whether the actual web application behind it is working; a server can ping just fine while its checkout process is completely broken.

## traceroute: which path did it take?

Where ping only reports the final result, traceroute reveals every router hop along the way, by sending packets with a deliberately limited lifespan and recording which router replies at each stage. If a connection to Northbridge Retail's site is slow or failing, traceroute shows exactly where the path breaks down or gets slow — hop 4 might reply in 8 milliseconds, while hop 9 spikes to 400 milliseconds or simply stops replying, both useful clues about where the problem actually lives.

## dig: what does DNS actually say?

dig queries a DNS server directly and prints the full answer it gets back, which is far more precise than relying on a browser's cache. Running dig against checkout.northbridgeretail.com shows exactly which record type answered, what value it returned, and what TTL it's carrying — useful for confirming a DNS change actually took effect, or for proving that a "site not found" error is a DNS problem rather than a server problem.

| Tool | Tests | Typical question it answers |
|---|---|---|
| ping | Basic reachability | Is this host up and responding at all? |
| traceroute | The path, hop by hop | Where along the route is it slow or broken? |
| dig | DNS resolution | What does DNS actually say this name maps to? |

## Using them together

These three tools form a natural order when something's wrong. Start with dig to confirm the name resolves to the address expected. Then ping that address to confirm it responds at all. If it doesn't, traceroute shows how far the packet actually got before the trail goes cold — narrowing "the site is down" into something specific enough to actually act on.

## Key terms

| Term | Meaning |
|---|---|
| ping | Sends an ICMP echo request and reports whether and how fast a reply comes back |
| traceroute | Reveals every router hop a packet takes to reach a destination |
| dig | Queries a DNS server directly and prints its exact answer |
| ICMP | The protocol ping uses to send echo requests and receive replies |
