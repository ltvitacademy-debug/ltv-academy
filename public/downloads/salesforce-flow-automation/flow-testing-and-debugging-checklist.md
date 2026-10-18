# Flow Testing & Debugging Checklist

> Before activating any flow, and whenever one misbehaves in production — grounded in Lesson 21's
> Debug panel, Flow Test, and the lead-assignment lab's real format-mismatch bug (a State field
> stored as "California" being compared against a territory field stored as "CA" — no element
> ever errored, the flow just produced the wrong result).

## Before you activate a new flow

```
[ ] 1. DEBUG with sample input covering every path, not just the happy path:
       [ ] A value that SHOULD match (confirm the expected outcome)
       [ ] A value that should NOT match (confirm the fallback/No-Match path)
       [ ] A value that should trigger the fault path on purpose, if possible

[ ] 2. DEBUG "Run automation as another user" -- pick an actual lower-access
       user, not yourself. Debugging only as a System Administrator hides
       sharing and field-level-security problems a real user would hit.

[ ] 3. Compare the ACTUAL format of every field two elements compare against
       each other. A Get Records filter comparing Field A on one object to
       Field B on another silently fails to match if the two fields store
       the same concept in different formats (full state name vs.
       two-letter code is the textbook example) -- and this produces NO
       error, just a wrong result.

[ ] 4. Build a saved FLOW TEST (not just a one-off Debug run) using an
       actual, unmodified record shape -- not hand-picked input chosen
       specifically to dodge an edge case. A Debug run only proves the flow
       worked once, for you, today; a Flow Test keeps proving it after
       someone else edits an element months later.

[ ] 5. Confirm the fault path actually does something checkable:
       - Before-save/autolaunched flows: writes to a field (not a screen)
       - After-save/screen flows: can show a screen or send a notification
       Either way, confirm an admin has a way to discover a fault happened
       without a user having to report it.
```

## Diagnosing a flow that's already live and misbehaving

```
[ ] 1. Confirm whether this is an ERROR (an element actually failed -- check
       Debug Details for the exact element and platform error) or a SILENT
       WRONG RESULT (every element ran successfully, but the outcome is
       incorrect). These need different investigation paths.

[ ] 2. For a silent wrong result: re-run the exact failing scenario through
       Debug and read every element's actual input/output values -- don't
       assume a Get Records step "should have" found something; check what
       filter it actually ran and what it actually returned.

[ ] 3. If a Get Records/filter step returns 0 or unexpected results, check:
       [ ] Does the record it SHOULD have matched actually exist?
       [ ] Do both sides of the comparison store data in the SAME FORMAT?
           (full name vs. abbreviation, text vs. picklist API value, etc.)

[ ] 4. Check who the Flow Error Email Recipient is set to (Setup -> Process
       Automation Settings). If it's unconfigured, faults default to
       notifying the flow's own running user -- often not an admin who'd
       actually act on it. Point it at a real recipient.

[ ] 5. Once the root cause is found, write a Flow Test that specifically
       reproduces it, so the same bug can't silently reappear after a
       future edit.
```

## The core lesson

A flow that runs without any error can still be completely wrong. "It didn't throw an error" and
"it did what we wanted" are two different claims — only testing actual results against actual
expectations proves the second one.
