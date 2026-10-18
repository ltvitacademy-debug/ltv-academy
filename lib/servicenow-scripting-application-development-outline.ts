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
      L(1, "what-a-business-rule-actually-is", "What a Business Rule Actually Is", { contentDir: "ch01/01-what-a-business-rule-actually-is" }),
      L(2, "before-after-async-and-display-business-rules", "Before, After, Async & Display Business Rules", { contentDir: "ch01/02-before-after-async-and-display-business-rules" }),
      L(3, "business-rule-order-and-execution-sequence", "Business Rule Order & Execution Sequence", { contentDir: "ch01/03-business-rule-order-and-execution-sequence" }),
      L(4, "the-current-and-previous-objects", "The current & previous Objects", { contentDir: "ch01/04-the-current-and-previous-objects" }),
      L(5, "common-business-rule-mistakes", "Common Business Rule Mistakes", { contentDir: "ch01/05-common-business-rule-mistakes" }),
      L(6, "business-rules-lab", "Business Rules Lab", { contentDir: "ch01/06-business-rules-lab" }),
    ],
  },
  {
    n: 2,
    title: "Client Scripts",
    lessons: [
      L(7, "onload-onchange-onsubmit-and-oncelledit", "onLoad, onChange, onSubmit & onCellEdit", { contentDir: "ch02/07-onload-onchange-onsubmit-and-oncelledit" }),
      L(8, "client-script-best-practices", "Client Script Best Practices", { contentDir: "ch02/08-client-script-best-practices" }),
      L(9, "isolate-script-and-the-sandbox", "Isolate Script & the Sandbox", { contentDir: "ch02/09-isolate-script-and-the-sandbox" }),
      L(10, "client-scripts-lab", "Client Scripts Lab", { contentDir: "ch02/10-client-scripts-lab" }),
    ],
  },
  {
    n: 3,
    title: "Script Includes",
    lessons: [
      L(11, "script-includes-as-reusable-server-side-logic", "Script Includes as Reusable Server-Side Logic", { contentDir: "ch03/11-script-includes-as-reusable-server-side-logic" }),
      L(12, "class-based-script-includes", "Class-Based Script Includes", { contentDir: "ch03/12-class-based-script-includes" }),
      L(13, "when-to-extend-a-script-include-vs-write-a-new-one", "When to Extend a Script Include vs. Write a New One", { contentDir: "ch03/13-when-to-extend-a-script-include-vs-write-a-new-one" }),
      L(14, "script-includes-lab", "Script Includes Lab", { contentDir: "ch03/14-script-includes-lab" }),
    ],
  },
  {
    n: 4,
    title: "UI Policies, UI Actions & UI Pages",
    lessons: [
      L(15, "ui-policies-a-developers-view", "UI Policies: a Developer's View", { contentDir: "ch04/15-ui-policies-a-developers-view" }),
      L(16, "ui-actions-buttons-and-context-menu-items", "UI Actions: Buttons & Context-Menu Items", { contentDir: "ch04/16-ui-actions-buttons-and-context-menu-items" }),
      L(17, "ui-pages-for-custom-interfaces", "UI Pages for Custom Interfaces", { contentDir: "ch04/17-ui-pages-for-custom-interfaces" }),
      L(18, "ui-policies-and-actions-lab", "UI Policies & Actions Lab", { contentDir: "ch04/18-ui-policies-and-actions-lab" }),
    ],
  },
  {
    n: 5,
    title: "Scoped Applications",
    lessons: [
      L(19, "what-an-application-scope-actually-protects", "What an Application Scope Actually Protects", { contentDir: "ch05/19-what-an-application-scope-actually-protects" }),
      L(20, "creating-a-scoped-application", "Creating a Scoped Application", { contentDir: "ch05/20-creating-a-scoped-application" }),
      L(21, "cross-scope-access-and-when-its-allowed", "Cross-Scope Access & When It's Allowed", { contentDir: "ch05/21-cross-scope-access-and-when-its-allowed" }),
      L(22, "application-file-structure", "Application File Structure", { contentDir: "ch05/22-application-file-structure" }),
      L(23, "scoped-applications-lab", "Scoped Applications Lab", { contentDir: "ch05/23-scoped-applications-lab" }),
    ],
  },
  {
    n: 6,
    title: "Tables, Forms & Modules for a Custom Application",
    lessons: [
      L(24, "designing-a-custom-application-data-model", "Designing a Custom Application Data Model", { contentDir: "ch06/24-designing-a-custom-application-data-model" }),
      L(25, "building-tables-forms-and-modules", "Building Tables, Forms & Modules", { contentDir: "ch06/25-building-tables-forms-and-modules" }),
      L(26, "application-navigation-and-menus", "Application Navigation & Menus", { contentDir: "ch06/26-application-navigation-and-menus" }),
      L(27, "application-data-model-lab", "Application Data Model Lab", { contentDir: "ch06/27-application-data-model-lab" }),
    ],
  },
  {
    n: 7,
    title: "GlideDialogWindow, GlideModal & Advanced UI",
    lessons: [
      L(28, "glidedialogwindow-and-glidemodal", "GlideDialogWindow & GlideModal", { contentDir: "ch07/28-glidedialogwindow-and-glidemodal" }),
      L(29, "ui-scripts", "UI Scripts", { contentDir: "ch07/29-ui-scripts" }),
      L(30, "advanced-ui-lab", "Advanced UI Lab", { contentDir: "ch07/30-advanced-ui-lab" }),
    ],
  },
  {
    n: 8,
    title: "Scripted REST APIs & Script Actions",
    lessons: [
      L(31, "building-a-scripted-rest-api", "Building a Scripted REST API", { contentDir: "ch08/31-building-a-scripted-rest-api" }),
      L(32, "script-actions-and-scheduled-scripts", "Script Actions & Scheduled Scripts", { contentDir: "ch08/32-script-actions-and-scheduled-scripts" }),
      L(33, "scripted-rest-lab", "Scripted REST Lab", { contentDir: "ch08/33-scripted-rest-lab" }),
    ],
  },
  {
    n: 9,
    title: "Capstone: a Custom Scoped Application",
    lessons: [
      L(34, "capstone-kickoff-application-requirements", "Capstone Kickoff: Application Requirements", { contentDir: "ch09/34-capstone-kickoff-application-requirements" }),
      L(35, "capstone-build-data-model-and-security", "Capstone: Build Data Model & Security", { contentDir: "ch09/35-capstone-build-data-model-and-security" }),
      L(36, "capstone-build-server-and-client-scripts", "Capstone: Build Server & Client Scripts", { contentDir: "ch09/36-capstone-build-server-and-client-scripts" }),
      L(37, "capstone-wrap-up-and-code-review", "Capstone Wrap-Up & Code Review", { contentDir: "ch09/37-capstone-wrap-up-and-code-review" }),
    ],
  },
];
