A notebook is a great place to explore and a poor place to hide mistakes. Clean code isn't about style points. It's about making your analysis something other people, including future you, can read, trust, and rerun.

Look at this cell. A variable called d, a column called s, another called q, and a mysterious zero point nine two. Nobody can tell what any of it means. Worse, pandas warns us that we're assigning into a slice of another DataFrame, because we never made a copy.

Now the clean version. Descriptive names: orders, status, quantity, unit price. The magic number becomes a named constant, LOYALTY DISCOUNT, with a comment saying why it exists. And the calculation lives in a small function called add order total. It copies its input, so it never quietly changes the caller's data, and it has a one-line docstring saying what it does.

Notebooks have a few habits that go beyond naming. First, keep the order top to bottom: imports and settings first, then load, clean, analyze, and conclude. Second, use Markdown headings so the notebook reads like a report. Third, write comments about why, not what. And fourth, before you share anything, choose Restart and Run All.

That last one matters more than it sounds. The kernel remembers every variable you've ever created, even ones you deleted from the code. A notebook can look fine and still depend on state that exists only in memory. Restart and Run All proves the notebook works from scratch, in order, the way a colleague will run it.

If you paste the same few lines into three cells, that's a function waiting to be written. Give it clear inputs, return a result, and avoid reaching for hidden global variables.

Small habits, big payoff. In the next lesson, we take the reusable logic out of the notebook completely and refactor it into a script.
