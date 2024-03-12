package com.master.codegenerator.models;

import com.master.codegenerator.generator.*;
import com.master.codegenerator.reactUtils.StringUtils;

public class Column {

    private String columnName;
    private String columnType;
    private int columnSize;
    private boolean columnIsNullable;
    private boolean columnIsAutoIncrement;
    private String tableName;
    private boolean isForеignKey;
    private String foreignTableName;
    private String displayName;
    private String mappedType;
    private boolean isPrimaryKey;
    private String defaultValue;

    private Boolean isVisible = true;
    private Boolean hasFilter = false;
    private Boolean hasSort = false;

    public Column() {
    }

    public Column(String columnName, String columnType, int columnSize, boolean columnIsNullable,
                  boolean columnIsAutoIncrement, String tableName, boolean isForignKey, String foreignTableName) {
        super();
        this.columnName = columnName;
        this.columnType = columnType;
        this.columnSize = columnSize;
        this.columnIsNullable = columnIsNullable;
        this.columnIsAutoIncrement = columnIsAutoIncrement;
        this.tableName = tableName;
        this.isForеignKey = isForignKey;
        this.foreignTableName = foreignTableName;
        this.isVisible = !isForignKey;
        this.hasFilter = false;
        this.hasSort = false;
    }

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = StringUtils.firstLatterToLowercase(columnName);
        String displayName = columnName.replaceAll("_", " ");
        StringBuilder displayNameBuilder = new StringBuilder();
        char ch;
        System.out.println("ala ala ala ala "+ displayName +" "+ columnName);
        for (int i = 0; i < displayName.length(); i++) {
            ch = displayName.charAt(i);
            if (Character.isUpperCase(ch)) {
                displayNameBuilder.append("  ");
            }
            displayNameBuilder.append(ch);
        }
        setDisplayName(displayNameBuilder.toString().toUpperCase());
    }

    public String getColumnType() {
        return columnType;
    }

    public void setColumnType(String columnType) {
        this.columnType = columnType;
        this.mappedType = TypeGenerator.typesHashMap.get(columnType);
    }

    public int getColumnSize() {
        return columnSize;
    }

    public void setColumnSize(int columnSize) {
        this.columnSize = columnSize;
    }

    public boolean isNullable() {
        return columnIsNullable;
    }

    public void setColumnIsNullable(boolean columnIsNullable) {
        this.columnIsNullable = columnIsNullable;
    }

    public boolean isAutoIncrement() {
        return columnIsAutoIncrement;
    }

    public void setColumnIsAutoIncrement(boolean columnIsAutoIncrement) {
        this.columnIsAutoIncrement = columnIsAutoIncrement;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = StringUtils.firstLatterToUppercase(tableName);
    }

    public boolean isForeignKey() {
        return isForеignKey;
    }

    public void setIsForignKey(boolean isForignKey) {
        this.isForеignKey = isForignKey;
    }

    public String getForeignTableName() {
        return foreignTableName;
    }

    public void setForeignTableName(String foreignTableName) {
        this.foreignTableName = foreignTableName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName.toUpperCase();
    }

    public String getMappedType() {
        return mappedType;
    }

    public void setMappedType(String mappedType) {
        this.mappedType = mappedType;
    }

    public void setForеignKey(boolean isForignKey) {
        this.isForеignKey = isForignKey;
    }

    public boolean isPrimaryKey() {
        return isPrimaryKey;
    }

    public void setPrimaryKey(boolean isPrimaryKey) {
        this.isPrimaryKey = isPrimaryKey;
        this.columnIsNullable = false;
    }
    public String getDefaultValue() {
        return defaultValue;
    }
    public void setDefaultValue(String defaultValue) {
        this.defaultValue = defaultValue;
    }

    public Boolean getVisible() {
        return isVisible;
    }

    public void setVisible(Boolean visible) {
        isVisible = visible;
    }

    public Boolean getHasFilter() {
        return hasFilter;
    }

    public void setHasFilter(Boolean hasFilter) {
        this.hasFilter = hasFilter;
    }

    public Boolean getHasSort() {
        return hasSort;
    }

    public void setHasSort(Boolean hasSort) {
        this.hasSort = hasSort;
    }
}
