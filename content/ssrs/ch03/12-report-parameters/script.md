# Script — Report Parameters

## Segment 1 (title)

Welcome to Chapter 3 — Parameters. This lesson is about the report parameter: the reader-facing input that turns a static report into one people can actually filter and control.

## Segment 2 (screenshot: reportdata-parameters-node)

Most of the time, you don't build a report parameter directly — you add a query parameter first. Add a WHERE clause like "WHERE StoreID = at-StoreID" to a dataset's query, and Report Builder automatically creates a matching dataset parameter and a report parameter to go with it.

That report parameter lands right here, under the Parameters node in the Report Data pane — alongside Built-in Fields, Data Sources, and Datasets. Select it, and its layout shows up in the Parameters pane on the design surface, where you control how the prompt appears to the reader.

## Segment 3 (steps: properties)

Whether it was created automatically or you added it yourself, the Report Parameter Properties dialog is where you shape it. Name is the internal identifier. Prompt is the human-readable label the reader sees. Data type controls what kind of input the viewer shows — and it's worth checking, because a query variable auto-creates its parameter as Text even when the real column is numeric. And Visible versus Hidden decides whether the parameter shows up on the toolbar at all.

## Segment 4 (outro)

Next lesson, we chain parameters together — cascading parameters, where choosing one value filters the list of choices available in the next.
