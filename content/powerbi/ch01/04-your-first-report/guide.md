# Lesson 4 — Your First Power BI Report

**Chapter 1 · Power BI Fundamentals · Lesson 4 of 5**

## What you'll learn

- How to connect Power BI Desktop to an Excel workbook
- How to load a table and watch it appear in the Fields pane
- How to build a visual by dragging fields onto the canvas
- How to change a visual's type without losing your field choices
- How to save your work

## Where we're headed

You won't build the whole thing today, but here's a taste of what "a report"
actually looks like once every later chapter's skills come together:

![Screenshot of a finished Power BI report with a title, a line chart, a map, and a bar chart arranged on one page.](/courses/power-bi/ch01/04-your-first-report/power-bi-report-by-numbers.png)
*A finished report: several visuals, one page, one story. This lesson builds the first two pieces — the rest of the course builds the polish.*

Today we connect to real data and get two visuals on the canvas. That's it.
Formatting, DAX measures, slicers, and publishing all get their own dedicated
lessons later — trying to learn everything at once is how people quit in week
one.

## Step 1: Get the data

From the **Home** ribbon, select **Get data**.

![Screenshot of the Home ribbon in Power BI Desktop with Get data highlighted.](/courses/power-bi/ch01/04-your-first-report/qs-connect-data_02.png)
*Every report starts here, regardless of chapter — this button is the "Get" in the five-step workflow from Lesson 5.*

The **Get Data** window lists every connector Power BI Desktop supports —
dozens of them, which is exactly what Chapter 2 is about. For today, choose
**Excel**.

![Screenshot of the Get Data dialog box with Excel Workbook highlighted in the list of connectors.](/courses/power-bi/ch01/04-your-first-report/qs-connect-data_03.png)
*Excel is one connector among many. Chapter 2 covers CSV, SQL databases, and web/REST sources too.*

Browse to an Excel file — download our [Financial Sample workbook](/downloads/power-bi/financial-sample.xlsx)
if you don't have one of your own handy — and select **Open**.

## Step 2: Choose your tables

Power BI reads the workbook and shows you every sheet and table it found in
the **Navigator** window. Check the box next to each one you want, then select
**Load**.

![Screenshot of the Navigator window listing a table and a worksheet, both selected with checkboxes, and a Load button.](/courses/power-bi/ch01/04-your-first-report/qs-connect-data_05.png)
*Check a table, hit Load. (Transform Data instead would open Power Query Editor — Chapter 3's territory.)*

Once loaded, switch to the Fields pane on the right. Every table and column
you just loaded is now listed there, ready to use.

## Step 3: Build your first visual

In the Fields pane, drag a numeric field (like **Profit**) onto a blank part
of the canvas. Power BI draws a column chart automatically. Now drag a second
field — a date field works well — onto the *same* visual. Power BI redraws it
to show your numbers broken out by date.

![Screenshot of a column chart showing profit summed by year and month, with the Visualizations and Data panes open beside it.](/courses/power-bi/ch01/04-your-first-report/power-bi-column-chart-date.png)
*Two fields dragged onto the canvas, zero chart-drawing by hand.*

That's the entire mechanic of building a visual: pick fields, Power BI picks a
reasonable chart. You refine the chart type next.

## Step 4: Try a different visual type

Drag a geography field (like **Country**) onto a new blank area of the canvas.
Power BI may give you a table or a map — if it's not a map already, select the
visual and choose the map icon in the Visualizations pane. Then drag a numeric
field onto it.

![Screenshot of a bubble map showing profit by country, with size representing relative profit.](/courses/power-bi/ch01/04-your-first-report/power-bi-map-visual.png)
*Same mechanic, completely different picture: bubble size shows relative profit per country.*

Notice this took the exact same steps as the column chart — drag fields, let
Power BI draw something, then pick the right visual type. That pattern never
changes, no matter how advanced the report gets.

## Step 5: Save your work

Press **Ctrl+S**, or use **File > Save**. The first time, Power BI asks for a
file name and location — it saves as a **.pbix** file, the native Power BI
Desktop format that holds your data, your model, and your report together in
one file.

We're stopping here. **Publishing** that file to the Power BI service —
turning it from a file on your computer into something you can share — is its
own step in the workflow, covered properly in Chapter 9.

## Key terms

| Term | Meaning |
|---|---|
| Get data | The ribbon button that opens every available data connector |
| Navigator | The window where you pick which tables/sheets to load |
| .pbix file | Power BI Desktop's native file format — data, model, and report together |
| Load | Brings selected tables into the model as-is |
| Transform Data | Opens Power Query Editor to clean data before loading (Chapter 3) |

## Lab

1. Download our [Financial Sample Excel workbook](/downloads/power-bi/financial-sample.xlsx)
   (or use any Excel file with a few numeric and text columns you have handy).
2. Connect to it with **Get data > Excel**, and load at least one table.
3. Build one chart by dragging two fields onto the canvas.
4. Change that chart to at least one different visual type using the
   Visualizations pane.
5. Save the file.

## Check yourself

You're ready for Lesson 5 when you've connected to a real file, loaded a
table, and have at least one visual on the canvas that you built yourself —
not a screenshot, an actual report open on your own machine.
