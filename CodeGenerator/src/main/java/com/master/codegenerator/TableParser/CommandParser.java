package com.master.codegenerator.TableParser;

import com.master.codegenerator.models.Column;
import com.master.codegenerator.models.Table;

import java.util.*;
import java.util.stream.Collectors;

import static com.master.codegenerator.models.SQLCommand.*;

public class CommandParser {

    private static void parseCommand_CreateTable(String command, HashMap<String, Table> tables, HashMap<String, ArrayList<String>> mapOfTableRelationships) {
        Table table = new Table();

        String[] commandWords = command.split(UtilConstants.WORD_SEPARATOR);
        String tableName = removeSpecialCharactersAndQuotation(commandWords[2].replace("(", ""));
        table.setTableName(tableName);
        System.out.println("BBB "+ command);

        String columns = command.substring(command.indexOf("(") + 1, command.lastIndexOf(")"));

        String[] columnsArray = columns.split(TableParser.commandLineSeparator);

        for (String columnString : columnsArray) {
            try {

                if (Objects.equals(columnString.trim(), "")) {
                    continue;
                }
                String columnUpperCase = removeSpecialCharacters(columnString.toUpperCase()).trim();

                System.out.println("AAAAA " + columnString + " >>>" + columnString.indexOf("(") + 1 + " <<" + columnString.indexOf(")"));

                String substring = columnString.contains("(") ? columnString.substring(columnString.indexOf("(") + 1, columnString.indexOf(")")) : columnString;

                if (columnUpperCase.startsWith(UtilConstants.INDEX_KEY)) {
                    //TODO: implement column index
                    continue;
                } else if (columnUpperCase.startsWith(UtilConstants.PRIMARY_KEY) || (columnUpperCase.startsWith(UtilConstants.CONSTRAINT) && columnUpperCase.contains(UtilConstants.PRIMARY_KEY))) {
                    String[] primaryKeyColumns = substring.split(",");

                    for (String primaryKey : primaryKeyColumns) {
                        table.getColumn(removeSpecialCharactersAndQuotation(primaryKey)).setPrimaryKey(true);
                    }
                } else if (columnUpperCase.startsWith(UtilConstants.FOREIGN_KEY) || (columnUpperCase.startsWith(UtilConstants.CONSTRAINT) && columnUpperCase.contains(UtilConstants.FOREIGN_KEY))) {
                    Column foreignColumn = table.getColumn(substring);
                    foreignColumn.setForeignKey(true);
                    foreignColumn.setVisibleOnSinglePage(false);
                    foreignColumn.setVisible(false);
                    int indexOfReferences = columnString.toUpperCase().indexOf(UtilConstants.REFERENCES);
                    if (indexOfReferences >= 0) {
                        String referenceSubstring = columnString.substring(indexOfReferences);
                        String foreignTableName = referenceSubstring.split("\\(")[0].replace(UtilConstants.REFERENCES, "").trim();
                        String referencedColumnName = referenceSubstring.substring(referenceSubstring.indexOf("(") + 1, referenceSubstring.indexOf(")")).trim();
                        foreignColumn.setForeignTableName(foreignTableName);
                        foreignColumn.setForeignColumnName(referencedColumnName);

                        if (mapOfTableRelationships.containsKey(foreignTableName)) {
                            mapOfTableRelationships.get(foreignTableName).add(tableName);
                        } else {
                            ArrayList<String> newList = new ArrayList<String>();
                            newList.add(tableName);
                            mapOfTableRelationships.put(foreignTableName, newList);
                        }

                    }
                } else if (!columnUpperCase.startsWith(UtilConstants.PRIMARY_KEY) && !columnUpperCase.startsWith(UtilConstants.FOREIGN_KEY) && !columnUpperCase.startsWith(UtilConstants.CONSTRAINT)) {

                    Column column = generateNewColumn(table, tableName, columnString, false, mapOfTableRelationships);
                    table.addColumn(column);
                }
            }
            catch (Exception ex)
            {
                ex.printStackTrace();
            }
        }
        tables.put(tableName, table);
    }

    private static void parseCommand_AlterTable(String command, HashMap<String, Table> tables, HashMap<String, ArrayList<String>> mapOfTableRelationships) {
        String[] commandWords = command.split(UtilConstants.WORD_SEPARATOR);

        if (commandWords.length < 6)
            return;

        String tableName = removeSpecialCharactersAndQuotation(commandWords[2]);
        Table table = tables.get(tableName);

        if (table == null)
            return;

        String mainCommand = commandWords[3];
        if (command.contains(UtilConstants.ADD_COLUMN)) {
            Column newColumn = generateNewColumn(table, tableName, command.substring(command.indexOf(UtilConstants.ADD_COLUMN) + 10).trim(), false, mapOfTableRelationships);
            table.addColumn(newColumn);
        } else if (command.contains(UtilConstants.ADD)) {
            Column newColumn = generateNewColumn(table, tableName, command.substring(command.indexOf(UtilConstants.ADD) + 3).trim(), false, mapOfTableRelationships);
            table.addColumn(newColumn);
        } else if (command.contains(UtilConstants.MODIFY)) {
            //TODO: check command parse logic
            Column newColumn = generateNewColumn(table, tableName, command.substring(command.indexOf(UtilConstants.MODIFY) + 6).trim(), true, mapOfTableRelationships);
            table.addColumn(newColumn);
        } else if (command.contains(UtilConstants.MODIFY_COLUMN)) {
            //TODO: check command parse logic
            Column newColumn = generateNewColumn(table, tableName, command.substring(command.indexOf(UtilConstants.MODIFY_COLUMN) + 13).trim(), true, mapOfTableRelationships);
            table.addColumn(newColumn);
        }
    }

