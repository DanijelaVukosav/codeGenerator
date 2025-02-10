package com.master.codegenerator.reactGenerator;

import com.master.codegenerator.TableParser.UtilConstants;
import com.master.codegenerator.generator.TypeGenerator;
import com.master.codegenerator.models.Column;
import com.master.codegenerator.models.Table;
import com.master.codegenerator.utils.StringUtils;
import com.master.codegenerator.utils.GeneratorUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Objects;

public class ReplaceReactPlaceholders {

    public ReplaceReactPlaceholders() {
        // TODO Auto-generated constructor stub
    }

    private static String getTableIndex(String tableName) {
        return GeneratorUtils.firstLatterToUppercase(tableName) + "Index";
    }

    private static String getTablePage(String tableName) {
        return GeneratorUtils.firstLatterToUppercase(tableName) + "Page";
    }

    public static ArrayList<String> replaceGeneratorConstants(Table table, String codeLine, HashMap<String, ArrayList<String>> mapOfTableRelationships, HashMap<String, Table> allTables) {
        String returnString = codeLine;

        ArrayList<String> returnValue = new ArrayList<String>();

        if (returnString.contains(ReactGeneratorConstant.FUL_TABLE_NAME)) {
            returnString = returnString.replaceAll(ReactGeneratorConstantRegex.FUL_TABLE_NAME,
                    GeneratorUtils.firstLatterToUppercase(table.getTableName()));
        }
        if (returnString.contains(ReactGeneratorConstant.FLL_TABLE_NAME)) {
            returnString = returnString.replaceAll(ReactGeneratorConstantRegex.FLL_TABLE_NAME,
                    GeneratorUtils.firstLatterToLowercase(table.getTableName()));
        }
        if (returnString.contains(ReactGeneratorConstant.AUL_TABLE_NAME)) {
            returnString = returnString.replaceAll(ReactGeneratorConstantRegex.AUL_TABLE_NAME,
                    table.getTableName().toUpperCase());
        }
        if (returnString.contains(ReactGeneratorConstant.TABLE_PRIMARY_KEY_COLUMN)) {
            for (Column column : table.getColumns()) {
                if (column.isPrimaryKey()) {
                    returnString = returnString.replaceAll(ReactGeneratorConstantRegex.TABLE_PRIMARY_KEY_COLUMN,
                            column.getColumnName());
                }

            }
        }
        if (returnString.contains(ReactGeneratorConstant.TABLE_PRIMARY_KEY_COLUMN_TYPE)) {
            for (Column column : table.getColumns()) {
                if (column.isPrimaryKey()) {
                    returnString = returnString.replaceAll(ReactGeneratorConstantRegex.TABLE_PRIMARY_KEY_COLUMN_TYPE,
                            column.getMappedType());
                }

            }
        }
        if (codeLine.contains(ReactGeneratorConstant.IMPORT_FOREIGN_TABLE_TYPES)) {
            for (Column column : table.getColumns()) {
                if (column.isForeignKey()) {
                    String importType = GeneratorUtils.firstLatterToUppercase(column.getForeignTableName());
                    String importString = "import { " + importType + " } from \"../" + column.getForeignTableName() + "/types\";";
                    if (!returnValue.contains(importString)) {
                        returnValue.add(importString);
                    }
                }

            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.IMPORT_FOREIGN_TABLE_TYPES_IN_COMPONENT)) {
            for (Column column : table.getColumns()) {
                if (column.isForeignKey()) {
                    String importType = GeneratorUtils.firstLatterToUppercase(column.getForeignTableName());
                    String importString = "import { " + importType + " } from \"../../" + column.getForeignTableName() + "/types\";";
                    if (!returnValue.contains(importString)) {
                        returnValue.add(importString);
                    }
                }

            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.IMPORT_INDEX_OF_FOREIGN_TABLES)) {
            for (Column column : table.getColumns()) {
                if (column.isForeignKey()) {
                    String tableIndex = getTableIndex(column.getForeignTableName());
                    String importString = "import " + tableIndex + " from \"../../" + column.getForeignTableName() + "/" + tableIndex + "\";";
                    if (!returnValue.contains(importString)) {
                        returnValue.add(importString);
                    }
                }

            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.IMPORT_INDEX_TABLE_WHICH_REFERENCE_THIS_TABLE)) {
            ArrayList<String> tempList = mapOfTableRelationships.get(table.getTableName());
            if (tempList != null) {
                for (String tableName : tempList) {
                    String templateString = "import INDEX_TABLE from \"../../TABLE_NAME/INDEX_TABLE\";";
                    templateString = templateString.replaceAll("INDEX_TABLE", getTableIndex(tableName));
                    templateString = templateString.replaceAll("TABLE_NAME", tableName);
                    if (!returnValue.contains(templateString)) {
                        returnValue.add(templateString);
                    }
                }
            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.MAP_COLUMNS_IN_TYPE_FIELDS)) {
            for (Column column : table.getColumns()) {
                String attribute = column.getColumnName();
                attribute += "? : ";
                if (Objects.equals(column.getColumnType(), UtilConstants.ENUM_TYPE)) {
                    attribute += GeneratorUtils.firstLatterToUppercase(table.getTableName()) + GeneratorUtils.firstLatterToUppercase(column.getColumnName()) + "Type";
                } else {
                    attribute += column.getMappedType() + ";";
                }
                returnValue.add(attribute);

                if (column.isForeignKey()) {
                    String foreignAttribute = GeneratorUtils.firstLatterToLowercase(column.getForeignTableName()) + "_"
                            + column.getColumnName() + "? : "
                            + GeneratorUtils.firstLatterToUppercase(column.getForeignTableName()) + ";";
                    returnValue.add(foreignAttribute);
                }

            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.INDEX_OF_TABLES_WHICH_REFERENCE_THIS_TABLE)) {
            ArrayList<String> tempList = mapOfTableRelationships.get(table.getTableName());
            if (tempList != null) {
                for (String tableName : new HashSet<>(tempList)) {
                    String templateString = " ability.can(\"AU_TABLE_NAME_READ\", \"AU_TABLE_NAME_READ\") &&\n" +
                            "      tabs.push({\n" +
                            "        tabTitle: \"FU_TABLE_NAME\",\n" +
                            "        tabContent: (\n" +
                            "          <TABLE_INDEX\n" +
                            "            isEnabledTableActions={false}\n" +
                            "            predefinedFilterCriteria={PREDEFINED_FILTER_CRITERIA}\n" +
                            "          />\n" +
                            "        ),\n" +
                            "      });";

                    templateString = templateString.replace("AU_TABLE_NAME", tableName.toUpperCase());
                    templateString = templateString.replace("FU_TABLE_NAME", StringUtils.firstLatterToUppercase(tableName));
                    templateString = templateString.replace("TABLE_INDEX", getTableIndex(tableName));
                    StringBuilder predefinedFilterCriteria = new StringBuilder();
                    Table referenceTable = allTables.get(tableName);
                    for (Column column : referenceTable.getColumns()) {
                        if (column.isForeignKey() && Objects.equals(column.getForeignTableName(), table.getTableName())) {
                            predefinedFilterCriteria.append("{\n" + "              key: \"")
                                    .append(column.getColumnName()).append("\",\n")
                                    .append("              operation: FilterCriteriaOperator.EQUALS,\n")
                                    .append("              type: \"").append(column.getMappedType())
                                    .append("\",\n").append("              value: singleObject?.")
                                    .append(column.getForeignColumnName()).append(",\n")
                                    .append("            }");
                        }

                    }
                    templateString = templateString.replace("PREDEFINED_FILTER_CRITERIA", predefinedFilterCriteria.toString());
                    returnValue.add(templateString);
                }
            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.PAGE_OF_FOREIGN_TABLES)) {
            for (Column column : table.getColumns()) {
                String templateString = "<TABLE_PAGE objectId={singleObject?.TABLE_COLUMN} simpleView={true} />";
                if (column.isForeignKey()) {
                    templateString = templateString.replaceAll("TABLE_PAGE", getTablePage(column.getForeignTableName()));
                    templateString = templateString.replaceAll("TABLE_COLUMN", column.getColumnName());
                    returnValue.add(templateString);
                }
            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.STATE_FOR_MODAL_OF_FOREIGN_TABLES)) {
            for (Column column : table.getColumns()) {
                if (column.isForeignKey()) {
                    String templateString = "const [isOpenFOREIGN_TABLE_NAMEModal, setOpenFOREIGN_TABLE_NAMEModal] = useState<boolean>(false);";
                    templateString = templateString.replaceAll("FOREIGN_TABLE_NAME", GeneratorUtils.firstLatterToUppercase(column.getForeignTableName()));
                    returnValue.add(templateString);
                }
            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.WATCH_TABLE_FOREIGN_OBJECTS)) {
            ArrayList<String> foreignColumns = new ArrayList<>();
            for (Column column : table.getColumns()) {
                if (column.isForeignKey()) {
                    foreignColumns.add(GeneratorUtils.firstLatterToLowercase(column.getForeignTableName()) + "_"
                            + column.getColumnName());
                }
            }
            if (!foreignColumns.isEmpty()) {
                returnValue.add("const { " + String.join(",", foreignColumns) + " } = watch();");
            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.FORM_CHECK_FOREIGN_FIELDS)) {
            for (Column column : table.getColumns()) {
                if (column.isForeignKey() && !column.isNullable()) {
                    String templateString = "if (!submitData.COLUMN_NAME) {\n" +
                            "      setErrorMessage(\"FOREIGN_TABLE_NAME is required!\");\n" +
                            "      return;\n" +
                            "    }";
                    templateString = templateString.replaceAll("COLUMN_NAME", column.getColumnName());
                    templateString = templateString.replaceAll("FOREIGN_TABLE_NAME", column.getForeignTableName());
                    returnValue.add(templateString);
                }
            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.FORM_FOREIGN_TABLES_FIELDS)) {
            for (Column column : table.getColumns()) {
                if (column.isForeignKey()) {
                    String templateString = "<FormForeignObjectField\n" +
                            "        label={`FOREIGN_TABLE_NAME`}\n" +
                            "        onClick={() => setOpenFOREIGN_FU_TABLE_NAMEModal(true)}\n" +
                            "        isEditMode={isEditMode}\n" +
                            "        selectedObjectLabel={FOREIGN_TABLE_OBJECT?.FOREIGN_COLUMN_NAME?.toString() ?? editCURRENT_FU_TABLE_NAME?.CURRENT_COLUMN_NAME?.toString()}\n" +
                            "      />";
                    templateString = templateString.replaceAll("CURRENT_COLUMN_NAME", column.getColumnName());
                    templateString = templateString.replaceAll("CURRENT_FU_TABLE_NAME", GeneratorUtils.firstLatterToUppercase(table.getTableName()));
                    templateString = templateString.replaceAll("FOREIGN_TABLE_NAME", column.getForeignTableName());
                    templateString = templateString.replaceAll("FOREIGN_COLUMN_NAME", column.getForeignColumnName());
                    templateString = templateString.replaceAll("FOREIGN_FU_TABLE_NAME", GeneratorUtils.firstLatterToUppercase(column.getForeignTableName()));
                    templateString = templateString.replaceAll("FOREIGN_TABLE_OBJECT", GeneratorUtils.firstLatterToLowercase(column.getForeignTableName()) + "_"
                            + column.getColumnName());

                    returnValue.add(templateString);
                }
            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.FORM_FOREIGN_TABLES_INDEX_MODAL)) {
            for (Column column : table.getColumns()) {
                if (column.isForeignKey()) {
                    String templateString = "<Modal open={isOpenFOREIGN_FU_TABLE_NAMEModal} onClose={() => setOpenFOREIGN_FU_TABLE_NAMEModal(false)} className={\"center-modal\"} sx={{ overflow: \"auto\" }}>\n" +
                            "        <Box sx={boxStyle}>\n" +
                            "          <FOREIGN_FU_TABLE_NAMEIndex\n" +
                            "            selectedRowId={FOREIGN_TABLE_OBJECT?.FOREIGN_COLUMN_NAME ?? editCURRENT_FU_TABLE_NAME?.CURRENT_COLUMN_NAME}\n" +
                            "            onRowSelect={(FOREIGN_TABLE_OBJECT: FOREIGN_FU_TABLE_NAME) => {\n" +
                            "              setValue(\"FOREIGN_TABLE_OBJECT\", FOREIGN_TABLE_OBJECT);\n" +
                            "              setValue(\"CURRENT_COLUMN_NAME\", FOREIGN_TABLE_OBJECT.FOREIGN_COLUMN_NAME);\n" +
                            "              setOpenFOREIGN_FU_TABLE_NAMEModal(false);\n" +
                            "            }}\n" +
                            "            isEnabledTableActions={false}\n" +
                            "          />\n" +
                            "        </Box>\n" +
                            "      </Modal>";
                    templateString = templateString.replaceAll("CURRENT_COLUMN_NAME", column.getColumnName());
                    templateString = templateString.replaceAll("CURRENT_FU_TABLE_NAME", GeneratorUtils.firstLatterToUppercase(table.getTableName()));
                    templateString = templateString.replaceAll("FOREIGN_TABLE_NAME", column.getForeignTableName());
                    templateString = templateString.replaceAll("FOREIGN_COLUMN_NAME", column.getForeignColumnName());
                    templateString = templateString.replaceAll("FOREIGN_FU_TABLE_NAME", GeneratorUtils.firstLatterToUppercase(column.getForeignTableName()));
                    templateString = templateString.replaceAll("FOREIGN_TABLE_OBJECT", GeneratorUtils.firstLatterToLowercase(column.getForeignTableName()) + "_"
                            + column.getColumnName());

                    returnValue.add(templateString);
                }
            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.TABLE_ENUM_TYPES)) {
            for (Column column : table.getColumns()) {
                if (Objects.equals(column.getColumnType(), UtilConstants.ENUM_TYPE)) {
                    StringBuilder enumType = new StringBuilder();
                    enumType.append("export enum ").append(GeneratorUtils.firstLatterToUppercase(table.getTableName())).append(GeneratorUtils.firstLatterToUppercase(column.getColumnName())).append("Type {\n");
                    for (String enumValue : column.getEnumTypeValues()) {
                        enumType.append("_").append(enumValue).append(" = ").append("\"").append(enumValue).append("\",");
                    }
                    enumType.append("}\n");
                    returnValue.add(enumType.toString());
                }
            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.TABLE_COLUMNS_CONFIGURATION)) {
            StringBuilder tableConfiguration = new StringBuilder();
            tableConfiguration.append("export const ").append(GeneratorUtils.firstLatterToUppercase(table.getTableName())).append("Columns : TableColumnType[] = [\n");

            for (Column column : table.getColumns()) {
                String inputType = TypeGenerator.mapSQLtypeToInputType.get(column.getColumnType());
                tableConfiguration.append("{\n");
                tableConfiguration.append("key: \"").append(column.getColumnName()).append("\",\n");
                tableConfiguration.append("label: \"").append(column.getDisplayName()).append("\",\n");
                tableConfiguration.append("hasSort: ").append(column.getHasSort().toString()).append(",\n");
                tableConfiguration.append("hasFilter: ").append(column.getHasFilter().toString()).append(",\n");
                tableConfiguration.append("type: COLUMN_TYPE.").append((inputType != null ? inputType : "text").toUpperCase()).append(",\n");
                tableConfiguration.append("isVisibleOnTable: ").append(column.getVisible().toString()).append(",\n");
                if (Objects.equals(column.getColumnType(), UtilConstants.ENUM_TYPE)) {
                    tableConfiguration.append("options: Object.values(").append(GeneratorUtils.firstLatterToUppercase(table.getTableName())).append(GeneratorUtils.firstLatterToUppercase(column.getColumnName())).append("Type),\n");
                }
                tableConfiguration.append("isVisibleOnSinglePage: ").append(column.getVisibleOnSinglePage()).append(",\n");
                tableConfiguration.append("placeholder: \"").append("\",\n");
                tableConfiguration.append("formProperties: {\n");
                tableConfiguration.append("isVisible: ").append(Boolean.toString(!column.isAutoIncrement() && !column.isForeignKey())).append(",\n");
                tableConfiguration.append("required: ").append(Boolean.toString(!column.isNullable() || (column.isPrimaryKey() && !column.isAutoIncrement()) || !column.isForeignKey())).append(",\n");
                tableConfiguration.append("maxLength: ").append(column.getColumnSize()).append(",\n");
                tableConfiguration.append("isDisabledEditing: ").append(Boolean.toString(column.isPrimaryKey())).append(",\n");
                tableConfiguration.append("isHiddenOnEditing: false,\n");
                tableConfiguration.append("defaultValue: \"").append("\",\n");
                tableConfiguration.append("},\n" +
                        "  },");
            }
            tableConfiguration.append("];");
            returnValue.add(tableConfiguration.toString());
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.TABLE_OBJECT_DETAILS_NO_FOREIGN_KEY)) {
            for (Column column : table.getColumns()) {
                if (!column.isForeignKey()) {
                    String tableCell = "<dt className=\"col-sm-3\">COLUMN_NAME</dt>\r\n"
                            + "        <dd className=\"col-sm-9\">\r\n" + "          <p>{object.column_name}</p>\r\n"
                            + "        </dd>";
                    /*
                     * if (column.isAutoIncrement() || column.isNullable() || column.isPrimaryKey())
                     * attribute += "? ";
                     */
                    tableCell = tableCell.replace("COLUMN_NAME", column.getColumnName().toUpperCase());
                    if (column.getColumnType().equals("DATE")) {
                        tableCell = tableCell.replaceAll("column_name", column.getColumnName() + ".toString()");
                    } else {
                        tableCell = tableCell.replaceAll("column_name", column.getColumnName());
                    }
                    returnValue.add(tableCell);
                }
            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.IMPORT_PAGE_OF_FOREIGN_TABLES)) {

            for (Column column : table.getColumns()) {
                String templateString = "import FOREIGN_TABLE_PAGE from \"../../TABLE_NAME/singlePage/FOREIGN_TABLE_PAGE\";";
                if (column.isForeignKey()) {
                    templateString = templateString.replaceAll("FOREIGN_TABLE_PAGE",
                            getTablePage(column.getForeignTableName()));
                    templateString = templateString.replaceAll("TABLE_NAME", column.getForeignTableName());
                    if (!returnValue.contains(templateString)) {
                        returnValue.add(templateString);
                    }
                }
            }
            returnString = "";
        }
        if (returnValue.isEmpty())
            returnValue.add(returnString);
        return returnValue;
    }

    public static ArrayList<String> replaceSystemApiRoutesConstants(String codeLine, HashMap<String, Table> tables) {
        ArrayList<String> returnList = new ArrayList<>();

        if (codeLine.contains(ReactGeneratorConstant.SYSTEM_API_ROUTES)) {
            for (Table table : tables.values()) {
                returnList.add("ROOT_" + table.getTableName().toUpperCase() + ":  \"/data/" + table.getTableName() + "\",");
                returnList.add("FILTER_" + table.getTableName().toUpperCase() + ":  \"/data/" + table.getTableName() + "/filter\",");
                returnList.add("GET_BY_ID_" + table.getTableName().toUpperCase() + ":  \"/data/" + table.getTableName() + "/${API_ROUTES_ID_PLACEHOLDER}\",");
                returnList.add("");
            }
        }

        if (returnList.isEmpty())
            returnList.add(codeLine);
        return returnList;

    }

    public static ArrayList<String> replaceReactApplicationRoutesConstants(String codeLine, HashMap<String, Table> tables) {
        ArrayList<String> returnList = new ArrayList<>();

        if (codeLine.contains(ReactGeneratorConstant.REACT_APPLICATION_ROUTES)) {
            for (Table table : tables.values()) {
                returnList.add(table.getTableName().toUpperCase() + ":  \"/" + table.getTableName() + "\",");
            }
        }
        if (returnList.isEmpty())
            returnList.add(codeLine);

        return returnList;
    }

    public static ArrayList<String> replaceApplicationSidebarConstants(String codeLine, HashMap<String, Table> tables) {
        ArrayList<String> returnList = new ArrayList<>();

        if (codeLine.contains(ReactGeneratorConstant.APPLICATION_SIDEBAR_ITEMS)) {
            for (Table table : tables.values()) {
                returnList.add("ability.can(\"" + table.getTableName().toUpperCase() + "_READ\", \"" + table.getTableName().toUpperCase() + "_READ\") &&");
                returnList.add("sideBarLinks.push({");
                returnList.add("key: \"" + table.getTableName() + "\",");
                returnList.add("path: APPLICATION_ROUTES." + table.getTableName().toUpperCase() + ",");
                returnList.add("});");
            }
        }

        if (returnList.isEmpty())
            returnList.add(codeLine);
        return returnList;

    }

    public static ArrayList<String> replaceApplicationPrivateRouterConstants(String codeLine, HashMap<String, Table> tables) {
        ArrayList<String> returnList = new ArrayList<String>();

        if (codeLine.contains(ReactGeneratorConstant.APPLICATION_PRIVATE_ROUTER_IMPORT)) {
            for (Table table : tables.values()) {
                returnList.add("const " + GeneratorUtils.firstLatterToUppercase(table.getTableName()) + "Index = lazy(() => import(\"../../pages/" + table.getTableName() + "/" + GeneratorUtils.firstLatterToUppercase(table.getTableName()) + "Index\"));");
                returnList.add("const " + GeneratorUtils.firstLatterToUppercase(table.getTableName()) + "ById = lazy(() => import(\"../../pages/" + table.getTableName() + "/singlePage/" + GeneratorUtils.firstLatterToUppercase(table.getTableName()) + "Page\"));");
            }
        } else if (codeLine.contains(ReactGeneratorConstant.APPLICATION_PRIVATE_ROUTER_PATH)) {
            for (Table table : tables.values()) {
                returnList.add("<Route path={APPLICATION_ROUTES." + table.getTableName().toUpperCase() + "}");
                returnList.add(" element={ <ProtectedRoute subject={\"" + table.getTableName().toUpperCase() + "_READ\"}>");
                returnList.add("<Suspense fallback={<PageLoader />}>\n" +
                        "                    <" + GeneratorUtils.firstLatterToUppercase(table.getTableName()) + "Index />\n" +
                        "                  </Suspense>");
                returnList.add("</ProtectedRoute>\n" +
                        "              }\n" +
                        "            />");

                returnList.add("<Route\n" +
                        "              path={`${APPLICATION_ROUTES." + table.getTableName().toUpperCase() + "}/:id`}\n" +
                        "              element={\n" +
                        "                <ProtectedRoute subject={\"" + table.getTableName().toUpperCase() + "_READ\"}>\n" +
                        "                  <Suspense fallback={<PageLoader />}>\n" +
                        "                    <" + GeneratorUtils.firstLatterToUppercase(table.getTableName()) + "ById />\n" +
                        "                  </Suspense>\n" +
                        "                </ProtectedRoute>\n" +
                        "              }\n" +
                        "            />");
            }
        }

        if (returnList.isEmpty())
            returnList.add(codeLine);
        return returnList;

    }

}
