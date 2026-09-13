# Script — Writing Custom Macros

## Segment 1 (title)

A macro is a named, reusable, parameterized chunk of Jinja — a function for SQL. Copy-pasted Jinja logic across three models is three places to update later; a macro is that same logic defined once and called by name from anywhere.

## Segment 2 (code: defining a macro)

Macro opens the definition, names it, and declares its arguments — a default argument lets callers omit it. Endmacro closes it. No return needed here — the macro's own rendered text is the output, substituted wherever it's called.

## Segment 3 (code: calling it, and what it compiles to)

Every model that needs a cents-to-dollars conversion calls the same macro. One place to fix a rounding bug, one place to add currency support later, instead of hunting down every copy-pasted round call across the project.

## Segment 4 (code: returning a real value)

Some macros need to hand back an actual value — a list, a dict — not just render text. That's what return is for: define the list once, and reuse it in every model, or macro, that needs it.

## Segment 5 (steps: when it's worth it)

Reach for a macro when the same logic shows up in more than one model. Don't reach for one to hide five lines of clear SQL behind a function call — that makes the compiled output harder to trace for whoever debugs it later.

## Segment 6 (outro)

Next lesson: dbt Packages — installing someone else's macros into your project instead of writing every reusable pattern from scratch.
