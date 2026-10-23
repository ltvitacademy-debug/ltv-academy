# Lesson 26 — Service Portal Configuration: Overview

**Chapter 7 · Service Portal & End-User Experience · Lesson 26 of 32**

## What you'll learn

- Why Service Portal is a completely different surface from the Classic UI / UI16 agent workspace you configured earlier in this course
- The three real building blocks: Portal, Pages, and Theme
- Why Service Portal runs on AngularJS (Angular 1.x), not server-rendered HTML forms
- How a caller reaches `/sp` and what record actually controls what they see
- Where UI Builder / Next Experience Portal fits as ServiceNow's newer direction

## Two different front doors, two different audiences

Every chapter before this one configured the experience an **agent** sees: Incident, Problem, Change, and Request forms rendered in the Classic UI or UI16 workspace, the interface fulfillers log into every day. Service Portal is the opposite front door — a lightweight, branded, **end-user-facing self-service website** that callers use without ever touching an agent workspace. A caller logging an incident from Service Portal never sees a list view, a related list, or a UI action; they see a card, a form, or a catalog item styled to look like a modern web app. Confusing these two surfaces is a common early implementation mistake: a Business Rule or UI Policy written for the Incident form in Classic UI does not automatically run the same way against a Service Portal widget, because Service Portal pages are not server-rendered forms at all — they're client-side applications that talk to the instance through REST and server-script data, which is exactly the distinction this lesson exists to make precise.

## Service Portal runs on AngularJS

Under the hood, Service Portal is built on **AngularJS** — specifically Angular 1.x, the framework ServiceNow adopted when Service Portal first shipped. That single fact explains the syntax you'll see constantly starting next lesson: double-curly interpolation like `{{data.title}}`, directives like `ng-repeat` and `ng-if` written as HTML attributes, and a `$scope` object that binds a page's JavaScript controller to its HTML markup. None of that exists in Classic UI configuration. Knowing it's AngularJS up front means the HTML and JavaScript in Lesson 27 won't look like unfamiliar magic — it's a real, if dated, front-end framework, used the way any Angular 1.x app would use it.

## The three building blocks: Portal, Page, Theme

Service Portal configuration has exactly three layers you implement, in this order:

```text
Portal   -- the overall site record (e.g., the default "Service Portal" at /sp)
  |
  +-- Theme   -- branding and CSS applied across every page in that portal
  |
  +-- Pages   -- individual URLs within the portal (Homepage, Catalog, KB, Ticket)
        |
        +-- Widgets placed on each page (covered in Lesson 27)
```

A **Portal** record is the site itself — its URL suffix (the out-of-box portal answers at `/sp`), its default Homepage, and which Theme it applies. A **Page** is one routable URL inside that portal — the homepage, the Service Catalog landing page, a Knowledge Base search page, a ticket-status page — each identified by a page ID that appears in the URL as `?id=`. A **Theme** record carries the portal-wide styling: header/footer HTML, the CSS variables for color and type, and which widgets render the global header, footer, and side navigation on every page. Change the Theme once, and every page in that portal picks up the new look without touching a single page's own configuration — that separation of "what a page shows" from "how everything looks" is the entire point of having a Theme as its own record.

## Not Classic UI, and not (yet) UI Builder

It's worth being explicit about where Service Portal sits relative to two other surfaces in ServiceNow's own roadmap. It is **not** a replacement for Classic UI / UI16 — agents keep working tickets in the workspace this course already configured; Service Portal is purely the self-service layer callers use. And it is **not** the newest thing ServiceNow ships either: **UI Builder**, building **Next Experience** portals, is ServiceNow's current direction for new end-user and employee-facing experiences, using a modern drag-and-drop, component-based builder instead of hand-written AngularJS widgets. Service Portal remains real, supported, and extremely common in production instances — which is why this course teaches it — but an implementer should know UI Builder is the modern alternative ServiceNow is steering customers toward for new builds.

## Key terms

| Term | Meaning |
|---|---|
| Service Portal | The AngularJS-based, end-user-facing self-service website, distinct from the agent's Classic UI / UI16 workspace |
| Portal record | The overall site configuration — URL suffix (e.g. `/sp`), default Homepage, and assigned Theme |
| Page | One routable URL within a portal, identified by a page ID, holding the widgets placed on it |
| Theme | The record carrying portal-wide branding — header/footer, CSS, and global navigation — applied to every page |
| UI Builder / Next Experience | ServiceNow's newer, component-based alternative to hand-built Service Portal pages |

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: what are the three real Service Portal building blocks, which one controls branding across every page at once, and why can't a Business Rule written against the Classic UI Incident form be assumed to behave the same way on a Service Portal page?
