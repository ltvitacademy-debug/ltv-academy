# Script — Deal Size & Sales Cycle Analysis

## Segment 1 (title)

Question four: what's our typical deal size and sales cycle, and do bigger deals behave differently? This feeds forecasting directly. All numbers are illustrative, over the last four completed quarters.

## Segment 2 (code: the size bands)

Three size bands. Under twenty-five thousand: forty-four won deals, thirty-four days to close. Twenty-five to seventy-five thousand: sixty-six deals, fifty-five days. Over seventy-five thousand: thirty deals, ninety-six days. All together, one hundred forty deals, six-point-three million, about fifty-seven days.

## Segment 3 (code: the report recipe)

The recipe. Opportunities, won, last four quarters. Bucket the Amount column into the three bands, and group by the bucket. Measure the cycle with the Age field, or a row-level formula: close date minus the date value of created date. Summarize as average, and median if your builder offers it.

## Segment 4 (steps: what it says)

What does it say? Large deals are twenty-one percent of wins but forty-two percent of revenue. They take nearly three times as long. And they win less often, thirty percent versus thirty-seven. The overall fifty-seven day average describes almost no deal in particular.

## Segment 5 (steps: where data misleads)

Be honest about the data. Close dates are typed in by people, so they get backdated or slid. Won-only cycles hide time spent on lost deals. Thirty deals is a small sample. And an average can be dragged by a few unusual deals. SOQL can't subtract two date fields, so cycle length is a report job.

## Segment 6 (code: forecasting insight)

Now use it. Suppose four large open deals, about three hundred ninety thousand dollars, were created under sixty days ago and are marked to close this quarter. With a ninety-six day typical cycle, they carry serious timing risk, whatever the close date says. That reinforces the coverage warning from lesson six.

## Segment 7 (outro)

Next, we assemble everything into a dashboard and a presentation.
