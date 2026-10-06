# Lightning Pages Overview

**Chapter 2 · Configuring the Organization · Lesson 17 of 36**

Everything so far in this chapter has been about which app a user is in and which tabs they see.
This lesson zooms into one level deeper: the actual page a user lands on once they click a tab
— a Home page, a record page, an app page — and the tool that builds it, the **Lightning App
Builder**.

## What you'll learn

- What a Lightning page is, and the three types you'll encounter
- How the Lightning App Builder's drag-and-drop canvas works
- Where Lightning pages are managed in Setup
- How a page gets assigned once it's built — the levels that decide who sees it

## Three kinds of Lightning page

A **Lightning page** is a custom layout built from components in the Lightning App Builder.
There are three types:

- **Home Page**: what a user sees when they land on an app's Home tab
- **Record Page**: what a user sees when they open a specific object's record (an Account, a
  Case, a custom object)
- **App Page**: a freestanding page, not tied to any one record, often used as a dashboard or
  landing page embedded in an app's navigation

All three are built the same way: drag components from a palette onto a canvas.

## The Lightning App Builder canvas

From Setup, enter **Lightning App Builder** in the Quick Find box, or click **Edit Page** from
the gear icon on any page that supports it. The builder shows a component palette on the left —
dozens of standard components like List View, Report Chart, Tabs, and Rich Text — and a live
canvas in the center where you drag components into place and configure them in a panel on the
right.

![The Lightning App Builder editing a Home Page: a Components palette on the left (Accordion, App Launcher, Assistant, Chatter Feed, List View, Performance, Tabs, and more), a canvas in the center showing Quarterly Performance and Assistant components, and a "Drag and drop components onto the canvas" label.](/courses/salesforce-administration/ch02/17-lightning-pages-overview/app-builder-canvas.png)
*Nothing here requires code — every component on this canvas is dragged, dropped, and configured through this panel.*

## Where pages are managed

The **Lightning App Builder** setup page itself (not just the editor) lists every Lightning
page that's been created in the org — its Label, Name, Type (Record Page, Home Page, and so on),
and who created and last modified it — with **Edit**, **Clone**, and **Del** actions and a
**New** button to start one from scratch.

![Setup's Lightning App Builder list page: a table of Lightning Pages with columns for Label, Name, Type (Record Page or Home Page), Created By, and Last Modified By, and a New button above the list.](/courses/salesforce-administration/ch02/17-lightning-pages-overview/lightning-pages-list.png)
*Every custom Lightning page in the org — record pages and home pages alike — is listed and managed from this one page.*

## Assigning a page: three levels

Building a page doesn't automatically put it in front of anyone — it has to be **activated** and
assigned. Salesforce resolves which page to show using three levels, each overriding the one
before it:

1. **Org default** — shown unless something more specific applies
2. **App default** — overrides the org default for a specific app
3. **App, record type, and profile** — the most specific; overrides both of the above

![An Activation dialog titled "Energy Audit Record Page for Sales," explaining that custom record pages can be assigned at the Org Default, App Default, or App, Record Type, and Profile level, each overriding the one before it, with an "Assign as Org Default" button.](/courses/salesforce-administration/ch02/17-lightning-pages-overview/page-activation-levels.png)
*This is the same resolution logic as page layout assignment in the next chapter — more specific always wins.*

## Key terms

| Term | Meaning |
|---|---|
| Lightning page | A custom layout built from components in the Lightning App Builder |
| Home Page / Record Page / App Page | The three types of Lightning page |
| Lightning App Builder | The drag-and-drop tool (and its Setup list page) for building and managing Lightning pages |
| Org Default / App Default / App-Record Type-Profile | The three assignment levels, each overriding the one before it |

## Check yourself

An org has a custom Record Page assigned as the App Default for the Sales app, and another
assigned at the App, Record Type, and Profile level for the same app and a specific profile.
Which one does that profile's users actually see?
