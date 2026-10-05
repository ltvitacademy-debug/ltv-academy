# Lesson 22 — Governed Self-Service Analytics

**Chapter 5 · Governed Analytics · Lesson 22 of 25**

## What you'll learn

- Why self-service and governance aren't actually opposites in Fabric
- The three endorsement levels — Promoted, Certified, Master Data — and who can apply each one
- How an admin controls who is allowed to certify, tenant-wide
- What an endorsement badge actually buys a report author scanning a crowded catalog

## Self-service doesn't mean ungoverned

Chapter 1 covered workspace roles, and Lesson 21 covered semantic model permissions — both are **gates**: they decide who can create or access something. Self-service analytics means lots of people building lots of content, which gates alone can't keep organized. Endorsement is Fabric's other lever: not a gate, a **signal** — flagging which of the many self-service items are actually worth building on.

## Three levels, reached from the same place

Any item owner (or anyone with write permission) opens the item's settings and finds Endorsement right there, next to Sensitivity label:

![A Lakehouse's settings page with the Endorsement pane open, showing four radio options — None, Promoted, Certified, and Master Data — with "Certified" and "Master Data" each linking to "How do I get content certified?"](/courses/microsoft-fabric-data-governance/ch05/22-governed-self-service-analytics/request-item-endorsement.png)

*Every Fabric item — lakehouse, warehouse, semantic model, report — carries this same Endorsement pane.*

- **Promoted** — "I think this is good enough for others to use." Any owner or write-permission holder can set this on their own item. Low bar, by design — it's a self-service signal, not a review.
- **Certified** — "This meets the organization's quality bar." Only people an admin has specifically authorized can apply this — never the item's own owner, unless they happen to also be on that authorized list.
- **Master Data** — the strongest claim: this item is a core, authoritative source of organizational data. Reserved for items that actually hold data (lakehouses, warehouses, semantic models) — a report or a dashboard can't carry this badge.

## Who gets to certify is an admin decision

Certification only works because not everyone can grant it. A Fabric admin controls that from the admin portal, tenant-wide:

![An admin portal "Certification" setting, toggled Enabled, with options to apply it to the entire organization or specific security groups, and a field for a documentation URL.](/courses/microsoft-fabric-data-governance/ch05/22-governed-self-service-analytics/certification-setup-dialog.png)

*Certification is off by default — an admin has to deliberately enable it and decide who, across the whole tenant, is allowed to certify anything.*

Notice the **Specify URL for documentation page** field — an admin can link certification directly to the organization's own written standard for what "certified" means here, so the badge isn't just a label with no definition behind it.

## What the badge actually buys a report author

Scaled up across a real catalog, endorsement turns into exactly the scanning advantage a business glossary gave a spreadsheet in an earlier course:

![A catalog list view with Endorsement badges — Master data, Certified, Promoted — visible as a column across many items, next to a detail pane for one item showing who endorsed it as master data and when.](/courses/microsoft-fabric-data-governance/ch05/22-governed-self-service-analytics/endorsement-badges.png)

*Scanning for a Certified or Master Data badge is faster than asking around — and the detail pane shows exactly who made that claim.*

A report author facing dozens of similarly-named semantic models doesn't need to ask around — they scan for the badge. "Master data" says: build on this one, not someone's personal copy. That's self-service analytics staying fast while still pointing people at the right source, the same discovery problem Chapter 4's catalog and endorsement lessons introduced, now applied specifically to the models and reports people build every day.

## Key terms

| Term | Meaning |
|---|---|
| Promoted | Self-applied signal that an item is worth others using — any owner can set it |
| Certified | Admin-authorized reviewers only — meets the org's quality bar |
| Master Data | Strongest endorsement, reserved for items that hold data (lakehouse, warehouse, semantic model) |
| Certification setting | Tenant-wide admin control over who is allowed to certify anything |

## Lab

Pick any two items you've worked with recently (real or hypothetical) that do roughly the same job — two semantic models, two reports. Decide, out loud, which one deserves Promoted, which deserves Certified, and whether either qualifies for Master Data. If you can't justify Certified without an admin-authorized reviewer's sign-off, that's the point: write down who in your organization that reviewer should actually be.

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: why can't an item's own owner certify it themselves, the way they can promote it?
