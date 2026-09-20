# Version Control for Database Objects

This chapter shifts focus from keeping a server running to managing how it *changes*.
Every lesson so far has assumed a database that's already built. Real databases don't stay
still — tables gain columns, procedures get rewritten, indexes get added — and how those
changes are tracked, tested, and deployed is its own discipline: change management.

## What you'll learn

- Why application code being in Git while the database isn't is a common, damaging gap
- How to get table, view, and stored procedure definitions into source control as scripts
- What SQL Server Data Tools (SSDT) and database projects add over plain scripts

## The one thing not in source control

Most development teams treat source control as non-negotiable for application code — nobody
ships a C# or Python change without a commit history, a diff, and a way to see who changed
what and when. The database is routinely the exception. A developer opens SSMS, alters a
stored procedure directly against production or a shared dev environment, and the only record
of that change is "it works now." There's no diff, no author, no way to reproduce the schema
from scratch, and no way to know what changed if something breaks a week later.

This matters because a database's *schema* is really just another kind of code — DDL
(`CREATE TABLE`, `CREATE PROCEDURE`, `ALTER VIEW`) is text, and text belongs in a repository
next to the application code that depends on it. Skipping this isn't a minor gap; it's the
single most common reason "which environment has the right schema?" becomes an unanswerable
question during an incident.

## Scripting objects into Git

The simplest version of database source control needs no special tooling: script every table,
view, stored procedure, and function out as `CREATE` statements (SSMS's "Generate Scripts"
wizard, or `sp_helptext` for individual procedures) and commit those `.sql` files to a Git
repository, ideally the same one the application lives in. Each schema change becomes a
commit with a message and an author, exactly like an application code change. This alone
gives you history, blame, and a rollback point — you can always check out an older commit and
see exactly what a table or procedure looked like before a given change.

The gap in the plain-scripts approach is that nothing enforces it. A DBA can still make a
live change and forget to commit the updated script, and now the repo silently drifts from
reality (Lesson 53 covers detecting that). Discipline and process — a rule that no DDL change
ships without an accompanying commit — is what actually closes the gap, not the scripting
step itself.

## SQL Server Data Tools and database projects

SQL Server Data Tools (SSDT), a free Visual Studio extension from Microsoft, formalizes this
further with a **database project**: a project type where every object (tables, views,
procedures, functions, indexes) is stored as an individual `.sql` file inside a real Visual
Studio/Git project structure, and the project as a whole represents the *intended* state of
the database's schema. Instead of a folder of loose scripts, you get a build system: SSDT can
validate that the scripts are internally consistent (a view referencing a column that got
dropped fails the build, before it ever reaches production) and compile the whole project into
a single deployable artifact called a DACPAC (data-tier application package) — the subject of
the next lesson.

The practical shift SSDT brings is that the database project, not the live database, becomes
the source of truth. Changes are made in the project, reviewed like any other code change, and
then deployed *to* the database — the reverse of scripting an ad hoc change and hoping someone
remembers to commit it afterward.

## Key terms

| Term | Meaning |
|---|---|
| Source control | A system (typically Git) tracking history, authorship, and diffs of code and scripts over time |
| DDL | Data Definition Language — `CREATE`, `ALTER`, `DROP` statements that define schema objects |
| SSDT | SQL Server Data Tools — a Visual Studio extension for building database projects |
| Database project | An SSDT project representing a database's intended schema as individual scripted files |
| DACPAC | A compiled package produced from a database project, used to deploy schema |

## Check yourself

Your team's application code is in Git, but database changes are made ad hoc in SSMS against a
shared dev server. What's the practical risk of that gap, and what's the smallest change that
would close it?
