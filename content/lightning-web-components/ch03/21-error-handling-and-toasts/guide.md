# Lesson 21 — Error Handling and Toasts

**Chapter 3 · Working with Salesforce Data · Lesson 21 of 33**

## What you'll learn

- How to surface a user-facing notification with `ShowToastEvent`
- The four toast variants and what each communicates
- `lightning-messages`, the declarative error display for record forms
- A consistent pattern for turning any caught error into readable text

## ShowToastEvent: the standard user-facing notification

`lightning/platformShowToastEvent` exports `ShowToastEvent`, a `CustomEvent` subclass purpose-built for showing a toast notification — the small banner that appears and fades at the top of the screen:

```js
import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SaveButton extends LightningElement {
    showToast(variant, title, message) {
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message,
                variant,
                mode: 'dismissable'
            })
        );
    }
}
```

Like any event, it's created and then dispatched with `this.dispatchEvent(...)` — there's nothing to import or call beyond the constructor itself.

## The four variants

| Variant | Meaning | Visual |
|---|---|---|
| `info` | Default; general information | Grey, info icon |
| `success` | An action completed successfully | Green, checkmark icon |
| `warning` | Something needs attention but isn't a failure | Yellow, warning icon |
| `error` | An action failed | Red, error icon |

Choosing the right variant is part of the UX, not a cosmetic afterthought — showing `success` for a failed save (or vice versa) actively misleads the user about whether their action actually worked.

## Putting it together with an imperative call

The pattern from Lesson 18 and a toast combine naturally:

```js
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

async handleSave() {
    try {
        await createRecord(this.recordInput);
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success',
            message: 'Record created.',
            variant: 'success'
        }));
    } catch (error) {
        this.dispatchEvent(new ShowToastEvent({
            title: 'Error creating record',
            message: error.body?.message ?? 'Unknown error',
            variant: 'error'
        }));
    }
}
```

## lightning-messages: declarative error display

When using `lightning-record-edit-form` (Lesson 16) rather than a manual imperative call, dropping a `<lightning-messages></lightning-messages>` element inside the form automatically displays any error the form encounters when saving, with no JavaScript needed:

```html
<lightning-record-edit-form object-api-name="Case" onsuccess={handleSuccess}>
    <lightning-messages></lightning-messages>
    <lightning-input-field field-name="Subject"></lightning-input-field>
    <lightning-button type="submit" label="Save"></lightning-button>
</lightning-record-edit-form>
```

This is the lower-effort option specifically for record-form errors; for imperative Apex or LDS JavaScript calls, `ShowToastEvent` is the standard mechanism since there's no form component already managing the error display for you.

## A consistent pattern for extracting an error message

Apex and LDS errors don't always have the exact same shape, so a small reusable helper avoids repeating fragile error-parsing logic everywhere:

```js
function reduceError(error) {
    if (Array.isArray(error.body)) {
        return error.body.map((e) => e.message).join(', ');
    } else if (error.body && typeof error.body.message === 'string') {
        return error.body.message;
    }
    return error.message ?? 'Unknown error';
}
```

Using one shared helper like this across a project means every toast and every logged error gets a consistently readable message, instead of each component guessing at the error shape independently.

## Key terms

| Term | Meaning |
|---|---|
| `ShowToastEvent` | The event used to display a toast notification, imported from `lightning/platformShowToastEvent` |
| Toast variant | One of `info`, `success`, `warning`, `error`, controlling the toast's color and icon |
| `lightning-messages` | A declarative component that displays record-form errors automatically |
| `error.body.message` | The common (but not universal) path to an error's human-readable text |

## Lab

Write a `handleDelete()` method that calls `deleteRecord` imperatively, showing a `success` toast on completion and an `error` toast (using the `reduceError` helper above) on failure. Then build a second, declarative version using `lightning-record-edit-form`'s delete-adjacent pattern isn't directly supported by that form — explain, in writing, why deletion specifically still requires the imperative JavaScript approach rather than a declarative form.

## Check yourself

Can you name all four toast variants and what each communicates to the user? Can you write the exact dispatch syntax for showing an error toast with a title and message? Can you explain when `lightning-messages` is the right tool versus when `ShowToastEvent` is the right tool?
