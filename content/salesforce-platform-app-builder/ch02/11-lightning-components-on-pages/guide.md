# Lightning Components on Pages

**Chapter 2 · User Interface · Lesson 11 of 24**

## What you'll learn

- Where custom components show up in the Components panel
- What a custom Lightning component looks like running on a page
- How the same component adapts to mobile without a separate build
- The clean division of labor between App Builder and developer

## Standard, then custom

![The Lightning Components panel, listing standard components (Chatter Feed, Dashboard, Flow...) and a Custom section with a developer-built component.](/courses/salesforce-platform-app-builder/ch02/11-lightning-components-on-pages/component-palette-with-custom.png)

The Components panel lists Salesforce's standard components first.
Scroll down and, if your org has any, you'll find a **Custom**
section too. A custom Lightning web component drags onto the canvas
exactly the same way a standard one does — same palette, same
drag-and-drop.

## A custom component, running

![An 'Opportunity Alert' custom Lightning web component on an app's home page, flagging stale opportunities.](/courses/salesforce-platform-app-builder/ch02/11-lightning-components-on-pages/custom-component-on-app-home.png)

**Opportunity Alert** isn't a Salesforce feature — it's a Lightning
web component a developer wrote. As the Platform App Builder, you
didn't write it; you dragged it onto this app's home page the same
way you'd drag a standard list view.

## The same component, on mobile

![The same custom component rendered on the Salesforce mobile layout, inside the Lightning App Builder canvas preview.](/courses/salesforce-platform-app-builder/ch02/11-lightning-components-on-pages/custom-component-mobile-view.png)

The App Builder canvas previews both desktop and mobile without a
separate mobile build. Responsive behavior is something the
component's own code handles — not something the App Builder
configures from scratch for each device.

## Who builds what

```
Platform App Builder:
  drags components onto the canvas
  sets exposed properties (which list, which filter)
  decides WHERE a component goes

Developer:
  writes the Lightning web component itself
  decides WHAT the component can do

Neither role replaces the other.
```

An **exposed property** is a setting the developer deliberately made
configurable — for example, which list a component shows, or how many
records to display. The App Builder sets these in the Page properties
panel; nothing about them requires writing code.

## Key terms

| Term | Meaning |
|---|---|
| Lightning web component (LWC) | A reusable custom UI building block, written by a developer |
| Components panel | The palette listing both standard and custom components |
| Exposed property | A developer-defined setting on a component that an App Builder can configure |

## Check yourself

A developer hands you a new "Customer Health Score" component and
says "it has three exposed properties." What does that sentence tell
you about what you can and can't do with it as a Platform App Builder?
