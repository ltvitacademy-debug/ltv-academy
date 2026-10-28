# Lesson 5 — Common Network Ports & Protocols You'll See Daily

**Chapter 1 · Networking Fundamentals · Lesson 5 of 32**

## What you'll learn

- What a port number actually is, and why an IP address alone isn't enough
- The real, standard port numbers for the protocols you'll see constantly
- The difference between well-known ports and ephemeral ports
- Why knowing these numbers cold makes firewall rules and troubleshooting much faster

## Why ports exist at all

An IP address gets traffic to the right *device*. A port number gets it to the right
*application* on that device. A single server can run a web server, a mail server, and a
database all at once, all reachable at the same IP address — the port number is what tells the
operating system which of those services should receive a given piece of traffic. Port numbers
range from 0 to 65535.

## The ports you need to know cold

| Port | Protocol | Purpose |
|---|---|---|
| 20/21 | FTP | File Transfer Protocol (data/control) |
| 22 | SSH | Secure Shell — encrypted remote login and file transfer |
| 23 | Telnet | Unencrypted remote login (legacy, avoid in production) |
| 25 | SMTP | Simple Mail Transfer Protocol — sending email |
| 53 | DNS | Domain Name System — resolving names to IP addresses |
| 67/68 | DHCP | Dynamic Host Configuration Protocol — automatic IP assignment |
| 80 | HTTP | Unencrypted web traffic |
| 110 | POP3 | Receiving email (older, less common now) |
| 143 | IMAP | Receiving email, keeps mail synced on the server |
| 443 | HTTPS | Encrypted web traffic (TLS/SSL) |
| 3389 | RDP | Remote Desktop Protocol (Windows remote access) |

Every one of these is a **well-known port** (0-1023), reserved by the Internet Assigned Numbers
Authority (IANA) for a specific standard service, which is exactly why they're worth memorizing —
a firewall rule, a packet capture, or a security alert referencing "port 443" is unambiguous
industry shorthand for "HTTPS traffic."

## Ephemeral ports: the other side of every connection

A well-known port is only half the story. When your laptop opens a connection to a web server on
port 443, your laptop doesn't also use port 443 on its own side — it picks a random, temporary
**ephemeral port** (typically in the 49152-65535 range) for that specific connection. The
connection is uniquely identified by the combination of both IP addresses and both ports —
source IP, source port, destination IP, destination port — which is why a server can handle
thousands of simultaneous connections to the same port 443 without them colliding.

```
Your laptop                                    Web server
192.168.1.50 : 51234  <------------------>  93.184.216.34 : 443
  (ephemeral port,                            (well-known port,
   random, temporary)                          fixed, always 443)
```

## Why this matters for firewalls and troubleshooting

A firewall rule like "allow inbound TCP port 443" is specifically naming a well-known port
because that's the predictable, fixed side of the conversation — you can't write a useful
firewall rule around an ephemeral port, since it's different every single time. When you're
troubleshooting "the website won't load," knowing that HTTP is 80 and HTTPS is 443 lets you
immediately test the right thing (can this machine even reach port 443 on that server?) instead
of guessing.

## Key terms

| Term | Meaning |
|---|---|
| Port number | A number (0-65535) that identifies which application on a device should receive specific traffic |
| Well-known port | A fixed, standard port (0-1023) reserved by IANA for a specific protocol, like 443 for HTTPS |
| Ephemeral port | A temporary, randomly chosen port (typically 49152-65535) used for the client side of a connection |
| Socket | The combination of an IP address and a port number that uniquely identifies one end of a connection |

## Check yourself

Why can a single web server handle thousands of simultaneous browser connections, all arriving
on the same port 443, without any of them getting confused with each other?
