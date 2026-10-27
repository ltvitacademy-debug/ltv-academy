#!/bin/sh
cd "G:/Claude/LTV_Academy/ltv-academy" || exit 1
set -a
. ./.env.local
set +a
node scripts/course-build/redub-batch.js "$1" "$2"
