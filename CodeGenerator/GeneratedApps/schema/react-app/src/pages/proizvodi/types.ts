import { COLUMN_TYPE, TableColumnType } from "../../generalComponents";




export type Proizvodi = {
id? : number;
naziv? : string;
cijena? : number;
kolicina_na_skladistu? : number;
};

export type ProizvodiResponseData = {
  content: Proizvodi[];
  totalPages: number;
};

export const ProizvodiColumns : TableColumnType[] = [
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
  },{
key: "naziv",
label: "NAZIV",
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
  },{
key: "cijena",
label: "CIJENA",
hasSort: false,
hasFilter: false,
type: COLUMN_TYPE.NUMBER,
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
  },{
key: "kolicina_na_skladistu",
label: "KOLICINA NA SKLADISTU",
hasSort: false,
hasFilter: true,
type: COLUMN_TYPE.NUMBER,
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
