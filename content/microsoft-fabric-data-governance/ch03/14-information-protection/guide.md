# Lesson 14 — Information Protection

**Chapter 3 · Security and Protection · Lesson 14 of 25**

## What you'll learn

- How Microsoft Purview's label and policy priority order decides which label wins when content matches more than one rule
- How auto-labeling policies detect sensitive information types (credit card numbers, SSNs, passport numbers) and recommend or apply labels automatically
- The Fabric/Power BI tenant admin setting that must be enabled before sensitivity labels work on Fabric content
- The difference between labels that carry real protection actions (encryption, content marking, access restrictions) and labels used purely for classification and reporting
- Where admins go in the Purview compliance portal to see how labels are actually being applied across the tenant

## Beyond the label picker — the Purview program

Lesson 13 covered sensitivity labels from the end-user side: the label picker that shows up in the Fabric ribbon when you save a report or a semantic model, and how a label displays once it's applied. None of that picker exists on its own. Every label a user sees, every default that gets pre-selected, and every restriction that comes attached to a label is configured ahead of time in **Microsoft Purview** — specifically in the **Information Protection** solution of the Microsoft Purview compliance portal, not in the Fabric admin portal.

This lesson is about that admin-side program: how labels are organized and prioritized, how auto-labeling policies apply them without a person choosing, what a label is actually allowed to do to content, and how an admin checks whether any of it is working.

## Label priority order: which label wins

When an organization builds out its sensitivity labels in Purview, every label lands in a single ranked list on the **Labels** page under Information Protection. The position in that list is its **priority**, and Microsoft's own guidance is specific about the convention: your least restrictive label (something like *Personal* or *Public*) belongs at the **top** of the list with the lowest priority number, and your most restrictive label (*Highly Confidential*) belongs at the **bottom** with the highest number.

