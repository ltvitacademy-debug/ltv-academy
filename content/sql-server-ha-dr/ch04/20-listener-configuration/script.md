# Script — Listener Configuration

## Segment 1 (title)

Lesson 17 introduced the listener as a virtual network name applications connect to instead of a specific server. This lesson goes into how it's actually configured, and why connecting to a name instead of a server is what makes failover invisible.

## Segment 2 (steps: what the listener actually is)

The listener is a virtual network name registered in DNS, one or more virtual IPs — typically one per subnet — and a listener port. It's itself a resource inside the WSFC, and after a failover, the cluster rebinds the same IP to whichever node now hosts the primary.

## Segment 3 (code: creating one)

ALTER AVAILABILITY GROUP ADD LISTENER takes a name, one or more IP-and-subnet-mask pairs, and a port. A multi-subnet AG supplies one IP per subnet, and MultiSubnetFailover=True in the client connection string speeds up reconnection across subnets.

## Segment 4 (outro)

If an application's connection string is hardcoded to a specific node name instead of the listener, a failover breaks every connection with no way to redirect it — that's the entire reason the listener exists as its own object. Next up: manual and automatic failover itself.
