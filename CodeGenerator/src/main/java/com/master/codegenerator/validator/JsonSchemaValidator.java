package com.master.codegenerator.validator;

import com.master.codegenerator.models.Column;
import com.master.codegenerator.models.SchemaData;
import com.master.codegenerator.models.Table;
import com.master.codegenerator.springGenerator.SpringTypes;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

@Component
public class JsonSchemaValidator {

    private static final Set<String> SUPPORTED_COLUMN_TYPES = SpringTypes.sqlToSpringTypesMap.keySet();
    private List<String> validationErrors;

    public ValidationResult validateAndPopulateSchema(SchemaData schema) {
        validationErrors = new ArrayList<>();

        validateBasicSchema(schema);

        if (schema.getTables() != null) {
            validateAndPopulateTables(schema);
        } else {
            validationErrors.add("Schema must contain at least one table");
        }

        if (validationErrors.isEmpty()) {
            schema.createMapOfTableRelationships();
        }

        return new ValidationResult(validationErrors.isEmpty(), validationErrors, schema);
    }

    private void validateBasicSchema(SchemaData schema) {
        if (schema.getDatabaseName() == null || schema.getDatabaseName().trim().isEmpty()) {
            schema.setDatabaseName("generated_database");
        }

        if (!ValidationUtils.isValidDatabaseName(schema.getDatabaseName())) {
            validationErrors.add("Database name '" + schema.getDatabaseName() + "' is invalid. Must start with letter and contain only letters, numbers, and underscores.");
        }
    }

    private void validateAndPopulateTables(SchemaData schema) {
        HashMap<String, Table> tables = schema.getTables();

        if (tables.isEmpty()) {
            validationErrors.add("Schema must contain at least one table");
            return;
        }

        for (String tableName : tables.keySet()) {
            Table table = tables.get(tableName);
            validateAndPopulateTable(tableName, table, tables);
        }

        validateForeignKeyReferences(schema);
    }

    private void validateAndPopulateTable(String tableName, Table table, HashMap<String, Table> allTables) {
        if (tableName == null || tableName.trim().isEmpty()) {
            validationErrors.add("Table name cannot be null or empty");
            return;
        }

        if (!ValidationUtils.isValidTableName(tableName)) {
            validationErrors.add("Table name '" + tableName + "' is invalid. Must start with letter and contain only letters, numbers, and underscores.");
        }

        if (table.getTableName() == null) {
            table.setTableName(tableName);
        }

        if (table.getColumns() == null || table.getColumns().isEmpty()) {
            validationErrors.add("Table '" + tableName + "' must have at least one column");
            return;
        }

        validateAndPopulateColumns(table);
    }

    private void validateAndPopulateColumns(Table table) {
        boolean hasPrimaryKey = false;

        for (Column column : table.getColumns()) {
            validateAndPopulateColumn(column, table.getTableName());

            if (column.isPrimaryKey()) {
                hasPrimaryKey = true;
            }
        }

        if (!hasPrimaryKey) {
            validationErrors.add("Table '" + table.getTableName() + "' must have at least one primary key column");
        }
    }

    private void validateAndPopulateColumn(Column column, String tableName) {
        if (column.getColumnName() == null || column.getColumnName().trim().isEmpty()) {
            validationErrors.add("Column name cannot be null or empty in table '" + tableName + "'");
            return;
        }

        if (!ValidationUtils.isValidColumnName(column.getColumnName())) {
            validationErrors.add("Column name '" + column.getColumnName() + "' is invalid. Must start with letter and contain only letters, numbers, and underscores.");
        }

        if (column.getColumnType() == null || column.getColumnType().trim().isEmpty()) {
            validationErrors.add("Column '" + column.getColumnName() + "' must have a column type");
            return;
        }

        String normalizedType = ValidationUtils.normalizeColumnType(column.getColumnType());
        if (!SUPPORTED_COLUMN_TYPES.contains(normalizedType)) {
            validationErrors.add("Unsupported column type '" + column.getColumnType() +
                    "' for column '" + column.getColumnName() + "' in table '" + tableName + "'");
        }

        populateColumnDefaults(column, tableName);

        if (!ValidationUtils.validateEnumValues(column)) {
            validationErrors.add("ENUM column '" + column.getColumnName() +
                    "' must have valid enumTypeValues specified");
        }

        if (!ValidationUtils.validateVarcharSize(column)) {
            validationErrors.add("VARCHAR column '" + column.getColumnName() +
                    "' must have a valid columnSize (1-65535)");
        }
    }

