// ServiceNow Scripting & Application Development course outline. Lessons without a contentDir
// render as "in production". Course 6 of 14 in the ServiceNow Administrator → Developer →
// Technical Architect path: Business Rules, Client Scripts, and scoped application development —
// the CAD exam's core territory.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/servicenow-scripting-application-development/
  videoUrl?: string;
  durationLabel?: string;
};

export type ChapterMeta = { n: number; title: string; lessons: LessonMeta[] };

const L = (n: number, slug: string, title: string, extra?: Partial<LessonMeta>): LessonMeta => ({
  n,
  slug,
  title,
  ...extra,
});

export const SERVICENOW_SCRIPTING_APPLICATION_DEVELOPMENT_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Business Rules",
    lessons: [
      L(1, "what-a-business-rule-actually-is", "What a Business Rule Actually Is"),
      L(2, "before-after-async-and-display-business-rules", "Before, After, Async & Display Business Rules"),
      L(3, "business-rule-order-and-execution-sequence", "Business Rule Order & Execution Sequence"),
      L(4, "the-current-and-previous-objects", "The current & previous Objects"),
      L(5, "common-business-rule-mistakes", "Common Business Rule Mistakes"),
      L(6, "business-rules-lab", "Business Rules Lab"),
    ],
  },
  {
    n: 2,
    title: "Client Scripts",
    lessons: [
      L(7, "onload-onchange-onsubmit-and-oncelledit", "onLoad, onChange, onSubmit & onCellEdit"),
      L(8, "client-script-best-practices", "Client Script Best Practices"),
      L(9, "isolate-script-and-the-sandbox", "Isolate Script & the Sandbox"),
      L(10, "client-scripts-lab", "Client Scripts Lab"),
    ],
  },
  {
    n: 3,
    title: "Script Includes",
    lessons: [
      L(11, "script-includes-as-reusable-server-side-logic", "Script Includes as Reusable Server-Side Logic"),
      L(12, "class-based-script-includes", "Class-Based Script Includes"),
      L(13, "when-to-extend-a-script-include-vs-write-a-new-one", "When to Extend a Script Include vs. Write a New One"),
      L(14, "script-includes-lab", "Script Includes Lab"),
    ],
  },
  {
    n: 4,
    title: "UI Policies, UI Actions & UI Pages",
    lessons: [
      L(15, "ui-policies-a-developers-view", "UI Policies: a Developer's View"),
      L(16, "ui-actions-buttons-and-context-menu-items", "UI Actions: Buttons & Context-Menu Items"),
      L(17, "ui-pages-for-custom-interfaces", "UI Pages for Custom Interfaces"),
      L(18, "ui-policies-and-actions-lab", "UI Policies & Actions Lab"),
    ],
  },
  {
    n: 5,
    title: "Scoped Applications",
    lessons: [
      L(19, "what-an-application-scope-actually-protects", "What an Application Scope Actually Protects"),
      L(20, "creating-a-scoped-application", "Creating a Scoped Application"),
      L(21, "cross-scope-access-and-when-its-allowed", "Cross-Scope Access & When It's Allowed"),
      L(22, "application-file-structure", "Application File Structure"),
      L(23, "scoped-applications-lab", "Scoped Applications Lab"),
    ],
  },
  {
    n: 6,
    title: "Tables, Forms & Modules for a Custom Application",
    lessons: [
      L(24, "designing-a-custom-application-data-model", "Designing a Custom Application Data Model"),
      L(25, "building-tables-forms-and-modules", "Building Tables, Forms & Modules"),
      L(26, "application-navigation-and-menus", "Application Navigation & Menus"),
      L(27, "application-data-model-lab", "Application Data Model Lab"),
    ],
  },
  {
    n: 7,
    title: "GlideDialogWindow, GlideModal & Advanced UI",
    lessons: [
      L(28, "glidedialogwindow-and-glidemodal", "GlideDialogWindow & GlideModal"),
      L(29, "ui-scripts", "UI Scripts"),
      L(30, "advanced-ui-lab", "Advanced UI Lab"),
    ],
  },
  {
    n: 8,
    title: "Scripted REST APIs & Script Actions",
    lessons: [
      L(31, "building-a-scripted-rest-api", "Building a Scripted REST API"),
      L(32, "script-actions-and-scheduled-scripts", "Script Actions & Scheduled Scripts"),
      L(33, "scripted-rest-lab", "Scripted REST Lab"),
    ],
  },
  {
    n: 9,
    title: "Capstone: a Custom Scoped Application",
    lessons: [
      L(34, "capstone-kickoff-application-requirements", "Capstone Kickoff: Application Requirements"),
      L(35, "capstone-build-data-model-and-security", "Capstone: Build Data Model & Security"),
      L(36, "capstone-build-server-and-client-scripts", "Capstone: Build Server & Client Scripts"),
      L(37, "capstone-wrap-up-and-code-review", "Capstone Wrap-Up & Code Review"),
    ],
  },
];
