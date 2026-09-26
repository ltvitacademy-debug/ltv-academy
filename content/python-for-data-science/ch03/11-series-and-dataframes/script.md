Welcome to pandas. If you know SQL, you already know what a table looks like. pandas gives you that table inside Python, and it is built on just two objects: the Series and the DataFrame.

Here is the map for this lesson. A Series is one column of values with a label on each value. A DataFrame is a table of those columns sharing one index. And the two connect, because every DataFrame column is itself a Series.

Here is a Series of three prices. Each value has an index label, A1, B2, C3. Ask for B2 and you get forty-five. Multiply the whole Series by two and every value doubles, exactly like the vectorized math you saw in NumPy. The difference is that the labels travel with the values.

A DataFrame is easiest to build from a dictionary. Each key becomes a column name and each list becomes that column. The shape attribute tells you rows and columns, here three by two. Notice it is an attribute, so no parentheses. This is the customers table we will use throughout the course. The figures are illustrative.

Pull one column out with square brackets and you get a Series back. That is the key mental model. Then check dtypes to see how each column is stored. Numbers are int64 or float64, and plain text shows up as object. When a column misbehaves later, dtypes is the first place to look.

So a Series is a labeled column, and a DataFrame is a table of them. Next lesson we stop typing data by hand and load a real file, then inspect it.
