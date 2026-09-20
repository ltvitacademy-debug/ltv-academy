# Installing Oracle Database & Creating Your First Database

There's a distinction buried in the title of this lesson that matters: "installing Oracle
Database" and "creating a database" are two separate steps, done with two separate tools. A SQL
Server DBA who's used to a single setup wizard producing a working instance with a default
database should expect Oracle to split that into a software step and a database-creation step.

## What you'll learn

- Why installing the Oracle software and creating a database are distinct steps
- What the Oracle Universal Installer (OUI) actually does
- What the Database Configuration Assistant (DBCA) actually does
- The ordered, high-level flow from a bare machine to a running database

## Software first: the Oracle Universal Installer (OUI)

The **Oracle Universal Installer (OUI)** installs the Oracle Database *software* — the
binaries, libraries, and utilities — into a directory structure called an **Oracle Home**. At
the end of an OUI run, you have Oracle software present on the machine, capable of running a
database. You do not yet have a database. This is a deliberate separation: the same Oracle Home
can later be used to create, and run, more than one database, and upgrading the software is a
different operation from touching any particular database's data.

OUI can run interactively with a GUI, or silently from a response file for scripted,
repeatable installs — the second mode is how most real organizations install Oracle at scale,
since a manual GUI click-through doesn't reproduce reliably across many servers.

## Then a database: the Database Configuration Assistant (DBCA)

Once the software is in place, the **Database Configuration Assistant (DBCA)** is the tool that
actually creates a database. DBCA is a separate wizard, run after OUI, and it's where you decide
things like:

- Whether to create a Container Database (CDB) with one or more Pluggable Databases (PDBs) —
  the default, and generally recommended, approach today
- The database's character set, memory allocation, and storage locations for datafiles
- Whether the new database's service gets registered with the Oracle Net Listener automatically

DBCA can also be run non-interactively from a template or response file, exactly like OUI, for
the same scripted-install reasons.

## The ordered flow, high level

Put together, standing up a fresh Oracle database from nothing looks like this:

1. **Meet the prerequisites** — supported OS, adequate memory/swap/disk, any OS-level packages
   or kernel parameters Oracle's documentation calls for.
2. **Run OUI** — install the Oracle Database software into an Oracle Home. No database exists
   yet.
3. **Run DBCA** — create a CDB (with at least one PDB), choosing memory, storage, and character
   set settings.
4. **Verify** — connect with SQL*Plus (covered in Lesson 11) to confirm the instance is up and
   the database is open.

This course's lab environment (Lesson 5) uses a prebuilt Oracle Database Free container image,
which has already run this flow for you inside the image — but understanding these steps matters
regardless, because a real DBA job will eventually put you in front of a bare server where OUI
and DBCA are exactly what you'll run yourself.

## Key terms

| Term | Meaning |
|---|---|
| Oracle Universal Installer (OUI) | Installs the Oracle Database software into an Oracle Home |
| Oracle Home | The directory structure holding installed Oracle software |
| Database Configuration Assistant (DBCA) | Creates (or reconfigures) a database, run after OUI |
| Response file | A file of preset answers letting OUI or DBCA run non-interactively/scripted |

## Check yourself

Explain, in your own words, why "install the software" and "create the database" are handled by
two different tools in Oracle rather than one combined setup wizard — and name one practical
benefit of keeping them separate.
