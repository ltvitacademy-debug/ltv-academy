import type { Config } from "@netlify/functions";
import Anthropic from "@anthropic-ai/sdk";

const MAX_QUESTION_LENGTH = 800;
const MAX_HISTORY_TURNS = 6;
const MAX_GUIDE_EXCERPT_LENGTH = 6000;

interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequestBody {
  courseTitle?: string;
  lessonTitle?: string;
  guideExcerpt?: string;
  question?: string;
  history?: ChatTurn[];
}

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    });
  }

  let body: ChatRequestBody;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const question = (body.question ?? "").trim();
  if (!question) {
    return new Response(JSON.stringify({ error: "Missing question" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
  if (question.length > MAX_QUESTION_LENGTH) {
    return new Response(
      JSON.stringify({ error: "Question is too long" }),
      { status: 400, headers: { "content-type": "application/json" } },
    );
  }

  const courseTitle = (body.courseTitle ?? "this course").slice(0, 200);
  const lessonTitle = (body.lessonTitle ?? "this lesson").slice(0, 200);
  const guideExcerpt = (body.guideExcerpt ?? "").slice(
    0,
    MAX_GUIDE_EXCERPT_LENGTH,
  );

  const history: Anthropic.MessageParam[] = (body.history ?? [])
    .slice(-MAX_HISTORY_TURNS)
    .filter(
      (turn): turn is ChatTurn =>
        (turn.role === "user" || turn.role === "assistant") &&
        typeof turn.content === "string" &&
        turn.content.length > 0 &&
        turn.content.length <= MAX_QUESTION_LENGTH,
    )
    .map((turn) => ({ role: turn.role, content: turn.content }));

  const client = new Anthropic();

  const systemPrompt = `You are the lesson helper embedded at the bottom of a lesson page on LTV Academy, an IT training site. You are currently helping a student on the lesson "${lessonTitle}" from the course "${courseTitle}".

Here is the lesson's written guide, for your reference:
---
${guideExcerpt || "(No guide text was available for this lesson.)"}
---

Answer the student's question about this lesson clearly and simply, as if explaining to someone learning the topic for the first time. Prefer short, concrete explanations and examples over long lectures. Stay focused on this lesson and this course; if asked something unrelated to IT training topics, gently redirect the student back to the lesson. Never claim to be a human instructor. Keep replies concise — a few short paragraphs at most.`;

  try {
    const response = await client.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 700,
      output_config: { effort: "low" },
      system: systemPrompt,
      messages: [...history, { role: "user", content: question }],
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const answer = textBlock && textBlock.type === "text" ? textBlock.text : "";

    return new Response(JSON.stringify({ answer }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("lesson-chat error:", error);
    const message =
      error instanceof Anthropic.APIError
        ? "The lesson helper is temporarily unavailable. Please try again shortly."
        : "Something went wrong answering that question.";
    return new Response(JSON.stringify({ error: message }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }
};

export const config: Config = {
  path: "/api/lesson-chat",
};
