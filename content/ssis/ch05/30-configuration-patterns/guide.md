# Lesson 30 — Configuration Patterns

**Chapter 5 · Variables, Parameters & Expressions · Lesson 30 of 49**

## What you'll learn

- Why a package's runtime behavior needs to change between dev, test, and
  production — without editing the package itself
- The legacy pattern: **package configurations**, tied to the Package
  Deployment Model
- The current pattern: **parameters** plus **SSISDB environments**, tied
  to the Project Deployment Model this whole course assumes
- Which pattern you should actually reach for, and why

## The problem every one of these patterns solves

A package built in Chapter 1 through Chapter 4 has one specific server
name, one specific file path, one specific connection string baked in at
design time. That's fine on your machine. It's a problem the moment that
same package needs to run against a test server, then production, without
you opening SSDT and hand-editing values every single time you promote it.
Every pattern in this lesson exists to answer the same question:
**where does the "right" value for this environment actually come from,
and how does the package pick it up automatically?**

## Pattern one: package configurations (legacy)

Before the Project Deployment Model existed, SSIS solved this with
**package configurations** — one configuration entry maps to one property
on the package (often a variable's Value, which a property expression
then propagates elsewhere). Configurations get applied to the package the
moment it starts running, before anything else evaluates.

- **XML configuration file** — the most common configuration type; a
  flat XML file sitting next to the package on disk, edited outside SSDT
  entirely, one per environment.
- **SQL Server table** — configuration values stored in a database table
  instead of a file, useful when many packages across a server need to
  share the same configuration source.
- **Environment variable** — reads a single value from a Windows
  environment variable on the machine running the package.

Microsoft's own guidance is direct: **if you're deploying with the
Package Deployment Model, use configurations — don't use parameters,**
because parameters aren't invoked at all under that deployment model, and
a package built with project parameters can outright fail to execute
under it.

## Pattern two: parameters + SSISDB environments (current)

The **Project Deployment Model** — what every package in this course
targets — replaces configurations with parameters (Lesson 27) plus a
server-side concept: the **SSISDB environment**.

1. **Deploy the project** to the SSISDB catalog on the Integration
   Services server.
2. **Create an environment** in the catalog — for example, `DEV`, `TEST`,
   and `PROD` as three separate environments.
3. **Add environment variables** to each environment — the actual
   per-environment values, like a connection string that's different in
   `TEST` than in `PROD`.
4. **Create an environment reference** linking the deployed project to
   one specific environment.
5. **Map each project or package parameter** to an environment variable
   in that referenced environment, so the parameter's **server value**
   (Lesson 27) resolves from whichever environment the project currently
   references.

Because the environment reference — not the package itself — decides
which environment's values apply, promoting a project from `TEST` to
`PROD` becomes a server-side administrative change: re-point the
reference, nothing about the deployed project changes.

## Which one should you actually use?

If you're building anything new — which is every package in this course
— use the **Project Deployment Model**: parameters and environments.
Package configurations exist in this lesson so you can recognize them
when you inherit an older package built under the legacy model, and so
you understand *why* Microsoft's own conversion tooling — the
**Integration Services Project Conversion Wizard** — exists: it takes a
configuration-based package and generates equivalent parameters from it
when you migrate to the newer model.

## Key terms

| Term | Meaning |
|---|---|
| Package configuration | A legacy, Package-Deployment-Model mechanism that assigns a value to one package property at package start |
| SSISDB environment | A named, server-side collection of environment variables in the SSISDB catalog (e.g. DEV, TEST, PROD) |
| Environment variable (SSISDB) | One named value inside an environment — not a Windows OS environment variable |
| Environment reference | The link between a deployed project and one specific SSISDB environment, controlling which values its parameters resolve to |
| Integration Services Project Conversion Wizard | The tool that migrates a configuration-based package to parameters under the Project Deployment Model |

## Lab

Using SSMS against the Integration Services server hosting your labs:

1. In Object Explorer, under **Integration Services Catalogs → SSISDB**,
   right-click a folder and create two environments: `DEV` and `TEST`.
2. In each environment, add an environment variable named
   `SourceFolder`, giving it a different literal string value in `DEV`
   versus `TEST`.
3. Deploy a project containing the `SourceFolder` project parameter from
   Lesson 27's lab, then create an environment reference from that
   project to `DEV`.
4. In the **Configure** dialog for the deployed project, map the
   `SourceFolder` parameter to the `SourceFolder` environment variable,
   and confirm the resolved server value matches `DEV`'s value. Re-point
   the reference to `TEST` and confirm the resolved value changes with
   it — no redeployment required.

## Check yourself

Chapter 5 is complete when you can explain, without looking: why does
Microsoft recommend package configurations instead of parameters under
the Package Deployment Model, and what server-side object actually
decides which set of values a deployed project's parameters resolve to?
