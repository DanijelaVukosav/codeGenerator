package com.master.codegenerator.models;

import java.util.ArrayList;
import java.util.HashMap;

public class Table {
    private ArrayList<Column> columns;
    private HashMap<String, Column> columnsMap;
    private String tableName;

    public Table() {
        super();
        columns = new ArrayList<Column>();
        columnsMap = new HashMap<>();
    }

    public Table(ArrayList<Column> columns) {
        super();
        this.columns = columns;
    }

    public ArrayList<Column> getColumns() {
        return columns;
    }

    public Column getColumn(String columnName)
    {
        Column column = columnsMap.get(columnName);
        return column == null? new Column(): column;
    }

    public void addColumn(Column column) {
        columns.add(column);
        columnsMap.put(column.getColumnName(), column);
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public HashMap<String, Column> getColumnsMap() {
        return columnsMap;
    }

    public void setColumnsMap(HashMap<String, Column> columnsMap) {
        this.columnsMap = columnsMap;
    }

}
