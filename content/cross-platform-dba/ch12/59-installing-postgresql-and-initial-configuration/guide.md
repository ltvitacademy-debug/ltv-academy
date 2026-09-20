# Installing PostgreSQL & Initial Configuration

Installing PostgreSQL is more straightforward than installing Oracle and simpler in a
different way than installing MySQL — but it introduces one concept neither of those
platforms have under quite this name: `initdb`, the step that actually creates a
PostgreSQL **cluster** (a data directory, not a clustered-failover concept — PostgreSQL
overloads "cluster" to mean "one server's collection of databases"). This lesson walks
through the real, ordered install flow without pretending to show screenshots of a specific
operating system's installer.

## What you'll learn

- The two common real installation paths: OS package manager and Docker's official image
- What `initdb` actually does, and why it's a distinct step from installing the software
- The ordered flow from installed binaries to a running, connectable server

## Two common installation paths

PostgreSQL ships as pre-built packages for every major Linux distribution and as an official
Docker image, and both are legitimate, widely used ways to get a real server running:

- **OS package manager** — on Debian/Ubuntu, `apt install postgresql`; on RHEL/Fedora,
  `dnf install postgresql-server`; on macOS, Homebrew's `brew install postgresql`. This
  installs the PostgreSQL binaries (the `postgres` server executable, `psql`, and supporting
  tools) and, on most distributions, also runs the initial cluster setup and starts the
  service automatically as part of the package's post-install steps.
- **Docker's official `postgres` image** — `docker run -e POSTGRES_PASSWORD=... postgres`
  pulls the official image maintained by the PostgreSQL Docker community and starts a
  container that runs `initdb` automatically on first launch if the data directory is empty,
  then starts the server. This is a genuinely common way developers and DBAs alike spin up a
  disposable or lab PostgreSQL instance, and it's the path used throughout this course's lab
  environment.

Either path ends with the same three things existing: the PostgreSQL binaries on disk, a
data directory (a "cluster"), and a running `postgres` server process (the postmaster from
the previous lesson) listening for connections.

## What initdb actually does

When PostgreSQL is installed from source or manually (rather than through a package that
automates it), the explicit next step is `initdb`:

```
initdb -D /var/lib/postgresql/data
```

`initdb` creates a new PostgreSQL **cluster** — a data directory containing the initial
system catalogs, the default `postgres`, `template0`, and `template1` databases, the
Write-Ahead Log directory, and a default `postgresql.conf` and `pg_hba.conf` (both covered
in the next lesson). This is conceptually similar to what SQL Server's setup does when it
creates the `master` database and system databases during installation, but in PostgreSQL
it's an explicit, separately named step you can run yourself — which matters when you're
troubleshooting a container that won't start, or setting up a non-default data directory.

## The ordered install flow

Put together, a real PostgreSQL install — whether by package manager or Docker — follows the
same logical sequence:

1. **Install the binaries** — via package manager or by pulling the Docker image
2. **Run initdb** (often automatic) — creates the data directory / cluster with system
   catalogs and default configuration files
3. **Start the postmaster** — the server process begins listening on its configured port
   (5432 by default)
4. **Set the postgres superuser password** — the initial superuser account needs a real
   password set (via `ALTER ROLE postgres WITH PASSWORD '...'` or an environment variable in
   the Docker image) before trusting any remote connection
5. **Adjust pg_hba.conf for real connections** — the default configuration is often
   restrictive (local-only or peer-authenticated), and the next lesson covers exactly how to
   open it up correctly rather than carelessly

Skipping straight to step 5 without understanding steps 2–4 is exactly how "PostgreSQL
won't let me connect" support threads get started — the cluster genuinely was created and is
genuinely running, it's the authentication configuration that's blocking the connection.

## Key terms

| Term | Meaning |
|---|---|
| Cluster (PostgreSQL sense) | One server's collection of databases, created by initdb — not a failover cluster |
| initdb | The command/step that creates a new PostgreSQL data directory and system catalogs |
| Postmaster | The server process that starts after initdb has created the cluster |
| Data directory | The filesystem location holding all of a cluster's files, set by initdb's -D flag |

## Check yourself

Why is `initdb` a conceptually distinct step from "installing PostgreSQL," even though
package managers often run it automatically for you?
