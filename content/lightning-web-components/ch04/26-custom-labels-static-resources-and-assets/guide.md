# Lesson 26 — Custom Labels, Static Resources and Assets

**Chapter 4 · Reusable UI · Lesson 26 of 33**

## What you'll learn

- Why hardcoded text in a component is a maintenance and translation problem
- The `@salesforce/label` import pattern for custom labels
- The `@salesforce/resourceUrl` import pattern for static resources
- Referencing a file inside a zipped static resource archive

## Why hardcoded text is a problem

Writing `<p>Welcome back!</p>` directly in a template works, right up until the org needs that text in a second language, or a business user wants to change the wording without a developer redeploying code. **Custom Labels** solve both problems: a label is a piece of translatable text defined once in Setup, referenced by components, Apex, and Visualforce alike, and automatically resolved to the correct language for the logged-in user with no runtime logic in your component at all.

## Importing a custom label

A label created in Setup without a namespace is referenced with a `c.` prefix, matching the same namespace convention used for custom components (Lesson 5):

```js
import { LightningElement } from 'lwc';
import welcomeMessage from '@salesforce/label/c.Welcome_Message';
import exitMessage from '@salesforce/label/c.Exit_Message';

export default class Greeting extends LightningElement {
    label = { welcomeMessage, exitMessage };
}
```

```html
<template>
    <p>{label.welcomeMessage}</p>
</template>
```

The template references `label.welcomeMessage` using the exact same `{property}` binding syntax as any other property — there's nothing special about a label once it's imported, which is deliberate: it reads in the template exactly like any other piece of text data.

## Static resources: images, scripts, and more

A **static resource** is a file (an image, a stylesheet, a script, or an archive like a `.zip`) uploaded to Setup and referenced from a component as a URL through `@salesforce/resourceUrl`:

```js
import { LightningElement } from 'lwc';
import COMPANY_LOGO from '@salesforce/resourceUrl/companyLogo';

export default class Header extends LightningElement {
    logoUrl = COMPANY_LOGO;
}
```

```html
<template>
    <img src={logoUrl} alt="Company logo" />
</template>
```

The name used in the import (`companyLogo`) must exactly match the static resource's name in Setup, which can only contain letters, numbers, and underscores.

## Reaching a file inside a zipped resource

For resources uploaded as a `.zip` or `.jar` archive, the imported URL points at the archive's root — reach a specific file inside it by concatenating a path onto that URL:

```js
import PARTNER_ASSETS from '@salesforce/resourceUrl/partnerAssets';

logoUrl = PARTNER_ASSETS + '/images/badge.png';
```

Archived static resources are a common way to bundle a small set of related images or a third-party JavaScript library that itself ships as multiple files, without creating a separate static resource record for every individual file.

## Loading a third-party script from a static resource

A static resource can also be a JavaScript library, loaded dynamically and then used through whatever global variable it exposes — a pattern that comes up in Chapter 5 when integrating external tooling, though it's outside this lesson's scope to cover in full. The key idea for now: static resources aren't limited to images — scripts, stylesheets, fonts, and data files are all legitimate uses.

## Key terms

| Term | Meaning |
|---|---|
| Custom Label | Translatable text defined once in Setup and referenced by components, Apex, and Visualforce |
| `@salesforce/label/c.LabelName` | The import path pattern for a custom label without a namespace |
| Static resource | A file (image, script, stylesheet, or archive) uploaded to Setup and referenced as a URL |
| `@salesforce/resourceUrl/ResourceName` | The import path pattern for a static resource |

## Lab

Define (on paper, no deploy required) a custom label `Session_Expired_Message` and import it into a component, displaying it inside an error banner. Separately, define a static resource named `appIcons` uploaded as a `.zip` containing `icons/warning.svg`, and write the JavaScript that constructs the full URL to that specific file inside the archive. Explain why the label approach, rather than a hardcoded string, matters specifically for an org that operates in more than one language.

## Check yourself

Can you explain what problem Custom Labels solve that a hardcoded string in a template does not? Can you write the exact import syntax for a label named `Welcome_Message` with no namespace? Can you describe how to reach a specific file inside a static resource uploaded as a `.zip` archive?
