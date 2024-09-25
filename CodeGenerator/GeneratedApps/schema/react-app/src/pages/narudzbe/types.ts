import { COLUMN_TYPE, TableColumnType } from "../../generalComponents";
import { Korisnici } from "../korisnici/types";
import { Proizvodi } from "../proizvodi/types";



export type Narudzbe = {
id? : number;
korisnik_id? : number;
korisnici_korisnik_id? : Korisnici;
proizvod_id? : number;
proizvodi_proizvod_id? : Proizvodi;
kolicina? : number;
datum_narudzbe? : Date;
};

export type NarudzbeResponseData = {
  content: Narudzbe[];
  totalPages: number;
};

export const NarudzbeColumns : TableColumnType[] = [
{
key: "id",
label: "ID",
hasSort: true,
hasFilter: true,
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
key: "korisnik_id",
label: "KORISNIK ID",
hasSort: false,
hasFilter: false,
type: COLUMN_TYPE.NUMBER,
isVisibleOnTable: false,
isVisibleOnSinglePage: false,
placeholder: "",
formProperties: {
isVisible: false,
required: true,
maxLength: 0,
isDisabledEditing: false,
isHiddenOnEditing: false,
defaultValue: "",
},
  },{
key: "proizvod_id",
label: "PROIZVOD ID",
hasSort: false,
hasFilter: false,
type: COLUMN_TYPE.NUMBER,
isVisibleOnTable: false,
isVisibleOnSinglePage: false,
placeholder: "",
formProperties: {
isVisible: false,
required: true,
maxLength: 0,
isDisabledEditing: false,
isHiddenOnEditing: false,
defaultValue: "",
},
  },{
key: "kolicina",
label: "KOLICINA",
hasSort: true,
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
  },{
key: "datum_narudzbe",
label: "DATUM NARUDZBE",
hasSort: false,
hasFilter: false,
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
