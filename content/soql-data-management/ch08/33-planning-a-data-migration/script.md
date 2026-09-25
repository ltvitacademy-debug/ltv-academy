# Script — Planning a Data Migration

## Segment 1 (title)

Chapter Eight is about moving data into Salesforce, and Lesson 33 starts where good migrations start: with a plan. Most migration failures can be traced to something that should have been decided before a single row was loaded.

## Segment 2 (steps: most migration problems start before the load)

Four steps. Analyze the source system. Scope what to migrate and what to leave behind. Map source fields to Salesforce fields. And rehearse: run a trial load in a sandbox before production, so the surprises happen where they're cheap.

## Segment 3 (code: source analysis questions)

Source analysis means profiling. How many rows are in each table? Which columns are always blank? Are there duplicate customers? What are the real keys? Which dates and codes look strange? Answers to these questions shape everything that follows, and you already have the SQL skills to answer most of them from the source.

## Segment 4 (steps: migrating everything is not a goal)

Just as important is deciding what not to migrate. Stale records nobody has touched in years. Duplicates, which are far cheaper to clean in the source first. Junk such as test rows and fields nobody uses. Old history can often be archived outside Salesforce instead. Every record you load also counts against your data storage, and every row is something you'll have to validate.

## Segment 5 (code: a migration plan on one page)

Write it all down on one page: the objects and their load order, the field mapping document, the excluded data with the reasons, an External Id field for each object, any automation to pause during the load, and a plan for validation and rollback. If a load needs to keep original created dates, the org has to enable the Set Audit Fields upon Record Creation setting, so ask early.

## Segment 6 (outro)

Next up: Mapping Fields, where type mismatches and picklist translation live.
