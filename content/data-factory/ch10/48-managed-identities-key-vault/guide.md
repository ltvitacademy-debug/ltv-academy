# Lesson 48 — Managed Identities & Key Vault

**Chapter 10 · Security, DevOps & CI/CD · Lesson 1 of 5**

## What you'll learn

- What a managed identity actually is, and why it eliminates credentials
- System-assigned vs. user-assigned managed identities
- How to grant a data factory's identity access to another resource
- Storing linked service secrets in Key Vault instead of in plain text

## The problem managed identities solve

Every linked service you've built this course needed *some* form of
credential — a connection string, a key, a password. Storing those
directly inside a linked service works, but it means a real secret
sits inside your factory's definition. **Managed identities**
eliminate that: Data Factory gets its own identity in Microsoft Entra
ID, and other Azure services can grant *that identity* access
directly — no credential to store, rotate, or leak, ever.

## Finding your factory's identity

Every data factory created through the portal or PowerShell
automatically gets a **system-assigned managed identity** — tied
directly to that factory's lifecycle; delete the factory, and Azure
deletes the identity with it. You can find it under **Properties**:

![Data factory Properties page showing Managed Identity Object ID, Managed Identity Tenant, and Managed Identity Application ID fields.](/courses/data-factory/ch10/48-managed-identities-key-vault/system-managed-identity-in-portal.png)
*Three real identifiers: Object ID and Application ID identify the identity itself; Tenant ID identifies which Microsoft Entra tenant it belongs to.*

There's a second flavor: a **user-assigned managed identity**,
created as its own standalone Azure resource and attached to one or
more data factories. Unlike system-assigned, it survives even if a
particular factory is deleted — useful when several factories need to
share the exact same identity and permission set.

## Granting access to another resource

Having an identity does nothing by itself — it needs to actually be
**granted** access, the same way you'd grant access to a person:

![Access control (IAM) page with the Add role assignment menu open.](/courses/data-factory/ch10/48-managed-identities-key-vault/add-role-assignment-menu-generic.png)
*On the target resource — a Key Vault, a storage account, a SQL database — open Access control (IAM), add a role assignment, and select Managed identity as the member type.*

You'd search for your data factory by name (or its Object ID) under
**System-assigned managed identity**, pick the narrowest role that
actually does the job — **Reader** if it only needs to read metadata,
something more specific for actual data access — and assign it.

## Storing secrets in Key Vault instead

Once your factory's identity has **Get** and **List** permissions on
a Key Vault's secrets, any linked service can reference a secret
there instead of storing it directly:

![New linked service dialog for Azure SQL Database showing a toggle between Password and Azure Key Vault, with AKV linked service and secret name fields filled in.](/courses/data-factory/ch10/48-managed-identities-key-vault/configure-azure-key-vault-secret.png)
*Toggle from Password to Azure Key Vault, pick the Key Vault linked service, and name the secret — Data Factory fetches the actual value at runtime, never storing it in the linked service definition itself.*

The underlying JSON makes the pattern explicit:

```
"password": {
  "type": "AzureKeyVaultSecret",
  "secretName": "AzureSqlDBSecret",
  "store": {
    "referenceName": "AzureKeyVault",
    "type": "LinkedServiceReference"
  }
}
```

Notice what's genuinely absent: no actual password string anywhere in
this JSON. Only a reference to where the real value lives.

## Key terms

| Term | Meaning |
|---|---|
| Managed identity | An automatically managed Microsoft Entra identity for a service instance, eliminating stored credentials |
| System-assigned | A managed identity tied to one resource's lifecycle, created and deleted with it |
| User-assigned | A standalone managed identity resource, shared across multiple factories |
| Role assignment | Granting a managed identity a specific permission level on a target resource |

## Lab

1. Find your data factory's Managed Identity Object ID under
   Properties (or note where you'd find it if you don't have portal
   access right now).
2. Write the role assignment steps you'd follow to grant that
   identity Reader access to a storage account.
3. Rewrite one linked service's password field using the
   AzureKeyVaultSecret pattern shown above.

## Check yourself

You're ready for Lesson 49 when you can explain, in one sentence, why
storing a secret in Key Vault and referencing it is more secure than
typing the password directly into a linked service.
