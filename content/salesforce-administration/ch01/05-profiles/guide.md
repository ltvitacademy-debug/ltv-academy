# Lesson 5 — Profiles

**Chapter 1 · Users and Access · Lesson 5 of 36**

## What you'll learn

- What a profile is, and why every user must have exactly one
- The four categories of access a profile controls
- Why standard profiles can't be edited — and how cloning solves that
- Where Profile fits next to Permission Sets and Permission Set Groups

## The Profiles list

From Setup, Quick Find **Profiles**:

![The Salesforce User Profiles list page, showing a table of profiles with Action, Profile Name, and User License columns, with a callout explaining that custom profiles can be edited but standard ones cannot.](/courses/salesforce-administration/ch01/05-profiles/user-profiles-list.jpg)
*Every profile in the org. Standard profiles (Standard User, System Administrator, and others Salesforce ships by default) sit alongside any custom profiles your org has built.*

A **profile** is the single mandatory permission container every user has — exactly one, no more, no fewer. It's the baseline that every other access tool in this chapter (permission sets, permission set groups) builds on top of.

## What a profile actually controls

| Category | Examples |
|---|---|
| **Object permissions** | Create, Read, Edit, Delete, View All, Modify All — per object |
| **Field-level security** | Which individual fields are visible or editable |
| **App visibility** | Which apps appear in this user's App Launcher |
| **System permissions** | Org-wide abilities like "View Setup and Configuration" or "Run Reports" |

Profiles also carry settings covered in later lessons of this chapter — **Login Hours** and **Login IP Ranges** (Lesson 8) and profile-level **Session Settings** overrides (Lesson 9) all live inside a profile record too.

## You can't edit a standard profile — clone it instead

Standard profiles are locked by Salesforce; you can view their settings but not change them. To build a customized profile, **clone** an existing one:

![The Salesforce Classic Clone Profile page, with fields for Existing Profile, User License, and Profile Name, and Save/Cancel buttons.](/courses/salesforce-administration/ch01/05-profiles/clone-profile.png)
*Clone Profile: pick a starting profile, name the copy, and the new profile is fully editable with the original's settings as its baseline.*

This clone-then-edit pattern is how virtually every custom profile in a real org comes into existence — nobody builds a profile's permissions from a blank slate.

## Profile's place in the access-control toolkit

Profile doesn't sit alone — it's grouped with the rest of this chapter's tools under Setup's Administration section:

![The Salesforce Setup navigation sidebar with Administration expanded, showing Permission Set Groups, Permission Sets, Profiles, Public Groups, Queues, Roles, and Users, with Profiles as the active page.](/courses/salesforce-administration/ch01/05-profiles/profiles-nav.png)
*Profiles sits beside Permission Sets and Permission Set Groups — the next two lessons in this chapter cover exactly how those add to what a profile already grants.*

The relationship to remember: a user has **one** profile, which sets the baseline, and can hold **any number** of permission sets and permission set groups on top of it, which only ever add access — never take it away.

## Key terms

| Term | Meaning |
|---|---|
| Profile | The single mandatory permission container every user has exactly one of |
| Standard profile | A Salesforce-provided profile that can be viewed but not edited |
| Custom profile | A cloned, editable profile built for your org's specific needs |
| Object permissions | Create/Read/Edit/Delete-level access to a given object, set by profile |
| Field-level security | Per-field visibility and edit access, set by profile |

## Check yourself

Without looking back: name the four categories of access a profile controls, and explain why you clone a profile instead of editing it directly.
