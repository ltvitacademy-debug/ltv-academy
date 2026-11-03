// Covers the certificate-eligibility rule: ONLY Advanced-difficulty passes
// are certificate-eligible. Beginner/Intermediate always get a full score +
// coaching + report, never a certificate — even at a perfect score — and a
// high score can never override a failed mandatory requirement at any
// difficulty. These are pure-function tests (no DB) against the single
// source of truth in lib/mockInterviewTypes.ts.
import { describe, it, expect } from "vitest";
import {
  computeOutcome,
  isCertificateEligible,
  resultLabel,
  type PassingCriteria,
} from "../mockInterviewTypes";

const ALL_CRITERIA_MET: PassingCriteria = {
  overallScore: 100,
  correctAnswerRatio: 1,
  allCriticalCompetenciesMet: true,
  projectOwnershipPassed: true,
  allSkillAreasAboveMinimum: true,
};

describe("computeOutcome", () => {
  it("passes when every requirement is met", () => {
    expect(computeOutcome(ALL_CRITERIA_MET, true)).toBe("pass");
  });

  it("fails on a high score if a critical competency was not met (AND logic, no override)", () => {
    const criteria: PassingCriteria = { ...ALL_CRITERIA_MET, allCriticalCompetenciesMet: false };
    expect(computeOutcome(criteria, true)).toBe("fail");
  });

  it("fails on a high score if project ownership was not demonstrated", () => {
    const criteria: PassingCriteria = { ...ALL_CRITERIA_MET, projectOwnershipPassed: false };
    expect(computeOutcome(criteria, true)).toBe("fail");
  });

  it("fails below the 80/100 threshold even with every other requirement met", () => {
    const criteria: PassingCriteria = { ...ALL_CRITERIA_MET, overallScore: 79 };
    expect(computeOutcome(criteria, true)).toBe("fail");
  });

  it("fails at exactly 50% correct answers (must be MORE than half)", () => {
    const criteria: PassingCriteria = { ...ALL_CRITERIA_MET, correctAnswerRatio: 0.5 };
    expect(computeOutcome(criteria, true)).toBe("fail");
  });

  it("is incomplete when the session wasn't fully assessed, regardless of criteria", () => {
    expect(computeOutcome(ALL_CRITERIA_MET, false)).toBe("incomplete");
  });
});

describe("isCertificateEligible — the core requirement from this change", () => {
  it("a Beginner student scoring 100% (a pass) is NOT certificate-eligible", () => {
    const outcome = computeOutcome(ALL_CRITERIA_MET, true);
    expect(outcome).toBe("pass");
    expect(isCertificateEligible("beginner", outcome)).toBe(false);
  });

  it("an Intermediate student scoring 100% (a pass) is NOT certificate-eligible", () => {
    const outcome = computeOutcome(ALL_CRITERIA_MET, true);
    expect(outcome).toBe("pass");
    expect(isCertificateEligible("intermediate", outcome)).toBe(false);
  });

  it("an Advanced student who meets every passing requirement IS certificate-eligible", () => {
    const outcome = computeOutcome(ALL_CRITERIA_MET, true);
    expect(outcome).toBe("pass");
    expect(isCertificateEligible("advanced", outcome)).toBe(true);
  });

  it("an Advanced student who FAILS is NOT certificate-eligible, even though difficulty is right", () => {
    const criteria: PassingCriteria = { ...ALL_CRITERIA_MET, overallScore: 50 };
    const outcome = computeOutcome(criteria, true);
    expect(outcome).toBe("fail");
    expect(isCertificateEligible("advanced", outcome)).toBe(false);
  });

  it("an Advanced, incomplete session is NOT certificate-eligible", () => {
    const outcome = computeOutcome(ALL_CRITERIA_MET, false);
    expect(outcome).toBe("incomplete");
    expect(isCertificateEligible("advanced", outcome)).toBe(false);
  });
});

describe("resultLabel — student-facing wording distinguishes pass from certificate", () => {
  it("Beginner pass reads 'Passed — Certificate Not Eligible'", () => {
    expect(resultLabel("beginner", "pass")).toBe("Passed — Certificate Not Eligible");
  });

  it("Intermediate pass reads 'Passed — Certificate Not Eligible'", () => {
    expect(resultLabel("intermediate", "pass")).toBe("Passed — Certificate Not Eligible");
  });

  it("Advanced pass reads 'Passed — Certificate Earned'", () => {
    expect(resultLabel("advanced", "pass")).toBe("Passed — Certificate Earned");
  });

  it("a fail never mentions a certificate, at any difficulty", () => {
    expect(resultLabel("advanced", "fail")).toBe("Not Passed");
    expect(resultLabel("beginner", "fail")).toBe("Not Passed");
  });

  it("an incomplete session never mentions a certificate, at any difficulty", () => {
    expect(resultLabel("advanced", "incomplete")).toBe("Incomplete");
  });
});
