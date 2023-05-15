import { CRITERION_OPERATOR, CriterionOperator, FilterStrategy, FilterProps } from "../interfaces/filter.interface";

// create all the different strategies for filtering
class EqualsFilterStrategy implements FilterStrategy {
  filter(props: FilterProps): any[] {
    return props.data.filter((item) => item.data[props.field] === props.value);
  }
}

class NotEqualsFilterStrategy implements FilterStrategy {
  filter(props: FilterProps): any[] {
    return props.data.filter((item) => item.data[props.field] !== props.value);
  }
}

class LargerThanFilterStrategy implements FilterStrategy {
  filter(props: FilterProps): any[] {
    return props.data.filter((item) => item.data[props.field] > props.value);
  }
}

class ContainsFilterStrategy implements FilterStrategy {
  filter(props: FilterProps): any[] {
    return props.data.filter((item) => item.data[props.field].includes(props.value));
  }
}


export class FilterStrategyFactory {
  // Can add different strategy for filtering
  static createFilterStrategy(operator: CriterionOperator): FilterStrategy {
    switch (operator) {
      case CRITERION_OPERATOR.EQUALS:
        return new EqualsFilterStrategy();
      case CRITERION_OPERATOR.NOT_EQUALS:
        return new NotEqualsFilterStrategy();
      case CRITERION_OPERATOR.LARGER_THAN:
        return new LargerThanFilterStrategy();
      case CRITERION_OPERATOR.CONTAINS:
        return new ContainsFilterStrategy();
      default:
        throw new Error("Invalid criterion operator");
    }
  }
}
