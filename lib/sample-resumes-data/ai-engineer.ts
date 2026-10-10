import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Atlanta, GA", "(404) 555-0182", "john.doe@example.com", "linkedin.com/in/johndoe-biexample"];

export const RESUMES: PathResumes = {
  "job-ready": {
    levelLabel: "Job Ready",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "AI Engineer trained end to end in Python, generative AI and LLM fundamentals, retrieval-augmented generation, " +
      "tool-using agents, and the cloud, deployment, and security practices that take an AI system from a notebook to " +
      "something running in production. Built three flagship projects — a production RAG knowledge assistant, an AI " +
      "data analyst that safely turns plain-English questions into SQL, and a tool-using agent with human approval and " +
      "full audit logging — each shipped as a deployed, containerized service with real evaluation numbers behind it. " +
      "Bringing that build-and-ship approach to an AI Engineer, AI Application Developer, or Generative AI Developer role.",
    skills: [
      "Python for AI Applications (OOP, async I/O, testing, typed code)",
      "LLM APIs & Prompt/Context Engineering (Anthropic Messages API)",
      "Retrieval-Augmented Generation & Vector Databases (Qdrant)",
      "Tool-Calling AI Agents, ReAct Pattern & Human-in-the-Loop Design",
      "AI/ML Foundations (classical ML, neural networks, transformers)",
      "REST APIs & JSON (streaming, function calling, structured output)",
      "Cloud AI Deployment (Azure AI Foundry, Azure OpenAI Service)",
      "Containerization & Deployment (Docker, FastAPI)",
      "AI Security, Evaluation & Monitoring",
      "Version Control (Git/GitHub) & CI/CD (GitHub Actions)",
    ],
    tools: "Python, Anthropic Claude (Messages API), Qdrant, LangChain text splitters, FastAPI, Docker, Azure AI Foundry, Git/GitHub, GitHub Actions",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "AI Engineer Track · Atlanta, GA",
            bullets: [
              "Completed an intensive, project-based apprenticeship covering Python, Git/GitHub workflows, REST APIs, classical ML/deep learning foundations, generative AI and LLMs, prompt and context engineering, retrieval-augmented generation, AI agents, cloud AI deployment, containerization, and AI security/evaluation — no prior programming assumed at the start.",
              "Wrote Python for AI applications: classes and dataclasses for a class-based API client wrapper, virtual environments and dependency management, the requests library with authentication headers and rate-limit handling, and async/await with asyncio for calling multiple AI APIs concurrently.",
              "Practiced Git and GitHub as a working developer workflow — branches, merge vs. rebase, resolving a real merge conflict, pull requests with inline code review, the forking workflow, annotated tags and releases, and .gitignore hygiene — then automated it with GitHub Actions running tests on every push and a deploy job gated to real merges on main.",
              "Built REST API fluency: HTTP methods and status codes, JSON Schema, and the specific shapes AI provider APIs use — streaming responses, function/tool-calling schemas, and structured JSON output — then designed a reusable, retrying API client class around them.",
              "Covered AI/ML foundations without skipping the mechanics: supervised vs. unsupervised learning, train/validation/test splits, neural networks and backpropagation at an intuitive level, why transformers changed the field, and using pretrained models from the Hugging Face ecosystem.",
              "Learned how large language models actually work — tokenization, embeddings, next-token prediction, context windows — and worked directly with LLM chat completion APIs: system/user/assistant roles, temperature and sampling, streaming, function/tool calling, and JSON-mode structured output.",
              "Treated prompting as an engineering discipline: zero-shot vs. few-shot design, system prompts, chain-of-thought and role-based prompting, context-window budgeting and compression, and building a hand-written prompt eval set for automated and regression testing instead of judging prompts by feel.",
              "Built a full RAG pipeline from first principles: embeddings and similarity metrics, vector database concepts and indexing (HNSW/IVF) in Qdrant, chunking and chunk-size trade-offs, the retrieval and re-ranking steps, citation/source attribution, and measuring quality with retrieval recall@k and an LLM-as-judge pass instead of eyeballing answers.",
              "Designed tool-calling AI agents: the plan/act/observe agent loop, writing detailed tool schemas with explicit risk tiers, the ReAct pattern, multi-tool orchestration and routing, human-in-the-loop approval checkpoints on irreversible actions, audit logging for every tool call and decision, and guardrails against runaway agents, cost overruns, and prompt injection.",
              "Deployed AI services to the cloud: Azure AI Foundry and the Azure OpenAI Service, deploying a model endpoint, Azure AI Search for RAG, content-safety/moderation APIs, cost and usage monitoring, plus working awareness of AWS Bedrock and Google Vertex AI as alternatives.",
              "Containerized AI applications with Docker — writing a Dockerfile, managing dependencies and secrets through environment variables (never baked into an image), multi-stage builds, and deploying to a cloud container service with rollback and autoscaling strategies in mind.",
              "Practiced the production-readiness layer specific to AI systems: prompt injection and jailbreaking risks, building eval datasets and automated eval metrics (accuracy, relevance, faithfulness), red-teaming a system against its own documents, logging AI inputs/outputs responsibly, and the bias, privacy, and compliance basics that come with putting a model in front of real users.",
              "Practiced the broader software delivery lifecycle — Agile/Scrum/Kanban, sprints and user stories, and Dev/QA/UAT/Production environments — through a Scrum/Kanban-based project simulation, so every build above shipped the way a real engineering team actually ships work.",
              "Built three flagship capstone projects — a production RAG knowledge assistant, an AI data analyst over a real SQL database and a live external API, and a tool-using agent with human approval — then wrote action + artifact + framework resume bullets and rehearsed a portfolio walkthrough and common AI engineer/system-design interview questions for each one.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Production RAG Knowledge Assistant — Capstone Project 1",
            right: "2026",
            sub: "Lifting the Veil IT Academy, AI Engineer Apprenticeship Program",
            bullets: [
              "Built and deployed a production-pattern RAG knowledge assistant over a real, 500+ page open-source documentation set, using recursive, overlap-aware chunking (langchain_text_splitters) and a Qdrant vector database for similarity search.",
              "Built the retrieval-and-generation step as a function that embeds a question, retrieves the top-k chunks from Qdrant, and generates a cited answer with Claude through the Anthropic Messages API, so every answer traces back to a source document.",
              "Built a hand-written, 15-20 question evaluation set and measured retrieval recall@k and an LLM-as-judge quality score instead of judging answers by feel, then tuned chunk size and re-ranking in response to the numbers and recorded the before/after in the README.",
              "Wrapped the pipeline in a minimal FastAPI service and a Dockerfile — API keys passed as environment variables, never baked into the image — so the assistant runs as a real, callable service instead of a notebook.",
            ],
          },
          {
            left: "AI Data Analyst — Capstone Project 2",
            right: "2026",
            sub: "Lifting the Veil IT Academy, AI Engineer Apprenticeship Program",
            bullets: [
              "Designed a natural-language-to-SQL pipeline against a real sales database (orders, customers, products): a schema-aware system prompt, Claude's tool-use feature returning a structured run_sql_query call instead of parsed-out text, and a pre-execution validator rejecting anything but a single read-only SELECT.",
              "Connected to the database through a dedicated, least-privilege read-only role with parameterized queries, a statement timeout, and a hard row cap — so a wrong query could return bad results but never do damage.",
              "Added a second tool (get_exchange_rate) so Claude could enrich a SQL result with a live currency lookup for questions the database alone couldn't answer, with retry/backoff on rate-limited calls and deduplicated lookups to avoid an N+1 call pattern.",
              "Packaged a short demo script and walkthrough covering three to five real test questions that exercise the database alone and the database-plus-API path together.",
            ],
          },
          {
            left: "Tool-Using Agent With Human Approval — Capstone Project 3",
            right: "2026",
            sub: "Lifting the Veil IT Academy, AI Engineer Apprenticeship Program",
            bullets: [
              "Built a two-tool agent — a read-only look_up_order tool and a higher-risk issue_refund tool — with real Messages API tool schemas and an explicit, design-time risk tier on each tool deciding whether it requires human approval.",
              "Built a human-approval checkpoint that pauses before issue_refund ever executes, and an independent validation step that re-derives the refund amount from the order record itself rather than trusting the model's claim, so a reviewer never sees a pending request with a bad number.",
              "Added full audit logging of every tool call, its validation result, its approval decision, and its outcome — including rejected and failed-validation attempts, not just successful runs.",
              "Deployed the agent as a containerized service with a Dockerfile, moving pending approvals and the audit log out of in-memory state and into durable storage so neither is lost on a container restart.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/johndoe-biexample/ai-engineer-capstones",
            right: "2026",
            sub: "Public portfolio repository, built against the Git & GitHub for Software Engineers capstone brief",
            bullets: [
              "Ran a real repository through a real GitHub workflow: a meaningful, reviewable commit history, a feature branch merged back through a pull request with an inline review comment addressed by a follow-up commit, and one deliberate merge conflict created and actually resolved.",
              "Documented a deliberate branching-strategy choice (Git Flow vs. trunk-based) in the README for a project of this size, tagged an annotated release (v1.0.0), and wrote a .gitignore that excluded dependencies, build output, and editor noise from the first commit.",
              "Added a .github/workflows/ GitHub Actions pipeline that runs the project's real validation checks on every push and pull request, with a separate deploy job gated by github.event_name and github.ref so it only fires on a real merge to main.",
            ],
          },
        ],
      },
      {
        heading: "Education",
        entries: [{ left: "High School Diploma — Washington High School", right: "Atlanta, GA · 2020" }],
      },
    ],
  },
  advanced: {
    levelLabel: "Advanced",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "AI Engineer trained through a two-stage program spanning the core AI engineering stack — Python, LLMs, RAG, " +
      "agents, cloud deployment, and security/evaluation — plus Power Automate as an enterprise orchestration layer on " +
      "top of it: AI Builder document intelligence, Copilot Studio agents with generative orchestration, and " +
      "human-in-the-loop approval gates around any AI-proposed action that can't be easily undone. Comfortable building " +
      "an AI system and the governance layer that lets a business trust it running unattended. Bringing that " +
      "build-and-orchestrate approach to an AI Engineer, AI Automation Engineer, or Generative AI Developer role.",
    skills: [
      "Python for AI Applications (OOP, async I/O, testing, typed code)",
      "LLM APIs & Prompt/Context Engineering (Anthropic Messages API)",
      "Retrieval-Augmented Generation & Vector Databases (Qdrant)",
      "Tool-Calling AI Agents, ReAct Pattern & Human-in-the-Loop Design",
      "AI/ML Foundations (classical ML, neural networks, transformers)",
      "REST APIs & JSON (streaming, function calling, structured output)",
      "Cloud AI Deployment (Azure AI Foundry, Azure OpenAI Service)",
      "Containerization & Deployment (Docker, FastAPI)",
      "AI Security, Evaluation & Monitoring",
      "Enterprise AI Orchestration (Power Automate, AI Builder, Copilot Studio)",
      "Human-in-the-Loop Approval Workflows & Governance",
      "Version Control (Git/GitHub) & CI/CD (GitHub Actions)",
    ],
    tools:
      "Python, Anthropic Claude (Messages API), Qdrant, LangChain text splitters, FastAPI, Docker, Azure AI Foundry, " +
      "Power Automate, AI Builder, Copilot Studio, Azure AI Services, Git/GitHub, GitHub Actions",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "AI Engineer Track (Job Ready) + Power Automate AI Agents Specialization (Advanced) · Atlanta, GA",
            bullets: [
              "Completed an intensive, project-based apprenticeship covering Python, Git/GitHub workflows, REST APIs, classical ML/deep learning foundations, generative AI and LLMs, prompt and context engineering, retrieval-augmented generation, AI agents, cloud AI deployment, containerization, AI security/evaluation, and Power Automate as an orchestration layer for AI — no prior programming assumed at the start.",
              "Wrote Python for AI applications: classes and dataclasses for a class-based API client wrapper, virtual environments and dependency management, the requests library with authentication headers and rate-limit handling, and async/await with asyncio for calling multiple AI APIs concurrently.",
              "Practiced Git and GitHub as a working developer workflow — branches, merge vs. rebase, resolving a real merge conflict, pull requests with inline code review, the forking workflow, annotated tags and releases, and .gitignore hygiene — then automated it with GitHub Actions running tests on every push and a deploy job gated to real merges on main.",
              "Built a full RAG pipeline (embeddings, Qdrant vector indexing, chunking, retrieval, re-ranking) and designed tool-calling AI agents (plan/act/observe loop, ReAct pattern, risk-tiered tool schemas, human-in-the-loop approval checkpoints, audit logging, and guardrails against runaway agents and prompt injection).",
              "Deployed AI services to Azure AI Foundry and the Azure OpenAI Service, and containerized them with Docker — Dockerfiles, environment-variable secrets, and deployment to a cloud container service — then applied the production-readiness layer specific to AI systems: eval datasets, automated eval metrics, responsible logging, and drift/hallucination monitoring.",
              "Extended Power Automate — flows, triggers, actions, conditions, loops, variables, HTTP actions, and JSON parse/compose — with an AI layer: AI Builder for document extraction, text/image classification, and content summarization, and calling Azure OpenAI and other Azure AI services directly from a flow with structured JSON-schema output.",
              "Built Copilot Studio AI agents using generative orchestration, connected an agent to a Power Automate flow as a synchronous tool (the 'When an agent calls the flow' trigger and 'Respond to the agent' action), and wired AI-generated actions into dynamic flow steps.",
              "Designed human-in-the-loop approval gates for AI-proposed actions: the three Power Automate approval actions (Start and wait for an approval, Create an approval, Wait for an approval), the five approval types (including First to respond and Sequential approval), and the two-flow pattern that keeps a slow, human-paced approval out of an agent's 100-second synchronous tool call.",
              "Applied enterprise AI automation governance patterns — a default human-review queue for anything that doesn't clearly route, and a documented split between what an agent can act on automatically and what requires sign-off — on top of the Job-Ready stage's audit-logging and guardrail practices.",
              "Built a complete capstone automation — the Castlebridge Support Triage Agent — combining a Copilot Studio agent, a classification tool flow, a category-based routing flow, and a separate human-approval flow, simulating a real enterprise support-ticket triage system end to end.",
              "Practiced the broader software delivery lifecycle — Agile/Scrum/Kanban, sprints and user stories, and Dev/QA/UAT/Production environments — through a Scrum/Kanban-based project simulation, so every build above shipped the way a real engineering team actually ships work.",
              "Built three flagship AI Engineer capstone projects — a production RAG knowledge assistant, an AI data analyst over a real SQL database and a live external API, and a tool-using agent with human approval — then wrote action + artifact + framework resume bullets and rehearsed a portfolio walkthrough and common AI engineer/system-design interview questions for each one.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Production RAG Knowledge Assistant — Capstone Project 1",
            right: "2026",
            sub: "Lifting the Veil IT Academy, AI Engineer Apprenticeship Program",
            bullets: [
              "Built and deployed a production-pattern RAG knowledge assistant over a real, 500+ page open-source documentation set, using recursive, overlap-aware chunking (langchain_text_splitters) and a Qdrant vector database for similarity search.",
              "Built a hand-written, 15-20 question evaluation set and measured retrieval recall@k and an LLM-as-judge quality score, then tuned chunk size and re-ranking in response to the numbers and recorded the before/after in the README.",
              "Wrapped the pipeline in a minimal FastAPI service and a Dockerfile — API keys passed as environment variables, never baked into the image — so the assistant runs as a real, callable service instead of a notebook.",
            ],
          },
          {
            left: "AI Data Analyst — Capstone Project 2",
            right: "2026",
            sub: "Lifting the Veil IT Academy, AI Engineer Apprenticeship Program",
            bullets: [
              "Designed a natural-language-to-SQL pipeline against a real sales database (orders, customers, products): a schema-aware system prompt, Claude's tool-use feature returning a structured run_sql_query call, and a pre-execution validator rejecting anything but a single read-only SELECT.",
              "Connected to the database through a dedicated, least-privilege read-only role with parameterized queries, a statement timeout, and a hard row cap, then added a second get_exchange_rate tool so Claude could enrich a SQL result with a live currency lookup, with retry/backoff and deduplicated lookups to avoid an N+1 call pattern.",
            ],
          },
          {
            left: "Tool-Using Agent With Human Approval — Capstone Project 3",
            right: "2026",
            sub: "Lifting the Veil IT Academy, AI Engineer Apprenticeship Program",
            bullets: [
              "Built a two-tool agent — a read-only look_up_order tool and a higher-risk issue_refund tool — with an explicit, design-time risk tier on each tool deciding whether it requires human approval, plus an independent validation step that re-derives the refund amount from the order record itself before any reviewer sees it.",
              "Added full audit logging of every tool call, validation result, approval decision, and outcome, and deployed the agent as a containerized service with pending approvals and the audit log in durable storage so neither is lost on a restart.",
            ],
          },
          {
            left: "Castlebridge Support Triage Agent — Enterprise Support Automation",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Power Automate AI Agents Specialization",
            bullets: [
              "Built a Copilot Studio agent (Castlebridge Support Triage Agent) using generative orchestration to read incoming support tickets and decide their category, urgency, and proposed next action.",
              "Built a synchronous Classify Support Ticket agent flow returning a structured category/urgency/proposedAction result, and a routing flow that sends low-risk, clearly-categorized tickets straight to the right team (Dispatch, Billing, Claims, Security/IT) automatically.",
              "Built a separate human-in-the-loop approval flow — a First to respond approval assigned to the support lead team — that gates every auto-close or auto-escalation decision behind a real person's sign-off, with a rejection routing the ticket to a default human-review queue instead.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/johndoe-biexample/ai-engineer-capstones",
            right: "2026",
            sub: "Public portfolio repository, built against the Git & GitHub for Software Engineers capstone brief",
            bullets: [
              "Ran a real repository through a real GitHub workflow: a meaningful, reviewable commit history, a feature branch merged back through a pull request with an inline review comment addressed by a follow-up commit, and one deliberate merge conflict created and actually resolved.",
              "Documented a deliberate branching-strategy choice (Git Flow vs. trunk-based) in the README, tagged an annotated release (v1.0.0), and added a .github/workflows/ GitHub Actions pipeline with a deploy job gated by github.event_name and github.ref so it only fires on a real merge to main.",
            ],
          },
        ],
      },
      {
        heading: "Education",
        entries: [{ left: "High School Diploma — Washington High School", right: "Atlanta, GA · 2020" }],
      },
    ],
  },
};
