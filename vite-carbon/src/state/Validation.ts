


interface IntegerValidationRule {
    min?: number;
    max?: number;
    mayBeEmpty?: boolean;
    default?: number;
}

const PortRule: IntegerValidationRule = {
    min: 1,
    max: 65_535,
    mayBeEmpty: true,
}

const MinInstancesRule: IntegerValidationRule = {
    min: 0,
    max: 64,
    mayBeEmpty: false,
}

const MaxInstancesRule: IntegerValidationRule = {
    min: 0,
    max: 64,
    mayBeEmpty: false,
}

const integerFieldError = (value: string, fieldName: string, rule: IntegerValidationRule): string | undefined => {
    if (typeof (rule?.mayBeEmpty) === 'boolean' && !value) {
        if (rule.mayBeEmpty) {
            return undefined;
        }
        return `${fieldName} must not be empty`;
    }
    const num = Number.parseInt(value, 10);
    if (Number.isNaN(num)) {
        return `${fieldName} must be an integer`;
    }
    if (rule.min && num < rule.min) {
        return `${fieldName} must not be smaller than ${rule.min}`;
    }
    if (rule.max && num > rule.max) {
        return `${fieldName} must not be larger than ${rule.max}`;
    }
    return undefined;
}

const portError = (value: string): string | undefined => integerFieldError(value, 'The port', PortRule);
const minInstancesError = (value: string): string | undefined => integerFieldError(value, 'The minimum number of instances', MinInstancesRule);
const maxInstancesError = (value: string): string | undefined => integerFieldError(value, 'The maximum number of instances', MaxInstancesRule);

export { maxInstancesError, minInstancesError, portError };
