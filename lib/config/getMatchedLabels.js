"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatchedLabels = void 0;
const isRefBranchMatchPatterns_1 = require("./utils/isRefBranchMatchPatterns");
function getMatchedLabels(config, headRef, baseRef) {
    return config.reduce((labels, entry) => {
        if (entry.head && entry.base) {
            if ((0, isRefBranchMatchPatterns_1.isRefBranchMatchPatterns)(headRef, entry.head) &&
                (0, isRefBranchMatchPatterns_1.isRefBranchMatchPatterns)(baseRef, entry.base)) {
                labels.push(entry.label);
            }
        }
        else if (entry.head && (0, isRefBranchMatchPatterns_1.isRefBranchMatchPatterns)(headRef, entry.head)) {
            labels.push(entry.label);
        }
        else if (entry.base && (0, isRefBranchMatchPatterns_1.isRefBranchMatchPatterns)(baseRef, entry.base)) {
            labels.push(entry.label);
        }
        return labels;
    }, []);
}
exports.getMatchedLabels = getMatchedLabels;
