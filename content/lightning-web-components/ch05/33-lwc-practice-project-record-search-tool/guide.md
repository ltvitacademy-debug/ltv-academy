# Lesson 33 — LWC Practice Project: Record Search Tool

**Chapter 5 · Testing and Delivery · Lesson 33 of 33**

## What you'll learn

- How to design a search-as-you-type feature without overwhelming Apex with requests
- Why a generic search input component is a strong final test of the reusability principles from Chapter 4
- How exposing the finished tool to Lightning App Builder closes the loop from Lesson 27
- How to pull testing, debugging, accessibility, and performance together into one finished, deliverable component

## The requirement

Build a **Record Search Tool**: an admin drops it onto any record page or app page, configures which object it searches, and end users type a few characters to see live matching results, click a result to navigate to that record, with no perceptible lag and no excessive Apex traffic from typing quickly. This closes out the course by deliberately pulling together Chapter 5's testing, debugging, accessibility, and performance lessons alongside everything earlier.

## Component boundaries

- **`recordSearchTool`** — the single exposed component (Lesson 27), holding the search term, calling Apex imperatively, and rendering results.
- **`searchResultRow`** — a thin, generic row component (Lesson 23) taking `@api record` and dispatching `resultselect`.

Unlike Lesson 32's dashboard, this feature is deliberately simpler at the component level — the interesting design problems here are about *timing* and *configuration*, not component composition.

## Why this needs an imperative call, not @wire

Search-as-you-type is triggered by a specific user action (typing) and the search term changes constantly — this is exactly Lesson 18's case for an imperative call over `@wire`: you don't want a live subscription re-provisioning on every keystroke through reactive wire parameters, you want direct control over exactly when a call fires.

## Debouncing: not yet covered, reasoned through from what you know

Calling Apex on every single keystroke would be wasteful and slow — a word typed in a few hundred milliseconds could trigger five or six separate server round trips, most of them immediately superseded by the next one. The standard fix is to **debounce**: wait for a short pause in typing (commonly a few hundred milliseconds) before actually firing the search, canceling any pending wait if the user keeps typing. Using `setTimeout` and clearing it on each new keystroke is the plain-JavaScript way to implement this inside `handleSearchInput`, and it's a direct application of this course's existing error-handling and imperative-call patterns (Lesson 18) to a timing problem rather than a new Salesforce-specific concept.

## Exposing it with the right configuration

The whole point of this component is that an admin configures *which object* it searches without a developer rewriting code per object — which means the Apex method needs an object-agnostic signature (taking an object API name and search term, returning a generic result shape), and the `.js-meta.xml` needs a `<targetConfig>` exposing that object choice as a `@api objectApiName` property (Lesson 27), rather than hardcoding one object into the component.

## Pulling Chapter 5 together

- **Testing (Lesson 28)**: Jest-test `searchResultRow` in isolation, and test `recordSearchTool`'s debounce logic by advancing fake timers rather than waiting in real time.
- **Debugging (Lesson 29)**: use the Network panel to confirm debouncing is actually reducing the number of Apex calls while typing a full word.
- **Accessibility (Lesson 30)**: the search input needs a real `<label>` (or `alternative-text` if icon-only), and results should be reachable and selectable by keyboard, not mouse-only.
- **Performance (Lesson 31)**: cap the number of results rendered at once, and consider the `error` branch and an empty-results state, not just the happy path.

## Key terms

| Term | Meaning |
|---|---|
| Search-as-you-type | A UI pattern triggering a server call as the user types, rather than on a separate submit action |
| Debounce | Delaying an action until a short pause in a rapid sequence of triggers (like keystrokes) |
| Object-agnostic Apex method | A method designed to work across any object, rather than one hardcoded object |

## Lab

Build `recordSearchTool` end to end: an object-agnostic `@AuraEnabled` Apex search method, a debounced `handleSearchInput` using `setTimeout`, a `searchResultRow` child dispatching `resultselect`, and `NavigationMixin` navigation to the selected record. Expose the component to `lightning__RecordPage` and `lightning__AppPage` with an admin-configurable `objectApiName` property. Write a Jest test that uses `jest.useFakeTimers()` to confirm the Apex call only fires once after rapid simulated typing, not once per keystroke.

## Check yourself

Can you explain why search-as-you-type calls for an imperative Apex call rather than `@wire`? Can you describe, in your own words, what debouncing does and why it matters here specifically? Can you explain what makes this component's Apex method and configuration "object-agnostic," and why that property is what makes the whole tool genuinely reusable across an org?
