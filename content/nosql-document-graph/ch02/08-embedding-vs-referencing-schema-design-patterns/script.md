# Script — Embedding vs. Referencing: Schema Design Patterns

## Segment 1 (title)

This lesson is where the flexibility of a schema-less document turns into the single most consequential decision in MongoDB schema design: for any relationship, do you embed, or do you reference?

## Segment 2 (code: embedding)

Embedding nests related data as a sub-document or array inside the parent. Reading the post and its comments together takes one query, not two — and because a single-document write in MongoDB is atomic, adding a comment is one atomic update.

## Segment 3 (code: referencing)

Referencing stores the related document's ObjectId as a field, the same role a foreign key plays. Getting both pieces of data takes a second query from the application, or a single $lookup aggregation stage — MongoDB's server-side join.

## Segment 4 (steps: guidance for choosing)

Embed for one-to-few relationships that are almost always read together. Reference for one-to-many or many-to-many, large or unbounded data, or data that changes frequently on its own. Most real schemas do both.

## Segment 5 (outro)

That's the theory. Next up: mongosh and real CRUD syntax, so you can actually build documents shaped this way.
