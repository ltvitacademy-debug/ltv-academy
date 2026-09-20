# Creating & Updating Data with Cypher

`MATCH` and `RETURN` only read the graph. Real work also means writing to it: creating nodes and
relationships, updating properties, and removing data cleanly. Cypher gives you `CREATE` for
unconditional inserts, `MERGE` for create-if-not-exists logic, `SET` for updates, and
`DELETE`/`DETACH DELETE` for removal — and the differences between them matter more than they
first appear.

## What you'll learn

- Creating nodes and relationships with `CREATE`
- `MERGE` — Cypher's create-if-not-exists pattern, and why it isn't just "upsert"
- Updating properties with `SET`
- Removing nodes and relationships with `DELETE` and `DETACH DELETE`

## CREATE: unconditional inserts

`CREATE` always inserts a new node or relationship, with no check for whether an equivalent one
already exists — it's the closest analog to a plain T-SQL `INSERT`:

```
CREATE (p:Person {name: 'Dana Okafor', hireYear: 2023})
```

You can create a node and a relationship to an existing node in the same statement:

```
MATCH (c:Company {name: 'Northwind Traders'})
CREATE (p:Person {name: 'Marcus Lee', hireYear: 2024})-[:WORKS_AT]->(c)
```

The risk with `CREATE` is exactly what you'd expect from an unconditional insert: run that
statement twice and you get two `Marcus Lee` nodes, both pointing at Northwind Traders. Cypher
has no unique constraint enforcing this unless you explicitly create one — which is precisely
the gap `MERGE` is built to close.

## MERGE: create-if-not-exists

`MERGE` is Cypher's most distinctive write clause, and it has no single clean T-SQL equivalent.
It searches for a pattern matching the given specification; if found, it behaves like `MATCH`
and binds to the existing data; if not found, it behaves like `CREATE` and inserts it:

```
MERGE (p:Person {name: 'Marcus Lee'})
RETURN p
```

Run that twice and you get exactly one `Marcus Lee` node both times — the second run finds the
node `MERGE` created the first time and just binds to it. This makes `MERGE` genuinely closer to
a T-SQL `MERGE`/`UPSERT` pattern, but the comparison it uses is the *entire pattern* you specify,
not just a primary key you declare separately. `MERGE (p:Person {name: 'Marcus Lee', hireYear:
2024})` and `MERGE (p:Person {name: 'Marcus Lee'})` are different patterns — the first will
create a second node if a `Marcus Lee` with a different `hireYear` already exists, because as far
as `MERGE` is concerned, the properties are part of what defines "the same node."

`MERGE` also supports `ON CREATE SET` and `ON MATCH SET` to run different updates depending on
which branch fired:

```
MERGE (p:Person {name: 'Marcus Lee'})
ON CREATE SET p.hireYear = 2024, p.createdAt = timestamp()
ON MATCH SET p.lastSeenAt = timestamp()
```

`MERGE` is also the standard way to safely create relationships without duplicating them —
`MERGE (p)-[:WORKS_AT]->(c)` won't create a second `WORKS_AT` edge between the same two nodes if
one already exists.

## SET: updating properties

`SET` updates properties on an already-matched node or relationship — the Cypher equivalent of a
T-SQL `UPDATE ... SET`:

```
MATCH (p:Person {name: 'Marcus Lee'})
SET p.title = 'Senior Analyst', p.promotedYear = 2026
```

`SET` can also add a label (`SET p:Manager`) or overwrite every property on a node at once by
assigning a map (`SET p = {name: 'Marcus Lee', title: 'Senior Analyst'}` — note this *replaces*
all existing properties, unlike `SET p += {...}`, which merges the map in and leaves other
properties untouched).

## DELETE and DETACH DELETE

`DELETE` removes nodes or relationships that have already been matched — but Neo4j will refuse
to `DELETE` a node that still has relationships attached, to avoid leaving a dangling edge:

```
MATCH (p:Person {name: 'Marcus Lee'})-[r:WORKS_AT]->(:Company)
DELETE r
```

To delete a node along with every relationship attached to it in one step, use `DETACH DELETE`:

```
MATCH (p:Person {name: 'Marcus Lee'})
DETACH DELETE p
```

`DETACH DELETE` is the practical default for removing a node entirely — it's the Cypher
equivalent of the cascading delete behavior a relational DBA would otherwise have to configure
explicitly with `ON DELETE CASCADE` foreign keys.

## Key terms

| Term | Meaning |
|---|---|
| CREATE | Unconditionally inserts a new node or relationship, even if an equivalent one exists |
| MERGE | Matches an existing pattern if present, otherwise creates it — Cypher's create-if-not-exists |
| ON CREATE SET / ON MATCH SET | Branch-specific updates run only on the create or match path of a MERGE |
| SET | Updates properties or adds a label on an already-matched node/relationship |
| DELETE / DETACH DELETE | Removes matched nodes/relationships; DETACH DELETE also removes all attached relationships |

## Check yourself

Why does running `CREATE (p:Person {name: 'Marcus Lee'})` twice produce two separate nodes, while
running `MERGE (p:Person {name: 'Marcus Lee'})` twice produces only one?
