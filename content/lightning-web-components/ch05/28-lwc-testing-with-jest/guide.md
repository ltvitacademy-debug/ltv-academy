# Lesson 28 — LWC Testing With Jest

**Chapter 5 · Testing and Delivery · Lesson 28 of 33**

## What you'll learn

- Why LWC unit tests run against Jest, not inside a real Salesforce org
- The `@salesforce/sfdx-lwc-jest` setup and the `__tests__` folder convention
- The standard pattern: `createElement`, append to `document.body`, query the shadow DOM, assert
- Why cleaning up after each test matters

## Tests run locally, not in an org

LWC component tests run entirely outside of Salesforce, in a local or CI JavaScript environment powered by **Jest**, using the `@salesforce/sfdx-lwc-jest` package to provide Salesforce-specific mocks (for things like `@salesforce/apex` imports) that wouldn't otherwise resolve outside a real org. This matters practically: these tests are fast, don't need a live org or an internet connection, and are exactly the kind of test that belongs in a CI pipeline running on every commit, well before a deploy. A test file lives inside a component's `__tests__` folder (Lesson 5) and is never deployed to an org — it's purely for local and CI use.

## The standard test shape

```js
// __tests__/helloWorld.test.js
import { createElement } from 'lwc';
import HelloWorld from 'c/helloWorld';

describe('c-hello-world', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders the default greeting', () => {
        const element = createElement('c-hello-world', { is: HelloWorld });
        document.body.appendChild(element);

        const paragraph = element.shadowRoot.querySelector('p');
        expect(paragraph.textContent).toBe('Hello, World!');
    });
});
```

Four steps repeat across nearly every LWC test:

1. **`createElement`**, imported from `lwc` itself (not from the component), creates an instance of the component for testing, given its tag name and the imported class via the `is` option.
2. **`document.body.appendChild(element)`** actually connects the component so it renders — nothing is rendered until it's attached to the DOM, same rule as in a real app.
3. **Query through `element.shadowRoot.querySelector(...)`**, not `document.querySelector`, because the component renders into its own shadow DOM — the same encapsulation rule from Lesson 3 applies inside tests.
4. **Assert** on whatever the query found, using Jest's `expect(...)` matchers.

## Setting @api properties and asserting reactivity

Because `@api` properties are just properties on the created element, a test can set one directly and then check the result after the next render:

```js
it('displays the name passed in as a property', () => {
    const element = createElement('c-contact-card', { is: ContactCard });
    element.contactName = 'Ada Lovelace';
    document.body.appendChild(element);

    return Promise.resolve().then(() => {
        const nameEl = element.shadowRoot.querySelector('.name');
        expect(nameEl.textContent).toBe('Ada Lovelace');
    });
});
```

The `Promise.resolve().then(...)` pattern gives the framework a microtask tick to finish rendering before the assertion runs — a common need since rendering isn't always synchronous with a property assignment.

## Cleanup matters

Without the `afterEach` cleanup shown above, elements from one test can linger in `document.body` into the next test, causing `querySelector` to match the wrong element or tests to interfere with each other unpredictably. Clearing `document.body` after every test is close to mandatory boilerplate in LWC Jest suites, not an optional nicety.

## Key terms

| Term | Meaning |
|---|---|
| Jest | The JavaScript test runner LWC unit tests run on, entirely outside a Salesforce org |
| `@salesforce/sfdx-lwc-jest` | The package providing Salesforce-specific mocks needed for LWC components to run under Jest |
| `createElement` | The `lwc`-module function that instantiates a component for testing |
| `element.shadowRoot.querySelector` | How a test reaches into a rendered component's own shadow DOM |

## Lab

Write a Jest test for a hypothetical `counterDisplay` component with an `@api startValue` property and a button that increments an internal `count` field, displayed in a `<p class="count">`. Test that setting `startValue` to `5` and appending the element results in the count paragraph showing `5`. Explain why the test needs the `Promise.resolve().then(...)` pattern (or an equivalent) rather than asserting immediately after `appendChild`.

## Check yourself

Can you list, in order, the four steps common to nearly every LWC Jest test? Can you explain why a test queries through `element.shadowRoot` instead of `document` directly? Can you explain what would likely go wrong across multiple tests if the `afterEach` cleanup were removed?
