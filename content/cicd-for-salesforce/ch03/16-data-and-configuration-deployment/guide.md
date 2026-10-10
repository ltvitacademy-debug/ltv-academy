# Lesson 16 — Data and Configuration Deployment

**Chapter 3 · Operating Pipelines · Lesson 16 of 19**

## What you'll learn

- Why "deploy the metadata" and "move the data" are two genuinely different problems in Salesforce
- Custom Metadata Types and Custom Settings — configuration that deploys *as* metadata, unlike ordinary records
- The real `sf data` commands for moving actual record data in and out of an org
- Where each of these fits into a pipeline you'd actually run

## Metadata deploys; records don't

Every CLI command this course has covered so far — `sf project deploy start`, `sf project deploy validate`, the delta tooling in Lesson 10 — moves **metadata**: the structural definitions of objects, fields, Apex, Flows. None of it moves **records** — the actual rows of data sitting in Account, Contact, or any custom object. A pipeline that deploys a new required field to production does nothing to populate that field on the million existing Account records already there; that's a separate, deliberate data operation, not something a metadata deploy does as a side effect.

## Configuration that is metadata

Not everything that looks like "data" actually is, in this sense. Salesforce has two mechanisms specifically designed to behave like configuration that travels with metadata deployments rather than like records that don't:

- **Custom Metadata Types** — defined like a custom object, but their records are themselves metadata. A Custom Metadata Type record created in a sandbox and included in a deployment's manifest deploys to the target org along with everything else, which is exactly why Custom Metadata Types are the standard place to put configuration values (API endpoints, feature-flag toggles, business rule thresholds) that need to move between environments automatically.
- **Custom Settings** — an older mechanism serving a similar purpose (org-wide or hierarchical configuration values), though Salesforce's newer guidance generally favors Custom Metadata Types for new work.

The practical rule: if a value needs to exist identically across every sandbox and production without anyone manually re-entering it after each deploy, it probably belongs in a Custom Metadata Type, not as an ordinary custom object record.

## Moving actual records

For everything that is genuinely record data — sample accounts for a QA sandbox, a reference dataset a test suite depends on — the Salesforce CLI's data commands handle import and export separately from any metadata deploy:

```bash
sf data export tree \
  --query "SELECT Id, Name, Industry FROM Account WHERE CreatedDate = TODAY" \
  --output-dir data-export \
  --target-org source-org

sf data import tree \
  --files data-export/Account.json \
  --target-org target-sandbox
```

`sf data export tree` and `sf data import tree` work with Salesforce's tree-structured JSON format, which preserves relationships between parent and child records (an Account exported with its related Contacts keeps that link on import) — something a flat CSV export can't represent on its own. For bulk volumes or more complex ETL-style data movement, `sf data` also wraps the Bulk API; pick the tree commands for small, relationship-aware reference datasets and the Bulk API path for genuinely large volumes.

## Where this fits in a pipeline

A metadata deploy and a data load are triggered by different events and run at different points. A new Custom Metadata Type definition and its configuration records travel together in the same deploy step from Lessons 7–10, with no special handling. A seed dataset for a freshly-created scratch org or QA sandbox (Lesson 17 covers scratch orgs more directly) typically runs as a separate pipeline step, after the metadata deploy that creates the objects those records depend on — you can't import an Account record into an org that doesn't have the Account fields your dataset expects yet.

## Key terms

| Term | Meaning |
|---|---|
| Record data | Actual rows in an object (Account, Contact, custom objects) — not moved by a metadata deploy |
| Custom Metadata Type | A custom-object-like type whose records are themselves deployable metadata |
| Custom Settings | An older org-wide/hierarchical configuration mechanism, largely superseded by Custom Metadata Types |
| `sf data export tree` / `sf data import tree` | CLI commands moving relationship-aware record data as JSON |

## Lab

For a pipeline deploying a new "Discount Threshold" business rule value that must be identical across every sandbox and production: decide whether it belongs in a Custom Metadata Type or as an ordinary custom object record, and justify your answer. Then write the two `sf data` commands you'd use to export a small reference dataset of 20 test Accounts (with their related Contacts) from one sandbox and import it into a freshly refreshed one.

## Check yourself

Can you explain, concretely, why deploying a new required field to production doesn't populate that field on existing records? Can you explain why Custom Metadata Type records deploy differently from ordinary custom object records?
