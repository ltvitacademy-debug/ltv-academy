# Lesson 7 — Prorate Conventions and Calendars · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Almost no asset goes into service on day one of the fiscal year. This lesson covers how Oracle Fusion Assets decides exactly how much of that first year it actually depreciates.

## S2 · STEPS — What a prorate convention decides

A prorate convention maps an asset's date placed in service to a prorate period, which determines what fraction of a full year's depreciation is taken in year one. Mid-month treats the whole month as one point. Mid-quarter does the same, coarser. Half-year gives exactly half a year, no matter the exact date.

## S3 · STEPS — Two separate calendars

Don't conflate these. The depreciation calendar defines the fiscal years and periods a book uses to calculate depreciation — it doesn't have to match the GL calendar. The prorate calendar is separate, mapping actual dates to the prorate periods a convention looks up.

## S4 · CODE — Working the mid-month example

Meridian's CNC machine, ten thousand dollars a year straight-line, placed in service August 10th under mid-month. Five months remain in the calendar year — August through December. Ten thousand times five over twelve is four thousand one hundred sixty-six dollars, rounded, for year one.

## S5 · STEPS — Same asset, different convention, different number

Under half-year instead, that same machine takes exactly five thousand dollars in year one, regardless of whether it went into service in February or November. Same cost, same life — a materially different first-year figure, purely from the convention.

## S6 · OUTRO

Next lesson: depreciation books and fiscal years, where this calendar structure actually gets configured.
