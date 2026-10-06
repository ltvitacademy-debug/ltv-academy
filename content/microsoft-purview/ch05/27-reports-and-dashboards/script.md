# Lesson 27 — Reports and Dashboards · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter Five closes here. Lesson 26 asked how governed the estate is. This lesson asks a different question: is anyone actually using the catalog you've built?

## S2 · STEPS — A different question than Lesson 26

The Catalog Adoption report, part of the same Health section, answers usage, not compliance. What are users searching for? How many people used the catalog last month? What are the most-used assets? That's the adoption side of governance.

## S3 · SCREENSHOT — The dashboard itself

Fourteen monthly active users, down 22 percent. Total searches, 2K, up 17 percent. A number like that first one tells a Chief Data Officer the catalog exists, but adoption is slipping — a different kind of gap than a low curation score.

## S4 · STEPS — Three overlapping categories

Activity splits into three counts, and they deliberately overlap. Search and browse — anyone who searched or browsed. Asset curation — anyone who edited an asset in any way. And All — anyone who did both in the same window. Because one user can count in both of the first two, Search and browse can actually run higher than Monthly active users. That's expected, not a bug.

## S5 · SCREENSHOT — Most viewed, and their curation status

This tile asks a pointed question: are the assets people actually use the well-governed ones? SalesOrderHeader, the most-viewed asset at 68 views, is Fully curated. Account data, tied for least popular, is Not curated at all. That's a pattern worth noticing.

## S6 · SCREENSHOT — What people search for, and don't find

Top searched keywords splits into two views — searches with results, and without. Flipping to "no results" is arguably the more useful view: it's a direct list of catalog gaps, in your users' own words.

## S7 · STEPS — Who can see and export

Access runs through the same collection-based model as everything else. A Data Curator gets insights access automatically, scoped to their collections. A Data Reader needs the Insights Reader role explicitly granted — and only the root collection's Data Curator can grant it. Even then, exporting to CSV stays a Data Curator-only action.

## S8 · SCREENSHOT — Granting the role

Granting Insights Reader at the root collection — the one role assignment that unlocks these dashboards for someone who isn't a Data Curator.

## S9 · OUTRO

That closes Chapter Five. Chapter Six is governance workflows — starting with how Purview policies actually grant access to data.
