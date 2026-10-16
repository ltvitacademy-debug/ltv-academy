# Lesson 8 — Default, Keyword & Variable Arguments

**Chapter 2 · Python for Data Engineers · Lesson 8 of 48**

## What you'll learn

- Default argument values — making a parameter optional
- Keyword arguments — calling a function by naming its parameters,
  for clarity
- `*args` — accepting any number of positional arguments
- `**kwargs` — accepting any number of named arguments
- Why these matter once you start calling library functions like
  `pd.read_csv()` in Chapter 4, which use all of these patterns heavily

## Default arguments — making a parameter optional

A parameter can have a default value, used automatically if the caller
doesn't supply one:

```python
def calculate_total_with_tax(subtotal, tax_rate=0.08):
    """Return subtotal plus tax, using an 8% default rate if none is given."""
    return round(subtotal * (1 + tax_rate), 2)

print(calculate_total_with_tax(100))        # 108.0 — uses the default 0.08
print(calculate_total_with_tax(100, 0.05))  # 105.0 — overrides the default
```

This is extremely common in real libraries — you'll see it constantly
once you call things like `pd.read_csv(path, sep=",")`, where `sep`
already defaults to a comma and you only pass something different for
an unusual file.

## Keyword arguments — calling by name

So far every function call has matched arguments to parameters by
position (first argument goes to the first parameter, and so on).
Keyword arguments let you name which parameter you're setting, in any
order:

```python
def build_order_summary(order_id, customer_name, status="Shipped"):
    return f"Order {order_id} ({customer_name}) — {status}"

# positional — relies on order
print(build_order_summary(1001, "Dana Whitfield"))

# keyword — explicit, and order no longer matters
print(build_order_summary(customer_name="Marcus Ibeh", order_id=1002, status="Cancelled"))
```

Keyword arguments are usually clearer once a function has more than one
or two parameters, since the call site itself documents what each
value means — `status="Cancelled"` is unambiguous in a way that a bare
`"Cancelled"` in the third position isn't.

## *args — any number of positional arguments

Sometimes you don't know in advance how many values will be passed.
`*args` collects any number of extra positional arguments into a
tuple:

```python
def total_revenue(*line_totals):
    """Sum any number of line totals passed in."""
    return round(sum(line_totals), 2)

print(total_revenue(259.98, 249.50))              # 509.48
print(total_revenue(259.98, 249.50, 79.00, 22.00)) # 610.48
```

Inside the function, `line_totals` is just a regular tuple — you can
loop over it, pass it to `sum()`, or index into it, exactly like any
other tuple from Lesson 4.

## **kwargs — any number of named arguments

`**kwargs` does the same thing, but for named arguments, collecting
them into a dictionary. This is how you build a function flexible
enough to accept a record with varying fields:

```python
def build_order_record(order_id, **extra_fields):
    """Combine a required order_id with any number of additional named fields."""
    record = {"order_id": order_id}
    record.update(extra_fields)
    return record

order = build_order_record(1009, customer_name="Keiko Tanaka", region="West", quantity=1)
print(order)
# {'order_id': 1009, 'customer_name': 'Keiko Tanaka', 'region': 'West', 'quantity': 1}
```

Inside the function, `extra_fields` is a regular dict — `.update()`
merges those key-value pairs into `record`, exactly as you learned with
dictionaries in Lesson 5. This pattern — a few required parameters plus
`**kwargs` for everything else — is exactly how `pd.DataFrame()` and
many other library constructors are built, which is why recognizing it
now will make those later signatures feel familiar instead of
mysterious.

## Key terms

| Term | Meaning |
|---|---|
| Default argument | `def f(x, y=10)` — `y` is optional and uses `10` if not supplied |
| Keyword argument | Calling a function by naming a parameter: `f(y=5)` |
| `*args` | Collects any number of extra positional arguments into a tuple |
| `**kwargs` | Collects any number of extra named arguments into a dict |

## Lab

Write a function that builds a formatted order line, with an optional
currency symbol, plus a second function that totals any number of
order amounts:

```python
def format_order_line(order_id, total, currency="$"):
    """Format an order total with a default currency symbol."""
    return f"Order {order_id}: {currency}{total:.2f}"

def total_revenue(*amounts):
    """Sum any number of order amounts."""
    return round(sum(amounts), 2)

print(format_order_line(1001, 259.98))
print(format_order_line(1002, 249.50, currency="CAD $"))

grand_total = total_revenue(259.98, 249.50, 79.00, 22.00, 129.99)
print(f"Grand total: ${grand_total:.2f}")
```

Then write one more call to `format_order_line` using keyword arguments
for all three parameters, in a different order than they were defined.

## Check yourself

Without looking back: what type does `*args` collect its values into
inside the function, and what type does `**kwargs` collect its values
into? And when would naming your arguments at the call site
(`status="Cancelled"`) genuinely make code easier to read than relying
on position?
