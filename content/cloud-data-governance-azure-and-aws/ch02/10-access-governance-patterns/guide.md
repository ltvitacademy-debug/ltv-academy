# Lesson 10 — Access Governance Patterns

**Chapter 2 · Identity and Access · Lesson 10 of 25**

## What you'll learn

- Four access governance patterns that apply almost identically across Entra ID, Azure RBAC, and AWS IAM
- What an access review is, and why "who has access" questions need a recurring answer, not a one-time one
- What a break-glass account is, and why it has to be governed differently from everything else
- How just-in-time access (Entra PIM, AWS STS AssumeRole) shrinks the window a credential is dangerous

## Pattern 1: group-based assignment, not individual grants

Every lesson in this chapter has pointed at the same pattern from a different angle: Lesson 7 recommended role-assignable Entra groups over individual user assignments, Lesson 8 noted scope inheritance works the same way at the resource-group level, and Lesson 9 covered IAM groups directly. The underlying reason is identical in both clouds: assigning access to a **group** means membership changes (a new hire joins, someone changes teams) automatically grant or revoke access, with zero additional configuration and zero risk of someone forgetting to update an individual assignment.

## Pattern 2: least privilege through job-function roles, not broad admin roles

Lesson 8 contrasted Azure's job-function roles (Reader, Storage Blob Data Reader) against privileged administrator roles (Owner, Contributor). The same contrast exists in AWS IAM: a narrowly scoped custom policy versus AWS managed policies like `AdministratorAccess`. The governance risk isn't theoretical — an identity with broad administrative access is a bigger blast radius if its credentials are ever compromised, and it's also simply harder to audit ("what can this identity actually do" has a one-line answer for a job-function role and a much longer one for an admin role). Default to the narrowest role that gets the job done, and treat every broad role assignment as something that needs its own justification on file.

## Pattern 3: periodic access reviews

Access, once granted, tends to persist long after it's needed — a project ends, a role changes, someone transfers teams, and the old access quietly remains because revoking it was nobody's specific job. An **access review** is a recurring, structured process (not a one-time cleanup) where a resource owner or manager is prompted to confirm whether each person's access is still needed. **Microsoft Entra ID** has this built in as **Access reviews** (part of Entra ID Governance), which can be scheduled to recur automatically against a role assignment, a group, or an application. AWS's equivalent capability is **IAM Access Analyzer**, which doesn't run scheduled reviews in quite the same way but does continuously flag unused permissions and external access, surfacing exactly the stale-access signal an access review is designed to catch.

## Pattern 4: break-glass accounts, governed differently on purpose

A **break-glass account** (also called an emergency access account) is a pre-provisioned, highly privileged credential kept in reserve specifically for the scenario where normal access — including the identity system itself — is unavailable (an Entra ID outage, a federation failure, every normal admin locked out simultaneously). It's deliberately **excluded** from the group-based, reviewed, least-privilege patterns above, because its entire purpose is to work when those normal systems don't. What replaces that governance instead: the credential is stored offline or in a dedicated vault, its use triggers an immediate high-priority alert, and its access is audited after every single use rather than reviewed periodically. Both Microsoft and AWS publish guidance recommending at least two such accounts, monitored continuously for any sign-in activity at all.

## Pattern 5: just-in-time access shrinks the danger window

The patterns above reduce *who* has access and *how broad* it is. Just-in-time (JIT) access reduces *how long* access exists at all. **Microsoft Entra Privileged Identity Management (PIM)** lets a role be **eligible** rather than permanently **active** — a user requests activation, it's granted for a limited window (often with approval and MFA required), and it expires automatically. AWS's equivalent is built into the role pattern from Lesson 9: **STS AssumeRole** issues temporary credentials with a built-in expiration, so standing access to assume a sensitive role doesn't translate into standing *active* access — the credentials themselves don't outlive the task.

## Closing Chapter 2

This chapter built the identity layer the rest of this course assumes: the authentication/authorization split (Lesson 6), Entra ID's directory-level roles (Lesson 7), Azure RBAC's resource-scoped authorization (Lesson 8), AWS IAM's unified model (Lesson 9), and now the access governance patterns — group-based assignment, least privilege, access reviews, break-glass accounts, and just-in-time access — that apply across all three. Chapter 3 builds on this identity foundation to cover where governed data actually lives: Azure Data Lake Storage, Amazon S3, and the catalogs that make it discoverable.

## Key terms

| Term | Meaning |
|---|---|
| Access review | A recurring, structured process where access is periodically re-confirmed as still needed |
| Break-glass account | A pre-provisioned emergency credential, governed differently because it must work when normal access doesn't |
| Just-in-time (JIT) access | Access granted for a limited, expiring window rather than standing permanently active |
| Entra PIM / STS AssumeRole | Azure's and AWS's respective mechanisms for time-limited, activated-on-demand access |

## Lab

Pick one of the five patterns in this lesson and describe, in two or three sentences, what would go wrong at a hypothetical organization that skipped it entirely — be specific about the failure mode, not just "it would be less secure."

## Check yourself

Can you name all five access governance patterns from this lesson, and explain why a break-glass account is deliberately excluded from the group-based, least-privilege, periodically-reviewed pattern that governs everything else?
