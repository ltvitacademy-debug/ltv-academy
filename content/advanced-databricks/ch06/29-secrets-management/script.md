# Script — Secrets Management

## Segment 1 (title)

A hardcoded credential isn't just insecure in the abstract — it's now a string that exists in the notebook's revision history, on anyone's screen looking at that cell, and in any copy of the code. Secret scopes exist so the value never has to appear in notebook code at all.

## Segment 2 (screenshot: creating a Key Vault-backed scope)

A Key Vault-backed scope points Databricks at a reference to the vault — its DNS name and resource ID — not a copy of any secret. The secret's value actually lives in Key Vault; Key Vault's own access policies, rotation, and audit trail govern it, and Databricks is just a consumer.

## Segment 3 (code: two kinds of scope)

A Databricks-backed scope is the simplest to set up, with the value in Databricks-managed encrypted storage. A Key Vault-backed scope matters most when a secret already has to be managed by an existing enterprise process — rotation, access reviews — so it's governed once, in one place, instead of duplicated into a second system.

## Segment 4 (code: referencing a secret, redaction)

dbutils.secrets.get() returns the real value to your code, because the connection genuinely needs it to work. But Databricks automatically redacts a known secret value if it shows up in notebook output, so an accidental print doesn't leak it onto the screen — a safety net, not a substitute for keeping it out of the code text in the first place.

## Segment 5 (outro)

Two scope types, one rule either way: the value never lives as literal text in your code. Next up: tying audit logs, lineage, and access control together into a real compliance story.
