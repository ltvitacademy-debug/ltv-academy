# Lesson 2 — Reviewing the Fictional Company

**Chapter 1 · Design · Lesson 2 of 20**

## What you'll learn

- The one fictional company this entire capstone follows — **Cascade
  Foodservice Equipment Co.** — and why it's illustrative, not a real
  business
- Its industry, size, locations, and departments
- Its sales process, stage by stage
- The named people you'll see again and again through Lesson 20
- The business situations that drive the custom objects, security rules,
  and automation you'll build in later chapters

**A note before we start, repeated throughout this capstone:** everything
below about "Cascade Foodservice Equipment Co." is a fictional,
illustrative company invented for this capstone. It is not a real
business, it is not based on any real company, and no number below is a
real industry statistic — it's just enough invented detail to make a
single Salesforce org concrete and consistent for eighteen more lessons.

## The company

**Cascade Foodservice Equipment Co.** ("Cascade") designs, sources, and
sells commercial kitchen equipment — ranges, convection ovens, walk-in
coolers and freezers, dishwashing systems, and ventilation hoods — to
businesses that run commercial kitchens. It is **not** a consumer
retailer; every deal is B2B, and every deal involves a sales rep working
a named account over weeks or months, which is exactly the kind of
Account/Contact/Lead/Opportunity complexity this capstone needs.

- **Headquarters:** Portland, Oregon
- **Regional sales offices:** Denver, Colorado and Columbus, Ohio
- **Size:** roughly 240 employees
- **Customers:** independent restaurants and small restaurant groups,
  hotel and hospitality chains, healthcare and institutional kitchens
  (hospitals, senior living), school districts, and catering companies —
  sold both directly and through a small network of independent equipment
  dealers
- **Sales motion:** outbound and inbound B2B sales with a multi-week to
  multi-month cycle per deal, site visits, and equipment packages that
  often bundle several products into one Opportunity

This gives every later lesson real texture: an Account is a restaurant
group or a hospital system, not an anonymous row; a Contact is a specific
chef, purchasing manager, or facilities director; a Lead is a specific
trade-show badge scan or web form fill; an Opportunity is a specific
equipment package with a specific dollar value and a specific close date.

## Departments and teams

| Department | What it does |
|---|---|
| **Sales — New Business** | Finds and closes deals with new restaurant, hotel, and institutional accounts |
| **Sales — Key Accounts** | Manages existing large, multi-location accounts (hotel chains, hospital systems) and grows them |
| **Marketing** | Runs trade-show presence, the website, and campaigns that generate Leads |
| **Service & Installation** | Schedules and executes on-site equipment installation and ongoing maintenance |
| **Customer Success** | Owns the post-sale relationship, renewals, and support escalations |
| **Finance & Order Operations** | Order processing, invoicing, and contract paperwork |
| **IT** | Owns the Salesforce org — this is the team you're acting as the administrator for |

## The sales process

Every Opportunity at Cascade moves through the same five open stages,
ending in one of two closed stages. You'll configure these exact stage
names on the Opportunity object in Lesson 8:

| Stage | What has to be true to be in this stage |
|---|---|
| **Qualifying** | A real buying need has been confirmed — budget, authority, timeline, and a genuine business reason to replace or add equipment |
| **Needs Analysis** | The rep has visited or spoken with the kitchen team to document exact equipment requirements |
| **Equipment Proposal** | A written proposal with specific equipment, pricing, and a proposed install timeline has been sent |
| **Negotiation/Review** | The customer is reviewing terms, pricing, or financing with the rep |
| **Closed Won** | A signed order — the Opportunity converts into installation and (often) a service contract |
| **Closed Lost** | The deal did not close; a loss reason is recorded |

## Lead sources

Leads at Cascade come in through four channels, tracked on the Lead's
**Lead Source** field:

- **Trade Show** — badge scans from foodservice equipment trade shows
- **Website Inquiry** — the "Request a Quote" form on cascadefoodservice
  equipment's website
- **Referral** — an existing customer or dealer referring a new buyer
- **Partner/Dealer** — passed along from one of Cascade's independent
  equipment dealers

## The people you'll see again

These names appear throughout the rest of this capstone — in Opportunity
owners, approval process approvers, Flow examples, and report filters.
Keep this list handy.

| Name | Role | Department |
|---|---|---|
| **Monica Reyes** | VP of Sales | Sales (oversees both teams) |
| **Derek Oyelaran** | Sales Manager, New Business | Sales — New Business |
| **Priya Nair** | Senior Account Executive, Key Accounts | Sales — Key Accounts |
| **Tom Baptiste** | Account Executive, New Business | Sales — New Business |
| **Jordan Kessler** | Sales Development Representative (SDR) | Sales — New Business (qualifies inbound Leads) |
| **Angela Wu** | Customer Success Manager | Customer Success |
| **Marcus Webb** | Service & Installation Operations Lead | Service & Installation |

Priya Nair owns Cascade's largest, multi-location accounts (hotel chains
and hospital systems); Tom Baptiste and the New Business team work
single-location restaurants and smaller groups found by Jordan Kessler's
inbound-Lead qualification. Monica Reyes sits at the top of the sales
role hierarchy you'll design in Lesson 4. You — the Salesforce
Administrator — are part of the IT team building and running this org.

## What drives the custom objects (Chapter 2 preview)

Two business realities at Cascade don't fit cleanly into standard
objects, and they become the two custom objects you'll build in Lesson 9:

- **An installation has its own lifecycle after a deal closes** — a site
  address, an install date, an install status, and an assigned installer
  — that an Opportunity record alone can't track once it's won.
- **Many customers pay for ongoing maintenance separately from the
  original sale** — a recurring service contract with a start date, an
  end date, a service tier, and an annual value, independent of any one
  Opportunity.

## Key terms

| Term | Meaning |
|---|---|
| Cascade Foodservice Equipment Co. | This capstone's fictional, illustrative company — never a real business |
| Key Accounts | Cascade's large, multi-location customers, owned by a separate sales team from New Business |
| Equipment package | An Opportunity that bundles several products (e.g., a range, a hood, and a dishwasher) into one deal |
| Install lifecycle | The sequence an installation moves through after an Opportunity is won: scheduled, in progress, complete |

## Lab

Add a "Scenario Reference" page to the requirements document you started
in Lesson 1. Copy in the company name, the five Opportunity stage names,
and the seven-person table above exactly as written here — you'll refer
back to this page constantly as you build Chapters 2 through 4.

## Check yourself

- What does Cascade Foodservice Equipment Co. sell, and to what kinds of
  customers?
- Name the five open Opportunity stages, in order.
- Who owns Cascade's large, multi-location Key Accounts, and who manages
  the New Business sales team?
- What two business realities at Cascade will become its two custom
  objects in Lesson 9?
