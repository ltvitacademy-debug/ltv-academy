# Lesson 43 — Environments & Environment Variables

**Chapter 8 · Deployment & Administration · Lesson 43 of 49**

## What you'll learn

- What a **server environment** is, and the specific problem it solves:
  running the same deployed project with different runtime values
- How to create an environment and add **environment variables** to it
  in SSMS
- How to add an **environment reference** to a project, then map a
  parameter or connection manager property to one of those variables
- The one hard rule: a single execution can only pull from **one**
  environment

## The problem: one project, three servers

A project deployed to SSISDB is one fixed thing — one set of packages,
one set of parameters with their default values. But you rarely want
to run it identically everywhere. The connection string that's correct
in development is wrong in production; a file path on a test server
isn't the file path on the real one. Hard-coding those differences into
the project itself, or maintaining three near-identical copies of it,
defeats the whole point of deploying once. **Environments** solve this:
an environment is a named container of variables — think `Dev`, `Test`,
`Production` — and a parameter can be told to pull its actual value from
whichever environment is active for a given execution, instead of using
its fixed default.

This isn't a real screenshot lesson — the Environment Properties and
project Configure dialogs don't currently have official screenshots
published on Microsoft Learn, so the steps below are the exact,
documented procedure instead of a claimed image.

## Creating an environment and its variables

1. In Object Explorer, expand your folder under **SSISDB** and locate
   the **Environments** folder.
2. Right-click **Environments** and select **Create Environment**.
   Give it a name — `Production`, for example — and click **OK**.
3. Right-click the new environment and select **Properties** to open
   **Environment Properties**.
4. On the **Variables** page, add a variable: pick its **Type**, give
   it an optional **Description**, enter its **Value**, and check
   **Sensitive** if the value shouldn't display in plain text (SSISDB
   encrypts sensitive values the same way it encrypts sensitive
   parameters).
5. Click **OK** to save.

The variable's name doesn't need to match the parameter it will
eventually feed — you map the two together in the next step.

## Mapping a parameter to an environment variable

1. Under **Projects**, right-click your deployed project and select
   **Configure**.
2. On the **References** page, click **Add**, choose the environment
   you just created, and click **OK** — this is the **environment
   reference** that makes the environment available to this project.
3. Right-click the project again and select **Configure**.
4. On the **Parameters** page's **Parameters** tab, click the browse
   button next to a parameter's **Value** field, select **Use
   environment variable**, and pick the variable to map it to.
5. Repeat on the **Connection Managers** tab to map a connection
   manager property (like a server name) the same way.
6. Click **OK** to save.

From this point on, every execution that specifies this environment
reference pulls that parameter's value from the environment variable
instead of the parameter's fixed default — and a `Dev` reference and a
`Production` reference can point completely different values at the
exact same parameter.

## The one rule that matters

**A single package execution can reference only one environment.** If
a project has references to both `Dev` and `Production`, you (or the
SQL Server Agent job step in Lesson 44) pick exactly one of them when
you start that execution. You cannot mix variables from two
environments in a single run — this is the guardrail that keeps
"production run accidentally used the dev connection string" from being
even possible by accident.

## Key terms

| Term | Meaning |
|---|---|
| Environment | A named container of variables in the SSISDB catalog (e.g. Dev, Test, Production) |
| Environment variable | A typed value inside an environment, optionally marked Sensitive |
| Environment reference | The link from a project to an environment, added on the project's References page |
| Use environment variable | The option that maps a parameter or connection manager property to an environment variable's value |
| One-environment rule | A single execution can pull values from only one referenced environment, never a mix |

## Lab

1. In your folder from Lesson 41, create two environments: `Dev` and
   `Production`.
2. Add the same-named variable (for example, `TargetServer`, type
   String) to both, with a different value in each.
3. On the project you deployed in Lesson 42, add references to both
   environments, then map one connection manager property to
   `TargetServer` on the Connection Managers tab.

## Check yourself

You're ready for Lesson 44 when you can explain, without looking: what
an environment reference actually does, and why a single execution can
never pull values from two environments at once.
