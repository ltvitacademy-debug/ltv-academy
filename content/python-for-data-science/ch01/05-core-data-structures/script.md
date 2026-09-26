# Script — Core Data Structures

## Segment 1 (title)

Real data comes in collections: a column of prices, a customer with several attributes, a list of orders. Python gives you four built-in structures to hold them.

## Segment 2 (steps)

A list is ordered and changeable. A tuple is ordered but fixed. A dictionary stores values under labels, called keys. A set holds unique values only. Each fits a different job. Pandas will soon handle most of your tables, but these four sit underneath it, and data from web APIs arrives as exactly these structures.

## Segment 3 (code)

Lists use square brackets and count from zero. Negative positions count from the end, and a slice like one colon three takes a range, stopping before the end position. Tuples use parentheses and cannot be changed. Try to assign to one and Python raises a TypeError. Use tuples for small fixed groups, like a latitude and longitude.

## Segment 4 (code)

A dictionary is the natural shape for one record, such as a customer. Square brackets look up a key, but raise a KeyError if it is missing. The get method returns None, or a default you choose, instead. That is safer when data is incomplete, and real data usually is.

## Segment 5 (code)

Put dictionaries in a list and you have a table. Each dictionary is a row, each key is a column name. This is exactly what JSON from a web API looks like once parsed, and pandas can turn it straight into a DataFrame. A comprehension can filter these rows, and sum can total a field across them.

## Segment 6 (code)

A set keeps each value once, which makes it the fastest way to find distinct values. Here, four cities become three. Its order can vary. One last trap: assigning a list to a new name does not copy it. Change y, and x changes too. Use copy when you need an independent list.

## Segment 7 (outro)

You can now hold data in the right structure. Next lesson: errors and debugging, so that when something breaks, you know how to read the message and fix it.
