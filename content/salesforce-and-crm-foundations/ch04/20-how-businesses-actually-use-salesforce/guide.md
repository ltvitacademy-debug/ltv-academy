# Lesson 20 — How Businesses Actually Use Salesforce

**Chapter 4 · Using Salesforce · Lesson 20 of 20**

## What you'll learn

- How everything from this course's four chapters shows up in a single, realistic business day
- A short tour of how different industries put the same platform to very different uses
- What's coming next as you move from foundations into hands-on practice

## Bringing it all together

This course started with a basic question: what is CRM, and why do businesses use it (Lesson 1)? Twenty lessons later, you now understand the customer lifecycle, the Salesforce ecosystem and its clouds, how the platform physically runs, and the actual screens — apps, tabs, list views — people use every day. This final lesson connects all of it to a realistic picture of a business actually running on Salesforce.

## A day in the life, across departments

Picture a mid-size company — say, a company selling commercial HVAC equipment — running on Salesforce.

- **Marketing** runs an email campaign promoting a new product line. Everyone who clicks through becomes a **Lead** (Lesson 3) in Salesforce, automatically routed to a sales rep.
- **Sales** works that Lead through qualification, eventually converting it into an **Account**, **Contact**, and **Opportunity**. The rep lives in the **Sales app** (Lesson 17), tracking the deal through stages on their Home page dashboard, and using a **list view** (Lesson 18) filtered to "My Open Opportunities" to plan their week.
- **Finance/Operations** might reference the same Account record once the deal closes, since Salesforce often becomes the single source of truth multiple departments pull from.
- **Service** picks up after the sale: a customer opens a support ticket, which becomes a **Case** — the Service team works it from a completely different app, with a completely different Home page and tab bar (Lesson 18), even though it's the exact same Salesforce org and the exact same Account record underneath.
- **Leadership** checks a **Dashboard** built from live **Reports**, showing pipeline, win rate, and open case volume — all built on the same underlying data every other department is updating in real time.

Notice what's consistent underneath all of this: one multitenant org (Lesson 11), one edition and set of licenses (Lesson 12), the same metadata-driven objects and fields (Lessons 13, 16) — just surfaced through different apps for different jobs.

## The same platform, very different industries

Because Salesforce is this customizable, wildly different organizations run on it in wildly different ways:

- A **nonprofit** might use Accounts to represent donor households, Opportunities to represent pledged donations, and Campaigns to track fundraising events.
- A **university** might use Leads for prospective students, and a custom "Course" object you learned about back in Lesson 16.
- A **financial services firm** has entire specialized Salesforce products (Financial Services Cloud) built on top of the same core platform, with extra objects and compliance features for that industry.
- A **small business** might run the entire company's customer relationships out of a single Sales app with almost no customization at all.

The common thread: whatever the industry, it's still built from the same objects, records, fields, apps, and tabs you've spent this course learning.

## What's next

This course covered the *foundations* — what CRM is, how Salesforce is built, and how to find your way around it. The next course in the Salesforce Administrator path, **Hands-On Salesforce Environment**, is where you stop reading about Salesforce and start actually working inside a real, free environment of your own — setting up your own Developer org or Trailhead Playground and getting comfortable clicking around before diving into the deeper admin skills (security, automation, reporting) that follow later in this path.

## Key terms

(This lesson is a synthesis — see the glossary in Lesson 19 for definitions of every term referenced here.)

## Lab

1. Pick one real or imagined business. In a few sentences, describe how Marketing, Sales, and Service at that business might each use a different Salesforce app, but share the same underlying Account records.
2. Name one industry-specific way a company outside "typical B2B sales" (like a nonprofit or university) might adapt Salesforce's standard objects to its own needs.
3. Write one sentence on what you're most looking forward to practicing hands-on in the next course.

## Check yourself

You've completed Salesforce & CRM Foundations when you can describe, in your own words, what CRM is, how Salesforce's platform works, and how to navigate its interface — and you're ready to open a real Salesforce environment of your own in the next course, **Hands-On Salesforce Environment**.
