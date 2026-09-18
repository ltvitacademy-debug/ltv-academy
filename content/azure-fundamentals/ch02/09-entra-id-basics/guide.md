# Lesson 9 — Microsoft Entra ID Basics

**Chapter 2 · Core Azure Services · Lesson 9 of 18**

## What you'll learn

- What **Microsoft Entra ID** is, and its former name
- **Users** and **groups** — the basic building blocks of identity
- Why almost everything in Azure checks against Entra ID before allowing an action
- How Entra ID relates to a subscription

## The same service, a new name

**Microsoft Entra ID** is Azure's identity service — it used to be
called **Azure Active Directory (Azure AD)**, and you'll still see
that older name in plenty of documentation, error messages, and
older material, so it's worth knowing both names refer to the same
service. Entra ID is where Azure keeps track of *who* exists and
*what they're allowed to do*.

## Users and groups — the basic building blocks

A **user** is an identity — a person (or sometimes an application)
that can sign in and be granted permissions. A **group** is a
collection of users, which makes managing permissions at scale
practical: instead of granting a permission to fifty individual
people one at a time, you grant it once to a group and add or remove
members from that group as the team changes. Every Azure account you
sign in with, and every permission you're ever granted, ultimately
traces back to a user identity that Entra ID manages.

```
Microsoft Entra ID
┌─────────────────────────────────────┐
│  Users:  alice@company.com            │
│          bob@company.com               │
│                                        │
│  Group: "Data Team" ─── contains ──── alice, bob
│         (grant a permission to the group,
│          not to each person individually)
└─────────────────────────────────────┘
```

## Why almost everything checks against Entra ID

Whenever you sign in to the Azure Portal, run a command against
Azure, or an application tries to access an Azure resource on your
behalf, that action is checked against Entra ID to confirm: is this a
real, known identity, and is it actually allowed to do this? This is
the foundation identity and access management (covered in more depth
in Chapter 3) is built on top of — you can't have permissions without
first having a reliable way to know *who* is asking.

## How Entra ID relates to a subscription

Entra ID identities aren't scoped to just one subscription — the same
Entra ID directory (called a **tenant**) can be linked to multiple
subscriptions, and the users and groups defined in it can be granted
access across any of them. Think of the subscription as the billing
and resource boundary, and Entra ID as the separate, overarching
answer to "who is this, and what can they do" that applies across
whichever subscriptions that identity has been granted access to.

## Key terms

| Term | Meaning |
|---|---|
| Microsoft Entra ID | Azure's identity service (formerly Azure Active Directory / Azure AD) |
| User | An identity — a person or application — that can sign in and be granted permissions |
| Group | A collection of users, used to manage permissions at scale |
| Tenant | An organization's dedicated Entra ID directory |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why
is granting a permission to a group instead of fifty individual users
actually a meaningfully better practice, beyond just saving typing?
