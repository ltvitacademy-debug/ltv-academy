# The OSI & TCP/IP Models

The last lesson said every network needs devices, links, a shared protocol, addressing, and a path. This lesson gives that list a name and an order. Networking engineers describe all of it using two layered reference models: the seven-layer OSI model and the four-layer TCP/IP model. Northbridge Retail's IT team uses this language every day — "that's a layer 2 problem" or "the issue is at layer 3" — because naming the layer tells you instantly which device and which tool can actually fix it.

## What you'll learn

- Why networking is described in layers instead of as one big process
- All seven OSI layers, and what job each one does
- The four-layer TCP/IP model and how it maps onto OSI
- How to use "what layer is this" as a real troubleshooting shortcut

## Why layers at all

A layered model breaks one enormous job — getting data from an application on one device to an application on another — into separate, independent jobs stacked on top of each other. Each layer only has to do its own job and hand off to the layer below or above; it doesn't need to know how the other layers do theirs. That's why Northbridge Retail can run the same point-of-sale application over Ethernet cable in the warehouse and over Wi-Fi in a pop-up kiosk: the application layer doesn't change, only the physical layer underneath it does. Layers are a mental model and a diagnostic tool, not physical boxes — but they map cleanly onto real devices and real problems, which is why every networking conversation uses them.

## The seven OSI layers

The OSI (Open Systems Interconnection) model, from bottom to top:

1. **Physical** — the actual cable, radio signal, or fiber; raw bits as electrical or light pulses
2. **Data Link** — delivery between devices on the same local link, using MAC addresses (Ethernet, Wi-Fi)
3. **Network** — delivery across different networks, using IP addresses and routing
4. **Transport** — reliable (or fast-but-unreliable) delivery between applications, using TCP or UDP and port numbers
5. **Session** — establishing, maintaining, and tearing down a conversation between two applications
6. **Presentation** — formatting and translating data, including encryption, so applications understand it
7. **Application** — the actual software the user or system interacts with, like a browser or Northbridge's POS app

A common memory trick, bottom to top: "Please Do Not Throw Sausage Pizza Away."

## The four-layer TCP/IP model

In practice, almost everything running today — including Northbridge Retail's entire network — uses the simpler TCP/IP model, which collapses OSI's seven layers into four:

- **Network Access** (combines OSI's Physical + Data Link)
- **Internet** (matches OSI's Network layer — this is where IP addressing lives)
- **Transport** (matches OSI's Transport layer — TCP and UDP)
- **Application** (combines OSI's Session + Presentation + Application)

TCP/IP is the model actually implemented in real hardware and software; OSI is the more detailed model used for teaching and troubleshooting language. Both describe the same stack of jobs — they just slice it differently.

## Using layers to troubleshoot

When a cashier's register at Northbridge Retail can't reach the order database, "what layer is this" narrows the search fast. No lights on the network cable at all? That's physical — check the cable and the switch port. Cable's fine but the device can't find anything on the local network? That's data link. Local traffic works but anything beyond the local router fails? That's network layer — check IP addressing and routing. The connection reaches the server but the application hangs or times out? That's transport or application layer — check the service itself, not the wiring. Naming the layer tells you which device to check next, instead of guessing.

## Key terms

| Term | Meaning |
|---|---|
| OSI model | The 7-layer reference model: Physical, Data Link, Network, Transport, Session, Presentation, Application |
| TCP/IP model | The 4-layer practical model: Network Access, Internet, Transport, Application |
| MAC address | A Data Link layer address identifying a device on a local link |
| IP address | A Network layer address identifying a device across networks |
| Port number | A Transport layer value identifying which application on a device a packet is for |

## Recap

Networking is described in layers so each job — physical signaling, local delivery, cross-network delivery, application-to-application delivery — can be understood and fixed independently. OSI names seven layers; TCP/IP, the model actually running on real networks, collapses them into four. Next up, Lesson 7: IP addressing, a closer look at the Network/Internet layer that makes cross-network delivery possible.
