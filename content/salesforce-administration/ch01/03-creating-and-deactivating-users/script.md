# Lesson 3 — Creating and Deactivating Users · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

We know what a user record is made of. Now let's actually build one — and just as important, learn how to turn one off correctly when someone leaves. Both sides of this lifecycle matter just as much for a Salesforce admin.

## S2 · IMAGE: new-user-form-full.png (full New User form, annotated)

This is the New User form in full. Identity fields on the left — first name, last name, email, username. The three fields that actually decide what this person can do sit on the right: Role, User License, and Profile. Fill in the required fields, check the box at the bottom to generate a password and notify the user immediately, and click Save.

## S3 · STEPS CARD (Username / License / Profile / Active)

Four things to get right. Username has to be unique across every Salesforce org on earth, not just yours — it's formatted like an email address but doesn't have to be a real one. Pick License before Profile, because the license you choose determines which profiles are even available in that dropdown. And notice Active is checked by default — every new user starts turned on.

## S4 · IMAGE: user-edit-deactivate.jpg (Active checkbox cleared)

When someone leaves, you don't delete their user record — you can't, actually, Salesforce won't let you. You deactivate it. Open the user, click Edit, clear the Active checkbox, and save. Their record, their history, every report and object they ever touched stays intact. They simply can't log in anymore.

## S5 · IMAGE: user-detail-freeze.jpg (Freeze button highlighted)

Sometimes Salesforce won't let you deactivate immediately — maybe this user is still referenced in a custom hierarchy field somewhere. For exactly that situation, there's Freeze. One click on the user's detail page blocks their login instantly, buying you time to clean up the dependency before deactivating for good.

## S6 · OUTRO CARD

Build with New User, retire with deactivation, and keep Freeze in your back pocket for emergencies. Next lesson, we slow down on one of those fields from the New User form — License — and look at what it actually controls.
