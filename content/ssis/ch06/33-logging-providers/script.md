# Script — Logging Providers

## Segment 1 (title)

Event handlers, from a couple lessons back, react to what happens in a
package. This lesson covers the other half of the picture: logging, which
doesn't react to anything — it just writes down what happened, so there's
something to actually look at afterward.

## Segment 2 (steps: five log providers)

You open logging from the SSIS menu, under Logging — that opens the
Configure SSIS Logs dialog box, a configuration screen rather than a design
surface. On the Providers and Logs tab, you pick a provider type and add
it, and a package can run more than one log at once, even more than one of
the same kind.

SSIS ships with five: text files, which need a File connection manager;
SQL Server, which writes into the sysssislog table through an OLE DB
connection; the Windows Event Log, which needs no connection manager at
all; XML files; and SQL Server Profiler trace files. Real packages almost
always pair this with an event handler — the handler alerts someone right
now, and the log gives that person something to diagnose after the alert.

## Segment 3 (steps: scoping and detail level)

Two more things matter once a provider's added. First, scope: the
Containers pane lists the package and every container and task inside it,
and by default a child is dimmed, meaning it just inherits its parent's
logging setup — click its checkbox twice to break that inheritance and give
it its own. Second, detail: the Details tab's Basic view is just a
checklist of events like OnError and OnWarning, while Advanced expands each
one into the specific information categories SSIS can capture — Computer,
Operator, SourceName, MessageText, and more.

## Segment 4 (outro)

Once you've got a logging setup you're happy with, save it as an XML
template so you're not rebuilding it by hand on every package in the
project. Next lesson: checkpoints, and how to make a failed package restart
from where it actually left off instead of running the whole thing again
from scratch.
