# Pipeline-From-Requirements Planning Template

> Fill this in before opening Data Factory Studio. Turning an
> informal ask into a buildable spec is a real skill, separate from
> knowing how to configure an activity.

## The brief, verbatim

[Write down exactly what was asked, in the requester's own words —
not your interpretation of it yet.]

## Requirements, made explicit

[Break the brief into numbered, concrete requirements. "Every
morning" and "I need to know if it fails" are each a real
requirement, not just color — name them individually.]

1.
2.
3.

## Requirement → Design decision mapping

| Requirement | Data Factory concept | Why |
|---|---|---|
| | | |
| | | |

Common mappings to consider:
- Data lives on-premises → self-hosted integration runtime
- A time-based ask with an *unpredictable* real-world trigger
  condition → consider event-based, not Schedule
- "Must never silently fail" → Do-If-Else, not Try-Catch, wired to a
  real alert
- Any credential or connection string → Key Vault-backed linked
  service, never plain text

## Pipeline shape (before building)

[Sketch the activity flow in plain text or a diagram — source →
transform → sink, with error-handling branches marked.]

## Acceptance check

For each numbered requirement above, after the pipeline is built:

- [ ] Requirement 1: demonstrated how?
- [ ] Requirement 2: demonstrated how?
- [ ] Requirement 3: demonstrated how?

A requirement with no real, demonstrable answer isn't done — it's
assumed.
