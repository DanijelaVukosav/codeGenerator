package com.master.codegenerator.reactUtils;

import com.master.codegenerator.TableParser.TableParser;
import com.master.codegenerator.generator.TableGenerator;
import com.master.codegenerator.generator.TypeGenerator;
import com.master.codegenerator.models.Column;
import com.master.codegenerator.models.Table;

import java.util.ArrayList;
import java.util.HashMap;

public class ReplaceConst {

    public ReplaceConst() {
        // TODO Auto-generated constructor stub
    }

    private static String getTableService(String tableName) {
        return StringUtils.firstLatterToUppercase(tableName) + "Service";
    }

    private static String getTableIndex(String tableName) {
        return "Index" + StringUtils.firstLatterToUppercase(tableName);
    }

    private static String getTableForm(String tableName) {
        return "Form" + StringUtils.firstLatterToUppercase(tableName);
    }

    private static String getTablePage(String tableName) {
        return "Page" + StringUtils.firstLatterToUppercase(tableName);
    }

    private static String getCreateTableComponent(String tableName) {
        return "Create" + StringUtils.firstLatterToUppercase(tableName);
    }

    private static String getEditTableComponent(String tableName) {
        return "Edit" + StringUtils.firstLatterToUppercase(tableName);
    }

    private static String getDefaultObject(String tableName) {
        return "DEFAULT_" + tableName.toUpperCase();
    }

