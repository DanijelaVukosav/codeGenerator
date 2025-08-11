package com.master.codegenerator.validator;

import com.master.codegenerator.models.Column;
import com.master.codegenerator.models.Table;

import java.util.HashMap;
import java.util.regex.Pattern;

public class ValidationUtils {

    private static final Pattern TABLE_NAME_PATTERN = Pattern.compile("^[a-zA-Z][a-zA-Z0-9_]*$");
    private static final Pattern COLUMN_NAME_PATTERN = Pattern.compile("^[a-zA-Z][a-zA-Z0-9_]*$");
    private static final Pattern DATABASE_NAME_PATTERN = Pattern.compile("^[a-zA-Z][a-zA-Z0-9_]*$");

    public static boolean isValidTableName(String tableName) {
        return tableName != null && TABLE_NAME_PATTERN.matcher(tableName).matches();
    }

    public static boolean isValidColumnName(String columnName) {
        return columnName != null && COLUMN_NAME_PATTERN.matcher(columnName).matches();
    }

    public static boolean isValidDatabaseName(String databaseName) {
        return databaseName != null && DATABASE_NAME_PATTERN.matcher(databaseName).matches();
    }

    public static boolean isValidForeignKeyReference(Column column, HashMap<String, Table> tables) {
        if (!column.isForeignKey()) {
            return true;
        }

        String foreignTableName = column.getForeignTableName();
        String foreignColumnName = column.getForeignColumnName();

        if (foreignTableName == null || foreignColumnName == null) {
            return false;
        }

        Table foreignTable = tables.get(foreignTableName);
        if (foreignTable == null) {
            return false;
        }

        Column foreignColumn = null;
        for (Column col : foreignTable.getColumns()) {
            if (col.getColumnName().equals(foreignColumnName)) {
                foreignColumn = col;
                break;
            }
        }

        return foreignColumn != null && foreignColumn.isPrimaryKey();
    }

    public static boolean validateEnumValues(Column column) {
        String normalizedType = normalizeColumnType(column.getColumnType());
        if (!"ENUM".equals(normalizedType)) {
            return true;
        }

        return column.getEnumTypeValues() != null &&
                !column.getEnumTypeValues().isEmpty() &&
                column.getEnumTypeValues().stream().allMatch(value -> value != null && !value.trim().isEmpty());
    }

    public static boolean validateVarcharSize(Column column) {
        String normalizedType = normalizeColumnType(column.getColumnType());
        if (!"VARCHAR".equals(normalizedType)) {
            return true;
        }

        return column.getColumnSize() > 0 && column.getColumnSize() <= 65535;
    }

    public static boolean hasCircularDependency(HashMap<String, Table> tables) {
        for (Table table : tables.values()) {
            for (Column column : table.getColumns()) {
                if (column.isForeignKey() && table.getTableName().equals(column.getForeignTableName())) {
                    continue;
                }
            }
        }
        return false;
    }

    public static String normalizeColumnType(String columnType) {
        if (columnType == null) {
            return null;
        }

        return columnType.split("\\(")[0].toUpperCase().trim();
    }

    public static String generateDisplayName(String columnName) {
        if (columnName == null) {
            return "";
        }

        String[] words = columnName.toLowerCase().split("_");
        StringBuilder displayName = new StringBuilder();

        for (int i = 0; i < words.length; i++) {
            if (i > 0) {
                displayName.append(" ");
            }
            if (!words[i].isEmpty()) {
                displayName.append(Character.toUpperCase(words[i].charAt(0)));
                if (words[i].length() > 1) {
                    displayName.append(words[i].substring(1));
                }
            }
        }

        return displayName.toString();
    }
}