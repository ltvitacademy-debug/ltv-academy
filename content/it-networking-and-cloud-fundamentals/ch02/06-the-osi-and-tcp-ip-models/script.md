# Script — The OSI & TCP/IP Models

## Segment 1 (title)

The last lesson said every network needs devices, links, a shared protocol, addressing, and a path. This lesson gives that list a name and an order. Networking engineers describe everything using two layered models, and Northbridge Retail's IT team says things like "that's a layer two problem" or "the issue is at layer three," because naming the layer tells you instantly which device and which tool can actually fix it.

## Segment 2 (steps)

The OSI model has seven layers, bottom to top. Physical is the actual cable or radio signal — raw bits. Data link handles delivery between devices on the same local link, using MAC addresses. Network handles delivery across different networks using IP addresses. And transport handles reliable delivery between applications using TCP or UDP and port numbers.

## Segment 3 (steps)

The top three layers: session establishes and tears down a conversation between two applications. Presentation formats and translates data, including encryption. And application is the actual software people interact with, like Northbridge's point of sale app.

## Segment 4 (code)

In practice, almost everything running today, including Northbridge's entire network, uses the simpler TCP/IP model, which collapses those seven layers into four: network access, internet, transport, and application. TCP/IP is what's actually implemented in real hardware and software; OSI is the more detailed teaching and troubleshooting language. Both describe the same stack of jobs, just sliced differently.

## Segment 5 (steps)

When a register at Northbridge can't reach the database, naming the layer narrows the search fast. No link lights at all is physical. Can't find anything on the local network is data link. Local traffic works but nothing beyond the router is network layer. And a connection that reaches the server but hangs is transport or application.

## Segment 6 (outro)

Next up, lesson seven: IP addressing, a closer look at the layer that makes cross-network delivery possible.
