package com.master.codegenerator.springGenerator;

import com.master.codegenerator.generator.TableGenerator;
import com.master.codegenerator.models.Column;
import com.master.codegenerator.models.Table;
import com.master.codegenerator.utils.GeneratorUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Objects;
import java.util.Optional;

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

    private static String getTablePackageName(String databaseName, String tableName) {
        return "com." + databaseName.toLowerCase() + ".api." + tableName.toLowerCase();
    }

    private static String getTableModelName(String tableName) {
        return StringUtils.firstLatterToUppercase(tableName);
    }

    private static String getColumnSpringType(String columnType) {
        return (SpringTypes.sqlToSpringTypesMap.getOrDefault(columnType, "String"));
    }

    private static String getColumnSetterFunctionName(String columnName) {
        return "set" + StringUtils.firstLatterToUppercase(columnName);
    }

    private static String getColumnSetterFunction(String columnName, String columnType, Boolean isClassColumnType) {
        String template = "    public void FUNCTION_NAME(COLUMN_TYPE COLUMN_NAME) {\n" +
                "        this.COLUMN_NAME = COLUMN_NAME;\n" +
                "    }\n";
        return template.replaceAll("FUNCTION_NAME", getColumnSetterFunctionName(columnName))
                .replaceAll("COLUMN_TYPE", isClassColumnType ? columnType : getColumnSpringType(columnType))
                .replaceAll("COLUMN_NAME", columnName);
    }

    private static String getColumnGetterFunctionName(String columnName) {
        return "get" + StringUtils.firstLatterToUppercase(columnName);
    }

    private static String getColumnGetterFunction(String columnName, String columnType, Boolean isClassColumnType) {
        String template = "    public COLUMN_TYPE FUNCTION_NAME() {\n" +
                "        return COLUMN_NAME;\n" +
                "    }\n";
        return template.replaceAll("FUNCTION_NAME", getColumnGetterFunctionName(columnName))
                .replaceAll("COLUMN_TYPE",  isClassColumnType ? columnType :getColumnSpringType(columnType))
                .replaceAll("COLUMN_NAME", columnName);
    }

    private static String getForeignObjectName(Column column) {
        return GeneratorUtils.firstLatterToUppercase(column.getForeignTableName()) + "_"
                + column.getColumnName();
    }

    public static ArrayList<String> replaceSpringConstants(String databaseName, Table table, String codeLineFromFile, HashMap<String, ArrayList<String>> mapOfTableRelationships) {
        String codeLine = codeLineFromFile;


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
        if (codeLine.contains(SpringGeneratorConstant.ALL_SCHEMA_NAME)) {
            codeLine = codeLine.replaceAll(SpringGeneratorConstantRegex.ALL_SCHEMA_NAME,
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
        if (codeLine.contains(SpringGeneratorConstant.AUL_TABLE_NAME)) {
            codeLine = codeLine.replaceAll(SpringGeneratorConstantRegex.AUL_TABLE_NAME,
                    table.getTableName().toUpperCase());
        }
        if (codeLine.contains(SpringGeneratorConstant.ALL_TABLE_NAME)) {
            codeLine = codeLine.replaceAll(SpringGeneratorConstantRegex.ALL_TABLE_NAME,
                    table.getTableName().toLowerCase());
        }


        if (codeLine.contains(SpringGeneratorConstant.PRIMARY_KEY_SPRING_TYPE)) {
            for (Column column : table.getColumns()) {
                if (column.isPrimaryKey()) {
                    System.out.println(column.getColumnType() + "  " + SpringTypes.sqlToSpringTypesMap.get(column.getColumnType()));
                    codeLine = codeLine.replaceAll(SpringGeneratorConstantRegex.PRIMARY_KEY_SPRING_TYPE,
                            SpringTypes.sqlToSpringTypesMap.get(column.getColumnType().trim()));
                }

            }
        }
        if (codeLine.contains(SpringGeneratorConstant.SET_PRIMARY_KEY)) {
            for (Column column : table.getColumns()) {
                if (column.isPrimaryKey()) {
                    codeLine = codeLine.replaceAll(SpringGeneratorConstantRegex.SET_PRIMARY_KEY,
                            getColumnSetterFunctionName(column.getColumnName()));
                }

            }
        }

        if (codeLine.contains(SpringGeneratorConstant.SERVICE_CONSTRUCTOR_PARAMS)) {
            StringBuilder params = new StringBuilder();
            params.append(StringUtils.firstLatterToUppercase(table.getTableName())).append("Repository ")
                    .append(StringUtils.firstLatterToLowercase(table.getTableName())).append("Repository");
            ArrayList<String> foreignTables = new ArrayList<>();
            for (Column column : table.getColumns()) {
                if (column.isForeignKey() && !foreignTables.contains(column.getForeignTableName())) {
                    foreignTables.add(column.getForeignTableName());
                    params.append(", ").append(StringUtils.firstLatterToUppercase(column.getForeignTableName())).append("Repository ")
                            .append(StringUtils.firstLatterToLowercase(column.getForeignTableName())).append("Repository");
                }

            }
            codeLine = codeLine.replaceAll(SpringGeneratorConstantRegex.SERVICE_CONSTRUCTOR_PARAMS,
                    params.toString());
        }

        if (codeLine.contains(SpringGeneratorConstant.SERVICE_CONSTRUCTOR_VALUE_ASSIGMENT)) {
            finalCodeLines.add("this." + StringUtils.firstLatterToLowercase(table.getTableName()) + "Repository = " +
                    StringUtils.firstLatterToLowercase(table.getTableName()) + "Repository;");
            ArrayList<String> foreignTables = new ArrayList<>();
            for (Column column : table.getColumns()) {
                if (column.isForeignKey() && !foreignTables.contains(column.getForeignTableName())) {
                    foreignTables.add(column.getForeignTableName());
                    finalCodeLines.add("this." + StringUtils.firstLatterToLowercase(column.getForeignTableName()) + "Repository = " +
                            StringUtils.firstLatterToLowercase(column.getForeignTableName()) + "Repository;");
                }

            }
            codeLine = "";
//        } else if (codeLine.contains(SpringGeneratorConstant.IMPORT_MODELS_WHICH_REFERENCED_BY_TABLE)) {
//            for (Column column : table.getColumns()) {
//                if (column.isForeignKey()) {
//                    String referencedTableName = StringUtils.firstLatterToUppercase(column.getForeignTableName());
//                    String importString = "import " + getTablePackageName(databaseName, referencedTableName) + "." + referencedTableName + ";";
//                    if (!finalCodeLines.contains(importString)) {
//                        finalCodeLines.add(importString);
//                    }
//                }
//
//            }
//            codeLine = "";
        } else if (codeLine.contains(SpringGeneratorConstant.IMPORT_FOREIGN_REPOSITORIES_AND_MODELS)) {
            for (Column column : table.getColumns()) {
                if (column.isForeignKey()) {
                    String referencedTableName = column.getForeignTableName();
                    String importModelString = "import " + getTablePackageName(databaseName, referencedTableName) + "." + getTableModelName(referencedTableName) + ";";
                    if (!finalCodeLines.contains(importModelString)) {
                        finalCodeLines.add(importModelString);
                    }
                    String importRepositoryString = "import " + getTablePackageName(databaseName, referencedTableName) + "." + getTableModelName(referencedTableName) + "Repository;";
                    if (!finalCodeLines.contains(importRepositoryString)) {
                        finalCodeLines.add(importRepositoryString);
                    }
                }

            }
            codeLine = "";
        } else if (codeLine.contains(SpringGeneratorConstant.IMPORT_FOREIGN_MODELS)) {
            for (Column column : table.getColumns()) {
                if (column.isForeignKey()) {
                    String referencedTableName = column.getForeignTableName();
                    String importModelString = "import " + getTablePackageName(databaseName, referencedTableName) + "." + getTableModelName(referencedTableName) + ";";
                    if (!finalCodeLines.contains(importModelString)) {
                        finalCodeLines.add(importModelString);
                    }
                }

            }
            codeLine = "";
        } else if (codeLine.contains(SpringGeneratorConstant.INSTANCE_FOREIGN_REPOSITORIES)) {
            for (Column column : table.getColumns()) {
                if (column.isForeignKey()) {
                    String referencedTableName = column.getForeignTableName();
                    String importModelString = "private final " + getTableRepository(referencedTableName) + " " + StringUtils.firstLatterToLowercase(referencedTableName) + "Repository;";
                    if (!finalCodeLines.contains(importModelString)) {
                        finalCodeLines.add(importModelString);
                    }
                }

            }
            codeLine = "";
        } else if (codeLine.contains(SpringGeneratorConstant.SERVICE_CREATE_FOREIGN_OBJECTS)) {

            for (Column column : table.getColumns()) {
                String createForeignTablesTemplate = "Optional<FOREIGN_TABLE_MODEL> existingForeignCOLUMN_NAME = FLL_FOREIGN_TABLE_NAMERepository.findById(FLL_CURRENT_TABLE_NAME.COLUMN_GETTER());\n" +
                        "        if (existingForeignCOLUMN_NAME.isPresent()) {\n" +
                        "            FLL_CURRENT_TABLE_NAME.FOREIGN_TABLE_SETTER(existingForeignCOLUMN_NAME.get());\n" +
                        "        } else {\n" +
                        "            FOREIGN_TABLE_MODEL newFUL_FOREIGN_TABLE_NAME = FLL_CURRENT_TABLE_NAME.FOREIGN_TABLE_GETTER();\n" +
                        "            FLL_FOREIGN_TABLE_NAMERepository.save(newFUL_FOREIGN_TABLE_NAME);\n" +
                        "            FLL_CURRENT_TABLE_NAME.FOREIGN_TABLE_SETTER(newFUL_FOREIGN_TABLE_NAME);\n" +
                        "        }";
                if (column.isForeignKey()) {
                    createForeignTablesTemplate = createForeignTablesTemplate.replaceAll("FOREIGN_TABLE_MODEL",
                            getTableModelName(column.getForeignTableName()));

                    createForeignTablesTemplate = createForeignTablesTemplate.replaceAll("COLUMN_NAME",
                            column.getColumnName());

                    createForeignTablesTemplate = createForeignTablesTemplate.replaceAll("COLUMN_GETTER",
                            getColumnGetterFunctionName(column.getColumnName()));

                    createForeignTablesTemplate = createForeignTablesTemplate.replaceAll("FLL_CURRENT_TABLE_NAME",
                            StringUtils.firstLatterToLowercase(table.getTableName()));

                    createForeignTablesTemplate = createForeignTablesTemplate.replaceAll("FLL_FOREIGN_TABLE_NAME",
                            StringUtils.firstLatterToLowercase(column.getForeignTableName()));

                    createForeignTablesTemplate = createForeignTablesTemplate.replaceAll("FUL_FOREIGN_TABLE_NAME",
                            StringUtils.firstLatterToUppercase(column.getForeignTableName()));

                    createForeignTablesTemplate = createForeignTablesTemplate.replaceAll("TABLE_NAME",
                            column.getForeignTableName());

                    createForeignTablesTemplate = createForeignTablesTemplate.replaceAll("FOREIGN_TABLE_SETTER",
                            getColumnSetterFunctionName(getForeignObjectName(column)));

                    createForeignTablesTemplate = createForeignTablesTemplate.replaceAll("FOREIGN_TABLE_GETTER",
                            getColumnGetterFunctionName(getForeignObjectName(column)));

                    finalCodeLines.add(createForeignTablesTemplate);

                }
            }
            codeLine = "";
        } else if (codeLine.contains(SpringGeneratorConstant.ADD_AUDIT_CLASS_DECORATOR)) {
            finalCodeLines.add("@EntityListeners(AuditingEntityListener.class)");
            codeLine = "";
        } else if (codeLine.contains(SpringGeneratorConstant.MODEL_AUDIT_ATTRIBUTES)) {
            finalCodeLines.add("@CreatedDate\n" +
                    "    @Column(\n" +
                    "            nullable = false,\n" +
                    "            updatable = false\n" +
                    "    )\n" +
                    "    private LocalDateTime createDate;\n" +
                    "\n" +
                    "    @LastModifiedDate\n" +
                    "    @Column(insertable = false)\n" +
                    "    private LocalDateTime lastModified;\n" +
                    "\n" +
                    "\n" +
                    "    @CreatedBy\n" +
                    "    @Column(\n" +
                    "            nullable = false,\n" +
                    "            updatable = false\n" +
                    "    )\n" +
                    "    private String createdBy;\n" +
                    "\n" +
                    "    @LastModifiedBy\n" +
                    "    @Column(insertable = false)\n" +
                    "    private String lastModifiedBy;");
            codeLine = "";
        } else if (codeLine.contains(SpringGeneratorConstant.MODEL_AUDIT_SETTERS_AND_GETTERS)) {
            finalCodeLines.add("public LocalDateTime getCreateDate() {\n" +
                    "        return createDate;\n" +
                    "    }\n" +
                    "\n" +
                    "    public void setCreateDate(LocalDateTime createDate) {\n" +
                    "        this.createDate = createDate;\n" +
                    "    }\n" +
                    "\n" +
                    "    public LocalDateTime getLastModified() {\n" +
                    "        return lastModified;\n" +
                    "    }\n" +
                    "\n" +
                    "    public void setLastModified(LocalDateTime lastModified) {\n" +
                    "        this.lastModified = lastModified;\n" +
                    "    }\n" +
                    "\n" +
                    "    public String getCreatedBy() {\n" +
                    "        return createdBy;\n" +
                    "    }\n" +
                    "\n" +
                    "    public void setCreatedBy(String createdBy) {\n" +
                    "        this.createdBy = createdBy;\n" +
                    "    }\n" +
                    "\n" +
                    "    public String getLastModifiedBy() {\n" +
                    "        return lastModifiedBy;\n" +
                    "    }\n" +
                    "\n" +
                    "    public void setLastModifiedBy(String lastModifiedBy) {\n" +
                    "        this.lastModifiedBy = lastModifiedBy;\n" +
                    "    }\n");
            codeLine = "";
        } else if (codeLine.contains(SpringGeneratorConstant.MODEL_SETTERS_AND_GETTERS)) {
            for (Column column : table.getColumns()) {
                finalCodeLines.add(getColumnSetterFunction(column.getColumnName(), column.getColumnType(), false));
                finalCodeLines.add(getColumnGetterFunction(column.getColumnName(), column.getColumnType(), false));
                if (column.isForeignKey()) {
                    System.out.println("SPECIAL <<<<<<<<<<<<<<<<<<"+ getForeignObjectName(column)+ ">>>>......" +column.getForeignTableName() +" ..... "+getTableModelName(column.getForeignTableName()));
                    finalCodeLines.add(getColumnSetterFunction(getForeignObjectName(column), getTableModelName(column.getForeignTableName()), true));
                    finalCodeLines.add(getColumnGetterFunction(getForeignObjectName(column), getTableModelName(column.getForeignTableName()), true));
                }
            }
            codeLine = "";
        } else if (codeLine.contains(SpringGeneratorConstant.MODEL_ATTRIBUTES)) {
            for (Column column : table.getColumns()) {
                if (column.isForeignKey()) continue; //TODO provjeriti da li je okej
                if (column.isPrimaryKey()) finalCodeLines.add("@Id");
                if (column.isAutoIncrement()) finalCodeLines.add("@GeneratedValue(strategy=GenerationType.AUTO)");
                if (!column.isNullable()) finalCodeLines.add("@NotNull");
                if (Objects.equals(column.getColumnType(), "TIMESTAMP"))
                    finalCodeLines.add("@Temporal(TemporalType.TIMESTAMP)"); //TODO zasto je ovo ranije postavljeno

                String uniqueConstraint = column.isUnique()? ", unique = true" : "";
                finalCodeLines.add("@Column(name=\"" + column.getColumnName() +"\""+uniqueConstraint+")");
                String classAttribute = "private " + getColumnSpringType(column.getColumnType()) + " " + column.getColumnName() + ";";
                finalCodeLines.add(classAttribute);
                finalCodeLines.add(" ");
            }
            codeLine = "";
        } else if (codeLine.contains(SpringGeneratorConstant.MODEL_FOREIGN_ATTRIBUTES)) {
            for (Column column : table.getColumns()) {
                if (!column.isForeignKey()) continue; //TODO provjeriti da li je okej
                if (!column.isNullable()) finalCodeLines.add("@NotNull");

                finalCodeLines.add("@Column(name=\"" + column.getColumnName() + "\")");
                String classAttribute = "private " + getColumnSpringType(column.getColumnType()) + " " + column.getColumnName() + ";";
                finalCodeLines.add(classAttribute);
                finalCodeLines.add(" ");

                finalCodeLines.add("@ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.ALL})");
                finalCodeLines.add("@JoinColumn(name = \"" + column.getForeignColumnName() + "\", insertable = false, updatable = false)");
                String foreignAttribute = "private " + StringUtils.firstLatterToUppercase(column.getForeignTableName()) + " " + getForeignObjectName(column) + ";";
                finalCodeLines.add(foreignAttribute);
                finalCodeLines.add(" ");
            }
            codeLine = "";
        }


        //odavde daljjjjeeeee


//        else if (codeLine.contains(SpringGeneratorConstant.FOREIGN_KEYS_TO_ATTRIBUTES)) {
//            for (Column column : table.getColumns()) {
//                if (column.isForeignKey()) {
//                    finalCodeLines.add("@ManyToOne(fetch=FetchType.EAGER,cascade = {CascadeType.ALL})");
//                    finalCodeLines.add("@JoinColumn(name=\"" + column.getColumnName() + "\",insertable=false, updatable=false)");
//                    finalCodeLines.add("@JsonBackReference");
//
//                    String classAttribute = "private " + StringUtils.firstLatterToUppercase(column.getForeignTableName()) + " " + StringUtils.firstLatterToLowercase(column.getForeignTableName()) + ";";
//                    finalCodeLines.add(classAttribute);
//                    finalCodeLines.add(" ");
//                }
//            }
//            codeLine = "";
//        }
//        else if (codeLine.contains(SpringGeneratorConstant.MODELS_WHICH_REFERENCE_TABLE_TO_ATTRIBUTES)) {
//            ArrayList<String> tempList = TableGenerator.mapOfTableRelationships.get(table.getTableName());
//            if (tempList != null && !tempList.isEmpty()) {
//
//                for (String tableName : tempList) {
//                    finalCodeLines.add("@OneToMany(mappedBy=\"" + table.getTableName() + "\",fetch=FetchType.EAGER)");
//                    String classAttribute = "private List<" + StringUtils.firstLatterToUppercase(tableName) + "> " + StringUtils.firstLatterToLowercase(tableName) + "_;";
//                    finalCodeLines.add(classAttribute);
//                    finalCodeLines.add(" ");
//                }
//            }
//            codeLine = "";
//        } else if (codeLine.contains(SpringGeneratorConstant.FOREIGN_OBJECTS_SETTERS_AND_GETTERS)) {
//            for (Column column : table.getColumns()) {
//                if (column.isForeignKey()) {
//                    String attributeType = StringUtils.firstLatterToUppercase(column.getForeignTableName());
//                    String attribute = StringUtils.firstLatterToLowercase(column.getForeignTableName());
//                    finalCodeLines.add(generateAttributeSetter(attribute, attributeType));
//                    finalCodeLines.add(generateAttributeGetter(attribute, attributeType));
//                }
//            }
//            codeLine = "";
//        } else if (codeLine.contains(SpringGeneratorConstant.MODELS_WHICH_REFERENCE_TABLE_SETTERS_AND_GETTERS)) {
//            ArrayList<String> tempList = TableGenerator.mapOfTableRelationships.get(table.getTableName());
//            if (tempList != null && !tempList.isEmpty()) {
//                for (String tableName : tempList) {
//                    String attributeType = "List<" + StringUtils.firstLatterToUppercase(tableName) + ">";
//                    String attribute = StringUtils.firstLatterToLowercase(tableName) + "_";
//                    finalCodeLines.add(generateAttributeSetter(attribute, attributeType));
//                    finalCodeLines.add(generateAttributeGetter(attribute, attributeType));
//                }
//            }
//            codeLine = "";
//        }
        if (finalCodeLines.isEmpty())
            finalCodeLines.add(codeLine);
        return finalCodeLines;
    }


//    private static String generateAttributeSetter(String attribute, String attributeType) {
//        return "public void set" + StringUtils.firstLatterToUppercase(attribute) + "(" + attributeType + " " + attribute + ") {\n" +
//                "\t\tthis." + attribute + " = " + attribute + ";\n" +
//                "\t}";
//    }
//
//    private static String generateAttributeGetter(String attribute, String attributeType) {
//        return "public " + attributeType + "  get" + StringUtils.firstLatterToUppercase(attribute) + "() {\n" +
//                "\t\treturn " + attribute + ";\n" +
//                "\t}";
//    }

    public static ArrayList<String> replaceSchemaConstants(String codeLine, String databaseName, HashMap<String, Table> tables) {
        ArrayList<String> returnList = new ArrayList<String>();

        if (codeLine.contains(SpringGeneratorConstant.SPRING_PROJECT_NAME)) {
            codeLine = codeLine.replaceAll(SpringGeneratorConstantRegex.SPRING_PROJECT_NAME,
                    GeneratorUtils.getSpringProjectName(databaseName));
        }
        if (codeLine.contains(SpringGeneratorConstant.ALL_SCHEMA_NAME)) {
            codeLine = codeLine.replaceAll(SpringGeneratorConstantRegex.ALL_SCHEMA_NAME,
                    databaseName.toLowerCase());
        }
        if (codeLine.contains(SpringGeneratorConstant.SCHEMA_PERMISSIONS)) {
            for (Table table : tables.values()) {
                returnList.add(table.getTableName().toUpperCase() + "_READ,");
                returnList.add(table.getTableName().toUpperCase() + "_CREATE,");
                returnList.add(table.getTableName().toUpperCase() + "_UPDATE,");
                returnList.add(table.getTableName().toUpperCase() + "_DELETE,");
            }
        }

        if (returnList.isEmpty())
            returnList.add(codeLine);
        return returnList;

    }


}
