# Script — Flow Elements and Resources

## Segment 1 (title)

A flow is built from three kinds of building blocks: elements, connectors, and resources. This lesson is about what each one actually does.

## Segment 2 (screenshot: interaction elements)

Elements fall into three categories. Interaction elements talk to the user or to another flow: Screen displays or collects information, Action reaches out to Chatter, email, or approvals, and Subflow calls another already-built flow from inside this one.

## Segment 3 (screenshot: data elements)

Data elements talk to Salesforce records directly: Create, Update, Get, and Delete Records. Every record-triggered flow you'll build in Chapter 2 leans heavily on this category.

## Segment 4 (screenshot: logic elements)

Logic elements talk to the flow itself: Decision branches into multiple paths, Loop repeats over a group of records, Assignment changes a stored value. Logic only affects data inside the running flow — to make it stick, you still need a Data element.

## Segment 5 (screenshot: New Resource button)

Resources are different — they don't show up as nodes on the canvas, but elements reference them constantly. You create one from this New Resource button in the toolbox. Many elements, like Get Records, create their own resources for you automatically.

## Segment 6 (outro)

Next up: a deep dive on resources specifically — variables, constants, and formulas.
