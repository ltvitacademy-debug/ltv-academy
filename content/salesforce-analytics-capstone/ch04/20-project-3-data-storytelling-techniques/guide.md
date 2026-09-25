# Data Storytelling Techniques

After the presentation practice in the last lesson, you probably noticed something: the dashboard was accurate, but you spent a lot of time explaining what each chart meant. Storytelling techniques move that explaining into the design. In this lesson you apply four techniques to the Alder & Vale Systems executive dashboard: a narrative arc, one message per chart, annotation, and removing chartjunk. All numbers are illustrative.

## What you'll learn

- How to give a dashboard presentation a beginning, middle and end
- How to write chart titles that state the message
- What to annotate, and where native tools help
- How to spot and remove chartjunk
- How to apply all four to Project 3

## A narrative arc

A story has three beats, and so does a good executive briefing.

1. **Setup:** the context the VP already agrees with. "We are $5.4M into a $9.0M year, 60% of quota."
2. **Tension:** what threatens the goal. "At the 27% win rate (by count), our $7.2M of open pipeline lands us about $1.7M short, and 19 deals worth $2.1M have gone quiet."
3. **Resolution:** the action that resolves the tension. "Re-engage those 19 deals this week."

You already used this order in Lesson 19 without naming it. Naming it lets you check any presentation: if you cannot identify the tension, the audience will not know why they are listening.

## One message per chart

Every chart on the dashboard should answer one question and carry one message. The easiest test is the title. Compare:

| Descriptive title | Message title |
|---|---|
| Opportunities by Stage | 19 deals worth $2.1M have gone quiet |
| Cases by Priority | 17 high-priority cases are over five days old |
| Closed Won by Rep | Two reps account for most of the gap to quota |

The last example is a hypothetical you would only write if your own data showed it. The rule is that a message title must be true and checkable. In native dashboards, use the component title, subtitle and footer to carry the message and the definition (for example, "win rate by count, year to date"). If you cannot write a message for a chart, ask whether it belongs on the dashboard.

## Annotation

Annotation tells the viewer where to look. Good candidates are the outlier, the target line, the change point, and the definition. Native Salesforce dashboards give you limited annotation, so lean on component titles, subtitles, footers, and conditional colors on metric and gauge components (for example, red below a threshold you define). Tableau, which you have already used in this path, supports annotations directly on the view, which is one honest reason to consider it for a polished executive story. Whichever tool you use, the rest of the story lives in what you say aloud.

## Avoid chartjunk

Chartjunk is decoration that does not carry data. Common examples:

- Three-dimensional effects or heavy shadows
- Rainbow palettes where colors have no meaning
- Dense gridlines, borders and backgrounds
- Pie or donut charts with many slices
- Truncated axes that exaggerate a change

A good rule is to use one accent color for the thing that matters and neutral colors for everything else. Red should mean "look here," not "decoration."

## Apply it to Project 3

Take your dashboard and do a storytelling pass:

1. Write the setup, tension and resolution in three sentences.
2. Rewrite every chart title as a message, or move the chart to a report.
3. Add the definition to each KPI footer.
4. Remove any effect, color or border that carries no data.
5. Highlight only the stalled deals, the backlog and the quota gap.

## Recap

A narrative arc, message titles, purposeful annotation and less chartjunk make the dashboard argue for itself. The last lesson in this project wraps up your work as a portfolio piece.
