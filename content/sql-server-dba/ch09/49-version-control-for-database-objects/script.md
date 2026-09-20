# Script — Version Control for Database Objects

## Segment 1 (title)

This chapter is about change management — how database changes get tracked, tested, and deployed, instead of just happening.

## Segment 2 (code: The one thing not in source control)

Application code almost always lives in Git. The database is routinely the exception — a procedure gets altered directly in SSMS with no diff, no author, and no way to reproduce the schema from scratch. DDL is just text, and text belongs in a repository.

## Segment 3 (steps: Getting it into source control)

Script every table, view, and procedure as CREATE statements and commit them to Git. SQL Server Data Tools takes this further with database projects — one file per object, that build and validate before deployment. The project becomes the source of truth, not the live database.

## Segment 4 (outro)

Once schema lives in source control, the next question is how it actually gets deployed. Next up: deployment strategies — scripted, DACPAC-based, and migration tools.
