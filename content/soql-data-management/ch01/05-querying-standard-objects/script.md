# Script — Querying Standard Objects

## Segment 1 (title)

The last four lessons taught SOQL's grammar one clause at a time. Now we put it together on the three standard objects you will query most in a real org: Account, Contact, and Case.

## Segment 2 (code: Account)

Account first. Id, Name, Type, Industry, AnnualRevenue, and the billing city and state, filtered to technology companies over one million in revenue, sorted biggest first, limited to twenty-five rows. Industry is a picklist, so your value has to match your org's real values. AnnualRevenue is a currency field, so it compares to a bare number.

## Segment 3 (code: Contact)

Contact next. Names, email, phone, title, department, and AccountId. Not equals null is how SOQL tests for a populated field, just like IS NOT NULL in T-SQL. And AccountId is a lookup field. It stores the Id of the parent account. That stored Id is what relationship queries in Chapter 3 will follow.

## Segment 4 (code: Case)

Now Case. CaseNumber is the number a support agent sees, while Id is the real identifier. IsClosed equals false is a boolean Salesforce maintains for you, and it is safer than listing every open status by name, because each org defines its own statuses. Booleans are plain true and false, with no quotes.

## Segment 5 (steps: check the API name)

Before you query an unfamiliar object, open Object Manager and read the Fields and Relationships list. The label on a page layout is not always the API name. A misspelled name fails right away with a clear error, which is far better than a silently wrong result.

## Segment 6 (outro)

Account, Contact, and Case cover most of what you will query day to day. Next up: querying custom objects, where the double-underscore-c suffix comes in.
