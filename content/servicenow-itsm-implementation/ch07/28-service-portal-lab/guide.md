# Lesson 28 — Service Portal Lab

**Chapter 7 · Service Portal & End-User Experience · Lesson 28 of 32**

## What you'll learn

- How to plan a real widget's four parts before writing any code
- A complete, working Server Script that queries `sc_req_item` for the logged-in caller
- A complete HTML Template that renders each item as a status-colored card with `ng-repeat`
- CSS that gives each card a status-color left border using a class bound from the data
- A Client Controller that handles a "View Details" click and navigates to the item's page

## The scenario

Your Service Desk wants a "My Open Requests" widget for the portal Homepage built in Lesson 26, using the widget structure from Lesson 27. Requirement, from the stakeholder: a caller should see their own Requested Items (`sc_req_item`), most recent first, each shown as a card with a colored left border matching its state, and a "View Details" button that opens that item's page. This is exactly the kind of small, self-contained widget an implementer builds constantly — we'll build all four parts, in the order Lesson 27 recommended: Server Script, then HTML Template, then CSS, then Client Controller.

## Step 1 — Server Script: query sc_req_item for the current user

```javascript
// Server Script
(function() {
  data.items = [];

  var gr = new GlideRecord('sc_req_item');
  gr.addQuery('request.requested_for', gs.getUserID());
  gr.addQuery('active', true);
  gr.orderByDesc('sys_created_on');
  gr.setLimit(10);
  gr.query();

  while (gr.next()) {
    var state = gr.getValue('state');
    data.items.push({
      sys_id: gr.getUniqueValue(),
      number: gr.getValue('number'),
      short_description: gr.getValue('short_description'),
      state_label: gr.getDisplayValue('state'),
      state_class: stateToClass(state)
    });
  }

  function stateToClass(state) {
    // sc_req_item state values: 1=Open, 2=Work in Progress, 3=Closed Complete, 4=Closed Incomplete
    var map = { '1': 'state-open', '2': 'state-wip', '3': 'state-complete', '4': 'state-incomplete' };
    return map[state] || 'state-open';
  }
})();
```

Two implementation details matter here. First, the query filters on `request.requested_for`, a **dot-walk** through the parent Request record to the field that actually holds who asked for the item — `sc_req_item` itself doesn't store a requester directly. Second, the script computes `state_class` **server-side**, translating the raw numeric state value into a CSS class name, rather than pushing the raw `state` number to the client and asking the HTML Template to branch on it — keeping that logic in the Server Script means the mapping lives in one place.

## Step 2 — HTML Template: cards with ng-repeat

```html
<div class="my-requests-widget">
  <h3>My Open Requests</h3>
  <div class="request-card {{item.state_class}}"
       ng-repeat="item in c.data.items">
    <div class="request-card-body">
      <strong>{{item.number}}</strong>
      <span>{{item.short_description}}</span>
      <span class="request-state">{{item.state_label}}</span>
    </div>
    <button class="btn btn-sm btn-default"
            ng-click="c.viewDetails(item)">
      View Details
    </button>
  </div>
  <p ng-if="c.data.items.length === 0">You have no open requests.</p>
</div>
```

`ng-repeat` loops the `.request-card` once per item, and `{{item.state_class}}` interpolates straight into the `class` attribute — this is the line that connects the server-computed CSS class to an actual rendered class on the page. `ng-if` hides the empty-state message unless the array is genuinely empty.

## Step 3 — CSS: a status-color left border per card

```css
.request-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  margin-bottom: 8px;
  border-left: 4px solid #ccc;
  background: #fff;
}

.request-card.state-open {
  border-left-color: #2e86de; /* blue: newly opened */
}

.request-card.state-wip {
  border-left-color: #f0a500; /* amber: in progress */
}

.request-card.state-complete {
  border-left-color: #2ecc71; /* green: closed complete */
}

.request-card.state-incomplete {
  border-left-color: #e74c3c; /* red: closed incomplete */
}
```

Because the HTML Template already renders `class="request-card {{item.state_class}}"`, each card automatically picks up one of these four border colors the moment the page renders — no client-side JavaScript has to decide the color; the CSS selector does it from the class name the Server Script already computed.

## Step 4 — Client Controller: handling "View Details"

```javascript
// Client Controller
function($scope, spNavigator) {
  var c = this;

  c.viewDetails = function(item) {
    spNavigator.openPage('ticket', null, { sys_id: item.sys_id, table: 'sc_req_item' });
  };
}
```

`c.viewDetails`, called by the HTML Template's `ng-click="c.viewDetails(item)"`, hands `spNavigator` the Requested Item's `sys_id` and its table name, so it opens that specific item's detail page inside the portal rather than, say, the generic Incident ticket page.

## Putting it together

Server Script decides *what* data exists and pre-computes the CSS class; HTML Template decides *how* it's structured and looped; CSS decides *what color* each state renders as; Client Controller decides *what happens* on a click. That four-way split — data, structure, style, behavior — is the same split every Service Portal widget uses, no matter how simple or complex.

## Key terms

| Term | Meaning |
|---|---|
| Dot-walk | Querying a field on a related record through the reference field, e.g. `request.requested_for` from `sc_req_item` |
| `state_class` | A CSS class name computed server-side from a raw state value, so the client never has to branch on numeric states |
| `ng-if` | The AngularJS directive that removes an element from the rendered page when its expression is false |
| Status-color border | A UI pattern where a card's left border color encodes its record's state, driven by a bound CSS class |

## Check yourself

You're ready for Capstone Kickoff when you can explain, without looking: why does the Server Script compute `state_class` itself instead of sending the raw numeric `state` value to the HTML Template, and what does the dot-walk `request.requested_for` actually query?
