# Script — Cleaning Data With Power Query

## Segment 1 (title)

Four real cleaning operations, all recorded as repeatable steps — none of them touch your original file, so they're safe to experiment with.

## Segment 2 (steps: remove duplicates)

Remove Duplicates lives in Home, Remove Rows. Select the columns that actually define a duplicate for your data first — a customer ID alone means something different than ID plus date — then run the command. Power Query keeps the first occurrence and drops the rest.

## Segment 3 (steps: split by delimiter)

A column like "Smith, John" is really two pieces of information crammed into one field. Home, Split Column, By Delimiter breaks it apart using whatever character separates the pieces — comma, hyphen, space, or a custom one you type in.

## Segment 4 (screenshot: data types)

Power Query guesses each column's type on load, and the guess is sometimes wrong — a ZIP code column can load as a number and silently drop a leading zero. The icon in every column header is clickable — use it to set the type explicitly.

## Segment 5 (screenshot: filter blanks)

Blank rows filter out the same way any other unwanted value does — open the column's filter dropdown and uncheck (blank). Because it's a recorded step, it keeps filtering new blank rows on every future refresh, too.

## Segment 6 (outro)

Next lesson: combining and appending queries — Merge, which reaches sideways to join two tables, and Append, which stacks them into more rows.
