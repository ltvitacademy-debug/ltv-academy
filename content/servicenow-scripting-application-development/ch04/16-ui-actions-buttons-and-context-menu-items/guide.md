# Lesson 16 — UI Actions: Buttons & Context-Menu Items

**Chapter 4 · UI Policies, UI Actions & UI Pages · Lesson 16 of 37**

## What you'll learn

- What a UI Action is, where it lives (`sys_ui_action`), and where it can appear
- The Condition field: a server-side script that decides whether the action even shows
- The Client checkbox: the one setting that decides client-side vs. server-side execution
- Writing a server-side UI Action script against `current`
- Writing a client-side UI Action script against `g_form`, plus `action.setRedirectURL()`

## sys_ui_action: configurable buttons, links, and menu items

A **UI Action** is a record on the `sys_ui_action` table that defines a button, a form link, or a context-menu item tied to a specific table. Unlike a UI Policy, which reacts automatically to field values, a UI Action waits for a deliberate click — "Close All Related Tasks," "Escalate," "Approve." Where it physically appears is controlled by its own checkboxes: **Form button**, **Form link**, **List banner button**, **List choice** (right-click context menu on a list), and more. The same UI Action record can be configured to show in more than one of those places at once.

## The Condition field: should this even show?

Before anything else, every UI Action evaluates a **Condition** field — a small server-side script that must return `true` for the action to render at all. This runs on the server, has access to `current` (the record the form or list row represents), and is checked every time the page loads or the record updates.

```javascript
// Condition field on a UI Action tied to the Problem table
current.state == 6 && gs.hasRole('itil')
```

That condition hides the button entirely from anyone without the `itil` role, and only shows it once the Problem is in a "Resolved" state — the button never clutters the form for users who can't act on it or for a record not yet ready for the action.

## Client vs. server: one checkbox decides everything

Every UI Action has a **Client** checkbox, and it is the single most important setting on the record. It decides which of two completely different execution models the action's script runs under:

- **Client checked** — the script in the UI Action's **Script** field runs directly in the browser, with full `g_form` access, exactly like a button-triggered mini Client Script. Nothing posts back to the server unless the script itself calls a GlideAjax or submits the form.
- **Client unchecked** — the script runs server-side, after the page posts back, with access to `current` — the same object Chapter 1's Business Rules use — plus an `action` object for controlling what happens next.

```javascript
// Client-side UI Action script (Client checkbox checked)
function onClick() {
    if (!g_form.getValue('close_notes')) {
        alert('Enter close notes before closing this record.');
        return false;
    }
    gsftSubmit(null, g_form.getFormElement(), 'close_record');
}
```

```javascript
// Server-side UI Action script (Client checkbox unchecked)
// current: the Problem record being acted on
if (current.state == 6) {
    current.state = 7; // Closed
    current.update();
    action.setRedirectURL(current);
}
```

`action.setRedirectURL(url)` is the most common server-side UI Action method — pass it a record (as above, which redirects back to the updated record) or a plain URL string to send the user anywhere else once the server-side script finishes. There's no client-side equivalent needed for navigation, since a client-side script can simply set `window.location` itself or let the normal form submission handle it.

## Choosing which lane to use

The decision mirrors the one Chapter 2 already made for Client Scripts vs. Chapter 1's Business Rules: if the action only needs to read or adjust what's on the form in front of the user — a confirmation, a quick validation, a `g_form` tweak — keep it client-side and avoid the round trip. If the action needs to touch the database, run a `GlideRecord` query, or guarantee the logic runs the same way no matter who clicks it, it belongs server-side, unchecked, working against `current` the same disciplined way a Business Rule does.

## Key terms

| Term | Meaning |
|---|---|
| UI Action | A `sys_ui_action` record defining a button, link, or context-menu item |
| Condition | Server-side script on the UI Action that must return true for it to display |
| Client (checkbox) | Decides whether the action's script runs client-side (`g_form`) or server-side (`current`) |
| `action.setRedirectURL()` | Server-side method that navigates the user somewhere after the script runs |

## Check yourself

A UI Action's Condition field is `current.state == 6 && gs.hasRole('itil')`, and its Client checkbox is unchecked. Explain, in your own words, both why a user without the `itil` role never sees the button, and what object the script itself would use to actually change the record once clicked.
