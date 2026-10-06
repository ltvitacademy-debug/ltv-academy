# Deployment: Change Sets and Environments

**Chapter 4 · Delivering Applications · Lesson 21 of 24**

Everything built in this course so far has almost certainly been built directly in one org. A real application doesn't ship that way — it moves through a chain of environments, tested at each stage, before it ever touches the data people's jobs depend on.

## What you'll learn

- Sandbox types and what each is actually for
- Change sets: the declarative, org-to-org deployment tool
- Outbound vs. inbound, and the steps of a real deployment
- Where change sets stop being enough, and what replaces them

## Sandbox types

- **Developer** — a small copy of metadata only (no data), for one person's active build work
- **Developer Pro** — same, more storage, for a bigger individual or small-team build
- **Partial Copy** — metadata plus a sampled subset of data, good for realistic QA without a full copy
- **Full** — a complete copy of metadata *and* data, used for staging, performance testing, and final UAT before production

A typical path: build and unit-test in a Developer or Developer Pro sandbox, move to a Partial Copy or Full sandbox for QA/UAT with realistic data, then deploy to production.

## Change sets: the declarative deployment tool

A change set moves metadata — objects, fields, validation rules, flows, page layouts, profiles, and more — between two **connected** orgs (a sandbox and its production org, or two sandboxes on the same Salesforce instance family). It does not move records of actual business data, only configuration.

- **Outbound change set** — created in the org you're logged into (the source), listing the components to send
- **Inbound change set** — the same change set, received and listed in the target org, where someone with deploy permission validates and uploads it

A change set run through its real lifecycle:

1. In the source org, create an **Outbound Change Set**, name it, and add components (plus their **dependencies** — a Flow that references a custom field needs that field added too, or the deployment fails validation)
2. **Upload** it to the connected target org
3. In the target org, open **Inbound Change Sets**, review the contents
4. **Validate** (a dry run that checks for errors without deploying) or **Deploy**, optionally running Apex tests as part of the process
5. Once uploaded, the change set is **closed** — its components can't be edited further; to resend updated components, **clone** it

## Change set limits, and what replaces them

Change sets only move between orgs that are already connected (typically sandbox-to-production within the same org's sandbox family) — they can't deploy to an unrelated org, can't be tracked in version control, and don't give you a diff or rollback history beyond what Setup shows. For teams that need source control, code review, CI/CD pipelines, or deployment to orgs outside that connected family (including scratch orgs), the standard replacement is **Salesforce CLI (sf / sfdx) with the Metadata API**, deploying from a version-controlled project — the same components, moved by a repeatable, scriptable, auditable process instead of a point-and-click list.

## Deployment best practices

- **Validate before deploying** to production, and read every warning, not just errors
- Deploy during **low-usage windows**, since some deployments can briefly affect performance or lock records
- Keep an **environment strategy** on paper: which sandbox is for what, and the order components move through them, so "where does this change go next" is never a guess
- Never test or demo directly in production — that's what sandboxes are for

## SQL mapping

A change set is closer to a schema migration script (`ALTER TABLE`, `CREATE INDEX`) bundled with its dependent objects, applied to a target database — except Salesforce tracks and validates dependencies for you instead of leaving it to migration-ordering discipline.

## Recap

Sandboxes range from metadata-only Developer orgs to full data-and-metadata copies for UAT. Change sets move metadata (never records) between connected orgs through an outbound/inbound cycle with validation before deploy. They're the right tool for straightforward org-to-org promotion; version-controlled CLI deployment takes over once a team needs code review, CI/CD, or orgs change sets can't reach. Next: making sure the application people actually use, once it's live.

## Check yourself

A validation rule references a new custom field that doesn't exist yet in production. You add only the validation rule to an outbound change set and upload it. What happens, and why does the dependency step matter?
