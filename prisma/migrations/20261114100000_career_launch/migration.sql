-- CreateTable
CREATE TABLE "CareerProfile" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "targetRoles" TEXT NOT NULL,
    "locations" TEXT NOT NULL,
    "compFloor" INTEGER,
    "workAuth" TEXT NOT NULL,
    "excludedCompanies" TEXT NOT NULL,
    "weeklyTarget" INTEGER NOT NULL DEFAULT 5,
    "startAvailability" TEXT NOT NULL,
    "baseResumeText" TEXT,
    "baseResumeApprovedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CareerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobPosting" (
    "id" TEXT NOT NULL,
    "sourceSite" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "remote" BOOLEAN NOT NULL DEFAULT false,
    "salaryRange" TEXT,
    "rawSummary" TEXT NOT NULL,
    "discoveredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobPosting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobApplication" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "postingId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'discovered',
    "matchScore" INTEGER,
    "tailoredResumeText" TEXT,
    "coverLetterText" TEXT,
    "staffNote" TEXT,
    "reviewedByAdminId" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobScrapeState" (
    "id" TEXT NOT NULL,
    "sourceSite" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "nextAttemptAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastError" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobScrapeState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CareerProfile_studentId_key" ON "CareerProfile"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "JobPosting_sourceUrl_key" ON "JobPosting"("sourceUrl");

-- CreateIndex
CREATE INDEX "JobApplication_status_idx" ON "JobApplication"("status");

-- CreateIndex
CREATE UNIQUE INDEX "JobApplication_studentId_postingId_key" ON "JobApplication"("studentId", "postingId");

-- CreateIndex
CREATE UNIQUE INDEX "JobScrapeState_sourceSite_key" ON "JobScrapeState"("sourceSite");

-- AddForeignKey
ALTER TABLE "CareerProfile" ADD CONSTRAINT "CareerProfile_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_postingId_fkey" FOREIGN KEY ("postingId") REFERENCES "JobPosting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
