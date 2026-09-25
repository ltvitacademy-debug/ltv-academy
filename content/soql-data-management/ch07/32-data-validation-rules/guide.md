# Data Validation Rules

This chapter has been about finding and fixing bad data. The most durable fix is stopping bad
data from getting in at all. **Validation rules** are Salesforce's main tool for that, and
they matter to you as an analyst because they apply not just to what users type but to what
you load.

## What you'll learn

- How a validation rule is built and what it does to a save
- How rules interact with API and Data Loader loads
- What validation rules do not do, and how SOQL fills the gap

## How a validation rule works

A validation rule is a **formula that evaluates to `TRUE` when the data is invalid**. When a
record is created or updated, Salesforce evaluates the formula. If it returns `TRUE`, the save
is blocked and your error message is shown, either at the top of the page or next to a field.
You create rules in Setup, under the object's Validation Rules.

```text
AND(
  ISPICKVAL(StageName, "Closed Won"),
  ISBLANK(Amount)
)
Error message: Enter an Amount before marking an Opportunity Closed Won.
```

Read it as "block the save when the stage is Closed Won and Amount is blank." The logic is
inverted from what people expect: `TRUE` means bad data. Common formula functions include
`ISBLANK`, `ISPICKVAL` (for picklist fields), `AND`, `OR`, `NOT`, and `REGEX`.

## Validation rules and your loads

Rules are not limited to the browser. They run on saves that come from the API, Data Loader,
and other automation too. In practice:

- A Data Loader row that violates a rule is **rejected** and appears in the **error file**
  with the rule's message. Other rows in the same load can still succeed, so a partly
  successful load is normal.
- Read the error file. A wall of identical validation errors usually means your source data
  breaks a rule, or the rule needs a thought-through exception.
- Test loads in a **sandbox** first, so you learn which rules fire before production.
- Many orgs let trusted integration users bypass certain rules, commonly using a custom
  permission checked inside the formula. That is a deliberate design decision for admins to
  make and document, not a shortcut for a hard load.

## What validation rules don't do

A rule only fires **when a record is saved**. It does not clean existing data, and an old
record that already violates a rule can fail its next update even if you did not touch the
offending field. Use SOQL to audit what is already there:

```sql
SELECT Id, Name
FROM Opportunity
WHERE StageName = 'Closed Won'
  AND Amount = null
```

That pairing is the whole chapter in miniature: rules **prevent** new bad data, SOQL
**detects** the old.

## Key terms

| Term | Meaning |
|---|---|
| Validation rule | A formula that blocks a save when it evaluates to TRUE and shows an error message |
| Error message | The text shown to the user, or written to the load error file, when a rule blocks a save |
| ISPICKVAL | Formula function for testing the value of a picklist field |
| Bypass | A controlled way, such as a custom permission, for certain users or integrations to skip a rule |

## Check yourself

Your Data Loader insert of 5,000 Contacts finishes with 4,200 successes and 800 errors, all
with the same validation message. What do you do next, and why is this not a reason to
simply deactivate the rule?
