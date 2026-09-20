# Script — Oracle Net Services & Listener Configuration

## Segment 1 (title)

A SQL Server DBA is used to connections mostly resolving through the OS. Oracle's model is structurally different — every connection is explicitly mediated by a named listener process and two plain-text config files.

## Segment 2 (code: tnsnames.ora)

On the client side, tnsnames.ora maps a short net service name, like orclpdb, to a full connect descriptor — a host, a port, and a service name. That's what lets a client type sqlplus hr@orclpdb instead of a full connection string every time.

## Segment 3 (code: listener.ora)

On the server side, listener.ora configures the Oracle Net Listener process, tnslsnr, which listens on a port — 1521 by default — for incoming connection requests. In practice, a running instance's PMON process usually registers its services with the listener automatically, so a static entry often isn't even required.

## Segment 4 (steps: connection flow)

Put together, the flow is: the client resolves the net service name through tnsnames.ora, reaches the listener on that host and port, the listener hands the connection off to the target instance, and the instance establishes the session.

## Segment 5 (outro)

Next up: tablespaces, datafiles, and Oracle's storage structures — where the data the instance manages actually lives, one layer down from the database files themselves.
