What are the biggest items, how do they rank, and how often does each category appear? In SQL that is ORDER BY, RANK and GROUP BY with a count. pandas answers all three directly, and this lesson shows you how.

Sort values orders the rows. Ascending is the default; pass ascending equals False for biggest first. Missing values go last by default, whichever direction you sort. To sort by several columns, pass lists, including a list of directions. Sorting keeps the original row labels, so reset the index if you want fresh numbering.

When you only need the top few, n largest and n smallest say so directly. Ask for the three largest amounts and you get orders four, seven and one. Both skip missing values, so there is no surprise row at the end.

Rank gives each row its position. Rank one is the smallest, so pass ascending equals False to make the biggest amount rank one. Missing values get no rank at all. The interesting part is ties. Average is the default. Min matches SQL's RANK. Dense matches DENSE RANK. And first matches ROW NUMBER. Pick the one that matches how your business defines rank.

Value counts is the most-typed method in exploratory analysis. It builds a frequency table in one line, sorted from most to least common. Here, five of our eight illustrative orders shipped. Pass normalize equals True and the counts become proportions, sixty-two point five percent shipped.

Add drop N A equals False to count missing values too. Up next: dates and times, where pandas really pays off.
