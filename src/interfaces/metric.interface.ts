import { AggregationMethod } from "./agg.interface";
import { Filter } from "./filter.interface";
import { EventsDataSource } from "./reader.interface";

export interface Metrics {
  eventsDataSource: EventsDataSource
  filter: Filter
  aggregationMethod: AggregationMethod
}