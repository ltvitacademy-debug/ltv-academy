# Introduction to AI Builder

Chapter 1 gave you the mechanics of a flow: triggers, actions, conditions, HTTP calls, and Parse JSON. Every one of those actions moved or reshaped data exactly the way you told it to. AI Builder is where that changes. It's Microsoft Power Platform's layer of AI models — some ready to use immediately, some you train yourself — that you can drop into a flow as an action, so a step in your automation can read a document, judge a sentiment, or generate text instead of just copying a field from one place to another. This lesson is your map of what AI Builder actually is before you wire it into anything.

Our example company for this chapter, **Castlebridge Logistics**, receives dozens of delivery confirmations, invoices, and customer emails every day. Right now a dispatcher reads every one by hand. AI Builder is the piece that lets a flow do that reading instead.

## What you'll learn

- What AI Builder is, and where it sits relative to Power Automate and Power Apps
- The difference between a *prebuilt* model and a *custom* model
- The main model categories you'll use in this chapter: document processing, text/image classification, and prompts
- Where to find and add an AI Builder action inside a flow

## What AI Builder actually is

AI Builder is a Power Platform feature, not a separate product you sign up for. It lives inside the same environment as your flows and apps, and it exposes AI models as things you can call — the same way an HTTP action calls an API, except AI Builder already built the API call, the authentication, and the response shape for you. Under the hood, several AI Builder capabilities (prompts, text generation, document understanding) are powered by Azure AI services, including Azure OpenAI — you'll go one layer deeper into that relationship in Lesson 12.

From the Power Automate side, you reach AI Builder through **AI hub**, reachable from the left-hand navigation in make.powerautomate.com. AI hub is the catalog: every model you can explore, try, train, or drop into a flow lives there.

## Prebuilt models vs. custom models

Every AI Builder model falls into one of two buckets:

- **Prebuilt models** are ready the moment you open AI Builder. Microsoft already trained them on general data — things like sentiment analysis, business card reading, receipt processing, or generating a plain-language description of an image. You don't train these; you just call them.
- **Custom models** you train on your own data. A document processing model trained on Castlebridge Logistics' specific delivery-confirmation layout is a custom model — nobody else's data taught it what a Castlebridge PDF looks like, you did, with five or more sample documents.

Neither kind requires you to write any machine learning code. Training a custom model is a guided wizard: you upload samples, tag the fields you want extracted or the categories you want recognized, and AI Builder runs the training job.

## The model categories you'll meet in this chapter

AI Builder's catalog is large, but this chapter only needs three categories of it:

- **Document processing** (Lesson 8) — extract specific fields, tables, and checkboxes out of PDFs, scanned forms, and invoices.
- **Classification** (Lesson 9) — put text or images into categories: a support email is "billing" or "scheduling," a photo is "damaged pallet" or not.
- **Prompts** (Lessons 10–12) — send text or a document to a generative AI model and get back a written response, a summary, or structured JSON, instead of a fixed category or extracted field.

![The AI hub Explore screen in Power Automate, showing the catalog of AI Builder model categories available to try or build.](/courses/power-automate-ai-agents/ch02/07-introduction-to-ai-builder/ai-hub-explore.png)
*This is the starting point for every AI Builder model in this chapter — prebuilt and custom alike, all cataloged in one place.*

## Where the action lives inside a flow

Once a model exists — prebuilt, or your own trained and published custom model — you add it to a flow exactly like any other action. Inside the flow designer, search the action picker for **AI Builder**, or search by the action's specific name (for example, **Process documents**, or **Run a prompt**). The action slots into your flow between a trigger and the rest of your steps, takes the same kind of inputs you've been wiring since Chapter 1 (a file, a string, dynamic content from an earlier step), and returns outputs you can reference in everything downstream — fields, confidence scores, category labels, or generated text, depending on the model.

That's the whole shape of it: a model is just another action, with AI instead of fixed logic deciding what the output is.

## Key terms

- **AI Builder** — the Power Platform feature that exposes AI models as actions you can use in flows and apps
- **AI hub** — the in-product catalog where you explore, try, and build AI Builder models
- **Prebuilt model** — a ready-to-use model trained by Microsoft; no training required
- **Custom model** — a model you train yourself on your own sample data
- **Model category** — the kind of task a model performs (document processing, classification, prompts, and others)
