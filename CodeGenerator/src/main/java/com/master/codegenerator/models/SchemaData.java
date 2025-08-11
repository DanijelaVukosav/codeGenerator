package com.master.codegenerator.models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;

public class SchemaData {
    boolean enabledBackend;
    boolean enabledFrontend;
    HashMap<String, Table> tables;
    HashMap<String, ArrayList<String>> mapOfTableRelationships;
    String databaseName;

    public SchemaData() {
        databaseName = "";
        tables = new HashMap<>();
        mapOfTableRelationships = new HashMap<>();
        enabledBackend = true;
        enabledFrontend = true;

    }
    public SchemaData(String databaseName, HashMap<String, Table> tables, boolean enabledBackend, boolean enabledFrontend) {
        this.databaseName = databaseName;
        this.tables = tables;
        this.mapOfTableRelationships = new HashMap<>();
        this.enabledBackend = enabledBackend;
        this.enabledFrontend = enabledFrontend;
    }

    public SchemaData(HashMap<String, Table> tables, HashMap<String, ArrayList<String>> mapOfTableRelationships, String databaseName, boolean enabledBackend, boolean enabledFrontend) {
        this.tables = tables;
        this.mapOfTableRelationships = mapOfTableRelationships;
        this.databaseName = databaseName;
        this.enabledBackend = enabledBackend;
        this.enabledFrontend = enabledFrontend;
    }

    public HashMap<String, Table> getTables() {
        return tables;
    }

    public void setTables(HashMap<String, Table> tables) {
        this.tables = tables;
    }

    public HashMap<String, ArrayList<String>> getMapOfTableRelationships() {
        return mapOfTableRelationships;
    }

    public void setMapOfTableRelationships(HashMap<String, ArrayList<String>> mapOfTableRelationships) {
        this.mapOfTableRelationships = mapOfTableRelationships;
    }

    public String getDatabaseName() {
        return databaseName;
    }

    public void setDatabaseName(String databaseName) {
        this.databaseName = databaseName;
    }

    public void createMapOfTableRelationships() {
        for (String tableName : tables.keySet()) {
            mapOfTableRelationships.put(tableName, new ArrayList<>());
        }
        for (String tableName : tables.keySet()) {
            Table table = tables.get(tableName);
            for (Column column : table.getColumns()) {
                String foreignTable = column.getForeignTableName();
                ArrayList<String> foreignTableMap = mapOfTableRelationships.get(foreignTable);

                if (foreignTable != null && !foreignTable.isEmpty()) {
                    foreignTableMap.add(tableName);
                }

//                mapOfTableRelationships.put(foreignTable, new ArrayList<>(relatedTables));
            }
        }
    }
    public void setTableRelationships(String tableName, ArrayList<String> relatedTables) {
        mapOfTableRelationships.put(tableName, relatedTables);
    }

    public boolean isEnabledFrontend() {
        return enabledFrontend;
    }

    public void setEnabledFrontend(boolean enabledFrontend) {
        this.enabledFrontend = enabledFrontend;
    }

    public boolean isEnabledBackend() {
        return enabledBackend;
    }

    public void setEnabledBackend(boolean enabledBackend) {
        this.enabledBackend = enabledBackend;
    }
}
