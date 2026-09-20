# Campaigns

Every Lead and Opportunity so far has just "appeared." In a real org, most of them trace back to
something: a specific marketing effort. That's the **Campaign** object — how Salesforce connects
marketing activity to real pipeline and revenue.

## What you'll learn

- What a Campaign object represents
- What a Campaign Member is, and how it links people to a Campaign
- How Campaigns connect to Leads and Contacts for ROI tracking

## A Campaign is a marketing initiative

A **Campaign** represents a specific marketing initiative — an email blast, a webinar, a trade
show booth, a paid ad push, a direct mail drop. It's a tracked, named effort with its own start
and end dates, budget fields, and (crucially for analysis) a defined set of people it was
targeted at or reached. Where Lead Source (Lesson 7) is a single, broad field on a Lead saying
roughly where it came from, a Campaign is a specific, trackable initiative with its own record —
much more granular than a Lead Source value alone.

## Campaign Members: the people connected to a Campaign

A **Campaign Member** is the join record connecting a Campaign to a specific Lead or Contact,
tracking that person's status with respect to that Campaign (commonly values like "Sent,"
"Responded," or "Attended" for an event). A single Campaign can have thousands of Campaign
Members; a single Lead or Contact can be a member of multiple Campaigns over time (that's how "we
touched this prospect five times before they converted" becomes answerable data instead of a
guess).

## Connecting Campaigns to Leads and Opportunities for ROI

Because Campaign Members link Campaigns directly to Leads and Contacts, and Leads convert into
Opportunities (Lesson 7), there's a real, traceable path from "we ran this Campaign" to "here's
the revenue it influenced." Salesforce also supports a **Primary Campaign Source** field directly
on Opportunity, which records which single Campaign gets primary credit for an Opportunity — the
field most Campaign ROI reports rely on. Understanding that path (Campaign → Campaign Member →
Lead/Contact → Opportunity) is what makes "which Campaign actually drove revenue" an answerable
question rather than a guess based on gut feel.

## Key terms

| Term | Meaning |
|---|---|
| Campaign | A specific, tracked marketing initiative (email blast, webinar, trade show, etc.) |
| Campaign Member | The join record connecting a Campaign to a specific Lead or Contact |
| Primary Campaign Source | Field on Opportunity recording which Campaign gets primary credit |

## Check yourself

How is a Campaign different from the Lead Source field covered in Lesson 7? What's the real
relationship path from a Campaign to the revenue it influenced?
