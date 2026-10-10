# Lesson 13 — My Domain and Login Experience

**Chapter 2 · Enterprise Identity · Lesson 13 of 24**

## What you'll learn

- Why My Domain exists and what specific problems it solves
- The registration and deployment process, step by step
- How to customize the branded login page, including adding external identity providers as login options
- Why My Domain is a hard prerequisite for nearly every other topic in this course

## What My Domain is and why it exists

Every Salesforce org, by default, lives at a generic, shared domain like `na1.salesforce.com`. **My Domain** lets an org claim its own subdomain under `salesforce.com` — for example, `yourcompany.my.salesforce.com` — giving the org a unique, stable, brandable login URL. This sounds cosmetic, but it's the single most important enabling prerequisite in this entire course: Single Sign-On, Salesforce as an Identity Provider, Auth. Providers for social/enterprise login, and custom login-page branding **all require My Domain to be enabled first**, because every one of those features needs a unique, org-specific URL to anchor its certificates, Entity IDs, and callback URLs to.

## Registering a domain

From Setup, search Quick Find for **My Domain**. The registration flow:

![The My Domain registration screen in Salesforce Setup, with a subdomain name field and a Check Availability button, showing an example subdomain being entered before the https://[name].my.salesforce.com suffix.](/courses/identity-and-access-management/ch02/13-my-domain-and-login-experience/my-domain-register.png)
*Registering a My Domain subdomain — choosing the unique name that becomes part of every login URL, certificate, and SSO endpoint going forward.*

1. Enter a subdomain name and click **Check Availability**.
2. Click **Register Domain**. Salesforce provisions the domain, which can take anywhere from a few minutes to longer, and emails the org when it's ready to test.
3. Test the new domain thoroughly — log in, check that custom links and bookmarks still resolve — before deploying it to all users.
4. Click **Deploy to Users**. This is the point of no return for ordinary use: once deployed, the org's login URL changes for everyone, and old bookmarks/links pointing at the generic domain may stop working as expected.

Once provisioned and deployed, the domain is live and shows up throughout Setup and the org's URLs:

![A Salesforce org's My Domain page after the subdomain has been successfully provisioned, showing the live custom domain URL and related domain settings.](/courses/identity-and-access-management/ch02/13-my-domain-and-login-experience/my-domain-provisioned.png)
*A provisioned My Domain — the org's unique login URL is now live and ready to support SSO, Auth. Providers, and branded login.*

## Customizing the login experience

Once My Domain is active, the **Login Page Branding** settings (reached from the My Domain page) let an admin customize the login page itself: a custom logo, background color, and — critically for this course — **which authentication services appear as login options**. This is where an Auth. Provider configured for social sign-on (Lesson 6) or an external SAML IdP actually shows up as a clickable button on the login page, alongside or instead of the standard username/password form.

This is also where an admin decides whether to **remove the standard login form entirely**, forcing all logins through a specific SSO path — the decision flagged as risky in Lesson 10 if it's done before thoroughly testing and preserving an admin's ability to get back in.

## My Domain as the architectural foundation

It's worth stepping back and naming why this lesson sits where it does in the course: nearly every identity feature covered so far — Single Sign-On Settings (Lesson 3), Salesforce as an Identity Provider (Lessons 8–9), Auth. Providers for OIDC and social login (Lesson 6) — silently assumes My Domain is already in place. An architect reviewing an org that hasn't enabled My Domain yet should treat that as a blocking finding, not a minor gap, because essentially none of the identity architecture in this course can be built until it's resolved.

## Key terms

| Term | Meaning |
|---|---|
| My Domain | A unique, org-specific subdomain under salesforce.com |
| Deploy to Users | The step that makes the new domain the org's actual login URL for everyone |
| Login Page Branding | Settings controlling the look and available authentication options on the login page |

## Lab

In a free Developer Edition org, go to Setup → My Domain and walk through registering a subdomain (stop before clicking Deploy to Users if you want to avoid changing your org's live login URL during this exercise). Document:

1. The exact subdomain name you chose and why it would need to be globally unique.
2. Where you would go afterward to add a social sign-on button to the login page.
3. One reason you'd want to thoroughly test the new domain before deploying it org-wide.

## Check yourself

- Why is My Domain described as a hard prerequisite for SSO and Identity Provider features, rather than just a cosmetic branding option?
- Walk through the four steps of registering and deploying a My Domain subdomain.
- Where do external Auth. Providers and SAML IdPs actually become visible to end users once configured?
