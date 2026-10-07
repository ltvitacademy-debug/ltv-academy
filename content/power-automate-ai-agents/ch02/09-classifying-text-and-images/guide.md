# Classifying Text and Images with AI Builder

Not everything that comes into Castlebridge Logistics is a structured document with fields in known places. Customer emails arrive as free-form text — "Where's my shipment," "Your driver damaged my dock," "Please update my billing address." Warehouse staff snap photos of pallets that may or may not show damage. Document extraction, from Lesson 8, assumes you know where the data is on the page. Classification is for the opposite problem: you don't know what you're looking at yet, and the first job is sorting it into a category.

## What you'll learn

- What a category classification model does, and how it differs from document processing
- How to train a custom text classifier on your own categories and sample text
- What AI Builder offers for images: the image description and object detection models
- Where classification output fits in a flow — usually right before a Condition or Switch

## Category classification: sorting text

AI Builder's **category classification** model reads a piece of text and assigns it to one of the categories you defined when you trained it. You train it by providing sample text paired with the category each sample belongs to, stored in a Microsoft Dataverse table — a column of example text, a column of tags. AI Builder learns the pattern between the wording and the category from those pairs.

For Castlebridge, a useful model might sort incoming customer emails into categories like **Billing**, **Delivery Status**, **Damage Claim**, and **Scheduling**. You'd build the training table from a batch of real past emails, each one tagged by hand with the category it actually belongs to, then let AI Builder train on that.

There's also a **prebuilt** category classification model tuned for general customer feedback, with categories like Issues, Compliment, Customer Service, and Price & Billing — usable immediately with no training, if your categories happen to match.

## Where the model fits in a flow

A classification model's single output is a category label (plus a confidence score, same idea as Lesson 8's field extraction). The natural next step in a flow is almost always a **Condition** or **Switch** action keyed on that label — route a "Damage Claim" email to the claims queue, route "Scheduling" to dispatch, and so on. You already built conditional branching in Chapter 1; classification just gives you AI-generated branching logic instead of a fixed rule like "contains the word 'damage'."

## Images: description and classification

AI Builder's image-oriented prebuilt models take a different angle on the same idea. The **image description** model doesn't sort an image into a category you defined — it looks at a photo and generates a plain-language description plus a list of detected tags, with a confidence score on the description itself.

![The 'Generate description of an image' action in a flow, with File Content from the trigger wired into its Image input.](/courses/power-automate-ai-agents/ch02/09-classifying-text-and-images/image-description-action.png)
*Same shape as every other AI Builder action: a file goes in, structured output comes out — here, a description and a list of tags.*

A real example from Microsoft's own documentation: feeding in a photo of a helicopter over a city returns a description like "a helicopter flying over a city" with a confidence score, and tags like `["building", "outdoor", "city"]`. For Castlebridge, the same action pointed at a warehouse photo could generate tags you then check with a Condition — if the tag list contains something like "damage" or "debris," route the photo for review. AI Builder also offers an **object detection** custom model category, which you can train on your own labeled images when you need something more specific than a general description, such as spotting a particular damaged-pallet pattern.

## Key terms

- **Category classification** — an AI Builder model that sorts text into categories you define and train it on
- **Prebuilt category classification** — a ready-to-use text classifier tuned for general customer feedback categories
- **Image description** — a prebuilt model that generates a description and tags for an image
- **Object detection** — a custom model category for recognizing specific objects you train it on, in images
