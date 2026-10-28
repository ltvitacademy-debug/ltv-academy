# Lesson 30 — Lab: Encrypting Data and Managing Secrets End to End

**Chapter 8 · Capstone: Securing a Hybrid Cloud Environment · Lesson 30 of 32**

## What you'll learn

- How Caldwell Logistics moved its invoice-document storage account from Microsoft-managed encryption to a customer-managed key in Azure Key Vault
- How the team moved an application's database connection string out of its config file and into Key Vault instead
- The real Azure CLI commands for creating the key, wiring up the permissions, and retrieving the secret from application code
- How rotation is actually configured for both the key and the secret, and why they're handled differently

## The scenario: invoices, a storage account, and a connection string

Caldwell Logistics' order-tracking application stores invoice PDFs in an Azure Storage account, `caldwelldocsstorage`, and reads order data from an Azure SQL database. Like every Azure Storage account, `caldwelldocsstorage` is encrypted at rest by default with Microsoft-managed keys — that part was never in question. What Caldwell's compliance team wants, following Chapter 7's audit prep, is **control over the key itself**: the ability to rotate it, revoke it, and prove exactly who can use it. Separately, the app's database connection string has been sitting in plain text in `appsettings.json` since the app was first deployed — exactly the mistake Lesson 13 warned about, and exactly what this lab fixes.

## Switching to a customer-managed key

A customer-managed key (CMK) has to live in a Key Vault that has both soft-delete and purge protection enabled, since Azure needs a guarantee the key can't vanish out from under an encrypted storage account:

```
az keyvault create --name caldwell-kv --resource-group caldwell-rg \
  --enable-purge-protection true --enable-soft-delete true

az keyvault key create --vault-name caldwell-kv --name caldwell-storage-cmk \
  --kty RSA --size 3072
```

The storage account's system-assigned managed identity then needs the **Key Vault Crypto Service Encryption User** role on the vault — without it, the storage account can't actually use the key, only reference it. With that role granted, switching the account's encryption source from Microsoft-managed to this key is one command: `az storage account update --name caldwelldocsstorage --encryption-key-source Microsoft.Keyvault --encryption-key-vault-uri <vault-uri> --encryption-key-name caldwell-storage-cmk`.

## Moving the connection string into Key Vault

The fix for the hardcoded connection string is to store it as a Key Vault secret and have the app read it at runtime instead of from its own config file:

```
az keyvault secret set --vault-name caldwell-kv \
  --name "OrderDbConnection" \
  --value "Server=caldwell-sql.database.windows.net;Database=Orders;..."
```

The app itself never needs to see the raw value hardcoded anywhere — it authenticates with its own managed identity through `DefaultAzureCredential` and asks a `SecretClient` for `OrderDbConnection` at startup, or, if it's an App Service, the connection string is wired in as an app setting using Key Vault reference syntax instead of a literal value. Either way, the actual string lives in exactly one place, and that place has an access policy and an audit log.

## Rotation: different for a key than for a secret

A Key Vault **key**, like the CMK protecting the storage account, supports an automatic rotation policy — Key Vault can generate a new version of the key on a schedule with no human involved: `az keyvault key rotation-policy update --vault-name caldwell-kv --name caldwell-storage-cmk --value rotation-policy.json`. A Key Vault **secret**, like the database connection string, is different — Key Vault has no way to know how to generate a new database password on its own, so it can only set an expiration date on the current value and fire an Event Grid notification as that date approaches, which Caldwell's team wires to a small Azure Function that actually rotates the SQL credential and writes the new value back.

## Key terms

| Term | Meaning |
|---|---|
| Customer-managed key (CMK) | An encryption key the customer controls in Key Vault, instead of the platform's default Microsoft-managed key |
| Key Vault Crypto Service Encryption User | The role a resource's managed identity needs to actually use a CMK for encryption |
| Key rotation policy | An automatic schedule Key Vault can apply to generate new versions of a key |
| Secret expiration | A date set on a Key Vault secret that triggers a near-expiry notification, since Key Vault can't auto-generate a new secret value |

## Check yourself

You're ready for Lesson 31 when you can explain, without looking: why can Key Vault automatically rotate a customer-managed key on a schedule, but not a database connection string secret — and what has to happen instead for the secret?
