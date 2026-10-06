# Script — Automation on the Salesforce Platform

## Segment 1 (title)

Every Salesforce org eventually needs to do something automatically — update a field, create a record, send a notification. Salesforce used to offer three separate tools for this. Today there's really one: Flow.

## Segment 2 (screenshot: all flows list, process types)

Workflow Rules and Process Builder are both retired for new automation. Every flow you build today — whatever type it is — ends up in this one list in Setup, so it's worth knowing this list exists before you build something that already exists.

## Segment 3 (screenshot: all flows list, triggers)

That same list also shows you how each flow is triggered — by a record before it saves, by a record after it saves, or on a schedule. We'll walk through exactly what each of those means in the next chapter.

## Segment 4 (screenshot: New Automation categories)

When you start a new automation, Salesforce groups your options into four categories: Triggered, Scheduled, Screen, and Autolaunched. Keep those four words in mind — they're the map for this entire chapter.

## Segment 5 (steps: when to use Flow)

A simple rule of thumb: if you can describe the logic as "when X happens, do Y, unless Z," Flow can almost certainly do it. Complex or very high-volume logic is often still a job for Apex — but for everyday business process automation, Flow is the modern, Salesforce-recommended answer.

## Segment 6 (outro)

Next up: a tour of Flow Builder itself — the screen where all of this actually gets built.
