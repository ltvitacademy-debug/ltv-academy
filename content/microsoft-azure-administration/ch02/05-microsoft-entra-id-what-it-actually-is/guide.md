# Lesson 5 — Microsoft Entra ID: What It Actually Is

**Chapter 2 · Azure Identity: Microsoft Entra ID · Lesson 5 of 32**

## What you'll learn

- What Microsoft Entra ID actually is, and why it was renamed from Azure Active Directory in 2023
- Why Entra ID is a cloud-native identity service, not a hosted copy of on-prem Active Directory
- The concrete technical differences: no domain controllers, no LDAP/Kerberos, REST calls through Microsoft Graph instead
- What a "tenant" is, and how every Azure subscription trusts exactly one of them

## Entra ID, formerly Azure AD

**Microsoft Entra ID** is Microsoft's cloud identity and access management service. If
that name doesn't ring a bell, its old name probably will: Microsoft renamed Azure
Active Directory to Microsoft Entra ID in 2023 as part of a broader rebrand of its
identity products under the "Entra" family. Same service, same underlying directory,
new name — and the industry still uses "Azure AD" and "Entra ID" somewhat
interchangeably in conversation, even though Microsoft's own docs and the Azure
portal have fully switched over.

Every user who signs into **portal.azure.com**, every account logging into Outlook or
Teams through Microsoft 365, and every app that authenticates through Azure is
checking in with Entra ID. It's the directory behind essentially everything you've
touched so far in this course.

## Why "cloud-native" is the key word

Here's the distinction that actually matters, and it's not just marketing language.
Traditional on-prem **Active Directory** (the Windows Server role you may already
know) runs on **domain controllers** — physical or virtual servers you install,
patch, and keep running yourself. Clients authenticate using **Kerberos** and query
the directory using **LDAP**, both protocols designed for a private corporate
network.

Entra ID has none of that. There are no domain controllers to patch, no LDAP port to
open, no Kerberos tickets. Entra ID is managed entirely through **REST API calls**
to the **Microsoft Graph API** over HTTPS — the same way a modern SaaS product
exposes its data. When the Azure portal shows you a list of users, it's making a
Graph API call behind the scenes. When a PowerShell script creates a new user, it's
doing the same thing. This is why Entra ID scales the way it does and why it's
reachable from anywhere with an internet connection — it was built API-first for the
cloud, not retrofitted from a protocol designed for a 1990s office network.

## The tenant: one directory per organization

A **tenant** is a single, dedicated instance of Entra ID that belongs to one
organization. When your company signs up for Microsoft 365 or Azure, Microsoft
provisions exactly one tenant for you, identified by a unique ID and typically a
`yourcompany.onmicrosoft.com` domain. Every Azure **subscription** — the billing and
resource container from Chapter 1 — is linked to exactly one Entra ID tenant, which
is what makes a tenant the real trust boundary in Azure: a subscription trusts its
tenant to vouch for who's signing in, and nothing outside that tenant gets in without
an explicit relationship being set up (guest access, B2B collaboration, and so on,
covered later).

## Example: what happens when you sign into the Azure portal

You type your email and password at `portal.azure.com`. There's no domain controller
on a LAN checking your credentials against a Kerberos ticket. Instead, your browser
is redirected to Entra ID's sign-in endpoint, your credentials (and MFA challenge, if
required) are verified against your tenant's directory over HTTPS, and Entra ID
issues a token back to the portal proving who you are. That token — not a Kerberos
ticket — is what every subsequent request relies on for the rest of your session.

## Key terms

| Term | Meaning |
|---|---|
| Microsoft Entra ID | Microsoft's cloud identity service; the current name for what was Azure Active Directory until 2023 |
| Tenant | A single dedicated Entra ID directory belonging to one organization; the trust boundary for its subscriptions |
| Microsoft Graph API | The REST API that Entra ID (and the rest of Microsoft 365) is managed through, instead of LDAP |
| Domain controller | An on-prem Active Directory server role; Entra ID has no equivalent — there's nothing to install or patch |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why can't you just
think of Entra ID as "Active Directory, hosted in the cloud"? What specifically is
different about how it's managed?
