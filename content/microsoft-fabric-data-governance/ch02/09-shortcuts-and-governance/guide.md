# Lesson 9 — Shortcuts and Governance

**Chapter 2 · OneLake · Lesson 9 of 25**

## What you'll learn

- What a OneLake shortcut actually is, and why it matters for governance specifically
- How a shortcut shows up in lineage view, same as any other real dependency
- The one workspace setting that controls how shortcut data is cached
- Three governance questions every shortcut raises that a regular table doesn't

## What a shortcut is

A **OneLake shortcut** is a reference inside a Lakehouse (or other Fabric item) that points at data living somewhere else — another OneLake location, an Azure Data Lake Storage Gen2 account, Amazon S3, or another cloud source — without physically copying the data. To anyone browsing the Lakehouse, a shortcut looks and behaves like a normal folder. Underneath, Fabric is resolving every read through to the real, external location.

![A Fabric Lakehouse Explorer panel next to an ADLS Gen2 container, with arrows showing a "Transaction" folder in the Lakehouse is a shortcut resolving to the same-named container in ADLS Gen2.](/courses/microsoft-fabric-data-governance/ch02/09-shortcuts-and-governance/shortcut-connects-other-location.png)
*Microsoft's own diagram — a shortcut ("Transaction") in the Lakehouse resolves through to the real data sitting in an external ADLS Gen2 account.*

## Why this matters for governance, specifically

Everything this chapter has covered so far — OneLake governance (Lesson 6), lakehouse/warehouse governance (Lesson 7), OneLake security (Lesson 8) — assumed the data actually lives where it appears to live. A shortcut breaks that assumption on purpose. The data you're governing inside your workspace might physically sit in a completely different Azure subscription, a different cloud provider, or even a different organization's storage account. Access control, data residency, and classification all have to account for this indirection, not just the folder structure visible inside Fabric.

## Shortcuts are real dependencies in lineage view

This isn't a special case the lineage view (Lesson 19) has to work around — a shortcut is a genuine data dependency, and it shows up in lineage view exactly like any other one. If `TestLakehouse3` shortcuts data into `TestLakehouse4`, lineage view draws that connection as a real edge, the same as it would for a dataflow or a pipeline.

![Power BI service lineage view showing several TestLakehouse items connected by arrows, including a shortcut relationship between TestLakehouse3 and TestLakehouse4.](/courses/microsoft-fabric-data-governance/ch02/09-shortcuts-and-governance/lineage-view.png)
*A shortcut relationship between two lakehouses, drawn as a normal lineage edge — not a special, invisible case.*

This is exactly why Lesson 20's impact analysis matters for shortcuts: if the external source behind a shortcut changes or disappears, everything downstream of that shortcut is affected, the same as if a real table changed.

## The one setting every governance team should know: shortcut caching

By default, every read through a shortcut has to reach out to the external source. Fabric lets a workspace **enable caching for shortcuts**, storing a copy of recently-accessed shortcut data inside OneLake itself for a configurable retention period (1–28 days).

![Fabric workspace settings' OneLake page, with "Enable cache for shortcuts" toggled on and a 28-day retention period selected, plus a Reset cache option.](/courses/microsoft-fabric-data-governance/ch02/09-shortcuts-and-governance/shortcut-cache-settings.png)
*Microsoft's own screenshot — shortcut caching is workspace-level, with its own retention window and a manual reset.*

Caching is a performance feature, but it's a governance consideration too: cached data is a second copy, held inside your workspace, that exists independently of the source for up to 28 days. A deletion or access-revocation at the source doesn't automatically clear what's already cached — which is exactly the kind of gap a data retention policy (a topic the Data Security, Privacy & Classification course covers in depth) needs to account for.

## Three governance questions every shortcut raises

1. **Who controls access at the source, versus who controls access in Fabric?** A shortcut's permissions in Fabric don't override the source system's own access controls — both layers apply.
2. **Where does the data actually reside, for compliance purposes?** If a regulation requires data to stay within a specific region, a shortcut pointing outside that region is a real compliance question, even though the data "appears" inside a compliant workspace.
3. **How stale can cached shortcut data get before it's a quality problem?** The 1–28 day retention window is a real design decision, not a default to leave untouched.

## Key terms

| Term | Meaning |
|---|---|
| OneLake shortcut | A reference to data stored elsewhere, that behaves like a normal folder inside a Lakehouse |
| Shortcut caching | A workspace setting that stores a temporary copy of shortcut data inside OneLake for faster reads |
| Retention period (shortcuts) | How long cached shortcut data is kept, configurable from 1 to 28 days |

## Lab

For a Lakehouse you have access to (or a hypothetical one), list three governance questions you'd want answered before approving a shortcut into an external ADLS Gen2 account owned by a different team. Use the three-question framework above as a starting point.

## Check yourself

Can you explain what a OneLake shortcut actually is, why it shows up in lineage view like any other dependency, and why the shortcut-caching setting is a governance consideration, not just a performance one?
