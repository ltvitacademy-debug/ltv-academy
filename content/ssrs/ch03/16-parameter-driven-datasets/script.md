# Script — Parameter-Driven Datasets

## Segment 1 (title)

This lesson ties the whole chapter together: parameter-driven datasets — how that at-ParameterName syntax actually connects a report parameter to a dataset query.

## Segment 2 (screenshot: dataset-properties-parameters-mapping)

Every technique in this chapter comes down to the same mechanism. A dataset's query contains a placeholder like at-StoreID, and that placeholder gets mapped to a report parameter's value right here, on the Dataset Properties dialog's Parameters tab. Read it left to right: Parameter Name is what the query text uses. Parameter Value is the expression supplying it — almost always bracket-at-StoreID, which is shorthand for equals-Parameters-bang-StoreID-dot-Value. When a query variable gets created automatically, Report Builder sets up this exact mapping for you.

## Segment 3 (code: WHERE clause)

The query itself is ordinary T-SQL with one addition. WHERE StoreID equals at-StoreID, in parentheses — for a single value. If that same parameter later becomes multi-value, the clause has to change its operator: WHERE StoreID IN at-StoreID. IN tests the column against a set of values, which is exactly what a multi-value parameter supplies. Nothing exotic here — it's the same parameterized query pattern you'd use calling a stored procedure from application code. What's different is that the mapping itself is entirely visual, with no glue code required.

## Segment 4 (outro)

Next lesson, we move into the Expression Editor — where report values get calculated and formatted, starting the next part of this course.
