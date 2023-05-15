// Logical operator beetwen conditions is AND
// Logical operator beetwen criterions is OR


export type Filter = {
  conditions: Condition[];
};

export type Condition = {
  criterions: Criterion[];
};

export const CRITERION_OPERATOR = {
  EQUALS: "Equals",
  NOT_EQUALS: "NotEquals",
  LARGER_THAN: "LargerThan",
  CONTAINS: "Contains",
} as const;

export type CriterionOperator =
  (typeof CRITERION_OPERATOR)[keyof typeof CRITERION_OPERATOR];

export type Criterion = {
  field: string;
  value: any;
  operator: CriterionOperator;
};

export type FilterProps = {
  data: any[]
  field: string, 
  value: any
}

export interface FilterStrategy {
  filter(props: FilterProps): any[];
}

