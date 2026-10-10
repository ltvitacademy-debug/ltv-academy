import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Atlanta, GA", "(404) 555-0182", "john.doe@example.com", "linkedin.com/in/johndoe-biexample"];

export const RESUMES: PathResumes = {
  administrator: {
    levelLabel: "Administrator",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Salesforce Administrator trained on CRM fundamentals, data model design, security and sharing architecture, data " +
      "management, and reporting through a hands-on, project-based program built entirely in free Trailhead Playground " +
      "and Developer Edition orgs. Comfortable designing an object model and role hierarchy on paper, then building and " +
      "testing it for real in Setup. Preparing for the Salesforce Certified Administrator credential and targeting " +
      "Salesforce Administrator and Salesforce Business Analyst roles.",
    skills: [
      "Object, Field & Relationship Design (Schema Builder)",
      "User, Profile & Permission Set Management",
      "Organization-Wide Defaults, Role Hierarchy & Sharing Rules",
      "Data Loader & Data Import/Export (Upsert, External IDs)",
      "Duplicate Management & Data Quality",
      "Reports, Dashboards & Business Analytics",
      "Change Sets, Sandboxes & Release Management",
      "Version Control (Git)",
    ],
    tools: "Salesforce Setup, Trailhead Playground, Developer Edition Org, Data Import Wizard, Data Loader, Schema Builder, Lightning Experience, Git",
    sections: [
      {
        heading: "Training & Certifications",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "Salesforce Administrator Track · Atlanta, GA",
            bullets: [
              "Completed an intensive, project-based program covering Salesforce CRM fundamentals, data model design, administration, security and sharing, data management, and reporting and dashboards — every hands-on exercise built in a free Trailhead Playground and Developer Edition org rather than a licensed sandbox.",
              "Learned the Salesforce ecosystem: the customer lifecycle across marketing, sales, and service; the Sales, Service, Marketing, Commerce and Platform clouds; multitenancy and metadata-driven architecture; and how the Admin, Developer, Consultant, and Architect roles differ.",
              "Designed Salesforce data models from business requirements: standard objects (Accounts, Contacts, Leads, Opportunities, Cases), custom objects, fields and field types (picklists, formula fields, roll-up summary fields), Lookup vs. Master-Detail relationships, many-to-many relationships through junction objects, record types, and Schema Builder.",
              "Administered users and access: creating and deactivating users, license types, profiles, permission sets and permission set groups, login hours and IP restrictions, and password and session-security policies.",
              "Configured the organization: business hours and holidays, fiscal year and currencies, the App Manager, page layouts and compact layouts, record types tied to business processes, dependent picklists and global value sets, field history tracking, and list views and search layouts.",
              "Built the Salesforce security model end to end: object permissions (CRUD), field-level security, how profiles and permission sets combine, Organization-Wide Defaults, role hierarchy, sharing rules, manual sharing, Account/Opportunity/Case teams, and public groups and queues — then practiced verifying access with Login As and Run As.",
              "Managed the data lifecycle: planning a data load, the Import Wizard, Data Loader concepts, insert/update/upsert operations, and External IDs for matching records on load, plus scheduled data exports, the Weekly Export Service, bulk operations, and the Recycle Bin.",
              "Applied data-quality tools: duplicate and matching rules, validation rules, and data standardization — including a hands-on Data Loader lab upserting 40 Contact records matched on a custom External ID field, with both a clean first run and a re-run that updated existing records instead of duplicating them.",
              "Built reports and dashboards: report types, filters, summary/matrix/joined reports, report formulas and bucketing, custom report types, report folders and folder-level sharing, scheduled subscriptions, and dashboard components, filters, and dynamic dashboards.",
              "Practiced how real IT teams deliver work — Agile/Scrum/Kanban, the SDLC across Dev/QA/UAT/Production, and version control with Git (repositories, commits, branches, pull requests) — through a real-world IT project simulation.",
            ],
          },
          { left: "Salesforce Certified Administrator", right: "Exam scheduled" },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Legacy Contact Migration — Data Loader Upsert Lab",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Salesforce Administrator Program",
            bullets: [
              "Loaded 40 legacy Contact records into a Developer Edition org using Salesforce Data Loader's upsert operation, matching on a custom Legacy_Contact_ID__c field marked as an External ID instead of the Salesforce record Id.",
              "Reviewed the job's success and error output files to confirm every row inserted correctly, then edited two rows and re-ran the same upsert to confirm they updated in place (Created = false) instead of creating duplicate Contacts.",
            ],
          },
          {
            left: "Sales Pipeline Overview Dashboard",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Salesforce Administrator Program",
            bullets: [
              "Built a pipeline-by-stage Summary report on open Opportunities and a second report filtering deals open more than 45 days in their current stage, saved into a dedicated Sales Team report folder shared at Viewer access to the sales role.",
              "Combined both reports into a dashboard with a funnel chart and a stale-deals table, added an Owner filter so a rep can narrow the view to their own deals, and set up a weekly Monday-morning subscription for a sales-manager persona.",
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
  "platform-app-builder": {
    levelLabel: "Platform App Builder",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Salesforce Administrator and Platform App Builder trained through declarative application development, Flow " +
      "automation, and business process automation, then proved it on a complete end-to-end implementation capstone — " +
      "object model, security model, automation, and reporting for a fictional B2B equipment company — version-controlled " +
      "with the Salesforce CLI. Preparing for the Salesforce Certified Administrator and Salesforce Certified Platform " +
      "App Builder credentials and targeting Salesforce Administrator, Platform App Builder, or Salesforce Business " +
      "Analyst roles.",
    skills: [
      "Custom Application Design (Lightning App Builder, Custom Objects)",
      "Record-Triggered & Screen Flows (Flow Builder)",
      "Validation Rules & Approval Processes",
      "Choosing Declarative vs. Programmatic Automation",
      "Role Hierarchy, OWD & Sharing Rule Design",
      "End-to-End Org Build: Data Model, Security, Automation, Reporting",
      "Salesforce CLI & Source-Driven Development (sf)",
      "Stakeholder Requirements Gathering & Process Documentation",
      "Version Control (Git/GitHub)",
    ],
    tools: "Salesforce Setup, Lightning App Builder, Flow Builder, Data Loader, Salesforce CLI (sf), Trailhead Playground, Developer Edition Org, Git/GitHub",
    sections: [
      {
        heading: "Training & Certifications",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "Salesforce Administrator Track + Declarative Development · Atlanta, GA",
            bullets: [
              "Completed an intensive, project-based program covering Salesforce administration, security and sharing, data management, reporting, declarative application building, Flow automation, and business process automation — every hands-on exercise built in a free Trailhead Playground and Developer Edition org.",
              "Designed data models, built and administered users/profiles/permission sets, built the full security model (Organization-Wide Defaults, role hierarchy, sharing rules, field-level security), managed data loads and data quality with Data Loader and External IDs, and built reports, dashboards, and executive-level analytics.",
              "Built custom Salesforce applications end to end: requirements and data modeling for apps, custom objects and relationships, field design, Lightning App Builder record/app pages, Dynamic Forms, and Quick Actions.",
              "Applied declarative business logic inside custom apps — validation rules, formula fields, roll-up summary fields, junction objects — and practiced choosing between Flow, validation rules, and approval processes for a given requirement.",
              "Built Flows in Flow Builder: record-triggered Flows (both before-save and after-save), Screen Flows, scheduled and autolaunched Flows, subflows, decisions, loops, collections, Get/Create/Update/Delete Records, assignments, and the Transform element — practiced in Lead-assignment, Case-escalation, and onboarding-wizard labs.",
              "Made Flows reliable at scale: fault handling, testing and debugging, bulkification and governor limits, Flow versioning and deployment, and migrating logic off deprecated Process Builder and Workflow Rules.",
              "Built and tested approval processes, including multi-step and parallel approvals, mapped business processes with stakeholders before building anything, and documented finished automation for handoff — including order-of-execution and automation-collision scenarios.",
              "Deployed configuration through change sets across sandbox and production environments, and used the Salesforce CLI (`sf`) for source-driven development — authenticating to an org, generating a Salesforce DX project, and pushing/pulling metadata with `sf project deploy start` and `sf project retrieve start`.",
            ],
          },
          { left: "Salesforce Certified Administrator", right: "Exam scheduled" },
          { left: "Salesforce Certified Platform App Builder", right: "Exam scheduled" },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "LTV Customer Management System — Salesforce Implementation Capstone",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Salesforce Administrator Program · Fictional client: Cascade Foodservice Equipment Co.",
            bullets: [
              "Designed and built a complete lead-to-cash object model for a fictional B2B commercial-kitchen-equipment company: Leads converting into Accounts, Contacts, and Opportunities across a 5-stage sales process (Qualifying, Needs Analysis, Equipment Proposal, Negotiation/Review, Closed Won/Closed Lost), plus two custom objects — Installation Project and Service Contract — each a Lookup to Account and Opportunity rather than Master-Detail, so each could outlive and be reassigned independent of its parent deal.",
              "Designed and implemented a full security model: a 6-level role hierarchy mirroring the company's real sales/service/customer-success structure, five profiles (System Administrator, Sales Rep, Sales Manager, Service Profile, Customer Success Profile), Private Organization-Wide Defaults on every sales and custom object, and three sharing rules closing the specific visibility gaps the role hierarchy alone left open.",
              "Built a record-triggered Flow that auto-assigns every new Lead to the SDR's queue with a same-day follow-up Task, and a Screen Flow that lets field installers log a service visit and update installation status from a Quick Action instead of the full record-edit layout.",
              "Wrote four validation rules enforcing data quality across Opportunity, Installation Project, and Service Contract — a required loss reason on Closed Lost, a cross-object Decision Maker check before Negotiation/Review, a target-install-date-can't-be-in-the-past check, and a positive-Annual-Value check on service contracts.",
              "Built a discount approval process on Opportunity with entry criteria above a defined discount threshold, a named VP approver, record locking on submission, and distinct field-update and notification actions on approval versus rejection.",
              "Built three reports organized into role-based folders (Sales, Operations, Customer Success) and a four-component executive dashboard — pipeline by stage, installation backlog by status, renewals at risk, and open pipeline total — set to run as the VP of Sales so visibility always matches her role-hierarchy access regardless of who's viewing it.",
              "Loaded clean sample data, tested the build end-to-end, documented the finished org, and presented the complete implementation as a structured five-part portfolio walkthrough covering the scenario, data model, security model, one automation story, and reporting.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/johndoe-biexample/cascade-sfdx-portfolio",
            right: "2026",
            sub: "Public portfolio repository for the capstone's source-driven metadata",
            bullets: [
              "Installed the Salesforce CLI (`@salesforce/cli`, the `sf` command), authenticated it to the Developer Edition org holding the Cascade Foodservice Equipment Co. build with `sf org login web`, and generated a source-driven Salesforce DX project with `sf template generate project`.",
              "Ran `sf project retrieve start` to pull the capstone's custom objects, field definitions, Flow definitions, and page layouts out of the org into local, version-controlled source, then committed that metadata to a Git repository and pushed it to GitHub with the standard Salesforce DX .gitignore excluding local auth credentials, plus a README documenting the architecture.",
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