![Microsoft Purview's Labels page, with the Priority column showing numbered rank (0 - lowest, 1, 2…) and a context menu open on a selected label showing Move to top, Move up, Move down, Move to bottom, and Assign Priority options.](/courses/microsoft-fabric-data-governance/ch03/14-information-protection/sensitivity-label-reorder-options.png)
*Microsoft Purview's Information Protection Labels page — the Priority column ranks every label, and an admin can reorder it or assign a priority number directly from this menu.*

An admin can reorder a label with **Move up**, **Move down**, **Move to top**, **Move to bottom**, or by selecting **Assign Priority** and typing a specific number. This ordering matters for one reason above all: **conflict resolution**. A single piece of content can only carry one sensitivity label, but it's entirely possible for that content to match the conditions of more than one label's auto-labeling rule at once. When that happens, Microsoft Purview always resolves the conflict the same way — the label with the **highest priority number** is the one that's applied.

## Label policies: delivering labels to the right people

Labels by themselves aren't visible to anyone. They become usable only once they're published through a **label policy**, which bundles a set of labels together with the users or groups who should see them and the policy settings that apply (such as whether labeling is mandatory, or whether a justification is required to lower a label's sensitivity).

![Microsoft Purview's Label policies page, showing three policies — Standard policy, IT department policy, and Legal department policy — with a detail pane for the selected Standard policy showing its published labels and policy settings, and an Edit policy button highlighted.](/courses/microsoft-fabric-data-governance/ch03/14-information-protection/edit-sensitivity-label-policy-full.png)
*Label policies also carry their own priority order — a broad Standard policy for everyone, with narrower department policies layered on top.*

Just like individual labels, label policies have their own priority order, independent of the label order. A **Standard policy** might apply to every user in the tenant with the lowest priority number, while an **IT department policy** or **Legal department policy** applies to a smaller group with a higher number. A user can be covered by more than one policy at once, and if their settings conflict, Purview applies the settings from the policy with the **highest order number** — the more specific, higher-priority policy wins over the broad default.

## Auto-labeling policies: classification without a human choice

The label picker in Lesson 13 depends on a person making a choice. **Auto-labeling policies** remove that dependency: they scan content for defined conditions and either **recommend** a label (a banner prompts the user to accept it) or **automatically apply** it with no user action at all.

![Microsoft Purview's auto-labeling policy toolbar, showing Turn on policy, Restart simulation, Edit policy, and Delete policy options, with Edit policy highlighted.](/courses/microsoft-fabric-data-governance/ch03/14-information-protection/auto-labeling-edit.png)
*An auto-labeling policy can be edited directly from the Information Protection > Auto-labeling page, whether it's still running in simulation or already turned on.*

New auto-labeling policies default to **simulation mode** — the policy runs against real content and reports what it *would* have labeled, without actually applying anything. An admin reviews the simulation results, confirms the policy is catching the right content and not over- or under-matching, and only then turns the policy on for real.

## What triggers an auto-labeled match: sensitive information types

Auto-labeling conditions are built on **sensitive information types (SITs)** — the same detection catalog Microsoft 365 uses for data loss prevention policies. This is a large built-in library (with support for custom types) covering patterns like credit card numbers, passport numbers, national ID numbers, and bank account numbers.

![Microsoft Purview's sensitive info types picker for an auto-labeling condition, showing a searchable checklist including Japan Passport Number, France Passport Number, and U.S./U.K. Passport Number selected.](/courses/microsoft-fabric-data-governance/ch03/14-information-protection/sensitivity-labels-sensitive-info-types.png)
*Selecting sensitive information types for an auto-labeling condition — any content matching a selected type (passport numbers, SSNs, payment card data) can trigger the label, regardless of whether a user ever applies it manually.*

An admin picks the SITs relevant to the label being automated — for example, choosing credit card numbers and Social Security numbers to drive a *Highly Confidential* label. Once configured, any file, email, or (in Fabric's case) item whose content matches crosses the same priority-order logic described above if more than one label's conditions are met.

## Protection actions vs. classification-only labels

Not every sensitivity label does the same amount of work. Some labels exist purely for **classification** — a visible tag used for reporting and governance tracking, with no technical restriction attached. Others carry real **protection actions**:

- **Encryption** — restricts who can open the content at all, independent of where it's shared
- **Content marking** — headers, footers, or watermarks stamped onto the content so its sensitivity is visible even outside the original system
- **Access restrictions** — limits on sharing, such as disabling "people in your organization" links for content above a certain sensitivity

A *Highly Confidential* label, for instance, might combine encryption with a visible watermark, while a *Public* label is classification-only — present for reporting, but with nothing enforced. Which combination a given label carries is entirely up to how the organization configures it in Purview.

## Turning it on for Fabric and Power BI

None of this reaches Fabric or Power BI content automatically. A Fabric tenant admin has to explicitly turn on the tenant setting **"Allow users to apply sensitivity labels for Power BI content"** in the Fabric admin portal before the label picker from Lesson 13 even appears. Several downstream behaviors also depend on it directly — for example, a separate tenant setting that blocks "people in your organization" sharing links for content with a protected label only takes effect once this base setting, and the sharing-link setting itself, are both enabled.

## Seeing it tenant-wide: data classification reporting

Configuring labels, policies, and auto-labeling is only half the governance job — an admin also needs evidence that it's working. The Microsoft Purview compliance portal's **data classification** reporting (including content explorer and label analytics views) gives a tenant-wide picture of which labels are actually landing on content, how much content remains unlabeled, and where auto-labeling rules might need tuning. This is the reporting layer a governance team checks periodically, separate from any single label or policy configuration screen.

## Key terms

| Term | Meaning |
|---|---|
| Microsoft Purview Information Protection | The Purview solution where sensitivity labels, label policies, and auto-labeling policies are built and managed |
| Label priority (order) | The ranked position of a label in its list; when content matches more than one label's conditions, the highest-priority label is applied |
| Label policy | The configuration that publishes a set of labels to specific users or groups; policies have their own independent priority order |
| Auto-labeling policy | A policy that recommends or automatically applies a label based on detected sensitive information types, usually tested in simulation mode first |
| Sensitive information type (SIT) | A built-in or custom detection pattern (credit card number, SSN, passport number, and others) used to trigger auto-labeling and DLP |
| Protection action | What a label actually does to content — encryption, content marking, or access restrictions — as opposed to classification-only labeling |
| Data classification reporting | Tenant-wide reporting in the Purview compliance portal showing how labels are actually being applied across content |

## Lab

In the Microsoft Purview compliance portal (or on paper if you don't have tenant access), open **Information Protection > Sensitivity labels**. List out five labels in priority order, lowest to highest — for example: Public, General, Confidential, Confidential – Finance, Highly Confidential. For two of those labels, write one sentence each deciding whether it should be **classification-only** or carry a **protection action** (encryption, content marking, or an access restriction), and justify the choice based on the kind of content each label is meant to cover.

## Check yourself

Without looking back, can you explain why label priority order is what decides which label applies when content matches more than one rule, name the Fabric/Power BI tenant admin setting that has to be turned on before any of this reaches Fabric content, and describe the difference between a label with a protection action and a classification-only label?
