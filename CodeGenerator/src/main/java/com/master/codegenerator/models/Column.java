package com.master.codegenerator.models;

import com.master.codegenerator.generator.*;
import com.master.codegenerator.utils.GeneratorUtils;

import java.util.ArrayList;

public class Column {

    private String columnName;
    private String columnType;
    private int columnSize;
    private boolean nullable;
    private boolean autoIncrement;
    private String tableName;
    private boolean foreignKey;
    private String foreignTableName;
    private String foreignColumnName;
    private String displayName;
    private String mappedType;
    private ArrayList<String> enumTypeValues;
    private boolean isPrimaryKey;
    private boolean isUnique;
    private String defaultValue;

    private Boolean isVisible = true;

    private Boolean visibleOnSinglePage = true;
    private Boolean hasFilter = false;
    private Boolean hasSort = false;

    public Column() {
    }

    public Column(String columnName, String columnType, int columnSize, boolean nullable,
                  boolean autoIncrement, String tableName, boolean foreignKey, String foreignTableName) {
        super();
        this.columnName = columnName;
        this.columnType = columnType;
        this.columnSize = columnSize;
        this.nullable = nullable;
        this.autoIncrement = autoIncrement;
        this.tableName = tableName;
        this.foreignKey = foreignKey;
        this.foreignTableName = foreignTableName;
        this.isVisible = !foreignKey;
        this.visibleOnSinglePage = !foreignKey;
        this.hasFilter = false;
        this.hasSort = false;
        this.enumTypeValues = new ArrayList<>();
    }

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = GeneratorUtils.firstLatterToLowercase(columnName);
        String displayName = columnName.replaceAll("_", " ");
        StringBuilder displayNameBuilder = new StringBuilder();
        char ch;
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
        return nullable;
    }

    public void setNullable(boolean nullable) {
        this.nullable = nullable;
    }

    public boolean isAutoIncrement() {
        return autoIncrement;
    }

    public void setAutoIncrement(boolean autoIncrement) {
        this.autoIncrement = autoIncrement;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = GeneratorUtils.firstLatterToUppercase(tableName);
    }

    public boolean isForeignKey() {
        return foreignKey;
    }

    public void setForeignKey(boolean foreignKey) {
        this.foreignKey = foreignKey;
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

//    public void setForeignKey(boolean foreignKey) {
//        this.foreignKey = foreignKey;
//    }

    public boolean isPrimaryKey() {
        return isPrimaryKey;
    }

    public void setPrimaryKey(boolean isPrimaryKey) {
        this.isPrimaryKey = isPrimaryKey;
        this.nullable = false;
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

    public String getForeignColumnName() {
        return foreignColumnName;
    }

    public void setForeignColumnName(String foreignColumnName) {
        this.foreignColumnName = foreignColumnName;
    }

    public ArrayList<String> getEnumTypeValues() {
        return enumTypeValues;
    }

    public void setEnumTypeValues(ArrayList<String> enumTypeValues) {
        this.enumTypeValues = enumTypeValues;
    }

    public boolean isUnique() {
        return isUnique;
    }

    public void setUnique(boolean unique) {
        isUnique = unique;
    }

    public Boolean getVisibleOnSinglePage() {
        return visibleOnSinglePage;
    }

    public void setVisibleOnSinglePage(Boolean visibleOnSinglePage) {
        this.visibleOnSinglePage = visibleOnSinglePage;
    }
}
