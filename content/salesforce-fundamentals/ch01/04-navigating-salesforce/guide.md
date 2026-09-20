# Navigating Salesforce

Before any of this course's data-model theory is useful, you need to be able to find your way
around the actual interface. Every screenshot and instruction below is the real Salesforce
Lightning Experience UI — the interface almost every modern Salesforce org runs today, and the
one you'll actually click through as an analyst.

## What you'll learn

- What the App Launcher is and how it switches you between apps
- How the navigation bar's tabs work, and what "list views" are
- How to use Salesforce's global search bar effectively

## The App Launcher: switching between apps

The **App Launcher** is the grid icon in the top-left of every Lightning Experience screen. Click
it and you get the full "App Launcher" screen: a grid of every app installed in the org, split
into "All Apps" and "All Items," plus its own search box for jumping straight to an app or object
by name. Remember from Lesson 2 that Sales Cloud and Service Cloud are different apps built on
the same platform — the App Launcher is literally how a user switches between them (and between
any other apps installed from the AppExchange). If you ever land in an org and can't find an
object you know exists, the App Launcher's search box is usually the fastest way to find it.

## The navigation bar: tabs and list views

Once you're inside an app, the **navigation bar** running across the top shows a row of tabs —
Home, Opportunities, Leads, Accounts, Contacts, and more, depending on the app and how it's been
customized. Clicking a tab like "Opportunities" doesn't open one record — it opens a **list
view**, a filtered, sortable table of many Opportunity records at once (for example, "My Open
Opportunities" or "Closed This Quarter"). List views are worth understanding well before you ever
write a query, because they're the same underlying idea: a filtered set of records from one
object, just built through clicks instead of a query language. Tabs with more options collapse
under a "More" dropdown when there isn't room for all of them across the bar.

## The global search bar: finding a specific record fast

At the top of every screen sits the **global search bar** — a single search box that looks across
many objects at once (Accounts, Contacts, Opportunities, Cases, and more) for whatever text you
type. It's the fastest way to jump straight to one specific record, like a particular company or
deal, without navigating through tabs and list views first. Getting comfortable with global
search now will make it second nature later, when you're verifying a specific record's real data
against what a report says about it.

## Key terms

| Term | Meaning |
|---|---|
| App Launcher | Grid icon that opens the screen for switching between installed apps |
| Navigation bar | The row of tabs (Home, Opportunities, Accounts, etc.) inside an app |
| List view | A filtered, sortable table of many records from one object |
| Global search | The search bar that looks across multiple objects for matching records |

## Check yourself

If a colleague says "I can't find the Campaigns tab anywhere on my navigation bar," what are two
real explanations this lesson gives for where it might be instead?
