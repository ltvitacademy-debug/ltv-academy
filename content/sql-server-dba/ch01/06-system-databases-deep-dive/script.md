# Script — System Databases, Deep Dive

## Segment 1 (title)

Every instance ships with five system databases: master, model, msdb, tempdb, and the hidden resourcedb. Each has a distinct job, and the wrong one going down can take out the whole instance.

## Segment 2 (code: The one you never back up)

resourcedb is the odd one out — hidden from sys.databases and read-only, holding all system objects physically separate from master but appearing logically in every database's sys schema. That isolation is exactly what lets an upgrade replace it cleanly without touching master or your data.

## Segment 3 (steps: The template, taken literally)

model is the literal template — CREATE DATABASE copies it rather than building from nothing. Any object you add to model appears in every new database, and any setting you change there, like recovery model or collation, becomes the default going forward.

## Segment 4 (steps: master, msdb, tempdb)

master holds instance-level metadata and won't let the instance start without it. msdb holds Agent jobs, job history, and backup and restore records. tempdb is recreated from scratch on every restart and never restored from a backup.

## Segment 5 (outro)

Next up: installation planning — the checklist a DBA works through before setup.exe ever launches.
