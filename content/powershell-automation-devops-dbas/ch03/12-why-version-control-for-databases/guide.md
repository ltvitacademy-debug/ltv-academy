# Why Version Control for Databases

The SQL Server DBA course already touched this idea from an operations angle — back up
your scripts, keep a change log, don't rely on memory. This lesson goes deeper, into the
actual Git workflow: what it means, concretely, to put database objects under real source
control the same way application code has been for decades, and why so many shops still
haven't done it.

## What you'll learn

- The anti-pattern this lesson is named against: the database as the one thing nobody put
  in source control
- What Git actually gives you once database code lives there — history, blame, and a review
  gate before production
- What actually belongs in the repository (object definitions) versus what never does (data)

## The anti-pattern: the one thing not in source control

Walk into almost any shop that has fully embraced source control for its application code,
and you'll often still find the database treated differently. The C# or Python lives in
Git, goes through pull requests, gets tagged at every release. The database is a live
server that DBAs and developers connect to directly and change with ad hoc `ALTER TABLE`
and `CREATE PROCEDURE` statements run straight against production, or promoted by hand from
dev to test to prod. The "source of truth" for the schema is whatever the production
server currently looks like — not a file anyone can read without connecting to it.

This happens for understandable reasons: databases feel different from code. A stored
procedure looks like a script, not a "file," and it's genuinely faster in the moment to
right-click and edit it in a query tool than to edit a `.sql` file, commit it, and deploy it
through a pipeline. But the cost of that shortcut compounds. Nobody can say with confidence
what changed between last month and now without diffing two live servers. Nobody can say
who changed a given procedure, or why, without asking around. And there's no gate — no code
review — between an idea and a change hitting production.

## What Git actually gives you

Once stored procedures, views, functions, table definitions, and other database objects
live in a Git repository as `.sql` files, the same mechanics that make Git valuable for
application code apply directly:

- **History.** `git log` on a file shows every commit that ever touched that object, in
  order, with commit messages explaining why.
- **Blame.** `git blame usp_GetOrderTotals.sql` shows exactly which commit introduced each
  line still in the file today — invaluable when a procedure starts behaving oddly and you
  need to know what changed and when.
- **Rollback to any point in history.** `git checkout` or `git revert` against an old
  commit gets you back the exact prior version of an object, not a best guess reconstructed
  from memory or an old backup.
- **A review gate before production.** A pull request against a database change means a
  second set of eyes looks at it — and can say no — before it's deployed, the same as any
  other code change.

```text
git log --oneline -- sql/procedures/usp_GetOrderTotals.sql
a1b2c3d  Fix rounding in usp_GetOrderTotals discount calc
9f8e7d6  Add @IncludeTax parameter to usp_GetOrderTotals
1234abc  Initial version of usp_GetOrderTotals
```

## What goes in, and what never does

Source control for a database means the object **definitions** — the scripts that create
tables, views, stored procedures, functions, indexes, and constraints. It does not mean the
data. Committing rows of customer data into Git is both impractical (Git isn't built to
diff or store large row-oriented data efficiently) and often a compliance problem. What you
version is the *shape and logic* of the database: the CREATE scripts, not the contents of
the tables those scripts create. Lesson 14 goes into exactly how those object scripts get
organized file by file.

## Key terms

| Term | Meaning |
|---|---|
| Source of truth | The single authoritative version of a schema — a repository, not a live server, once databases are under source control |
| `git blame` | Shows which commit last changed each line of a file, and by whom |
| `git log` | Shows the commit history for a file or repository |
| Pull request (PR) | A proposed change reviewed by someone else before it merges — the review gate this lesson describes |

## Check yourself

A team says "we don't need Git for our database, we already keep a change log in a shared
spreadsheet." What can Git actually tell you that a manually maintained spreadsheet change
log can't, and why does that matter the first time a procedure breaks in production at
2 a.m.?
