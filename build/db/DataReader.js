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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// all the imports from different sources
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var mongodb_1 = require("mongodb");
var reader_interface_1 = require("../interfaces/reader.interface");
var LocalDataReader = /** @class */ (function () {
    function LocalDataReader(filePath) {
        this.filePath = filePath;
    }
    LocalDataReader.prototype.readData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fpath, fileData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fpath = path_1.default.join("".concat(process.cwd(), "/src"), this.filePath);
                        return [4 /*yield*/, fs_1.default.promises.readFile(fpath, "utf-8")];
                    case 1:
                        fileData = _a.sent();
                        return [2 /*return*/, JSON.parse(fileData)];
                }
            });
        });
    };
    return LocalDataReader;
}());
var S3DataReader = /** @class */ (function () {
    function S3DataReader(bucket, key) {
        this.bucket = bucket;
        this.key = key;
    }
    S3DataReader.prototype.readData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var s3, s3Params, s3Data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        s3 = new aws_sdk_1.default.S3();
                        s3Params = {
                            Bucket: this.bucket,
                            Key: this.key,
                        };
                        return [4 /*yield*/, s3.getObject(s3Params).promise()];
                    case 1:
                        s3Data = _a.sent();
                        return [2 /*return*/, JSON.parse(s3Data.Body.toString())];
                }
            });
        });
    };
    return S3DataReader;
}());
// This is just for example how to read data from mongodb 
var DatabaseDataReader = /** @class */ (function () {
    function DatabaseDataReader(connectionUrl, collectionName) {
        this.connectionUrl = connectionUrl;
        this.collectionName = collectionName;
    }
    DatabaseDataReader.prototype.readData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, db, collection, databaseData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = new mongodb_1.MongoClient(this.connectionUrl);
                        return [4 /*yield*/, client.connect()];
                    case 1:
                        _a.sent();
                        db = client.db();
                        collection = db.collection(this.collectionName);
                        return [4 /*yield*/, collection.find().toArray()];
                    case 2:
                        databaseData = _a.sent();
                        return [2 /*return*/, databaseData];
                }
            });
        });
    };
    return DatabaseDataReader;
}());
var DataReaderFactory = /** @class */ (function () {
    function DataReaderFactory() {
    }
    DataReaderFactory.createDataReader = function (source) {
        switch (source.type) {
            case reader_interface_1.EVENTS_DATA_SOURCE_TYPE.LOCAL_FILE_PATH:
                return new LocalDataReader(source.config.path);
            case reader_interface_1.EVENTS_DATA_SOURCE_TYPE.S3:
                return new S3DataReader(source.config.bucket, source.config.key);
            case reader_interface_1.EVENTS_DATA_SOURCE_TYPE.DB:
                return new DatabaseDataReader(source.config.connectionString, source.config.tableName);
            default:
                throw new Error("Invalid data source");
        }
    };
    return DataReaderFactory;
}());
exports.default = DataReaderFactory;
