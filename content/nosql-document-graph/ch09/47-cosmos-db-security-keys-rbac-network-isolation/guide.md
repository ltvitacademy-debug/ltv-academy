# Cosmos DB Security: Keys, RBAC & Network Isolation

Every Cosmos DB account ships with a security model that starts at "wide open" and narrows
from there. The default way to connect — the primary/secondary account keys — grants full
control of the entire account to whoever holds the string. That's convenient for a demo and
dangerous in production. This lesson covers the real layers a DBA should actually reach for:
account keys and their real risk, Azure AD/RBAC as the modern recommended alternative, and
network isolation as the layer underneath both.

## What you'll learn

- What primary/secondary account keys actually grant, and why embedding them in client apps is a real risk
- Azure AD/RBAC-based access as the modern, identity-based alternative Microsoft now recommends
- Network isolation via VNet service endpoints and private endpoints as a separate, complementary layer

## Account keys: full access, no granularity

Every Cosmos DB account has two primary keys and two secondary keys (read-write and
read-only variants of each), visible under **Keys** in the Azure portal. Anyone holding a
read-write key can read, write, or delete data in any database or container in that account
— there's no per-database or per-container scoping, and no concept of "this key can only
touch the Orders container." The dual primary/secondary pair exists so you can rotate one
while the other stays live, avoiding downtime during rotation — not so you have two
independent trust levels.

The real risk relational DBAs should recognize immediately: keys are bearer tokens. Whoever
has the string has the access, full stop, the same way a SQL Server connection string with
`sa` credentials baked in is a liability if it leaks into a mobile app, a public GitHub
repo, or a client-side JavaScript bundle. This happens more than it should — a key
hardcoded into a mobile app can be extracted by anyone who decompiles it, and a key
committed to source control stays exposed even after the commit is reverted. Keys are
appropriate for trusted server-side backend services that you control, stored in a secrets
manager like Azure Key Vault — never for anything a user's device runs directly.

## Azure AD / RBAC: the modern recommended alternative

Azure Cosmos DB supports **Azure AD-based (Microsoft Entra ID) role-based access control**
for data plane operations — the same identity model used elsewhere across Azure. Instead of
a shared secret, a client authenticates as an Azure AD identity (a user, or more commonly a
managed identity for an application), and Cosmos DB's built-in RBAC roles determine what
that identity can do:

- **Cosmos DB Built-in Data Reader** — read-only access to data
- **Cosmos DB Built-in Data Contributor** — full read/write access to data
- Custom roles can be defined with more granular permissions when the built-ins don't fit

This is the direction Microsoft actively steers customers toward, for the same reason
Azure SQL steers people toward Azure AD authentication over SQL logins: access is tied to an
identity that can be centrally managed, audited, conditionally restricted (MFA, Conditional
Access), and revoked instantly without rotating a shared secret that other services might
still depend on. A managed identity assigned to an App Service or Azure Function never has
a key to leak in the first place — there's no string to embed.

## Network isolation: restricting where connections can come from

Keys and RBAC control *who* can authenticate. Network isolation controls *where the
connection is allowed to come from at all*, independent of credentials — a second, layered
control a well-run account should not skip:

- **VNet service endpoints** — restrict a Cosmos DB account to accept traffic only from
  specific subnets in an Azure Virtual Network, so the account isn't reachable from the
  open internet
- **Private Endpoints** — go further by giving the Cosmos DB account a private IP address
  inside your VNet, so traffic never traverses the public internet at all (covered in
  depth next lesson)
- **IP firewall rules** — an allow-list of specific public IP ranges when VNet integration
  isn't in place

These layers stack: an account can require both RBAC-authenticated identities *and*
connections only from an approved VNet, which mirrors the relational-world instinct of
combining a login with a firewall rule rather than relying on either alone.

## Key terms

| Term | Meaning |
|---|---|
| Primary/secondary account key | A bearer-token credential granting full read-write (or read-only) access to an entire Cosmos DB account, with no per-container scoping |
| Azure AD / RBAC (Entra ID) | Identity-based access control using Azure AD identities and Cosmos DB built-in or custom roles instead of shared keys |
| Managed identity | An Azure AD identity automatically managed for an Azure resource (like a Function or App Service), with no credential to store or leak |
| VNet service endpoint / Private Endpoint | Network-layer controls restricting which network a Cosmos DB account can be reached from |

## Check yourself

Why is embedding a Cosmos DB primary account key directly in a client-side mobile or web
application a real security risk, and what does this lesson recommend instead?
