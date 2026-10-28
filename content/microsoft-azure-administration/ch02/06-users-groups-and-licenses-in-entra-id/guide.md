# Lesson 6 — Users, Groups, and Licenses in Entra ID

**Chapter 2 · Azure Identity: Microsoft Entra ID · Lesson 6 of 32**

## What you'll learn

- The two ways a user account ends up in Entra ID: cloud-only vs. synced from on-prem AD
- The difference between a security group and a Microsoft 365 group, and when each one is the right tool
- What a dynamic group is, and why it removes the need to manually add or remove members
- How licensing actually works in Entra ID — what a license is attached to, and what it unlocks

## Where users come from

Every object you manage inside a tenant starts with the **user**. There are two ways
a user account gets created in Entra ID. A **cloud-only** account is created directly
in Entra ID — through the portal, PowerShell, or Microsoft Graph — and exists only
there. A **synced** account originates in an on-prem Active Directory and is mirrored
into Entra ID by a tool called **Microsoft Entra Connect**, which keeps the cloud
copy updated as the on-prem account changes. This course focuses on the cloud-only
side, but it's worth knowing synced accounts exist, because most mid-size and large
organizations run a **hybrid** setup rather than going cloud-only on day one.

## Security groups vs. Microsoft 365 groups

Entra ID has two main group types, and picking the wrong one is a common early
mistake. A **security group** does exactly what the name says: it exists to grant
access to resources, apps, or Azure RBAC roles (covered in Lesson 7). It has no
collaboration features attached — it's purely an access-control container.

A **Microsoft 365 group** is broader: creating one also provisions a shared mailbox,
a calendar, a Teams channel, and a SharePoint site for that group to collaborate in.
If the goal is "give this team a shared workspace," a Microsoft 365 group is the
right call. If the goal is "give this set of people access to this resource," a
security group is the right call — and in practice, security groups are what you'll
use constantly for Azure RBAC role assignments.

## Dynamic groups: membership that maintains itself

Both group types can use **static** membership (you manually add and remove people)
or **dynamic** membership (Entra ID evaluates a rule against each user's or device's
attributes and adds or removes them automatically). A dynamic group rule like
`department -eq "Finance"` means anyone whose directory profile has `department` set
to Finance is automatically a member — and automatically removed the moment that
attribute changes. This matters operationally: nobody has to remember to update
group membership when someone transfers departments, which is exactly the kind of
manual step that gets forgotten and leaves stale access sitting around.

## Licenses: attached to the user, unlocking services

A **license** in Entra ID isn't a login credential — it's what turns on specific
services *for* a user who already has an account. Assigning a user the
**Microsoft 365 E3** license unlocks Exchange Online, Teams, and SharePoint for
them. Assigning **Microsoft Entra ID P1** unlocks premium identity features —
Conditional Access (Lesson 8) and dynamic groups among them. No license, no access
to that service, even though the user account itself exists and can still sign in.

Licenses can be assigned directly to a user, or — far more commonly at scale — to a
**group**, using **group-based licensing**. Every current member of the group
inherits the license; add someone to the group and they get it automatically; remove
them and it's revoked automatically. Combine group-based licensing with a dynamic
group and the whole lifecycle runs itself: join the Finance department, get added to
the dynamic Finance group, get the group's license, done — no admin ticket required.

## Example: a new hire in Finance

Dana joins as a Finance analyst. Her account is created, her `department` attribute
is set to "Finance," and because a dynamic security group already exists with the
rule `department -eq "Finance"` carrying a Microsoft 365 E3 and Entra ID P1 license,
Dana is added to the group automatically and both licenses apply within minutes —
with zero manual group or license assignment from IT.

## Key terms

| Term | Meaning |
|---|---|
| Cloud-only account | A user created directly in Entra ID, with no on-prem AD source |
| Security group | A group used purely to grant access to resources, apps, or roles |
| Microsoft 365 group | A group that also provisions a mailbox, Teams channel, and SharePoint site |
| Dynamic group | A group whose membership is maintained automatically by a rule, not manually |
| Group-based licensing | Assigning a license to a group so every member inherits it automatically |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: why would an admin
choose group-based licensing on a dynamic group over assigning licenses to users one
at a time?
