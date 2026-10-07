# IAM Principles: Least Privilege

Chapter 1 established why security has to move earlier in the pipeline. Chapter 2 asks the question that sits underneath almost every other security control: who — or what — is allowed to do anything at all? This lesson introduces Identity and Access Management (IAM) and the single principle that should guide every access decision Northbridge Retail's platform team makes: least privilege.

## What you'll learn

- What IAM actually governs, and why it's the foundation every other DevSecOps control sits on
- The principle of least privilege, and how it differs from "access that seems reasonable"
- Why over-privileged identities are a bigger risk than most teams assume
- How Northbridge Retail applies least privilege to people, services, and pipelines alike

## What IAM governs

Identity and Access Management answers two questions for every request that touches a system: *who (or what) is making this request*, and *what are they allowed to do*. "Who" isn't limited to people. At Northbridge Retail, identities include engineers signing in to the Azure portal, the checkout service calling the payments API, and the CI/CD pipeline deploying a new container image. Every one of those is a principal, and every principal needs an access decision made about it — explicitly, not by default.

The dangerous default is the opposite: granting broad access because it's convenient, and narrowing it later "if it becomes a problem." In practice, it rarely gets narrowed. Access that's easy to grant and annoying to audit tends to accumulate instead of shrink.

## The principle of least privilege

Least privilege means a principal gets exactly the access required to do its job — no more. Not "access that's close enough," not "access the last person in this role had," and not "admin, because it's simpler than figuring out the real requirement." If a Northbridge Retail support engineer only ever needs to read order records to answer a customer question, their access should stop at read-only on the orders table — not write access, not access to the payments database, not subscription-level Contributor rights.

This sounds restrictive, but it's really about precision. Least privilege isn't "give people as little as possible to be difficult" — it's "give every principal exactly what its actual job requires, and nothing attached by convenience."

## Why over-privileged identities are the bigger risk

An identity's privilege level determines its **blast radius** — how much damage is possible if that identity is ever compromised, misused, or simply makes a mistake. A read-only reporting credential that leaks is a bounded problem: an attacker can view data, nothing more. A broadly-scoped admin credential that leaks can mean deleted infrastructure, exfiltrated customer data, or a planted backdoor. Most real-world breaches don't start with a flaw in an encryption algorithm — they start with a credential that had more access than its job required, used in a way nobody anticipated.

This is why least privilege is positioned here, at the start of Chapter 2: every identity and access technology covered for the rest of this chapter — Azure RBAC, AWS IAM, Kubernetes RBAC, workload identity — is a mechanism for *implementing* least privilege. The principle comes first; the tools come next.

## Applying it at Northbridge Retail

- **People** — a database administrator gets access scoped to the databases they manage, not every subscription in the tenant.
- **Services** — the checkout service's identity can read the one Key Vault secret it needs (the payment processor's API key) and nothing else in that vault.
- **Pipelines** — the CI/CD pipeline that deploys the inventory service has permission to deploy that service, not to modify IAM roles or access unrelated resource groups.

In each case, the question isn't "could this identity plausibly need more someday?" It's "does this identity's current job require this access right now?" If the answer is no, the access doesn't get granted — it gets added later, deliberately, when a real need appears.

## Key terms

- **Identity and Access Management (IAM)** — the systems and practices that decide who or what can access a resource, and what they can do with it
- **Principal** — any identity (user, service, or pipeline) that can be granted access
- **Least privilege** — granting a principal exactly the access its job requires, and no more
- **Blast radius** — the scope of potential damage if a given identity is compromised or misused

## Recap

IAM governs who or what can do what, for every kind of principal — people, services, and pipelines alike. Least privilege keeps each principal's access matched precisely to its actual job, which shrinks the blast radius of any single compromised credential. Next up: applying this principle concretely in Azure, starting with Microsoft Entra ID and Azure RBAC.
