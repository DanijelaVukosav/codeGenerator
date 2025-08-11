import {
    COLUMN_TYPE,
    TableColumnType,
    PASSWORD_PATTERNS,
    PASSWORD_PATTERN_MESSAGES
} from '../generalComponents';

export const SystemUserColumns: TableColumnType[] = [
    {
        key: 'id',
        label: 'ID',
        hasSort: true,
        hasFilter: true,
        type: COLUMN_TYPE.NUMBER,
        isVisibleOnTable: true,
        isVisibleOnSinglePage: true,
        placeholder: '',
        formProperties: {
            isVisible: false,
            required: false,
            maxLength: 100,
            isDisabledEditing: false,
            defaultValue: 0
        }
    },
    {
        key: 'username',
        label: 'Username',
        hasSort: true,
        hasFilter: true,
        type: COLUMN_TYPE.TEXT,
        isVisibleOnTable: true,
        isVisibleOnSinglePage: true,
        placeholder: 'Username',
        formProperties: {
            isVisible: true,
            required: true,
            maxLength: 20,
            minLength: 3,
            isDisabledEditing: true,
            defaultValue: ''
        }
    },
    {
        key: 'email',
        label: 'E-mail',
        hasSort: true,
        hasFilter: true,
        type: COLUMN_TYPE.TEXT,
        isVisibleOnTable: true,
        isVisibleOnSinglePage: true,
        placeholder: 'Email',
        formProperties: {
            isVisible: true,
            required: true,
            maxLength: 100,
            isDisabledEditing: true,
            defaultValue: ''
        }
    },
    {
        key: 'password',
        label: 'Password',
        hasSort: false,
        hasFilter: false,
        type: COLUMN_TYPE.PASSWORD,
        isVisibleOnTable: false,
        isVisibleOnSinglePage: false,
        placeholder: '********',
        formProperties: {
            isVisible: true,
            required: true,
            maxLength: 100,
            minLength: 8,
            isHiddenOnEditing: true,
            isDisabledEditing: false,
            defaultValue: '',
            pattern: PASSWORD_PATTERNS.STRONG,
            patternMessage: PASSWORD_PATTERN_MESSAGES.STRONG
        }
    },
    {
        key: 'superUser',
        label: 'Super user',
        hasSort: false,
        hasFilter: true,
        type: COLUMN_TYPE.CHECKBOX,
        isVisibleOnTable: true,
        isVisibleOnSinglePage: true,
        placeholder: '',
        formProperties: {
            isVisible: true,
            required: false,
            maxLength: 100,
            isDisabledEditing: false,
            defaultValue: 'false'
        }
    },
    {
        key: 'permissions',
        label: 'Permissions',
        hasSort: false,
        hasFilter: false,
        type: COLUMN_TYPE.MULTISELECT_CHECKBOX,
        isVisibleOnTable: false,
        isVisibleOnSinglePage: true,
        placeholder: '',
        formProperties: {
            isVisible: true,
            required: false,
            isDisabledEditing: false,
            defaultValue: ''
        }
    }
];
