# Script — TCP vs. UDP

## Segment 1 (title)

Once a device has an address, it needs a way to actually move data to another device. Almost everything on the internet uses one of two transport protocols to do that: TCP or UDP. They solve the same problem in two deliberately different ways.

## Segment 2 (steps)

TCP starts every connection with a three-way handshake. The client sends a SYN, the server answers with a SYN-ACK, and the client confirms with an ACK. Only after that does any real data start flowing, and from there every segment is tracked, acknowledged, and retransmitted if it goes missing.

## Segment 3 (steps)

UDP skips nearly all of that. No handshake, no acknowledgments, no retransmission — a packet goes out and the sender moves on. For checkout traffic, that reliability gap is unacceptable, so it runs on TCP. For something like a live warehouse inventory dashboard updating every second, losing one update out of sixty doesn't matter, and UDP's speed wins.

## Segment 4 (code)

Picture both side by side. A TCP checkout connection handshakes first, then if a segment gets lost, it's retransmitted and still delivered in the right order. A UDP dashboard feed just sends each update; if one is lost, it's simply skipped, because the next one is already on the way.

## Segment 5 (outro)

The choice always comes down to whether a dropped packet is something the application can shrug off. Up next, lesson thirteen: HTTP and HTTPS, the request-response protocol that rides on top of TCP for nearly everything on the web.
