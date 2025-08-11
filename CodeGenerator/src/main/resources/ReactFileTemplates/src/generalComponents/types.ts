export const DEFAULT_PAGE_SIZE = 20;

export const PREDEFINED_PAGE_SIZES = ['2', '5', '10', '20', '50', '100'];

export enum COLUMN_TYPE {
    TEXT = 'text',
    NUMBER = 'number',
    CHECKBOX = 'checkbox',
    MULTISELECT_CHECKBOX = 'multiselect_checkbox',
    DATE = 'date',
    DATE_TIME = 'datetime-local',
    TIME = 'time',
    PASSWORD = 'password',
    ENUM = 'enum'
}

interface FormProperties {
    isVisible: boolean;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    isHiddenOnEditing?: boolean;
    isDisabledEditing?: boolean;
    defaultValue?: string | number;
    max?: number;
    pattern?: string;
    patternMessage?: string;
}

export interface TableColumnType {
    key: string;
    label: string;
    hasSort?: boolean;
    hasFilter?: boolean;
    type: COLUMN_TYPE;
    options?: (string | number)[];
    isVisibleOnTable: boolean;
    isVisibleOnSinglePage?: boolean;
    placeholder?: string;
    formProperties: FormProperties;
}

export const PASSWORD_PATTERNS = {
    STRONG: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
    MEDIUM: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{6,}$'
};

export const PASSWORD_PATTERN_MESSAGES = {
    STRONG: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)',
    MEDIUM: 'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
};
