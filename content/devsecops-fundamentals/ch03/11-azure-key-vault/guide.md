# Azure Key Vault

Azure Key Vault is where Northbridge Retail's Azure-side secrets actually live — not in a config file, not in a Kubernetes Secret, but in a managed store built specifically to hold them. This lesson covers how a secret gets into Key Vault, how it gets read back out, and how access to it is controlled.

## What you'll learn

- What Key Vault actually stores, and the difference between its secrets, keys, and certificates
- How a secret is created and retrieved through the Azure portal
- Why a secret's value is hidden by default, even from someone who can see the secret exists
- How Key Vault access ties back into the Azure RBAC model from Lesson 6

## What Key Vault stores

Key Vault manages three distinct object types, and it's worth being precise about the difference: **secrets** are arbitrary string values (API keys, connection strings, passwords) stored and retrieved as-is; **keys** are cryptographic keys used for operations like signing or encryption, where Key Vault performs the operation without ever exposing the raw key material; **certificates** are TLS/SSL certificates, which Key Vault can also help provision and auto-renew. This lesson focuses on secrets, since that's what covers Northbridge Retail's payment processor API key and similar credentials.

## Creating a secret

Inside a vault, secrets live under **Objects → Secrets**. Creating one is a short form: a name, a value, and optional activation/expiration dates. Once a secret is created, Key Vault doesn't just store the raw value — it versions it. Each time you update a secret's value, Key Vault creates a new version rather than overwriting the old one, which means a service can roll back to a previous version, and an audit trail of every change is preserved automatically.

## Reading a secret back — hidden by default

Here's a detail worth noticing closely, because it reflects a deliberate design choice: when you open an existing secret version in the portal, the value is hidden by default, behind a **Show Secret Value** button.

![Azure Key Vault secret version page with the value hidden by default](/courses/devsecops-fundamentals/ch03/11-azure-key-vault/key-vault-secret-hidden.png)
*A secret's version page. Properties like creation date and the secret identifier are visible immediately — but the actual value requires an explicit extra click.*

Clicking **Show Secret Value** reveals it:

![Azure Key Vault secret value revealed after clicking Show Secret Value](/courses/devsecops-fundamentals/ch03/11-azure-key-vault/key-vault-secret-shown.png)
*After the explicit click, the plaintext value appears — in this example, a generated string, not a real credential.*

That extra click isn't an accident of UI design. It means viewing a secret's actual value is a distinct, auditable action from merely seeing that a secret exists — Key Vault's diagnostic logs can distinguish "listed the secrets in this vault" from "retrieved this secret's value," which matters enormously when investigating whether a credential was actually exposed, not just enumerated.

## Access control ties back to Azure RBAC

Key Vault access is governed by the same Azure RBAC model covered in Lesson 6 (vaults can also use a legacy access-policy model, but RBAC is the current recommended approach). A principal needs a role like **Key Vault Secrets User** — scoped to the specific vault, not the subscription — to read secret values. This is where the chapters connect directly: Lesson 9's workload identity example used exactly this role, federated to the checkout service's pod identity, scoped to one vault. Identity, RBAC, and secrets management aren't three separate systems at Northbridge Retail — they're one design, built in layers.

## Key terms

- **Secret** (Key Vault object type) — an arbitrary stored string value, such as an API key or connection string
- **Secret version** — Key Vault automatically versions every update to a secret instead of overwriting it
- **Key Vault Secrets User** — the Azure RBAC role needed to read secret values from a specific vault
- **Diagnostic logging** — Key Vault's audit trail, which distinguishes listing secrets from retrieving their actual values

## Recap

Key Vault stores secrets as versioned objects, hides values behind an explicit extra step, and gates access through the same Azure RBAC model used everywhere else in Azure. Next up: the AWS equivalent — AWS Secrets Manager.
