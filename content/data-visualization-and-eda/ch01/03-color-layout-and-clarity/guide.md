# Color, Layout & Clarity

Choosing the right chart type (Lesson 2) gets you most of the way. The rest comes from color, layout and labels, which decide whether a reader gets your point in five seconds or gives up. This lesson gives you a short checklist and one technique that does most of the work.

## What you'll learn

- The three jobs color can do in a chart, and how to pick a palette for each
- How to keep charts readable for people with color-vision deficiency
- Layout habits: takeaway titles, direct labels, sorting and decluttering
- The "grey everything, highlight one thing" technique, in matplotlib

## Color is information, not decoration

Before you color anything, ask what the color *means*. There are three legitimate jobs.

| Palette type | Use it for | Example |
| --- | --- | --- |
| **Categorical** | Groups with no natural order, using a few distinct hues | Regions, product lines |
| **Sequential** | Values that run from low to high, using light-to-dark of one hue | Spend per customer, density |
| **Diverging** | Values above and below a meaningful center, with two hues meeting at a neutral middle | Change vs last year, correlation from -1 to +1 |

Rules of thumb:

- Limit categorical colors to about five or six. More than that and readers cannot tell them apart; group the rest into "Other" or use small multiples instead.
- Do not use a rainbow to show a sequential variable. Its bright bands create false boundaries. Perceptually uniform maps such as `viridis` are safer.
- Keep color meaning consistent across every chart in a report. If West is orange on one page, it is orange on all of them.

### Accessibility

Roughly one in twelve men has some form of red-green color-vision deficiency, so never rely on red versus green alone. matplotlib ships a colorblind-friendly cycle you can switch on in one line:

```python
import matplotlib.pyplot as plt

plt.style.use("tableau-colorblind10")
print(plt.rcParams["axes.prop_cycle"].by_key()["color"][:3])
# ['#006BA4', '#FF800E', '#ABABAB']

cmap = plt.get_cmap("viridis")        # a sequential map
diverging = plt.get_cmap("coolwarm")  # a diverging map
```

Also add a second cue where you can: direct labels, different line styles, or markers.

## Layout and clarity habits

1. **Write the title as the finding.** "West customers spend the most" tells the reader what to see; "Average spend by region" only names the topic.
2. **Label directly.** Put values on the bars or names at the line ends, so nobody has to trace to a legend.
3. **Sort by value** unless the categories have a natural order (months, age bands).
4. **Remove non-data ink.** Heavy borders, dense gridlines, 3D effects and drop shadows compete with the data. Keep only what helps the reader read a value.
5. **Start bars at zero.** (Lesson 4 explains why in detail.)

## Grey everything, highlight one thing

The single most effective trick for explanatory charts: make everything a quiet grey and use one accent color for the thing you want the reader to notice.

```python
import matplotlib.pyplot as plt

# `customers` is the seeded retail table built in Lesson 2
by_region = (customers.groupby("region")["spend"]
             .mean().sort_values())
colors = ["#b0b0b0"] * 3 + ["#d55e00"]

fig, ax = plt.subplots(figsize=(8, 3.2))
ax.barh(by_region.index, by_region.values, color=colors)
ax.bar_label(ax.containers[0], fmt="%.0f", padding=3)
ax.set_title("West customers spend the most", loc="left")
ax.set_xlabel("Average spend ($, illustrative)")
for side in ["top", "right"]:
    ax.spines[side].set_visible(False)
fig.tight_layout()
```

The averages are South 283, North 294, East 296 and West 325 (illustrative). Sorted ascending, `barh` puts the largest bar at the top. The `#d55e00` orange-vermillion comes from a colorblind-safe palette and stands out clearly against grey.

Compare this with the default chart of the same numbers: four identical blue bars and a generic title. In the clarified version the eye goes straight to West, and the title says why.

## Recap

- Use categorical, sequential and diverging palettes for what they were designed for.
- Never depend on red versus green alone; add a second cue.
- Titles state findings; labels sit on the data; clutter goes.
- Grey plus one accent color directs attention better than a full palette.
- Next lesson: how charts mislead, sometimes on purpose, and how to keep yours honest.
