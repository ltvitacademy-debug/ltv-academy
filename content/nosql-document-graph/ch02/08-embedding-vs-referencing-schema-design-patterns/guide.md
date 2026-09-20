# Embedding vs. Referencing: Schema Design Patterns

Lesson 5 established that a collection doesn't enforce a schema. Lesson 7 established
that a document can hold rich, nested BSON data. This lesson is where those two facts
turn into the single most consequential decision in MongoDB schema design: for any
relationship between two pieces of data, do you **embed** one inside the other, or do you
**reference** it and query separately? Every other data-modeling lesson in this course,
starting with Lesson 10, builds on the answer you give here.

## What you'll learn

- What embedding actually means, and the real read-performance and atomicity case for it
- What referencing actually means, and why it requires a second query or a `$lookup`
- Concrete, real guidance for when each pattern fits

## Embedding: nest the related data inside one document

Embedding means storing related data as a nested sub-document or array, inside the parent
document, instead of in a separate collection:

```
{
  "_id": ObjectId("..."),
  "title": "Indexing Strategies in MongoDB",
  "author": "Dana Kim",
  "comments": [
    { "user": "Sam", "text": "Great walkthrough of compound indexes." },
    { "user": "Priya", "text": "Wish this covered TTL indexes too." }
  ]
}
```

The real case for embedding:

- **One query, one round trip.** Reading the post and its comments together needs a
  single `find`, not a `find` plus a separate lookup. For data that's almost always read
  together, this is a genuine, measurable performance win.
- **Atomic updates.** A single-document write in MongoDB is atomic. If you embed
  comments, adding one is a single atomic document update. Split across two collections,
  keeping them consistent needs more careful handling.
- **No duplication when the child data has no independent existence.** A comment that
  only ever belongs to one post doesn't need its own identity elsewhere.

The real cost: a single BSON document has a hard **16MB size limit**, and an
ever-growing embedded array (comments on a viral post, events in a long-running log) can
hit that ceiling, or at minimum make routine reads of the parent document slower as the
array grows.

## Referencing: store an ObjectId, join when you need to

Referencing means storing the related document's `_id` (usually an `ObjectId`) as a
field — the same conceptual role a foreign key plays in a relational table — and querying
it separately when you need the related data:

```
// posts collection
{ "_id": ObjectId("post1"), "title": "...", "authorId": ObjectId("user42") }

// users collection
{ "_id": ObjectId("user42"), "name": "Dana Kim", "bio": "..." }
```

Getting both pieces of data takes one of two real approaches:

- **Two queries from the application** — fetch the post, then fetch the user by
  `authorId`. Simple, and often genuinely fine.
- **A single `$lookup` aggregation stage** — MongoDB's server-side join, which combines
  documents from two collections in one query, at the cost of more aggregation work on the
  server than a plain `find`. (The full aggregation pipeline, including `$lookup`, is
  covered in Chapter 3.)

The real case for referencing: it avoids duplicating data that's shared across many
documents (one user referenced by hundreds of posts, rather than that user's profile
copied into every post), it keeps individual documents small and bounded, and it's the
better fit when the referenced data changes independently and often — updating a user's
bio once, instead of updating it inside every post that embedded a copy.

## Real guidance for choosing

There's no single rule that's right every time, but these are the genuine, commonly-cited
guidelines:

- **Embed** for **one-to-few** relationships, data that's almost always **read
  together**, and data that doesn't need an independent identity or change on its own.
- **Reference** for **one-to-many** or **many-to-many** relationships, data that's
  **large or unbounded**, data accessed independently of its parent, and data that
  **changes frequently** on its own timeline.
- These aren't mutually exclusive within one schema. A real application typically embeds
  some relationships and references others, sometimes within the very same document —
  Lesson 10 works through exactly that kind of mixed, concrete case.

## Key terms

| Term | Meaning |
|---|---|
| Embedding | Nesting related data as a sub-document/array inside the parent document |
| Referencing | Storing a related document's `_id` as a field, queried separately or joined |
| `$lookup` | An aggregation pipeline stage that performs a server-side join across collections |
| 16MB document limit | The hard maximum size of a single BSON document — a real constraint on embedding |

## Check yourself

A `products` collection has an embedded array of every review ever left on that product,
and some popular products now have tens of thousands of reviews. What's the real problem
with this design, and which pattern would fix it?
