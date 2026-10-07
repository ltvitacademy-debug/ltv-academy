# Building and Using Custom Connectors

Power Automate ships with hundreds of prebuilt connectors, but it will never ship one for every system a business runs internally. Castlebridge Logistics has exactly this problem: its dispatch system — the application its warehouse and transportation teams use to track trucks, drivers, and shipments — is a homegrown API with no connector in the gallery. This lesson walks through how Castlebridge builds a **custom connector** so its flows can talk to that API the same way they'd talk to SharePoint or Outlook.

## What you'll learn

- What a custom connector is, and when you actually need to build one
- The five sections of the custom connector wizard: General, Security, Definition, Code, and Test
- How "Import from sample" turns a real API request and response into a working action, without hand-writing a schema
- How authentication is configured so Power Automate can call a secured API on a user's behalf
- Why you test a connector before any flow is allowed to depend on it

## Why Castlebridge needed a custom connector

A connector is really just a wrapper around an API: it describes the API's host, its authentication, and the actions (and sometimes triggers) it exposes, in a format Power Automate understands. When the API already has a Microsoft-built connector — like SharePoint or Dataverse — you never see any of this. Castlebridge's dispatch system is internal, so nobody has built that wrapper for them. A custom connector lets Castlebridge describe their own API once, in their own Power Platform environment, and then reuse it across every flow that needs it.

## The custom connector wizard: five sections

Custom connectors are created from inside a **solution** (you'll work with solutions directly in Lesson 24), using **New custom connector → Create from blank**. The wizard that opens has five sections, worked through left to right:

- **General** — the connector's icon, description, URL scheme, host, and base URL
- **Security** — the authentication type the API expects (API key, OAuth 2.0, Basic, or none)
- **Definition** — the actions and triggers the connector exposes, including their request and response shapes
- **Code** (optional) — custom C# that can transform a request or response beyond what the codeless definition supports
- **Test** — where you create a real connection and run an actual call before trusting the connector in a flow

![Screenshot of the connector wizard in Power Automate, showing the General, Security, Definition, Code, and Test tabs.](/courses/power-automate/ch02/22-building-custom-connectors/new-connector-info.png)
*The custom connector wizard, open on a new connector — the five tabs run along the bottom of the screen.*

Castlebridge's dispatch API uses an API key, so on the Security tab they select **API Key**, give it a label like "Dispatch API Key," and set the parameter name and location (a header, in this case) to match exactly what the API expects.

## Defining the action: Import from sample

The Definition tab is where the real work happens, but you don't hand-write a schema. Castlebridge selects **New action**, fills in a summary, description, and operation ID, then — instead of typing out parameters one by one — selects **Import from sample** and pastes in a real request and response from the dispatch API:

```
POST /api/dispatch/shipments/lookup
{
  "shipmentId": "CL-10452",
  "driverId": "D-118",
  "status": "In Transit"
}
```

The wizard reads that sample and automatically creates `shipmentId`, `driverId`, and `status` as named, typed parameters — the same fields a flow author will later see and fill in like any built-in action. Castlebridge can then open each parameter and set a friendlier title, description, and default value.

## Testing before you build on it

A connector isn't trustworthy until it's actually called the real API. On the Test tab, Castlebridge creates a new connection with a live API key, then runs the action. The response comes back exactly like a real result from the dispatch system — not a guess at what the schema should produce.

![Screenshot of the connector response after testing an operation.](/courses/power-automate/ch02/22-building-custom-connectors/connector-response.png)
*A successful test call — the actual JSON the dispatch API returned, which confirms the connector is ready to use.*

Once a connector passes its test, it behaves exactly like any gallery connector inside the flow designer: searchable, with typed inputs and outputs, ready to drop into a flow.

## Key terms

- **Custom connector** — a Power Platform wrapper around an API that has no prebuilt connector
- **Operation ID** — the unique internal name of an action or trigger inside a connector's definition
- **Import from sample** — a wizard feature that builds request/response parameters from a real example instead of a hand-written schema
- **API key authentication** — an authentication type where a secret key, sent in a header or query parameter, proves the caller's identity
- **Test tab** — the section of the wizard where a real connection is created and a real call is run before the connector is trusted in a flow
