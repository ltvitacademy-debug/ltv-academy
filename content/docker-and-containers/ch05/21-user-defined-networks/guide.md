# User-Defined Networks

The default bridge network left Northbridge with a real problem: `catalog` could reach `catalog-db` by IP, but not by name, and that IP changes every time the database container gets recreated. The fix isn't a workaround — it's a different kind of network. A **user-defined network** gets Docker's built-in DNS, something the default bridge never had.

## What you'll learn

- How to create a user-defined bridge network with `docker network create`
- Why containers on a user-defined network can resolve each other by name
- How to attach a container to a network at `docker run` time
- How `docker network connect` and `disconnect` change a running container's networks

## Creating a network

```text
$ docker network create northbridge-net
a3f8e9c1b2d4...

$ docker network ls
NETWORK ID     NAME               DRIVER    SCOPE
a3f8e9c1b2d4   northbridge-net    bridge    local
8f3a2b1c9d4e   bridge             bridge    local
```

`northbridge-net` uses the same `bridge` driver as Docker's default network — the difference isn't the driver, it's that Docker only runs its embedded DNS server for networks you create yourself.

## Attaching containers at startup

```text
$ docker run -d --name catalog-db \
  --network northbridge-net \
  -v catalog-db-data:/var/lib/postgresql/data \
  postgres:16

$ docker run -d --name catalog \
  --network northbridge-net \
  -p 8080:3000 \
  northbridge/catalog:1.5
```

Both containers join `northbridge-net` with `--network` at `docker run` time, alongside the volume flag from Lesson 19 and the port flag from Chapter 2 — these flags all stack together on one command.

## Name resolution actually works now

```text
$ docker exec catalog ping -c 1 catalog-db
PING catalog-db (172.18.0.2): 56 data bytes
64 bytes from 172.18.0.2: icmp_seq=0 ttl=64 time=0.071 ms
```

Same two containers, same underlying mechanism as Lesson 20 — but this time `catalog-db` resolves. Docker's embedded DNS server, available only on user-defined networks, maps each container's name to its current IP automatically. Recreate `catalog-db` tomorrow and it gets a new IP, but the name `catalog-db` keeps resolving to wherever it actually is.

## Connecting and disconnecting live

A running container isn't locked to the network it started on:

```text
$ docker network connect northbridge-net some-other-container
$ docker network disconnect northbridge-net some-other-container
```

Useful for moving a container between networks, or temporarily attaching a debugging container to `northbridge-net` to poke at `catalog-db` directly, without restarting anything already running.

## Key terms

- **User-defined network** — a Docker network you explicitly create, which gets Docker's embedded DNS server
- **`docker network create`** — creates a new bridge network by default
- **Embedded DNS** — Docker's built-in name resolution, active only on user-defined networks, mapping container names to their current IPs
- **`docker network connect` / `disconnect`** — attaches or detaches a running container from a network without restarting it
