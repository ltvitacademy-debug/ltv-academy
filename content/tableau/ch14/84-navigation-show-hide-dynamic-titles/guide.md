# Lesson 84 — Navigation, Show/Hide Containers & Dynamic Titles

**Chapter 14 · Dashboards · Lesson 84 of 95**

## What you'll learn

- How to add a **Navigation object** so viewers move between dashboards
  without hunting for tabs
- The **Go to Sheet** action — navigation triggered by clicking a mark,
  not a button
- **Show/Hide buttons**, which toggle a floating object's visibility
  without disturbing the rest of the layout
- **Dynamic titles**, where a dashboard's own title text updates based on
  what's selected or filtered

## Navigation objects: a button that switches dashboards

A **Navigation object** is a dedicated dashboard object — found right in
the Objects panel alongside Horizontal, Vertical, Text, and Image — whose
entire job is switching the viewer to a different dashboard or story when
clicked.

![The Objects panel with a Navigation object being dragged onto the dashboard canvas, an arrow highlighting the drag toward the underlying data view.](/courses/tableau/ch14/84-navigation-show-hide-dynamic-titles/dashboard_object_drag1.png)
*Navigation lives in the same Objects panel as every container and object type from Lesson 80.*
Source: [Tableau Help — Create a Dashboard](https://help.tableau.com/current/pro/desktop/en-us/dashboards_create.htm)

Drag one in, then use **Edit Button** to set its destination dashboard,
its button image or text, and how it looks on hover. This is the standard
mechanism behind multi-page Tableau workbooks — a landing dashboard with
Navigation buttons to "Sales Detail," "Customer Detail," "Regional
Breakdown," each its own separate dashboard tab.

## Go to Sheet actions: navigation from a click on a mark

Navigation objects need a dedicated button. The **Go to Sheet** action
(configured through the same Actions dialog from Lessons 82-83) triggers
navigation from an interaction with a mark instead — click a bar
representing "Furniture" and jump straight to a Furniture-specific detail
dashboard, no button required. Configure a source sheet, a trigger (Hover,
Select, or Menu), and a target sheet, exactly like every other action
type you've already built. The difference from a filter action is what it
*does*: instead of narrowing data in place, it moves the viewer somewhere
else entirely.

## Show/Hide buttons: toggling a floating object

Recall Lesson 80's distinction between tiled and floating objects. A
**Show/Hide button** is the mechanism that makes floating genuinely useful
in practice: it adds a small toggle (usually an X icon) to a floating
object, letting a viewer show or hide it on demand without disturbing
anything tiled underneath.

![A floating filter panel (Select Region, Select State, Obesity Rate legend) shown next to the same dashboard with the panel hidden — an arrow points from the panel's X icon to a small hamburger-menu icon that reappears where the panel used to be.](/courses/tableau/ch14/84-navigation-show-hide-dynamic-titles/dashboard_showhide.png)
*Click the X to hide the floating panel; the hamburger icon that remains brings it back.*
Source: [Tableau Help — Create a Dashboard](https://help.tableau.com/current/pro/desktop/en-us/dashboards_create.htm)

To add one: select the floating object, open its context menu (the small
downward triangle in its corner), and choose **Add Show/Hide Button**.
This is exactly the pattern Lesson 80 flagged as floating's best use case —
a filter panel that stays out of the way until a viewer specifically wants
it, then tucks itself back down.

## Dynamic titles: a title that reacts to the dashboard

A dashboard title doesn't have to be static text. Editing a title (via its
context menu's **Edit Title**) opens a rich-text editor with an **Insert**
menu that lets you drop in dynamic placeholders — most commonly
`<Sheet Name>`, but also field values and parameter values.

![The Edit Title dialog showing the placeholder text "<Sheet Name>" in the title-editing rich-text box, with formatting controls (font, size, bold, alignment) and an Insert menu above it.](/courses/tableau/ch14/84-navigation-show-hide-dynamic-titles/title3.png)
*The same `<Sheet Name>` placeholder syntax you've already seen in URL actions — Insert menu placeholders work the same way across Tableau's dialogs.*
Source: [Tableau Help — Format Individual Parts of the View](https://help.tableau.com/current/pro/desktop/en-us/formatting_specific_titlecaption.htm)

A practical use: build a title that reads "Sales for [Selected Region]" by
inserting the field currently driving a parameter or filter — so a viewer
who clicks "Northeast" on a map sees the dashboard's own title confirm what
they're now looking at, instead of having to infer it from the filter
panel alone. Combined with a parameter action from Lesson 83, this is a
genuinely small addition that makes a dashboard feel dramatically more
responsive and intentional.

## Key terms

| Term | Meaning |
|---|---|
| Navigation object | A dedicated dashboard object whose button switches the viewer to a different dashboard or story |
| Go to Sheet action | An action that navigates to a target sheet when a source mark is clicked/hovered |
| Show/Hide button | A toggle (usually an X icon) added to a floating object, letting a viewer show or hide it |
| Dynamic title | A dashboard or worksheet title that inserts field, parameter, or sheet-name values via the Insert menu |

## Lab

1. Build a two-dashboard workbook: a landing dashboard and a detail
   dashboard. Add a Navigation object on the landing dashboard pointing to
   the detail dashboard.
2. Add a floating filter panel to any dashboard and give it a Show/Hide
   button. Then edit that dashboard's title to include a dynamic field or
   parameter value using the Insert menu.

## Check yourself

You're ready for Lesson 85 when you can explain the difference between a
Navigation object and a Go to Sheet action (a dedicated button vs. a click
on a mark), and describe how a Show/Hide button makes Lesson 80's floating
concept practically useful.
