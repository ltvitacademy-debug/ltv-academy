# Script — Schema Inference & Evolution

## Segment 1 (title)

Lesson 32 mentioned schema inference and evolution in one line. It never named the actual modes that control what happens when a new column shows up mid-stream. That's this lesson.

## Segment 2 (code: the four modes)

Add new columns is the default and updates the table going forward. Rescue never fails a batch, routing new columns straight into rescued data instead. Fail on new columns stops the stream entirely rather than silently changing schema. None ignores the change and drops the new data.

## Segment 3 (code: the rescued data column)

Every table Auto Loader writes to carries a rescued data column by default — a JSON string holding any field that didn't fit the current schema. Nothing is lost, it's quarantined until someone decides whether it deserves its own schema change.

## Segment 4 (code: schema hints)

Inference is a best guess from sample files, and it can get a column's type wrong. Schema hints pin specific columns to a type you already know is correct, without hand-writing the entire schema yourself.

## Segment 5 (outro)

Four modes, one rescue column, one override option — the real depth behind Lesson 32's single sentence. Next up: file notification mode, and the real cost of directory listing at scale.
