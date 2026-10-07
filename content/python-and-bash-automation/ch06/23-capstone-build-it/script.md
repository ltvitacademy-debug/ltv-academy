# Script — Capstone: Build It

## Segment 1 (title)

Lesson 22 laid out the plan: launch_store.py, one tool that renders a store's config, sets up its admin user, pulls an inventory baseline, and logs every step. This lesson writes it -- the first four items on the checklist, wired together into one script that actually runs.

## Segment 2 (code)

Three required arguments identify the store being launched: store ID, store name, and region. Marking them required means argparse itself rejects a bad call with a usage message, before a single line of the actual workflow runs.

## Segment 3 (code)

Rendering the store's config reuses the exact Environment and FileSystemLoader pattern from the Jinja2 lesson -- one template, filled with this store's values, written out to its own config path on disk.

## Segment 4 (code)

Rather than reimplementing lesson 18's idempotent bash script, this step just calls it with subprocess. Raising an error on a non-zero return code matters here, since the next step depends on the admin account actually existing -- the run needs to stop, not press on regardless.

## Segment 5 (code)

The inventory token comes from an environment variable, never hardcoded, following the secrets lesson's rule. raise_for_status turns a bad HTTP response into a Python exception instead of silently saving broken data to the baseline file.

## Segment 6 (outro)

main runs all three steps in order inside one try/except, so any failure gets logged clearly instead of leaving a half-finished store setup behind. Lesson 24 adds the Slack alert, handles the failure paths on purpose, and turns this into something you can present.
