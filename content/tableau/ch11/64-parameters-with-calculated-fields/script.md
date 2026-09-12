# Script — Parameters with Calculated Fields

## Segment 1 (title)

Last lesson ended with a parameter that changed a number but nothing else. This lesson fixes that: referencing a parameter inside a calculated field is what makes it actually do something in your view.

## Segment 2 (screenshot: parameter referenced in a calculation)

This is the real Tableau calculation editor, referencing a parameter directly inside an IF statement — typed exactly like any other field, with Tableau's autocomplete suggesting it right alongside your dimensions and measures.

## Segment 3 (code: worked example)

Here's a complete version of that pattern: a calculated field called Stock Status compares quantity on hand against a Range parameter called Reorder Threshold, returning "Reorder Now" or "Stock OK." Drag Stock Status onto Color, show the parameter's slider, and moving it actually recolors the view — because the calculation re-evaluates every time the parameter's value changes.

## Segment 4 (steps: the pattern)

The parameter is always the input a person controls. The calculated field is always the behavior — what actually happens with that input. This exact split repeats for the rest of this chapter.

## Segment 5 (outro)

Next lesson uses this same pattern to do something bigger: let one parameter swap which entire field — which measure or dimension — a view is built on.
