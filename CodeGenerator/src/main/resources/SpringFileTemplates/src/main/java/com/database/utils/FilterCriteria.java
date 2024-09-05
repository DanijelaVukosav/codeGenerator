package com.#{ALL_SCHEMA_NAME}#.api.utils;

public class FilterCriteria {
    private String key;
    private String operation = "=";
    private Object value;
    private FilterCriteriaType type;

    public FilterCriteria() {
    }

    public FilterCriteria(String key, String operation, Object value, FilterCriteriaType type) {
        this.key = key;
        this.operation = operation;
        this.value = value;
        this.type = type;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }

    public FilterCriteriaType getType() {
        return type;
    }

    public void setType(FilterCriteriaType type) {
        this.type = type;
    }
}
