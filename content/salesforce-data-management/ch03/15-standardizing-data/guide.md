# Standardizing Data

**Chapter 3 · Data Quality · Lesson 15 of 20**

A duplicate rule built on fuzzy matching, a report grouped by State, a dashboard filtered to "Closed Won" — all three quietly assume that the same real-world value is always typed the same way. Standardization is the discipline of making that assumption true. Like Lesson 14, this is conceptual: the fix lives in field setup and formulas, not one screen.

## What you'll learn

- Why inconsistent data quietly breaks reports, filters, and duplicate matching
- Picklists vs. free text, and when to force the choice
- State and Country picklists, Salesforce's built-in fix for address inconsistency
- Cleaning text automatically with a before-save Flow

## Why "Texas", "TX", and "texas " are three different values

To a report's `GROUP BY`, a filter's equality check, or an exact matching rule, these are three unrelated strings, not one state typed three ways:

```
"Texas"
"TX"
"texas "        -- trailing space
"Tx"
```

A grouped report on a free-text State field doesn't show one Texas total — it shows four small ones. This is the most common reason a report "looks wrong" even though every individual record is technically accurate.

## Picklists: remove the typing, remove the variance

The most reliable fix is architectural, not corrective: if a field has a known, finite set of valid values, make it a **picklist**, not free text. A picklist can't be typed inconsistently because it was never typed — it was selected.

```
Field: Shirt_Size__c
Type:  Picklist
Values:
  Small
  Medium
  Large
  X-Large
```

Free text is still the right call for genuinely open-ended fields (a Notes field, a company Description) — the goal isn't eliminating free text everywhere, it's using it only where the value truly varies.

## State and Country Picklists: the built-in fix for addresses

Address fields are the classic case Salesforce ships a dedicated feature for. With **State and Country/Territory Picklists** enabled (Setup → State and Country/Territory Picklists), every State and Country field across standard address fields becomes a controlled picklist instead of free text, with Salesforce maintaining the standard value list. New records get ISO-standard values; existing free-text data goes through a one-time cleanup pass Salesforce provides during enablement. This single setting change fixes "TX" vs. "Texas" vs. "texas" org-wide, for every object with an address.

## Cleaning what's already free text

For fields that have to stay free text, a **before-save record-triggered Flow** can normalize input automatically, every time, without relying on users to type carefully:

```
Before-Save Flow on Account:

  Account.Name = TRIM(UPPER(LEFT({!$Record.Name}, 1)))
               & MID({!$Record.Name}, 2, 254)

  -- or, more simply, standardize case + strip whitespace:
  Account.Website = TRIM(LOWER({!$Record.Website}))
```

Common cleanup formulas worth knowing by name:

```
TRIM(text)            -- removes leading/trailing spaces
UPPER(text) / LOWER(text)   -- forces consistent case
SUBSTITUTE(text, old, new)  -- replaces one substring with another
```

A before-save flow runs fast (no extra database round-trip) and applies the same cleanup to every save — manual or via Data Loader — so the standard doesn't depend on any one user remembering it.

## Recap

- The same real value typed differently breaks grouping, filtering, and exact matching, even though no individual record is "wrong."
- A picklist removes variance by removing free typing — use it wherever the valid values are known and finite.
- State and Country Picklists are the standard, org-wide fix for address inconsistency.
- A before-save Flow with TRIM/UPPER/LOWER/SUBSTITUTE cleans fields that must stay free text, automatically, on every save.

## Check yourself

A Lead Source field is free text, and reports show "Website," "website," and "Web Site" as three separate values. What's the better long-term fix: a validation rule that blocks bad spellings, or converting the field to a picklist? Explain your answer in one sentence.
