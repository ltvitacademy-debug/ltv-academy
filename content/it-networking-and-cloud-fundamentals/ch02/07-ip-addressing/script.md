# Script — IP Addressing

## Segment 1 (title)

The last lesson named the network layer as the one responsible for delivery across different networks. This lesson is about the address that makes that possible: the IP address. Every device on Northbridge Retail's network — a warehouse scanner, a register, a laptop — needs one, and how that address is structured is the foundation for everything coming up in subnetting and routing.

## Segment 2 (code)

An IPv4 address is a 32 bit number, almost always written as four dotted decimal numbers like 192.168.1.10. Each of those numbers is one octet, 8 bits. Every address splits into a network portion, identifying which network a device is on, and a host portion, identifying that specific device — like a street name and an apartment number.

## Segment 3 (steps)

Not every address is reachable from the internet. Private ranges, like 10.x, 172.16 through 31.x, and 192.168.x, are reserved for internal use only, and they only have to be unique inside Northbridge's own network, not the whole internet. Northbridge's warehouse LAN runs on a private range like that. When a device needs to reach the public internet, Northbridge's router performs network address translation, swapping the private address for one public address that's globally reachable.

## Segment 4 (steps)

A device gets its address one of two ways. Static means it's manually configured once and never changes, which Northbridge uses for its warehouse server and printer, things other devices need to find reliably. Dynamic means a DHCP server assigns it automatically from a pool when the device joins the network, and reclaims it when the device leaves. Most day to day devices use DHCP, which is what makes it painless for a new laptop or a visitor's phone to just connect and get online; only the handful that need a predictable address get a static one.

## Segment 5 (outro)

Next up, lesson eight: subnets and CIDR, exactly where that network and host split gets defined precisely.
