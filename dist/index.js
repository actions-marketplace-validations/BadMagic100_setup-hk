require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 1285:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tryDownloadApiManifest = void 0;
const links_processing_1 = __nccwpck_require__(9085);
const core = __importStar(__nccwpck_require__(2186));
function tryDownloadApiManifest(manifest) {
    return __awaiter(this, void 0, void 0, function* () {
        core.info(`Attempting to download MAPI v${manifest.version}`);
        const result = yield (0, links_processing_1.downloadLink)(manifest.links);
        if (result.succeeded) {
            core.info(`Successfully downloaded MAPI v${manifest.version} to ${result.resultPath}`);
            return true;
        }
        else {
            core.setFailed(`Failed to download MAPI v${manifest.version}: ${result.detailedReason}`);
            return false;
        }
    });
}
exports.tryDownloadApiManifest = tryDownloadApiManifest;


/***/ }),

/***/ 9085:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.downloadLink = exports.getPreferredLinkPlatform = void 0;
const tc = __importStar(__nccwpck_require__(7784));
const core = __importStar(__nccwpck_require__(2186));
const crypto = __importStar(__nccwpck_require__(6113));
const path = __importStar(__nccwpck_require__(1017));
const promises_1 = __nccwpck_require__(3292);
const schema_types_1 = __nccwpck_require__(3953);
const allowedExtensions = ['.dll', '.zip'];
function readonlyIncludes(list, item) {
    return list.includes(item);
}
function getPreferredLinkPlatform() {
    switch (process.platform) {
        case 'win32':
            return 'windows';
        case 'linux':
            return 'linux';
        case 'darwin':
            return 'mac';
        default:
            throw new Error('Not running on a modlinks-supported platform');
    }
}
exports.getPreferredLinkPlatform = getPreferredLinkPlatform;
function downloadLink(link, dest) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, schema_types_1.isLink)(link)) {
            const platform = getPreferredLinkPlatform();
            link = link[platform];
            core.debug(`Detected platform ${platform} while downloading multiplatform link, selected ${link.href}`);
        }
        try {
            const ext = path.extname(link.href);
            if (!readonlyIncludes(allowedExtensions, ext)) {
                return {
                    succeeded: false,
                    detailedReason: `Download link ${link.href} does not have a supported extension`,
                };
            }
            const resultPath = yield tc.downloadTool(link.href, dest);
            const fileContent = yield (0, promises_1.readFile)(resultPath);
            const actualHash = crypto
                .createHash('sha256')
                .update(fileContent)
                .digest('hex');
            const expectedHash = link.hash.toLowerCase();
            if (actualHash !== expectedHash) {
                return {
                    succeeded: false,
                    detailedReason: `Expected hash ${expectedHash}, got ${actualHash} instead`,
                };
            }
            return { succeeded: true, fileType: ext, resultPath };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unexpected failure';
            return { succeeded: false, detailedReason: message };
        }
    });
}
exports.downloadLink = downloadLink;


/***/ }),

/***/ 3109:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core = __importStar(__nccwpck_require__(2186));
const apilinks_1 = __nccwpck_require__(1285);
const xml_util_1 = __nccwpck_require__(4466);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const installPath = core.getInput('apiPath');
            core.debug(`Requested to install at ${installPath}`); // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
            const apiLinks = yield (0, xml_util_1.parseApiLinks)();
            core.info(JSON.stringify(apiLinks));
            if (yield (0, apilinks_1.tryDownloadApiManifest)(apiLinks)) {
                const modLinks = yield (0, xml_util_1.parseModLinks)();
                core.info(JSON.stringify(modLinks));
            }
        }
        catch (error) {
            if (error instanceof Error)
                core.setFailed(error.message);
        }
    });
}
run();


/***/ }),

/***/ 3953:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isMultiPlatformMod = exports.isAllPlatformMod = exports.isMultiLink = exports.isLink = void 0;
function isLink(link) {
    if ('href' in link && 'hash' in link) {
        return (typeof link.hash === 'string' &&
            link.hash.length > 0 &&
            typeof link.href === 'string' &&
            link.href.length > 0);
    }
    return false;
}
exports.isLink = isLink;
function isMultiLink(link) {
    if ('linux' in link && 'mac' in link && 'windows' in link) {
        return isLink(link.linux) && isLink(link.mac) && isLink(link.windows);
    }
    return false;
}
exports.isMultiLink = isMultiLink;
function isAllPlatformMod(manifest) {
    return 'link' in manifest && isLink(manifest.link);
}
exports.isAllPlatformMod = isAllPlatformMod;
function isMultiPlatformMod(manifest) {
    return 'links' in manifest && isMultiLink(manifest.links);
}
exports.isMultiPlatformMod = isMultiPlatformMod;


/***/ }),

/***/ 3818:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.modLinksTemplate = exports.apiLinksTemplate = void 0;
function linkTemplate(xpath) {
    if (!xpath) {
        xpath = '.';
    }
    return {
        href: xpath,
        hash: xpath + '/@SHA256',
    };
}
function multiLinkTemplate(xpath) {
    if (!xpath) {
        xpath = '.';
    }
    return {
        linux: linkTemplate(xpath + '/Linux'),
        mac: linkTemplate(xpath + '/Mac'),
        windows: linkTemplate(xpath + '/Windows'),
    };
}
exports.apiLinksTemplate = {
    version: 'number(ApiLinks/Manifest/Version)',
    links: multiLinkTemplate('ApiLinks/Manifest/Links'),
    files: ['ApiLinks/Manifest/Files/File', '.'],
};
exports.modLinksTemplate = [
    'ModLinks/Manifest',
    {
        name: 'Name',
        description: 'Description',
        version: 'Version',
        link: linkTemplate('Link'),
        links: multiLinkTemplate('Links'),
        dependencies: ['Dependencies/Dependency', '.'],
    },
];


/***/ }),

/***/ 4466:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseModLinks = exports.parseApiLinks = void 0;
const promises_1 = __nccwpck_require__(3292);
const camaro_1 = __nccwpck_require__(833);
const tc = __importStar(__nccwpck_require__(7784));
const templates_1 = __nccwpck_require__(3818);
const schema_types_1 = __nccwpck_require__(3953);
function downloadXml(link) {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = yield tc.downloadTool(link);
        return yield (0, promises_1.readFile)(filePath, 'utf-8');
    });
}
function cleanModManifests(manifests) {
    manifests.map(manifest => {
        manifest.dependencies = manifest.dependencies.filter(x => x.length > 0);
        if ((0, schema_types_1.isAllPlatformMod)(manifest)) {
            delete manifest.links;
        }
        else if ((0, schema_types_1.isMultiPlatformMod)(manifest)) {
            delete manifest.link;
        }
    });
    return manifests;
}
function parseApiLinks() {
    return __awaiter(this, void 0, void 0, function* () {
        const content = yield downloadXml('https://raw.githubusercontent.com/hk-modding/modlinks/main/ApiLinks.xml');
        return (yield (0, camaro_1.transform)(content, templates_1.apiLinksTemplate));
    });
}
exports.parseApiLinks = parseApiLinks;
const parseModLinks = () => __awaiter(void 0, void 0, void 0, function* () {
    const content = yield downloadXml('https://raw.githubusercontent.com/hk-modding/modlinks/main/ModLinks.xml');
    const manifests = (yield (0, camaro_1.transform)(content, templates_1.modLinksTemplate));
    return cleanModManifests(manifests);
});
exports.parseModLinks = parseModLinks;


/***/ }),

/***/ 7351:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(2037));
const utils_1 = __nccwpck_require__(5278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 2186:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(7351);
const file_command_1 = __nccwpck_require__(717);
const utils_1 = __nccwpck_require__(5278);
const os = __importStar(__nccwpck_require__(2037));
const path = __importStar(__nccwpck_require__(1017));
const oidc_utils_1 = __nccwpck_require__(8041);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    return inputs;
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function error(message, properties = {}) {
    command_1.issueCommand('error', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function warning(message, properties = {}) {
    command_1.issueCommand('warning', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function notice(message, properties = {}) {
    command_1.issueCommand('notice', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.notice = notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
function getIDToken(aud) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
    });
}
exports.getIDToken = getIDToken;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issueCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(7147));
const os = __importStar(__nccwpck_require__(2037));
const utils_1 = __nccwpck_require__(5278);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 8041:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OidcClient = void 0;
const http_client_1 = __nccwpck_require__(9925);
const auth_1 = __nccwpck_require__(3702);
const core_1 = __nccwpck_require__(2186);
class OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new http_client_1.HttpClient('actions/oidc-client', [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
    }
    static getRequestToken() {
        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
        if (!token) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
        }
        return token;
    }
    static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
        if (!runtimeUrl) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
        }
        return runtimeUrl;
    }
    static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const httpclient = OidcClient.createHttpClient();
            const res = yield httpclient
                .getJson(id_token_url)
                .catch(error => {
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.result.message}`);
            });
            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) {
                throw new Error('Response json body do not have ID Token field');
            }
            return id_token;
        });
    }
    static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // New ID Token is requested from action service
                let id_token_url = OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                core_1.debug(`ID token url is ${id_token_url}`);
                const id_token = yield OidcClient.getCall(id_token_url);
                core_1.setSecret(id_token);
                return id_token;
            }
            catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
exports.OidcClient = OidcClient;
//# sourceMappingURL=oidc-utils.js.map

/***/ }),

/***/ 5278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandProperties = exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */
function toCommandProperties(annotationProperties) {
    if (!Object.keys(annotationProperties).length) {
        return {};
    }
    return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
    };
}
exports.toCommandProperties = toCommandProperties;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 1514:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getExecOutput = exports.exec = void 0;
const string_decoder_1 = __nccwpck_require__(1576);
const tr = __importStar(__nccwpck_require__(8159));
/**
 * Exec a command.
 * Output will be streamed to the live console.
 * Returns promise with return code
 *
 * @param     commandLine        command to execute (can include additional args). Must be correctly escaped.
 * @param     args               optional arguments for tool. Escaping is handled by the lib.
 * @param     options            optional exec options.  See ExecOptions
 * @returns   Promise<number>    exit code
 */
function exec(commandLine, args, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const commandArgs = tr.argStringToArray(commandLine);
        if (commandArgs.length === 0) {
            throw new Error(`Parameter 'commandLine' cannot be null or empty.`);
        }
        // Path to tool to execute should be first arg
        const toolPath = commandArgs[0];
        args = commandArgs.slice(1).concat(args || []);
        const runner = new tr.ToolRunner(toolPath, args, options);
        return runner.exec();
    });
}
exports.exec = exec;
/**
 * Exec a command and get the output.
 * Output will be streamed to the live console.
 * Returns promise with the exit code and collected stdout and stderr
 *
 * @param     commandLine           command to execute (can include additional args). Must be correctly escaped.
 * @param     args                  optional arguments for tool. Escaping is handled by the lib.
 * @param     options               optional exec options.  See ExecOptions
 * @returns   Promise<ExecOutput>   exit code, stdout, and stderr
 */
function getExecOutput(commandLine, args, options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let stdout = '';
        let stderr = '';
        //Using string decoder covers the case where a mult-byte character is split
        const stdoutDecoder = new string_decoder_1.StringDecoder('utf8');
        const stderrDecoder = new string_decoder_1.StringDecoder('utf8');
        const originalStdoutListener = (_a = options === null || options === void 0 ? void 0 : options.listeners) === null || _a === void 0 ? void 0 : _a.stdout;
        const originalStdErrListener = (_b = options === null || options === void 0 ? void 0 : options.listeners) === null || _b === void 0 ? void 0 : _b.stderr;
        const stdErrListener = (data) => {
            stderr += stderrDecoder.write(data);
            if (originalStdErrListener) {
                originalStdErrListener(data);
            }
        };
        const stdOutListener = (data) => {
            stdout += stdoutDecoder.write(data);
            if (originalStdoutListener) {
                originalStdoutListener(data);
            }
        };
        const listeners = Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.listeners), { stdout: stdOutListener, stderr: stdErrListener });
        const exitCode = yield exec(commandLine, args, Object.assign(Object.assign({}, options), { listeners }));
        //flush any remaining characters
        stdout += stdoutDecoder.end();
        stderr += stderrDecoder.end();
        return {
            exitCode,
            stdout,
            stderr
        };
    });
}
exports.getExecOutput = getExecOutput;
//# sourceMappingURL=exec.js.map

/***/ }),

/***/ 8159:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.argStringToArray = exports.ToolRunner = void 0;
const os = __importStar(__nccwpck_require__(2037));
const events = __importStar(__nccwpck_require__(2361));
const child = __importStar(__nccwpck_require__(2081));
const path = __importStar(__nccwpck_require__(1017));
const io = __importStar(__nccwpck_require__(7436));
const ioUtil = __importStar(__nccwpck_require__(1962));
const timers_1 = __nccwpck_require__(9512);
/* eslint-disable @typescript-eslint/unbound-method */
const IS_WINDOWS = process.platform === 'win32';
/*
 * Class for running command line tools. Handles quoting and arg parsing in a platform agnostic way.
 */
class ToolRunner extends events.EventEmitter {
    constructor(toolPath, args, options) {
        super();
        if (!toolPath) {
            throw new Error("Parameter 'toolPath' cannot be null or empty.");
        }
        this.toolPath = toolPath;
        this.args = args || [];
        this.options = options || {};
    }
    _debug(message) {
        if (this.options.listeners && this.options.listeners.debug) {
            this.options.listeners.debug(message);
        }
    }
    _getCommandString(options, noPrefix) {
        const toolPath = this._getSpawnFileName();
        const args = this._getSpawnArgs(options);
        let cmd = noPrefix ? '' : '[command]'; // omit prefix when piped to a second tool
        if (IS_WINDOWS) {
            // Windows + cmd file
            if (this._isCmdFile()) {
                cmd += toolPath;
                for (const a of args) {
                    cmd += ` ${a}`;
                }
            }
            // Windows + verbatim
            else if (options.windowsVerbatimArguments) {
                cmd += `"${toolPath}"`;
                for (const a of args) {
                    cmd += ` ${a}`;
                }
            }
            // Windows (regular)
            else {
                cmd += this._windowsQuoteCmdArg(toolPath);
                for (const a of args) {
                    cmd += ` ${this._windowsQuoteCmdArg(a)}`;
                }
            }
        }
        else {
            // OSX/Linux - this can likely be improved with some form of quoting.
            // creating processes on Unix is fundamentally different than Windows.
            // on Unix, execvp() takes an arg array.
            cmd += toolPath;
            for (const a of args) {
                cmd += ` ${a}`;
            }
        }
        return cmd;
    }
    _processLineBuffer(data, strBuffer, onLine) {
        try {
            let s = strBuffer + data.toString();
            let n = s.indexOf(os.EOL);
            while (n > -1) {
                const line = s.substring(0, n);
                onLine(line);
                // the rest of the string ...
                s = s.substring(n + os.EOL.length);
                n = s.indexOf(os.EOL);
            }
            return s;
        }
        catch (err) {
            // streaming lines to console is best effort.  Don't fail a build.
            this._debug(`error processing line. Failed with error ${err}`);
            return '';
        }
    }
    _getSpawnFileName() {
        if (IS_WINDOWS) {
            if (this._isCmdFile()) {
                return process.env['COMSPEC'] || 'cmd.exe';
            }
        }
        return this.toolPath;
    }
    _getSpawnArgs(options) {
        if (IS_WINDOWS) {
            if (this._isCmdFile()) {
                let argline = `/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;
                for (const a of this.args) {
                    argline += ' ';
                    argline += options.windowsVerbatimArguments
                        ? a
                        : this._windowsQuoteCmdArg(a);
                }
                argline += '"';
                return [argline];
            }
        }
        return this.args;
    }
    _endsWith(str, end) {
        return str.endsWith(end);
    }
    _isCmdFile() {
        const upperToolPath = this.toolPath.toUpperCase();
        return (this._endsWith(upperToolPath, '.CMD') ||
            this._endsWith(upperToolPath, '.BAT'));
    }
    _windowsQuoteCmdArg(arg) {
        // for .exe, apply the normal quoting rules that libuv applies
        if (!this._isCmdFile()) {
            return this._uvQuoteCmdArg(arg);
        }
        // otherwise apply quoting rules specific to the cmd.exe command line parser.
        // the libuv rules are generic and are not designed specifically for cmd.exe
        // command line parser.
        //
        // for a detailed description of the cmd.exe command line parser, refer to
        // http://stackoverflow.com/questions/4094699/how-does-the-windows-command-interpreter-cmd-exe-parse-scripts/7970912#7970912
        // need quotes for empty arg
        if (!arg) {
            return '""';
        }
        // determine whether the arg needs to be quoted
        const cmdSpecialChars = [
            ' ',
            '\t',
            '&',
            '(',
            ')',
            '[',
            ']',
            '{',
            '}',
            '^',
            '=',
            ';',
            '!',
            "'",
            '+',
            ',',
            '`',
            '~',
            '|',
            '<',
            '>',
            '"'
        ];
        let needsQuotes = false;
        for (const char of arg) {
            if (cmdSpecialChars.some(x => x === char)) {
                needsQuotes = true;
                break;
            }
        }
        // short-circuit if quotes not needed
        if (!needsQuotes) {
            return arg;
        }
        // the following quoting rules are very similar to the rules that by libuv applies.
        //
        // 1) wrap the string in quotes
        //
        // 2) double-up quotes - i.e. " => ""
        //
        //    this is different from the libuv quoting rules. libuv replaces " with \", which unfortunately
        //    doesn't work well with a cmd.exe command line.
        //
        //    note, replacing " with "" also works well if the arg is passed to a downstream .NET console app.
        //    for example, the command line:
        //          foo.exe "myarg:""my val"""
        //    is parsed by a .NET console app into an arg array:
        //          [ "myarg:\"my val\"" ]
        //    which is the same end result when applying libuv quoting rules. although the actual
        //    command line from libuv quoting rules would look like:
        //          foo.exe "myarg:\"my val\""
        //
        // 3) double-up slashes that precede a quote,
        //    e.g.  hello \world    => "hello \world"
        //          hello\"world    => "hello\\""world"
        //          hello\\"world   => "hello\\\\""world"
        //          hello world\    => "hello world\\"
        //
        //    technically this is not required for a cmd.exe command line, or the batch argument parser.
        //    the reasons for including this as a .cmd quoting rule are:
        //
        //    a) this is optimized for the scenario where the argument is passed from the .cmd file to an
        //       external program. many programs (e.g. .NET console apps) rely on the slash-doubling rule.
        //
        //    b) it's what we've been doing previously (by deferring to node default behavior) and we
        //       haven't heard any complaints about that aspect.
        //
        // note, a weakness of the quoting rules chosen here, is that % is not escaped. in fact, % cannot be
        // escaped when used on the command line directly - even though within a .cmd file % can be escaped
        // by using %%.
        //
        // the saving grace is, on the command line, %var% is left as-is if var is not defined. this contrasts
        // the line parsing rules within a .cmd file, where if var is not defined it is replaced with nothing.
        //
        // one option that was explored was replacing % with ^% - i.e. %var% => ^%var^%. this hack would
        // often work, since it is unlikely that var^ would exist, and the ^ character is removed when the
        // variable is used. the problem, however, is that ^ is not removed when %* is used to pass the args
        // to an external program.
        //
        // an unexplored potential solution for the % escaping problem, is to create a wrapper .cmd file.
        // % can be escaped within a .cmd file.
        let reverse = '"';
        let quoteHit = true;
        for (let i = arg.length; i > 0; i--) {
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === '\\') {
                reverse += '\\'; // double the slash
            }
            else if (arg[i - 1] === '"') {
                quoteHit = true;
                reverse += '"'; // double the quote
            }
            else {
                quoteHit = false;
            }
        }
        reverse += '"';
        return reverse
            .split('')
            .reverse()
            .join('');
    }
    _uvQuoteCmdArg(arg) {
        // Tool runner wraps child_process.spawn() and needs to apply the same quoting as
        // Node in certain cases where the undocumented spawn option windowsVerbatimArguments
        // is used.
        //
        // Since this function is a port of quote_cmd_arg from Node 4.x (technically, lib UV,
        // see https://github.com/nodejs/node/blob/v4.x/deps/uv/src/win/process.c for details),
        // pasting copyright notice from Node within this function:
        //
        //      Copyright Joyent, Inc. and other Node contributors. All rights reserved.
        //
        //      Permission is hereby granted, free of charge, to any person obtaining a copy
        //      of this software and associated documentation files (the "Software"), to
        //      deal in the Software without restriction, including without limitation the
        //      rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
        //      sell copies of the Software, and to permit persons to whom the Software is
        //      furnished to do so, subject to the following conditions:
        //
        //      The above copyright notice and this permission notice shall be included in
        //      all copies or substantial portions of the Software.
        //
        //      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        //      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        //      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        //      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        //      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
        //      FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
        //      IN THE SOFTWARE.
        if (!arg) {
            // Need double quotation for empty argument
            return '""';
        }
        if (!arg.includes(' ') && !arg.includes('\t') && !arg.includes('"')) {
            // No quotation needed
            return arg;
        }
        if (!arg.includes('"') && !arg.includes('\\')) {
            // No embedded double quotes or backslashes, so I can just wrap
            // quote marks around the whole thing.
            return `"${arg}"`;
        }
        // Expected input/output:
        //   input : hello"world
        //   output: "hello\"world"
        //   input : hello""world
        //   output: "hello\"\"world"
        //   input : hello\world
        //   output: hello\world
        //   input : hello\\world
        //   output: hello\\world
        //   input : hello\"world
        //   output: "hello\\\"world"
        //   input : hello\\"world
        //   output: "hello\\\\\"world"
        //   input : hello world\
        //   output: "hello world\\" - note the comment in libuv actually reads "hello world\"
        //                             but it appears the comment is wrong, it should be "hello world\\"
        let reverse = '"';
        let quoteHit = true;
        for (let i = arg.length; i > 0; i--) {
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === '\\') {
                reverse += '\\';
            }
            else if (arg[i - 1] === '"') {
                quoteHit = true;
                reverse += '\\';
            }
            else {
                quoteHit = false;
            }
        }
        reverse += '"';
        return reverse
            .split('')
            .reverse()
            .join('');
    }
    _cloneExecOptions(options) {
        options = options || {};
        const result = {
            cwd: options.cwd || process.cwd(),
            env: options.env || process.env,
            silent: options.silent || false,
            windowsVerbatimArguments: options.windowsVerbatimArguments || false,
            failOnStdErr: options.failOnStdErr || false,
            ignoreReturnCode: options.ignoreReturnCode || false,
            delay: options.delay || 10000
        };
        result.outStream = options.outStream || process.stdout;
        result.errStream = options.errStream || process.stderr;
        return result;
    }
    _getSpawnOptions(options, toolPath) {
        options = options || {};
        const result = {};
        result.cwd = options.cwd;
        result.env = options.env;
        result['windowsVerbatimArguments'] =
            options.windowsVerbatimArguments || this._isCmdFile();
        if (options.windowsVerbatimArguments) {
            result.argv0 = `"${toolPath}"`;
        }
        return result;
    }
    /**
     * Exec a tool.
     * Output will be streamed to the live console.
     * Returns promise with return code
     *
     * @param     tool     path to tool to exec
     * @param     options  optional exec options.  See ExecOptions
     * @returns   number
     */
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            // root the tool path if it is unrooted and contains relative pathing
            if (!ioUtil.isRooted(this.toolPath) &&
                (this.toolPath.includes('/') ||
                    (IS_WINDOWS && this.toolPath.includes('\\')))) {
                // prefer options.cwd if it is specified, however options.cwd may also need to be rooted
                this.toolPath = path.resolve(process.cwd(), this.options.cwd || process.cwd(), this.toolPath);
            }
            // if the tool is only a file name, then resolve it from the PATH
            // otherwise verify it exists (add extension on Windows if necessary)
            this.toolPath = yield io.which(this.toolPath, true);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                this._debug(`exec tool: ${this.toolPath}`);
                this._debug('arguments:');
                for (const arg of this.args) {
                    this._debug(`   ${arg}`);
                }
                const optionsNonNull = this._cloneExecOptions(this.options);
                if (!optionsNonNull.silent && optionsNonNull.outStream) {
                    optionsNonNull.outStream.write(this._getCommandString(optionsNonNull) + os.EOL);
                }
                const state = new ExecState(optionsNonNull, this.toolPath);
                state.on('debug', (message) => {
                    this._debug(message);
                });
                if (this.options.cwd && !(yield ioUtil.exists(this.options.cwd))) {
                    return reject(new Error(`The cwd: ${this.options.cwd} does not exist!`));
                }
                const fileName = this._getSpawnFileName();
                const cp = child.spawn(fileName, this._getSpawnArgs(optionsNonNull), this._getSpawnOptions(this.options, fileName));
                let stdbuffer = '';
                if (cp.stdout) {
                    cp.stdout.on('data', (data) => {
                        if (this.options.listeners && this.options.listeners.stdout) {
                            this.options.listeners.stdout(data);
                        }
                        if (!optionsNonNull.silent && optionsNonNull.outStream) {
                            optionsNonNull.outStream.write(data);
                        }
                        stdbuffer = this._processLineBuffer(data, stdbuffer, (line) => {
                            if (this.options.listeners && this.options.listeners.stdline) {
                                this.options.listeners.stdline(line);
                            }
                        });
                    });
                }
                let errbuffer = '';
                if (cp.stderr) {
                    cp.stderr.on('data', (data) => {
                        state.processStderr = true;
                        if (this.options.listeners && this.options.listeners.stderr) {
                            this.options.listeners.stderr(data);
                        }
                        if (!optionsNonNull.silent &&
                            optionsNonNull.errStream &&
                            optionsNonNull.outStream) {
                            const s = optionsNonNull.failOnStdErr
                                ? optionsNonNull.errStream
                                : optionsNonNull.outStream;
                            s.write(data);
                        }
                        errbuffer = this._processLineBuffer(data, errbuffer, (line) => {
                            if (this.options.listeners && this.options.listeners.errline) {
                                this.options.listeners.errline(line);
                            }
                        });
                    });
                }
                cp.on('error', (err) => {
                    state.processError = err.message;
                    state.processExited = true;
                    state.processClosed = true;
                    state.CheckComplete();
                });
                cp.on('exit', (code) => {
                    state.processExitCode = code;
                    state.processExited = true;
                    this._debug(`Exit code ${code} received from tool '${this.toolPath}'`);
                    state.CheckComplete();
                });
                cp.on('close', (code) => {
                    state.processExitCode = code;
                    state.processExited = true;
                    state.processClosed = true;
                    this._debug(`STDIO streams have closed for tool '${this.toolPath}'`);
                    state.CheckComplete();
                });
                state.on('done', (error, exitCode) => {
                    if (stdbuffer.length > 0) {
                        this.emit('stdline', stdbuffer);
                    }
                    if (errbuffer.length > 0) {
                        this.emit('errline', errbuffer);
                    }
                    cp.removeAllListeners();
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(exitCode);
                    }
                });
                if (this.options.input) {
                    if (!cp.stdin) {
                        throw new Error('child process missing stdin');
                    }
                    cp.stdin.end(this.options.input);
                }
            }));
        });
    }
}
exports.ToolRunner = ToolRunner;
/**
 * Convert an arg string to an array of args. Handles escaping
 *
 * @param    argString   string of arguments
 * @returns  string[]    array of arguments
 */
function argStringToArray(argString) {
    const args = [];
    let inQuotes = false;
    let escaped = false;
    let arg = '';
    function append(c) {
        // we only escape double quotes.
        if (escaped && c !== '"') {
            arg += '\\';
        }
        arg += c;
        escaped = false;
    }
    for (let i = 0; i < argString.length; i++) {
        const c = argString.charAt(i);
        if (c === '"') {
            if (!escaped) {
                inQuotes = !inQuotes;
            }
            else {
                append(c);
            }
            continue;
        }
        if (c === '\\' && escaped) {
            append(c);
            continue;
        }
        if (c === '\\' && inQuotes) {
            escaped = true;
            continue;
        }
        if (c === ' ' && !inQuotes) {
            if (arg.length > 0) {
                args.push(arg);
                arg = '';
            }
            continue;
        }
        append(c);
    }
    if (arg.length > 0) {
        args.push(arg.trim());
    }
    return args;
}
exports.argStringToArray = argStringToArray;
class ExecState extends events.EventEmitter {
    constructor(options, toolPath) {
        super();
        this.processClosed = false; // tracks whether the process has exited and stdio is closed
        this.processError = '';
        this.processExitCode = 0;
        this.processExited = false; // tracks whether the process has exited
        this.processStderr = false; // tracks whether stderr was written to
        this.delay = 10000; // 10 seconds
        this.done = false;
        this.timeout = null;
        if (!toolPath) {
            throw new Error('toolPath must not be empty');
        }
        this.options = options;
        this.toolPath = toolPath;
        if (options.delay) {
            this.delay = options.delay;
        }
    }
    CheckComplete() {
        if (this.done) {
            return;
        }
        if (this.processClosed) {
            this._setResult();
        }
        else if (this.processExited) {
            this.timeout = timers_1.setTimeout(ExecState.HandleTimeout, this.delay, this);
        }
    }
    _debug(message) {
        this.emit('debug', message);
    }
    _setResult() {
        // determine whether there is an error
        let error;
        if (this.processExited) {
            if (this.processError) {
                error = new Error(`There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`);
            }
            else if (this.processExitCode !== 0 && !this.options.ignoreReturnCode) {
                error = new Error(`The process '${this.toolPath}' failed with exit code ${this.processExitCode}`);
            }
            else if (this.processStderr && this.options.failOnStdErr) {
                error = new Error(`The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`);
            }
        }
        // clear the timeout
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        this.done = true;
        this.emit('done', error, this.processExitCode);
    }
    static HandleTimeout(state) {
        if (state.done) {
            return;
        }
        if (!state.processClosed && state.processExited) {
            const message = `The STDIO streams did not close within ${state.delay /
                1000} seconds of the exit event from process '${state.toolPath}'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;
            state._debug(message);
        }
        state._setResult();
    }
}
//# sourceMappingURL=toolrunner.js.map

/***/ }),

/***/ 3702:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class BasicCredentialHandler {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        options.headers['Authorization'] =
            'Basic ' +
                Buffer.from(this.username + ':' + this.password).toString('base64');
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        options.headers['Authorization'] = 'Bearer ' + this.token;
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        options.headers['Authorization'] =
            'Basic ' + Buffer.from('PAT:' + this.token).toString('base64');
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;


/***/ }),

/***/ 9925:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const http = __nccwpck_require__(3685);
const https = __nccwpck_require__(5687);
const pm = __nccwpck_require__(6443);
let tunnel;
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    let proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return new Promise(async (resolve, reject) => {
            let output = Buffer.alloc(0);
            this.message.on('data', (chunk) => {
                output = Buffer.concat([output, chunk]);
            });
            this.message.on('end', () => {
                resolve(output.toString());
            });
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    let parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
    }
    get(requestUrl, additionalHeaders) {
        return this.request('GET', requestUrl, null, additionalHeaders || {});
    }
    del(requestUrl, additionalHeaders) {
        return this.request('DELETE', requestUrl, null, additionalHeaders || {});
    }
    post(requestUrl, data, additionalHeaders) {
        return this.request('POST', requestUrl, data, additionalHeaders || {});
    }
    patch(requestUrl, data, additionalHeaders) {
        return this.request('PATCH', requestUrl, data, additionalHeaders || {});
    }
    put(requestUrl, data, additionalHeaders) {
        return this.request('PUT', requestUrl, data, additionalHeaders || {});
    }
    head(requestUrl, additionalHeaders) {
        return this.request('HEAD', requestUrl, null, additionalHeaders || {});
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    async getJson(requestUrl, additionalHeaders = {}) {
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        let res = await this.get(requestUrl, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async postJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.post(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async putJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.put(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async patchJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.patch(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    async request(verb, requestUrl, data, headers) {
        if (this._disposed) {
            throw new Error('Client has already been disposed.');
        }
        let parsedUrl = new URL(requestUrl);
        let info = this._prepareRequest(verb, parsedUrl, headers);
        // Only perform retries on reads since writes may not be idempotent.
        let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1
            ? this._maxRetries + 1
            : 1;
        let numTries = 0;
        let response;
        while (numTries < maxTries) {
            response = await this.requestRaw(info, data);
            // Check if it's an authentication challenge
            if (response &&
                response.message &&
                response.message.statusCode === HttpCodes.Unauthorized) {
                let authenticationHandler;
                for (let i = 0; i < this.handlers.length; i++) {
                    if (this.handlers[i].canHandleAuthentication(response)) {
                        authenticationHandler = this.handlers[i];
                        break;
                    }
                }
                if (authenticationHandler) {
                    return authenticationHandler.handleAuthentication(this, info, data);
                }
                else {
                    // We have received an unauthorized response but have no handlers to handle it.
                    // Let the response return to the caller.
                    return response;
                }
            }
            let redirectsRemaining = this._maxRedirects;
            while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1 &&
                this._allowRedirects &&
                redirectsRemaining > 0) {
                const redirectUrl = response.message.headers['location'];
                if (!redirectUrl) {
                    // if there's no location to redirect to, we won't
                    break;
                }
                let parsedRedirectUrl = new URL(redirectUrl);
                if (parsedUrl.protocol == 'https:' &&
                    parsedUrl.protocol != parsedRedirectUrl.protocol &&
                    !this._allowRedirectDowngrade) {
                    throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                }
                // we need to finish reading the response before reassigning response
                // which will leak the open socket.
                await response.readBody();
                // strip authorization header if redirected to a different hostname
                if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                    for (let header in headers) {
                        // header names are case insensitive
                        if (header.toLowerCase() === 'authorization') {
                            delete headers[header];
                        }
                    }
                }
                // let's make the request with the new redirectUrl
                info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                response = await this.requestRaw(info, data);
                redirectsRemaining--;
            }
            if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
                // If not a retry code, return immediately instead of retrying
                return response;
            }
            numTries += 1;
            if (numTries < maxTries) {
                await response.readBody();
                await this._performExponentialBackoff(numTries);
            }
        }
        return response;
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return new Promise((resolve, reject) => {
            let callbackForResult = function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            };
            this.requestRawWithCallback(info, data, callbackForResult);
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        let socket;
        if (typeof data === 'string') {
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        let handleResult = (err, res) => {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        };
        let req = info.httpModule.request(info.options, (msg) => {
            let res = new HttpClientResponse(msg);
            handleResult(null, res);
        });
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error('Request timeout: ' + info.options.path), null);
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err, null);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
        let parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) {
            this.handlers.forEach(handler => {
                handler.prepareRequest(info.options);
            });
        }
        return info;
    }
    _mergeHeaders(headers) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        }
        return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        let proxyUrl = pm.getProxyUrl(parsedUrl);
        let useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (!!agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (!!this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (useProxy) {
            // If using proxy, need tunnel
            if (!tunnel) {
                tunnel = __nccwpck_require__(4294);
            }
            const agentOptions = {
                maxSockets: maxSockets,
                keepAlive: this._keepAlive,
                proxy: {
                    ...((proxyUrl.username || proxyUrl.password) && {
                        proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                    }),
                    host: proxyUrl.hostname,
                    port: proxyUrl.port
                }
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets: maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
                rejectUnauthorized: false
            });
        }
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise(resolve => setTimeout(() => resolve(), ms));
    }
    static dateTimeDeserializer(key, value) {
        if (typeof value === 'string') {
            let a = new Date(value);
            if (!isNaN(a.valueOf())) {
                return a;
            }
        }
        return value;
    }
    async _processResponse(res, options) {
        return new Promise(async (resolve, reject) => {
            const statusCode = res.message.statusCode;
            const response = {
                statusCode: statusCode,
                result: null,
                headers: {}
            };
            // not found leads to null obj returned
            if (statusCode == HttpCodes.NotFound) {
                resolve(response);
            }
            let obj;
            let contents;
            // get the result from the body
            try {
                contents = await res.readBody();
                if (contents && contents.length > 0) {
                    if (options && options.deserializeDates) {
                        obj = JSON.parse(contents, HttpClient.dateTimeDeserializer);
                    }
                    else {
                        obj = JSON.parse(contents);
                    }
                    response.result = obj;
                }
                response.headers = res.message.headers;
            }
            catch (err) {
                // Invalid resource (contents not json);  leaving result obj null
            }
            // note that 3xx redirects are handled by the http layer.
            if (statusCode > 299) {
                let msg;
                // if exception/error in body, attempt to get better error
                if (obj && obj.message) {
                    msg = obj.message;
                }
                else if (contents && contents.length > 0) {
                    // it may be the case that the exception is in the body message as string
                    msg = contents;
                }
                else {
                    msg = 'Failed request: (' + statusCode + ')';
                }
                let err = new HttpClientError(msg, statusCode);
                err.result = response.result;
                reject(err);
            }
            else {
                resolve(response);
            }
        });
    }
}
exports.HttpClient = HttpClient;


/***/ }),

/***/ 6443:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function getProxyUrl(reqUrl) {
    let usingSsl = reqUrl.protocol === 'https:';
    let proxyUrl;
    if (checkBypass(reqUrl)) {
        return proxyUrl;
    }
    let proxyVar;
    if (usingSsl) {
        proxyVar = process.env['https_proxy'] || process.env['HTTPS_PROXY'];
    }
    else {
        proxyVar = process.env['http_proxy'] || process.env['HTTP_PROXY'];
    }
    if (proxyVar) {
        proxyUrl = new URL(proxyVar);
    }
    return proxyUrl;
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    let noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    let upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (let upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperReqHosts.some(x => x === upperNoProxyItem)) {
            return true;
        }
    }
    return false;
}
exports.checkBypass = checkBypass;


/***/ }),

/***/ 1962:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCmdPath = exports.tryGetExecutablePath = exports.isRooted = exports.isDirectory = exports.exists = exports.IS_WINDOWS = exports.unlink = exports.symlink = exports.stat = exports.rmdir = exports.rename = exports.readlink = exports.readdir = exports.mkdir = exports.lstat = exports.copyFile = exports.chmod = void 0;
const fs = __importStar(__nccwpck_require__(7147));
const path = __importStar(__nccwpck_require__(1017));
_a = fs.promises, exports.chmod = _a.chmod, exports.copyFile = _a.copyFile, exports.lstat = _a.lstat, exports.mkdir = _a.mkdir, exports.readdir = _a.readdir, exports.readlink = _a.readlink, exports.rename = _a.rename, exports.rmdir = _a.rmdir, exports.stat = _a.stat, exports.symlink = _a.symlink, exports.unlink = _a.unlink;
exports.IS_WINDOWS = process.platform === 'win32';
function exists(fsPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.stat(fsPath);
        }
        catch (err) {
            if (err.code === 'ENOENT') {
                return false;
            }
            throw err;
        }
        return true;
    });
}
exports.exists = exists;
function isDirectory(fsPath, useStat = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const stats = useStat ? yield exports.stat(fsPath) : yield exports.lstat(fsPath);
        return stats.isDirectory();
    });
}
exports.isDirectory = isDirectory;
/**
 * On OSX/Linux, true if path starts with '/'. On Windows, true for paths like:
 * \, \hello, \\hello\share, C:, and C:\hello (and corresponding alternate separator cases).
 */
function isRooted(p) {
    p = normalizeSeparators(p);
    if (!p) {
        throw new Error('isRooted() parameter "p" cannot be empty');
    }
    if (exports.IS_WINDOWS) {
        return (p.startsWith('\\') || /^[A-Z]:/i.test(p) // e.g. \ or \hello or \\hello
        ); // e.g. C: or C:\hello
    }
    return p.startsWith('/');
}
exports.isRooted = isRooted;
/**
 * Best effort attempt to determine whether a file exists and is executable.
 * @param filePath    file path to check
 * @param extensions  additional file extensions to try
 * @return if file exists and is executable, returns the file path. otherwise empty string.
 */
function tryGetExecutablePath(filePath, extensions) {
    return __awaiter(this, void 0, void 0, function* () {
        let stats = undefined;
        try {
            // test file exists
            stats = yield exports.stat(filePath);
        }
        catch (err) {
            if (err.code !== 'ENOENT') {
                // eslint-disable-next-line no-console
                console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
            }
        }
        if (stats && stats.isFile()) {
            if (exports.IS_WINDOWS) {
                // on Windows, test for valid extension
                const upperExt = path.extname(filePath).toUpperCase();
                if (extensions.some(validExt => validExt.toUpperCase() === upperExt)) {
                    return filePath;
                }
            }
            else {
                if (isUnixExecutable(stats)) {
                    return filePath;
                }
            }
        }
        // try each extension
        const originalFilePath = filePath;
        for (const extension of extensions) {
            filePath = originalFilePath + extension;
            stats = undefined;
            try {
                stats = yield exports.stat(filePath);
            }
            catch (err) {
                if (err.code !== 'ENOENT') {
                    // eslint-disable-next-line no-console
                    console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
                }
            }
            if (stats && stats.isFile()) {
                if (exports.IS_WINDOWS) {
                    // preserve the case of the actual file (since an extension was appended)
                    try {
                        const directory = path.dirname(filePath);
                        const upperName = path.basename(filePath).toUpperCase();
                        for (const actualName of yield exports.readdir(directory)) {
                            if (upperName === actualName.toUpperCase()) {
                                filePath = path.join(directory, actualName);
                                break;
                            }
                        }
                    }
                    catch (err) {
                        // eslint-disable-next-line no-console
                        console.log(`Unexpected error attempting to determine the actual case of the file '${filePath}': ${err}`);
                    }
                    return filePath;
                }
                else {
                    if (isUnixExecutable(stats)) {
                        return filePath;
                    }
                }
            }
        }
        return '';
    });
}
exports.tryGetExecutablePath = tryGetExecutablePath;
function normalizeSeparators(p) {
    p = p || '';
    if (exports.IS_WINDOWS) {
        // convert slashes on Windows
        p = p.replace(/\//g, '\\');
        // remove redundant slashes
        return p.replace(/\\\\+/g, '\\');
    }
    // remove redundant slashes
    return p.replace(/\/\/+/g, '/');
}
// on Mac/Linux, test the execute bit
//     R   W  X  R  W X R W X
//   256 128 64 32 16 8 4 2 1
function isUnixExecutable(stats) {
    return ((stats.mode & 1) > 0 ||
        ((stats.mode & 8) > 0 && stats.gid === process.getgid()) ||
        ((stats.mode & 64) > 0 && stats.uid === process.getuid()));
}
// Get the path of cmd.exe in windows
function getCmdPath() {
    var _a;
    return (_a = process.env['COMSPEC']) !== null && _a !== void 0 ? _a : `cmd.exe`;
}
exports.getCmdPath = getCmdPath;
//# sourceMappingURL=io-util.js.map

/***/ }),

/***/ 7436:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.findInPath = exports.which = exports.mkdirP = exports.rmRF = exports.mv = exports.cp = void 0;
const assert_1 = __nccwpck_require__(9491);
const childProcess = __importStar(__nccwpck_require__(2081));
const path = __importStar(__nccwpck_require__(1017));
const util_1 = __nccwpck_require__(3837);
const ioUtil = __importStar(__nccwpck_require__(1962));
const exec = util_1.promisify(childProcess.exec);
const execFile = util_1.promisify(childProcess.execFile);
/**
 * Copies a file or folder.
 * Based off of shelljs - https://github.com/shelljs/shelljs/blob/9237f66c52e5daa40458f94f9565e18e8132f5a6/src/cp.js
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See CopyOptions.
 */
function cp(source, dest, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const { force, recursive, copySourceDirectory } = readCopyOptions(options);
        const destStat = (yield ioUtil.exists(dest)) ? yield ioUtil.stat(dest) : null;
        // Dest is an existing file, but not forcing
        if (destStat && destStat.isFile() && !force) {
            return;
        }
        // If dest is an existing directory, should copy inside.
        const newDest = destStat && destStat.isDirectory() && copySourceDirectory
            ? path.join(dest, path.basename(source))
            : dest;
        if (!(yield ioUtil.exists(source))) {
            throw new Error(`no such file or directory: ${source}`);
        }
        const sourceStat = yield ioUtil.stat(source);
        if (sourceStat.isDirectory()) {
            if (!recursive) {
                throw new Error(`Failed to copy. ${source} is a directory, but tried to copy without recursive flag.`);
            }
            else {
                yield cpDirRecursive(source, newDest, 0, force);
            }
        }
        else {
            if (path.relative(source, newDest) === '') {
                // a file cannot be copied to itself
                throw new Error(`'${newDest}' and '${source}' are the same file`);
            }
            yield copyFile(source, newDest, force);
        }
    });
}
exports.cp = cp;
/**
 * Moves a path.
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See MoveOptions.
 */
function mv(source, dest, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield ioUtil.exists(dest)) {
            let destExists = true;
            if (yield ioUtil.isDirectory(dest)) {
                // If dest is directory copy src into dest
                dest = path.join(dest, path.basename(source));
                destExists = yield ioUtil.exists(dest);
            }
            if (destExists) {
                if (options.force == null || options.force) {
                    yield rmRF(dest);
                }
                else {
                    throw new Error('Destination already exists');
                }
            }
        }
        yield mkdirP(path.dirname(dest));
        yield ioUtil.rename(source, dest);
    });
}
exports.mv = mv;
/**
 * Remove a path recursively with force
 *
 * @param inputPath path to remove
 */
function rmRF(inputPath) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ioUtil.IS_WINDOWS) {
            // Node doesn't provide a delete operation, only an unlink function. This means that if the file is being used by another
            // program (e.g. antivirus), it won't be deleted. To address this, we shell out the work to rd/del.
            // Check for invalid characters
            // https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file
            if (/[*"<>|]/.test(inputPath)) {
                throw new Error('File path must not contain `*`, `"`, `<`, `>` or `|` on Windows');
            }
            try {
                const cmdPath = ioUtil.getCmdPath();
                if (yield ioUtil.isDirectory(inputPath, true)) {
                    yield exec(`${cmdPath} /s /c "rd /s /q "%inputPath%""`, {
                        env: { inputPath }
                    });
                }
                else {
                    yield exec(`${cmdPath} /s /c "del /f /a "%inputPath%""`, {
                        env: { inputPath }
                    });
                }
            }
            catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== 'ENOENT')
                    throw err;
            }
            // Shelling out fails to remove a symlink folder with missing source, this unlink catches that
            try {
                yield ioUtil.unlink(inputPath);
            }
            catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== 'ENOENT')
                    throw err;
            }
        }
        else {
            let isDir = false;
            try {
                isDir = yield ioUtil.isDirectory(inputPath);
            }
            catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== 'ENOENT')
                    throw err;
                return;
            }
            if (isDir) {
                yield execFile(`rm`, [`-rf`, `${inputPath}`]);
            }
            else {
                yield ioUtil.unlink(inputPath);
            }
        }
    });
}
exports.rmRF = rmRF;
/**
 * Make a directory.  Creates the full path with folders in between
 * Will throw if it fails
 *
 * @param   fsPath        path to create
 * @returns Promise<void>
 */
function mkdirP(fsPath) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.ok(fsPath, 'a path argument must be provided');
        yield ioUtil.mkdir(fsPath, { recursive: true });
    });
}
exports.mkdirP = mkdirP;
/**
 * Returns path of a tool had the tool actually been invoked.  Resolves via paths.
 * If you check and the tool does not exist, it will throw.
 *
 * @param     tool              name of the tool
 * @param     check             whether to check if tool exists
 * @returns   Promise<string>   path to tool
 */
function which(tool, check) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!tool) {
            throw new Error("parameter 'tool' is required");
        }
        // recursive when check=true
        if (check) {
            const result = yield which(tool, false);
            if (!result) {
                if (ioUtil.IS_WINDOWS) {
                    throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`);
                }
                else {
                    throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`);
                }
            }
            return result;
        }
        const matches = yield findInPath(tool);
        if (matches && matches.length > 0) {
            return matches[0];
        }
        return '';
    });
}
exports.which = which;
/**
 * Returns a list of all occurrences of the given tool on the system path.
 *
 * @returns   Promise<string[]>  the paths of the tool
 */
function findInPath(tool) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!tool) {
            throw new Error("parameter 'tool' is required");
        }
        // build the list of extensions to try
        const extensions = [];
        if (ioUtil.IS_WINDOWS && process.env['PATHEXT']) {
            for (const extension of process.env['PATHEXT'].split(path.delimiter)) {
                if (extension) {
                    extensions.push(extension);
                }
            }
        }
        // if it's rooted, return it if exists. otherwise return empty.
        if (ioUtil.isRooted(tool)) {
            const filePath = yield ioUtil.tryGetExecutablePath(tool, extensions);
            if (filePath) {
                return [filePath];
            }
            return [];
        }
        // if any path separators, return empty
        if (tool.includes(path.sep)) {
            return [];
        }
        // build the list of directories
        //
        // Note, technically "where" checks the current directory on Windows. From a toolkit perspective,
        // it feels like we should not do this. Checking the current directory seems like more of a use
        // case of a shell, and the which() function exposed by the toolkit should strive for consistency
        // across platforms.
        const directories = [];
        if (process.env.PATH) {
            for (const p of process.env.PATH.split(path.delimiter)) {
                if (p) {
                    directories.push(p);
                }
            }
        }
        // find all matches
        const matches = [];
        for (const directory of directories) {
            const filePath = yield ioUtil.tryGetExecutablePath(path.join(directory, tool), extensions);
            if (filePath) {
                matches.push(filePath);
            }
        }
        return matches;
    });
}
exports.findInPath = findInPath;
function readCopyOptions(options) {
    const force = options.force == null ? true : options.force;
    const recursive = Boolean(options.recursive);
    const copySourceDirectory = options.copySourceDirectory == null
        ? true
        : Boolean(options.copySourceDirectory);
    return { force, recursive, copySourceDirectory };
}
function cpDirRecursive(sourceDir, destDir, currentDepth, force) {
    return __awaiter(this, void 0, void 0, function* () {
        // Ensure there is not a run away recursive copy
        if (currentDepth >= 255)
            return;
        currentDepth++;
        yield mkdirP(destDir);
        const files = yield ioUtil.readdir(sourceDir);
        for (const fileName of files) {
            const srcFile = `${sourceDir}/${fileName}`;
            const destFile = `${destDir}/${fileName}`;
            const srcFileStat = yield ioUtil.lstat(srcFile);
            if (srcFileStat.isDirectory()) {
                // Recurse
                yield cpDirRecursive(srcFile, destFile, currentDepth, force);
            }
            else {
                yield copyFile(srcFile, destFile, force);
            }
        }
        // Change the mode for the newly created directory
        yield ioUtil.chmod(destDir, (yield ioUtil.stat(sourceDir)).mode);
    });
}
// Buffered file copy
function copyFile(srcFile, destFile, force) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((yield ioUtil.lstat(srcFile)).isSymbolicLink()) {
            // unlink/re-link it
            try {
                yield ioUtil.lstat(destFile);
                yield ioUtil.unlink(destFile);
            }
            catch (e) {
                // Try to override file permission
                if (e.code === 'EPERM') {
                    yield ioUtil.chmod(destFile, '0666');
                    yield ioUtil.unlink(destFile);
                }
                // other errors = it doesn't exist, no work to do
            }
            // Copy over symlink
            const symlinkFull = yield ioUtil.readlink(srcFile);
            yield ioUtil.symlink(symlinkFull, destFile, ioUtil.IS_WINDOWS ? 'junction' : null);
        }
        else if (!(yield ioUtil.exists(destFile)) || force) {
            yield ioUtil.copyFile(srcFile, destFile);
        }
    });
}
//# sourceMappingURL=io.js.map

/***/ }),

/***/ 2473:
/***/ (function(module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports._readLinuxVersionFile = exports._getOsVersion = exports._findMatch = void 0;
const semver = __importStar(__nccwpck_require__(5911));
const core_1 = __nccwpck_require__(2186);
// needs to be require for core node modules to be mocked
/* eslint @typescript-eslint/no-require-imports: 0 */
const os = __nccwpck_require__(2037);
const cp = __nccwpck_require__(2081);
const fs = __nccwpck_require__(7147);
function _findMatch(versionSpec, stable, candidates, archFilter) {
    return __awaiter(this, void 0, void 0, function* () {
        const platFilter = os.platform();
        let result;
        let match;
        let file;
        for (const candidate of candidates) {
            const version = candidate.version;
            core_1.debug(`check ${version} satisfies ${versionSpec}`);
            if (semver.satisfies(version, versionSpec) &&
                (!stable || candidate.stable === stable)) {
                file = candidate.files.find(item => {
                    core_1.debug(`${item.arch}===${archFilter} && ${item.platform}===${platFilter}`);
                    let chk = item.arch === archFilter && item.platform === platFilter;
                    if (chk && item.platform_version) {
                        const osVersion = module.exports._getOsVersion();
                        if (osVersion === item.platform_version) {
                            chk = true;
                        }
                        else {
                            chk = semver.satisfies(osVersion, item.platform_version);
                        }
                    }
                    return chk;
                });
                if (file) {
                    core_1.debug(`matched ${candidate.version}`);
                    match = candidate;
                    break;
                }
            }
        }
        if (match && file) {
            // clone since we're mutating the file list to be only the file that matches
            result = Object.assign({}, match);
            result.files = [file];
        }
        return result;
    });
}
exports._findMatch = _findMatch;
function _getOsVersion() {
    // TODO: add windows and other linux, arm variants
    // right now filtering on version is only an ubuntu and macos scenario for tools we build for hosted (python)
    const plat = os.platform();
    let version = '';
    if (plat === 'darwin') {
        version = cp.execSync('sw_vers -productVersion').toString();
    }
    else if (plat === 'linux') {
        // lsb_release process not in some containers, readfile
        // Run cat /etc/lsb-release
        // DISTRIB_ID=Ubuntu
        // DISTRIB_RELEASE=18.04
        // DISTRIB_CODENAME=bionic
        // DISTRIB_DESCRIPTION="Ubuntu 18.04.4 LTS"
        const lsbContents = module.exports._readLinuxVersionFile();
        if (lsbContents) {
            const lines = lsbContents.split('\n');
            for (const line of lines) {
                const parts = line.split('=');
                if (parts.length === 2 &&
                    (parts[0].trim() === 'VERSION_ID' ||
                        parts[0].trim() === 'DISTRIB_RELEASE')) {
                    version = parts[1]
                        .trim()
                        .replace(/^"/, '')
                        .replace(/"$/, '');
                    break;
                }
            }
        }
    }
    return version;
}
exports._getOsVersion = _getOsVersion;
function _readLinuxVersionFile() {
    const lsbReleaseFile = '/etc/lsb-release';
    const osReleaseFile = '/etc/os-release';
    let contents = '';
    if (fs.existsSync(lsbReleaseFile)) {
        contents = fs.readFileSync(lsbReleaseFile).toString();
    }
    else if (fs.existsSync(osReleaseFile)) {
        contents = fs.readFileSync(osReleaseFile).toString();
    }
    return contents;
}
exports._readLinuxVersionFile = _readLinuxVersionFile;
//# sourceMappingURL=manifest.js.map

/***/ }),

/***/ 8279:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RetryHelper = void 0;
const core = __importStar(__nccwpck_require__(2186));
/**
 * Internal class for retries
 */
class RetryHelper {
    constructor(maxAttempts, minSeconds, maxSeconds) {
        if (maxAttempts < 1) {
            throw new Error('max attempts should be greater than or equal to 1');
        }
        this.maxAttempts = maxAttempts;
        this.minSeconds = Math.floor(minSeconds);
        this.maxSeconds = Math.floor(maxSeconds);
        if (this.minSeconds > this.maxSeconds) {
            throw new Error('min seconds should be less than or equal to max seconds');
        }
    }
    execute(action, isRetryable) {
        return __awaiter(this, void 0, void 0, function* () {
            let attempt = 1;
            while (attempt < this.maxAttempts) {
                // Try
                try {
                    return yield action();
                }
                catch (err) {
                    if (isRetryable && !isRetryable(err)) {
                        throw err;
                    }
                    core.info(err.message);
                }
                // Sleep
                const seconds = this.getSleepAmount();
                core.info(`Waiting ${seconds} seconds before trying again`);
                yield this.sleep(seconds);
                attempt++;
            }
            // Last attempt
            return yield action();
        });
    }
    getSleepAmount() {
        return (Math.floor(Math.random() * (this.maxSeconds - this.minSeconds + 1)) +
            this.minSeconds);
    }
    sleep(seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => setTimeout(resolve, seconds * 1000));
        });
    }
}
exports.RetryHelper = RetryHelper;
//# sourceMappingURL=retry-helper.js.map

/***/ }),

/***/ 7784:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.evaluateVersions = exports.isExplicitVersion = exports.findFromManifest = exports.getManifestFromRepo = exports.findAllVersions = exports.find = exports.cacheFile = exports.cacheDir = exports.extractZip = exports.extractXar = exports.extractTar = exports.extract7z = exports.downloadTool = exports.HTTPError = void 0;
const core = __importStar(__nccwpck_require__(2186));
const io = __importStar(__nccwpck_require__(7436));
const fs = __importStar(__nccwpck_require__(7147));
const mm = __importStar(__nccwpck_require__(2473));
const os = __importStar(__nccwpck_require__(2037));
const path = __importStar(__nccwpck_require__(1017));
const httpm = __importStar(__nccwpck_require__(9925));
const semver = __importStar(__nccwpck_require__(5911));
const stream = __importStar(__nccwpck_require__(2781));
const util = __importStar(__nccwpck_require__(3837));
const v4_1 = __importDefault(__nccwpck_require__(824));
const exec_1 = __nccwpck_require__(1514);
const assert_1 = __nccwpck_require__(9491);
const retry_helper_1 = __nccwpck_require__(8279);
class HTTPError extends Error {
    constructor(httpStatusCode) {
        super(`Unexpected HTTP response: ${httpStatusCode}`);
        this.httpStatusCode = httpStatusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.HTTPError = HTTPError;
const IS_WINDOWS = process.platform === 'win32';
const IS_MAC = process.platform === 'darwin';
const userAgent = 'actions/tool-cache';
/**
 * Download a tool from an url and stream it into a file
 *
 * @param url       url of tool to download
 * @param dest      path to download tool
 * @param auth      authorization header
 * @param headers   other headers
 * @returns         path to downloaded tool
 */
function downloadTool(url, dest, auth, headers) {
    return __awaiter(this, void 0, void 0, function* () {
        dest = dest || path.join(_getTempDirectory(), v4_1.default());
        yield io.mkdirP(path.dirname(dest));
        core.debug(`Downloading ${url}`);
        core.debug(`Destination ${dest}`);
        const maxAttempts = 3;
        const minSeconds = _getGlobal('TEST_DOWNLOAD_TOOL_RETRY_MIN_SECONDS', 10);
        const maxSeconds = _getGlobal('TEST_DOWNLOAD_TOOL_RETRY_MAX_SECONDS', 20);
        const retryHelper = new retry_helper_1.RetryHelper(maxAttempts, minSeconds, maxSeconds);
        return yield retryHelper.execute(() => __awaiter(this, void 0, void 0, function* () {
            return yield downloadToolAttempt(url, dest || '', auth, headers);
        }), (err) => {
            if (err instanceof HTTPError && err.httpStatusCode) {
                // Don't retry anything less than 500, except 408 Request Timeout and 429 Too Many Requests
                if (err.httpStatusCode < 500 &&
                    err.httpStatusCode !== 408 &&
                    err.httpStatusCode !== 429) {
                    return false;
                }
            }
            // Otherwise retry
            return true;
        });
    });
}
exports.downloadTool = downloadTool;
function downloadToolAttempt(url, dest, auth, headers) {
    return __awaiter(this, void 0, void 0, function* () {
        if (fs.existsSync(dest)) {
            throw new Error(`Destination file path ${dest} already exists`);
        }
        // Get the response headers
        const http = new httpm.HttpClient(userAgent, [], {
            allowRetries: false
        });
        if (auth) {
            core.debug('set auth');
            if (headers === undefined) {
                headers = {};
            }
            headers.authorization = auth;
        }
        const response = yield http.get(url, headers);
        if (response.message.statusCode !== 200) {
            const err = new HTTPError(response.message.statusCode);
            core.debug(`Failed to download from "${url}". Code(${response.message.statusCode}) Message(${response.message.statusMessage})`);
            throw err;
        }
        // Download the response body
        const pipeline = util.promisify(stream.pipeline);
        const responseMessageFactory = _getGlobal('TEST_DOWNLOAD_TOOL_RESPONSE_MESSAGE_FACTORY', () => response.message);
        const readStream = responseMessageFactory();
        let succeeded = false;
        try {
            yield pipeline(readStream, fs.createWriteStream(dest));
            core.debug('download complete');
            succeeded = true;
            return dest;
        }
        finally {
            // Error, delete dest before retry
            if (!succeeded) {
                core.debug('download failed');
                try {
                    yield io.rmRF(dest);
                }
                catch (err) {
                    core.debug(`Failed to delete '${dest}'. ${err.message}`);
                }
            }
        }
    });
}
/**
 * Extract a .7z file
 *
 * @param file     path to the .7z file
 * @param dest     destination directory. Optional.
 * @param _7zPath  path to 7zr.exe. Optional, for long path support. Most .7z archives do not have this
 * problem. If your .7z archive contains very long paths, you can pass the path to 7zr.exe which will
 * gracefully handle long paths. By default 7zdec.exe is used because it is a very small program and is
 * bundled with the tool lib. However it does not support long paths. 7zr.exe is the reduced command line
 * interface, it is smaller than the full command line interface, and it does support long paths. At the
 * time of this writing, it is freely available from the LZMA SDK that is available on the 7zip website.
 * Be sure to check the current license agreement. If 7zr.exe is bundled with your action, then the path
 * to 7zr.exe can be pass to this function.
 * @returns        path to the destination directory
 */
function extract7z(file, dest, _7zPath) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.ok(IS_WINDOWS, 'extract7z() not supported on current OS');
        assert_1.ok(file, 'parameter "file" is required');
        dest = yield _createExtractFolder(dest);
        const originalCwd = process.cwd();
        process.chdir(dest);
        if (_7zPath) {
            try {
                const logLevel = core.isDebug() ? '-bb1' : '-bb0';
                const args = [
                    'x',
                    logLevel,
                    '-bd',
                    '-sccUTF-8',
                    file
                ];
                const options = {
                    silent: true
                };
                yield exec_1.exec(`"${_7zPath}"`, args, options);
            }
            finally {
                process.chdir(originalCwd);
            }
        }
        else {
            const escapedScript = path
                .join(__dirname, '..', 'scripts', 'Invoke-7zdec.ps1')
                .replace(/'/g, "''")
                .replace(/"|\n|\r/g, ''); // double-up single quotes, remove double quotes and newlines
            const escapedFile = file.replace(/'/g, "''").replace(/"|\n|\r/g, '');
            const escapedTarget = dest.replace(/'/g, "''").replace(/"|\n|\r/g, '');
            const command = `& '${escapedScript}' -Source '${escapedFile}' -Target '${escapedTarget}'`;
            const args = [
                '-NoLogo',
                '-Sta',
                '-NoProfile',
                '-NonInteractive',
                '-ExecutionPolicy',
                'Unrestricted',
                '-Command',
                command
            ];
            const options = {
                silent: true
            };
            try {
                const powershellPath = yield io.which('powershell', true);
                yield exec_1.exec(`"${powershellPath}"`, args, options);
            }
            finally {
                process.chdir(originalCwd);
            }
        }
        return dest;
    });
}
exports.extract7z = extract7z;
/**
 * Extract a compressed tar archive
 *
 * @param file     path to the tar
 * @param dest     destination directory. Optional.
 * @param flags    flags for the tar command to use for extraction. Defaults to 'xz' (extracting gzipped tars). Optional.
 * @returns        path to the destination directory
 */
function extractTar(file, dest, flags = 'xz') {
    return __awaiter(this, void 0, void 0, function* () {
        if (!file) {
            throw new Error("parameter 'file' is required");
        }
        // Create dest
        dest = yield _createExtractFolder(dest);
        // Determine whether GNU tar
        core.debug('Checking tar --version');
        let versionOutput = '';
        yield exec_1.exec('tar --version', [], {
            ignoreReturnCode: true,
            silent: true,
            listeners: {
                stdout: (data) => (versionOutput += data.toString()),
                stderr: (data) => (versionOutput += data.toString())
            }
        });
        core.debug(versionOutput.trim());
        const isGnuTar = versionOutput.toUpperCase().includes('GNU TAR');
        // Initialize args
        let args;
        if (flags instanceof Array) {
            args = flags;
        }
        else {
            args = [flags];
        }
        if (core.isDebug() && !flags.includes('v')) {
            args.push('-v');
        }
        let destArg = dest;
        let fileArg = file;
        if (IS_WINDOWS && isGnuTar) {
            args.push('--force-local');
            destArg = dest.replace(/\\/g, '/');
            // Technically only the dest needs to have `/` but for aesthetic consistency
            // convert slashes in the file arg too.
            fileArg = file.replace(/\\/g, '/');
        }
        if (isGnuTar) {
            // Suppress warnings when using GNU tar to extract archives created by BSD tar
            args.push('--warning=no-unknown-keyword');
            args.push('--overwrite');
        }
        args.push('-C', destArg, '-f', fileArg);
        yield exec_1.exec(`tar`, args);
        return dest;
    });
}
exports.extractTar = extractTar;
/**
 * Extract a xar compatible archive
 *
 * @param file     path to the archive
 * @param dest     destination directory. Optional.
 * @param flags    flags for the xar. Optional.
 * @returns        path to the destination directory
 */
function extractXar(file, dest, flags = []) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.ok(IS_MAC, 'extractXar() not supported on current OS');
        assert_1.ok(file, 'parameter "file" is required');
        dest = yield _createExtractFolder(dest);
        let args;
        if (flags instanceof Array) {
            args = flags;
        }
        else {
            args = [flags];
        }
        args.push('-x', '-C', dest, '-f', file);
        if (core.isDebug()) {
            args.push('-v');
        }
        const xarPath = yield io.which('xar', true);
        yield exec_1.exec(`"${xarPath}"`, _unique(args));
        return dest;
    });
}
exports.extractXar = extractXar;
/**
 * Extract a zip
 *
 * @param file     path to the zip
 * @param dest     destination directory. Optional.
 * @returns        path to the destination directory
 */
function extractZip(file, dest) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!file) {
            throw new Error("parameter 'file' is required");
        }
        dest = yield _createExtractFolder(dest);
        if (IS_WINDOWS) {
            yield extractZipWin(file, dest);
        }
        else {
            yield extractZipNix(file, dest);
        }
        return dest;
    });
}
exports.extractZip = extractZip;
function extractZipWin(file, dest) {
    return __awaiter(this, void 0, void 0, function* () {
        // build the powershell command
        const escapedFile = file.replace(/'/g, "''").replace(/"|\n|\r/g, ''); // double-up single quotes, remove double quotes and newlines
        const escapedDest = dest.replace(/'/g, "''").replace(/"|\n|\r/g, '');
        const pwshPath = yield io.which('pwsh', false);
        //To match the file overwrite behavior on nix systems, we use the overwrite = true flag for ExtractToDirectory
        //and the -Force flag for Expand-Archive as a fallback
        if (pwshPath) {
            //attempt to use pwsh with ExtractToDirectory, if this fails attempt Expand-Archive
            const pwshCommand = [
                `$ErrorActionPreference = 'Stop' ;`,
                `try { Add-Type -AssemblyName System.IO.Compression.ZipFile } catch { } ;`,
                `try { [System.IO.Compression.ZipFile]::ExtractToDirectory('${escapedFile}', '${escapedDest}', $true) }`,
                `catch { if (($_.Exception.GetType().FullName -eq 'System.Management.Automation.MethodException') -or ($_.Exception.GetType().FullName -eq 'System.Management.Automation.RuntimeException') ){ Expand-Archive -LiteralPath '${escapedFile}' -DestinationPath '${escapedDest}' -Force } else { throw $_ } } ;`
            ].join(' ');
            const args = [
                '-NoLogo',
                '-NoProfile',
                '-NonInteractive',
                '-ExecutionPolicy',
                'Unrestricted',
                '-Command',
                pwshCommand
            ];
            core.debug(`Using pwsh at path: ${pwshPath}`);
            yield exec_1.exec(`"${pwshPath}"`, args);
        }
        else {
            const powershellCommand = [
                `$ErrorActionPreference = 'Stop' ;`,
                `try { Add-Type -AssemblyName System.IO.Compression.FileSystem } catch { } ;`,
                `if ((Get-Command -Name Expand-Archive -Module Microsoft.PowerShell.Archive -ErrorAction Ignore)) { Expand-Archive -LiteralPath '${escapedFile}' -DestinationPath '${escapedDest}' -Force }`,
                `else {[System.IO.Compression.ZipFile]::ExtractToDirectory('${escapedFile}', '${escapedDest}', $true) }`
            ].join(' ');
            const args = [
                '-NoLogo',
                '-Sta',
                '-NoProfile',
                '-NonInteractive',
                '-ExecutionPolicy',
                'Unrestricted',
                '-Command',
                powershellCommand
            ];
            const powershellPath = yield io.which('powershell', true);
            core.debug(`Using powershell at path: ${powershellPath}`);
            yield exec_1.exec(`"${powershellPath}"`, args);
        }
    });
}
function extractZipNix(file, dest) {
    return __awaiter(this, void 0, void 0, function* () {
        const unzipPath = yield io.which('unzip', true);
        const args = [file];
        if (!core.isDebug()) {
            args.unshift('-q');
        }
        args.unshift('-o'); //overwrite with -o, otherwise a prompt is shown which freezes the run
        yield exec_1.exec(`"${unzipPath}"`, args, { cwd: dest });
    });
}
/**
 * Caches a directory and installs it into the tool cacheDir
 *
 * @param sourceDir    the directory to cache into tools
 * @param tool          tool name
 * @param version       version of the tool.  semver format
 * @param arch          architecture of the tool.  Optional.  Defaults to machine architecture
 */
function cacheDir(sourceDir, tool, version, arch) {
    return __awaiter(this, void 0, void 0, function* () {
        version = semver.clean(version) || version;
        arch = arch || os.arch();
        core.debug(`Caching tool ${tool} ${version} ${arch}`);
        core.debug(`source dir: ${sourceDir}`);
        if (!fs.statSync(sourceDir).isDirectory()) {
            throw new Error('sourceDir is not a directory');
        }
        // Create the tool dir
        const destPath = yield _createToolPath(tool, version, arch);
        // copy each child item. do not move. move can fail on Windows
        // due to anti-virus software having an open handle on a file.
        for (const itemName of fs.readdirSync(sourceDir)) {
            const s = path.join(sourceDir, itemName);
            yield io.cp(s, destPath, { recursive: true });
        }
        // write .complete
        _completeToolPath(tool, version, arch);
        return destPath;
    });
}
exports.cacheDir = cacheDir;
/**
 * Caches a downloaded file (GUID) and installs it
 * into the tool cache with a given targetName
 *
 * @param sourceFile    the file to cache into tools.  Typically a result of downloadTool which is a guid.
 * @param targetFile    the name of the file name in the tools directory
 * @param tool          tool name
 * @param version       version of the tool.  semver format
 * @param arch          architecture of the tool.  Optional.  Defaults to machine architecture
 */
function cacheFile(sourceFile, targetFile, tool, version, arch) {
    return __awaiter(this, void 0, void 0, function* () {
        version = semver.clean(version) || version;
        arch = arch || os.arch();
        core.debug(`Caching tool ${tool} ${version} ${arch}`);
        core.debug(`source file: ${sourceFile}`);
        if (!fs.statSync(sourceFile).isFile()) {
            throw new Error('sourceFile is not a file');
        }
        // create the tool dir
        const destFolder = yield _createToolPath(tool, version, arch);
        // copy instead of move. move can fail on Windows due to
        // anti-virus software having an open handle on a file.
        const destPath = path.join(destFolder, targetFile);
        core.debug(`destination file ${destPath}`);
        yield io.cp(sourceFile, destPath);
        // write .complete
        _completeToolPath(tool, version, arch);
        return destFolder;
    });
}
exports.cacheFile = cacheFile;
/**
 * Finds the path to a tool version in the local installed tool cache
 *
 * @param toolName      name of the tool
 * @param versionSpec   version of the tool
 * @param arch          optional arch.  defaults to arch of computer
 */
function find(toolName, versionSpec, arch) {
    if (!toolName) {
        throw new Error('toolName parameter is required');
    }
    if (!versionSpec) {
        throw new Error('versionSpec parameter is required');
    }
    arch = arch || os.arch();
    // attempt to resolve an explicit version
    if (!isExplicitVersion(versionSpec)) {
        const localVersions = findAllVersions(toolName, arch);
        const match = evaluateVersions(localVersions, versionSpec);
        versionSpec = match;
    }
    // check for the explicit version in the cache
    let toolPath = '';
    if (versionSpec) {
        versionSpec = semver.clean(versionSpec) || '';
        const cachePath = path.join(_getCacheDirectory(), toolName, versionSpec, arch);
        core.debug(`checking cache: ${cachePath}`);
        if (fs.existsSync(cachePath) && fs.existsSync(`${cachePath}.complete`)) {
            core.debug(`Found tool in cache ${toolName} ${versionSpec} ${arch}`);
            toolPath = cachePath;
        }
        else {
            core.debug('not found');
        }
    }
    return toolPath;
}
exports.find = find;
/**
 * Finds the paths to all versions of a tool that are installed in the local tool cache
 *
 * @param toolName  name of the tool
 * @param arch      optional arch.  defaults to arch of computer
 */
function findAllVersions(toolName, arch) {
    const versions = [];
    arch = arch || os.arch();
    const toolPath = path.join(_getCacheDirectory(), toolName);
    if (fs.existsSync(toolPath)) {
        const children = fs.readdirSync(toolPath);
        for (const child of children) {
            if (isExplicitVersion(child)) {
                const fullPath = path.join(toolPath, child, arch || '');
                if (fs.existsSync(fullPath) && fs.existsSync(`${fullPath}.complete`)) {
                    versions.push(child);
                }
            }
        }
    }
    return versions;
}
exports.findAllVersions = findAllVersions;
function getManifestFromRepo(owner, repo, auth, branch = 'master') {
    return __awaiter(this, void 0, void 0, function* () {
        let releases = [];
        const treeUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}`;
        const http = new httpm.HttpClient('tool-cache');
        const headers = {};
        if (auth) {
            core.debug('set auth');
            headers.authorization = auth;
        }
        const response = yield http.getJson(treeUrl, headers);
        if (!response.result) {
            return releases;
        }
        let manifestUrl = '';
        for (const item of response.result.tree) {
            if (item.path === 'versions-manifest.json') {
                manifestUrl = item.url;
                break;
            }
        }
        headers['accept'] = 'application/vnd.github.VERSION.raw';
        let versionsRaw = yield (yield http.get(manifestUrl, headers)).readBody();
        if (versionsRaw) {
            // shouldn't be needed but protects against invalid json saved with BOM
            versionsRaw = versionsRaw.replace(/^\uFEFF/, '');
            try {
                releases = JSON.parse(versionsRaw);
            }
            catch (_a) {
                core.debug('Invalid json');
            }
        }
        return releases;
    });
}
exports.getManifestFromRepo = getManifestFromRepo;
function findFromManifest(versionSpec, stable, manifest, archFilter = os.arch()) {
    return __awaiter(this, void 0, void 0, function* () {
        // wrap the internal impl
        const match = yield mm._findMatch(versionSpec, stable, manifest, archFilter);
        return match;
    });
}
exports.findFromManifest = findFromManifest;
function _createExtractFolder(dest) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!dest) {
            // create a temp dir
            dest = path.join(_getTempDirectory(), v4_1.default());
        }
        yield io.mkdirP(dest);
        return dest;
    });
}
function _createToolPath(tool, version, arch) {
    return __awaiter(this, void 0, void 0, function* () {
        const folderPath = path.join(_getCacheDirectory(), tool, semver.clean(version) || version, arch || '');
        core.debug(`destination ${folderPath}`);
        const markerPath = `${folderPath}.complete`;
        yield io.rmRF(folderPath);
        yield io.rmRF(markerPath);
        yield io.mkdirP(folderPath);
        return folderPath;
    });
}
function _completeToolPath(tool, version, arch) {
    const folderPath = path.join(_getCacheDirectory(), tool, semver.clean(version) || version, arch || '');
    const markerPath = `${folderPath}.complete`;
    fs.writeFileSync(markerPath, '');
    core.debug('finished caching tool');
}
/**
 * Check if version string is explicit
 *
 * @param versionSpec      version string to check
 */
function isExplicitVersion(versionSpec) {
    const c = semver.clean(versionSpec) || '';
    core.debug(`isExplicit: ${c}`);
    const valid = semver.valid(c) != null;
    core.debug(`explicit? ${valid}`);
    return valid;
}
exports.isExplicitVersion = isExplicitVersion;
/**
 * Get the highest satisfiying semantic version in `versions` which satisfies `versionSpec`
 *
 * @param versions        array of versions to evaluate
 * @param versionSpec     semantic version spec to satisfy
 */
function evaluateVersions(versions, versionSpec) {
    let version = '';
    core.debug(`evaluating ${versions.length} versions`);
    versions = versions.sort((a, b) => {
        if (semver.gt(a, b)) {
            return 1;
        }
        return -1;
    });
    for (let i = versions.length - 1; i >= 0; i--) {
        const potential = versions[i];
        const satisfied = semver.satisfies(potential, versionSpec);
        if (satisfied) {
            version = potential;
            break;
        }
    }
    if (version) {
        core.debug(`matched: ${version}`);
    }
    else {
        core.debug('match not found');
    }
    return version;
}
exports.evaluateVersions = evaluateVersions;
/**
 * Gets RUNNER_TOOL_CACHE
 */
function _getCacheDirectory() {
    const cacheDirectory = process.env['RUNNER_TOOL_CACHE'] || '';
    assert_1.ok(cacheDirectory, 'Expected RUNNER_TOOL_CACHE to be defined');
    return cacheDirectory;
}
/**
 * Gets RUNNER_TEMP
 */
function _getTempDirectory() {
    const tempDirectory = process.env['RUNNER_TEMP'] || '';
    assert_1.ok(tempDirectory, 'Expected RUNNER_TEMP to be defined');
    return tempDirectory;
}
/**
 * Gets a global variable
 */
function _getGlobal(key, defaultValue) {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const value = global[key];
    /* eslint-enable @typescript-eslint/no-explicit-any */
    return value !== undefined ? value : defaultValue;
}
/**
 * Returns an array of unique values.
 * @param values Values to make unique.
 */
function _unique(values) {
    return Array.from(new Set(values));
}
//# sourceMappingURL=tool-cache.js.map

/***/ }),

/***/ 1748:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


// Runtime header offsets
const ID_OFFSET = -8;
const SIZE_OFFSET = -4;

// Runtime ids
const ARRAYBUFFER_ID = 0;
const STRING_ID = 1;
// const ARRAYBUFFERVIEW_ID = 2;

// Runtime type information
const ARRAYBUFFERVIEW = 1 << 0;
const ARRAY = 1 << 1;
const STATICARRAY = 1 << 2;
// const SET = 1 << 3;
// const MAP = 1 << 4;
const VAL_ALIGN_OFFSET = 6;
// const VAL_ALIGN = 1 << VAL_ALIGN_OFFSET;
const VAL_SIGNED = 1 << 11;
const VAL_FLOAT = 1 << 12;
// const VAL_NULLABLE = 1 << 13;
const VAL_MANAGED = 1 << 14;
// const KEY_ALIGN_OFFSET = 15;
// const KEY_ALIGN = 1 << KEY_ALIGN_OFFSET;
// const KEY_SIGNED = 1 << 20;
// const KEY_FLOAT = 1 << 21;
// const KEY_NULLABLE = 1 << 22;
// const KEY_MANAGED = 1 << 23;

// Array(BufferView) layout
const ARRAYBUFFERVIEW_BUFFER_OFFSET = 0;
const ARRAYBUFFERVIEW_DATASTART_OFFSET = 4;
const ARRAYBUFFERVIEW_DATALENGTH_OFFSET = 8;
const ARRAYBUFFERVIEW_SIZE = 12;
const ARRAY_LENGTH_OFFSET = 12;
const ARRAY_SIZE = 16;

const BIGINT = typeof BigUint64Array !== "undefined";
const THIS = Symbol();
const CHUNKSIZE = 1024;

/** Gets a string from an U32 and an U16 view on a memory. */
function getStringImpl(buffer, ptr) {
  const U32 = new Uint32Array(buffer);
  const U16 = new Uint16Array(buffer);
  let length = U32[(ptr + SIZE_OFFSET) >>> 2] >>> 1;
  let offset = ptr >>> 1;
  if (length <= CHUNKSIZE) return String.fromCharCode.apply(String, U16.subarray(offset, offset + length));
  const parts = [];
  do {
    const last = U16[offset + CHUNKSIZE - 1];
    const size = last >= 0xD800 && last < 0xDC00 ? CHUNKSIZE - 1 : CHUNKSIZE;
    parts.push(String.fromCharCode.apply(String, U16.subarray(offset, offset += size)));
    length -= size;
  } while (length > CHUNKSIZE);
  return parts.join("") + String.fromCharCode.apply(String, U16.subarray(offset, offset + length));
}

/** Prepares the base module prior to instantiation. */
function preInstantiate(imports) {
  const extendedExports = {};

  function getString(memory, ptr) {
    if (!memory) return "<yet unknown>";
    return getStringImpl(memory.buffer, ptr);
  }

  // add common imports used by stdlib for convenience
  const env = (imports.env = imports.env || {});
  env.abort = env.abort || function abort(msg, file, line, colm) {
    const memory = extendedExports.memory || env.memory; // prefer exported, otherwise try imported
    throw Error("abort: " + getString(memory, msg) + " at " + getString(memory, file) + ":" + line + ":" + colm);
  };
  env.trace = env.trace || function trace(msg, n) {
    const memory = extendedExports.memory || env.memory;
    console.log("trace: " + getString(memory, msg) + (n ? " " : "") + Array.prototype.slice.call(arguments, 2, 2 + n).join(", "));
  };
  env.seed = env.seed || function seed() {
    return Date.now();
  };
  imports.Math = imports.Math || Math;
  imports.Date = imports.Date || Date;

  return extendedExports;
}

/** Prepares the final module once instantiation is complete. */
function postInstantiate(extendedExports, instance) {
  const exports = instance.exports;
  const memory = exports.memory;
  const table = exports.table;
  const alloc = exports["__alloc"];
  const retain = exports["__retain"];
  const rttiBase = exports["__rtti_base"] || ~0; // oob if not present

  /** Gets the runtime type info for the given id. */
  function getInfo(id) {
    const U32 = new Uint32Array(memory.buffer);
    const count = U32[rttiBase >>> 2];
    if ((id >>>= 0) >= count) throw Error("invalid id: " + id);
    return U32[(rttiBase + 4 >>> 2) + id * 2];
  }

  /** Gets the runtime base id for the given id. */
  function getBase(id) {
    const U32 = new Uint32Array(memory.buffer);
    const count = U32[rttiBase >>> 2];
    if ((id >>>= 0) >= count) throw Error("invalid id: " + id);
    return U32[(rttiBase + 4 >>> 2) + id * 2 + 1];
  }

  /** Gets the runtime alignment of a collection's values. */
  function getValueAlign(info) {
    return 31 - Math.clz32((info >>> VAL_ALIGN_OFFSET) & 31); // -1 if none
  }

  /** Gets the runtime alignment of a collection's keys. */
  // function getKeyAlign(info) {
  //   return 31 - Math.clz32((info >>> KEY_ALIGN_OFFSET) & 31); // -1 if none
  // }

  /** Allocates a new string in the module's memory and returns its retained pointer. */
  function __allocString(str) {
    const length = str.length;
    const ptr = alloc(length << 1, STRING_ID);
    const U16 = new Uint16Array(memory.buffer);
    for (var i = 0, p = ptr >>> 1; i < length; ++i) U16[p + i] = str.charCodeAt(i);
    return ptr;
  }

  extendedExports.__allocString = __allocString;

  /** Reads a string from the module's memory by its pointer. */
  function __getString(ptr) {
    const buffer = memory.buffer;
    const id = new Uint32Array(buffer)[ptr + ID_OFFSET >>> 2];
    if (id !== STRING_ID) throw Error("not a string: " + ptr);
    return getStringImpl(buffer, ptr);
  }

  extendedExports.__getString = __getString;

  /** Gets the view matching the specified alignment, signedness and floatness. */
  function getView(alignLog2, signed, float) {
    const buffer = memory.buffer;
    if (float) {
      switch (alignLog2) {
        case 2: return new Float32Array(buffer);
        case 3: return new Float64Array(buffer);
      }
    } else {
      switch (alignLog2) {
        case 0: return new (signed ? Int8Array : Uint8Array)(buffer);
        case 1: return new (signed ? Int16Array : Uint16Array)(buffer);
        case 2: return new (signed ? Int32Array : Uint32Array)(buffer);
        case 3: return new (signed ? BigInt64Array : BigUint64Array)(buffer);
      }
    }
    throw Error("unsupported align: " + alignLog2);
  }

  /** Allocates a new array in the module's memory and returns its retained pointer. */
  function __allocArray(id, values) {
    const info = getInfo(id);
    if (!(info & (ARRAYBUFFERVIEW | ARRAY | STATICARRAY))) throw Error("not an array: " + id + ", flags= " + info);
    const align = getValueAlign(info);
    const length = values.length;
    const buf = alloc(length << align, info & STATICARRAY ? id : ARRAYBUFFER_ID);
    let result;
    if (info & STATICARRAY) {
      result = buf;
    } else {
      const arr = alloc(info & ARRAY ? ARRAY_SIZE : ARRAYBUFFERVIEW_SIZE, id);
      const U32 = new Uint32Array(memory.buffer);
      U32[arr + ARRAYBUFFERVIEW_BUFFER_OFFSET >>> 2] = retain(buf);
      U32[arr + ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2] = buf;
      U32[arr + ARRAYBUFFERVIEW_DATALENGTH_OFFSET >>> 2] = length << align;
      if (info & ARRAY) U32[arr + ARRAY_LENGTH_OFFSET >>> 2] = length;
      result = arr;
    }
    const view = getView(align, info & VAL_SIGNED, info & VAL_FLOAT);
    if (info & VAL_MANAGED) {
      for (let i = 0; i < length; ++i) view[(buf >>> align) + i] = retain(values[i]);
    } else {
      view.set(values, buf >>> align);
    }
    return result;
  }

  extendedExports.__allocArray = __allocArray;

  /** Gets a live view on an array's values in the module's memory. Infers the array type from RTTI. */
  function __getArrayView(arr) {
    const U32 = new Uint32Array(memory.buffer);
    const id = U32[arr + ID_OFFSET >>> 2];
    const info = getInfo(id);
    if (!(info & (ARRAYBUFFERVIEW | ARRAY | STATICARRAY))) throw Error("not an array: " + id + ", flags=" + info);
    const align = getValueAlign(info);
    let buf = info & STATICARRAY
      ? arr
      : U32[arr + ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2];
    const length = info & ARRAY
      ? U32[arr + ARRAY_LENGTH_OFFSET >>> 2]
      : U32[buf + SIZE_OFFSET >>> 2] >>> align;
    return getView(align, info & VAL_SIGNED, info & VAL_FLOAT).subarray(buf >>>= align, buf + length);
  }

  extendedExports.__getArrayView = __getArrayView;

  /** Copies an array's values from the module's memory. Infers the array type from RTTI. */
  function __getArray(arr) {
    const input = __getArrayView(arr);
    const len = input.length;
    const out = new Array(len);
    for (let i = 0; i < len; i++) out[i] = input[i];
    return out;
  }

  extendedExports.__getArray = __getArray;

  /** Copies an ArrayBuffer's value from the module's memory. */
  function __getArrayBuffer(ptr) {
    const buffer = memory.buffer;
    const length = new Uint32Array(buffer)[ptr + SIZE_OFFSET >>> 2];
    return buffer.slice(ptr, ptr + length);
  }

  extendedExports.__getArrayBuffer = __getArrayBuffer;

  /** Copies a typed array's values from the module's memory. */
  function getTypedArray(Type, alignLog2, ptr) {
    return new Type(getTypedArrayView(Type, alignLog2, ptr));
  }

  /** Gets a live view on a typed array's values in the module's memory. */
  function getTypedArrayView(Type, alignLog2, ptr) {
    const buffer = memory.buffer;
    const U32 = new Uint32Array(buffer);
    const bufPtr = U32[ptr + ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2];
    return new Type(buffer, bufPtr, U32[bufPtr + SIZE_OFFSET >>> 2] >>> alignLog2);
  }

  /** Attach a set of get TypedArray and View functions to the exports. */
  function attachTypedArrayFunctions(ctor, name, align) {
    extendedExports["__get" + name] = getTypedArray.bind(null, ctor, align);
    extendedExports["__get" + name + "View"] = getTypedArrayView.bind(null, ctor, align);
  }

  [
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array
  ].forEach(ctor => {
    attachTypedArrayFunctions(ctor, ctor.name, 31 - Math.clz32(ctor.BYTES_PER_ELEMENT));
  });

  if (BIGINT) {
    [BigUint64Array, BigInt64Array].forEach(ctor => {
      attachTypedArrayFunctions(ctor, ctor.name.slice(3), 3);
    });
  }

  /** Tests whether an object is an instance of the class represented by the specified base id. */
  function __instanceof(ptr, baseId) {
    const U32 = new Uint32Array(memory.buffer);
    let id = U32[(ptr + ID_OFFSET) >>> 2];
    if (id <= U32[rttiBase >>> 2]) {
      do {
        if (id == baseId) return true;
        id = getBase(id);
      } while (id);
    }
    return false;
  }

  extendedExports.__instanceof = __instanceof;

  // Pull basic exports to extendedExports so code in preInstantiate can use them
  extendedExports.memory = extendedExports.memory || memory;
  extendedExports.table  = extendedExports.table  || table;

  // Demangle exports and provide the usual utility on the prototype
  return demangle(exports, extendedExports);
}

function isResponse(src) {
  return typeof Response !== "undefined" && src instanceof Response;
}

function isModule(src) {
  return src instanceof WebAssembly.Module;
}

/** Asynchronously instantiates an AssemblyScript module from anything that can be instantiated. */
async function instantiate(source, imports = {}) {
  if (isResponse(source = await source)) return instantiateStreaming(source, imports);
  const module = isModule(source) ? source : await WebAssembly.compile(source);
  const extended = preInstantiate(imports);
  const instance = await WebAssembly.instantiate(module, imports);
  const exports = postInstantiate(extended, instance);
  return { module, instance, exports };
}

exports.instantiate = instantiate;

/** Synchronously instantiates an AssemblyScript module from a WebAssembly.Module or binary buffer. */
function instantiateSync(source, imports = {}) {
  const module = isModule(source) ? source : new WebAssembly.Module(source);
  const extended = preInstantiate(imports);
  const instance = new WebAssembly.Instance(module, imports);
  const exports = postInstantiate(extended, instance);
  return { module, instance, exports };
}

exports.instantiateSync = instantiateSync;

/** Asynchronously instantiates an AssemblyScript module from a response, i.e. as obtained by `fetch`. */
async function instantiateStreaming(source, imports = {}) {
  if (!WebAssembly.instantiateStreaming) {
    return instantiate(
      isResponse(source = await source)
        ? source.arrayBuffer()
        : source,
      imports
    );
  }
  const extended = preInstantiate(imports);
  const result = await WebAssembly.instantiateStreaming(source, imports);
  const exports = postInstantiate(extended, result.instance);
  return { ...result, exports };
}

exports.instantiateStreaming = instantiateStreaming;

/** Demangles an AssemblyScript module's exports to a friendly object structure. */
function demangle(exports, extendedExports = {}) {
  extendedExports = Object.create(extendedExports);
  const setArgumentsLength = exports["__argumentsLength"]
    ? length => { exports["__argumentsLength"].value = length; }
    : exports["__setArgumentsLength"] || exports["__setargc"] || (() => { /* nop */ });
  for (let internalName in exports) {
    if (!Object.prototype.hasOwnProperty.call(exports, internalName)) continue;
    const elem = exports[internalName];
    let parts = internalName.split(".");
    let curr = extendedExports;
    while (parts.length > 1) {
      let part = parts.shift();
      if (!Object.prototype.hasOwnProperty.call(curr, part)) curr[part] = {};
      curr = curr[part];
    }
    let name = parts[0];
    let hash = name.indexOf("#");
    if (hash >= 0) {
      const className = name.substring(0, hash);
      const classElem = curr[className];
      if (typeof classElem === "undefined" || !classElem.prototype) {
        const ctor = function(...args) {
          return ctor.wrap(ctor.prototype.constructor(0, ...args));
        };
        ctor.prototype = {
          valueOf: function valueOf() {
            return this[THIS];
          }
        };
        ctor.wrap = function(thisValue) {
          return Object.create(ctor.prototype, { [THIS]: { value: thisValue, writable: false } });
        };
        if (classElem) Object.getOwnPropertyNames(classElem).forEach(name =>
          Object.defineProperty(ctor, name, Object.getOwnPropertyDescriptor(classElem, name))
        );
        curr[className] = ctor;
      }
      name = name.substring(hash + 1);
      curr = curr[className].prototype;
      if (/^(get|set):/.test(name)) {
        if (!Object.prototype.hasOwnProperty.call(curr, name = name.substring(4))) {
          let getter = exports[internalName.replace("set:", "get:")];
          let setter = exports[internalName.replace("get:", "set:")];
          Object.defineProperty(curr, name, {
            get: function() { return getter(this[THIS]); },
            set: function(value) { setter(this[THIS], value); },
            enumerable: true
          });
        }
      } else {
        if (name === 'constructor') {
          (curr[name] = (...args) => {
            setArgumentsLength(args.length);
            return elem(...args);
          }).original = elem;
        } else { // instance method
          (curr[name] = function(...args) { // !
            setArgumentsLength(args.length);
            return elem(this[THIS], ...args);
          }).original = elem;
        }
      }
    } else {
      if (/^(get|set):/.test(name)) {
        if (!Object.prototype.hasOwnProperty.call(curr, name = name.substring(4))) {
          Object.defineProperty(curr, name, {
            get: exports[internalName.replace("set:", "get:")],
            set: exports[internalName.replace("get:", "set:")],
            enumerable: true
          });
        }
      } else if (typeof elem === "function" && elem !== setArgumentsLength) {
        (curr[name] = (...args) => {
          setArgumentsLength(args.length);
          return elem(...args);
        }).original = elem;
      } else {
        curr[name] = elem;
      }
    }
  }
  return extendedExports;
}

exports.demangle = demangle;


/***/ }),

/***/ 6463:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ 490:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {


var camaro = (function() {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
  return (
function(camaro) {
  camaro = camaro || {};

var f;f||(f=typeof camaro !== 'undefined' ? camaro : {});var k={},m;for(m in f)f.hasOwnProperty(m)&&(k[m]=f[m]);var q=!1,v=!1,w=!1,aa=!1,ba=!1;q="object"===typeof window;v="function"===typeof importScripts;w=(aa="object"===typeof process&&"object"===typeof process.versions&&"string"===typeof process.versions.node)&&!q&&!v;ba=!q&&!w&&!v;var x="",ca,da,ea,fa;
if(w)x=__dirname+"/",ca=function(a,b){ea||(ea=__nccwpck_require__(7147));fa||(fa=__nccwpck_require__(1017));a=fa.normalize(a);return ea.readFileSync(a,b?null:"utf8")},da=function(a){a=ca(a,!0);a.buffer||(a=new Uint8Array(a));a.buffer||y("Assertion failed: undefined");return a},1<process.argv.length&&process.argv[1].replace(/\\/g,"/"),process.argv.slice(2),process.on("uncaughtException",function(a){throw a;}),process.on("unhandledRejection",y),f.inspect=function(){return"[Emscripten Module object]"};else if(ba)"undefined"!=
typeof read&&(ca=function(a){return read(a)}),da=function(a){if("function"===typeof readbuffer)return new Uint8Array(readbuffer(a));a=read(a,"binary");"object"===typeof a||y("Assertion failed: undefined");return a},"undefined"!==typeof print&&("undefined"===typeof console&&(console={}),console.log=print,console.warn=console.error="undefined"!==typeof printErr?printErr:print);else if(q||v)v?x=self.location.href:document.currentScript&&(x=document.currentScript.src),_scriptDir&&(x=_scriptDir),0!==x.indexOf("blob:")?
x=x.substr(0,x.lastIndexOf("/")+1):x="",ca=function(a){var b=new XMLHttpRequest;b.open("GET",a,!1);b.send(null);return b.responseText},v&&(da=function(a){var b=new XMLHttpRequest;b.open("GET",a,!1);b.responseType="arraybuffer";b.send(null);return new Uint8Array(b.response)});var ha=f.print||console.log.bind(console),z=f.printErr||console.warn.bind(console);for(m in k)k.hasOwnProperty(m)&&(f[m]=k[m]);k=null;var ia={"f64-rem":function(a,b){return a%b},"debugger":function(){}},ja;f.wasmBinary&&(ja=f.wasmBinary);
"object"!==typeof WebAssembly&&z("no native wasm support detected");var A,ka=new WebAssembly.Table({initial:488,maximum:488,element:"anyfunc"}),la=!1,ma="undefined"!==typeof TextDecoder?new TextDecoder("utf8"):void 0;
function na(a,b,c){var d=b+c;for(c=b;a[c]&&!(c>=d);)++c;if(16<c-b&&a.subarray&&ma)return ma.decode(a.subarray(b,c));for(d="";b<c;){var e=a[b++];if(e&128){var g=a[b++]&63;if(192==(e&224))d+=String.fromCharCode((e&31)<<6|g);else{var h=a[b++]&63;e=224==(e&240)?(e&15)<<12|g<<6|h:(e&7)<<18|g<<12|h<<6|a[b++]&63;65536>e?d+=String.fromCharCode(e):(e-=65536,d+=String.fromCharCode(55296|e>>10,56320|e&1023))}}else d+=String.fromCharCode(e)}return d}function oa(a){return a?na(B,a,void 0):""}
function pa(a,b,c,d){if(!(0<d))return 0;var e=c;d=c+d-1;for(var g=0;g<a.length;++g){var h=a.charCodeAt(g);if(55296<=h&&57343>=h){var l=a.charCodeAt(++g);h=65536+((h&1023)<<10)|l&1023}if(127>=h){if(c>=d)break;b[c++]=h}else{if(2047>=h){if(c+1>=d)break;b[c++]=192|h>>6}else{if(65535>=h){if(c+2>=d)break;b[c++]=224|h>>12}else{if(c+3>=d)break;b[c++]=240|h>>18;b[c++]=128|h>>12&63}b[c++]=128|h>>6&63}b[c++]=128|h&63}}b[c]=0;return c-e}
function qa(a){for(var b=0,c=0;c<a.length;++c){var d=a.charCodeAt(c);55296<=d&&57343>=d&&(d=65536+((d&1023)<<10)|a.charCodeAt(++c)&1023);127>=d?++b:b=2047>=d?b+2:65535>=d?b+3:b+4}return b}"undefined"!==typeof TextDecoder&&new TextDecoder("utf-16le");function ra(a){0<a%65536&&(a+=65536-a%65536);return a}var buffer,E,B,sa,ta,F,G,ua,va;
function wa(a){buffer=a;f.HEAP8=E=new Int8Array(a);f.HEAP16=sa=new Int16Array(a);f.HEAP32=F=new Int32Array(a);f.HEAPU8=B=new Uint8Array(a);f.HEAPU16=ta=new Uint16Array(a);f.HEAPU32=G=new Uint32Array(a);f.HEAPF32=ua=new Float32Array(a);f.HEAPF64=va=new Float64Array(a)}var xa=f.TOTAL_MEMORY||16777216;f.wasmMemory?A=f.wasmMemory:A=new WebAssembly.Memory({initial:xa/65536});A&&(buffer=A.buffer);xa=buffer.byteLength;wa(buffer);F[6580]=5269392;
function ya(a){for(;0<a.length;){var b=a.shift();if("function"==typeof b)b();else{var c=b.gb;"number"===typeof c?void 0===b.Oa?f.dynCall_v(c):f.dynCall_vi(c,b.Oa):c(void 0===b.Oa?null:b.Oa)}}}var za=[],Aa=[],Ba=[],Ca=[];function Da(){var a=f.preRun.shift();za.unshift(a)}var Ea=Math.abs,Fa=Math.ceil,Ga=Math.floor,Ha=Math.min,H=0,Ia=null,Ja=null;f.preloadedImages={};f.preloadedAudios={};
function y(a){if(f.onAbort)f.onAbort(a);ha(a);z(a);la=!0;throw new WebAssembly.RuntimeError("abort("+a+"). Build with -s ASSERTIONS=1 for more info.");}function Ka(){var a=I;return String.prototype.startsWith?a.startsWith("data:application/octet-stream;base64,"):0===a.indexOf("data:application/octet-stream;base64,")}var I="camaro.wasm";if(!Ka()){var La=I;I=f.locateFile?f.locateFile(La,x):x+La}
function Ma(){try{if(ja)return new Uint8Array(ja);if(da)return da(I);throw"both async and sync fetching of the wasm failed";}catch(a){y(a)}}function Na(){return ja||!q&&!v||"function"!==typeof fetch?new Promise(function(a){a(Ma())}):fetch(I,{credentials:"same-origin"}).then(function(a){if(!a.ok)throw"failed to load wasm binary file at '"+I+"'";return a.arrayBuffer()}).catch(function(){return Ma()})}
f.asm=function(){function a(a){f.asm=a.exports;H--;f.monitorRunDependencies&&f.monitorRunDependencies(H);0==H&&(null!==Ia&&(clearInterval(Ia),Ia=null),Ja&&(a=Ja,Ja=null,a()))}function b(b){a(b.instance)}function c(a){return Na().then(function(a){return WebAssembly.instantiate(a,d)}).then(a,function(a){z("failed to asynchronously prepare wasm: "+a);y(a)})}var d={env:Oa,wasi_unstable:Oa,global:{NaN:NaN,Infinity:Infinity},"global.Math":Math,asm2wasm:ia};H++;f.monitorRunDependencies&&f.monitorRunDependencies(H);
if(f.instantiateWasm)try{return f.instantiateWasm(d,a)}catch(e){return z("Module.instantiateWasm callback failed with error: "+e),!1}(function(){if(ja||"function"!==typeof WebAssembly.instantiateStreaming||Ka()||"function"!==typeof fetch)return c(b);fetch(I,{credentials:"same-origin"}).then(function(a){return WebAssembly.instantiateStreaming(a,d).then(b,function(a){z("wasm streaming compile failed: "+a);z("falling back to ArrayBuffer instantiation");c(b)})})})();return{}};var J,Pa;Aa.push({gb:function(){Qa()}});
function Ra(a,b){for(var c=0,d=a.length-1;0<=d;d--){var e=a[d];"."===e?a.splice(d,1):".."===e?(a.splice(d,1),c++):c&&(a.splice(d,1),c--)}if(b)for(;c;c--)a.unshift("..");return a}function Sa(a){var b="/"===a.charAt(0),c="/"===a.substr(-1);(a=Ra(a.split("/").filter(function(a){return!!a}),!b).join("/"))||b||(a=".");a&&c&&(a+="/");return(b?"/":"")+a}
function Ta(a){var b=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);a=b[0];b=b[1];if(!a&&!b)return".";b&&(b=b.substr(0,b.length-1));return a+b}function Ua(a){if("/"===a)return"/";var b=a.lastIndexOf("/");return-1===b?a:a.substr(b+1)}
function Va(){for(var a="",b=!1,c=arguments.length-1;-1<=c&&!b;c--){b=0<=c?arguments[c]:"/";if("string"!==typeof b)throw new TypeError("Arguments to path.resolve must be strings");if(!b)return"";a=b+"/"+a;b="/"===b.charAt(0)}a=Ra(a.split("/").filter(function(a){return!!a}),!b).join("/");return(b?"/":"")+a||"."}var Wa=[];function Xa(a,b){Wa[a]={input:[],output:[],Ea:b};Ya(a,Za)}
var Za={open:function(a){var b=Wa[a.node.rdev];if(!b)throw new K(43);a.tty=b;a.seekable=!1},close:function(a){a.tty.Ea.flush(a.tty)},flush:function(a){a.tty.Ea.flush(a.tty)},read:function(a,b,c,d){if(!a.tty||!a.tty.Ea.Za)throw new K(60);for(var e=0,g=0;g<d;g++){try{var h=a.tty.Ea.Za(a.tty)}catch(l){throw new K(29);}if(void 0===h&&0===e)throw new K(6);if(null===h||void 0===h)break;e++;b[c+g]=h}e&&(a.node.timestamp=Date.now());return e},write:function(a,b,c,d){if(!a.tty||!a.tty.Ea.Qa)throw new K(60);
try{for(var e=0;e<d;e++)a.tty.Ea.Qa(a.tty,b[c+e])}catch(g){throw new K(29);}d&&(a.node.timestamp=Date.now());return e}},ab={Za:function(a){if(!a.input.length){var b=null;if(w){var c=Buffer.va?Buffer.va(256):new Buffer(256),d=0;try{d=ea.readSync(process.stdin.fd,c,0,256,null)}catch(e){if(-1!=e.toString().indexOf("EOF"))d=0;else throw e;}0<d?b=c.slice(0,d).toString("utf-8"):b=null}else"undefined"!=typeof window&&"function"==typeof window.prompt?(b=window.prompt("Input: "),null!==b&&(b+="\n")):"function"==
typeof readline&&(b=readline(),null!==b&&(b+="\n"));if(!b)return null;a.input=$a(b,!0)}return a.input.shift()},Qa:function(a,b){null===b||10===b?(ha(na(a.output,0)),a.output=[]):0!=b&&a.output.push(b)},flush:function(a){a.output&&0<a.output.length&&(ha(na(a.output,0)),a.output=[])}},bb={Qa:function(a,b){null===b||10===b?(z(na(a.output,0)),a.output=[]):0!=b&&a.output.push(b)},flush:function(a){a.output&&0<a.output.length&&(z(na(a.output,0)),a.output=[])}},L={wa:null,Ba:function(){return L.createNode(null,
"/",16895,0)},createNode:function(a,b,c,d){if(24576===(c&61440)||4096===(c&61440))throw new K(63);L.wa||(L.wa={dir:{node:{Ca:L.ra.Ca,za:L.ra.za,lookup:L.ra.lookup,Ia:L.ra.Ia,rename:L.ra.rename,unlink:L.ra.unlink,rmdir:L.ra.rmdir,readdir:L.ra.readdir,symlink:L.ra.symlink},stream:{Da:L.sa.Da}},file:{node:{Ca:L.ra.Ca,za:L.ra.za},stream:{Da:L.sa.Da,read:L.sa.read,write:L.sa.write,Ta:L.sa.Ta,$a:L.sa.$a,Ka:L.sa.Ka}},link:{node:{Ca:L.ra.Ca,za:L.ra.za,readlink:L.ra.readlink},stream:{}},Ua:{node:{Ca:L.ra.Ca,
za:L.ra.za},stream:cb}});c=db(a,b,c,d);16384===(c.mode&61440)?(c.ra=L.wa.dir.node,c.sa=L.wa.dir.stream,c.qa={}):32768===(c.mode&61440)?(c.ra=L.wa.file.node,c.sa=L.wa.file.stream,c.ta=0,c.qa=null):40960===(c.mode&61440)?(c.ra=L.wa.link.node,c.sa=L.wa.link.stream):8192===(c.mode&61440)&&(c.ra=L.wa.Ua.node,c.sa=L.wa.Ua.stream);c.timestamp=Date.now();a&&(a.qa[b]=c);return c},Bb:function(a){if(a.qa&&a.qa.subarray){for(var b=[],c=0;c<a.ta;++c)b.push(a.qa[c]);return b}return a.qa},Cb:function(a){return a.qa?
a.qa.subarray?a.qa.subarray(0,a.ta):new Uint8Array(a.qa):new Uint8Array},Va:function(a,b){var c=a.qa?a.qa.length:0;c>=b||(b=Math.max(b,c*(1048576>c?2:1.125)|0),0!=c&&(b=Math.max(b,256)),c=a.qa,a.qa=new Uint8Array(b),0<a.ta&&a.qa.set(c.subarray(0,a.ta),0))},rb:function(a,b){if(a.ta!=b)if(0==b)a.qa=null,a.ta=0;else{if(!a.qa||a.qa.subarray){var c=a.qa;a.qa=new Uint8Array(new ArrayBuffer(b));c&&a.qa.set(c.subarray(0,Math.min(b,a.ta)))}else if(a.qa||(a.qa=[]),a.qa.length>b)a.qa.length=b;else for(;a.qa.length<
b;)a.qa.push(0);a.ta=b}},ra:{Ca:function(a){var b={};b.dev=8192===(a.mode&61440)?a.id:1;b.ino=a.id;b.mode=a.mode;b.nlink=1;b.uid=0;b.gid=0;b.rdev=a.rdev;16384===(a.mode&61440)?b.size=4096:32768===(a.mode&61440)?b.size=a.ta:40960===(a.mode&61440)?b.size=a.link.length:b.size=0;b.atime=new Date(a.timestamp);b.mtime=new Date(a.timestamp);b.ctime=new Date(a.timestamp);b.eb=4096;b.blocks=Math.ceil(b.size/b.eb);return b},za:function(a,b){void 0!==b.mode&&(a.mode=b.mode);void 0!==b.timestamp&&(a.timestamp=
b.timestamp);void 0!==b.size&&L.rb(a,b.size)},lookup:function(){throw eb[44];},Ia:function(a,b,c,d){return L.createNode(a,b,c,d)},rename:function(a,b,c){if(16384===(a.mode&61440)){try{var d=fb(b,c)}catch(g){}if(d)for(var e in d.qa)throw new K(55);}delete a.parent.qa[a.name];a.name=c;b.qa[c]=a;a.parent=b},unlink:function(a,b){delete a.qa[b]},rmdir:function(a,b){var c=fb(a,b),d;for(d in c.qa)throw new K(55);delete a.qa[b]},readdir:function(a){var b=[".",".."],c;for(c in a.qa)a.qa.hasOwnProperty(c)&&
b.push(c);return b},symlink:function(a,b,c){a=L.createNode(a,b,41471,0);a.link=c;return a},readlink:function(a){if(40960!==(a.mode&61440))throw new K(28);return a.link}},sa:{read:function(a,b,c,d,e){var g=a.node.qa;if(e>=a.node.ta)return 0;a=Math.min(a.node.ta-e,d);if(8<a&&g.subarray)b.set(g.subarray(e,e+a),c);else for(d=0;d<a;d++)b[c+d]=g[e+d];return a},write:function(a,b,c,d,e,g){b.buffer===E.buffer&&(g=!1);if(!d)return 0;a=a.node;a.timestamp=Date.now();if(b.subarray&&(!a.qa||a.qa.subarray)){if(g)return a.qa=
b.subarray(c,c+d),a.ta=d;if(0===a.ta&&0===e)return a.qa=new Uint8Array(b.subarray(c,c+d)),a.ta=d;if(e+d<=a.ta)return a.qa.set(b.subarray(c,c+d),e),d}L.Va(a,e+d);if(a.qa.subarray&&b.subarray)a.qa.set(b.subarray(c,c+d),e);else for(g=0;g<d;g++)a.qa[e+g]=b[c+g];a.ta=Math.max(a.ta,e+d);return d},Da:function(a,b,c){1===c?b+=a.position:2===c&&32768===(a.node.mode&61440)&&(b+=a.node.ta);if(0>b)throw new K(28);return b},Ta:function(a,b,c){L.Va(a.node,b+c);a.node.ta=Math.max(a.node.ta,b+c)},$a:function(a,b,
c,d,e,g,h){if(32768!==(a.node.mode&61440))throw new K(43);c=a.node.qa;if(h&2||c.buffer!==b.buffer){if(0<e||e+d<a.node.ta)c.subarray?c=c.subarray(e,e+d):c=Array.prototype.slice.call(c,e,e+d);a=!0;e=b.buffer==E.buffer;d=gb(d);if(!d)throw new K(48);(e?E:b).set(c,d)}else a=!1,d=c.byteOffset;return{Hb:d,bb:a}},Ka:function(a,b,c,d,e){if(32768!==(a.node.mode&61440))throw new K(43);if(e&2)return 0;L.sa.write(a,b,0,d,c,!1);return 0}}},hb=null,ib={},M=[],jb=1,kb=null,lb=!0,mb={},K=null,eb={};
function N(a,b){a=Va("/",a);b=b||{};if(!a)return{path:"",node:null};var c={Ya:!0,Ra:0},d;for(d in c)void 0===b[d]&&(b[d]=c[d]);if(8<b.Ra)throw new K(32);a=Ra(a.split("/").filter(function(a){return!!a}),!1);var e=hb;c="/";for(d=0;d<a.length;d++){var g=d===a.length-1;if(g&&b.parent)break;e=fb(e,a[d]);c=Sa(c+"/"+a[d]);e.Ja&&(!g||g&&b.Ya)&&(e=e.Ja.root);if(!g||b.Xa)for(g=0;40960===(e.mode&61440);)if(e=nb(c),c=Va(Ta(c),e),e=N(c,{Ra:b.Ra}).node,40<g++)throw new K(32);}return{path:c,node:e}}
function ob(a){for(var b;;){if(a===a.parent)return a=a.Ba.ab,b?"/"!==a[a.length-1]?a+"/"+b:a+b:a;b=b?a.name+"/"+b:a.name;a=a.parent}}function pb(a,b){for(var c=0,d=0;d<b.length;d++)c=(c<<5)-c+b.charCodeAt(d)|0;return(a+c>>>0)%kb.length}function qb(a){var b=pb(a.parent.id,a.name);a.nb=kb[b];kb[b]=a}function fb(a,b){var c;if(c=(c=rb(a,"x"))?c:a.ra.lookup?0:2)throw new K(c,a);for(c=kb[pb(a.id,b)];c;c=c.nb){var d=c.name;if(c.parent.id===a.id&&d===b)return c}return a.ra.lookup(a,b)}
function db(a,b,c,d){sb||(sb=function(a,b,c,d){a||(a=this);this.parent=a;this.Ba=a.Ba;this.Ja=null;this.id=jb++;this.name=b;this.mode=c;this.ra={};this.sa={};this.rdev=d},sb.prototype={},Object.defineProperties(sb.prototype,{read:{get:function(){return 365===(this.mode&365)},set:function(a){a?this.mode|=365:this.mode&=-366}},write:{get:function(){return 146===(this.mode&146)},set:function(a){a?this.mode|=146:this.mode&=-147}}}));a=new sb(a,b,c,d);qb(a);return a}
var tb={r:0,rs:1052672,"r+":2,w:577,wx:705,xw:705,"w+":578,"wx+":706,"xw+":706,a:1089,ax:1217,xa:1217,"a+":1090,"ax+":1218,"xa+":1218};function ub(a){var b=["r","w","rw"][a&3];a&512&&(b+="w");return b}function rb(a,b){if(lb)return 0;if(-1===b.indexOf("r")||a.mode&292){if(-1!==b.indexOf("w")&&!(a.mode&146)||-1!==b.indexOf("x")&&!(a.mode&73))return 2}else return 2;return 0}function vb(a,b){try{return fb(a,b),20}catch(c){}return rb(a,"wx")}
function wb(){var a=4096;for(var b=0;b<=a;b++)if(!M[b])return b;throw new K(33);}function xb(a){yb||(yb=function(){},yb.prototype={},Object.defineProperties(yb.prototype,{object:{get:function(){return this.node},set:function(a){this.node=a}}}));var b=new yb,c;for(c in a)b[c]=a[c];a=b;b=wb();a.fd=b;return M[b]=a}var cb={open:function(a){a.sa=ib[a.node.rdev].sa;a.sa.open&&a.sa.open(a)},Da:function(){throw new K(70);}};function Ya(a,b){ib[a]={sa:b}}
function zb(a,b){var c="/"===b,d=!b;if(c&&hb)throw new K(10);if(!c&&!d){var e=N(b,{Ya:!1});b=e.path;e=e.node;if(e.Ja)throw new K(10);if(16384!==(e.mode&61440))throw new K(54);}b={type:a,Gb:{},ab:b,mb:[]};a=a.Ba(b);a.Ba=b;b.root=a;c?hb=a:e&&(e.Ja=b,e.Ba&&e.Ba.mb.push(b))}function Ab(a,b,c){var d=N(a,{parent:!0}).node;a=Ua(a);if(!a||"."===a||".."===a)throw new K(28);var e=vb(d,a);if(e)throw new K(e);if(!d.ra.Ia)throw new K(63);return d.ra.Ia(d,a,b,c)}function O(a){Ab(a,16895,0)}
function Bb(a,b,c){"undefined"===typeof c&&(c=b,b=438);Ab(a,b|8192,c)}function Cb(a,b){if(!Va(a))throw new K(44);var c=N(b,{parent:!0}).node;if(!c)throw new K(44);b=Ua(b);var d=vb(c,b);if(d)throw new K(d);if(!c.ra.symlink)throw new K(63);c.ra.symlink(c,b,a)}function nb(a){a=N(a).node;if(!a)throw new K(44);if(!a.ra.readlink)throw new K(28);return Va(ob(a.parent),a.ra.readlink(a))}
function Db(a,b){if(""===a)throw new K(44);if("string"===typeof b){var c=tb[b];if("undefined"===typeof c)throw Error("Unknown file open mode: "+b);b=c}var d=b&64?("undefined"===typeof d?438:d)&4095|32768:0;if("object"===typeof a)var e=a;else{a=Sa(a);try{e=N(a,{Xa:!(b&131072)}).node}catch(h){}}c=!1;if(b&64)if(e){if(b&128)throw new K(20);}else e=Ab(a,d,0),c=!0;if(!e)throw new K(44);8192===(e.mode&61440)&&(b&=-513);if(b&65536&&16384!==(e.mode&61440))throw new K(54);if(!c&&(d=e?40960===(e.mode&61440)?
32:16384===(e.mode&61440)&&("r"!==ub(b)||b&512)?31:rb(e,ub(b)):44))throw new K(d);if(b&512){d=e;var g;"string"===typeof d?g=N(d,{Xa:!0}).node:g=d;if(!g.ra.za)throw new K(63);if(16384===(g.mode&61440))throw new K(31);if(32768!==(g.mode&61440))throw new K(28);if(d=rb(g,"w"))throw new K(d);g.ra.za(g,{size:0,timestamp:Date.now()})}b&=-641;e=xb({node:e,path:ob(e),flags:b,seekable:!0,position:0,sa:e.sa,Ab:[],error:!1});e.sa.open&&e.sa.open(e);!f.logReadFiles||b&1||(Eb||(Eb={}),a in Eb||(Eb[a]=1,console.log("FS.trackingDelegate error on read file: "+
a)));try{mb.onOpenFile&&(e=0,1!==(b&2097155)&&(e|=1),0!==(b&2097155)&&(e|=2),mb.onOpenFile(a,e))}catch(h){console.log("FS.trackingDelegate['onOpenFile']('"+a+"', flags) threw an exception: "+h.message)}}function Fb(a,b,c){if(null===a.fd)throw new K(8);if(!a.seekable||!a.sa.Da)throw new K(70);if(0!=c&&1!=c&&2!=c)throw new K(28);a.position=a.sa.Da(a,b,c);a.Ab=[]}
function Gb(){K||(K=function(a,b){this.node=b;this.sb=function(a){this.Ha=a};this.sb(a);this.message="FS error"},K.prototype=Error(),K.prototype.constructor=K,[44].forEach(function(a){eb[a]=new K(a);eb[a].stack="<generic error, no stack>"}))}var Hb;function Ib(a,b){var c=0;a&&(c|=365);b&&(c|=146);return c}
function Jb(a,b,c){a=Sa("/dev/"+a);var d=Ib(!!b,!!c);Kb||(Kb=64);var e=Kb++<<8|0;Ya(e,{open:function(a){a.seekable=!1},close:function(){c&&c.buffer&&c.buffer.length&&c(10)},read:function(a,c,d,e){for(var g=0,h=0;h<e;h++){try{var l=b()}catch(C){throw new K(29);}if(void 0===l&&0===g)throw new K(6);if(null===l||void 0===l)break;g++;c[d+h]=l}g&&(a.node.timestamp=Date.now());return g},write:function(a,b,d,e){for(var g=0;g<e;g++)try{c(b[d+g])}catch(t){throw new K(29);}e&&(a.node.timestamp=Date.now());return g}});
Bb(a,d,e)}var Kb,Lb={},sb,yb,Eb,Mb={},Nb=0;function Ob(){Nb+=4;return F[Nb-4>>2]}function Pb(a){void 0===a&&(a=Ob());a=M[a];if(!a)throw new K(8);return a}function Qb(a){try{var b=Pb(a);if(null===b.fd)throw new K(8);b.Pa&&(b.Pa=null);try{b.sa.close&&b.sa.close(b)}catch(c){throw c;}finally{M[b.fd]=null}b.fd=null;return 0}catch(c){return"undefined"!==typeof Lb&&c instanceof K||y(c),c.Ha}}
function Rb(a,b,c,d,e){try{var g=Pb(a);a=4294967296*c+(b>>>0);if(-9007199254740992>=a||9007199254740992<=a)return-61;Fb(g,a,d);Pa=[g.position>>>0,(J=g.position,1<=+Ea(J)?0<J?(Ha(+Ga(J/4294967296),4294967295)|0)>>>0:~~+Fa((J-+(~~J>>>0))/4294967296)>>>0:0)];F[e>>2]=Pa[0];F[e+4>>2]=Pa[1];g.Pa&&0===a&&0===d&&(g.Pa=null);return 0}catch(h){return"undefined"!==typeof Lb&&h instanceof K||y(h),h.Ha}}
function Sb(a,b,c,d){try{a:{for(var e=Pb(a),g=a=0;g<c;g++){var h=e,l=F[b+8*g>>2],r=F[b+(8*g+4)>>2],p=void 0,t=E;if(0>r||0>p)throw new K(28);if(null===h.fd)throw new K(8);if(0===(h.flags&2097155))throw new K(8);if(16384===(h.node.mode&61440))throw new K(31);if(!h.sa.write)throw new K(28);h.flags&1024&&Fb(h,0,2);var u="undefined"!==typeof p;if(!u)p=h.position;else if(!h.seekable)throw new K(70);var C=h.sa.write(h,t,l,r,p,void 0);u||(h.position+=C);try{if(h.path&&mb.onWriteToFile)mb.onWriteToFile(h.path)}catch(D){console.log("FS.trackingDelegate['onWriteToFile']('"+
h.path+"') threw an exception: "+D.message)}var P=C;if(0>P){var n=-1;break a}a+=P}n=a}F[d>>2]=n;return 0}catch(D){return"undefined"!==typeof Lb&&D instanceof K||y(D),D.Ha}}var Tb={};function Ub(a){for(;a.length;){var b=a.pop();a.pop()(b)}}function Vb(a){return this.fromWireType(G[a>>2])}var Q={},R={},Wb={};function Xb(a){if(void 0===a)return"_unknown";a=a.replace(/[^a-zA-Z0-9_]/g,"$");var b=a.charCodeAt(0);return 48<=b&&57>=b?"_"+a:a}
function Yb(a,b){a=Xb(a);return(new Function("body","return function "+a+'() {\n    "use strict";    return body.apply(this, arguments);\n};\n'))(b)}function Zb(a){var b=Error,c=Yb(a,function(b){this.name=a;this.message=b;b=Error(b).stack;void 0!==b&&(this.stack=this.toString()+"\n"+b.replace(/^Error(:[^\n]*)?\n/,""))});c.prototype=Object.create(b.prototype);c.prototype.constructor=c;c.prototype.toString=function(){return void 0===this.message?this.name:this.name+": "+this.message};return c}
var $b=void 0;function ac(a,b,c){function d(b){b=c(b);if(b.length!==a.length)throw new $b("Mismatched type converter count");for(var d=0;d<a.length;++d)T(a[d],b[d])}a.forEach(function(a){Wb[a]=b});var e=Array(b.length),g=[],h=0;b.forEach(function(a,b){R.hasOwnProperty(a)?e[b]=R[a]:(g.push(a),Q.hasOwnProperty(a)||(Q[a]=[]),Q[a].push(function(){e[b]=R[a];++h;h===g.length&&d(e)}))});0===g.length&&d(e)}
function bc(a){switch(a){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+a);}}var cc=void 0;function U(a){for(var b="";B[a];)b+=cc[B[a++]];return b}var ec=void 0;function V(a){throw new ec(a);}
function T(a,b,c){c=c||{};if(!("argPackAdvance"in b))throw new TypeError("registerType registeredInstance requires argPackAdvance");var d=b.name;a||V('type "'+d+'" must have a positive integer typeid pointer');if(R.hasOwnProperty(a)){if(c.kb)return;V("Cannot register type '"+d+"' twice")}R[a]=b;delete Wb[a];Q.hasOwnProperty(a)&&(b=Q[a],delete Q[a],b.forEach(function(a){a()}))}var fc=[],X=[{},{value:void 0},{value:null},{value:!0},{value:!1}];
function hc(a){4<a&&0===--X[a].Sa&&(X[a]=void 0,fc.push(a))}function ic(a){switch(a){case void 0:return 1;case null:return 2;case !0:return 3;case !1:return 4;default:var b=fc.length?fc.pop():X.length;X[b]={Sa:1,value:a};return b}}function jc(a){if(null===a)return"null";var b=typeof a;return"object"===b||"array"===b||"function"===b?a.toString():""+a}
function kc(a,b){switch(b){case 2:return function(a){return this.fromWireType(ua[a>>2])};case 3:return function(a){return this.fromWireType(va[a>>3])};default:throw new TypeError("Unknown float type: "+a);}}function lc(a){var b=Function;if(!(b instanceof Function))throw new TypeError("new_ called with constructor type "+typeof b+" which is not a function");var c=Yb(b.name||"unknownFunctionName",function(){});c.prototype=b.prototype;c=new c;a=b.apply(c,a);return a instanceof Object?a:c}
function mc(a,b){var c=f;if(void 0===c[a].ya){var d=c[a];c[a]=function(){c[a].ya.hasOwnProperty(arguments.length)||V("Function '"+b+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+c[a].ya+")!");return c[a].ya[arguments.length].apply(this,arguments)};c[a].ya=[];c[a].ya[d.cb]=d}}
function nc(a,b,c){f.hasOwnProperty(a)?((void 0===c||void 0!==f[a].ya&&void 0!==f[a].ya[c])&&V("Cannot register public name '"+a+"' twice"),mc(a,a),f.hasOwnProperty(c)&&V("Cannot register multiple overloads of a function with the same number of arguments ("+c+")!"),f[a].ya[c]=b):(f[a]=b,void 0!==c&&(f[a].Fb=c))}function oc(a,b){for(var c=[],d=0;d<a;d++)c.push(F[(b>>2)+d]);return c}
function pc(a,b){a=U(a);if(void 0!==f["FUNCTION_TABLE_"+a])var c=f["FUNCTION_TABLE_"+a][b];else if("undefined"!==typeof FUNCTION_TABLE)c=FUNCTION_TABLE[b];else{c=f["dynCall_"+a];void 0===c&&(c=f["dynCall_"+a.replace(/f/g,"d")],void 0===c&&V("No dynCall invoker for signature: "+a));for(var d=[],e=1;e<a.length;++e)d.push("a"+e);e="return function "+("dynCall_"+a+"_"+b)+"("+d.join(", ")+") {\n";e+="    return dynCall(rawFunction"+(d.length?", ":"")+d.join(", ")+");\n";c=(new Function("dynCall","rawFunction",
e+"};\n"))(c,b)}"function"!==typeof c&&V("unknown function pointer with signature "+a+": "+b);return c}var qc=void 0;function rc(a){a=sc(a);var b=U(a);Y(a);return b}function tc(a,b){function c(a){e[a]||R[a]||(Wb[a]?Wb[a].forEach(c):(d.push(a),e[a]=!0))}var d=[],e={};b.forEach(c);throw new qc(a+": "+d.map(rc).join([", "]));}
function uc(a,b,c){switch(b){case 0:return c?function(a){return E[a]}:function(a){return B[a]};case 1:return c?function(a){return sa[a>>1]}:function(a){return ta[a>>1]};case 2:return c?function(a){return F[a>>2]}:function(a){return G[a>>2]};default:throw new TypeError("Unknown integer type: "+a);}}var vc={};function wc(a){var b=vc[a];return void 0===b?U(a):b}var xc=[];function yc(a){a||V("Cannot use deleted val. handle = "+a);return X[a].value}function zc(a){var b=xc.length;xc.push(a);return b}
function Ac(a,b){var c=R[a];void 0===c&&V(b+" has unknown type "+rc(a));return c}function Bc(a,b){for(var c=Array(a),d=0;d<a;++d)c[d]=Ac(F[(b>>2)+d],"parameter "+d);return c}function Cc(){return E.length}var Dc={};function Ec(a){if(0===a)return 0;a=oa(a);if(!Dc.hasOwnProperty(a))return 0;Ec.va&&Y(Ec.va);a=Dc[a];var b=qa(a)+1,c=gb(b);c&&pa(a,E,c,b);Ec.va=c;return Ec.va}function Z(){Z.va||(Z.va=[]);Z.va.push(Fc());return Z.va.length-1}function Gc(a){return 0===a%4&&(0!==a%100||0===a%400)}
function Hc(a,b){for(var c=0,d=0;d<=b;c+=a[d++]);return c}var Ic=[31,29,31,30,31,30,31,31,30,31,30,31],Jc=[31,28,31,30,31,30,31,31,30,31,30,31];function Kc(a,b){for(a=new Date(a.getTime());0<b;){var c=a.getMonth(),d=(Gc(a.getFullYear())?Ic:Jc)[c];if(b>d-a.getDate())b-=d-a.getDate()+1,a.setDate(1),11>c?a.setMonth(c+1):(a.setMonth(0),a.setFullYear(a.getFullYear()+1));else{a.setDate(a.getDate()+b);break}}return a}
function Lc(a,b,c,d){function e(a,b,c){for(a="number"===typeof a?a.toString():a||"";a.length<b;)a=c[0]+a;return a}function g(a,b){return e(a,b,"0")}function h(a,b){function c(a){return 0>a?-1:0<a?1:0}var d;0===(d=c(a.getFullYear()-b.getFullYear()))&&0===(d=c(a.getMonth()-b.getMonth()))&&(d=c(a.getDate()-b.getDate()));return d}function l(a){switch(a.getDay()){case 0:return new Date(a.getFullYear()-1,11,29);case 1:return a;case 2:return new Date(a.getFullYear(),0,3);case 3:return new Date(a.getFullYear(),
0,2);case 4:return new Date(a.getFullYear(),0,1);case 5:return new Date(a.getFullYear()-1,11,31);case 6:return new Date(a.getFullYear()-1,11,30)}}function r(a){a=Kc(new Date(a.ua+1900,0,1),a.Na);var b=l(new Date(a.getFullYear()+1,0,4));return 0>=h(l(new Date(a.getFullYear(),0,4)),a)?0>=h(b,a)?a.getFullYear()+1:a.getFullYear():a.getFullYear()-1}var p=F[d+40>>2];d={yb:F[d>>2],xb:F[d+4>>2],La:F[d+8>>2],Ga:F[d+12>>2],Fa:F[d+16>>2],ua:F[d+20>>2],Ma:F[d+24>>2],Na:F[d+28>>2],Ib:F[d+32>>2],wb:F[d+36>>2],
zb:p?oa(p):""};c=oa(c);p={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var t in p)c=c.replace(new RegExp(t,"g"),p[t]);var u="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
C="January February March April May June July August September October November December".split(" ");p={"%a":function(a){return u[a.Ma].substring(0,3)},"%A":function(a){return u[a.Ma]},"%b":function(a){return C[a.Fa].substring(0,3)},"%B":function(a){return C[a.Fa]},"%C":function(a){return g((a.ua+1900)/100|0,2)},"%d":function(a){return g(a.Ga,2)},"%e":function(a){return e(a.Ga,2," ")},"%g":function(a){return r(a).toString().substring(2)},"%G":function(a){return r(a)},"%H":function(a){return g(a.La,
2)},"%I":function(a){a=a.La;0==a?a=12:12<a&&(a-=12);return g(a,2)},"%j":function(a){return g(a.Ga+Hc(Gc(a.ua+1900)?Ic:Jc,a.Fa-1),3)},"%m":function(a){return g(a.Fa+1,2)},"%M":function(a){return g(a.xb,2)},"%n":function(){return"\n"},"%p":function(a){return 0<=a.La&&12>a.La?"AM":"PM"},"%S":function(a){return g(a.yb,2)},"%t":function(){return"\t"},"%u":function(a){return a.Ma||7},"%U":function(a){var b=new Date(a.ua+1900,0,1),c=0===b.getDay()?b:Kc(b,7-b.getDay());a=new Date(a.ua+1900,a.Fa,a.Ga);return 0>
h(c,a)?g(Math.ceil((31-c.getDate()+(Hc(Gc(a.getFullYear())?Ic:Jc,a.getMonth()-1)-31)+a.getDate())/7),2):0===h(c,b)?"01":"00"},"%V":function(a){var b=l(new Date(a.ua+1900,0,4)),c=l(new Date(a.ua+1901,0,4)),d=Kc(new Date(a.ua+1900,0,1),a.Na);return 0>h(d,b)?"53":0>=h(c,d)?"01":g(Math.ceil((b.getFullYear()<a.ua+1900?a.Na+32-b.getDate():a.Na+1-b.getDate())/7),2)},"%w":function(a){return a.Ma},"%W":function(a){var b=new Date(a.ua,0,1),c=1===b.getDay()?b:Kc(b,0===b.getDay()?1:7-b.getDay()+1);a=new Date(a.ua+
1900,a.Fa,a.Ga);return 0>h(c,a)?g(Math.ceil((31-c.getDate()+(Hc(Gc(a.getFullYear())?Ic:Jc,a.getMonth()-1)-31)+a.getDate())/7),2):0===h(c,b)?"01":"00"},"%y":function(a){return(a.ua+1900).toString().substring(2)},"%Y":function(a){return a.ua+1900},"%z":function(a){a=a.wb;var b=0<=a;a=Math.abs(a)/60;return(b?"+":"-")+String("0000"+(a/60*100+a%60)).slice(-4)},"%Z":function(a){return a.zb},"%%":function(){return"%"}};for(t in p)0<=c.indexOf(t)&&(c=c.replace(new RegExp(t,"g"),p[t](d)));t=$a(c,!1);if(t.length>
b)return 0;E.set(t,a);return t.length-1}Gb();kb=Array(4096);zb(L,"/");O("/tmp");O("/home");O("/home/web_user");
(function(){O("/dev");Ya(259,{read:function(){return 0},write:function(a,b,c,h){return h}});Bb("/dev/null",259);Xa(1280,ab);Xa(1536,bb);Bb("/dev/tty",1280);Bb("/dev/tty1",1536);if("object"===typeof crypto&&"function"===typeof crypto.getRandomValues){var a=new Uint8Array(1);var b=function(){crypto.getRandomValues(a);return a[0]}}else if(w)try{var c=__nccwpck_require__(6113);b=function(){return c.randomBytes(1)[0]}}catch(d){}b||(b=function(){y("random_device")});Jb("random",b);Jb("urandom",b);O("/dev/shm");
O("/dev/shm/tmp")})();O("/proc");O("/proc/self");O("/proc/self/fd");zb({Ba:function(){var a=db("/proc/self","fd",16895,73);a.ra={lookup:function(a,c){var b=M[+c];if(!b)throw new K(8);a={parent:null,Ba:{ab:"fake"},ra:{readlink:function(){return b.path}}};return a.parent=a}};return a}},"/proc/self/fd");$b=f.InternalError=Zb("InternalError");for(var Mc=Array(256),Nc=0;256>Nc;++Nc)Mc[Nc]=String.fromCharCode(Nc);cc=Mc;ec=f.BindingError=Zb("BindingError");
f.count_emval_handles=function(){for(var a=0,b=5;b<X.length;++b)void 0!==X[b]&&++a;return a};f.get_first_emval=function(){for(var a=5;a<X.length;++a)if(void 0!==X[a])return X[a];return null};qc=f.UnboundTypeError=Zb("UnboundTypeError");function $a(a,b){var c=Array(qa(a)+1);a=pa(a,c,0,c.length);b&&(c.length=a);return c}
var Oa={c:function(a){return gb(a)},b:function(a){"uncaught_exception"in Oc?Oc.ob++:Oc.ob=1;throw a;},F:function(){},B:function(){f.___errno_location&&(F[f.___errno_location()>>2]=63);return-1},z:function(a,b){Nb=b;try{var c=Ob(),d=Ob();if(-1===c||0===d)var e=-28;else{var g=Mb[c];if(g&&d===g.Db){var h=M[g.fd],l=g.flags,r=new Uint8Array(B.subarray(c,c+d));h&&h.sa.Ka&&h.sa.Ka(h,r,0,d,l);Mb[c]=null;g.bb&&Y(g.Eb)}e=0}return e}catch(p){return"undefined"!==typeof Lb&&p instanceof K||y(p),-p.Ha}},t:function(){},
y:function(){return Qb.apply(null,arguments)},A:function(){return Rb.apply(null,arguments)},x:function(){return Sb.apply(null,arguments)},w:function(a){var b=Tb[a];delete Tb[a];var c=b.pb,d=b.qb,e=b.Wa,g=e.map(function(a){return a.jb}).concat(e.map(function(a){return a.ub}));ac([a],g,function(a){var g={};e.forEach(function(b,c){var d=a[c],h=b.hb,l=b.ib,p=a[c+e.length],r=b.tb,D=b.vb;g[b.fb]={read:function(a){return d.fromWireType(h(l,a))},write:function(a,b){var c=[];r(D,a,p.toWireType(c,b));Ub(c)}}});
return[{name:b.name,fromWireType:function(a){var b={},c;for(c in g)b[c]=g[c].read(a);d(a);return b},toWireType:function(a,b){for(var e in g)if(!(e in b))throw new TypeError("Missing field");var h=c();for(e in g)g[e].write(h,b[e]);null!==a&&a.push(d,h);return h},argPackAdvance:8,readValueFromPointer:Vb,Aa:d}]})},N:function(a,b,c,d,e){var g=bc(c);b=U(b);T(a,{name:b,fromWireType:function(a){return!!a},toWireType:function(a,b){return b?d:e},argPackAdvance:8,readValueFromPointer:function(a){if(1===c)var d=
E;else if(2===c)d=sa;else if(4===c)d=F;else throw new TypeError("Unknown boolean type size: "+b);return this.fromWireType(d[a>>g])},Aa:null})},M:function(a,b){b=U(b);T(a,{name:b,fromWireType:function(a){var b=X[a].value;hc(a);return b},toWireType:function(a,b){return ic(b)},argPackAdvance:8,readValueFromPointer:Vb,Aa:null})},v:function(a,b,c){c=bc(c);b=U(b);T(a,{name:b,fromWireType:function(a){return a},toWireType:function(a,b){if("number"!==typeof b&&"boolean"!==typeof b)throw new TypeError('Cannot convert "'+
jc(b)+'" to '+this.name);return b},argPackAdvance:8,readValueFromPointer:kc(b,c),Aa:null})},s:function(a,b,c,d,e,g){var h=oc(b,c);a=U(a);e=pc(d,e);nc(a,function(){tc("Cannot call "+a+" due to unbound types",h)},b-1);ac([],h,function(c){var d=[c[0],null].concat(c.slice(1)),h=c=a,l=e,u=d.length;2>u&&V("argTypes array size mismatch! Must at least get return value and 'this' types!");for(var C=null!==d[1]&&!1,P=!1,n=1;n<d.length;++n)if(null!==d[n]&&void 0===d[n].Aa){P=!0;break}var D="void"!==d[0].name,
S="",W="";for(n=0;n<u-2;++n)S+=(0!==n?", ":"")+"arg"+n,W+=(0!==n?", ":"")+"arg"+n+"Wired";h="return function "+Xb(h)+"("+S+") {\nif (arguments.length !== "+(u-2)+") {\nthrowBindingError('function "+h+" called with ' + arguments.length + ' arguments, expected "+(u-2)+" args!');\n}\n";P&&(h+="var destructors = [];\n");var dc=P?"destructors":"null";S="throwBindingError invoker fn runDestructors retType classParam".split(" ");l=[V,l,g,Ub,d[0],d[1]];C&&(h+="var thisWired = classParam.toWireType("+dc+", this);\n");
for(n=0;n<u-2;++n)h+="var arg"+n+"Wired = argType"+n+".toWireType("+dc+", arg"+n+"); // "+d[n+2].name+"\n",S.push("argType"+n),l.push(d[n+2]);C&&(W="thisWired"+(0<W.length?", ":"")+W);h+=(D?"var rv = ":"")+"invoker(fn"+(0<W.length?", ":"")+W+");\n";if(P)h+="runDestructors(destructors);\n";else for(n=C?1:2;n<d.length;++n)u=1===n?"thisWired":"arg"+(n-2)+"Wired",null!==d[n].Aa&&(h+=u+"_dtor("+u+"); // "+d[n].name+"\n",S.push(u+"_dtor"),l.push(d[n].Aa));D&&(h+="var ret = retType.fromWireType(rv);\nreturn ret;\n");
S.push(h+"}\n");d=lc(S).apply(null,l);n=b-1;if(!f.hasOwnProperty(c))throw new $b("Replacing nonexistant public symbol");void 0!==f[c].ya&&void 0!==n?f[c].ya[n]=d:(f[c]=d,f[c].cb=n);return[]})},i:function(a,b,c,d,e){function g(a){return a}b=U(b);-1===e&&(e=4294967295);var h=bc(c);if(0===d){var l=32-8*c;g=function(a){return a<<l>>>l}}var r=-1!=b.indexOf("unsigned");T(a,{name:b,fromWireType:g,toWireType:function(a,c){if("number"!==typeof c&&"boolean"!==typeof c)throw new TypeError('Cannot convert "'+
jc(c)+'" to '+this.name);if(c<d||c>e)throw new TypeError('Passing a number "'+jc(c)+'" from JS side to C/C++ side to an argument of type "'+b+'", which is outside the valid range ['+d+", "+e+"]!");return r?c>>>0:c|0},argPackAdvance:8,readValueFromPointer:uc(b,h,0!==d),Aa:null})},g:function(a,b,c){function d(a){a>>=2;var b=G;return new e(b.buffer,b[a+1],b[a])}var e=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][b];c=U(c);T(a,{name:c,fromWireType:d,argPackAdvance:8,
readValueFromPointer:d},{kb:!0})},u:function(a,b){b=U(b);var c="std::string"===b;T(a,{name:b,fromWireType:function(a){var b=G[a>>2];if(c){var d=B[a+4+b],h=0;0!=d&&(h=d,B[a+4+b]=0);var l=a+4;for(d=0;d<=b;++d){var r=a+4+d;if(0==B[r]){l=oa(l);if(void 0===p)var p=l;else p+=String.fromCharCode(0),p+=l;l=r+1}}0!=h&&(B[a+4+b]=h)}else{p=Array(b);for(d=0;d<b;++d)p[d]=String.fromCharCode(B[a+4+d]);p=p.join("")}Y(a);return p},toWireType:function(a,b){b instanceof ArrayBuffer&&(b=new Uint8Array(b));var d="string"===
typeof b;d||b instanceof Uint8Array||b instanceof Uint8ClampedArray||b instanceof Int8Array||V("Cannot pass non-string to std::string");var e=(c&&d?function(){return qa(b)}:function(){return b.length})(),l=gb(4+e+1);G[l>>2]=e;if(c&&d)pa(b,B,l+4,e+1);else if(d)for(d=0;d<e;++d){var r=b.charCodeAt(d);255<r&&(Y(l),V("String has UTF-16 code units that do not fit in 8 bits"));B[l+4+d]=r}else for(d=0;d<e;++d)B[l+4+d]=b[d];null!==a&&a.push(Y,l);return l},argPackAdvance:8,readValueFromPointer:Vb,Aa:function(a){Y(a)}})},
L:function(a,b,c){c=U(c);if(2===b){var d=function(){return ta};var e=1}else 4===b&&(d=function(){return G},e=2);T(a,{name:c,fromWireType:function(a){for(var b=d(),c=G[a>>2],g=Array(c),p=a+4>>e,t=0;t<c;++t)g[t]=String.fromCharCode(b[p+t]);Y(a);return g.join("")},toWireType:function(a,c){var g=c.length,h=gb(4+g*b),p=d();G[h>>2]=g;for(var t=h+4>>e,u=0;u<g;++u)p[t+u]=c.charCodeAt(u);null!==a&&a.push(Y,h);return h},argPackAdvance:8,readValueFromPointer:Vb,Aa:function(a){Y(a)}})},K:function(a,b,c,d,e,g){Tb[a]=
{name:U(b),pb:pc(c,d),qb:pc(e,g),Wa:[]}},J:function(a,b,c,d,e,g,h,l,r,p){Tb[a].Wa.push({fb:U(b),jb:c,hb:pc(d,e),ib:g,ub:h,tb:pc(l,r),vb:p})},I:function(a,b){b=U(b);T(a,{lb:!0,name:b,argPackAdvance:0,fromWireType:function(){},toWireType:function(){}})},H:function(a,b,c,d){a=xc[a];b=yc(b);c=wc(c);a(b,c,null,d)},d:hc,G:function(a,b){b=Bc(a,b);for(var c=b[0],d=c.name+"_$"+b.slice(1).map(function(a){return a.name}).join("_")+"$",e=["retType"],g=[c],h="",l=0;l<a-1;++l)h+=(0!==l?", ":"")+"arg"+l,e.push("argType"+
l),g.push(b[1+l]);d="return function "+Xb("methodCaller_"+d)+"(handle, name, destructors, args) {\n";var r=0;for(l=0;l<a-1;++l)d+="    var arg"+l+" = argType"+l+".readValueFromPointer(args"+(r?"+"+r:"")+");\n",r+=b[l+1].argPackAdvance;d+="    var rv = handle[name]("+h+");\n";for(l=0;l<a-1;++l)b[l+1].deleteObject&&(d+="    argType"+l+".deleteObject(arg"+l+");\n");c.lb||(d+="    return retType.toWireType(destructors, rv);\n");e.push(d+"};\n");a=lc(e).apply(null,g);return zc(a)},h:function(a){4<a&&(X[a].Sa+=
1)},p:function(){return ic([])},r:function(a){return ic(wc(a))},l:function(){return ic({})},o:function(a,b,c){a=yc(a);b=yc(b);c=yc(c);a[b]=c},f:function(a,b){a=Ac(a,"_emval_take_value");a=a.readValueFromPointer(b);return ic(a)},__memory_base:1024,__table_base:0,a:function(){y()},n:Cc,E:function(a,b,c){B.set(B.subarray(b,b+c),a)},m:function(a){if(2147418112<a)return!1;for(var b=Math.max(Cc(),16777216);b<a;)536870912>=b?b=ra(2*b):b=Math.min(ra((3*b+2147483648)/4),2147418112);a:{try{A.grow(b-buffer.byteLength+
65535>>16);wa(A.buffer);var c=1;break a}catch(d){}c=void 0}return c?!0:!1},q:Ec,k:function(a){var b=Z.va[a];Z.va.splice(a,1);Pc(b)},j:Z,D:function(a,b,c,d){return Lc(a,b,c,d)},e:y,memory:A,C:function(){},table:ka},Qc=f.asm({},Oa,buffer);f.asm=Qc;var Oc=f.__ZSt18uncaught_exceptionv=function(){return f.asm.O.apply(null,arguments)};f.___embind_register_native_and_builtin_types=function(){return f.asm.P.apply(null,arguments)};f.___errno_location=function(){return f.asm.Q.apply(null,arguments)};
var sc=f.___getTypeName=function(){return f.asm.R.apply(null,arguments)},Y=f._free=function(){return f.asm.S.apply(null,arguments)},gb=f._malloc=function(){return f.asm.T.apply(null,arguments)},Qa=f.globalCtors=function(){return f.asm.ma.apply(null,arguments)};f.stackAlloc=function(){return f.asm.na.apply(null,arguments)};var Pc=f.stackRestore=function(){return f.asm.oa.apply(null,arguments)},Fc=f.stackSave=function(){return f.asm.pa.apply(null,arguments)};
f.dynCall_i=function(){return f.asm.U.apply(null,arguments)};f.dynCall_ii=function(){return f.asm.V.apply(null,arguments)};f.dynCall_iii=function(){return f.asm.W.apply(null,arguments)};f.dynCall_iiii=function(){return f.asm.X.apply(null,arguments)};f.dynCall_iiiii=function(){return f.asm.Y.apply(null,arguments)};f.dynCall_iiiiid=function(){return f.asm.Z.apply(null,arguments)};f.dynCall_iiiiii=function(){return f.asm._.apply(null,arguments)};
f.dynCall_iiiiiid=function(){return f.asm.$.apply(null,arguments)};f.dynCall_iiiiiii=function(){return f.asm.aa.apply(null,arguments)};f.dynCall_iiiiiiii=function(){return f.asm.ba.apply(null,arguments)};f.dynCall_iiiiiiiii=function(){return f.asm.ca.apply(null,arguments)};f.dynCall_iiiiij=function(){return f.asm.da.apply(null,arguments)};f.dynCall_jiji=function(){return f.asm.ea.apply(null,arguments)};f.dynCall_vi=function(){return f.asm.fa.apply(null,arguments)};
f.dynCall_vii=function(){return f.asm.ga.apply(null,arguments)};f.dynCall_viii=function(){return f.asm.ha.apply(null,arguments)};f.dynCall_viiii=function(){return f.asm.ia.apply(null,arguments)};f.dynCall_viiiii=function(){return f.asm.ja.apply(null,arguments)};f.dynCall_viiiiii=function(){return f.asm.ka.apply(null,arguments)};f.dynCall_viijii=function(){return f.asm.la.apply(null,arguments)};f.asm=Qc;var Rc;
f.then=function(a){if(Rc)a(f);else{var b=f.onRuntimeInitialized;f.onRuntimeInitialized=function(){b&&b();a(f)}}return f};Ja=function Sc(){Rc||Tc();Rc||(Ja=Sc)};
function Tc(){function a(){if(!Rc&&(Rc=!0,!la)){f.noFSInit||Hb||(Hb=!0,Gb(),f.stdin=f.stdin,f.stdout=f.stdout,f.stderr=f.stderr,f.stdin?Jb("stdin",f.stdin):Cb("/dev/tty","/dev/stdin"),f.stdout?Jb("stdout",null,f.stdout):Cb("/dev/tty","/dev/stdout"),f.stderr?Jb("stderr",null,f.stderr):Cb("/dev/tty1","/dev/stderr"),Db("/dev/stdin","r"),Db("/dev/stdout","w"),Db("/dev/stderr","w"));ya(Aa);lb=!1;ya(Ba);if(f.onRuntimeInitialized)f.onRuntimeInitialized();if(f.postRun)for("function"==typeof f.postRun&&(f.postRun=
[f.postRun]);f.postRun.length;){var a=f.postRun.shift();Ca.unshift(a)}ya(Ca)}}if(!(0<H)){if(f.preRun)for("function"==typeof f.preRun&&(f.preRun=[f.preRun]);f.preRun.length;)Da();ya(za);0<H||(f.setStatus?(f.setStatus("Running..."),setTimeout(function(){setTimeout(function(){f.setStatus("")},1);a()},1)):a())}}f.run=Tc;if(f.preInit)for("function"==typeof f.preInit&&(f.preInit=[f.preInit]);0<f.preInit.length;)f.preInit.pop()();Tc();


  return camaro
}
);
})();
if (true)
      module.exports = camaro;
    else {}
    

/***/ }),

/***/ 833:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { resolve } = __nccwpck_require__(1017)
const NODE_MAJOR_VERSION = process.versions.node.split('.')[0]
let pool = null

if (NODE_MAJOR_VERSION < 12) {
    console.warn('[camaro] worker_threads is not available, expect performance drop. Try using Node version >= 12.')
    const workerFn = __nccwpck_require__(1928)
    pool = {
        runTask: async (args) => workerFn(args)
    }
} else {
    const WorkerPool = __nccwpck_require__(6486)
    pool = new WorkerPool({ filename: __nccwpck_require__.ab + "worker.js" })
}

function isNonEmptyString(str) {
    return typeof str === 'string' && str.length > 0
}

function isEmptyObject(obj) {
    return Object.entries(obj).length === 0 && obj.constructor === Object
}

/**
 * convert xml to json base on the template object
 * @param {string} xml xml string
 * @param {object} template template object
 * @returns {object} xml converted to json object based on the template
 */
function transform(xml, template) {
    if (!isNonEmptyString(xml)) {
        throw new TypeError('1st argument (xml) must be a non-empty string')
    }

    if (!template || typeof template !== 'object' || isEmptyObject(template)) {
        throw new TypeError('2nd argument (template) must be an object')
    }

    return pool.runTask({
        fn: 'transform',
        args: [xml, JSON.stringify(template)],
    })
}

/**
 * convert xml to json
 * @param {string} xml xml string
 * @returns {object} json object converted from the input xml
 */
function toJson(xml) {
    throw new Error('Not yet implemented')
    // if (!isNonEmptyString(xml)) {
    //     throw new TypeError('expecting xml input to be non-empty string')
    // }

    // return pool.runTask({ fn: 'toJson', args: [xml] })
}

/**
 * pretty print xml string
 * @param {string} xml xml string
 * @param {object} opts pretty print options
 * @param {number} [opts.indentSize=2] indent size, default=2
 * @returns {string} xml pretty print string
 */
function prettyPrint(xml, opts = { indentSize: 2 }) {
    if (!isNonEmptyString(xml)) {
        throw new TypeError('expecting xml input to be non-empty string')
    }

    return pool.runTask({ fn: 'prettyPrint', args: [xml, opts] })
}

module.exports = { transform, toJson, prettyPrint }


/***/ }),

/***/ 1928:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Module = __nccwpck_require__(490)

let cachedInstance

function callWasmBinding(methodName, ...args) {
    if (!cachedInstance) throw new Error('camaro is not initialized yet.')
    return cachedInstance[methodName](...args)
}

const ready = new Promise((resolve, reject) => {
    if (!cachedInstance) {
        const instance = Module()
        instance.onRuntimeInitialized = () => {
            cachedInstance = instance
            resolve()
        }
    } else {            
        resolve()
    }
})

module.exports = async ({fn, args}) => {    
    await ready
    return callWasmBinding(fn, ...args)
}

/***/ }),

/***/ 7966:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const events_1 = __nccwpck_require__(2361);
const async_hooks_1 = __nccwpck_require__(852);
const kEventEmitter = Symbol('kEventEmitter');
const kAsyncResource = Symbol('kAsyncResource');
class EventEmitterReferencingAsyncResource extends async_hooks_1.AsyncResource {
    constructor(ee, type, options) {
        super(type, options);
        this[kEventEmitter] = ee;
    }
    get eventEmitter() {
        return this[kEventEmitter];
    }
}
class EventEmitterAsyncResource extends events_1.EventEmitter {
    constructor(options) {
        let name;
        if (typeof options === 'string') {
            name = options;
            options = undefined;
        }
        else {
            name = (options === null || options === void 0 ? void 0 : options.name) || new.target.name;
        }
        super(options);
        this[kAsyncResource] =
            new EventEmitterReferencingAsyncResource(this, name, options);
    }
    emit(event, ...args) {
        return this.asyncResource.runInAsyncScope(super.emit, this, event, ...args);
    }
    emitDestroy() {
        this.asyncResource.emitDestroy();
    }
    asyncId() {
        return this.asyncResource.asyncId();
    }
    triggerAsyncId() {
        return this.asyncResource.triggerAsyncId();
    }
    get asyncResource() {
        return this[kAsyncResource];
    }
    static get EventEmitterAsyncResource() { return EventEmitterAsyncResource; }
}
module.exports = EventEmitterAsyncResource;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 6535:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const { pow, floor } = Math;
const TWO_POW_32 = pow(2, 32);
/**
 * Mimic Java's ByteBufffer with big endian order
 */
class ByteBuffer {
    constructor(data) {
        this.position = 0;
        this.data = data;
        this.int32ArrayForConvert = new Uint32Array(1);
        this.int8ArrayForConvert = new Uint8Array(this.int32ArrayForConvert.buffer);
    }
    static allocate(size = 16) {
        return new ByteBuffer(new Uint8Array(size));
    }
    put(value) {
        if (this.position === this.data.length) {
            const oldArray = this.data;
            this.data = new Uint8Array(this.data.length * 2);
            this.data.set(oldArray);
        }
        this.data[this.position] = value;
        this.position++;
    }
    putInt32(value) {
        if (this.data.length - this.position < 4) {
            const oldArray = this.data;
            this.data = new Uint8Array(this.data.length * 2 + 4);
            this.data.set(oldArray);
        }
        this.int32ArrayForConvert[0] = value;
        this.data.set(this.int8ArrayForConvert.reverse(), this.position);
        this.position += 4;
    }
    putInt64(value) {
        this.putInt32(floor(value / TWO_POW_32));
        this.putInt32(value);
    }
    putArray(array) {
        if (this.data.length - this.position < array.byteLength) {
            const oldArray = this.data;
            this.data = new Uint8Array(this.position + array.byteLength);
            this.data.set(oldArray);
        }
        this.data.set(array, this.position);
        this.position += array.byteLength;
    }
    get() {
        const value = this.data[this.position];
        this.position++;
        return value;
    }
    getInt32() {
        this.int8ArrayForConvert.set(this.data.slice(this.position, this.position + 4).reverse());
        const value = this.int32ArrayForConvert[0];
        this.position += 4;
        return value;
    }
    getInt64() {
        const high = this.getInt32();
        const low = this.getInt32();
        return high * TWO_POW_32 + low;
    }
    resetPosition() {
        this.position = 0;
    }
}
exports["default"] = ByteBuffer;
//# sourceMappingURL=ByteBuffer.js.map

/***/ }),

/***/ 6141:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/*
 * This is a TypeScript port of the original Java version, which was written by
 * Gil Tene as described in
 * https://github.com/HdrHistogram/HdrHistogram
 * and released to the public domain, as explained at
 * http://creativecommons.org/publicdomain/zero/1.0/
 */
const TypedArrayHistogram_1 = __nccwpck_require__(3230);
class Float64Histogram extends TypedArrayHistogram_1.default {
    constructor(lowestDiscernibleValue, highestTrackableValue, numberOfSignificantValueDigits) {
        super(Float64Array, lowestDiscernibleValue, highestTrackableValue, numberOfSignificantValueDigits);
    }
}
exports["default"] = Float64Histogram;
//# sourceMappingURL=Float64Histogram.js.map

/***/ }),

/***/ 8474:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toSummary = exports.NO_TAG = void 0;
const formatters_1 = __nccwpck_require__(4791);
exports.NO_TAG = "NO TAG";
exports.toSummary = (histogram) => {
    const { totalCount, maxValue, numberOfSignificantValueDigits } = histogram;
    const round = formatters_1.keepSignificantDigits(numberOfSignificantValueDigits);
    return {
        p50: round(histogram.getValueAtPercentile(50)),
        p75: round(histogram.getValueAtPercentile(75)),
        p90: round(histogram.getValueAtPercentile(90)),
        p97_5: round(histogram.getValueAtPercentile(97.5)),
        p99: round(histogram.getValueAtPercentile(99)),
        p99_9: round(histogram.getValueAtPercentile(99.9)),
        p99_99: round(histogram.getValueAtPercentile(99.99)),
        p99_999: round(histogram.getValueAtPercentile(99.999)),
        max: maxValue,
        totalCount,
    };
};
//# sourceMappingURL=Histogram.js.map

/***/ }),

/***/ 7486:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.build = exports.defaultRequest = void 0;
const JsHistogramFactory_1 = __nccwpck_require__(5675);
const wasm_1 = __nccwpck_require__(24);
exports.defaultRequest = {
    bitBucketSize: 32,
    autoResize: true,
    lowestDiscernibleValue: 1,
    highestTrackableValue: 2,
    numberOfSignificantValueDigits: 3,
    useWebAssembly: false,
};
exports.build = (request = exports.defaultRequest) => {
    const parameters = Object.assign({}, exports.defaultRequest, request);
    if (request.useWebAssembly && wasm_1.webAssemblyAvailable) {
        return wasm_1.WasmHistogram.build(parameters);
    }
    const histogramConstr = JsHistogramFactory_1.constructorFromBucketSize(parameters.bitBucketSize);
    const histogram = new histogramConstr(parameters.lowestDiscernibleValue, parameters.highestTrackableValue, parameters.numberOfSignificantValueDigits);
    histogram.autoResize = parameters.autoResize;
    return histogram;
};
//# sourceMappingURL=HistogramBuilder.js.map

/***/ }),

/***/ 1883:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/*
 * This is a TypeScript port of the original Java version, which was written by
 * Gil Tene as described in
 * https://github.com/HdrHistogram/HdrHistogram
 * and released to the public domain, as explained at
 * http://creativecommons.org/publicdomain/zero/1.0/
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Represents a value point iterated through in a Histogram, with associated stats.
 * <ul>
 * <li><b><code>valueIteratedTo</code></b> :<br> The actual value level that was iterated to by the iterator</li>
 * <li><b><code>prevValueIteratedTo</code></b> :<br> The actual value level that was iterated from by the iterator</li>
 * <li><b><code>countAtValueIteratedTo</code></b> :<br> The count of recorded values in the histogram that
 * exactly match this [lowestEquivalentValue(valueIteratedTo)...highestEquivalentValue(valueIteratedTo)] value
 * range.</li>
 * <li><b><code>countAddedInThisIterationStep</code></b> :<br> The count of recorded values in the histogram that
 * were added to the totalCountToThisValue (below) as a result on this iteration step. Since multiple iteration
 * steps may occur with overlapping equivalent value ranges, the count may be lower than the count found at
 * the value (e.g. multiple linear steps or percentile levels can occur within a single equivalent value range)</li>
 * <li><b><code>totalCountToThisValue</code></b> :<br> The total count of all recorded values in the histogram at
 * values equal or smaller than valueIteratedTo.</li>
 * <li><b><code>totalValueToThisValue</code></b> :<br> The sum of all recorded values in the histogram at values
 * equal or smaller than valueIteratedTo.</li>
 * <li><b><code>percentile</code></b> :<br> The percentile of recorded values in the histogram at values equal
 * or smaller than valueIteratedTo.</li>
 * <li><b><code>percentileLevelIteratedTo</code></b> :<br> The percentile level that the iterator returning this
 * HistogramIterationValue had iterated to. Generally, percentileLevelIteratedTo will be equal to or smaller than
 * percentile, but the same value point can contain multiple iteration levels for some iterators. E.g. a
 * PercentileIterator can stop multiple times in the exact same value point (if the count at that value covers a
 * range of multiple percentiles in the requested percentile iteration points).</li>
 * </ul>
 */
class HistogramIterationValue {
    constructor() {
        this.reset();
    }
    reset() {
        this.valueIteratedTo = 0;
        this.valueIteratedFrom = 0;
        this.countAtValueIteratedTo = 0;
        this.countAddedInThisIterationStep = 0;
        this.totalCountToThisValue = 0;
        this.totalValueToThisValue = 0;
        this.percentile = 0.0;
        this.percentileLevelIteratedTo = 0.0;
    }
}
exports["default"] = HistogramIterationValue;
//# sourceMappingURL=HistogramIterationValue.js.map

/***/ }),

/***/ 6654:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.listTags = void 0;
/*
 * This is a TypeScript port of the original Java version, which was written by
 * Gil Tene as described in
 * https://github.com/HdrHistogram/HdrHistogram
 * and released to the public domain, as explained at
 * http://creativecommons.org/publicdomain/zero/1.0/
 */
const Histogram_1 = __nccwpck_require__(8474);
const encoding_1 = __nccwpck_require__(6012);
const TAG_PREFIX = "Tag=";
const TAG_PREFIX_LENGTH = "Tag=".length;
/**
 * A histogram log reader.
 * <p>
 * Histogram logs are used to capture full fidelity, per-time-interval
 * histograms of a recorded value.
 * <p>
 * For example, a histogram log can be used to capture high fidelity
 * reaction-time logs for some measured system or subsystem component.
 * Such a log would capture a full reaction time histogram for each
 * logged interval, and could be used to later reconstruct a full
 * HdrHistogram of the measured reaction time behavior for any arbitrary
 * time range within the log, by adding [only] the relevant interval
 * histograms.
 * <h3>Histogram log format:</h3>
 * A histogram log file consists of text lines. Lines beginning with
 * the "#" character are optional and treated as comments. Lines
 * containing the legend (starting with "Timestamp") are also optional
 * and ignored in parsing the histogram log. All other lines must
 * be valid interval description lines. Text fields are delimited by
 * commas, spaces.
 * <p>
 * A valid interval description line contains an optional Tag=tagString
 * text field, followed by an interval description.
 * <p>
 * A valid interval description must contain exactly four text fields:
 * <ul>
 * <li>StartTimestamp: The first field must contain a number parse-able as a Double value,
 * representing the start timestamp of the interval in seconds.</li>
 * <li>intervalLength: The second field must contain a number parse-able as a Double value,
 * representing the length of the interval in seconds.</li>
 * <li>Interval_Max: The third field must contain a number parse-able as a Double value,
 * which generally represents the maximum value of the interval histogram.</li>
 * <li>Interval_Compressed_Histogram: The fourth field must contain a text field
 * parse-able as a Base64 text representation of a compressed HdrHistogram.</li>
 * </ul>
 * The log file may contain an optional indication of a starting time. Starting time
 * is indicated using a special comments starting with "#[StartTime: " and followed
 * by a number parse-able as a double, representing the start time (in seconds)
 * that may be added to timestamps in the file to determine an absolute
 * timestamp (e.g. since the epoch) for each interval.
 */
class HistogramLogReader {
    constructor(logContent, bitBucketSize = 32, useWebAssembly = false) {
        this.lines = splitLines(logContent);
        this.currentLineIndex = 0;
        this.bitBucketSize = bitBucketSize;
        this.useWebAssembly = useWebAssembly;
    }
    /**
     * Read the next interval histogram from the log. Returns a Histogram object if
     * an interval line was found, or null if not.
     * <p>Upon encountering any unexpected format errors in reading the next interval
     * from the file, this method will return a null.
     * @return a DecodedInterval, or a null if no appropriate interval found
     */
    nextIntervalHistogram(rangeStartTimeSec = 0, rangeEndTimeSec = Number.MAX_VALUE) {
        while (this.currentLineIndex < this.lines.length) {
            const currentLine = this.lines[this.currentLineIndex];
            this.currentLineIndex++;
            if (currentLine.startsWith("#[StartTime:")) {
                this.parseStartTimeFromLine(currentLine);
            }
            else if (currentLine.startsWith("#[BaseTime:")) {
                this.parseBaseTimeFromLine(currentLine);
            }
            else if (currentLine.startsWith("#") ||
                currentLine.startsWith('"StartTimestamp"')) {
                // skip legend & meta data for now
            }
            else if (currentLine.includes(",")) {
                const tokens = currentLine.split(",");
                const [firstToken] = tokens;
                let tag;
                if (firstToken.startsWith(TAG_PREFIX)) {
                    tag = firstToken.substring(TAG_PREFIX_LENGTH);
                    tokens.shift();
                }
                else {
                    tag = Histogram_1.NO_TAG;
                }
                const [rawLogTimeStampInSec, rawIntervalLengthSec, , base64Histogram,] = tokens;
                const logTimeStampInSec = Number.parseFloat(rawLogTimeStampInSec);
                if (!this.baseTimeSec) {
                    // No explicit base time noted. Deduce from 1st observed time (compared to start time):
                    if (logTimeStampInSec < this.startTimeSec - 365 * 24 * 3600.0) {
                        // Criteria Note: if log timestamp is more than a year in the past (compared to
                        // StartTime), we assume that timestamps in the log are not absolute
                        this.baseTimeSec = this.startTimeSec;
                    }
                    else {
                        // Timestamps are absolute
                        this.baseTimeSec = 0.0;
                    }
                }
                if (rangeEndTimeSec < logTimeStampInSec) {
                    return null;
                }
                if (logTimeStampInSec < rangeStartTimeSec) {
                    continue;
                }
                const histogram = encoding_1.decodeFromCompressedBase64(base64Histogram, this.bitBucketSize, this.useWebAssembly);
                histogram.startTimeStampMsec =
                    (this.baseTimeSec + logTimeStampInSec) * 1000;
                const intervalLengthSec = Number.parseFloat(rawIntervalLengthSec);
                histogram.endTimeStampMsec =
                    (this.baseTimeSec + logTimeStampInSec + intervalLengthSec) * 1000;
                histogram.tag = tag;
                return histogram;
            }
        }
        return null;
    }
    parseStartTimeFromLine(line) {
        this.startTimeSec = Number.parseFloat(line.split(" ")[1]);
    }
    parseBaseTimeFromLine(line) {
        this.baseTimeSec = Number.parseFloat(line.split(" ")[1]);
    }
}
const splitLines = (logContent) => logContent.split(/\r\n|\r|\n/g);
const shouldIncludeNoTag = (lines) => lines.find((line) => !line.startsWith("#") &&
    !line.startsWith('"') &&
    !line.startsWith(TAG_PREFIX) &&
    line.includes(","));
exports.listTags = (content) => {
    const lines = splitLines(content);
    const tags = lines
        .filter((line) => line.includes(",") && line.startsWith(TAG_PREFIX))
        .map((line) => line.substring(TAG_PREFIX_LENGTH, line.indexOf(",")));
    const tagsWithoutDuplicates = new Set(tags);
    const result = Array.from(tagsWithoutDuplicates);
    if (shouldIncludeNoTag(lines)) {
        result.unshift("NO TAG");
    }
    return result;
};
exports["default"] = HistogramLogReader;
//# sourceMappingURL=HistogramLogReader.js.map

/***/ }),

/***/ 8747:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const Histogram_1 = __nccwpck_require__(8474);
const encoding_1 = __nccwpck_require__(6012);
const formatters_1 = __nccwpck_require__(4791);
const HISTOGRAM_LOG_FORMAT_VERSION = "1.3";
const timeFormatter = formatters_1.floatFormatter(5, 3);
class HistogramLogWriter {
    constructor(log) {
        this.log = log;
        /**
         * Base time to subtract from supplied histogram start/end timestamps when
         * logging based on histogram timestamps.
         * Base time is expected to be in msec since the epoch, as histogram start/end times
         * are typically stamped with absolute times in msec since the epoch.
         */
        this.baseTime = 0;
    }
    /**
     * Output an interval histogram, with the given timestamp information and the [optional] tag
     * associated with the histogram, using a configurable maxValueUnitRatio. (note that the
     * specified timestamp information will be used, and the timestamp information in the actual
     * histogram will be ignored).
     * The max value reported with the interval line will be scaled by the given maxValueUnitRatio.
     * @param startTimeStampSec The start timestamp to log with the interval histogram, in seconds.
     * @param endTimeStampSec The end timestamp to log with the interval histogram, in seconds.
     * @param histogram The interval histogram to log.
     * @param maxValueUnitRatio The ratio by which to divide the histogram's max value when reporting on it.
     */
    outputIntervalHistogram(histogram, startTimeStampSec = (histogram.startTimeStampMsec - this.baseTime) / 1000, endTimeStampSec = (histogram.endTimeStampMsec - this.baseTime) / 1000, maxValueUnitRatio = 1000) {
        const base64 = encoding_1.encodeIntoCompressedBase64(histogram);
        const start = timeFormatter(startTimeStampSec);
        const duration = timeFormatter(endTimeStampSec - startTimeStampSec);
        const max = timeFormatter(histogram.maxValue / maxValueUnitRatio);
        const lineContent = `${start},${duration},${max},${base64}\n`;
        if (histogram.tag && histogram.tag !== Histogram_1.NO_TAG) {
            this.log(`Tag=${histogram.tag},${lineContent}`);
        }
        else {
            this.log(lineContent);
        }
    }
    /**
     * Log a comment to the log.
     * Comments will be preceded with with the '#' character.
     * @param comment the comment string.
     */
    outputComment(comment) {
        this.log(`#${comment}\n`);
    }
    /**
     * Log a start time in the log.
     * @param startTimeMsec time (in milliseconds) since the absolute start time (the epoch)
     */
    outputStartTime(startTimeMsec) {
        this.outputComment(`[StartTime: ${formatters_1.floatFormatter(5, 3)(startTimeMsec / 1000)} (seconds since epoch), ${new Date(startTimeMsec)}]\n`);
    }
    /**
     * Output a legend line to the log.
     */
    outputLegend() {
        this.log('"StartTimestamp","Interval_Length","Interval_Max","Interval_Compressed_Histogram"\n');
    }
    /**
     * Output a log format version to the log.
     */
    outputLogFormatVersion() {
        this.outputComment("[Histogram log format version " + HISTOGRAM_LOG_FORMAT_VERSION + "]");
    }
}
exports["default"] = HistogramLogWriter;
//# sourceMappingURL=HistogramLogWriter.js.map

/***/ }),

/***/ 2678:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/*
 * This is a TypeScript port of the original Java version, which was written by
 * Gil Tene as described in
 * https://github.com/HdrHistogram/HdrHistogram
 * and released to the public domain, as explained at
 * http://creativecommons.org/publicdomain/zero/1.0/
 */
const TypedArrayHistogram_1 = __nccwpck_require__(3230);
class Int16Histogram extends TypedArrayHistogram_1.default {
    constructor(lowestDiscernibleValue, highestTrackableValue, numberOfSignificantValueDigits) {
        super(Uint16Array, lowestDiscernibleValue, highestTrackableValue, numberOfSignificantValueDigits);
    }
}
exports["default"] = Int16Histogram;
//# sourceMappingURL=Int16Histogram.js.map

/***/ }),

/***/ 528:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/*
 * This is a TypeScript port of the original Java version, which was written by
 * Gil Tene as described in
 * https://github.com/HdrHistogram/HdrHistogram
 * and released to the public domain, as explained at
 * http://creativecommons.org/publicdomain/zero/1.0/
 */
const TypedArrayHistogram_1 = __nccwpck_require__(3230);
class Int32Histogram extends TypedArrayHistogram_1.default {
    constructor(lowestDiscernibleValue, highestTrackableValue, numberOfSignificantValueDigits) {
        super(Uint32Array, lowestDiscernibleValue, highestTrackableValue, numberOfSignificantValueDigits);
    }
}
exports["default"] = Int32Histogram;
//# sourceMappingURL=Int32Histogram.js.map

/***/ }),

/***/ 9454:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/*
 * This is a TypeScript port of the original Java version, which was written by
 * Gil Tene as described in
 * https://github.com/HdrHistogram/HdrHistogram
 * and released to the public domain, as explained at
 * http://creativecommons.org/publicdomain/zero/1.0/
 */
const TypedArrayHistogram_1 = __nccwpck_require__(3230);
class Int8Histogram extends TypedArrayHistogram_1.default {
    constructor(lowestDiscernibleValue, highestTrackableValue, numberOfSignificantValueDigits) {
        super(Uint8Array, lowestDiscernibleValue, highestTrackableValue, numberOfSignificantValueDigits);
    }
}
exports["default"] = Int8Histogram;
//# sourceMappingURL=Int8Histogram.js.map

/***/ }),

/***/ 2894:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.doDecode = exports.decompress = exports.inflate = exports.deflate = void 0;
/*
 * This is a TypeScript port of the original Java version, which was written by
 * Gil Tene as described in
 * https://github.com/HdrHistogram/HdrHistogram
 * and released to the public domain, as explained at
 * http://creativecommons.org/publicdomain/zero/1.0/
 */
// @ts-ignore
const base64 = __nccwpck_require__(6463);
// @ts-ignore
const pako = __nccwpck_require__(1726);
const JsHistogram_1 = __nccwpck_require__(9190);
const ByteBuffer_1 = __nccwpck_require__(6535);
const JsHistogramFactory_1 = __nccwpck_require__(5675);
const ZigZagEncoding_1 = __nccwpck_require__(7495);
const { max } = Math;
const V2EncodingCookieBase = 0x1c849303;
const V2CompressedEncodingCookieBase = 0x1c849304;
const V2maxWordSizeInBytes = 9; // LEB128-64b9B + ZigZag require up to 9 bytes per word
const encodingCookie = V2EncodingCookieBase | 0x10; // LSBit of wordsize byte indicates TLZE Encoding
const compressedEncodingCookie = V2CompressedEncodingCookieBase | 0x10; // LSBit of wordsize byte indicates TLZE Encoding
function fillBufferFromCountsArray(self, buffer) {
    const countsLimit = self.countsArrayIndex(self.maxValue) + 1;
    let srcIndex = 0;
    while (srcIndex < countsLimit) {
        // V2 encoding format uses a ZigZag LEB128-64b9B encoded long. Positive values are counts,
        // while negative values indicate a repeat zero counts.
        const count = self.getCountAtIndex(srcIndex++);
        if (count < 0) {
            throw new Error("Cannot encode histogram containing negative counts (" +
                count +
                ") at index " +
                srcIndex +
                ", corresponding the value range [" +
                self.lowestEquivalentValue(self.valueFromIndex(srcIndex)) +
                "," +
                self.nextNonEquivalentValue(self.valueFromIndex(srcIndex)) +
                ")");
        }
        // Count trailing 0s (which follow this count):
        let zerosCount = 0;
        if (count == 0) {
            zerosCount = 1;
            while (srcIndex < countsLimit && self.getCountAtIndex(srcIndex) == 0) {
                zerosCount++;
                srcIndex++;
            }
        }
        if (zerosCount > 1) {
            ZigZagEncoding_1.default.encode(buffer, -zerosCount);
        }
        else {
            ZigZagEncoding_1.default.encode(buffer, count);
        }
    }
}
/**
 * Encode this histogram into a ByteBuffer
 * @param self this histogram
 * @param buffer The buffer to encode into
 * @return The number of bytes written to the buffer
 */
function encodeIntoByteBuffer(self, buffer) {
    const initialPosition = buffer.position;
    buffer.putInt32(encodingCookie);
    buffer.putInt32(0); // Placeholder for payload length in bytes.
    buffer.putInt32(1);
    buffer.putInt32(self.numberOfSignificantValueDigits);
    buffer.putInt64(self.lowestDiscernibleValue);
    buffer.putInt64(self.highestTrackableValue);
    buffer.putInt64(1);
    const payloadStartPosition = buffer.position;
    fillBufferFromCountsArray(self, buffer);
    const backupIndex = buffer.position;
    buffer.position = initialPosition + 4;
    buffer.putInt32(backupIndex - payloadStartPosition); // Record the payload length
    buffer.position = backupIndex;
    return backupIndex - initialPosition;
}
function fillCountsArrayFromSourceBuffer(self, sourceBuffer, lengthInBytes, wordSizeInBytes) {
    if (wordSizeInBytes != 2 &&
        wordSizeInBytes != 4 &&
        wordSizeInBytes != 8 &&
        wordSizeInBytes != V2maxWordSizeInBytes) {
        throw new Error("word size must be 2, 4, 8, or V2maxWordSizeInBytes (" +
            V2maxWordSizeInBytes +
            ") bytes");
    }
    let dstIndex = 0;
    const endPosition = sourceBuffer.position + lengthInBytes;
    while (sourceBuffer.position < endPosition) {
        let zerosCount = 0;
        let count = ZigZagEncoding_1.default.decode(sourceBuffer);
        if (count < 0) {
            zerosCount = -count;
            dstIndex += zerosCount; // No need to set zeros in array. Just skip them.
        }
        else {
            self.setCountAtIndex(dstIndex++, count);
        }
    }
    return dstIndex; // this is the destination length
}
function getCookieBase(cookie) {
    return cookie & ~0xf0;
}
function getWordSizeInBytesFromCookie(cookie) {
    if (getCookieBase(cookie) == V2EncodingCookieBase ||
        getCookieBase(cookie) == V2CompressedEncodingCookieBase) {
        return V2maxWordSizeInBytes;
    }
    const sizeByte = (cookie & 0xf0) >> 4;
    return sizeByte & 0xe;
}
function findDeflateFunction() {
    try {
        return eval('require("zlib").deflateSync');
    }
    catch (error) {
        return !!pako ? pako.deflate : () => { throw new Error('pako library is mandatory for encoding/deconding on the browser side'); };
    }
}
function findInflateFunction() {
    try {
        return eval('require("zlib").inflateSync');
    }
    catch (error) {
        return !!pako ? pako.inflate : () => { throw new Error('pako library is mandatory for encoding/deconding on the browser side'); };
    }
}
exports.deflate = findDeflateFunction();
exports.inflate = findInflateFunction();
function decompress(data) {
    const buffer = new ByteBuffer_1.default(data);
    const initialTargetPosition = buffer.position;
    const cookie = buffer.getInt32();
    if ((cookie & ~0xf0) !== V2CompressedEncodingCookieBase) {
        throw new Error("Encoding not supported, only V2 is supported");
    }
    const lengthOfCompressedContents = buffer.getInt32();
    const uncompressedBuffer = exports.inflate(buffer.data.slice(initialTargetPosition + 8, initialTargetPosition + 8 + lengthOfCompressedContents));
    return uncompressedBuffer;
}
exports.decompress = decompress;
function doDecode(data, bitBucketSize = 32, minBarForHighestTrackableValue = 0) {
    const buffer = new ByteBuffer_1.default(data);
    const cookie = buffer.getInt32();
    let payloadLengthInBytes;
    let numberOfSignificantValueDigits;
    let lowestTrackableUnitValue;
    let highestTrackableValue;
    if (getCookieBase(cookie) === V2EncodingCookieBase) {
        if (getWordSizeInBytesFromCookie(cookie) != V2maxWordSizeInBytes) {
            throw new Error("The buffer does not contain a Histogram (no valid cookie found)");
        }
        payloadLengthInBytes = buffer.getInt32();
        buffer.getInt32(); // normalizingIndexOffset not used
        numberOfSignificantValueDigits = buffer.getInt32();
        lowestTrackableUnitValue = buffer.getInt64();
        highestTrackableValue = buffer.getInt64();
        buffer.getInt64(); // integerToDoubleValueConversionRatio not used
    }
    else {
        throw new Error("The buffer does not contain a Histogram (no valid V2 encoding cookie found)");
    }
    highestTrackableValue = max(highestTrackableValue, minBarForHighestTrackableValue);
    const histogramConstr = JsHistogramFactory_1.constructorFromBucketSize(bitBucketSize);
    const histogram = new histogramConstr(lowestTrackableUnitValue, highestTrackableValue, numberOfSignificantValueDigits);
    const filledLength = fillCountsArrayFromSourceBuffer(histogram, buffer, payloadLengthInBytes, V2maxWordSizeInBytes);
    histogram.establishInternalTackingValues(filledLength);
    return histogram;
}
exports.doDecode = doDecode;
function doEncodeIntoCompressedBase64(compressionLevel) {
    const compressionOptions = compressionLevel
        ? { level: compressionLevel }
        : {};
    const self = this;
    const targetBuffer = ByteBuffer_1.default.allocate();
    targetBuffer.putInt32(compressedEncodingCookie);
    const intermediateUncompressedByteBuffer = ByteBuffer_1.default.allocate();
    const uncompressedLength = encodeIntoByteBuffer(self, intermediateUncompressedByteBuffer);
    const data = intermediateUncompressedByteBuffer.data.slice(0, uncompressedLength);
    const compressedData = exports.deflate(data, compressionOptions);
    targetBuffer.putInt32(compressedData.byteLength);
    targetBuffer.putArray(compressedData);
    return base64.fromByteArray(targetBuffer.data);
}
JsHistogram_1.JsHistogram.decode = doDecode;
JsHistogram_1.JsHistogram.prototype.encodeIntoCompressedBase64 = doEncodeIntoCompressedBase64;
//# sourceMappingURL=JsHistogram.encoding.js.map

/***/ }),

/***/ 9190:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = exports.JsHistogram = void 0;
/*
 * This is a TypeScript port of the original Java version, which was written by
 * Gil Tene as described in
 * https://github.com/HdrHistogram/HdrHistogram
 * and released to the public domain, as explained at
 * http://creativecommons.org/publicdomain/zero/1.0/
 */
const RecordedValuesIterator_1 = __nccwpck_require__(6631);
const PercentileIterator_1 = __nccwpck_require__(8516);
const formatters_1 = __nccwpck_require__(4791);
const ulp_1 = __nccwpck_require__(5127);
const Histogram_1 = __nccwpck_require__(8474);
const { pow, floor, ceil, log2, max, min } = Math;
class JsHistogram {
    constructor(lowestDiscernibleValue, highestTrackableValue, numberOfSignificantValueDigits) {
        this.autoResize = false;
        this.startTimeStampMsec = Number.MAX_SAFE_INTEGER;
        this.endTimeStampMsec = 0;
        this.tag = Histogram_1.NO_TAG;
        this.maxValue = 0;
        this.minNonZeroValue = Number.MAX_SAFE_INTEGER;
        this.identity = 0;
        this.highestTrackableValue = 0;
        this.lowestDiscernibleValue = 0;
        this.numberOfSignificantValueDigits = 0;
        this.bucketCount = 0;
        this.subBucketCount = 0;
        this.countsArrayLength = 0;
        this.wordSizeInBytes = 0;
        // Verify argument validity
        if (lowestDiscernibleValue < 1) {
            throw new Error("lowestDiscernibleValue must be >= 1");
        }
        if (highestTrackableValue < 2 * lowestDiscernibleValue) {
            throw new Error(`highestTrackableValue must be >= 2 * lowestDiscernibleValue ( 2 * ${lowestDiscernibleValue} )`);
        }
        if (numberOfSignificantValueDigits < 0 ||
            numberOfSignificantValueDigits > 5) {
            throw new Error("numberOfSignificantValueDigits must be between 0 and 5");
        }
        this.identity = JsHistogram.identityBuilder++;
        this.init(lowestDiscernibleValue, highestTrackableValue, numberOfSignificantValueDigits);
    }
    incrementTotalCount() {
        this._totalCount++;
    }
    addToTotalCount(value) {
        this._totalCount += value;
    }
    setTotalCount(value) {
        this._totalCount = value;
    }
    /**
     * Get the total count of all recorded values in the histogram
     * @return the total count of all recorded values in the histogram
     */
    get totalCount() {
        return this._totalCount;
    }
    updatedMaxValue(value) {
        const internalValue = value + this.unitMagnitudeMask;
        this.maxValue = internalValue;
    }
    updateMinNonZeroValue(value) {
        if (value <= this.unitMagnitudeMask) {
            return;
        }
        const internalValue = floor(value / this.lowestDiscernibleValueRounded) *
            this.lowestDiscernibleValueRounded;
        this.minNonZeroValue = internalValue;
    }
    init(lowestDiscernibleValue, highestTrackableValue, numberOfSignificantValueDigits) {
        this.lowestDiscernibleValue = lowestDiscernibleValue;
        this.highestTrackableValue = highestTrackableValue;
        this.numberOfSignificantValueDigits = numberOfSignificantValueDigits;
        /*
         * Given a 3 decimal point accuracy, the expectation is obviously for "+/- 1 unit at 1000". It also means that
         * it's "ok to be +/- 2 units at 2000". The "tricky" thing is that it is NOT ok to be +/- 2 units at 1999. Only
         * starting at 2000. So internally, we need to maintain single unit resolution to 2x 10^decimalPoints.
         */
        const largestValueWithSingleUnitResolution = 2 * floor(pow(10, numberOfSignificantValueDigits));
        this.unitMagnitude = floor(log2(lowestDiscernibleValue));
        this.lowestDiscernibleValueRounded = pow(2, this.unitMagnitude);
        this.unitMagnitudeMask = this.lowestDiscernibleValueRounded - 1;
        // We need to maintain power-of-two subBucketCount (for clean direct indexing) that is large enough to
        // provide unit resolution to at least largestValueWithSingleUnitResolution. So figure out
        // largestValueWithSingleUnitResolution's nearest power-of-two (rounded up), and use that:
        const subBucketCountMagnitude = ceil(log2(largestValueWithSingleUnitResolution));
        this.subBucketHalfCountMagnitude =
            (subBucketCountMagnitude > 1 ? subBucketCountMagnitude : 1) - 1;
        this.subBucketCount = pow(2, this.subBucketHalfCountMagnitude + 1);
        this.subBucketHalfCount = this.subBucketCount / 2;
        this.subBucketMask =
            (floor(this.subBucketCount) - 1) * pow(2, this.unitMagnitude);
        this.establishSize(highestTrackableValue);
        this.leadingZeroCountBase =
            53 - this.unitMagnitude - this.subBucketHalfCountMagnitude - 1;
        this.percentileIterator = new PercentileIterator_1.default(this, 1);
        this.recordedValuesIterator = new RecordedValuesIterator_1.default(this);
    }
    /**
     * The buckets (each of which has subBucketCount sub-buckets, here assumed to be 2048 as an example) overlap:
     *
     * <pre>
     * The 0'th bucket covers from 0...2047 in multiples of 1, using all 2048 sub-buckets
     * The 1'th bucket covers from 2048..4097 in multiples of 2, using only the top 1024 sub-buckets
     * The 2'th bucket covers from 4096..8191 in multiple of 4, using only the top 1024 sub-buckets
     * ...
     * </pre>
     *
     * Bucket 0 is "special" here. It is the only one that has 2048 entries. All the rest have 1024 entries (because
     * their bottom half overlaps with and is already covered by the all of the previous buckets put together). In other
     * words, the k'th bucket could represent 0 * 2^k to 2048 * 2^k in 2048 buckets with 2^k precision, but the midpoint
     * of 1024 * 2^k = 2048 * 2^(k-1) = the k-1'th bucket's end, so we would use the previous bucket for those lower
     * values as it has better precision.
     */
    establishSize(newHighestTrackableValue) {
        // establish counts array length:
        this.countsArrayLength = this.determineArrayLengthNeeded(newHighestTrackableValue);
        // establish exponent range needed to support the trackable value with no overflow:
        this.bucketCount = this.getBucketsNeededToCoverValue(newHighestTrackableValue);
        // establish the new highest trackable value:
        this.highestTrackableValue = newHighestTrackableValue;
    }
    determineArrayLengthNeeded(highestTrackableValue) {
        if (highestTrackableValue < 2 * this.lowestDiscernibleValue) {
            throw new Error("highestTrackableValue (" +
                highestTrackableValue +
                ") cannot be < (2 * lowestDiscernibleValue)");
        }
        //determine counts array length needed:
        const countsArrayLength = this.getLengthForNumberOfBuckets(this.getBucketsNeededToCoverValue(highestTrackableValue));
        return countsArrayLength;
    }
    /**
     * If we have N such that subBucketCount * 2^N > max value, we need storage for N+1 buckets, each with enough
     * slots to hold the top half of the subBucketCount (the lower half is covered by previous buckets), and the +1
     * being used for the lower half of the 0'th bucket. Or, equivalently, we need 1 more bucket to capture the max
     * value if we consider the sub-bucket length to be halved.
     */
    getLengthForNumberOfBuckets(numberOfBuckets) {
        const lengthNeeded = (numberOfBuckets + 1) * (this.subBucketCount / 2);
        return lengthNeeded;
    }
    getBucketsNeededToCoverValue(value) {
        // the k'th bucket can express from 0 * 2^k to subBucketCount * 2^k in units of 2^k
        let smallestUntrackableValue = this.subBucketCount * pow(2, this.unitMagnitude);
        // always have at least 1 bucket
        let bucketsNeeded = 1;
        while (smallestUntrackableValue <= value) {
            if (smallestUntrackableValue > Number.MAX_SAFE_INTEGER / 2) {
                // TODO check array max size in JavaScript
                // next shift will overflow, meaning that bucket could represent values up to ones greater than
                // Number.MAX_SAFE_INTEGER, so it's the last bucket
                return bucketsNeeded + 1;
            }
            smallestUntrackableValue = smallestUntrackableValue * 2;
            bucketsNeeded++;
        }
        return bucketsNeeded;
    }
    /**
     * Record a value in the histogram
     *
     * @param value The value to be recorded
     * @throws may throw Error if value is exceeds highestTrackableValue
     */
    recordValue(value) {
        this.recordSingleValue(value);
    }
    recordSingleValue(value) {
        const countsIndex = this.countsArrayIndex(value);
        if (countsIndex >= this.countsArrayLength) {
            this.handleRecordException(1, value);
        }
        else {
            this.incrementCountAtIndex(countsIndex);
        }
        this.updateMinAndMax(value);
        this.incrementTotalCount();
    }
    handleRecordException(count, value) {
        if (!this.autoResize) {
            throw new Error("Value " + value + " is outside of histogram covered range");
        }
        this.resize(value);
        var countsIndex = this.countsArrayIndex(value);
        this.addToCountAtIndex(countsIndex, count);
        this.highestTrackableValue = this.highestEquivalentValue(this.valueFromIndex(this.countsArrayLength - 1));
    }
    countsArrayIndex(value) {
        if (value < 0) {
            throw new Error("Histogram recorded value cannot be negative.");
        }
        const bucketIndex = this.getBucketIndex(value);
        const subBucketIndex = this.getSubBucketIndex(value, bucketIndex);
        return this.computeCountsArrayIndex(bucketIndex, subBucketIndex);
    }
    computeCountsArrayIndex(bucketIndex, subBucketIndex) {
        // TODO
        //assert(subBucketIndex < subBucketCount);
        //assert(bucketIndex == 0 || (subBucketIndex >= subBucketHalfCount));
        // Calculate the index for the first entry that will be used in the bucket (halfway through subBucketCount).
        // For bucketIndex 0, all subBucketCount entries may be used, but bucketBaseIndex is still set in the middle.
        const bucketBaseIndex = (bucketIndex + 1) * pow(2, this.subBucketHalfCountMagnitude);
        // Calculate the offset in the bucket. This subtraction will result in a positive value in all buckets except
        // the 0th bucket (since a value in that bucket may be less than half the bucket's 0 to subBucketCount range).
        // However, this works out since we give bucket 0 twice as much space.
        const offsetInBucket = subBucketIndex - this.subBucketHalfCount;
        // The following is the equivalent of ((subBucketIndex  - subBucketHalfCount) + bucketBaseIndex;
        return bucketBaseIndex + offsetInBucket;
    }
    /**
     * @return the lowest (and therefore highest precision) bucket index that can represent the value
     */
    getBucketIndex(value) {
        // Calculates the number of powers of two by which the value is greater than the biggest value that fits in
        // bucket 0. This is the bucket index since each successive bucket can hold a value 2x greater.
        // The mask maps small values to bucket 0.
        // return this.leadingZeroCountBase - Long.numberOfLeadingZeros(value | subBucketMask);
        return max(floor(log2(value)) -
            this.subBucketHalfCountMagnitude -
            this.unitMagnitude, 0);
    }
    getSubBucketIndex(value, bucketIndex) {
        // For bucketIndex 0, this is just value, so it may be anywhere in 0 to subBucketCount.
        // For other bucketIndex, this will always end up in the top half of subBucketCount: assume that for some bucket
        // k > 0, this calculation will yield a value in the bottom half of 0 to subBucketCount. Then, because of how
        // buckets overlap, it would have also been in the top half of bucket k-1, and therefore would have
        // returned k-1 in getBucketIndex(). Since we would then shift it one fewer bits here, it would be twice as big,
        // and therefore in the top half of subBucketCount.
        return floor(value / pow(2, bucketIndex + this.unitMagnitude));
    }
    updateMinAndMax(value) {
        if (value > this.maxValue) {
            this.updatedMaxValue(value);
        }
        if (value < this.minNonZeroValue && value !== 0) {
            this.updateMinNonZeroValue(value);
        }
    }
    /**
     * Get the value at a given percentile.
     * When the given percentile is &gt; 0.0, the value returned is the value that the given
     * percentage of the overall recorded value entries in the histogram are either smaller than
     * or equivalent to. When the given percentile is 0.0, the value returned is the value that all value
     * entries in the histogram are either larger than or equivalent to.
     * <p>
     * Note that two values are "equivalent" in this statement if
     * {@link org.HdrHistogram.JsHistogram#valuesAreEquivalent} would return true.
     *
     * @param percentile  The percentile for which to return the associated value
     * @return The value that the given percentage of the overall recorded value entries in the
     * histogram are either smaller than or equivalent to. When the percentile is 0.0, returns the
     * value that all value entries in the histogram are either larger than or equivalent to.
     */
    getValueAtPercentile(percentile) {
        const requestedPercentile = min(percentile, 100); // Truncate down to 100%
        // round count up to nearest integer, to ensure that the largest value that the requested percentile
        // of overall recorded values is actually included. However, this must be done with care:
        //
        // First, Compute fp value for count at the requested percentile. Note that fp result end up
        // being 1 ulp larger than the correct integer count for this percentile:
        const fpCountAtPercentile = (requestedPercentile / 100.0) * this.totalCount;
        // Next, round up, but make sure to prevent <= 1 ulp inaccurancies in the above fp math from
        // making us skip a count:
        const countAtPercentile = max(ceil(fpCountAtPercentile - ulp_1.default(fpCountAtPercentile)), // round up
        1 // Make sure we at least reach the first recorded entry
        );
        let totalToCurrentIndex = 0;
        for (let i = 0; i < this.countsArrayLength; i++) {
            totalToCurrentIndex += this.getCountAtIndex(i);
            if (totalToCurrentIndex >= countAtPercentile) {
                var valueAtIndex = this.valueFromIndex(i);
                return percentile === 0.0
                    ? this.lowestEquivalentValue(valueAtIndex)
                    : this.highestEquivalentValue(valueAtIndex);
            }
        }
        return 0;
    }
    valueFromIndexes(bucketIndex, subBucketIndex) {
        return subBucketIndex * pow(2, bucketIndex + this.unitMagnitude);
    }
    valueFromIndex(index) {
        let bucketIndex = floor(index / this.subBucketHalfCount) - 1;
        let subBucketIndex = (index % this.subBucketHalfCount) + this.subBucketHalfCount;
        if (bucketIndex < 0) {
            subBucketIndex -= this.subBucketHalfCount;
            bucketIndex = 0;
        }
        return this.valueFromIndexes(bucketIndex, subBucketIndex);
    }
    /**
     * Get the lowest value that is equivalent to the given value within the histogram's resolution.
     * Where "equivalent" means that value samples recorded for any two
     * equivalent values are counted in a common total count.
     *
     * @param value The given value
     * @return The lowest value that is equivalent to the given value within the histogram's resolution.
     */
    lowestEquivalentValue(value) {
        const bucketIndex = this.getBucketIndex(value);
        const subBucketIndex = this.getSubBucketIndex(value, bucketIndex);
        const thisValueBaseLevel = this.valueFromIndexes(bucketIndex, subBucketIndex);
        return thisValueBaseLevel;
    }
    /**
     * Get the highest value that is equivalent to the given value within the histogram's resolution.
     * Where "equivalent" means that value samples recorded for any two
     * equivalent values are counted in a common total count.
     *
     * @param value The given value
     * @return The highest value that is equivalent to the given value within the histogram's resolution.
     */
    highestEquivalentValue(value) {
        return this.nextNonEquivalentValue(value) - 1;
    }
    /**
     * Get the next value that is not equivalent to the given value within the histogram's resolution.
     * Where "equivalent" means that value samples recorded for any two
     * equivalent values are counted in a common total count.
     *
     * @param value The given value
     * @return The next value that is not equivalent to the given value within the histogram's resolution.
     */
    nextNonEquivalentValue(value) {
        return (this.lowestEquivalentValue(value) + this.sizeOfEquivalentValueRange(value));
    }
    /**
     * Get the size (in value units) of the range of values that are equivalent to the given value within the
     * histogram's resolution. Where "equivalent" means that value samples recorded for any two
     * equivalent values are counted in a common total count.
     *
     * @param value The given value
     * @return The size of the range of values equivalent to the given value.
     */
    sizeOfEquivalentValueRange(value) {
        const bucketIndex = this.getBucketIndex(value);
        const subBucketIndex = this.getSubBucketIndex(value, bucketIndex);
        const distanceToNextValue = pow(2, this.unitMagnitude +
            (subBucketIndex >= this.subBucketCount ? bucketIndex + 1 : bucketIndex));
        return distanceToNextValue;
    }
    /**
     * Get a value that lies in the middle (rounded up) of the range of values equivalent the given value.
     * Where "equivalent" means that value samples recorded for any two
     * equivalent values are counted in a common total count.
     *
     * @param value The given value
     * @return The value lies in the middle (rounded up) of the range of values equivalent the given value.
     */
    medianEquivalentValue(value) {
        return (this.lowestEquivalentValue(value) +
            floor(this.sizeOfEquivalentValueRange(value) / 2));
    }
    /**
     * Get the computed mean value of all recorded values in the histogram
     *
     * @return the mean value (in value units) of the histogram data
     */
    get mean() {
        if (this.totalCount === 0) {
            return 0;
        }
        this.recordedValuesIterator.reset();
        let totalValue = 0;
        while (this.recordedValuesIterator.hasNext()) {
            const iterationValue = this.recordedValuesIterator.next();
            totalValue +=
                this.medianEquivalentValue(iterationValue.valueIteratedTo) *
                    iterationValue.countAtValueIteratedTo;
        }
        return totalValue / this.totalCount;
    }
    getStdDeviation(mean = this.mean) {
        if (this.totalCount === 0) {
            return 0;
        }
        let geometric_deviation_total = 0.0;
        this.recordedValuesIterator.reset();
        while (this.recordedValuesIterator.hasNext()) {
            const iterationValue = this.recordedValuesIterator.next();
            const deviation = this.medianEquivalentValue(iterationValue.valueIteratedTo) - mean;
            geometric_deviation_total +=
                deviation * deviation * iterationValue.countAddedInThisIterationStep;
        }
        const std_deviation = Math.sqrt(geometric_deviation_total / this.totalCount);
        return std_deviation;
    }
    /**
     * Get the computed standard deviation of all recorded values in the histogram
     *
     * @return the standard deviation (in value units) of the histogram data
     */
    get stdDeviation() {
        if (this.totalCount === 0) {
            return 0;
        }
        const mean = this.mean;
        let geometric_deviation_total = 0.0;
        this.recordedValuesIterator.reset();
        while (this.recordedValuesIterator.hasNext()) {
            const iterationValue = this.recordedValuesIterator.next();
            const deviation = this.medianEquivalentValue(iterationValue.valueIteratedTo) - mean;
            geometric_deviation_total +=
                deviation * deviation * iterationValue.countAddedInThisIterationStep;
        }
        const std_deviation = Math.sqrt(geometric_deviation_total / this.totalCount);
        return std_deviation;
    }
    /**
     * Produce textual representation of the value distribution of histogram data by percentile. The distribution is
     * output with exponentially increasing resolution, with each exponentially decreasing half-distance containing
     * <i>dumpTicksPerHalf</i> percentile reporting tick points.
     *
     * @param printStream    Stream into which the distribution will be output
     * <p>
     * @param percentileTicksPerHalfDistance  The number of reporting points per exponentially decreasing half-distance
     * <p>
     * @param outputValueUnitScalingRatio    The scaling factor by which to divide histogram recorded values units in
     *                                     output
     * @param useCsvFormat  Output in CSV format if true. Otherwise use plain text form.
     */
    outputPercentileDistribution(percentileTicksPerHalfDistance = 5, outputValueUnitScalingRatio = 1, useCsvFormat = false) {
        let result = "";
        if (useCsvFormat) {
            result += '"Value","Percentile","TotalCount","1/(1-Percentile)"\n';
        }
        else {
            result += "       Value     Percentile TotalCount 1/(1-Percentile)\n\n";
        }
        const iterator = this.percentileIterator;
        iterator.reset(percentileTicksPerHalfDistance);
        let lineFormatter;
        let lastLineFormatter;
        if (useCsvFormat) {
            const valueFormatter = formatters_1.floatFormatter(0, this.numberOfSignificantValueDigits);
            const percentileFormatter = formatters_1.floatFormatter(0, 12);
            const lastFormatter = formatters_1.floatFormatter(0, 2);
            lineFormatter = (iterationValue) => valueFormatter(iterationValue.valueIteratedTo / outputValueUnitScalingRatio) +
                "," +
                percentileFormatter(iterationValue.percentileLevelIteratedTo / 100) +
                "," +
                iterationValue.totalCountToThisValue +
                "," +
                lastFormatter(1 / (1 - iterationValue.percentileLevelIteratedTo / 100)) +
                "\n";
            lastLineFormatter = (iterationValue) => valueFormatter(iterationValue.valueIteratedTo / outputValueUnitScalingRatio) +
                "," +
                percentileFormatter(iterationValue.percentileLevelIteratedTo / 100) +
                "," +
                iterationValue.totalCountToThisValue +
                ",Infinity\n";
        }
        else {
            const valueFormatter = formatters_1.floatFormatter(12, this.numberOfSignificantValueDigits);
            const percentileFormatter = formatters_1.floatFormatter(2, 12);
            const totalCountFormatter = formatters_1.integerFormatter(10);
            const lastFormatter = formatters_1.floatFormatter(14, 2);
            lineFormatter = (iterationValue) => valueFormatter(iterationValue.valueIteratedTo / outputValueUnitScalingRatio) +
                " " +
                percentileFormatter(iterationValue.percentileLevelIteratedTo / 100) +
                " " +
                totalCountFormatter(iterationValue.totalCountToThisValue) +
                " " +
                lastFormatter(1 / (1 - iterationValue.percentileLevelIteratedTo / 100)) +
                "\n";
            lastLineFormatter = (iterationValue) => valueFormatter(iterationValue.valueIteratedTo / outputValueUnitScalingRatio) +
                " " +
                percentileFormatter(iterationValue.percentileLevelIteratedTo / 100) +
                " " +
                totalCountFormatter(iterationValue.totalCountToThisValue) +
                "\n";
        }
        while (iterator.hasNext()) {
            const iterationValue = iterator.next();
            if (iterationValue.percentileLevelIteratedTo < 100) {
                result += lineFormatter(iterationValue);
            }
            else {
                result += lastLineFormatter(iterationValue);
            }
        }
        if (!useCsvFormat) {
            // Calculate and output mean and std. deviation.
            // Note: mean/std. deviation numbers are very often completely irrelevant when
            // data is extremely non-normal in distribution (e.g. in cases of strong multi-modal
            // response time distribution associated with GC pauses). However, reporting these numbers
            // can be very useful for contrasting with the detailed percentile distribution
            // reported by outputPercentileDistribution(). It is not at all surprising to find
            // percentile distributions where results fall many tens or even hundreds of standard
            // deviations away from the mean - such results simply indicate that the data sampled
            // exhibits a very non-normal distribution, highlighting situations for which the std.
            // deviation metric is a useless indicator.
            //
            const formatter = formatters_1.floatFormatter(12, this.numberOfSignificantValueDigits);
            const _mean = this.mean;
            const mean = formatter(_mean / outputValueUnitScalingRatio);
            const std_deviation = formatter(this.getStdDeviation(_mean) / outputValueUnitScalingRatio);
            const max = formatter(this.maxValue / outputValueUnitScalingRatio);
            const intFormatter = formatters_1.integerFormatter(12);
            const totalCount = intFormatter(this.totalCount);
            const bucketCount = intFormatter(this.bucketCount);
            const subBucketCount = intFormatter(this.subBucketCount);
            result += `#[Mean    = ${mean}, StdDeviation   = ${std_deviation}]
#[Max     = ${max}, Total count    = ${totalCount}]
#[Buckets = ${bucketCount}, SubBuckets     = ${subBucketCount}]
`;
        }
        return result;
    }
    get summary() {
        return Histogram_1.toSummary(this);
    }
    toJSON() {
        return this.summary;
    }
    inspect() {
        return this.toString();
    }
    [Symbol.for("nodejs.util.inspect.custom")]() {
        return this.toString();
    }
    /**
     * Provide a (conservatively high) estimate of the Histogram's total footprint in bytes
     *
     * @return a (conservatively high) estimate of the Histogram's total footprint in bytes
     */
    get estimatedFootprintInBytes() {
        return this._getEstimatedFootprintInBytes();
    }
    recordSingleValueWithExpectedInterval(value, expectedIntervalBetweenValueSamples) {
        this.recordSingleValue(value);
        if (expectedIntervalBetweenValueSamples <= 0) {
            return;
        }
        for (let missingValue = value - expectedIntervalBetweenValueSamples; missingValue >= expectedIntervalBetweenValueSamples; missingValue -= expectedIntervalBetweenValueSamples) {
            this.recordSingleValue(missingValue);
        }
    }
    recordCountAtValue(count, value) {
        const countsIndex = this.countsArrayIndex(value);
        if (countsIndex >= this.countsArrayLength) {
            this.handleRecordException(count, value);
        }
        else {
            this.addToCountAtIndex(countsIndex, count);
        }
        this.updateMinAndMax(value);
        this.addToTotalCount(count);
    }
    /**
     * Record a value in the histogram (adding to the value's current count)
     *
     * @param value The value to be recorded
     * @param count The number of occurrences of this value to record
     * @throws ArrayIndexOutOfBoundsException (may throw) if value is exceeds highestTrackableValue
     */
    recordValueWithCount(value, count) {
        this.recordCountAtValue(count, value);
    }
    /**
     * Record a value in the histogram.
     * <p>
     * To compensate for the loss of sampled values when a recorded value is larger than the expected
     * interval between value samples, Histogram will auto-generate an additional series of decreasingly-smaller
     * (down to the expectedIntervalBetweenValueSamples) value records.
     * <p>
     * Note: This is a at-recording correction method, as opposed to the post-recording correction method provided
     * by {@link #copyCorrectedForCoordinatedOmission(long)}.
     * The two methods are mutually exclusive, and only one of the two should be be used on a given data set to correct
     * for the same coordinated omission issue.
     * <p>
     * See notes in the description of the Histogram calls for an illustration of why this corrective behavior is
     * important.
     *
     * @param value The value to record
     * @param expectedIntervalBetweenValueSamples If expectedIntervalBetweenValueSamples is larger than 0, add
     *                                           auto-generated value records as appropriate if value is larger
     *                                           than expectedIntervalBetweenValueSamples
     * @throws ArrayIndexOutOfBoundsException (may throw) if value is exceeds highestTrackableValue
     */
    recordValueWithExpectedInterval(value, expectedIntervalBetweenValueSamples) {
        this.recordSingleValueWithExpectedInterval(value, expectedIntervalBetweenValueSamples);
    }
    recordValueWithCountAndExpectedInterval(value, count, expectedIntervalBetweenValueSamples) {
        this.recordCountAtValue(count, value);
        if (expectedIntervalBetweenValueSamples <= 0) {
            return;
        }
        for (let missingValue = value - expectedIntervalBetweenValueSamples; missingValue >= expectedIntervalBetweenValueSamples; missingValue -= expectedIntervalBetweenValueSamples) {
            this.recordCountAtValue(count, missingValue);
        }
    }
    /**
     * Add the contents of another histogram to this one, while correcting the incoming data for coordinated omission.
     * <p>
     * To compensate for the loss of sampled values when a recorded value is larger than the expected
     * interval between value samples, the values added will include an auto-generated additional series of
     * decreasingly-smaller (down to the expectedIntervalBetweenValueSamples) value records for each count found
     * in the current histogram that is larger than the expectedIntervalBetweenValueSamples.
     *
     * Note: This is a post-recording correction method, as opposed to the at-recording correction method provided
     * by {@link #recordValueWithExpectedInterval(long, long) recordValueWithExpectedInterval}. The two
     * methods are mutually exclusive, and only one of the two should be be used on a given data set to correct
     * for the same coordinated omission issue.
     * by
     * <p>
     * See notes in the description of the Histogram calls for an illustration of why this corrective behavior is
     * important.
     *
     * @param otherHistogram The other histogram. highestTrackableValue and largestValueWithSingleUnitResolution must match.
     * @param expectedIntervalBetweenValueSamples If expectedIntervalBetweenValueSamples is larger than 0, add
     *                                           auto-generated value records as appropriate if value is larger
     *                                           than expectedIntervalBetweenValueSamples
     * @throws ArrayIndexOutOfBoundsException (may throw) if values exceed highestTrackableValue
     */
    addWhileCorrectingForCoordinatedOmission(otherHistogram, expectedIntervalBetweenValueSamples) {
        const toHistogram = this;
        const otherValues = new RecordedValuesIterator_1.default(otherHistogram);
        while (otherValues.hasNext()) {
            const v = otherValues.next();
            toHistogram.recordValueWithCountAndExpectedInterval(v.valueIteratedTo, v.countAtValueIteratedTo, expectedIntervalBetweenValueSamples);
        }
    }
    /**
     * Add the contents of another histogram to this one.
     * <p>
     * As part of adding the contents, the start/end timestamp range of this histogram will be
     * extended to include the start/end timestamp range of the other histogram.
     *
     * @param otherHistogram The other histogram.
     * @throws (may throw) if values in fromHistogram's are
     * higher than highestTrackableValue.
     */
    add(otherHistogram) {
        if (!(otherHistogram instanceof JsHistogram)) {
            // should be impossible to be in this situation but actually
            // TypeScript has some flaws...
            throw new Error("Cannot add a WASM histogram to a regular JS histogram");
        }
        const highestRecordableValue = this.highestEquivalentValue(this.valueFromIndex(this.countsArrayLength - 1));
        if (highestRecordableValue < otherHistogram.maxValue) {
            if (!this.autoResize) {
                throw new Error("The other histogram includes values that do not fit in this histogram's range.");
            }
            this.resize(otherHistogram.maxValue);
        }
        if (this.bucketCount === otherHistogram.bucketCount &&
            this.subBucketCount === otherHistogram.subBucketCount &&
            this.unitMagnitude === otherHistogram.unitMagnitude) {
            // Counts arrays are of the same length and meaning, so we can just iterate and add directly:
            let observedOtherTotalCount = 0;
            for (let i = 0; i < otherHistogram.countsArrayLength; i++) {
                const otherCount = otherHistogram.getCountAtIndex(i);
                if (otherCount > 0) {
                    this.addToCountAtIndex(i, otherCount);
                    observedOtherTotalCount += otherCount;
                }
            }
            this.setTotalCount(this.totalCount + observedOtherTotalCount);
            this.updatedMaxValue(max(this.maxValue, otherHistogram.maxValue));
            this.updateMinNonZeroValue(min(this.minNonZeroValue, otherHistogram.minNonZeroValue));
        }
        else {
            // Arrays are not a direct match (or the other could change on the fly in some valid way),
            // so we can't just stream through and add them. Instead, go through the array and add each
            // non-zero value found at it's proper value:
            // Do max value first, to avoid max value updates on each iteration:
            const otherMaxIndex = otherHistogram.countsArrayIndex(otherHistogram.maxValue);
            let otherCount = otherHistogram.getCountAtIndex(otherMaxIndex);
            this.recordCountAtValue(otherCount, otherHistogram.valueFromIndex(otherMaxIndex));
            // Record the remaining values, up to but not including the max value:
            for (let i = 0; i < otherMaxIndex; i++) {
                otherCount = otherHistogram.getCountAtIndex(i);
                if (otherCount > 0) {
                    this.recordCountAtValue(otherCount, otherHistogram.valueFromIndex(i));
                }
            }
        }
        this.startTimeStampMsec = min(this.startTimeStampMsec, otherHistogram.startTimeStampMsec);
        this.endTimeStampMsec = max(this.endTimeStampMsec, otherHistogram.endTimeStampMsec);
    }
    /**
     * Get the count of recorded values at a specific value (to within the histogram resolution at the value level).
     *
     * @param value The value for which to provide the recorded count
     * @return The total count of values recorded in the histogram within the value range that is
     * {@literal >=} lowestEquivalentValue(<i>value</i>) and {@literal <=} highestEquivalentValue(<i>value</i>)
     */
    getCountAtValue(value) {
        const index = min(max(0, this.countsArrayIndex(value)), this.countsArrayLength - 1);
        return this.getCountAtIndex(index);
    }
    /**
     * Subtract the contents of another histogram from this one.
     * <p>
     * The start/end timestamps of this histogram will remain unchanged.
     *
     * @param otherHistogram The other histogram.
     * @throws ArrayIndexOutOfBoundsException (may throw) if values in otherHistogram's are higher than highestTrackableValue.
     *
     */
    subtract(otherHistogram) {
        const highestRecordableValue = this.valueFromIndex(this.countsArrayLength - 1);
        if (!(otherHistogram instanceof JsHistogram)) {
            // should be impossible to be in this situation but actually
            // TypeScript has some flaws...
            throw new Error("Cannot subtract a WASM histogram to a regular JS histogram");
        }
        if (highestRecordableValue < otherHistogram.maxValue) {
            if (!this.autoResize) {
                throw new Error("The other histogram includes values that do not fit in this histogram's range.");
            }
            this.resize(otherHistogram.maxValue);
        }
        if (this.bucketCount === otherHistogram.bucketCount &&
            this.subBucketCount === otherHistogram.subBucketCount &&
            this.unitMagnitude === otherHistogram.unitMagnitude) {
            // optim
            // Counts arrays are of the same length and meaning, so we can just iterate and add directly:
            let observedOtherTotalCount = 0;
            for (let i = 0; i < otherHistogram.countsArrayLength; i++) {
                const otherCount = otherHistogram.getCountAtIndex(i);
                if (otherCount > 0) {
                    this.addToCountAtIndex(i, -otherCount);
                    observedOtherTotalCount += otherCount;
                }
            }
            this.setTotalCount(this.totalCount - observedOtherTotalCount);
        }
        else {
            for (let i = 0; i < otherHistogram.countsArrayLength; i++) {
                const otherCount = otherHistogram.getCountAtIndex(i);
                if (otherCount > 0) {
                    const otherValue = otherHistogram.valueFromIndex(i);
                    if (this.getCountAtValue(otherValue) < otherCount) {
                        throw new Error("otherHistogram count (" +
                            otherCount +
                            ") at value " +
                            otherValue +
                            " is larger than this one's (" +
                            this.getCountAtValue(otherValue) +
                            ")");
                    }
                    this.recordCountAtValue(-otherCount, otherValue);
                }
            }
        }
        // With subtraction, the max and minNonZero values could have changed:
        if (this.getCountAtValue(this.maxValue) <= 0 ||
            this.getCountAtValue(this.minNonZeroValue) <= 0) {
            this.establishInternalTackingValues();
        }
    }
    establishInternalTackingValues(lengthToCover = this.countsArrayLength) {
        this.maxValue = 0;
        this.minNonZeroValue = Number.MAX_VALUE;
        let maxIndex = -1;
        let minNonZeroIndex = -1;
        let observedTotalCount = 0;
        for (let index = 0; index < lengthToCover; index++) {
            const countAtIndex = this.getCountAtIndex(index);
            if (countAtIndex > 0) {
                observedTotalCount += countAtIndex;
                maxIndex = index;
                if (minNonZeroIndex == -1 && index != 0) {
                    minNonZeroIndex = index;
                }
            }
        }
        if (maxIndex >= 0) {
            this.updatedMaxValue(this.highestEquivalentValue(this.valueFromIndex(maxIndex)));
        }
        if (minNonZeroIndex >= 0) {
            this.updateMinNonZeroValue(this.valueFromIndex(minNonZeroIndex));
        }
        this.setTotalCount(observedTotalCount);
    }
    reset() {
        this.clearCounts();
        this.setTotalCount(0);
        this.startTimeStampMsec = 0;
        this.endTimeStampMsec = 0;
        this.tag = Histogram_1.NO_TAG;
        this.maxValue = 0;
        this.minNonZeroValue = Number.MAX_SAFE_INTEGER;
    }
    destroy() {
        // no op - not needed here
    }
}
exports.JsHistogram = JsHistogram;
exports["default"] = JsHistogram;
//# sourceMappingURL=JsHistogram.js.map

/***/ }),

/***/ 5675:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.constructorFromBucketSize = void 0;
const PackedHistogram_1 = __nccwpck_require__(3436);
const Int8Histogram_1 = __nccwpck_require__(9454);
const Int16Histogram_1 = __nccwpck_require__(2678);
const Int32Histogram_1 = __nccwpck_require__(528);
const Float64Histogram_1 = __nccwpck_require__(6141);
function constructorFromBucketSize(bitBucketSize) {
    switch (bitBucketSize) {
        case "packed":
            return PackedHistogram_1.default;
        case 8:
            return Int8Histogram_1.default;
        case 16:
            return Int16Histogram_1.default;
        case 32:
            return Int32Histogram_1.default;
        case 64:
            return Float64Histogram_1.default;
        default:
            throw new Error("Incorrect parameter bitBucketSize");
    }
}
exports.constructorFromBucketSize = constructorFromBucketSize;
//# sourceMappingURL=JsHistogramFactory.js.map

/***/ }),

/***/ 6102:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const HistogramIterationValue_1 = __nccwpck_require__(1883);
/**
 * Used for iterating through histogram values.
 */
class JsHistogramIterator /* implements Iterator<HistogramIterationValue> */ {
    constructor() {
        this.currentIterationValue = new HistogramIterationValue_1.default();
    }
    resetIterator(histogram) {
        this.histogram = histogram;
        this.savedHistogramTotalRawCount = histogram.totalCount;
        this.arrayTotalCount = histogram.totalCount;
        this.currentIndex = 0;
        this.currentValueAtIndex = 0;
        this.nextValueAtIndex = Math.pow(2, histogram.unitMagnitude);
        this.prevValueIteratedTo = 0;
        this.totalCountToPrevIndex = 0;
        this.totalCountToCurrentIndex = 0;
        this.totalValueToCurrentIndex = 0;
        this.countAtThisValue = 0;
        this.freshSubBucket = true;
        this.currentIterationValue.reset();
    }
    /**
     * Returns true if the iteration has more elements. (In other words, returns true if next would return an
     * element rather than throwing an exception.)
     *
     * @return true if the iterator has more elements.
     */
    hasNext() {
        if (this.histogram.totalCount !== this.savedHistogramTotalRawCount) {
            throw "Concurrent Modification Exception";
        }
        return this.totalCountToCurrentIndex < this.arrayTotalCount;
    }
    /**
     * Returns the next element in the iteration.
     *
     * @return the {@link HistogramIterationValue} associated with the next element in the iteration.
     */
    next() {
        // Move through the sub buckets and buckets until we hit the next reporting level:
        while (!this.exhaustedSubBuckets()) {
            this.countAtThisValue = this.histogram.getCountAtIndex(this.currentIndex);
            if (this.freshSubBucket) {
                // Don't add unless we've incremented since last bucket...
                this.totalCountToCurrentIndex += this.countAtThisValue;
                this.totalValueToCurrentIndex +=
                    this.countAtThisValue *
                        this.histogram.highestEquivalentValue(this.currentValueAtIndex);
                this.freshSubBucket = false;
            }
            if (this.reachedIterationLevel()) {
                const valueIteratedTo = this.getValueIteratedTo();
                Object.assign(this.currentIterationValue, {
                    valueIteratedTo,
                    valueIteratedFrom: this.prevValueIteratedTo,
                    countAtValueIteratedTo: this.countAtThisValue,
                    countAddedInThisIterationStep: this.totalCountToCurrentIndex - this.totalCountToPrevIndex,
                    totalCountToThisValue: this.totalCountToCurrentIndex,
                    totalValueToThisValue: this.totalValueToCurrentIndex,
                    percentile: (100 * this.totalCountToCurrentIndex) / this.arrayTotalCount,
                    percentileLevelIteratedTo: this.getPercentileIteratedTo(),
                });
                this.prevValueIteratedTo = valueIteratedTo;
                this.totalCountToPrevIndex = this.totalCountToCurrentIndex;
                this.incrementIterationLevel();
                if (this.histogram.totalCount !== this.savedHistogramTotalRawCount) {
                    throw new Error("Concurrent Modification Exception");
                }
                return this.currentIterationValue;
            }
            this.incrementSubBucket();
        }
        throw new Error("Index Out Of Bounds Exception");
    }
    getPercentileIteratedTo() {
        return (100 * this.totalCountToCurrentIndex) / this.arrayTotalCount;
    }
    getPercentileIteratedFrom() {
        return (100 * this.totalCountToPrevIndex) / this.arrayTotalCount;
    }
    getValueIteratedTo() {
        return this.histogram.highestEquivalentValue(this.currentValueAtIndex);
    }
    exhaustedSubBuckets() {
        return this.currentIndex >= this.histogram.countsArrayLength;
    }
    incrementSubBucket() {
        this.freshSubBucket = true;
        this.currentIndex++;
        this.currentValueAtIndex = this.histogram.valueFromIndex(this.currentIndex);
        this.nextValueAtIndex = this.histogram.valueFromIndex(this.currentIndex + 1);
    }
}
exports["default"] = JsHistogramIterator;
//# sourceMappingURL=JsHistogramIterator.js.map

/***/ }),

/***/ 3436:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/*
 * This is a TypeScript port of the original Java version, which was written by
 * Gil Tene as described in
 * https://github.com/HdrHistogram/HdrHistogram
 * and released to the public domain, as explained at
 * http://creativecommons.org/publicdomain/zero/1.0/
 */
const JsHistogram_1 = __nccwpck_require__(9190);
const PackedArray_1 = __nccwpck_require__(6795);
/**
 * <h3>A High Dynamic Range (HDR) Histogram that uses a packed internal representation</h3>
 * <p>
 * {@link PackedHistogram} supports the recording and analyzing sampled data value counts across a configurable
 * integer value range with configurable value precision within the range. Value precision is expressed as the
 * number of significant digits in the value recording, and provides control over value quantization behavior
 * across the value range and the subsequent value resolution at any given level.
 * <p>
 * {@link PackedHistogram} tracks value counts in a packed internal representation optimized
 * for typical histogram recoded values are sparse in the value range and tend to be incremented in small unit counts.
 * This packed representation tends to require significantly smaller amounts of stoarge when compared to unpacked
 * representations, but can incur additional recording cost due to resizing and repacking operations that may
 * occur as previously unrecorded values are encountered.
 * <p>
 * For example, a {@link PackedHistogram} could be configured to track the counts of observed integer values between 0 and
 * 3,600,000,000,000 while maintaining a value precision of 3 significant digits across that range. Value quantization
 * within the range will thus be no larger than 1/1,000th (or 0.1%) of any value. This example Histogram could
 * be used to track and analyze the counts of observed response times ranging between 1 nanosecond and 1 hour
 * in magnitude, while maintaining a value resolution of 1 microsecond up to 1 millisecond, a resolution of
 * 1 millisecond (or better) up to one second, and a resolution of 1 second (or better) up to 1,000 seconds. At its
 * maximum tracked value (1 hour), it would still maintain a resolution of 3.6 seconds (or better).
 * <p>
 * Auto-resizing: When constructed with no specified value range range (or when auto-resize is turned on with {@link
 * Histogram#setAutoResize}) a {@link PackedHistogram} will auto-resize its dynamic range to include recorded values as
 * they are encountered. Note that recording calls that cause auto-resizing may take longer to execute, as resizing
 * incurs allocation and copying of internal data structures.
 * <p>
 */
class PackedHistogram extends JsHistogram_1.default {
    constructor(lowestDiscernibleValue, highestTrackableValue, numberOfSignificantValueDigits) {
        super(lowestDiscernibleValue, highestTrackableValue, numberOfSignificantValueDigits);
        this._totalCount = 0;
        this.packedCounts = new PackedArray_1.PackedArray(this.countsArrayLength);
    }
    clearCounts() {
        this.packedCounts.clear();
    }
    incrementCountAtIndex(index) {
        this.packedCounts.increment(index);
    }
    addToCountAtIndex(index, value) {
        this.packedCounts.add(index, value);
    }
    setCountAtIndex(index, value) {
        this.packedCounts.set(index, value);
    }
    resize(newHighestTrackableValue) {
        this.establishSize(newHighestTrackableValue);
        this.packedCounts.setVirtualLength(this.countsArrayLength);
    }
    getCountAtIndex(index) {
        return this.packedCounts.get(index);
    }
    _getEstimatedFootprintInBytes() {
        return 192 + 8 * this.packedCounts.getPhysicalLength();
    }
    copyCorrectedForCoordinatedOmission(expectedIntervalBetweenValueSamples) {
        const copy = new PackedHistogram(this.lowestDiscernibleValue, this.highestTrackableValue, this.numberOfSignificantValueDigits);
        copy.addWhileCorrectingForCoordinatedOmission(this, expectedIntervalBetweenValueSamples);
        return copy;
    }
    toString() {
        return `PackedHistogram ${JSON.stringify(this, null, 2)}`;
    }
}
exports["default"] = PackedHistogram;
//# sourceMappingURL=PackedHistogram.js.map

/***/ }),

/***/ 8516:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const JsHistogramIterator_1 = __nccwpck_require__(6102);
const { pow, floor, log2 } = Math;
/**
 * Used for iterating through histogram values according to percentile levels. The iteration is
 * performed in steps that start at 0% and reduce their distance to 100% according to the
 * <i>percentileTicksPerHalfDistance</i> parameter, ultimately reaching 100% when all recorded histogram
 * values are exhausted.
 */
class PercentileIterator extends JsHistogramIterator_1.default {
    /**
     * @param histogram The histogram this iterator will operate on
     * @param percentileTicksPerHalfDistance The number of equal-sized iteration steps per half-distance to 100%.
     */
    constructor(histogram, percentileTicksPerHalfDistance) {
        super();
        this.percentileTicksPerHalfDistance = 0;
        this.percentileLevelToIterateTo = 0;
        this.percentileLevelToIterateFrom = 0;
        this.reachedLastRecordedValue = false;
        this.doReset(histogram, percentileTicksPerHalfDistance);
    }
    /**
     * Reset iterator for re-use in a fresh iteration over the same histogram data set.
     *
     * @param percentileTicksPerHalfDistance The number of iteration steps per half-distance to 100%.
     */
    reset(percentileTicksPerHalfDistance) {
        this.doReset(this.histogram, percentileTicksPerHalfDistance);
    }
    doReset(histogram, percentileTicksPerHalfDistance) {
        super.resetIterator(histogram);
        this.percentileTicksPerHalfDistance = percentileTicksPerHalfDistance;
        this.percentileLevelToIterateTo = 0;
        this.percentileLevelToIterateFrom = 0;
        this.reachedLastRecordedValue = false;
    }
    hasNext() {
        if (super.hasNext())
            return true;
        if (!this.reachedLastRecordedValue && this.arrayTotalCount > 0) {
            this.percentileLevelToIterateTo = 100;
            this.reachedLastRecordedValue = true;
            return true;
        }
        return false;
    }
    incrementIterationLevel() {
        this.percentileLevelToIterateFrom = this.percentileLevelToIterateTo;
        // The choice to maintain fixed-sized "ticks" in each half-distance to 100% [starting
        // from 0%], as opposed to a "tick" size that varies with each interval, was made to
        // make the steps easily comprehensible and readable to humans. The resulting percentile
        // steps are much easier to browse through in a percentile distribution output, for example.
        //
        // We calculate the number of equal-sized "ticks" that the 0-100 range will be divided
        // by at the current scale. The scale is detemined by the percentile level we are
        // iterating to. The following math determines the tick size for the current scale,
        // and maintain a fixed tick size for the remaining "half the distance to 100%"
        // [from either 0% or from the previous half-distance]. When that half-distance is
        // crossed, the scale changes and the tick size is effectively cut in half.
        // percentileTicksPerHalfDistance = 5
        // percentileReportingTicks = 10,
        const percentileReportingTicks = this.percentileTicksPerHalfDistance *
            pow(2, floor(log2(100 / (100 - this.percentileLevelToIterateTo))) + 1);
        this.percentileLevelToIterateTo += 100 / percentileReportingTicks;
    }
    reachedIterationLevel() {
        if (this.countAtThisValue === 0) {
            return false;
        }
        const currentPercentile = (100 * this.totalCountToCurrentIndex) / this.arrayTotalCount;
        return currentPercentile >= this.percentileLevelToIterateTo;
    }
    getPercentileIteratedTo() {
        return this.percentileLevelToIterateTo;
    }
    getPercentileIteratedFrom() {
        return this.percentileLevelToIterateFrom;
    }
}
exports["default"] = PercentileIterator;
//# sourceMappingURL=PercentileIterator.js.map

/***/ }),

/***/ 6631:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

/*
 * This is a TypeScript port of the original Java version, which was written by
 * Gil Tene as described in
 * https://github.com/HdrHistogram/HdrHistogram
 * and released to the public domain, as explained at
 * http://creativecommons.org/publicdomain/zero/1.0/
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const JsHistogramIterator_1 = __nccwpck_require__(6102);
/**
 * Used for iterating through all recorded histogram values using the finest granularity steps supported by the
 * underlying representation. The iteration steps through all non-zero recorded value counts, and terminates when
 * all recorded histogram values are exhausted.
 */
class RecordedValuesIterator extends JsHistogramIterator_1.default {
    /**
     * @param histogram The histogram this iterator will operate on
     */
    constructor(histogram) {
        super();
        this.doReset(histogram);
    }
    /**
     * Reset iterator for re-use in a fresh iteration over the same histogram data set.
     */
    reset() {
        this.doReset(this.histogram);
    }
    doReset(histogram) {
        super.resetIterator(histogram);
        this.visitedIndex = -1;
    }
    incrementIterationLevel() {
        this.visitedIndex = this.currentIndex;
    }
    reachedIterationLevel() {
        const currentCount = this.histogram.getCountAtIndex(this.currentIndex);
        return currentCount != 0 && this.visitedIndex !== this.currentIndex;
    }
}
exports["default"] = RecordedValuesIterator;
//# sourceMappingURL=RecordedValuesIterator.js.map

/***/ }),

/***/ 3036:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

/*
 * This is a TypeScript port of the original Java version, which was written by
 * Gil Tene as described in
 * https://github.com/HdrHistogram/HdrHistogram
 * and released to the public domain, as explained at
 * http://creativecommons.org/publicdomain/zero/1.0/
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const HistogramBuilder_1 = __nccwpck_require__(7486);
/**
 * Records integer values, and provides stable interval {@link Histogram} samples from
 * live recorded data without interrupting or stalling active recording of values. Each interval
 * histogram provided contains all value counts accumulated since the previous interval histogram
 * was taken.
 * <p>
 * This pattern is commonly used in logging interval histogram information while recording is ongoing.
 * <p>
 * {@link Recorder} supports concurrent
 * {@link Recorder#recordValue} or
 * {@link Recorder#recordValueWithExpectedInterval} calls.
 *
 */
class Recorder {
    /**
     * Construct an auto-resizing {@link Recorder} with a lowest discernible value of
     * 1 and an auto-adjusting highestTrackableValue. Can auto-resize up to track values up to Number.MAX_SAFE_INTEGER.
     *
     * @param histogramBuildRequest parameters used to build histograms while using this recorder.
     * @param clock (for testing purpose) an action that give current time in ms since 1970
     */
    constructor(histogramBuildRequest = HistogramBuilder_1.defaultRequest, clock = () => new Date().getTime()) {
        this.histogramBuildRequest = histogramBuildRequest;
        this.clock = clock;
        this.activeHistogram = HistogramBuilder_1.build(this.histogramBuildRequest);
        Recorder.idGenerator++;
        this.activeHistogram.containingInstanceId = Recorder.idGenerator;
        this.activeHistogram.startTimeStampMsec = clock();
    }
    /**
     * Record a value in the histogram
     *
     * @param value The value to be recorded
     * @throws may throw Error if value is exceeds highestTrackableValue
     */
    recordValue(value) {
        this.activeHistogram.recordValue(value);
    }
    /**
     * Record a value in the histogram (adding to the value's current count)
     *
     * @param value The value to be recorded
     * @param count The number of occurrences of this value to record
     * @throws ArrayIndexOutOfBoundsException (may throw) if value is exceeds highestTrackableValue
     */
    recordValueWithCount(value, count) {
        this.activeHistogram.recordValueWithCount(value, count);
    }
    /**
     * Record a value
     * <p>
     * To compensate for the loss of sampled values when a recorded value is larger than the expected
     * interval between value samples, Histogram will auto-generate an additional series of decreasingly-smaller
     * (down to the expectedIntervalBetweenValueSamples) value records.
     * <p>
     * See related notes {@link Histogram#recordValueWithExpectedInterval(long, long)}
     * for more explanations about coordinated omission and expected interval correction.
     *      *
     * @param value The value to record
     * @param expectedIntervalBetweenValueSamples If expectedIntervalBetweenValueSamples is larger than 0, add
     *                                           auto-generated value records as appropriate if value is larger
     *                                           than expectedIntervalBetweenValueSamples
     * @throws ArrayIndexOutOfBoundsException (may throw) if value is exceeds highestTrackableValue
     */
    recordValueWithExpectedInterval(value, expectedIntervalBetweenValueSamples) {
        this.activeHistogram.recordValueWithExpectedInterval(value, expectedIntervalBetweenValueSamples);
    }
    /**
     * Get an interval histogram, which will include a stable, consistent view of all value counts
     * accumulated since the last interval histogram was taken.
     * <p>
     * {@link Recorder#getIntervalHistogram(Histogram histogramToRecycle)
     * getIntervalHistogram(histogramToRecycle)}
     * accepts a previously returned interval histogram that can be recycled internally to avoid allocation
     * and content copying operations, and is therefore significantly more efficient for repeated use than
     * {@link Recorder#getIntervalHistogram()} and
     * {@link Recorder#getIntervalHistogramInto getIntervalHistogramInto()}. The provided
     * {@code histogramToRecycle} must
     * be either be null or an interval histogram returned by a previous call to
     * {@link Recorder#getIntervalHistogram(Histogram histogramToRecycle)
     * getIntervalHistogram(histogramToRecycle)} or
     * {@link Recorder#getIntervalHistogram()}.
     * <p>
     * NOTE: The caller is responsible for not recycling the same returned interval histogram more than once. If
     * the same interval histogram instance is recycled more than once, behavior is undefined.
     * <p>
     * Calling {@link Recorder#getIntervalHistogram(Histogram histogramToRecycle)
     * getIntervalHistogram(histogramToRecycle)} will reset the value counts, and start accumulating value
     * counts for the next interval
     *
     * @param histogramToRecycle a previously returned interval histogram that may be recycled to avoid allocation and
     *                           copy operations.
     * @return a histogram containing the value counts accumulated since the last interval histogram was taken.
     */
    getIntervalHistogram(histogramToRecycle) {
        if (histogramToRecycle) {
            const histogramToRecycleWithId = histogramToRecycle;
            if (histogramToRecycleWithId.containingInstanceId !==
                this.activeHistogram.containingInstanceId) {
                throw "replacement histogram must have been obtained via a previous getIntervalHistogram() call from this Recorder";
            }
        }
        this.inactiveHistogram = histogramToRecycle;
        this.performIntervalSample();
        const sampledHistogram = this.inactiveHistogram;
        this.inactiveHistogram = null; // Once we expose the sample, we can't reuse it internally until it is recycled
        return sampledHistogram;
    }
    /**
     * Place a copy of the value counts accumulated since accumulated (since the last interval histogram
     * was taken) into {@code targetHistogram}.
     *
     * Calling {@link Recorder#getIntervalHistogramInto getIntervalHistogramInto()} will reset
     * the value counts, and start accumulating value counts for the next interval.
     *
     * @param targetHistogram the histogram into which the interval histogram's data should be copied
     */
    getIntervalHistogramInto(targetHistogram) {
        this.performIntervalSample();
        if (this.inactiveHistogram) {
            targetHistogram.add(this.inactiveHistogram);
            targetHistogram.startTimeStampMsec = this.inactiveHistogram.startTimeStampMsec;
            targetHistogram.endTimeStampMsec = this.inactiveHistogram.endTimeStampMsec;
        }
    }
    /**
     * Reset any value counts accumulated thus far.
     */
    reset() {
        this.activeHistogram.reset();
        this.activeHistogram.startTimeStampMsec = this.clock();
    }
    performIntervalSample() {
        if (!this.inactiveHistogram) {
            this.inactiveHistogram = HistogramBuilder_1.build(this.histogramBuildRequest);
            this.inactiveHistogram.containingInstanceId = this.activeHistogram.containingInstanceId;
        }
        this.inactiveHistogram.reset();
        const tempHistogram = this.activeHistogram;
        this.activeHistogram = this.inactiveHistogram;
        this.inactiveHistogram = tempHistogram;
        const currentTimeInMs = this.clock();
        this.inactiveHistogram.endTimeStampMsec = currentTimeInMs;
        this.activeHistogram.startTimeStampMsec = currentTimeInMs;
    }
    /**
     * Release memory associated to this recorder by destroying
     * histograms used under the cover.
     * Useful when webassembly histograms are used.
     */
    destroy() {
        var _a;
        this.activeHistogram.destroy();
        (_a = this.inactiveHistogram) === null || _a === void 0 ? void 0 : _a.destroy();
    }
}
Recorder.idGenerator = 0;
exports["default"] = Recorder;
//# sourceMappingURL=Recorder.js.map

/***/ }),

/***/ 3230:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/*
 * This is a TypeScript port of the original Java version, which was written by
 * Gil Tene as described in
 * https://github.com/HdrHistogram/HdrHistogram
 * and released to the public domain, as explained at
 * http://creativecommons.org/publicdomain/zero/1.0/
 */
const JsHistogram_1 = __nccwpck_require__(9190);
class TypedArrayHistogram extends JsHistogram_1.default {
    constructor(arrayCtr, lowestDiscernibleValue, highestTrackableValue, numberOfSignificantValueDigits) {
        super(lowestDiscernibleValue, highestTrackableValue, numberOfSignificantValueDigits);
        this.arrayCtr = arrayCtr;
        this._totalCount = 0;
        this._counts = new arrayCtr(this.countsArrayLength);
    }
    clearCounts() {
        this._counts.fill(0);
    }
    incrementCountAtIndex(index) {
        const currentCount = this._counts[index];
        const newCount = currentCount + 1;
        if (newCount < 0) {
            throw newCount + " would overflow short integer count";
        }
        this._counts[index] = newCount;
    }
    addToCountAtIndex(index, value) {
        const currentCount = this._counts[index];
        const newCount = currentCount + value;
        if (newCount < Number.MIN_SAFE_INTEGER ||
            newCount > Number.MAX_SAFE_INTEGER) {
            throw newCount + " would overflow integer count";
        }
        this._counts[index] = newCount;
    }
    setCountAtIndex(index, value) {
        if (value < Number.MIN_SAFE_INTEGER || value > Number.MAX_SAFE_INTEGER) {
            throw value + " would overflow integer count";
        }
        this._counts[index] = value;
    }
    resize(newHighestTrackableValue) {
        this.establishSize(newHighestTrackableValue);
        const newCounts = new this.arrayCtr(this.countsArrayLength);
        newCounts.set(this._counts);
        this._counts = newCounts;
    }
    getCountAtIndex(index) {
        return this._counts[index];
    }
    _getEstimatedFootprintInBytes() {
        return 1024 + this._counts.BYTES_PER_ELEMENT * this._counts.length;
    }
    copyCorrectedForCoordinatedOmission(expectedIntervalBetweenValueSamples) {
        const copy = new TypedArrayHistogram(this.arrayCtr, this.lowestDiscernibleValue, this.highestTrackableValue, this.numberOfSignificantValueDigits);
        copy.addWhileCorrectingForCoordinatedOmission(this, expectedIntervalBetweenValueSamples);
        return copy;
    }
    toString() {
        return `Histogram ${this._counts.BYTES_PER_ELEMENT * 8}b ${JSON.stringify(this, null, 2)}`;
    }
}
exports["default"] = TypedArrayHistogram;
//# sourceMappingURL=TypedArrayHistogram.js.map

/***/ }),

/***/ 7495:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const { pow, floor } = Math;
const TWO_POW_7 = pow(2, 7);
const TWO_POW_14 = pow(2, 14);
const TWO_POW_21 = pow(2, 21);
const TWO_POW_28 = pow(2, 28);
const TWO_POW_35 = pow(2, 35);
const TWO_POW_42 = pow(2, 42);
const TWO_POW_49 = pow(2, 49);
const TWO_POW_56 = pow(2, 56);
/**
 * This class provides encoding and decoding methods for writing and reading
 * ZigZag-encoded LEB128-64b9B-variant (Little Endian Base 128) values to/from a
 * {@link ByteBuffer}. LEB128's variable length encoding provides for using a
 * smaller nuber of bytes for smaller values, and the use of ZigZag encoding
 * allows small (closer to zero) negative values to use fewer bytes. Details
 * on both LEB128 and ZigZag can be readily found elsewhere.
 *
 * The LEB128-64b9B-variant encoding used here diverges from the "original"
 * LEB128 as it extends to 64 bit values: In the original LEB128, a 64 bit
 * value can take up to 10 bytes in the stream, where this variant's encoding
 * of a 64 bit values will max out at 9 bytes.
 *
 * As such, this encoder/decoder should NOT be used for encoding or decoding
 * "standard" LEB128 formats (e.g. Google Protocol Buffers).
 */
class ZigZagEncoding {
    /**
     * Writes a long value to the given buffer in LEB128 ZigZag encoded format
     * (negative numbers not supported)
     * @param buffer the buffer to write to
     * @param value  the value to write to the buffer
     */
    static encode(buffer, value) {
        if (value >= 0) {
            value = value * 2;
        }
        else {
            value = -value * 2 - 1;
        }
        if (value < TWO_POW_7) {
            buffer.put(value);
        }
        else {
            buffer.put(value | 0x80);
            if (value < TWO_POW_14) {
                buffer.put(floor(value / TWO_POW_7));
            }
            else {
                buffer.put(floor(value / TWO_POW_7) | 0x80);
                if (value < TWO_POW_21) {
                    buffer.put(floor(value / TWO_POW_14));
                }
                else {
                    buffer.put(floor(value / TWO_POW_14) | 0x80);
                    if (value < TWO_POW_28) {
                        buffer.put(floor(value / TWO_POW_21));
                    }
                    else {
                        buffer.put(floor(value / TWO_POW_21) | 0x80);
                        if (value < TWO_POW_35) {
                            buffer.put(floor(value / TWO_POW_28));
                        }
                        else {
                            buffer.put(floor(value / TWO_POW_28) | 0x80);
                            if (value < TWO_POW_42) {
                                buffer.put(floor(value / TWO_POW_35));
                            }
                            else {
                                buffer.put(floor(value / TWO_POW_35) | 0x80);
                                if (value < TWO_POW_49) {
                                    buffer.put(floor(value / TWO_POW_42));
                                }
                                else {
                                    buffer.put(floor(value / TWO_POW_42) | 0x80);
                                    if (value < TWO_POW_56) {
                                        buffer.put(floor(value / TWO_POW_49));
                                    }
                                    else {
                                        // should not happen
                                        buffer.put(floor(value / TWO_POW_49) + 0x80);
                                        buffer.put(floor(value / TWO_POW_56));
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    /**
     * Read an LEB128-64b9B ZigZag encoded long value from the given buffer
     * (negative numbers not supported)
     * @param buffer the buffer to read from
     * @return the value read from the buffer
     */
    static decode(buffer) {
        let v = buffer.get();
        let value = v & 0x7f;
        if ((v & 0x80) != 0) {
            v = buffer.get();
            value += (v & 0x7f) * TWO_POW_7;
            if ((v & 0x80) != 0) {
                v = buffer.get();
                value += (v & 0x7f) * TWO_POW_14;
                if ((v & 0x80) != 0) {
                    v = buffer.get();
                    value += (v & 0x7f) * TWO_POW_21;
                    if ((v & 0x80) != 0) {
                        v = buffer.get();
                        value += (v & 0x7f) * TWO_POW_28;
                        if ((v & 0x80) != 0) {
                            v = buffer.get();
                            value += (v & 0x7f) * TWO_POW_35;
                            if ((v & 0x80) != 0) {
                                v = buffer.get();
                                value += (v & 0x7f) * TWO_POW_42;
                                if ((v & 0x80) != 0) {
                                    v = buffer.get();
                                    value += (v & 0x7f) * TWO_POW_49;
                                    if ((v & 0x80) != 0) {
                                        v = buffer.get();
                                        value += (v & 0x7f) * TWO_POW_56;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (value % 2 === 0) {
            value = value / 2;
        }
        else {
            value = -(value + 1) / 2;
        }
        return value;
    }
}
exports["default"] = ZigZagEncoding;
//# sourceMappingURL=ZigZagEncoding.js.map

/***/ }),

/***/ 6012:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.encodeIntoCompressedBase64 = exports.decodeFromCompressedBase64 = exports.decompress = void 0;
/*
 * This is a TypeScript port of the original Java version, which was written by
 * Gil Tene as described in
 * https://github.com/HdrHistogram/HdrHistogram
 * and released to the public domain, as explained at
 * http://creativecommons.org/publicdomain/zero/1.0/
 */
const JsHistogram_1 = __nccwpck_require__(9190);
const ByteBuffer_1 = __nccwpck_require__(6535);
const wasm_1 = __nccwpck_require__(24);
// @ts-ignore
const base64 = __nccwpck_require__(6463);
const JsHistogram_encoding_1 = __nccwpck_require__(2894);
const V2CompressedEncodingCookieBase = 0x1c849304;
const compressedEncodingCookie = V2CompressedEncodingCookieBase | 0x10; // LSBit of wordsize byte indicates TLZE Encoding
function decompress(data) {
    const buffer = new ByteBuffer_1.default(data);
    const initialTargetPosition = buffer.position;
    const cookie = buffer.getInt32();
    if ((cookie & ~0xf0) !== V2CompressedEncodingCookieBase) {
        throw new Error("Encoding not supported, only V2 is supported");
    }
    const lengthOfCompressedContents = buffer.getInt32();
    const uncompressedBuffer = JsHistogram_encoding_1.inflate(buffer.data.slice(initialTargetPosition + 8, initialTargetPosition + 8 + lengthOfCompressedContents));
    return uncompressedBuffer;
}
exports.decompress = decompress;
exports.decodeFromCompressedBase64 = (base64String, bitBucketSize = 32, useWebAssembly = false, minBarForHighestTrackableValue = 0) => {
    const data = base64.toByteArray(base64String.trim());
    const uncompressedData = decompress(data);
    if (useWebAssembly) {
        return wasm_1.WasmHistogram.decode(uncompressedData, bitBucketSize, minBarForHighestTrackableValue);
    }
    return JsHistogram_1.JsHistogram.decode(uncompressedData, bitBucketSize, minBarForHighestTrackableValue);
};
function encodeWasmIntoCompressedBase64(compressionLevel) {
    const compressionOptions = compressionLevel
        ? { level: compressionLevel }
        : {};
    const self = this;
    const targetBuffer = ByteBuffer_1.default.allocate();
    targetBuffer.putInt32(compressedEncodingCookie);
    const uncompressedData = self.encode();
    const compressedData = JsHistogram_encoding_1.deflate(uncompressedData, compressionOptions);
    targetBuffer.putInt32(compressedData.byteLength);
    targetBuffer.putArray(compressedData);
    return base64.fromByteArray(targetBuffer.data);
}
wasm_1.WasmHistogram.prototype.encodeIntoCompressedBase64 = encodeWasmIntoCompressedBase64;
exports.encodeIntoCompressedBase64 = (histogram, compressionLevel) => {
    if (histogram instanceof wasm_1.WasmHistogram) {
        return histogram.encodeIntoCompressedBase64(compressionLevel);
    }
    if (histogram instanceof JsHistogram_1.JsHistogram) {
        return histogram.encodeIntoCompressedBase64(compressionLevel);
    }
    throw new Error("Unsupported Histogram implementation");
};
//# sourceMappingURL=encoding.js.map

/***/ }),

/***/ 4791:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.floatFormatter = exports.keepSignificantDigits = exports.integerFormatter = void 0;
const leftPadding = (size) => {
    return (input) => {
        if (input.length < size) {
            return " ".repeat(size - input.length) + input;
        }
        return input;
    };
};
exports.integerFormatter = (size) => {
    const padding = leftPadding(size);
    return (integer) => padding("" + integer);
};
const { floor, log10, pow } = Math;
const numberOfDigits = (n) => floor(log10(n) + 1);
exports.keepSignificantDigits = (digits) => (value) => {
    const valueDigits = numberOfDigits(value);
    if (valueDigits > digits) {
        const extraDigits = valueDigits - digits;
        const magnitude = pow(10, extraDigits);
        return value - (value % magnitude);
    }
    return value;
};
exports.floatFormatter = (size, fractionDigits) => {
    const numberFormatter = new Intl.NumberFormat("en-US", {
        maximumFractionDigits: fractionDigits,
        minimumFractionDigits: fractionDigits,
        useGrouping: false,
    });
    const padding = leftPadding(size);
    return (float) => padding(numberFormatter.format(float));
};
//# sourceMappingURL=formatters.js.map

/***/ }),

/***/ 6475:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JsHistogram = exports.WasmHistogram = exports.Recorder = exports.HistogramLogWriter = exports.encodeIntoCompressedBase64 = exports.decodeFromCompressedBase64 = exports.ByteBuffer = exports.build = exports.listTags = exports.HistogramLogReader = exports.PackedHistogram = exports.Float64Histogram = exports.Int32Histogram = exports.Int16Histogram = exports.Int8Histogram = exports.initWebAssemblySync = exports.initWebAssembly = void 0;
/*
 * This is a TypeScript port of the original Java version, which was written by
 * Gil Tene as described in
 * https://github.com/HdrHistogram/HdrHistogram
 * and released to the public domain, as explained at
 * http://creativecommons.org/publicdomain/zero/1.0/
 */
const ByteBuffer_1 = __nccwpck_require__(6535);
exports.ByteBuffer = ByteBuffer_1.default;
const encoding_1 = __nccwpck_require__(6012);
Object.defineProperty(exports, "decodeFromCompressedBase64", ({ enumerable: true, get: function () { return encoding_1.decodeFromCompressedBase64; } }));
Object.defineProperty(exports, "encodeIntoCompressedBase64", ({ enumerable: true, get: function () { return encoding_1.encodeIntoCompressedBase64; } }));
const Float64Histogram_1 = __nccwpck_require__(6141);
exports.Float64Histogram = Float64Histogram_1.default;
const HistogramLogReader_1 = __nccwpck_require__(6654);
exports.HistogramLogReader = HistogramLogReader_1.default;
Object.defineProperty(exports, "listTags", ({ enumerable: true, get: function () { return HistogramLogReader_1.listTags; } }));
const HistogramLogWriter_1 = __nccwpck_require__(8747);
exports.HistogramLogWriter = HistogramLogWriter_1.default;
const Int16Histogram_1 = __nccwpck_require__(2678);
exports.Int16Histogram = Int16Histogram_1.default;
const Int32Histogram_1 = __nccwpck_require__(528);
exports.Int32Histogram = Int32Histogram_1.default;
const Int8Histogram_1 = __nccwpck_require__(9454);
exports.Int8Histogram = Int8Histogram_1.default;
const JsHistogram_1 = __nccwpck_require__(9190);
exports.JsHistogram = JsHistogram_1.default;
const PackedHistogram_1 = __nccwpck_require__(3436);
exports.PackedHistogram = PackedHistogram_1.default;
const Recorder_1 = __nccwpck_require__(3036);
exports.Recorder = Recorder_1.default;
const wasm_1 = __nccwpck_require__(24);
Object.defineProperty(exports, "initWebAssembly", ({ enumerable: true, get: function () { return wasm_1.initWebAssembly; } }));
Object.defineProperty(exports, "initWebAssemblySync", ({ enumerable: true, get: function () { return wasm_1.initWebAssemblySync; } }));
Object.defineProperty(exports, "WasmHistogram", ({ enumerable: true, get: function () { return wasm_1.WasmHistogram; } }));
const HistogramBuilder_1 = __nccwpck_require__(7486);
Object.defineProperty(exports, "build", ({ enumerable: true, get: function () { return HistogramBuilder_1.build; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 6795:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PackedArray = void 0;
/*
 * This is a TypeScript port of the original Java version, which was written by
 * Gil Tene as described in
 * https://github.com/HdrHistogram/HdrHistogram
 * and released to the public domain, as explained at
 * http://creativecommons.org/publicdomain/zero/1.0/
 */
const PackedArrayContext_1 = __nccwpck_require__(7513);
const NUMBER_OF_SETS = 8;
const { pow, floor } = Math;
/**
 * A Packed array of signed 64 bit values, and supports {@link #get get()}, {@link #set set()},
 * {@link #add add()} and {@link #increment increment()} operations on the logical contents of the array.
 *
 * An {@link PackedLongArray} Uses {@link PackedArrayContext} to track
 * the array's logical contents. Contexts may be switched when a context requires resizing
 * to complete logical array operations (get, set, add, increment). Contexts are
 * established and used within critical sections in order to facilitate concurrent
 * implementors.
 *
 */
class PackedArray {
    constructor(virtualLength, initialPhysicalLength = PackedArrayContext_1.MINIMUM_INITIAL_PACKED_ARRAY_CAPACITY) {
        this.arrayContext = new PackedArrayContext_1.PackedArrayContext(virtualLength, initialPhysicalLength);
    }
    setVirtualLength(newVirtualArrayLength) {
        if (newVirtualArrayLength < this.length()) {
            throw new Error("Cannot set virtual length, as requested length " +
                newVirtualArrayLength +
                " is smaller than the current virtual length " +
                this.length());
        }
        const currentArrayContext = this.arrayContext;
        if (currentArrayContext.isPacked &&
            currentArrayContext.determineTopLevelShiftForVirtualLength(newVirtualArrayLength) == currentArrayContext.getTopLevelShift()) {
            // No changes to the array context contents is needed. Just change the virtual length.
            currentArrayContext.setVirtualLength(newVirtualArrayLength);
            return;
        }
        this.arrayContext = currentArrayContext.copyAndIncreaseSize(this.getPhysicalLength(), newVirtualArrayLength);
    }
    /**
     * Get value at virtual index in the array
     * @param index the virtual array index
     * @return the array value at the virtual index given
     */
    get(index) {
        let value = 0;
        for (let byteNum = 0; byteNum < NUMBER_OF_SETS; byteNum++) {
            let byteValueAtPackedIndex = 0;
            // Deal with unpacked context:
            if (!this.arrayContext.isPacked) {
                return this.arrayContext.getAtUnpackedIndex(index);
            }
            // Context is packed:
            const packedIndex = this.arrayContext.getPackedIndex(byteNum, index, false);
            if (packedIndex < 0) {
                return value;
            }
            byteValueAtPackedIndex =
                this.arrayContext.getAtByteIndex(packedIndex) * pow(2, byteNum << 3);
            value += byteValueAtPackedIndex;
        }
        return value;
    }
    /**
     * Increment value at a virrual index in the array
     * @param index virtual index of value to increment
     */
    increment(index) {
        this.add(index, 1);
    }
    safeGetPackedIndexgetPackedIndex(setNumber, virtualIndex) {
        //do {
        //try {
        return this.arrayContext.getPackedIndex(setNumber, virtualIndex, true);
        /*} catch (ex) {
            if (ex instanceof ResizeError) {
              this.arrayContext.resizeArray(ex.newSize);
            } else {
              throw ex;
            }
          }*/
        //} while (true);
    }
    /**
     * Add to a value at a virtual index in the array
     * @param index the virtual index of the value to be added to
     * @param value the value to add
     */
    add(index, value) {
        let remainingValueToAdd = value;
        for (let byteNum = 0, byteShift = 0; byteNum < NUMBER_OF_SETS; byteNum++, byteShift += 8) {
            // Deal with unpacked context:
            if (!this.arrayContext.isPacked) {
                this.arrayContext.addAndGetAtUnpackedIndex(index, value);
                return;
            }
            // Context is packed:
            const packedIndex = this.safeGetPackedIndexgetPackedIndex(byteNum, index);
            const byteToAdd = remainingValueToAdd & 0xff;
            const afterAddByteValue = this.arrayContext.addAtByteIndex(packedIndex, byteToAdd);
            // Reduce remaining value to add by amount just added:
            remainingValueToAdd -= byteToAdd;
            remainingValueToAdd = remainingValueToAdd / pow(2, 8);
            // Account for carry:
            remainingValueToAdd += floor(afterAddByteValue / pow(2, 8));
            if (remainingValueToAdd == 0) {
                return; // nothing to add to higher magnitudes
            }
        }
    }
    /**
     * Set the value at a virtual index in the array
     * @param index the virtual index of the value to set
     * @param value the value to set
     */
    set(index, value) {
        let bytesAlreadySet = 0;
        let valueForNextLevels = value;
        for (let byteNum = 0; byteNum < NUMBER_OF_SETS; byteNum++) {
            // Establish context within: critical section
            // Deal with unpacked context:
            if (!this.arrayContext.isPacked) {
                this.arrayContext.setAtUnpackedIndex(index, value);
                return;
            }
            // Context is packed:
            if (valueForNextLevels == 0) {
                // Special-case zeros to avoid inflating packed array for no reason
                const packedIndex = this.arrayContext.getPackedIndex(byteNum, index, false);
                if (packedIndex < 0) {
                    return; // no need to create entries for zero values if they don't already exist
                }
            }
            // Make sure byte is populated:
            const packedIndex = this.arrayContext.getPackedIndex(byteNum, index, true);
            // Determine value to write, and prepare for next levels
            const byteToWrite = valueForNextLevels & 0xff;
            valueForNextLevels = floor(valueForNextLevels / pow(2, 8));
            if (byteNum < bytesAlreadySet) {
                // We want to avoid writing to the same byte twice when not doing so for the
                // entire 64 bit value atomically, as doing so opens a race with e.g. concurrent
                // adders. So dobn't actually write the byte if has been written before.
                continue;
            }
            this.arrayContext.setAtByteIndex(packedIndex, byteToWrite);
            bytesAlreadySet++;
        }
    }
    /**
     * Get the current physical length (in longs) of the array's backing storage
     * @return the current physical length (in longs) of the array's current backing storage
     */
    getPhysicalLength() {
        return this.arrayContext.physicalLength;
    }
    /**
     * Get the (virtual) length of the array
     * @return the (virtual) length of the array
     */
    length() {
        return this.arrayContext.getVirtualLength();
    }
    /**
     * Clear the array contents
     */
    clear() {
        this.arrayContext.clear();
    }
    toString() {
        let output = "PackedArray:\n";
        output += this.arrayContext.toString();
        return output;
    }
}
exports.PackedArray = PackedArray;
//# sourceMappingURL=PackedArray.js.map

/***/ }),

/***/ 7513:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/*
 * This is a TypeScript port of the original Java version, which was written by
 * Gil Tene as described in
 * https://github.com/HdrHistogram/HdrHistogram
 * and released to the public domain, as explained at
 * http://creativecommons.org/publicdomain/zero/1.0/
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PackedArrayContext = exports.MINIMUM_INITIAL_PACKED_ARRAY_CAPACITY = void 0;
/**
 * A packed-value, sparse array context used for storing 64 bit signed values.
 *
 * An array context is optimised for tracking sparsely set (as in mostly zeros) values that tend to not make
 * use pof the full 64 bit value range even when they are non-zero. The array context's internal representation
 * is such that the packed value at each virtual array index may be represented by 0-8 bytes of actual storage.
 *
 * An array context encodes the packed values in 8 "set trees" with each set tree representing one byte of the
 * packed value at the virtual index in question. The {@link #getPackedIndex(int, int, boolean)} method is used
 * to look up the byte-index corresponding to the given (set tree) value byte of the given virtual index, and can
 * be used to add entries to represent that byte as needed. As a succesful {@link #getPackedIndex(int, int, boolean)}
 * may require a resizing of the array, it can throw a {@link ResizeException} to indicate that the requested
 * packed index cannot be found or added without a resize of the physical storage.
 *
 */
exports.MINIMUM_INITIAL_PACKED_ARRAY_CAPACITY = 16;
const MAX_SUPPORTED_PACKED_COUNTS_ARRAY_LENGTH = Math.pow(2, 13) - 1; //(Short.MAX_VALUE / 4);  TODO ALEX why ???
const SET_0_START_INDEX = 0;
const NUMBER_OF_SETS = 8;
const LEAF_LEVEL_SHIFT = 3;
const NON_LEAF_ENTRY_SLOT_INDICATORS_OFFSET = 0;
const NON_LEAF_ENTRY_HEADER_SIZE_IN_SHORTS = 1;
const PACKED_ARRAY_GROWTH_INCREMENT = 16;
const PACKED_ARRAY_GROWTH_FRACTION_POW2 = 4;
const { pow, ceil, log2, max } = Math;
const bitCount = (n) => {
    var bits = 0;
    while (n !== 0) {
        bits += bitCount32(n | 0);
        n /= 0x100000000;
    }
    return bits;
};
const bitCount32 = (n) => {
    n = n - ((n >> 1) & 0x55555555);
    n = (n & 0x33333333) + ((n >> 2) & 0x33333333);
    return (((n + (n >> 4)) & 0xf0f0f0f) * 0x1010101) >> 24;
};
class PackedArrayContext {
    constructor(virtualLength, initialPhysicalLength) {
        this.populatedShortLength = 0;
        this.topLevelShift = Number.MAX_VALUE; // Make it non-sensical until properly initialized.
        this.physicalLength = Math.max(initialPhysicalLength, exports.MINIMUM_INITIAL_PACKED_ARRAY_CAPACITY);
        this.isPacked =
            this.physicalLength <= MAX_SUPPORTED_PACKED_COUNTS_ARRAY_LENGTH;
        if (!this.isPacked) {
            this.physicalLength = virtualLength;
        }
        this.array = new ArrayBuffer(this.physicalLength * 8);
        this.initArrayViews(this.array);
        this.init(virtualLength);
    }
    initArrayViews(array) {
        this.byteArray = new Uint8Array(array);
        this.shortArray = new Uint16Array(array);
        this.longArray = new Float64Array(array);
    }
    init(virtualLength) {
        if (!this.isPacked) {
            // Deal with non-packed context init:
            this.virtualLength = virtualLength;
            return;
        }
        this.populatedShortLength = SET_0_START_INDEX + 8;
        // Populate empty root entries, and point to them from the root indexes:
        for (let i = 0; i < NUMBER_OF_SETS; i++) {
            this.setAtShortIndex(SET_0_START_INDEX + i, 0);
        }
        this.setVirtualLength(virtualLength);
    }
    clear() {
        this.byteArray.fill(0);
        this.init(this.virtualLength);
    }
    copyAndIncreaseSize(newPhysicalArrayLength, newVirtualArrayLength) {
        const ctx = new PackedArrayContext(newVirtualArrayLength, newPhysicalArrayLength);
        if (this.isPacked) {
            ctx.populateEquivalentEntriesWithEntriesFromOther(this);
        }
        return ctx;
    }
    getPopulatedShortLength() {
        return this.populatedShortLength;
    }
    getPopulatedLongLength() {
        return (this.getPopulatedShortLength() + 3) >> 2; // round up
    }
    setAtByteIndex(byteIndex, value) {
        this.byteArray[byteIndex] = value;
    }
    getAtByteIndex(byteIndex) {
        return this.byteArray[byteIndex];
    }
    /**
     * add a byte value to a current byte value in the array
     * @param byteIndex index of byte value to add to
     * @param valueToAdd byte value to add
     * @return the afterAddValue. ((afterAddValue & 0x100) != 0) indicates a carry.
     */
    addAtByteIndex(byteIndex, valueToAdd) {
        const newValue = this.byteArray[byteIndex] + valueToAdd;
        this.byteArray[byteIndex] = newValue;
        return newValue;
    }
    setPopulatedLongLength(newPopulatedLongLength) {
        this.populatedShortLength = newPopulatedLongLength << 2;
    }
    getVirtualLength() {
        return this.virtualLength;
    }
    length() {
        return this.physicalLength;
    }
    setAtShortIndex(shortIndex, value) {
        this.shortArray[shortIndex] = value;
    }
    setAtLongIndex(longIndex, value) {
        this.longArray[longIndex] = value;
    }
    getAtShortIndex(shortIndex) {
        return this.shortArray[shortIndex];
    }
    getIndexAtShortIndex(shortIndex) {
        return this.shortArray[shortIndex];
    }
    setPackedSlotIndicators(entryIndex, newPackedSlotIndicators) {
        this.setAtShortIndex(entryIndex + NON_LEAF_ENTRY_SLOT_INDICATORS_OFFSET, newPackedSlotIndicators);
    }
    getPackedSlotIndicators(entryIndex) {
        return (this.shortArray[entryIndex + NON_LEAF_ENTRY_SLOT_INDICATORS_OFFSET] &
            0xffff);
    }
    getIndexAtEntrySlot(entryIndex, slot) {
        return this.getAtShortIndex(entryIndex + NON_LEAF_ENTRY_HEADER_SIZE_IN_SHORTS + slot);
    }
    setIndexAtEntrySlot(entryIndex, slot, newIndexValue) {
        this.setAtShortIndex(entryIndex + NON_LEAF_ENTRY_HEADER_SIZE_IN_SHORTS + slot, newIndexValue);
    }
    expandArrayIfNeeded(entryLengthInLongs) {
        const currentLength = this.length();
        if (currentLength < this.getPopulatedLongLength() + entryLengthInLongs) {
            const growthIncrement = max(entryLengthInLongs, PACKED_ARRAY_GROWTH_INCREMENT, this.getPopulatedLongLength() >> PACKED_ARRAY_GROWTH_FRACTION_POW2);
            this.resizeArray(currentLength + growthIncrement);
        }
    }
    newEntry(entryLengthInShorts) {
        // Add entry at the end of the array:
        const newEntryIndex = this.populatedShortLength;
        this.expandArrayIfNeeded((entryLengthInShorts >> 2) + 1);
        this.populatedShortLength = newEntryIndex + entryLengthInShorts;
        for (let i = 0; i < entryLengthInShorts; i++) {
            this.setAtShortIndex(newEntryIndex + i, -1); // Poison value -1. Must be overriden before reads
        }
        return newEntryIndex;
    }
    newLeafEntry() {
        // Add entry at the end of the array:
        let newEntryIndex;
        newEntryIndex = this.getPopulatedLongLength();
        this.expandArrayIfNeeded(1);
        this.setPopulatedLongLength(newEntryIndex + 1);
        this.setAtLongIndex(newEntryIndex, 0);
        return newEntryIndex;
    }
    /**
     * Consolidate entry with previous entry verison if one exists
     *
     * @param entryIndex The shortIndex of the entry to be consolidated
     * @param previousVersionIndex the index of the previous version of the entry
     */
    consolidateEntry(entryIndex, previousVersionIndex) {
        const previousVersionPackedSlotsIndicators = this.getPackedSlotIndicators(previousVersionIndex);
        // Previous version exists, needs consolidation
        const packedSlotsIndicators = this.getPackedSlotIndicators(entryIndex);
        const insertedSlotMask = packedSlotsIndicators ^ previousVersionPackedSlotsIndicators; // the only bit that differs
        const slotsBelowBitNumber = packedSlotsIndicators & (insertedSlotMask - 1);
        const insertedSlotIndex = bitCount(slotsBelowBitNumber);
        const numberOfSlotsInEntry = bitCount(packedSlotsIndicators);
        // Copy the entry slots from previous version, skipping the newly inserted slot in the target:
        let sourceSlot = 0;
        for (let targetSlot = 0; targetSlot < numberOfSlotsInEntry; targetSlot++) {
            if (targetSlot !== insertedSlotIndex) {
                const indexAtSlot = this.getIndexAtEntrySlot(previousVersionIndex, sourceSlot);
                if (indexAtSlot !== 0) {
                    this.setIndexAtEntrySlot(entryIndex, targetSlot, indexAtSlot);
                }
                sourceSlot++;
            }
        }
    }
    /**
     * Expand entry as indicated.
     *
     * @param existingEntryIndex the index of the entry
     * @param entryPointerIndex  index to the slot pointing to the entry (needs to be fixed up)
     * @param insertedSlotIndex  realtive [packed] index of slot being inserted into entry
     * @param insertedSlotMask   mask value fo slot being inserted
     * @param nextLevelIsLeaf    the level below this one is a leaf level
     * @return the updated index of the entry (-1 if epansion failed due to conflict)
     * @throws RetryException if expansion fails due to concurrent conflict, and caller should try again.
     */
    expandEntry(existingEntryIndex, entryPointerIndex, insertedSlotIndex, insertedSlotMask, nextLevelIsLeaf) {
        let packedSlotIndicators = this.getAtShortIndex(existingEntryIndex) & 0xffff;
        packedSlotIndicators |= insertedSlotMask;
        const numberOfslotsInExpandedEntry = bitCount(packedSlotIndicators);
        if (insertedSlotIndex >= numberOfslotsInExpandedEntry) {
            throw new Error("inserted slot index is out of range given provided masks");
        }
        const expandedEntryLength = numberOfslotsInExpandedEntry + NON_LEAF_ENTRY_HEADER_SIZE_IN_SHORTS;
        // Create new next-level entry to refer to from slot at this level:
        let indexOfNewNextLevelEntry = 0;
        if (nextLevelIsLeaf) {
            indexOfNewNextLevelEntry = this.newLeafEntry(); // Establish long-index to new leaf entry
        }
        else {
            // TODO: Optimize this by creating the whole sub-tree here, rather than a step that will immediaterly expand
            // Create a new 1 word (empty, no slots set) entry for the next level:
            indexOfNewNextLevelEntry = this.newEntry(NON_LEAF_ENTRY_HEADER_SIZE_IN_SHORTS); // Establish short-index to new leaf entry
            this.setPackedSlotIndicators(indexOfNewNextLevelEntry, 0);
        }
        const insertedSlotValue = indexOfNewNextLevelEntry;
        const expandedEntryIndex = this.newEntry(expandedEntryLength);
        // populate the packed indicators word:
        this.setPackedSlotIndicators(expandedEntryIndex, packedSlotIndicators);
        // Populate the inserted slot with the index of the new next level entry:
        this.setIndexAtEntrySlot(expandedEntryIndex, insertedSlotIndex, insertedSlotValue);
        this.setAtShortIndex(entryPointerIndex, expandedEntryIndex);
        this.consolidateEntry(expandedEntryIndex, existingEntryIndex);
        return expandedEntryIndex;
    }
    //
    //   ######   ######## ########    ##     ##    ###    ##             ## #### ##    ## ########  ######## ##     ##
    //  ##    ##  ##          ##       ##     ##   ## ##   ##            ##   ##  ###   ## ##     ## ##        ##   ##
    //  ##        ##          ##       ##     ##  ##   ##  ##           ##    ##  ####  ## ##     ## ##         ## ##
    //  ##   #### ######      ##       ##     ## ##     ## ##          ##     ##  ## ## ## ##     ## ######      ###
    //  ##    ##  ##          ##        ##   ##  ######### ##         ##      ##  ##  #### ##     ## ##         ## ##
    //  ##    ##  ##          ##         ## ##   ##     ## ##        ##       ##  ##   ### ##     ## ##        ##   ##
    //   ######   ########    ##          ###    ##     ## ######## ##       #### ##    ## ########  ######## ##     ##
    //
    getRootEntry(setNumber, insertAsNeeded = false) {
        const entryPointerIndex = SET_0_START_INDEX + setNumber;
        let entryIndex = this.getIndexAtShortIndex(entryPointerIndex);
        if (entryIndex == 0) {
            if (!insertAsNeeded) {
                return 0; // Index does not currently exist in packed array;
            }
            entryIndex = this.newEntry(NON_LEAF_ENTRY_HEADER_SIZE_IN_SHORTS);
            // Create a new empty (no slots set) entry for the next level:
            this.setPackedSlotIndicators(entryIndex, 0);
            this.setAtShortIndex(entryPointerIndex, entryIndex);
        }
        return entryIndex;
    }
    /**
     * Get the byte-index (into the packed array) corresponding to a given (set tree) value byte of given virtual index.
     * Inserts new set tree nodes as needed if indicated.
     *
     * @param setNumber      The set tree number (0-7, 0 corresponding with the LSByte set tree)
     * @param virtualIndex   The virtual index into the PackedArray
     * @param insertAsNeeded If true, will insert new set tree nodes as needed if they do not already exist
     * @return the byte-index corresponding to the given (set tree) value byte of the given virtual index
     */
    getPackedIndex(setNumber, virtualIndex, insertAsNeeded) {
        if (virtualIndex >= this.virtualLength) {
            throw new Error(`Attempting access at index ${virtualIndex}, beyond virtualLength ${this.virtualLength}`);
        }
        let entryPointerIndex = SET_0_START_INDEX + setNumber; // TODO init needed ?
        let entryIndex = this.getRootEntry(setNumber, insertAsNeeded);
        if (entryIndex == 0) {
            return -1; // Index does not currently exist in packed array;
        }
        // Work down the levels of non-leaf entries:
        for (let indexShift = this.topLevelShift; indexShift >= LEAF_LEVEL_SHIFT; indexShift -= 4) {
            const nextLevelIsLeaf = indexShift === LEAF_LEVEL_SHIFT;
            // Target is a packedSlotIndicators entry
            const packedSlotIndicators = this.getPackedSlotIndicators(entryIndex);
            const slotBitNumber = (virtualIndex / pow(2, indexShift)) & 0xf; //(virtualIndex >>> indexShift) & 0xf;
            const slotMask = 1 << slotBitNumber;
            const slotsBelowBitNumber = packedSlotIndicators & (slotMask - 1);
            const slotNumber = bitCount(slotsBelowBitNumber);
            if ((packedSlotIndicators & slotMask) === 0) {
                // The entryIndex slot does not have the contents we want
                if (!insertAsNeeded) {
                    return -1; // Index does not currently exist in packed array;
                }
                // Expand the entry, adding the index to new entry at the proper slot:
                entryIndex = this.expandEntry(entryIndex, entryPointerIndex, slotNumber, slotMask, nextLevelIsLeaf);
            }
            // Next level's entry pointer index is in the appropriate slot in in the entries array in this entry:
            entryPointerIndex =
                entryIndex + NON_LEAF_ENTRY_HEADER_SIZE_IN_SHORTS + slotNumber;
            entryIndex = this.getIndexAtShortIndex(entryPointerIndex);
        }
        // entryIndex is the long-index of a leaf entry that contains the value byte for the given set
        const byteIndex = (entryIndex << 3) + (virtualIndex & 0x7); // Determine byte index offset within leaf entry
        return byteIndex;
    }
    determineTopLevelShiftForVirtualLength(virtualLength) {
        const sizeMagnitude = ceil(log2(virtualLength));
        const eightsSizeMagnitude = sizeMagnitude - 3;
        let multipleOfFourSizeMagnitude = ceil(eightsSizeMagnitude / 4) * 4;
        multipleOfFourSizeMagnitude = max(multipleOfFourSizeMagnitude, 8);
        const topLevelShiftNeeded = multipleOfFourSizeMagnitude - 4 + 3;
        return topLevelShiftNeeded;
    }
    setVirtualLength(virtualLength) {
        if (!this.isPacked) {
            throw new Error("Should never be adjusting the virtual size of a non-packed context");
        }
        this.topLevelShift = this.determineTopLevelShiftForVirtualLength(virtualLength);
        this.virtualLength = virtualLength;
    }
    getTopLevelShift() {
        return this.topLevelShift;
    }
    //
    //  ##     ##         ########   #######  ########  ##     ## ##          ###    ######## ########
    //   ##   ##          ##     ## ##     ## ##     ## ##     ## ##         ## ##      ##    ##
    //    ## ##           ##     ## ##     ## ##     ## ##     ## ##        ##   ##     ##    ##
    //     ###    ####### ########  ##     ## ########  ##     ## ##       ##     ##    ##    ######
    //    ## ##           ##        ##     ## ##        ##     ## ##       #########    ##    ##
    //   ##   ##          ##        ##     ## ##        ##     ## ##       ##     ##    ##    ##
    //  ##     ##         ##         #######  ##         #######  ######## ##     ##    ##    ########
    //
    resizeArray(newLength) {
        const tmp = new Uint8Array(newLength * 8);
        tmp.set(this.byteArray);
        this.array = tmp.buffer;
        this.initArrayViews(this.array);
        this.physicalLength = newLength;
    }
    populateEquivalentEntriesWithEntriesFromOther(other) {
        if (this.virtualLength < other.getVirtualLength()) {
            throw new Error("Cannot populate array of smaller virtual length");
        }
        for (let i = 0; i < NUMBER_OF_SETS; i++) {
            const otherEntryIndex = other.getAtShortIndex(SET_0_START_INDEX + i);
            if (otherEntryIndex == 0)
                continue; // No tree to duplicate
            let entryIndexPointer = SET_0_START_INDEX + i;
            for (let i = this.topLevelShift; i > other.topLevelShift; i -= 4) {
                // for each inserted level:
                // Allocate entry in other:
                const sizeOfEntry = NON_LEAF_ENTRY_HEADER_SIZE_IN_SHORTS + 1;
                const newEntryIndex = this.newEntry(sizeOfEntry);
                // Link new level in.
                this.setAtShortIndex(entryIndexPointer, newEntryIndex);
                // Populate new level entry, use pointer to slot 0 as place to populate under:
                this.setPackedSlotIndicators(newEntryIndex, 0x1); // Slot 0 populated
                entryIndexPointer =
                    newEntryIndex + NON_LEAF_ENTRY_HEADER_SIZE_IN_SHORTS; // Where the slot 0 index goes.
            }
            this.copyEntriesAtLevelFromOther(other, otherEntryIndex, entryIndexPointer, other.topLevelShift);
        }
    }
    copyEntriesAtLevelFromOther(other, otherLevelEntryIndex, levelEntryIndexPointer, otherIndexShift) {
        const nextLevelIsLeaf = otherIndexShift == LEAF_LEVEL_SHIFT;
        const packedSlotIndicators = other.getPackedSlotIndicators(otherLevelEntryIndex);
        const numberOfSlots = bitCount(packedSlotIndicators);
        const sizeOfEntry = NON_LEAF_ENTRY_HEADER_SIZE_IN_SHORTS + numberOfSlots;
        const entryIndex = this.newEntry(sizeOfEntry);
        this.setAtShortIndex(levelEntryIndexPointer, entryIndex);
        this.setAtShortIndex(entryIndex + NON_LEAF_ENTRY_SLOT_INDICATORS_OFFSET, packedSlotIndicators);
        for (let i = 0; i < numberOfSlots; i++) {
            if (nextLevelIsLeaf) {
                // Make leaf in other:
                const leafEntryIndex = this.newLeafEntry();
                this.setIndexAtEntrySlot(entryIndex, i, leafEntryIndex);
                // OPTIM
                // avoid iteration on all the values of the source ctx
                const otherNextLevelEntryIndex = other.getIndexAtEntrySlot(otherLevelEntryIndex, i);
                this.longArray[leafEntryIndex] =
                    other.longArray[otherNextLevelEntryIndex];
            }
            else {
                const otherNextLevelEntryIndex = other.getIndexAtEntrySlot(otherLevelEntryIndex, i);
                this.copyEntriesAtLevelFromOther(other, otherNextLevelEntryIndex, entryIndex + NON_LEAF_ENTRY_HEADER_SIZE_IN_SHORTS + i, otherIndexShift - 4);
            }
        }
    }
    getAtUnpackedIndex(index) {
        return this.longArray[index];
    }
    setAtUnpackedIndex(index, newValue) {
        this.longArray[index] = newValue;
    }
    lazysetAtUnpackedIndex(index, newValue) {
        this.longArray[index] = newValue;
    }
    incrementAndGetAtUnpackedIndex(index) {
        this.longArray[index]++;
        return this.longArray[index];
    }
    addAndGetAtUnpackedIndex(index, valueToAdd) {
        this.longArray[index] += valueToAdd;
        return this.longArray[index];
    }
    //
    //   ########  #######           ######  ######## ########  #### ##    ##  ######
    //      ##    ##     ##         ##    ##    ##    ##     ##  ##  ###   ## ##    ##
    //      ##    ##     ##         ##          ##    ##     ##  ##  ####  ## ##
    //      ##    ##     ## #######  ######     ##    ########   ##  ## ## ## ##   ####
    //      ##    ##     ##               ##    ##    ##   ##    ##  ##  #### ##    ##
    //      ##    ##     ##         ##    ##    ##    ##    ##   ##  ##   ### ##    ##
    //      ##     #######           ######     ##    ##     ## #### ##    ##  ######
    //
    nonLeafEntryToString(entryIndex, indexShift, indentLevel) {
        let output = "";
        for (let i = 0; i < indentLevel; i++) {
            output += "  ";
        }
        try {
            const packedSlotIndicators = this.getPackedSlotIndicators(entryIndex);
            output += `slotIndiators: 0x${toHex(packedSlotIndicators)}, prevVersionIndex: 0: [ `;
            const numberOfslotsInEntry = bitCount(packedSlotIndicators);
            for (let i = 0; i < numberOfslotsInEntry; i++) {
                output += this.getIndexAtEntrySlot(entryIndex, i);
                if (i < numberOfslotsInEntry - 1) {
                    output += ", ";
                }
            }
            output += ` ] (indexShift = ${indexShift})\n`;
            const nextLevelIsLeaf = indexShift == LEAF_LEVEL_SHIFT;
            for (let i = 0; i < numberOfslotsInEntry; i++) {
                const nextLevelEntryIndex = this.getIndexAtEntrySlot(entryIndex, i);
                if (nextLevelIsLeaf) {
                    output += this.leafEntryToString(nextLevelEntryIndex, indentLevel + 4);
                }
                else {
                    output += this.nonLeafEntryToString(nextLevelEntryIndex, indexShift - 4, indentLevel + 4);
                }
            }
        }
        catch (ex) {
            output += `Exception thrown at nonLeafEnty at index ${entryIndex} with indexShift ${indexShift}\n`;
        }
        return output;
    }
    leafEntryToString(entryIndex, indentLevel) {
        let output = "";
        for (let i = 0; i < indentLevel; i++) {
            output += "  ";
        }
        try {
            output += "Leaf bytes : ";
            for (let i = 0; i < 8; i++) {
                output += `0x${toHex(this.byteArray[entryIndex * 8 + i])} `;
            }
            output += "\n";
        }
        catch (ex) {
            output += `Exception thrown at leafEnty at index ${entryIndex}\n`;
        }
        return output;
    }
    toString() {
        let output = "PackedArrayContext:\n";
        if (!this.isPacked) {
            return output + "Context is unpacked:\n"; // unpackedToString();
        }
        for (let setNumber = 0; setNumber < NUMBER_OF_SETS; setNumber++) {
            try {
                const entryPointerIndex = SET_0_START_INDEX + setNumber;
                const entryIndex = this.getIndexAtShortIndex(entryPointerIndex);
                output += `Set ${setNumber}: root = ${entryIndex} \n`;
                if (entryIndex == 0)
                    continue;
                output += this.nonLeafEntryToString(entryIndex, this.topLevelShift, 4);
            }
            catch (ex) {
                output += `Exception thrown in set ${setNumber}%d\n`;
            }
        }
        //output += recordedValuesToString();
        return output;
    }
}
exports.PackedArrayContext = PackedArrayContext;
const toHex = (n) => {
    return Number(n)
        .toString(16)
        .padStart(2, "0");
};
//# sourceMappingURL=PackedArrayContext.js.map

/***/ }),

/***/ 5127:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/*
 * This is a TypeScript port of the original Java version, which was written by
 * Gil Tene as described in
 * https://github.com/HdrHistogram/HdrHistogram
 * and released to the public domain, as explained at
 * http://creativecommons.org/publicdomain/zero/1.0/
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const ulp = (x) => Math.pow(2, Math.floor(Math.log2(x)) - 52);
exports["default"] = ulp;
//# sourceMappingURL=ulp.js.map

/***/ }),

/***/ 2842:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BINARY = void 0;
/** @internal */
exports.BINARY = "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";
//# sourceMappingURL=generated-wasm.js.map

/***/ }),

/***/ 24:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WasmHistogram = exports.webAssemblyReady = exports.initWebAssemblySync = exports.initWebAssembly = exports.webAssemblyAvailable = void 0;
const generated_wasm_1 = __nccwpck_require__(2842);
const Histogram_1 = __nccwpck_require__(8474);
// @ts-ignore
const base64 = __nccwpck_require__(6463);
// @ts-ignore
const pako = __nccwpck_require__(1726);
// @ts-ignore
const loader = __nccwpck_require__(1748);
const isNode = typeof process !== "undefined" && process.version;
// @ts-ignore
const isWorker = typeof importScripts === "function";
exports.webAssemblyAvailable = (() => {
    let available = false;
    if (isNode) {
        // nodejs
        available = "WebAssembly" in global;
    }
    else {
        // browser
        // @ts-ignore
        available = isWorker || "WebAssembly" in window;
    }
    return available;
})();
let wasm = undefined;
exports.initWebAssembly = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!exports.webAssemblyAvailable) {
        throw new Error("WebAssembly not available here!");
    }
    if (!!wasm) {
        return;
    }
    return loader
        .instantiate(pako.inflate(base64.toByteArray(generated_wasm_1.BINARY)))
        .then((w) => (wasm = w.exports || w));
});
exports.initWebAssemblySync = () => {
    if (!!wasm) {
        return;
    }
    const w = loader.instantiateSync(pako.inflate(base64.toByteArray(generated_wasm_1.BINARY)));
    wasm = w.exports || w;
};
exports.webAssemblyReady = () => !!wasm;
const defaultRequest = {
    bitBucketSize: 32,
    autoResize: true,
    lowestDiscernibleValue: 1,
    highestTrackableValue: 2,
    numberOfSignificantValueDigits: 3
};
const remoteHistogramClassFor = (size) => size === "packed" ? "PackedHistogram" : `Histogram${size}`;
const destroyedWasmHistogram = new Proxy({}, {
    get: function (obj, prop) {
        throw new Error("Cannot use a destroyed histogram");
    }
});
class WasmHistogram {
    constructor(_wasmHistogram, _remoteHistogramClass) {
        this._wasmHistogram = _wasmHistogram;
        this._remoteHistogramClass = _remoteHistogramClass;
        this.tag = Histogram_1.NO_TAG;
    }
    static build(request = defaultRequest) {
        if (!exports.webAssemblyReady()) {
            throw new Error("WebAssembly is not ready yet!");
        }
        const parameters = Object.assign({}, defaultRequest, request);
        const remoteHistogramClass = remoteHistogramClassFor(parameters.bitBucketSize);
        return new WasmHistogram(new wasm[remoteHistogramClass](parameters.lowestDiscernibleValue, parameters.highestTrackableValue, parameters.numberOfSignificantValueDigits, parameters.autoResize), remoteHistogramClass);
    }
    static decode(data, bitBucketSize = 32, minBarForHighestTrackableValue = 0) {
        if (!exports.webAssemblyReady()) {
            throw new Error("WebAssembly is not ready yet!");
        }
        const remoteHistogramClass = remoteHistogramClassFor(bitBucketSize);
        const decodeFunc = `decode${remoteHistogramClass}`;
        const ptrArr = wasm.__retain(wasm.__allocArray(wasm.UINT8ARRAY_ID, data));
        const wasmHistogram = new WasmHistogram(wasm[remoteHistogramClass].wrap(wasm[decodeFunc](ptrArr, minBarForHighestTrackableValue)), remoteHistogramClass);
        wasm.__release(ptrArr);
        return wasmHistogram;
    }
    get numberOfSignificantValueDigits() {
        return this._wasmHistogram.numberOfSignificantValueDigits;
    }
    get autoResize() {
        return !!this._wasmHistogram.autoResize;
    }
    set autoResize(resize) {
        this._wasmHistogram.autoResize = resize;
    }
    get highestTrackableValue() {
        return this._wasmHistogram.highestTrackableValue;
    }
    set highestTrackableValue(value) {
        this._wasmHistogram.highestTrackableValue = value;
    }
    get startTimeStampMsec() {
        return this._wasmHistogram.startTimeStampMsec;
    }
    set startTimeStampMsec(value) {
        this._wasmHistogram.startTimeStampMsec = value;
    }
    get endTimeStampMsec() {
        return this._wasmHistogram.endTimeStampMsec;
    }
    set endTimeStampMsec(value) {
        this._wasmHistogram.endTimeStampMsec = value;
    }
    get totalCount() {
        return this._wasmHistogram.totalCount;
    }
    get stdDeviation() {
        return this._wasmHistogram.stdDeviation;
    }
    get mean() {
        return this._wasmHistogram.mean;
    }
    get estimatedFootprintInBytes() {
        return 192 + this._wasmHistogram.estimatedFootprintInBytes;
    }
    get minNonZeroValue() {
        return this._wasmHistogram.minNonZeroValue;
    }
    get maxValue() {
        return this._wasmHistogram.maxValue;
    }
    recordValue(value) {
        this._wasmHistogram.recordValue(value);
    }
    recordValueWithCount(value, count) {
        this._wasmHistogram.recordValueWithCount(value, count);
    }
    recordValueWithExpectedInterval(value, expectedIntervalBetweenValueSamples) {
        this._wasmHistogram.recordValueWithExpectedInterval(value, expectedIntervalBetweenValueSamples);
    }
    getValueAtPercentile(percentile) {
        return this._wasmHistogram.getValueAtPercentile(percentile);
    }
    outputPercentileDistribution(percentileTicksPerHalfDistance = 5, outputValueUnitScalingRatio = 1, useCsvFormat = false) {
        // TODO csv
        if (useCsvFormat) {
            throw new Error("CSV output not supported by wasm histograms");
        }
        return wasm.__getString(this._wasmHistogram.outputPercentileDistribution(percentileTicksPerHalfDistance, outputValueUnitScalingRatio));
    }
    isDestroyed() {
        return this._wasmHistogram === destroyedWasmHistogram;
    }
    get summary() {
        return Histogram_1.toSummary(this);
    }
    toJSON() {
        return this.summary;
    }
    toString() {
        if (this.isDestroyed()) {
            return "Destroyed WASM histogram";
        }
        return `WASM ${this._remoteHistogramClass} ${JSON.stringify(this, null, 2)}`;
    }
    inspect() {
        return this.toString();
    }
    [Symbol.for("nodejs.util.inspect.custom")]() {
        return this.toString();
    }
    addWhileCorrectingForCoordinatedOmission(otherHistogram, expectedIntervalBetweenValueSamples) {
        this._wasmHistogram.addWhileCorrectingForCoordinatedOmission(otherHistogram, expectedIntervalBetweenValueSamples);
    }
    copyCorrectedForCoordinatedOmission(expectedIntervalBetweenValueSamples) {
        return new WasmHistogram(wasm[this._remoteHistogramClass].wrap(this._wasmHistogram.copyCorrectedForCoordinatedOmission(expectedIntervalBetweenValueSamples)), this._remoteHistogramClass);
    }
    add(otherHistogram) {
        if (!(otherHistogram instanceof WasmHistogram)) {
            // should be impossible to be in this situation but actually
            // TypeScript has some flaws...
            throw new Error("Cannot add a regular JS histogram to a WASM histogram");
        }
        this._wasmHistogram[`add${otherHistogram._remoteHistogramClass}`](otherHistogram._wasmHistogram);
    }
    subtract(otherHistogram) {
        if (!(otherHistogram instanceof WasmHistogram)) {
            // should be impossible to be in this situation but actually
            // TypeScript has some flaws...
            throw new Error("Cannot subtract a regular JS histogram to a WASM histogram");
        }
        this._wasmHistogram[`subtract${otherHistogram._remoteHistogramClass}`](otherHistogram._wasmHistogram);
    }
    encode() {
        const ptrArray = this._wasmHistogram.encode();
        const array = wasm.__getUint8Array(ptrArray);
        wasm.__release(ptrArray);
        return array;
    }
    reset() {
        this.tag = Histogram_1.NO_TAG;
        this._wasmHistogram.reset();
    }
    destroy() {
        wasm.__release(this._wasmHistogram);
        this._wasmHistogram = destroyedWasmHistogram;
    }
}
exports.WasmHistogram = WasmHistogram;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 6036:
/***/ ((module) => {

"use strict";


const percentiles = module.exports.percentiles = [
  0.001,
  0.01,
  0.1,
  1,
  2.5,
  10,
  25,
  50,
  75,
  90,
  97.5,
  99,
  99.9,
  99.99,
  99.999
]

module.exports.histAsObj = function (hist, total) {
  const mean = Math.ceil(getMean(hist) * 100) / 100
  const result = {
    average: mean, // added for backward compat with wrk
    mean: mean,
    stddev: Math.ceil(getStdDeviation(hist) * 100) / 100,
    min: getMin(hist),
    max: getMax(hist)
  }

  if (typeof total === 'number') {
    result.total = total
  }

  return result
}

module.exports.addPercentiles = function (hist, result) {
  percentiles.forEach(function (perc) {
    const key = ('p' + perc).replace('.', '_')
    if (typeof hist.percentile === 'function') {
      result[key] = hist.percentile(perc)
    } else if (typeof hist.getValueAtPercentile === 'function') {
      result[key] = hist.getValueAtPercentile(perc)
    }
  })

  return result
}

function getMean (hist) {
  if (typeof hist.mean === 'function') {
    return hist.mean()
  }
  if (typeof hist.getMean === 'function') {
    return hist.getMean()
  }
  return hist.mean
}

function getMin (hist) {
  if (typeof hist.min === 'function') {
    return hist.min()
  }
  return hist.minNonZeroValue
}

function getMax (hist) {
  if (typeof hist.max === 'function') {
    return hist.max()
  }
  return hist.maxValue
}

function getStdDeviation (hist) {
  if (typeof hist.stddev === 'function') {
    return hist.stddev()
  }
  if (typeof hist.getStdDeviation === 'function') {
    return hist.getStdDeviation()
  }
  return hist.stdDeviation
}


/***/ }),

/***/ 1726:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
// Top level file is just a mixin of submodules & constants


var assign    = (__nccwpck_require__(5483).assign);

var deflate   = __nccwpck_require__(7265);
var inflate   = __nccwpck_require__(6522);
var constants = __nccwpck_require__(8282);

var pako = {};

assign(pako, deflate, inflate, constants);

module.exports = pako;


/***/ }),

/***/ 7265:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";



var zlib_deflate = __nccwpck_require__(978);
var utils        = __nccwpck_require__(5483);
var strings      = __nccwpck_require__(2380);
var msg          = __nccwpck_require__(1890);
var ZStream      = __nccwpck_require__(6442);

var toString = Object.prototype.toString;

/* Public constants ==========================================================*/
/* ===========================================================================*/

var Z_NO_FLUSH      = 0;
var Z_FINISH        = 4;

var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_SYNC_FLUSH    = 2;

var Z_DEFAULT_COMPRESSION = -1;

var Z_DEFAULT_STRATEGY    = 0;

var Z_DEFLATED  = 8;

/* ===========================================================================*/


/**
 * class Deflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[deflate]],
 * [[deflateRaw]] and [[gzip]].
 **/

/* internal
 * Deflate.chunks -> Array
 *
 * Chunks of output data, if [[Deflate#onData]] not overridden.
 **/

/**
 * Deflate.result -> Uint8Array|Array
 *
 * Compressed result, generated by default [[Deflate#onData]]
 * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you
 * push a chunk with explicit flush (call [[Deflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Deflate.err -> Number
 *
 * Error code after deflate finished. 0 (Z_OK) on success.
 * You will not need it in real life, because deflate errors
 * are possible only on wrong options or bad `onData` / `onEnd`
 * custom handlers.
 **/

/**
 * Deflate.msg -> String
 *
 * Error message, if [[Deflate.err]] != 0
 **/


/**
 * new Deflate(options)
 * - options (Object): zlib deflate options.
 *
 * Creates new deflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `level`
 * - `windowBits`
 * - `memLevel`
 * - `strategy`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw deflate
 * - `gzip` (Boolean) - create gzip wrapper
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 * - `header` (Object) - custom header for gzip
 *   - `text` (Boolean) - true if compressed data believed to be text
 *   - `time` (Number) - modification time, unix timestamp
 *   - `os` (Number) - operation system code
 *   - `extra` (Array) - array of bytes with extra data (max 65536)
 *   - `name` (String) - file name (binary string)
 *   - `comment` (String) - comment (binary string)
 *   - `hcrc` (Boolean) - true if header crc should be added
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var deflate = new pako.Deflate({ level: 3});
 *
 * deflate.push(chunk1, false);
 * deflate.push(chunk2, true);  // true -> last chunk
 *
 * if (deflate.err) { throw new Error(deflate.err); }
 *
 * console.log(deflate.result);
 * ```
 **/
function Deflate(options) {
  if (!(this instanceof Deflate)) return new Deflate(options);

  this.options = utils.assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY,
    to: ''
  }, options || {});

  var opt = this.options;

  if (opt.raw && (opt.windowBits > 0)) {
    opt.windowBits = -opt.windowBits;
  }

  else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
    opt.windowBits += 16;
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm = new ZStream();
  this.strm.avail_out = 0;

  var status = zlib_deflate.deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy
  );

  if (status !== Z_OK) {
    throw new Error(msg[status]);
  }

  if (opt.header) {
    zlib_deflate.deflateSetHeader(this.strm, opt.header);
  }

  if (opt.dictionary) {
    var dict;
    // Convert data if needed
    if (typeof opt.dictionary === 'string') {
      // If we need to compress text, change encoding to utf8.
      dict = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }

    status = zlib_deflate.deflateSetDictionary(this.strm, dict);

    if (status !== Z_OK) {
      throw new Error(msg[status]);
    }

    this._dict_set = true;
  }
}

/**
 * Deflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
 *   converted to utf8 byte sequence.
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
 *
 * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
 * new compressed chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the compression context.
 *
 * On fail call [[Deflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * array format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Deflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var status, _mode;

  if (this.ended) { return false; }

  _mode = (mode === ~~mode) ? mode : ((mode === true) ? Z_FINISH : Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // If we need to compress text, change encoding to utf8.
    strm.input = strings.string2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = zlib_deflate.deflate(strm, _mode);    /* no bad return value */

    if (status !== Z_STREAM_END && status !== Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }
    if (strm.avail_out === 0 || (strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH))) {
      if (this.options.to === 'string') {
        this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
      } else {
        this.onData(utils.shrinkBuf(strm.output, strm.next_out));
      }
    }
  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);

  // Finalize on the last chunk.
  if (_mode === Z_FINISH) {
    status = zlib_deflate.deflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === Z_SYNC_FLUSH) {
    this.onEnd(Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Deflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): output data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Deflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Deflate#onEnd(status) -> Void
 * - status (Number): deflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called once after you tell deflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Deflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === Z_OK) {
    if (this.options.to === 'string') {
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * deflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * Compress `data` with deflate algorithm and `options`.
 *
 * Supported options are:
 *
 * - level
 * - windowBits
 * - memLevel
 * - strategy
 * - dictionary
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
 *
 * console.log(pako.deflate(data));
 * ```
 **/
function deflate(input, options) {
  var deflator = new Deflate(options);

  deflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (deflator.err) { throw deflator.msg || msg[deflator.err]; }

  return deflator.result;
}


/**
 * deflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function deflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return deflate(input, options);
}


/**
 * gzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but create gzip wrapper instead of
 * deflate one.
 **/
function gzip(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate(input, options);
}


exports.Deflate = Deflate;
exports.deflate = deflate;
exports.deflateRaw = deflateRaw;
exports.gzip = gzip;


/***/ }),

/***/ 6522:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";



var zlib_inflate = __nccwpck_require__(409);
var utils        = __nccwpck_require__(5483);
var strings      = __nccwpck_require__(2380);
var c            = __nccwpck_require__(8282);
var msg          = __nccwpck_require__(1890);
var ZStream      = __nccwpck_require__(6442);
var GZheader     = __nccwpck_require__(5105);

var toString = Object.prototype.toString;

/**
 * class Inflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[inflate]]
 * and [[inflateRaw]].
 **/

/* internal
 * inflate.chunks -> Array
 *
 * Chunks of output data, if [[Inflate#onData]] not overridden.
 **/

/**
 * Inflate.result -> Uint8Array|Array|String
 *
 * Uncompressed result, generated by default [[Inflate#onData]]
 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
 * push a chunk with explicit flush (call [[Inflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Inflate.err -> Number
 *
 * Error code after inflate finished. 0 (Z_OK) on success.
 * Should be checked if broken data possible.
 **/

/**
 * Inflate.msg -> String
 *
 * Error message, if [[Inflate.err]] != 0
 **/


/**
 * new Inflate(options)
 * - options (Object): zlib inflate options.
 *
 * Creates new inflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `windowBits`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw inflate
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 * By default, when no options set, autodetect deflate/gzip data format via
 * wrapper header.
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var inflate = new pako.Inflate({ level: 3});
 *
 * inflate.push(chunk1, false);
 * inflate.push(chunk2, true);  // true -> last chunk
 *
 * if (inflate.err) { throw new Error(inflate.err); }
 *
 * console.log(inflate.result);
 * ```
 **/
function Inflate(options) {
  if (!(this instanceof Inflate)) return new Inflate(options);

  this.options = utils.assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ''
  }, options || {});

  var opt = this.options;

  // Force window size for `raw` data, if not set directly,
  // because we have no header for autodetect.
  if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) { opt.windowBits = -15; }
  }

  // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
  if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
      !(options && options.windowBits)) {
    opt.windowBits += 32;
  }

  // Gzip header has no info about windows size, we can do autodetect only
  // for deflate. So, if window size not set, force it to max when gzip possible
  if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
    // bit 3 (16) -> gzipped data
    // bit 4 (32) -> autodetect gzip/deflate
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm   = new ZStream();
  this.strm.avail_out = 0;

  var status  = zlib_inflate.inflateInit2(
    this.strm,
    opt.windowBits
  );

  if (status !== c.Z_OK) {
    throw new Error(msg[status]);
  }

  this.header = new GZheader();

  zlib_inflate.inflateGetHeader(this.strm, this.header);

  // Setup dictionary
  if (opt.dictionary) {
    // Convert data if needed
    if (typeof opt.dictionary === 'string') {
      opt.dictionary = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
      opt.dictionary = new Uint8Array(opt.dictionary);
    }
    if (opt.raw) { //In raw mode we need to set the dictionary early
      status = zlib_inflate.inflateSetDictionary(this.strm, opt.dictionary);
      if (status !== c.Z_OK) {
        throw new Error(msg[status]);
      }
    }
  }
}

/**
 * Inflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
 *
 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
 * new output chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the decompression context.
 *
 * On fail call [[Inflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Inflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var dictionary = this.options.dictionary;
  var status, _mode;
  var next_out_utf8, tail, utf8str;

  // Flag to properly process Z_BUF_ERROR on testing inflate call
  // when we check that all output data was flushed.
  var allowBufError = false;

  if (this.ended) { return false; }
  _mode = (mode === ~~mode) ? mode : ((mode === true) ? c.Z_FINISH : c.Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // Only binary strings can be decompressed on practice
    strm.input = strings.binstring2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }

    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);    /* no bad return value */

    if (status === c.Z_NEED_DICT && dictionary) {
      status = zlib_inflate.inflateSetDictionary(this.strm, dictionary);
    }

    if (status === c.Z_BUF_ERROR && allowBufError === true) {
      status = c.Z_OK;
      allowBufError = false;
    }

    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }

    if (strm.next_out) {
      if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) {

        if (this.options.to === 'string') {

          next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

          tail = strm.next_out - next_out_utf8;
          utf8str = strings.buf2string(strm.output, next_out_utf8);

          // move tail
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) { utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0); }

          this.onData(utf8str);

        } else {
          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
        }
      }
    }

    // When no more input data, we should check that internal inflate buffers
    // are flushed. The only way to do it when avail_out = 0 - run one more
    // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
    // Here we set flag to process this error properly.
    //
    // NOTE. Deflate does not return error in this case and does not needs such
    // logic.
    if (strm.avail_in === 0 && strm.avail_out === 0) {
      allowBufError = true;
    }

  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);

  if (status === c.Z_STREAM_END) {
    _mode = c.Z_FINISH;
  }

  // Finalize on the last chunk.
  if (_mode === c.Z_FINISH) {
    status = zlib_inflate.inflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === c.Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === c.Z_SYNC_FLUSH) {
    this.onEnd(c.Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Inflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): output data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Inflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Inflate#onEnd(status) -> Void
 * - status (Number): inflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called either after you tell inflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Inflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === c.Z_OK) {
    if (this.options.to === 'string') {
      // Glue & convert here, until we teach pako to send
      // utf8 aligned strings to onData
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * inflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Decompress `data` with inflate/ungzip and `options`. Autodetect
 * format via wrapper header by default. That's why we don't provide
 * separate `ungzip` method.
 *
 * Supported options are:
 *
 * - windowBits
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
 *   , output;
 *
 * try {
 *   output = pako.inflate(input);
 * } catch (err)
 *   console.log(err);
 * }
 * ```
 **/
function inflate(input, options) {
  var inflator = new Inflate(options);

  inflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (inflator.err) { throw inflator.msg || msg[inflator.err]; }

  return inflator.result;
}


/**
 * inflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * The same as [[inflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function inflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return inflate(input, options);
}


/**
 * ungzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Just shortcut to [[inflate]], because it autodetects format
 * by header.content. Done for convenience.
 **/


exports.Inflate = Inflate;
exports.inflate = inflate;
exports.inflateRaw = inflateRaw;
exports.ungzip  = inflate;


/***/ }),

/***/ 5483:
/***/ ((__unused_webpack_module, exports) => {

"use strict";



var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
                (typeof Uint16Array !== 'undefined') &&
                (typeof Int32Array !== 'undefined');

function _has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

exports.assign = function (obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    var source = sources.shift();
    if (!source) { continue; }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be non-object');
    }

    for (var p in source) {
      if (_has(source, p)) {
        obj[p] = source[p];
      }
    }
  }

  return obj;
};


// reduce buffer size, avoiding mem copy
exports.shrinkBuf = function (buf, size) {
  if (buf.length === size) { return buf; }
  if (buf.subarray) { return buf.subarray(0, size); }
  buf.length = size;
  return buf;
};


var fnTyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    if (src.subarray && dest.subarray) {
      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
      return;
    }
    // Fallback to ordinary array
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    var i, l, len, pos, chunk, result;

    // calculate data length
    len = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      len += chunks[i].length;
    }

    // join chunks
    result = new Uint8Array(len);
    pos = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      chunk = chunks[i];
      result.set(chunk, pos);
      pos += chunk.length;
    }

    return result;
  }
};

var fnUntyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    return [].concat.apply([], chunks);
  }
};


// Enable/Disable typed arrays use, for testing
//
exports.setTyped = function (on) {
  if (on) {
    exports.Buf8  = Uint8Array;
    exports.Buf16 = Uint16Array;
    exports.Buf32 = Int32Array;
    exports.assign(exports, fnTyped);
  } else {
    exports.Buf8  = Array;
    exports.Buf16 = Array;
    exports.Buf32 = Array;
    exports.assign(exports, fnUntyped);
  }
};

exports.setTyped(TYPED_OK);


/***/ }),

/***/ 2380:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";
// String encode/decode helpers



var utils = __nccwpck_require__(5483);


// Quick check if we can use fast array to bin string conversion
//
// - apply(Array) can fail on Android 2.2
// - apply(Uint8Array) can fail on iOS 5.1 Safari
//
var STR_APPLY_OK = true;
var STR_APPLY_UIA_OK = true;

try { String.fromCharCode.apply(null, [ 0 ]); } catch (__) { STR_APPLY_OK = false; }
try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch (__) { STR_APPLY_UIA_OK = false; }


// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
var _utf8len = new utils.Buf8(256);
for (var q = 0; q < 256; q++) {
  _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
}
_utf8len[254] = _utf8len[254] = 1; // Invalid sequence start


// convert string to array (typed, when possible)
exports.string2buf = function (str) {
  var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

  // count binary size
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }

  // allocate buffer
  buf = new utils.Buf8(buf_len);

  // convert
  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    if (c < 0x80) {
      /* one byte */
      buf[i++] = c;
    } else if (c < 0x800) {
      /* two bytes */
      buf[i++] = 0xC0 | (c >>> 6);
      buf[i++] = 0x80 | (c & 0x3f);
    } else if (c < 0x10000) {
      /* three bytes */
      buf[i++] = 0xE0 | (c >>> 12);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    } else {
      /* four bytes */
      buf[i++] = 0xf0 | (c >>> 18);
      buf[i++] = 0x80 | (c >>> 12 & 0x3f);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    }
  }

  return buf;
};

// Helper (used in 2 places)
function buf2binstring(buf, len) {
  // On Chrome, the arguments in a function call that are allowed is `65534`.
  // If the length of the buffer is smaller than that, we can use this optimization,
  // otherwise we will take a slower path.
  if (len < 65534) {
    if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
      return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
    }
  }

  var result = '';
  for (var i = 0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
}


// Convert byte array to binary string
exports.buf2binstring = function (buf) {
  return buf2binstring(buf, buf.length);
};


// Convert binary string (typed, when possible)
exports.binstring2buf = function (str) {
  var buf = new utils.Buf8(str.length);
  for (var i = 0, len = buf.length; i < len; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
};


// convert array to string
exports.buf2string = function (buf, max) {
  var i, out, c, c_len;
  var len = max || buf.length;

  // Reserve max possible length (2 words per char)
  // NB: by unknown reasons, Array is significantly faster for
  //     String.fromCharCode.apply than Uint16Array.
  var utf16buf = new Array(len * 2);

  for (out = 0, i = 0; i < len;) {
    c = buf[i++];
    // quick process ascii
    if (c < 0x80) { utf16buf[out++] = c; continue; }

    c_len = _utf8len[c];
    // skip 5 & 6 byte codes
    if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len - 1; continue; }

    // apply mask on first byte
    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
    // join the rest
    while (c_len > 1 && i < len) {
      c = (c << 6) | (buf[i++] & 0x3f);
      c_len--;
    }

    // terminated by end of string?
    if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

    if (c < 0x10000) {
      utf16buf[out++] = c;
    } else {
      c -= 0x10000;
      utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
      utf16buf[out++] = 0xdc00 | (c & 0x3ff);
    }
  }

  return buf2binstring(utf16buf, out);
};


// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
exports.utf8border = function (buf, max) {
  var pos;

  max = max || buf.length;
  if (max > buf.length) { max = buf.length; }

  // go back from last position, until start of sequence found
  pos = max - 1;
  while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

  // Very small and broken sequence,
  // return max, because we should return something anyway.
  if (pos < 0) { return max; }

  // If we came to start of buffer - that means buffer is too small,
  // return max too.
  if (pos === 0) { return max; }

  return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};


/***/ }),

/***/ 6924:
/***/ ((module) => {

"use strict";


// Note: adler32 takes 12% for level 0 and 2% for level 6.
// It isn't worth it to make additional optimizations as in original.
// Small size is preferable.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function adler32(adler, buf, len, pos) {
  var s1 = (adler & 0xffff) |0,
      s2 = ((adler >>> 16) & 0xffff) |0,
      n = 0;

  while (len !== 0) {
    // Set limit ~ twice less than 5552, to keep
    // s2 in 31-bits, because we force signed ints.
    // in other case %= will fail.
    n = len > 2000 ? 2000 : len;
    len -= n;

    do {
      s1 = (s1 + buf[pos++]) |0;
      s2 = (s2 + s1) |0;
    } while (--n);

    s1 %= 65521;
    s2 %= 65521;
  }

  return (s1 | (s2 << 16)) |0;
}


module.exports = adler32;


/***/ }),

/***/ 8282:
/***/ ((module) => {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {

  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH:         0,
  Z_PARTIAL_FLUSH:    1,
  Z_SYNC_FLUSH:       2,
  Z_FULL_FLUSH:       3,
  Z_FINISH:           4,
  Z_BLOCK:            5,
  Z_TREES:            6,

  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK:               0,
  Z_STREAM_END:       1,
  Z_NEED_DICT:        2,
  Z_ERRNO:           -1,
  Z_STREAM_ERROR:    -2,
  Z_DATA_ERROR:      -3,
  //Z_MEM_ERROR:     -4,
  Z_BUF_ERROR:       -5,
  //Z_VERSION_ERROR: -6,

  /* compression levels */
  Z_NO_COMPRESSION:         0,
  Z_BEST_SPEED:             1,
  Z_BEST_COMPRESSION:       9,
  Z_DEFAULT_COMPRESSION:   -1,


  Z_FILTERED:               1,
  Z_HUFFMAN_ONLY:           2,
  Z_RLE:                    3,
  Z_FIXED:                  4,
  Z_DEFAULT_STRATEGY:       0,

  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY:                 0,
  Z_TEXT:                   1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN:                2,

  /* The deflate compression method */
  Z_DEFLATED:               8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};


/***/ }),

/***/ 7242:
/***/ ((module) => {

"use strict";


// Note: we can't get significant speed boost here.
// So write code to minimize size - no pregenerated tables
// and array tools dependencies.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// Use ordinary array, since untyped makes no boost here
function makeTable() {
  var c, table = [];

  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[n] = c;
  }

  return table;
}

// Create table on load. Just 255 signed longs. Not a problem.
var crcTable = makeTable();


function crc32(crc, buf, len, pos) {
  var t = crcTable,
      end = pos + len;

  crc ^= -1;

  for (var i = pos; i < end; i++) {
    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
  }

  return (crc ^ (-1)); // >>> 0;
}


module.exports = crc32;


/***/ }),

/***/ 978:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils   = __nccwpck_require__(5483);
var trees   = __nccwpck_require__(8754);
var adler32 = __nccwpck_require__(6924);
var crc32   = __nccwpck_require__(7242);
var msg     = __nccwpck_require__(1890);

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
var Z_NO_FLUSH      = 0;
var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
//var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
//var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
//var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;


/* compression levels */
//var Z_NO_COMPRESSION      = 0;
//var Z_BEST_SPEED          = 1;
//var Z_BEST_COMPRESSION    = 9;
var Z_DEFAULT_COMPRESSION = -1;


var Z_FILTERED            = 1;
var Z_HUFFMAN_ONLY        = 2;
var Z_RLE                 = 3;
var Z_FIXED               = 4;
var Z_DEFAULT_STRATEGY    = 0;

/* Possible values of the data_type field (though see inflate()) */
//var Z_BINARY              = 0;
//var Z_TEXT                = 1;
//var Z_ASCII               = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;


/* The deflate compression method */
var Z_DEFLATED  = 8;

/*============================================================================*/


var MAX_MEM_LEVEL = 9;
/* Maximum value for memLevel in deflateInit2 */
var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_MEM_LEVEL = 8;


var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */
var LITERALS      = 256;
/* number of literal bytes 0..255 */
var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */
var D_CODES       = 30;
/* number of distance codes */
var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */
var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */
var MAX_BITS  = 15;
/* All codes must not exceed MAX_BITS bits */

var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

var PRESET_DICT = 0x20;

var INIT_STATE = 42;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;

var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
var BS_BLOCK_DONE     = 2; /* block flush performed */
var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

function err(strm, errorCode) {
  strm.msg = msg[errorCode];
  return errorCode;
}

function rank(f) {
  return ((f) << 1) - ((f) > 4 ? 9 : 0);
}

function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }


/* =========================================================================
 * Flush as much pending output as possible. All deflate() output goes
 * through this function so some applications may wish to modify it
 * to avoid allocating a large strm->output buffer and copying into it.
 * (See also read_buf()).
 */
function flush_pending(strm) {
  var s = strm.state;

  //_tr_flush_bits(s);
  var len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) { return; }

  utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
}


function flush_block_only(s, last) {
  trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
}


function put_byte(s, b) {
  s.pending_buf[s.pending++] = b;
}


/* =========================================================================
 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
 * IN assertion: the stream state is correct and there is enough room in
 * pending_buf.
 */
function putShortMSB(s, b) {
//  put_byte(s, (Byte)(b >> 8));
//  put_byte(s, (Byte)(b & 0xff));
  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
  s.pending_buf[s.pending++] = b & 0xff;
}


/* ===========================================================================
 * Read a new buffer from the current input stream, update the adler32
 * and total number of bytes read.  All deflate() input goes through
 * this function so some applications may wish to modify it to avoid
 * allocating a large strm->input buffer and copying from it.
 * (See also flush_pending()).
 */
function read_buf(strm, buf, start, size) {
  var len = strm.avail_in;

  if (len > size) { len = size; }
  if (len === 0) { return 0; }

  strm.avail_in -= len;

  // zmemcpy(buf, strm->next_in, len);
  utils.arraySet(buf, strm.input, strm.next_in, len, start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32(strm.adler, buf, len, start);
  }

  else if (strm.state.wrap === 2) {
    strm.adler = crc32(strm.adler, buf, len, start);
  }

  strm.next_in += len;
  strm.total_in += len;

  return len;
}


/* ===========================================================================
 * Set match_start to the longest match starting at the given string and
 * return its length. Matches shorter or equal to prev_length are discarded,
 * in which case the result is equal to prev_length and match_start is
 * garbage.
 * IN assertions: cur_match is the head of the hash chain for the current
 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
 * OUT assertion: the match length is not greater than s->lookahead.
 */
function longest_match(s, cur_match) {
  var chain_length = s.max_chain_length;      /* max hash chain length */
  var scan = s.strstart; /* current string */
  var match;                       /* matched string */
  var len;                           /* length of current match */
  var best_len = s.prev_length;              /* best match length so far */
  var nice_match = s.nice_match;             /* stop if match long enough */
  var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

  var _win = s.window; // shortcut

  var wmask = s.w_mask;
  var prev  = s.prev;

  /* Stop when cur_match becomes <= limit. To simplify the code,
   * we prevent matches with the string of window index 0.
   */

  var strend = s.strstart + MAX_MATCH;
  var scan_end1  = _win[scan + best_len - 1];
  var scan_end   = _win[scan + best_len];

  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
   * It is easy to get rid of this optimization if necessary.
   */
  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

  /* Do not waste too much time if we already have a good match: */
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  /* Do not look for matches beyond the end of the input. This is necessary
   * to make deflate deterministic.
   */
  if (nice_match > s.lookahead) { nice_match = s.lookahead; }

  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

  do {
    // Assert(cur_match < s->strstart, "no future");
    match = cur_match;

    /* Skip to next match if the match length cannot increase
     * or if the match length is less than 2.  Note that the checks below
     * for insufficient lookahead only occur occasionally for performance
     * reasons.  Therefore uninitialized memory will be accessed, and
     * conditional jumps will be made that depend on those values.
     * However the length of the match is limited to the lookahead, so
     * the output of deflate is not affected by the uninitialized values.
     */

    if (_win[match + best_len]     !== scan_end  ||
        _win[match + best_len - 1] !== scan_end1 ||
        _win[match]                !== _win[scan] ||
        _win[++match]              !== _win[scan + 1]) {
      continue;
    }

    /* The check at best_len-1 can be removed because it will be made
     * again later. (This heuristic is not always a win.)
     * It is not necessary to compare scan[2] and match[2] since they
     * are always equal when the other bytes match, given that
     * the hash keys are equal and that HASH_BITS >= 8.
     */
    scan += 2;
    match++;
    // Assert(*scan == *match, "match[2]?");

    /* We check for insufficient lookahead only every 8th comparison;
     * the 256th check will be made at strstart+258.
     */
    do {
      /*jshint noempty:false*/
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             scan < strend);

    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;

    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1  = _win[scan + best_len - 1];
      scan_end   = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
}


/* ===========================================================================
 * Fill the window when the lookahead becomes insufficient.
 * Updates strstart and lookahead.
 *
 * IN assertion: lookahead < MIN_LOOKAHEAD
 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
 *    At least one byte has been read, or avail_in == 0; reads are
 *    performed for at least two bytes (required for the zip translate_eol
 *    option -- not supported here).
 */
function fill_window(s) {
  var _w_size = s.w_size;
  var p, n, m, more, str;

  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

  do {
    more = s.window_size - s.lookahead - s.strstart;

    // JS ints have 32 bit, block below not needed
    /* Deal with !@#$% 64K limit: */
    //if (sizeof(int) <= 2) {
    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
    //        more = wsize;
    //
    //  } else if (more == (unsigned)(-1)) {
    //        /* Very unlikely, but possible on 16 bit machine if
    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
    //         */
    //        more--;
    //    }
    //}


    /* If the window is almost full and there is insufficient lookahead,
     * move the upper half to the lower one to make room in the upper half.
     */
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

      utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      /* we now have strstart >= MAX_DIST */
      s.block_start -= _w_size;

      /* Slide the hash table (could be avoided with 32 bit values
       at the expense of memory usage). We slide even when level == 0
       to keep the hash table consistent if we switch back to level > 0
       later. (Using level 0 permanently is not an optimal usage of
       zlib, so we don't care about this pathological case.)
       */

      n = s.hash_size;
      p = n;
      do {
        m = s.head[--p];
        s.head[p] = (m >= _w_size ? m - _w_size : 0);
      } while (--n);

      n = _w_size;
      p = n;
      do {
        m = s.prev[--p];
        s.prev[p] = (m >= _w_size ? m - _w_size : 0);
        /* If n is not on any hash chain, prev[n] is garbage but
         * its value will never be used.
         */
      } while (--n);

      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }

    /* If there was no sliding:
     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
     *    more == window_size - lookahead - strstart
     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
     * => more >= window_size - 2*WSIZE + 2
     * In the BIG_MEM or MMAP case (not yet supported),
     *   window_size == input_size + MIN_LOOKAHEAD  &&
     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
     * Otherwise, window_size == 2*WSIZE so more >= 2.
     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
     */
    //Assert(more >= 2, "more < 2");
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;

    /* Initialize the hash value now that we have some input: */
    if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];

      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
//#if MIN_MATCH != 3
//        Call update_hash() MIN_MATCH-3 more times
//#endif
      while (s.insert) {
        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
     * but this is not important since only literal bytes will be emitted.
     */

  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

  /* If the WIN_INIT bytes after the end of the current data have never been
   * written, then zero those bytes in order to avoid memory check reports of
   * the use of uninitialized (or uninitialised as Julian writes) bytes by
   * the longest match routines.  Update the high water mark for the next
   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
   */
//  if (s.high_water < s.window_size) {
//    var curr = s.strstart + s.lookahead;
//    var init = 0;
//
//    if (s.high_water < curr) {
//      /* Previous high water mark below current data -- zero WIN_INIT
//       * bytes or up to end of window, whichever is less.
//       */
//      init = s.window_size - curr;
//      if (init > WIN_INIT)
//        init = WIN_INIT;
//      zmemzero(s->window + curr, (unsigned)init);
//      s->high_water = curr + init;
//    }
//    else if (s->high_water < (ulg)curr + WIN_INIT) {
//      /* High water mark at or above current data, but below current data
//       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
//       * to end of window, whichever is less.
//       */
//      init = (ulg)curr + WIN_INIT - s->high_water;
//      if (init > s->window_size - s->high_water)
//        init = s->window_size - s->high_water;
//      zmemzero(s->window + s->high_water, (unsigned)init);
//      s->high_water += init;
//    }
//  }
//
//  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
//    "not enough room for search");
}

/* ===========================================================================
 * Copy without compression as much as possible from the input stream, return
 * the current block state.
 * This function does not insert new strings in the dictionary since
 * uncompressible data is probably not useful. This function is used
 * only for the level=0 compression option.
 * NOTE: this function should be optimized to avoid extra copying from
 * window to pending_buf.
 */
function deflate_stored(s, flush) {
  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
   * to pending_buf_size, and each stored block has a 5 byte header:
   */
  var max_block_size = 0xffff;

  if (max_block_size > s.pending_buf_size - 5) {
    max_block_size = s.pending_buf_size - 5;
  }

  /* Copy as much as possible from input to output: */
  for (;;) {
    /* Fill the window as much as possible: */
    if (s.lookahead <= 1) {

      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
      //  s->block_start >= (long)s->w_size, "slide too late");
//      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
//        s.block_start >= s.w_size)) {
//        throw  new Error("slide too late");
//      }

      fill_window(s);
      if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }

      if (s.lookahead === 0) {
        break;
      }
      /* flush the current block */
    }
    //Assert(s->block_start >= 0L, "block gone");
//    if (s.block_start < 0) throw new Error("block gone");

    s.strstart += s.lookahead;
    s.lookahead = 0;

    /* Emit a stored block if pending_buf will be full: */
    var max_start = s.block_start + max_block_size;

    if (s.strstart === 0 || s.strstart >= max_start) {
      /* strstart == 0 is possible when wraparound on 16-bit machine */
      s.lookahead = s.strstart - max_start;
      s.strstart = max_start;
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/


    }
    /* Flush if we may have to slide, otherwise block_start may become
     * negative and the data will be gone:
     */
    if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }

  s.insert = 0;

  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }

  if (s.strstart > s.block_start) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_NEED_MORE;
}

/* ===========================================================================
 * Compress as much as possible from the input stream, return the current
 * block state.
 * This function does not perform lazy evaluation of matches and inserts
 * new strings in the dictionary only for unmatched strings or for short
 * matches. It is used only for the fast compression options.
 */
function deflate_fast(s, flush) {
  var hash_head;        /* head of the hash chain */
  var bflush;           /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break; /* flush the current block */
      }
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     * At this point we have always match_length < MIN_MATCH
     */
    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */
    }
    if (s.match_length >= MIN_MATCH) {
      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

      /*** _tr_tally_dist(s, s.strstart - s.match_start,
                     s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;

      /* Insert new strings in the hash table only if the match length
       * is not too large. This saves time but degrades compression.
       */
      if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
        s.match_length--; /* string at strstart already in table */
        do {
          s.strstart++;
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
           * always MIN_MATCH bytes ahead.
           */
        } while (--s.match_length !== 0);
        s.strstart++;
      } else
      {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

//#if MIN_MATCH != 3
//                Call UPDATE_HASH() MIN_MATCH-3 more times
//#endif
        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
         * matter since it will be recomputed at next deflate call.
         */
      }
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s.window[s.strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * Same as above, but achieves better compression. We use a lazy
 * evaluation for matches: a match is finally adopted only if there is
 * no better match at the next window position.
 */
function deflate_slow(s, flush) {
  var hash_head;          /* head of hash chain */
  var bflush;              /* set if current block must be flushed */

  var max_insert;

  /* Process the input block. */
  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     */
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH - 1;

    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
        s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */

      if (s.match_length <= 5 &&
         (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

        /* If prev_match is also MIN_MATCH, match_start is garbage
         * but we will ignore the current match anyway.
         */
        s.match_length = MIN_MATCH - 1;
      }
    }
    /* If there was a match at the previous step and the current
     * match is not better, output the previous match:
     */
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      /* Do not insert strings in hash table beyond this. */

      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                     s.prev_length - MIN_MATCH, bflush);***/
      bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
      /* Insert in hash table all strings up to the end of the match.
       * strstart-1 and strstart are already inserted. If there is not
       * enough lookahead, the last two strings are not inserted in
       * the hash table.
       */
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH - 1;
      s.strstart++;

      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }

    } else if (s.match_available) {
      /* If there was no match at the previous position, output a
       * single literal. If there was a match but the current match
       * is longer, truncate the previous match to a single literal.
       */
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

      if (bflush) {
        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
        flush_block_only(s, false);
        /***/
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      /* There is no previous match to compare with, wait for
       * the next step to decide.
       */
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  //Assert (flush != Z_NO_FLUSH, "no flush?");
  if (s.match_available) {
    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_BLOCK_DONE;
}


/* ===========================================================================
 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
 * deflate switches away from Z_RLE.)
 */
function deflate_rle(s, flush) {
  var bflush;            /* set if current block must be flushed */
  var prev;              /* byte at distance one to match */
  var scan, strend;      /* scan goes up to strend for length of run */

  var _win = s.window;

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the longest run, plus one for the unrolled loop.
     */
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* See how many times the previous byte repeats */
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {
          /*jshint noempty:false*/
        } while (prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
    }

    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
    if (s.match_length >= MIN_MATCH) {
      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s->window[s->strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
 * (It will be regenerated if this run of deflate switches away from Huffman.)
 */
function deflate_huff(s, flush) {
  var bflush;             /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we have a literal to write. */
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        break;      /* flush the current block */
      }
    }

    /* Output a literal byte */
    s.match_length = 0;
    //Tracevv((stderr,"%c", s->window[s->strstart]));
    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* Values for max_lazy_match, good_match and max_chain_length, depending on
 * the desired pack level (0..9). The values given below have been tuned to
 * exclude worst case performance for pathological files. Better values may be
 * found for specific files.
 */
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}

var configuration_table;

configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

  new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
];


/* ===========================================================================
 * Initialize the "longest match" routines for a new zlib stream
 */
function lm_init(s) {
  s.window_size = 2 * s.w_size;

  /*** CLEAR_HASH(s); ***/
  zero(s.head); // Fill with NIL (= 0);

  /* Set the default configuration parameters:
   */
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;

  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
}


function DeflateState() {
  this.strm = null;            /* pointer back to this zlib stream */
  this.status = 0;            /* as the name implies */
  this.pending_buf = null;      /* output still pending */
  this.pending_buf_size = 0;  /* size of pending_buf */
  this.pending_out = 0;       /* next pending byte to output to the stream */
  this.pending = 0;           /* nb of bytes in the pending buffer */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.gzhead = null;         /* gzip header information to write */
  this.gzindex = 0;           /* where in extra, name, or comment */
  this.method = Z_DEFLATED; /* can only be DEFLATED */
  this.last_flush = -1;   /* value of flush param for previous deflate call */

  this.w_size = 0;  /* LZ77 window size (32K by default) */
  this.w_bits = 0;  /* log2(w_size)  (8..16) */
  this.w_mask = 0;  /* w_size - 1 */

  this.window = null;
  /* Sliding window. Input bytes are read into the second half of the window,
   * and move to the first half later to keep a dictionary of at least wSize
   * bytes. With this organization, matches are limited to a distance of
   * wSize-MAX_MATCH bytes, but this ensures that IO is always
   * performed with a length multiple of the block size.
   */

  this.window_size = 0;
  /* Actual size of window: 2*wSize, except when the user input buffer
   * is directly used as sliding window.
   */

  this.prev = null;
  /* Link to older string with same hash index. To limit the size of this
   * array to 64K, this link is maintained only for the last 32K strings.
   * An index in this array is thus a window index modulo 32K.
   */

  this.head = null;   /* Heads of the hash chains or NIL. */

  this.ins_h = 0;       /* hash index of string to be inserted */
  this.hash_size = 0;   /* number of elements in hash table */
  this.hash_bits = 0;   /* log2(hash_size) */
  this.hash_mask = 0;   /* hash_size-1 */

  this.hash_shift = 0;
  /* Number of bits by which ins_h must be shifted at each input
   * step. It must be such that after MIN_MATCH steps, the oldest
   * byte no longer takes part in the hash key, that is:
   *   hash_shift * MIN_MATCH >= hash_bits
   */

  this.block_start = 0;
  /* Window position at the beginning of the current output block. Gets
   * negative when the window is moved backwards.
   */

  this.match_length = 0;      /* length of best match */
  this.prev_match = 0;        /* previous match */
  this.match_available = 0;   /* set if previous match exists */
  this.strstart = 0;          /* start of string to insert */
  this.match_start = 0;       /* start of matching string */
  this.lookahead = 0;         /* number of valid bytes ahead in window */

  this.prev_length = 0;
  /* Length of the best match at previous step. Matches not greater than this
   * are discarded. This is used in the lazy match evaluation.
   */

  this.max_chain_length = 0;
  /* To speed up deflation, hash chains are never searched beyond this
   * length.  A higher limit improves compression ratio but degrades the
   * speed.
   */

  this.max_lazy_match = 0;
  /* Attempt to find a better match only when the current match is strictly
   * smaller than this value. This mechanism is used only for compression
   * levels >= 4.
   */
  // That's alias to max_lazy_match, don't use directly
  //this.max_insert_length = 0;
  /* Insert new strings in the hash table only if the match length is not
   * greater than this length. This saves time but degrades compression.
   * max_insert_length is used only for compression levels <= 3.
   */

  this.level = 0;     /* compression level (1..9) */
  this.strategy = 0;  /* favor or force Huffman coding*/

  this.good_match = 0;
  /* Use a faster search when the previous match is longer than this */

  this.nice_match = 0; /* Stop searching when current match exceeds this */

              /* used by trees.c: */

  /* Didn't use ct_data typedef below to suppress compiler warning */

  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

  // Use flat array of DOUBLE size, with interleaved fata,
  // because JS does not support effective
  this.dyn_ltree  = new utils.Buf16(HEAP_SIZE * 2);
  this.dyn_dtree  = new utils.Buf16((2 * D_CODES + 1) * 2);
  this.bl_tree    = new utils.Buf16((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);

  this.l_desc   = null;         /* desc. for literal tree */
  this.d_desc   = null;         /* desc. for distance tree */
  this.bl_desc  = null;         /* desc. for bit length tree */

  //ush bl_count[MAX_BITS+1];
  this.bl_count = new utils.Buf16(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
  this.heap = new utils.Buf16(2 * L_CODES + 1);  /* heap used to build the Huffman trees */
  zero(this.heap);

  this.heap_len = 0;               /* number of elements in the heap */
  this.heap_max = 0;               /* element of largest frequency */
  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
   * The same heap array is used to build all trees.
   */

  this.depth = new utils.Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
  zero(this.depth);
  /* Depth of each subtree used as tie breaker for trees of equal frequency
   */

  this.l_buf = 0;          /* buffer index for literals or lengths */

  this.lit_bufsize = 0;
  /* Size of match buffer for literals/lengths.  There are 4 reasons for
   * limiting lit_bufsize to 64K:
   *   - frequencies can be kept in 16 bit counters
   *   - if compression is not successful for the first block, all input
   *     data is still in the window so we can still emit a stored block even
   *     when input comes from standard input.  (This can also be done for
   *     all blocks if lit_bufsize is not greater than 32K.)
   *   - if compression is not successful for a file smaller than 64K, we can
   *     even emit a stored file instead of a stored block (saving 5 bytes).
   *     This is applicable only for zip (not gzip or zlib).
   *   - creating new Huffman trees less frequently may not provide fast
   *     adaptation to changes in the input data statistics. (Take for
   *     example a binary file with poorly compressible code followed by
   *     a highly compressible string table.) Smaller buffer sizes give
   *     fast adaptation but have of course the overhead of transmitting
   *     trees more frequently.
   *   - I can't count above 4
   */

  this.last_lit = 0;      /* running index in l_buf */

  this.d_buf = 0;
  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
   * the same number of elements. To use different lengths, an extra flag
   * array would be necessary.
   */

  this.opt_len = 0;       /* bit length of current block with optimal trees */
  this.static_len = 0;    /* bit length of current block with static trees */
  this.matches = 0;       /* number of string matches in current block */
  this.insert = 0;        /* bytes at end of window left to insert */


  this.bi_buf = 0;
  /* Output buffer. bits are inserted starting at the bottom (least
   * significant bits).
   */
  this.bi_valid = 0;
  /* Number of valid bits in bi_buf.  All bits above the last valid bit
   * are always zero.
   */

  // Used for window memory init. We safely ignore it for JS. That makes
  // sense only for pointers and memory check tools.
  //this.high_water = 0;
  /* High water mark offset in window for initialized bytes -- bytes above
   * this are set to zero in order to avoid memory check warnings when
   * longest match routines access bytes past the input.  This is then
   * updated to the new high water mark.
   */
}


function deflateResetKeep(strm) {
  var s;

  if (!strm || !strm.state) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;

  s = strm.state;
  s.pending = 0;
  s.pending_out = 0;

  if (s.wrap < 0) {
    s.wrap = -s.wrap;
    /* was made negative by deflate(..., Z_FINISH); */
  }
  s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
  strm.adler = (s.wrap === 2) ?
    0  // crc32(0, Z_NULL, 0)
  :
    1; // adler32(0, Z_NULL, 0)
  s.last_flush = Z_NO_FLUSH;
  trees._tr_init(s);
  return Z_OK;
}


function deflateReset(strm) {
  var ret = deflateResetKeep(strm);
  if (ret === Z_OK) {
    lm_init(strm.state);
  }
  return ret;
}


function deflateSetHeader(strm, head) {
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
  strm.state.gzhead = head;
  return Z_OK;
}


function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
  if (!strm) { // === Z_NULL
    return Z_STREAM_ERROR;
  }
  var wrap = 1;

  if (level === Z_DEFAULT_COMPRESSION) {
    level = 6;
  }

  if (windowBits < 0) { /* suppress zlib wrapper */
    wrap = 0;
    windowBits = -windowBits;
  }

  else if (windowBits > 15) {
    wrap = 2;           /* write gzip wrapper instead */
    windowBits -= 16;
  }


  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
    strategy < 0 || strategy > Z_FIXED) {
    return err(strm, Z_STREAM_ERROR);
  }


  if (windowBits === 8) {
    windowBits = 9;
  }
  /* until 256-byte window bug fixed */

  var s = new DeflateState();

  strm.state = s;
  s.strm = strm;

  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;

  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

  s.window = new utils.Buf8(s.w_size * 2);
  s.head = new utils.Buf16(s.hash_size);
  s.prev = new utils.Buf16(s.w_size);

  // Don't need mem init magic for JS.
  //s.high_water = 0;  /* nothing written to s->window yet */

  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

  s.pending_buf_size = s.lit_bufsize * 4;

  //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
  //s->pending_buf = (uchf *) overlay;
  s.pending_buf = new utils.Buf8(s.pending_buf_size);

  // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
  //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
  s.d_buf = 1 * s.lit_bufsize;

  //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
  s.l_buf = (1 + 2) * s.lit_bufsize;

  s.level = level;
  s.strategy = strategy;
  s.method = method;

  return deflateReset(strm);
}

function deflateInit(strm, level) {
  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
}


function deflate(strm, flush) {
  var old_flush, s;
  var beg, val; // for gzip header write only

  if (!strm || !strm.state ||
    flush > Z_BLOCK || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
  }

  s = strm.state;

  if (!strm.output ||
      (!strm.input && strm.avail_in !== 0) ||
      (s.status === FINISH_STATE && flush !== Z_FINISH)) {
    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
  }

  s.strm = strm; /* just in case */
  old_flush = s.last_flush;
  s.last_flush = flush;

  /* Write the header */
  if (s.status === INIT_STATE) {

    if (s.wrap === 2) { // GZIP header
      strm.adler = 0;  //crc32(0L, Z_NULL, 0);
      put_byte(s, 31);
      put_byte(s, 139);
      put_byte(s, 8);
      if (!s.gzhead) { // s->gzhead == Z_NULL
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, OS_CODE);
        s.status = BUSY_STATE;
      }
      else {
        put_byte(s, (s.gzhead.text ? 1 : 0) +
                    (s.gzhead.hcrc ? 2 : 0) +
                    (!s.gzhead.extra ? 0 : 4) +
                    (!s.gzhead.name ? 0 : 8) +
                    (!s.gzhead.comment ? 0 : 16)
        );
        put_byte(s, s.gzhead.time & 0xff);
        put_byte(s, (s.gzhead.time >> 8) & 0xff);
        put_byte(s, (s.gzhead.time >> 16) & 0xff);
        put_byte(s, (s.gzhead.time >> 24) & 0xff);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, s.gzhead.os & 0xff);
        if (s.gzhead.extra && s.gzhead.extra.length) {
          put_byte(s, s.gzhead.extra.length & 0xff);
          put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
        }
        if (s.gzhead.hcrc) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
        }
        s.gzindex = 0;
        s.status = EXTRA_STATE;
      }
    }
    else // DEFLATE header
    {
      var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
      var level_flags = -1;

      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
        level_flags = 0;
      } else if (s.level < 6) {
        level_flags = 1;
      } else if (s.level === 6) {
        level_flags = 2;
      } else {
        level_flags = 3;
      }
      header |= (level_flags << 6);
      if (s.strstart !== 0) { header |= PRESET_DICT; }
      header += 31 - (header % 31);

      s.status = BUSY_STATE;
      putShortMSB(s, header);

      /* Save the adler32 of the preset dictionary: */
      if (s.strstart !== 0) {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 0xffff);
      }
      strm.adler = 1; // adler32(0L, Z_NULL, 0);
    }
  }

//#ifdef GZIP
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */

      while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            break;
          }
        }
        put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
        s.gzindex++;
      }
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (s.gzindex === s.gzhead.extra.length) {
        s.gzindex = 0;
        s.status = NAME_STATE;
      }
    }
    else {
      s.status = NAME_STATE;
    }
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.gzindex = 0;
        s.status = COMMENT_STATE;
      }
    }
    else {
      s.status = COMMENT_STATE;
    }
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.status = HCRC_STATE;
      }
    }
    else {
      s.status = HCRC_STATE;
    }
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
      }
      if (s.pending + 2 <= s.pending_buf_size) {
        put_byte(s, strm.adler & 0xff);
        put_byte(s, (strm.adler >> 8) & 0xff);
        strm.adler = 0; //crc32(0L, Z_NULL, 0);
        s.status = BUSY_STATE;
      }
    }
    else {
      s.status = BUSY_STATE;
    }
  }
//#endif

  /* Flush as much pending output as possible */
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      /* Since avail_out is 0, deflate will be called again with
       * more output space, but possibly with both pending and
       * avail_in equal to zero. There won't be anything to do,
       * but this is not an error situation so make sure we
       * return OK instead of BUF_ERROR at next call of deflate:
       */
      s.last_flush = -1;
      return Z_OK;
    }

    /* Make sure there is something to do and avoid duplicate consecutive
     * flushes. For repeated and useless calls with Z_FINISH, we keep
     * returning Z_STREAM_END instead of Z_BUF_ERROR.
     */
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
    flush !== Z_FINISH) {
    return err(strm, Z_BUF_ERROR);
  }

  /* User must not provide more input after the first FINISH: */
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR);
  }

  /* Start a new block or continue the current one.
   */
  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
    (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
    var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
      (s.strategy === Z_RLE ? deflate_rle(s, flush) :
        configuration_table[s.level].func(s, flush));

    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        /* avoid BUF_ERROR next call, see above */
      }
      return Z_OK;
      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
       * of deflate should use the same flush parameter to make sure
       * that the flush is complete. So we don't have to output an
       * empty block here, this will be done at next call. This also
       * ensures that for a very small output buffer, we emit at most
       * one empty block.
       */
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        trees._tr_align(s);
      }
      else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */

        trees._tr_stored_block(s, 0, 0, false);
        /* For a full flush, this empty block will be recognized
         * as a special marker by inflate_sync().
         */
        if (flush === Z_FULL_FLUSH) {
          /*** CLEAR_HASH(s); ***/             /* forget history */
          zero(s.head); // Fill with NIL (= 0);

          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
        return Z_OK;
      }
    }
  }
  //Assert(strm->avail_out > 0, "bug2");
  //if (strm.avail_out <= 0) { throw new Error("bug2");}

  if (flush !== Z_FINISH) { return Z_OK; }
  if (s.wrap <= 0) { return Z_STREAM_END; }

  /* Write the trailer */
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 0xff);
    put_byte(s, (strm.adler >> 8) & 0xff);
    put_byte(s, (strm.adler >> 16) & 0xff);
    put_byte(s, (strm.adler >> 24) & 0xff);
    put_byte(s, strm.total_in & 0xff);
    put_byte(s, (strm.total_in >> 8) & 0xff);
    put_byte(s, (strm.total_in >> 16) & 0xff);
    put_byte(s, (strm.total_in >> 24) & 0xff);
  }
  else
  {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 0xffff);
  }

  flush_pending(strm);
  /* If avail_out is zero, the application will call deflate again
   * to flush the rest.
   */
  if (s.wrap > 0) { s.wrap = -s.wrap; }
  /* write the trailer only once! */
  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
}

function deflateEnd(strm) {
  var status;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  status = strm.state.status;
  if (status !== INIT_STATE &&
    status !== EXTRA_STATE &&
    status !== NAME_STATE &&
    status !== COMMENT_STATE &&
    status !== HCRC_STATE &&
    status !== BUSY_STATE &&
    status !== FINISH_STATE
  ) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.state = null;

  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
}


/* =========================================================================
 * Initializes the compression dictionary from the given byte
 * sequence without producing any compressed output.
 */
function deflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var s;
  var str, n;
  var wrap;
  var avail;
  var next;
  var input;
  var tmpDict;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  s = strm.state;
  wrap = s.wrap;

  if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
    return Z_STREAM_ERROR;
  }

  /* when using zlib wrappers, compute Adler-32 for provided dictionary */
  if (wrap === 1) {
    /* adler32(strm->adler, dictionary, dictLength); */
    strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
  }

  s.wrap = 0;   /* avoid computing Adler-32 in read_buf */

  /* if dictionary would fill window, just replace the history */
  if (dictLength >= s.w_size) {
    if (wrap === 0) {            /* already empty otherwise */
      /*** CLEAR_HASH(s); ***/
      zero(s.head); // Fill with NIL (= 0);
      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    /* use the tail */
    // dictionary = dictionary.slice(dictLength - s.w_size);
    tmpDict = new utils.Buf8(s.w_size);
    utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  /* insert dictionary into window and hash */
  avail = strm.avail_in;
  next = strm.next_in;
  input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);
  while (s.lookahead >= MIN_MATCH) {
    str = s.strstart;
    n = s.lookahead - (MIN_MATCH - 1);
    do {
      /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

      s.prev[str & s.w_mask] = s.head[s.ins_h];

      s.head[s.ins_h] = str;
      str++;
    } while (--n);
    s.strstart = str;
    s.lookahead = MIN_MATCH - 1;
    fill_window(s);
  }
  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK;
}


exports.deflateInit = deflateInit;
exports.deflateInit2 = deflateInit2;
exports.deflateReset = deflateReset;
exports.deflateResetKeep = deflateResetKeep;
exports.deflateSetHeader = deflateSetHeader;
exports.deflate = deflate;
exports.deflateEnd = deflateEnd;
exports.deflateSetDictionary = deflateSetDictionary;
exports.deflateInfo = 'pako deflate (from Nodeca project)';

/* Not implemented
exports.deflateBound = deflateBound;
exports.deflateCopy = deflateCopy;
exports.deflateParams = deflateParams;
exports.deflatePending = deflatePending;
exports.deflatePrime = deflatePrime;
exports.deflateTune = deflateTune;
*/


/***/ }),

/***/ 5105:
/***/ ((module) => {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function GZheader() {
  /* true if compressed data believed to be text */
  this.text       = 0;
  /* modification time */
  this.time       = 0;
  /* extra flags (not used when writing a gzip file) */
  this.xflags     = 0;
  /* operating system */
  this.os         = 0;
  /* pointer to extra field or Z_NULL if none */
  this.extra      = null;
  /* extra field length (valid if extra != Z_NULL) */
  this.extra_len  = 0; // Actually, we don't need it in JS,
                       // but leave for few code modifications

  //
  // Setup limits is not necessary because in js we should not preallocate memory
  // for inflate use constant limit in 65536 bytes
  //

  /* space at extra (only when reading header) */
  // this.extra_max  = 0;
  /* pointer to zero-terminated file name or Z_NULL */
  this.name       = '';
  /* space at name (only when reading header) */
  // this.name_max   = 0;
  /* pointer to zero-terminated comment or Z_NULL */
  this.comment    = '';
  /* space at comment (only when reading header) */
  // this.comm_max   = 0;
  /* true if there was or will be a header crc */
  this.hcrc       = 0;
  /* true when done reading gzip header (not used when writing a gzip file) */
  this.done       = false;
}

module.exports = GZheader;


/***/ }),

/***/ 5349:
/***/ ((module) => {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// See state defs from inflate.js
var BAD = 30;       /* got a data error -- remain here until reset */
var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */

/*
   Decode literal, length, and distance codes and write out the resulting
   literal and match bytes until either not enough input or output is
   available, an end-of-block is encountered, or a data error is encountered.
   When large enough input and output buffers are supplied to inflate(), for
   example, a 16K input buffer and a 64K output buffer, more than 95% of the
   inflate execution time is spent in this routine.

   Entry assumptions:

        state.mode === LEN
        strm.avail_in >= 6
        strm.avail_out >= 258
        start >= strm.avail_out
        state.bits < 8

   On return, state.mode is one of:

        LEN -- ran out of enough output space or enough available input
        TYPE -- reached end of block code, inflate() to interpret next block
        BAD -- error in block data

   Notes:

    - The maximum input bits used by a length/distance pair is 15 bits for the
      length code, 5 bits for the length extra, 15 bits for the distance code,
      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
      Therefore if strm.avail_in >= 6, then there is enough input to avoid
      checking for available input while decoding.

    - The maximum bytes that a single length/distance pair can output is 258
      bytes, which is the maximum length that can be coded.  inflate_fast()
      requires strm.avail_out >= 258 for each loop to avoid checking for
      output space.
 */
module.exports = function inflate_fast(strm, start) {
  var state;
  var _in;                    /* local strm.input */
  var last;                   /* have enough input while in < last */
  var _out;                   /* local strm.output */
  var beg;                    /* inflate()'s initial strm.output */
  var end;                    /* while out < end, enough space available */
//#ifdef INFLATE_STRICT
  var dmax;                   /* maximum distance from zlib header */
//#endif
  var wsize;                  /* window size or zero if not using window */
  var whave;                  /* valid bytes in the window */
  var wnext;                  /* window write index */
  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
  var s_window;               /* allocated sliding window, if wsize != 0 */
  var hold;                   /* local strm.hold */
  var bits;                   /* local strm.bits */
  var lcode;                  /* local strm.lencode */
  var dcode;                  /* local strm.distcode */
  var lmask;                  /* mask for first level of length codes */
  var dmask;                  /* mask for first level of distance codes */
  var here;                   /* retrieved table entry */
  var op;                     /* code bits, operation, extra bits, or */
                              /*  window position, window bytes to copy */
  var len;                    /* match length, unused bytes */
  var dist;                   /* match distance */
  var from;                   /* where to copy match from */
  var from_source;


  var input, output; // JS specific, because we have no pointers

  /* copy state to local variables */
  state = strm.state;
  //here = state.here;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
//#ifdef INFLATE_STRICT
  dmax = state.dmax;
//#endif
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;


  /* decode literals and length/distances until end-of-block or not enough
     input data or output space */

  top:
  do {
    if (bits < 15) {
      hold += input[_in++] << bits;
      bits += 8;
      hold += input[_in++] << bits;
      bits += 8;
    }

    here = lcode[hold & lmask];

    dolen:
    for (;;) { // Goto emulation
      op = here >>> 24/*here.bits*/;
      hold >>>= op;
      bits -= op;
      op = (here >>> 16) & 0xff/*here.op*/;
      if (op === 0) {                          /* literal */
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        output[_out++] = here & 0xffff/*here.val*/;
      }
      else if (op & 16) {                     /* length base */
        len = here & 0xffff/*here.val*/;
        op &= 15;                           /* number of extra bits */
        if (op) {
          if (bits < op) {
            hold += input[_in++] << bits;
            bits += 8;
          }
          len += hold & ((1 << op) - 1);
          hold >>>= op;
          bits -= op;
        }
        //Tracevv((stderr, "inflate:         length %u\n", len));
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = dcode[hold & dmask];

        dodist:
        for (;;) { // goto emulation
          op = here >>> 24/*here.bits*/;
          hold >>>= op;
          bits -= op;
          op = (here >>> 16) & 0xff/*here.op*/;

          if (op & 16) {                      /* distance base */
            dist = here & 0xffff/*here.val*/;
            op &= 15;                       /* number of extra bits */
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
            }
            dist += hold & ((1 << op) - 1);
//#ifdef INFLATE_STRICT
            if (dist > dmax) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break top;
            }
//#endif
            hold >>>= op;
            bits -= op;
            //Tracevv((stderr, "inflate:         distance %u\n", dist));
            op = _out - beg;                /* max distance in output */
            if (dist > op) {                /* see if copy from window */
              op = dist - op;               /* distance back in window */
              if (op > whave) {
                if (state.sane) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD;
                  break top;
                }

// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//                if (len <= op - whave) {
//                  do {
//                    output[_out++] = 0;
//                  } while (--len);
//                  continue top;
//                }
//                len -= op - whave;
//                do {
//                  output[_out++] = 0;
//                } while (--op > whave);
//                if (op === 0) {
//                  from = _out - dist;
//                  do {
//                    output[_out++] = output[from++];
//                  } while (--len);
//                  continue top;
//                }
//#endif
              }
              from = 0; // window index
              from_source = s_window;
              if (wnext === 0) {           /* very common case */
                from += wsize - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              else if (wnext < op) {      /* wrap around window */
                from += wsize + wnext - op;
                op -= wnext;
                if (op < len) {         /* some from end of window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = 0;
                  if (wnext < len) {  /* some from start of window */
                    op = wnext;
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist;      /* rest from output */
                    from_source = output;
                  }
                }
              }
              else {                      /* contiguous in window */
                from += wnext - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              while (len > 2) {
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                len -= 3;
              }
              if (len) {
                output[_out++] = from_source[from++];
                if (len > 1) {
                  output[_out++] = from_source[from++];
                }
              }
            }
            else {
              from = _out - dist;          /* copy direct from output */
              do {                        /* minimum length is three */
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                len -= 3;
              } while (len > 2);
              if (len) {
                output[_out++] = output[from++];
                if (len > 1) {
                  output[_out++] = output[from++];
                }
              }
            }
          }
          else if ((op & 64) === 0) {          /* 2nd level distance code */
            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
            continue dodist;
          }
          else {
            strm.msg = 'invalid distance code';
            state.mode = BAD;
            break top;
          }

          break; // need to emulate goto via "continue"
        }
      }
      else if ((op & 64) === 0) {              /* 2nd level length code */
        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
        continue dolen;
      }
      else if (op & 32) {                     /* end-of-block */
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.mode = TYPE;
        break top;
      }
      else {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break top;
      }

      break; // need to emulate goto via "continue"
    }
  } while (_in < last && _out < end);

  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;

  /* update state and return */
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
  state.hold = hold;
  state.bits = bits;
  return;
};


/***/ }),

/***/ 409:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils         = __nccwpck_require__(5483);
var adler32       = __nccwpck_require__(6924);
var crc32         = __nccwpck_require__(7242);
var inflate_fast  = __nccwpck_require__(5349);
var inflate_table = __nccwpck_require__(6895);

var CODES = 0;
var LENS = 1;
var DISTS = 2;

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
//var Z_NO_FLUSH      = 0;
//var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
//var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;

/* The deflate compression method */
var Z_DEFLATED  = 8;


/* STATES ====================================================================*/
/* ===========================================================================*/


var    HEAD = 1;       /* i: waiting for magic header */
var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
var    TIME = 3;       /* i: waiting for modification time (gzip) */
var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
var    NAME = 7;       /* i: waiting for end of file name (gzip) */
var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
var    HCRC = 9;       /* i: waiting for header crc (gzip) */
var    DICTID = 10;    /* i: waiting for dictionary check value */
var    DICT = 11;      /* waiting for inflateSetDictionary() call */
var        TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
var        STORED = 14;    /* i: waiting for stored size (length and complement) */
var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
var        LENLENS = 18;   /* i: waiting for code length code lengths */
var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
var            LEN = 21;       /* i: waiting for length/lit/eob code */
var            LENEXT = 22;    /* i: waiting for length extra bits */
var            DIST = 23;      /* i: waiting for distance code */
var            DISTEXT = 24;   /* i: waiting for distance extra bits */
var            MATCH = 25;     /* o: waiting for output space to copy string */
var            LIT = 26;       /* o: waiting for output space to write literal */
var    CHECK = 27;     /* i: waiting for 32-bit check value */
var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
var    DONE = 29;      /* finished check, done -- remain here until reset */
var    BAD = 30;       /* got a data error -- remain here until reset */
var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

/* ===========================================================================*/



var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_WBITS = MAX_WBITS;


function zswap32(q) {
  return  (((q >>> 24) & 0xff) +
          ((q >>> 8) & 0xff00) +
          ((q & 0xff00) << 8) +
          ((q & 0xff) << 24));
}


function InflateState() {
  this.mode = 0;             /* current inflate mode */
  this.last = false;          /* true if processing last block */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.havedict = false;      /* true if dictionary provided */
  this.flags = 0;             /* gzip header method and flags (0 if zlib) */
  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
  this.check = 0;             /* protected copy of check value */
  this.total = 0;             /* protected copy of output count */
  // TODO: may be {}
  this.head = null;           /* where to save gzip header information */

  /* sliding window */
  this.wbits = 0;             /* log base 2 of requested window size */
  this.wsize = 0;             /* window size or zero if not using window */
  this.whave = 0;             /* valid bytes in the window */
  this.wnext = 0;             /* window write index */
  this.window = null;         /* allocated sliding window, if needed */

  /* bit accumulator */
  this.hold = 0;              /* input bit accumulator */
  this.bits = 0;              /* number of bits in "in" */

  /* for string and stored block copying */
  this.length = 0;            /* literal or length of data to copy */
  this.offset = 0;            /* distance back to copy string from */

  /* for table and code decoding */
  this.extra = 0;             /* extra bits needed */

  /* fixed and dynamic code tables */
  this.lencode = null;          /* starting table for length/literal codes */
  this.distcode = null;         /* starting table for distance codes */
  this.lenbits = 0;           /* index bits for lencode */
  this.distbits = 0;          /* index bits for distcode */

  /* dynamic table building */
  this.ncode = 0;             /* number of code length code lengths */
  this.nlen = 0;              /* number of length code lengths */
  this.ndist = 0;             /* number of distance code lengths */
  this.have = 0;              /* number of code lengths in lens[] */
  this.next = null;              /* next available space in codes[] */

  this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
  this.work = new utils.Buf16(288); /* work area for code table building */

  /*
   because we don't have pointers in js, we use lencode and distcode directly
   as buffers so we don't need codes
  */
  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
  this.sane = 0;                   /* if false, allow invalid distance too far */
  this.back = 0;                   /* bits back of last unprocessed length/lit */
  this.was = 0;                    /* initial length of match */
}

function inflateResetKeep(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = ''; /*Z_NULL*/
  if (state.wrap) {       /* to support ill-conceived Java test suite */
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.dmax = 32768;
  state.head = null/*Z_NULL*/;
  state.hold = 0;
  state.bits = 0;
  //state.lencode = state.distcode = state.next = state.codes;
  state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
  state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);

  state.sane = 1;
  state.back = -1;
  //Tracev((stderr, "inflate: reset\n"));
  return Z_OK;
}

function inflateReset(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);

}

function inflateReset2(strm, windowBits) {
  var wrap;
  var state;

  /* get the state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;

  /* extract wrap request from windowBits parameter */
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  }
  else {
    wrap = (windowBits >> 4) + 1;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }

  /* set number of window bits, free window if different */
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }

  /* update state and reset the rest of it */
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
}

function inflateInit2(strm, windowBits) {
  var ret;
  var state;

  if (!strm) { return Z_STREAM_ERROR; }
  //strm.msg = Z_NULL;                 /* in case we return an error */

  state = new InflateState();

  //if (state === Z_NULL) return Z_MEM_ERROR;
  //Tracev((stderr, "inflate: allocated\n"));
  strm.state = state;
  state.window = null/*Z_NULL*/;
  ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK) {
    strm.state = null/*Z_NULL*/;
  }
  return ret;
}

function inflateInit(strm) {
  return inflateInit2(strm, DEF_WBITS);
}


/*
 Return state with length and distance decoding tables and index sizes set to
 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
 If BUILDFIXED is defined, then instead this routine builds the tables the
 first time it's called, and returns those tables the first time and
 thereafter.  This reduces the size of the code by about 2K bytes, in
 exchange for a little execution time.  However, BUILDFIXED should not be
 used for threaded applications, since the rewriting of the tables and virgin
 may not be thread-safe.
 */
var virgin = true;

var lenfix, distfix; // We have no pointers in JS, so keep tables separate

function fixedtables(state) {
  /* build fixed huffman tables if first call (may not be thread safe) */
  if (virgin) {
    var sym;

    lenfix = new utils.Buf32(512);
    distfix = new utils.Buf32(32);

    /* literal/length table */
    sym = 0;
    while (sym < 144) { state.lens[sym++] = 8; }
    while (sym < 256) { state.lens[sym++] = 9; }
    while (sym < 280) { state.lens[sym++] = 7; }
    while (sym < 288) { state.lens[sym++] = 8; }

    inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });

    /* distance table */
    sym = 0;
    while (sym < 32) { state.lens[sym++] = 5; }

    inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });

    /* do this just once */
    virgin = false;
  }

  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
}


/*
 Update the window with the last wsize (normally 32K) bytes written before
 returning.  If window does not exist yet, create it.  This is only called
 when a window is already in use, or when output has been written during this
 inflate call, but the end of the deflate stream has not been reached yet.
 It is also called to create a window for dictionary data when a dictionary
 is loaded.

 Providing output buffers larger than 32K to inflate() should provide a speed
 advantage, since only the last 32K of output is copied to the sliding window
 upon return from inflate(), and since all distances after the first 32K of
 output will fall in the output data, making match copies simpler and faster.
 The advantage may be dependent on the size of the processor's data caches.
 */
function updatewindow(strm, src, end, copy) {
  var dist;
  var state = strm.state;

  /* if it hasn't been done already, allocate space for the window */
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;

    state.window = new utils.Buf8(state.wsize);
  }

  /* copy state->wsize or less output bytes into the circular window */
  if (copy >= state.wsize) {
    utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
    state.wnext = 0;
    state.whave = state.wsize;
  }
  else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    //zmemcpy(state->window + state->wnext, end - copy, dist);
    utils.arraySet(state.window, src, end - copy, dist, state.wnext);
    copy -= dist;
    if (copy) {
      //zmemcpy(state->window, end - copy, copy);
      utils.arraySet(state.window, src, end - copy, copy, 0);
      state.wnext = copy;
      state.whave = state.wsize;
    }
    else {
      state.wnext += dist;
      if (state.wnext === state.wsize) { state.wnext = 0; }
      if (state.whave < state.wsize) { state.whave += dist; }
    }
  }
  return 0;
}

function inflate(strm, flush) {
  var state;
  var input, output;          // input/output buffers
  var next;                   /* next input INDEX */
  var put;                    /* next output INDEX */
  var have, left;             /* available input and output */
  var hold;                   /* bit buffer */
  var bits;                   /* bits in bit buffer */
  var _in, _out;              /* save starting available input and output */
  var copy;                   /* number of stored or match bytes to copy */
  var from;                   /* where to copy match bytes from */
  var from_source;
  var here = 0;               /* current decoding table entry */
  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
  //var last;                   /* parent table entry */
  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
  var len;                    /* length to copy for repeats, bits to drop */
  var ret;                    /* return code */
  var hbuf = new utils.Buf8(4);    /* buffer for gzip header crc calculation */
  var opts;

  var n; // temporary var for NEED_BITS

  var order = /* permutation of code lengths */
    [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];


  if (!strm || !strm.state || !strm.output ||
      (!strm.input && strm.avail_in !== 0)) {
    return Z_STREAM_ERROR;
  }

  state = strm.state;
  if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


  //--- LOAD() ---
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  //---

  _in = have;
  _out = left;
  ret = Z_OK;

  inf_leave: // goto emulation
  for (;;) {
    switch (state.mode) {
      case HEAD:
        if (state.wrap === 0) {
          state.mode = TYPEDO;
          break;
        }
        //=== NEEDBITS(16);
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
          state.check = 0/*crc32(0L, Z_NULL, 0)*/;
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//

          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = FLAGS;
          break;
        }
        state.flags = 0;           /* expect zlib header */
        if (state.head) {
          state.head.done = false;
        }
        if (!(state.wrap & 1) ||   /* check if zlib header allowed */
          (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
          strm.msg = 'incorrect header check';
          state.mode = BAD;
          break;
        }
        if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
          strm.msg = 'unknown compression method';
          state.mode = BAD;
          break;
        }
        //--- DROPBITS(4) ---//
        hold >>>= 4;
        bits -= 4;
        //---//
        len = (hold & 0x0f)/*BITS(4)*/ + 8;
        if (state.wbits === 0) {
          state.wbits = len;
        }
        else if (len > state.wbits) {
          strm.msg = 'invalid window size';
          state.mode = BAD;
          break;
        }
        state.dmax = 1 << len;
        //Tracev((stderr, "inflate:   zlib header ok\n"));
        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
        state.mode = hold & 0x200 ? DICTID : TYPE;
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        break;
      case FLAGS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.flags = hold;
        if ((state.flags & 0xff) !== Z_DEFLATED) {
          strm.msg = 'unknown compression method';
          state.mode = BAD;
          break;
        }
        if (state.flags & 0xe000) {
          strm.msg = 'unknown header flags set';
          state.mode = BAD;
          break;
        }
        if (state.head) {
          state.head.text = ((hold >> 8) & 1);
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = TIME;
        /* falls through */
      case TIME:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (state.head) {
          state.head.time = hold;
        }
        if (state.flags & 0x0200) {
          //=== CRC4(state.check, hold)
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          hbuf[2] = (hold >>> 16) & 0xff;
          hbuf[3] = (hold >>> 24) & 0xff;
          state.check = crc32(state.check, hbuf, 4, 0);
          //===
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = OS;
        /* falls through */
      case OS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (state.head) {
          state.head.xflags = (hold & 0xff);
          state.head.os = (hold >> 8);
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = EXLEN;
        /* falls through */
      case EXLEN:
        if (state.flags & 0x0400) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.length = hold;
          if (state.head) {
            state.head.extra_len = hold;
          }
          if (state.flags & 0x0200) {
            //=== CRC2(state.check, hold);
            hbuf[0] = hold & 0xff;
            hbuf[1] = (hold >>> 8) & 0xff;
            state.check = crc32(state.check, hbuf, 2, 0);
            //===//
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
        }
        else if (state.head) {
          state.head.extra = null/*Z_NULL*/;
        }
        state.mode = EXTRA;
        /* falls through */
      case EXTRA:
        if (state.flags & 0x0400) {
          copy = state.length;
          if (copy > have) { copy = have; }
          if (copy) {
            if (state.head) {
              len = state.head.extra_len - state.length;
              if (!state.head.extra) {
                // Use untyped array for more convenient processing later
                state.head.extra = new Array(state.head.extra_len);
              }
              utils.arraySet(
                state.head.extra,
                input,
                next,
                // extra field is limited to 65536 bytes
                // - no need for additional size check
                copy,
                /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                len
              );
              //zmemcpy(state.head.extra + len, next,
              //        len + copy > state.head.extra_max ?
              //        state.head.extra_max - len : copy);
            }
            if (state.flags & 0x0200) {
              state.check = crc32(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            state.length -= copy;
          }
          if (state.length) { break inf_leave; }
        }
        state.length = 0;
        state.mode = NAME;
        /* falls through */
      case NAME:
        if (state.flags & 0x0800) {
          if (have === 0) { break inf_leave; }
          copy = 0;
          do {
            // TODO: 2 or 1 bytes?
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */
            if (state.head && len &&
                (state.length < 65536 /*state.head.name_max*/)) {
              state.head.name += String.fromCharCode(len);
            }
          } while (len && copy < have);

          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          if (len) { break inf_leave; }
        }
        else if (state.head) {
          state.head.name = null;
        }
        state.length = 0;
        state.mode = COMMENT;
        /* falls through */
      case COMMENT:
        if (state.flags & 0x1000) {
          if (have === 0) { break inf_leave; }
          copy = 0;
          do {
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */
            if (state.head && len &&
                (state.length < 65536 /*state.head.comm_max*/)) {
              state.head.comment += String.fromCharCode(len);
            }
          } while (len && copy < have);
          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          if (len) { break inf_leave; }
        }
        else if (state.head) {
          state.head.comment = null;
        }
        state.mode = HCRC;
        /* falls through */
      case HCRC:
        if (state.flags & 0x0200) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (hold !== (state.check & 0xffff)) {
            strm.msg = 'header crc mismatch';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
        }
        if (state.head) {
          state.head.hcrc = ((state.flags >> 9) & 1);
          state.head.done = true;
        }
        strm.adler = state.check = 0;
        state.mode = TYPE;
        break;
      case DICTID:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        strm.adler = state.check = zswap32(hold);
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = DICT;
        /* falls through */
      case DICT:
        if (state.havedict === 0) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits;
          //---
          return Z_NEED_DICT;
        }
        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
        state.mode = TYPE;
        /* falls through */
      case TYPE:
        if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case TYPEDO:
        if (state.last) {
          //--- BYTEBITS() ---//
          hold >>>= bits & 7;
          bits -= bits & 7;
          //---//
          state.mode = CHECK;
          break;
        }
        //=== NEEDBITS(3); */
        while (bits < 3) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.last = (hold & 0x01)/*BITS(1)*/;
        //--- DROPBITS(1) ---//
        hold >>>= 1;
        bits -= 1;
        //---//

        switch ((hold & 0x03)/*BITS(2)*/) {
          case 0:                             /* stored block */
            //Tracev((stderr, "inflate:     stored block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = STORED;
            break;
          case 1:                             /* fixed block */
            fixedtables(state);
            //Tracev((stderr, "inflate:     fixed codes block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = LEN_;             /* decode codes */
            if (flush === Z_TREES) {
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
              break inf_leave;
            }
            break;
          case 2:                             /* dynamic block */
            //Tracev((stderr, "inflate:     dynamic codes block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = TABLE;
            break;
          case 3:
            strm.msg = 'invalid block type';
            state.mode = BAD;
        }
        //--- DROPBITS(2) ---//
        hold >>>= 2;
        bits -= 2;
        //---//
        break;
      case STORED:
        //--- BYTEBITS() ---// /* go to byte boundary */
        hold >>>= bits & 7;
        bits -= bits & 7;
        //---//
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
          strm.msg = 'invalid stored block lengths';
          state.mode = BAD;
          break;
        }
        state.length = hold & 0xffff;
        //Tracev((stderr, "inflate:       stored length %u\n",
        //        state.length));
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = COPY_;
        if (flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case COPY_:
        state.mode = COPY;
        /* falls through */
      case COPY:
        copy = state.length;
        if (copy) {
          if (copy > have) { copy = have; }
          if (copy > left) { copy = left; }
          if (copy === 0) { break inf_leave; }
          //--- zmemcpy(put, next, copy); ---
          utils.arraySet(output, input, next, copy, put);
          //---//
          have -= copy;
          next += copy;
          left -= copy;
          put += copy;
          state.length -= copy;
          break;
        }
        //Tracev((stderr, "inflate:       stored end\n"));
        state.mode = TYPE;
        break;
      case TABLE:
        //=== NEEDBITS(14); */
        while (bits < 14) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
        //--- DROPBITS(5) ---//
        hold >>>= 5;
        bits -= 5;
        //---//
        state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
        //--- DROPBITS(5) ---//
        hold >>>= 5;
        bits -= 5;
        //---//
        state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
        //--- DROPBITS(4) ---//
        hold >>>= 4;
        bits -= 4;
        //---//
//#ifndef PKZIP_BUG_WORKAROUND
        if (state.nlen > 286 || state.ndist > 30) {
          strm.msg = 'too many length or distance symbols';
          state.mode = BAD;
          break;
        }
//#endif
        //Tracev((stderr, "inflate:       table sizes ok\n"));
        state.have = 0;
        state.mode = LENLENS;
        /* falls through */
      case LENLENS:
        while (state.have < state.ncode) {
          //=== NEEDBITS(3);
          while (bits < 3) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
          //--- DROPBITS(3) ---//
          hold >>>= 3;
          bits -= 3;
          //---//
        }
        while (state.have < 19) {
          state.lens[order[state.have++]] = 0;
        }
        // We have separate tables & no pointers. 2 commented lines below not needed.
        //state.next = state.codes;
        //state.lencode = state.next;
        // Switch to use dynamic table
        state.lencode = state.lendyn;
        state.lenbits = 7;

        opts = { bits: state.lenbits };
        ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
        state.lenbits = opts.bits;

        if (ret) {
          strm.msg = 'invalid code lengths set';
          state.mode = BAD;
          break;
        }
        //Tracev((stderr, "inflate:       code lengths ok\n"));
        state.have = 0;
        state.mode = CODELENS;
        /* falls through */
      case CODELENS:
        while (state.have < state.nlen + state.ndist) {
          for (;;) {
            here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          if (here_val < 16) {
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            state.lens[state.have++] = here_val;
          }
          else {
            if (here_val === 16) {
              //=== NEEDBITS(here.bits + 2);
              n = here_bits + 2;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              if (state.have === 0) {
                strm.msg = 'invalid bit length repeat';
                state.mode = BAD;
                break;
              }
              len = state.lens[state.have - 1];
              copy = 3 + (hold & 0x03);//BITS(2);
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
            }
            else if (here_val === 17) {
              //=== NEEDBITS(here.bits + 3);
              n = here_bits + 3;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              len = 0;
              copy = 3 + (hold & 0x07);//BITS(3);
              //--- DROPBITS(3) ---//
              hold >>>= 3;
              bits -= 3;
              //---//
            }
            else {
              //=== NEEDBITS(here.bits + 7);
              n = here_bits + 7;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              len = 0;
              copy = 11 + (hold & 0x7f);//BITS(7);
              //--- DROPBITS(7) ---//
              hold >>>= 7;
              bits -= 7;
              //---//
            }
            if (state.have + copy > state.nlen + state.ndist) {
              strm.msg = 'invalid bit length repeat';
              state.mode = BAD;
              break;
            }
            while (copy--) {
              state.lens[state.have++] = len;
            }
          }
        }

        /* handle error breaks in while */
        if (state.mode === BAD) { break; }

        /* check for end-of-block code (better have one) */
        if (state.lens[256] === 0) {
          strm.msg = 'invalid code -- missing end-of-block';
          state.mode = BAD;
          break;
        }

        /* build code tables -- note: do not change the lenbits or distbits
           values here (9 and 6) without reading the comments in inftrees.h
           concerning the ENOUGH constants, which depend on those values */
        state.lenbits = 9;

        opts = { bits: state.lenbits };
        ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
        // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;
        state.lenbits = opts.bits;
        // state.lencode = state.next;

        if (ret) {
          strm.msg = 'invalid literal/lengths set';
          state.mode = BAD;
          break;
        }

        state.distbits = 6;
        //state.distcode.copy(state.codes);
        // Switch to use dynamic table
        state.distcode = state.distdyn;
        opts = { bits: state.distbits };
        ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
        // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;
        state.distbits = opts.bits;
        // state.distcode = state.next;

        if (ret) {
          strm.msg = 'invalid distances set';
          state.mode = BAD;
          break;
        }
        //Tracev((stderr, 'inflate:       codes ok\n'));
        state.mode = LEN_;
        if (flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case LEN_:
        state.mode = LEN;
        /* falls through */
      case LEN:
        if (have >= 6 && left >= 258) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits;
          //---
          inflate_fast(strm, _out);
          //--- LOAD() ---
          put = strm.next_out;
          output = strm.output;
          left = strm.avail_out;
          next = strm.next_in;
          input = strm.input;
          have = strm.avail_in;
          hold = state.hold;
          bits = state.bits;
          //---

          if (state.mode === TYPE) {
            state.back = -1;
          }
          break;
        }
        state.back = 0;
        for (;;) {
          here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if (here_bits <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if (here_op && (here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;
          for (;;) {
            here = state.lencode[last_val +
                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((last_bits + here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          //--- DROPBITS(last.bits) ---//
          hold >>>= last_bits;
          bits -= last_bits;
          //---//
          state.back += last_bits;
        }
        //--- DROPBITS(here.bits) ---//
        hold >>>= here_bits;
        bits -= here_bits;
        //---//
        state.back += here_bits;
        state.length = here_val;
        if (here_op === 0) {
          //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
          //        "inflate:         literal '%c'\n" :
          //        "inflate:         literal 0x%02x\n", here.val));
          state.mode = LIT;
          break;
        }
        if (here_op & 32) {
          //Tracevv((stderr, "inflate:         end of block\n"));
          state.back = -1;
          state.mode = TYPE;
          break;
        }
        if (here_op & 64) {
          strm.msg = 'invalid literal/length code';
          state.mode = BAD;
          break;
        }
        state.extra = here_op & 15;
        state.mode = LENEXT;
        /* falls through */
      case LENEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;
          while (bits < n) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
          //--- DROPBITS(state.extra) ---//
          hold >>>= state.extra;
          bits -= state.extra;
          //---//
          state.back += state.extra;
        }
        //Tracevv((stderr, "inflate:         length %u\n", state.length));
        state.was = state.length;
        state.mode = DIST;
        /* falls through */
      case DIST:
        for (;;) {
          here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if ((here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;
          for (;;) {
            here = state.distcode[last_val +
                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((last_bits + here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          //--- DROPBITS(last.bits) ---//
          hold >>>= last_bits;
          bits -= last_bits;
          //---//
          state.back += last_bits;
        }
        //--- DROPBITS(here.bits) ---//
        hold >>>= here_bits;
        bits -= here_bits;
        //---//
        state.back += here_bits;
        if (here_op & 64) {
          strm.msg = 'invalid distance code';
          state.mode = BAD;
          break;
        }
        state.offset = here_val;
        state.extra = (here_op) & 15;
        state.mode = DISTEXT;
        /* falls through */
      case DISTEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;
          while (bits < n) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
          //--- DROPBITS(state.extra) ---//
          hold >>>= state.extra;
          bits -= state.extra;
          //---//
          state.back += state.extra;
        }
//#ifdef INFLATE_STRICT
        if (state.offset > state.dmax) {
          strm.msg = 'invalid distance too far back';
          state.mode = BAD;
          break;
        }
//#endif
        //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
        state.mode = MATCH;
        /* falls through */
      case MATCH:
        if (left === 0) { break inf_leave; }
        copy = _out - left;
        if (state.offset > copy) {         /* copy from window */
          copy = state.offset - copy;
          if (copy > state.whave) {
            if (state.sane) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break;
            }
// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//          Trace((stderr, "inflate.c too far\n"));
//          copy -= state.whave;
//          if (copy > state.length) { copy = state.length; }
//          if (copy > left) { copy = left; }
//          left -= copy;
//          state.length -= copy;
//          do {
//            output[put++] = 0;
//          } while (--copy);
//          if (state.length === 0) { state.mode = LEN; }
//          break;
//#endif
          }
          if (copy > state.wnext) {
            copy -= state.wnext;
            from = state.wsize - copy;
          }
          else {
            from = state.wnext - copy;
          }
          if (copy > state.length) { copy = state.length; }
          from_source = state.window;
        }
        else {                              /* copy from output */
          from_source = output;
          from = put - state.offset;
          copy = state.length;
        }
        if (copy > left) { copy = left; }
        left -= copy;
        state.length -= copy;
        do {
          output[put++] = from_source[from++];
        } while (--copy);
        if (state.length === 0) { state.mode = LEN; }
        break;
      case LIT:
        if (left === 0) { break inf_leave; }
        output[put++] = state.length;
        left--;
        state.mode = LEN;
        break;
      case CHECK:
        if (state.wrap) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) { break inf_leave; }
            have--;
            // Use '|' instead of '+' to make sure that result is signed
            hold |= input[next++] << bits;
            bits += 8;
          }
          //===//
          _out -= left;
          strm.total_out += _out;
          state.total += _out;
          if (_out) {
            strm.adler = state.check =
                /*UPDATE(state.check, put - _out, _out);*/
                (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

          }
          _out = left;
          // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
          if ((state.flags ? hold : zswap32(hold)) !== state.check) {
            strm.msg = 'incorrect data check';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          //Tracev((stderr, "inflate:   check matches trailer\n"));
        }
        state.mode = LENGTH;
        /* falls through */
      case LENGTH:
        if (state.wrap && state.flags) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (hold !== (state.total & 0xffffffff)) {
            strm.msg = 'incorrect length check';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          //Tracev((stderr, "inflate:   length matches trailer\n"));
        }
        state.mode = DONE;
        /* falls through */
      case DONE:
        ret = Z_STREAM_END;
        break inf_leave;
      case BAD:
        ret = Z_DATA_ERROR;
        break inf_leave;
      case MEM:
        return Z_MEM_ERROR;
      case SYNC:
        /* falls through */
      default:
        return Z_STREAM_ERROR;
    }
  }

  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

  /*
     Return from inflate(), updating the total counts and the check value.
     If there was no progress during the inflate() call, return a buffer
     error.  Call updatewindow() to create and/or update the window state.
     Note: a memory error from inflate() is non-recoverable.
   */

  //--- RESTORE() ---
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  //---

  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
                      (state.mode < CHECK || flush !== Z_FINISH))) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
      state.mode = MEM;
      return Z_MEM_ERROR;
    }
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap && _out) {
    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) +
                    (state.mode === TYPE ? 128 : 0) +
                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
    ret = Z_BUF_ERROR;
  }
  return ret;
}

function inflateEnd(strm) {

  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
    return Z_STREAM_ERROR;
  }

  var state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK;
}

function inflateGetHeader(strm, head) {
  var state;

  /* check state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }

  /* save header structure */
  state.head = head;
  head.done = false;
  return Z_OK;
}

function inflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var state;
  var dictid;
  var ret;

  /* check state */
  if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) { return Z_STREAM_ERROR; }
  state = strm.state;

  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR;
  }

  /* check for correct dictionary identifier */
  if (state.mode === DICT) {
    dictid = 1; /* adler32(0, null, 0)*/
    /* dictid = adler32(dictid, dictionary, dictLength); */
    dictid = adler32(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR;
    }
  }
  /* copy dictionary to window using updatewindow(), which will amend the
   existing dictionary if appropriate */
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR;
  }
  state.havedict = 1;
  // Tracev((stderr, "inflate:   dictionary set\n"));
  return Z_OK;
}

exports.inflateReset = inflateReset;
exports.inflateReset2 = inflateReset2;
exports.inflateResetKeep = inflateResetKeep;
exports.inflateInit = inflateInit;
exports.inflateInit2 = inflateInit2;
exports.inflate = inflate;
exports.inflateEnd = inflateEnd;
exports.inflateGetHeader = inflateGetHeader;
exports.inflateSetDictionary = inflateSetDictionary;
exports.inflateInfo = 'pako inflate (from Nodeca project)';

/* Not implemented
exports.inflateCopy = inflateCopy;
exports.inflateGetDictionary = inflateGetDictionary;
exports.inflateMark = inflateMark;
exports.inflatePrime = inflatePrime;
exports.inflateSync = inflateSync;
exports.inflateSyncPoint = inflateSyncPoint;
exports.inflateUndermine = inflateUndermine;
*/


/***/ }),

/***/ 6895:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils = __nccwpck_require__(5483);

var MAXBITS = 15;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

var CODES = 0;
var LENS = 1;
var DISTS = 2;

var lbase = [ /* Length codes 257..285 base */
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
];

var lext = [ /* Length codes 257..285 extra */
  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
];

var dbase = [ /* Distance codes 0..29 base */
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
  8193, 12289, 16385, 24577, 0, 0
];

var dext = [ /* Distance codes 0..29 extra */
  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
  28, 28, 29, 29, 64, 64
];

module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
{
  var bits = opts.bits;
      //here = opts.here; /* table entry for duplication */

  var len = 0;               /* a code's length in bits */
  var sym = 0;               /* index of code symbols */
  var min = 0, max = 0;          /* minimum and maximum code lengths */
  var root = 0;              /* number of index bits for root table */
  var curr = 0;              /* number of index bits for current table */
  var drop = 0;              /* code bits to drop for sub-table */
  var left = 0;                   /* number of prefix codes available */
  var used = 0;              /* code entries in table used */
  var huff = 0;              /* Huffman code */
  var incr;              /* for incrementing code, index */
  var fill;              /* index for replicating entries */
  var low;               /* low bits for current root entry */
  var mask;              /* mask for low root bits */
  var next;             /* next available space in table */
  var base = null;     /* base value table to use */
  var base_index = 0;
//  var shoextra;    /* extra bits table to use */
  var end;                    /* use base and extra for symbol > end */
  var count = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
  var offs = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
  var extra = null;
  var extra_index = 0;

  var here_bits, here_op, here_val;

  /*
   Process a set of code lengths to create a canonical Huffman code.  The
   code lengths are lens[0..codes-1].  Each length corresponds to the
   symbols 0..codes-1.  The Huffman code is generated by first sorting the
   symbols by length from short to long, and retaining the symbol order
   for codes with equal lengths.  Then the code starts with all zero bits
   for the first code of the shortest length, and the codes are integer
   increments for the same length, and zeros are appended as the length
   increases.  For the deflate format, these bits are stored backwards
   from their more natural integer increment ordering, and so when the
   decoding tables are built in the large loop below, the integer codes
   are incremented backwards.

   This routine assumes, but does not check, that all of the entries in
   lens[] are in the range 0..MAXBITS.  The caller must assure this.
   1..MAXBITS is interpreted as that code length.  zero means that that
   symbol does not occur in this code.

   The codes are sorted by computing a count of codes for each length,
   creating from that a table of starting indices for each length in the
   sorted table, and then entering the symbols in order in the sorted
   table.  The sorted table is work[], with that space being provided by
   the caller.

   The length counts are used for other purposes as well, i.e. finding
   the minimum and maximum length codes, determining if there are any
   codes at all, checking for a valid set of lengths, and looking ahead
   at length counts to determine sub-table sizes when building the
   decoding tables.
   */

  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }

  /* bound code lengths, force root to be within code lengths */
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) { break; }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {                     /* no symbols to code at all */
    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;


    //table.op[opts.table_index] = 64;
    //table.bits[opts.table_index] = 1;
    //table.val[opts.table_index++] = 0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;

    opts.bits = 1;
    return 0;     /* no symbols, but wait for decoding to report error */
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) { break; }
  }
  if (root < min) {
    root = min;
  }

  /* check for an over-subscribed or incomplete set of lengths */
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }        /* over-subscribed */
  }
  if (left > 0 && (type === CODES || max !== 1)) {
    return -1;                      /* incomplete set */
  }

  /* generate offsets into symbol table for each length for sorting */
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }

  /* sort symbols by length, by symbol order within each length */
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }

  /*
   Create and fill in decoding tables.  In this loop, the table being
   filled is at next and has curr index bits.  The code being used is huff
   with length len.  That code is converted to an index by dropping drop
   bits off of the bottom.  For codes where len is less than drop + curr,
   those top drop + curr - len bits are incremented through all values to
   fill the table with replicated entries.

   root is the number of index bits for the root table.  When len exceeds
   root, sub-tables are created pointed to by the root entry with an index
   of the low root bits of huff.  This is saved in low to check for when a
   new sub-table should be started.  drop is zero when the root table is
   being filled, and drop is root when sub-tables are being filled.

   When a new sub-table is needed, it is necessary to look ahead in the
   code lengths to determine what size sub-table is needed.  The length
   counts are used for this, and so count[] is decremented as codes are
   entered in the tables.

   used keeps track of how many table entries have been allocated from the
   provided *table space.  It is checked for LENS and DIST tables against
   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
   the initial root table size constants.  See the comments in inftrees.h
   for more information.

   sym increments through all symbols, and the loop terminates when
   all codes of length max, i.e. all codes, have been processed.  This
   routine permits incomplete codes, so another loop after this one fills
   in the rest of the decoding tables with invalid code markers.
   */

  /* set up for code type */
  // poor man optimization - use if-else instead of switch,
  // to avoid deopts in old v8
  if (type === CODES) {
    base = extra = work;    /* dummy value--not used */
    end = 19;

  } else if (type === LENS) {
    base = lbase;
    base_index -= 257;
    extra = lext;
    extra_index -= 257;
    end = 256;

  } else {                    /* DISTS */
    base = dbase;
    extra = dext;
    end = -1;
  }

  /* initialize opts for loop */
  huff = 0;                   /* starting code */
  sym = 0;                    /* starting code symbol */
  len = min;                  /* starting code length */
  next = table_index;              /* current table to fill in */
  curr = root;                /* current table index bits */
  drop = 0;                   /* current bits to drop from code for index */
  low = -1;                   /* trigger new sub-table when len > root */
  used = 1 << root;          /* use root table entries */
  mask = used - 1;            /* mask for comparing low */

  /* check available table space */
  if ((type === LENS && used > ENOUGH_LENS) ||
    (type === DISTS && used > ENOUGH_DISTS)) {
    return 1;
  }

  /* process all codes and make table entries */
  for (;;) {
    /* create table entry */
    here_bits = len - drop;
    if (work[sym] < end) {
      here_op = 0;
      here_val = work[sym];
    }
    else if (work[sym] > end) {
      here_op = extra[extra_index + work[sym]];
      here_val = base[base_index + work[sym]];
    }
    else {
      here_op = 32 + 64;         /* end of block */
      here_val = 0;
    }

    /* replicate for those indices with low len bits equal to huff */
    incr = 1 << (len - drop);
    fill = 1 << curr;
    min = fill;                 /* save offset to next table */
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
    } while (fill !== 0);

    /* backwards increment the len-bit code huff */
    incr = 1 << (len - 1);
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }

    /* go to next symbol, update count, len */
    sym++;
    if (--count[len] === 0) {
      if (len === max) { break; }
      len = lens[lens_index + work[sym]];
    }

    /* create new sub-table if needed */
    if (len > root && (huff & mask) !== low) {
      /* if first time, transition to sub-tables */
      if (drop === 0) {
        drop = root;
      }

      /* increment past last table */
      next += min;            /* here min is 1 << curr */

      /* determine length of next table */
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) { break; }
        curr++;
        left <<= 1;
      }

      /* check for enough space */
      used += 1 << curr;
      if ((type === LENS && used > ENOUGH_LENS) ||
        (type === DISTS && used > ENOUGH_DISTS)) {
        return 1;
      }

      /* point entry in root table to sub-table */
      low = huff & mask;
      /*table.op[low] = curr;
      table.bits[low] = root;
      table.val[low] = next - opts.table_index;*/
      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
    }
  }

  /* fill in remaining table entry if code is incomplete (guaranteed to have
   at most one remaining entry, since if the code is incomplete, the
   maximum code length that was allowed to get this far is one bit) */
  if (huff !== 0) {
    //table.op[next + huff] = 64;            /* invalid code marker */
    //table.bits[next + huff] = len - drop;
    //table.val[next + huff] = 0;
    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
  }

  /* set return parameters */
  //opts.table_index += used;
  opts.bits = root;
  return 0;
};


/***/ }),

/***/ 1890:
/***/ ((module) => {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {
  2:      'need dictionary',     /* Z_NEED_DICT       2  */
  1:      'stream end',          /* Z_STREAM_END      1  */
  0:      '',                    /* Z_OK              0  */
  '-1':   'file error',          /* Z_ERRNO         (-1) */
  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
};


/***/ }),

/***/ 8754:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

/* eslint-disable space-unary-ops */

var utils = __nccwpck_require__(5483);

/* Public constants ==========================================================*/
/* ===========================================================================*/


//var Z_FILTERED          = 1;
//var Z_HUFFMAN_ONLY      = 2;
//var Z_RLE               = 3;
var Z_FIXED               = 4;
//var Z_DEFAULT_STRATEGY  = 0;

/* Possible values of the data_type field (though see inflate()) */
var Z_BINARY              = 0;
var Z_TEXT                = 1;
//var Z_ASCII             = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;

/*============================================================================*/


function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }

// From zutil.h

var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES    = 2;
/* The three kinds of block type */

var MIN_MATCH    = 3;
var MAX_MATCH    = 258;
/* The minimum and maximum match lengths */

// From deflate.h
/* ===========================================================================
 * Internal compression state.
 */

var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */

var LITERALS      = 256;
/* number of literal bytes 0..255 */

var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */

var D_CODES       = 30;
/* number of distance codes */

var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */

var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */

var MAX_BITS      = 15;
/* All codes must not exceed MAX_BITS bits */

var Buf_size      = 16;
/* size of bit buffer in bi_buf */


/* ===========================================================================
 * Constants
 */

var MAX_BL_BITS = 7;
/* Bit length codes must not exceed MAX_BL_BITS bits */

var END_BLOCK   = 256;
/* end of block literal code */

var REP_3_6     = 16;
/* repeat previous bit length 3-6 times (2 bits of repeat count) */

var REPZ_3_10   = 17;
/* repeat a zero length 3-10 times  (3 bits of repeat count) */

var REPZ_11_138 = 18;
/* repeat a zero length 11-138 times  (7 bits of repeat count) */

/* eslint-disable comma-spacing,array-bracket-spacing */
var extra_lbits =   /* extra bits for each length code */
  [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];

var extra_dbits =   /* extra bits for each distance code */
  [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];

var extra_blbits =  /* extra bits for each bit length code */
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];

var bl_order =
  [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
/* eslint-enable comma-spacing,array-bracket-spacing */

/* The lengths of the bit length codes are sent in order of decreasing
 * probability, to avoid transmitting the lengths for unused bit length codes.
 */

/* ===========================================================================
 * Local data. These are initialized only once.
 */

// We pre-fill arrays with 0 to avoid uninitialized gaps

var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

// !!!! Use flat array instead of structure, Freq = i*2, Len = i*2+1
var static_ltree  = new Array((L_CODES + 2) * 2);
zero(static_ltree);
/* The static literal tree. Since the bit lengths are imposed, there is no
 * need for the L_CODES extra codes used during heap construction. However
 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
 * below).
 */

var static_dtree  = new Array(D_CODES * 2);
zero(static_dtree);
/* The static distance tree. (Actually a trivial tree since all codes use
 * 5 bits.)
 */

var _dist_code    = new Array(DIST_CODE_LEN);
zero(_dist_code);
/* Distance codes. The first 256 values correspond to the distances
 * 3 .. 258, the last 256 values correspond to the top 8 bits of
 * the 15 bit distances.
 */

var _length_code  = new Array(MAX_MATCH - MIN_MATCH + 1);
zero(_length_code);
/* length code for each normalized match length (0 == MIN_MATCH) */

var base_length   = new Array(LENGTH_CODES);
zero(base_length);
/* First normalized length for each code (0 = MIN_MATCH) */

var base_dist     = new Array(D_CODES);
zero(base_dist);
/* First normalized distance for each code (0 = distance of 1) */


function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

  this.static_tree  = static_tree;  /* static tree or NULL */
  this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
  this.extra_base   = extra_base;   /* base index for extra_bits */
  this.elems        = elems;        /* max number of elements in the tree */
  this.max_length   = max_length;   /* max bit length for the codes */

  // show if `static_tree` has data or dummy - needed for monomorphic objects
  this.has_stree    = static_tree && static_tree.length;
}


var static_l_desc;
var static_d_desc;
var static_bl_desc;


function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;     /* the dynamic tree */
  this.max_code = 0;            /* largest code with non zero frequency */
  this.stat_desc = stat_desc;   /* the corresponding static tree */
}



function d_code(dist) {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
}


/* ===========================================================================
 * Output a short LSB first on the stream.
 * IN assertion: there is enough room in pendingBuf.
 */
function put_short(s, w) {
//    put_byte(s, (uch)((w) & 0xff));
//    put_byte(s, (uch)((ush)(w) >> 8));
  s.pending_buf[s.pending++] = (w) & 0xff;
  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
}


/* ===========================================================================
 * Send a value on a given number of bits.
 * IN assertion: length <= 16 and value fits in length bits.
 */
function send_bits(s, value, length) {
  if (s.bi_valid > (Buf_size - length)) {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> (Buf_size - s.bi_valid);
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    s.bi_valid += length;
  }
}


function send_code(s, c, tree) {
  send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
}


/* ===========================================================================
 * Reverse the first len bits of a code, using straightforward code (a faster
 * method would use a table)
 * IN assertion: 1 <= len <= 15
 */
function bi_reverse(code, len) {
  var res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
}


/* ===========================================================================
 * Flush the bit buffer, keeping at most 7 bits in it.
 */
function bi_flush(s) {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;

  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
}


/* ===========================================================================
 * Compute the optimal bit lengths for a tree and update the total bit length
 * for the current block.
 * IN assertion: the fields freq and dad are set, heap[heap_max] and
 *    above are the tree nodes sorted by increasing frequency.
 * OUT assertions: the field len is set to the optimal bit length, the
 *     array bl_count contains the frequencies for each bit length.
 *     The length opt_len is updated; static_len is also updated if stree is
 *     not null.
 */
function gen_bitlen(s, desc)
//    deflate_state *s;
//    tree_desc *desc;    /* the tree descriptor */
{
  var tree            = desc.dyn_tree;
  var max_code        = desc.max_code;
  var stree           = desc.stat_desc.static_tree;
  var has_stree       = desc.stat_desc.has_stree;
  var extra           = desc.stat_desc.extra_bits;
  var base            = desc.stat_desc.extra_base;
  var max_length      = desc.stat_desc.max_length;
  var h;              /* heap index */
  var n, m;           /* iterate over the tree elements */
  var bits;           /* bit length */
  var xbits;          /* extra bits */
  var f;              /* frequency */
  var overflow = 0;   /* number of elements with bit length too large */

  for (bits = 0; bits <= MAX_BITS; bits++) {
    s.bl_count[bits] = 0;
  }

  /* In a first pass, compute the optimal bit lengths (which may
   * overflow in the case of the bit length tree).
   */
  tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */

  for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1]/*.Len*/ = bits;
    /* We overwrite tree[n].Dad which is no longer needed */

    if (n > max_code) { continue; } /* not a leaf node */

    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f = tree[n * 2]/*.Freq*/;
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
    }
  }
  if (overflow === 0) { return; }

  // Trace((stderr,"\nbit length overflow\n"));
  /* This happens for example on obj2 and pic of the Calgary corpus */

  /* Find the first bit length which could increase: */
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) { bits--; }
    s.bl_count[bits]--;      /* move one leaf down the tree */
    s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
    s.bl_count[max_length]--;
    /* The brother of the overflow item also moves one step up,
     * but this does not affect bl_count[max_length]
     */
    overflow -= 2;
  } while (overflow > 0);

  /* Now recompute all bit lengths, scanning in increasing frequency.
   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
   * lengths instead of fixing only the wrong ones. This idea is taken
   * from 'ar' written by Haruhiko Okumura.)
   */
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) { continue; }
      if (tree[m * 2 + 1]/*.Len*/ !== bits) {
        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
        s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
        tree[m * 2 + 1]/*.Len*/ = bits;
      }
      n--;
    }
  }
}


/* ===========================================================================
 * Generate the codes for a given tree and bit counts (which need not be
 * optimal).
 * IN assertion: the array bl_count contains the bit length statistics for
 * the given tree and the field len is set for all tree elements.
 * OUT assertion: the field code is set for all tree elements of non
 *     zero code length.
 */
function gen_codes(tree, max_code, bl_count)
//    ct_data *tree;             /* the tree to decorate */
//    int max_code;              /* largest code with non zero frequency */
//    ushf *bl_count;            /* number of codes at each bit length */
{
  var next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */
  var code = 0;              /* running code value */
  var bits;                  /* bit index */
  var n;                     /* code index */

  /* The distribution counts are first used to generate the code values
   * without bit reversal.
   */
  for (bits = 1; bits <= MAX_BITS; bits++) {
    next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
  }
  /* Check that the bit counts in bl_count are consistent. The last code
   * must be all ones.
   */
  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
  //        "inconsistent bit counts");
  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

  for (n = 0;  n <= max_code; n++) {
    var len = tree[n * 2 + 1]/*.Len*/;
    if (len === 0) { continue; }
    /* Now reverse the bits */
    tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);

    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
  }
}


/* ===========================================================================
 * Initialize the various 'constant' tables.
 */
function tr_static_init() {
  var n;        /* iterates over tree elements */
  var bits;     /* bit counter */
  var length;   /* length value */
  var code;     /* code value */
  var dist;     /* distance index */
  var bl_count = new Array(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  // do check in _tr_init()
  //if (static_init_done) return;

  /* For some embedded targets, global variables are not initialized: */
/*#ifdef NO_INIT_GLOBAL_POINTERS
  static_l_desc.static_tree = static_ltree;
  static_l_desc.extra_bits = extra_lbits;
  static_d_desc.static_tree = static_dtree;
  static_d_desc.extra_bits = extra_dbits;
  static_bl_desc.extra_bits = extra_blbits;
#endif*/

  /* Initialize the mapping length (0..255) -> length code (0..28) */
  length = 0;
  for (code = 0; code < LENGTH_CODES - 1; code++) {
    base_length[code] = length;
    for (n = 0; n < (1 << extra_lbits[code]); n++) {
      _length_code[length++] = code;
    }
  }
  //Assert (length == 256, "tr_static_init: length != 256");
  /* Note that the length 255 (match length 258) can be represented
   * in two different ways: code 284 + 5 bits or code 285, so we
   * overwrite length_code[255] to use the best encoding:
   */
  _length_code[length - 1] = code;

  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
  dist = 0;
  for (code = 0; code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0; n < (1 << extra_dbits[code]); n++) {
      _dist_code[dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: dist != 256");
  dist >>= 7; /* from now on, all distances are divided by 128 */
  for (; code < D_CODES; code++) {
    base_dist[code] = dist << 7;
    for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

  /* Construct the codes of the static literal tree */
  for (bits = 0; bits <= MAX_BITS; bits++) {
    bl_count[bits] = 0;
  }

  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1]/*.Len*/ = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1]/*.Len*/ = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  /* Codes 286 and 287 do not exist, but we must include them in the
   * tree construction to get a canonical Huffman tree (longest code
   * all ones)
   */
  gen_codes(static_ltree, L_CODES + 1, bl_count);

  /* The static distance tree is trivial: */
  for (n = 0; n < D_CODES; n++) {
    static_dtree[n * 2 + 1]/*.Len*/ = 5;
    static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
  }

  // Now data ready and we can init static trees
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);

  //static_init_done = true;
}


/* ===========================================================================
 * Initialize a new block.
 */
function init_block(s) {
  var n; /* iterates over tree elements */

  /* Initialize the trees. */
  for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < BL_CODES; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }

  s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
  s.opt_len = s.static_len = 0;
  s.last_lit = s.matches = 0;
}


/* ===========================================================================
 * Flush the bit buffer and align the output on a byte boundary
 */
function bi_windup(s)
{
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    //put_byte(s, (Byte)s->bi_buf);
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
}

/* ===========================================================================
 * Copy a stored block, storing first the length and its
 * one's complement if requested.
 */
function copy_block(s, buf, len, header)
//DeflateState *s;
//charf    *buf;    /* the input data */
//unsigned len;     /* its length */
//int      header;  /* true if block header must be written */
{
  bi_windup(s);        /* align on byte boundary */

  if (header) {
    put_short(s, len);
    put_short(s, ~len);
  }
//  while (len--) {
//    put_byte(s, *buf++);
//  }
  utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
  s.pending += len;
}

/* ===========================================================================
 * Compares to subtrees, using the tree depth as tie breaker when
 * the subtrees have equal frequency. This minimizes the worst case length.
 */
function smaller(tree, n, m, depth) {
  var _n2 = n * 2;
  var _m2 = m * 2;
  return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
         (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
}

/* ===========================================================================
 * Restore the heap property by moving down the tree starting at node k,
 * exchanging a node with the smallest of its two sons if necessary, stopping
 * when the heap property is re-established (each father smaller than its
 * two sons).
 */
function pqdownheap(s, tree, k)
//    deflate_state *s;
//    ct_data *tree;  /* the tree to restore */
//    int k;               /* node to move down */
{
  var v = s.heap[k];
  var j = k << 1;  /* left son of k */
  while (j <= s.heap_len) {
    /* Set j to the smallest of the two sons: */
    if (j < s.heap_len &&
      smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    /* Exit if v is smaller than both sons */
    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

    /* Exchange v with the smallest son */
    s.heap[k] = s.heap[j];
    k = j;

    /* And continue down the tree, setting j to the left son of k */
    j <<= 1;
  }
  s.heap[k] = v;
}


// inlined manually
// var SMALLEST = 1;

/* ===========================================================================
 * Send the block data compressed using the given Huffman trees
 */
function compress_block(s, ltree, dtree)
//    deflate_state *s;
//    const ct_data *ltree; /* literal tree */
//    const ct_data *dtree; /* distance tree */
{
  var dist;           /* distance of matched string */
  var lc;             /* match length or unmatched char (if dist == 0) */
  var lx = 0;         /* running index in l_buf */
  var code;           /* the code to send */
  var extra;          /* number of extra bits to send */

  if (s.last_lit !== 0) {
    do {
      dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
      lc = s.pending_buf[s.l_buf + lx];
      lx++;

      if (dist === 0) {
        send_code(s, lc, ltree); /* send a literal byte */
        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
      } else {
        /* Here, lc is the match length - MIN_MATCH */
        code = _length_code[lc];
        send_code(s, code + LITERALS + 1, ltree); /* send the length code */
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);       /* send the extra length bits */
        }
        dist--; /* dist is now the match distance - 1 */
        code = d_code(dist);
        //Assert (code < D_CODES, "bad d_code");

        send_code(s, code, dtree);       /* send the distance code */
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);   /* send the extra distance bits */
        }
      } /* literal or match pair ? */

      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
      //       "pendingBuf overflow");

    } while (lx < s.last_lit);
  }

  send_code(s, END_BLOCK, ltree);
}


/* ===========================================================================
 * Construct one Huffman tree and assigns the code bit strings and lengths.
 * Update the total bit length for the current block.
 * IN assertion: the field freq is set for all tree elements.
 * OUT assertions: the fields len and code are set to the optimal bit length
 *     and corresponding code. The length opt_len is updated; static_len is
 *     also updated if stree is not null. The field max_code is set.
 */
function build_tree(s, desc)
//    deflate_state *s;
//    tree_desc *desc; /* the tree descriptor */
{
  var tree     = desc.dyn_tree;
  var stree    = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var elems    = desc.stat_desc.elems;
  var n, m;          /* iterate over heap elements */
  var max_code = -1; /* largest code with non zero frequency */
  var node;          /* new node being created */

  /* Construct the initial heap, with least frequent element in
   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
   * heap[0] is not used.
   */
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE;

  for (n = 0; n < elems; n++) {
    if (tree[n * 2]/*.Freq*/ !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;

    } else {
      tree[n * 2 + 1]/*.Len*/ = 0;
    }
  }

  /* The pkzip format requires that at least one distance code exists,
   * and that at least one bit should be sent even if there is only one
   * possible code. So to avoid special checks later on we force at least
   * two codes of non zero frequency.
   */
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
    tree[node * 2]/*.Freq*/ = 1;
    s.depth[node] = 0;
    s.opt_len--;

    if (has_stree) {
      s.static_len -= stree[node * 2 + 1]/*.Len*/;
    }
    /* node is 0 or 1 so it does not have extra bits */
  }
  desc.max_code = max_code;

  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
   * establish sub-heaps of increasing lengths:
   */
  for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

  /* Construct the Huffman tree by repeatedly combining the least two
   * frequent nodes.
   */
  node = elems;              /* next internal node of the tree */
  do {
    //pqremove(s, tree, n);  /* n = node of least frequency */
    /*** pqremove ***/
    n = s.heap[1/*SMALLEST*/];
    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
    pqdownheap(s, tree, 1/*SMALLEST*/);
    /***/

    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
    s.heap[--s.heap_max] = m;

    /* Create a new node father of n and m */
    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;

    /* and insert the new node in the heap */
    s.heap[1/*SMALLEST*/] = node++;
    pqdownheap(s, tree, 1/*SMALLEST*/);

  } while (s.heap_len >= 2);

  s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

  /* At this point, the fields freq and dad are set. We can now
   * generate the bit lengths.
   */
  gen_bitlen(s, desc);

  /* The field len is now set, we can generate the bit codes */
  gen_codes(tree, max_code, s.bl_count);
}


/* ===========================================================================
 * Scan a literal or distance tree to determine the frequencies of the codes
 * in the bit length tree.
 */
function scan_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree;   /* the tree to be scanned */
//    int max_code;    /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      s.bl_tree[curlen * 2]/*.Freq*/ += count;

    } else if (curlen !== 0) {

      if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
      s.bl_tree[REP_3_6 * 2]/*.Freq*/++;

    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;

    } else {
      s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
    }

    count = 0;
    prevlen = curlen;

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Send a literal or distance tree in compressed form, using the codes in
 * bl_tree.
 */
function send_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree; /* the tree to be scanned */
//    int max_code;       /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  /* tree[max_code+1].Len = -1; */  /* guard already set */
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      //Assert(count >= 3 && count <= 6, " 3_6?");
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);

    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);

    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }

    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Construct the Huffman tree for the bit lengths and return the index in
 * bl_order of the last bit length code to send.
 */
function build_bl_tree(s) {
  var max_blindex;  /* index of last bit length code of non zero freq */

  /* Determine the bit length frequencies for literal and distance trees */
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

  /* Build the bit length tree: */
  build_tree(s, s.bl_desc);
  /* opt_len now includes the length of the tree representations, except
   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
   */

  /* Determine the number of bit length codes to send. The pkzip format
   * requires that at least 4 bit length codes be sent. (appnote.txt says
   * 3 but the actual value used is 4.)
   */
  for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
      break;
    }
  }
  /* Update opt_len to include the bit length tree and counts */
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
  //        s->opt_len, s->static_len));

  return max_blindex;
}


/* ===========================================================================
 * Send the header for a block using dynamic Huffman trees: the counts, the
 * lengths of the bit length codes, the literal tree and the distance tree.
 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
 */
function send_all_trees(s, lcodes, dcodes, blcodes)
//    deflate_state *s;
//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
{
  var rank;                    /* index in bl_order */

  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
  //        "too many codes");
  //Tracev((stderr, "\nbl counts: "));
  send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
  send_bits(s, dcodes - 1,   5);
  send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */
  for (rank = 0; rank < blcodes; rank++) {
    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
  }
  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
}


/* ===========================================================================
 * Check if the data type is TEXT or BINARY, using the following algorithm:
 * - TEXT if the two conditions below are satisfied:
 *    a) There are no non-portable control characters belonging to the
 *       "black list" (0..6, 14..25, 28..31).
 *    b) There is at least one printable character belonging to the
 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
 * - BINARY otherwise.
 * - The following partially-portable control characters form a
 *   "gray list" that is ignored in this detection algorithm:
 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
 * IN assertion: the fields Freq of dyn_ltree are set.
 */
function detect_data_type(s) {
  /* black_mask is the bit mask of black-listed bytes
   * set bits 0..6, 14..25, and 28..31
   * 0xf3ffc07f = binary 11110011111111111100000001111111
   */
  var black_mask = 0xf3ffc07f;
  var n;

  /* Check for non-textual ("black-listed") bytes. */
  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
    if ((black_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
      return Z_BINARY;
    }
  }

  /* Check for textual ("white-listed") bytes. */
  if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
      s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS; n++) {
    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
      return Z_TEXT;
    }
  }

  /* There are no "black-listed" or "white-listed" bytes:
   * this stream either is empty or has tolerated ("gray-listed") bytes only.
   */
  return Z_BINARY;
}


var static_init_done = false;

/* ===========================================================================
 * Initialize the tree data structures for a new zlib stream.
 */
function _tr_init(s)
{

  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }

  s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

  s.bi_buf = 0;
  s.bi_valid = 0;

  /* Initialize the first block of the first file: */
  init_block(s);
}


/* ===========================================================================
 * Send a stored block
 */
function _tr_stored_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
  copy_block(s, buf, stored_len, true); /* with header */
}


/* ===========================================================================
 * Send one empty static block to give enough lookahead for inflate.
 * This takes 10 bits, of which 7 may remain in the bit buffer.
 */
function _tr_align(s) {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
}


/* ===========================================================================
 * Determine the best encoding for the current block: dynamic trees, static
 * trees or store, and output the encoded block to the zip file.
 */
function _tr_flush_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block, or NULL if too old */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
  var max_blindex = 0;        /* index of last bit length code of non zero freq */

  /* Build the Huffman trees unless a stored block is forced */
  if (s.level > 0) {

    /* Check if the file is binary or text */
    if (s.strm.data_type === Z_UNKNOWN) {
      s.strm.data_type = detect_data_type(s);
    }

    /* Construct the literal and distance trees */
    build_tree(s, s.l_desc);
    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));

    build_tree(s, s.d_desc);
    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));
    /* At this point, opt_len and static_len are the total bit lengths of
     * the compressed block data, excluding the tree representations.
     */

    /* Build the bit length tree for the above two trees, and get the index
     * in bl_order of the last bit length code to send.
     */
    max_blindex = build_bl_tree(s);

    /* Determine the best encoding. Compute the block lengths in bytes. */
    opt_lenb = (s.opt_len + 3 + 7) >>> 3;
    static_lenb = (s.static_len + 3 + 7) >>> 3;

    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
    //        s->last_lit));

    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

  } else {
    // Assert(buf != (char*)0, "lost buf");
    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
  }

  if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
    /* 4: two words for the lengths */

    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
     * Otherwise we can't have processed more than WSIZE input bytes since
     * the last block flush, because compression would have been
     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
     * transform a block into a stored block.
     */
    _tr_stored_block(s, buf, stored_len, last);

  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);

  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
  /* The above check is made mod 2^32, for files larger than 512 MB
   * and uLong implemented on 32 bits.
   */
  init_block(s);

  if (last) {
    bi_windup(s);
  }
  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
  //       s->compressed_len-7*last));
}

/* ===========================================================================
 * Save the match info and tally the frequency counts. Return true if
 * the current block must be flushed.
 */
function _tr_tally(s, dist, lc)
//    deflate_state *s;
//    unsigned dist;  /* distance of matched string */
//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
{
  //var out_length, in_length, dcode;

  s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
  s.last_lit++;

  if (dist === 0) {
    /* lc is the unmatched char */
    s.dyn_ltree[lc * 2]/*.Freq*/++;
  } else {
    s.matches++;
    /* Here, lc is the match length - MIN_MATCH */
    dist--;             /* dist = match distance - 1 */
    //Assert((ush)dist < (ush)MAX_DIST(s) &&
    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

    s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]/*.Freq*/++;
    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
  }

// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility

//#ifdef TRUNCATE_BLOCK
//  /* Try to guess if it is profitable to stop the current block here */
//  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
//    /* Compute an upper bound for the compressed length */
//    out_length = s.last_lit*8;
//    in_length = s.strstart - s.block_start;
//
//    for (dcode = 0; dcode < D_CODES; dcode++) {
//      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
//    }
//    out_length >>>= 3;
//    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
//    //       s->last_lit, in_length, out_length,
//    //       100L - out_length*100L/in_length));
//    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
//      return true;
//    }
//  }
//#endif

  return (s.last_lit === s.lit_bufsize - 1);
  /* We avoid equality with lit_bufsize because of wraparound at 64K
   * on 16 bit machines and because stored blocks are restricted to
   * 64K-1 bytes.
   */
}

exports._tr_init  = _tr_init;
exports._tr_stored_block = _tr_stored_block;
exports._tr_flush_block  = _tr_flush_block;
exports._tr_tally = _tr_tally;
exports._tr_align = _tr_align;


/***/ }),

/***/ 6442:
/***/ ((module) => {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function ZStream() {
  /* next input byte */
  this.input = null; // JS specific, because we have no pointers
  this.next_in = 0;
  /* number of bytes available at input */
  this.avail_in = 0;
  /* total number of input bytes read so far */
  this.total_in = 0;
  /* next output byte should be put there */
  this.output = null; // JS specific, because we have no pointers
  this.next_out = 0;
  /* remaining free space at output */
  this.avail_out = 0;
  /* total number of bytes output so far */
  this.total_out = 0;
  /* last error message, NULL if no error */
  this.msg = ''/*Z_NULL*/;
  /* not visible by applications */
  this.state = null;
  /* best guess about the data type: binary or text */
  this.data_type = 2/*Z_UNKNOWN*/;
  /* adler32 value of the uncompressed data */
  this.adler = 0;
}

module.exports = ZStream;


/***/ }),

/***/ 8769:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.kFieldCount = exports.kResponseCountField = exports.kRequestCountField = exports.isTaskQueue = exports.markMovable = exports.isMovable = exports.isTransferable = exports.kQueueOptions = exports.kValue = exports.kTransferable = exports.commonState = void 0;
;
exports.commonState = {
    isWorkerThread: false,
    workerData: undefined
};
// Internal symbol used to mark Transferable objects returned
// by the Piscina.move() function
const kMovable = Symbol('Piscina.kMovable');
exports.kTransferable = Symbol.for('Piscina.transferable');
exports.kValue = Symbol.for('Piscina.valueOf');
exports.kQueueOptions = Symbol.for('Piscina.queueOptions');
// True if the object implements the Transferable interface
function isTransferable(value) {
    return value != null &&
        typeof value === 'object' &&
        exports.kTransferable in value &&
        exports.kValue in value;
}
exports.isTransferable = isTransferable;
// True if object implements Transferable and has been returned
// by the Piscina.move() function
function isMovable(value) {
    return isTransferable(value) && value[kMovable] === true;
}
exports.isMovable = isMovable;
function markMovable(value) {
    Object.defineProperty(value, kMovable, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: true
    });
}
exports.markMovable = markMovable;
function isTaskQueue(value) {
    return typeof value === 'object' &&
        value !== null &&
        'size' in value &&
        typeof value.shift === 'function' &&
        typeof value.remove === 'function' &&
        typeof value.push === 'function';
}
exports.isTaskQueue = isTaskQueue;
exports.kRequestCountField = 0;
exports.kResponseCountField = 1;
exports.kFieldCount = 2;
//# sourceMappingURL=common.js.map

/***/ }),

/***/ 6486:
/***/ (function(module, __unused_webpack_exports, __nccwpck_require__) {

"use strict";

var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _value, _view, _pool;
const worker_threads_1 = __nccwpck_require__(1267);
const events_1 = __nccwpck_require__(2361);
const eventemitter_asyncresource_1 = __importDefault(__nccwpck_require__(7966));
const async_hooks_1 = __nccwpck_require__(852);
const os_1 = __nccwpck_require__(2037);
const url_1 = __nccwpck_require__(7310);
const path_1 = __nccwpck_require__(1017);
const util_1 = __nccwpck_require__(3837);
const assert_1 = __importDefault(__nccwpck_require__(9491));
const hdr_histogram_js_1 = __nccwpck_require__(6475);
const perf_hooks_1 = __nccwpck_require__(4074);
const hdr_histogram_percentiles_obj_1 = __importDefault(__nccwpck_require__(6036));
const common_1 = __nccwpck_require__(8769);
const package_json_1 = __nccwpck_require__(9399);
const cpuCount = (() => {
    try {
        return os_1.cpus().length;
    }
    catch (_a) {
        /* istanbul ignore next */
        return 1;
    }
})();
;
function onabort(abortSignal, listener) {
    if ('addEventListener' in abortSignal) {
        abortSignal.addEventListener('abort', listener, { once: true });
    }
    else {
        abortSignal.once('abort', listener);
    }
}
class AbortError extends Error {
    constructor() {
        super('The task has been aborted');
    }
    get name() { return 'AbortError'; }
}
class ArrayTaskQueue {
    constructor() {
        this.tasks = [];
    }
    get size() { return this.tasks.length; }
    shift() {
        return this.tasks.shift();
    }
    push(task) {
        this.tasks.push(task);
    }
    remove(task) {
        const index = this.tasks.indexOf(task);
        assert_1.default.notStrictEqual(index, -1);
        this.tasks.splice(index, 1);
    }
}
const kDefaultOptions = {
    filename: null,
    minThreads: Math.max(cpuCount / 2, 1),
    maxThreads: cpuCount * 1.5,
    idleTimeout: 0,
    maxQueue: Infinity,
    concurrentTasksPerWorker: 1,
    useAtomics: true,
    taskQueue: new ArrayTaskQueue(),
    niceIncrement: 0,
    trackUnmanagedFds: true
};
class DirectlyTransferable {
    constructor(value) {
        _value.set(this, void 0);
        __classPrivateFieldSet(this, _value, value);
    }
    get [(_value = new WeakMap(), common_1.kTransferable)]() { return __classPrivateFieldGet(this, _value); }
    get [common_1.kValue]() { return __classPrivateFieldGet(this, _value); }
}
class ArrayBufferViewTransferable {
    constructor(view) {
        _view.set(this, void 0);
        __classPrivateFieldSet(this, _view, view);
    }
    get [(_view = new WeakMap(), common_1.kTransferable)]() { return __classPrivateFieldGet(this, _view).buffer; }
    get [common_1.kValue]() { return __classPrivateFieldGet(this, _view); }
}
let taskIdCounter = 0;
function maybeFileURLToPath(filename) {
    return filename.startsWith('file:')
        ? url_1.fileURLToPath(new url_1.URL(filename))
        : filename;
}
// Extend AsyncResource so that async relations between posting a task and
// receiving its result are visible to diagnostic tools.
class TaskInfo extends async_hooks_1.AsyncResource {
    constructor(task, transferList, filename, callback, abortSignal, triggerAsyncId) {
        super('Piscina.Task', { requireManualDestroy: true, triggerAsyncId });
        this.abortListener = null;
        this.workerInfo = null;
        this.callback = callback;
        this.task = task;
        this.transferList = transferList;
        // If the task is a Transferable returned by
        // Piscina.move(), then add it to the transferList
        // automatically
        if (common_1.isMovable(task)) {
            if (this.transferList === undefined) {
                this.transferList = [];
            }
            this.transferList =
                this.transferList.concat(task[common_1.kTransferable]);
            this.task = task[common_1.kValue];
        }
        this.filename = filename;
        this.taskId = taskIdCounter++;
        this.abortSignal = abortSignal;
        this.created = perf_hooks_1.performance.now();
        this.started = 0;
    }
    releaseTask() {
        const ret = this.task;
        this.task = null;
        return ret;
    }
    done(err, result) {
        this.runInAsyncScope(this.callback, null, err, result);
        this.emitDestroy(); // `TaskInfo`s are used only once.
        // If an abort signal was used, remove the listener from it when
        // done to make sure we do not accidentally leak.
        if (this.abortSignal && this.abortListener) {
            if ('removeEventListener' in this.abortSignal && this.abortListener) {
                this.abortSignal.removeEventListener('abort', this.abortListener);
            }
            else {
                this.abortSignal.off('abort', this.abortListener);
            }
        }
    }
    get [common_1.kQueueOptions]() {
        return common_1.kQueueOptions in this.task ? this.task[common_1.kQueueOptions] : null;
    }
}
class AsynchronouslyCreatedResource {
    constructor() {
        this.onreadyListeners = [];
    }
    markAsReady() {
        const listeners = this.onreadyListeners;
        assert_1.default(listeners !== null);
        this.onreadyListeners = null;
        for (const listener of listeners) {
            listener();
        }
    }
    isReady() {
        return this.onreadyListeners === null;
    }
    onReady(fn) {
        if (this.onreadyListeners === null) {
            fn(); // Zalgo is okay here.
            return;
        }
        this.onreadyListeners.push(fn);
    }
}
class AsynchronouslyCreatedResourcePool {
    constructor(maximumUsage) {
        this.pendingItems = new Set();
        this.readyItems = new Set();
        this.maximumUsage = maximumUsage;
        this.onAvailableListeners = [];
    }
    add(item) {
        this.pendingItems.add(item);
        item.onReady(() => {
            /* istanbul ignore else */
            if (this.pendingItems.has(item)) {
                this.pendingItems.delete(item);
                this.readyItems.add(item);
                this.maybeAvailable(item);
            }
        });
    }
    delete(item) {
        this.pendingItems.delete(item);
        this.readyItems.delete(item);
    }
    findAvailable() {
        let minUsage = this.maximumUsage;
        let candidate = null;
        for (const item of this.readyItems) {
            const usage = item.currentUsage();
            if (usage === 0)
                return item;
            if (usage < minUsage) {
                candidate = item;
                minUsage = usage;
            }
        }
        return candidate;
    }
    *[Symbol.iterator]() {
        yield* this.pendingItems;
        yield* this.readyItems;
    }
    get size() {
        return this.pendingItems.size + this.readyItems.size;
    }
    maybeAvailable(item) {
        /* istanbul ignore else */
        if (item.currentUsage() < this.maximumUsage) {
            for (const listener of this.onAvailableListeners) {
                listener(item);
            }
        }
    }
    onAvailable(fn) {
        this.onAvailableListeners.push(fn);
    }
}
const Errors = {
    ThreadTermination: () => new Error('Terminating worker thread'),
    FilenameNotProvided: () => new Error('filename must be provided to runTask() or in options object'),
    TaskQueueAtLimit: () => new Error('Task queue is at limit'),
    NoTaskQueueAvailable: () => new Error('No task queue available and all Workers are busy')
};
class WorkerInfo extends AsynchronouslyCreatedResource {
    constructor(worker, port, onMessage) {
        super();
        this.idleTimeout = null; // eslint-disable-line no-undef
        this.lastSeenResponseCount = 0;
        this.worker = worker;
        this.port = port;
        this.port.on('message', (message) => this._handleResponse(message));
        this.onMessage = onMessage;
        this.taskInfos = new Map();
        this.sharedBuffer = new Int32Array(new SharedArrayBuffer(common_1.kFieldCount * Int32Array.BYTES_PER_ELEMENT));
    }
    destroy() {
        this.worker.terminate();
        this.port.close();
        this.clearIdleTimeout();
        for (const taskInfo of this.taskInfos.values()) {
            taskInfo.done(Errors.ThreadTermination());
        }
        this.taskInfos.clear();
    }
    clearIdleTimeout() {
        if (this.idleTimeout !== null) {
            clearTimeout(this.idleTimeout);
            this.idleTimeout = null;
        }
    }
    ref() {
        this.port.ref();
        return this;
    }
    unref() {
        // Note: Do not call ref()/unref() on the Worker itself since that may cause
        // a hard crash, see https://github.com/nodejs/node/pull/33394.
        this.port.unref();
        return this;
    }
    _handleResponse(message) {
        this.onMessage(message);
        if (this.taskInfos.size === 0) {
            // No more tasks running on this Worker means it should not keep the
            // process running.
            this.unref();
        }
    }
    postTask(taskInfo) {
        assert_1.default(!this.taskInfos.has(taskInfo.taskId));
        const message = {
            task: taskInfo.releaseTask(),
            taskId: taskInfo.taskId,
            filename: taskInfo.filename
        };
        try {
            this.port.postMessage(message, taskInfo.transferList);
        }
        catch (err) {
            // This would mostly happen if e.g. message contains unserializable data
            // or transferList is invalid.
            taskInfo.done(err);
            return;
        }
        taskInfo.workerInfo = this;
        this.taskInfos.set(taskInfo.taskId, taskInfo);
        this.ref();
        this.clearIdleTimeout();
        // Inform the worker that there are new messages posted, and wake it up
        // if it is waiting for one.
        Atomics.add(this.sharedBuffer, common_1.kRequestCountField, 1);
        Atomics.notify(this.sharedBuffer, common_1.kRequestCountField, 1);
    }
    processPendingMessages() {
        // If we *know* that there are more messages than we have received using
        // 'message' events yet, then try to load and handle them synchronously,
        // without the need to wait for more expensive events on the event loop.
        // This would usually break async tracking, but in our case, we already have
        // the extra TaskInfo/AsyncResource layer that rectifies that situation.
        const actualResponseCount = Atomics.load(this.sharedBuffer, common_1.kResponseCountField);
        if (actualResponseCount !== this.lastSeenResponseCount) {
            this.lastSeenResponseCount = actualResponseCount;
            let entry;
            while ((entry = worker_threads_1.receiveMessageOnPort(this.port)) !== undefined) {
                this._handleResponse(entry.message);
            }
        }
    }
    isRunningAbortableTask() {
        // If there are abortable tasks, we are running one at most per Worker.
        if (this.taskInfos.size !== 1)
            return false;
        const [[, task]] = this.taskInfos;
        return task.abortSignal !== null;
    }
    currentUsage() {
        if (this.isRunningAbortableTask())
            return Infinity;
        return this.taskInfos.size;
    }
}
class ThreadPool {
    constructor(publicInterface, options) {
        var _a;
        this.skipQueue = [];
        this.completed = 0;
        this.start = perf_hooks_1.performance.now();
        this.inProcessPendingMessages = false;
        this.startingUp = false;
        this.workerFailsDuringBootstrap = false;
        this.publicInterface = publicInterface;
        this.taskQueue = options.taskQueue || new ArrayTaskQueue();
        this.runTime = hdr_histogram_js_1.build({ lowestDiscernibleValue: 1 });
        this.waitTime = hdr_histogram_js_1.build({ lowestDiscernibleValue: 1 });
        const filename = options.filename ? maybeFileURLToPath(options.filename) : null;
        this.options = { ...kDefaultOptions, ...options, filename, maxQueue: 0 };
        // The >= and <= could be > and < but this way we get 100 % coverage 🙃
        if (options.maxThreads !== undefined &&
            this.options.minThreads >= options.maxThreads) {
            this.options.minThreads = options.maxThreads;
        }
        if (options.minThreads !== undefined &&
            this.options.maxThreads <= options.minThreads) {
            this.options.maxThreads = options.minThreads;
        }
        if (options.maxQueue === 'auto') {
            this.options.maxQueue = this.options.maxThreads ** 2;
        }
        else {
            this.options.maxQueue = (_a = options.maxQueue) !== null && _a !== void 0 ? _a : kDefaultOptions.maxQueue;
        }
        this.workers = new AsynchronouslyCreatedResourcePool(this.options.concurrentTasksPerWorker);
        this.workers.onAvailable((w) => this._onWorkerAvailable(w));
        this.startingUp = true;
        this._ensureMinimumWorkers();
        this.startingUp = false;
    }
    _ensureMinimumWorkers() {
        while (this.workers.size < this.options.minThreads) {
            this._addNewWorker();
        }
    }
    _addNewWorker() {
        const pool = this;
        const worker = new worker_threads_1.Worker(__nccwpck_require__.ab + "worker1.js", {
            env: this.options.env,
            argv: this.options.argv,
            execArgv: this.options.execArgv,
            resourceLimits: this.options.resourceLimits,
            workerData: this.options.workerData,
            trackUnmanagedFds: this.options.trackUnmanagedFds
        });
        const { port1, port2 } = new worker_threads_1.MessageChannel();
        const workerInfo = new WorkerInfo(worker, port1, onMessage);
        if (this.startingUp) {
            // There is no point in waiting for the initial set of Workers to indicate
            // that they are ready, we just mark them as such from the start.
            workerInfo.markAsReady();
        }
        const message = {
            filename: this.options.filename,
            port: port2,
            sharedBuffer: workerInfo.sharedBuffer,
            useAtomics: this.options.useAtomics,
            niceIncrement: this.options.niceIncrement
        };
        worker.postMessage(message, [port2]);
        function onMessage(message) {
            const { taskId, result } = message;
            // In case of success: Call the callback that was passed to `runTask`,
            // remove the `TaskInfo` associated with the Worker, which marks it as
            // free again.
            const taskInfo = workerInfo.taskInfos.get(taskId);
            workerInfo.taskInfos.delete(taskId);
            pool.workers.maybeAvailable(workerInfo);
            /* istanbul ignore if */
            if (taskInfo === undefined) {
                const err = new Error(`Unexpected message from Worker: ${util_1.inspect(message)}`);
                pool.publicInterface.emit('error', err);
            }
            else {
                taskInfo.done(message.error, result);
            }
            pool._processPendingMessages();
        }
        worker.on('message', (message) => {
            if (message.ready === true) {
                if (workerInfo.currentUsage() === 0) {
                    workerInfo.unref();
                }
                if (!workerInfo.isReady()) {
                    workerInfo.markAsReady();
                }
                return;
            }
            worker.emit('error', new Error(`Unexpected message on Worker: ${util_1.inspect(message)}`));
        });
        worker.on('error', (err) => {
            // Work around the bug in https://github.com/nodejs/node/pull/33394
            worker.ref = () => { };
            // In case of an uncaught exception: Call the callback that was passed to
            // `postTask` with the error, or emit an 'error' event if there is none.
            const taskInfos = [...workerInfo.taskInfos.values()];
            workerInfo.taskInfos.clear();
            // Remove the worker from the list and potentially start a new Worker to
            // replace the current one.
            this._removeWorker(workerInfo);
            if (workerInfo.isReady() && !this.workerFailsDuringBootstrap) {
                this._ensureMinimumWorkers();
            }
            else {
                // Do not start new workers over and over if they already fail during
                // bootstrap, there's no point.
                this.workerFailsDuringBootstrap = true;
            }
            if (taskInfos.length > 0) {
                for (const taskInfo of taskInfos) {
                    taskInfo.done(err, null);
                }
            }
            else {
                this.publicInterface.emit('error', err);
            }
        });
        worker.unref();
        port1.on('close', () => {
            // The port is only closed if the Worker stops for some reason, but we
            // always .unref() the Worker itself. We want to receive e.g. 'error'
            // events on it, so we ref it once we know it's going to exit anyway.
            worker.ref();
        });
        this.workers.add(workerInfo);
    }
    _processPendingMessages() {
        if (this.inProcessPendingMessages || !this.options.useAtomics) {
            return;
        }
        this.inProcessPendingMessages = true;
        try {
            for (const workerInfo of this.workers) {
                workerInfo.processPendingMessages();
            }
        }
        finally {
            this.inProcessPendingMessages = false;
        }
    }
    _removeWorker(workerInfo) {
        workerInfo.destroy();
        this.workers.delete(workerInfo);
    }
    _onWorkerAvailable(workerInfo) {
        while ((this.taskQueue.size > 0 || this.skipQueue.length > 0) &&
            workerInfo.currentUsage() < this.options.concurrentTasksPerWorker) {
            // The skipQueue will have tasks that we previously shifted off
            // the task queue but had to skip over... we have to make sure
            // we drain that before we drain the taskQueue.
            const taskInfo = this.skipQueue.shift() ||
                this.taskQueue.shift();
            // If the task has an abortSignal and the worker has any other
            // tasks, we cannot distribute the task to it. Skip for now.
            if (taskInfo.abortSignal && workerInfo.taskInfos.size > 0) {
                this.skipQueue.push(taskInfo);
                break;
            }
            const now = perf_hooks_1.performance.now();
            this.waitTime.recordValue(now - taskInfo.created);
            taskInfo.started = now;
            workerInfo.postTask(taskInfo);
            this._maybeDrain();
            return;
        }
        if (workerInfo.taskInfos.size === 0 &&
            this.workers.size > this.options.minThreads) {
            workerInfo.idleTimeout = setTimeout(() => {
                assert_1.default.strictEqual(workerInfo.taskInfos.size, 0);
                if (this.workers.size > this.options.minThreads) {
                    this._removeWorker(workerInfo);
                }
            }, this.options.idleTimeout).unref();
        }
    }
    runTask(task, transferList, filename, abortSignal) {
        if (filename === null) {
            filename = this.options.filename;
        }
        if (typeof filename !== 'string') {
            return Promise.reject(Errors.FilenameNotProvided());
        }
        filename = maybeFileURLToPath(filename);
        let resolve;
        let reject;
        // eslint-disable-next-line
        const ret = new Promise((res, rej) => { resolve = res; reject = rej; });
        const taskInfo = new TaskInfo(task, transferList, filename, (err, result) => {
            this.completed++;
            if (taskInfo.started) {
                this.runTime.recordValue(perf_hooks_1.performance.now() - taskInfo.started);
            }
            if (err !== null) {
                reject(err);
            }
            else {
                resolve(result);
            }
        }, abortSignal, this.publicInterface.asyncResource.asyncId());
        if (abortSignal !== null) {
            // If the AbortSignal has an aborted property and it's truthy,
            // reject immediately.
            if (abortSignal.aborted) {
                return Promise.reject(new AbortError());
            }
            taskInfo.abortListener = () => {
                // Call reject() first to make sure we always reject with the AbortError
                // if the task is aborted, not with an Error from the possible
                // thread termination below.
                reject(new AbortError());
                if (taskInfo.workerInfo !== null) {
                    // Already running: We cancel the Worker this is running on.
                    this._removeWorker(taskInfo.workerInfo);
                    this._ensureMinimumWorkers();
                }
                else {
                    // Not yet running: Remove it from the queue.
                    this.taskQueue.remove(taskInfo);
                }
            };
            onabort(abortSignal, taskInfo.abortListener);
        }
        // If there is a task queue, there's no point in looking for an available
        // Worker thread. Add this task to the queue, if possible.
        if (this.taskQueue.size > 0) {
            const totalCapacity = this.options.maxQueue + this.pendingCapacity();
            if (this.taskQueue.size >= totalCapacity) {
                if (this.options.maxQueue === 0) {
                    return Promise.reject(Errors.NoTaskQueueAvailable());
                }
                else {
                    return Promise.reject(Errors.TaskQueueAtLimit());
                }
            }
            else {
                if (this.workers.size < this.options.maxThreads) {
                    this._addNewWorker();
                }
                this.taskQueue.push(taskInfo);
            }
            return ret;
        }
        // Look for a Worker with a minimum number of tasks it is currently running.
        let workerInfo = this.workers.findAvailable();
        // If we want the ability to abort this task, use only workers that have
        // no running tasks.
        if (workerInfo !== null && workerInfo.currentUsage() > 0 && abortSignal) {
            workerInfo = null;
        }
        // If no Worker was found, or that Worker was handling another task in some
        // way, and we still have the ability to spawn new threads, do so.
        let waitingForNewWorker = false;
        if ((workerInfo === null || workerInfo.currentUsage() > 0) &&
            this.workers.size < this.options.maxThreads) {
            this._addNewWorker();
            waitingForNewWorker = true;
        }
        // If no Worker is found, try to put the task into the queue.
        if (workerInfo === null) {
            if (this.options.maxQueue <= 0 && !waitingForNewWorker) {
                return Promise.reject(Errors.NoTaskQueueAvailable());
            }
            else {
                this.taskQueue.push(taskInfo);
            }
            return ret;
        }
        // TODO(addaleax): Clean up the waitTime/runTime recording.
        const now = perf_hooks_1.performance.now();
        this.waitTime.recordValue(now - taskInfo.created);
        taskInfo.started = now;
        workerInfo.postTask(taskInfo);
        this._maybeDrain();
        return ret;
    }
    pendingCapacity() {
        return this.workers.pendingItems.size *
            this.options.concurrentTasksPerWorker;
    }
    _maybeDrain() {
        if (this.taskQueue.size === 0 && this.skipQueue.length === 0) {
            this.publicInterface.emit('drain');
        }
    }
    async destroy() {
        while (this.skipQueue.length > 0) {
            const taskInfo = this.skipQueue.shift();
            taskInfo.done(new Error('Terminating worker thread'));
        }
        while (this.taskQueue.size > 0) {
            const taskInfo = this.taskQueue.shift();
            taskInfo.done(new Error('Terminating worker thread'));
        }
        const exitEvents = [];
        while (this.workers.size > 0) {
            const [workerInfo] = this.workers;
            exitEvents.push(events_1.once(workerInfo.worker, 'exit'));
            this._removeWorker(workerInfo);
        }
        await Promise.all(exitEvents);
    }
}
class Piscina extends eventemitter_asyncresource_1.default {
    constructor(options = {}) {
        super({ ...options, name: 'Piscina' });
        _pool.set(this, void 0);
        if (typeof options.filename !== 'string' && options.filename != null) {
            throw new TypeError('options.filename must be a string or null');
        }
        if (options.minThreads !== undefined &&
            (typeof options.minThreads !== 'number' || options.minThreads < 0)) {
            throw new TypeError('options.minThreads must be a non-negative integer');
        }
        if (options.maxThreads !== undefined &&
            (typeof options.maxThreads !== 'number' || options.maxThreads < 1)) {
            throw new TypeError('options.maxThreads must be a positive integer');
        }
        if (options.minThreads !== undefined && options.maxThreads !== undefined &&
            options.minThreads > options.maxThreads) {
            throw new RangeError('options.minThreads and options.maxThreads must not conflict');
        }
        if (options.idleTimeout !== undefined &&
            (typeof options.idleTimeout !== 'number' || options.idleTimeout < 0)) {
            throw new TypeError('options.idleTimeout must be a non-negative integer');
        }
        if (options.maxQueue !== undefined &&
            options.maxQueue !== 'auto' &&
            (typeof options.maxQueue !== 'number' || options.maxQueue < 0)) {
            throw new TypeError('options.maxQueue must be a non-negative integer');
        }
        if (options.concurrentTasksPerWorker !== undefined &&
            (typeof options.concurrentTasksPerWorker !== 'number' ||
                options.concurrentTasksPerWorker < 1)) {
            throw new TypeError('options.concurrentTasksPerWorker must be a positive integer');
        }
        if (options.useAtomics !== undefined &&
            typeof options.useAtomics !== 'boolean') {
            throw new TypeError('options.useAtomics must be a boolean value');
        }
        if (options.resourceLimits !== undefined &&
            (typeof options.resourceLimits !== 'object' ||
                options.resourceLimits === null)) {
            throw new TypeError('options.resourceLimits must be an object');
        }
        if (options.taskQueue !== undefined && !common_1.isTaskQueue(options.taskQueue)) {
            throw new TypeError('options.taskQueue must be a TaskQueue object');
        }
        if (options.niceIncrement !== undefined &&
            (typeof options.niceIncrement !== 'number' || options.niceIncrement < 0)) {
            throw new TypeError('options.niceIncrement must be a non-negative integer');
        }
        if (options.trackUnmanagedFds !== undefined &&
            typeof options.trackUnmanagedFds !== 'boolean') {
            throw new TypeError('options.trackUnmanagedFds must be a boolean value');
        }
        __classPrivateFieldSet(this, _pool, new ThreadPool(this, options));
    }
    runTask(task, transferList, filename, abortSignal) {
        // If transferList is a string or AbortSignal, shift it.
        if ((typeof transferList === 'object' && !Array.isArray(transferList)) ||
            typeof transferList === 'string') {
            abortSignal = filename;
            filename = transferList;
            transferList = undefined;
        }
        // If filename is an AbortSignal, shift it.
        if (typeof filename === 'object' && !Array.isArray(filename)) {
            abortSignal = filename;
            filename = undefined;
        }
        if (transferList !== undefined && !Array.isArray(transferList)) {
            return Promise.reject(new TypeError('transferList argument must be an Array'));
        }
        if (filename !== undefined && typeof filename !== 'string') {
            return Promise.reject(new TypeError('filename argument must be a string'));
        }
        if (abortSignal !== undefined && typeof abortSignal !== 'object') {
            return Promise.reject(new TypeError('abortSignal argument must be an object'));
        }
        return __classPrivateFieldGet(this, _pool).runTask(task, transferList, filename || null, abortSignal || null);
    }
    destroy() {
        return __classPrivateFieldGet(this, _pool).destroy();
    }
    get options() {
        return __classPrivateFieldGet(this, _pool).options;
    }
    get threads() {
        const ret = [];
        for (const workerInfo of __classPrivateFieldGet(this, _pool).workers) {
            ret.push(workerInfo.worker);
        }
        return ret;
    }
    get queueSize() {
        const pool = __classPrivateFieldGet(this, _pool);
        return Math.max(pool.taskQueue.size - pool.pendingCapacity(), 0);
    }
    get completed() {
        return __classPrivateFieldGet(this, _pool).completed;
    }
    get waitTime() {
        const result = hdr_histogram_percentiles_obj_1.default.histAsObj(__classPrivateFieldGet(this, _pool).waitTime);
        return hdr_histogram_percentiles_obj_1.default.addPercentiles(__classPrivateFieldGet(this, _pool).waitTime, result);
    }
    get runTime() {
        const result = hdr_histogram_percentiles_obj_1.default.histAsObj(__classPrivateFieldGet(this, _pool).runTime);
        return hdr_histogram_percentiles_obj_1.default.addPercentiles(__classPrivateFieldGet(this, _pool).runTime, result);
    }
    get utilization() {
        // The capacity is the max compute time capacity of the
        // pool to this point in time as determined by the length
        // of time the pool has been running multiplied by the
        // maximum number of threads.
        const capacity = this.duration * __classPrivateFieldGet(this, _pool).options.maxThreads;
        const totalMeanRuntime = __classPrivateFieldGet(this, _pool).runTime.mean *
            __classPrivateFieldGet(this, _pool).runTime.totalCount;
        // We calculate the appoximate pool utilization by multiplying
        // the mean run time of all tasks by the number of runtime
        // samples taken and dividing that by the capacity. The
        // theory here is that capacity represents the absolute upper
        // limit of compute time this pool could ever attain (but
        // never will for a variety of reasons. Multiplying the
        // mean run time by the number of tasks sampled yields an
        // approximation of the realized compute time. The utilization
        // then becomes a point-in-time measure of how active the
        // pool is.
        return totalMeanRuntime / capacity;
    }
    get duration() {
        return perf_hooks_1.performance.now() - __classPrivateFieldGet(this, _pool).start;
    }
    static get isWorkerThread() {
        return common_1.commonState.isWorkerThread;
    }
    static get workerData() {
        return common_1.commonState.workerData;
    }
    static get version() {
        return package_json_1.version;
    }
    static get Piscina() {
        return Piscina;
    }
    static move(val) {
        if (val != null && typeof val === 'object' && typeof val !== 'function') {
            if (!common_1.isTransferable(val)) {
                if (util_1.types.isArrayBufferView(val)) {
                    val = new ArrayBufferViewTransferable(val);
                }
                else {
                    val = new DirectlyTransferable(val);
                }
            }
            common_1.markMovable(val);
        }
        return val;
    }
    static get transferableSymbol() { return common_1.kTransferable; }
    static get valueSymbol() { return common_1.kValue; }
    static get queueOptionsSymbol() { return common_1.kQueueOptions; }
}
_pool = new WeakMap();
module.exports = Piscina;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 5911:
/***/ ((module, exports) => {

exports = module.exports = SemVer

var debug
/* istanbul ignore next */
if (typeof process === 'object' &&
    process.env &&
    process.env.NODE_DEBUG &&
    /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
  debug = function () {
    var args = Array.prototype.slice.call(arguments, 0)
    args.unshift('SEMVER')
    console.log.apply(console, args)
  }
} else {
  debug = function () {}
}

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0'

var MAX_LENGTH = 256
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
  /* istanbul ignore next */ 9007199254740991

// Max safe segment length for coercion.
var MAX_SAFE_COMPONENT_LENGTH = 16

// The actual regexps go on exports.re
var re = exports.re = []
var src = exports.src = []
var t = exports.tokens = {}
var R = 0

function tok (n) {
  t[n] = R++
}

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

tok('NUMERICIDENTIFIER')
src[t.NUMERICIDENTIFIER] = '0|[1-9]\\d*'
tok('NUMERICIDENTIFIERLOOSE')
src[t.NUMERICIDENTIFIERLOOSE] = '[0-9]+'

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

tok('NONNUMERICIDENTIFIER')
src[t.NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*'

// ## Main Version
// Three dot-separated numeric identifiers.

tok('MAINVERSION')
src[t.MAINVERSION] = '(' + src[t.NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[t.NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[t.NUMERICIDENTIFIER] + ')'

tok('MAINVERSIONLOOSE')
src[t.MAINVERSIONLOOSE] = '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')'

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

tok('PRERELEASEIDENTIFIER')
src[t.PRERELEASEIDENTIFIER] = '(?:' + src[t.NUMERICIDENTIFIER] +
                            '|' + src[t.NONNUMERICIDENTIFIER] + ')'

tok('PRERELEASEIDENTIFIERLOOSE')
src[t.PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[t.NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[t.NONNUMERICIDENTIFIER] + ')'

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

tok('PRERELEASE')
src[t.PRERELEASE] = '(?:-(' + src[t.PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[t.PRERELEASEIDENTIFIER] + ')*))'

tok('PRERELEASELOOSE')
src[t.PRERELEASELOOSE] = '(?:-?(' + src[t.PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[t.PRERELEASEIDENTIFIERLOOSE] + ')*))'

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

tok('BUILDIDENTIFIER')
src[t.BUILDIDENTIFIER] = '[0-9A-Za-z-]+'

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

tok('BUILD')
src[t.BUILD] = '(?:\\+(' + src[t.BUILDIDENTIFIER] +
             '(?:\\.' + src[t.BUILDIDENTIFIER] + ')*))'

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

tok('FULL')
tok('FULLPLAIN')
src[t.FULLPLAIN] = 'v?' + src[t.MAINVERSION] +
                  src[t.PRERELEASE] + '?' +
                  src[t.BUILD] + '?'

src[t.FULL] = '^' + src[t.FULLPLAIN] + '$'

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
tok('LOOSEPLAIN')
src[t.LOOSEPLAIN] = '[v=\\s]*' + src[t.MAINVERSIONLOOSE] +
                  src[t.PRERELEASELOOSE] + '?' +
                  src[t.BUILD] + '?'

tok('LOOSE')
src[t.LOOSE] = '^' + src[t.LOOSEPLAIN] + '$'

tok('GTLT')
src[t.GTLT] = '((?:<|>)?=?)'

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
tok('XRANGEIDENTIFIERLOOSE')
src[t.XRANGEIDENTIFIERLOOSE] = src[t.NUMERICIDENTIFIERLOOSE] + '|x|X|\\*'
tok('XRANGEIDENTIFIER')
src[t.XRANGEIDENTIFIER] = src[t.NUMERICIDENTIFIER] + '|x|X|\\*'

tok('XRANGEPLAIN')
src[t.XRANGEPLAIN] = '[v=\\s]*(' + src[t.XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[t.XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[t.XRANGEIDENTIFIER] + ')' +
                   '(?:' + src[t.PRERELEASE] + ')?' +
                   src[t.BUILD] + '?' +
                   ')?)?'

tok('XRANGEPLAINLOOSE')
src[t.XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:' + src[t.PRERELEASELOOSE] + ')?' +
                        src[t.BUILD] + '?' +
                        ')?)?'

tok('XRANGE')
src[t.XRANGE] = '^' + src[t.GTLT] + '\\s*' + src[t.XRANGEPLAIN] + '$'
tok('XRANGELOOSE')
src[t.XRANGELOOSE] = '^' + src[t.GTLT] + '\\s*' + src[t.XRANGEPLAINLOOSE] + '$'

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
tok('COERCE')
src[t.COERCE] = '(^|[^\\d])' +
              '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:$|[^\\d])'
tok('COERCERTL')
re[t.COERCERTL] = new RegExp(src[t.COERCE], 'g')

// Tilde ranges.
// Meaning is "reasonably at or greater than"
tok('LONETILDE')
src[t.LONETILDE] = '(?:~>?)'

tok('TILDETRIM')
src[t.TILDETRIM] = '(\\s*)' + src[t.LONETILDE] + '\\s+'
re[t.TILDETRIM] = new RegExp(src[t.TILDETRIM], 'g')
var tildeTrimReplace = '$1~'

tok('TILDE')
src[t.TILDE] = '^' + src[t.LONETILDE] + src[t.XRANGEPLAIN] + '$'
tok('TILDELOOSE')
src[t.TILDELOOSE] = '^' + src[t.LONETILDE] + src[t.XRANGEPLAINLOOSE] + '$'

// Caret ranges.
// Meaning is "at least and backwards compatible with"
tok('LONECARET')
src[t.LONECARET] = '(?:\\^)'

tok('CARETTRIM')
src[t.CARETTRIM] = '(\\s*)' + src[t.LONECARET] + '\\s+'
re[t.CARETTRIM] = new RegExp(src[t.CARETTRIM], 'g')
var caretTrimReplace = '$1^'

tok('CARET')
src[t.CARET] = '^' + src[t.LONECARET] + src[t.XRANGEPLAIN] + '$'
tok('CARETLOOSE')
src[t.CARETLOOSE] = '^' + src[t.LONECARET] + src[t.XRANGEPLAINLOOSE] + '$'

// A simple gt/lt/eq thing, or just "" to indicate "any version"
tok('COMPARATORLOOSE')
src[t.COMPARATORLOOSE] = '^' + src[t.GTLT] + '\\s*(' + src[t.LOOSEPLAIN] + ')$|^$'
tok('COMPARATOR')
src[t.COMPARATOR] = '^' + src[t.GTLT] + '\\s*(' + src[t.FULLPLAIN] + ')$|^$'

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
tok('COMPARATORTRIM')
src[t.COMPARATORTRIM] = '(\\s*)' + src[t.GTLT] +
                      '\\s*(' + src[t.LOOSEPLAIN] + '|' + src[t.XRANGEPLAIN] + ')'

// this one has to use the /g flag
re[t.COMPARATORTRIM] = new RegExp(src[t.COMPARATORTRIM], 'g')
var comparatorTrimReplace = '$1$2$3'

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
tok('HYPHENRANGE')
src[t.HYPHENRANGE] = '^\\s*(' + src[t.XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[t.XRANGEPLAIN] + ')' +
                   '\\s*$'

tok('HYPHENRANGELOOSE')
src[t.HYPHENRANGELOOSE] = '^\\s*(' + src[t.XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[t.XRANGEPLAINLOOSE] + ')' +
                        '\\s*$'

// Star ranges basically just allow anything at all.
tok('STAR')
src[t.STAR] = '(<|>)?=?\\s*\\*'

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  debug(i, src[i])
  if (!re[i]) {
    re[i] = new RegExp(src[i])
  }
}

exports.parse = parse
function parse (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  if (version.length > MAX_LENGTH) {
    return null
  }

  var r = options.loose ? re[t.LOOSE] : re[t.FULL]
  if (!r.test(version)) {
    return null
  }

  try {
    return new SemVer(version, options)
  } catch (er) {
    return null
  }
}

exports.valid = valid
function valid (version, options) {
  var v = parse(version, options)
  return v ? v.version : null
}

exports.clean = clean
function clean (version, options) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), options)
  return s ? s.version : null
}

exports.SemVer = SemVer

function SemVer (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }
  if (version instanceof SemVer) {
    if (version.loose === options.loose) {
      return version
    } else {
      version = version.version
    }
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version)
  }

  if (version.length > MAX_LENGTH) {
    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')
  }

  if (!(this instanceof SemVer)) {
    return new SemVer(version, options)
  }

  debug('SemVer', version, options)
  this.options = options
  this.loose = !!options.loose

  var m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL])

  if (!m) {
    throw new TypeError('Invalid Version: ' + version)
  }

  this.raw = version

  // these are actually numbers
  this.major = +m[1]
  this.minor = +m[2]
  this.patch = +m[3]

  if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
    throw new TypeError('Invalid major version')
  }

  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
    throw new TypeError('Invalid minor version')
  }

  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
    throw new TypeError('Invalid patch version')
  }

  // numberify any prerelease numeric ids
  if (!m[4]) {
    this.prerelease = []
  } else {
    this.prerelease = m[4].split('.').map(function (id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id
        if (num >= 0 && num < MAX_SAFE_INTEGER) {
          return num
        }
      }
      return id
    })
  }

  this.build = m[5] ? m[5].split('.') : []
  this.format()
}

SemVer.prototype.format = function () {
  this.version = this.major + '.' + this.minor + '.' + this.patch
  if (this.prerelease.length) {
    this.version += '-' + this.prerelease.join('.')
  }
  return this.version
}

SemVer.prototype.toString = function () {
  return this.version
}

SemVer.prototype.compare = function (other) {
  debug('SemVer.compare', this.version, this.options, other)
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return this.compareMain(other) || this.comparePre(other)
}

SemVer.prototype.compareMain = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch)
}

SemVer.prototype.comparePre = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length) {
    return -1
  } else if (!this.prerelease.length && other.prerelease.length) {
    return 1
  } else if (!this.prerelease.length && !other.prerelease.length) {
    return 0
  }

  var i = 0
  do {
    var a = this.prerelease[i]
    var b = other.prerelease[i]
    debug('prerelease compare', i, a, b)
    if (a === undefined && b === undefined) {
      return 0
    } else if (b === undefined) {
      return 1
    } else if (a === undefined) {
      return -1
    } else if (a === b) {
      continue
    } else {
      return compareIdentifiers(a, b)
    }
  } while (++i)
}

SemVer.prototype.compareBuild = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  var i = 0
  do {
    var a = this.build[i]
    var b = other.build[i]
    debug('prerelease compare', i, a, b)
    if (a === undefined && b === undefined) {
      return 0
    } else if (b === undefined) {
      return 1
    } else if (a === undefined) {
      return -1
    } else if (a === b) {
      continue
    } else {
      return compareIdentifiers(a, b)
    }
  } while (++i)
}

// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function (release, identifier) {
  switch (release) {
    case 'premajor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor = 0
      this.major++
      this.inc('pre', identifier)
      break
    case 'preminor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor++
      this.inc('pre', identifier)
      break
    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      this.prerelease.length = 0
      this.inc('patch', identifier)
      this.inc('pre', identifier)
      break
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (this.prerelease.length === 0) {
        this.inc('patch', identifier)
      }
      this.inc('pre', identifier)
      break

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0) {
        this.major++
      }
      this.minor = 0
      this.patch = 0
      this.prerelease = []
      break
    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (this.patch !== 0 || this.prerelease.length === 0) {
        this.minor++
      }
      this.patch = 0
      this.prerelease = []
      break
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0) {
        this.patch++
      }
      this.prerelease = []
      break
    // This probably shouldn't be used publicly.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
    case 'pre':
      if (this.prerelease.length === 0) {
        this.prerelease = [0]
      } else {
        var i = this.prerelease.length
        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++
            i = -2
          }
        }
        if (i === -1) {
          // didn't increment anything
          this.prerelease.push(0)
        }
      }
      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        if (this.prerelease[0] === identifier) {
          if (isNaN(this.prerelease[1])) {
            this.prerelease = [identifier, 0]
          }
        } else {
          this.prerelease = [identifier, 0]
        }
      }
      break

    default:
      throw new Error('invalid increment argument: ' + release)
  }
  this.format()
  this.raw = this.version
  return this
}

exports.inc = inc
function inc (version, release, loose, identifier) {
  if (typeof (loose) === 'string') {
    identifier = loose
    loose = undefined
  }

  try {
    return new SemVer(version, loose).inc(release, identifier).version
  } catch (er) {
    return null
  }
}

exports.diff = diff
function diff (version1, version2) {
  if (eq(version1, version2)) {
    return null
  } else {
    var v1 = parse(version1)
    var v2 = parse(version2)
    var prefix = ''
    if (v1.prerelease.length || v2.prerelease.length) {
      prefix = 'pre'
      var defaultResult = 'prerelease'
    }
    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return prefix + key
        }
      }
    }
    return defaultResult // may be undefined
  }
}

exports.compareIdentifiers = compareIdentifiers

var numeric = /^[0-9]+$/
function compareIdentifiers (a, b) {
  var anum = numeric.test(a)
  var bnum = numeric.test(b)

  if (anum && bnum) {
    a = +a
    b = +b
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
}

exports.rcompareIdentifiers = rcompareIdentifiers
function rcompareIdentifiers (a, b) {
  return compareIdentifiers(b, a)
}

exports.major = major
function major (a, loose) {
  return new SemVer(a, loose).major
}

exports.minor = minor
function minor (a, loose) {
  return new SemVer(a, loose).minor
}

exports.patch = patch
function patch (a, loose) {
  return new SemVer(a, loose).patch
}

exports.compare = compare
function compare (a, b, loose) {
  return new SemVer(a, loose).compare(new SemVer(b, loose))
}

exports.compareLoose = compareLoose
function compareLoose (a, b) {
  return compare(a, b, true)
}

exports.compareBuild = compareBuild
function compareBuild (a, b, loose) {
  var versionA = new SemVer(a, loose)
  var versionB = new SemVer(b, loose)
  return versionA.compare(versionB) || versionA.compareBuild(versionB)
}

exports.rcompare = rcompare
function rcompare (a, b, loose) {
  return compare(b, a, loose)
}

exports.sort = sort
function sort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compareBuild(a, b, loose)
  })
}

exports.rsort = rsort
function rsort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compareBuild(b, a, loose)
  })
}

exports.gt = gt
function gt (a, b, loose) {
  return compare(a, b, loose) > 0
}

exports.lt = lt
function lt (a, b, loose) {
  return compare(a, b, loose) < 0
}

exports.eq = eq
function eq (a, b, loose) {
  return compare(a, b, loose) === 0
}

exports.neq = neq
function neq (a, b, loose) {
  return compare(a, b, loose) !== 0
}

exports.gte = gte
function gte (a, b, loose) {
  return compare(a, b, loose) >= 0
}

exports.lte = lte
function lte (a, b, loose) {
  return compare(a, b, loose) <= 0
}

exports.cmp = cmp
function cmp (a, op, b, loose) {
  switch (op) {
    case '===':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a === b

    case '!==':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a !== b

    case '':
    case '=':
    case '==':
      return eq(a, b, loose)

    case '!=':
      return neq(a, b, loose)

    case '>':
      return gt(a, b, loose)

    case '>=':
      return gte(a, b, loose)

    case '<':
      return lt(a, b, loose)

    case '<=':
      return lte(a, b, loose)

    default:
      throw new TypeError('Invalid operator: ' + op)
  }
}

exports.Comparator = Comparator
function Comparator (comp, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (comp instanceof Comparator) {
    if (comp.loose === !!options.loose) {
      return comp
    } else {
      comp = comp.value
    }
  }

  if (!(this instanceof Comparator)) {
    return new Comparator(comp, options)
  }

  debug('comparator', comp, options)
  this.options = options
  this.loose = !!options.loose
  this.parse(comp)

  if (this.semver === ANY) {
    this.value = ''
  } else {
    this.value = this.operator + this.semver.version
  }

  debug('comp', this)
}

var ANY = {}
Comparator.prototype.parse = function (comp) {
  var r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR]
  var m = comp.match(r)

  if (!m) {
    throw new TypeError('Invalid comparator: ' + comp)
  }

  this.operator = m[1] !== undefined ? m[1] : ''
  if (this.operator === '=') {
    this.operator = ''
  }

  // if it literally is just '>' or '' then allow anything.
  if (!m[2]) {
    this.semver = ANY
  } else {
    this.semver = new SemVer(m[2], this.options.loose)
  }
}

Comparator.prototype.toString = function () {
  return this.value
}

Comparator.prototype.test = function (version) {
  debug('Comparator.test', version, this.options.loose)

  if (this.semver === ANY || version === ANY) {
    return true
  }

  if (typeof version === 'string') {
    try {
      version = new SemVer(version, this.options)
    } catch (er) {
      return false
    }
  }

  return cmp(version, this.operator, this.semver, this.options)
}

Comparator.prototype.intersects = function (comp, options) {
  if (!(comp instanceof Comparator)) {
    throw new TypeError('a Comparator is required')
  }

  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  var rangeTmp

  if (this.operator === '') {
    if (this.value === '') {
      return true
    }
    rangeTmp = new Range(comp.value, options)
    return satisfies(this.value, rangeTmp, options)
  } else if (comp.operator === '') {
    if (comp.value === '') {
      return true
    }
    rangeTmp = new Range(this.value, options)
    return satisfies(comp.semver, rangeTmp, options)
  }

  var sameDirectionIncreasing =
    (this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '>=' || comp.operator === '>')
  var sameDirectionDecreasing =
    (this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '<=' || comp.operator === '<')
  var sameSemVer = this.semver.version === comp.semver.version
  var differentDirectionsInclusive =
    (this.operator === '>=' || this.operator === '<=') &&
    (comp.operator === '>=' || comp.operator === '<=')
  var oppositeDirectionsLessThan =
    cmp(this.semver, '<', comp.semver, options) &&
    ((this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '<=' || comp.operator === '<'))
  var oppositeDirectionsGreaterThan =
    cmp(this.semver, '>', comp.semver, options) &&
    ((this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '>=' || comp.operator === '>'))

  return sameDirectionIncreasing || sameDirectionDecreasing ||
    (sameSemVer && differentDirectionsInclusive) ||
    oppositeDirectionsLessThan || oppositeDirectionsGreaterThan
}

exports.Range = Range
function Range (range, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (range instanceof Range) {
    if (range.loose === !!options.loose &&
        range.includePrerelease === !!options.includePrerelease) {
      return range
    } else {
      return new Range(range.raw, options)
    }
  }

  if (range instanceof Comparator) {
    return new Range(range.value, options)
  }

  if (!(this instanceof Range)) {
    return new Range(range, options)
  }

  this.options = options
  this.loose = !!options.loose
  this.includePrerelease = !!options.includePrerelease

  // First, split based on boolean or ||
  this.raw = range
  this.set = range.split(/\s*\|\|\s*/).map(function (range) {
    return this.parseRange(range.trim())
  }, this).filter(function (c) {
    // throw out any that are not relevant for whatever reason
    return c.length
  })

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range)
  }

  this.format()
}

Range.prototype.format = function () {
  this.range = this.set.map(function (comps) {
    return comps.join(' ').trim()
  }).join('||').trim()
  return this.range
}

Range.prototype.toString = function () {
  return this.range
}

Range.prototype.parseRange = function (range) {
  var loose = this.options.loose
  range = range.trim()
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE]
  range = range.replace(hr, hyphenReplace)
  debug('hyphen replace', range)
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace)
  debug('comparator trim', range, re[t.COMPARATORTRIM])

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[t.TILDETRIM], tildeTrimReplace)

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[t.CARETTRIM], caretTrimReplace)

  // normalize spaces
  range = range.split(/\s+/).join(' ')

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR]
  var set = range.split(' ').map(function (comp) {
    return parseComparator(comp, this.options)
  }, this).join(' ').split(/\s+/)
  if (this.options.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function (comp) {
      return !!comp.match(compRe)
    })
  }
  set = set.map(function (comp) {
    return new Comparator(comp, this.options)
  }, this)

  return set
}

Range.prototype.intersects = function (range, options) {
  if (!(range instanceof Range)) {
    throw new TypeError('a Range is required')
  }

  return this.set.some(function (thisComparators) {
    return (
      isSatisfiable(thisComparators, options) &&
      range.set.some(function (rangeComparators) {
        return (
          isSatisfiable(rangeComparators, options) &&
          thisComparators.every(function (thisComparator) {
            return rangeComparators.every(function (rangeComparator) {
              return thisComparator.intersects(rangeComparator, options)
            })
          })
        )
      })
    )
  })
}

// take a set of comparators and determine whether there
// exists a version which can satisfy it
function isSatisfiable (comparators, options) {
  var result = true
  var remainingComparators = comparators.slice()
  var testComparator = remainingComparators.pop()

  while (result && remainingComparators.length) {
    result = remainingComparators.every(function (otherComparator) {
      return testComparator.intersects(otherComparator, options)
    })

    testComparator = remainingComparators.pop()
  }

  return result
}

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators
function toComparators (range, options) {
  return new Range(range, options).set.map(function (comp) {
    return comp.map(function (c) {
      return c.value
    }).join(' ').trim().split(' ')
  })
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator (comp, options) {
  debug('comp', comp, options)
  comp = replaceCarets(comp, options)
  debug('caret', comp)
  comp = replaceTildes(comp, options)
  debug('tildes', comp)
  comp = replaceXRanges(comp, options)
  debug('xrange', comp)
  comp = replaceStars(comp, options)
  debug('stars', comp)
  return comp
}

function isX (id) {
  return !id || id.toLowerCase() === 'x' || id === '*'
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceTilde(comp, options)
  }).join(' ')
}

function replaceTilde (comp, options) {
  var r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
    } else if (pr) {
      debug('replaceTilde pr', pr)
      ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
            ' <' + M + '.' + (+m + 1) + '.0'
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0
      ret = '>=' + M + '.' + m + '.' + p +
            ' <' + M + '.' + (+m + 1) + '.0'
    }

    debug('tilde return', ret)
    return ret
  })
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceCaret(comp, options)
  }).join(' ')
}

function replaceCaret (comp, options) {
  debug('caret', comp, options)
  var r = options.loose ? re[t.CARETLOOSE] : re[t.CARET]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      if (M === '0') {
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
      } else {
        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0'
      }
    } else if (pr) {
      debug('replaceCaret pr', pr)
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
              ' <' + (+M + 1) + '.0.0'
      }
    } else {
      debug('no pr')
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p +
              ' <' + (+M + 1) + '.0.0'
      }
    }

    debug('caret return', ret)
    return ret
  })
}

function replaceXRanges (comp, options) {
  debug('replaceXRanges', comp, options)
  return comp.split(/\s+/).map(function (comp) {
    return replaceXRange(comp, options)
  }).join(' ')
}

function replaceXRange (comp, options) {
  comp = comp.trim()
  var r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE]
  return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr)
    var xM = isX(M)
    var xm = xM || isX(m)
    var xp = xm || isX(p)
    var anyX = xp

    if (gtlt === '=' && anyX) {
      gtlt = ''
    }

    // if we're including prereleases in the match, then we need
    // to fix this to -0, the lowest possible prerelease value
    pr = options.includePrerelease ? '-0' : ''

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0-0'
      } else {
        // nothing is forbidden
        ret = '*'
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0
      }
      p = 0

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // >1.2.3 => >= 1.2.4
        gtlt = '>='
        if (xm) {
          M = +M + 1
          m = 0
          p = 0
        } else {
          m = +m + 1
          p = 0
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<'
        if (xm) {
          M = +M + 1
        } else {
          m = +m + 1
        }
      }

      ret = gtlt + M + '.' + m + '.' + p + pr
    } else if (xm) {
      ret = '>=' + M + '.0.0' + pr + ' <' + (+M + 1) + '.0.0' + pr
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0' + pr +
        ' <' + M + '.' + (+m + 1) + '.0' + pr
    }

    debug('xRange return', ret)

    return ret
  })
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars (comp, options) {
  debug('replaceStars', comp, options)
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[t.STAR], '')
}

// This function is passed to string.replace(re[t.HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0
function hyphenReplace ($0,
  from, fM, fm, fp, fpr, fb,
  to, tM, tm, tp, tpr, tb) {
  if (isX(fM)) {
    from = ''
  } else if (isX(fm)) {
    from = '>=' + fM + '.0.0'
  } else if (isX(fp)) {
    from = '>=' + fM + '.' + fm + '.0'
  } else {
    from = '>=' + from
  }

  if (isX(tM)) {
    to = ''
  } else if (isX(tm)) {
    to = '<' + (+tM + 1) + '.0.0'
  } else if (isX(tp)) {
    to = '<' + tM + '.' + (+tm + 1) + '.0'
  } else if (tpr) {
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr
  } else {
    to = '<=' + to
  }

  return (from + ' ' + to).trim()
}

// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function (version) {
  if (!version) {
    return false
  }

  if (typeof version === 'string') {
    try {
      version = new SemVer(version, this.options)
    } catch (er) {
      return false
    }
  }

  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version, this.options)) {
      return true
    }
  }
  return false
}

function testSet (set, version, options) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (i = 0; i < set.length; i++) {
      debug(set[i].semver)
      if (set[i].semver === ANY) {
        continue
      }

      if (set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch) {
          return true
        }
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false
  }

  return true
}

exports.satisfies = satisfies
function satisfies (version, range, options) {
  try {
    range = new Range(range, options)
  } catch (er) {
    return false
  }
  return range.test(version)
}

exports.maxSatisfying = maxSatisfying
function maxSatisfying (versions, range, options) {
  var max = null
  var maxSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        max = v
        maxSV = new SemVer(max, options)
      }
    }
  })
  return max
}

exports.minSatisfying = minSatisfying
function minSatisfying (versions, range, options) {
  var min = null
  var minSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!min || minSV.compare(v) === 1) {
        // compare(min, v, true)
        min = v
        minSV = new SemVer(min, options)
      }
    }
  })
  return min
}

exports.minVersion = minVersion
function minVersion (range, loose) {
  range = new Range(range, loose)

  var minver = new SemVer('0.0.0')
  if (range.test(minver)) {
    return minver
  }

  minver = new SemVer('0.0.0-0')
  if (range.test(minver)) {
    return minver
  }

  minver = null
  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    comparators.forEach(function (comparator) {
      // Clone to avoid manipulating the comparator's semver object.
      var compver = new SemVer(comparator.semver.version)
      switch (comparator.operator) {
        case '>':
          if (compver.prerelease.length === 0) {
            compver.patch++
          } else {
            compver.prerelease.push(0)
          }
          compver.raw = compver.format()
          /* fallthrough */
        case '':
        case '>=':
          if (!minver || gt(minver, compver)) {
            minver = compver
          }
          break
        case '<':
        case '<=':
          /* Ignore maximum versions */
          break
        /* istanbul ignore next */
        default:
          throw new Error('Unexpected operation: ' + comparator.operator)
      }
    })
  }

  if (minver && range.test(minver)) {
    return minver
  }

  return null
}

exports.validRange = validRange
function validRange (range, options) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, options).range || '*'
  } catch (er) {
    return null
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr
function ltr (version, range, options) {
  return outside(version, range, '<', options)
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr
function gtr (version, range, options) {
  return outside(version, range, '>', options)
}

exports.outside = outside
function outside (version, range, hilo, options) {
  version = new SemVer(version, options)
  range = new Range(range, options)

  var gtfn, ltefn, ltfn, comp, ecomp
  switch (hilo) {
    case '>':
      gtfn = gt
      ltefn = lte
      ltfn = lt
      comp = '>'
      ecomp = '>='
      break
    case '<':
      gtfn = lt
      ltefn = gte
      ltfn = gt
      comp = '<'
      ecomp = '<='
      break
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"')
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, options)) {
    return false
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    var high = null
    var low = null

    comparators.forEach(function (comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator
      low = low || comparator
      if (gtfn(comparator.semver, high.semver, options)) {
        high = comparator
      } else if (ltfn(comparator.semver, low.semver, options)) {
        low = comparator
      }
    })

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false
    }
  }
  return true
}

exports.prerelease = prerelease
function prerelease (version, options) {
  var parsed = parse(version, options)
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
}

exports.intersects = intersects
function intersects (r1, r2, options) {
  r1 = new Range(r1, options)
  r2 = new Range(r2, options)
  return r1.intersects(r2)
}

exports.coerce = coerce
function coerce (version, options) {
  if (version instanceof SemVer) {
    return version
  }

  if (typeof version === 'number') {
    version = String(version)
  }

  if (typeof version !== 'string') {
    return null
  }

  options = options || {}

  var match = null
  if (!options.rtl) {
    match = version.match(re[t.COERCE])
  } else {
    // Find the right-most coercible string that does not share
    // a terminus with a more left-ward coercible string.
    // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
    //
    // Walk through the string checking with a /g regexp
    // Manually set the index so as to pick up overlapping matches.
    // Stop when we get a match that ends at the string end, since no
    // coercible string can be more right-ward without the same terminus.
    var next
    while ((next = re[t.COERCERTL].exec(version)) &&
      (!match || match.index + match[0].length !== version.length)
    ) {
      if (!match ||
          next.index + next[0].length !== match.index + match[0].length) {
        match = next
      }
      re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length
    }
    // leave it in a clean state
    re[t.COERCERTL].lastIndex = -1
  }

  if (match === null) {
    return null
  }

  return parse(match[2] +
    '.' + (match[3] || '0') +
    '.' + (match[4] || '0'), options)
}


/***/ }),

/***/ 4294:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(4219);


/***/ }),

/***/ 4219:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var net = __nccwpck_require__(1808);
var tls = __nccwpck_require__(4404);
var http = __nccwpck_require__(3685);
var https = __nccwpck_require__(5687);
var events = __nccwpck_require__(2361);
var assert = __nccwpck_require__(9491);
var util = __nccwpck_require__(3837);


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 2707:
/***/ ((module) => {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ 5859:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// Unique ID creation requires a high quality random # generator.  In node.js
// this is pretty straight-forward - we use the crypto API.

var crypto = __nccwpck_require__(6113);

module.exports = function nodeRNG() {
  return crypto.randomBytes(16);
};


/***/ }),

/***/ 824:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var rng = __nccwpck_require__(5859);
var bytesToUuid = __nccwpck_require__(2707);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ 9491:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 852:
/***/ ((module) => {

"use strict";
module.exports = require("async_hooks");

/***/ }),

/***/ 2081:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 6113:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 2361:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 7147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 3292:
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

/***/ }),

/***/ 3685:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 5687:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 1808:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 2037:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 1017:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 4074:
/***/ ((module) => {

"use strict";
module.exports = require("perf_hooks");

/***/ }),

/***/ 2781:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 1576:
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ 9512:
/***/ ((module) => {

"use strict";
module.exports = require("timers");

/***/ }),

/***/ 4404:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 7310:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 3837:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 1267:
/***/ ((module) => {

"use strict";
module.exports = require("worker_threads");

/***/ }),

/***/ 9399:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"piscina","version":"2.2.0","description":"A fast, efficient Node.js Worker Thread Pool implementation","main":"./dist/src/index.js","exports":{"import":"./dist/esm-wrapper.mjs","require":"./dist/src/index.js"},"types":"./dist/src/index.d.ts","scripts":{"build":"tsc && gen-esm-wrapper . dist/esm-wrapper.mjs","lint":"standardx \\"**/*.{ts,mjs,js,cjs}\\" | snazzy","test":"npm run lint && npm run build && npm run test-only","test-only":"tap","prepack":"npm run build"},"repository":{"type":"git","url":"git+https://github.com/piscinajs/piscina.git"},"keywords":["fast","worker threads","thread pool","wade wilson"],"author":"James M Snell <jasnell@gmail.com>","contributors":["Anna Henningsen <anna@addaleax.net>","Matteo Collina <matteo.collina@gmail.com>"],"license":"MIT","devDependencies":{"@types/node":"^14.14.31","@typescript-eslint/eslint-plugin":"^4.15.1","@typescript-eslint/parser":"^4.15.1","abort-controller":"^3.0.0","concat-stream":"^2.0.0","gen-esm-wrapper":"^1.1.1","snazzy":"^9.0.0","standardx":"^7.0.0","tap":"^14.11.0","typescript":"^4.1.5"},"dependencies":{"eventemitter-asyncresource":"^1.0.0","hdr-histogram-js":"^2.0.1","hdr-histogram-percentiles-obj":"^3.0.0","nice-napi":"^1.0.2"},"optionalDependencies":{"nice-napi":"^1.0.2"},"eslintConfig":{"rules":{"semi":["error","always"],"no-unused-vars":"off","no-use-before-define":"off","no-unreachable-loop":"off","no-dupe-class-members":"off","@typescript-eslint/no-unused-vars":"error"},"globals":{"SharedArrayBuffer":true,"Atomics":true,"AbortController":true,"MessageChannel":true}},"standardx":{"parser":"@typescript-eslint/parser","plugins":["@typescript-eslint/eslint-plugin"]},"bugs":{"url":"https://github.com/piscinajs/piscina/issues"},"homepage":"https://github.com/piscinajs/piscina#readme","directories":{"example":"examples","test":"test"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(3109);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map