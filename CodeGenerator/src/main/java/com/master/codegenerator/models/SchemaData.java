package com.master.codegenerator.models;

import java.util.ArrayList;
import java.util.HashMap;

public class SchemaData {
    HashMap<String, Table> tables;
    HashMap<String, ArrayList<String>> mapOfTableRelationships;

    String databaseName;

    public SchemaData() {
        databaseName = "";
        tables = new HashMap<>();
        mapOfTableRelationships = new HashMap<>();
    }

    public SchemaData(HashMap<String, Table> tables, HashMap<String, ArrayList<String>> mapOfTableRelationships, String databaseName) {
        this.tables = tables;
        this.mapOfTableRelationships = mapOfTableRelationships;
        this.databaseName = databaseName;
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
}
