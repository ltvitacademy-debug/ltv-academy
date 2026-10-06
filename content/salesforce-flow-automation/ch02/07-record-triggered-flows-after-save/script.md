# Script — Record-Triggered Flows: After Save

## Segment 1 (title)

Lesson 6 covered before-save — fast, but limited. This lesson covers after-save, the flexible option, chosen by selecting Actions and Related Records on that same Configure Start panel.

## Segment 2 (screenshot: Actions and Related Records selected)

This flow runs after the triggering record is already saved. In exchange, it can update any record, create new records, and run Actions — send an email, post to Chatter, call Apex. Everything before-save couldn't do.

## Segment 3 (screenshot: Create Records screen)

A common pattern: Opportunity closes won above a threshold, flow creates a related Contract. That's the Create Records element, configured with values pulled from the triggering Opportunity — and after-save has no restriction on which object this new record belongs to.

## Segment 4 (screenshot: Debug options)

Before activating, Salesforce's own best practice is to Debug first — run the flow against a real record you choose, without touching live automation.

## Segment 5 (screenshot: Debug result)

Debug walks through the flow's logic step by step and shows you exactly what happened, so you catch a wrong condition before any real user triggers it live.

## Segment 6 (outro)

Next up: screen flows — the flow type built for a user to actually sit in front of and interact with.
