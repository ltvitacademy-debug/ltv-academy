# Lesson 12 — Lightning Message Service

**Chapter 2 · Connecting Components · Lesson 12 of 33**

## What you'll learn

- Why parent/child events and `@api` properties stop being enough for unrelated components
- What a Lightning Message Channel is and how to define one
- The core Lightning Message Service API: `createMessageContext`, `publish`, `subscribe`, `unsubscribe`
- Why an LMS subscription must be released, and where that cleanup belongs

## When events and @api aren't enough

Events (Lesson 9–11) work great between a parent and a direct child. But what about two components that aren't related at all in the component tree — say, an LWC inside a Lightning record page's highlights panel needing to talk to a completely separate LWC inside a utility bar item, or an LWC communicating with an Aura component or a Visualforce page embedded elsewhere on the page? Chaining events through every intermediate layer, or an Apex/Aura component with no layer to chain through at all, isn't practical. **Lightning Message Service (LMS)** exists specifically for this case: components anywhere on the page — LWC, Aura, or Visualforce — can publish and subscribe to a shared channel without needing any parent-child relationship.

## Defining a message channel

A Lightning Message Channel is its own metadata type, defined in a `.messageChannel-meta.xml` file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<LightningMessageChannel xmlns="http://soap.sforce.com/2006/04/metadata">
    <masterLabel>RecordSelected</masterLabel>
    <isExposed>true</isExposed>
    <description>Published when a user selects a record in any component on the page.</description>
    <lightningMessageFields>
        <fieldName>recordId</fieldName>
        <description>The Id of the selected record.</description>
    </lightningMessageFields>
</LightningMessageChannel>
```

Once deployed, its API name gets a `__c` suffix, and components import it as a scoped module: `import RECORD_SELECTED_CHANNEL from '@salesforce/messageChannel/RecordSelected__c';`.

## Publishing a message

```js
import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import RECORD_SELECTED_CHANNEL from '@salesforce/messageChannel/RecordSelected__c';

export default class AccountTile extends LightningElement {
    @wire(MessageContext)
    messageContext;

    handleClick() {
        publish(this.messageContext, RECORD_SELECTED_CHANNEL, {
            recordId: this.accountId
        });
    }
}
```

Wiring `MessageContext` (rather than calling `createMessageContext()` manually) is the simpler option when a component only needs to publish or subscribe for as long as it's on the page, because the wire service manages the context's lifecycle automatically.

## Subscribing to a message

```js
import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import RECORD_SELECTED_CHANNEL from '@salesforce/messageChannel/RecordSelected__c';

export default class RecordDetailPanel extends LightningElement {
    @wire(MessageContext)
    messageContext;

    subscription = null;

    connectedCallback() {
        this.subscription = subscribe(
            this.messageContext,
            RECORD_SELECTED_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleMessage(message) {
        this.selectedRecordId = message.recordId;
    }
}
```

## Why cleanup matters

A subscription that's never released keeps listening even after the component that created it is gone, which can mean duplicate handling of messages or memory that never gets released. The fix is always the same: subscribe in `connectedCallback()`, unsubscribe in `disconnectedCallback()` (Lesson 14 covers both hooks in full) — the lifecycle pairing guarantees a subscription's lifetime matches the component's own. If a component instead calls `createMessageContext()` directly rather than wiring `MessageContext`, it's also responsible for calling `releaseMessageContext()` on that same context in `disconnectedCallback()`, which releases every subscription made against it in one call.

## Key terms

| Term | Meaning |
|---|---|
| Lightning Message Service (LMS) | The service for passing messages between unrelated components on the same page |
| Lightning Message Channel | The metadata-defined, named channel components publish to and subscribe from |
| `publish` | Sends a message on a given channel to every current subscriber |
| `subscribe` / `unsubscribe` | Registers and removes a listener for messages on a channel |
| `MessageContext` | A wire adapter providing a message context whose lifecycle is managed automatically |

## Lab

Design a `RecordSelected` message channel with one field, `recordId`. Write a publisher component `contactTile` that publishes when clicked, and a subscriber component `detailPanel` that subscribes in `connectedCallback()` and unsubscribes in `disconnectedCallback()`. Explain, in writing, why these two components do not need any parent-child relationship for this to work — unlike the pattern from Lessons 10 and 11.

## Check yourself

Can you explain what specific communication problem Lightning Message Service solves that custom events cannot? Can you name the two lifecycle hooks where a subscription should be created and released? Can you describe what a Lightning Message Channel's `.messageChannel-meta.xml` file actually defines?
