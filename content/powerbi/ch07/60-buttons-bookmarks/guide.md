# Lesson 60 — Buttons, Bookmarks & Navigation

**Chapter 7 · Building Reports & Visualizations · Lesson 9 of 10**

## What you'll learn

- What a bookmark actually captures about a report page's state
- How to create one, and how to control what it restores
- Assigning bookmarks to buttons for one-click navigation
- Building a presentation-style walkthrough with bookmark groups

## What a bookmark captures

A **bookmark** saves the current state of a report page — not just
which page, but its filters, slicer selections, cross-highlighting,
sort order, drill position, and which objects are visible. Turn it on
from **View → Bookmarks**:

![Screenshot of the Bookmarks pane in Power BI Desktop with Add and View buttons, and instructions for capturing key data.](/courses/power-bi/ch07/60-buttons-bookmarks/bookmarks-pane.png)
*Get the page looking exactly how you want it captured, then select Add.*

Arrange a page exactly how you want it remembered, then select **Add**:

![Screenshot of the Bookmarks pane with the Add button highlighted, and guidance text explaining how to capture the current filtered state.](/courses/power-bi/ch07/60-buttons-bookmarks/bookmarks-add.png)
*Power BI names the new bookmark automatically — rename it to something meaningful right away.*

## Controlling what a bookmark restores

Not every bookmark should restore everything. Under a bookmark's
**More options (...)**, toggle which properties it applies:

- **Data**: filters and slicer selections.
- **Display**: visual visibility and spotlight state.
- **Current page**: whether selecting the bookmark navigates to a
  specific page, or just applies its settings wherever you already are.
- **All visuals** vs. **Selected visuals**: whether the bookmark affects
  every visual on the page, or only ones you'd selected when you
  created it.

If you're using bookmarks to toggle between different *views* of the
same page rather than different *filters*, turn **Data** off — so
switching views doesn't reset a viewer's filter selections along with
it.

## Assigning a bookmark to a button

Bookmarks become genuinely useful for report navigation once they're
attached to something clickable:

![Screenshot of the Format button pane with Action toggled On, Type set to Bookmark, and a specific bookmark named "Alan Guinot" selected.](/courses/power-bi/ch07/60-buttons-bookmarks/bookmarks-button.png)
*Insert a button, toggle Action on, set Type to Bookmark, and pick which one it applies.*

1. **Insert** ribbon → **Buttons** → any style (or **Blank**).
2. In **Format button**, toggle **Action** on.
3. Under **Action**, set **Type** to **Bookmark**.
4. Choose the specific bookmark from the dropdown.

Selecting that button now applies the bookmark — a one-click way to
reset filters, switch views, or jump between report states.

## Building a guided walkthrough

Create several bookmarks and select **More options → Group** to gather
them together. Selecting **View** on a bookmark that belongs to a group
plays *just that group* as a slideshow — perfect for stepping an
audience through a sequence of insights, one bookmark at a time,
without them touching anything themselves.

## Key terms

| Term | Meaning |
|---|---|
| Bookmark | A saved snapshot of a report page's filters, selections, and visibility state |
| Data property | The filter/slicer portion of what a bookmark restores |
| Display property | The visibility/spotlight portion of what a bookmark restores |
| Bookmark group | A named collection of bookmarks that can be played as its own slideshow |

## Lab

1. On a report page built from **AdventureWorksDW2014**, filter to one
   year and one category, then create a bookmark capturing that state.
2. Assign that bookmark to a button using **Insert → Buttons**, and
   confirm selecting the button reapplies the filtered view.
3. Create two or three more bookmarks capturing different views, group
   them, and use **View** to play them as a slideshow.

## Check yourself

You're ready for Lesson 61 when you can explain why you'd turn off a
bookmark's Data property when using bookmarks to switch between
different visual layouts rather than different filters.
