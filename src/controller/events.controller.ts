import { DataReaderFactory } from "../db";
import { AggregationMethod } from "../interfaces/agg.interface";
import { Condition } from "../interfaces/filter.interface";
import { DataReader, EventsDataSource } from "../interfaces/reader.interface";
import { AggregationStrategyFactory } from "../strategy/agg.strategy";
import { FilterStrategyFactory } from "../strategy/filter.strategy";

export class EventsController {
  private dataReader: DataReader;

  constructor(config: EventsDataSource) {
    this.dataReader = DataReaderFactory.createDataReader(config);
  }

  async filterData(conditions: Condition[]): Promise<any[]> {
    // read data for filters
    const data = await this.dataReader.readData();
    const filteredData: any[] = [];

    for (const condition of conditions) {
      const filteredConditionData = this.applyCondition(condition, data);
      filteredData.push(...filteredConditionData);
    }

    return filteredData;
  }

  private applyCondition(condition: Condition, data: any[]): any[] {
    const filteredConditionData: any[] = [];

    for (const criterion of condition.criterions) {
      const filterStrategy = FilterStrategyFactory.createFilterStrategy(
        criterion.operator
      );
      const filteredData = filterStrategy.filter({
        data: data,
        field: criterion.field,
        value: criterion.value,
      });
      filteredConditionData.push(...filteredData);
    }

    return filteredConditionData;
  }

  async aggregateData(
    aggregationMethod: AggregationMethod
  ): Promise<number | undefined> {
    const data = await this.dataReader.readData();
    // make aggragation factory call to agg with spacific operator
    const aggStrategy = AggregationStrategyFactory.createAggregationStrategy(
      aggregationMethod.operator
    );
    return aggStrategy.agg(data, aggregationMethod.field);
  }
}
