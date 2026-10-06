# Script — Flow Practice Lab: Case Escalation

## Segment 1 (title)

Second lab. This one's about a case nobody's actively chasing — still open past its SLA, with nobody escalated or notified. We'll make the platform notice on its own.

## Segment 2 (steps: the business problem)

A case open for 4 hours with no resolution and no escalation flag needs two things to happen automatically: priority bumped, escalated flagged, and every single person on that case team actually notified — in one email, not five separate ones.

## Segment 3 (code: start with a scheduled path, decision)

Case - After Save - SLA Escalation. Start on Case, after save, with a Scheduled Path: four hours after the case was created. That's what lets a record-triggered flow come back and re-check a record later instead of running only once at creation. Then a Decision — Still Open and Unescalated — checking Status isn't Closed and Escalated isn't already true.

## Segment 4 (code: get records and the bulkified loop)

Get Case Team Members queries CaseTeamMember for everyone on this case. Then the loop — and this is the bulkification habit from two lessons back — only collects email addresses into a collection. It does not send anything itself.

## Segment 5 (code: one send, outside the loop)

Escalated set to true, Priority set to High. Then one Send Email action, outside the loop entirely, addressed to the whole email collection at once. Six team members, one send — not six separate ones firing from inside that loop.

## Segment 6 (outro)

And because this runs after save, a failed notification can't block the case itself — but it still shouldn't fail silently. A fault path off Send Email creates a real Flow_Error__c record with the actual error and a link back to the case. Next up, the final lesson: Onboarding Wizard — a full screen flow, start to finish.
