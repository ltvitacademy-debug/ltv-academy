# Script — Why Analysts Need to Understand the Data, Not Just Query It

## Segment 1 (title)

This closes out Chapter One with the single most important idea in this course: knowing how to write a query isn't the same skill as knowing whether the result means what you think it means.

## Segment 2 (code: the dangerous kind of wrong)

A syntax error fails loudly — you notice immediately. A data-model error is far more dangerous: the query runs fine and returns a real, correctly formatted number that simply doesn't mean what you assumed.

## Segment 3 (code: double-counting example)

Here's a concrete version. An Account has many Contacts and separately many Opportunities. Join Account to Opportunity through Contact instead of directly, and every Opportunity for an Account with three Contacts gets counted three times over. The query runs. The number looks plausible. It's wrong.

## Segment 4 (steps: model first)

This is exactly why this course spends Chapter One on the platform and the next several chapters on objects and relationships before ever teaching SOQL syntax in depth. Understand the objects and how they connect, then query — syntax alone can't catch a bad join.

## Segment 5 (outro)

An analyst who understands the model catches that mistake before it ships. Next up, Chapter Two begins with the first core Sales Cloud object: Leads.
