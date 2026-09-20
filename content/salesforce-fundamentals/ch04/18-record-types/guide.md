# Record Types

Lesson 17 covered how a Picklist's values are configured per org. This lesson covers a
related but distinct concept: **Record Types**, which let a single object run more than
one business process at once, each with its own picklist values and page layout. An
analyst who doesn't know Record Types exist will see one Opportunity object and assume
every record in it follows the same rules — which is often wrong.

## What you'll learn

- What a Record Type is, and the real problem it solves
- A concrete example: different Opportunity Record Types for different sales processes
- Why Record Type is a field an analyst should check before assuming picklist values are uniform

## The problem Record Types solve

A single company often runs more than one genuinely different business process through the
same object. A company might sell both new business deals and renewal deals through the
Opportunity object — but a new-business deal might move through stages like Prospecting,
Qualification, and Proposal, while a renewal deal might move through a completely different,
shorter set of stages like Renewal Review and Renewed. Without Record Types, an admin would
either have to force both processes into one shared, compromised picklist, or build two
entirely separate objects. **Record Types** solve this by letting one object present
different picklist values, different page layouts, and different business processes,
depending on which Record Type a given record is assigned.

## A concrete example: Opportunity Record Types

Picture an org with two Opportunity Record Types: "New Business" and "Renewal." A New
Business record shows the Stage picklist with values like Prospecting, Qualification, and
Proposal — the classic new-deal sales process. A Renewal record, using the exact same
Opportunity object, shows a different Stage picklist tailored to renewals — maybe just
Renewal Review, Negotiating, and Renewed. Both are Opportunity records; both have a Stage
field; but the *values available* in that Stage field, and even which fields show up on
the page at all, depend entirely on the record's assigned Record Type.

## Why this matters for an analyst

If you're building a report or a query against Opportunity Stage without accounting for
Record Type, you can end up quietly mixing two unrelated business processes into one
misleading picture — or worse, filtering for a Stage value that only exists for one Record
Type and missing every record of the other type entirely. The **Record Type** field itself
is available on the record and in reports, which means the fix is straightforward once you
know to look for it: check whether an object has more than one Record Type before assuming
its picklist values, or even its overall business process, are uniform across every record.

## Key terms

| Term | Meaning |
|---|---|
| Record Type | A configuration that lets one object support different picklist values, page layouts, and processes per record |
| New Business (example Record Type) | A record type representing a fresh sales deal, with its own Stage values |
| Renewal (example Record Type) | A record type representing a renewal deal, with its own, different Stage values |

## Check yourself

If an Opportunity report filters for `Stage = 'Renewal Review'`, what would happen to New
Business records in that same org, and why does that make Record Type an important field
to check before trusting a Stage-based report?
