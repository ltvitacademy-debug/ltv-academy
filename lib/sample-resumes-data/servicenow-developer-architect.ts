import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Charlotte, NC", "(704) 555-0163", "john.doe@example.com", "linkedin.com/in/johndoe-servicenowexample"];

export const RESUMES: PathResumes = {
  administrator: {
    levelLabel: "ServiceNow Administrator",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "ServiceNow Administrator trained on ITSM/ITIL 4 process foundations, core platform configuration, and Flow Designer automation through a hands-on, project-based program built entirely on a free ServiceNow Personal Developer Instance. Comfortable configuring users, roles, and ACLs, building and automating a service catalog, and explaining why a workflow is designed the way it is — not just how to click through it. Preparing for the ServiceNow Certified System Administrator (CSA) credential and targeting ServiceNow Administrator and Implementation Specialist roles.",
    skills: [
      "ITSM & ITIL 4 Process Foundations (Incident, Problem, Change, Request)",
      "Users, Groups, Roles & Access Control Lists (ACLs)",
      "Service Catalog Design & Configuration",
      "Flow Designer Automation",
      "UI Policies, UI Actions & Business Rules (Declarative)",
      "Tables, Forms & the ServiceNow Data Model",
      "Personal Developer Instance (PDI) Administration",
      "Version Control (Git)",
    ],
    tools: "ServiceNow Personal Developer Instance (PDI), Flow Designer, Service Catalog, List/Form Views, Update Sets, Git",
    sections: [
      {
        heading: "Training & Certifications",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "ServiceNow Administrator Track · Charlotte, NC",
            bullets: [
              "Completed an intensive, project-based program covering ITSM/ITIL 4 process foundations, ServiceNow platform fundamentals, system administration, and Flow Designer automation — every hands-on exercise built on a free ServiceNow Personal Developer Instance rather than a licensed production environment.",
              "Learned the ITIL 4 process concepts ServiceNow's core modules actually implement: the Incident, Problem, Change, and Request Management lifecycles, service level agreements (SLAs), and how ITIL's process vocabulary maps directly onto ServiceNow's tables and workflows.",
              "Built real platform fundamentals: the ServiceNow data model (tables, fields, and table inheritance), the Now Platform's instance architecture, navigating Lists and Forms, and Update Sets for moving configuration between instances.",
              "Administered users and access: creating users and groups, assigning roles, and designing Access Control Lists (ACLs) that scope who can read, write, create, and delete specific tables and fields.",
              "Designed and automated a service catalog end to end: catalog items, variable sets, and record producers, then automated catalog request fulfillment with Flow Designer — triggers, actions, approvals, and notifications — without writing a line of server-side script.",
              "Practiced how real IT teams deliver work — Agile/Scrum/Kanban, the SDLC across Dev/QA/UAT/Production, and version control with Git (repositories, commits, branches, pull requests) — through a real-world IT project simulation.",
            ],
          },
          { left: "ServiceNow Certified System Administrator (CSA)", right: "Exam scheduled" },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Enterprise IT Service Desk",
            right: "2026",
            sub: "Lifting the Veil IT Academy, ServiceNow Administrator Program",
            bullets: [
              "Configured Incident, Problem, Change, and Request workflows end to end on a Personal Developer Instance, including SLA definitions and out-of-the-box reporting on open/resolved ticket volume.",
              "Built and automated a self-service catalog item with Flow Designer so a submitted request routes to the correct fulfillment group, fires an approval step, and notifies the requester on completion — with no custom server-side script.",
            ],
          },
        ],
      },
      {
        heading: "Education",
        entries: [{ left: "High School Diploma — Central High School", right: "Charlotte, NC · 2020" }],
      },
    ],
  },
  developer: {
    levelLabel: "ServiceNow Developer",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "ServiceNow Administrator and Developer trained through real JavaScript fluency on the platform (GlideRecord, GlideAjax, Business Rules, Client Scripts, Script Includes), scoped application development, and REST/IntegrationHub integration patterns — then proved it building a real scoped application and a tested REST integration on a free Personal Developer Instance. Preparing for the ServiceNow Certified System Administrator (CSA) and Certified Application Developer (CAD) credentials and targeting ServiceNow Developer, Business Analyst, or Implementation Specialist roles.",
    skills: [
      "Server-Side Scripting (GlideRecord, Business Rules, Script Includes)",
      "Client-Side Scripting (Client Scripts, GlideAjax, UI Policies)",
      "Scoped Application Development",
      "REST API Integration & IntegrationHub",
      "Service Catalog & Flow Designer Automation",
      "Access Control Lists (ACLs) & Platform Security Fundamentals",
      "Update Sets & Source-Driven Development",
      "Version Control (Git)",
    ],
    tools: "ServiceNow Personal Developer Instance (PDI), Studio, Script Editor, Flow Designer, IntegrationHub, Postman, Update Sets, Git",
    sections: [
      {
        heading: "Training & Certifications",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "ServiceNow Administrator Track + Application Development · Charlotte, NC",
            bullets: [
              "Completed an intensive, project-based program covering ITSM/ITIL 4 foundations, platform administration, Flow Designer automation, JavaScript for ServiceNow, scoped application development, and REST/IntegrationHub integration — every hands-on exercise built on a free ServiceNow Personal Developer Instance.",
              "Built the platform administration foundation: ITSM process configuration, the ServiceNow data model, users/groups/roles/ACLs, and service catalog automation with Flow Designer.",
              "Developed real JavaScript fluency on the Now Platform: GlideRecord for server-side record queries and DML, Business Rules (before/after/async/display), Script Includes for reusable server-side logic, Client Scripts (onLoad/onChange/onSubmit), UI Policies, and GlideAjax for calling server-side Script Includes from client scripts without a full page submit.",
              "Built a scoped application end to end: application scope and cross-scope access, custom tables and relationships, forms and UI design inside Studio, and business logic split correctly between client- and server-side scripts.",
              "Built and tested REST integrations: designing a REST message and its HTTP methods, authentication (Basic, OAuth), scripted REST APIs for exposing ServiceNow data to external systems, and IntegrationHub spokes/actions for low-code integration flows — including error handling, logging, and retries the way a production integration actually needs.",
              "Deployed configuration safely across instances using Update Sets, and practiced source-driven development concepts (exporting application source, version control with Git) for managing ServiceNow customizations outside the platform UI.",
            ],
          },
          { left: "ServiceNow Certified System Administrator (CSA)", right: "Exam scheduled" },
          { left: "ServiceNow Certified Application Developer (CAD)", right: "Exam scheduled" },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Custom Scoped Application — Equipment Request Tracker",
            right: "2026",
            sub: "Lifting the Veil IT Academy, ServiceNow Developer Program",
            bullets: [
              "Designed and built a real scoped application from requirements: custom tables for equipment requests and inventory items, a form with client-side validation (UI Policies, Client Scripts), and a Business Rule that auto-updates inventory counts when a request is approved.",
              "Used GlideAjax to call a Script Include from a Client Script, looking up real-time inventory availability without a full page submit, and wrote server-side GlideRecord logic to enforce that a request can't be approved against zero available inventory.",
            ],
          },
          {
            left: "Enterprise REST Integration",
            right: "2026",
            sub: "Lifting the Veil IT Academy, ServiceNow Developer Program",
            bullets: [
              "Built and tested a scripted REST API exposing Incident data to an external system, with authentication, structured error responses, and request logging, verified against a suite of Postman requests covering both success and failure cases.",
              "Configured an IntegrationHub action to call an outbound REST endpoint as part of a Flow, with retry logic on a failed call and a notification on exhausted retries — mirroring how a production integration has to handle a downstream outage.",
            ],
          },
        ],
      },
      {
        heading: "Education",
        entries: [{ left: "High School Diploma — Central High School", right: "Charlotte, NC · 2020" }],
      },
    ],
  },
};
