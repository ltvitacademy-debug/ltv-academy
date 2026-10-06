# What a Salesforce Application Is

**Chapter 1 · Application Fundamentals · Lesson 1 of 24**

## What you'll learn

- What a Salesforce "application" actually is (hint: no installer, no separate codebase)
- Where every app a user can open lives: the App Launcher
- The four pieces every app bundles together
- Where admins go to see and manage every app in an org

## An app is configuration, not code

A Salesforce application isn't separate software. It's a curated
container built on top of the one platform your org already runs —
a specific set of tabs, a specific look, shown to a specific group of
users. As a Platform App Builder, assembling that container, not
writing code, is the actual job.

![The App Launcher showing a grid of standard and custom Salesforce apps side by side.](/courses/salesforce-platform-app-builder/ch01/01-what-a-salesforce-application-is/app-launcher-all-apps.png)

Every app a user can open — whether Salesforce shipped it (Sales,
Service, Marketing) or your org built it — shows up in the same App
Launcher grid. There's no visual or technical distinction between a
standard app and a custom one once it's built.

## What you see once you're inside one

![A custom app's home page, showing its branded nav bar and a tab set built for an energy-consulting business.](/courses/salesforce-platform-app-builder/ch01/01-what-a-salesforce-application-is/custom-app-home-page.png)

Open an app and you get three things at once: a branded navigation
bar (name, icon, color), a specific set of tabs, and a home page. The
example above is an "Energy Consultations" app — its tabs are Energy
Audits and Accounts, not whatever tabs the Sales app happens to use.
Two different apps on the same org, same data model underneath,
completely different experiences on top.

## Where admins manage the whole inventory

![Setup's Lightning Experience App Manager, listing every app in the org with its type and last-modified date.](/courses/salesforce-platform-app-builder/ch01/01-what-a-salesforce-application-is/app-manager-list.png)

Setup's **App Manager** (Setup → Quick Find → "App Manager") is the
admin's master list: every app that exists in the org, standard and
custom, Classic and Lightning, with a "New Lightning App" button
sitting right at the top. This is also where Lesson 2 starts.

## The four things every app bundles

| Piece | What it controls |
|---|---|
| Tabs | Which objects and pages the app surfaces |
| Branding | The app's name, icon, and color |
| Navigation order | What sequence users see the tabs in |
| Visibility | Which profiles are even allowed to open the app |

An app is nothing more or less than those four things, packaged
together under one name in App Manager.

## Key terms

| Term | Meaning |
|---|---|
| App Launcher | The grid icon where users open any app they have access to |
| App Manager | The Setup page listing and managing every app in the org |
| Lightning app | A modern, admin-configured app (as opposed to a legacy Classic app) |
| Tab | A single object or page surfaced inside an app's nav bar |

## Check yourself

A coworker says "we need to build a new Salesforce application for
the warranty team." Before writing a single line of anything, what
four things will you actually be configuring?
