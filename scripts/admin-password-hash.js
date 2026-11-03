// CommonJS mirror of lib/adminAuth.ts's hashPassword — duplicated (not
// imported) because this script runs directly under plain Node, outside
// Next's TS build pipeline, and needs to stay a zero-dependency, zero-build
// CLI tool. lib/__tests__/adminAuth.test.ts cross-checks that a hash
// produced here verifies correctly against lib/adminAuth.ts's
// verifyPassword, so the two can never silently diverge.
const crypto = require("crypto");

function hashPasswordForScript(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

module.exports = { hashPasswordForScript };
