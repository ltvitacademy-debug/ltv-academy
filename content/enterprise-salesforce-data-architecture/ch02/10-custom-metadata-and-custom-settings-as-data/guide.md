# Lesson 10 — Custom Metadata and Custom Settings as Data

**Chapter 2 · Data Storage and Scale · Lesson 10 of 26**

## What you'll learn

- Why Custom Metadata Types and Custom Settings aren't "real" data in the sense the rest of this chapter means
- The deployment difference that actually drives which one you pick
- How reads against each behave differently from reads against standard or custom object records
- A decision rule for choosing between them, grounded in who changes the values and how often

## Configuration, not business data

Everything else in this chapter — storage limits, Big Objects, External Objects — concerns genuine business records: accounts, transactions, events. **Custom Metadata Types** and **Custom Settings** exist for a different purpose: storing *configuration* that application logic reads to decide how to behave — feature toggles, integration endpoint mappings, business-rule thresholds, region-specific settings. They look like custom objects (you define fields, you can query them), but an architect who treats them like ordinary data objects will design the wrong deployment and maintenance process around them.

## The deployment difference is the real difference

The single most consequential distinction between the two is how their *values* move between environments:

- **Custom Metadata Types** are packaged and deployable. Their records move between sandboxes and production through change sets, the Metadata API, and managed or unmanaged packages, the same way the object's own definition does. This makes them the right fit for configuration that should be *identical* across environments as part of a controlled release — an integration endpoint mapping that must match what was tested in staging, a business-rule threshold that a release should carry forward deliberately.
- **Custom Settings** data does *not* travel with a deployment. When you deploy an app that includes a custom setting, the setting's definition deploys, but its records are left behind in the target org. Custom Settings are built for values an admin sets and changes *directly in each org*, including production, without needing a deployment cycle to change a number — a regional feature flag, an admin-tunable limit, a per-profile default.

Get this backwards and you'll either ship a change set that silently wipes out production's carefully-tuned Custom Setting values, or build an integration mapping as a Custom Setting and discover every sandbox refresh needs the values re-entered by hand because they never deployed with anything.

## Other differences that follow from that one

A few more distinctions matter in practice, and they mostly make sense once you internalize the deployment split above:

| Dimension | Custom Metadata Type | Custom Setting |
|---|---|---|
| Changing a value in Apex | Not directly — records aren't created or updated via DML; changes go through deployment or the Metadata API | Can be inserted/updated directly via Apex DML, no deployment needed |
| Relationships to other objects | Supports metadata relationship fields (lookups to other Custom Metadata Types) | Does not support relationship fields |
| Hierarchy behavior | No hierarchy concept | Hierarchy-type settings resolve a value per user, profile, or org default — useful for cascading overrides |
| SOQL governor-limit treatment | Queries against Custom Metadata records are not counted against the org's SOQL query governor limits | Ordinary object-query governor limits apply as usual |
| Visibility in Apex tests | Visible in test classes without needing `SeeAllData` | Organization-wide default custom setting records are not automatically visible the same way |

The hierarchy behavior deserves a second look: a Hierarchy Custom Setting can define an org-wide default, then let specific profiles or specific users override it, and Salesforce resolves "which value applies to this running user" automatically. That's a genuinely useful pattern for things like "default discount percentage" that should vary by sales role without anyone writing conditional Apex to figure out which value wins.

## Choosing between them

A clean decision rule: ask who changes the value, and how it should behave across environments.

- If the value should be **identical everywhere after a controlled release**, and changing it should go through the same review process as a code change — reach for a **Custom Metadata Type**.
- If the value should be **tunable live, in production, by an admin, per org/profile/user**, without waiting on a deployment — reach for a **Custom Setting**.

A common real-world pattern combines both: a Custom Metadata Type defines the structural mapping (which integration endpoint belongs to which record type, deployed and reviewed like code), while a Hierarchy Custom Setting holds the one or two values an admin legitimately needs to flip in production without filing a change request — like temporarily disabling an integration while a vendor has an outage.

## Key terms

| Term | Meaning |
|---|---|
| Custom Metadata Type | A deployable, metadata-like configuration object whose records move between orgs through packages/Metadata API |
| Custom Setting | A configuration object whose values are edited directly per org and do not move with deployments |
| Hierarchy Custom Setting | A Custom Setting type that resolves a value by cascading from org default down to profile or user-specific overrides |
| Metadata relationship field | A lookup-style field connecting one Custom Metadata Type record to another |
| Governor limit exemption | The rule that SOQL queries against Custom Metadata records don't count toward the org's query governor limits |

## Lab

A multinational retailer needs two configuration values: (1) a mapping of which regional tax-calculation service endpoint to call for each of 40 country codes — set once by the integration team, tested in a sandbox, and promoted to production as part of the same release; and (2) an "emergency bypass" flag that lets the on-call admin instantly disable a misbehaving country's tax integration in production, in the middle of an incident, without waiting for a deployment window. Identify which configuration mechanism fits each requirement and justify both choices using the deployment-behavior reasoning from this lesson — then explain why using the wrong mechanism for the bypass flag specifically would make the incident worse, not just inconvenient.

## Check yourself

Can you explain, without looking back at the table, which of the two mechanisms deploys its data between orgs and which leaves its data behind? Can you describe a real configuration value from a system you know, and argue which mechanism it belongs in?
