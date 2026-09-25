# Bindings

The queries you have seen so far are fixed: they return the same thing every time. Real dashboards are interactive, so a click on one chart should change what another chart or a text label shows. **Bindings** are how CRM Analytics wires that together. A binding lets one part of a dashboard read a value from another step and use it, and CRM Analytics re-evaluates it as things change. The syntax below is illustrative. Binding syntax has details and edge cases, so verify anything you build against the current Salesforce documentation.

## What you'll learn

- What a binding is and why dashboards need them
- The difference between selection bindings and results bindings
- Where bindings can be used
- What a binding looks like inside a SAQL query

## The problem bindings solve

Imagine a dashboard with an owner filter on the left and a pipeline chart on the right. The chart's query needs to know which owner is selected. Without bindings, the chart's query would be fixed to one value or to all owners. With a binding, the query asks the filter widget "what is selected right now?" and uses the answer.

## Two kinds of binding

- A **selection binding** reads what the user has picked in another step: a value chosen in a filter, a toggle, or a clicked chart bar. It is driven by interaction, so it is evaluated again each time the selection changes.
- A **results binding** reads the results of another step's query, for example a total, a top value, or a set of rows. It updates when that step's query returns new results.

In short: a selection binding follows what the user chooses, and a results binding follows what a query returns.

## Where you can use them

Bindings appear in more places than just query filters:

- **Filters** in a step's query, so the selection in one widget narrows another
- **Widget text**, such as a title or a number that reflects a selection
- **Widget properties**, where some fields, like a reference line's value or label, show a small icon that lets the value come from a binding instead of a typed number
- **Personalization**, such as a greeting that reads a value from a step

The two screenshots show real Salesforce examples: an example dashboard with a personalized greeting and a Top N toggle, and the widget properties panel with the reference line's value field, which can be bound to another step.

## A binding inside SAQL

This filter reads the user's selection from another step. The step name is a stand-in:

```
q = load "Opps";
q = filter q by 'Owner' in
  {{column(Owner_1.selection,
    ["Owner"]).asObject()}};
```

The double curly braces mark an expression CRM Analytics evaluates rather than literal text. The `column` function takes the selected values of the `Owner` field from the step named `Owner_1`, and the query filters on them. A related function, `cell`, returns a single value, which suits a text label:

```
{{cell(Owner_1.selection, 0, "Owner").asString()}}
```

## Handling an empty selection

If the user selects nothing, a binding can come back empty and your query or label may misbehave. A `coalesce` function is often used to supply a default, returning the first non-empty value in its list, for example `"All"` when nothing is selected. Plan for the empty case whenever a binding feeds a query.

## Recap

- A binding lets one dashboard element read a value from another step
- Selection bindings follow user choices; results bindings follow query results
- They work in filters, text, widget properties, and inside SAQL
- Double curly braces mark an expression, and functions like `column` and `cell` pull the values
- Always plan for an empty selection, and verify syntax in current documentation

## Check yourself

A text widget should say "All owners" when nothing is selected in the owner filter and show the chosen owner's name otherwise. Which kind of binding do you need, and which function helps you provide the default?
