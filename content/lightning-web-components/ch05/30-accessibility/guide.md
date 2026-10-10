# Lesson 30 — Accessibility

**Chapter 5 · Testing and Delivery · Lesson 30 of 33**

## What you'll learn

- Why base Lightning components give you a strong accessibility baseline for free
- `aria-label` versus visible text, and the camelCase rule in LWC templates
- `slds-assistive-text` for screen-reader-only content
- Keyboard navigation and focus basics: tab order, `tabindex`, and focus visibility

## Base components already follow accessibility standards

Salesforce's base Lightning components are built on SLDS markup that follows the W3C ARIA Authoring Practices Guide, and they update their own ARIA attributes automatically as their state changes — a `lightning-input` marked invalid, for example, updates its own `aria-invalid` state without you writing any ARIA code yourself. This is one more reason (alongside Lesson 22's styling and consistency points) to reach for a base component before hand-building the same control from raw HTML: accessibility work that's already done for you is accessibility work you don't have to redo correctly from scratch.

## aria-label: for when visible text isn't possible

Salesforce's own guidance is to use a visible `<label>` first whenever possible, and to fall back to `aria-label` only when a visible label genuinely isn't an option — an icon-only button is the classic case:

```html
<lightning-button-icon
    icon-name="utility:close"
    alternative-text="Close dialog"
    onclick={handleClose}>
</lightning-button-icon>
```

For a base component, the documented attribute (here, `alternative-text`) is usually the right way to supply this text rather than reaching for a raw `aria-label` attribute directly. When you do need `aria-label` on your own markup, remember LWC's camelCase rule for attributes: in the template it's written `aria-label` (hyphenated, matching standard HTML), but note that `aria-label` doesn't display visibly to anyone — it only reaches screen reader users, so don't use it as a substitute for genuinely important information that sighted users also need to see.

## slds-assistive-text: screen-reader-only content

When text needs to exist for screen readers but shouldn't be visible on screen, the `slds-assistive-text` SLDS class is the standard way to do it — this is different from `display: none` or `aria-hidden`, both of which remove content from assistive technology entirely rather than making it screen-reader-only:

```html
<span class="slds-assistive-text">Loading search results</span>
```

Base components like `lightning-icon` use exactly this pattern internally for their own `alternative-text` attribute, rendering the text visually hidden but still announced by a screen reader.

## Keyboard navigation and focus

A few durable rules:

- **Favor native elements over repurposed ones.** If a native HTML element or attribute already has the semantics and keyboard behavior you need, use it instead of adding ARIA roles to a generic `<div>` to simulate the same behavior.
- **Let DOM order drive tab order.** The natural order elements appear in the template is the order assistive technology and keyboard `Tab` navigation follow; avoid using `tabindex` to force a different order, which tends to create a confusing, hard-to-maintain sequence.
- **Use `tabindex="0"` sparingly**, only to make an otherwise non-interactive element focusable, and `tabindex="-1"` only for elements that should be focusable programmatically (for example, moving focus into a modal) but not reachable by tabbing.
- **Never hide the focus indicator.** A visible focus ring is how a keyboard user tracks where they are on the page — removing it with CSS makes a component unusable for keyboard-only navigation.

## Key terms

| Term | Meaning |
|---|---|
| ARIA Authoring Practices Guide | The W3C standard base Lightning components follow for accessible markup |
| `aria-label` | An attribute identifying a control for screen readers, used when visible text isn't possible |
| `slds-assistive-text` | An SLDS class for content that's screen-reader-only, not visually hidden entirely |
| Tab order | The sequence keyboard `Tab` navigation follows, which should match DOM order |
| Focus indicator | The visible outline showing which element currently has keyboard focus; must never be removed |

## Lab

Build a small icon-only button using `lightning-button-icon` with a meaningful `alternative-text`. Then build a custom status indicator (a plain `<span>` with a colored dot) that needs an `slds-assistive-text` span describing the status for screen readers. Explain, specifically, why `display: none` would be the wrong choice for that assistive-text span, and `slds-assistive-text` is the right one.

## Check yourself

Can you explain why base Lightning components give you accessibility benefits with no extra work on your part? Can you state Salesforce's documented priority order between visible text and `aria-label`? Can you explain the difference between `slds-assistive-text` and `display: none`, and why that difference matters for screen reader users?
