This closes out chapter two: what actually changes when everything we've built — the app, its pages, its components — runs on the Salesforce mobile app instead of a desktop browser.

The first thing to understand is what doesn't change. Same org, same objects, same records, same security. Lightning pages built in App Builder render on both surfaces from one build — there's no separate mobile app to construct. What does change is navigation and layout, both of which you still control as the App Builder.

Tap Menu on a phone and every item the app exposes is listed out. The first four items in that list also appear in the bottom tab bar, in exactly that order — so the order you set here directly decides what a user's thumb can reach without opening the menu at all.

And here's the important part: this is still the same custom app from Lesson 2. Same name, same icon, same tabs underneath — just arranged differently for a smaller screen. Nothing about the app's identity changes between desktop and mobile.

That menu order isn't automatic or accidental — it's admin-controlled. Back in the app's Activation dialog, a dedicated Mobile Navigation tab lets you set the mobile menu order completely independently of the desktop nav bar.

That's chapter two, complete: page layouts, App Builder, Dynamic Forms, actions, components, and now mobile. Chapter three moves to business logic — validation rules, formulas, and the automation tools that make an app actually do something.
