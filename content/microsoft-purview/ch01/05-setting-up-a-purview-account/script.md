# Lesson 5 — Setting Up a Purview Account · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Let's actually stand one of these up — a real Microsoft Purview account, from the Azure portal, step by step.

## S2 · SCREENSHOT (accounts page)

Search for Microsoft Purview in the Azure portal and you land on the accounts page — every Purview account in your current subscription filter, with its resource group, location, and status. Select Create to start.

## S3 · SCREENSHOT (create button)

That opens a five-tab wizard: Basics, Networking, Configuration, Tags, and Review plus create.

## S4 · STEPS CARD (prerequisites)

Three things before you click Create. You need Contributor or Owner on the subscription itself. You can normally only have one Purview account per tenant — check first. And if your organization blocks Storage account or Event Hub creation with Azure Policy, you need an exception tag configured, or deployment fails partway through.

## S5 · SCREENSHOT (basics tab)

On the Basics tab: subscription, resource group, a globally-unique account name, and location. That location choice matters more than it looks — it's where your metadata actually lives, and you cannot move a Purview account to a different region after creation.

## S6 · SCREENSHOT (tags tab)

On Tags, you apply the environment convention from Lesson 3 — Production, Test, Dev, whatever fits. This is purely for your own organizational and billing clarity; Purview itself doesn't read or enforce this tag.

## S7 · STEPS CARD (protect the account)

Once it's deployed, protect it. Microsoft specifically recommends a denyAction policy — matching on Microsoft.Purview/accounts where the environment tag equals Production, blocking delete outright. Set this up before real governed data lives in the account, not after something gets deleted by accident.

## S8 · OUTRO CARD

Account's running. Chapter 2 starts next lesson — collections and domains, how you actually organize everything this account is about to hold.
