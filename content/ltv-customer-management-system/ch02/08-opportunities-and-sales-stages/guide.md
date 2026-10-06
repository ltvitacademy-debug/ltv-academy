# Lesson 8 — Opportunities and Sales Stages

**Chapter 2 · Build: Data and Objects · Lesson 8 of 20**

## What you'll learn

- How to configure Cascade's five Opportunity stages, with the correct
  probability and forecast category for each
- How to add the custom Opportunity fields Cascade needs
- How to set up a Price Book and Products so an Opportunity can carry a
  real equipment package
- How Opportunity connects everything built so far — Lead conversion from
  Lesson 7, and Installation Project in Lesson 9

## Step 1 — Configuring the Stage picklist

In **Setup → Object Manager → Opportunity → Fields & Relationships →
Stage**, replace the default stage values with Cascade's five, each with
a probability and forecast category that reflects how likely a deal at
that stage really is to close:

| Stage | Probability | Forecast Category |
|---|---|---|
| Qualifying | 10% | Pipeline |
| Needs Analysis | 25% | Pipeline |
| Equipment Proposal | 50% | Best Case |
| Negotiation/Review | 75% | Best Case |
| Closed Won | 100% | Closed |
| Closed Lost | 0% | Omitted |

Closed Won and Closed Lost are marked as **Closed** stages in the stage
configuration — this is what lets Salesforce treat them differently in
reports and what triggers the Installation Project automation you'll
build in Chapter 3.

## Step 2 — A Loss Reason field

Cascade needs to know *why* deals are lost, not just that they were.
Create **Loss Reason** (`Loss_Reason__c`) as a picklist (Price / Chose a
Competitor / No Budget / Timing / Project Cancelled), required only when
Stage = Closed Lost. (The validation rule enforcing "required only when
Closed Lost" gets built in Chapter 3 — for now, just create the field.)

## Step 3 — Opportunity custom fields

| Field label (API name) | Type | Purpose |
|---|---|---|
| Loss Reason (`Loss_Reason__c`) | Picklist | Why a Closed Lost deal didn't close |
| Target Install Quarter (`Target_Install_Quarter__c`) | Picklist (Q1–Q4) | When the customer wants equipment running — feeds Installation Project scheduling |
| Competing Vendor (`Competing_Vendor__c`) | Text | What else the customer is evaluating, when known |

## Step 4 — Price Book and Products

Opportunities carry specific equipment, not just a dollar amount. Under
**Setup → Products**, create a representative slice of Cascade's catalog:

| Product Name | Product Family |
|---|---|
| 6-Burner Commercial Range | Cooking Equipment |
| Walk-In Cooler, 8x10 | Refrigeration |
| Conveyor Dishwasher | Dishwashing |
| Type I Ventilation Hood | Ventilation |

Add each to the **Standard Price Book** with a list price, then on an
Opportunity use **Add Products** to attach line items — this is what
makes a deal an actual "equipment package" instead of a single number,
and it's what the Opportunity Product object from Lesson 3 is for.

## Step 5 — Reading an Opportunity end to end

Walk through one example: a Lead converts (Lesson 7) into a new
Opportunity, owned by Tom Baptiste, in the **Qualifying** stage. Tom adds
two products — a 6-Burner Commercial Range and a Type I Ventilation Hood
— moves it to **Needs Analysis** after a site visit, sends a written
quote and moves it to **Equipment Proposal**, and after the customer
negotiates pricing, moves it to **Negotiation/Review**. When the customer
signs, Tom sets Stage to **Closed Won** — which is the trigger Chapter 3's
Flow uses to automatically create an Installation Project.

## Key terms

| Term | Meaning |
|---|---|
| Forecast Category | How Salesforce buckets an open Opportunity for sales forecasting (Pipeline, Best Case, Closed) |
| Price Book | The catalog of products and their standard prices available to attach to Opportunities |
| Opportunity Product (Line Item) | A specific product, quantity, and price attached to one Opportunity |

## Lab

Create one test Opportunity in each of Cascade's five open/closed stage
groups (you can advance the same record through all five, or create
five), attach at least one product to each, and confirm the Probability
and Forecast Category auto-populate correctly from the Stage you set.

## Check yourself

- Why are Closed Won and Closed Lost each marked as "Closed" stages in
  the stage configuration, and what does that unlock later?
- What does the Target Install Quarter field feed into?
- Why does an Opportunity need Products attached instead of just an
  Amount field?
