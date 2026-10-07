# Script — Working with JSON: Parse JSON and Compose

## Segment 1 (title)

When Castlebridge's flow calls Meridian TrackAPI, what comes back is one block of raw JSON text, not fields you can drop into an email. This lesson covers the two actions that turn that text into something a flow can actually use: Parse JSON and Compose.

## Segment 2 (code)

Here's a typical response — a shipment ID, a status, an ETA, and a latitude and longitude. To Power Automate, none of that is structured yet. It's just a string. You can't click "status" as dynamic content until something tells the flow that status exists.

## Segment 3 (screenshot)

That something is Parse JSON, right here in the real designer. You give it the content to parse and a schema describing what's inside, and from that point on, every field in the schema becomes clickable dynamic content, exactly like a field from SharePoint or Outlook.

## Segment 4 (code)

You almost never write that schema by hand. You take one real sample response and use "Use sample payload to generate schema," and Power Automate builds this automatically — matching every field's name and type. If a field your flow depends on ever disappears from Meridian's response, Parse JSON throws an error instead of failing silently.

## Segment 5 (steps)

Compose does something different. It doesn't parse anything — it just evaluates one expression and holds the result so you can inspect it. Teams use it to debug a tricky expression before wiring it in for real, or to build one reusable value instead of retyping the same expression five times.

## Segment 6 (outro)

Every one of these calls — the HTTP action, Parse JSON, all of it — has to prove to Meridian who's asking. That's authentication, and it's exactly where we're headed next.
