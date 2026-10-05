# Lesson 8 — Classification Schemes and Labels

**Chapter 2 · Classification · Lesson 8 of 30**

## What you'll learn

- The common four-tier classification scheme used across most organizations
- What actually distinguishes one tier from the next
- Why exact label names and tier counts vary from one organization to another
- How the government/military classification system is a genuinely different scheme, not a stricter version of the commercial one

## The common scheme: four tiers

Most organizations that classify data use some version of the same small set of tiers, commonly labeled something like:

- **Public** — information that is fine for anyone, inside or outside the organization, to see. Marketing material, published pricing, a press release.
- **Internal** — information meant for employees, but not damaging if it leaked. An internal org chart, a meeting agenda, a process document.
- **Confidential** — information that would cause real harm to the organization or to individuals if disclosed. Customer records, financial results before they're announced, employee salary data.
- **Restricted** (sometimes called **Highly Confidential**) — the most sensitive tier: data where a leak would cause severe harm — regulatory penalties, major financial loss, or serious harm to the people the data describes. Social Security numbers, health records, authentication credentials.

This four-tier pattern — essentially "nobody cares," "keep it in-house," "this would hurt," and "this would really hurt" — shows up across data-governance literature and vendor documentation so consistently that it's worth learning as the default mental model, even before you know a specific organization's exact label set.

## What actually distinguishes each tier

The label itself is just a name. What makes a tier meaningful is the set of real-world answers attached to it. For any given tier, you should be able to answer three questions:

- **Who can access it?** Public data: anyone. Internal: all employees. Confidential: a defined group with a business need. Restricted: a small, named list of people, often with additional approval required.
- **What happens if it leaks?** Public: nothing. Internal: minor embarrassment at worst. Confidential: real financial, legal, or reputational damage. Restricted: severe damage — regulatory fines, lawsuits, or direct harm to the individuals the data describes.
- **What controls apply?** Public: none required. Internal: basic access limits. Confidential: encryption, access logging, need-to-know access. Restricted: all of that plus the strictest controls the organization has — multi-factor authentication, tightly scoped access, mandatory audit trails.

That three-question pattern — access, consequence, controls — is the actual substance of a classification scheme. The tier names are just a shorthand for a specific, pre-agreed answer to all three.

## Labels and tier counts vary by organization — and that's fine

Not every organization uses exactly four tiers with exactly these names. Some use three (collapsing Internal and Confidential); some use five (splitting Confidential into two gradations). Some rename "Restricted" to "Highly Confidential" or "Secret." None of that variation matters for understanding the concept — what matters is that **whatever scheme an organization picks, it uses a small number of clearly defined tiers, consistently applied.** A scheme with twenty overlapping labels, or one where two different teams use the same label to mean different things, fails at the one job classification exists to do.

## A different scheme entirely: government and military classification

It's worth naming one specific, real-world example of a classification scheme that is **not** a commercial data classification scheme at all: the United States government's system of **Confidential, Secret, and Top Secret**, used for information affecting national security. This scheme is defined by law and executive order, administered through a formal clearance process, and governs an entirely different category of information than a company's customer database or financial records.

The reason to know this scheme exists is not to borrow its label names for commercial use — doing so would be a category error, since "Top Secret" carries specific legal meaning that has nothing to do with a company's customer data. The reason is the opposite: to recognize that when someone says "classified information," they may mean this legally-defined national-security scheme, which is a different thing entirely from the Public/Internal/Confidential/Restricted scheme this lesson is about. Keep the two separate in your head.

## The transferable skill

You won't necessarily walk into every job and find the exact four labels described above. You will walk into every job and find *some* small, tiered scheme, under whatever names that organization chose. The skill worth building here isn't memorizing one vendor's label set — it's recognizing the pattern (a small number of tiers, each with a defined answer for access, consequence, and controls) quickly enough to map it onto whatever scheme you're handed.

## Key terms

| Term | Meaning |
|---|---|
| Classification tier | One level in a classification scheme (e.g., Public, Internal, Confidential, Restricted) |
| Public / Internal / Confidential / Restricted | A common four-tier commercial data classification scheme |
| Government/military classification | A legally-defined scheme (Confidential, Secret, Top Secret) for national security information — distinct from commercial data classification |

## Lab

Find a classification policy from a real organization (a university, a public company's published data governance policy, or a vendor's documentation) by searching online. Identify how many tiers it uses and what it calls them. Map each of its tiers onto the four-tier Public/Internal/Confidential/Restricted model from this lesson — note anywhere the mapping isn't a clean one-to-one match.

## Check yourself

Can you name the four common commercial classification tiers and describe what distinguishes each one along the three dimensions (access, consequence, controls)? Can you explain why the government's Confidential/Secret/Top Secret scheme shouldn't be conflated with commercial data classification?
