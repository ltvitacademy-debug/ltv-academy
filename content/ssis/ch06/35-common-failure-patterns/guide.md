# Lesson 35 — Common Failure Patterns

**Chapter 6 · Error Handling & Logging · Lesson 35 of 49**

## What you'll learn

- How to sort a package failure into one of four recurring categories
  before you start digging
- What each category tends to look like in the error message and where to
  actually look first
- How this chapter's four tools — event handlers, error outputs, logging,
  and checkpoints — map onto each category
- Why "just rerun it" is a diagnosis, not a fix

## This chapter's tools, tied together

Chapter 6 gave you four separate mechanisms: event handlers react to a
failure, error outputs redirect a single bad row, logging providers record
what happened, and checkpoints let you restart without starting over. This
lesson doesn't add a new mechanism — it's the synthesis lesson, sorting
real-world failures into the categories you'll actually see, and pointing
each one back at the right tool from this chapter.

## Category 1 — Connection failures

The package can't reach something it depends on: a database server that's
down, a UNC file share that's unreachable, an FTP site that's timed out, a
firewall rule that changed. These usually surface fast, right at the start
of a task, with an error message naming the connection manager itself
("Login timeout expired," "Cannot open the datafile").

- **Look first** at the connection manager, not the transformation logic
  downstream of it — if the connection never opened, nothing past it is the
  real problem.
- **Chapter 6 tools**: an OnError event handler is the right response here
  (alert someone immediately), and checkpoints matter a lot if the failing
  connection sits task four of ten — you don't want to redo the first
  three on retry.

## Category 2 — Data type mismatches

A column that's `varchar` in the source but the destination expects
`int`. A date string in a format SSIS can't parse. These show up mid-data
flow, often with "conversion failed" or a truncation message naming a
specific column.

- **Look first** at the Data Conversion or Derived Column transformations
  around the failing column, and check the metadata (right-click a path,
  **View Data**) at the point closest to the failure.
- **Chapter 6 tools**: this is exactly what error outputs (Lesson 32) are
  for — redirect the bad rows instead of failing the whole load, and
  capture ErrorCode/ErrorColumn so you can see which rows and which column
  broke.

## Category 3 — Permission issues

The package runs fine in SSDT under your own login, then fails the moment
it's deployed and run by the SQL Server Agent service account or the SSIS
Catalog's proxy account. Errors mention access denied on a file path, or a
login that can't reach a linked server.

- **Look first** at *which account* actually executed the package — it's
  almost never the account you tested with.
- **Chapter 6 tools**: logging (Lesson 33) with the **Operator** and
  **SourceName** categories turned on is what actually tells you which
  account and which step failed, instead of guessing.

## Category 4 — Downstream/dependency failures

The package itself runs fine, but something it depends on — a stored
procedure it calls, a source system's overnight batch job, a file that
hasn't landed yet — isn't ready or has changed shape. The error often looks
unrelated to your package at first glance (a missing column the source
system silently dropped, a procedure signature that changed).

- **Look first** outside your own package: has the upstream schema
  changed, did the file actually arrive, did whatever populates the source
  finish before your package started?
- **Chapter 6 tools**: an OnError handler that checks preconditions (does
  the file exist yet?) before letting the rest of the package run at all
  is a common real-world guard here.

## The pattern behind the patterns

Notice that none of these four categories are fixed by simply re-running
the package. Rerunning without changing anything just reproduces a
connection failure, a mismatch, a permission problem, or a missing
dependency a second time. "Rerun it" is only a real fix when the failure
was transient (a brief network blip) — and even then, checkpoints are what
make that rerun cheap instead of starting the whole package over.

## Key terms

| Term | Meaning |
|---|---|
| Connection failure | Package can't reach a required source, destination, or service |
| Data type mismatch | A row's value can't convert or fit the target column's type/size |
| Permission issue | The account actually running the package lacks rights the developer's account had |
| Downstream/dependency failure | A failure caused by something outside the package itself changing or not being ready |

## Lab

1. Pick one package you've built earlier in this course. For each of the
   four categories above, write one sentence describing what an actual
   failure in that category would look like *in that specific package* —
   which connection, which column, which account, which dependency.
2. For each of your four sentences, name which Chapter 6 mechanism (event
   handler, error output, logging, or checkpoint) you'd reach for first to
   diagnose or contain it.
3. Pick the category you find least likely in your package and explain why
   — this is as useful as picking the most likely one.

## Check yourself

You're ready for Chapter 7 when you can take any SSIS error message you've
never seen before and, within a few seconds, place it into one of these
four categories — connection, data type, permission, or dependency — before
you even start troubleshooting the actual message.
