# Building Your First Copilot Studio Agent

Time to build one. In this lesson you'll create a real Copilot Studio agent for Castlebridge Logistics — a first pass at the kind of agent you'll finish in this chapter's capstone. You won't connect it to any flows yet; that's Lesson 16. For now, the goal is to get comfortable with the agent creation experience itself: describing what you want, letting Copilot Studio scaffold it, and landing on the Overview page where every agent gets configured.

## What you'll learn

- The two ways to start a new agent: describing it in natural language, or building it blank
- What happens automatically when you describe an agent, and what you still have to configure yourself
- The anatomy of the agent Overview page: details, instructions, knowledge, and triggers
- How to test an agent's responses before you touch a single Power Automate connector

## Starting from a description

The fastest way to create an agent in Copilot Studio is to describe what you want it to do, in your own words, right on the Home page. Castlebridge Logistics' IT team wants a first agent that helps employees and partners understand how Copilot Studio fits into the company's automation stack — a reasonable, low-stakes agent to learn on before building anything that touches live support tickets.

On the Home page, under **Describe what you want to build**, you can type something like: *"Help users understand Microsoft Copilot Studio and how Castlebridge Logistics uses it alongside Power Automate."* The description can run up to 1,024 characters.

![Screenshot of the area on the Copilot Studio Home page where you describe your agent in natural language.](/courses/power-automate-ai-agents/ch03/15-building-your-first-copilot-studio-agent/home-page-describe-your-agent.png)
*Describing an agent in plain language on the Copilot Studio Home page.*

When you submit a description, Copilot Studio's AI generates a starting name, description, and set of instructions for the agent — and it suggests triggers, channels, knowledge sources, and tools it thinks the agent should have. None of these suggestions are permanent until you accept them; you can review each one and add it, dismiss it, or just ignore it. This is a genuine time-saver, but it's also exactly the moment where you need to read carefully rather than click through — an AI-guessed instruction set is a draft, not a finished spec.

If you'd rather skip the natural-language step entirely, you can instead select **Create blank agent**, give it a name, and optionally adjust its primary language, solution, and schema name under **Advanced settings**.

## The Overview page

Whichever path you take, you land on the same place: the agent's **Overview** page. This is the control center for the agent, and you'll return to it constantly throughout this chapter.

![Screenshot of the Overview page for a newly created agent in Copilot Studio, showing the Details, Instructions, and Knowledge sections.](/courses/power-automate-ai-agents/ch03/15-building-your-first-copilot-studio-agent/start-building-your-agent.png)
*The Overview page — Details, instructions, model selection, and knowledge sources all live here.*

From the Overview page you can:

- **Edit Details** — rename the agent, change its description, or give it a distinctive icon (PNG, under 72 KB, max 192×192 pixels).
- **Edit Instructions** — the plain-language guidance that shapes how the agent behaves; up to 8,000 characters. This is the single most important thing you'll write for any agent, and you'll revisit it in nearly every lesson from here on.
- **Select your agent's model** — choose which underlying AI model the agent reasons with.
- **Add Knowledge** — connect documents, websites, or Dataverse tables the agent can draw on when answering.
- **Add triggers and tools** — configure what starts a conversation and what the agent can do once it's in one. You'll add a Power Automate-connected tool here in Lesson 16.

## Testing before you build anything else

Every agent you create gets a **Test your agent** panel, open by default on the right side of the screen. Before you add a single tool or knowledge source, type a question into it and see how the agent responds using just its instructions. This matters because it establishes a baseline: once you start layering on tools, knowledge, and flows in later lessons, you'll want to know whether a weird response is coming from a bad instruction, a missing knowledge source, or a tool misfiring — and you can only tell the difference if you know what the agent does with nothing attached.

Ask it something straightforward, like "What is Copilot Studio?" Check whether the response matches the tone and scope you described. If it doesn't, edit the instructions on the Overview page, save, and ask again — the test panel updates in real time against your latest saved changes.

## Key terms

- **Overview page** — the agent's main configuration screen: details, instructions, model, knowledge, and triggers
- **Instructions** — the plain-language guidance (up to 8,000 characters) that shapes how an agent behaves
- **Knowledge source** — a document, website, or Dataverse table an agent can draw on to answer questions
- **Test panel** — the built-in chat window used to try out an agent's responses before publishing
- **Create blank agent** — the manual path to agent creation, as an alternative to describing it in natural language
