package com.master.codegenerator.TableParser;

import com.master.codegenerator.models.Column;
import com.master.codegenerator.models.Table;

import java.util.ArrayList;
import java.util.HashMap;

import static com.master.codegenerator.models.SQLCommand.*;

public class CommandParser {


    private static Table parseCommand_CreateTable(String command, HashMap<String, Table> tables, HashMap<String, ArrayList<String>> mapOfTableRelationships) {
        Table table = new Table();

        String[] commandWords = command.split(UtilConstants.WORD_SEPARATOR);
        String tableName = removeSpecialCharactersAndQuotation(commandWords[2].replace("(", ""));
        table.setTableName(tableName);

        System.out.println("Table name: " + tableName);

        String columns = command.substring(command.indexOf("(") + 1, command.lastIndexOf(")"));

        String[] columnsArray = columns.split(",");

        for (String columnString : columnsArray) {
            System.out.println("Column string: " + columnString);

            String columnUpperCase = removeSpecialCharacters(columnString.toUpperCase()).trim();

            System.out.println("Column : " + columnUpperCase + "   ->      " + UtilConstants.PRIMARY_KEY);

            if (columnUpperCase.startsWith(UtilConstants.PRIMARY_KEY) || (columnUpperCase.startsWith(UtilConstants.CONSTRAINT) && columnUpperCase.contains(UtilConstants.PRIMARY_KEY))) {
                System.out.println("Starts");
                String substring = columnString.substring(columnString.indexOf("(") + 1, columnString.indexOf(")"));
                String[] primaryKeyColumns = substring.split(",");

                for (String primaryKey : primaryKeyColumns) {
                    System.out.println(primaryKey);
                    table.getColumn(removeSpecialCharactersAndQuotation(primaryKey)).setPrimaryKey(true);
                }
            } else if (columnUpperCase.startsWith(UtilConstants.FOREIGN_KEY) || (columnUpperCase.startsWith(UtilConstants.CONSTRAINT) && columnUpperCase.contains(UtilConstants.FOREIGN_KEY))) {
                String substring = columnString.substring(columnString.indexOf("(") + 1, columnString.indexOf(")"));
                String columnName = substring;
                Column foreignColumn = table.getColumn(columnName);
                foreignColumn.setForеignKey(true);
                int indexOfReferences = columnString.toUpperCase().indexOf(UtilConstants.REFERENCES);
                if (indexOfReferences >= 0) {

                    String foreignTableName = columnString.substring(indexOfReferences).split("\\(")[0].replace(UtilConstants.REFERENCES, "").trim();
                    foreignColumn.setForeignTableName(foreignTableName);
//                    if (TableParser.mapOfTableRelationships.containsKey(foreignTableName)) {
//                        TableParser.mapOfTableRelationships.get(foreignTableName).add(tableName);
//                    } else {
//                        ArrayList<String> newList = new ArrayList<String>();
//                        newList.add(tableName);
//                        TableParser.mapOfTableRelationships.put(foreignTableName, newList);
//                    }
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


        //TableParser.tables.put(tableName, table);
        tables.put(tableName, table);
        return table;
    }

    private static void parseCommand_AlterTable(String command, HashMap<String, Table> tables, HashMap<String, ArrayList<String>> mapOfTableRelationships) {

        String[] commandWords = command.split(UtilConstants.WORD_SEPARATOR);

        if (commandWords.length < 6)
            return;

        String tableName = removeSpecialCharactersAndQuotation(commandWords[2]);

//        Table table = TableParser.tables.get(tableName);
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
            Column newColumn = generateNewColumn(table, tableName, command.substring(command.indexOf(UtilConstants.MODIFY) + 6).trim(), true, mapOfTableRelationships);
//            table.addColumn(newColumn);
        } else if (command.contains(UtilConstants.MODIFY_COLUMN)) {
            Column newColumn = generateNewColumn(table, tableName, command.substring(command.indexOf(UtilConstants.MODIFY_COLUMN) + 13).trim(), true, mapOfTableRelationships);
//            table.addColumn(newColumn);
        }
//        else if(command.contains(UtilConstants.DROP_COLUMN))
//        {
//            String columnName = commandWords[commandWords.length -1];
//            if(columnName.equals(UtilConstants.COLUMN))
//                return;
//
//            table.removeColumn(columnName);
//        }
    }

    public static void parseCommand_CreateDateBase(String command,StringBuilder databaseName) {
        String[] splitedCommand = command.split(" ");
        if (splitedCommand.length >= 3) return;
        databaseName.append(splitedCommand[2].split(";")[0]);
//        TableParser.databaseSchemaName = splitedCommand[2].split(";")[0];
//        TableFileGenerator.databaseName = splitedCommand[2].split(";")[0];
    }


    public static void parseCommand(String command, HashMap<String, Table> tables, HashMap<String, ArrayList<String>> mapOfTableRelationships, StringBuilder databaseName) {
        String commandUpperCase = command.toUpperCase();

        if (commandUpperCase.startsWith(CREATE_TABLE)) {
            parseCommand_CreateTable(command, tables, mapOfTableRelationships);
        } else if (commandUpperCase.startsWith(ALTER_TABLE)) {
            parseCommand_AlterTable(command, tables, mapOfTableRelationships);
        } else if (commandUpperCase.startsWith(DROP_TABLE)) {
            System.out.println("Drop");
        } else if (commandUpperCase.startsWith(CREATE_DATABASE) || commandUpperCase.startsWith(CREATE_SCHEMA)) {
            parseCommand_CreateDateBase(command, databaseName);
        }

    }

    private static String removeSpecialCharactersAndQuotation(String string) {
        return string.replaceAll("\"", "").replaceAll("\'", "").replaceAll("`", "").replaceAll("\t", "").replaceAll("\n", "").replaceAll("\f", "").replaceAll("\b", "");
    }

    private static String removeSpecialCharacters(String string) {
        return string.replaceAll("\t", "").replaceAll("\n", "").replaceAll("\f", "").replaceAll("\b", "");
    }

    private static Column generateNewColumn(Table table, String tableName, String columnString, boolean isModify, HashMap<String, ArrayList<String>> mapOfTableRelationships) {
        String columnUpperCase = removeSpecialCharacters(columnString.toUpperCase()).trim();
        String[] columnWords = columnString.split(UtilConstants.WORD_SEPARATOR);

        Column column = table.getColumn(removeSpecialCharactersAndQuotation(columnWords[0].trim()));

        if (isModify && column.getColumnName() == null)
            return column;


        column.setColumnName(removeSpecialCharactersAndQuotation(columnWords[0]));
        column.setTableName(removeSpecialCharactersAndQuotation(tableName));

        String columnType = columnWords[1].trim();
        if (columnType.toUpperCase().startsWith(UtilConstants.TYPE_VARCHAR)) {
            column.setColumnType(UtilConstants.TYPE_VARCHAR);
            column.setColumnSize(Integer.parseInt(columnType.substring(columnType.indexOf("(") + 1, columnType.indexOf(")"))));
        } else {
            column.setColumnType(columnType);
        }

        if (columnUpperCase.contains(UtilConstants.NOT_NULL))
            column.setColumnIsNullable(false);
        else
            column.setColumnIsNullable(true);

        if (columnUpperCase.contains(UtilConstants.AUTO_INCREMENT))
            column.setColumnIsAutoIncrement(true);
        else
            column.setColumnIsAutoIncrement(false);

        if (columnUpperCase.contains(UtilConstants.PRIMARY_KEY))
            column.setPrimaryKey(true);

        if (columnUpperCase.contains(UtilConstants.FOREIGN_KEY)) {
            column.setIsForignKey(true);
            column.setForеignKey(true);

            for (int i = 0; i < columnWords.length; i++) {
                if (columnWords[i].equals(UtilConstants.REFERENCES) && i < (columnWords.length - 1)) {
                    String foreignTable = columnWords[i + 1];
                    String foreignTableName = foreignTable.split("\\(")[0].trim();
                    column.setForeignTableName(foreignTableName);
//                    if (TableParser.mapOfTableRelationships.containsKey(foreignTableName)) {
//                        TableParser.mapOfTableRelationships.get(foreignTableName).add(tableName);
//                    } else {
//                        ArrayList<String> newList = new ArrayList<String>();
//                        newList.add(tableName);
//                        TableParser.mapOfTableRelationships.put(foreignTableName, newList);
//                    }
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

}
