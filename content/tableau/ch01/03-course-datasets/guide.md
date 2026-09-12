# Lesson 3 — Downloading and Understanding the Course Datasets

**Chapter 1 · Getting Started · Lesson 3 of 95**

## What you'll learn

- Where the datasets this course uses actually live, and that you
  already have the main one
- The structure of the Sample Superstore dataset: its tables, fields,
  and what each folder in the Data pane represents
- How to find and download other real, freely available datasets for
  practice and for your Chapter 17 portfolio projects
- Why this course keeps returning to the same one or two datasets
  instead of a new one every lesson

## Sample Superstore: already on your machine

Good news — the dataset this course uses most, **Sample Superstore**,
ships bundled with Tableau Desktop itself. You don't need to download
anything separately to get started: open Tableau Desktop, and it's
sitting right there on the start page.

![Real screenshot of the Tableau Desktop start page, labeled 1-6, showing the Connect pane on the left, Superstore under 'Open' in the middle, and Discover resources on the right.](/courses/tableau/ch01/03-course-datasets/start-page-superstore.png)
*The start page you see every time you launch Tableau Desktop.*
Source: [Tableau Help — Get Started Tutorial, Step 1](https://help.tableau.com/current/guides/get-started-tutorial/en-us/get-started-tutorial-connect.htm)

Under **Saved Data Sources** you'll see **Sample - Superstore** — click
it, and Tableau connects to it immediately. It's a fictional
office-supply retailer's order data: who bought what, when, for how
much, at what profit, shipped which way, to which region. It's
realistic enough to teach real BI skills without needing you to set up
a database first.

## What's actually inside Sample Superstore

Once connected, the Data pane shows every field in the dataset, split
into Dimensions (top) and Measures (bottom):

![Real screenshot of the Data pane after connecting to Sample Superstore, showing Dimensions (Category, City, Customer ID, Customer Name, Order Date, Region, State, etc.) and Measures (Discount, Profit, Quantity, Sales).](/courses/tableau/ch01/03-course-datasets/superstore-data-pane.png)
*Every field Sample Superstore actually contains — this is what you'll be dragging onto shelves for most of this course.*
Source: [Tableau Help — Get Started Tutorial, Step 1](https://help.tableau.com/current/guides/get-started-tutorial/en-us/get-started-tutorial-connect.htm)

| Area | What it contains |
|---|---|
| Customer | Customer ID, Customer Name, Segment |
| Order | Order ID, Order Date, Ship Date, Ship Mode |
| Location | Country/Region, State, City, Postal Code, Region |
| Product | Category, Sub-Category, Product Name |
| Measures | Sales, Profit, Discount, Quantity |

One row represents a single line item on an order — one product,
on one order, shipped to one customer. Every chapter through Chapter
13 leans on this same structure, so getting familiar with these field
names now saves you re-learning them later.

## Finding other datasets for practice and portfolio work

Later chapters (especially the Chapter 17-18 portfolio projects) ask
you to bring in data beyond Superstore. Tableau's own **Find Good Data
Sets** page lists reliable, free sources — government open-data
portals, Kaggle, the World Bank, and more — along with tips on what
makes a dataset actually good for building a portfolio piece (clean
column headers, consistent granularity, a genuine story to tell).
Bookmark it now; you'll come back to it starting in Chapter 17.

## Why this course reuses the same dataset

Constantly switching datasets means constantly re-explaining what each
column means, which eats lesson time that should go to the Tableau
skill itself. By sticking mostly with Sample Superstore through Chapter
13, every new feature — a filter, a calculated field, a dashboard
action — gets demonstrated on data you already understand, so you can
focus entirely on what's new.

## Key terms

| Term | Meaning |
|---|---|
| Sample Superstore | The bundled retail-orders dataset this course uses most |
| Dimension | A qualitative field (Category, Region, Customer Name) |
| Measure | A quantitative field (Sales, Profit, Discount, Quantity) |
| Granularity | What one row of the dataset represents — here, one order line item |

## Lab

1. Open Tableau Desktop and connect to Sample - Superstore from the start page.
2. In the Data pane, find and click on five different fields (mix of Dimensions and Measures) and read their names carefully — you'll be using all of them repeatedly.
3. Visit Tableau's [Find Good Data Sets](https://help.tableau.com/current/pro/desktop/en-us/find_good_datasets.htm) page and bookmark it for later chapters.

## Check yourself

You're ready for Lesson 4 when you can open Sample Superstore in
Tableau Desktop from memory, and name at least three Dimension fields
and two Measure fields it contains without looking at the screenshot.
