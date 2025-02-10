package com.master.codegenerator.utils;


import java.io.File;

public class GeneratorUtils {

    public static final String REACT_APP = "react-app";
    public static final String SPRING_PROJECT_NAME = "Spring";
    public static String DEFAULT_SCHEMA_NAME = "schemaTest1";
    public static String generatedAppsFolder = "GeneratedApps";
    public static String REACT_GENERIC_FOLDER_NAME = "ReactFileTemplates";

    public GeneratorUtils() {
        // TODO Auto-generated constructor stub
    }

    public static String firstLatterToUppercase(String string) {
        return string.substring(0, 1).toUpperCase() + string.substring(1);
    }

    public static String firstLatterToLowercase(String string) {
        return string.substring(0, 1).toLowerCase() + string.substring(1);
    }

    public static String getSchemaRootFolderPath(String databaseName) {
        return generatedAppsFolder + File.separator + databaseName;
    }

    public static String getReactRootFolderPath(String databaseName) {
        return getSchemaRootFolderPath(databaseName) + File.separator + REACT_APP;
    }

    public static String getReactTemplateTableFolderPath() {
        return REACT_GENERIC_FOLDER_NAME + File.separator + "src" + File.separator + "pages" + File.separator + "tableName";
    }

    public static String getSpringProjectName(String databaseName) {
        return firstLatterToUppercase(databaseName) + SPRING_PROJECT_NAME;
    }

    public static String getSpringRootFolderPath(String databaseName) {
        return getSchemaRootFolderPath(databaseName) + File.separator + getSpringProjectName(databaseName);
    }
}
