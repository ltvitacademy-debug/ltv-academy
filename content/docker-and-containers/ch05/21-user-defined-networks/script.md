## Segment 1 (title)

The default bridge network left a real problem: catalog could reach catalog-db by IP, but not by name, and that IP changes every time the database container gets recreated. The fix is a different kind of network -- a user-defined one, which gets Docker's built-in DNS.

## Segment 2 (code)

docker network create northbridge-net makes a new network using the same bridge driver as Docker's default one. The difference isn't the driver -- it's that Docker only runs its embedded DNS server on networks you create yourself.

## Segment 3 (code)

Both catalog-db and catalog join northbridge-net with dash dash network at docker run time -- stacked right alongside the volume flag from the last lesson and the port flag from Chapter 2. These flags all just stack onto one command.

## Segment 4 (code)

And now name resolution actually works: ping catalog-db from inside catalog, and it resolves straight to its current IP. Recreate catalog-db tomorrow and it gets a new IP, but the name catalog-db keeps resolving to wherever it actually is.

## Segment 5 (steps)

A running container isn't locked to the network it started on. docker network connect attaches it to another network live, no restart required -- handy for temporarily attaching a debugging container to poke at catalog-db directly. docker network disconnect reverses it, just as live.

## Segment 6 (outro)

catalog finds catalog-db by name now. Next lesson wires up a second service the exact same way -- connecting checkout to its own database, by name, on its own user-defined network.
