# Lesson 22 — Base Lightning Components

**Chapter 4 · Reusable UI · Lesson 22 of 33**

## What you'll learn

- What base Lightning components are, and why you should reach for them before building custom UI
- A tour of the main categories: Input, Actions and Menus, Containers, Tables and Trees
- Four components you'll use constantly: `lightning-button`, `lightning-input`, `lightning-card`, `lightning-datatable`
- Why base components save you accessibility and styling work you'd otherwise have to redo yourself

## What base components are

Base Lightning components are the `lightning-*` namespace of pre-built components Salesforce ships with the platform — buttons, inputs, cards, data tables, spinners, icons, and dozens more. They're already styled with the Salesforce Lightning Design System (Lesson 25), already handle accessibility concerns like ARIA attributes and keyboard interaction (Lesson 30), and already cover most of the UI patterns a typical Salesforce app needs. Before building a custom input or button from raw HTML, check whether a base component already does the job — it almost always does, and using it means you're not reinventing styling and accessibility work Salesforce has already solved.

## Categories at a glance

Base components are grouped by purpose:

- **Input** — `lightning-input`, `lightning-combobox`, `lightning-textarea`, `lightning-checkbox-group`, and more, covering nearly every form-field type.
- **Actions and Menus** — `lightning-button`, `lightning-button-group`, `lightning-button-menu`, for triggering behavior.
- **Containers** — `lightning-card`, `lightning-accordion`, `lightning-tabset`, for structuring a page's layout.
- **Tables and Trees** — `lightning-datatable`, `lightning-tree`, for structured and hierarchical data.
- **Notifications** — `lightning-spinner`, and the `ShowToastEvent` mechanism from Lesson 21.

## lightning-button

```html
<lightning-button
    label="Save"
    variant="brand"
    onclick={handleSave}>
</lightning-button>
```

`variant` controls the visual style — `brand`, `neutral`, `destructive`, `success`, `inverse` are typical values — and `lightning-button` also supports an `icon-name` attribute for pairing a label with an SLDS icon.

## lightning-input

```html
<lightning-input
    label="Search"
    type="search"
    onchange={handleSearch}>
</lightning-input>
```

A single component covers many field types through its `type` attribute — `text`, `email`, `search`, `checkbox`, `date`, `number`, and more — rather than needing a different base component per field type.

## lightning-card

```html
<lightning-card title="Open Cases" icon-name="standard:case">
    <div class="slds-p-around_medium">
        <!-- card body content -->
    </div>
    <lightning-button slot="actions" label="New Case"></lightning-button>
</lightning-card>
```

`lightning-card` demonstrates composition from Lesson 13 directly — `title` and `icon-name` are simple `@api`-style attributes, while the body content and an `actions` named slot are filled with real markup.

## lightning-datatable

```html
<lightning-datatable
    key-field="Id"
    data={cases}
    columns={columns}
    onrowaction={handleRowAction}>
</lightning-datatable>
```

```js
columns = [
    { label: 'Subject', fieldName: 'Subject' },
    { label: 'Status', fieldName: 'Status' },
    { label: 'Priority', fieldName: 'Priority', type: 'text' }
];
```

`lightning-datatable` replaces what would otherwise be a hand-built `for:each` table, and it comes with sorting, inline editing on editable columns, and row-selection support already built in.

## Key terms

| Term | Meaning |
|---|---|
| Base Lightning component | A pre-built `lightning-*` component shipped with the platform, styled with SLDS |
| `lightning-input` | A single component covering many form field types via its `type` attribute |
| `lightning-card` | A container component combining simple attributes with slotted content |
| `lightning-datatable` | A full-featured table component supporting sorting, inline edit, and row actions |

## Lab

Build a small component combining four base components: a `lightning-card` titled "Contacts," containing a `lightning-input` of type `search` for filtering, a `lightning-datatable` showing a hardcoded array of three contacts with `Name` and `Email` columns, and a `lightning-button` in the card's `actions` slot labeled "Add Contact." Identify which parts of this UI you would have had to hand-build with raw `<input>`/`<table>`/`<div>` elements if base components didn't exist, and what you'd have lost by doing that (accessibility, styling consistency, or both).

## Check yourself

Can you name the four base-component categories covered in this lesson and one example component from each? Can you explain why `lightning-input`'s `type` attribute replaces the need for separate components per field type? Can you describe what `lightning-datatable` gives you "for free" compared to a hand-built table?
