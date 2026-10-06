# Lightning App Builder

**Chapter 2 · User Interface · Lesson 8 of 24**

## What you'll learn

- The five parts of every Lightning App Builder canvas
- The drag, drop, configure workflow for building a page
- The three page types Lightning App Builder actually produces
- What a finished page looks like running live

## The canvas, five parts

![The Lightning App Builder canvas, numbered 1 through 5: page name, toolbar, Components panel, canvas, and Page properties.](/courses/salesforce-platform-app-builder/ch02/08-lightning-app-builder/app-builder-canvas-annotated.png)

Every page you build here uses the same layout:

1. **Page name**, at top
2. **Toolbar** — undo/redo, save, activation
3. **Components panel** — everything you can drag onto the page
4. **Canvas** — where the page actually takes shape
5. **Page properties** — page-level settings on the right

## Drag, drop, configure

![A Lightning App Builder canvas mid-build, with a Components panel on the left and a configured page on the right.](/courses/salesforce-platform-app-builder/ch02/08-lightning-app-builder/app-builder-canvas-components.png)

Building a page is a three-step loop, repeated for every component:

1. **Drag** a component (list view, report chart, related list...) from the palette
2. **Drop** it onto the canvas
3. **Configure** it in the right-hand panel — which object, which filter, how many records

No code at any point in that loop.

## Three page types, one tool

| Page type | What it replaces/builds |
|---|---|
| App Page | A custom home page for one specific app |
| Record Page | Overrides the standard layout for one object (steadily replacing page layouts) |
| Home Page | Replaces the org-wide Lightning home screen |

## The result, running

![A finished Lightning App Builder page live in the org, showing a list view and recent opportunities pulling real data.](/courses/salesforce-platform-app-builder/ch02/08-lightning-app-builder/finished-app-page-live.png)

Everything on this live page — the list view, the recent-items
panel — is the exact configuration dragged into place on the canvas.
No custom code sits behind either component.

## Key terms

| Term | Meaning |
|---|---|
| Components panel | The palette of draggable standard/custom components |
| App Page | A Lightning App Builder page serving as a custom app home page |
| Record Page | A Lightning App Builder page overriding an object's record layout |
| Activation | Publishing a saved page so it's actually visible to users |

## Check yourself

Your manager wants a single screen that shows every open Case for
the logged-in support rep, with no code written. Which of the three
Lightning App Builder page types fits, and why?
