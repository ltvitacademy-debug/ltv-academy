# Lesson 25 — Data Sources & Loading Data

**Chapter 6 · Import Sets & Transform Maps · Lesson 25 of 34**

## What you'll learn

- What a Data Source record actually configures in ServiceNow
- The real supported source types: file upload, JDBC, FTP/SFTP, Web Service, and REST
- How "loading data" works — running an import manually versus on a schedule
- What a Scheduled Import is and when it's the right choice
- How a Data Source connects to the staging Import Set table from Lesson 24

## What a Data Source actually is

A Data Source record is where you tell ServiceNow *where* the data for an import is coming
from. It doesn't do any mapping or transformation — that's the Transform Map's job, covered in
Lesson 26. A Data Source's only responsibility is defining the connection details and format of
the external data, so that running the import correctly populates an Import Set staging table.

Every Data Source has a **Type** field that determines which connection details it asks for, and
this type is the main decision an admin makes when setting one up.

## The real supported source types

ServiceNow supports several genuinely different ways to bring data in:

- **File.** The most common type for one-off or small recurring loads. Supports CSV, Excel
  (XLSX), XML, and JSON files, either uploaded directly to the Data Source record or pulled from
  an attachment. This is the right choice for something like an HR export of new employee
  records.
- **JDBC.** A direct connection to an external relational database — SQL Server, Oracle, MySQL,
  and others — using a JDBC driver and connection string. This lets ServiceNow query another
  system's tables directly, without anyone manually exporting a file first.
- **FTP/SFTP.** Points at a file sitting on a remote FTP or SFTP server rather than one uploaded
  by hand. Useful when another system drops a file on a schedule and ServiceNow needs to pick it
  up automatically.
- **Web Service (SOAP).** Pulls data from an external SOAP web service endpoint.
- **REST / Import Set REST API.** For modern integrations, external systems can push data
  directly into a staging table through ServiceNow's REST API, or a Scripted REST API can expose
  a custom endpoint. This is the typical pattern for a system-to-system integration rather than a
  file-based load.

Picking the right type is mostly about matching how the source system already makes its data
available — you don't convert a live database feed into a CSV just to use the File type when
JDBC already does the job directly.

## Loading data: running the import

Configuring a Data Source doesn't move any data by itself — it just defines the connection.
"Loading data" means actually running the import, which reads from the source as configured and
writes rows into the Import Set staging table (the `imp_` table from Lesson 24). This can happen
two ways:

1. **Manually.** An admin opens the Data Source and runs "Load All Records" (or loads a single
   attached file) on demand. This is normal for a one-time migration or an ad hoc file drop.
2. **On a schedule, via a Scheduled Import.** For recurring loads — a nightly feed, an hourly
   sync — a Scheduled Import record ties a Data Source to a recurrence pattern (daily, hourly, a
   specific cron-like schedule) so the load happens automatically without anyone running it by
   hand.

A Scheduled Import is the right call whenever the same external source needs to feed ServiceNow
repeatedly on a predictable cadence; a manual load is right for anything that happens once or
irregularly.

## Where this fits

A Data Source answers "where does the data come from, and how do we read it." Running that
Data Source — manually or on a schedule — is what actually populates the staging table that
Lesson 24 described. Nothing about the data's *shape on the target table* is decided here; that
mapping work is entirely Lesson 26's Transform Map. Keeping these responsibilities separate is
exactly what makes the pipeline easy to troubleshoot: if data isn't landing in staging at all,
the problem is the Data Source or the schedule; if it's landing in staging but not reaching the
target table correctly, the problem is the Transform Map.

## Key terms

| Term | Meaning |
|---|---|
| Data Source | A record defining where external data comes from and how to connect to it |
| JDBC | A direct database connection type, used to pull from an external relational database |
| FTP/SFTP | A source type that reads a file from a remote server instead of a manual upload |
| Scheduled Import | A record that runs a Data Source automatically on a recurring schedule |
| Load All Records | The manual action that runs a Data Source's import on demand |

## Check yourself

A vendor drops a new CSV file on an SFTP server every night at 2 AM. Which Data Source type
should you configure, and what additional record do you need so the load happens automatically
without anyone running it by hand?
