# Script — Data Validation Checks

You've cleaned the data. But how do you know it's actually clean, and stays clean the next time the file changes? The answer is validation: small, explicit checks that fail loudly when data breaks your assumptions.

In T-SQL, constraints did this for you: primary key, check, foreign key, not null. A pandas DataFrame has none of that, so you write them yourself. Five families cover most needs. Uniqueness. Completeness. Ranges. Allowed values. And relationships, meaning every customer id in orders exists in the customers table.

Each one is a one-line expression. Is unique tells you whether a key repeats. Between checks a range, and note that missing values fail it. Is in checks allowed values, and is in against another table's column checks the relationship. Negating the check and filtering gives you the offending rows, which is what you actually need to debug.

Bundle the checks into one function that returns a named result for each rule. Our small illustrative orders table has six rules. Each entry is True or False, and the names make the report readable to anyone, not just the person who wrote the code.

Here the report shows four failures: a repeated order id, a negative amount, a customer id that doesn't exist, and an order dated in 2099. Then use assert with the list of failed rules. If anything failed, the pipeline stops with a clear message, instead of quietly loading bad data downstream.

Some practical habits. Fail fast, at the point where data enters your notebook. Show the bad rows, not just a count. And keep the rules in one place so they grow with your data. Libraries such as pandera and Great Expectations formalize this idea; check their current documentation when you're ready for them.

Next up, Lesson 27: reading and writing CSV, Excel and JSON.
