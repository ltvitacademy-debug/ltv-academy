# Lesson 4 — Licenses and License Types · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

We've mentioned License twice now without really explaining it. Time to fix that. License is the first access decision Salesforce forces you to make for every user, and it quietly limits everything that comes after it.

## S2 · IMAGE: new-user-form-full.png (New User form, annotated)

Look at the New User form again: User License sits directly above Profile. That ordering isn't cosmetic. Salesforce makes you pick a license first because the license determines which profiles even show up in that Profile dropdown. Pick the wrong license, and the profile you actually wanted simply won't be an option.

## S3 · STEPS CARD (Features / Profiles / Seats)

Strip licensing down to three things. It controls which features are unlockable for this user at all — a feature a license doesn't include can't be turned on by any profile or permission set. It controls which profiles they can be assigned. And it's a finite, purchased count — your org buys a set number of each license type, and every active user consumes one seat.

## S4 · IMAGE: new-user-form-clean.jpg (New User form, License = Chatter Free)

Here's a real example. This user's License is set to Chatter Free — a free, limited license meant for people who only need Chatter, not full CRM access. Notice the Profile field is still empty. Chatter Free doesn't unlock the standard Salesforce profiles at all — only a small set of Chatter-specific ones.

## S5 · IMAGE: permission-set-overview.webp (Permission Set Overview, License field)

And licensing doesn't stop at the user record. Permission sets carry their own License field too. This one requires a Salesforce license — meaning a Chatter Free user could never be assigned it, no matter how the permission set itself is configured. License is the gate everything else has to pass through first.

## S6 · OUTRO CARD

License decides what's possible before Profile ever decides what's granted. Next lesson, we open Profile itself — the one permission container every single user is required to have exactly one of.
