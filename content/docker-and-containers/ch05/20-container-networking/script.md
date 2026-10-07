## Segment 1 (title)

catalog-db's data now survives a restart, but the catalog container still needs to actually reach it over the network. Every container so far has landed on the same network without anyone configuring one -- this lesson looks at what that network actually is.

## Segment 2 (code)

Every Docker install starts with three networks already created: bridge, host, and none. Unless a container is started with dash dash network, it lands on bridge -- exactly where catalog and catalog-db have been sitting this whole time, without anyone asking for it by name.

## Segment 3 (code)

docker network inspect bridge shows exactly who's attached and what IP each one got. Both containers are in the same 172.17.0.0/16 range, assigned automatically the moment each one started.

## Segment 4 (steps)

bridge is the default -- an isolated internal network with its own IP range. host skips isolation entirely and shares the machine's own network stack. none means no networking at all, for a container that genuinely needs to be cut off.

## Segment 5 (code)

Here's the catch: catalog can ping catalog-db's IP address just fine -- the bridge network does route traffic between containers. What it can't do is resolve catalog-db as a name. And the moment that container gets removed and recreated, Docker hands out a new IP, breaking anything that hardcoded the old one.

## Segment 6 (outro)

Hardcoding an IP that changes on every restart isn't a real fix. Next lesson covers the network type that solves it properly -- one where containers resolve each other by name, automatically.
