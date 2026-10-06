# Lesson 6 — Permission Sets · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

A profile is one baseline, shared by every user who holds it. But real teams aren't that uniform — one salesperson might need an extra object the rest of the team doesn't. Cloning a whole new profile for one person is overkill. That's exactly the problem Permission Sets solve.

## S2 · IMAGE: permission-set-overview.webp (Permission Set Overview page)

A permission set looks almost identical to a profile on the inside — Apps, Object Settings, App Permissions, Apex Class Access, System Permissions, all the same categories. The difference isn't what it can grant, it's how it's used: a permission set is extra access, layered on top of a profile, assigned to exactly the users who need it.

## S3 · STEPS CARD (Grant only / Stackable / Reusable / No sprawl)

Four reasons admins reach for permission sets instead of cloning another profile. They can only grant, never remove access — so they're safe to layer without accidentally locking someone out. They're stackable — one user can hold any number of them at once. They're reusable — the same permission set can be assigned to users on completely different profiles. And they prevent profile sprawl — instead of twenty near-identical custom profiles, you get one shared profile and a handful of targeted permission sets.

## S4 · IMAGE: object-manager-access-tabs.jpg (Object Manager, Permission Sets tab)

You can also see this relationship from the object's side. Open any object in Object Manager, click Object Access, and the Permission Sets tab lists every permission set in the org that touches this object, and exactly what it grants — Read, Create, Edit, Delete, View All, Modify All.

## S5 · IMAGE: setup-admin-nav.png (Setup nav, Permission Sets item)

Creating one is simple: Setup, Quick Find Permission Sets, New. Give it a label, optionally tie it to a specific license, and you're editing the same Apps and Object Settings screens you saw on the profile. Assign it to a user from their own User page, and the access applies immediately — no profile clone required.

## S6 · OUTRO CARD

Profile sets the floor, permission sets add exactly the extra a person needs. Next lesson, Permission Set Groups — for when you need to hand out several permission sets at once as a single bundle.
