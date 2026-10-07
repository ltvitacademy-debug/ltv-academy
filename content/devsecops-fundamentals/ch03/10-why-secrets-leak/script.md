# Script — Why Secrets Leak

## Segment 1 (title)

Workload identity closed one gap, but Northbridge Retail still has real secrets a federated token can't replace — a payment processor's API key, a database password for a system that doesn't support federation. This lesson opens Chapter 3 by looking at how those secrets actually leak.

## Segment 2 (steps)

A secret is any value that grants access and would cause harm if it leaked: connection strings, API keys, TLS and SSH keys, signing keys, webhook secrets. If disclosure lets someone impersonate a service or move money, it counts, whether or not it looks like a traditional password.

## Segment 3 (steps)

Secrets leak the same few ways, over and over: committed to source control, where git history keeps it even after a later commit deletes the line; logged in plaintext during startup debugging; baked into a container image layer; or shared out of band in Slack or email with no rotation policy at all.

## Segment 4 (steps)

Northbridge Retail learned this firsthand when an engineer committed a .env.local file to a new repo whose .gitignore hadn't been copied over. The sandbox key sat in that branch for three weeks before an automated scan caught it — limited impact, but it's what pushed the team to a vault-first policy for every environment, not just production.

## Segment 5 (outro)

Telling people "don't commit secrets" treats this as a discipline problem, when it's really structural — which is why the rest of this chapter is about tools that make the secure path the fast one. Next up: Azure Key Vault.
