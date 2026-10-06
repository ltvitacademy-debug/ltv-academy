# Mobile and the Salesforce Mobile App

**Chapter 2 · User Interface · Lesson 12 of 24**

## What you'll learn

- What stays identical between desktop and the Salesforce mobile app
- How the mobile navigation menu and bottom tab bar relate to each other
- That a custom app's mobile presence is the same app, not a separate build
- Where an admin controls mobile navigation order specifically

## What doesn't change

Same org, same objects, same records, same security model. A
Lightning page built in App Builder renders on **both** desktop and
mobile from a single build — there is no separate mobile app to
construct. What changes is navigation and layout, not the underlying
app.

| Stays the same | Changes |
|---|---|
| Objects, records, security | Navigation menu order |
| The app's identity (name, icon) | Page layout arrangement for phone width |
| Lightning pages themselves | What fits in the bottom tab bar |

## The mobile nav menu and bottom tab bar

![The Salesforce mobile app's Menu screen, with an Edit Navigation reorder screen alongside it.](/courses/salesforce-platform-app-builder/ch02/12-mobile-and-the-salesforce-mobile-app/mobile-nav-menu-reorder.png)

Tap **Menu** on a phone and every item the app exposes is listed.
Critically, the **first four items** in that list also appear in the
**bottom tab bar** — the row that's always on screen. The order set
here directly decides what's reachable with a thumb, without ever
opening the menu.

## Still the same app

![The mobile navigation menu for the Sales app, with an arrow pointing to the app name.](/courses/salesforce-platform-app-builder/ch02/12-mobile-and-the-salesforce-mobile-app/mobile-nav-menu-annotated.png)

This is the identical custom app built back in Lesson 2 — same name,
same icon, same underlying tabs. Nothing about the app's identity
changes moving from desktop to mobile; only the arrangement does.

## Admin control over mobile order specifically

![The app Activation dialog's Mobile Navigation tab, showing a separate mobile-only menu order.](/courses/salesforce-platform-app-builder/ch02/12-mobile-and-the-salesforce-mobile-app/mobile-navigation-activation.png)

Back in the app's **Activation** dialog, a dedicated **Mobile
Navigation** tab lets you set the mobile menu order completely
independently of the desktop nav bar. A tab that's third in the
desktop nav bar could be first on mobile — this is an explicit,
admin-controlled choice, never automatic.

## Chapter 2 complete

| Lesson | Topic |
|---|---|
| 7 | Page layouts and compact layouts |
| 8 | Lightning App Builder |
| 9 | Dynamic Forms |
| 10 | Actions and quick actions |
| 11 | Lightning components |
| 12 | Mobile |

Chapter 3 moves from interface to behavior: validation rules, formula
fields, and the automation tools that make an app actually enforce
and act on business logic.

## Key terms

| Term | Meaning |
|---|---|
| Mobile navigation menu | The full list of items an app exposes, reached by tapping Menu |
| Bottom tab bar | The always-visible row showing the first 4 items from the nav menu |
| Mobile Navigation tab | The Activation dialog setting controlling mobile menu order specifically |

## Check yourself

A manager wants Dashboards to be one tap away on mobile, but doesn't
care where it sits in the desktop nav bar. Where exactly do you make
that change, and why won't editing the desktop order alone do it?
