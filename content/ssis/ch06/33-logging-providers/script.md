# Script — Logging Providers

## Segment 1 (title)

Event handlers, from a couple lessons back, react to what happens in a
package. This lesson covers the other half of the picture: logging, which
doesn't react to anything — it just writes down what happened, so there's
something to actually look at afterward.

## Segment 2 (screenshot: configure-ssis-logs-dialog.png)

You open logging from the SSIS menu, under Logging — that opens the
Configure SSIS Logs dialog box, a configuration screen rather than a design
surface. The Containers pane on the left scopes it to a package, container,
or task; the Providers and Logs tab on the right is where you actually add
a log. Real packages almost always pair this with an event handler — the
handler alerts someone right now, and the log gives that person something
to diagnose after the alert.

## Segment 3 (screenshot: provider-and-logs-tab.png)

Pick a provider type and click Add, and SSIS ships with five: text files,
which need a File connection manager; SQL Server, which writes into the
sysssislog table through an OLE DB connection; the Windows Event Log, which
needs no connection manager at all; XML files; and SQL Server Profiler
trace files. A package can run more than one log at once, even more than
one of the same kind.

## Segment 4 (screenshot: enable-logging-tree.png)

Here's the Containers pane doing its job: the package checkbox is still
unchecked, but a child Execute SQL Task is already checked — and the dialog
itself warns you that a container needs its own checkbox enabled in the
tree view before it gets unique logging options. By default a child just
inherits its parent's configuration; click its dimmed checkbox twice to
break that inheritance and give it its own provider and event choices.

## Segment 5 (screenshot: details-tab-basic.png)

Once a provider's added, the Details tab is where you pick what actually
gets logged, scoped to whichever container is selected. Basic view, shown
here, is just a checklist of events like OnError and OnWarning with a
plain-language description of each. Advanced expands every one of those
events into the specific information categories SSIS can capture —
Computer, Operator, SourceName, MessageText, and more.

## Segment 6 (outro)

Once you've got a logging setup you're happy with, save it as an XML
template so you're not rebuilding it by hand on every package in the
project. Next lesson: checkpoints, and how to make a failed package restart
from where it actually left off instead of running the whole thing again
from scratch.
