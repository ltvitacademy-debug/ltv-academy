# TCP in Practice: Framing, Nagle's Algorithm & Backpressure

Lesson 38 ended on the byte-stream problem: `recv()` doesn't preserve message boundaries. This lesson covers the actual fix — application-level framing — plus two more TCP behaviors that silently hurt latency-sensitive systems if you don't know about them: Nagle's algorithm, which exists to help throughput-oriented applications and actively hurts low-latency ones, and backpressure, what happens when a receiver can't keep up with a sender.

## What you'll learn

- Length-prefix framing: the standard fix for TCP's lack of message boundaries
- Nagle's algorithm — what it does, why it exists, and why trading systems disable it with `TCP_NODELAY`
- Backpressure: what a partial `send()` return value means, and why ignoring it drops data
- How these three pieces combine in a realistic low-latency message loop

## Framing: length-prefix the standard fix

Since TCP won't tell you where one message ends and the next begins, the application has to encode that information itself. The simplest, most common scheme is **length-prefix framing**: before each message's payload, send a fixed-size header containing that payload's length.

```cpp
#include <cstdint>
#include <cstring>
#include <vector>
#include <sys/socket.h>

// Send one framed message: a 4-byte big-endian length, then the payload.
bool send_framed(int sock_fd, const char* data, uint32_t len) {
    uint32_t len_be = htonl(len);   // host-to-network: consistent byte order on the wire
    if (send(sock_fd, &len_be, sizeof(len_be), 0) != sizeof(len_be)) return false;
    return send(sock_fd, data, len, 0) == static_cast<ssize_t>(len);
}

// Receive exactly `len` bytes, looping because recv() can return partial data.
bool recv_exact(int sock_fd, char* buffer, size_t len) {
    size_t received = 0;
    while (received < len) {
        ssize_t n = recv(sock_fd, buffer + received, len - received, 0);
        if (n <= 0) return false;   // 0 = peer closed, <0 = error
        received += static_cast<size_t>(n);
    }
    return true;
}

bool recv_framed(int sock_fd, std::vector<char>& out) {
    uint32_t len_be;
    if (!recv_exact(sock_fd, reinterpret_cast<char*>(&len_be), sizeof(len_be))) return false;
    uint32_t len = ntohl(len_be);   // network-to-host

    out.resize(len);
    return recv_exact(sock_fd, out.data(), len);
}
```

`recv_exact()` is the crucial piece: it loops until it has every byte it asked for, because a single `recv()` call might return fewer bytes than requested even when more are coming. Once both sides agree on this length-prefix scheme, each `recv_framed()` call reliably returns exactly one complete application message, regardless of how the underlying TCP segments happened to split across the wire.

## Nagle's algorithm: good for throughput, bad for latency

By default, TCP implementations run **Nagle's algorithm**: when an application sends a small amount of data, the OS may hold it briefly, hoping to combine it with more outgoing data into a single, larger, more network-efficient packet, rather than sending many tiny packets back to back. This is a genuinely good default for throughput-oriented traffic (a file transfer, a bulk upload) — but for a latency-sensitive message (an order you want on the wire *now*), that deliberate hold is pure added delay, often tens of milliseconds, which is enormous compared to the microsecond-scale budgets this course's capstone will care about.

```cpp
#include <netinet/tcp.h>
#include <netinet/in.h>
#include <sys/socket.h>

int sock_fd = socket(AF_INET, SOCK_STREAM, 0);

int flag = 1;
setsockopt(sock_fd, IPPROTO_TCP, TCP_NODELAY, &flag, sizeof(flag));
// With TCP_NODELAY set, small writes go out immediately instead of
// waiting for Nagle's algorithm to try to coalesce them.
```

Virtually every low-latency trading system sets `TCP_NODELAY` on every socket used for order flow or market data over TCP, specifically to opt out of this throughput-favoring default.

## Backpressure: what a partial send() actually means

`send()` doesn't guarantee it transmits everything you asked it to in one call — its return value is the number of bytes it actually accepted into the kernel's send buffer, which can be less than requested if that buffer is full (because the receiver, or the network path, isn't draining data as fast as this side is producing it). This is **backpressure**: the transport telling the sender to slow down.

```cpp
// WRONG: ignores send()'s return value -- silently drops any bytes
// the kernel didn't accept this call.
send(sock_fd, data, len, 0);

// CORRECT: loop until every byte is actually sent, exactly like recv_exact().
bool send_exact(int sock_fd, const char* data, size_t len) {
    size_t sent = 0;
    while (sent < len) {
        ssize_t n = send(sock_fd, data + sent, len - sent, 0);
        if (n <= 0) return false;
        sent += static_cast<size_t>(n);
    }
    return true;
}
```

A send loop that doesn't handle partial sends doesn't fail loudly — it silently transmits a truncated, corrupted message, which then confuses whatever framing scheme is layered on top (the receiver reads a length prefix, then gets fewer payload bytes than promised and has no clean way to recover). Treating `send()`'s return value with the same discipline as `recv()`'s is not optional in any code meant to run outside a quick local test.

## Putting it together

A realistic low-latency message loop combines all three ideas from this lesson: `TCP_NODELAY` set once at connection setup, every `send`/`recv` wrapped in a loop that handles partial transfers (`send_exact`/`recv_exact`), and a length-prefix frame around every application-level message — three small disciplines that, left out, each fail in a different way that works fine in a quick local test and then breaks under real production network conditions.

## Key terms

| Term | Meaning |
|---|---|
| Length-prefix framing | Prepending each message with a fixed-size length field so the receiver knows exactly how many bytes to read |
| Nagle's algorithm | TCP's default behavior of briefly delaying small sends to coalesce them into larger packets |
| `TCP_NODELAY` | A socket option that disables Nagle's algorithm, sending small writes immediately |
| Backpressure | A transport signaling that the sender should slow down, visible as a partial `send()` |

## Check yourself

Why does setting `TCP_NODELAY` matter specifically for a low-latency trading system, when it would be the wrong choice for a bulk file-transfer application?
