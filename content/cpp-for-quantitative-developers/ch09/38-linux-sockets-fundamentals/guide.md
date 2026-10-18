# Linux Sockets Fundamentals

Everything in this course so far has run inside a single process. Real trading systems don't: a market-data feed, an order-entry gateway, a risk engine, and a strategy process are usually separate programs — sometimes on separate machines — that talk to each other over a network. This lesson covers the Berkeley sockets API, the foundation every one of those connections is built on, whatever higher-level library eventually wraps it.

## What you'll learn

- The core socket API: `socket()`, `bind()`, `listen()`, `accept()`, `connect()`, `send()`/`recv()`
- The client/server pattern for a TCP connection, end to end
- Why TCP is a byte stream, not a sequence of messages — and why that distinction will matter immediately in Lesson 39
- How to check every socket call's return value, and why that's not optional in this domain

## The core socket API

A socket is a file-descriptor-like handle representing one endpoint of a network connection. The server side of a TCP connection goes through four calls before it can talk to a client:

```cpp
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <cstring>
#include <iostream>

int main() {
    // 1. Create a TCP socket (AF_INET = IPv4, SOCK_STREAM = TCP)
    int listen_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (listen_fd < 0) { perror("socket"); return 1; }

    // 2. Bind it to a local address and port
    sockaddr_in addr{};
    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = INADDR_ANY;   // listen on all local interfaces
    addr.sin_port = htons(9000);          // htons: host-to-network byte order

    if (bind(listen_fd, reinterpret_cast<sockaddr*>(&addr), sizeof(addr)) < 0) {
        perror("bind"); return 1;
    }

    // 3. Start listening for incoming connections (backlog of 16 pending)
    if (listen(listen_fd, 16) < 0) { perror("listen"); return 1; }

    std::cout << "Listening on port 9000...\n";

    // 4. Accept blocks until a client connects, then returns a NEW socket
    //    dedicated to that one client. listen_fd keeps listening for others.
    sockaddr_in client_addr{};
    socklen_t client_len = sizeof(client_addr);
    int client_fd = accept(listen_fd, reinterpret_cast<sockaddr*>(&client_addr), &client_len);
    if (client_fd < 0) { perror("accept"); return 1; }

    char buffer[1024];
    ssize_t n = recv(client_fd, buffer, sizeof(buffer), 0);
    if (n > 0) {
        std::cout << "Received " << n << " bytes: " << std::string(buffer, n) << '\n';
        send(client_fd, "ack", 3, 0);
    }

    close(client_fd);
    close(listen_fd);
}
```

The client side is simpler — it only needs `connect()`, not `bind()`/`listen()`/`accept()`:

```cpp
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <iostream>

int main() {
    int sock_fd = socket(AF_INET, SOCK_STREAM, 0);

    sockaddr_in server_addr{};
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(9000);
    inet_pton(AF_INET, "127.0.0.1", &server_addr.sin_addr);   // text IP -> binary

    if (connect(sock_fd, reinterpret_cast<sockaddr*>(&server_addr), sizeof(server_addr)) < 0) {
        perror("connect"); return 1;
    }

    send(sock_fd, "hello", 5, 0);

    char buffer[1024];
    ssize_t n = recv(sock_fd, buffer, sizeof(buffer), 0);
    std::cout << "Server replied: " << std::string(buffer, n) << '\n';

    close(sock_fd);
}
```

## Why `accept()` returns a new socket, not the listening one

A common point of confusion: the server's `listen_fd` never sends or receives application data. `accept()` blocks until a client connects, then hands back a brand-new file descriptor — `client_fd` — representing that specific connection, while `listen_fd` keeps listening for the next client. A real server accepts in a loop (or hands each accepted connection to a separate thread or an event loop), never reusing `listen_fd` for actual traffic.

## TCP is a byte stream — there is no such thing as a "message" at this layer

This is the single most important mental model shift for anyone used to higher-level networking: `send()` and `recv()` do not preserve message boundaries. If a client calls `send()` three times with three separate 10-byte messages, the server's `recv()` calls might return all 30 bytes in one call, or 3 bytes then 27, or any other split — TCP guarantees the *bytes* arrive in order, but makes zero promises about how they're grouped across individual `recv()` calls. Treating one `recv()` call as "one message" is a bug that works by accident in testing (small, fast, local connections rarely split messages) and then fails unpredictably in production under real network conditions. Lesson 39 covers the actual fix: application-level framing.

## Always check the return value

Every socket call above returns an `int` (or `ssize_t` for `send`/`recv`) that can indicate failure — a negative value, almost always. In production code, that's not a suggestion to check "when something seems wrong" — it's the only way to find out a peer disconnected, a port was already in use, or a network error occurred, since none of these show up as a C++ exception. The `perror()` calls above print the OS's own explanation of `errno`, which is the fastest way to diagnose a socket failure during development.

## Key terms

| Term | Meaning |
|---|---|
| Socket | A handle representing one endpoint of a network connection |
| `bind()` | Associates a socket with a local address and port |
| `listen()` | Marks a socket as ready to accept incoming connections, with a backlog queue |
| `accept()` | Blocks until a client connects, returning a new socket dedicated to that connection |
| Byte stream | TCP's delivery model: ordered bytes with no preserved message boundaries |

## Check yourself

A server calls `recv()` once after a client sends two separate 20-byte messages back to back. Why can the server not assume it received exactly one 20-byte message, or even that it received a whole number of complete messages at all?
