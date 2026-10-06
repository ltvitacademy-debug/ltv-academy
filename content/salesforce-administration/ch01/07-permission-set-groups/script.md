# Lesson 7 — Permission Set Groups · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Permission sets solve the one-off problem. But what about a whole job function that needs five or six permission sets at once, for every single hire? Assigning six things by hand, every time, to every new rep, is exactly the kind of repetitive work Permission Set Groups exist to eliminate.

## S2 · IMAGE: permission-set-groups-list.jpg (Permission Set Groups list, Lightning)

Here's the Permission Set Groups list in Setup. This org has one group, Price Surveys, bundling multiple permission sets under a single label. Notice the Status column says Outdated — that's not an error, it just means one of the permission sets inside this group changed since Salesforce last recalculated the group's combined access, and it needs a refresh.

## S3 · STEPS CARD (Bundle / Assign once / Mute / Reuse)

Four reasons groups exist. They bundle several permission sets into one unit. They let you assign that whole bundle in a single action instead of six separate ones. They support muting — dialing back one specific permission from one specific set inside the group, without touching the set itself anywhere else it's used. And they're built for reuse — assign the same group to every new hire in a role, instead of reconstructing their access from scratch.

## S4 · IMAGE: object-manager-access-tabs.jpg (Object Access, Permission Set Groups tab)

And just like permission sets, you can see this from the object's side. The same Object Access page carries a Permission Set Groups tab — this Account object is touched by three different groups, each with its own Read, Create, Edit, and Delete grants, visible at a glance.

## S5 · IMAGE: setup-admin-nav.png (Setup nav, Permission Set Groups item)

Creating a group takes the same path as a permission set: Setup, Quick Find Permission Set Groups, New Permission Set Group. Name it, add the permission sets that belong inside it, and assign the whole bundle to users exactly the way you'd assign a single permission set.

## S6 · OUTRO CARD

Profile for the baseline, permission sets for individual extras, permission set groups for bundling those extras at scale. That's the whole access-granting toolkit. Next lesson, we shift from what users can do to when and where they're allowed to log in at all.
