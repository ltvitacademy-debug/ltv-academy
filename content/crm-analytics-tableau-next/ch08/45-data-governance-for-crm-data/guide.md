# Data Governance for CRM Data

Salesforce is full of personal data: names, emails, phone numbers, deal values, support cases. Inside Salesforce, that data sits behind profiles, sharing rules, and field-level security. The moment you copy it into a warehouse or a CRM Analytics dataset, those controls stop following it. This lesson is about governing the data itself, wherever copies of it live.

## What you'll learn

- Why copying CRM data changes your risk
- How to classify fields and decide what to replicate
- Practical techniques: minimization, masking, and access separation
- How to handle retention and deletion requests

## Copies escape the CRM's controls

Salesforce's sharing model and field-level security protect data inside Salesforce. A warehouse table has none of that. It has whatever access your data platform grants, and it will be queried by people and tools you never considered. CRM Analytics datasets have their own controls, which earlier lessons covered, but they are a separate system to keep aligned.

The lesson for an analyst: every pipeline you build creates a new place personal data can leak from, so decisions about what to copy and who can read it are governance decisions, not just engineering ones.

## Classify before you copy

Start by knowing what you have. Salesforce lets admins record classification details on fields, such as who owns the data, how sensitive it is, and which compliance category applies, using data classification metadata. Check what your org has filled in, because it's a valuable starting inventory. If nobody has classified fields, the first governance task is to do it for the objects you plan to replicate.

A simple scheme works: public, internal, confidential, and restricted. Government IDs, health details, and financial account numbers usually land in the top tier. Your legal and security teams, not the analytics team, should define what each tier requires.

## Minimize: replicate only what you need

The safest personal data is data you never copied. When you set up an ingestion job, select specific objects and fields instead of syncing everything. Ask of each sensitive field, "which dashboard needs this?" If the honest answer is "none," leave it out. Analytics rarely needs a phone number or a free-text notes field, and those are exactly the columns that carry risk.

## Mask and separate

When a sensitive field is useful in aggregate but not in the clear, transform it in your staging layer. This is illustrative dbt-style SQL:

```sql
select
  id as contact_id,
  md5(email) as email_hash,
  left(postal_code, 3) as postal_area
from {{ source('sfdc', 'contact') }}
```

A hashed email still lets you count distinct people and join datasets, without exposing addresses. Choose masking methods your security team approves, since simple hashing has known weaknesses for guessable values.

Then separate access. Put restricted columns in separate tables or schemas with tighter permissions, and expose only the masked version to general analysts and dashboards. Apply the same thinking to CRM Analytics datasets, and exclude sensitive fields from datasets that many people can open.

## Retention and deletion requests

Data shouldn't be kept forever by default. Define how long each class of data stays in the warehouse and in analytics datasets, and automate the cleanup. Privacy laws in many places give individuals the right to have personal data erased. If a customer's record is deleted or anonymized in Salesforce, that change must reach every copy: the warehouse tables, dbt models, CRM Analytics datasets, and exported files. As you saw in the sync lesson, incremental pipelines can miss deletes, so build a tested erasure path instead of hoping. What your obligations actually are is a question for your legal team.

## Stewardship and lineage

Name a **data steward** for each major object, someone who answers questions about what a field means, who may use it, and when it changes. Pair that with lineage: for any dashboard number, you should be able to trace it back through the dataset, the dbt model, the ingestion job, and the Salesforce field. When something goes wrong, lineage tells you where to look and which downstream assets to fix.

## Recap

Copies of CRM data escape Salesforce's controls, so classify fields, replicate the minimum, mask and separate sensitive columns, define retention, propagate deletions everywhere, and assign stewards.

## Check yourself

A customer requests erasure. List every place in your stack their data might still exist after it is deleted in Salesforce.
