# Script — Building and Using Custom Connectors

## Segment 1 (title)

Castlebridge Logistics runs its own dispatch system, and there's no prebuilt connector for it anywhere in the Power Automate gallery. In this lesson, you'll build a custom connector so Castlebridge's flows can call that system directly, the same way they'd call SharePoint or Outlook.

## Segment 2 (steps)

Every custom connector is built through a wizard with four sections you actually need. General holds the icon, description, and the API's host address. Security sets the authentication type — Castlebridge's dispatch API uses an API key. Definition is where you describe the actions the connector can call. And Test lets you run a real call before any flow is allowed to depend on it.

## Segment 3 (screenshot)

This is the wizard itself, open on a new connector. Notice the tabs running along the bottom — General, Security, Definition, Code, and Test. You move through them left to right, and each one has to pass validation before you move on.

## Segment 4 (code)

To define an action, you don't hand-write a schema. You select Import From Sample, paste in a real request and response from the dispatch API, and the wizard builds the parameters for you. Here, Castlebridge imports a shipment lookup, and shipmentId, driverId, and status all become named fields automatically.

## Segment 5 (screenshot)

Before Castlebridge points a single flow at this connector, someone opens the Test tab, creates a connection with a real API key, and runs the call. The response comes back exactly like this — an actual result from the dispatch system, not a guess.

## Segment 6 (outro)

With the connector built and tested, it behaves like any other connector in the flow designer. Next, you'll see how Castlebridge breaks a large flow into smaller, reusable child flows.
