"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var events_controller_1 = require("./controller/events.controller");
var METRIC_STATIC_PATH = "data/metric.json";
var METRIC_PATH = path_1.default.join(__dirname, METRIC_STATIC_PATH);
// parse metrics json
var metrics = JSON.parse(fs_1.default.readFileSync(METRIC_PATH, "utf-8"));
var eventsController = new events_controller_1.EventsController(metrics.eventsDataSource);
// filtred data
eventsController
    .filterData(metrics.filter.conditions)
    .then(function (fdata) { return console.log("filtered data", fdata); });
// aggregated data
eventsController
    .aggregateData(metrics.aggregationMethod)
    .then(function (adata) { return console.log("agg data", adata); });
