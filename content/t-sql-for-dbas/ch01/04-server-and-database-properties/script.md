# Script — Server & Database Properties

## Segment 1 (title)

Before you diagnose a problem, you need to know what you're diagnosing — which edition, which patch level, which recovery model. SERVERPROPERTY and DATABASEPROPERTYEX answer those questions in T-SQL, without opening a single GUI dialog.

## Segment 2 (code: SERVERPROPERTY)

SERVERPROPERTY takes a property name as a string and returns a single value. Edition tells you Standard versus Enterprise versus Developer, which matters because features like online index rebuild differ by edition. ProductVersion and ProductLevel tell you the exact build — the first thing to check when a known bug might be in play.

## Segment 3 (code: DATABASEPROPERTYEX)

DATABASEPROPERTYEX takes a database name and a property name. Recovery Model determines whether you can do point-in-time restores. IsAutoClose and IsAutoShrink, when turned on, are two of the most common "why is this database slow" root causes on smaller instances.

## Segment 4 (steps: what each answers)

Three quick checks cover most incidents: Edition and ProductVersion from SERVERPROPERTY tell you what you're running, Recovery Model from DATABASEPROPERTYEX tells you your restore options, and IsAutoClose tells you if the database is tearing itself down every time it goes idle.

## Segment 5 (outro)

Between SERVERPROPERTY and DATABASEPROPERTYEX, you can answer nearly every "what is this server configured to do" question without a GUI. Next up: sessions and connections — who's actually connected right now.
