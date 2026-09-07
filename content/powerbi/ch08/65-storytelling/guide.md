# Lesson 65 — Storytelling With Data

**Chapter 8 · Dashboard Design & Storytelling · Lesson 4 of 5**

## What you'll learn

- Why "storytelling" means choosing visuals that support one point, not showing off variety
- Specific distortions to avoid — some of them genuinely common
- How sorting itself is a storytelling choice, not just tidiness
- Where to go deeper, if this becomes a real interest

## A report page should tell one story

Every report page should communicate something at a glance — not
"here's all the data," but "here's the point this data makes." That
means resisting the urge to use a different chart type on every tile
just to demonstrate range. Visualizations should paint a picture and be
easy to read; when a simple bar chart already makes the point clearly,
adding a fancier visual doesn't improve the story — it just adds
friction between the viewer and the point.

## Distortions worth avoiding

A handful of specific choices genuinely mislead readers, more often
than report builders realize:

- **3D charts and charts that don't start at zero.** Both distort the
  visual comparison between values, making differences look bigger or
  smaller than they really are.
- **Pie, donut, and gauge charts, past a small number of categories.**
  The human brain compares angles and areas far less accurately than it
  compares bar lengths. Keep pie charts under roughly eight categories,
  and reach for them only for part-to-whole relationships, not
  side-by-side comparison.
- **Mixing large and small measures on one axis.** A line chart with
  one series in the millions and another in the thousands makes the
  smaller series look flat, even if it's moving significantly. Use a
  second axis (a combo chart) instead of forcing both onto one scale.
- **Mixing precision or time frames on one page.** Don't put "last
  month" next to a chart filtered to a specific month from last year —
  readers assume consistent time frames unless you tell them otherwise.

## Encoding numbers so they're actually readable

Keep displayed numbers to three or four significant digits. "3.4
million" reads faster and more accurately than "3,400,000" — scale for
thousands or millions rather than showing every digit. And resist
adding data labels to every bar in a chart; if the bars are large
enough to read visually, a label on every single one is just noise
competing with the shape of the data itself.

## Sorting is a storytelling decision

How you sort a chart isn't a finishing touch — it changes what a viewer
notices first:

- **Sort by the measure** when you want to draw attention to the
  highest or lowest value.
- **Sort by the category** (alphabetically, or by a natural order like
  months) when you want viewers to quickly locate one specific category
  among many.

Choosing the wrong one doesn't break the chart — it just tells a
slightly different story than the one you meant to tell.

## Seeing these principles applied

Revisit the Sales and Marketing sample dashboard from Lesson 64:

![Screenshot of the Sales and Marketing Sample dashboard, showing consistent teal coloring across charts and a treemap sorted by manufacturer size.](/courses/power-bi/ch08/65-storytelling/power-bi-marketing-sample-dashboard.png)
*Consistent color, consistent scale, and a treemap where size itself does the sorting — the largest manufacturer is simply the biggest rectangle.*

Every choice on this page — what's a card versus what's a chart, what's
sorted by value versus by category, what shares a color across tiles —
is a small storytelling decision, made deliberately rather than left to
Power BI's defaults.

## Going deeper

This lesson only scratches the surface of data visualization as a
discipline. If it interests you, look into *Storytelling with Data* by
Cole Nussbaumer Knaflic, *The Truthful Art* by Alberto Cairo, and
*Envisioning Information* by Edward Tufte — all cited directly in
Microsoft's own design guidance, and all worth an afternoon.

## Key terms

| Term | Meaning |
|---|---|
| Visual distortion | A chart choice (3D, truncated axis, mismatched scale) that misrepresents the underlying comparison |
| Sort by measure vs. category | Sorting to highlight extremes, versus sorting to help viewers locate a specific item |

## Lab

1. Take a chart you built earlier in this course and check it against
   the distortion list above — does it start at zero, avoid 3D, and
   keep large/small measures off the same axis?
2. Try sorting the same chart two ways — by measure, then by category —
   and notice how each draws attention to something different.
3. Round any displayed numbers in that chart to three or four
   significant digits if they aren't already.

## Check yourself

You're ready for Lesson 66 when you can look at a chart and identify,
specifically, which of this lesson's distortions (if any) it's guilty
of.
