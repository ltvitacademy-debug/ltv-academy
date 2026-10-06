# Lesson 15 — Trust, Availability and Salesforce Security Basics

**Chapter 3 · How Salesforce Works · Lesson 15 of 20**

## What you'll learn

- What trust.salesforce.com is and what it actually tells you
- How to check live status, scheduled maintenance, and historical availability for your instance
- The basic building blocks of Salesforce's security model: who can log in, and what they can see
- Why "trust" is treated as a formal, published product at Salesforce — not just a slogan

## trust.salesforce.com: the platform's own status page

Because your org runs on shared, multitenant infrastructure (Lesson 11), you — and your users — depend on Salesforce's own operational health every single day. Rather than leaving customers to guess, Salesforce publishes a dedicated, public transparency site: **trust.salesforce.com**.

![Real screenshot of the live trust.salesforce.com homepage, showing the Trust navigation bar (Status, Security, Compliance, Availability) and a "Status By Product" section listing an informational message about Salesforce's products.](/courses/salesforce-and-crm-foundations/ch03/15-trust-availability-and-salesforce-security-basics/trust-status-by-product.jpg)
*The real, live trust.salesforce.com homepage. The top navigation — Status, Security, Compliance, Availability — maps directly to the categories of information the site tracks.*
Source: [trust.salesforce.com](https://trust.salesforce.com/en/)

On this site, you can:

- **Check your instance's live status.** Search for your specific instance name (you found yours back in Lesson 11's lab) to see whether it's fully available, experiencing a performance issue, or in scheduled maintenance.
- **See scheduled maintenance windows.** This is where the release upgrades from Lesson 14 actually get scheduled — you can see exactly when your instance's next maintenance window is.
- **Review historical uptime.** Salesforce publishes rolling historical availability data per instance, which is often referenced in enterprise contracts and SLAs.
- **Read security advisories and compliance documentation.** The Security and Compliance tabs cover everything from active security advisories to formal certifications like SOC 2 and ISO 27001 that enterprise customers' legal and security teams require.

Admins check trust.salesforce.com constantly — it's usually the very first place to look when users report "Salesforce is slow" or "I can't log in," before assuming the problem is something in your own org's configuration.

## Security basics every beginner needs

Trust also extends inward — how your own org controls who gets in and what they can do once they're logged in. You'll go much deeper on this in a later course in this career path, but every admin needs these starting concepts:

- **Authentication** — proving you are who you say you are, typically a username and password, now required to be paired with **Multi-Factor Authentication (MFA)** for every Salesforce user, enforced platform-wide by Salesforce itself.
- **Profiles** — every user has exactly one profile, which sets their baseline access: which objects they can see at all, which fields, which apps.
- **Permission sets** — additional, stackable grants of access layered on top of a profile, without needing to change (or clone) the profile itself.
- **Sharing rules and org-wide defaults** — control which specific *records* a user can see, separate from which *objects and fields* their profile and permission sets allow.

A useful mental model: **profiles and permission sets control access to functionality; sharing settings control access to specific records.** Both layers matter, and a real-world access problem is often a mix of both.

## Key terms

| Term | Meaning |
|---|---|
| trust.salesforce.com | Salesforce's public site for live status, security, compliance, and availability information |
| Instance status | Whether a specific server cluster is available, degraded, or in maintenance |
| MFA (Multi-Factor Authentication) | A required second proof of identity beyond username and password |
| Profile | The baseline access-control record every Salesforce user has exactly one of |
| Permission set | An additional, stackable grant of access layered on top of a profile |

## Lab

1. Go to trust.salesforce.com and search for your org's instance (from Lesson 11). Note its current status.
2. Click into the Security tab and find one published security advisory or best-practice document.
3. In your own org's Setup, go to Users and find your own user record — note which Profile you're assigned.

## Check yourself

You're ready for Lesson 16 when you can explain what trust.salesforce.com is used for, and describe the difference between a profile and a permission set in one sentence each.
