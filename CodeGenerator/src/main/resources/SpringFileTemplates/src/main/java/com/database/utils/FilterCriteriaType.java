package com.#{ALL_SCHEMA_NAME}#.api.utils;

public enum FilterCriteriaType {
    date("date"),
    time("time"),
    datetime_local("datetime_local"),
    LOCAL_DATE("LOCAL_DATE"),
    LOCAL_TIME("LOCAL_TIME"),
    LOCAL_DATE_TIME("LOCAL_DATE_TIME"),
    number("number"),
    NUMBER("NUMBER"),

    CHECKBOX("CHECKBOX"),
    checkbox("checkbox"),
    STRING("STRING"),
    text("text");

    public final String label;

    private FilterCriteriaType(String label) {
        this.label = label;
    }
}