    private void populateColumnDefaults(Column column, String tableName) {
        if (column.getTableName() == null) {
            column.setTableName(tableName);
        }

        if (column.getDisplayName() == null) {
            column.setDisplayName(ValidationUtils.generateDisplayName(column.getColumnName()));
        }

        if (column.getVisible() == null) {
            boolean isVisible = true;

            if (column.isForeignKey()) {
                isVisible = false;
            }

            if (column.getColumnName().toLowerCase().contains("password")) {
                isVisible = false;
            }

            if (column.isPrimaryKey() && column.isAutoIncrement()) {
                isVisible = false;
            }

            column.setVisible(isVisible);
        }

        if (column.getVisibleOnSinglePage() == null) {
            column.setVisibleOnSinglePage(!column.isForeignKey());
        }

        if (column.getHasFilter() == null) {
            String normalizedType = ValidationUtils.normalizeColumnType(column.getColumnType());
            boolean hasFilter = false;

            if ("VARCHAR".equals(normalizedType) || "TEXT".equals(normalizedType)) {
                hasFilter = true;
            }
            if ("INT".equals(normalizedType) || "BIGINT".equals(normalizedType) || "DECIMAL".equals(normalizedType)) {
                hasFilter = true;
            }
            if ("DATE".equals(normalizedType) || "DATETIME".equals(normalizedType) || "TIMESTAMP".equals(normalizedType)) {
                hasFilter = true;
            }
            if ("ENUM".equals(normalizedType)) {
                hasFilter = true;
            }

            if (column.isPrimaryKey() && column.isAutoIncrement()) {
                hasFilter = false;
            }

            column.setHasFilter(hasFilter);
        }

        if (column.getHasSort() == null) {
            boolean hasSort = true;

            if ("TEXT".equals(ValidationUtils.normalizeColumnType(column.getColumnType()))) {
                hasSort = false;
            }
            if ("BLOB".equals(ValidationUtils.normalizeColumnType(column.getColumnType()))) {
                hasSort = false;
            }

            column.setHasSort(hasSort);
        }

        if (column.getEnumTypeValues() == null) {
            column.setEnumTypeValues(new ArrayList<>());
        }

        if (column.getColumnSize() == 0) {
            String normalizedType = ValidationUtils.normalizeColumnType(column.getColumnType());

            if ("VARCHAR".equals(normalizedType)) {
                column.setColumnSize(255);
            } else if ("INT".equals(normalizedType)) {
                column.setColumnSize(11);
            } else if ("BIGINT".equals(normalizedType)) {
                column.setColumnSize(20);
            } else if ("DECIMAL".equals(normalizedType)) {
                column.setColumnSize(10);
            }
        }
    }

    private void validateForeignKeyReferences(SchemaData schema) {
        HashMap<String, Table> tables = schema.getTables();

        for (Table table : tables.values()) {
            for (Column column : table.getColumns()) {
                if (column.isForeignKey()) {
                    validateSingleForeignKeyReference(column, tables);
                }
            }
        }
    }

    private void validateSingleForeignKeyReference(Column column, HashMap<String, Table> tables) {
        String tableName = column.getTableName();
        String columnName = column.getColumnName();

        if (column.getForeignTableName() == null || column.getForeignTableName().trim().isEmpty()) {
            validationErrors.add("Foreign key column '" + columnName +
                    "' in table '" + tableName + "' must specify foreignTableName");
            return;
        }

        Table foreignTable = tables.get(column.getForeignTableName());
        if (foreignTable == null) {
            validationErrors.add("Foreign key column '" + columnName +
                    "' in table '" + tableName + "' references non-existent table '" +
                    column.getForeignTableName() + "'");
            return;
        }

        if (column.getForeignColumnName() == null || column.getForeignColumnName().trim().isEmpty()) {
            validationErrors.add("Foreign key column '" + columnName +
                    "' in table '" + tableName + "' must specify foreignColumnName");
            return;
        }

        Column foreignColumn = null;
        for (Column col : foreignTable.getColumns()) {
            if (col.getColumnName().equals(column.getForeignColumnName())) {
                foreignColumn = col;
                break;
            }
        }

        if (foreignColumn == null) {
            validationErrors.add("Foreign key column '" + columnName +
                    "' in table '" + tableName + "' references non-existent column '" +
                    column.getForeignColumnName() + "' in table '" + column.getForeignTableName() + "'");
            return;
        }

        if (!foreignColumn.isPrimaryKey()) {
            validationErrors.add("Foreign key column '" + columnName +
                    "' in table '" + tableName + "' references column '" +
                    column.getForeignColumnName() + "' in table '" + column.getForeignTableName() +
                    "' which is not a primary key");
        }

        String foreignType = ValidationUtils.normalizeColumnType(foreignColumn.getColumnType());
        String currentType = ValidationUtils.normalizeColumnType(column.getColumnType());

        if (!foreignType.equals(currentType)) {
            validationErrors.add("Foreign key column '" + columnName + "' type '" + currentType +
                    "' does not match referenced column '" + column.getForeignColumnName() +
                    "' type '" + foreignType + "'");
        }
    }

    public static class ValidationResult {
        private final boolean isValid;
        private final List<String> errors;
        private final SchemaData schema;

        public ValidationResult(boolean isValid, List<String> errors, SchemaData schema) {
            this.isValid = isValid;
            this.errors = errors;
            this.schema = schema;
        }

        public boolean isValid() {
            return isValid;
        }

        public List<String> getErrors() {
            return errors;
        }

        public SchemaData getSchema() {
            return schema;
        }
    }
}