# Script — Managed Identities & Key Vault for AI Apps

## Segment 1 (title)

Every secret, API key, and connection string an AI app needs has to come from somewhere — and the wrong answer, still disturbingly common, is pasted straight into the code.

## Segment 2 (screenshot: enable system identity)

The fix starts with a managed identity — a system-assigned identity enabled on the VM, App Service, or Function App itself, with a single checkbox at creation time. No secret gets issued to anyone, because there's no secret to leak — Azure manages the credential behind the scenes and rotates it automatically.

## Segment 3 (screenshot: identity blade)

That identity isn't just a checkbox, either — it's a real identity in Microsoft Entra ID, confirmed on the resource's own Identity blade, where Status reads On. It's the same place that identity could be turned back off, or switched to a user-assigned identity shared across several resources instead.

## Segment 4 (screenshot: key vault overview)

An identity on its own can't reach anything until it's granted access to something — in this course, usually a Key Vault holding the API keys, connection strings, and Azure OpenAI credentials an AI app actually needs at runtime, accessed through its own vault URI. That access is granted explicitly too, through an access policy or an RBAC role assignment naming the identity — nothing is reachable by default just because an identity exists.

## Segment 5 (code: what the app never contains)

In code, the difference is one line. Swap a ClientSecretCredential, which needs a client secret stored somewhere, for DefaultAzureCredential, which picks up the managed identity automatically — same SDK call, no client secret anywhere in the code, the config file, or an environment variable.

## Segment 6 (outro)

No password in the code, because there's no password at all. Next up: the same deployment job, on a different cloud entirely.
