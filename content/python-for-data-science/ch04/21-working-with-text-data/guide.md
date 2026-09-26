# Working With Text Data

Numbers are the easy part. Real datasets are full of names typed with stray spaces, emails in mixed case, phone numbers in five formats and addresses that need to be split apart. If you cannot clean text, you cannot join tables reliably: `"ben@example.com "` with a trailing space will never match `"ben@example.com"`. pandas gives you a whole toolbox for this through the `.str` accessor, which applies Python string operations to every value in a column at once.

## What you'll learn

- The `.str` accessor and chaining string methods
- Cleaning case and whitespace
- Splitting and slicing strings
- Searching with `contains`, and handling missing text
- Extracting patterns with regular expressions
- A worked example: standardizing phone numbers

## A messy contact table

Here is illustrative raw data such as you might get from a web form. Notice the extra spaces, inconsistent capitals and one missing name:

```python
raw = pd.DataFrame({
    "name": ["  ava chen", "BEN ORTIZ ", "Cara  Singh",
             "dan wu", None],
    "email": ["Ava.Chen@Example.com", "ben@example.com ",
              "CARA@shop.io", "dan.wu@example.org",
              "eli@example.com"],
    "phone": ["(512) 555-0142", "617-555-0199",
              "512.555.0107", "303 555 0166",
              "617-555-0123"],
})
```

## Cleaning case and whitespace

`.str.strip()` removes leading and trailing whitespace, `.str.lower()`, `.str.upper()` and `.str.title()` change the case. Chain them, since each returns a Series that supports `.str` again:

```python
raw["email"] = raw["email"].str.strip().str.lower()
raw["email"].tolist()
# ['ava.chen@example.com', 'ben@example.com', 'cara@shop.io',
#  'dan.wu@example.org', 'eli@example.com']
```

For the names we also need to collapse the double space inside `Cara  Singh`. `str.replace` with a regular expression does it: `\s+` means "one or more whitespace characters":

```python
raw["name"] = (raw["name"].str.strip()
                          .str.replace(r"\s+", " ", regex=True)
                          .str.title())
# ['Ava Chen', 'Ben Ortiz', 'Cara Singh', 'Dan Wu', None]
```

Always pass `regex=True` or `regex=False` explicitly to `str.replace`, because the default has changed between pandas versions. Missing values pass through untouched: the missing name stays missing rather than causing an error.

## Splitting

`str.split` breaks each string at a separator. Take `[1]` with `.str[1]` to pick one piece, or pass `expand=True` to get separate columns:

```python
raw["domain"] = raw["email"].str.split("@").str[1]
raw["domain"].value_counts()
```

```
example.com    3
shop.io        1
example.org    1
```

Domains are a quick way to spot personal versus business emails. Note the `.str[1]` syntax: the accessor also lets you index into the result, and `raw["name"].str[:3]` slices the first three characters.

## Searching

`str.contains` returns True or False per row, ready to use as a filter mask:

```python
raw["email"].str.contains("example.com")
```

This returns True for rows 0, 1 and 4. Other handy tests are `startswith` and `endswith`, and `str.len()` counts characters. One trap: `str.contains` on a column with missing values returns a missing result for those rows, which breaks filtering. Pass `na=False` so missing text counts as "no match":

```python
raw[raw["name"].str.contains("a", case=False, na=False)]
```

Also remember that `contains` treats the pattern as a regular expression by default, so a dot in `example.com` matches any character. For plain text, pass `regex=False`.

## Extracting with regular expressions

`str.extract` pulls out the parts of a string that match the groups in parentheses. Here we split an email into user and domain:

```python
raw["email"].str.extract(r"^([^@]+)@(.+)$")
```

```
          0            1
0  ava.chen  example.com
1       ben  example.com
2      cara      shop.io
3    dan.wu  example.org
4       eli  example.com
```

Each set of parentheses becomes a column. You do not need to master regular expressions today. A few patterns cover most data work: `\d` is a digit, `\D` is a non-digit, `\s` is whitespace, `+` means one or more, and `.` is any character.

## Worked example: standardize phone numbers

The phones use parentheses, dashes, dots and spaces. Strip everything that is not a digit, then check the length:

```python
raw["digits"] = raw["phone"].str.replace(r"\D", "", regex=True)
raw["area"] = raw["digits"].str[:3]
raw["digits"].str.len().tolist()   # [10, 10, 10, 10, 10]
```

The digits are `5125550142`, `6175550199` and so on, and the area codes are 512, 617, 512, 303 and 617. All lengths are 10, so every number is a complete US-style number. In real data, a length of 9 or 11 is a red flag worth investigating. Checking a rule like this on purpose is the seed of the validation work in Chapter 5.

## Recap

The `.str` accessor runs string methods across a whole column. Clean with `strip`, `lower`, `title` and `replace`; break apart with `split` and slicing; search with `contains`, using `na=False`; and pull out patterns with `extract`. Standardized text is what makes joins and counts trustworthy. Next chapter: data cleaning, beginning with a systematic look at missing data.
