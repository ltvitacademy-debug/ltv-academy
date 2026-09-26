In SQL you choose columns with SELECT and rows with WHERE. pandas does both, with different syntax. This lesson maps each SQL idea to pandas, and clears up the one distinction that trips up almost every beginner.

To pick columns, pass a list in double brackets and you get a DataFrame. That is your SELECT column list. A single name in single brackets gives you a Series instead. Keep the difference in mind, because the extra pair of brackets changes what you get back.

Now the big distinction. Loc selects by label. Iloc selects by integer position, counting from zero. Here is the catch. Loc zero to two returns three rows, because label slices include the end point. Iloc zero to two returns two rows, because position slices exclude it. Memorize that, and you avoid a whole family of off-by-one bugs.

To filter rows, build a boolean mask first: a True or False for every row. Then hand it back to the DataFrame and only the True rows survive. Here, amount over one hundred keeps orders one, four and seven. The comparison is vectorized, just like NumPy.

Combine conditions with the ampersand for and, the pipe for or, and the tilde for not. The words and, or and not do not work on Series. And every condition needs its own parentheses, because the ampersand binds tighter than the comparison. Forget them and you get an error.

A few shortcuts map straight to SQL. Isin is IN, tilde isin is NOT IN, between is BETWEEN, and isna is IS NULL. Query lets you write the condition as a readable string. Next up: creating and transforming columns.
