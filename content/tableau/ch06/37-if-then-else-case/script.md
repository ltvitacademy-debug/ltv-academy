# Script — IF, THEN, ELSE & CASE

## Segment 1 (title)

IF, THEN, ELSE, and CASE. Tableau's conditional logic reads close to plain English, with one rule that trips up almost everyone the first time — every IF block must end with the keyword END.

## Segment 2 (code: IF / THEN / ELSEIF / ELSE / END)

Reading this top to bottom: Profitability equals, if Profit is greater than zero, then "Profitable." Otherwise, check the next condition — if Profit equals exactly zero, "Break Even." If neither matched, ELSE catches everything else and returns "Loss." END closes the whole statement. Forget the END, and Tableau's status message turns red with a syntax error before you can even save.

## Segment 3 (code: CASE / WHEN / END)

CASE is built for a different shape of problem: testing one field against a list of specific values. Region Code equals CASE, Region — then WHEN "East" THEN "E", WHEN "West" THEN "W", ELSE a question mark, END. CASE names the field once at the top, then lists exact values it might match.

## Segment 4 (code: combining conditions)

IF conditions can combine multiple tests with AND and OR. High Value Loss equals, if Profit is less than zero AND Sales is greater than 1000, then "Investigate," else "OK." Both conditions have to be true for the row to get flagged.

## Segment 5 (steps: IF vs. CASE)

So which one do you reach for? Use IF for ranges, comparisons, and conditions across multiple different fields. Use CASE when you're testing the same single field against a short list of known values — it reads cleaner for that specific shape of problem.

## Segment 6 (outro)

Next lesson, NULL handling and data-type calculations — ZN, ISNULL, IFNULL, and converting between text, numbers, and dates.
