# Lesson 14 — Azure Key Vault Secrets in Practice

**Chapter 4 · Secrets Management in the Cloud · Lesson 14 of 32**

## What you'll learn

- What a Key Vault **secret** actually is, and the kinds of values it's used for in real applications
- How an application retrieves a secret at runtime using a **Managed Identity**, with no credential of its own stored anywhere
- How **access policies** (and the newer RBAC model) decide exactly who and what is allowed to read a given secret
- Why this combination removes the hardcoding problem from Lesson 13 entirely, instead of just hiding it better

## What a Key Vault secret is

Azure Key Vault's **secrets** feature is a secure, centralized store
for arbitrary sensitive strings — not certificates, not encryption
keys (those are separate Key Vault object types), just small pieces
of text an application needs and shouldn't have sitting in its own
config. In practice, that's things like:

- A SQL Database **connection string**, including its password
- A third-party **API key** (a payment processor, a mapping service, an email provider)
- A storage account **access key**
- An application's own client secret used to authenticate to another service

Each secret is stored by name (e.g. `prod-orders-db-connection`) and
versioned automatically — update the value and Key Vault keeps the
old version too, which matters for rotation (Lesson 16).

## Retrieving it without a credential: Managed Identity

The piece that actually solves Lesson 13's problem is **Managed
Identity**. An Azure resource — a Function App, a VM, an App
Service — can be given a Managed Identity, which is an identity
Azure manages for that resource automatically, with no password or
certificate for a developer to handle at all. At runtime, the app
asks Azure Active Directory for a token proving it is that resource,
presents the token to Key Vault, and Key Vault hands back the secret
value directly in memory:

```
# Pseudocode: no password anywhere in this code
credential = DefaultAzureCredential()          # uses the resource's managed identity
client = SecretClient(vault_url, credential)
connection_string = client.get_secret("prod-orders-db-connection").value
```

Nothing in that code — or in source control, or in a container
image — contains the real secret. The only thing that exists ahead
of time is a Key Vault reference and a trust relationship between
the resource's identity and the vault.

## Access policies: who's allowed to read it

Storing the secret safely doesn't help if everyone can read it. Key
Vault gates access with **access policies** (the vault's original
permission model) or **Azure RBAC** (the newer, more granular
role-based option) — either way, the vault owner decides exactly
which identities get `get`/`list` rights on secrets, and which get
nothing. A typical setup grants the one Function App's managed
identity read access to the one secret it needs, and grants nothing
to every other identity in the subscription by default. That's the
same least-privilege idea Lesson 16 covers for rotation — a secret
being "in Key Vault" isn't the security boundary; the access policy
controlling who can read it is.

## Key terms

| Term | Meaning |
|---|---|
| Secret (Key Vault) | An arbitrary sensitive string stored in Key Vault, e.g. a connection string or API key |
| Managed Identity | An identity Azure automatically manages for a resource, used to authenticate without a stored credential |
| Access policy | A rule in Key Vault defining which identities can perform which operations (e.g. read) on secrets |
| Azure RBAC (for Key Vault) | The newer role-based alternative to access policies, assigning roles like "Key Vault Secrets User" |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: how
does a Managed Identity let an application retrieve a Key Vault
secret without that application ever storing a credential of its own?
