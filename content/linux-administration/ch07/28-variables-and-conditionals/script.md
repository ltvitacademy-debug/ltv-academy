# Script — Variables & Conditionals

## Segment 1 (title)

A script that just runs the same commands top to bottom is only a shortcut; a script that can hold a value and make a decision is a real tool. Northbridge Retail's ops team uses exactly that combination to write one backup script that works across every server, instead of a slightly different copy for each one.

## Segment 2 (code)

A Bash variable is assigned with no spaces around the equals sign, and read back with a dollar-sign prefix — spaces in the assignment break it, because Bash parses the first word as a command instead. Always quote a variable when you use it, since an unquoted value containing spaces gets split into multiple words and can break a command in surprising ways.

## Segment 3 (steps)

The classic test syntax uses single square brackets, really a call to the test command, while Bash's own double-bracket syntax is more forgiving with unquoted variables and supports and-and or-or directly inside it. The key distinction to remember is that dash-eq, dash-lt, and dash-gt compare numbers, while double-equals and bang-equals compare strings.

## Segment 4 (code)

Every if block in Bash ends with fi, and elif lets you check an additional condition without nesting a second if block inside the else branch. Northbridge's backup script uses exactly this shape to create its backup directory if it's missing, confirm it's writable if it exists, or abort cleanly if it isn't.

## Segment 5 (code)

And-and runs the next command only if the previous one succeeded, while or-or runs it only if the previous one failed — a one-line alternative to a full if block for quick guards. That same pattern, like cd into a directory or exit, is exactly how a script bails out immediately instead of continuing to run from the wrong place.

## Segment 6 (outro)

Variables hold the values a script works with, and conditionals let it branch based on them — together they turn a fixed list of commands into logic. Up next, lesson twenty-nine: loops and functions, for repeating work and packaging logic you'll reuse across a script.
