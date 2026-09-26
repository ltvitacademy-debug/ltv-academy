# Reading & Writing CSV, Excel & JSON

Most analyses start with a file. A finance team exports a CSV, an analyst emails an Excel workbook, an application hands you JSON. pandas can read and write all three with a matching pair of functions: `read_*` to load and `to_*` to save. This lesson covers the options that matter in practice, especially for messy real-world files.

## What you'll learn

- Reading and writing CSV, and why `index=False` matters
- The `read_csv` arguments that handle messy files: `sep`, `decimal`, `na_values`, `usecols`, `dtype`, `parse_dates`, `nrows`
- Reading and writing Excel, including multiple sheets, and the `openpyxl` requirement
- Reading and writing JSON, and flattening nested JSON with `json_normalize`

## The practice data

```python
import pandas as pd

orders = pd.DataFrame({
    "order_id": [5001, 5002, 5003],
    "customer": ["Ana Ruiz", "Ben Cole", "Cy Park"],
    "amount": [120.0, 75.5, None],
    "order_date": ["2024-03-01", "2024-03-02", "2024-03-05"],
})
```

## CSV

```python
orders.to_csv("orders.csv", index=False)
df = pd.read_csv("orders.csv")
df.dtypes
# order_id        int64
# customer       object
# amount        float64
# order_date     object
```

Without `index=False`, pandas writes the row numbers as an extra unnamed column, and the next `read_csv` loads it as `Unnamed: 0`. The saved file looks like this, with the missing amount as an empty field:

```
order_id,customer,amount,order_date
5001,Ana Ruiz,120.0,2024-03-01
5002,Ben Cole,75.5,2024-03-02
5003,Cy Park,,2024-03-05
```

Notice `order_date` came back as `object` (text). CSV has no date type, so you must ask for dates explicitly.

## When the CSV is messy

`read_csv` has many arguments; these are the ones you will use constantly:

```python
pd.read_csv(
    "orders.csv",
    usecols=["order_id", "amount", "order_date"],  # only these columns
    dtype={"order_id": "string"},                  # set types up front
    parse_dates=["order_date"],                    # text -> datetime
    nrows=2,                                       # peek at the first rows
)
```

When we ran this, `order_date` became `datetime64[ns]` and `order_id` became `string`. For files that follow other conventions:

```python
# a European-style file:  id;amount / 1;1,5 / 2;N/A / 3;-
pd.read_csv("messy.csv", sep=";", decimal=",", na_values=["N/A", "-"])
```

- `sep=";"` sets the delimiter.
- `decimal=","` reads `1,5` as 1.5.
- `na_values` lists additional strings to treat as missing. Here `N/A` and `-` became `NaN`, and the `amount` column came out as `float64` instead of text.

## Excel

```python
# pip install openpyxl   (one-time setup)
orders.to_excel("orders.xlsx", sheet_name="Orders", index=False)
x = pd.read_excel("orders.xlsx", sheet_name="Orders")
```

pandas delegates `.xlsx` files to a helper library. On a machine without `openpyxl`, these calls fail with `ModuleNotFoundError: No module named 'openpyxl'`, which is fixed with `pip install openpyxl`. To write several sheets to one workbook, use `ExcelWriter`:

```python
with pd.ExcelWriter("report.xlsx") as w:
    orders.to_excel(w, sheet_name="Orders", index=False)
    orders.describe().to_excel(w, sheet_name="Summary")

pd.read_excel("report.xlsx", sheet_name=None).keys()   # Orders, Summary
```

`sheet_name=None` returns a dictionary of DataFrames, one per sheet.

## JSON

```python
orders.to_json("orders.json", orient="records", indent=2)
pd.read_json("orders.json")
```

With `orient="records"` you get a list of objects, one per row, the shape most web APIs use. A missing amount is written as `null`. Dates are plain text in JSON, so convert them with `pd.to_datetime` after loading.

### Nested JSON

Real JSON often has objects inside objects and lists inside records. `json_normalize` flattens it:

```python
nested = [
    {"id": 1, "customer": {"name": "Ana", "city": "Atlanta"},
     "items": [{"sku": "A1", "qty": 2}, {"sku": "B2", "qty": 1}]},
    {"id": 2, "customer": {"name": "Ben", "city": "Austin"},
     "items": [{"sku": "A1", "qty": 5}]},
]

pd.json_normalize(nested, record_path="items",
                  meta=["id", ["customer", "name"]])
#   sku  qty id customer.name
# 0  A1    2  1           Ana
# 1  B2    1  1           Ana
# 2  A1    5  2           Ben
```

`record_path` picks the list to expand into rows, and `meta` copies fields from the parent onto each row. Without those arguments, `json_normalize(nested)` flattens nested objects into dotted column names such as `customer.name` and leaves the `items` list as a single column.

## Recap

- `to_csv(index=False)` / `read_csv` for CSV; `sep`, `decimal`, `na_values`, `usecols`, `dtype`, `parse_dates`, and `nrows` tame messy files.
- Excel needs `openpyxl`; use `sheet_name` and `ExcelWriter` for multiple sheets.
- JSON: `orient="records"` for lists of rows; `json_normalize` flattens nested structures.
- Always check `dtypes` after loading.
