# Script — Servers vs. Clients

## Segment 1 (title)

Every computing task on this path involves two roles: something asking for a thing, and something answering. This lesson names those roles precisely, because client and server mean something specific and consistent, not just "small device" and "big device."

## Segment 2 (steps)

The real definition is about roles in a conversation, not fixed hardware. A client is whatever initiates a request. A server is whatever receives that request and sends back a response. The same physical laptop can be a client when it browses a website, and a server when a colleague's machine connects to a local app it's running — the hardware didn't change, the role did.

## Segment 3 (steps)

Nearly all client-server interaction follows the same shape: the client sends a request, the server does whatever work is needed, and sends back a response. Because a single server often answers many clients at once, server hardware and operating systems are usually tuned differently from a client machine — more RAM, more CPU, redundant storage, built to run unattended.

## Segment 4 (code)

At Northbridge Retail, every checkout terminal is a client. When a cashier scans an item, the terminal requests the current price and stock level, and a server in the company's data center checks the database and sends back the answer. That same terminal is a client again later when it syncs sales totals to a reporting server.

## Segment 5 (outro)

Client and server are roles in a request-response conversation, and the same machine can play either one. Up next, lesson four: virtual machines and hypervisors.
