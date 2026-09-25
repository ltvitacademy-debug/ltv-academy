# Identity Resolution

Once several data streams are mapped into Data Cloud (now branded Data 360), you have a new problem. The same person may appear as a Lead in Sales Cloud, a subscriber in Marketing Cloud, and a guest checkout in commerce, each with a slightly different name, email, and address. Counting customers, or segmenting them, from that pile gives wrong answers. **Identity resolution** is the feature that decides which records describe the same person or account and builds one unified profile from them.

## What you'll learn

- What an identity resolution ruleset contains
- How match rules and reconciliation rules differ
- What the unified profile is, and what happens to the source records
- Which numbers to read on a ruleset to judge whether it is working

## The problem, in T-SQL terms

You have met this before: deduplicating customers across systems with fuzzy joins, a normalized email column, and a rule for which duplicate's values win. Identity resolution is that whole pipeline, configured instead of coded. Two questions drive it: which records are the same entity, and when they disagree, whose value do we keep?

## Match rules: which records are the same

A **ruleset** is a container for match rules and reconciliation rules. **Match rules** tell Data 360 which profiles to unify. Each rule has one or more criteria, and profiles match when all the criteria within that rule are satisfied. Multiple rules within a ruleset are combined with OR, so a record can match through any one of them.

A common example, visible in Trailhead's screenshots, is a rule combining a fuzzy first-name match with a normalized email. Fuzzy matching tolerates spelling variations such as Rachel and Rachele, while the exact-match criterion on email keeps the rule from merging unrelated people. Rules can also match on party identifiers, such as a loyalty or driver's license number. Match rules run against mapped data model objects, which is one more reason the previous lesson's mapping step matters.

## Reconciliation rules: whose value wins

After records are matched, they may still disagree. A person's first name might differ across three sources, yet the unified profile can hold only one. **Reconciliation rules** choose a single value for each such field. They are set at the object level and can be overridden per field. Trailhead's example shows a default of Most Frequent for most fields, with Source Sequence for others, such as loyalty tier, where one source is simply more authoritative than the rest. Other options exist, such as most recently updated, so check the current documentation.

## The unified profile

The output is a **Unified Individual** (or Unified Account) record, plus link objects that tie each source record to its unified profile. Your source records are not deleted or overwritten; the unified profile is a new layer on top. Because the source links persist, you can always trace a unified customer back to the streams that contributed to it.

## Reading a ruleset's results

A published ruleset shows its status, last run status, and counts such as source count, matched count, and unified count, along with a consolidation rate and a processing history tab. Compare source to unified: a barely changed count means your rules may be too strict; a collapse that merges unrelated people means they are too loose. Both errors quietly distort every metric built on top. Salesforce also limits how many rulesets you can create, so check the current limits before designing several.

## Recap

Match rules decide who is the same person; reconciliation rules decide which values survive; the result is a unified profile that segments, insights, and analytics all build on. Test the rules against real data before trusting the counts.
