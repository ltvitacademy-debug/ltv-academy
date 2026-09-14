# Script — Using Copilot to Explain and Fix a KQL Query

## Segment 1 (title)

Same review discipline as the last lesson, now applied to KQL: a broken query against an Eventstream-fed table, an explanation from Copilot, and a fix that still needs to be checked against the real schema before you trust it.

## Segment 2 (code: the broken query)

The query groups by a column called deviceId, and fails — that column doesn't exist in this table. The error alone doesn't tell you what the right name actually is, especially in a table you didn't build yourself.

## Segment 3 (code: copilot's explanation)

Copilot suggests this is a naming mismatch, and guesses device_id as the likely real name. That's a genuinely useful lead — but it's a guess based on common naming patterns, not a confirmed fact about this specific Eventstream's destination schema.

## Segment 4 (steps: verify before trusting)

Before applying the fix, check the real schema — run getschema or check the Eventstream's destination mapping, confirm device_id is actually there, and only then write the corrected query using the where, summarize, and bin fundamentals from earlier KQL lessons.

## Segment 5 (outro)

Copilot caught the naming issue but missed that the query was also missing a time window — that gap only shows up once you compare the result against what you actually needed. Next up: anomaly detection basics for AI-assisted data quality checks.
