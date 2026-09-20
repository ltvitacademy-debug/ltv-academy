# Configuring a Sharded Cluster

Lesson 25 laid out the pieces: config servers, shards, `mongos`. This lesson walks the real,
high-level sequence for standing a sharded cluster up — deploying each piece, wiring them
together, then actually sharding a collection with the shard key you chose. It's a
multi-step process with a deliberate order: the routing and metadata layers exist before any
data gets distributed across shards.

## What you'll learn

- The order pieces come up in: config server replica set, then shard replica sets, then `mongos`
- Adding shards to the cluster with `sh.addShard()`
- Enabling sharding on a database and a collection with `sh.shardCollection()`

## Step 1: the config server replica set

Config servers run as their own dedicated replica set (in modern MongoDB, always a replica
set, never a single standalone server, for the same availability reasons any other replica
set exists). Each config server `mongod` starts with `--configsvr`:

```
mongod --configsvr --replSet configReplSet --port 27019 --dbpath /data/config
```

Once the members are up, it's initiated with `rs.initiate()` just like any other replica set.

## Step 2: the shard replica sets

Each shard is itself deployed as a normal replica set — the same `rs.initiate()`/`rs.add()`
flow from Lesson 24, just run once per shard, each shard's `mongod` instances started with
`--shardsvr` instead of `--configsvr`.

## Step 3: mongos, then adding shards

With config servers and shard replica sets running, `mongos` is started pointing at the
config server replica set:

```
mongos --configdb configReplSet/cfg1:27019,cfg2:27019,cfg3:27019
```

Connected to `mongos`, each shard replica set is registered with the cluster:

```javascript
sh.addShard("shardReplSet1/shard1a:27018,shard1b:27018,shard1c:27018")
sh.addShard("shardReplSet2/shard2a:27018,shard2b:27018,shard2c:27018")
```

## Step 4: enabling sharding and applying the shard key

Sharding is enabled per database, then a specific collection is sharded with the shard key
chosen in Lesson 25:

```javascript
sh.enableSharding("appdb")
sh.shardCollection("appdb.orders", { customerId: "hashed" })
```

From this point, `mongos` and the config servers manage splitting and migrating chunks of
data across shards automatically as data volume grows and shifts — a DBA's job becomes
monitoring balance and chunk migration health, not manually moving data.

## Key terms

| Term | Meaning |
|---|---|
| `--configsvr` | mongod startup flag marking an instance as a config server replica set member |
| `--shardsvr` | mongod startup flag marking an instance as a shard replica set member |
| `sh.addShard()` | Registers a shard's replica set with a running sharded cluster |
| `sh.shardCollection()` | Enables sharding on a specific collection using a given shard key |

## Check yourself

Why does the config server layer need to be deployed as a replica set, and why is it brought
up before the shards are added to the cluster?
