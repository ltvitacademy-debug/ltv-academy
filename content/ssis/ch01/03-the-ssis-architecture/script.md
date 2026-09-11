# Script — The SSIS Architecture

## Segment 1 (title)

You already know SSIS has a control flow engine and a data flow engine.
Now let's zoom out and see the whole platform they sit inside — because
two more pieces matter the moment a package leaves your machine.

## Segment 2 (steps: four pieces)

Here's the full picture. The runtime engine and the data flow engine
you already know — they're active every time you validate or run a
package, whether you're still developing it or it's live in production.
Then there's the Integration Services service, a legacy Windows service
whose job is monitoring packages stored the old way, in msdb or the
file system — and Microsoft is explicit that it is not required to
create, save, or run a package. And finally the SSISDB catalog, which
isn't a separate service at all — it's a real database, hosted inside
SQL Server itself, that stores every project you deploy: its versions,
its parameters, and a full execution history you can query with T-SQL.

## Segment 3 (steps: design time vs run time)

The distinction that actually matters day to day is design time versus
run time. Design time is everything you do inside SSDT — building,
testing, and running a package right there on your own machine, no
server required at all. Run time is different: it's a project you've
deployed to the SSISDB catalog, executing in production, usually kicked
off by a SQL Server Agent job. Pressing run inside SSDT is a design-time
test — it is not the same thing as a production execution against the
catalog, and mixing those two up trips up a lot of people early on.

## Segment 4 (outro)

Four pieces, one clean split between building and running. Next lesson,
we get concrete: what a package, a project, and a solution actually
are, and how the files on disk — dtsx, dtproj, and sln — map to each
one.
