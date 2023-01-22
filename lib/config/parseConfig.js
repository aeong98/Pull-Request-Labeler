"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseConfig = void 0;
const js_yaml_1 = __importDefault(require("js-yaml"));
function parseConfig(contentBase64) {
    const content = decodeYamlBase64toObject(contentBase64);
    if (!content || typeof content !== 'object') {
        return [];
    }
    return Object.entries(content).reduce((entries, [label, option]) => {
        if (!option.head && !option.base) {
            throw new Error('config.yml has invalid structure.');
        }
        const headPatterns = option.head
            ? getPatternArray(option.head)
            : undefined;
        const basePatterns = option.base
            ? getPatternArray(option.base)
            : undefined;
        entries.push({ label: label, head: headPatterns, base: basePatterns });
        return entries;
    }, []);
}
exports.parseConfig = parseConfig;
const decodeYamlBase64toObject = (base64) => {
    return js_yaml_1.default.load(Buffer.from(base64, 'base64').toString());
};
const getPatternArray = (pattern) => {
    if (Array.isArray(pattern)) {
        return pattern;
    }
    else {
        return [pattern];
    }
};
