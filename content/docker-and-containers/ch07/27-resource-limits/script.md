## Segment 1 (title)

One runaway container -- a memory leak, a CPU-hungry batch job -- can starve every other container sharing that host. Resource limits are how Docker stops that from happening.

## Segment 2 (code)

Dash-dash-memory caps a container hard -- exceed it, and the kernel's out-of-memory killer terminates it, usually with exit code 137. Dash-dash-cpus caps it to a fraction of one core -- half, here.

## Segment 3 (code)

In compose.yaml, deploy dot resources dot limits sets the same hard ceiling. Reservations is softer -- Docker tries to guarantee that minimum is available, which matters most once you're scheduling across a cluster rather than one host.

## Segment 4 (steps)

Three reasons this matters. It contains a leak to one container instead of the whole host. It stops one noisy neighbor from starving everything else of CPU. And it lets you actually plan capacity -- knowing each container's ceiling tells you how many fit on one machine.

## Segment 5 (outro)

Northbridge learned this the hard way: an unbounded leak once took the whole host down overnight. A limit turns that into one container getting OOM-killed and restarting. Next: reading docker stats against the limits you just set.
