"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.context = void 0;
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const getConfigFile_1 = require("./config/getConfigFile");
const getMatchedLabels_1 = require("./config/getMatchedLabels");
const parseConfig_1 = require("./config/parseConfig");
exports.context = github.context;
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const { repoToken, configFilePathname } = getInputs();
        const octokit = getOctoKit(repoToken);
        const config = yield getConfig(octokit, configFilePathname);
        const labelsToAdd = getLabelsToAdd(config);
        if (labelsToAdd.length > 0) {
            yield addLabelsToPR(octokit, labelsToAdd);
        }
    });
}
exports.run = run;
const getInputs = () => {
    const repoToken = core.getInput('repo-token', { required: true });
    const configFilePathName = core.getInput('config-pathname', {
        required: true,
    });
    return {
        repoToken,
        configFilePathname: configFilePathName,
    };
};
const getOctoKit = (token) => {
    return github.getOctokit(token);
};
const getConfig = (octokit, configFilePathname) => __awaiter(void 0, void 0, void 0, function* () {
    const config = yield (0, getConfigFile_1.getConfigFile)(octokit, configFilePathname, exports.context);
    if (!config) {
        throw new Error('get config file failed');
    }
    return (0, parseConfig_1.parseConfig)(config);
});
const getLabelsToAdd = (config) => {
    var _a, _b;
    const headRef = (_a = exports.context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.head.ref;
    const baseRef = (_b = exports.context.payload.pull_request) === null || _b === void 0 ? void 0 : _b.base.ref;
    return (0, getMatchedLabels_1.getMatchedLabels)(config, headRef, baseRef);
};
const addLabelsToPR = (octokit, labels) => __awaiter(void 0, void 0, void 0, function* () {
    if (!exports.context.payload.pull_request) {
        return;
    }
    yield octokit.rest.issues.addLabels(Object.assign({ issue_number: exports.context.payload.pull_request.number, labels: labels }, exports.context.repo));
});
