# Lesson 18 — Navigating the Home Page, Tabs and List Views

**Chapter 4 · Using Salesforce · Lesson 18 of 20**

## What you'll learn

- What's actually on a Salesforce Home page, and why it looks different per app
- How the tabs bar works, including the overflow "More" menu
- What a list view is, and how to switch between different list views of the same object
- How to filter and sort a list view to find exactly the records you need

## The Home page: your starting point

Every app's **Home** tab is a dashboard-style landing page, built out of configurable components — but which components appear depends entirely on which app you're in, because different jobs need different information at a glance.

![Real screenshot of the Customer Service app's Home page, showing a welcome message with office hours and SLA information, plus a Customer Service Dashboard with components for Current Open Cases and Open High Priority or Escalations.](/courses/salesforce-and-crm-foundations/ch04/18-navigating-the-home-page-tabs-and-list-views/customer-service-home-tabs-dashboard.png)
*The Customer Service app's Home page — completely different content from the Sales app's Home page in the last lesson, even though both are called "Home." Notice the tabs bar: Home, Cases, Contacts, Accounts, Reports, Dashboards.*
Source: [Salesforce Ben — How to Create a Custom App in Salesforce](https://www.salesforceben.com/how-to-create-a-custom-app-in-salesforce/)

A Home page can surface a welcome message, embedded reports, key metrics, your assigned tasks, and more — all placed there by an admin using the Lightning App Builder, a drag-and-drop page editor you'll work with hands-on later in this career path.

## The tabs bar and the "More" overflow

Each tab in the bar takes you to one object's records (Lesson 16). Not every tab you have access to can fit in the visible bar, though — when there isn't room, Salesforce tucks the remaining tabs behind a **More** dropdown at the right edge, so you never lose access to a tab, you just might need one extra click to find it.

## List views: the real way you browse records

Clicking any object's tab doesn't just dump every single record on you — it opens a **list view**: a filtered, sorted table of that object's records. Salesforce comes with some default list views (like "All Opportunities" or "My Opportunities"), and both admins and regular users can create their own.

![Real screenshot of a Lightning Experience Opportunities list view named "High Probability Opportunities," showing a sortable table with columns for Opportunity Name, Account Name, Stage, Close Date, and Amount.](/courses/salesforce-and-crm-foundations/ch04/18-navigating-the-home-page-tabs-and-list-views/opportunities-list-view.jpg)
*A real list view: "High Probability Opportunities," filtered to a specific slice of the Opportunity object and sorted by Opportunity Name.*
Source: [Shantelle Smith — Creating a Salesforce List View](https://www.shantellesmith.com/salesforce-list-view/)

![Real screenshot of the list view picker dropdown open on the Opportunities tab, showing Recent List Views (All Opportunities, High Probability Opportunities, Recently Viewed) and All Other Lists (Closing Next Month, Closing This Month, My Opportunities, New Last Week, New This Week).](/courses/salesforce-and-crm-foundations/ch04/18-navigating-the-home-page-tabs-and-list-views/list-view-picker-dropdown.jpg)
*Clicking the list view name opens this picker — a quick way to jump between every saved list view for this object.*
Source: [Shantelle Smith — Creating a Salesforce List View](https://www.shantellesmith.com/salesforce-list-view/)

Inside a list view, you can:

- **Switch list views** instantly using the picker shown above, without leaving the object.
- **Sort** by clicking any column header.
- **Filter** using the Filters panel, narrowing records down by any field's value (for example, only Opportunities owned by you, or only Accounts in the "Technology" industry).
- **Create a new list view** from scratch, saved either privately (just for you) or shared with specific user groups.

Learning to build the right list view — rather than scrolling through hundreds of records looking for the handful you care about — is one of the single highest-leverage everyday skills a new Salesforce user can pick up.

## Key terms

| Term | Meaning |
|---|---|
| Home page | An app's configurable landing dashboard, different per app |
| More menu | The overflow dropdown holding tabs that don't fit in the visible tab bar |
| List view | A filtered, sorted table of an object's records |
| Filter | A rule narrowing a list view down to records matching specific field values |

## Lab

1. Open the Opportunities (or any object) tab and note the name of the default list view shown.
2. Use the list view picker to switch to a different saved list view.
3. Create a new list view filtered to just your own records, and save it.

## Check yourself

You're ready for Lesson 19 when you can open any object's tab, switch between at least two list views, and apply a filter to narrow the results — without needing to ask for help.
