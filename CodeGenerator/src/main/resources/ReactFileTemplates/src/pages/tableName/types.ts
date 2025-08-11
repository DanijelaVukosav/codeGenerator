import { CustomObjectType } from '../../api/generalService/types';

import { COLUMN_TYPE, TableColumnType } from "../../generalComponents";
#{IMPORT_FOREIGN_TABLE_TYPES}#

#{TABLE_ENUM_TYPES}#

export interface #{FUL_TABLE_NAME}# extends CustomObjectType {
  #{MAP_COLUMNS_IN_TYPE_FIELDS}#
};

export interface #{FUL_TABLE_NAME}#ResponseData {
  content: #{FUL_TABLE_NAME}#[];
  totalPages: number;
};

#{TABLE_COLUMNS_CONFIGURATION}#
