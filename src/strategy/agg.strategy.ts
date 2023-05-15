import {
  AGGREGATION_OPERATOR,
  AggregationOperator,
  AggregationStrategy,
} from "../interfaces/agg.interface";

class SumAggregationStrategy implements AggregationStrategy {
  agg(data: any[], field: string): number | undefined {
    return data.reduce((sum: number, item: any) => {
      if (typeof item.data[field] === "number") {
        return sum + item.data[field];
      }
      return sum;
    }, 0);
  }
}

class AverageAggregationStrategy implements AggregationStrategy {
  agg(data: any[], field: string): number | undefined {
    const sum = data.reduce((sum: number, item: any) => {
      if (typeof item.data[field] === "number") {
        return sum + item.data[field];
      }
      return sum;
    }, 0);

    const count = data.reduce((count: number, item: any) => {
      if (typeof item.data[field] === "number") {
        return count + 1;
      }
      return count;
    }, 0);

    return count > 0 ? sum / count : undefined;
  }
}

class MinAggregationStrategy implements AggregationStrategy {
  agg(data: any[], field: string): number | undefined {
    const values = data
      .map((item: any) => item.data[field])
      .filter((value: any) => typeof value === "number");

    if (values.length > 0) {
      return Math.min(...values);
    }

    return undefined;
  }
}

class MaxAggregationStrategy implements AggregationStrategy {
  agg(data: any[], field: string): number | undefined {
    const values = data
      .map((item: any) => item.data[field])
      .filter((value: any) => typeof value === "number");

    if (values.length > 0) {
      return Math.max(...values);
    }

    return undefined;
  }
}

export class AggregationStrategyFactory {
  static createAggregationStrategy(
    operator: AggregationOperator
  ): AggregationStrategy {
    switch (operator) {
      case AGGREGATION_OPERATOR.SUM:
        return new SumAggregationStrategy();
      case AGGREGATION_OPERATOR.AVERAGE:
        return new AverageAggregationStrategy();
      case AGGREGATION_OPERATOR.MIN:
        return new MinAggregationStrategy();
      case AGGREGATION_OPERATOR.MAX:
        return new MaxAggregationStrategy();
      default:
        throw new Error("Invalid aggregation operator");
    }
  }
}
