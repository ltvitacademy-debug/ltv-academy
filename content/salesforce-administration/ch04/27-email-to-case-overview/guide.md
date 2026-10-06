# Lesson 27 — Email-to-Case Overview

**Chapter 4 · Communication and Support Features · Lesson 27 of 36**

## What you'll learn

- What Email-to-Case does and why support teams rely on it
- How to enable it on the Email-to-Case Settings page
- How a routing address connects a real inbox to Salesforce
- The difference between On-Demand Service and the legacy Email-to-Case Agent

## Why this matters

Before Email-to-Case, a support rep had to open a shared mailbox, read each
message, and manually create a case with the right fields filled in. Every
delay between a customer's email arriving and a case existing is a delay the
customer feels. Email-to-Case closes that gap: a message lands in the inbox
and a case exists in Salesforce — usually within a couple of minutes — with
no human in the loop yet.

## Step 1 — Turn on Email-to-Case

From Setup, search for **Email-to-Case** and open **Email-to-Case Settings**.
Click Edit and configure the core options:

![The Email-to-Case Settings page with Enable Email-to-Case checked, Set Case Source to Email checked, Insert Thread ID options checked, and Enable On-Demand Service checked under On-Demand Service.](/courses/salesforce-administration/ch04/27-email-to-case-overview/email-to-case-settings-page.png)
*This page is a one-way door on the core toggle — once Email-to-Case is enabled you can change settings, but you can't disable it.*
Source: [Apex Hours — Email-to-Case in Salesforce](https://www.apexhours.com/email-to-case-in-salesforce/)

Key settings on this page:

| Setting | What it does |
|---|---|
| Enable Email-to-Case | Turns the feature on org-wide (cannot be undone later) |
| Set Case Source to Email | Populates the Case Origin field with "Email" so you can report on it |
| Insert Thread ID in Subject / Body | Lets Salesforce match a customer's reply back to the right existing case |
| Enable On-Demand Service | Lets Salesforce receive inbound mail directly, instead of requiring an on-premise agent |

## Step 2 — Add a routing address

A **routing address** is the bridge between a real email address your
customers already use and Salesforce. Every org starts with none configured:

![The Routing Addresses section on the Email-to-Case Settings page, showing a New button and 'No email addresses defined.'](/courses/salesforce-administration/ch04/27-email-to-case-overview/routing-addresses-new-button.png)
*Nothing happens until at least one routing address exists — this is where that first one gets created.*
Source: [Apex Hours — Email-to-Case in Salesforce](https://www.apexhours.com/email-to-case-in-salesforce/)

## Step 3 — Configure the routing address

Clicking New opens the Email-to-Case Routing Address form:

![The Email-to-Case Routing Address form, with fields for Routing Name, Email Address, and Case Settings (Case Owner, Case Priority, Case Origin).](/courses/salesforce-administration/ch04/27-email-to-case-overview/routing-address-form.png)
*Case Owner, Priority, and Origin here become the defaults for every case this routing address creates — adjust them later with assignment rules if different queues need different handling.*
Source: [Apex Hours — Email-to-Case in Salesforce](https://www.apexhours.com/email-to-case-in-salesforce/)

- **Routing Name** — an internal label (e.g., `support_general`)
- **Email Address** — the real inbox your customers already email (e.g.,
  `support@yourcompany.com`)
- **Case Owner / Priority / Origin** — defaults applied to every case this
  address creates

## Step 4 — Forward mail to the generated address

Saving the routing address triggers the actual mechanism:

![The Email Address Detail page showing a Salesforce-generated Email Services Address ending in .case.salesforce.com, with instructions to forward messages from the real address to it.](/courses/salesforce-administration/ch04/27-email-to-case-overview/email-services-address-generated.png)
*The long, unguessable @*.case.salesforce.com address is what actually receives mail — your real support address just needs to forward to it.*
Source: [Apex Hours — Email-to-Case in Salesforce](https://www.apexhours.com/email-to-case-in-salesforce/)

Salesforce generates a unique, unguessable address under
`*.case.salesforce.com`. Configure your real email system (Outlook, Gmail,
whatever runs `support@yourcompany.com`) to **forward** every message to that
generated address. Salesforce receives the forwarded mail and creates — or,
if the Thread ID matches an open case, updates — a case automatically.

## On-Demand Service vs. the Email-to-Case Agent

Salesforce has offered two delivery mechanisms over the years:

- **On-Demand Service** (current standard) — Salesforce receives inbound
  email directly over the internet. No software to install or maintain.
  This is what nearly every org uses today, and what Step 1 enables.
- **Email-to-Case Agent** (legacy, on-premise) — a piece of software an org
  installs on its own server that polls a mailbox and pushes messages into
  Salesforce. Still supported for orgs with specific infrastructure
  requirements, but it's extra infrastructure to maintain for no real
  benefit in most cases.

## What becomes what

| Inbound email | Becomes |
|---|---|
| Subject line | Case Subject |
| Body | Case Description |
| Sender's address | Looked up against Contacts (creates a case either way, contact-matched if found) |
| Attachments | Attached to the case (as files, if that setting is enabled) |
| Thread ID in subject/body | Matches the reply to an existing open case instead of creating a new one |

## Key terms

| Term | Meaning |
|---|---|
| Routing address | The link between a real inbox and a Salesforce email-services address |
| Email services address | The generated `*.case.salesforce.com` address Salesforce actually receives mail at |
| On-Demand Service | Modern delivery method — Salesforce receives mail with no local software |
| Thread ID | A token in the subject/body that matches a reply back to its original case |

## Check yourself

- What has to happen in your real email system after you create a routing address?
- Why might an org still disable Case Source = Email reporting but keep Email-to-Case on?
- What's the practical difference between On-Demand Service and the legacy Agent?
