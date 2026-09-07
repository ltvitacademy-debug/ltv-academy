# Lesson 4 — Python Syntax in 3 Minutes

**Chapter 2 · Python Fundamentals · Lesson 4 of 20**

## What you'll learn

- Variables — storing a value under a name
- The two number types and the one text type you'll actually use
- Comments — notes Python ignores completely
- `print()` — the one function this whole course leans on constantly

## Variables: storing a value under a name

A variable is just a name pointing at a value. No declaring a type up
front, no semicolons at line ends — assign with a single equals sign, and
the name is ready to use:

```python
customer_name = "Alex Rivera"
order_total = 284.50
units_sold = 12
```

Variable names are case-sensitive (`order_total` and `Order_Total` are two
different things) and by convention use lowercase words separated by
underscores — you'll see this exact style in every Pandas example for the
rest of this course.

## Strings and numbers — the types you'll actually use

Three types cover almost everything in this course:

| Type | Example | Notes |
|---|---|---|
| **String** (`str`) | `"Alex Rivera"` | Text, in single or double quotes — Python treats them identically |
| **Integer** (`int`) | `12` | A whole number, no decimal point |
| **Float** (`float`) | `284.50` | A number with a decimal point |

Python figures out which type a value is automatically — you never declare
`int x` the way some languages require. This matters a lot once Lesson 13
covers what happens when a column loads as the *wrong* one of these three.

## Comments: notes Python ignores completely

Anything after a `#` on a line is a comment — Python skips it entirely
when running the code. Comments exist purely for the human reading the
code later, which in a real job is often you, six months from now:

```python
# This calculates the customer's order total
order_total = 284.50
```

## `print()` — showing a value

`print()` displays a value in the output. It's how you'll check your work
constantly throughout this course, long before any of it touches Power BI:

```python
print(customer_name)
# Alex Rivera

print(order_total)
# 284.5
```

To combine text and a variable in one line, either separate them with
commas, or use an **f-string** — a string with an `f` right before the
opening quote, letting you drop a variable straight inside `{ }`:

```python
print("Total for", customer_name, "is", order_total)
# Total for Alex Rivera is 284.5

print(f"Total for {customer_name} is {order_total}")
# Total for Alex Rivera is 284.5
```

Both lines print the identical result — the f-string is just the cleaner,
more common style you'll see in every later lesson's examples.

## Key terms

| Term | Meaning |
|---|---|
| Variable | A name pointing at a value, assigned with `=` |
| String (`str`) | Text data, in quotes |
| Integer (`int`) | A whole number |
| Float (`float`) | A number with a decimal point |
| Comment | Text after `#`, ignored when the code runs |
| f-string | A string prefixed with `f` that can embed variables in `{ }` |

## Lab

1. Open a Python terminal (or any text editor saved as a `.py` file) and
   assign three variables: your name as a string, a whole number, and a
   number with a decimal.
2. Print all three separately with `print()`.
3. Write one f-string that combines all three variables into a single
   sentence, and print it.

## Check yourself

You're ready for Lesson 5 when you can write and run three variable
assignments, one comment, and one f-string print statement — from memory,
without looking back at this page.