    public static void parseCommand_CreateDateBase(String command, StringBuilder databaseName) {
        String[] splitCommand = command.split(" ");
        if (splitCommand.length >= 3) return;

        databaseName.append(splitCommand[2].split(";")[0]);
    }


    public static void parseCommand(String command, HashMap<String, Table> tables, HashMap<String, ArrayList<String>> mapOfTableRelationships, StringBuilder databaseName) {
        String commandUpperCase = command.toUpperCase();

        if (commandUpperCase.startsWith(CREATE_TABLE)) {
            parseCommand_CreateTable(command, tables, mapOfTableRelationships);
        } else if (commandUpperCase.startsWith(ALTER_TABLE)) {
            parseCommand_AlterTable(command, tables, mapOfTableRelationships);
        } else if (commandUpperCase.startsWith(DROP_TABLE)) {
            //TODO: parse drop table command
        } else if (commandUpperCase.startsWith(CREATE_DATABASE) || commandUpperCase.startsWith(CREATE_SCHEMA)) {
            parseCommand_CreateDateBase(command, databaseName);
        }

    }

    private static String removeSpecialCharactersAndQuotation(String string) {
        return string.replaceAll("\"", "")
                .replaceAll("'", "")
                .replaceAll("`", "")
                .replaceAll("\t", "")
                .replaceAll("\n", "")
                .replaceAll("\f", "")
                .replaceAll("\b", "");
    }

    private static String removeSpecialCharacters(String string) {
        return string.replaceAll("\t", "")
                .replaceAll("\n", "")
                .replaceAll("\f", "")
                .replaceAll("\b", "");
    }

    private static Column generateNewColumn(Table table, String tableName, String columnString, boolean isModify, HashMap<String, ArrayList<String>> mapOfTableRelationships) {
        String columnUpperCase = removeSpecialCharacters(columnString.toUpperCase()).trim();
        String[] columnWords = Arrays.stream(columnString.trim().split(UtilConstants.WORD_SEPARATOR))
                .filter(s -> s != null && !s.isEmpty())
                .toArray(String[]::new);

//        List<String> filteredWords = columnWords;



        Column column = table.getColumn(removeSpecialCharactersAndQuotation(columnWords[0].trim()));

        if (isModify && column.getColumnName() == null)
            return column;


        column.setColumnName(removeSpecialCharactersAndQuotation(columnWords[0]));
        column.setTableName(removeSpecialCharactersAndQuotation(tableName));

        String columnType = columnWords[1].trim();
        if (columnType.toUpperCase().startsWith(UtilConstants.TYPE_CHAR) || columnType.toUpperCase().startsWith(UtilConstants.TYPE_VARCHAR)
                || columnType.toUpperCase().startsWith(UtilConstants.TYPE_NVARCHAR) || columnType.toUpperCase().startsWith(UtilConstants.TYPE_NCHAR) ) {
            column.setColumnType(UtilConstants.TYPE_VARCHAR);
            column.setColumnSize(Integer.parseInt(columnType.substring(columnType.indexOf("(") + 1, columnType.indexOf(")"))));
        } else if (columnType.toUpperCase().startsWith(UtilConstants.TYPE_NATIONAL)) {
            column.setColumnType(UtilConstants.TYPE_VARCHAR);
            if((columnType.toUpperCase().startsWith(UtilConstants.TYPE_VARCHAR) || columnType.toUpperCase().startsWith(UtilConstants.TYPE_CHAR)) && columnWords[2].contains("(")) {
                column.setColumnSize(Integer.parseInt(columnWords[2].substring(columnType.indexOf("(") + 1, columnType.indexOf(")"))));
            }
        } else if (columnType.toUpperCase().startsWith(UtilConstants.ENUM_TYPE)) {
            column.setColumnType(UtilConstants.ENUM_TYPE);
            column.setEnumTypeValues(parseEnumValues(columnString));
        } else {
            column.setColumnType(columnType);
        }

        column.setNullable(!columnUpperCase.contains(UtilConstants.NOT_NULL));

        column.setAutoIncrement(columnUpperCase.contains(UtilConstants.AUTO_INCREMENT));

        if (columnUpperCase.contains(UtilConstants.UNIQUE))
            column.setUnique(true);

        if (columnUpperCase.contains(UtilConstants.PRIMARY_KEY))
            column.setPrimaryKey(true);

        if (columnUpperCase.contains(UtilConstants.FOREIGN_KEY)) {
            column.setForeignKey(true);
            column.setVisible(false);
            column.setVisibleOnSinglePage(false);

            for (int i = 0; i < columnWords.length; i++) {
                if (columnWords[i].equals(UtilConstants.REFERENCES) && i < (columnWords.length - 1)) {
                    String foreignTable = columnWords[i + 1];
                    String foreignTableName = foreignTable.split("\\(")[0].trim();
                    column.setForeignTableName(foreignTableName);
                    if (mapOfTableRelationships.containsKey(foreignTableName)) {
                        mapOfTableRelationships.get(foreignTableName).add(tableName);
                    } else {
                        ArrayList<String> newList = new ArrayList<String>();
                        newList.add(tableName);
                        mapOfTableRelationships.put(foreignTableName, newList);
                    }
                }
            }
        }
        return column;
    }

    private static ArrayList<String> parseEnumValues(String input) {
        ArrayList<String> values = new ArrayList<>();

        int enumIndex = input.indexOf(UtilConstants.ENUM_TYPE);

        if (enumIndex != -1) {
            int start = input.indexOf('(', enumIndex);
            int end = input.indexOf(')', start);

            if (start != -1 && end != -1) {
                String enumValues = input.substring(start + 1, end);
                String[] splitValues = enumValues.split(",");

                for (String value : splitValues) {
                    values.add(value.trim().replace("'", ""));
                }
            }
        }

        return values;
    }

}
