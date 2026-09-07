# Lesson 58 — Cross Filtering & Visual Interactions

**Chapter 7 · Building Reports & Visualizations · Lesson 7 of 10**

## What you'll learn

- The default interaction behavior between visuals on a page
- How to turn on and read the interaction icons
- The three interaction options and what each one does
- Configuring how a drillable visual affects the rest of the page

## The default: everything talks to everything

Out of the box, every visual on a report page cross-filters and
cross-highlights every other visual. Select a state on a map, and a
connected column chart highlights while a connected line chart filters
down to just that state — no setup required. **Drilling** a visual is
the one exception: by default, drilling has no effect on other visuals,
though you can change that too.

## Turning on the interaction controls

To see and change how a specific visual affects the others, select it,
then go to **Format → Edit interactions**:

![Screenshot of the Power BI Format ribbon with Edit interactions highlighted in the Interactions group.](/courses/power-bi/ch07/58-interactions/power-bi-interaction.png)
*Select the visual whose effect on others you want to control, then open Edit interactions.*

Every other visual on the page now displays small interaction icons in
its corner — a live control panel for exactly how the currently
selected visual affects each one:

![Screenshot of a report page with visual interaction icons visible on every other visual after Edit interactions was enabled.](/courses/power-bi/ch07/58-interactions/power-bi-turn-on.png)
*The bolded icon on each visual shows which interaction is currently applied to it.*

## The three interaction options

For each other visual on the page, choose one:

| Icon | Effect |
|---|---|
| **Filter** | The selected visual narrows what the other visual shows — non-matching data disappears |
| **Highlight** | The selected visual emphasizes matching data in the other visual, dimming the rest |
| **None** | The selected visual has no effect on that other visual at all |

Note one restriction: line charts, scatter charts, and maps can only be
cross-*filtered*, never cross-*highlighted* — a limitation of those
visual types, not a setting you can toggle around.

## Making a drillable visual affect the page

Drilling normally stays contained to the visual you're drilling in. To
change that, select the drillable visual, turn on drill-down mode, then
go to **Format** and set **Apply drill down filters to** → **Entire
page**. From then on, drilling up or down in that visual updates every
other visual on the page to match your current drill level.

## Working through your report, visual by visual

The practical workflow: select each visual on the page one at a time,
make a test selection, and watch how the others respond. Where the
default behavior doesn't match what you want your report to do, use the
interaction icons to change it — for that one visual's effect on that
one other visual, nothing more.

## Key terms

| Term | Meaning |
|---|---|
| Cross-filter | Narrows other visuals to only matching data |
| Cross-highlight | Emphasizes matching data in other visuals without hiding the rest |
| Edit interactions | The mode showing per-visual Filter/Highlight/None controls |

## Lab

1. On a report page with at least three visuals built from
   **AdventureWorksDW2014**, select one and turn on **Edit
   interactions**.
2. Set one other visual to **Filter**, another to **Highlight**, and a
   third to **None** — then make a selection and confirm each behaves
   differently.
3. If you have a column chart with a date hierarchy, turn on drill mode
   and set **Apply drill down filters to** → **Entire page** — confirm
   drilling now updates the rest of the page.

## Check yourself

You're ready for Lesson 59 when you can explain, from memory, the
difference between the Filter and Highlight interaction options.
