# Script — mongosh & CRUD Operations

## Segment 1 (title)

Every lesson so far in this chapter has been about the shape of MongoDB data. This lesson is where you actually touch it — mongosh, and the same create, read, update, delete foundation you already know, expressed in MongoDB's own syntax.

## Segment 2 (code: connect and create)

mongosh is MongoDB's current shell, replacing the deprecated legacy mongo shell. Connect, switch databases with use, and insertOne or insertMany creates documents — MongoDB creates the collection automatically on first insert.

## Segment 3 (code: read)

find takes a filter document and returns every match as a cursor; findOne returns just the first match. An empty filter returns everything in the collection, the same as a bare SELECT star.

## Segment 4 (code: update and delete)

updateOne and updateMany take a filter and an update document — $set touches only the named fields, leaving the rest alone. deleteOne and deleteMany work the same way: the filter decides what's affected, so an empty filter on deleteMany is genuinely destructive.

## Segment 5 (outro)

You now have the full toolkit — documents, BSON types, embed vs. reference, and real CRUD syntax. Next up: a concrete worked example applying all of it to a real application.
