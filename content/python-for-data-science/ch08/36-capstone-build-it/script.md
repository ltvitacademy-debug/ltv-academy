Time to build. Last lesson we wrote a cleaning plan. Now we turn it into code, run it, and answer both business questions.

Every item in the plan becomes one small function in a cleaning module. Drop duplicates. Standardize text. Parse types. Filter quantity. Handle discounts. Add revenue. A single function, clean orders, chains them with dot pipe. Because each step is small, each one is testable, and we wrote three tests that all pass.

One trick worth knowing is the mixed date formats. Parse the whole column with the year-first format, and errors set to coerce, so failures become missing. Parse it again with the month-first format. Then fill the gaps from one with the other. Every date matches exactly one format.

Now run it, and count the rows. Fifteen hundred and thirty raw rows, fifteen hundred after removing duplicates, and fourteen hundred and forty-two after the quantity rule. Always report what your cleaning removed.

Question one: where and when does revenue come from? Counting only completed orders, that's about one hundred eighty-four thousand dollars. The North leads the regions, with about fifty-one thousand. Electronics leads the categories, because its average order is around three hundred forty-six dollars. And the fourth quarter is thirty-five percent of annual revenue, despite being only a quarter of the calendar.

Question two: do discounts work? Group orders into discount bands. Average quantity per order stays flat at about three items in every band, so discounts aren't making people buy more per order. Return rates, though, climb from about seven percent with no discount to about thirteen percent in the deepest band.

Be careful with that wording. It's an association, and the top band has just a hundred and three orders. It's a lead to investigate, not proof.

Finally, a chart, saved from code you can rerun, makes the fourth-quarter surge obvious. Next, we wrap up and present.
