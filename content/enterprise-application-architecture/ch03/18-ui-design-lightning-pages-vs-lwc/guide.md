# Lesson 18 — UI Design: Lightning Pages vs. LWC

**Chapter 3 · Application Architecture Practice · Lesson 18 of 25**

## What you'll learn

- How Lightning App Builder's declarative page composition relates to custom Lightning Web Components
- When assembling standard and third-party components is enough, and when a custom LWC is the right call
- Mobile-first design as a real constraint on UI architecture, not an afterthought for later
- How this decision fits the same declarative-vs-programmatic reasoning from Lessons 5 and 17

## The same trade-off, applied to UI

**Lightning App Builder** lets an architect or admin declaratively assemble a page — a record page, an app page, a home page — out of standard components (related lists, standard field sections, report charts) and any custom **Lightning Web Components** (LWC) that have been built and made available as page-building blocks. This is the UI-design equivalent of Lesson 17's automation reasoning: assembling an existing set of components declaratively is cheaper to build and maintain than writing a custom component from scratch, and the same discipline applies — check what's achievable with standard components and Lightning App Builder's layout tools before reaching for custom LWC development.

## When a custom LWC earns its place

A custom LWC is justified when the UI needs something standard components and App Builder's composition genuinely can't provide: a highly specific interactive visualization, a multi-step guided interaction that doesn't match any standard flow-screen or component's behavior, tight custom logic tied directly to the visual state of the page (not just data display), or a UI element meant to be reused consistently across many different pages and apps with identical custom behavior (connecting back to Lesson 10's reuse discussion — a well-built utility LWC, like a custom date-range picker, is exactly the kind of reusable building block worth investing in once a real second use case justifies it). Building a custom LWC merely to replicate what a related list or a standard component already does, with a marginally different look, is a cost paid for little real gain — the same trap as choosing Apex over Flow for a requirement that didn't actually need it.

## Lightning pages and LWCs coexist deliberately

Salesforce's Lightning component framework is explicitly built so LWC and the older Aura component model can run side by side on the same page, and so admins assembling a page in App Builder don't need to know or care which model built a given component — to them, it's just a Lightning component that can be dragged onto the page. This matters architecturally because it means the LWC-vs-declarative-assembly decision doesn't have to be made once for an entire application; different pieces of the same page can reasonably mix standard components and custom LWCs, each chosen on its own merits for the specific need it serves.

## Mobile-first is a design constraint, not a later pass

A meaningful share of Salesforce usage happens through the Salesforce mobile app, and a Lightning page or LWC that was designed and tested only on a desktop screen can genuinely fail its purpose on mobile — not render at all as intended, or render technically but be unusable with real thumbs on a real small screen. Designing mobile-first means deciding, during the UI-design step of the solution design process (Lesson 15), which fields and actions actually matter on a phone screen, rather than cramming the full desktop layout onto mobile and hoping Lightning's responsive behavior quietly fixes a problem that's actually a content-prioritization problem, not a rendering problem. A component built with complex, wide multi-column layouts that depend on generous desktop screen width is a design that didn't consider its mobile audience at design time, and retrofitting that consideration later is markedly more expensive than designing for it from the start.

## Key terms

| Term | Meaning |
|---|---|
| Lightning App Builder | The declarative tool for assembling Lightning pages out of standard and custom components |
| Lightning Web Component (LWC) | A custom UI component built with standard HTML and modern JavaScript, usable as a building block in Lightning pages |
| Mobile-first design | Designing a UI by first deciding what matters on a small screen, rather than adapting a desktop-first design afterward |

## Lab

A stakeholder asks for a new section on the Warranty Claim record page showing the claim's full history: every status change, who made it, and when, in a visually distinct timeline. Using this lesson's reasoning, decide whether this should be built with standard Lightning App Builder components (a related list, a standard timeline component if one exists and fits) or a custom LWC, and justify your answer. Then explain one specific mobile-first consideration you'd apply to whichever option you chose, given that field technicians will be viewing this page primarily on a phone.

## Check yourself

Can you explain, using an original example, when a custom LWC is justified over assembling standard components in Lightning App Builder? Can you explain why mobile-first design has to happen at design time, not as a later responsive-layout fix?
