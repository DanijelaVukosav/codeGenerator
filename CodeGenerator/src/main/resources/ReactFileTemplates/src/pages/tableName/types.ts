import { COLUMN_TYPE, TableColumnType } from "../../generalComponents";
#{IMPORT_FOREIGN_TABLE_TYPES}#

#{TABLE_ENUM_TYPES}#

export type #{FUL_TABLE_NAME}# = {
  #{MAP_COLUMNS_IN_TYPE_FIELDS}#
};

export type #{FUL_TABLE_NAME}#ResponseData = {
  content: #{FUL_TABLE_NAME}#[];
  totalPages: number;
};

#{TABLE_COLUMNS_CONFIGURATION}#
