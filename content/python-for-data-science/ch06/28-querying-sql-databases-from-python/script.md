# Script — Querying SQL Databases From Python

You already know T-SQL, and much of the world's data lives in databases. So the most valuable Python skill here is simple: send a query to a database and get the result back as a DataFrame, without exporting anything to CSV first.

The pattern is always the same. Open a connection, hand a SQL string and the connection to read SQL query, and you get a DataFrame. To practice without installing a server, we use SQLite, which ships with Python. We first load our small illustrative tables into it with to SQL, then select star from orders, and the dtypes come back as you'd expect.

For SQL Server, you create an engine with SQLAlchemy, which is the connection method pandas recommends. The URL names the dialect and driver, the host, the database, and the ODBC driver. This snippet is illustrative and not run here, since it needs your server. Check the SQLAlchemy documentation for your driver version and authentication, and keep passwords out of your notebook, in environment variables.

Any SQL you can write, you can send. Here a join with a group by and an order by returns one row per city, with order counts and revenue, already aggregated by the database. You wrote that query in T-SQL courses, and only the connection line is new.

When a query needs a value from Python, never paste it into the string. Pass it through the params argument, and the driver fills in the placeholders safely. We tested a malicious value: building the string by hand returned all six rows, while the parameterized version returned zero. Parameters prevent SQL injection and quoting bugs.

So where should the work happen? Let the database filter and aggregate, since it's built for that, and pull only what you need into pandas for exploring and modeling. Remember dialects differ: T-SQL uses TOP where SQLite uses LIMIT. And to send results back, use to SQL with if exists set the way you intend.

Next up, Lesson 29: pulling data from APIs.
