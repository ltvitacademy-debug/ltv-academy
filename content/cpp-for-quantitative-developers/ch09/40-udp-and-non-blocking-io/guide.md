# UDP and Non-Blocking I/O

Lessons 38-39 covered TCP end to end: reliable, ordered, but with connection setup overhead and Nagle's algorithm fighting your latency the whole way. This lesson covers the alternative real market-data feeds actually use — UDP — and the non-blocking I/O patterns that let one thread handle many sockets at once without a thread per connection.

## What you'll learn

- UDP's actual guarantees (and lack of them), and why that tradeoff is a deliberate choice for market data
- UDP multicast: one send reaching many subscribers at once
- Non-blocking sockets and why a blocking `recv()` doesn't scale to many connections
- `select()`/`poll()`/`epoll()` at a conceptual level, and when each is the right tool

## UDP: no connection, no ordering guarantee, no retransmission — on purpose

**UDP** sends individual, self-contained packets ("datagrams") with no handshake, no guaranteed delivery, no guaranteed ordering, and no automatic retransmission of lost packets. This sounds strictly worse than TCP — until you notice what it buys back: no connection setup latency, no head-of-line blocking (TCP must deliver bytes in order, so one lost packet stalls everything behind it; UDP has no such ordering to enforce), and — critically for market data — no per-recipient connection state at all when combined with multicast.

```cpp
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

// Sender: no connect() call needed at all -- just address each packet.
int sock_fd = socket(AF_INET, SOCK_DGRAM, 0);   // SOCK_DGRAM = UDP

sockaddr_in dest{};
dest.sin_family = AF_INET;
dest.sin_port = htons(9001);
inet_pton(AF_INET, "239.1.1.1", &dest.sin_addr);   // a multicast group address

const char* msg = "AAPL,100.25,100.27,500,300";   // a quote update
sendto(sock_fd, msg, strlen(msg), 0, reinterpret_cast<sockaddr*>(&dest), sizeof(dest));
```

Unlike TCP's `send()`/`recv()`, UDP uses `sendto()`/`recvfrom()`, which carry the destination/source address with every call — there's no persistent connection object to attach it to.

## UDP multicast: why real market-data feeds use this

A real exchange feed distributes the same quote update to thousands of subscribers simultaneously. With TCP, that means one connection, and one copy of every message, per subscriber — real, significant server-side cost at exchange scale. **Multicast** lets the sender transmit *one* packet to a special multicast group address, and the network itself (routers and switches that support IGMP, the multicast membership protocol) replicates it only to subscribers who've explicitly joined that group — the sender does the work of sending once, not once per subscriber. This is precisely why real exchange market-data feeds (not simplified toy examples — actual production feeds) are built on UDP multicast rather than TCP: the one-to-many delivery model UDP enables, combined with multicast, is a fundamentally different cost structure than TCP's one-to-one connections at this scale.

The real cost: because UDP guarantees nothing, a subscriber's application is responsible for detecting gaps (via sequence numbers embedded in the application-level message format) and either tolerating the loss or requesting a retransmission through an entirely separate recovery channel — the reliability TCP gives you for free becomes the receiving application's own problem to solve.

## Non-blocking I/O: why one thread can't just block on one socket at a time

A naive server handling many client connections might spawn one thread per connection, each blocked inside `recv()` waiting for that client's next message. This works, but doesn't scale — thousands of connections means thousands of threads, and thread context-switching overhead becomes a real cost in its own right well before the connection count gets enormous.

```cpp
#include <fcntl.h>

int sock_fd = socket(AF_INET, SOCK_STREAM, 0);

// Mark the socket non-blocking: recv()/send() return immediately
// instead of blocking, with an error (EWOULDBLOCK/EAGAIN) if no
// data is available yet rather than waiting for it.
int flags = fcntl(sock_fd, F_GETFL, 0);
fcntl(sock_fd, F_SETFL, flags | O_NONBLOCK);
```

With a non-blocking socket, `recv()` returns immediately with `EWOULDBLOCK` if no data has arrived yet, instead of parking the calling thread. That removes the blocking problem, but introduces a new one: how does a single thread know *which* of many sockets actually has data ready, without wastefully polling every single one in a tight loop?

## select(), poll(), and epoll(): letting the OS tell you which sockets are ready

`select()` and `poll()` let a thread hand the OS a list of file descriptors and block *once*, waking up only when at least one of them is ready for reading or writing — a single thread can then monitor many sockets without a thread per connection and without busy-polling. `select()` is the oldest and simplest, but has a hard limit on the number of file descriptors it can monitor and re-scans the entire list on every call, making it scale poorly past a few hundred connections. `poll()` removes the hard descriptor-count limit but still re-scans the whole list each call. `epoll()` (Linux-specific) solves the rescanning cost directly: the kernel maintains the interest list persistently across calls and only returns the subset of descriptors that actually became ready, which is what makes it the standard choice for servers handling thousands of concurrent connections — exactly the scale a real exchange gateway or market-data distributor operates at.

## Key terms

| Term | Meaning |
|---|---|
| UDP | A connectionless protocol sending individual datagrams with no delivery or ordering guarantee |
| Multicast | One sent packet replicated by the network to every subscriber of a group address |
| Non-blocking socket | A socket whose I/O calls return immediately (with an error) instead of blocking when no data is ready |
| `epoll()` | A Linux mechanism letting one thread efficiently monitor readiness across many sockets at once |

## Check yourself

Why do real exchange market-data feeds use UDP multicast rather than TCP, given that UDP provides none of TCP's reliability guarantees?
