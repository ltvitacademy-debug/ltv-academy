# Script — Building a Small Preference Dataset

## Segment 1 (title)

Lesson 10 made the case for pairwise preference over absolute scoring. This lesson builds the actual dataset: corrupt real Northwind rows, generate two candidate cleanups from two different rule-based cleaners, and have a human rater pick the one they'd keep.

## Segment 2 (steps)

Starting from roughly three hundred real Northwind customer rows, each gets synthetically corrupted with messy phone formatting, country name variants, casing and whitespace noise, or a malformed postal code. Each corrupted row then runs through two cleaners, light touch Cleaner A and aggressive Cleaner B, and a human rater picks between the two candidates, discarding genuine ties.

## Segment 3 (code)

Cleaner B is deliberately aggressive: it uses a canonical country name lookup table and a strict phone reformat to a single fixed pattern. That strictness sometimes overcorrects — a strict phone format can silently truncate a real extension digit that didn't fit the pattern.

## Segment 4 (steps)

The rater applies a short, ordered rubric. No information loss comes first — did either candidate drop or corrupt real data. Correct normalization comes second — did it actually fix the problem. Consistent formatting comes last, a tiebreaker only when the first two criteria don't decide it.

## Segment 5 (outro)

Running this process over roughly three hundred corrupted rows, through both cleaners, rated by the human researcher, with ties discarded, produces roughly two hundred sixty labeled chosen and rejected preference pairs. Up next, Lesson 12: training a reward model on these pairs.
