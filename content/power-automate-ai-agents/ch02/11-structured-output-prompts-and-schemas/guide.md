# Structured Output: Prompts and JSON Schemas

A Teams message with a two-sentence summary, from Lesson 10, is perfect for a human to read. It's useless to a flow that needs to act on individual pieces of that answer — a shipment ID, a due date, three line items — the way Chapter 1's Parse JSON action needs a predictable shape to work with at all. AI Builder's prompt builder solves this with a **JSON output** mode: instead of free text, the model's response comes back as JSON matching a format you define, ready for exactly the kind of downstream processing you already know from HTTP actions and Parse JSON.

## What you'll learn

- Why free text breaks down once a flow needs to act on individual values
- How to switch a prompt's output from text to JSON, and define the format
- Auto-detected format vs. custom format, and when to use each
- How a JSON-output prompt's result flows into the rest of a cloud flow

## Why JSON output exists

Picture a prompt that reads an incoming Castlebridge shipment email and is supposed to answer three questions at once: what's the shipment ID, what's the requested delivery date, and is this urgent? A text response has to awkwardly pack all three answers into one paragraph, and then you'd need a second step just to tease them back apart. JSON output skips that: the prompt returns `{"shipmentId": "...", "requestedDate": "...", "urgent": true}` directly, and each key becomes dynamic content on its own, immediately.

## Selecting JSON as the output

Inside the prompt builder, the output type is a toggle in the top-right corner of the prompt editor — switch it from **Text** to **JSON**.

![The output selector in AI Builder's prompt builder, with Text and JSON options.](/courses/power-automate-ai-agents/ch02/11-structured-output-prompts-and-schemas/select-json-output.png)
*One toggle changes the entire shape of what the prompt hands back to your flow.*

## Auto-detected format vs. custom format

Once JSON is selected, you choose how the format is defined:

- **Auto-detected** — every time you test the prompt, AI Builder infers the JSON shape from what the model actually returned. Convenient while you're still iterating on the wording of your instructions.
- **Custom** — you provide your own JSON example, and the format locks to it. The format then never silently changes, even if you keep tweaking the prompt's instructions afterward.

Editing the JSON example switches the format from auto-detected to custom automatically. At any point, you can inspect the actual schema AI Builder generated from your example — though you can't hand-edit that schema directly, only the JSON example it's generated from.

![A custom JSON format being defined in the prompt builder, from a sample JSON structure.](/courses/power-automate-ai-agents/ch02/11-structured-output-prompts-and-schemas/custom-json-format.png)
*For a Castlebridge shipment-triage prompt, a custom format locks in exactly {"shipmentId", "requestedDate", "urgent"} — no surprises later.*

For anything you're going to depend on in production — like Lesson 13's end-to-end document flow — prefer **custom** format. Auto-detect is great for exploring; it's the wrong choice once a flow downstream is written against specific key names.

## Using JSON output inside a flow

A prompt saved with JSON output still gets called with the same **Run a prompt** action from Lesson 10. The difference shows up in what you get back: instead of one `Text` variable, you get dynamic content for each key in your JSON format, individually selectable in later actions — no separate Parse JSON step required, because AI Builder already parsed it for you.

![A 'Run a prompt' action's parameters inside a flow, with the JSON-output prompt's individual fields available as dynamic content.](/courses/power-automate-ai-agents/ch02/11-structured-output-prompts-and-schemas/prompt-parameters-in-flow.png)
*Each field from the JSON format — not just one block of text — is its own piece of dynamic content for the rest of the flow.*

If the model's response doesn't come back as valid JSON, the action surfaces an error rather than silently handing you garbage — the most common cause is the model wrapping its answer in markdown code fences, which an explicit instruction like "don't include JSON markdown in your answer" usually fixes.

## Key terms

- **JSON output** — a prompt builder setting that returns the model's response as JSON instead of free text
- **Auto-detected format** — the JSON shape inferred fresh each time you test the prompt
- **Custom format** — a JSON shape you lock in from your own example, immune to prompt wording changes
- **Schema** — the structure AI Builder derives from your JSON example; viewable, not directly hand-editable
