# Script — Metadata-Driven Architecture

## Segment 1 (title)

This lesson is about metadata-driven architecture — one idea that explains why Salesforce admins can customize so much of the platform without writing a line of code.

## Segment 2 (code: data vs metadata)

Data is the actual business information in your records — the specific Account named Acme Corp, the specific Contact named Maria Gomez. Metadata is the blueprint behind it — the definition of the Industry field's picklist values, the Account page layout, a validation rule, a Flow that posts to Slack when a deal closes. Metadata is the blueprint; data is what gets built from the blueprint.

## Segment 3 (steps: clicks not code)

This is the real meaning behind "clicks, not code." When an admin adds a custom field through Setup, they aren't modifying Salesforce's underlying application at all — they're creating a new metadata record. There's no compiling, because the platform engine reads and executes that metadata at runtime.

## Segment 4 (steps: beyond the demo)

This matters way beyond the demo. Change sets move metadata, not data, between Sandbox and Production. Everything on AppExchange is a bundle of metadata, often plus real code. And modern development teams store an org's metadata as text files in Git, versioned exactly like software engineers version application code.

## Segment 5 (outro)

Next lesson, you'll look at release cycles — how Salesforce pushes platform-wide upgrades three times a year, and what that means for you as an admin who has to keep up with what's changing.
