# Lesson 28 — GlideDialogWindow & GlideModal

**Chapter 7 · GlideDialogWindow, GlideModal & Advanced UI · Lesson 28 of 37**

## What you'll learn

- The real difference between GlideModal and GlideDialogWindow, and when each one is the right call
- How to pop a simple confirmation message with GlideModal, with no UI Page involved
- How to load an existing UI Page's full interactive content inside a modal with GlideDialogWindow
- How `setPreference()` passes data into the UI Page that a dialog renders
- Why both of these are client-side-only APIs, called from a Client Script or a UI Action's client-side script

## The problem: you need something between an alert and a full page

Chapter 4 built UI Actions and UI Pages. A UI Action button click can run server-side script
directly, but sometimes you need to interrupt the user first — a confirmation, a warning, or a
small custom form — without navigating away from the record they're on. ServiceNow's browser
client gives you two real APIs for this, and picking the wrong one means either over-building a
UI Page for a one-line message, or under-building a custom dialog box by hand with raw DOM.

## GlideModal: a simple message or confirmation

`GlideModal` is the lighter of the two. It renders a modal popup from an existing UI Page record
(ServiceNow ships several built-in ones for simple messages, like `glide_modal_confirm`), without
you writing any new UI Page for a basic case. You set a title, optionally pass preferences, and
render it:

```javascript
// Client Script or UI Action client script
var gm = new GlideModal('glide_modal_confirm');
gm.setTitle('Are you sure?');
gm.setPreference('sysparm_message', 'This will close every related task.');
gm.render();
```

For the most common case — a plain confirm-style popup with OK/Cancel buttons and a callback —
ServiceNow also exposes the convenience wrapper on the `GlideDialogWindow` prototype chain that
many built-in UI Actions use: a simple `confirm()`-style call backed by a modal rather than the
browser's native `confirm()`. The key point isn't memorizing every helper — it's recognizing that
GlideModal exists so you never write a custom UI Page just to show one message.

## GlideDialogWindow: a full UI Page inside a modal

`GlideDialogWindow` is the heavier, more capable API. It loads a UI Page you built — with its own
HTML, its own client-side script, its own form fields — and displays it inside a modal overlay on
top of the current record. This is the right tool whenever the user needs to interact with more
than a yes/no choice: picking from a list, filling in a reason field, reviewing a table of related
records before confirming.

```javascript
// UI Action client script — opens a custom UI Page as a modal
function openCloseReasonDialog() {
    var dialog = new GlideDialogWindow('close_reason_dialog');
    dialog.setTitle('Confirm Action');
    dialog.setPreference('sysparm_id', g_form.getUniqueValue());
    dialog.setPreference('sysparm_task_count', 4);
    dialog.render();
}
```

`close_reason_dialog` here is the name of a real UI Page record from Chapter 4. Everything passed
through `setPreference()` lands in that UI Page's Jelly/processing script as a `RP.getWindowProperties()`
lookup or a URL-style `sysparm_` parameter — it's how data gets from the caller into the dialog
without a full page navigation.

## Making the real decision

The deciding question is always: **does this need a custom UI Page's content, or just a message?**
A delete confirmation with one sentence and OK/Cancel is GlideModal. A dialog where the user picks
a close code from a list, types a reason, and reviews which four tasks will be affected needs
its own UI Page, which means GlideDialogWindow. Reaching for GlideDialogWindow for a one-line
message means maintaining a UI Page record for something that didn't need one; reaching for
GlideModal when you actually need custom form fields means fighting the API to stuff content into
a dialog that wasn't built to hold it.

## Key terms

| Term | Meaning |
|---|---|
| GlideModal | Client-side API for a simple popup message or confirmation, no custom UI Page required |
| GlideDialogWindow | Client-side API that loads a full UI Page's interactive content inside a modal |
| `setPreference()` | Passes a named value from the caller into the dialog or UI Page it opens |
| `render()` | Displays the dialog or modal once its title and preferences are set |
| UI Page | The reusable custom-interface record (Chapter 4) that GlideDialogWindow displays |

## Check yourself

A UI Action needs to warn the user "This record is locked" with just an OK button — no fields,
no choices. Which API do you reach for, and why would reaching for the other one be the wrong
call here?
