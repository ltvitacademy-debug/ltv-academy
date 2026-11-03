// Pure transform shared by scripts/generate-production-schema.js (the CLI
// entry point) and lib/__tests__/prismaSchemaParity.test.ts (which calls
// this directly rather than shelling out, so the check never writes a file
// as a side effect of running tests).
const DATASOURCE_BLOCK_PATTERN = /datasource db \{\s*\n\s*provider\s*=\s*"sqlite"\s*\n\s*url\s*=\s*env\("DATABASE_URL"\)\s*\n\}/;

const BANNER = `// GENERATED FILE — do not hand-edit. Run \`npm run prisma:postgres\` to
// regenerate from prisma/schema.prisma (see scripts/generate-production-schema.js).
// Every model/field/index below is identical to the dev schema; only the
// datasource is different (postgresql instead of sqlite).
`;

/** @param {string} devSchemaSource @returns {string | null} */
function generateProductionSchema(devSchemaSource) {
  if (!DATASOURCE_BLOCK_PATTERN.test(devSchemaSource)) return null;
  return (
    BANNER +
    devSchemaSource.replace(DATASOURCE_BLOCK_PATTERN, 'datasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}')
  );
}

module.exports = { generateProductionSchema, DATASOURCE_BLOCK_PATTERN };
