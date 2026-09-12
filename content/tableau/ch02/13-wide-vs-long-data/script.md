# Script — Wide vs. Long Data & Preparing Data for Tableau

## Segment 1 (title)

The same numbers can be arranged two different ways: wide, or long. Which one you have determines how well Tableau can actually use it.

## Segment 2 (steps: two shapes)

Wide data puts one row per entity, with separate columns for each category or time period — Region, Jan, Feb, Mar. Long data puts one row per observation instead — Region, Month, Sales — where every combination gets its own row. Wide is easier for a human to skim. Long is what Tableau actually wants.

## Segment 3 (steps: why Tableau wants long)

Tableau treats each column as one field you can drag onto a shelf or a filter. If Jan, Feb, and Mar are three separate columns, Tableau sees three unrelated fields — there's no single Month dimension to filter by or put on a date axis. Pivot that same data to long, and Month becomes one real field you can use anywhere.

## Segment 4 (outro)

Chapter 2 is done. Next, Chapter 3 starts building your first real visualizations, beginning with bar charts and Show Me.
