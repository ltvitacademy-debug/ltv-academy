# Script — Charts in SSRS

## Segment 1 (title)

We've spent this whole chapter setting up tables and matrices. Now let's put a Chart data region on the page — and more importantly, let's get the vocabulary and the mental model right before you touch the wizard, because everything you'll configure later refers back to these same few parts.

## Segment 2 (screenshot: chart-elements)

A chart is just another data region, sitting alongside Table, Matrix, and List on the Insert tab — bound to one dataset, aggregating by default, same as those others. This illustration lays out the vocabulary every chart property dialog is going to use: the Chart Title up top, the Legend showing which color means which series, the Data Point Markers and Labels plotting individual values, the Axis Labels, and the Major and Minor Grid Lines and Tick Marks giving you a frame of reference. Notice this is really two charts stacked — a stacked column chart on top, and a column chart with labeled data points on the bottom — sharing the same four category names along the bottom. Once you can point to each of those parts by name, the property dialogs stop being a mystery.

## Segment 3 (screenshot: chart-data-pane)

Here's where the actual work happens. Select a chart on the design surface and Report Builder opens the Chart Data pane, with three drop zones: Category Groups, Series Groups, and Values. Values is what actually gets plotted — drop a numeric field there and it's wrapped in Sum by default. Category Groups defines your x-axis — each distinct value becomes one data point, and Report Builder builds the matching group for you automatically. And Series Groups is the one people forget: leave it empty, and you get exactly one series, fixed at design time. Add a field like Year to it, and the number of distinct years in your data determines how many series draw on the chart — completely dynamically. And if you've already worked with a Matrix, this should feel familiar, because a chart really is organized like a matrix underneath: Category Groups maps to Columns, Series Groups maps to Rows, Values maps to the Data area.

## Segment 4 (steps: chart wizard types)

The fastest path to a first chart is Insert, Chart, Chart Wizard — it walks you through five of the most common types: column, line, pie, bar, and area. Need something the wizard doesn't offer — scatter, polar, range, stock, shape charts? Skip the wizard. Use Insert, Chart, Insert Chart instead, which drops an empty chart onto the design surface and opens the full Select Chart Type dialog with every type and sub-type Reporting Services supports.

## Segment 5 (outro)

Next lesson, we go from a whole series of data points down to just one — gauges, for showing a single KPI value against a defined range.
