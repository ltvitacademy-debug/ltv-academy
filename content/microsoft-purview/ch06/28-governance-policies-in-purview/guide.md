# Lesson 28 — Governance Policies in Purview

**Chapter 6 · Governance Workflows · Lesson 28 of 35**

## What you'll learn

- What a Microsoft Purview governance policy actually is, and what makes it different from an Azure RBAC role assignment
- The four parts every policy statement is built from: Effect, Action, Data Resource, Subject
- The two separate prerequisites a source needs before any policy on it does anything: enforcement turned on, and the right roles assigned
- Why writing a policy and publishing a policy are deliberately split across two different Purview roles

## What a governance policy is, and isn't

A Microsoft Purview policy is a rule, written and managed inside Purview, that grants access directly on a data source — Azure Storage, Azure SQL Database, and a growing list of others. It's easy to confuse this with Azure role-based access control (RBAC), but the two are distinct systems. RBAC assignments live in Azure, scoped to a resource, and someone with Owner or User Access Administrator on that resource manages them there. A Purview policy lives in Purview, written against a registered source, and once published it's enforced directly by that source — without anyone having to go open the Azure portal and hand-edit a role assignment every time access needs to change. The appeal is centralization: one governance team, working in one tool, can grant and audit access across a growing list of registered sources, instead of that responsibility being scattered across however many Azure subscriptions a company runs.

## The four parts of a policy statement

Every policy statement — the actual rule inside a policy — is built from exactly four parts:

1. **Effect** — today, the only supported value is Allow. There's no explicit Deny statement; access is opt-in by default, so a subject with no matching Allow statement simply has no access.
2. **Action** — the operation being granted: Read or Modify.
3. **Data Resource** — the fully qualified path to the asset the statement applies to. It's hierarchical, so a statement on a storage container automatically covers every blob inside it.
4. **Subject** — who the statement applies to: an individual user, a group, a service principal, or a managed identity, pulled from Microsoft Entra ID.

Read together, a statement reads like a sentence: *Allow Read on Data Asset FinData to group Finance-analyst.* That plain-language shape is deliberate — it's meant to be auditable by someone who isn't a Purview specialist.

![Screenshot of the Create policy screen in the Microsoft Purview governance portal, showing a Name and Description field, an example policy statement, and a policy statement row with Effect, Action, Data Resources, and Subjects dropdowns.](/courses/microsoft-purview/ch06/28-governance-policies-in-purview/create-new-policy.png)

*The four parts rendered as the actual form — Effect, Action, Data Resources, Subjects chained into one editable row.*

## Two prerequisites before any policy does anything

A freshly registered data source doesn't enforce Purview policies by default — two separate things have to be true first, and they're easy to skip past.

**First, enforcement has to be turned on, per source.** On the source's registration settings, **Data use management** has to be switched to **Enabled**. Nothing written in Purview reaches the source until this toggle is on.

![Screenshot of the Edit source dialog for an Azure Data Lake Storage Gen2 source in Microsoft Purview, with the Data use management toggle set to Enabled.](/courses/microsoft-purview/ch06/28-governance-policies-in-purview/enable-policy-enforcement-storage.png)

*Data use management, switched on — the prerequisite every other policy step depends on.*

**Second, the right people need the right Purview roles — and it's a deliberate two-role split.** Writing and editing a policy needs the **Policy author** role. Publishing it — the step that actually activates enforcement — needs a *different* role, **Data source admin**, assigned at the root collection.

![Screenshot of the Microsoft Purview governance portal Role assignments tab for a collection, showing Collection admins and Data source admins sections with a Contoso Admin user listed.](/courses/microsoft-purview/ch06/28-governance-policies-in-purview/assign-purview-permissions.png)

*Data source admin, assigned at the root collection — the role that has to sign off before a policy goes live.*

## Why the split matters

Splitting authoring from publishing isn't an accident of the UI — it's a checks-and-balances design. If one person could both write and publish a policy unilaterally, a single mistaken or malicious statement could grant broad access with no second set of eyes. Requiring a second role to publish means a Policy author drafts the change, and a Data source admin has to actually look at it and approve it before it's live. It's the same instinct behind a four-eyes approval process anywhere else in IT — just built directly into Purview's role model instead of left to an external process a team might forget to follow.

## Key terms

| Term | Meaning |
|---|---|
| Policy statement | One rule: Effect, Action, Data Resource, and Subject, read together as a sentence |
| Data use management | The per-source toggle that must be Enabled before any Purview policy on that source is enforced |
| Policy author | The Purview role that can write and edit policies |
| Data source admin | The Purview role, assigned at the root collection, required to publish a policy |

## Lab

Using the example statement style from this lesson, write out — in plain English, no Purview UI required — a policy statement for a hypothetical "HR-Records" data asset: who should get Read access, and who should explicitly not. Then write one sentence explaining which two prerequisites (from this lesson) would need to be true before that statement could actually take effect.

## Check yourself

Can you name all four parts of a Purview policy statement from memory, and explain in one sentence why publishing a policy requires a different role than writing one?
