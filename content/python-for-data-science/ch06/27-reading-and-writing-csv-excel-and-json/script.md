# Script — Reading & Writing CSV, Excel & JSON

Data science rarely starts with a clean table in memory. It starts with a file: a CSV export, an Excel workbook someone emailed, a JSON document from a system. This lesson covers all three, reading and writing.

CSV first. To write, call to CSV on the DataFrame, and pass index equals False, or pandas adds an extra column of row numbers. To read, call read CSV. pandas guesses each column's type, so check dtypes afterward. Dates arrive as text unless you ask otherwise.

Real CSVs are messy, and read CSV has arguments for that. Sep sets the delimiter. Decimal handles a comma as the decimal mark. Na values lists extra strings to treat as missing, like N slash A. Usecols loads only the columns you need, dtype sets types up front, parse dates converts date columns, and nrows lets you peek at a huge file.

Excel works the same way with read Excel and to Excel, plus a sheet name argument. One catch: pandas needs a helper library, openpyxl. Without it you get a ModuleNotFoundError, so install it once with pip. To write several sheets, use ExcelWriter. Sheet name equals None reads every sheet into a dictionary.

JSON is the format of web systems. To JSON with orient equals records writes a list of objects, one per row, the shape most APIs use. Read JSON reads it back. A missing value is written as null, and dates are still just text until you convert them.

Real JSON is often nested. Json normalize flattens it. Pointing record path at the items list gives one row per item, and meta carries fields from the parent, like the order id and customer name. Nested keys become dotted column names. This will matter again when we pull data from APIs.

Next up, Lesson 28: querying SQL databases from Python.
