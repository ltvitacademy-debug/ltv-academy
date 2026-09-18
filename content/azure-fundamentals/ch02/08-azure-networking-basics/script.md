# Script — Azure Networking Basics: VNets

## Segment 1 (title)

A Virtual Network is your own private, isolated network inside Azure. Resources you place inside it get private IP addresses that nothing outside can reach by default.

## Segment 2 (code: subnets)

A VNet is usually divided into subnets — a segment for web servers, one for an app tier, one for a database that should never face the internet at all.

## Segment 3 (steps: why it matters)

Resources in the same VNet talk to each other privately — faster, because there's no round trip through the public internet, and more secure, because that traffic is never exposed.

## Segment 4 (outro)

The real point of a VNet isn't connectivity, it's isolation — a boundary you control by default. Next up: Microsoft Entra ID and identity basics.
