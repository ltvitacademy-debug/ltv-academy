# How Networks Work

Every course up to this point has lived inside a single machine — its hardware, its operating system, its processes. This lesson is the turn: Northbridge Retail doesn't run on one computer. Its warehouse scanners, point-of-sale terminals, office laptops, and cloud-hosted order database all have to exchange data constantly, often across rooms, buildings, and continents. A network is simply what makes that exchange possible, and this lesson covers the handful of ideas that explain how any network — from Northbridge's two-rack server closet to the public internet — actually moves data from one place to another.

## What you'll learn

- What a network is, at the most basic level: devices, links, and the agreed-upon rules that let them talk
- How data actually travels — packets, not one continuous stream
- The difference between a LAN, a WAN, and the internet, using Northbridge Retail's own footprint as the example
- Why every device needs an address and a way to find the right path to the other end

## What a network actually is

Strip away the jargon and a network is three things: **devices** that want to exchange data, **links** that physically or wirelessly connect them, and a shared **protocol** — an agreed-upon set of rules — that both ends follow so the data sent by one side means something to the other. Without that shared protocol, two connected devices are just wired together; they aren't actually communicating. Northbridge Retail's warehouse has barcode scanners, a local server, and a Wi-Fi access point — three different kinds of devices, all following the same Ethernet and IP rules so any of them can reach any other.

## Data travels in packets, not one stream

When Northbridge's point-of-sale system sends a completed order to the central database, it doesn't send the whole order as one unbroken blast of data. The sending device breaks the message into small chunks called **packets**, each carrying a piece of the data plus header information — where it came from, where it's going, and where it fits in the sequence. Packets from the same conversation can even take different paths across the network and still arrive correctly, because the receiving end uses that header information to reassemble them in order. This is what lets a network share its links efficiently among many conversations happening at once, instead of reserving a dedicated line for every single exchange.

## LAN, WAN, and the internet

Northbridge Retail's single warehouse network — scanners, local server, access points, all in one building — is a **Local Area Network (LAN)**: a network confined to one site, owned and controlled entirely by Northbridge. When the warehouse LAN needs to talk to Northbridge's corporate office LAN across town, that connection between two separate LANs is a **Wide Area Network (WAN)** link, typically leased from an internet service provider. The **internet** is simply the largest WAN of all: a global mesh of interconnected networks, owned by thousands of different organizations, that agree to forward each other's traffic using a common set of protocols. Northbridge's cloud-hosted order database, running in a data center it doesn't own, is reachable from the warehouse LAN only because both sides are connected to that same internet.

## Addresses and paths

Every device that wants to send or receive data on a network needs two things: an **address** that uniquely identifies it (so data knows where to go), and a **path** to get there. On a small LAN like Northbridge's warehouse, the path is often just "straight to the other device on the same wire or Wi-Fi." Across a WAN or the internet, the path usually runs through several intermediate devices, each one reading the destination address and forwarding the packet one step closer. The next lesson, on the OSI and TCP/IP models, breaks down exactly which layer of a network handles addressing and which layer handles finding that path — the two ideas this lesson introduces together.

## Key terms

| Term | Meaning |
|---|---|
| Network | Devices, links, and a shared protocol that together let data move between devices |
| Packet | A small chunk of data, with header information, that a message gets broken into for transmission |
| LAN (Local Area Network) | A network confined to one site, owned and controlled by one organization |
| WAN (Wide Area Network) | A connection between separate LANs, usually spanning a greater distance |
| Internet | The global mesh of interconnected networks using common protocols |

## Recap

A network is devices, links, and a shared protocol, and data crosses it in packets rather than one continuous stream. Northbridge Retail's warehouse is a LAN; the link back to its corporate office is a WAN; and the public internet is the largest WAN of all. Every device needs an address and a path — next up, Lesson 6: the OSI and TCP/IP models that formalize exactly how.
