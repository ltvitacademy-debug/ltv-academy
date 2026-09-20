# MongoDB Shell (mongosh) & CRUD Operations

Every lesson so far in this chapter has been about the shape of MongoDB data — the
hierarchy, BSON, embedding versus referencing. This lesson is where you actually touch
it. `mongosh` is the real, modern command-line tool for talking to MongoDB, and CRUD —
create, read, update, delete — is the same four-operation foundation you already know
from T-SQL, expressed in MongoDB's own syntax.

## What you'll learn

- What `mongosh` is, and why it replaced the legacy `mongo` shell
- Real insert syntax: `insertOne` and `insertMany`
- Real read syntax: `find` and `findOne`, with filter documents
- Real update and delete syntax: `updateOne`/`updateMany` and `deleteOne`/`deleteMany`

## mongosh: the modern MongoDB shell

`mongosh` is MongoDB's current command-line shell — a Node.js-based REPL for connecting
to a server and running commands interactively. It replaced the legacy `mongo` shell,
which MongoDB has deprecated and removed as the bundled default starting with MongoDB
6.0; `mongosh` is the tool MongoDB actively develops and recommends now, and it's also
the same embedded shell you'd reach for inside MongoDB Compass. Connecting from a
terminal, against the local server from Lesson 6, looks like:

```
mongosh "mongodb://localhost:27017"
```

Once connected, `use <databaseName>` switches (or creates, on first write) the current
database, and every CRUD command below runs against `db.<collectionName>`.

## Create: insertOne and insertMany

```
db.users.insertOne({
  name: "Dana Kim",
  email: "dana@example.com",
  signupDate: new Date()
});

db.users.insertMany([
  { name: "Sam Okafor", loyaltyTier: "gold" },
  { name: "Priya Patel", loyaltyTier: "silver" }
]);
```

`insertOne` inserts a single document; `insertMany` inserts an array of documents in one
call. Neither requires the collection to exist beforehand — MongoDB creates it
automatically on the first insert, another real consequence of the schema-less-by-default
model from Lesson 5. If you don't supply `_id`, MongoDB generates the `ObjectId`
automatically, exactly as Lesson 7 described.

## Read: find and findOne

```
db.users.find({ loyaltyTier: "gold" });

db.users.findOne({ email: "dana@example.com" });
```

`find` takes a **filter document** — a query expressed as a document itself, matching
fields to values — and returns a cursor over every matching document. `findOne` returns
just the first match, or `null` if nothing matches. An empty filter, `db.users.find({})`,
returns every document in the collection, the same as a bare `SELECT *`. (Filter operators
beyond simple equality, and projections that limit which fields come back, are the whole
subject of Lesson 11.)

## Update: updateOne and updateMany

```
db.users.updateOne(
  { email: "dana@example.com" },
  { $set: { loyaltyTier: "platinum" } }
);

db.users.updateMany(
  { loyaltyTier: "silver" },
  { $set: { promotionEligible: true } }
);
```

Both take a filter document (which documents to touch) and an update document. The
`$set` operator updates only the named fields, leaving the rest of the document
untouched — the practical default for most real updates. `updateOne` stops after the
first match; `updateMany` applies the change to every matching document.

## Delete: deleteOne and deleteMany

```
db.users.deleteOne({ email: "dana@example.com" });

db.users.deleteMany({ loyaltyTier: "bronze" });
```

Same shape again: a filter document decides what's affected, and the `One`/`Many` suffix
decides how many matching documents are removed. As with `updateMany`, `deleteMany` with
a broad or empty filter is genuinely destructive — `db.users.deleteMany({})` removes every
document in the collection, so the filter is doing real, load-bearing work here, not
optional decoration.

## Key terms

| Term | Meaning |
|---|---|
| `mongosh` | MongoDB's current command-line shell; replaced the deprecated legacy `mongo` shell |
| Filter document | A document passed to `find`/`updateOne`/`deleteOne` etc. describing which documents match |
| `$set` | An update operator that sets specific fields without touching the rest of the document |
| Cursor | What `find` returns — an iterable handle over the matching documents, not the documents themselves all at once |

## Check yourself

You run `db.users.updateOne({ email: "dana@example.com" }, { loyaltyTier: "platinum" })`
without the `$set` operator. What actually happens to the document, and why is that
different from what you probably intended?
