# Lesson 27 — Reports and Dashboards

**Chapter 5 · Lineage and Insights · Lesson 27 of 35**

## What you'll learn

- What the Catalog Adoption report answers that the Data Stewardship report from Lesson 26 doesn't
- The three categories of catalog activity Purview tracks, and why "Search and browse" can outnumber monthly active users
- Two specific drill-down tiles: Most Viewed Assets, and Top Searched Keywords
- Exactly who can view a report, who can export one, and who has to ask for access first
- A quirk worth knowing: why a report's generated timestamp isn't the same as its data's calculation time

## A different question than Lesson 26

Lesson 26 covered Data Stewardship: how *governed* the estate is — curation, ownership, classification rates. The **Catalog Adoption** report, part of the same Health section, answers a different question entirely: is anyone actually *using* the catalog you've built? It's a one-stop view for answering "what are my users searching for," "how many people used the catalog last month," and "what are the most-used assets" — the usage side of governance, not the compliance side.

![Screenshot of the Catalog adoption dashboard in Microsoft Purview, showing Monthly active users (14, down 22%) and Total searches (2K, up 17%) tiles, an Active users by feature category line chart, and a Most viewed assets table.](/courses/microsoft-purview/ch05/27-reports-and-dashboards/catalog-adoption-page-large.png)
*Fourteen monthly active users, down 22% — a number like this tells a Chief Data Officer the catalog exists, but adoption is slipping. That's a different kind of gap than a low curation score.*

## Three categories of activity, not one

The **Active users by feature category** chart breaks activity into three counts, and they deliberately overlap:

- **Search and browse** — anyone who searched or browsed the catalog
- **Asset curation** — anyone who edited an asset: added a rating, tag, glossary term, classification, description, certification, or contact
- **All** — anyone who did *both* a search/browse action *and* a curation action in the same window

Because a single user can be counted in both Search and browse *and* Asset curation, the **Search and browse** line can run higher than the overall Monthly active users count — that's expected, not a bug in the report.

## Most viewed assets — curation status, right next to usage

This tile answers a pointed question: are the assets people actually use the well-governed ones, or the uncurated ones?

![Screenshot of the Most viewed assets table in Microsoft Purview's Catalog adoption report, listing five assets — SalesOrderHeader, Contoso CashFlow, TwoWheelsSalesData.csv, SalesOrderDetail, Account data — each with a curation status (Fully curated, Partially curated, or Not curated) and a view count from the last 30 days.](/courses/microsoft-purview/ch05/27-reports-and-dashboards/most-viewed-assets.png)
*SalesOrderHeader, the most-viewed asset at 68 views, is Fully curated. Account data, tied for least popular at 6 views, is Not curated at all — a pattern worth noticing, not just a table to skim.*

## Top searched keywords — what people find, and what they don't

This tile splits into two views: keywords that returned results, and keywords that returned none.

![Screenshot of the Top searched keywords table in Microsoft Purview's Catalog adoption report, set to "Searches with results," listing keywords (asterisk, sales, profisee mdm, cash, phone) with their search volume over the last 30 days.](/courses/microsoft-purview/ch05/27-reports-and-dashboards/top-searched-keywords.png)
*"Searches with results" shows what people are finding. Flipping to "Searches with no results" is arguably more useful — it's a direct list of catalog gaps, in your users' own words.*

## A timestamp quirk worth knowing

The "Report generated on [date]" label at the top of every insights report reflects when the *page* loaded — not when the underlying numbers were actually calculated. Monthly active users and total searches specifically reflect the **previous fully completed month** (a report viewed in December shows November's numbers), and that figure refreshes on a weekly job run, not instantly. Reading today's date next to last month's numbers is normal, not a stale-data bug.

## Who can actually see and export these reports

Access to every Data Estate Insights report runs through the same collection-based permission model as everything else in Purview, with one extra layer:

- A **Data Curator** on any collection automatically gets read access to insights — but only scoped to the collections they have access to.
- A **Data Reader** sees the Data Estate Insights icon in the navigation, but clicking it returns a message to contact the root collection's Data Curator — until they're explicitly granted the **Insights Reader** role.
- Only the **Data Curator of the root collection** can grant Insights Reader to someone else; a Data Curator scoped to a subcollection can't.
- Even once granted, a Data Reader with Insights Reader still can't select **Export to CSV** — that export capability (useful for pulling filtered report data into Power BI Desktop for deeper analysis) is a Data Curator-level action.

![Screenshot of the "Add or remove insights readers" panel in Microsoft Purview, opened from the root collection's Role assignments tab, showing a search box to add a user, group, or service principal to the Insights readers role.](/courses/microsoft-purview/ch05/27-reports-and-dashboards/insights-reader.png)
*Granting Insights Reader at the root collection — the one role assignment that unlocks the dashboards for someone who isn't a Data Curator.*

## Key terms

| Term | Meaning |
|---|---|
| Catalog Adoption report | The Health-section report measuring catalog usage: active users, searches, most-viewed assets |
| Search and browse | One of three activity categories tracked — can exceed Monthly active users since one user counts in multiple categories |
| Insights Reader | The role (grantable only by the root collection's Data Curator) that lets a non-curator view insights reports |
| Export to CSV | A Data Curator-level action; Data Readers with Insights Reader still can't use it |

## Lab

Using the Most Viewed Assets table from this lesson, write one governance recommendation a data steward should act on — specifically connecting a usage pattern (high views) with a curation gap (Not curated). Then explain, in one sentence, why a Data Reader who was just granted Insights Reader still can't export that same table to CSV.

## Check yourself

Can you name the three overlapping activity categories in the Active users by feature category chart? Can you explain why "Search and browse" can be a higher number than Monthly active users? Can you explain the difference between what a Data Curator automatically gets versus what a Data Reader has to be explicitly granted?
