**Chapter 1 · Flow Foundations · Lesson 3 of 31**

# Flow Elements and Resources

A flow is built from three kinds of building blocks: elements, connectors, and resources. Lesson 2
showed you where these live on screen; this lesson is about what each one actually does, so that
when Chapter 2 starts building real flows, the vocabulary is already second nature.

## What you'll learn

- The three building blocks of every flow: elements, connectors, resources
- The three categories of elements: Interaction, Data, Logic
- What each specific element in those categories is for
- How resources differ from elements, and where you create one

## Elements: the nodes that do things

**Elements** are the nodes you see on the canvas — each one is a step that tells the flow what to
do. Flow groups elements into three categories by what they interact with.

### Interaction elements — talk to the user (or another flow)

![The flow elements in the Interaction category: Screen, Action, and Subflow.](/courses/salesforce-flow-automation/ch01/03-flow-elements-and-resources/interaction-elements.png)

- **Screen** — displays information to a user or collects it from them (covered in depth in
  Lesson 8)
- **Action** — reaches out to users, Chatter, email, approvals, or external systems
- **Subflow** — calls another, already-built autolaunched flow from inside this one (Lesson 11)

### Data elements — talk to Salesforce records

![The flow elements in the Data category: Create Records, Update Records, Get Records, and Delete Records.](/courses/salesforce-flow-automation/ch01/03-flow-elements-and-resources/data-elements.png)

Data elements look up, create, update, and delete Salesforce records — one record at a time, or
many at once. Every record-triggered flow in Chapter 2 leans heavily on this category.

### Logic elements — talk to the flow itself

![The flow elements in the Logic category: Assignment, Decision, Loop, Collection Sort, and Collection Filter.](/courses/salesforce-flow-automation/ch01/03-flow-elements-and-resources/logic-elements.png)

Logic elements evaluate and manipulate data already inside the flow: branching into multiple paths
(Decision), looping over a group of records (Loop), changing a stored value (Assignment), or
reordering/filtering a collection. Logic only affects data inside the running flow — to make a
change stick after the flow finishes, you still need a Data element or an Action.

## Connectors: the lines between elements

**Connectors** are the lines on the canvas that define which element the flow executes next. Most
of the time a flow just follows its connectors in order, but Decision and fault paths create
branches — more on those in Chapter 3.

## Resources: containers the flow references

**Resources** don't appear as nodes on the canvas, but elements reference them constantly. A
resource is a container for a value or a formula that resolves to a value — a variable holding a
record's ID, a constant, a formula, and more. You create one from the toolbox's **New Resource**
button:

![The New Resource button, found under the Toolbox panel in Flow Builder.](/courses/salesforce-flow-automation/ch01/03-flow-elements-and-resources/new-resource-button.png)

Many elements create their own resources automatically — a Get Records element, for example,
creates a variable holding what it found, without you having to build one by hand first. Lesson 4
goes deep on resources: variables, constants, and formulas specifically.

## Key terms

| Term | Meaning |
|---|---|
| Element | A node on the canvas — a step that tells the flow what to do |
| Connector | A line on the canvas defining which element runs next |
| Resource | A container (variable, constant, formula...) referenced by elements, not shown on canvas |
| Interaction / Data / Logic | The three categories elements are grouped into, by what they interact with |

## Check yourself

Your flow needs to update every Contact linked to a Closed Won Opportunity. Which element
category handles finding and updating those records, and which category would you use if you
first needed to loop over each one individually?
