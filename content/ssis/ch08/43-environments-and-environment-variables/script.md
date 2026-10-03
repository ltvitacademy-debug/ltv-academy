# Script — Environments & Environment Variables

## Segment 1 (title)

A project deployed to SSISDB is one fixed thing — but you almost never
want it to run identically everywhere. This lesson is about
environments: how one deployed project runs with different values in
dev, test, and production, without maintaining three separate copies
of it.

## Segment 2 (screenshot: create-environment-dialog.png)

It starts here, in Object Explorer: right-click the Environments
folder under your folder in SSISDB, choose Create Environment, and
name it — something like Production. That's it. An environment doesn't
need anything else yet; it's just a named container waiting for
variables.

## Segment 3 (screenshot: environment-properties-variables.png)

Open that environment's Properties, go to the Variables page, and add
one: a name, a Type, a Value, and Sensitive if it's something like a
password — SSISDB encrypts that the same way it encrypts sensitive
parameters. The variable's name doesn't have to match a parameter yet;
that connection happens next.

## Segment 4 (screenshot: configure-references-browse-environments.png)

To actually use the environment, a project needs a reference to it.
Right-click the project, select Configure, go to the References page,
click Add, and pick the environment from this browser. Once it's
added, you flip back to the Parameters page and map an individual
parameter's Value field to Use environment variable, choosing which
one feeds it — and here's the rule that matters: even if a project
references multiple environments, a single execution can only pull
from one of them. No accidentally mixing a dev variable and a
production variable in the same run.

## Segment 5 (steps: the one rule)

A project can reference several environments at once — Dev, Test, and
Production can all be wired up. But every single execution picks
exactly one. There's no such thing as a run that's half dev, half
production.

## Segment 6 (outro)

Once a package can be pointed at the right environment, the last piece
is getting it to run without you clicking anything — that's SQL Server
Agent, and that's next lesson.
