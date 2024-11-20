import {COLUMN_TYPE, TableColumnType} from "../../generalComponents";


export type Korisnici = {
    id?: number;
    ime?: string;
    email?: string;
    datum_registracije?: Date;
};

export type KorisniciResponseData = {
    content: Korisnici[];
    totalPages: number;
};

export const KorisniciColumns: TableColumnType[] = [
    {
        key: "id",
        label: "ID",
        hasSort: true,
        hasFilter: false,
        type: COLUMN_TYPE.NUMBER,
        isVisibleOnTable: true,
        isVisibleOnSinglePage: true,
        placeholder: "",
        formProperties: {
            isVisible: false,
            required: true,
            maxLength: 0,
            isDisabledEditing: true,
            isHiddenOnEditing: false,
            defaultValue: "",
        },
    }, {
        key: "ime",
        label: "IME",
        hasSort: true,
        hasFilter: true,
        type: COLUMN_TYPE.TEXT,
        isVisibleOnTable: true,
        isVisibleOnSinglePage: true,
        placeholder: "",
        formProperties: {
            isVisible: true,
            required: true,
            maxLength: 100,
            isDisabledEditing: false,
            isHiddenOnEditing: false,
            defaultValue: "",
        },
    }, {
        key: "email",
        label: "EMAIL",
        hasSort: false,
        hasFilter: false,
        type: COLUMN_TYPE.TEXT,
        isVisibleOnTable: true,
        isVisibleOnSinglePage: true,
        placeholder: "",
        formProperties: {
            isVisible: true,
            required: true,
            maxLength: 100,
            isDisabledEditing: false,
            isHiddenOnEditing: false,
            defaultValue: "",
        },
    }, {
        key: "datum_registracije",
        label: "DATUM REGISTRACIJE",
        hasSort: false,
        hasFilter: true,
        type: COLUMN_TYPE.DATE_TIME,
        isVisibleOnTable: true,
        isVisibleOnSinglePage: true,
        placeholder: "",
        formProperties: {
            isVisible: true,
            required: true,
            maxLength: 0,
            isDisabledEditing: false,
            isHiddenOnEditing: false,
            defaultValue: "",
        },
    },];
