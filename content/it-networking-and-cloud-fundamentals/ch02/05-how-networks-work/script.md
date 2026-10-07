# Script — How Networks Work

## Segment 1 (title)

Every course so far has lived inside one machine — its hardware, its operating system, its processes. This lesson is the turn: Northbridge Retail doesn't run on one computer. Its warehouse scanners, registers, laptops, and cloud database all have to exchange data constantly, often across rooms and buildings, and that's what a network makes possible.

## Segment 2 (steps)

A network is really just three things. Devices that want to exchange data. Links, wired or wireless, that connect them. And a shared protocol — agreed-upon rules — so the data one side sends actually means something to the other. Without that shared protocol, two connected devices are just wired together, not communicating.

## Segment 3 (steps)

Northbridge's warehouse network — scanners, a local server, Wi-Fi, all in one building — is a LAN, a local area network confined to one site and owned entirely by Northbridge. The link from that warehouse back to Northbridge's corporate office is a WAN, a wide area network connecting separate LANs, usually leased from an internet service provider. And the internet is simply the biggest WAN of all, a global mesh of networks owned by thousands of organizations agreeing to forward each other's traffic using common protocols.

## Segment 4 (code)

When Northbridge's point of sale sends a completed order to its database, it doesn't send it as one unbroken blast. It gets split into packets, each with header information saying where it came from, where it's going, and where it fits in the sequence. Packets can even take different paths and still get reassembled correctly at the other end.

## Segment 5 (outro)

Every device needs an address and a path to get there — on a small LAN that path is often just straight to the other device, but across a WAN it usually runs through several intermediate devices. Next up, lesson six: the OSI and TCP/IP models that formalize exactly how addressing and paths work.
