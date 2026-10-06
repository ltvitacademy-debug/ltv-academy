# Lesson 21 — Curating Assets

**Chapter 4 · Catalog and Glossary · Lesson 21 of 35**

## What you'll learn

- The three layers of curation: description/tags, classifications/terms, rating/history
- What a curated asset actually looks like, compared to the uncurated one from Lesson 18
- Why ratings matter as social proof, not just a vanity metric
- Who's allowed to curate, and how bulk edit scales the work
- Why every curation action is logged, permanently

## Closing the gap from Lesson 18

In Lesson 18 we looked at an asset — "Feature Usage and Adoption" — that was technically searchable but practically useless: no description, no classifications, no glossary terms. **Curation** is the deliberate work of fixing that. It has three layers:

1. **Description and tags** — plain-language context that makes an asset both understandable and more findable in search
2. **Classifications and glossary terms** — what's actually inside the asset (sensitive data types, structure) and what it means in business language
3. **Rating and history** — social proof that other people trust this asset, plus a permanent audit trail of who changed what

## The same asset, curated

![The "Feature Usage and Adoption" Power BI report's asset page after curation: a full description, five tags (Engagement, Adoption, Fabric, Usage, Product), three classifications (All Full Names, Email Address, Geolocation), two glossary terms, and a 4-star rating from one reviewer.](/courses/microsoft-purview/ch04/21-curating-assets/curated-data-asset.png)
*The exact same asset from Lesson 18 — now curated. A description, tags, classifications, linked terms, and a visible rating.*

Compare this directly to the uncurated version from Lesson 18: same asset, same technical object, radically different usefulness. Nothing about the underlying Power BI report changed — only the business context layered on top of it in Purview.

## Ratings are social proof, not decoration

A star rating isn't just a number — selecting it opens the full picture.

![A ratings flyout panel showing a 4-out-of-5 star distribution (100% at 4 stars, 1 total rating) and a written review: "I love using this to track Fabric Adoption throughout my division."](/courses/microsoft-purview/ch04/21-curating-assets/asset-rating-flyout.png)
*A rating comes with a real written comment — this is a colleague vouching for the asset, not an anonymous score.*

This matters for discovery, too: remember from Lesson 18 that Purview's relevance engine favors curated, trusted assets in search results. A rated, reviewed asset doesn't just look better — it actually ranks better.

## Who can curate, and at what scale

Editing an asset's description, classifications, or glossary terms requires the **Data Curator** role on the collection that asset belongs to — this isn't open to everyone by design, since bad curation (wrong classifications, misleading descriptions) is arguably worse than no curation at all. Rating, by contrast, doesn't require that role; any reader can leave a rating.

For organizations with thousands of assets, curating one at a time doesn't scale. **Bulk edit** lets a curator select many search results at once and apply glossary terms, classifications, or contacts across all of them in a single action.

## Nothing is invisible

Every curation action — and every scan — is permanently logged in the asset's History tab.

![An asset's History tab, listing a timestamped sequence of changes: Update entity, Add classifications, Assign glossary terms, all the way back to the original "Create entity" event from an automated scan.](/courses/microsoft-purview/ch04/21-curating-assets/asset-history-overview.png)
*Who did what, and when — back to the very first automated scan that brought this asset into the catalog.*

This isn't bureaucracy for its own sake — it's what makes curation trustworthy at all. If anyone could silently edit an asset's classification with no record of it, a "Certified" or well-rated asset wouldn't mean anything.

## Key terms

| Term | Meaning |
|---|---|
| Curation | Adding description, tags, classifications, and glossary terms to make a found asset actually useful |
| Data Curator | The role required to edit an asset's description, classifications, or terms |
| Rating | A 1-5 star score (with optional written comment) any reader can leave on an asset |
| Bulk edit | Applying terms, classifications, or contacts to many search results at once |
| History | The asset's permanent, timestamped log of every change, back to its original scan |

## Lab

Take the uncurated asset you imagined for the Lesson 18 lab (or reuse that same one). Write out a full curation pass for it: a one-paragraph description, three tags, one classification it would likely carry, and one glossary term you'd link to it.

## Check yourself

Can you name the three layers of curation? Can you explain why ratings require no special role but editing a description does? Can you explain why the History tab matters for trust, not just for troubleshooting?
