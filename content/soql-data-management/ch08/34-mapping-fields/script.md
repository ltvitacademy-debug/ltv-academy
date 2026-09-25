# Script — Mapping Fields

## Segment 1 (title)

Lesson 33 called for a field mapping document. This lesson is what goes into it, and the two problems that cause most mapping failures: type mismatches and picklist values.

## Segment 2 (code: a field mapping document)

A good mapping document has one row per field: the source column, the Salesforce object and field it lands in, and the transformation rule, whether that's as is, digits only, convert to an ISO date, or translate. Reviewing this with the business before loading saves a lot of reloading.

## Segment 3 (steps: where loads fail)

Type mismatches are the classic failure. A number field can't accept a currency symbol or thousands separator. Dates are ambiguous, so use the year-month-day format. Text longer than the field's length is rejected. And spreadsheets quietly strip leading zeros from codes like zip codes, so check them before you save a CSV.

## Segment 4 (code: picklist value translation)

Picklists need a translation table. The source system may store A, I, and P where Salesforce uses Active, Inactive, and Prospect. Decide what happens to blanks and unexpected values, too. A multi-select picklist takes its values in a single cell separated by semicolons. Build the crosswalk, get it reviewed, then apply it to the data before the load.

## Segment 5 (steps: errors you will meet)

Expect the error file to teach you things. A string too long error means a value exceeded the field length. A restricted picklist error means a value wasn't on the list, so it was rejected. Once your mapping is right in Data Loader, you can save it as an S-D-L file to reuse in later loads.

## Segment 6 (outro)

Next up: Migration Sequencing, where the order of your loads decides whether relationships survive.
