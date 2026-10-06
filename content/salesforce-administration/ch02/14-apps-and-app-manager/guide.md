# Apps and App Manager

**Chapter 2 · Configuring the Organization · Lesson 14 of 36**

In Salesforce, an "app" isn't a separate piece of software you install — it's a named,
branded collection of tabs and navigation items that points different kinds of users at the
objects they actually need. A sales rep's app shows Leads and Opportunities front and center;
a support agent's app leads with Cases. **App Manager** is where an admin builds, edits, and
assigns these apps.

## What you'll learn

- What a Lightning app actually is, under the hood
- How users switch between apps with the App Launcher
- The steps to build a custom Lightning app in App Manager
- How app access is controlled by profile

## Apps, from the user's side: the App Launcher

Click the **App Launcher** (the grid icon in the top-left of Lightning Experience) and a user
sees every app they have access to — Sales, Customer Service, a custom Product Management app,
whatever your org has defined — plus a searchable list of every individual tab and object
beyond their current app. Users can drag tiles to reorder their most-used apps, making the
Launcher genuinely personal, not just an admin-defined list.

![The Lightning App Launcher: a grid of app tiles — Sales, Customer Service, Product Management, Playground Starter — under "All Apps," with a drag handle on each tile and a "Drag and Drop to re-order" label, and a searchable "All Items" list of individual tabs below.](/courses/salesforce-administration/ch02/14-apps-and-app-manager/app-launcher.png)
*Every tile here is an app an admin built or Salesforce shipped — none of it is separately installed software.*

## Building a custom app: App Manager

From Setup, enter **App Manager** in the Quick Find box. This single page lists every Lightning
app and connected app in your org, with **New Lightning App** as the starting point for building
your own. The wizard walks through several steps:

1. **App Details & Branding** — name, developer name, description, an icon image, and a
   highlight color for the app's navigation bar
2. **App Options** — navigation style (standard vs. console — covered in the next lesson),
   supported form factors, and personalization settings
3. **Utility Items** — optional desktop-only productivity tools docked to the app (covered in
   Lesson 16)
4. **Navigation Items** — which tabs appear in this app, and in what order (covered in Lesson 15)
5. **User Profiles** — which profiles can see and open this app at all

![The "App Details & Branding" step of New Lightning App: App Name "Product Management," Developer Name, Description, an uploaded icon image, a Primary Color Hex value, and a live App Launcher Preview tile.](/courses/salesforce-administration/ch02/14-apps-and-app-manager/new-lightning-app-branding.png)
*The branding set here — icon and color — is what makes an app visually recognizable at a glance in the App Launcher.*

## Who can open the app: User Profiles

The final step of the wizard is access control: a dual-listbox picker moves profiles from
**Available Profiles** into **Selected Profiles**. Only users whose profile is selected here can
see the app in their App Launcher at all — this is a separate, coarser layer of access control
from the field- and object-level permissions covered in Chapter 1's profiles and permission sets.

![The "User Profiles" step of New Lightning App: a dual-listbox with Available Profiles on the left (Marketing User, Read Only, Standard User, etc.) and Selected Profiles on the right (Custom: Sales Profile, Solution Manager, System Administrator), with arrow buttons to move entries between them.](/courses/salesforce-administration/ch02/14-apps-and-app-manager/new-lightning-app-profiles.png)
*A profile not moved into Selected Profiles simply never sees this app — not an error, just invisible to them.*

## Key terms

| Term | Meaning |
|---|---|
| Lightning app | A named, branded set of tabs and navigation items — not separately installed software |
| App Manager | The Setup page listing, creating, and editing every app in the org |
| App Launcher | The grid-icon menu where users switch between apps they have access to |
| User Profiles (app step) | The wizard step controlling which profiles can see and open a given app |

## Check yourself

A user reports they can't find the Product Management app anywhere in their App Launcher, even
though the app exists and other settings look correct. What's the first thing you'd check?
