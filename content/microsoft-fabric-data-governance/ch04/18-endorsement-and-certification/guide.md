# Lesson 18 — Endorsement and Certification

**Chapter 4 · Discovery and Lineage · Lesson 18 of 25**

## What you'll learn

- The two endorsement levels in Fabric — **Promoted** and **Certified** — and who's allowed to apply each one
- How to apply endorsement from an item's settings, using the **Endorsement** tab
- Where the resulting badge actually shows up: search results, the OneLake catalog, and Browse lists
- The tenant setting a Fabric admin uses to control who's allowed to certify content, and how that control works
- Why endorsement is a governance tool, not just a cosmetic badge

## Two levels, two very different audiences

Discovery (Lesson 16) and the OneLake catalog (Lesson 17) solve the problem of *finding* data items. Endorsement solves the next problem: once a student — or a colleague — finds five semantic models that all claim to report "revenue," which one should they actually trust? Fabric answers that with a simple badge system layered on top of every endorsable item (every Fabric item type except Power BI dashboards can carry one):

- **Promoted** — a lightweight, self-service signal. Anyone with write/edit access to an item can promote it themselves. It means roughly "I vouch for this — it's ready for others to use," with no review process required.
- **Certified** — a much stronger signal. Applying it is restricted to members of a security group a Fabric admin has specifically authorized to certify content. It means the item has been reviewed and meets the organization's quality and governance bar, not just one person's opinion of it.

Both badges exist to do the same job: steer people toward content that's already trustworthy, rather than letting everyone quietly rebuild the same report from scratch.

## Applying endorsement from an item's settings

Endorsement lives in the settings of the item itself. Open the item (a Lakehouse, warehouse, semantic model, dataflow, report, and so on), go to its **Settings**, and open the **Endorsement** tab. There you'll see up to four options — **None**, **Promoted**, **Certified**, and (on tenants that have enabled it) **Master Data**, a separate, even stricter tier covered elsewhere — plus an optional **Make discoverable** checkbox that lets users without access still find the item and request permissions.

![The Endorsement tab on a Fabric Lakehouse's item settings, showing None, Promoted, Certified, and Master Data options, each with a one-line description of what selecting it means.](/courses/microsoft-fabric-data-governance/ch04/18-endorsement-and-certification/request-item-endorsement.png)
*The Endorsement tab, found under any Fabric item's Settings — the same tab, with the same four levels, regardless of item type.*

Selecting **Promoted** and clicking Apply is available to anyone with write access — no approval step:

![The endorsement dialog for a Power BI semantic model with "Promoted" selected, plus a "Make discoverable" checkbox and an Apply button.](/courses/microsoft-fabric-data-governance/ch04/18-endorsement-and-certification/power-bi-promote-content.png)
*Promoting a semantic model — anyone with write access to the item can do this themselves.*

**Certified** works the same dialog, but the radio button is only selectable for users in an admin-authorized security group. Everyone else sees it grayed out, with a "How do I get content certified?" link that explains how to request it instead:

![The same endorsement dialog with "Certified" selected instead, showing the stronger wording: "Certify your dataset to show coworkers that it's been reviewed and meets your org's certification criteria."](/courses/microsoft-fabric-data-governance/ch04/18-endorsement-and-certification/power-bi-certify-content.png)
*Certifying a semantic model — only available to users in a security group the tenant admin has specifically authorized.*

## Where the badge shows up

Once applied, the badge isn't just a setting that sits unseen in the item's properties — it travels with the item everywhere it's listed: next to the item's name in search results, in the **Endorsement** column of Browse lists and workspace lists, in the OneLake catalog, and in the item's own details pane.

![A workspace Browse list with an "Endorsement" column showing a mix of Certified, Promoted, and Master Data badges next to different items, plus a close-up of a "Master data" badge shown in an item's details pane.](/courses/microsoft-fabric-data-governance/ch04/18-endorsement-and-certification/endorsement-badges.png)
*The badge in context — an "Endorsement" column in a Browse list (left) and a badge shown directly on an item's own page (right). This is exactly what shows up next to an item in search results and the OneLake catalog from Lesson 17.*

This is the real payoff: a student searching the OneLake catalog for "sales" sees three candidate semantic models, and only one carries a green Certified badge. That's the signal to use that one.

## Admin control: who's allowed to certify

Certification isn't self-service by design, and a Fabric admin has to deliberately turn it on. The control lives in the admin **Govern** hub: **OneLake catalog › Govern › Configurations › Tenant settings**, under **Export and sharing settings › Certification**.

![The Certification tenant setting, showing an Enabled toggle, a field for a documentation URL, and "Apply to" options for "The entire organization" or "Specific security groups," plus a checkbox to let domain admins override the setting.](/courses/microsoft-fabric-data-governance/ch04/18-endorsement-and-certification/certification-setup-dialog.png)
*The Certification tenant setting — this is the switch, and the security-group list, that decides who in the organization is allowed to certify anything.*

From this one screen, the admin:

- Turns certification **on or off** tenant-wide
- Optionally supplies a **documentation URL** pointing to the org's own certification policy — this becomes the "Learn more" link everyone else sees on the grayed-out Certified option
- Specifies one or more **security groups** (never individual named users) whose members are authorized to certify items, with an optional "except specific security groups" exclusion
- Can **delegate** the setting to domain admins, letting them override it for their own domain

Whether certification requires a formal review process is entirely up to the organization — Fabric doesn't enforce one. The documentation-URL field is how an org communicates that process (or the absence of one) to everyone who isn't authorized to certify content themselves.

## Why this matters for governance

Endorsement is one of the cheapest governance wins in Fabric. It costs nothing to turn on, and it directly attacks the most common failure mode in self-service analytics: five people independently building five slightly-different "customer churn" reports because nobody could tell which existing one to trust. A visible Promoted or Certified badge — right there in search results and the catalog — answers that question before a student even opens the item, and a tenant-wide Certified policy gives the organization a real quality bar to point reviewers at, instead of leaving "which data can I trust" as a question everyone has to ask around the office.

## Key terms

| Term | Meaning |
|---|---|
| Endorsement | Fabric's badge system (None / Promoted / Certified / Master Data) signaling how trustworthy an item is |
| Promoted | Self-service endorsement — anyone with write access to an item can apply it, no review required |
| Certified | Admin-controlled endorsement — restricted to members of an authorized security group, signaling org-reviewed quality |
| Endorsement tab | The tab in an item's Settings where endorsement is applied |
| Certification tenant setting | The admin Govern-hub setting (Tenant settings › Certification) that enables certification and names the authorized security groups |

## Lab

If you have edit access to a Fabric workspace item (a Lakehouse, warehouse, or semantic model you own), open its **Settings › Endorsement** tab and select **Promoted**. Apply it, then go find the item again from a workspace list or the OneLake catalog and confirm the badge now appears next to its name.

If you don't have an item to promote, do this instead: write out, in two or three sentences, a certification policy for a hypothetical organization. Name the specific security group (or groups) you'd authorize to certify content, and describe one concrete review step an item has to pass before that group certifies it.

## Check yourself

Can you explain the difference between Promoted and Certified — specifically, who is allowed to apply each one — and name the exact admin setting (hub, path, and setting name) that controls which security groups are authorized to certify content?
