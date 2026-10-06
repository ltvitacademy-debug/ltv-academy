# Lesson 5 — Profiles · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Every user needs exactly one of these, and it's the single biggest lever an admin has over what someone can do in Salesforce. This lesson is entirely about Profile.

## S2 · IMAGE: user-profiles-list.jpg (User Profiles list, annotated)

From Setup, Quick Find "Profiles", and here's every profile in the org — the standard ones Salesforce ships with, like Standard User and System Administrator, plus any custom ones your org has built. One important rule shows up immediately: standard profiles can't be edited directly. You can view them, but not change them.

## S3 · STEPS CARD (Objects / Fields / Apps / System)

So what does a profile actually control? Four categories. Object permissions — can this person create, read, edit, or delete records of a given type. Field-level security — which individual fields they can see or edit. App visibility — which apps show up in their app launcher. And system permissions — org-wide abilities like viewing setup or running reports on all data.

## S4 · IMAGE: clone-profile.png (Clone Profile page)

Since you can't edit a standard profile, how do you customize one? You clone it. Pick an existing profile as your starting point, give the copy a new name, and now you have a fully editable profile with all the original's settings as your baseline. This is the standard pattern for every custom profile your org will ever have.

## S5 · IMAGE: profiles-nav.png (Profiles page + Administration nav)

And Profile doesn't live alone in Setup — it sits right beside Permission Sets and Permission Set Groups, the next two tools in this chapter. All three answer the same underlying question — what can this user do — just at different levels of granularity.

## S6 · OUTRO CARD

One mandatory profile, cloned when you need to customize it, covering objects, fields, apps, and system permissions. Next lesson, we add Permission Sets — the tool that lets you grant extra access without touching the profile at all.
