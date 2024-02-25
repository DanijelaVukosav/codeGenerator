package com.master.codegenerator.springGenerator;

import com.master.codegenerator.generator.TableGenerator;
import com.master.codegenerator.models.Column;
import com.master.codegenerator.models.Table;

import java.util.ArrayList;

public class ReplaceSpringConstants {

    public ReplaceSpringConstants() {
        // TODO Auto-generated constructor stub
    }

    private static String getTableService(String tableName) {
        return StringUtils.firstLatterToUppercase(tableName) + "Service";
    }

    private static String getTableController(String tableName) {
        return StringUtils.firstLatterToUppercase(tableName) + "Controller";
    }

    private static String getTableRepository(String tableName) {
        return StringUtils.firstLatterToUppercase(tableName) + "Repository";
    }

    private static String getTableModel(String tableName) {
        return StringUtils.firstLatterToUppercase(tableName);
    }

    public static ArrayList<String> replaceSpringConstants(String databaseName, Table table, String codeLineFromFile) {
        String codeLine = new String(codeLineFromFile);


        ArrayList<String> finalCodeLines = new ArrayList<String>();

        if (codeLine == null || codeLine.isEmpty()) return finalCodeLines;


        if (codeLine.contains(SpringGeneratorConstant.DATABASE_NAME)) {
            codeLine = codeLine.replaceAll(SpringGeneratorConstantRegex.DATABASE_NAME,
                    databaseName);
        }
        if (codeLine.contains(SpringGeneratorConstant.FLL_DATABASE_NAME)) {
            codeLine = codeLine.replaceAll(SpringGeneratorConstantRegex.FLL_DATABASE_NAME,
                    StringUtils.firstLatterToLowercase(databaseName));
        }
        if (codeLine.contains(SpringGeneratorConstant.FUL_DATABASE_NAME)) {
            codeLine = codeLine.replaceAll(SpringGeneratorConstantRegex.FUL_DATABASE_NAME,
                    StringUtils.firstLatterToUppercase(databaseName));
        }
        if (codeLine.contains(SpringGeneratorConstant.ALL_DATABASE_NAME)) {
            codeLine = codeLine.replaceAll(SpringGeneratorConstantRegex.ALL_DATABASE_NAME,
                    databaseName.toLowerCase());
        }
        if (codeLine.contains(SpringGeneratorConstant.TABLE_NAME)) {
            codeLine = codeLine.replaceAll(SpringGeneratorConstantRegex.TABLE_NAME,
                    table.getTableName());
        }
        if (codeLine.contains(SpringGeneratorConstant.FLL_TABLE_NAME)) {
            codeLine = codeLine.replaceAll(SpringGeneratorConstantRegex.FLL_TABLE_NAME,
                    StringUtils.firstLatterToLowercase(table.getTableName()));
        }
        if (codeLine.contains(SpringGeneratorConstant.FUL_TABLE_NAME)) {
            codeLine = codeLine.replaceAll(SpringGeneratorConstantRegex.FUL_TABLE_NAME,
                    StringUtils.firstLatterToUppercase(table.getTableName()));
        }
        if (codeLine.contains(SpringGeneratorConstant.ALL_TABLE_NAME)) {
            codeLine = codeLine.replaceAll(SpringGeneratorConstantRegex.ALL_TABLE_NAME,
                    table.getTableName().toLowerCase());
        }


        if (codeLine.contains(SpringGeneratorConstant.PRIMARY_KEY_SPRING_TYPE)) {
            for (Column column : table.getColumns()) {
                if (column.isPrimaryKey()) {
                    System.out.println(column.getColumnType()+ "  "+ SpringTypes.sqlToSpringTypesMap.get(column.getColumnType()));
                    codeLine = codeLine.replaceAll(SpringGeneratorConstantRegex.PRIMARY_KEY_SPRING_TYPE,
                            SpringTypes.sqlToSpringTypesMap.get(column.getColumnType().trim()));
                }

            }
        }

        if (codeLine.contains(SpringGeneratorConstant.IMPORT_MODELS_WHICH_REFERENCED_BY_TABLE)) {
            for (Column column : table.getColumns()) {
                if (column.isForeignKey()) {
                    String referencedTableName = StringUtils.firstLatterToUppercase(column.getForeignTableName());
                    String importString = "import " + getTablePackageName(databaseName, referencedTableName) + "." + referencedTableName + ";";
                    if (!finalCodeLines.contains(importString)) {
                        finalCodeLines.add(importString);
                    }
                }

            }
            codeLine = "";
        } else if (codeLine.contains(SpringGeneratorConstant.IMPORT_MODELS_WHICH_REFERENCE_TABLE)) {
            ArrayList<String> tempList = TableGenerator.mapOfTableRelationships.get(table.getTableName());
            if (tempList != null && !tempList.isEmpty()) {

                for (String tableName : tempList) {
                    finalCodeLines.add("import " + getTablePackageName(databaseName, tableName) + "." + StringUtils.firstLatterToUppercase(tableName) + ";");
                }
            }
            codeLine = "";
        }
        //odavde daljjjjeeeee


        else if (codeLine.contains(SpringGeneratorConstant.COLUMNS_TO_ATTRIBUTES)) {
            for (Column column : table.getColumns()) {
                if (column.isPrimaryKey()) finalCodeLines.add("@Id");
                if (column.isAutoIncrement()) finalCodeLines.add("@GeneratedValue(strategy=GenerationType.AUTO)");
                if (column.getColumnType() == "TIMESTAMP") finalCodeLines.add("@Temporal(TemporalType.TIMESTAMP)");

                finalCodeLines.add("@Column(name=\"" + column.getColumnName() + "\")");
                String classAttribute = "private " + (SpringTypes.sqlToSpringTypesMap.containsKey(column.getColumnType()) ? SpringTypes.sqlToSpringTypesMap.get(column.getColumnType()) : "String") + " " + column.getColumnName() + ";";
                finalCodeLines.add(classAttribute);
                finalCodeLines.add(" ");
            }
            codeLine = "";
        } else if (codeLine.contains(SpringGeneratorConstant.FOREIGN_KEYS_TO_ATTRIBUTES)) {
            for (Column column : table.getColumns()) {
                if (column.isForeignKey()) {
                    finalCodeLines.add("@ManyToOne(fetch=FetchType.EAGER,cascade = {CascadeType.ALL})");
                    finalCodeLines.add("@JoinColumn(name=\"" + column.getColumnName() + "\",insertable=false, updatable=false)");
                    finalCodeLines.add("@JsonBackReference");

                    String classAttribute = "private " + StringUtils.firstLatterToUppercase(column.getForeignTableName()) + " " + StringUtils.firstLatterToLowercase(column.getForeignTableName()) + ";";
                    finalCodeLines.add(classAttribute);
                    finalCodeLines.add(" ");
                }
            }
            codeLine = "";
        } else if (codeLine.contains(SpringGeneratorConstant.MODELS_WHICH_REFERENCE_TABLE_TO_ATTRIBUTES)) {
            ArrayList<String> tempList = TableGenerator.mapOfTableRelationships.get(table.getTableName());
            if (tempList != null && !tempList.isEmpty()) {

                for (String tableName : tempList) {
                    finalCodeLines.add("@OneToMany(mappedBy=\"" + table.getTableName() + "\",fetch=FetchType.EAGER)");
                    String classAttribute = "private List<" + StringUtils.firstLatterToUppercase(tableName) + "> " + StringUtils.firstLatterToLowercase(tableName) + "_;";
                    finalCodeLines.add(classAttribute);
                    finalCodeLines.add(" ");
                }
            }
            codeLine = "";
        } else if (codeLine.contains(SpringGeneratorConstant.MODEL_SETTERS_AND_GETTERS)) {
            for (Column column : table.getColumns()) {
                String attributeType = SpringTypes.sqlToSpringTypesMap.containsKey(column.getColumnType()) ? SpringTypes.sqlToSpringTypesMap.get(column.getColumnType()) : "String";
                String attribute = column.getColumnName();
                finalCodeLines.add(generateAttributeSetter(attribute, attributeType));
                finalCodeLines.add(generateAttributeGetter(attribute, attributeType));
            }
            codeLine = "";
        } else if (codeLine.contains(SpringGeneratorConstant.FOREIGN_OBJECTS_SETTERS_AND_GETTERS)) {
            for (Column column : table.getColumns()) {
                if (column.isForeignKey()) {
                    String attributeType = StringUtils.firstLatterToUppercase(column.getForeignTableName());
                    String attribute = StringUtils.firstLatterToLowercase(column.getForeignTableName());
                    finalCodeLines.add(generateAttributeSetter(attribute, attributeType));
                    finalCodeLines.add(generateAttributeGetter(attribute, attributeType));
                }
            }
            codeLine = "";
        } else if (codeLine.contains(SpringGeneratorConstant.MODELS_WHICH_REFERENCE_TABLE_SETTERS_AND_GETTERS)) {
            ArrayList<String> tempList = TableGenerator.mapOfTableRelationships.get(table.getTableName());
            if (tempList != null && !tempList.isEmpty()) {
                for (String tableName : tempList) {
                    String attributeType = "List<" + StringUtils.firstLatterToUppercase(tableName) + ">";
                    String attribute = StringUtils.firstLatterToLowercase(tableName) + "_";
                    finalCodeLines.add(generateAttributeSetter(attribute, attributeType));
                    finalCodeLines.add(generateAttributeGetter(attribute, attributeType));
                }
            }
            codeLine = "";
        }
        if (finalCodeLines.isEmpty())
            finalCodeLines.add(codeLine);
        return finalCodeLines;
    }

    private static String getTablePackageName(String databaseName, String tableName) {
        return "com." + databaseName.toLowerCase() + "." + tableName.toLowerCase();
    }

    private static String generateAttributeSetter(String attribute, String attributeType) {
        return "public void set" + StringUtils.firstLatterToUppercase(attribute) + "(" + attributeType + " " + attribute + ") {\n" +
                "\t\tthis." + attribute + " = " + attribute + ";\n" +
                "\t}";
    }

    private static String generateAttributeGetter(String attribute, String attributeType) {
        return "public " + attributeType + "  get" + StringUtils.firstLatterToUppercase(attribute) + "() {\n" +
                "\t\treturn " + attribute + ";\n" +
                "\t}";
    }


}
