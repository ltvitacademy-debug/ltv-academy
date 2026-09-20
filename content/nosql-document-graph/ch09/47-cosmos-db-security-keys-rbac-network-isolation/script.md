# Script — Cosmos DB Security: Keys, RBAC & Network Isolation

## Segment 1 (title)

Every Cosmos DB account ships with a security model that starts wide open and narrows from there. The default way to connect — account keys — grants full control of the entire account to whoever holds the string. That's convenient for a demo, and dangerous in production.

## Segment 2 (code: account keys are a bearer token)

Primary and secondary keys grant full read-write or read-only access to every database and container in the account — there's no per-container scoping. A key hardcoded into a mobile app can be extracted by decompiling it. A key committed to source control stays exposed even after you revert the commit. Keys belong in Key Vault, behind a trusted backend, never on a client device.

## Segment 3 (steps: three layers, stacked)

Azure AD and RBAC are the modern recommended alternative — identity-based access through built-in roles like Data Reader and Data Contributor, tied to a managed identity with nothing to leak. Underneath both, network isolation restricts where connections can even come from, through VNet service endpoints, private endpoints, and IP firewall rules.

## Segment 4 (outro)

These layers stack together — RBAC-authenticated identities connecting only from an approved network, the same instinct as combining a login with a firewall rule. Next up: private endpoints and firewall rules for Cosmos DB in depth.
