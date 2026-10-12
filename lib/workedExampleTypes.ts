// Pure types for the Worked Example Library — no fs/path, safe to import
// client-side. Content lives as static JSON per course
// (content/<contentBase>/worked-examples.json), loaded server-side by
// lib/workedExamples.ts.
//
// This is deliberately NOT another quiz/flashcard/guided-practice clone.
// Those test recall or let a student attempt an answer. A worked example
// shows, start to finish, how an experienced professional actually solves
// one realistic problem — reasoning included, not just the final answer.
//
// Every text field below holds Markdown, rendered the same way a lesson
// guide.md is (marked.parse + the .book-page CSS class), so SQL/DAX/code
// blocks, tables, and formatting all work exactly like they do in a lesson.

export type WorkedExample = {
  id: string; // unique within the course, e.g. "tsql-we-01"
  courseSlug: string;
  title: string;
  chapterTitle?: string;
  context: string; // business/technical context — why this task matters
  objective: string; // what needs to be accomplished
  startingInformation: string; // the data, requirements, or starting conditions
  walkthrough: string; // the step-by-step narrative, in sequence
  reasoning: string; // why this approach was chosen over alternatives
  solution: string; // the completed code/config/document/decision
  validation: string; // how to confirm the solution actually works
  pitfalls: string; // common mistakes to avoid
  relatedLessons: { lessonSlug: string; title: string }[];
  relatedResourceIds: string[]; // ids into this course's CourseResource[]
};

export type WorkedExampleBank = {
  examples: WorkedExample[];
};
