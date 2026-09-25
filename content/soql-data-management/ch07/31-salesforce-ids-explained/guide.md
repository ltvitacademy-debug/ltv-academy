# Salesforce IDs, Explained

You've included `Id` in nearly every query since Lesson 1. This lesson explains what an Id
actually is, and the one surprise that catches almost every analyst at least once: the same
record can appear with two different-looking Ids.

## What you'll learn

- The structure of a Salesforce Id, including its three-character object prefix
- The difference between the 15-character and 18-character forms
- How to avoid wrong matches when working with Ids in spreadsheets, exports, and imports

## What an Id looks like

```text
15-char:  001D000000IqhSL
18-char:  001D000000IqhSLIAZ
```

(Example values for illustration.) The first three characters are the **key prefix**, which
identifies the object: `001` is Account, `003` is Contact, `006` is Opportunity, `00Q` is
Lead, and `005` is User. That is a quick way to tell what kind of record an unfamiliar Id
belongs to.

## 15-character vs. 18-character

Both forms refer to the **same record**, and the first 15 characters are identical.

- The **15-character Id is case-sensitive.** `001D000000IqhSL` and `001D000000Iqhsl` are
  different Ids that could belong to two different records.
- The **18-character Id is case-insensitive.** Its extra three characters are a checksum that
  encodes which of the first 15 characters were uppercase, so the full value stays unique
  even when a tool ignores capitalization.

## Why analysts care

Many tools compare text without regard to case, and Excel's `VLOOKUP` and `MATCH` are the
classic example. If you join two exports on 15-character Ids, two different records whose
Ids differ only by capitalization can be treated as the same value and return the wrong row.

```text
001D000000IqhSLIAZ   (record A)
001D000000IqhslIAB   (record B)
```

The 18-character forms end in different suffixes, so they remain distinct.

## Practical rules

- **Prefer 18-character Ids** whenever you join or compare data in a spreadsheet.
- Exports through the API and Data Loader return 18-character Ids, while the 15-character form
  appears in some places, such as record URLs in the browser.
- If you only have 15-character Ids, a formula field using the `CASESAFEID()` function returns
  the 18-character version.
- When loading, Data Loader and the API accept **either** form.

## Key terms

| Term | Meaning |
|---|---|
| Id | The unique identifier of a Salesforce record |
| Key prefix | The first three characters of an Id, identifying the object type |
| 15-character Id | Case-sensitive form of a record Id |
| 18-character Id | Case-insensitive form; adds a 3-character checksum suffix |
| CASESAFEID() | Formula function that returns the 18-character version of an Id |

## Check yourself

You join two lists of Ids in Excel, one of them supplied by a colleague as 15-character Ids,
and get a few impossible matches. What is the most likely cause, and what would you do to prevent it?
