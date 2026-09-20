# Script — Data Modeling for Real-World MongoDB Applications

## Segment 1 (title)

This lesson closes out Chapter 2 by applying everything in it — documents, BSON, embed versus reference, real CRUD — to one concrete scenario: a small blogging platform, with users, posts, and comments.

## Segment 2 (code: reference the author)

A user writes many posts, and their profile changes independently of any of them. Embedding it into every post would mean updating dozens of copies on every profile edit — exactly the one-to-many, changes-independently case that calls for a reference.

## Segment 3 (code: embed the comments)

Comments are read essentially every time the post is read — nobody loads a post without its comment thread. That's the strongest embedding signal there is, and it makes adding a comment a single atomic update with $push.

## Segment 4 (steps: the honest limit)

Embedding comments works until a post goes viral. The same 16MB ceiling and unbounded-growth flag from Lesson 8 apply. The real fix is a hybrid pattern: keep recent comments embedded for fast normal reads, and move the full history to its own collection, referenced by postId.

## Segment 5 (outro)

That's the whole document model in practice. Chapter 3 starts next: the real MongoDB query language, filters and projections.
