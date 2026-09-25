# Script — Connecting Leads, Accounts, Contacts & Opportunities

## Segment 1 (title)

Every Project One question crosses object boundaries. So before you build a report, know which objects carry which fields, and where the connections break. You learned the data model already, so this is a fast recap, applied.

## Segment 2 (code: the connection map)

When a rep converts a lead, Salesforce creates an Account, a Contact, and usually an Opportunity. The lead keeps a permanent record: IsConverted, and the converted account, contact, and opportunity Ids. The Opportunity looks up to one Account and has an Owner, one of our six reps. Contacts attach through Contact Roles.

## Segment 3 (steps: report types by question)

Match the question to a report type. Lead sources: the Leads report type. Where converted leads ended up: Leads with Converted Lead Information. Pipeline, rep pacing, and deal size: Opportunities. Who's involved in a deal: Opportunities with Contact Roles. And account questions use Accounts with a cross filter on Opportunities. The Lead Source travels with the conversion, which is how revenue traces back to its origin.

## Segment 4 (screenshot: cross filter)

Here's a real cross filter in the Lightning report builder. Show Me Accounts, with Opportunities. Flip it to without, and you've found accounts nobody is working.

## Segment 5 (code: SOQL relationships)

In SOQL, moving up to a parent uses dot notation: Account dot Name, Owner dot Name. Moving down uses a subquery on the child relationship name, Opportunities. Use reports when someone else needs the result. Use SOQL when you're exploring or auditing.

## Segment 6 (code: data quality checks)

Then check the data before you trust it. Count blank lead sources. Find null amounts. Find leads converted without any opportunity, and opportunities with no contact role, using an anti-join. Watch for open deals with old close dates. Write what you find into your final limitations. Those blanks and orphans are findings, not embarrassments. Report them.

## Segment 7 (outro)

With the objects connected and the data checked, we can build the pipeline and conversion analysis.
