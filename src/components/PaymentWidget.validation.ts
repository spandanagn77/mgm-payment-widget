import {
    getStateByCountry
} from './PaymentWidget.type'

// eslint-disable-next-line no-useless-escape
const STRING_PATTERN = /^[ A-Za-z0-9.\-\/+=_ !$\*?@#,']*$/;
// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// eslint-disable-next-line no-useless-escape
const ALPHANUMERIC_PATTERN = /^([a-zA-Z0-9]+)$/
const CITY_PATTERN = /^([a-zA-Z\s-]+)$/

type Constraint = 'length' | 'format' | 'email' | 'inclusion' | 'required';
interface Options {
    message?: string;
}

interface LengthOptions extends Options {
    min?: number;
    max: number;
}

interface FormatOptions extends Options {
    pattern: RegExp;
}

interface InclusionOptions extends Options {
    within: string[];
}

type ConstraintOptions =
    | Options
    | LengthOptions
    | FormatOptions
    | InclusionOptions;

type Validators = {
    [key in Constraint]: (
        value: string | null | undefined,
        options: any,
    ) => string | undefined;
};

const validators: Validators = {
    length: (
        value: string | null | undefined,
        { min = 0, max, message = undefined }: LengthOptions,
    ) => {
        if (typeof value !== 'string') {
            return undefined;
        }

        if (min === max && value.length !== min) {
            return `The value must have ${min} characters`;
        }

        return value.length >= min && value.length <= max
            ? undefined
            : (message) ? message : `The value must have ${min} to ${max} characters`;
    },

    format: (
        value: string | null | undefined,
        {
            pattern,
            message = 'The given value does not match the pattern',
        }: FormatOptions,
    ) => {
        return !value || pattern.test(value) ? undefined : message;
    },

    email: (
        value: string | null | undefined,
        { message = 'The value is not valid e-mail address' }: Options,
    ) => {
        return !value || EMAIL_REGEX.test(value) ? undefined : message;
    },

    inclusion: (
        value: string | null | undefined,
        { within, message = 'Selected value is not valid' }: InclusionOptions,
    ) => {
        return !value || within.includes(value) ? undefined : message;
    },

    required: (
        value: string | null | undefined,
        { message = 'The value is required' }: Options,
    ) => {
        return !value || value.length === 0 ? message : undefined;
    },
};

function _validate(
    value: string,
    constraints: Array<[Constraint, ConstraintOptions]>,
): string | false {
    let errorMessage: string | undefined;

    constraints.some(([key, options]) => {
        const validator = validators[key];
        errorMessage = validator(value, options);

        return !!errorMessage;
    });

    return errorMessage !== undefined ? errorMessage : false;
}


export const countryValidation = (value: string) => {
    //console.log('countryValidation billingCountry ==>', value)
    return _validate(value, [
        ['required', { message: 'Please select your country' }],
        //['length', { max: 20, message: 'Country Name should be less then 10' }],
    ]);
}

export const addressLine1Validation = (value: string) => {
    //console.log('addressLine1Validation value ==>', value)
    return _validate(value, [
        ['required', { message: 'Address line 1 is required' }],
        ['length', { max: 70, message: 'Address Line1 should be less then 70' }],
    ]);
}


export const addressLine2Validation = (value: string) => {
    return _validate(value, [
        ['length', { max: 70, message: 'Address Line2 should be less then 70' }],
    ]);
}

const zipPatternByCountry = (country: string): RegExp => {
    switch (country) {
        case 'US':
            // return /^\d{5}$/;
            return /(^\d{5}$)|(^\d{5}-\d{4}$)/;
        case 'CA':
            //return /^(([a-zA-Z0-9]|\s)(?!\n))+$/g;
            return /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVXY][ -]?\d[ABCEGHJKLMNPRSTVXY]\d$/i;
        default:
            return /^[A-Za-z0-9]{4,9}$/;
    }
};

export const zipValidation = (value: string, billingCountry: string) => {

    // const billingCountry = 'US'
    //console.log('zipValidation value ==>', value, ' billingCountry==>', billingCountry)

    const zipConstraints: Array<[Constraint, ConstraintOptions]> = [];

    if (billingCountry === 'US' || billingCountry === 'CA') {
        zipConstraints.push([
            'required',
            { message: 'Please enter zip/postal code' },
        ]);
    }
    zipConstraints.push([
        'format',
        {
            pattern: zipPatternByCountry(billingCountry),
            message: 'The given zip code has an invalid format',
        },
    ]);

    return _validate(value, zipConstraints);
}


export const stateValidation = (value: string, billingCountry: string) => {
    //console.log('addressLine1Validation value ==>', value)
    const stateConstraints: Array<[Constraint, ConstraintOptions]> = [];

    const stateNames = getStateByCountry(billingCountry).map(item => item.label);

    if (billingCountry === 'US' || billingCountry === 'CA') {
        stateConstraints.push([
            'inclusion',
            {
                within: stateNames,
                message: 'Selected value is not valid state/province',
            },
        ]);
        stateConstraints.push(['required', { message: 'Please enter a state or province' }]);
    }

    return _validate(value, stateConstraints);
}

export const cityValidation = (value: string) => {
    //console.log('addressLine1Validation value ==>', value)
    return _validate(value, [
        ['required', { message: 'City is required' }],
        [
            'format',
            { pattern: CITY_PATTERN, message: 'The given City has an invalid format' },
        ],
        ['length', { max: 70, message: 'City should be less then 70' }],
    ]);
}