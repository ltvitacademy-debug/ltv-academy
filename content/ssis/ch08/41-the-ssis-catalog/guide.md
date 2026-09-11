# Lesson 41 — The SSIS Catalog

**Chapter 8 · Deployment & Administration · Lesson 41 of 49**

## What you'll learn

- What the **SSISDB catalog** is, and why every project you deploy needs
  one to deploy *to*
- How the catalog actually gets created on a SQL Server instance —
  including CLR integration and the master key password it asks for
- The folder → project → environment hierarchy you'll see under
  **Integration Services Catalogs** in Object Explorer
- Where catalog-wide settings like encryption and version retention live

## From SSDT to the catalog

Back in Lesson 3 you learned that SSIS splits cleanly into design time
and run time. Every package you've built so far in this course has lived
entirely at design time — inside SSDT, on your own machine, with no
server involved until you deliberately deploy. **The SSISDB catalog is
that run-time destination.** It's a real database, named `SSISDB`,
hosted inside an actual instance of the SQL Server Database Engine —
not a separate service, not a special edition, just a database with a
purpose-built schema and a UI on top of it in SSMS.

Once a project is deployed there, the catalog becomes the single place
where that project's packages, parameters, environments, permissions,
and full execution history all live. Everything from Lesson 42 onward
in this chapter — deploying, environments, scheduling, monitoring —
assumes the catalog already exists.

## Creating the SSISDB catalog

SQL Server does not create the catalog automatically when you install
Integration Services — you create it once per instance, the first time
you need to deploy something to it. In SQL Server Management Studio:

1. Connect to the SQL Server Database Engine, then in Object Explorer
   right-click **Integration Services Catalogs** and select
   **Create Catalog**.
2. Select **Enable CLR Integration**. This isn't optional — the catalog
   is implemented with CLR stored procedures, so CLR integration has to
   be turned on at the instance level for the catalog to work at all.
3. Optionally select **Enable automatic execution of Integration
   Services stored procedure at SQL Server startup**. This runs
   `catalog.startup` every time the instance restarts, which repairs the
   status of any package executions that were left "running" when the
   server went down.
4. Enter a **password** and click **OK**. This password protects the
   database master key SSISDB uses to encrypt sensitive parameter and
   connection manager values — save it somewhere secure, because you'll
   need it (or a backup of the master key) to recover the catalog onto a
   different instance.

That's it — SQL Server creates the `SSISDB` database, and a new
**Integration Services Catalogs** node appears in Object Explorer with
it nested underneath.

## What's inside SSISDB

![Object Explorer with the Integration Services Catalogs node expanded, showing SSISDB nested beneath it, and SQL Server Agent listed just below the catalog node.](/courses/ssis/ch08/41-the-ssis-catalog/ssisdb-catalog-object-explorer.png)
*SSISDB appears under Integration Services Catalogs the moment the catalog is created.*

Expand `SSISDB` and everything else in this chapter lives inside a
**folder** — a folder is the unit of organization (and of permissions:
you can grant `MANAGE_OBJECT_PERMISSIONS` at the folder level without
handing someone `ssis_admin`). Each folder contains two kinds of
objects:

- **Projects** — the deployed `.ispac` files, each containing one or
  more packages plus their parameters
- **Environments** — named containers of variables that packages can be
  configured to pull runtime values from at execution time (Lesson 43)

Right-click `SSISDB` itself and open **Properties** to see the
**Catalog Properties** dialog — the catalog-wide settings that apply to
every folder and project underneath it: the **Encryption Algorithm**
used for sensitive values (AES_256 by default), whether operations data
and old project versions get cleaned up automatically, and the
**Retention Period** for both.

## Key terms

| Term | Meaning |
|---|---|
| SSISDB catalog | The database that stores deployed projects, packages, parameters, environments, and execution history |
| Create Catalog | The Object Explorer action that provisions SSISDB on an instance for the first time |
| CLR integration | A SQL Server feature the catalog requires — its stored procedures are implemented in .NET |
| Master key password | Protects the database master key SSISDB uses to encrypt sensitive catalog data |
| Folder | The organizational unit inside SSISDB that holds one or more projects and environments |
| Catalog Properties | The dialog (right-click SSISDB) that sets encryption, version retention, and cleanup behavior |

## Lab

1. On a SQL Server instance with Integration Services installed, open
   SSMS and check Object Explorer for an **Integration Services
   Catalogs** node. If `SSISDB` isn't there yet, create it now using the
   steps above — use a test or development instance, since creating the
   catalog needs sysadmin rights.
2. Right-click `SSISDB` and open **Properties**. Note the current
   **Encryption Algorithm**, **Retention Period (days)**, and
   **Maximum Number of Versions per Project** values.
3. Right-click `SSISDB`, select **Create Folder**, and name it after
   this course (something like `LTV Academy`). You'll deploy into this
   folder starting next lesson.

## Check yourself

You're ready for Lesson 42 when you can explain, without looking: what
SSISDB actually is (not a service — a database), why CLR integration has
to be enabled to create it, and what a folder inside the catalog holds.
