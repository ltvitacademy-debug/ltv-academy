# Data Migration Cleansing and Validation

Lesson 14 decided what to migrate and how. This lesson covers the two disciplines that make sure what actually loads is correct: cleansing the data before it's ever uploaded, and validating it after it lands. Skipping either is one of the most common causes of a rocky go-live.

## What you'll learn

- What data cleansing actually involves, and why it happens before load, not after
- How validation proves a load is correct, not just "complete"
- Why mock loads exist specifically to rehearse this cleansing-and-validation cycle
- How Brightfield validated its Cash Management conversion

## Cleansing: fixing data before it moves

Legacy data accumulates problems over years: duplicate supplier records, inconsistent bank account naming, codes that don't map cleanly onto the new chart of accounts or business unit structure, missing required fields that the legacy system never enforced. **Cleansing** means fixing these issues in the source data — deduplicating, standardizing formats, mapping old codes to new ones — before a single FBDI file gets built. Cleansing against a target structure that doesn't exist yet is impossible, which is exactly why enterprise structure decisions (Lesson 9) have to be locked down before data migration can seriously begin.

## Validation: proving the load is actually correct

Loading a file successfully (no FBDI errors, every row processed) is not the same as loading it *correctly*. **Validation** reconciles what landed in Oracle Fusion against independent source totals from the legacy system — does the migrated GL trial balance tie to the legacy trial balance, dollar for dollar? Does the count of open AP invoices match? Does the sum of unreconciled bank statement lines agree? Validation is usually a joint exercise: the Data Migration Lead runs the comparison, but the Business Process Owner for each module signs off that the numbers look right from a business perspective, not just technically.

## Why mock loads exist

Mock conversion cycles (introduced in Lesson 14) exist specifically to rehearse cleansing and validation under real conditions, with real legacy data extracts, before the cutover weekend. A mock load that fails validation is a good outcome at this stage — it means a cleansing rule needs adjusting, caught weeks before go-live rather than discovered live during cutover (Chapter 5) when there's no time to fix it properly.

## Brightfield Industrial Group: validating the Cash Management load

Brightfield's first mock load for Cash Management surfaces a cleansing problem: three legacy bank account numbers include a dash format the new FBDI template doesn't accept, causing those rows to fail. The Data Migration Lead adds a cleansing step reformatting account numbers before the next mock load. On the second mock load, every row loads successfully, and validation confirms the count and dollar total of open unreconciled items in Oracle Fusion exactly matches an independently pulled legacy report — signed off by the Treasury Manager before the team proceeds toward the real cutover load.

## Key terms

| Term | Meaning |
|---|---|
| Cleansing | Fixing legacy data issues before it is loaded: deduplication, formatting, code mapping |
| Validation | Reconciling what landed in Oracle Fusion against independent legacy source totals |
| Mock conversion cycle | A rehearsal of cleansing and validation using real data, before the real load |

## Recap

Cleansing fixes legacy data problems before load; validation proves what landed actually ties back to legacy source totals, with Business Process Owner sign-off closing the loop. Mock loads exist to catch exactly this kind of problem early. Brightfield's account-number formatting issue was caught and fixed a full cycle before the real cutover. Next up, Chapter 4: test planning, SIT, UAT, and defect management.
