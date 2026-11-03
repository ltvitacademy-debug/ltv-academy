// Interview timing revision (2026-11): no separate introduction section;
// the formal assessment is 45 minutes (20 + 15 + 10), coaching is 9 minutes,
// total 54. Locks the schedule in so a future edit can't silently drift it
// out of sync with the turn engine's prompts or the grading boundary.
import { describe, it, expect } from "vitest";
import {
  SECTION_SCHEDULE,
  FORMAL_ASSESSMENT_MINUTES,
  TOTAL_INTERVIEW_MINUTES,
  FORMAL_ASSESSMENT_SECTIONS,
  sectionEndMinute,
  isFormalAssessmentSection,
} from "../mockInterviewTypes";

describe("interview timing schedule", () => {
  it("has no 'introduction' section any more", () => {
    expect(SECTION_SCHEDULE.map((s) => s.id)).not.toContain("introduction");
    expect(SECTION_SCHEDULE[0].id).toBe("technical-competency");
  });

  it("sums to the full 54-minute total", () => {
    const sum = SECTION_SCHEDULE.reduce((n, s) => n + s.minutes, 0);
    expect(sum).toBe(TOTAL_INTERVIEW_MINUTES);
    expect(TOTAL_INTERVIEW_MINUTES).toBe(54);
  });

  it("the formal assessment is exactly 45 minutes (technical 20 + project 15 + scenario 10)", () => {
    expect(FORMAL_ASSESSMENT_MINUTES).toBe(45);
    const formalMinutes = SECTION_SCHEDULE.filter((s) => isFormalAssessmentSection(s.id)).reduce((n, s) => n + s.minutes, 0);
    expect(formalMinutes).toBe(FORMAL_ASSESSMENT_MINUTES);
  });

  it("coaching is 9 minutes and is the only non-formal, non-terminal section", () => {
    const coaching = SECTION_SCHEDULE.find((s) => s.id === "coaching");
    expect(coaching?.minutes).toBe(9);
    expect(isFormalAssessmentSection("coaching")).toBe(false);
  });

  it("cumulative section boundaries land at 20, 35, 45, and 54 minutes", () => {
    expect(sectionEndMinute("technical-competency")).toBe(20);
    expect(sectionEndMinute("project-ownership")).toBe(35);
    expect(sectionEndMinute("scenario-problem-solving")).toBe(45);
    expect(sectionEndMinute("coaching")).toBe(54);
  });

  it("FORMAL_ASSESSMENT_SECTIONS contains exactly the three scored sections, in order, with no introduction", () => {
    expect(FORMAL_ASSESSMENT_SECTIONS).toEqual(["technical-competency", "project-ownership", "scenario-problem-solving"]);
  });
});
