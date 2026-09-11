# Lesson 39 — Package Configurations

**Chapter 7 · Advanced SSIS Patterns · Lesson 39 of 49**

## What you'll learn

- Why a package that works perfectly on your machine can break the
  moment it's deployed somewhere else
- **Package Configurations** — the legacy mechanism for updating package
  properties at run time, and the five places a configuration can live
- The **Package Configuration Wizard** workflow, end to end
- How configurations relate to the parameters you already learned in
  Chapter 5, and which one to reach for today

## The deployment problem

Every package you've built in this course points at *something* —
a connection string, a file path, a folder to watch. Those values are
almost always right for your development machine and almost always
wrong the moment the package moves to a test server, then production.
Hard-coding them means editing the package itself at every stop along
the way, which is slow, error-prone, and exactly the kind of thing a
platform like SSIS is supposed to prevent.

**Package Configurations** are Integration Services' original answer to
this: a mechanism that lets an external source override specific package
properties — a connection string, a variable's value, anything exposed
as a property — every time the package starts, without touching the
package file itself.

## The five configuration types

A configuration can pull its override value from one of five places:

| Configuration type | Where the value comes from |
|---|---|
| XML configuration file | A `.dtsConfig` file on disk, pointed to directly or indirectly through an environment variable |
| Environment variable | The value of a Windows environment variable, read directly |
| Registry entry | A value stored in the Windows registry |
| Parent package variable | A variable in the package that calls this one via an Execute Package Task (Lesson 9) |
| SQL Server table | A row in a table, keyed by a configuration filter, read at package start |

The most common in practice is the **XML configuration file**, often
combined with an **indirect configuration** — an environment variable
that just holds the *path* to the actual `.dtsConfig` file, so the file's
location itself can move between environments without editing anything
inside the package.

## The Package Configuration Wizard, end to end

Configurations only apply to packages using the **Package Deployment
Model** (the legacy deployment model, as opposed to the Project
Deployment Model most new projects use — see Lesson 42). Enabling one
walks through the **Package Configuration Wizard**:

1. On the **SSIS** menu, select **Package Configurations**, then check
   **Enable Package Configurations** in the Package Configuration
   Organizer.
2. Click **Add** to launch the wizard, and choose a **Configuration
   type** — XML configuration file is the default and most common.
3. Point it at a file location (or, for an indirect configuration, an
   environment variable holding that location).
4. On **Select Properties to Export**, expand the object tree —
   Variables, Connection Managers, Tasks — and check exactly the
   properties this configuration should be allowed to override.
5. Name the configuration and finish. The wizard writes the config file
   (or registry key, or table row) immediately, using the package's
   *current* values as the starting point.

From then on, every time the package runs, Integration Services reads
that external source first and overwrites the matching properties before
a single task executes.

## Configurations vs. parameters

If Lesson 27's **Project and Package Parameters** sounded similar,
that's because they solve the same underlying problem for the newer
**Project Deployment Model**. Parameters are the modern, project-aware
replacement — they're strongly typed, validated at design time, and
managed through SSIS Catalog environments (Chapter 8) instead of loose
XML files scattered across servers. You'll see configurations mostly in
older packages built on the Package Deployment Model; anything you build
fresh on the Project Deployment Model should use parameters instead.

## Key terms

| Term | Meaning |
|---|---|
| Package Configuration | A legacy mechanism that overrides package properties from an external source at run time |
| Indirect configuration | A configuration whose location is itself supplied by an environment variable, rather than hard-coded |
| Package Deployment Model | The legacy deployment model configurations require; contrast with the Project Deployment Model |
| Package Configuration Wizard | The SSDT wizard that creates a configuration and writes its backing file/table/registry entry |
| Parameter | The Project Deployment Model's modern replacement for configurations (Lesson 27) |

## Lab

1. Take a package you've already built in this course. On the **SSIS**
   menu, open **Package Configurations** and check whether
   **Convert to Package Deployment Model** is available or greyed out —
   that tells you which deployment model the project is currently using.
2. If it's available, convert a *copy* of the project (don't touch your
   original), then run through the wizard: create an XML configuration
   that exports one connection manager's `ConnectionString` property.
3. Open the generated `.dtsConfig` file in a text editor and identify the
   `Path` attribute that ties it back to the specific property it
   overrides.

## Check yourself

You're ready for Lesson 40 when you can explain, without looking: what
problem Package Configurations solve, name at least three of the five
configuration types, and say which newer feature replaces them in the
Project Deployment Model.
