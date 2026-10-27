#!/bin/sh
# Sources .env.local then runs run-lesson-pipeline.js for one lesson.
# Usage: redub-one.sh <contentDir> <slug> <n>
cd "G:/Claude/LTV_Academy/ltv-academy" || exit 1
set -a
. ./.env.local
set +a
node scripts/course-build/run-lesson-pipeline.js t-sql "$1" "$2" "$3"
