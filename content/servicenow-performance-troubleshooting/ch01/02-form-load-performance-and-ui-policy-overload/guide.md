# Lesson 2 — Form-Load Performance & UI-Policy Overload

**Chapter 1 · Diagnosing Slow Forms & Lists · Lesson 2 of 25**

## What you'll learn

- How UI Policies evaluate when a form loads, and why that evaluation isn't free
- Why a form governed by many UI Policies can accumulate real, measurable load delay
- The specific risk a "Run scripts" UI Policy introduces beyond simple field show/hide logic
- How to review a slow form's UI Policies to find redundant or unnecessarily expensive ones
- Why this diagnosis step follows directly from confirming the problem in the Slow Request Log

## One UI Policy is cheap. Many is not.

You already know UI Policies from the administrator's view in course 3 and their deeper
developer-level mechanics in course 6: a UI Policy watches a condition on a form and, when that
condition is true, changes field states — mandatory, read-only, visible — without requiring a
page refresh. A single UI Policy evaluating on form load is genuinely cheap; the platform checks
one condition and applies a small set of field changes. The problem shows up at scale. A form that
has accumulated ten, twenty, or more active UI Policies over years of incremental customization
asks the browser and the platform to evaluate every one of those conditions, every time the form
loads — even the ones that apply to a field nobody uses anymore, or that duplicate what another
policy already does. Each individual check is small. The sum of dozens of them, on every single
form load, is not.

## The real cost of "Run scripts"

Most UI Policies just set field states declaratively — no code involved, genuinely fast. The risk
escalates sharply with a UI Policy that has "Run scripts" enabled, because that option lets the
policy execute real client-side JavaScript inside its onCondition function the moment the form
loads. A quick script — hiding a related field, setting a default — is fine. A UI Policy running
an expensive onCondition script — looping over related records, making a synchronous GlideRecord
call, or performing heavy DOM manipulation — is doing meaningfully more work than a declarative
field-state change, and it's doing that work on the critical path of the form actually becoming
usable. One expensive "Run scripts" policy can outweigh a dozen simple declarative ones combined.

## What a real diagnostic pass looks like

Once the Slow Request Log has confirmed a specific form is genuinely slow to load — not just
rumored to be slow — the next real step is counting and reviewing the UI Policies that actually
govern that form. That means opening the list of active UI Policies scoped to the table (and any
that apply via policy on a related table), and asking pointed questions of each one: Is this
policy still needed, or does it reference a field that was deprecated years ago? Does it duplicate
logic another policy on the same form already handles, so the two could be consolidated into one?
Does it have "Run scripts" enabled, and if so, is the script inside doing anything that's
genuinely expensive, or could the same result be achieved with declarative field-state settings
instead? This review rarely requires rewriting anything clever — it mostly requires removing or
merging what's redundant.

## Why this matters beyond one form

A form accumulating UI Policies unchecked is a pattern, not a one-time accident — every new
requirement tends to add one more policy rather than revisiting whether an existing one could be
extended or retired. Left unchecked across many forms, this is exactly how an instance ends up
with widespread, hard-to-explain form-load sluggishness that no single change seems to fix,
because the slowness was never one big problem — it was dozens of small ones added up.

## Key terms

| Term | Meaning |
|---|---|
| UI Policy | A form-level rule that changes field states (mandatory, read-only, visible) when a condition is true |
| onCondition script | The client-side JavaScript a "Run scripts" UI Policy executes when its condition evaluates true |
| UI-Policy overload | Many active UI Policies on one form, each cheap individually but costly in total on every load |
| Redundant policy | A UI Policy whose logic duplicates, or is superseded by, another active policy on the same form |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why does a form with twenty
simple declarative UI Policies potentially load faster than a form with just one UI Policy that
has "Run scripts" enabled and an expensive onCondition function — and what's the first thing you'd
check on a reported-slow form after confirming it in the Slow Request Log?
