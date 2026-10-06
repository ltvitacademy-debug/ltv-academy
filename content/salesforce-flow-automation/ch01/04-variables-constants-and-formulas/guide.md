**Chapter 1 · Flow Foundations · Lesson 4 of 31**

# Variables, Constants and Formulas

Lesson 3 introduced resources as containers a flow references but never shows on the canvas. This
lesson goes deep on the three resource types you'll use constantly: variables, constants, and
formulas. Get comfortable creating these now, because practically every flow in Chapter 2 needs at
least one.

## What you'll learn

- What a variable is, and why flows need them
- How to create a resource from the Toolbox
- The difference between a variable, a constant, a formula, and a text template
- Which resource type to reach for in a given situation

## What is a variable?

In a flow, a **variable** is a container that holds a piece of information, and that information
can change while the flow runs — that's the "variable" part. Flows use variables constantly:
storing a record's ID so you can update it later, holding a number that changes based on user
input, or keeping a running tally inside a loop. Many elements — like Get Records — create their
own variables automatically, so you don't always have to build one by hand.

## Creating a resource

You can create a resource from inside an element's configuration panel, or ahead of time from the
Toolbox. Click **New Resource**:

![The New Resource button, found under the Toolbox panel in Flow Builder.](/courses/salesforce-flow-automation/ch01/04-variables-constants-and-formulas/new-resource-button.png)

That opens the New Resource window, where you choose a **Resource Type**, give it an **API Name**,
and — for a Variable — pick a **Data Type**:

![The New Resource window, with fields for Resource Type, API Name, Description, and Data Type.](/courses/salesforce-flow-automation/ch01/04-variables-constants-and-formulas/new-resource-window.png)

## Variable vs. constant vs. formula vs. text template

The **Resource Type** dropdown is where these four diverge:

- **Variable** — a container whose value can change while the flow runs. Most resources you build
  are variables.
- **Constant** — a value that never changes, set once when you create it (a tax rate, a fixed
  threshold). Using a constant instead of typing the same literal value in five different places
  means updating it once, everywhere, if it ever needs to change.
- **Formula** — a value calculated from other resources, using functions much like a spreadsheet
  formula. Flow Builder recalculates it automatically whenever the resources it depends on change.

![The New Resource window, set to create a Formula resource.](/courses/salesforce-flow-automation/ch01/04-variables-constants-and-formulas/new-resource-formula.png)

- **Text Template** — a block of formatted text that mixes literal words with merged values from
  other resources, commonly used to build the body of an email or a Chatter post.

![The New Resource window, set to create a Text Template resource.](/courses/salesforce-flow-automation/ch01/04-variables-constants-and-formulas/new-resource-text-template.png)

## Choosing the right one

A practical rule: if the value needs to change while the flow runs, it's a **variable**. If it's
fixed and reused, it's a **constant**. If it's derived by calculating from other values, it's a
**formula**. If it's a chunk of merged, formatted text, it's a **text template**. Getting this
choice right up front makes a flow much easier to read later — including by you, six months from
now.

## Key terms

| Term | Meaning |
|---|---|
| Variable | A resource whose value can change while the flow runs |
| Constant | A fixed value, set once, reused everywhere it's referenced |
| Formula | A calculated value, derived from other resources, recalculated automatically |
| Text Template | A block of formatted text merging literal words with resource values |

## Check yourself

You need a flow to always compare an Opportunity's Amount against the same $25,000 threshold, in
three different Decision elements. Which resource type keeps that threshold defined in exactly one
place?
