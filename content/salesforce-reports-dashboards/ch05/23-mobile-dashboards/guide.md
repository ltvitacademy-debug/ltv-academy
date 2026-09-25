# Mobile Dashboards

Sales leaders check dashboards in taxis, in hallways, and five minutes before a meeting,
and more often than not it is on a phone. The Salesforce mobile app can show the same
Lightning dashboards you build on a desktop, but a screen that is a fraction of the size
changes what makes a dashboard readable. This lesson covers how dashboards behave on
mobile and how to design for it without building a second copy.

The details of the mobile experience change with Salesforce releases and with how your
admin has configured the mobile app, so treat this lesson as the durable principles and
confirm specifics on your own device.

## What you'll learn

- How a desktop dashboard is presented in the Salesforce mobile app
- Which layout choices survive the trip to a small screen
- How to test a dashboard for mobile before you share it
- What is still best left to the desktop

## What changes on a phone

On a desktop the Dashboard Builder gives you a wide grid, with widgets side by side. A
phone screen is narrow, so in the mobile app widgets are generally presented in a single
scrolling column, following the order they appear on the desktop, from the top left, then
across and down. That has a few consequences:

- **Order is now the story.** Whatever is first in reading order arrives first on a
  phone. Your headline metrics from the layout lesson should already be there.
- **Wide charts get narrower.** A chart with many categories on the x-axis, or long
  labels, becomes crowded. Fewer, shorter categories survive better.
- **Tables lose columns of width.** A table widget with ten columns is hard to read on a
  phone. Keep mobile-critical tables to a few columns.
- **Filters still matter.** Dashboard filters remain a fast way for a viewer to narrow
  the numbers, though they take up screen space, so keep them purposeful.
- **Tapping drills in.** Viewers can generally tap a widget to see it larger, and follow
  through to the source report for more detail.

## Design once, for both

You do not need a separate mobile dashboard. A few habits make the desktop version work
on both:

1. **Lead with metrics.** Metric and gauge widgets are the most phone-friendly widgets
   there are: one number, readable at a glance.
2. **Limit categories.** Aim for a handful of bars or slices per chart. Use groupings that
   the source report can already limit to top values.
3. **Prefer simple charts.** Bars, donuts, and funnels read clearly at small sizes.
   Scatter charts and dense multi-series line charts do not.
4. **Write shorter titles.** A title that fits on one line on desktop may wrap into two
   or three on a phone.
5. **Keep the widget count modest.** Every widget is another swipe.

## Test before you share

Open the dashboard in the mobile app as a viewer, not as the builder, using an account
with the same access your audience has. Check the first screen: does the headline
number show up without scrolling? Tap a chart: is it legible full size? Check refresh:
is the "as of" time clear? If the answer to any is no, fix it on the desktop.

## What to leave to the desktop

Detailed building, such as choosing source reports, creating filters, and tweaking chart
properties, is generally a desktop task. Plan on building and editing at your desk and
consuming on the phone.

## Recap

On mobile, dashboards are generally read in a single scrolling column, in the order you
laid them out. Lead with metrics, limit categories, prefer simple charts, write short
titles, and test as a viewer on a real phone. That wraps up dashboards. Next chapter
turns to sales analytics, starting with pipeline analysis.
