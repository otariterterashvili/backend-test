export const AGGREGATION_OPERATOR = {
  SUM: "sum",
  AVERAGE: "average",
  MIN: "min",
  MAX: "max",
} as const;

export type AggregationOperator =
  (typeof AGGREGATION_OPERATOR)[keyof typeof AGGREGATION_OPERATOR];

export type AggregationMethod = {
  operator: AggregationOperator;
  field: string;
};


export interface AggregationStrategy {
  agg(data: any[], filed: string): number | undefined;
}