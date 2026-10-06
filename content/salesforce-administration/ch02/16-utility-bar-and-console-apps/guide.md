# Utility Bar and Console Apps

**Chapter 2 · Configuring the Organization · Lesson 16 of 36**

Standard navigation — the tab bar from the last lesson — works well when users mostly work one
record at a time. Support agents and other high-volume users often need something different:
several records open at once, split-screen style, with productivity tools always one click
away. That's what **console navigation** and the **utility bar** are built for.

## What you'll learn

- The difference between Standard and Console navigation, chosen when building an app
- What the utility bar is and where it's configured
- How to add and configure a utility item
- Why console apps are the default shape for Service Cloud-style work

## Standard vs. Console navigation

Back in the App Options step of the New Lightning App wizard (Lesson 14), one of the first
choices is **Navigation Style**: **Standard navigation** (the familiar single-record-at-a-time
tab experience) or **Console navigation**. Console navigation opens records in subtabs inside a
single workspace tab, so a support agent can jump between a case, the contact on it, and a
related account without losing their place or reloading the page.

![The "App Options" step of New Lightning App: Navigation and Form Factor with Navigation Style radio buttons for "Standard navigation" and "Console navigation," alongside Setup and Personalization options.](/courses/salesforce-administration/ch02/16-utility-bar-and-console-apps/navigation-style-standard-vs-console.png)
*This one radio button, chosen once when the app is built, decides whether the app behaves like a single-record workspace or a multi-tab console.*

## The utility bar: tools that are always there

Whichever navigation style is chosen, an app can also have a **utility bar** — a fixed footer
that opens utilities in docked panels without navigating away from whatever the user is looking
at. It's configured on the **Utility Items** step of the same app wizard: click **Add Utility
Item**, pick a component (Notes, Recent Items, History, an Open CTI softphone, and more), then
set its label, icon, and the panel size it opens to.

![The "Utility Items" step of New Lightning App, configuring a "Recent Items" utility: Label, Icon, Panel Width (340), Panel Height (480), and a "Start automatically" checkbox, with a live preview pane on the left.](/courses/salesforce-administration/ch02/16-utility-bar-and-console-apps/utility-items-step.png)
*Panel Width and Panel Height here control how big the docked panel is when a user opens this utility — not the whole screen, just a slice of it.*

## What a console-style app looks like day to day

An app built around this console pattern — tabs, records open as subtabs, utilities always
docked at the bottom — is the default shape Salesforce ships for Service Cloud-style work, where
an agent is constantly jumping between related records and needs quick tools without ever losing
their current screen.

![A live Customer Service app home page with a tab bar (Home, Cases, Contacts, Accounts, Reports, Dashboards), a welcome message with office hours, and a dashboard showing Current Open Cases and Open High Priority or Escalations.](/courses/salesforce-administration/ch02/16-utility-bar-and-console-apps/service-console-app-home.png)
*Built for exactly the kind of high-volume, multi-record work a utility bar and console navigation are designed for.*

## Key terms

| Term | Meaning |
|---|---|
| Standard navigation | One record open at a time, the familiar tab-bar experience |
| Console navigation | Records open as subtabs inside one workspace, for jumping between related records |
| Utility bar | A fixed footer offering docked tools without navigating away |
| Utility item | One configured tool on the utility bar (Notes, Recent Items, History, a softphone, etc.) |

## Check yourself

A support manager wants agents to see a case, its contact, and its account all open at once
without losing their place. Which Navigation Style choice makes that possible?
