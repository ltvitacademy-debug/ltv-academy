# Lesson 15 — Sensitive Data Governance

**Chapter 3 · Fine-Grained Security · Lesson 15 of 25**

## What you'll learn

- What Databricks Data Classification actually does, and why it exists
- The real enable-and-scan workflow in Catalog Explorer
- How to read the results page: detected columns, auto-tagging status, unmasked access
- How a detection turns into an enforced policy
- Where classification results live as a queryable system table

## The problem classification solves

A catalog can hold thousands of tables nobody has manually reviewed for sensitive content. **Databricks Data Classification** addresses that by running an agentic AI system that scans tables in Unity Catalog, detects columns likely to contain sensitive data — email addresses, government IDs, credit card numbers — and tags them with the governed `class.*` tags introduced in Lesson 14 (`class.email_address`, `class.us_ssn`, `class.credit_card`, and more). Scanning is incremental: once a catalog is enabled, new or changed data is picked up automatically, typically within 24 hours.

## Turning it on

Classification is enabled per catalog (or per schema within a catalog, for finer control over what gets scanned), from the catalog's **Details** tab.

![Data Classification settings dialog, with a toggle switch enabled and a dropdown set to 'All selected and future schemas', showing a checklist of schemas including 'model_test', 'on_demand', and 'online_feature_store_example' all checked.](/courses/databricks-unity-catalog-governance/ch03/15-sensitive-data-governance/data-classification-enablement.png)
*Turning on classification for a catalog — "All selected and future schemas" means new schemas get scanned automatically, with no one needing to remember to add them.*

This creates a background job that incrementally scans every table in scope. You can trigger a full re-scan manually at any time, which re-evaluates every table and applies any newly configured classes — useful right after adding a custom classifier.

## Reading the results

The results page lists every classification type detected across a catalog (or across all catalogs, from the metastore-wide view), with four numbers that matter for governance: how many columns were detected, whether auto-tagging is active, which compliance frameworks that classification maps to, and — critically — what percentage of users accessed that data **unmasked** in the last 7 days.

![Data Classification results page in Catalog Explorer, listing classified tags including 'location' and 'email_address' with detected-column counts, Active/Inactive auto-tagging status, compliance-framework icons, and '100% unmasked' access figures for each row.](/courses/databricks-unity-catalog-governance/ch03/15-sensitive-data-governance/data-classification-results-page.png)
*118 classified tags detected across this catalog — the "Unmasked user access" column is the number governance teams actually watch.*

That last column is the whole point: detection alone doesn't protect anything. A classification with "100% unmasked" access and no active policy is a column everyone can see in the clear — it's been found, but nothing is enforcing anything yet.

## Reviewing a specific detection

Clicking **Review** on any classified tag opens a detail panel with the detections themselves — which columns, on which tables, with a timeline of when each was first detected and (if you have permission) a sample of the actual values found.

![Detail panel for the 'class.location' tag showing a 'Detections over time' bar chart and a table of detected columns — 'address', 'country_code', and 'state' — each with a sample value like '350 Fifth Ave' or 'US'.](/courses/databricks-unity-catalog-governance/ch03/15-sensitive-data-governance/data-classification-detected.png)
*Sample values confirm the detection is correct before you act on it — exactly what a reviewer needs before enabling auto-tagging or building a policy.*

If a detection is wrong, you exclude it here — that removes the tag, stops it from being reapplied, and feeds back into the model's future accuracy.

## From detection to enforcement

Classification alone only tags; it doesn't restrict access. The intended next step is the ABAC policy from Lesson 14, built directly off the detected tag:

```sql
-- Mask every column classification tagged as an email address or phone number,
-- across the whole catalog, for everyone except a compliance group
CREATE POLICY confidential_contact_info
ON CATALOG main
COLUMN MASK mask_contact_info
TO `account users` EXCEPT `compliance team`
FOR TABLES
MATCH COLUMNS has_tag("class.email_address") OR has_tag("class.phone_number") AS contact_col
ON COLUMN contact_col;
```

Results are also queryable directly, which is how a governance team tracks coverage over time without opening the UI:

```sql
SELECT catalog_name, classification_tag, COUNT(DISTINCT full_column_name) AS detected_columns
FROM system.data_classification.results
WHERE is_tagged = false
GROUP BY catalog_name, classification_tag
ORDER BY detected_columns DESC;
```

`system.data_classification.results` holds every detection across the metastore, including sample values — access to it is restricted to account admins by default, since the table itself contains sensitive data.

## Key terms

| Term | Meaning |
|---|---|
| Data Classification | An agentic AI system that scans Unity Catalog tables and tags sensitive columns automatically |
| Auto-tagging | Whether a detected classification is actively applying its `class.*` tag (Active) or only detecting (Inactive) |
| Unmasked user access | The percentage of users who accessed a classification's data without any mask applied, in the last 7 days |
| `system.data_classification.results` | The system table storing every classification detection across the metastore |

## Lab

Walk through, in writing, the full pipeline for a hypothetical `customers.email` column: how Data Classification would detect and tag it, what the results page would show before any policy exists, and the ABAC policy you'd write to actually mask it.

## Check yourself

Without looking back: what does a classification with "100% unmasked access" and "Inactive" auto-tagging actually tell a governance team, and what two things are still missing before that data is protected?
