# Script — Installing PostgreSQL & Initial Configuration

## Segment 1 (title)

Installing PostgreSQL introduces one concept neither SQL Server nor Oracle has under quite this name: initdb, the step that actually creates a PostgreSQL cluster — meaning one server's collection of databases, not a failover cluster.

## Segment 2 (code: two install paths)

There are two common real installation paths. An OS package manager like apt or Homebrew installs the binaries and often runs setup automatically. Docker's official postgres image runs initdb on first launch if the data directory is empty, then starts the server.

## Segment 3 (code: what initdb does)

initdb creates a new data directory containing the initial system catalogs, the postgres, template0, and template1 databases, the Write-Ahead Log directory, and default postgresql.conf and pg_hba.conf files.

## Segment 4 (steps: the ordered flow)

Put together, a real install follows the same sequence every time: install the binaries, run initdb to create the cluster, start the postmaster listening on port 5432, then set a real superuser password before trusting any remote connection.

## Segment 5 (outro)

Skipping straight to opening up remote connections without understanding these steps is exactly how connection troubleshooting threads get started. Next up: postgresql.conf and pg_hba.conf, the two files that control server behavior and who can connect.
