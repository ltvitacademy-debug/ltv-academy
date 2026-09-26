Welcome to the capstone. You've learned the pieces. Now you'll use them together on one project, start to finish, the way a working data scientist would.

A quick note on the data. Real company data can't be shared, so we generate an illustrative retail orders file with NumPy and pandas. It's real-style: we deliberately built in the problems real exports have. A fixed seed means everyone gets identical numbers, and afterward you can repeat the workflow on any public dataset.

Start by framing the problem. Imagine the head of sales asks, where does our revenue come from, and are our discounts actually working? That's too vague to code. Sharpen it into two questions. Which regions, categories, and months drive revenue? And do heavily discounted orders contain more items, or just come back more often? Define your metric up front too. Revenue is quantity times unit price times one minus the discount, counted only for completed orders.

Then set up the project. Raw data goes in one folder and is never edited. Cleaned data goes in another. Cleaning code, tests, a notebook, and a README complete the layout.

Now audit before you clean. Load the raw file and change nothing. On our data we find fifteen hundred and thirty rows and nine columns, thirty exact duplicates, and missing values in region, quantity, and discount. Dates and prices are stored as text, with two date formats and a dollar sign in some prices. Region and status text is inconsistent in capitalization and spacing. And quantities include nine hundred ninety-nine, five hundred, and even zero and negative numbers.

Every finding becomes a written decision. Drop duplicates. Standardize the text. Convert prices and parse both date formats. Set a valid quantity range and drop the rest. Treat a missing discount as zero but flag it. Then add revenue and month columns.

Next lesson, we build it.
