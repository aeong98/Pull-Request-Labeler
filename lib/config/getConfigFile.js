"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigFile = void 0;
const path_1 = __importDefault(require("path"));
const CONFIG_PATH = '.github';
function getConfigFile(github, fileName, context) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const configFile = {
                owner: context.repo.owner,
                repo: context.repo.repo,
                path: path_1.default.posix.join(CONFIG_PATH, fileName),
                ref: (_a = context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.head.sha,
            };
            const response = yield github.rest.repos.getContent(configFile);
            if (Array.isArray(response.data)) {
                throw new Error(`${fileName} is not file`);
            }
            if (!response.data) {
                throw new Error(`${fileName} is empty`);
            }
            if ('content' in response.data) {
                return response.data.content;
            }
        }
        catch (error) {
            if (error.status === 404) {
                throw new Error('404 error happened');
            }
            throw error;
        }
    });
}
exports.getConfigFile = getConfigFile;
