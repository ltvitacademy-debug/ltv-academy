# AWS Lake Formation: Fine-Grained Permissions for the Lake

This lesson is a written case study, not a recording, researched and verified directly against the current AWS Lake Formation Developer Guide. Chapter 2 covered writing IAM policies scoped to specific S3 buckets and Glue resources — real, resource-level ARNs, not `"Resource": "*"`. Lake Formation is the layer that sits on top of IAM specifically for data lake access, and it solves a problem IAM alone genuinely cannot: granting access at the level of a single column, or a filtered subset of rows, rather than an entire table.

## What you'll learn

- Why IAM alone can grant or deny access to a whole S3 object or Glue table, but not to one column inside it
- The two real access-control methods Lake Formation supports, and which one AWS recommends
- LF-Tags — tag-based access control — and why it scales better than naming every resource in every grant
- A real, concrete walkthrough of tagging a column and granting access by tag

## What IAM alone can't do

IAM policies control access at the level of an API call against a specific resource ARN — "this role can call `s3:GetObject` on this bucket," or "this role can call `glue:GetTable` on this table." That's genuinely useful (Chapter 2 built exactly this kind of policy), but it has a real ceiling: IAM has no concept of "this role can read every column in this table except `customer_ssn`." Once a role has read access to a table, it has read access to every column and every row that table's underlying files contain — IAM's grain is too coarse for that.

**Lake Formation adds a permissions layer specifically for this** — grants that apply at the table, column, row, or cell level (cell-level combines a column filter and a row filter together), enforced across the AWS analytics services that already read from the Glue Data Catalog: Athena, Redshift Spectrum, EMR, and Glue itself.

## Two access-control methods, and the one AWS actually recommends

Lake Formation supports two real configurations, and the difference matters enough that it's worth knowing both names:

| Method | Lake Formation permissions | IAM permissions | What it means in practice |
|---|---|---|---|
| **"Open" / IAM-only** | Open (the `Super` permission is granted to all current IAM principals) | Fine-grained | This is the **default**, kept for backward compatibility with existing Glue setups. Access to Data Catalog resources and S3 locations is controlled entirely by IAM policies — Lake Formation's own fine-grained controls are effectively bypassed. |
| **Fine-grained Lake Formation / coarse-grained IAM** | Fine-grained | Coarse-grained | **This is AWS's recommended method.** IAM policies are kept broad (e.g., "this role can use Glue APIs generally"), and Lake Formation's own grants are what actually decide which specific tables, columns, and rows a principal can see. |

The practical implication: if a Lake Formation grant looks like it should be restricting a role's access to a specific column, but the role can still see everything, the first thing to check is whether the account is still running the default "Open" method — in that case, IAM access alone is what's actually governing the result, and Lake Formation's column-level grant is being silently bypassed by `Super` permission on `IAMAllowedPrincipals`.

## LF-Tags: tag-based access control

Naming every table and column explicitly in every grant works for a small number of resources, but it doesn't scale — a new table added next month needs its own explicit grant added everywhere it should be visible, for every role that should see it. **LF-Tags** solve this the same way resource tagging solves it elsewhere in AWS: tag the data once, and grant access based on the tag, not the specific resource name.

**Step 1 — create a tag:**

```bash
aws lakeformation create-lf-tag \
  --tag-key sensitivity \
  --tag-values public pii confidential
```

**Step 2 — assign the tag to a column:**

```bash
aws lakeformation add-lf-tags-to-resource \
  --resource '{"TableWithColumns":{"DatabaseName":"sales_db","Name":"orders","ColumnNames":["customer_ssn"]}}' \
  --lf-tags '[{"CatalogId":"123456789012","TagKey":"sensitivity","TagValues":["pii"]}]'
```

**Step 3 — grant a principal access based on the tag, not the specific column name:**

```bash
aws lakeformation grant-permissions \
  --principal DataLakePrincipalIdentifier=arn:aws:iam::123456789012:role/SalesAnalyst \
  --resource '{"LFTagPolicy":{"ResourceType":"TABLE","Expression":[{"TagKey":"department","TagValues":["sales"]}]}}' \
  --permissions SELECT DESCRIBE
```

The real payoff: when a new table is created next month and tagged `department=sales`, `SalesAnalyst` can query it immediately — no new grant needed, because the grant was written against the tag, not the resource. Within one tag key, multiple values are OR'd together; across different tag keys, conditions are AND'd — which is what lets a tag expression express something like "sales department AND not confidential" using two separate tag keys together.

## Tying it back to Chapter 2's least-privilege discipline

Chapter 2 built IAM roles scoped to exact resource ARNs specifically so a leaked credential's blast radius stayed narrow. Lake Formation's column and row-level grants extend that same discipline one level deeper — a role can have legitimate, broad IAM access to query a table, while still never being able to see a `customer_ssn` column its job genuinely doesn't require. The two layers aren't redundant; they answer different questions. IAM answers "can this principal call this API at all." Lake Formation answers "exactly which rows and columns can this principal's query actually return."

## Key terms

| Term | Meaning |
|---|---|
| Fine-grained access control | Permissions enforced at the table, column, row, or cell level, beyond what IAM alone can express |
| "Open" method | Lake Formation's default setting where IAM alone controls access — Lake Formation's own grants are bypassed |
| LF-Tags | Key-value tags assigned to Data Catalog resources, used to grant access by tag instead of by naming each resource |
| Cell-level permission | A grant combining both a column filter and a row filter together |

## Check yourself

A teammate writes a Lake Formation grant restricting a role to a specific column, but the role can still query every column in the table. Before assuming the grant syntax is wrong, what's the first account-level setting worth checking?
