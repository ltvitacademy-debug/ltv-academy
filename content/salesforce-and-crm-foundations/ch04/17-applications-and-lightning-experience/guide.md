# Lesson 17 — Applications and Lightning Experience

**Chapter 4 · Using Salesforce · Lesson 17 of 20**

## What you'll learn

- What a Salesforce "app" actually is (hint: it's simpler than you'd think)
- How the App Launcher lets you switch between apps
- What Lightning Experience is, and how it differs from the older Salesforce Classic interface
- How to read the navigation bar once you understand apps

## What is an "app" in Salesforce?

In everyday software, "app" usually means a separate installed program. In Salesforce, an **app** is something much lighter: a named, curated bundle of tabs (which, as you learned last lesson, point at objects), plus a logo and brand color, built for a particular job function.

A "Sales" app might expose the Home, Opportunities, Leads, Accounts, and Contacts tabs. A "Service" app might expose Home, Cases, Knowledge, and Contacts instead. Both apps can exist in the exact same org at the same time — switching apps doesn't change your data, your permissions, or which org you're in. It just changes which set of tabs is in front of you, tailored to what you're trying to get done.

![Real screenshot of a Lightning Experience "Seller Home" page in the Sales app, with the App Launcher ("waffle") icon in the top-left highlighted by a red arrow.](/courses/salesforce-and-crm-foundations/ch04/17-applications-and-lightning-experience/seller-home-app-launcher-icon.png)
*The Sales app's Home page. Notice the tabs across the top — Home, Opportunities, Leads, Tasks, Files, Accounts, Contacts — and the App Launcher icon (the grid of dots, top-left) used to switch apps entirely.*
Source: [Salesforce Ben — How to Create a Custom App in Salesforce](https://www.salesforceben.com/how-to-create-a-custom-app-in-salesforce/)

## The App Launcher

That small grid-of-dots icon — officially the **App Launcher**, informally called "the waffle" by almost every Salesforce professional — is how users move between apps. Clicking it opens a quick-access panel showing your most relevant apps and a search box.

![Real screenshot of the App Launcher dropdown open, showing a search box and a list of Apps including Service, Marketing CRM Classic, Community, Site.com, Salesforce Chatter, Content, and Sales.](/courses/salesforce-and-crm-foundations/ch04/17-applications-and-lightning-experience/app-launcher-dropdown.png)
*Clicking the App Launcher icon opens this quick panel. Clicking "View All" opens the full App Launcher page.*
Source: [Salesforce Ben — How to Create a Custom App in Salesforce](https://www.salesforceben.com/how-to-create-a-custom-app-in-salesforce/)

For a full view of everything you have access to, you can open the complete App Launcher page, which lists every app you can switch into on the left, and every individual object/tab you have access to ("All Items") on the right — useful when you need an object that isn't in your current app's tab bar at all.

![Real screenshot of the full App Launcher page, showing an "All Apps" grid (Sales, Customer Service, Product Management, Playground Starter) and an "All Items" alphabetical list of every object the user can access.](/courses/salesforce-and-crm-foundations/ch04/17-applications-and-lightning-experience/app-launcher-full-view.png)
*The full App Launcher page. "All Apps" on top, "All Items" below it — every object you have access to, even ones not in your current app.*
Source: [Salesforce Ben — How to Create a Custom App in Salesforce](https://www.salesforceben.com/how-to-create-a-custom-app-in-salesforce/)

## Lightning Experience vs. Salesforce Classic

Everything you've seen so far — this modern, card-based interface — is **Lightning Experience**, the current Salesforce user interface, built on a modern component framework. It replaced **Salesforce Classic**, the older interface, which is still technically available in some orgs (mostly for legacy reasons) but is being steadily phased out, with Salesforce actively encouraging — and in many cases requiring — customers to move fully to Lightning.

As a student starting today, you will do essentially all of your work in Lightning Experience. You'll occasionally hear "Classic" mentioned in older documentation or by long-time users, but you don't need to learn Classic to be an effective Salesforce professional in this course.

## Key terms

| Term | Meaning |
|---|---|
| App | A curated, named bundle of tabs, logo, and color for a specific job function |
| App Launcher | The "waffle" icon used to switch between apps and search for objects/items |
| Lightning Experience | Salesforce's current, modern user interface |
| Salesforce Classic | The older interface, being phased out in favor of Lightning Experience |

## Lab

1. In your org, click the App Launcher and note at least three apps listed.
2. Switch into a different app than the one you started in, and notice which tabs changed.
3. Use the App Launcher's search box to find an object that isn't visible in your current app's tab bar.

## Check yourself

You're ready for Lesson 18 when you can explain what an "app" is in Salesforce terms (not the everyday meaning), and you can open the App Launcher and switch apps without hesitating.
