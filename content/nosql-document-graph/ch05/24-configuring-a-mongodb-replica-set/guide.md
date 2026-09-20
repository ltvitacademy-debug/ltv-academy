# Configuring a MongoDB Replica Set

Lesson 23 covered why a replica set exists — automatic failover backed by the oplog. This
lesson covers the real, high-level mechanics of standing one up: starting each `mongod` with
replication enabled, initiating the set, and adding members. None of this is exotic if
you've configured SQL Server Always On availability groups — the commands are different, but
the sequence (bring up the nodes, join them into a set, verify the topology) is the same
kind of work.

## What you'll learn

- Starting `mongod` instances configured to belong to a replica set
- Initiating a replica set with `rs.initiate()`
- Adding members with `rs.add()` and checking status with `rs.status()`

## Starting mongod with a replica set name

Each member of a future replica set is started as an ordinary `mongod` process, but with a
`--replSet` flag naming the set it will belong to:

```
mongod --replSet "rs0" --port 27017 --dbpath /data/rs0-0 --bind_ip localhost,<hostname>
```

Every intended member is started this way, each pointed at its own data directory, before
any of them know about each other. At this stage each `mongod` is running standalone and
waiting to be told it's part of a set.

## Initiating the set

From a `mongosh` session connected to the node you want as the initial primary, `rs.initiate()`
creates the replica set configuration and starts it running with that one member:

```javascript
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "mongo1:27017" }
  ]
})
```

At this point the single member becomes primary by default — a one-member replica set is a
valid (if not fault-tolerant) starting state, useful for confirming the basic configuration
works before adding real redundancy.

## Adding members

Additional nodes join with `rs.add()`, called against the current primary:

```javascript
rs.add("mongo2:27017")
rs.add("mongo3:27017")
```

Each new member starts in `STARTUP2` state while it performs an initial sync — copying the
existing data set before it can begin tailing the oplog like any other secondary. `rs.status()`
reports each member's state, health, and how current its replication is, which is the command
you'll actually run to confirm the set is healthy rather than trusting that the `rs.add()`
call alone means the member is caught up.

## Key terms

| Term | Meaning |
|---|---|
| `--replSet` | The `mongod` startup flag naming which replica set this instance belongs to |
| `rs.initiate()` | mongosh command that creates and starts a new replica set configuration |
| `rs.add()` | mongosh command that adds a new member to an existing, already-initiated replica set |
| Initial sync | The process a newly added member performs to copy the full existing data set before tailing the oplog |

## Check yourself

Why does a newly added replica set member start in `STARTUP2` state rather than immediately
becoming a fully caught-up secondary, and which command would you actually run to confirm the
set is healthy after adding it?
