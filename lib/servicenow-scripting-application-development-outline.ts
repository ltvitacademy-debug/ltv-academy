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
      L(1, "what-a-business-rule-actually-is", "What a Business Rule Actually Is", { contentDir: "ch01/01-what-a-business-rule-actually-is", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792712125/ltv-servicenow-scripting-application-development/what-a-business-rule-actually-is.mp4", durationLabel: "2 min 8 s" }),
      L(2, "before-after-async-and-display-business-rules", "Before, After, Async & Display Business Rules", { contentDir: "ch01/02-before-after-async-and-display-business-rules", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792712181/ltv-servicenow-scripting-application-development/before-after-async-and-display-business-rules.mp4", durationLabel: "2 min 6 s" }),
      L(3, "business-rule-order-and-execution-sequence", "Business Rule Order & Execution Sequence", { contentDir: "ch01/03-business-rule-order-and-execution-sequence", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792712242/ltv-servicenow-scripting-application-development/business-rule-order-and-execution-sequence.mp4", durationLabel: "2 min 9 s" }),
      L(4, "the-current-and-previous-objects", "The current & previous Objects", { contentDir: "ch01/04-the-current-and-previous-objects", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792712292/ltv-servicenow-scripting-application-development/the-current-and-previous-objects.mp4", durationLabel: "1 min 50 s" }),
      L(5, "common-business-rule-mistakes", "Common Business Rule Mistakes", { contentDir: "ch01/05-common-business-rule-mistakes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792712345/ltv-servicenow-scripting-application-development/common-business-rule-mistakes.mp4", durationLabel: "2 min 3 s" }),
      L(6, "business-rules-lab", "Business Rules Lab", { contentDir: "ch01/06-business-rules-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792712399/ltv-servicenow-scripting-application-development/business-rules-lab.mp4", durationLabel: "2 min 1 s" }),
    ],
  },
  {
    n: 2,
    title: "Client Scripts",
    lessons: [
      L(7, "onload-onchange-onsubmit-and-oncelledit", "onLoad, onChange, onSubmit & onCellEdit", { contentDir: "ch02/07-onload-onchange-onsubmit-and-oncelledit", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792712461/ltv-servicenow-scripting-application-development/onload-onchange-onsubmit-and-oncelledit.mp4", durationLabel: "2 min 22 s" }),
      L(8, "client-script-best-practices", "Client Script Best Practices", { contentDir: "ch02/08-client-script-best-practices", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792712528/ltv-servicenow-scripting-application-development/client-script-best-practices.mp4", durationLabel: "2 min 35 s" }),
      L(9, "isolate-script-and-the-sandbox", "Isolate Script & the Sandbox", { contentDir: "ch02/09-isolate-script-and-the-sandbox", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792712597/ltv-servicenow-scripting-application-development/isolate-script-and-the-sandbox.mp4", durationLabel: "2 min 41 s" }),
      L(10, "client-scripts-lab", "Client Scripts Lab", { contentDir: "ch02/10-client-scripts-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792712663/ltv-servicenow-scripting-application-development/client-scripts-lab.mp4", durationLabel: "2 min 36 s" }),
    ],
  },
  {
    n: 3,
    title: "Script Includes",
    lessons: [
      L(11, "script-includes-as-reusable-server-side-logic", "Script Includes as Reusable Server-Side Logic", { contentDir: "ch03/11-script-includes-as-reusable-server-side-logic", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792712726/ltv-servicenow-scripting-application-development/script-includes-as-reusable-server-side-logic.mp4", durationLabel: "2 min 28 s" }),
      L(12, "class-based-script-includes", "Class-Based Script Includes", { contentDir: "ch03/12-class-based-script-includes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792712795/ltv-servicenow-scripting-application-development/class-based-script-includes.mp4", durationLabel: "2 min 31 s" }),
      L(13, "when-to-extend-a-script-include-vs-write-a-new-one", "When to Extend a Script Include vs. Write a New One", { contentDir: "ch03/13-when-to-extend-a-script-include-vs-write-a-new-one", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792712859/ltv-servicenow-scripting-application-development/when-to-extend-a-script-include-vs-write-a-new-one.mp4", durationLabel: "2 min 33 s" }),
      L(14, "script-includes-lab", "Script Includes Lab", { contentDir: "ch03/14-script-includes-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792712939/ltv-servicenow-scripting-application-development/script-includes-lab.mp4", durationLabel: "3 min 4 s" }),
    ],
  },
  {
    n: 4,
    title: "UI Policies, UI Actions & UI Pages",
    lessons: [
      L(15, "ui-policies-a-developers-view", "UI Policies: a Developer's View", { contentDir: "ch04/15-ui-policies-a-developers-view", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792713006/ltv-servicenow-scripting-application-development/ui-policies-a-developers-view.mp4", durationLabel: "2 min 34 s" }),
      L(16, "ui-actions-buttons-and-context-menu-items", "UI Actions: Buttons & Context-Menu Items", { contentDir: "ch04/16-ui-actions-buttons-and-context-menu-items", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792713067/ltv-servicenow-scripting-application-development/ui-actions-buttons-and-context-menu-items.mp4", durationLabel: "2 min 23 s" }),
      L(17, "ui-pages-for-custom-interfaces", "UI Pages for Custom Interfaces", { contentDir: "ch04/17-ui-pages-for-custom-interfaces", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792713134/ltv-servicenow-scripting-application-development/ui-pages-for-custom-interfaces.mp4", durationLabel: "2 min 37 s" }),
      L(18, "ui-policies-and-actions-lab", "UI Policies & Actions Lab", { contentDir: "ch04/18-ui-policies-and-actions-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792713203/ltv-servicenow-scripting-application-development/ui-policies-and-actions-lab.mp4", durationLabel: "2 min 41 s" }),
    ],
  },
  {
    n: 5,
    title: "Scoped Applications",
    lessons: [
      L(19, "what-an-application-scope-actually-protects", "What an Application Scope Actually Protects", { contentDir: "ch05/19-what-an-application-scope-actually-protects", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792713282/ltv-servicenow-scripting-application-development/what-an-application-scope-actually-protects.mp4", durationLabel: "3 min 10 s" }),
      L(20, "creating-a-scoped-application", "Creating a Scoped Application", { contentDir: "ch05/20-creating-a-scoped-application", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792713358/ltv-servicenow-scripting-application-development/creating-a-scoped-application.mp4", durationLabel: "2 min 57 s" }),
      L(21, "cross-scope-access-and-when-its-allowed", "Cross-Scope Access & When It's Allowed", { contentDir: "ch05/21-cross-scope-access-and-when-its-allowed", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792713426/ltv-servicenow-scripting-application-development/cross-scope-access-and-when-its-allowed.mp4", durationLabel: "2 min 39 s" }),
      L(22, "application-file-structure", "Application File Structure", { contentDir: "ch05/22-application-file-structure", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792713495/ltv-servicenow-scripting-application-development/application-file-structure.mp4", durationLabel: "2 min 36 s" }),
      L(23, "scoped-applications-lab", "Scoped Applications Lab", { contentDir: "ch05/23-scoped-applications-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792713580/ltv-servicenow-scripting-application-development/scoped-applications-lab.mp4", durationLabel: "3 min 23 s" }),
    ],
  },
  {
    n: 6,
    title: "Tables, Forms & Modules for a Custom Application",
    lessons: [
      L(24, "designing-a-custom-application-data-model", "Designing a Custom Application Data Model", { contentDir: "ch06/24-designing-a-custom-application-data-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792713643/ltv-servicenow-scripting-application-development/designing-a-custom-application-data-model.mp4", durationLabel: "2 min 26 s" }),
      L(25, "building-tables-forms-and-modules", "Building Tables, Forms & Modules", { contentDir: "ch06/25-building-tables-forms-and-modules", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792713703/ltv-servicenow-scripting-application-development/building-tables-forms-and-modules.mp4", durationLabel: "2 min 21 s" }),
      L(26, "application-navigation-and-menus", "Application Navigation & Menus", { contentDir: "ch06/26-application-navigation-and-menus", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792713764/ltv-servicenow-scripting-application-development/application-navigation-and-menus.mp4", durationLabel: "2 min 21 s" }),
      L(27, "application-data-model-lab", "Application Data Model Lab", { contentDir: "ch06/27-application-data-model-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792713823/ltv-servicenow-scripting-application-development/application-data-model-lab.mp4", durationLabel: "2 min 18 s" }),
    ],
  },
  {
    n: 7,
    title: "GlideDialogWindow, GlideModal & Advanced UI",
    lessons: [
      L(28, "glidedialogwindow-and-glidemodal", "GlideDialogWindow & GlideModal", { contentDir: "ch07/28-glidedialogwindow-and-glidemodal", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792713885/ltv-servicenow-scripting-application-development/glidedialogwindow-and-glidemodal.mp4", durationLabel: "2 min 26 s" }),
      L(29, "ui-scripts", "UI Scripts", { contentDir: "ch07/29-ui-scripts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792713947/ltv-servicenow-scripting-application-development/ui-scripts.mp4", durationLabel: "2 min 26 s" }),
      L(30, "advanced-ui-lab", "Advanced UI Lab", { contentDir: "ch07/30-advanced-ui-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792714015/ltv-servicenow-scripting-application-development/advanced-ui-lab.mp4", durationLabel: "2 min 38 s" }),
    ],
  },
  {
    n: 8,
    title: "Scripted REST APIs & Script Actions",
    lessons: [
      L(31, "building-a-scripted-rest-api", "Building a Scripted REST API", { contentDir: "ch08/31-building-a-scripted-rest-api", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792714086/ltv-servicenow-scripting-application-development/building-a-scripted-rest-api.mp4", durationLabel: "2 min 47 s" }),
      L(32, "script-actions-and-scheduled-scripts", "Script Actions & Scheduled Scripts", { contentDir: "ch08/32-script-actions-and-scheduled-scripts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792714147/ltv-servicenow-scripting-application-development/script-actions-and-scheduled-scripts.mp4", durationLabel: "2 min 17 s" }),
      L(33, "scripted-rest-lab", "Scripted REST Lab", { contentDir: "ch08/33-scripted-rest-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792714217/ltv-servicenow-scripting-application-development/scripted-rest-lab.mp4", durationLabel: "2 min 42 s" }),
    ],
  },
  {
    n: 9,
    title: "Capstone: a Custom Scoped Application",
    lessons: [
      L(34, "capstone-kickoff-application-requirements", "Capstone Kickoff: Application Requirements", { contentDir: "ch09/34-capstone-kickoff-application-requirements", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792714277/ltv-servicenow-scripting-application-development/capstone-kickoff-application-requirements.mp4", durationLabel: "2 min 19 s" }),
      L(35, "capstone-build-data-model-and-security", "Capstone: Build Data Model & Security", { contentDir: "ch09/35-capstone-build-data-model-and-security", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792714344/ltv-servicenow-scripting-application-development/capstone-build-data-model-and-security.mp4", durationLabel: "2 min 32 s" }),
      L(36, "capstone-build-server-and-client-scripts", "Capstone: Build Server & Client Scripts", { contentDir: "ch09/36-capstone-build-server-and-client-scripts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792714400/ltv-servicenow-scripting-application-development/capstone-build-server-and-client-scripts.mp4", durationLabel: "2 min 7 s" }),
      L(37, "capstone-wrap-up-and-code-review", "Capstone Wrap-Up & Code Review", { contentDir: "ch09/37-capstone-wrap-up-and-code-review", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792714458/ltv-servicenow-scripting-application-development/capstone-wrap-up-and-code-review.mp4", durationLabel: "2 min 13 s" }),
    ],
  },
];
