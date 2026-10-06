# Custom Applications

**Chapter 1 · Application Fundamentals · Lesson 2 of 24**

## What you'll learn

- The exact four-stage wizard for building a custom Lightning app
- How Navigation Items decides what actually ships inside the app
- What a finished custom app looks like once it's live
- How users find a brand-new app the moment it's saved

## Building one, start to finish

From Setup, search **App Manager**, then click **New Lightning App**.
The wizard has four stages, and none of them touch code:

| Stage | What you set |
|---|---|
| Details | Name, description, icon, color |
| Branding | Optional custom logo/image |
| Navigation Items | Which tabs ship, and in what order |
| User Profiles | Which profiles can open the app |

## Navigation Items is where the app gets its content

![The App Settings Navigation Items screen, moving tabs from Available Items into Selected Items for a custom app.](/courses/salesforce-platform-app-builder/ch01/02-custom-applications/app-settings-navigation-items.png)

This stage is the one that actually defines what the app does. You
move objects, pages, and standard items from **Available Items** into
**Selected Items**, then reorder the selected list. That ordered list
becomes the app's tab bar, in that exact order, for every user who
opens it.

## What's live once you save

![A custom app's navigation bar, annotated to show the app name, app picker, and ordered tab set.](/courses/salesforce-platform-app-builder/ch01/02-custom-applications/app-nav-bar-annotated.png)

Save the wizard and the app is immediately usable: its own nav bar,
its own app name and icon on the left, an app picker (the dropdown
arrow) for switching to other apps, and the tabs you selected running
across the top in the order you set.

## Found the moment it's saved

![The App Launcher search box returning a newly created custom app by name.](/courses/salesforce-platform-app-builder/ch01/02-custom-applications/app-launcher-search-result.png)

No separate publishing step, no deploy. The second you save the
wizard, the app shows up in the App Launcher, searchable by name,
indistinguishable from any app Salesforce shipped out of the box.

## Key terms

| Term | Meaning |
|---|---|
| New Lightning App wizard | The four-stage, no-code flow for building a custom app |
| Available/Selected Items | The two lists you move tabs between to define an app's content |
| App picker | The dropdown next to an app's name for switching apps |

## Check yourself

Walk through the four wizard stages from memory, in order, and say
in one sentence what each stage actually controls.
