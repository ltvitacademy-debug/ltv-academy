# Lesson 29 — Secrets Management

**Chapter 6 · Advanced Security & Governance · Lesson 29 of 34**

## What you'll learn

- Secret scopes: Databricks-managed storage vs. Azure Key Vault-backed
- Referencing a secret in code with `dbutils.secrets.get()` instead of hardcoding it
- What actually happens if you print a secret in a notebook anyway
- Why a Key Vault-backed scope hands governance to Key Vault, not to Databricks

## The problem a hardcoded credential creates

```python
# Don't do this
jdbc_password = "Cor33ct-H0rse-B@ttery-Staple"

# The credential now lives:
#  - in the notebook's revision history
#  - in anyone's screen who's looking at this cell
#  - in any copy/paste of this code into another notebook
```

A hardcoded credential isn't just "insecure" in the abstract — it's
now a string that exists in every place this notebook's text ever
gets stored, viewed, or copied. **Secret scopes** exist so the
actual value never has to appear in notebook code at all.

## Two kinds of secret scope

```text
Databricks-backed scope:
  the secret VALUE lives in Databricks-managed, encrypted storage
  simplest to set up -- good for secrets that don't need to be
  managed anywhere else

Azure Key Vault-backed scope:
  the secret VALUE actually lives in Key Vault -- Databricks
  reads it through a reference, it never stores the value itself
  Key Vault's OWN access policies, rotation, and audit trail
  govern the secret -- Databricks is just a consumer of it
```

The Key Vault-backed option matters most when a secret already has
to be managed by an existing enterprise secrets process — rotation
schedules, access reviews, audit requirements — that lives in Azure
Key Vault regardless of Databricks. Pointing a Databricks scope at
that same Key Vault means the secret is governed once, in one
place, not duplicated into a second system with its own separate
policy to keep in sync.

![Creating a secret scope backed by Azure Key Vault — providing the vault's DNS name and resource ID so Databricks reads secrets through a reference rather than storing them.](/courses/advanced-databricks/ch06/29-secrets-management/azure-kv-scope.png)

Creating this scope means giving Databricks a *reference* to the
vault (its DNS name and resource ID) — not a copy of any secret
value. Every `dbutils.secrets.get()` call against this scope reads
straight from Key Vault at that moment; there's no second
Databricks-managed copy sitting anywhere to fall out of sync with
the original.

## Referencing a secret in code

```python
jdbc_password = dbutils.secrets.get(scope="prod-db", key="jdbc-password")

# Print it anyway, out of curiosity:
print(jdbc_password)
# [REDACTED]
```

`dbutils.secrets.get()` returns the actual value to your code — the
connection itself still needs the real password to work — but
Databricks automatically redacts any known secret value if it shows
up in notebook output, so an accidental `print()` doesn't leak it
onto the screen or into stored notebook results. This is a safety
net, not a substitute for keeping the secret out of the code text
in the first place.

## Key terms

| Term | Meaning |
|---|---|
| Secret scope | A named container of secrets, backed by either Databricks-managed storage or Azure Key Vault |
| `dbutils.secrets.get()` | Retrieves a secret's value at runtime, so it never appears as literal text in code |
| Redaction | Databricks automatically masks a known secret value if it appears in notebook output |

## Check yourself

You're ready for Lesson 30 when you can explain, without looking: why
does a Key Vault-backed secret scope mean Databricks never actually
stores the secret's value itself?
