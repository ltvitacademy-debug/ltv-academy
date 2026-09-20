# Oracle Net Services & Listener Configuration

A SQL Server DBA is used to connections mostly resolving through the OS — a named instance,
maybe the SQL Server Browser service, and TCP/IP handles the rest. Oracle's connection model is
structurally different: every connection is explicitly mediated by a named process, the
**Oracle Net Listener**, and two plain-text configuration files that describe how a client finds
a database and how the server advertises it.

## What you'll learn

- What Oracle Net Services is, at a conceptual level
- The role of the listener process and its config file, `listener.ora`
- The role of the client-side config file, `tnsnames.ora`
- How a connection actually flows from client to instance

## Oracle Net: the network layer between client and database

**Oracle Net** (the modern name for what used to be called SQL*Net) is Oracle's networking
layer — the software that carries a client's connection request to a database server and carries
result data back. It sits underneath every tool this course covers: SQL*Plus, SQL Developer, and
any application driver, all rely on Oracle Net to actually reach a database.

## The listener: a process, and a config file

The **Oracle Net Listener** is a background process (the executable is `tnslsnr`) that runs on
the database server and listens on a network port — by default, port **1521** — for incoming
connection requests. When a request arrives, the listener hands it off to the appropriate
instance so a session can be established.

The listener's own configuration lives in **`listener.ora`**, a plain-text file on the server
defining the listener's name, the protocol and port it listens on, and (optionally) the services
it knows about. In practice, a running instance's `PMON` process **dynamically registers** its
services with the listener automatically, so a static entry in `listener.ora` often isn't even
required for the listener to know a database exists.

## The client side: `tnsnames.ora`

On the client side, **`tnsnames.ora`** maps a short, memorable **net service name** (an alias)
to a full connect descriptor — the host, port, and the specific service name to request. That's
what lets a client run:

```
sqlplus hr@orclpdb
```

instead of typing out a full host/port/service string every time. The client reads
`tnsnames.ora`, resolves `orclpdb` to a connect descriptor, and Oracle Net uses that to reach the
listener on the target server.

## The connection flow, end to end

1. A client (SQL*Plus, SQL Developer, an application) requests a connection using a net service
   name, e.g. `orclpdb`.
2. Oracle Net resolves that name via `tnsnames.ora`, producing a host, port, and service name.
3. The client connects to the **listener** on that host/port.
4. The listener, which already knows about the service (via dynamic registration or a static
   `listener.ora` entry), hands the connection off to the target instance.
5. The instance establishes a session for the client.

This is a genuinely different shape from SQL Server's connection model, where an explicit
"listener + two config files" pairing generally isn't something a DBA maintains by hand for
basic connectivity. In Oracle, `listener.ora` and `tnsnames.ora` are two of the first files a
DBA learns to read and troubleshoot.

## Key terms

| Term | Meaning |
|---|---|
| Oracle Net | Oracle's client-server networking layer (formerly SQL*Net) |
| Listener (`tnslsnr`) | Server-side process listening on a port (default 1521) for connection requests |
| `listener.ora` | Server-side config file defining the listener's name, protocol/port, and known services |
| `tnsnames.ora` | Client-side config file mapping a net service name to a host/port/service connect descriptor |
| Dynamic registration | PMON automatically registering an instance's services with the listener |

## Check yourself

Walk through, in order, what happens from the moment a client runs `sqlplus hr@orclpdb` to the
moment a session is established — naming the file and the process involved at each step.
