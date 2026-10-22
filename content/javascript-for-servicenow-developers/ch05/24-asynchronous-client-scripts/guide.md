# Lesson 24 — Asynchronous Client Scripts

**Chapter 5 · Client-Side JavaScript on the Platform · Lesson 24 of 32**

## What you'll learn

- Why GlideAjax calls are asynchronous — the callback runs *later*, not immediately
- Why that breaks a naive `onSubmit` script that tries to `return false` based on a GlideAjax result
- The real, correct pattern: block the first submit, validate in the callback, then submit programmatically
- Why the deprecated `getXMLWait()` is discouraged, even though it looks like a shortcut

## The problem: onSubmit has already returned before your callback fires

Back in Chapter 4 you learned that `GlideAjax` calls the server without a page
reload, and that its result arrives through a callback function. That callback
is **asynchronous** — it does not run at the moment you call `getXML()`, it
runs later, whenever the server responds. That timing difference is harmless
in an `onLoad` script. It is a real trap inside `onSubmit`, because `onSubmit`
has to return a value *right now* to tell ServiceNow whether to save — it can't
pause and wait.

```javascript
// BROKEN - do not use this pattern
function onSubmit() {
    var ga = new GlideAjax('ChangeFreezeWindowUtils');
    ga.addParam('sysparm_name', 'isDateInFreezeWindow');
    ga.addParam('sysparm_date', g_form.getValue('planned_start_date'));

    var isBlocked = false;
    ga.getXMLAnswer(function(answer) {
        // This runs LATER - after onSubmit has already returned!
        isBlocked = (answer === 'true');
    });

    return !isBlocked; // BUG: isBlocked is still false here, every single time
}
```

By the time `return !isBlocked` executes, the callback hasn't run yet — the
server hasn't even responded. `isBlocked` is still whatever it was initialized
to, every time, regardless of what the server eventually says. This script
always lets the save through, silently defeating its own validation.

## The real pattern: block first, submit programmatically later

The fix isn't to make GlideAjax "wait" — it's to stop trying to return a
result you don't have yet, and instead finish the submit *yourself*, later,
once you actually have the answer:

```javascript
function onSubmit() {
    // Second time through, after the callback already approved it:
    if (g_form.getValue('freeze_check_passed') === 'true') {
        return true;
    }

    g_form.addInfoMessage('Checking the change freeze window...');

    var ga = new GlideAjax('ChangeFreezeWindowUtils');
    ga.addParam('sysparm_name', 'isDateInFreezeWindow');
    ga.addParam('sysparm_date', g_form.getValue('planned_start_date'));

    ga.getXMLAnswer(function(answer) {
        if (answer === 'true') {
            g_form.addErrorMessage('Planned start date falls inside a change freeze window.');
        } else {
            g_form.setValue('freeze_check_passed', 'true');
            g_form.submit();
        }
    });

    return false; // always block THIS attempt - the real one happens in the callback
}
```

Walk through the sequence: the user clicks Save. `onSubmit` fires, sees no
passed check yet, fires off the GlideAjax call, and immediately `return
false`s — blocking this submit attempt. Later, the callback runs with the real
server answer. If the date is clear, it marks the check as passed and calls
`g_form.submit()` itself, which re-runs the form's submit logic — this time
the guard at the top sees the passed flag and returns `true`, letting the save
complete. If the date is frozen, an error message appears and the form simply
stays open.

## Why not just make it wait? getXMLWait()

ServiceNow does ship an older, synchronous method, `getXMLWait()`, that
genuinely blocks and waits for the server's response before continuing. It
looks like the obvious fix for this exact problem — and it's **deprecated and
discouraged** for a real reason: while it waits, it freezes the entire browser
tab's UI thread. The user's screen becomes unresponsive — no scrolling,
no clicking anything else — for however long that server round trip takes.
On a slow network, that's a genuinely bad experience. The disable-then-callback
pattern above is slower to write but never freezes the browser.

## Key terms

| Term | Meaning |
|---|---|
| Asynchronous | The callback runs later, after the triggering function has already returned |
| `getXMLAnswer()` | A GlideAjax convenience method for retrieving a single scalar answer in a callback |
| `g_form.submit()` | Programmatically re-triggers the form's submit, used inside an approved callback |
| `getXMLWait()` | A deprecated synchronous GlideAjax call that freezes the browser UI thread while waiting |

## Check yourself

You're ready for Lesson 25 when you can explain, without looking: in the
working pattern above, why does `onSubmit` return `false` on the *first* call
even when the date turns out to be perfectly valid — and what makes the
*second* call through `onSubmit` different?
