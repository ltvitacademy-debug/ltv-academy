# Script — Template Literals

## Segment 1 (title)

Template literals are how modern JavaScript builds strings, and they replace almost every use of plus-sign concatenation. Backticks instead of quotes, and a dollar-sign-brace syntax for inserting real values directly into the text.

## Segment 2 (code: backticks and interpolation)

A template literal uses backticks instead of quotes. Anything inside the dollar-brace is a real JavaScript expression that gets evaluated and inserted into the string — far easier to read at a glance which parts are literal text and which are data, compared to chaining a long string together with plus signs.

## Segment 3 (code: expressions inside)

The interpolation isn't limited to a plain variable — any valid expression works inside it, including math and even a ternary. This gets used constantly to format blockchain values for display, like converting a raw wei amount into something readable in one line.

## Segment 4 (code: multi-line strings)

A template literal can span multiple lines directly in the source code — a line break inside the backticks becomes a real line break in the string, with no backslash-n escape sequences required.

## Segment 5 (code: tagged templates)

One term worth recognizing even if you rarely write it yourself: a tagged template is a template literal immediately preceded by a function name, which receives the literal pieces and interpolated values separately before they're combined. You'll see the term in library documentation even as a beginner.

## Segment 6 (outro)

Backticks, dollar-brace interpolation with real expressions, multi-line strings for free, and the term "tagged template" for later. Next up: modules — splitting code across files with import and export.
