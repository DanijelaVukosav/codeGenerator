package com.master.codegenerator.TableParser;

import com.master.codegenerator.models.Table;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;

public class TableParser {

    public static String databaseSchemaName = "schema";
    public static HashMap<String, Table> tables = new HashMap<String, Table>();

    //Key - tableName, value - array of tables where tableName is foreign key
    public static HashMap<String, ArrayList<String>> mapOfTableRelationships = new HashMap<String, ArrayList<String>>();

    public static String commandSeparator = ";";

    public TableParser() {
    }

    private static ArrayList<String> readFile(BufferedReader bufferReader) {
        ArrayList<String> lines = new ArrayList<>();
        try {

            String line;
            while ((line = bufferReader.readLine()) != null) {
                lines.add(line);
            }
        } catch (FileNotFoundException e) {
            System.out.println("File not found ");
        } catch (IOException e) {
            System.out.println("IO Exception");
        }


        return lines;
    }

    private static ArrayList<String> readCommandsFromFile(BufferedReader bufferReader) {
        ArrayList<String> lines = readFile(bufferReader);

        ArrayList<String> ddlComands = new ArrayList<>();

        String command = "";
        for (String line : lines) {
            if (line.startsWith(commandSeparator) && command != "") {
                ddlComands.add(command.trim());
                if (command.equals(commandSeparator)) {
                    command = "";
                } else {
                    command = command.substring(1);
                }
            } else if (!line.contains(commandSeparator)) {
                command += line;
            } else {
                String[] lineParts = line.split(commandSeparator);
                int numberOfCommands = lineParts.length == 1 || line.endsWith(commandSeparator) ? lineParts.length : (lineParts.length - 1);
                for (int i = 0; i < numberOfCommands; i++) {
                    command += " " + lineParts[i].trim();
                    ddlComands.add(command.trim());
                    command = "";
                }
                command = numberOfCommands == lineParts.length ? "" : lineParts[numberOfCommands];
            }

        }
        return ddlComands;
    }


    public static void generateTables(BufferedReader bufferReader, HashMap<String, Table> tables, HashMap<String, ArrayList<String>> mapOfTableRelationships, StringBuilder databaseName) { // ArrayList<Table>
        ArrayList<String> commands = readCommandsFromFile(bufferReader);

        for (String command : commands) {
            CommandParser.parseCommand(command, tables, mapOfTableRelationships, databaseName);
//            System.out.println(command);
        }


    }

    private static Integer numberOfCommandSeparators(String command) {
        Integer chCount = 0;
        System.out.println("CCCCCCCCCCCCCCCCCCCCCCc");
        for (int i = 0; i < command.length(); i++) {
            if (command.charAt(i) == commandSeparator.charAt(0)) {
                chCount++;
            }
        }
        return chCount;
    }

}
