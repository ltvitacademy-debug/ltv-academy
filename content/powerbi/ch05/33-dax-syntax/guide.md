# Lesson 33 — DAX Syntax Basics

**Chapter 5 · DAX Fundamentals · Lesson 2 of 15**

## What you'll learn

- Every piece that makes up a DAX formula, by name
- What a "fully qualified" column reference is, and why to use one
- How the formula bar's suggestions feature helps you avoid syntax errors
- How to read an unfamiliar formula by breaking it into these same pieces

## Anatomy of a formula

Every DAX formula is built from the same handful of pieces. Here's the
simplest measure from last lesson, with each piece labeled:

![Screenshot of a DAX formula in the formula bar, annotated with letters pointing to the measure name, equals sign, SUM function, parentheses, table name, and column name.](/courses/power-bi/ch05/33-dax-syntax/qsdax_1_syntax.png)
*Total Sales = SUM(Sales[SalesAmount]) — six elements, every one of them present in nearly every formula you'll write.*

| Label | Element | What it does |
|---|---|---|
| A | Measure name — **Total Sales** | What you'll see in the Fields list |
| B | Equals sign (**=**) | Marks the start of the formula |
| C | Function — **SUM** | The pre-written calculation being applied |
| D | Parentheses **()** | Surround the function's argument(s) |
| E | Table — **Sales** | Where the column lives |
| F | Column — **[SalesAmount]** | What SUM adds up |

Read it out loud and it's plain English: *"For the measure Total Sales,
calculate the SUM of the SalesAmount column in the Sales table."*

## Fully qualified names

Notice that the column in the example is written `Sales[SalesAmount]` —
the table name, then the column name in square brackets. This is a
**fully qualified** column reference.

If a formula references a column in the *same* table the formula lives
in, DAX doesn't require the table name — you could write just
`[SalesAmount]`. But it's good practice to include it anyway, even then.
Long formulas that reference several tables get much easier to read when
every column is fully qualified the same way, instead of mixing
qualified and unqualified references.

## A few syntax rules worth knowing early

- **Table names with spaces or special characters** must be wrapped in
  single quotes: `'Reseller Sales'[Amount]`, not `Reseller Sales[Amount]`.
- **Column names** always go in square brackets: `[SalesAmount]`, never
  parentheses or quotes.
- **DAX is case-insensitive** once your data is loaded — `sum` and `SUM`
  work identically, though the convention is to write function names in
  capitals for readability.
- **Formulas can nest up to 64 functions deep**, though you'll rarely
  need more than three or four — a formula that deep is hard to write,
  read, and debug.

## Let the formula bar help you

Power BI Desktop's formula bar includes an autocomplete/suggestions
feature: start typing a function name, and it offers to complete it —
along with a short description of what the function does and what
arguments it expects. Use it. It's the fastest way to learn new functions
and avoid typos in table and column names.

## Reading formulas you didn't write

The real payoff of knowing these pieces by name: when you open someone
else's report and see an unfamiliar formula, you can decode it the same
way — find the equals sign, identify the function(s), trace which
table/column each argument points at. Every formula in this course,
however long it eventually gets, breaks down into exactly these same
building blocks.

## Key terms

| Term | Meaning |
|---|---|
| Fully qualified column name | A column reference that includes its table name, like `Sales[SalesAmount]` |
| Argument | A value passed into a function, inside its parentheses |
| Nested function | A function used as the argument to another function |

## Lab

1. In a file connected to **AdventureWorksDW2014**, write
   `Total Sales = SUM(FactInternetSales[SalesAmount])` and identify each
   of the six syntax elements from this lesson in it.
2. Try typing the formula again in the formula bar and deliberately
   misspell `SalesAmount` — observe how DAX flags the error, and how the
   suggestions feature would have prevented it.

## Check yourself

You're ready for Lesson 34 when you can look at any simple DAX formula
and immediately name its function, its arguments, and which table each
column reference points at.
