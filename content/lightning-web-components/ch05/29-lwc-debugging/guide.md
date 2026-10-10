# Lesson 29 — LWC Debugging

**Chapter 5 · Testing and Delivery · Lesson 29 of 33**

## What you'll learn

- Why browser DevTools are the primary LWC debugging tool, not a Salesforce-specific one
- Lightning debug mode, and what it actually changes
- Reading Apex errors surfaced into the browser console
- A practical checklist for the most common "my component isn't working" causes

## Browser DevTools are the primary tool

Because LWC compiles down to real JavaScript, HTML, and CSS running in the browser, the same Chrome/Firefox/Edge DevTools you'd use for any web app work directly on LWC components: the Elements panel shows the real (shadow) DOM tree, the Console shows `console.log` output and uncaught errors, the Sources panel supports breakpoints directly inside your component's `.js` file, and the Network panel shows the actual Apex/UI API calls a component makes. There's no separate, Salesforce-specific LWC debugger — learning to debug LWC effectively is largely learning to use standard browser DevTools well.

## Lightning debug mode

By default, Lightning Experience serves minified JavaScript, which makes stack traces and breakpoints far less readable — a minified error points at compressed, renamed code instead of your actual source. Enabling **Lightning debug mode**, a checkbox in a user's personal Setup settings, serves unminified JavaScript instead, trading some performance for readable stack traces and variable names while you're actively debugging. It's meant to be toggled on for development and off again afterward, not left permanently enabled for every user.

## console.log and breakpoints inside a component

Standard `console.log` calls inside any method work exactly as you'd expect, appearing in the browser console tied to the line that logged them:

```js
@wire(getRecord, { recordId: '$recordId', fields: FIELDS })
wiredAccount({ data, error }) {
    console.log('wiredAccount fired', data, error);
    // ...
}
```

With debug mode enabled, you can also set a real breakpoint directly in the Sources panel on a line inside your component's `.js` file and step through execution exactly as you would for any other JavaScript — including inspecting `this` to see the live component instance's current field values.

## Reading Apex errors in the console

An Apex error surfaced to a component (Lesson 15, Lesson 21) usually also appears in the Network panel's response for the failed call, and if unhandled, in the Console as an uncaught error. The habit from Lesson 18 — always wrapping imperative calls in `try`/`catch` and logging or displaying `error.body.message` — pays off here directly: a caught and logged error gives you a clean, readable message in the console, where an unhandled rejection can produce a much less helpful generic error.

## A practical "it's not working" checklist

- **Component not appearing at all** — check `isExposed` and `<targets>` (Lesson 27); check for a deploy failure in the CLI output.
- **Property not updating** — check whether you're mutating an object/array in place without `@track` or reassignment (Lesson 6).
- **Wired data never arrives** — check the Apex method is `@AuraEnabled(cacheable=true)` (Lesson 15), check the Network panel for the actual request/response, check for a typo in the `@salesforce/apex` import path.
- **Event never reaches the parent** — check the listener attribute's exact casing (`on` + lowercase event name, Lesson 11), and confirm the listener is on the correct element.
- **Style not applying** — check you're not trying to target a class you don't own inside a base component (Lesson 24).

## Key terms

| Term | Meaning |
|---|---|
| Browser DevTools | The Elements, Console, Sources, and Network panels used to debug LWC like any web app |
| Lightning debug mode | A personal setting that serves unminified JavaScript for readable stack traces |
| Breakpoint | A paused execution point set directly inside a component's `.js` source in DevTools |
| `error.body.message` | The common path to a readable Apex error message, surfaced in the console when logged |

## Lab

Take a component with a wired Apex call that silently returns no data. Using only this lesson's checklist (no new tools), list the specific checks you'd run, in order, to find the cause — starting with the Network panel and ending with the Apex method's annotation. Then explain, specifically, what enabling Lightning debug mode would and would not help you diagnose in this scenario.

## Check yourself

Can you name the four browser DevTools panels most relevant to LWC debugging and what each shows? Can you explain what Lightning debug mode actually changes, and why it's not left on permanently? Can you walk through at least three items from this lesson's "it's not working" checklist from memory?
