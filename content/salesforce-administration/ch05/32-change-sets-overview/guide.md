# Lesson 32 — Change Sets Overview

**Chapter 5 · Administration in Practice · Lesson 32 of 36**

## What you'll learn

- Why two orgs need a deployment connection before a change set can move
- How Outbound and Inbound change sets relate to each other
- What components and dependencies actually are
- How Apex test levels factor into deploying a change set

## Why this matters

Building a new field or a Flow in a sandbox (Lesson 31) only solves half the
problem — eventually that work has to reach production, where real users
can actually use it. **Change Sets** are Salesforce's built-in, declarative
way to package up configuration and move it between two connected orgs,
without writing a line of deployment code.

## Step 1 — Connect the orgs

A change set can only travel between orgs that have explicitly authorized
each other. That's configured on the **Deployment Connections** page in
each org:

![The 'Deployment Connection Detail' page showing Name 'Andrew,' Type 'Developer,' and two checkboxes under 'Upload Authorization Direction': 'Allow Inbound Changes' and 'Accept Outbound Changes.'](/courses/salesforce-administration/ch05/32-change-sets-overview/deployment-connection-settings.png)
*Both sides of the relationship have to opt in — the target org allows inbound changes, and the source org accepts sending outbound ones.*
Source: [Salesforce Ben — Everything You Need to Know About Salesforce Change Sets](https://www.salesforceben.com/everything-you-need-to-know-about-salesforce-change-sets/)

This connection is typically set up once, between a sandbox and production
(or between sandboxes in a multi-stage release process), and then reused
for every change set that follows.

## Step 2 — Create an Outbound Change Set

In the **source** org (the sandbox where the work was built), create a new
Outbound Change Set:

![The 'New Change Set' form, showing just a Name field and a Description textarea, with Save and Cancel buttons.](/courses/salesforce-administration/ch05/32-change-sets-overview/new-change-set.png)
*A fresh change set starts empty — naming it clearly matters, since a target org admin will see this name when deciding whether to deploy it.*
Source: [Salesforce Ben — Everything You Need to Know About Salesforce Change Sets](https://www.salesforceben.com/everything-you-need-to-know-about-salesforce-change-sets/)

## Step 3 — Add components

A change set is useless until it actually contains something:

![The 'Change Set Components' section, showing 'This change set contains no components' with Add and View/Add Dependencies buttons, plus a 'Profile Settings For Included Components' section below it.](/courses/salesforce-administration/ch05/32-change-sets-overview/change-set-components.png)
*View/Add Dependencies is the single most important button on this page — skip it, and a deployment can fail on a missing field or record type nobody remembered to include.*
Source: [Salesforce Ben — Everything You Need to Know About Salesforce Change Sets](https://www.salesforceben.com/everything-you-need-to-know-about-salesforce-change-sets/)

Components are individual pieces of metadata — a custom field, a Flow, a
page layout, a profile, a report type — added one type at a time. Profile
settings for the components in the change set can be included separately,
so field-level security and layout assignments travel along with the
change.

## Step 4 — Upload

Once the components are added, the change set is **uploaded** to the
connected target org. This requires the org alias/connection from Step 1
to already exist — if it doesn't show up as an option, the Deployment
Connection wasn't configured correctly.

## Step 5 — Deploy (on the inbound side)

In the target org, the uploaded change set appears under **Inbound Change
Sets**. Deploying it (after optionally validating it first) requires
choosing which Apex tests to run:

![The 'Deploy Change Set' page with 'Choose a Test Option': Default, Run local tests, Run all tests, and Run specified tests, each with an explanation of what it runs and the 75% code coverage requirement.](/courses/salesforce-administration/ch05/32-change-sets-overview/deploy-change-set-test-options.png)
*Production deployments that include Apex classes or triggers require at least 75% code coverage from whichever test level you choose — this isn't optional if the change set contains Apex.*
Source: [Salesforce Ben — Everything You Need to Know About Salesforce Change Sets](https://www.salesforceben.com/everything-you-need-to-know-about-salesforce-change-sets/)

| Test option | What runs |
|---|---|
| Default | No tests in a sandbox; all local tests in production (if the change set includes Apex) |
| Run local tests | All tests in the org except those from managed packages |
| Run all tests | Every test, including managed package tests |
| Run specified tests | Only the test classes you name |

## The outbound/inbound relationship

| Side | What it's called | What happens there |
|---|---|---|
| Source org (e.g., a sandbox) | Outbound Change Set | Built: components added, then uploaded |
| Target org (e.g., production) | Inbound Change Set | Received: validated and/or deployed |

The same change set is "outbound" from where it started and "inbound"
where it lands — it's one package, viewed from two sides of the
connection.

## Key terms

| Term | Meaning |
|---|---|
| Deployment Connection | The authorized link between two orgs that allows change sets to move |
| Outbound Change Set | A change set as seen/built in the source org |
| Inbound Change Set | The same change set as seen/deployed in the target org |
| Component | A single piece of metadata (field, Flow, layout, etc.) added to a change set |
| Validate | Running a deployment's checks (including tests) without actually deploying |

## Check yourself

- What has to happen before any change set can move between two orgs at all?
- Why is View/Add Dependencies worth clicking every time you add a component?
- What test level would you pick for a change set with no Apex components at all?
