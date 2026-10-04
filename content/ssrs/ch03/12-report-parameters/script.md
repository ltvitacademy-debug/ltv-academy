# Script — Report Parameters

## Segment 1 (title)

Welcome to Chapter 3 — Parameters. This lesson is about the report parameter: the reader-facing input that turns a static report into one people can actually filter and control.

## Segment 2 (screenshot: ssrb-parameter-tutorial-add-value)

Most of the time, you don't build a report parameter directly — you add a query parameter first. Here's the moment it happens. Add a WHERE clause like "WHERE StoreID = at-StoreID" to a dataset's query and run it, and Report Builder pops up this Define Query Parameters dialog, asking for a value for at-StoreID. Supply one, and behind the scenes Report Builder has just created a matching dataset parameter to go with it.

## Segment 3 (screenshot: reportdata-parameters-node)

That new parameter lands right here, under the Parameters node in the Report Data pane — alongside Built-in Fields, Data Sources, and Datasets. Select it, and its layout shows up in the Parameters pane on the design surface, where you control how the prompt appears to the reader.

## Segment 4 (screenshot: ssrb-parameter-tutorial-select-value)

And this is what the reader actually sees: "Store name" as the label, with a dropdown next to it. That label is the Prompt property, typed in word for word — nothing fancier than that.

## Segment 5 (steps: properties)

Whether it was created automatically or you added it yourself, the Report Parameter Properties dialog is where you shape it. Name is the internal identifier. Prompt is the human-readable label the reader sees. Data type controls what kind of input the viewer shows — and it's worth checking, because a query variable auto-creates its parameter as Text even when the real column is numeric. And Visible versus Hidden decides whether the parameter shows up on the toolbar at all.

## Segment 6 (outro)

Next lesson, we chain parameters together — cascading parameters, where choosing one value filters the list of choices available in the next.
