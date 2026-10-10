# Lesson 16 — Customer Portal Architecture

**Chapter 3 · Integration and Platform Architecture · Lesson 16 of 33**

## What you'll learn

- Why LTV Global builds two separate Experience Cloud sites instead of one combined portal
- How each site's license type is matched to its very different user population
- How sharing sets (from Lesson 11) and the parts-pricing API (from Lesson 15) come together inside the portal
- Why Experience Cloud license and performance choices directly address Risk #4 from Lesson 6

## Two portals, not one

LTV Global builds two separate **Experience Cloud** sites rather than a single combined portal, because dealers and end customers are different populations with different needs and radically different scale: thousands of dealer business users who place frequent, high-volume parts orders, versus millions of individual end customers who log in occasionally to register equipment or check a service history. A single combined site would force both populations into a compromise design that serves neither well — dealer-focused bulk-ordering features would clutter an occasional end-customer's experience, and end-customer self-registration flows would be irrelevant friction for an established dealer's procurement team.

## Dealer Portal

The **Dealer Portal** gives dealer users parts ordering (calling the parts-pricing/catalog API from Lesson 15 through External Services for live pricing), equipment lookup across everything that dealer has sold or services, and case submission into Field Service. Dealer users are licensed appropriately for a business population that needs ongoing, fairly deep platform access — placing orders, tracking status, managing their own team's users — and large dealer groups can federate their own identity provider into this site, per Lesson 12's hybrid identity model.

## Customer Portal

The **Customer Portal** gives individual end customers equipment registration, warranty and service-history lookup, and the ability to submit a service request that flows into the same Case object the Dealer Portal and internal Field Service team use. End-customer users are licensed under a lighter-weight model appropriate for infrequent, self-service logins, and they self-register natively rather than federating any identity provider, per Lesson 12.

## Resolving Risk #4: license type and performance at millions of logins

Lesson 6's Risk #4 named a real danger: choosing the wrong Experience Cloud license type or sharing model could fail to scale to millions of end-customer logins, either on cost (licensing priced for occasional business users doesn't make sense at consumer volume) or on performance (a sharing model built for thousands of users can behave very differently at millions). This lesson's mitigation is the deliberate split itself: by giving the Customer Portal's millions of individual, infrequent users a license type and sharing approach actually sized for that population — rather than reusing the Dealer Portal's business-user-oriented licensing for everyone — LTV Global avoids both the cost explosion and the performance risk a one-size-fits-all portal would have created. Both portals rely on the **sharing sets** established in Lesson 11, which scope each external user strictly to their own account relationship regardless of which portal they're on, so scale growth in one portal's user population doesn't increase visibility risk in the other.

## Why two portals is the right call, not just a safe one

It would be simpler, on paper, to build one portal and let profiles and permission sets differentiate dealer from customer experience within it. LTV Global rejects that simplicity because it would reintroduce exactly the licensing and performance risk this section just resolved — a single site's user base and sharing configuration would still have to accommodate both populations' very different scale and usage patterns underneath whatever UI differentiation was layered on top. Splitting at the site level, not just the profile level, is what actually isolates one portal's scale from the other's.

## Key terms

| Term | Meaning |
|---|---|
| Experience Cloud | Salesforce's platform for building external-facing portals and communities |
| Dealer Portal | LTV Global's business-facing Experience Cloud site for dealer ordering and case management |
| Customer Portal | LTV Global's consumer-facing Experience Cloud site for individual equipment owners |
| License type (Experience Cloud) | The licensing model governing an external user's access level and cost, chosen to match the population's actual usage pattern |

## Lab

A stakeholder proposes merging the Dealer and Customer portals into one site to "simplify maintenance." Using this lesson's reasoning, write three or four sentences explaining what scale and licensing risk that merge would reintroduce, referencing Risk #4 specifically, and why splitting at the site level (not just the profile level) is what actually avoids it.

## Check yourself

Can you explain, in your own words, why LTV Global builds two separate Experience Cloud sites rather than one combined portal with profile-based differentiation? Can you state exactly how this lesson's design resolves Risk #4 from the Chapter 1 risk register?
