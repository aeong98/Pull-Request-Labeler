"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRefBranchMatchPatterns = void 0;
const matcher_1 = require("matcher");
function isRefBranchMatchPatterns(ref, patterns) {
    return patterns.some((pattern) => (0, matcher_1.isMatch)(ref, pattern));
}
exports.isRefBranchMatchPatterns = isRefBranchMatchPatterns;
