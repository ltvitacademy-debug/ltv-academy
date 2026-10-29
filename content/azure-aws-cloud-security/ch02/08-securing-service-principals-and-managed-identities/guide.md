# Lesson 8 — Securing Service Principals and Managed Identities

**Chapter 2 · Azure Identity & Access Security · Lesson 4 of 4**

## What you'll learn

- The real relationship between an app registration and a service
  principal, and why they're two different objects, not one
- Which service principal credential type to use — client secret,
  certificate, or federated credential — and why that order is also
  the risk order
- The real difference between system-assigned and user-assigned
  managed identities, and when each one actually fits
- How to scope RBAC for a non-human identity so a compromised
  workload can't become a subscription-wide compromise

## App registration and service principal are two different objects

You already know a service principal is "the identity an app uses."
What's worth being precise about is that every app registration in
Entra ID actually creates **two** objects: the **application object**
(the global definition — name, required permissions, credential
configuration) and a **service principal object**, which is the
local, tenant-specific identity that actually gets assigned RBAC
roles and authenticates. In a single-tenant app these map one-to-one
and the distinction barely matters day to day. In a multi-tenant app,
one application object produces a separate service principal object
in every tenant that consents to it — and it's the service principal,
not the application object, that you grant permissions to and that
shows up in sign-in logs.

## Credential types, in order of preference

A service principal authenticates with one of three credential types,
and the order you should prefer them in is also the order Microsoft's
own guidance pushes toward:

**Federated credentials** (workload identity federation) let an
external workload — a GitHub Actions run, a Kubernetes pod, another
cloud's workload identity — present an OIDC token from its own
identity provider and exchange it for an Entra ID token, with **no
secret stored anywhere, ever**. This is the preferred option whenever
the calling platform supports OIDC federation, because there's
nothing to leak and nothing to rotate.

**Certificates** come next: a certificate's private key is harder to
accidentally paste into a config file or a Slack message than a
plain-text secret, and certificates can be issued with appropriately
long or short lifetimes and tracked through normal PKI processes.

**Client secrets** are the last resort — a plain string, easy to
leak into source control, CI logs, or a support ticket, and the most
common root cause of a compromised service principal in real
incidents. If a secret is unavoidable, set the shortest expiration the
workflow can tolerate, store it in Key Vault rather than inline
configuration, and build rotation into the deployment pipeline rather
than treating it as a one-time setup step.

## Managed identities remove the credential problem entirely

A **managed identity** is Azure's answer to "what if the workload
never had a credential to leak in the first place." The platform
creates and rotates the credential behind the scenes, accessible only
to the resource it's attached to through the Instance Metadata Service
endpoint — your code never sees a secret at all.

**System-assigned** managed identities are created and destroyed with
the resource they're attached to, one-to-one: delete the VM or
function app, and its identity is gone too. **User-assigned** managed
identities are standalone Azure resources with their own lifecycle,
which can be attached to multiple resources at once — useful when a
fleet of VM scale set instances, or a set of Azure Functions, all need
the same identity and the same permissions, and you don't want to
manage RBAC assignments separately for each one. Use system-assigned
when the identity's lifecycle should genuinely track one resource;
use user-assigned when you need to share an identity across resources
or want the identity to outlive any single resource it's attached to.

## Scoping access so compromise doesn't become catastrophe

Whether you're securing a service principal or a managed identity, the
same RBAC discipline from Lesson 7 applies, and it matters more here
than almost anywhere else: a non-human identity should get the
narrowest role, at the narrowest scope, that its actual job requires —
never Owner or Contributor at the subscription level because it was
easier than figuring out the real scope. A managed identity that only
needs to read secrets from one Key Vault should hold a role like Key
Vault Secrets User scoped to that vault, not Contributor on the
resource group. If that identity's workload is ever compromised, the
blast radius is bounded by exactly what you scoped it to — which is
the entire point of doing this work up front rather than after an
incident.

## Key terms

| Term | Meaning |
|---|---|
| Application object | The global, tenant-independent definition of an app registration |
| Service principal | The tenant-local identity object that actually authenticates and holds RBAC role assignments |
| Federated credential | A secretless credential exchanging an external OIDC token for an Entra ID token |
| System-assigned managed identity | A managed identity with a 1:1 lifecycle tied to the single resource it's attached to |
| User-assigned managed identity | A standalone managed identity resource that can be attached to multiple resources and outlive any one of them |

## Check yourself

You're ready to move on when you can explain, without looking: why
does a multi-tenant app registration produce a different service
principal object in every consenting tenant, and why does a Key
Vault-scoped Secrets User role on a managed identity bound that
identity's blast radius in a way that Contributor on the resource
group never would?
