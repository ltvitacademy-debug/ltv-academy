# Script — Custom Fields, From an Analyst's Perspective

## Segment 1 (title)

This chapter built up the full picture: standard versus custom objects, field types, Record Types, and Page Layouts. This lesson closes it out with practical guidance on custom fields — the single most common source of confusion moving between orgs.

## Segment 2 (code: recognizing one)

Just like custom objects, every custom field carries a __c suffix on its API name. A field labeled "Renewal Risk Score" in the UI might have an API name like Renewal_Risk_Score__c. That suffix shows up in SOQL, in report exports, anywhere the real field name appears.

## Segment 3 (steps: why they vary)

A standard field like Opportunity Amount means the same thing everywhere. A custom field has no such guarantee — it might be a picklist in one org and a calculated formula in another. That's not a flaw, it's the entire point: custom fields exist so each org can model what's unique about its own business.

## Segment 4 (code: the checklist)

Four questions resolve most confusion with an unfamiliar custom field: what's its field type, does its object have Record Types, is it on the page layout you're comparing against, and who actually defined it.

## Segment 5 (outro)

Never carry an assumption about a custom field from one org into another. Next up: Chapter 5 opens with Object Relationships — how records actually connect to each other underneath all of this.
