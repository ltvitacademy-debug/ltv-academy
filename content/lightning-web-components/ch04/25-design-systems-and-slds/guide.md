# Lesson 25 — Design Systems and SLDS

**Chapter 4 · Reusable UI · Lesson 25 of 33**

## What you'll learn

- What the Salesforce Lightning Design System (SLDS) actually is
- How to apply SLDS utility classes to base components via the `class` attribute
- SLDS grid classes for layout, and where they fit versus utility classes
- The naming change from double-dash to underscore, and why it matters for the API version you're targeting

## What SLDS actually is

The **Salesforce Lightning Design System (SLDS)** is Salesforce's own design language and CSS framework — the set of colors, spacing, typography, icons, and component markup patterns that give Lightning Experience (and every base Lightning component) its consistent look. Base components already apply SLDS styling internally, which is a big part of why they look consistent with the rest of the platform automatically, with zero styling work on your part. SLDS utility classes are also available for you to apply directly, for the cases where a base component's own attributes don't cover the specific spacing or layout tweak you need.

## Applying utility classes via the class attribute

You can pass SLDS utility classes straight into a base component's `class` attribute, and the class is added alongside whatever classes the component already renders internally:

```html
<lightning-button
    label="Submit"
    class="slds-m-around_medium">
</lightning-button>
```

This is additive, not a replacement — the button keeps its own internal SLDS button classes, and your utility class rides alongside them for the specific spacing adjustment you added.

## Grid classes for layout

SLDS's grid system handles row/column layout, and Lightning's `lightning-layout`/`lightning-layout-item` components expose the most common grid settings through simple attributes (`horizontal-align`, `vertical-align`), but not every grid variation has a matching attribute. For those, the `class` attribute accepts the raw grid utility classes directly:

```html
<lightning-layout horizontal-align="space" class="slds-grid_vertical">
    <lightning-layout-item>...</lightning-layout-item>
    <lightning-layout-item>...</lightning-layout-item>
</lightning-layout>
```

## The double-dash to underscore naming change

Older SLDS and Lightning documentation uses class names with a double dash, like `slds-p-around--small`. Starting in LWC API version 61.0, class names that previously used a double dash switched to a single underscore — `slds-p-around_small`. If a component targets an API version at or above 61.0, use the underscore form; older custom CSS written against the double-dash form needs updating if the component's `apiVersion` (Lesson 5) is bumped past that boundary. This is a real, version-dependent detail worth checking against your project's actual `js-meta.xml` `apiVersion` rather than assuming whichever form you learned first is still current.

## Custom styling when utilities aren't enough

When no combination of utility classes gets you the exact result you need, the right move is your own CSS rule in the component's own `.css` file, applied through a custom class name you define — never by trying to override a class name you don't own (Lesson 24's rule applies directly here too):

```css
/* myComponent.css */
.highlight-row {
    background-color: var(--slds-g-color-warning-base-95, #fff3e0);
}
```

## Key terms

| Term | Meaning |
|---|---|
| SLDS (Salesforce Lightning Design System) | Salesforce's design language and CSS framework underlying Lightning Experience |
| SLDS utility class | A single-purpose CSS class (spacing, alignment, text styling) applied via the `class` attribute |
| SLDS grid | The classes and components handling row/column layout |
| Double-dash to underscore change | Since LWC API v61.0, class names like `slds-p-around--small` became `slds-p-around_small` |

## Lab

Build a small layout using `lightning-layout`/`lightning-layout-item` with `horizontal-align="space"`, adding an SLDS spacing utility class to a `lightning-button` inside one of the layout items. Check which naming form (double-dash or underscore) is correct for your chosen class, based on an `apiVersion` of 62.0 in the component's `js-meta.xml`. Explain why that version number is what determines the correct class-name form to use.

## Check yourself

Can you explain what SLDS is and why base components already look consistent with Lightning Experience without any styling work? Can you describe how to apply an SLDS utility class to a base component without overriding its own internal styling? Can you state which naming convention (double-dash or underscore) applies at API version 61.0 and above?
