# Lesson 26 — Email Templates and Letterheads

**Chapter 4 · Communication and Support Features · Lesson 26 of 36**

## What you'll learn

- Where users find Email Templates, and why the Lightning builder needs a permission set
- What a template asks for: Related Entity Type, Folder, and Enhanced Letterhead
- How to get into the drag-and-drop Email Template Builder
- Why letterheads exist — shared branding instead of per-template formatting

## Why this matters

Reports and dashboards aren't the only thing users see every day — email is. A sales
rep sending a renewal notice, a support agent replying to a case, an onboarding
email a Flow fires automatically: all of it should look like it came from the same
company, not whatever font and color the last person who built it happened to pick.
Email Templates and Letterheads are how an admin enforces that consistency without
policing every individual email.

## Finding Email Templates

Email Templates is a standard object — no setup required just to see the list.
Users (and admins) reach it from the App Launcher search box:

![The App Launcher search results for 'template', with Email Templates highlighted in a pink circle under Items.](/courses/salesforce-administration/ch04/26-email-templates-and-letterheads/app-launcher-find-templates.png)
*Email Templates shows up as a standard Item the moment you search for it — nothing to enable just to find the list.*
Source: [Salesforce Ben — Your Guide to Salesforce Lightning Email Templates](https://www.salesforceben.com/your-guide-to-salesforce-lightning-email-templates/)

## Turning on the Lightning builder

The modern drag-and-drop Email Template Builder is not on by default. Without it,
users are stuck with the older, plainer template editor. To turn it on:

1. Create a permission set (for example, "Lightning Email").
2. Go to **System Permissions** inside that permission set.
3. Enable **Access drag-and-drop content builder**.
4. Save, then assign the permission set to the users who should build templates.
5. Give it 15 minutes (or have the user log out and back in) — permission set
   changes don't always show up instantly in Lightning.

![A permission set named 'Lightning Email Builder' on the System Permissions page, with 'Access drag-and-drop content builder' checked.](/courses/salesforce-administration/ch04/26-email-templates-and-letterheads/permission-set-lightning-email-builder.png)
*This single system permission is the difference between the old template editor and the modern builder.*
Source: [Salesforce Ben — Your Guide to Salesforce Lightning Email Templates](https://www.salesforceben.com/your-guide-to-salesforce-lightning-email-templates/)

## Creating a template

A new Email Template asks for more than a subject line:

| Field | What it controls |
|---|---|
| Email Template Name | Internal label admins and users see in lists |
| Related Entity Type | The object merge fields pull from (Contact, Lead, Opportunity, a custom object, or None) |
| Folder | Where the template lives, and who can see or edit it |
| Subject | The email subject line, which can itself contain merge fields |
| Enhanced Letterhead | The shared branding — header, footer, colors, logo — this template wears |

![The New Email Template dialog, with Related Entity Type and Folder fields circled, plus a Subject field and an Enhanced Letterhead search box.](/courses/salesforce-administration/ch04/26-email-templates-and-letterheads/new-email-template-enhanced-letterhead.png)
*Enhanced Letterhead is a search field here — pick an existing letterhead rather than rebuilding the branding from scratch.*
Source: [Salesforce Ben — Your Guide to Salesforce Lightning Email Templates](https://www.salesforceben.com/your-guide-to-salesforce-lightning-email-templates/)

## Into the builder

Save the template, then click **Edit in Builder** from the template detail page:

![The saved Email Template detail page, with the Edit in Builder button circled in the top-right action bar, and the Enhanced Letterhead field visible in Message Content.](/courses/salesforce-administration/ch04/26-email-templates-and-letterheads/template-detail-edit-in-builder.png)
*Edit in Builder only appears once the template is saved and the user has the drag-and-drop permission turned on.*
Source: [Salesforce Ben — Your Guide to Salesforce Lightning Email Templates](https://www.salesforceben.com/your-guide-to-salesforce-lightning-email-templates/)

Inside the builder, standard components (Button, HTML, Image, Rich Text, Row) sit
on the left for dragging onto the canvas. The right-hand panel switches between
**Details** (merge fields, content) and **Style** (background color, margins,
image sizing) for whatever component is selected.

## Letterheads vs. templates

It's easy to blur these two together, so keep the distinction straight:

- A **letterhead** is the reusable shell — logo, header/footer colors, overall
  branding — built once by an admin.
- A **template** is a specific email (a renewal notice, a case-closed message)
  that picks a letterhead and adds its own subject and body content.

Change the letterhead's colors once, and every template wearing it updates —
that's the entire point of separating the two.

## Where templates get used

A finished template isn't only for manually composing an email from a record.
The same template can be the body of an **Email Alert** (fired by a workflow
rule, process, or Flow), attached to an **Approval Process** notification, or
selected manually from the email composer on a record. Building it once in the
letterhead/template structure means every one of those paths looks the same.

## Key terms

| Term | Meaning |
|---|---|
| Email Template | A reusable email body, tied to an object, usable manually or by automation |
| Enhanced Letterhead | The shared header/footer/branding a template applies |
| Email Template Builder | The Lightning drag-and-drop editor for building a template's body |
| Related Entity Type | The object a template's merge fields resolve against |

## Check yourself

- Why doesn't every user automatically see the Edit in Builder button?
- What's the practical difference between a letterhead and a template?
- If marketing changes the company's brand colors, what's the one place you'd update?
