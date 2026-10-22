export type FullCirclePhase =
  | "business-requirements"
  | "architecture-planning"
  | "implementation"
  | "troubleshooting-validation"
  | "business-interpretation"
  | "professional-communication";

export const FULL_CIRCLE_PHASE_LABELS: Record<FullCirclePhase, string> = {
  "business-requirements": "Business Requirements",
  "architecture-planning": "Architecture & Planning",
  implementation: "Step-by-Step Implementation",
  "troubleshooting-validation": "Troubleshooting & Validation",
  "business-interpretation": "Business Interpretation",
  "professional-communication": "Professional Communication",
};

export type FullCircleWorkplaceExplanation = {
  technicalLead: string;
  projectManager: string;
  executive: string;
};

export type FullCircleLesson = {
  n: number;
  slug: string;
  title: string;
  phase: FullCirclePhase;
  /** One-line description shown in the series playlist, produced or not. */
  summary: string;
  status: "outline" | "published";
  videoUrl?: string;
  durationLabel?: string;
  /** Markdown. "What are we building?" framing for this specific lesson. */
  whatAreWeBuilding?: string;
  /** Markdown. The 4th-grade-level explanation. */
  explainSimple?: string;
  /** Markdown. The seasoned-professional-level explanation. */
  explainProfessional?: string;
  /** Markdown, with fenced code blocks. Full step-by-step implementation instructions. */
  writtenInstructions?: string;
  /** Three pre-written, stored explanations of this lesson's work for different workplace audiences. */
  workplaceExplanation?: FullCircleWorkplaceExplanation;
};

export type FullCircleSeries = {
  pathSlug: string;
  projectTitle: string;
  projectTagline: string;
  /** Markdown. The business/organizational scenario this whole series builds toward. */
  businessContext: string;
  /** Markdown. A short preview of the end-to-end architecture, shown on the series overview page. */
  architectureSummary: string;
  lessons: FullCircleLesson[];
};
