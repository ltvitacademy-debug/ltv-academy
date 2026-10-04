# Script — Cascading Parameters

## Segment 1 (title)

This lesson is about cascading parameters — chaining parameters
together so choosing one value narrows the list of choices available
in the next. There's no single dialog that shows a whole cascade at
once — it lives across each dataset's own Filters tab, each one
referencing the parameter one level up the chain.

## Segment 2 (screenshot: cascade-country-selected-state-narrowed)

Here's what that looks like live. Country is set to United Kingdom,
and the State dropdown — which could have listed every state in the
whole dataset — narrows down to just the one that actually belongs
there.

## Segment 3 (screenshot: cascade-state-selected-city-narrowed)

Add a State, and City narrows again, one more level down the exact
same chain. This particular report allows more than one City to be
checked at once, but the cascading mechanism underneath is identical
either way.

## Segment 4 (screenshot: cascade-final-filtered-report)

And here's the payoff — Country, State, and City all chosen, and the
report body reflects every link in that chain at once.

## Segment 5 (steps: order matters)

Order here isn't cosmetic. The sequence parameters appear under the
Parameters node in the Report Data pane is the order the reader gets
prompted at runtime — and it has to match the dependency chain.
Country has to come before State, because the State dataset's filter
references the Country parameter, and that value has to already
exist. Get the order wrong, and a parameter ends up referencing a
choice that hasn't been made yet.

## Segment 6 (outro)

Next lesson, we look at default values — letting a report run
automatically with sensible values already filled in, instead of
always waiting on the reader.
