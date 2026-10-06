# Lesson 28 — Chatter and Collaboration

**Chapter 4 · Communication and Support Features · Lesson 28 of 36**

## What you'll learn

- The three Chatter post types, and where a post can be aimed
- How Chatter Groups scope collaboration (public, private, unlisted)
- What Feed Tracking does and why admins configure it
- Which pieces of Chatter are an admin's job vs. a user's habit

## Why this matters

Email is for communicating with people outside the org, or sending something
formal. Most day-to-day coordination — "why did this opportunity's amount
change," "can someone review this case before I close it," "here's an update
for the team" — happens faster as a quick post than a separate email thread.
Chatter is Salesforce's built-in answer to that: a record, a group, or a
person can all be followed, posted to, and discussed without leaving the
platform.

## The Chatter publisher

Every Chatter feed starts with the publisher — three tabs for three kinds of
post:

![The Chatter publisher with Post, Poll, and Question tabs, a message reading 'Hi everyone!', formatting controls, a 'To: My Followers' selector, and a Share button. An Einstein Recommendations panel on the right suggests people to follow.](/courses/salesforce-administration/ch04/28-chatter-and-collaboration/chatter-publisher-compose-post.png)
*Post, Poll, or Question — and typing "/" lets you link a specific record directly into the post.*
Source: [Salesforce Ben — Ultimate Guide to Salesforce Chatter](https://www.salesforceben.com/salesforce-chatter/)

| Post type | Use |
|---|---|
| Post | A plain update — text, an image, a link, a record reference |
| Poll | A quick multiple-choice vote with live results |
| Question | A post other users can answer, and the best answer can be marked |

A post can go to **My Followers**, a specific **group**, or directly onto a
**record's** own feed.

## Engaging with a post

Once shared, a post works like any familiar social feed:

![A Chatter post from 'Ava Admin' reading 'Hi everyone!', with Liked, Comment, and Share actions below it, and a comment box underneath.](/courses/salesforce-administration/ch04/28-chatter-and-collaboration/chatter-post-like-comment-share.png)
*Like, Comment, and Share need no training — they work the way every other social feed does.*
Source: [Salesforce Ben — Ultimate Guide to Salesforce Chatter](https://www.salesforceben.com/salesforce-chatter/)

## Chatter Groups

A **Group** scopes collaboration around a topic, a team, or a project. Each
group gets its own feed, member list, and related files/records:

![A Chatter Group page named 'Salesforce Support,' showing its own Post/Poll/Question publisher, a feed with posts and a poll, Group Details, a Members list, and a Files section.](/courses/salesforce-administration/ch04/28-chatter-and-collaboration/chatter-group-page.png)
*Everything scoped to the group lives on one page — feed, members, files, and even related records.*
Source: [Salesforce Ben — Ultimate Guide to Salesforce Chatter](https://www.salesforceben.com/salesforce-chatter/)

Group visibility comes in three flavors:

| Group type | Who sees it |
|---|---|
| Public | Anyone in the org can find it, view it, and join |
| Private | Visible in search, but joining requires an invitation or request approval |
| Unlisted | Hidden from search entirely — owner/manager must add members directly |

## Feed Tracking — the admin's real lever

The feature an admin actually configures is **Feed Tracking**: which
objects, and which fields on those objects, automatically post a change to
the record's feed.

![An Opportunity record's Chatter tab, showing two auto-generated feed posts from feed tracking: 'Amount £120,000.00 to £240,000.00' and 'Close Date 19/03/2021 to 28/05/2021,' both labeled 'Updates from feed tracking.'](/courses/salesforce-administration/ch04/28-chatter-and-collaboration/chatter-feed-tracking-on-record.png)
*Anyone following this Opportunity sees these changes without opening Field History — the feed does the surfacing automatically.*
Source: [Salesforce Ben — Ultimate Guide to Salesforce Chatter](https://www.salesforceben.com/salesforce-chatter/)

From Setup, under **Feed Tracking** (per object, in Object Manager), an
admin picks up to 20 fields per object to track. Every change to a tracked
field generates an automatic feed post — no user action required. This is
different from, and a lighter-weight companion to, Field History Tracking
(covered back in Chapter 3), which keeps a permanent audit record rather
than a social post.

## What's actually an admin's job

| Setting | Where | What it controls |
|---|---|---|
| Chatter Settings | Setup → Chatter Settings | Turns Chatter features on/off org-wide (on by default) |
| Feed Tracking | Object Manager → [Object] → Feed Tracking | Which fields auto-post changes to the feed |
| Group creation/visibility | Groups tab (user-created, admin can manage) | Public/Private/Unlisted, broadcast-only options |
| Publisher actions | Page Layout → Chatter publisher actions | Which actions (Post, Poll, Question, custom Quick Actions) appear |

Most of Chatter's day-to-day use — posting, following, joining groups — is a
user habit, not an admin configuration. The admin's job is making sure the
right fields are tracked, the right actions are available, and groups are
set up with sensible visibility.

## Key terms

| Term | Meaning |
|---|---|
| Feed | The chronological stream of posts on a record, group, or user |
| Follow | Subscribing to a record's or person's feed so their activity shows in yours |
| Feed Tracking | Admin setting that auto-posts tracked field changes to a record's feed |
| Group | A scoped space (public/private/unlisted) for team or topic collaboration |

## Check yourself

- What's the difference between a Public, Private, and Unlisted group?
- Where does an admin turn on automatic feed posts for field changes?
- How is Feed Tracking different from Field History Tracking?
