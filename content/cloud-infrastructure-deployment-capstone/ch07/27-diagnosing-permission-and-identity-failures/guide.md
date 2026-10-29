# Lesson 27 — Diagnosing Permission and Identity Failures

**Chapter 7 · Troubleshooting Common Deployment Issues · Lesson 27 of 32**

## What you'll learn

- Why a genuine missing RBAC role or IAM policy is a surprisingly common real cause of "broken"
  deployments — and why it isn't a network problem at all
- The one signal that separates a permission failure from a network failure before you've changed
  anything: what the actual error message says
- Why "access denied" / "forbidden" and "timed out" point at completely different root causes, and
  why confusing the two wastes real time
- A real approach to tracing a permission gap back to the specific missing role or policy statement

## The trap: it looks like a network problem

Lesson 26's connectivity sequence runs through network, routing, firewall rules, DNS, and the
listening port — and it will correctly report "everything passes" on a ticket that still doesn't
work, because the actual problem was never in that list at all. A surprisingly large share of real
deployment tickets turn out to be an app's managed identity, a service principal, or a user's role
genuinely lacking the one permission a feature now depends on. The network is fine. The firewall is
fine. DNS resolves correctly. The service is listening. And the request still fails, because the
identity making the request was never granted permission to do what it's trying to do.

## The one signal that tells you which problem you have

Before you touch a single role assignment, look at the actual error text, because it almost always
tells you which category you're in:

- **"Access denied," "Forbidden," "403," "AuthorizationFailed," "UnauthorizedAccess"** — this is
  the request *reaching* the resource and being actively, deliberately refused. That's a permission
  problem. The network worked; the identity doesn't have the right to do this.
- **"Connection timed out," "No route to host," "Connection refused" (with no application response
  at all)** — this is the request never getting a response back from anything. That's almost always
  a network, firewall, or listening-port problem from Lesson 26's sequence, not a permission one.

That single distinction — did the request get an answer that said "no," or did it get no answer at
all — is the fastest triage step available, and it's the one engineers skip most often under
pressure, usually by assuming "access denied" means something about the network is misconfigured
when it's telling you the exact opposite.

## Tracing the gap to the specific missing permission

Once the error text confirms this is a permission problem, the next step is finding exactly which
role or policy statement is missing, not just confirming "yes, it's permissions":

```text
Error: "AuthorizationFailed: The client does not have authorization to perform
        action 'Microsoft.Storage/storageAccounts/listKeys/action'"

Step 1: Identify the identity making the call (managed identity, service principal, or user).
Step 2: List its current role assignments:
          az role assignment list --assignee <identity-id> -o table
Step 3: Compare against what the failing action actually requires. "listKeys" needs a role
         like Storage Account Key Operator Service Role — not just Reader.
Step 4: Assign the specific role needed, scoped to the resource (not the whole subscription).
```

The error message in a real Azure or AWS failure almost always names the exact action that was
denied — `listKeys`, `s3:GetObject`, `vm:Start` — which means you rarely have to guess at the
missing permission. The discipline is reading that line carefully instead of skimming past it to
get to the fix faster.

## Scope matters as much as the role itself

A role assigned at the wrong scope causes the exact same symptom as no role at all. Granting
`Contributor` on an entire subscription when the real need was `Storage Blob Data Contributor` on
one storage account technically "fixes" the error, but it's the wrong fix — it grants far more
access than the task required, which is its own security problem waiting to surface later. The
right fix is always the narrowest role, at the narrowest scope, that satisfies the specific action
the error named.

## Key terms

| Term | Meaning |
|---|---|
| Managed identity | An Azure identity automatically assigned to a resource, used to authenticate to other services without stored credentials |
| Service principal | An application's identity in Azure AD or IAM, used for programmatic access |
| Least privilege | Granting only the specific permission needed, at the narrowest possible scope |
| Authorization failure | A request that reached its target and was deliberately refused, as opposed to one that never got a response |

## Check yourself

A teammate says, "I think it's a security group problem" after seeing a `403 Forbidden` error.
Explain, using this lesson's signal, why that error text actually rules out a security group or NSG
problem rather than pointing toward one.
