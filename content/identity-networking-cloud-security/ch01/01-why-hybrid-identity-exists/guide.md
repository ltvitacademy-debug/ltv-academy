# Lesson 1 — Why Hybrid Identity Exists

**Chapter 1 · Hybrid Identity: Connecting On-Prem AD to the Cloud · Lesson 1 of 32**

## What you'll learn

- Why most enterprises already have years of on-prem Active Directory investment they can't just abandon
- What's actually tied to that investment: user accounts, security groups, Group Policy, and application dependencies
- What "hybrid identity" means in practice — one identity that works across both on-prem and cloud
- Why this chapter's remaining lessons (Entra Connect, federation vs. password hash sync, bridging AWS) are all different pieces of solving this same problem

## Years of on-prem investment don't disappear overnight

When an organization adopts Microsoft 365, Azure, or another cloud service, it's almost never
starting from zero on the identity side. It likely has an on-premises **Active Directory**
domain that's been running for years, maybe since the company's original Windows Server
deployment. That AD holds every employee's user account, the security group memberships that
control access to file shares and line-of-business applications, Group Policy Objects enforcing
password rules and desktop lockdowns, and dozens of on-prem apps — ERP systems, file servers,
internal tools — that authenticate against it using Kerberos and LDAP.

Rebuilding all of that from scratch in a cloud-only identity service would mean recreating every
account, every group's permissions, and every policy, and re-pointing every app's authentication
— a project easily as large as the original AD rollout, with the business running on a half-broken
identity system in the meantime. That's not a hypothetical disruption; it's exactly why almost no
mid-size or large organization cuts over to a cloud-only identity on day one.

## The two bad options — and the real answer

Faced with cloud adoption, an organization really only has three choices. Stay on-prem only, and
nobody can sign into Microsoft 365, Azure resources, or any cloud SaaS that requires a cloud
identity. Abandon on-prem AD entirely and force everyone onto a cloud-only identity, and every
on-prem app, GPO, printer, and file share tied to that directory breaks immediately. Both of those
are unacceptable for any organization with a real on-prem footprint.

**Hybrid identity** is the real answer: keep on-prem AD exactly as it is, as the source of truth,
and extend it into the cloud instead of replacing it. Nobody has to re-create or relearn anything,
and cloud adoption happens gradually, account by account, without breaking what already works.

## Example: a mid-size company adopting Microsoft 365

Picture an 800-employee manufacturing company whose on-prem AD has been running for twelve
years — around 800 user objects, 60 security groups, an ERP system, and several file servers all
tied to that directory. Leadership decides to roll out Microsoft 365 for email, Teams, and
SharePoint.

Without hybrid identity, IT would have to manually create 800 new cloud-only accounts. Every
employee would end up with two separate logins — say, `jsmith` for the file server and
`jsmith@contoso.onmicrosoft.com` for Microsoft 365 — with different passwords and no connection
between them. When HR offboards someone, IT would have to disable both accounts separately, which
is a reliable way to leave stale access behind.

With hybrid identity, every existing AD account automatically appears in Entra ID with a matching
username. The employee signs into Microsoft 365 with the same corporate credentials they already
use, and when HR disables the AD account on termination, that status flows to the cloud account
too.

## What "hybrid" actually means going forward

"Hybrid identity" doesn't mean on-prem and cloud are two separate systems loosely connected — it
means one identity recognized in both places. The user object lives in on-prem AD, is
synchronized into Entra ID, and the organization makes one deliberate decision about how a sign-in
is actually verified once that account exists in both directories (covered in Lesson 3: password
hash sync vs. federation). The sync mechanism itself is Lesson 2's **Microsoft Entra Connect**, and
for organizations running workloads on AWS too, Lesson 4 covers bridging that same identity into
AWS IAM Identity Center so there isn't a third, disconnected identity silo.

## Key terms

| Term | Meaning |
|---|---|
| Hybrid identity | A user identity that originates in on-prem AD and is recognized by cloud identity services, instead of existing as two separate, disconnected accounts |
| On-premises Active Directory | The Windows Server identity service most enterprises already run, holding years of user, group, and policy data |
| Directory synchronization | The general term for keeping an on-prem directory and a cloud directory consistent — the mechanics are Lesson 2 |
| Source of truth | The directory where an object, like a user account, is actually created and managed; in most hybrid setups, that's still on-prem AD |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why can't a company with an
established on-prem Active Directory just create brand-new, separate accounts in Entra ID for its
cloud services instead of connecting the two?