    public static ArrayList<String> replaceGeneratorConstants(Table table, String codeLine) {
        String returnString = codeLine;

        ArrayList<String> returnValue = new ArrayList<String>();

        if (returnString.contains(ReactGeneratorConstant.FL_TABLE_NAME)) {
            returnString = returnString.replaceAll(ReactGeneratorConstantRegex.FL_TABLE_NAME,
                    StringUtils.firstLatterToUppercase(table.getTableName()));
        }
        if (returnString.contains(ReactGeneratorConstant.SFL_TABLE_NAME)) {
            returnString = returnString.replaceAll(ReactGeneratorConstantRegex.SFL_TABLE_NAME,
                    StringUtils.firstLatterToLowercase(table.getTableName()));
        }
        if (returnString.contains(ReactGeneratorConstant.TABLE_SERVICE)) {
            returnString = returnString.replaceAll(ReactGeneratorConstantRegex.TABLE_SERVICE,
                    getTableService(table.getTableName()));
        }
        if (returnString.contains(ReactGeneratorConstant.INDEX_TABLE_NAME)) {
            returnString = returnString.replaceAll(ReactGeneratorConstantRegex.INDEX_TABLE_NAME,
                    getTableIndex(table.getTableName()));
        }
        if (returnString.contains(ReactGeneratorConstant.ABL_TABLE_NAME)) {
            returnString = returnString.replaceAll(ReactGeneratorConstantRegex.ABL_TABLE_NAME,
                    table.getTableName().toUpperCase());
        }
        if (returnString.contains(ReactGeneratorConstant.DEFAULT_TABLE_OBJECT)) {
            returnString = returnString.replaceAll(ReactGeneratorConstantRegex.DEFAULT_TABLE_OBJECT,
                    getDefaultObject(table.getTableName()));
        }
        if (returnString.contains(ReactGeneratorConstant.ASL_TABLE_NAME)) {
            returnString = returnString.replaceAll(ReactGeneratorConstantRegex.ASL_TABLE_NAME,
                    table.getTableName().toLowerCase());
        }
        if (returnString.contains(ReactGeneratorConstant.TABLE_FORM)) {
            returnString = returnString.replaceAll(ReactGeneratorConstantRegex.TABLE_FORM,
                    getTableForm(table.getTableName()));
        }
        if (returnString.contains(ReactGeneratorConstant.CREATE_TABLE_NAME)) {
            returnString = returnString.replaceAll(ReactGeneratorConstantRegex.CREATE_TABLE_NAME,
                    getCreateTableComponent(table.getTableName()));
        }
        if (returnString.contains(ReactGeneratorConstant.EDIT_TABLE_NAME)) {
            returnString = returnString.replaceAll(ReactGeneratorConstantRegex.EDIT_TABLE_NAME,
                    getEditTableComponent(table.getTableName()));
        }
        if (returnString.contains(ReactGeneratorConstant.PAGE_TABLE_NAME)) {
            returnString = returnString.replaceAll(ReactGeneratorConstantRegex.PAGE_TABLE_NAME,
                    getTablePage(table.getTableName()));
        }
        if (returnString.contains(ReactGeneratorConstant.TABLE_PRIMARY_KEY_COLUMN)) {
            for (Column column : table.getColumns()) {
                if (column.isPrimaryKey()) {
                    returnString = returnString.replaceAll(ReactGeneratorConstantRegex.TABLE_PRIMARY_KEY_COLUMN,
                            column.getColumnName());
                }

            }
        }

        if (codeLine.contains(ReactGeneratorConstant.IMPORT_FOREIGN_KEYS_TABLE_NAME)) {
            for (Column column : table.getColumns()) {
                if (column.isForeignKey()) {
                    String importType = StringUtils.firstLatterToUppercase(column.getForeignTableName());
                    String importString = "import { " + importType + " } from \"../" + column.getForeignTableName() + "/types\";";
                    if (!returnValue.contains(importString)) {
                        returnValue.add(importString);
                    }
                }

            }
            ArrayList<String> pomList = TableGenerator.mapOfTableRelationships.get(table.getTableName());
            if (pomList != null && !pomList.isEmpty()) {

                for (String tableName : pomList) {
                    returnValue.add("import { " + StringUtils.firstLatterToUppercase(tableName) + " } from \"../"
                            + tableName + "/types\";");
                }
            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.IMPORT_FOREIGN_KEYS_TABLE_NAME_IN_SERVICE)) {
            for (Column column : table.getColumns()) {
                if (column.isForeignKey()) {
                    String importType = StringUtils.firstLatterToUppercase(column.getForeignTableName());
                    String importString  ="import { " + importType + " } from \"../../" + column.getForeignTableName() + "/types\";";
                    if(!returnValue.contains(importString)) {
                        returnValue.add(importString);
                    }
                }

            }
            ArrayList<String> pomList = TableGenerator.mapOfTableRelationships.get(table.getTableName());
            if (pomList != null && !pomList.isEmpty()) {

                for (String tableName : pomList) {
                    returnValue.add("import { " + StringUtils.firstLatterToUppercase(tableName) + " } from \"../../"
                            + tableName + "/types\";");
                }
            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.MAP_COLUMNS_IN_TYPE_FIELDS)) {
            for (Column column : table.getColumns()) {
                String attribute = column.getColumnName();
                // if (column.isAutoIncrement() || column.isNullable())
                // attribute += "? ";
                attribute += "? : ";
                attribute += TypeGenerator.typesHashMap.get(column.getColumnType()) + ";";
                returnValue.add(attribute);

                if (column.isForeignKey()) {
                    String foreignAttribute = StringUtils.firstLatterToLowercase(column.getForeignTableName()) + "_"
                            + column.getColumnName() + "? : "
                            + StringUtils.firstLatterToUppercase(column.getForeignTableName()) + ";";
                    returnValue.add(foreignAttribute);
                }

            }
            ArrayList<String> pomList = TableGenerator.mapOfTableRelationships.get(table.getTableName());
            if (pomList != null && !pomList.isEmpty()) {
                for (String tableName : pomList) {
                    String foreignAttribute = StringUtils.firstLatterToLowercase(tableName) + "_? : "
                            + StringUtils.firstLatterToUppercase(tableName) + "[];";
                    returnValue.add(foreignAttribute);
                }
            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.HEADER_OF_INDEX_TABLE)) {
            for (Column column : table.getColumns()) {
                returnValue.add("<th>" + column.getDisplayName() + "</th>");

            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.IMPORT_TABLE_SERVICE_FOREIGN_KEYS)) {
            for (Column column : table.getColumns()) {
                if (column.isForeignKey()) {
                    String importTypeService = getTableService(column.getForeignTableName());
                    String defaultObject = getDefaultObject(column.getForeignTableName());
                    String importString = "import " + importTypeService + ", { " + defaultObject + " } from \"../../"
                            + column.getForeignTableName() + "/service/" + importTypeService + "\";";

                    if (!returnValue.contains(importString)) {
                        returnValue.add(importString);
                    }
                }

            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.DEFAULT_VALUES_OF_COLUMNS)) {
            for (Column column : table.getColumns()) {
                String attribute = column.getColumnName();
                /*
                 * if (column.isAutoIncrement() || column.isNullable() || column.isPrimaryKey())
                 * attribute += "? ";
                 */
                attribute += " : ";
                attribute += TypeGenerator.defaultValueOfType.get(column.getColumnType()) + ",";
                returnValue.add(attribute);

                if (column.isForeignKey()) {
                    String foreignAttribute = StringUtils.firstLatterToLowercase(column.getForeignTableName()) + "_" + column.getColumnName() + " : "
                            + getDefaultObject(column.getForeignTableName()) + ",";
                    returnValue.add(foreignAttribute);
                }

            }
            ArrayList<String> tempList = TableGenerator.mapOfTableRelationships.get(table.getTableName());
            if (tempList != null) {
                for (String tableName : tempList) {
                    String foreignAttribute = StringUtils.firstLatterToLowercase(tableName) + "_ :[], ";
                    returnValue.add(foreignAttribute);
                }
            }
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
        } else if (codeLine.contains(ReactGeneratorConstant.TABLE_OBJECT_DETAILS_FOREIGN_KEY)) {
            for (Column column : table.getColumns()) {
                if (column.isForeignKey()) {
                    String tableCell = "{isReady && <TablePage object={object?.table_object} />}";

                    tableCell = tableCell.replace("TablePage", getTablePage(column.getForeignTableName()));
                    tableCell = tableCell.replace("table_object",
                            StringUtils.firstLatterToLowercase(column.getForeignTableName()) + "_"
                                    + column.getColumnName());
                    returnValue.add(tableCell);
                }
            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.TABLES_WHICH_REFERENCE_THIS_TABLE)) {
            ArrayList<String> tempList = TableGenerator.mapOfTableRelationships.get(table.getTableName());
            if (tempList != null) {
                for (String tableName : tempList) {
                    String templateString = "{!isEmpty(object.type_attribute) && (<TableIndex objects={object.type_attribute} />)}";
                    templateString = templateString.replace("TableIndex", getTableIndex(tableName));
                    templateString = templateString.replaceAll("type_attribute",
                            StringUtils.firstLatterToLowercase(tableName) + "_");
                    returnValue.add(templateString);
                }
            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.NESTED_CATCH_FOREIGN_OBJECTS)) {
            for (Column column : table.getColumns()) {
                String placeholder = "await TABLE_SERVICE.getById(object.FOREIGN_KEY + \"\").then((data) => {object.FOREIGN_KEY_FIELD = data; });";
                if (column.isForeignKey()) {
                    placeholder = placeholder.replace("TABLE_SERVICE", getTableService(column.getForeignTableName()));
                    placeholder = placeholder.replace("FOREIGN_KEY_FIELD",
                            StringUtils.firstLatterToLowercase(column.getForeignTableName()) + "_"
                                    + column.getColumnName());

                    placeholder = placeholder.replace("FOREIGN_KEY", column.getColumnName());
                    returnValue.add(placeholder);
                }
            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.INPUT_FIELDS_OF_TABLE)) {

            for (Column column : table.getColumns()) {
                String placeholder = "<GeneralInput\r\n" + "        type=\"COLUMN_TYPE\"\r\n"
                        + "        name=\"COLUMN_NAME\"\r\n" + "        label=\"COLUMN_DISPLAY_NAME\"\r\n"
                        + "        value={props.object.COLUMN_NAME}\r\n" + "        onChange={props.onChange}\r\n"
                        + "      />";
                if (!column.isForeignKey()) {
                    placeholder = placeholder.replaceAll("COLUMN_TYPE",
                            TypeGenerator.mapSQLtypeToInputType.get(column.getColumnType()));
                    placeholder = placeholder.replaceAll("COLUMN_NAME", column.getColumnName());
                    placeholder = placeholder.replace("COLUMN_DISPLAY_NAME", column.getDisplayName());
                    returnValue.add(placeholder);
                }
            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.TABLE_COLUMNS_IN_ROW)) {

            for (Column column : table.getColumns()) {
                String placeholder = "<td>{props.data.COLUMN_NAME}</td>";
                placeholder = placeholder.replaceAll("COLUMN_NAME", column.getColumnName());
                returnValue.add(placeholder);
            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.IMPORT_INDEX_TABLE_WHICH_REFERENCE_THIS_TABLE)) {

            ArrayList<String> tempList = TableGenerator.mapOfTableRelationships.get(table.getTableName());
            if (tempList != null) {
                for (String tableName : tempList) {
                    String templateString = "import INDEX_TABLE from \"../../TABLE_NAME/INDEX_TABLE\";";
                    templateString = templateString.replaceAll("INDEX_TABLE", getTableIndex(tableName));
                    templateString = templateString.replaceAll("TABLE_NAME", tableName);
                    returnValue.add(templateString);
                }
            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.FORM_OF_FOREIGN_TABLES)) {

            for (Column column : table.getColumns()) {
                String templateString = "<FOREIGN_TABLE_FORM object={object?.FOREIGN_OBJECT ?? DEFAULT_OBJECT} onSave={ onSaveReferencedObject_FOREIGN_OBJECT } onChange={onFieldValueChangeFL_TABLE_NAME} />";
                if (column.isForeignKey()) {
                    templateString = templateString.replaceAll("FOREIGN_TABLE_FORM",
                            getTableForm(column.getForeignTableName()));
                    templateString = templateString.replaceAll("FOREIGN_OBJECT",
                            StringUtils.firstLatterToLowercase(column.getForeignTableName()) + "_"
                                    + column.getColumnName());
                    templateString = templateString.replaceAll("DEFAULT_OBJECT",
                            getDefaultObject(column.getForeignTableName()));
                    templateString = templateString.replaceAll("FL_TABLE_NAME",
                            StringUtils.firstLatterToUppercase(column.getForeignTableName()));
                    templateString = templateString.replaceAll("TABLE_NAME", column.getForeignTableName());
                    returnValue.add(templateString);
                }
            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.IMPORT_FORM_OF_FOREIGN_TABLES)) {

            for (Column column : table.getColumns()) {
                String templateString = "import { FOREIGN_TABLE_FORM } from \"../../TABLE_NAME/components/FOREIGN_TABLE_FORM\";";
                if (column.isForeignKey()) {
                    templateString = templateString.replaceAll("FOREIGN_TABLE_FORM",
                            getTableForm(column.getForeignTableName()));
                    templateString = templateString.replaceAll("TABLE_NAME", column.getForeignTableName());
                    if (!returnValue.contains(templateString)) {
                        returnValue.add(templateString);
                    }
                }
            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.IMPORT_PAGE_OF_FOREIGN_TABLES)) {

            for (Column column : table.getColumns()) {
                String templateString = "import { FOREIGN_TABLE_PAGE } from \"../../TABLE_NAME/components/FOREIGN_TABLE_PAGE\";";
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
        } else if (codeLine.contains(ReactGeneratorConstant.IMPORT_INDEX_TABLE_WHICH_REFECENCE_THIS_TABLE)) {
            ArrayList<String> tempList = TableGenerator.mapOfTableRelationships.get(table.getTableName());
            if (tempList != null) {
                for (String tableName : tempList) {
                    String templateString = "import { FOREIGN_TABLE_INDEX } from \"../../TABLE_NAME/FOREIGN_TABLE_INDEX\";";
                    templateString = templateString.replaceAll("FOREIGN_TABLE_INDEX",
                            getTableIndex(tableName));
                    templateString = templateString.replaceAll("TABLE_NAME", tableName);
                    returnValue.add(templateString);
                }
            }

            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.ON_SAVE_FOREIGN_OBJECT)) {
            for (Column column : table.getColumns()) {
                String templateString = "const onSaveReferencedObject_FOREIGN_FIELD = () => {\r\n"
                        + "    return TABLE_SERVICE.create({ ...object?.FOREIGN_FIELD, FOREIGN_FIELD_KEY: undefined } ).then((data) => {\r\n"
                        + "      setObject({ ...object, FOREIGN_FIELD_KEY: data.FOREIGN_FIELD_KEY });\r\n"
                        + "    });\r\n" + "  }";
                if (column.isForeignKey()) {
                    templateString = templateString.replaceAll("TABLE_SERVICE",
                            getTableService(column.getForeignTableName()));
                    templateString = templateString.replaceAll("FOREIGN_FIELD_KEY", column.getColumnName());
                    templateString = templateString.replaceAll("FOREIGN_FIELD",
                            StringUtils.firstLatterToLowercase(column.getForeignTableName()) + "_"
                                    + column.getColumnName());
                    templateString = templateString.replaceAll("FL_TABLE_NAME",
                            StringUtils.firstLatterToUppercase(column.getForeignTableName()));
                    returnValue.add(templateString);
                }
            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.ON_CHANGE_FIELD_FOREIGN_OBJECT)) {

            for (Column column : table.getColumns()) {
                String templateString = "const onFieldValueChangeFL_TABLE_NAME = () => {\r\n"
                        + "    return TABLE_SERVICE.create({ ...object?.FOREIGN_FIELD, FOREIGN_FIELD_KEY: undefined } ).then((data) => {\r\n"
                        + "      setObject({ ...object, FOREIGN_FIELD_KEY: data.FOREIGN_FIELD_KEY });\r\n"
                        + "    });\r\n" + "  }";
                if (column.isForeignKey()) {
                    templateString = templateString.replaceAll("TABLE_SERVICE",
                            getTableService(column.getForeignTableName()));
                    templateString = templateString.replaceAll("FOREIGN_FIELD_KEY", column.getColumnName());
                    templateString = templateString.replaceAll("FOREIGN_FIELD",
                            StringUtils.firstLatterToLowercase(column.getForeignTableName()) + "_"
                                    + column.getColumnName());
                    templateString = templateString.replaceAll("FL_TABLE_NAME",
                            StringUtils.firstLatterToUppercase(column.getForeignTableName()));
                    returnValue.add(templateString);
                }
            }
            returnString = "";
        } else if (codeLine.contains(ReactGeneratorConstant.TABLE_FILTER_OPTIONS)) {
            for (Column column : table.getColumns()) {
                String placeholder = "<option value=\"COLUMN_NAME\" SELECTED> DISPLAY_NAME </option>";
                placeholder = placeholder.replaceAll("COLUMN_NAME", column.getColumnName());
                placeholder = placeholder.replaceAll("DISPLAY_NAME", column.getDisplayName());
                placeholder = placeholder.replaceAll("SELECTED", column.isPrimaryKey() ? "selected" : "");
                returnValue.add(placeholder);
            }
            returnString = "";
        }
        if (returnValue.isEmpty())
            returnValue.add(returnString);
        return returnValue;
    }

