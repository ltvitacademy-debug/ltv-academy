# Script — Connection Managers

## Segment 1 (title)

Every package eventually has to reach outside itself — a database, a
flat file, an FTP server. The thing that makes that possible is the
connection manager, and it's a little different from what its name
suggests.

## Segment 2 (screenshot: samplecontrolflow.gif)

A connection manager isn't the connection itself — it's a design-time
description of one. You set properties like the connection string while
you're building the package; Integration Services only creates the
actual physical connection when the package runs. You add one from
right here, the Connection Managers area docked along the bottom of the
Control Flow tab.

## Segment 3 (screenshot: add-connection-manager-dialog.png)

Right-click anywhere in that strip and this menu appears — pick a
common type directly, like New OLE DB Connection, or choose New
Connection to see every built-in option in one list: OLE DB, ADO.NET,
Flat File, Analysis Services, File, and more.

## Segment 4 (screenshot: ole-db-connection-editor.png)

Whichever type you pick, its own configuration editor opens. For OLE
DB, that's this: a Provider, a server name, how to authenticate, and
which database to connect to. Set it once here, at design time — the
physical connection gets created from these exact settings every time
the package actually runs.

## Segment 5 (steps: package-level vs project-level)

There are two scopes to know. Add a connection manager from inside a
package's own Connection Managers area, and it's package-level — it
only exists there. But if your project uses the project deployment
model, Solution Explorer has its own Connection Managers node at the
project level. Create one there, and it's shared across every package
in the project automatically — you'll see it show up with a "project"
prefix in each package, which is SSIS's way of telling you it isn't
locally owned. Use project-level for anything genuinely shared, like
your warehouse connection; package-level for anything specific to one
job.

## Segment 6 (outro)

Design-time description, run-time connection, two scopes to choose
from — that's connection managers. Next lesson, we put everything from
this chapter together and build your first real package from scratch,
task by task.
