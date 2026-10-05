# Lesson 6 — Identity and Access Management in the Cloud

**Chapter 2 · Identity and Access · Lesson 6 of 25**

## What you'll learn

- Why identity is the foundation every other governance layer depends on
- The vocabulary shared by every cloud IAM system: principals, authentication, authorization
- How Azure splits identity into two services (Entra ID and Azure RBAC) while AWS uses one (IAM)
- The roadmap for the rest of this chapter

## Why identity comes first

Of the four governance layers from Lesson 3 — identity, policy, data, monitoring — identity is the one everything else depends on. You cannot restrict access to sensitive data (data layer) for a principal the system can't reliably identify. You cannot enforce a policy about who's allowed to do what (policy layer) without a trustworthy way to know who's asking. You cannot produce a meaningful audit log (monitoring layer) if "someone" did something is the best you can say about who did it. Every governance control downstream of identity inherits its weaknesses.

## Shared vocabulary, both clouds

Regardless of which cloud (or which identity vendor at all) you're working in, three concepts recur:

- **Principal** — anything that can be granted permissions: a human user, a group of users, an application, or a service (a "managed identity" in Azure, an "IAM role" assumed by a service in AWS).
- **Authentication (AuthN)** — proving you are who you claim to be. A password, a certificate, a multi-factor prompt.
- **Authorization (AuthZ)** — once authenticated, determining what you're actually allowed to do. This is where roles, policies, and permissions live.

These two steps — authenticate, then authorize — happen on every single request to every cloud resource, even when the process is invisible to the user.

## Azure splits identity into two services; AWS uses one

This is the single most important structural difference you'll need to keep straight across the next three lessons:

- **Azure** separates the two concerns into **two distinct services**. **Microsoft Entra ID** (Lesson 7) handles authentication and directory-level identity — who exists, what groups they belong to, and tenant-wide administrative roles. **Azure RBAC** (Lesson 8) handles authorization at the resource level — what a given identity, once authenticated, is allowed to do to a specific VM, storage account, or subscription.
- **AWS** handles both inside a **single service: AWS IAM** (Lesson 9). IAM users, groups, and roles cover both authentication (who can sign in, or what credentials a role can assume) and authorization (IAM policies attached to that user, group, or role) in one unified system.

Neither design is "better" — they reflect different histories (Entra ID descends from on-premises Active Directory; Azure RBAC was added later specifically for resource-level Azure authorization) — but conflating them is the single most common source of confusion for someone learning both clouds at once. A question like "can this user log into the Azure portal" is an Entra ID question. A question like "can this user delete this storage account" is an Azure RBAC question. In AWS, both questions get answered by the same service.

## Where this chapter goes

- **Lesson 7** — Microsoft Entra ID: directory roles, role assignment, app registrations.
- **Lesson 8** — Azure RBAC: resource-scoped role assignment, the built-in role catalog, scope inheritance.
- **Lesson 9** — AWS IAM: users, groups, roles, and policy JSON — AWS's single unified system.
- **Lesson 10** — Access governance patterns that apply across all three: group-based assignment, least privilege, access reviews, and just-in-time access.

## Key terms

| Term | Meaning |
|---|---|
| Principal | Anything that can be granted permissions — a user, group, application, or service identity |
| Authentication (AuthN) | Proving you are who you claim to be |
| Authorization (AuthZ) | Determining what an authenticated identity is actually allowed to do |
| Entra ID / Azure RBAC split | Azure's division of identity (Entra ID) from resource-level authorization (Azure RBAC) — a single unified IAM service in AWS |

## Lab

Write two short questions about a hypothetical cloud user: one that's really an authentication question ("can this person...") and one that's really an authorization question ("is this person allowed to..."). For each, state whether Azure would answer it with Entra ID or Azure RBAC, and note that AWS IAM would answer both.

## Check yourself

Can you explain, without looking back, the difference between authentication and authorization, and state which Azure service handles each — and why AWS doesn't need that same split?
