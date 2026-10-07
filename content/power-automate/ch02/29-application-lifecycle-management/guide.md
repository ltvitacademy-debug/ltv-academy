# Application Lifecycle Management: Dev/Test/Prod

A flow that works perfectly when you build it can still break the moment it's moved somewhere else — a connection that was never set up in the new environment, a SharePoint site ID that doesn't exist there, an approver's email hardcoded from your test run. Application Lifecycle Management, or ALM, is the discipline of moving a flow from "it works on my machine" to "it works safely in production," on purpose, every time. This lesson covers how Castlebridge Logistics does that with **solutions** and **pipelines**.

## What you'll learn

- Why flows need to be packaged into a **solution** before they can move between environments
- The standard Dev → Test → Prod environment pattern and what each environment is for
- What a **pipeline** automates, and why Castlebridge's makers don't export/import solutions by hand
- The difference between an unmanaged and a managed solution

## Why a single flow isn't enough: solutions

A flow built outside a solution lives only in the environment it was created in — there's no supported way to move it. A **solution** is a container that packages a flow (plus its connection references, environment variables, and any other components) into one deployable unit. Castlebridge's logistics-automation team builds its "Shipment Exception Alerts" flow inside a solution from day one, specifically so it can be moved later without manually rebuilding it in every environment.

## Dev, Test, Prod: three environments, three jobs

Castlebridge uses the standard three-environment pattern:

- **Development** — where a maker actively builds and iterates on the flow. Breaking things here is expected and cheap.
- **Test** (sometimes called QA) — where the solution is deployed and validated against realistic data before anyone outside the automation team touches it.
- **Production** — where dispatchers and warehouse staff actually run the flow against real shipments. Changes land here only after Test has passed.

This mirrors the environment isolation you saw in the last lesson: each stage is its own walled-off environment, so a bug caught in Test never had the chance to touch Production data in the first place.

## Pipelines: deployment without the manual steps

Moving a solution from Dev to Test to Prod by hand means exporting it, downloading the file, re-creating connections, and importing it again — repeated at every stage, by someone who has to remember every step correctly. A **pipeline** in the Power Platform Admin Center automates this: a maker in the Development environment clicks **Deploy**, and the pipeline exports the solution, validates it against the target environment, and imports it — with connections and environment variables already configured for that stage. Castlebridge's admin sets up the pipeline once, connecting Dev, Test, and Prod as stages; after that, promoting "Shipment Exception Alerts" from Test to Production is a few clicks for the maker, not a manual export/import.

## Managed vs. unmanaged solutions

A solution in active development is **unmanaged** — every component inside it is still editable. Once Castlebridge's team is confident the "Shipment Exception Alerts" flow is ready, the pipeline exports it as a **managed** solution for Test and Production: managed solutions are locked against direct editing in that environment, which is exactly what stops a well-meaning user in Production from quietly "fixing" the live flow and drifting it out of sync with Dev.

## Key terms

- **Solution** — a container that packages a flow and its related components (connections, environment variables) into one deployable unit
- **Dev / Test / Prod** — the standard three-environment pattern: build, validate, then run for real
- **Pipeline** — an automated, repeatable deployment process that moves a solution between environments without manual export/import
- **Managed solution** — a locked, non-editable version of a solution, used in Test and Production to prevent uncontrolled changes
