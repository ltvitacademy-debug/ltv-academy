# Lesson 23 — Purview Integration With Fabric

**Chapter 5 · Governed Analytics · Lesson 23 of 25**

## What you'll learn

- Why Fabric's own OneLake catalog isn't the end of the governance story
- Registering a Fabric tenant as a scanned data source in Microsoft Purview
- The real authentication choice — a managed identity versus a service principal — and why it matters
- Scheduling the scan that actually keeps the picture current

## One more catalog, on purpose

Lesson 17 covered the OneLake catalog — real, useful, and scoped to Fabric. But most organizations running Fabric also run a SQL Server, an Azure Data Lake outside OneLake, maybe a Snowflake account. None of those show up in the OneLake catalog. **Microsoft Purview** is Microsoft's separate, enterprise-wide catalog — and connecting Fabric to it means Fabric's lakehouses, warehouses, and semantic models sit in the *same* catalog as everything else the organization governs, not a Fabric-only island.

## Registering the tenant as a scanned source

Setting this up happens from the Purview side: register the Fabric tenant as a data source, then configure a scan against it.

![A "Scan ContosoFabric" dialog in Purview, with fields for scan name, a Personal workspaces Include/Exclude toggle, integration runtime, and a Credential dropdown open showing options including "Microsoft Purview MSI (system)" and "Cred-SPN" under Service principal.](/courses/microsoft-fabric-data-governance/ch05/23-purview-integration-with-fabric/fabric-scan-setup-same-tenant.png)

*Configuring a Fabric scan in Purview — name, whether to include personal workspaces, and which credential authenticates the scan.*

Two details matter here. First, **Personal workspaces** has its own include/exclude toggle — a governance decision in its own right, since a personal workspace is exactly the kind of ungoverned space Chapter 1 and Chapter 2 spent real time on. Second, the **Credential** dropdown is where the scan's authentication actually gets decided.

## The authentication choice

When Purview and Fabric sit in the **same tenant**, the simplest credential is **Microsoft Purview MSI (system)** — Purview's own managed identity, already visible selected in the dropdown above. No secrets to manage. For a cross-tenant setup, or when an organization wants a narrower, auditable identity instead of Purview's own, the alternative is a dedicated **service principal**.

![An Azure "Register an application" page, with Name field filled in as "contoso-spn", account-type radio buttons, and an optional Redirect URI field.](/courses/microsoft-fabric-data-governance/ch05/23-purview-integration-with-fabric/fabric-scan-app-registration.png)

*Registering a dedicated app in Azure AD — the first step toward a service-principal credential instead of Purview's own managed identity.*

That registered app then needs the right **API permissions** granted before it can actually read Fabric's metadata:

![An Azure AD "Configured permissions" page for a registered app, listing Microsoft Graph permissions "openid" and "User.Read," both Delegated, with a "Grant admin consent" link.](/courses/microsoft-fabric-data-governance/ch05/23-purview-integration-with-fabric/fabric-scan-spn-api-permissions.png)

*Least-privilege in practice: the scan's identity gets exactly the API permissions it needs, granted and auditable — not a standing admin account.*

This is the same least-privilege instinct Chapter 3's item permissions applied at the Fabric level, now applied to the account doing the scanning itself.

## Scheduling the scan

A one-time scan goes stale the moment anyone adds a new lakehouse. The last step sets how often the scan actually runs:

![A "Set a scan trigger" dialog with two radio options, Recurring and Once, with Once currently selected, and a note that the first scan is always a full scan while subsequent scans are incremental.](/courses/microsoft-fabric-data-governance/ch05/23-purview-integration-with-fabric/scan-trigger.png)

*Once for a first pass, Recurring to keep Purview's picture of the Fabric estate from drifting out of date.*

The first scan is always a full scan; every one after that is incremental — the same cost discipline that should look familiar from any metadata lifecycle discussion: capture it once in full, then only track what actually changed.

## Key terms

| Term | Meaning |
|---|---|
| Microsoft Purview | Microsoft's enterprise-wide catalog, spanning Fabric and non-Fabric sources alike |
| Scan | The process that reads a registered source's metadata into Purview's catalog |
| Microsoft Purview MSI | Purview's own managed identity — the simplest same-tenant scan credential |
| Service principal | A dedicated, narrower identity for the scan, needed for cross-tenant setups or tighter auditing |
| Scan trigger | Once for a single pass, Recurring to keep the catalog current automatically |

## Lab

If your organization (or a hypothetical one) runs Fabric alongside a non-Fabric source like an on-prem SQL Server, sketch the two credential options for scanning the Fabric tenant into Purview: Purview's own managed identity, or a dedicated service principal. Write one sentence for each saying which one your organization should actually use, and why — same-tenant simplicity, or a narrower, more auditable identity.

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: why does an organization running Fabric alongside other data platforms need Purview's catalog in addition to the OneLake catalog from Lesson 17?
