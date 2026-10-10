# Lesson 3 — HTML Templates

**Chapter 1 · Component Basics · Lesson 3 of 33**

## What you'll learn

- Why every LWC template file has exactly one root `<template>` tag
- Data binding with `{property}` and event binding with `on*={handler}`
- Conditional rendering with `lwc:if`/`lwc:elseif`/`lwc:else` (and the older `if:true`/`if:false`)
- Rendering lists with `for:each` and the `key` requirement
- How to reach into the rendered DOM with `this.template.querySelector`

## One root template, always

An LWC template file always starts and ends with a single `<template>` element — never two sibling root elements, and never raw HTML outside of it:

```html
<template>
    <div class="container">
        <p>{greeting}</p>
    </div>
</template>
```

Everything the component renders lives inside that one `<template>` tag. This maps directly to how the framework turns your markup into a real DOM subtree for the component.

## Data binding

Any property or getter on the component's JavaScript class can be displayed in the template with curly braces:

```html
<p>{firstName} {lastName}</p>
```

There is no need to write `this.firstName` in the template — inside the markup, you reference the property name directly, and the framework automatically re-renders the bound text whenever that property's value changes.

## Event binding

Listening for a DOM event uses the `on` prefix plus the event name, pointing at a method defined in the class:

```html
<lightning-button label="Save" onclick={handleSave}></lightning-button>
```

```js
handleSave(event) {
    // event is the standard DOM event object
}
```

Note that `{handleSave}` has no parentheses — you're passing a reference to the function, not calling it immediately during render.

## Conditional rendering

The current recommended syntax is `lwc:if`, `lwc:elseif`, and `lwc:else`:

```html
<template lwc:if={isLoading}>
    <p>Loading...</p>
</template>
<template lwc:elseif={hasError}>
    <p>Something went wrong.</p>
</template>
<template lwc:else>
    <p>{data}</p>
</template>
```

Many existing orgs still use the older `if:true`/`if:false` directives, which remain supported:

```html
<template if:true={isLoading}>
    <p>Loading...</p>
</template>
<template if:false={isLoading}>
    <p>{data}</p>
</template>
```

Both approaches only render their contents — including running any logic inside, like a child component's lifecycle — when the condition is actually true, so conditional blocks are also a lightweight way to defer work.

## Rendering lists

`for:each` repeats a template block once per item in an array. Every repeated element needs a unique `key` attribute, which the framework uses to track which DOM nodes to reuse, move, or remove as the underlying array changes — without a stable key, the framework can't efficiently tell items apart across re-renders:

```html
<template for:each={contacts} for:item="contact">
    <p key={contact.Id}>{contact.Name}</p>
</template>
```

The `iterator:` directive is an alternative that also exposes `first` and `last` booleans for the current item, useful for styling the first or last row differently:

```html
<template iterator:it={contacts}>
    <p key={it.value.Id} class={it.first ? 'first-row' : ''}>{it.value.Name}</p>
</template>
```

## Reaching into the rendered DOM

Occasionally you need to read or manipulate a rendered element directly — for example, calling `.focus()` on an input. Because LWC renders into shadow DOM, you query through `this.template`, not the global `document`:

```js
renderedCallback() {
    const input = this.template.querySelector('lightning-input');
    if (input) {
        input.focus();
    }
}
```

`this.template.querySelector` only sees elements inside this component's own shadow boundary — it will not reach into a child component's internal markup, which is a deliberate encapsulation boundary, not a limitation to work around.

## Key terms

| Term | Meaning |
|---|---|
| `<template>` | The single required root element of every LWC HTML file |
| `{property}` | Data-binding syntax that displays a class property's or getter's value |
| `on*={handler}` | Event-binding syntax connecting a DOM event to a class method |
| `lwc:if` / `lwc:elseif` / `lwc:else` | The current directives for conditional rendering |
| `for:each` / `key` | The directive for rendering a list, and the required unique identifier per item |
| `this.template.querySelector` | How a component reaches into its own rendered shadow DOM |

## Lab

Build a small template (no need to deploy it) that renders a list of three hardcoded objects `{ id: 1, name: 'Alpha' }`, etc., using `for:each` with a proper `key`. Add a `lwc:if`/`lwc:else` pair that shows "No items" when the array is empty and the list otherwise. Identify, without running it, which element the framework would fail to track correctly if you removed the `key` attribute from the repeated element.

## Check yourself

Can you explain why every LWC template must have exactly one root `<template>` tag? Can you write the binding syntax for both displaying a property and handling a click event? Can you say why a stable `key` is required on every item rendered with `for:each`?
