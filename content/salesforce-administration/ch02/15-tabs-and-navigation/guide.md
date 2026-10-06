# Tabs and Navigation

**Chapter 2 · Configuring the Organization · Lesson 15 of 36**

Every tab that shows up across the top of a Lightning app — Home, Accounts, Opportunities,
Reports — is configured in exactly one place: the **Navigation Items** step of that app. This
lesson looks at how an admin sets that default navigation, and how far a user can personalize
it from there.

## What you'll learn

- How Navigation Items are configured during app creation (or editing)
- The difference between an admin-set default and a user's personal navigation
- What users can and can't do to their own navigation bar
- Why two apps for the same org can show completely different tab sets

## Setting the default: Navigation Items

When building or editing a Lightning app in App Manager, the **Navigation Items** step shows two
columns: **Available Items** (every tab and object not currently in the app) and **Selected
Items** (what will actually render as tabs, in order). Moving an item across and reordering it
with the up/down arrows sets what every user of that app sees by default.

![The Navigation Items step of New Lightning App: Available Items on the left with a search box, Selected Items on the right listing Home, Price Books, Products, Opportunities, Reports, and Dashboards with icons, plus arrow buttons to move and reorder items.](/courses/salesforce-administration/ch02/15-tabs-and-navigation/navigation-items-step.png)
*Order matters here — items render left to right in exactly this sequence.*

## What it looks like once published

The navigation bar a user actually sees directly reflects this configuration. Two different
apps built for two different teams can show entirely different tab sets, even though they're
running against the exact same org and the exact same underlying data.

![The Sales app's live navigation bar: Home, Opportunities, Leads, Tasks, Files, Accounts, Contacts, and a "More" dropdown for additional items.](/courses/salesforce-administration/ch02/15-tabs-and-navigation/sales-app-tab-bar.png)
*The Sales app's navigation leads with Opportunities and Leads — the objects a sales rep lives in day to day.*

![The Product Management app's live navigation bar: Home, Products, Opportunities, Reports, and Dashboards — a visibly different tab set from the Sales app above, even in the same org.](/courses/salesforce-administration/ch02/15-tabs-and-navigation/product-management-app-tab-bar.png)
*Same org, same data model, completely different default navigation — because it's a different app.*

## How much a user can change for themselves

Users aren't locked into the admin's exact order. Clicking the pencil icon on the navigation bar
lets a user:

- Drag existing items to reorder them
- Click **Add More Items** to search their favorites or anything else available in the org and
  add it to their own bar
- Remove items they added themselves with the **x**

What a user *can't* do is rename or remove the default items an admin specified for the app,
including standard or custom objects the admin placed there. And personalization itself has a
ceiling: once a navigation bar holds more than 50 items, users lose the ability to personalize
it further.

## Key terms

| Term | Meaning |
|---|---|
| Navigation Items | The App Manager wizard step controlling which tabs appear in an app, and their order |
| Selected Items | The tabs that will actually render, in the order they'll render in |
| Personalized navigation | A user's own additions/reordering on top of the admin's default |
| 50-item limit | The point past which users can no longer personalize their own navigation bar |

## Check yourself

An admin removes a tab from an app's Navigation Items in Setup. A user had previously added that
same tab to their own personalized navigation. What happens to it on the user's bar?