    public static ArrayList<String> replaceGeneratorAppConstants(String codeLine, HashMap<String, Table> tables) {
        String returnString = codeLine;
        ArrayList<String> returnList = new ArrayList<String>();

        if (returnString.contains(ReactGeneratorConstant.TABLES_ARRAY)) {
            returnList.add(returnString.replaceAll(ReactGeneratorConstantRegex.TABLES_ARRAY, getTablesArrayAsString(tables)));
        } else if (codeLine.contains(ReactGeneratorConstant.GUARDED_ROUTES_OF_TABLES)) {
//			System.out.println("nesto se desilo tu "+ returnList.size()+returnList.get(0));
            generateRoutesForTables(returnList, tables);
        } else if (codeLine.contains(ReactGeneratorConstant.IMPORT_COMPONENTS_OF_TABLES)) {
            generateImportsForTables(returnList);
        }

        if (returnList.isEmpty())
            returnList.add(returnString);
        return returnList;

    }

    private static void generateRoutesForTables(ArrayList<String> returnList, HashMap<String, Table> tables) {

        for (String tableName : tables.keySet()) {
            returnList.add("<GuardedRoute exact path=\"/" + tableName + "/create\" component={"
                    + getCreateTableComponent(tableName) + "} auth={!isNil(currentUser)} />");
            returnList.add("<GuardedRoute exact path=\"/" + tableName + "/edit/:id\" component={"
                    + getEditTableComponent(tableName) + "} auth={!isNil(currentUser)} />");
            returnList.add("<GuardedRoute exact path=\"/" + tableName + "/:id\" component={" + getTablePage(tableName)
                    + "} auth={!isNil(currentUser)} />");
            returnList.add("<GuardedRoute exact path=\"/" + tableName + "\" component={" + getTableIndex(tableName)
                    + "} auth={!isNil(currentUser)} />");

        }
    }

    private static void generateImportsForTables(ArrayList<String> returnList) {
        for (String tableName : TableParser.tables.keySet()) {
            String tableUpperName = StringUtils.firstLatterToUppercase(tableName);
            returnList.add("import { " + getTableIndex(tableName) + " } from \"./" + tableName + "/Index"
                    + tableUpperName + "\";");
            returnList.add("import { " + getTablePage(tableName) + " } from \"./" + tableName + "/components/Page"
                    + tableUpperName + "\";");
            returnList.add("import { " + getCreateTableComponent(tableName) + " } from \"./" + tableName
                    + "/components/Create" + tableUpperName + "\";");
            returnList.add("import { " + getEditTableComponent(tableName) + " } from \"./" + tableName
                    + "/components/Edit" + tableUpperName + "\";");

        }

    }

    private static String getTablesArrayAsString(HashMap<String, Table> tables) {
        StringBuilder returnString = new StringBuilder("[");
        for (Table table : tables.values()) {
            returnString.append("\"" + table.getTableName() + "\",");
        }
        System.out.println("BBBBBBBBBBBBBBBB");
        returnString.replace(returnString.length() - 1, returnString.length(), "]"); // provjera da li su dobro
        // postavljene granice

        return returnString.toString();
    }

}
