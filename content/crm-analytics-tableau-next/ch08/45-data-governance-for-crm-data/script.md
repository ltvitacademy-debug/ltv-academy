# Script — Data Governance for CRM Data

## Segment 1 (title)

Inside Salesforce, personal data sits behind profiles, sharing rules, and field-level security. Copy it into a warehouse, and those controls don't follow. This lesson is about governing the data itself, wherever copies live.

## Segment 2 (steps: classify, minimize, separate)

Three habits. First, classify before you copy. Salesforce admins can record data classification on fields, so check what your org has filled in, and start there. Second, minimize. Sync specific objects and fields, and ask of each sensitive column which dashboard needs it. Notes fields and phone numbers rarely earn their risk. Third, separate access, with restricted columns in tighter schemas.

## Segment 3 (code: masking)

When a sensitive field is useful in aggregate but not in the clear, transform it in staging. This illustrative dbt model hashes the email, so you can still count distinct people and join datasets, and keeps only the first characters of the postal code. Choose masking methods your security team approves, because simple hashing has weaknesses for guessable values.

## Segment 4 (steps: retention and erasure)

Define retention for each class of data, and automate cleanup. When a customer asks for erasure, deleting the record in Salesforce isn't enough. The change must reach the warehouse, dbt models, CRM Analytics datasets, and any exports. Incremental syncs can miss deletes, so build and test an erasure path. What your obligations are is a question for your legal team. Assign a steward and keep lineage, so you can trace any number back to its source field.

## Segment 5 (outro)

That completes Chapter 8. You can now secure, govern, audit, and protect CRM analytics data. Next up: Lesson 46, Capstone Kickoff, where you put it all together.
