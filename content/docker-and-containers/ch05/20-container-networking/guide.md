# Container Networking

`catalog-db`'s data now survives a restart, but the catalog container still needs to actually reach it over the network. Every container Northbridge has run so far landed on the same network without anyone configuring one — this lesson looks at what that network actually is, and where its convenience quietly runs out.

## What you'll learn

- The three network drivers Docker sets up by default: bridge, host, and none
- How to inspect which containers are on a network and what IP each one got
- That containers on the default bridge network can reach each other — but only by IP address
- Why typing IP addresses isn't a real solution, setting up the next lesson

## The default networks

Every Docker install starts with three networks already created:

```text
$ docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
8f3a2b1c9d4e   bridge    bridge    local
a1b2c3d4e5f6   host      host      local
1a2b3c4d5e6f   none      null      local
```

- **bridge** — the default network every container joins unless told otherwise; an isolated internal network with its own IP range
- **host** — a container on this network shares the host machine's network stack directly, with no isolation
- **none** — no networking at all, used for containers that genuinely need to be cut off

Unless a container is started with `--network`, it lands on `bridge` — which is exactly what's happened to `catalog` and `catalog-db` so far without anyone asking for it by name.

## Inspecting the bridge network

```text
$ docker network inspect bridge
[
    {
        "Name": "bridge",
        "IPAM": {
            "Config": [{ "Subnet": "172.17.0.0/16" }]
        },
        "Containers": {
            "a1b2...": {
                "Name": "catalog-db",
                "IPv4Address": "172.17.0.2/16"
            },
            "b3c4...": {
                "Name": "catalog",
                "IPv4Address": "172.17.0.3/16"
            }
        }
    }
]
```

Both containers are on `bridge`, each with its own IP in the `172.17.0.0/16` range Docker manages automatically.

## Containers can reach each other -- by IP

```text
$ docker exec catalog ping -c 1 172.17.0.2
PING 172.17.0.2: 56 data bytes
64 bytes from 172.17.0.2: icmp_seq=0 ttl=64 time=0.089 ms

$ docker exec catalog ping -c 1 catalog-db
ping: bad address 'catalog-db'
```

The bridge network does route traffic between containers — `catalog` can reach `catalog-db`'s IP just fine. What it can't do is resolve `catalog-db` as a *name*. That's a real problem the moment a container gets removed and recreated: Docker hands out a new IP, and anything hardcoded to the old one breaks.

## Key terms

- **bridge** — Docker's default network; containers on it get their own IP and can reach each other by IP
- **host** — a network mode where the container shares the host's network stack directly
- **none** — no networking at all
- **`docker network ls`** — lists every network Docker knows about
- **`docker network inspect`** — shows a network's subnet and which containers are attached, with their IPs
