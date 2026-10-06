# Lesson 16 — Managed Identities & Key Vault for AI Apps

**Chapter 3 · Cloud Infrastructure Basics for AI · Lesson 16 of 24**

## What you'll learn

- Why a secret pasted into application code is a standing liability
- What a system-assigned managed identity actually is
- How to confirm an identity is really on, in Microsoft Entra ID
- Why an identity still needs explicit access granted to reach a Key Vault
- The one-line code change that removes a client secret entirely

## The wrong answer, still disturbingly common

Every secret, API key, and connection string an AI app needs has to come
from somewhere. The wrong answer — still common enough to be worth
calling out directly — is pasting it straight into the code, where it
ends up in source control, in logs, in a screen share, forever.

## Step one: turn on an identity

The fix starts with a managed identity, enabled with a single checkbox
at resource creation time:

![Enabling a system-assigned managed identity while creating a VM — one checkbox, no secret issued to anyone (red box is Microsoft's own doc annotation).](/courses/azure-ai-cloud/ch03/16-managed-identities-and-key-vault/enable-system-identity-vm-create.png)

No secret gets issued to anyone, because there's no secret to leak.
Azure manages the underlying credential and rotates it automatically —
it's simply not something you, or an attacker, can extract.

## Confirming it's actually on

A managed identity isn't just a checkbox — it's a real identity
registered in Microsoft Entra ID, confirmed on the resource's own
Identity blade:

![The resource's own Identity blade — Status set to On is the managed identity actually existing in Microsoft Entra ID.](/courses/azure-ai-cloud/ch03/16-managed-identities-and-key-vault/identity-blade-system-assigned-on.png)

That Status toggle is the same place the identity could be turned back
off, or where you'd switch from a system-assigned identity (tied to this
one resource's lifecycle) to a user-assigned identity shared across
several resources.

## What that identity is allowed to reach

An identity on its own can't reach anything until it's granted access to
something — in this course, usually a Key Vault:

![The Key Vault this identity will be granted access to — secrets, keys, and certificates, never hardcoded in app code.](/courses/azure-ai-cloud/ch03/16-managed-identities-and-key-vault/key-vault-overview.png)

That access is granted explicitly, through an access policy or an RBAC
role assignment naming the identity — nothing is reachable by default
just because an identity exists. The Vault URI is what application code
actually points at once that access is in place.

## What the app's code never contains

```
# Without managed identity
client = SecretClient(vault_url, credential=ClientSecretCredential(...))

# With managed identity
client = SecretClient(vault_url, credential=DefaultAzureCredential())
```

Same SDK call, same `SecretClient`. The only difference is the
credential — `DefaultAzureCredential()` picks up the managed identity
automatically, with no client secret anywhere in the code, the config
file, or an environment variable.

## Key terms

| Term | Meaning |
|---|---|
| Managed identity | An Azure-managed identity for a resource, with no secret for a developer to handle |
| System-assigned identity | A managed identity tied to one resource's lifecycle — deleted when the resource is |
| Microsoft Entra ID | Azure's identity service, where managed identities actually get registered |
| `DefaultAzureCredential` | An SDK credential type that automatically discovers and uses a managed identity |

## Check yourself

You're ready for Lesson 17 when you can explain, without looking: why
does enabling a managed identity on a VM alone not give that VM access
to a Key Vault — what second step is still required?
