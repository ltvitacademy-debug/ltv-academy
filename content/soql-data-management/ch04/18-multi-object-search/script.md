# Script — Multi-Object Search

## Segment 1 (title)

Time for a worked example. A prospect emails from Acme, and you want every Account, Contact and Lead connected to that name, with the fields you'd actually use.

## Segment 2 (code: fields per object)

Start with FIND Acme, RETURNING Account, Contact, Lead. That returns only record Ids. So put a field list in parentheses after each object. Account gets Id, Name, Industry. Contact gets Id, FirstName, LastName, Email. Lead gets Id, Name, Company, Status. No SELECT keyword, and each object is shaped for itself.

## Segment 3 (code: per-object filters)

Inside each object's parentheses you can add WHERE, ORDER BY and LIMIT, and they apply to that object only. Accounts in Technology, sorted by name, ten at most. Contacts sorted by last name. Leads where IsConverted is false. That's SOSL text matching with SOQL-style precision.

## Segment 4 (steps: reading the results)

Results are grouped by object, not one flat table. In Apex you get a list of lists, one per object, in the same order as RETURNING. Watch for three mistakes: forgetting the field lists, expecting a single combined table, and using terms so broad you hit the two-thousand record cap.

## Segment 5 (outro)

That completes Chapter 4. You can now query with SOQL and search with SOSL. Next up, Chapter 5 and Lesson 19: Installing and Configuring Data Loader.
