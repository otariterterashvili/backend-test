import fs from "fs";
import path from "path";
import { Metrics } from "./interfaces/metric.interface";
import { EventsController } from "./controller/events.controller";

const METRIC_STATIC_PATH = "data/metric.json";

const METRIC_PATH = path.join(__dirname, METRIC_STATIC_PATH);

// parse metrics json
const metrics = JSON.parse(fs.readFileSync(METRIC_PATH, "utf-8")) as Metrics;

const eventsController = new EventsController(metrics.eventsDataSource);

// filtred data
eventsController
  .filterData(metrics.filter.conditions)
  .then((fdata) => console.log("filtered data", fdata));

// aggregated data
eventsController
  .aggregateData(metrics.aggregationMethod)
  .then((adata) => console.log("agg data", adata));
