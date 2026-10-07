# Script — What Distributed Systems Are

## Segment 1 (title)

Welcome to Distributed Systems Concepts. A distributed system is a collection of independent computers that coordinate over a network so that, to the people using it, they look like one coherent system. Each machine has its own memory, its own clock, and its own chance of failing — nothing is shared except the network between them.

## Segment 2 (steps)

We build distributed systems for three main reasons. Scale, because no single machine, no matter how powerful, can handle unlimited load forever. Geography, because users are spread across the planet and the speed of light sets a hard floor on how fast a request can travel. And fault isolation, because spreading work across many machines means one server failing doesn't take the whole system down with it.

## Segment 3 (steps)

That split creates real difficulty. There's no shared memory anymore — one machine can't read another's variables, it has to send a message and wait for a reply. There's no global clock, since every machine's clock drifts slightly on its own. And failure becomes partial: instead of one program crashing all at once, some machines can die while others keep running fine, which creates confusing states a single machine never has to deal with.

## Segment 4 (steps)

You already rely on distributed systems daily — DNS resolving a domain name, a distributed database spreading rows across machines, a microservices backend splitting one app into many cooperating services. But engineers have long cataloged the false assumptions that trip people up: the network is not reliable, latency is never zero, and bandwidth is never infinite. Production outages punish anyone who forgets those three.

## Segment 5 (outro)

Keep that definition in mind — independent machines, coordinating over an unreliable network, appearing as one system. Up next, lesson two: availability.
