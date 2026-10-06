# Script — Data Migration Cleansing and Validation

## Segment 1 (title)

Lesson fourteen decided what to migrate and how. This lesson covers cleansing the data before it's uploaded, and validating it after it lands. Skipping either is one of the most common causes of a rocky go-live.

## Segment 2 (steps)

Legacy data accumulates problems over years: duplicate suppliers, inconsistent naming, codes that don't map onto the new chart of accounts. Cleansing fixes these issues in the source data before a single load file gets built. That's exactly why enterprise structure decisions have to be locked down before migration can seriously begin.

## Segment 3 (steps)

Loading a file successfully isn't the same as loading it correctly. Validation reconciles what landed in Oracle Fusion against independent source totals from the legacy system: does the migrated trial balance tie out dollar for dollar? The Data Migration Lead runs the comparison, but the business process owner signs off that the numbers look right.

## Segment 4 (steps)

Mock conversion cycles exist specifically to rehearse cleansing and validation under real conditions, with real legacy extracts, before cutover. A mock load that fails validation is actually a good outcome here — it means a cleansing rule needs adjusting, caught weeks early instead of during the real cutover weekend.

## Segment 5 (outro)

Brightfield's first mock load fails on three bank account numbers with a dash format the FBDI template rejects. A cleansing step is added, the second mock load succeeds, and validation confirms the totals match, signed off by the Treasury Manager. Up next, chapter four: test planning, SIT, UAT, and defect management.
