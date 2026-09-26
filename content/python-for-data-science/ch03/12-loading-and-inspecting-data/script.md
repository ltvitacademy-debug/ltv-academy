Real data starts with a file, not a hand-typed dictionary. In this lesson you load a CSV into pandas, then run a short inspection routine that you will repeat on every dataset you ever touch.

read underscore csv turns a file into a DataFrame. In this course we read from a string so every example runs on its own, but with a real file you just pass its path. This is our illustrative orders table. Look closely: order five has an empty amount. Real data is never perfectly complete.

The routine has four steps. Head and tail, to check both ends of the file. Info, for column types and non-null counts. Describe, for numeric ranges. And isna dot sum, to count missing values. Run them in that order, every time.

Read info like a checklist. Eight entries, but amount has only seven non-null values, so one is missing. And order date is object, meaning pandas read the dates as plain text. That is the most common surprise in freshly loaded data. Describe adds the range: amounts run from forty-five to three hundred ten. One warning: it also summarizes ID columns, and averaging an ID means nothing. That judgment is yours.

You can often fix problems while loading. Parse dates converts a column to real dates. Use cols keeps only the columns you need. And n rows reads just the first few lines of a huge file. After parsing, order date is a true datetime instead of text.

Two minutes of inspection tells you what cleaning is ahead. Next up: selecting and filtering, so you can pull out exactly the rows and columns you want.
