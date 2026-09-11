# Script — What Is SSIS?

## Segment 1 (title)

Welcome to SQL Server Integration Services — SSIS for short. This is the
tool this entire course is built around, so before we touch a single
task, let's get clear on what it actually is and why it exists.

## Segment 2 (screenshot: designer-and-toolbox)

Every business runs on data that starts out somewhere inconvenient — a
CRM, a folder of CSV exports, a partner's FTP server — and has to get
extracted, transformed, and loaded somewhere useful. That's ETL, and SSIS
is Microsoft's platform for doing it at an enterprise level, entirely
inside SQL Server.

This is SSIS Designer, the graphical tool you'll live in for this whole
course, built into SQL Server Data Tools. On the left is the Toolbox,
grouped into categories like Favorites, Common, and Containers — every
task you'll drag onto a package lives here. Across the top are five tabs
— Control Flow, Data Flow, Parameters, Event Handlers, and Package
Explorer — each one a different surface for building a different part
of your package. And along the bottom, Connection Managers, where every
package defines how it actually connects to the outside world.

## Segment 3 (steps: two engines)

Underneath all of that sit two completely separate engines, and getting
this distinction straight now will save you confusion for the rest of
this course. The control flow engine is the run-time engine — it manages
the order things happen in: which task runs first, what happens if
something fails, how logging and variables behave across the whole
package. The data flow engine is different — it's a specialized,
high-performance engine whose only job is moving and transforming actual
rows of data, from a source into a destination. You'll spend Chapter 2
in control flow, and Chapter 3 onward in data flow — but every real
package needs both, because control flow is what decides when a data
flow actually runs.

## Segment 4 (outro)

If you've already worked through T-SQL, think of it this way: T-SQL is
how you query and shape data once it's already sitting in a table. SSIS
is how that data gets into the table in the first place. Next lesson, we
install SQL Server Data Tools and set up your very first Integration
Services project.
