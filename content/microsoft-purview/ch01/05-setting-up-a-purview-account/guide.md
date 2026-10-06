# Lesson 5 — Setting Up a Purview Account

**Chapter 1 · Purview Foundations · Lesson 5 of 35**

## What you'll learn

- The real, step-by-step process for creating a Microsoft Purview account from the Azure portal
- The prerequisites you need before you start: subscription role, Azure Policy exceptions
- What each tab of the creation wizard actually asks for, and why
- The "Purview environment" tag convention from Lesson 3, applied for real
- How to protect a production account from accidental deletion once it exists

## Before you start

This lesson walks through the **classic** account-creation path: creating a standalone Microsoft Purview account as an Azure resource. (Lesson 3 covered the newer free-tier path, which needs no setup at all — this lesson is for the enterprise-from-the-start route, or for an organization that already has an Azure-provisioned account.) You need:

- An Azure subscription
- A Microsoft Entra tenant associated with that subscription
- **Contributor** or **Owner** role on the subscription (or subscription Administrator) — check this under your username → **My permissions** in the Azure portal if you're not sure
- Important: you can only create **one** Microsoft Purview account per tenant under normal quota rules — if your organization already has one, this wizard won't let you create a second

If your organization has any Azure Policies blocking Storage account or Event Hub namespace creation, you'll need to configure a Microsoft Purview exception tag first, or the deployment fails partway through.

## Finding the create button

Search for **Microsoft Purview** in the Azure portal to reach the accounts list, which — the first time — will be empty:

![Screenshot of the Microsoft Purview accounts page in the Azure portal, showing one existing account, ContosoPurview, with columns for Type, Resource group, Location, Subscription, and Status.](/courses/microsoft-purview/ch01/05-setting-up-a-purview-account/purview-accounts-page.png)
*The Microsoft Purview accounts page — every Purview account in the current subscription filter, with its resource group, location, and provisioning status.*

Selecting **+ Create** opens the account creation wizard:

![Screenshot of the Microsoft Purview accounts page with the Create button highlighted in a red box in the Azure portal.](/courses/microsoft-purview/ch01/05-setting-up-a-purview-account/select-create.png)
*Create opens the wizard — Basics, Networking, Configuration, Tags, Review + create.*

## Walking the wizard

On the **Basics** tab, you choose your subscription, a resource group (new or existing), a globally-unique account name (no spaces or symbols), and a **location**. That location choice matters more than it looks: it's where your account's metadata is stored, and — as you learned in Lesson 3 — **you cannot move a Purview account to a different region after creation.** If this is your organization's first Purview account, the location is restricted to the one matching your Microsoft Entra ID home region.

The wizard also tells you up front what a new account provisions with by default: 1 capacity unit (25 operations/second, 10 GB of metadata storage), with a managed resource group that will hold an auto-created storage account and Event Hub for ingestion.

**Networking** lets you choose public network access or private endpoints. **Configuration** is where you can optionally wire up Event Hubs namespaces for programmatic monitoring via Atlas Kafka — most first-time accounts skip this and configure it later if needed.

## Tagging the environment

On **Tags**, apply the **Purview environment** tag convention from Lesson 3 — Production, Pre-Production, Test, Dev, or Proof of Concept:

![Screenshot of the Tags tab in the Create Microsoft Purview account wizard, with a "Purview Environment" tag name and "Production" value entered.](/courses/microsoft-purview/ch01/05-setting-up-a-purview-account/tag-resource.png)
*Tagging this account "Production" — purely for your own organizational and billing clarity; Purview itself doesn't read or enforce this tag.*

Finally, **Review + Create** summarizes every choice across all five tabs before you commit:

![Screenshot of the Create Microsoft Purview account wizard's Basics tab, showing subscription, resource group, account name, location, capacity unit info, and managed resource group fields, with the Review + Create button highlighted.](/courses/microsoft-purview/ch01/05-setting-up-a-purview-account/create-resource.png)
*Review + create — the last stop before deployment, which typically takes a few minutes.*

## Protecting the account afterward

Because a Purview account holds your entire Data Map once it's in use, Microsoft specifically recommends creating an Azure Policy using the `denyAction` effect to block deletion of any Purview account tagged `Production` — a `Microsoft.Purview/accounts` resource whose `tags.environment` equals `Production` gets its `delete` action denied outright, cascading to the resource group too. This is worth setting up before you have real governed data in the account, not after an accidental deletion.

## Key terms

| Term | Meaning |
|---|---|
| Resource group | The Azure container that holds your Purview account (and, separately, its auto-managed resources) |
| Capacity unit (CU) | Default provisioned throughput/storage for a new account — 25 ops/sec, 10 GB metadata |
| Managed resource group | The auto-created group holding the storage account and Event Hub Purview provisions for ingestion |
| denyAction policy | An Azure Policy effect that blocks a specific action (like delete) on matching resources |

## Lab

If you have access to an Azure subscription (even a free-tier one), walk through the Basics tab of the Create Microsoft Purview account wizard without completing the deployment. Note which field you'd be least comfortable guessing at — name, location, or resource group — and why getting that one wrong is hardest to undo later.

## Check yourself

Why does the location you choose on the Basics tab matter more than most other fields in this wizard, and what Azure Policy effect does Microsoft recommend to protect a production account afterward?
