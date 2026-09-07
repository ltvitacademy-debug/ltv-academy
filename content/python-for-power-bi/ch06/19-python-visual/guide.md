# Lesson 19 — Creating a Python Visual

**Chapter 6 · Python Inside Power BI · Lesson 19 of 20**

## What you'll learn

- Enabling the Python visual, and the one-time security prompt
- The same automatic `dataset` pattern from Lesson 18, applied to visuals
- Writing and running an actual Matplotlib chart on the report canvas
- The real limitations worth knowing before you rely on this in production

## Enabling the Python visual

Select the **Python visual** icon in the **Visualizations** pane:

![Screenshot of the Python visual icon in the Visualizations pane.](/courses/python-for-power-bi/ch06/19-python-visual/python-visuals-2.png)
*Sits alongside every other native visual — bar, line, card, and so on.*

The first time, an **Enable script visuals** dialog appears — select
**Enable**. This is a one-time, per-file prompt, not something you'll see
on every Python visual you add afterward.

## The script editor and `dataset`, again

A placeholder appears on the canvas, and the **Python script editor**
opens along the bottom:

![Screenshot of the Python script editor pane.](/courses/python-for-power-bi/ch06/19-python-visual/python-visuals-3.png)
*Same pane style as Lesson 18's Run Python Script — same `dataset` pattern too.*

Drag fields into the **Values** section, and exactly like Lesson 18,
Power BI auto-generates a `dataset` DataFrame from your selections — you
never write the code that builds it. Only fields you've actually added to
**Values** are available to the script; add or remove one, and the
generated binding code updates automatically.

## Writing and running a real chart

With a `Product` and `Revenue` field added to **Values**:

```python
import matplotlib.pyplot as plt
dataset.plot(kind='bar', x='Product', y='Revenue', color='crimson', legend=False)
plt.title('Revenue by Product')
plt.show()
```

Select **Run** in the script editor's title bar:

![Screenshot of a bar chart visualization generated from a Python script.](/courses/python-for-power-bi/ch06/19-python-visual/python-visuals-14.png)
*Power BI replots automatically on every Run, and on data refresh, filtering, or highlighting.*

`plt.show()` at the end is what actually tells Matplotlib to render — a
script without it produces no visual at all, a common first mistake.

## Real limitations worth knowing

- **150,000 rows max**, 250 MB input limit — beyond that, only the top
  rows plot, with a message on the image.
- **72 DPI only** — Python visuals won't match the crispness of native
  Power BI visuals at high zoom.
- **Not interactive** — a Python visual can respond to filtering and
  highlighting from *other* visuals, but you can't click into it to
  cross-filter anything else.
- **Requires Pro or PPU** to render, refresh, and filter in the service —
  authoring in Desktop works for everyone, but service rendering has a
  licensing requirement (Lesson 68's territory, from the main course).

## Key terms

| Term | Meaning |
|---|---|
| Enable script visuals | The one-time, per-file security prompt for Python/R visuals |
| `dataset` (visual) | The auto-generated DataFrame from fields added to Values |
| `plt.show()` | The line that actually renders the chart — required, easy to forget |

## Lab

1. Add a Python visual to a report page and enable script visuals.
2. Add two fields to **Values** and confirm the generated `dataset`
   binding code appears in the editor automatically.
3. Write a short Matplotlib script — a bar or scatter plot — ending in
   `plt.show()`, and select **Run**.

## Check yourself

Chapter 6 is one lesson from complete when you can explain what
`plt.show()` does and why forgetting it is a common first mistake, and
name at least two real limitations of Python visuals worth knowing before
using one in a production report.
