# Lightning App Builder Page Planning Checklist

> Plan the page on paper before opening Lightning App Builder — the canvas's five parts (page
> name, toolbar, Components panel, canvas, Page properties) and the drag/drop/configure loop go
> much faster once these decisions are already made.

## Step 1 — Pick the page type

```
[ ] App Page    -- a custom home page for ONE specific app
[ ] Record Page -- overrides the standard layout for ONE object
[ ] Home Page   -- replaces the org-wide Lightning home screen
```

Pick exactly one per page you're building. A single screen showing every open Case for the
logged-in support rep, with no code, is a **Record Page** (or an App Page if it needs to live
outside any one record) — not a Home Page, which is org-wide by definition.

## Step 2 — List every component before dragging anything

```
Component                  Object/Source        Filter/Config           Why it's here
--------------------------  --------------------  -----------------------  ---------------------
e.g. List View              Case                  "My Open Cases"          Fast triage without
                                                                             opening each record
e.g. Report Chart            [report name]         --                       Glanceable summary
e.g. Related List - Dynamic  [related object]      Filtered to open only    Hide stale/closed data
e.g. Highlights Panel        (compact layout)       --                       Status at a glance
```

Fill this table in BEFORE opening the Components panel — it turns "drag, drop, configure" from
three decisions made live into one decision (configure) made against a plan you already wrote
down.

## Step 3 — Decide what Dynamic Forms should hide, and when

```
[ ] List every field that should NOT be visible until a specific condition is met
    (e.g. "Approved By" and "Approval Date" should stay hidden until Status
    reaches 'Awaiting Approval' -- an early-stage record has no business
    showing fields that don't apply yet)
[ ] For each hidden field, write the exact visibility rule (which field,
    which value, shown/hidden)
[ ] Confirm the fields you're NOT hiding are the ones every user of this
    page actually needs visible immediately
```

## Step 4 — Compact layout (highlights panel)

```
[ ] List the 2-4 fields that matter most for "scanning a list without
    opening the record" (e.g. current status, last-service date)
[ ] Confirm these are the fields a user is actually asked about most often
    -- not just whatever fields happen to be first on the page layout
```

## Step 5 — Before you activate

```
[ ] Save and preview the page with real-shaped data, not placeholder text
[ ] Confirm the page type matches what you picked in Step 1 (Lightning App
    Builder won't stop you from building the wrong type)
[ ] Activate -- and confirm WHO the activation applies to (org default, app
    default, specific record types/profiles, or just you as Lightning
    Experience default)
[ ] Tell the affected users what changed -- an unannounced page swap is a
    common source of "where did my fields go" tickets
```
